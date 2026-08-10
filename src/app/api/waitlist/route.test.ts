// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { deliver } = vi.hoisted(() => ({ deliver: vi.fn() }));

vi.mock('@/lib/waitlist/adapter', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/waitlist/adapter')>();
  return {
    ...actual,
    getWaitlistAdapter: () => ({ name: 'mock' as const, deliver }),
  };
});

import { createMockAdapter, toWaitlistRecord } from '@/lib/waitlist/adapter';
import { resetDedupe } from '@/lib/waitlist/dedupe';
import { resetRateLimit } from '@/lib/waitlist/rate-limit';
import { POST } from './route';

type ApiBody = {
  status: string;
  delivery?: { adapter: string; persisted: boolean; simulated: boolean };
  errors?: Record<string, string>;
  retryAfterSeconds?: number;
};

// `restoreMocks` detaches spies after each test, so they are re-attached in
// beforeEach rather than once at module scope.
let infoSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;

const basePayload = {
  fullName: 'Maria de Souza',
  email: 'maria.souza@example.com',
  phone: '(81) 97313-5461',
  consent: true,
};

const post = (body: unknown, ip = '203.0.113.10') =>
  POST(
    new Request('http://localhost:3210/api/waitlist', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify(body),
    }),
  );

beforeEach(() => {
  resetRateLimit();
  resetDedupe();
  deliver.mockReset();
  deliver.mockResolvedValue({
    ok: true,
    adapter: 'mock',
    persisted: false,
    simulated: true,
  });
  infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('POST /api/waitlist', () => {
  it('accepts a valid submission and reports the delivery honestly', async () => {
    const response = await post(basePayload);
    const body = (await response.json()) as ApiBody;

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.delivery).toEqual({
      adapter: 'mock',
      persisted: false,
      simulated: true,
    });
    expect(deliver).toHaveBeenCalledTimes(1);
  });

  it('answers the honeypot with a silent success and dispatches nothing', async () => {
    const response = await post({ ...basePayload, website: 'http://spam.example' });
    const body = (await response.json()) as ApiBody;

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.delivery?.persisted).toBe(false);
    expect(body.delivery?.simulated).toBe(true);
    // The bot must not be able to tell it was filtered out, and nothing may
    // reach the adapter.
    expect(deliver).not.toHaveBeenCalled();
  });

  it('rejects an invalid payload with field-keyed messages', async () => {
    const response = await post({ ...basePayload, email: 'nope' });
    const body = (await response.json()) as ApiBody;

    expect(response.status).toBe(422);
    expect(body.status).toBe('invalid');
    expect(body.errors?.email).toBe('Informe um e-mail válido.');
    expect(deliver).not.toHaveBeenCalled();
  });

  it('detects a duplicate contact and does not dispatch it twice', async () => {
    const first = await post(basePayload);
    expect(first.status).toBe(200);

    const second = await post(basePayload);
    const body = (await second.json()) as ApiBody;

    expect(second.status).toBe(409);
    expect(body.status).toBe('duplicate');
    expect(deliver).toHaveBeenCalledTimes(1);
    // No submitted value is echoed back to the caller.
    expect(JSON.stringify(body)).not.toContain('maria.souza@example.com');
  });

  it('treats a repeated phone number as a duplicate too', async () => {
    await post(basePayload);
    const second = await post({ ...basePayload, email: 'outro@example.com' });

    expect(second.status).toBe(409);
  });

  it('enforces the configured rate limit per IP', async () => {
    vi.stubEnv('WAITLIST_RATE_LIMIT_MAX', '2');
    vi.stubEnv('WAITLIST_RATE_LIMIT_WINDOW_MS', '600000');
    resetRateLimit();

    const ip = '198.51.100.7';
    await post({ ...basePayload, email: 'a@example.com', phone: '' }, ip);
    await post({ ...basePayload, email: 'b@example.com', phone: '' }, ip);

    const third = await post({ ...basePayload, email: 'c@example.com', phone: '' }, ip);
    const body = (await third.json()) as ApiBody;

    expect(third.status).toBe(429);
    expect(body.status).toBe('rate-limited');
    expect(third.headers.get('retry-after')).toBeTruthy();
    expect(body.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('counts the rate limit separately for a different IP', async () => {
    vi.stubEnv('WAITLIST_RATE_LIMIT_MAX', '1');
    resetRateLimit();

    await post({ ...basePayload, email: 'a@example.com', phone: '' }, '198.51.100.1');
    const other = await post(
      { ...basePayload, email: 'b@example.com', phone: '' },
      '198.51.100.2',
    );

    expect(other.status).toBe(200);
  });

  it('returns a generic error when delivery fails', async () => {
    deliver.mockResolvedValue({ ok: false, adapter: 'mock', reason: 'network' });

    const response = await post(basePayload);
    const body = (await response.json()) as ApiBody;

    expect(response.status).toBe(502);
    expect(body.status).toBe('error');
  });

  it('rejects malformed JSON without crashing', async () => {
    const response = await POST(
      new Request('http://localhost:3210/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{ not json',
      }),
    );

    expect(response.status).toBe(400);
  });

  it('never writes submitted values to the log', async () => {
    await post(basePayload);

    const logged = [...infoSpy.mock.calls, ...errorSpy.mock.calls]
      .flat()
      .map((entry) => String(entry))
      .join(' ');

    expect(logged).not.toContain('maria.souza@example.com');
    expect(logged).not.toContain('Maria de Souza');
    expect(logged).not.toContain('97313');
    expect(logged).toContain('"outcome":"accepted"');
  });
});

describe('mock adapter', () => {
  it('never claims that a lead was persisted', async () => {
    const result = await createMockAdapter().deliver(
      toWaitlistRecord({
        fullName: 'Maria de Souza',
        email: 'maria.souza@example.com',
        consent: true,
      }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.persisted).toBe(false);
    expect(result.simulated).toBe(true);
  });
});
