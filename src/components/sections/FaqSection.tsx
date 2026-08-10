import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { ReviewFlag } from '@/components/review/ReviewFlag';
import { ReviewNote } from '@/components/review/ReviewNote';
import { projectConfig } from '@/config/project.config';
import styles from './sections.module.css';

export function FaqSection() {
  const { faqBlock, faq } = projectConfig.content;

  return (
    <section
      id={faqBlock.id}
      className={`section ${styles.faq}`}
      aria-labelledby="duvidas-title"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          {faqBlock.eyebrow ? (
            <span className="section-eyebrow">{faqBlock.eyebrow.value}</span>
          ) : null}
          {faqBlock.title ? (
            <h2 id="duvidas-title" className="section-title">
              {faqBlock.title.value}
              <ReviewFlag text={faqBlock.title} />
            </h2>
          ) : null}
        </div>

        <FaqAccordion items={faq} />

        <ReviewNote title="Abrangência geográfica do atendimento on-line">
          <p>
            A pergunta &ldquo;de onde posso ser atendido?&rdquo; ainda não entrou no FAQ
            porque a abrangência do atendimento on-line não foi confirmada.
          </p>
        </ReviewNote>
      </div>
    </section>
  );
}
