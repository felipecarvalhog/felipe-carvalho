import { ReviewFlag } from '@/components/review/ReviewFlag';
import type { LegalPage } from '@/config/types';
import styles from './LegalArticle.module.css';

export function LegalArticle({ page }: { page: LegalPage }) {
  return (
    <article className={`section ${styles.article}`}>
      <div className="container-text">
        <header className={styles.header}>
          <h1>{page.title.value}</h1>
          <p className={styles.description}>{page.description.value}</p>
          <p className={styles.status}>
            {page.lastReviewed.value}
            <ReviewFlag text={page.lastReviewed} />
          </p>
        </header>

        <div className="prose">
          {page.sections.map((section) => (
            <section key={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>{section.heading.value}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.value.slice(0, 32)}>
                  {paragraph.value}
                  <ReviewFlag text={paragraph} />
                </p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet.value.slice(0, 32)}>
                      {bullet.value}
                      <ReviewFlag text={bullet} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
