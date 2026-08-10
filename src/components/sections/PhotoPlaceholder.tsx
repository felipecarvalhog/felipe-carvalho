import Image from 'next/image';
import { isReviewMode } from '@/config/public-env';
import type { AssetRef, ManagedText } from '@/config/types';
import styles from './sections.module.css';

type PhotoPlaceholderProps = {
  photo: AssetRef | null;
  displayName: string;
  profession: string;
  label: ManagedText;
  /**
   * Gates the six-dot micro detail that nods to the Progress Pride flag. It
   * stays off until the professional explicitly authorises the reference.
   */
  prideReferenceApproved: boolean;
};

/**
 * The hero portrait slot.
 *
 * Renders the authorised portrait when configured. The abstract composition is
 * retained as a deliberate fallback for review environments without an asset.
 */
export function PhotoPlaceholder({
  photo,
  displayName,
  profession,
  label,
  prideReferenceApproved,
}: PhotoPlaceholderProps) {
  if (photo) {
    return (
      <figure className={styles.photoFrame}>
        <Image
          className={styles.photo}
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt ?? `${displayName}, ${profession}`}
          priority
          sizes="(min-width: 64rem) 24rem, 60vw"
        />
      </figure>
    );
  }

  return (
    <div className={styles.photoFrame}>
      <div className={styles.photoAbstract} aria-hidden="true">
        <svg viewBox="0 0 320 400" focusable="false" role="presentation">
          <defs>
            <linearGradient id="hero-abstract" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--brand-mist)" />
              <stop offset="100%" stopColor="var(--brand-lavender-blue)" />
            </linearGradient>
          </defs>
          <rect width="320" height="400" rx="24" fill="url(#hero-abstract)" />
          <g
            fill="none"
            stroke="var(--brand-cobalt)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.5"
          >
            <path d="M40 344c0-96 44-150 120-150s120 54 120 150" />
            <path d="M40 344c40 0 60-32 60-76s22-84 60-84 60 40 60 84 20 76 60 76" />
            <path d="M76 344c0-72 30-112 84-112s84 40 84 112" />
          </g>
          <circle cx="160" cy="120" r="16" fill="var(--brand-cobalt)" opacity="0.65" />
          {/* The six dots of the mark, in their measured colours. Purely
              decorative: the commitment itself is stated in words in the
              LGBTQIA+ section, never by colour alone. */}
          {prideReferenceApproved ? (
            <g>
              <circle cx="112" cy="372" r="4" fill="var(--brand-dot-1)" />
              <circle cx="131" cy="372" r="4" fill="var(--brand-dot-2)" />
              <circle cx="150" cy="372" r="4" fill="var(--brand-dot-3)" />
              <circle cx="169" cy="372" r="4" fill="var(--brand-dot-4)" />
              <circle cx="188" cy="372" r="4" fill="var(--brand-dot-5)" />
              <circle cx="207" cy="372" r="4" fill="var(--brand-dot-6)" />
            </g>
          ) : null}
        </svg>
      </div>

      {isReviewMode ? (
        <p className={styles.photoLabel}>
          <span aria-hidden="true">◆</span> {label.value}
        </p>
      ) : null}
    </div>
  );
}
