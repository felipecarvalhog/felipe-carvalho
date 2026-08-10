import { z } from 'zod';
import { normalizeBrazilianPhone } from './phone';

/**
 * The one schema used by both the browser and the API route.
 *
 * Scope is deliberately minimal: this is a contact list, not clinical triage.
 * `.strict()` makes the server reject any extra key, so a future form change
 * cannot smuggle in symptoms, diagnosis, gender identity or health history.
 */

export const contactPreferenceValues = ['whatsapp', 'email'] as const;
export const availabilityValues = ['manha', 'tarde', 'noite'] as const;

export type ContactPreference = (typeof contactPreferenceValues)[number];
export type AvailabilityWindow = (typeof availabilityValues)[number];

export const waitlistMessages = {
  fullName: 'Informe seu nome completo.',
  fullNameLong: 'Use no máximo 120 caracteres.',
  email: 'Informe um e-mail válido.',
  phone: 'Informe um telefone válido com DDD, por exemplo (81) 91234-5678.',
  contactPreference: 'Selecione uma das opções de contato.',
  availability: 'Selecione uma das opções de disponibilidade.',
  referralLong: 'Use no máximo 280 caracteres.',
  consent: 'É necessário concordar com a Política de Privacidade para continuar.',
} as const;

const emptyToUndefined = (value: unknown): unknown =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

export const waitlistSchema = z
  .object({
    fullName: z
      .string({ errorMap: () => ({ message: waitlistMessages.fullName }) })
      .trim()
      .min(3, waitlistMessages.fullName)
      .max(120, waitlistMessages.fullNameLong)
      // At least two words: enough to be a name, without validating identity.
      .refine((value) => /\p{L}{2,}(\s+\S+)+/u.test(value), waitlistMessages.fullName),

    email: z
      .string({ errorMap: () => ({ message: waitlistMessages.email }) })
      .trim()
      .min(1, waitlistMessages.email)
      .max(180, waitlistMessages.email)
      .email(waitlistMessages.email)
      .transform((value) => value.toLowerCase()),

    // Optional while WhatsApp is not confirmed as the operational channel.
    phone: z.preprocess(
      emptyToUndefined,
      z
        .string()
        .trim()
        .max(24, waitlistMessages.phone)
        .refine((value) => normalizeBrazilianPhone(value) !== null, waitlistMessages.phone)
        .transform((value) => normalizeBrazilianPhone(value) as string)
        .optional(),
    ),

    contactPreference: z.preprocess(
      emptyToUndefined,
      z
        .enum(contactPreferenceValues, {
          errorMap: () => ({ message: waitlistMessages.contactPreference }),
        })
        .optional(),
    ),

    availability: z.preprocess(
      emptyToUndefined,
      z
        .enum(availabilityValues, {
          errorMap: () => ({ message: waitlistMessages.availability }),
        })
        .optional(),
    ),

    referral: z.preprocess(
      emptyToUndefined,
      z.string().trim().max(280, waitlistMessages.referralLong).optional(),
    ),

    consent: z.literal(true, {
      errorMap: () => ({ message: waitlistMessages.consent }),
    }),

    /**
     * Honeypot. Real people never see this field, so anything in it means a
     * bot. It must VALIDATE (so the bot gets an ordinary-looking success) and
     * be filtered by the route instead — rejecting it here would tell the bot
     * exactly which field gave it away.
     */
    website: z.preprocess(emptyToUndefined, z.string().max(400).optional()),
  })
  .strict();

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type WaitlistPayload = z.output<typeof waitlistSchema>;

/** Field-keyed errors, ready to be attached to inputs via `aria-describedby`. */
export type WaitlistFieldErrors = Partial<
  Record<keyof WaitlistPayload | 'form', string>
>;

export const collectFieldErrors = (error: z.ZodError): WaitlistFieldErrors => {
  const errors: WaitlistFieldErrors = {};
  for (const issue of error.issues) {
    const key = (issue.path[0] as keyof WaitlistPayload | undefined) ?? 'form';
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
};
