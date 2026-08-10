import type { ManagedText } from '@/config/types';

/** Reads the string out of a managed piece of copy. */
export const t = (text: ManagedText): string => text.value;

export const isPending = (text: ManagedText): boolean =>
  text.status === 'a-confirmar';

/** Replaces `{ano}` style placeholders without pulling in a template library. */
export const fill = (
  text: ManagedText,
  values: Readonly<Record<string, string | number>>,
): string =>
  Object.entries(values).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    text.value,
  );
