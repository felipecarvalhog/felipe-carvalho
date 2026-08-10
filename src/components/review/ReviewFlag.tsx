import { isReviewMode } from '@/config/public-env';
import type { ManagedText } from '@/config/types';
import styles from './review.module.css';

/**
 * Inline "a confirmar" marker. Rendered only in review mode, and never as the
 * sole indicator — it carries a shape, a label and a screen-reader note.
 */
export function ReviewFlag({ text }: { text: ManagedText }) {
  if (!isReviewMode || text.status !== 'a-confirmar') return null;

  return (
    <span className={styles.flag}>
      <span aria-hidden="true">◆</span> a confirmar
      {text.note ? <span className="visually-hidden">: {text.note}</span> : null}
    </span>
  );
}
