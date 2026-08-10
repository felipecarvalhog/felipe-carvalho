import { projectConfig } from '@/config/project.config';
import { getServerEnv } from '@/config/server-env';
import {
  collectFieldErrors,
  waitlistSchema,
  type WaitlistPayload,
} from '@/lib/waitlist-schema';
import type { WaitlistApiResponse } from '@/lib/waitlist/api-types';
import { getWaitlistAdapter, toWaitlistRecord } from '@/lib/waitlist/adapter';
import { isKnownContact, rememberContact } from '@/lib/waitlist/dedupe';
import { logWaitlistEvent } from '@/lib/waitlist/log';
import { checkRateLimit } from '@/lib/waitlist/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DAY_MS = 24 * 60 * 60 * 1000;

const json = (
  body: WaitlistApiResponse,
  status: number,
  headers?: HeadersInit,
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });

/**
 * Client identity for rate limiting only. It is never stored and never logged.
 */
const clientKey = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  return first || request.headers.get('x-real-ip')?.trim() || 'unknown';
};

export async function POST(request: Request): Promise<Response> {
  const env = getServerEnv();

  const limit = checkRateLimit(clientKey(request), {
    max: env.rateLimitMax,
    windowMs: env.rateLimitWindowMs,
  });

  if (!limit.allowed) {
    logWaitlistEvent('rate-limited', { retryAfterSeconds: limit.retryAfterSeconds });
    return json({ status: 'rate-limited', retryAfterSeconds: limit.retryAfterSeconds }, 429, {
      'retry-after': String(limit.retryAfterSeconds),
    });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    logWaitlistEvent('bad-request', { reason: 'malformed-json' });
    return json({ status: 'error' }, 400);
  }

  const parsed = waitlistSchema.safeParse(raw);

  if (!parsed.success) {
    const errors = collectFieldErrors(parsed.error);
    logWaitlistEvent('invalid', { invalidFieldCount: Object.keys(errors).length });
    return json({ status: 'invalid', errors }, 422);
  }

  const payload: WaitlistPayload = parsed.data;

  // Honeypot: answer exactly like a success, but deliver nothing. A bot must
  // not be able to tell that it was filtered out.
  if (payload.website) {
    logWaitlistEvent('honeypot');
    return json(
      {
        status: 'success',
        delivery: { adapter: env.adapter, persisted: false, simulated: true },
      },
      200,
    );
  }

  const retentionMs = (projectConfig.privacy.retentionDays ?? 180) * DAY_MS;
  const dedupeKeys = { email: payload.email, phone: payload.phone };

  if (isKnownContact(dedupeKeys, retentionMs)) {
    logWaitlistEvent('duplicate');
    return json({ status: 'duplicate' }, 409);
  }

  const adapter = getWaitlistAdapter(env);
  const delivery = await adapter.deliver(toWaitlistRecord(payload));

  if (!delivery.ok) {
    logWaitlistEvent('delivery-failed', {
      adapter: delivery.adapter,
      reason: delivery.reason,
    });
    return json({ status: 'error' }, 502);
  }

  rememberContact(dedupeKeys);

  logWaitlistEvent('accepted', {
    adapter: delivery.adapter,
    persisted: delivery.persisted,
    simulated: delivery.simulated,
  });

  return json(
    {
      status: 'success',
      delivery: {
        adapter: delivery.adapter,
        persisted: delivery.persisted,
        simulated: delivery.simulated,
      },
    },
    200,
  );
}

export async function GET(): Promise<Response> {
  return new Response(null, { status: 405, headers: { allow: 'POST' } });
}
