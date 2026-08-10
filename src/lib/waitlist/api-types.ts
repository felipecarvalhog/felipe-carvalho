import type { WaitlistFieldErrors } from '@/lib/waitlist-schema';

/** Wire contract between the form and the waitlist Worker. */
export type WaitlistApiResponse =
  | {
      status: 'success';
      delivery: {
        adapter: 'google-sheets' | 'mock' | 'webhook';
        persisted: boolean;
        /** `true` when the success is simulated and nothing was delivered. */
        simulated: boolean;
      };
    }
  | { status: 'invalid'; errors: WaitlistFieldErrors }
  | { status: 'duplicate' }
  | { status: 'rate-limited'; retryAfterSeconds: number }
  | { status: 'error' };
