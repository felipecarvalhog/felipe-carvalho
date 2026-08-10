import { ReviewFlag } from '@/components/review/ReviewFlag';
import { projectConfig } from '@/config/project.config';
import styles from './sections.module.css';

const EXPERIENCE_PREFIX = 'lgbtq-experiencia';

export function LgbtqCommitment() {
  const blocks = projectConfig.content.lgbtqCommitment;
  const intro = blocks.find((block) => !block.id.startsWith(EXPERIENCE_PREFIX));
  const experiences = blocks.filter((block) => block.id.startsWith(EXPERIENCE_PREFIX));

  if (!intro) return null;

  return (
    <section
      id="compromisso"
      className={`section ${styles.commitment}`}
      aria-labelledby="compromisso-title"
    >
      <div className={`container ${styles.commitmentInner}`}>
        <div className={styles.sectionHeader}>
          {intro.eyebrow ? (
            <span className="section-eyebrow">{intro.eyebrow.value}</span>
          ) : null}
          {intro.title ? (
            <h2 id="compromisso-title" className="section-title">
              {intro.title.value}
              <ReviewFlag text={intro.title} />
            </h2>
          ) : null}
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph.value.slice(0, 32)} className="section-lede">
              {paragraph.value}
            </p>
          ))}
        </div>

        {/* An editorial list, not a timeline: no dates or sequence were confirmed. */}
        <ul className={styles.experienceList}>
          {experiences.map((experience) => (
            <li key={experience.id} className={styles.experienceItem}>
              {experience.title ? <h3>{experience.title.value}</h3> : null}
              {experience.paragraphs.map((paragraph) => (
                <p key={paragraph.value.slice(0, 32)}>{paragraph.value}</p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
