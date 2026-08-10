import styles from './BrandStroke.module.css';

/**
 * The controlled aesthetic risk: a single oversized, very-low-opacity version
 * of the brand stroke crossing the hero composition. Decorative only, and used
 * exactly once on the page so the rest stays contained.
 */
export function BrandStroke() {
  return (
    <div className={styles.stroke} aria-hidden="true">
      <svg viewBox="0 0 200 200" focusable="false" role="presentation">
        <path
          d="M14 168c0-58 30-92 86-92s86 34 86 92M14 168c26 0 38-20 38-47s14-52 38-52 38 25 38 52 12 47 38 47"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="42" r="13" fill="currentColor" />
      </svg>
    </div>
  );
}
