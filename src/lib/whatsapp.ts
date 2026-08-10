import { extractDigits } from './phone';

/**
 * Builds a wa.me link carrying ONLY the neutral message configured by the
 * professional. Form answers must never be placed in this URL: a link is not
 * a secure channel, and URL encoding is not encryption.
 */
export const buildWhatsappUrl = (
  whatsappNumber: string | undefined,
  message: string | undefined,
): string | null => {
  if (!whatsappNumber) return null;

  const digits = extractDigits(whatsappNumber);
  if (digits.length < 10) return null;

  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
};
