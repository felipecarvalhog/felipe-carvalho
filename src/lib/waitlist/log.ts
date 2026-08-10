/**
 * Operational logging for the waiting-list endpoint.
 *
 * Only non-identifying metadata is ever accepted: the outcome, a timestamp and
 * a few counters. The signature makes it impossible to pass a field value by
 * accident — there is no `unknown`/`any` escape hatch.
 */

export type WaitlistOutcome =
  | 'accepted'
  | 'honeypot'
  | 'invalid'
  | 'duplicate'
  | 'rate-limited'
  | 'delivery-failed'
  | 'bad-request';

type WaitlistLogMeta = {
  adapter?: 'mock' | 'webhook';
  simulated?: boolean;
  persisted?: boolean;
  invalidFieldCount?: number;
  retryAfterSeconds?: number;
  reason?: 'misconfigured' | 'network' | 'upstream' | 'malformed-json';
};

export const logWaitlistEvent = (
  outcome: WaitlistOutcome,
  meta: WaitlistLogMeta = {},
): void => {
  const entry = {
    scope: 'waitlist',
    at: new Date().toISOString(),
    outcome,
    ...meta,
  };

  if (outcome === 'delivery-failed' || outcome === 'bad-request') {
    console.error(JSON.stringify(entry));
    return;
  }

  console.info(JSON.stringify(entry));
};
