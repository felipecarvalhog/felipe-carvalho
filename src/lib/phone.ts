/**
 * Brazilian phone helpers.
 *
 * The mask is derived from the digits of whatever the field contains, so
 * pasting a number in any format (+55 81 97313-5461, 081973135461, …) always
 * works — nothing is ever rejected while typing.
 */

const DDD_MIN = 11;
const DDD_MAX = 99;

export const extractDigits = (value: string): string => value.replace(/\D+/g, '');

/**
 * Strips the +55 country code and any trunk prefix, returning the 10 or 11
 * national digits, or `null` when the input cannot be a Brazilian number.
 */
export const toNationalDigits = (value: string): string | null => {
  let digits = extractDigits(value);

  if (digits.length > 11 && digits.startsWith('55')) {
    digits = digits.slice(2);
  }
  // Long-distance trunk prefix, e.g. 0 81 9…
  if (digits.length === 12 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  if (digits.length !== 10 && digits.length !== 11) return null;

  const ddd = Number.parseInt(digits.slice(0, 2), 10);
  if (Number.isNaN(ddd) || ddd < DDD_MIN || ddd > DDD_MAX) return null;

  // 11 digits means a mobile line, which must start with 9.
  if (digits.length === 11 && digits[2] !== '9') return null;
  // 10 digits means a landline, whose first digit is 2–5.
  if (digits.length === 10 && !/[2-5]/.test(digits[2] ?? '')) return null;

  return digits;
};

/** Canonical storage format: `+55DDDNNNNNNNN`. */
export const normalizeBrazilianPhone = (value: string): string | null => {
  const national = toNationalDigits(value);
  return national ? `+55${national}` : null;
};

export const isValidBrazilianPhone = (value: string): boolean =>
  normalizeBrazilianPhone(value) !== null;

/** Progressive display mask. Always returns something, never throws. */
export const formatBrazilianPhone = (value: string): string => {
  let digits = extractDigits(value);

  if (digits.length > 11 && digits.startsWith('55')) {
    digits = digits.slice(2);
  }
  digits = digits.slice(0, 11);

  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (rest.length <= 4) return `(${ddd}) ${rest}`;

  const splitAt = rest.length > 8 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`;
};
