import Image from 'next/image';
import type { AssetRef } from '@/config/types';
import styles from './BrandLockup.module.css';

type BrandLockupProps = {
  /** Resolved logo file, or `null` when the file is not on disk yet. */
  asset: AssetRef | null;
  displayName: string;
  profession: string;
  registration: string;
  tone?: 'light' | 'deep';
  size?: 'sm' | 'md';
  /** Renders the registration line. Off in tight spots like the sticky header. */
  showRegistration?: boolean;
  priority?: boolean;
};

/**
 * The brand mark, with an accessible text fallback.
 *
 * The logo files are produced by a separate pipeline; until they exist the
 * lockup is set in type rather than faked with a placeholder image.
 * Brand images are rendered unoptimized: they are already optimised upstream
 * and may be SVG, which the image optimiser refuses to process.
 */
export function BrandLockup({
  asset,
  displayName,
  profession,
  registration,
  tone = 'light',
  size = 'md',
  showRegistration = true,
  priority = false,
}: BrandLockupProps) {
  const toneClass = tone === 'deep' ? styles.deep : styles.light;
  const sizeClass = size === 'sm' ? styles.sm : styles.md;

  if (asset) {
    return (
      <Image
        className={`${styles.image} ${sizeClass}`}
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={asset.alt ?? `${displayName} — ${profession}`}
        priority={priority}
        unoptimized
      />
    );
  }

  return (
    <span className={`${styles.lockup} ${toneClass} ${sizeClass}`}>
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 40 40" focusable="false" role="presentation">
          {/* One continuous stroke: thought turning into connection. */}
          <path
            d="M8 30c0-9 5-14 12-14s12 5 12 14M8 30c4 0 6-3 6-7s2-8 6-8 6 4 6 8 2 7 6 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="9" r="2.4" fill="currentColor" />
        </svg>
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{displayName}</span>
        <span className={styles.role}>
          {showRegistration ? `${profession} · ${registration}` : profession}
        </span>
      </span>
    </span>
  );
}
