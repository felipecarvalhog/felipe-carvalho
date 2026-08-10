import type { WaitlistAdapterName } from '@/config/server-env';
import type { WaitlistFieldErrors } from '@/lib/waitlist-schema';

/** Wire contract between the form and `/api/waitlist`. */
export type WaitlistApiResponse =
  | {
      status: 'success';
      delivery: {
        adapter: WaitlistAdapterName;
        persisted: boolean;
        /** `true` when the success is simulated and nothing was delivered. */
        simulated: boolean;
      };
    }
  | { status: 'invalid'; errors: WaitlistFieldErrors }
  | { status: 'duplicate' }
  | { status: 'rate-limited'; retryAfterSeconds: number }
  | { status: 'error' };
