/**
 * Client-safe environment access.
 *
 * Only `NEXT_PUBLIC_*` variables may live here. They are read as static member
 * expressions so Next.js can inline them at build time.
 */

const DEFAULT_SITE_URL = 'http://localhost:3210';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, '');

export const waitlistEndpoint =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ||
  'http://localhost:8787/waitlist';

/**
 * Review mode surfaces explicit "pending" markers for everything the
 * professional still has to confirm. It must be off in production.
 */
export const isReviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE === 'true';

export const absoluteUrl = (path: string): string =>
  `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
