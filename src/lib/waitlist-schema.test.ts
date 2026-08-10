// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { collectFieldErrors, waitlistSchema } from './waitlist-schema';

const validPayload = {
  fullName: 'Maria de Souza',
  email: 'Maria.Souza@Example.com',
  phone: '(81) 97313-5461',
  contactPreference: 'email',
  availability: 'manha',
  referral: 'Indicação de uma amiga',
  consent: true,
};

describe('waitlistSchema', () => {
  it('accepts a complete, valid payload', () => {
    const result = waitlistSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data.fullName).toBe('Maria de Souza');
    expect(result.data.email).toBe('maria.souza@example.com');
    expect(result.data.contactPreference).toBe('email');
    expect(result.data.availability).toBe('manha');
  });

  it('accepts a minimal payload without the optional fields', () => {
    const result = waitlistSchema.safeParse({
      fullName: 'João Alves',
      email: 'joao@example.com',
      consent: true,
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.phone).toBeUndefined();
    expect(result.data.contactPreference).toBeUndefined();
    expect(result.data.availability).toBeUndefined();
  });

  it('rejects an invalid e-mail with a field-specific message', () => {
    const result = waitlistSchema.safeParse({ ...validPayload, email: 'maria@' });

    expect(result.success).toBe(false);
    if (result.success) return;

    const errors = collectFieldErrors(result.error);
    expect(errors.email).toBe('Informe um e-mail válido.');
    expect(errors.fullName).toBeUndefined();
  });

  it('rejects a submission without consent', () => {
    const result = waitlistSchema.safeParse({ ...validPayload, consent: false });

    expect(result.success).toBe(false);
    if (result.success) return;

    const errors = collectFieldErrors(result.error);
    expect(errors.consent).toBe(
      'É necessário concordar com a Política de Privacidade para continuar.',
    );
  });

  it('rejects a submission with the consent field missing entirely', () => {
    const { consent: _consent, ...withoutConsent } = validPayload;
    const result = waitlistSchema.safeParse(withoutConsent);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(collectFieldErrors(result.error).consent).toBeDefined();
  });

  it.each([
    ['(81) 97313-5461', '+5581973135461'],
    ['81973135461', '+5581973135461'],
    ['+55 81 97313 5461', '+5581973135461'],
    ['55 (81) 97313-5461', '+5581973135461'],
    ['81 3231-4455', '+558132314455'],
  ])('normalises the phone %s to %s', (input, expected) => {
    const result = waitlistSchema.safeParse({ ...validPayload, phone: input });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.phone).toBe(expected);
  });

  it('treats an empty phone as absent rather than invalid', () => {
    const result = waitlistSchema.safeParse({ ...validPayload, phone: '   ' });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.phone).toBeUndefined();
  });

  it('rejects a phone that cannot be a Brazilian number', () => {
    const result = waitlistSchema.safeParse({ ...validPayload, phone: '123' });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(collectFieldErrors(result.error).phone).toContain('telefone válido');
  });

  it.each([
    'diagnostico',
    'sintomas',
    'medicacao',
    'historicoDeSaude',
    'identidadeDeGenero',
    'orientacaoSexual',
    'relatoClinico',
    'jaFezTerapia',
    'motivoDaBusca',
  ])('rejects the unexpected sensitive field "%s"', (field) => {
    const result = waitlistSchema.safeParse({
      ...validPayload,
      [field]: 'qualquer valor',
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues.some((issue) => issue.code === 'unrecognized_keys')).toBe(
      true,
    );
  });

  it('rejects any unexpected extra field, sensitive or not', () => {
    const result = waitlistSchema.safeParse({ ...validPayload, utmSource: 'ads' });
    expect(result.success).toBe(false);
  });

  it('lets a filled honeypot validate, so the bot is not told which field caught it', () => {
    const result = waitlistSchema.safeParse({
      ...validPayload,
      website: 'http://spam.example',
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.website).toBe('http://spam.example');
  });

  it('rejects an out-of-range option instead of silently dropping it', () => {
    const result = waitlistSchema.safeParse({
      ...validPayload,
      contactPreference: 'telegram',
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(collectFieldErrors(result.error).contactPreference).toBeDefined();
  });
});
