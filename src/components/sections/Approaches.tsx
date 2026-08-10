import { ReviewFlag } from '@/components/review/ReviewFlag';
import { projectConfig } from '@/config/project.config';
import styles from './sections.module.css';

export function Approaches() {
  const { block, items, synthesis } = projectConfig.content.approaches;

  return (
    <section
      id={block.id}
      className={`section ${styles.approaches}`}
      aria-labelledby="como-trabalho-title"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          {block.eyebrow ? (
            <span className="section-eyebrow">{block.eyebrow.value}</span>
          ) : null}
          {block.title ? (
            <h2 id="como-trabalho-title" className="section-title">
              {block.title.value}
              <ReviewFlag text={block.title} />
            </h2>
          ) : null}
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph.value.slice(0, 32)} className="section-lede">
              {paragraph.value}
              <ReviewFlag text={paragraph} />
            </p>
          ))}
        </div>

        <ul className={styles.approachGrid}>
          {items.map((item, index) => (
            <li key={item.id} className={styles.approachCard}>
              <span className={styles.approachIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.title ? <h3>{item.title.value}</h3> : null}
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph.value.slice(0, 32)}>{paragraph.value}</p>
              ))}
            </li>
          ))}
        </ul>

        <p className={styles.synthesis}>{synthesis.value}</p>
      </div>
    </section>
  );
}
