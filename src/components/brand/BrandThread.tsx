import styles from './BrandThread.module.css';

/**
 * Signature graphic: the continuous stroke of the brand symbol, stretched into
 * a single thin thread that visually links hero → approaches → CTA.
 *
 * Purely decorative (`aria-hidden`, no pointer events). The draw-in animation
 * runs once, slowly, and is switched off entirely under
 * `prefers-reduced-motion`.
 */
export function BrandThread() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        focusable="false"
        role="presentation"
      >
        <path
          className={styles.path}
          pathLength={1}
          d="M 80 8 C 80 84 20 104 20 196 S 84 300 84 404 S 16 520 16 640 S 78 738 70 856 S 38 936 52 998"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
