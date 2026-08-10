import styles from './SkipLink.module.css';

/** First focusable element on every page. */
export function SkipLink({ label, targetId }: { label: string; targetId: string }) {
  return (
    <a className={styles.skipLink} href={`#${targetId}`}>
      {label}
    </a>
  );
}
