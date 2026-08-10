import { ReviewFlag } from '@/components/review/ReviewFlag';
import { projectConfig } from '@/config/project.config';
import styles from './sections.module.css';

export function HowItWorks() {
  const { block, steps, notes } = projectConfig.content.howItWorks;

  return (
    <section
      id={block.id}
      className={`section ${styles.howItWorks}`}
      aria-labelledby="atendimento-title"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          {block.eyebrow ? (
            <span className="section-eyebrow">{block.eyebrow.value}</span>
          ) : null}
          {block.title ? (
            <h2 id="atendimento-title" className="section-title">
              {block.title.value}
              <ReviewFlag text={block.title} />
            </h2>
          ) : null}
        </div>

        <ol className={styles.stepList}>
          {steps.map((step, index) => (
            <li key={step.id} className={styles.stepItem}>
              <span className={styles.stepNumber} aria-hidden="true">
                {index + 1}
              </span>
              <div className={styles.stepBody}>
                <h3>
                  <span className="visually-hidden">Passo {index + 1}: </span>
                  {step.title.value}
                </h3>
                <p>{step.description.value}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.notesCard}>
          <h3 className={styles.notesTitle}>O que é importante saber</h3>
          <ul className={styles.notesList}>
            {notes.map((note) => (
              <li key={note.value.slice(0, 32)}>{note.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
