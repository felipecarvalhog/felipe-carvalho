import { createHash, randomBytes } from 'node:crypto';

/**
 * Duplicate detection without keeping contact data in memory.
 *
 * Only salted SHA-256 digests are stored, and the salt is regenerated on every
 * process start, so the digests cannot be correlated across restarts or turned
 * back into e-mails. Like the rate limit, this is per-process.
 */

const salt = randomBytes(32).toString('hex');

const seen = new Map<string, number>();

const digest = (value: string): string =>
  createHash('sha256').update(`${salt}:${value.trim().toLowerCase()}`).digest('hex');

const prune = (now: number, ttlMs: number): void => {
  for (const [key, storedAt] of seen) {
    if (now - storedAt > ttlMs) seen.delete(key);
  }
};

export type DedupeKeys = {
  email: string;
  phone?: string | undefined;
};

const keysFor = ({ email, phone }: DedupeKeys): string[] => {
  const values = [`email:${email}`];
  if (phone) values.push(`phone:${phone}`);
  return values.map(digest);
};

export const isKnownContact = (
  contact: DedupeKeys,
  ttlMs: number,
  now: number = Date.now(),
): boolean => {
  prune(now, ttlMs);
  return keysFor(contact).some((key) => seen.has(key));
};

export const rememberContact = (
  contact: DedupeKeys,
  now: number = Date.now(),
): void => {
  for (const key of keysFor(contact)) {
    seen.set(key, now);
  }
};

/** Test helper — never called by application code. */
export const resetDedupe = (): void => {
  seen.clear();
};
