/**
 * Server-only environment access.
 *
 * Nothing here may be imported from a client component. Next.js already
 * refuses to inline non-`NEXT_PUBLIC_` variables into the browser bundle, and
 * the runtime guard below turns an accidental client import into a loud error
 * instead of a silent `undefined`.
 *
 * (The `server-only` package would express this at build time, but it is not
 * in the allowed dependency list, so the guard is done by hand.)
 */

export type WaitlistAdapterName = 'mock' | 'webhook';

const assertServer = (): void => {
  if (typeof window !== 'undefined') {
    throw new Error(
      'server-env.ts was imported from the browser. Server configuration must never reach the client bundle.',
    );
  }
};

const toPositiveInt = (raw: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(raw ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const getServerEnv = () => {
  assertServer();

  const adapter: WaitlistAdapterName =
    process.env.WAITLIST_ADAPTER === 'webhook' ? 'webhook' : 'mock';

  return {
    adapter,
    webhookUrl: process.env.WAITLIST_WEBHOOK_URL?.trim() || undefined,
    webhookToken: process.env.WAITLIST_WEBHOOK_TOKEN?.trim() || undefined,
    rateLimitMax: toPositiveInt(process.env.WAITLIST_RATE_LIMIT_MAX, 5),
    rateLimitWindowMs: toPositiveInt(
      process.env.WAITLIST_RATE_LIMIT_WINDOW_MS,
      600_000,
    ),
  } as const;
};

export type ServerEnv = ReturnType<typeof getServerEnv>;
