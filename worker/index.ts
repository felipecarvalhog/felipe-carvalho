import {
  collectFieldErrors,
  waitlistSchema,
  type WaitlistPayload,
} from '../src/lib/waitlist-schema';
import { appendToGoogleSheet, type GoogleSheetsEnv } from './google-sheets';

export type KvNamespace = {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
};

export type WorkerEnv = GoogleSheetsEnv & {
  ALLOWED_ORIGINS: string;
  DEDUPE_SALT: string;
  WAITLIST_KV: KvNamespace;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_WINDOW_SECONDS?: string;
  DEDUPE_TTL_SECONDS?: string;
};

type Dependencies = {
  append: (
    env: GoogleSheetsEnv,
    payload: WaitlistPayload,
    id: string,
    receivedAt: string,
  ) => Promise<void>;
  now: () => number;
  randomId: () => string;
};

const defaults: Dependencies = {
  append: appendToGoogleSheet,
  now: Date.now,
  randomId: () => crypto.randomUUID(),
};

const MAX_BODY_BYTES = 8_192;
const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW_SECONDS = 60;
const DEFAULT_DEDUPE_TTL_SECONDS = 180 * 24 * 60 * 60;

const securityHeaders = {
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
  'referrer-policy': 'no-referrer',
  'x-content-type-options': 'nosniff',
};

const allowedOrigin = (request: Request, env: WorkerEnv): string | null => {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  const allowed = env.ALLOWED_ORIGINS.split(',').map((value) => value.trim());
  return allowed.includes(origin) ? origin : null;
};

const response = (
  body: unknown,
  status: number,
  origin?: string | null,
  extraHeaders?: HeadersInit,
): Response =>
  new Response(status === 204 ? null : JSON.stringify(body), {
    status,
    headers: {
      ...securityHeaders,
      ...(origin
        ? {
            'access-control-allow-origin': origin,
            'access-control-allow-methods': 'POST, OPTIONS',
            'access-control-allow-headers': 'content-type',
            vary: 'Origin',
          }
        : {}),
      ...extraHeaders,
    },
  });

const positiveInteger = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const hash = async (value: string): Promise<string> => {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
};

const checkRateLimit = async (
  request: Request,
  env: WorkerEnv,
  now: number,
): Promise<{ allowed: boolean; retryAfter: number }> => {
  const max = positiveInteger(env.RATE_LIMIT_MAX, DEFAULT_RATE_LIMIT_MAX);
  const windowSeconds = positiveInteger(
    env.RATE_LIMIT_WINDOW_SECONDS,
    DEFAULT_RATE_LIMIT_WINDOW_SECONDS,
  );
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const bucket = Math.floor(now / (windowSeconds * 1000));
  const key = `rate:${await hash(`${env.DEDUPE_SALT}:${ip}`)}:${bucket}`;
  const count = Number.parseInt((await env.WAITLIST_KV.get(key)) ?? '0', 10);
  if (count >= max) return { allowed: false, retryAfter: windowSeconds };
  await env.WAITLIST_KV.put(key, String(count + 1), {
    expirationTtl: windowSeconds * 2,
  });
  return { allowed: true, retryAfter: windowSeconds };
};

const contactKeys = async (
  payload: WaitlistPayload,
  salt: string,
): Promise<string[]> => {
  const contacts = [payload.email, payload.phone].filter(
    (value): value is string => Boolean(value),
  );
  return Promise.all(
    contacts.map(async (contact) => `contact:${await hash(`${salt}:${contact}`)}`),
  );
};

export const createWorker = (dependencies: Partial<Dependencies> = {}) => {
  const deps = { ...defaults, ...dependencies };

  return async (request: Request, env: WorkerEnv): Promise<Response> => {
    const url = new URL(request.url);
    if (url.pathname !== '/waitlist') return response({ status: 'error' }, 404);

    const origin = allowedOrigin(request, env);
    if (!origin) return response({ status: 'error' }, 403);

    if (request.method === 'OPTIONS') return response(null, 204, origin);
    if (request.method !== 'POST') {
      return response({ status: 'error' }, 405, origin, { allow: 'POST, OPTIONS' });
    }

    if (!request.headers.get('content-type')?.startsWith('application/json')) {
      return response({ status: 'error' }, 415, origin);
    }

    const declaredLength = Number(request.headers.get('content-length') ?? '0');
    if (declaredLength > MAX_BODY_BYTES) {
      return response({ status: 'error' }, 413, origin);
    }

    const limit = await checkRateLimit(request, env, deps.now());
    if (!limit.allowed) {
      return response(
        { status: 'rate-limited', retryAfterSeconds: limit.retryAfter },
        429,
        origin,
        { 'retry-after': String(limit.retryAfter) },
      );
    }

    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
      return response({ status: 'error' }, 413, origin);
    }

    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return response({ status: 'error' }, 400, origin);
    }

    const parsed = waitlistSchema.safeParse(raw);
    if (!parsed.success) {
      return response(
        { status: 'invalid', errors: collectFieldErrors(parsed.error) },
        422,
        origin,
      );
    }

    if (parsed.data.website) {
      return response(
        {
          status: 'success',
          delivery: { adapter: 'google-sheets', persisted: false, simulated: true },
        },
        200,
        origin,
      );
    }

    const keys = await contactKeys(parsed.data, env.DEDUPE_SALT);
    const known = await Promise.all(keys.map((key) => env.WAITLIST_KV.get(key)));
    if (known.some(Boolean)) {
      return response({ status: 'duplicate' }, 409, origin);
    }

    const receivedAt = new Date(deps.now()).toISOString();
    try {
      await deps.append(env, parsed.data, deps.randomId(), receivedAt);
    } catch {
      return response({ status: 'error' }, 502, origin);
    }

    const ttl = positiveInteger(env.DEDUPE_TTL_SECONDS, DEFAULT_DEDUPE_TTL_SECONDS);
    await Promise.all(
      keys.map((key) => env.WAITLIST_KV.put(key, '1', { expirationTtl: ttl })),
    );

    return response(
      {
        status: 'success',
        delivery: { adapter: 'google-sheets', persisted: true, simulated: false },
      },
      200,
      origin,
    );
  };
};

const worker = createWorker();

const workerEntrypoint = {
  fetch: worker,
};

export default workerEntrypoint;
