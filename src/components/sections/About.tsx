import { ReviewFlag } from '@/components/review/ReviewFlag';
import { projectConfig } from '@/config/project.config';
import styles from './sections.module.css';

export function About() {
  const block = projectConfig.content.about[0];
  if (!block) return null;

  return (
    <section id={block.id} className={`section ${styles.about}`} aria-labelledby="sobre-title">
      <div className={`container ${styles.aboutInner}`}>
        <div className={styles.aboutHeading}>
          {block.eyebrow ? (
            <span className="section-eyebrow">{block.eyebrow.value}</span>
          ) : null}
          {block.title ? (
            <h2 id="sobre-title" className="section-title">
              {block.title.value}
              <ReviewFlag text={block.title} />
            </h2>
          ) : null}
        </div>

        <div className={styles.aboutBody}>
          <div className="prose">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph.value.slice(0, 32)}>{paragraph.value}</p>
            ))}
          </div>

          {block.highlight ? (
            <blockquote className={styles.pullQuote}>
              <p>{block.highlight.value}</p>
            </blockquote>
          ) : null}
        </div>
      </div>
    </section>
  );
}
