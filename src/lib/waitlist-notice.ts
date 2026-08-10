import type { ManagedText, WaitlistContent } from '@/config/types';

/**
 * Which notice to show when the waiting list is closed.
 *
 * The approved copy (`WL-CLOSED`) points people at Instagram, so it may only be
 * used once that URL exists. Without it the sentence would advertise a channel
 * the visitor cannot reach, so the channel-free variant (`WL-CLOSED-ALT`) takes
 * over. See CONTENT.md §9.1.
 */

export type ClosedNotice = {
  readonly text: ManagedText;
  /** Present only when the notice is allowed to cite the channel. */
  readonly instagramUrl?: string;
};

type ClosedNoticeCopy = Pick<
  WaitlistContent,
  'closedNotice' | 'closedNoticeNoChannel'
>;

export const resolveClosedNotice = (
  copy: ClosedNoticeCopy,
  instagramUrl: string | undefined,
): ClosedNotice =>
  instagramUrl
    ? { text: copy.closedNotice, instagramUrl }
    : { text: copy.closedNoticeNoChannel };
