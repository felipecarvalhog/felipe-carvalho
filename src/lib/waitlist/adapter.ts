import type { ServerEnv, WaitlistAdapterName } from '@/config/server-env';
import type { WaitlistPayload } from '@/lib/waitlist-schema';

/**
 * Destination for a waiting-list entry, decoupled from the API route so the
 * professional can switch channels without touching request handling.
 */

export type WaitlistRecord = {
  readonly fullName: string;
  readonly email: string;
  readonly phone?: string;
  readonly contactPreference?: string;
  readonly availability?: string;
  readonly referral?: string;
  /** Proof that the privacy notice was accepted, and when. */
  readonly consent: true;
  readonly receivedAt: string;
  readonly source: 'site-lista-de-espera';
};

export type DeliveryFailureReason = 'misconfigured' | 'network' | 'upstream';

export type DeliveryResult =
  | {
      readonly ok: true;
      readonly adapter: WaitlistAdapterName;
      /** `false` means nothing was stored anywhere. */
      readonly persisted: boolean;
      /** `true` means the success is a simulation, not a real delivery. */
      readonly simulated: boolean;
    }
  | {
      readonly ok: false;
      readonly adapter: WaitlistAdapterName;
      readonly reason: DeliveryFailureReason;
    };

export type WaitlistAdapter = {
  readonly name: WaitlistAdapterName;
  deliver(record: WaitlistRecord): Promise<DeliveryResult>;
};

export const toWaitlistRecord = (
  payload: WaitlistPayload,
  receivedAt: string = new Date().toISOString(),
): WaitlistRecord => ({
  fullName: payload.fullName,
  email: payload.email,
  phone: payload.phone,
  contactPreference: payload.contactPreference,
  availability: payload.availability,
  referral: payload.referral,
  consent: true,
  receivedAt,
  source: 'site-lista-de-espera',
});

/**
 * Stores nothing and delivers nowhere. It never claims persistence, so the UI
 * can tell the user plainly that the submission was simulated.
 */
export const createMockAdapter = (): WaitlistAdapter => ({
  name: 'mock',
  async deliver() {
    return { ok: true, adapter: 'mock', persisted: false, simulated: true };
  },
});

const WEBHOOK_TIMEOUT_MS = 8_000;

export const createWebhookAdapter = (
  url: string | undefined,
  token: string | undefined,
): WaitlistAdapter => ({
  name: 'webhook',
  async deliver(record) {
    if (!url) {
      return { ok: false, adapter: 'webhook', reason: 'misconfigured' };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
        cache: 'no-store',
      });

      if (!response.ok) {
        return { ok: false, adapter: 'webhook', reason: 'upstream' };
      }

      return { ok: true, adapter: 'webhook', persisted: true, simulated: false };
    } catch {
      return { ok: false, adapter: 'webhook', reason: 'network' };
    }
  },
});

export const getWaitlistAdapter = (env: ServerEnv): WaitlistAdapter =>
  env.adapter === 'webhook'
    ? createWebhookAdapter(env.webhookUrl, env.webhookToken)
    : createMockAdapter();
