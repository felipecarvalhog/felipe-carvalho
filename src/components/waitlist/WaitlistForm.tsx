'use client';

import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import type { WaitlistContent } from '@/config/types';
import { formatBrazilianPhone } from '@/lib/phone';
import {
  collectFieldErrors,
  waitlistSchema,
  type WaitlistFieldErrors,
} from '@/lib/waitlist-schema';
import type { WaitlistApiResponse } from '@/lib/waitlist/api-types';
import styles from './WaitlistForm.module.css';

type FormState =
  | 'idle'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error'
  | 'duplicate'
  | 'offline';

type Delivery = { adapter: string; persisted: boolean; simulated: boolean };

type WaitlistFormProps = {
  copy: WaitlistContent;
  privacyHref: string;
  endpoint?: string;
};

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  contactPreference: '',
  availability: '',
  referral: '',
  consent: false,
  website: '',
};

type Values = typeof initialValues;

const FIELD_ORDER: Array<keyof Values> = [
  'fullName',
  'email',
  'phone',
  'contactPreference',
  'availability',
  'referral',
  'consent',
];

export function WaitlistForm({
  copy,
  privacyHref,
  endpoint = '/api/waitlist',
}: WaitlistFormProps) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<WaitlistFieldErrors>({});
  const [state, setState] = useState<FormState>('idle');
  const [delivery, setDelivery] = useState<Delivery | null>(null);

  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const busy = state === 'validating' || state === 'submitting';

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;
  const hintId = (name: string) => `${formId}-${name}-hint`;

  const describedBy = (name: keyof Values, hasHint: boolean) =>
    [hasHint ? hintId(name) : null, errors[name] ? errorId(name) : null]
      .filter(Boolean)
      .join(' ') || undefined;

  const update = <K extends keyof Values>(name: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  };

  const focusFirstError = (fieldErrors: WaitlistFieldErrors) => {
    const first = FIELD_ORDER.find((name) => fieldErrors[name]);
    if (!first) return;
    const node = formRef.current?.querySelector<HTMLElement>(
      `[name="${first}"]`,
    );
    node?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    setState('validating');
    setDelivery(null);

    const candidate = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      contactPreference: values.contactPreference,
      availability: values.availability,
      referral: values.referral,
      consent: values.consent,
      website: values.website,
    };

    const parsed = waitlistSchema.safeParse(candidate);

    if (!parsed.success) {
      const fieldErrors = collectFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setState('idle');
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setState('offline');
      return;
    }

    setState('submitting');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const body = (await response.json().catch(() => null)) as
        | WaitlistApiResponse
        | null;

      if (response.ok && body?.status === 'success') {
        setDelivery(body.delivery);
        setState('success');
        window.setTimeout(() => successRef.current?.focus(), 0);
        return;
      }

      if (body?.status === 'duplicate') {
        setState('duplicate');
        return;
      }

      if (body?.status === 'invalid') {
        setErrors(body.errors);
        setState('idle');
        focusFirstError(body.errors);
        return;
      }

      if (body?.status === 'rate-limited') {
        setErrors({ form: copy.rateLimitedMessage.value });
        setState('error');
        return;
      }

      setState('error');
    } catch {
      setState(
        typeof navigator !== 'undefined' && navigator.onLine === false
          ? 'offline'
          : 'error',
      );
    }
  };

  if (state === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className={styles.success}
        role="status"
        aria-live="polite"
      >
        <p className={styles.successTitle}>
          <span className={styles.successGlyph} aria-hidden="true">
            ✓
          </span>
          {copy.successTitle.value}
        </p>
        <p className={styles.successMessage}>{copy.successMessage.value}</p>
        <ul className={styles.successList}>
          {copy.successNextSteps.map((step) => (
            <li key={step.value.slice(0, 32)}>{step.value}</li>
          ))}
        </ul>

        {delivery?.simulated ? (
          <p className={styles.mockNotice}>
            <span aria-hidden="true">◆</span> {copy.mockNotice.value}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      data-state={state}
    >
      {/* Single polite live region: state changes are announced without
          stealing focus from whatever the person is doing. */}
      <div aria-live="polite" className={styles.statusRegion}>
        {state === 'duplicate' ? (
          <p className={styles.infoBanner}>{copy.duplicateMessage.value}</p>
        ) : null}
        {state === 'offline' ? (
          <p className={styles.errorBanner}>{copy.offlineMessage.value}</p>
        ) : null}
        {state === 'error' ? (
          <p className={styles.errorBanner}>
            {errors.form ?? copy.errorMessage.value}
          </p>
        ) : null}
        {Object.keys(errors).some((key) => key !== 'form') ? (
          <p className={styles.errorBanner}>{copy.validationSummary.value}</p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={fieldId('fullName')}>
          {copy.fields.fullName.label.value}
          <span className={styles.required}>
            {' '}
            ({copy.requiredSuffix.value})
          </span>
        </label>
        {copy.fields.fullName.hint ? (
          <p className={styles.hint} id={hintId('fullName')}>
            {copy.fields.fullName.hint.value}
          </p>
        ) : null}
        <input
          className={styles.input}
          id={fieldId('fullName')}
          name="fullName"
          type="text"
          autoComplete="name"
          maxLength={120}
          value={values.fullName}
          onChange={(event) => update('fullName', event.target.value)}
          aria-required="true"
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={describedBy('fullName', Boolean(copy.fields.fullName.hint))}
        />
        {errors.fullName ? (
          <p className={styles.error} id={errorId('fullName')}>
            <span aria-hidden="true">!</span> {errors.fullName}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={fieldId('email')}>
          {copy.fields.email.label.value}
          <span className={styles.required}>
            {' '}
            ({copy.requiredSuffix.value})
          </span>
        </label>
        {copy.fields.email.hint ? (
          <p className={styles.hint} id={hintId('email')}>
            {copy.fields.email.hint.value}
          </p>
        ) : null}
        <input
          className={styles.input}
          id={fieldId('email')}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={180}
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy('email', Boolean(copy.fields.email.hint))}
        />
        {errors.email ? (
          <p className={styles.error} id={errorId('email')}>
            <span aria-hidden="true">!</span> {errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={fieldId('phone')}>
          {copy.fields.phone.label.value}
          <span className={styles.optional}>
            {' '}
            ({copy.fields.phone.optionalSuffix?.value})
          </span>
        </label>
        {copy.fields.phone.hint ? (
          <p className={styles.hint} id={hintId('phone')}>
            {copy.fields.phone.hint.value}
          </p>
        ) : null}
        <input
          className={styles.input}
          id={fieldId('phone')}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          // The mask is derived from the digits, so pasting any format works.
          onChange={(event) => update('phone', formatBrazilianPhone(event.target.value))}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={describedBy('phone', Boolean(copy.fields.phone.hint))}
        />
        {errors.phone ? (
          <p className={styles.error} id={errorId('phone')}>
            <span aria-hidden="true">!</span> {errors.phone}
          </p>
        ) : null}
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          {copy.fields.contactPreference.label.value}
          <span className={styles.optional}>
            {' '}
            ({copy.fields.contactPreference.optionalSuffix?.value})
          </span>
        </legend>
        <div className={styles.choices}>
          <label className={styles.choice}>
            <input
              type="radio"
              name="contactPreference"
              value=""
              checked={values.contactPreference === ''}
              onChange={() => update('contactPreference', '')}
            />
            <span>{copy.noPreferenceLabel.value}</span>
          </label>
          {copy.contactPreferenceOptions.map((option) => (
            <label key={option.value} className={styles.choice}>
              <input
                type="radio"
                name="contactPreference"
                value={option.value}
                checked={values.contactPreference === option.value}
                onChange={() => update('contactPreference', option.value)}
              />
              <span>{option.label.value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          {copy.fields.availability.label.value}
          <span className={styles.optional}>
            {' '}
            ({copy.fields.availability.optionalSuffix?.value})
          </span>
        </legend>
        {copy.fields.availability.hint ? (
          <p className={styles.hint}>{copy.fields.availability.hint.value}</p>
        ) : null}
        <div className={styles.choices}>
          <label className={styles.choice}>
            <input
              type="radio"
              name="availability"
              value=""
              checked={values.availability === ''}
              onChange={() => update('availability', '')}
            />
            <span>{copy.noPreferenceLabel.value}</span>
          </label>
          {copy.availabilityOptions.map((option) => (
            <label key={option.value} className={styles.choice}>
              <input
                type="radio"
                name="availability"
                value={option.value}
                checked={values.availability === option.value}
                onChange={() => update('availability', option.value)}
              />
              <span>{option.label.value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={fieldId('referral')}>
          {copy.fields.referral.label.value}
          <span className={styles.optional}>
            {' '}
            ({copy.fields.referral.optionalSuffix?.value})
          </span>
        </label>
        <input
          className={styles.input}
          id={fieldId('referral')}
          name="referral"
          type="text"
          maxLength={280}
          value={values.referral}
          onChange={(event) => update('referral', event.target.value)}
          aria-invalid={errors.referral ? true : undefined}
          aria-describedby={describedBy('referral', false)}
        />
        {errors.referral ? (
          <p className={styles.error} id={errorId('referral')}>
            <span aria-hidden="true">!</span> {errors.referral}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from everyone, including screen readers and the
          keyboard. Anything typed here means the sender is a bot. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={fieldId('website')}>{copy.honeypotLabel.value}</label>
        <input
          id={fieldId('website')}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div className={styles.consentField}>
        <label className={styles.consentLabel} htmlFor={fieldId('consent')}>
          <input
            className={styles.checkbox}
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update('consent', event.target.checked)}
            aria-required="true"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy('consent', false)}
          />
          <span>
            {copy.consentLabel.value}
            <span className={styles.required}> ({copy.requiredSuffix.value})</span>
          </span>
        </label>
        <Link className={styles.policyLink} href={privacyHref}>
          {copy.consentLinkLabel.value}
        </Link>
        {errors.consent ? (
          <p className={styles.error} id={errorId('consent')}>
            <span aria-hidden="true">!</span> {errors.consent}
          </p>
        ) : null}
      </div>

      <button className={`btn btn-primary ${styles.submit}`} type="submit" disabled={busy}>
        {busy ? copy.submittingLabel.value : copy.submitLabel.value}
      </button>
    </form>
  );
}
