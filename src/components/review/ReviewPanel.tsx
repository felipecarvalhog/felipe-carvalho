import { isReviewMode } from '@/config/public-env';
import { collectMissingItems, collectPendingCopy } from '@/lib/review-audit';
import styles from './review.module.css';

/**
 * One consolidated list of everything still awaiting the professional's
 * confirmation. Collapsed by default so it never competes with the content.
 */
export function ReviewPanel() {
  if (!isReviewMode) return null;

  const pendingCopy = collectPendingCopy();
  const missing = collectMissingItems();
  const total = pendingCopy.length + missing.length;

  return (
    <aside className={styles.panel} aria-labelledby="review-panel-title">
      <div className="container">
        <details className={styles.details}>
          <summary className={styles.summary}>
            <span id="review-panel-title">
              Modo de revisão ativo — {total} itens pendentes de confirmação
            </span>
          </summary>

          <div className={styles.panelBody}>
            <p className={styles.panelIntro}>
              Este painel só aparece com <code>NEXT_PUBLIC_REVIEW_MODE=true</code> e
              deve ser desligado antes da publicação. Nada aqui é visível para o
              público final.
            </p>

            <h2 className={styles.panelHeading}>
              Itens ausentes ou não definidos ({missing.length})
            </h2>
            <ul className={styles.panelList}>
              {missing.map((item) => (
                <li key={item.path}>
                  <strong>{item.value}</strong>
                  {item.note ? <span> — {item.note}</span> : null}
                  <code className={styles.panelPath}>{item.path}</code>
                </li>
              ))}
            </ul>

            <h2 className={styles.panelHeading}>
              Textos aguardando aprovação ({pendingCopy.length})
            </h2>
            <ul className={styles.panelList}>
              {pendingCopy.map((item) => (
                <li key={item.path}>
                  <strong>&ldquo;{item.value}&rdquo;</strong>
                  {item.note ? <span> — {item.note}</span> : null}
                  <code className={styles.panelPath}>{item.path}</code>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </aside>
  );
}
