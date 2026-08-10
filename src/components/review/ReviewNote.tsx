import { isReviewMode } from '@/config/public-env';
import styles from './review.module.css';

type ReviewNoteProps = {
  title: string;
  children?: React.ReactNode;
};

/** Block-level, explicitly labelled placeholder for something still pending. */
export function ReviewNote({ title, children }: ReviewNoteProps) {
  if (!isReviewMode) return null;

  return (
    <div className={styles.note} role="note">
      <p className={styles.noteTitle}>
        <span aria-hidden="true">◆</span> Pendente · {title}
      </p>
      {children ? <div className={styles.noteBody}>{children}</div> : null}
    </div>
  );
}
