import type { ManagedText } from '@/config/types';

/** Copy approved by the professional, or a fact confirmed in the briefing. */
export const confirmed = (value: string): ManagedText => ({
  value,
  status: 'confirmado',
});

/**
 * Copy written by the studio that still needs the professional's approval, or
 * a fact that has not been confirmed. `note` is shown in review mode.
 */
export const pending = (value: string, note: string): ManagedText => ({
  value,
  status: 'a-confirmar',
  note,
});
