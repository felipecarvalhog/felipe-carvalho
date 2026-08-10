/**
 * In-memory, per-IP rate limit.
 *
 * Deliberately simple: no CAPTCHA, no third-party service, no cookies. It is
 * per-process, so it resets on restart and does not work across instances —
 * documented in README.md as a production limitation.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitOptions = {
  max: number;
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

const prune = (now: number): void => {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
};

export const checkRateLimit = (
  key: string,
  { max, windowMs }: RateLimitOptions,
  now: number = Date.now(),
): RateLimitResult => {
  prune(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: Math.max(0, max - 1), retryAfterSeconds: 0 };
  }

  if (bucket.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, max - bucket.count),
    retryAfterSeconds: 0,
  };
};

/** Test helper — never called by application code. */
export const resetRateLimit = (): void => {
  buckets.clear();
};
