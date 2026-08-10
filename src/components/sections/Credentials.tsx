import { ReviewFlag } from '@/components/review/ReviewFlag';
import { projectConfig } from '@/config/project.config';
import type { Credential } from '@/config/types';
import styles from './sections.module.css';

/**
 * Concluded vs. ongoing must be distinguishable without colour: each state has
 * its own glyph, its own border treatment and its own written label.
 */
const statusPresentation = (credential: Credential) => {
  if (credential.kind === 'area-de-atuacao') {
    return {
      className: styles.credentialArea,
      glyph: '●',
      srLabel: 'Área de atuação',
    };
  }
  if (credential.status === 'concluida') {
    return {
      className: styles.credentialDone,
      glyph: '✓',
      srLabel: 'Concluída',
    };
  }
  return {
    className: styles.credentialOngoing,
    glyph: '◐',
    srLabel: 'Em andamento',
  };
};

export function Credentials() {
  const { credentialsBlock, credentials } = projectConfig.content;

  return (
    <section
      id={credentialsBlock.id}
      className={`section ${styles.credentials}`}
      aria-labelledby="formacao-title"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          {credentialsBlock.eyebrow ? (
            <span className="section-eyebrow">{credentialsBlock.eyebrow.value}</span>
          ) : null}
          {credentialsBlock.title ? (
            <h2 id="formacao-title" className="section-title">
              {credentialsBlock.title.value}
              <ReviewFlag text={credentialsBlock.title} />
            </h2>
          ) : null}
          {credentialsBlock.paragraphs.map((paragraph) => (
            <p key={paragraph.value.slice(0, 32)} className="section-lede">
              {paragraph.value}
              <ReviewFlag text={paragraph} />
            </p>
          ))}
        </div>

        <ul className={styles.credentialList}>
          {credentials.map((credential) => {
            const presentation = statusPresentation(credential);
            return (
              <li
                key={credential.id}
                className={`${styles.credentialItem} ${presentation.className}`}
              >
                <span className={styles.credentialGlyph} aria-hidden="true">
                  {presentation.glyph}
                </span>
                <span className={styles.credentialText}>
                  <span className={styles.credentialLabel}>{credential.label.value}</span>
                  <span className={styles.credentialDetail}>
                    <span className="visually-hidden">{presentation.srLabel}: </span>
                    {credential.detail.value}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
