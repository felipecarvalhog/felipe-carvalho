import { describe, expect, it, vi } from 'vitest';
import { createWorker, type KvNamespace, type WorkerEnv } from './index';

const origin = 'https://psicologogay.hudilabs.com';
const validPayload = {
  fullName: 'Maria de Souza',
  email: 'maria@example.com',
  phone: '',
  contactPreference: '',
  availability: '',
  referral: '',
  consent: true,
  website: '',
};

const createKv = (): KvNamespace & { values: Map<string, string> } => {
  const values = new Map<string, string>();
  return {
    values,
    async get(key) {
      return values.get(key) ?? null;
    },
    async put(key, value) {
      values.set(key, value);
    },
  };
};

const createEnv = (kv = createKv()): WorkerEnv => ({
  ALLOWED_ORIGINS: `${origin},http://localhost:3210`,
  DEDUPE_SALT: 'test-salt',
  WAITLIST_KV: kv,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: 'worker@example.iam.gserviceaccount.com',
  GOOGLE_PRIVATE_KEY: 'unused-in-tests',
  GOOGLE_SHEET_ID: 'sheet-id',
  GOOGLE_SHEET_RANGE: 'Waitlist!A:J',
});

const post = (body: unknown, requestOrigin = origin) =>
  new Request('https://worker.example/waitlist', {
    method: 'POST',
    headers: {
      origin: requestOrigin,
      'content-type': 'application/json',
      'cf-connecting-ip': '203.0.113.10',
    },
    body: JSON.stringify(body),
  });

const readBody = async (response: Response) => response.json() as Promise<Record<string, unknown>>;

describe('waitlist worker', () => {
  it('rejects origins outside the allowlist', async () => {
    const append = vi.fn();
    const response = await createWorker({ append })(
      post(validPayload, 'https://attacker.example'),
      createEnv(),
    );

    expect(response.status).toBe(403);
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
    expect(append).not.toHaveBeenCalled();
  });

  it('handles an allowed CORS preflight', async () => {
    const request = new Request('https://worker.example/waitlist', {
      method: 'OPTIONS',
      headers: { origin },
    });
    const response = await createWorker()(request, createEnv());

    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe(origin);
    expect(response.headers.get('access-control-allow-methods')).toContain('POST');
  });

  it('persists valid data before reporting success', async () => {
    const append = vi.fn().mockResolvedValue(undefined);
    const response = await createWorker({
      append,
      now: () => Date.parse('2026-08-09T12:00:00.000Z'),
      randomId: () => 'submission-id',
    })(post(validPayload), createEnv());

    expect(response.status).toBe(200);
    expect(await readBody(response)).toMatchObject({
      status: 'success',
      delivery: { persisted: true, simulated: false },
    });
    expect(append).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ email: 'maria@example.com' }),
      'submission-id',
      '2026-08-09T12:00:00.000Z',
    );
  });

  it('does not report success when Google Sheets fails', async () => {
    const append = vi.fn().mockRejectedValue(new Error('upstream'));
    const response = await createWorker({ append })(post(validPayload), createEnv());

    expect(response.status).toBe(502);
    expect(await readBody(response)).toEqual({ status: 'error' });
  });

  it('returns a neutral success without persisting a honeypot submission', async () => {
    const append = vi.fn();
    const response = await createWorker({ append })(
      post({ ...validPayload, website: 'spam.example' }),
      createEnv(),
    );

    expect(response.status).toBe(200);
    expect(await readBody(response)).toMatchObject({
      status: 'success',
      delivery: { persisted: false, simulated: true },
    });
    expect(append).not.toHaveBeenCalled();
  });

  it('deduplicates persisted contacts', async () => {
    const kv = createKv();
    const env = createEnv(kv);
    const append = vi.fn().mockResolvedValue(undefined);
    const worker = createWorker({ append });

    expect((await worker(post(validPayload), env)).status).toBe(200);
    const duplicate = await worker(post(validPayload), env);

    expect(duplicate.status).toBe(409);
    expect(await readBody(duplicate)).toEqual({ status: 'duplicate' });
    expect(append).toHaveBeenCalledTimes(1);
  });

  it('rate limits repeated requests without logging personal data', async () => {
    const env = { ...createEnv(), RATE_LIMIT_MAX: '1' };
    const worker = createWorker({ append: vi.fn().mockResolvedValue(undefined) });

    expect((await worker(post({ ...validPayload, email: 'first@example.com' }), env)).status).toBe(200);
    const limited = await worker(post({ ...validPayload, email: 'second@example.com' }), env);

    expect(limited.status).toBe(429);
    expect(limited.headers.get('retry-after')).toBe('60');
    expect(await readBody(limited)).toEqual({
      status: 'rate-limited',
      retryAfterSeconds: 60,
    });
  });
});
