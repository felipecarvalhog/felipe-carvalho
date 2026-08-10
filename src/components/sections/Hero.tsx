import { BrandStroke } from '@/components/brand/BrandStroke';
import { ReviewFlag } from '@/components/review/ReviewFlag';
import { projectConfig } from '@/config/project.config';
import { resolveAsset } from '@/lib/public-assets';
import { PhotoPlaceholder } from './PhotoPlaceholder';
import styles from './sections.module.css';

export function Hero() {
  const { professional, content } = projectConfig;
  const hero = content.hero;
  const photo = resolveAsset(professional.photo);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <BrandStroke />

      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroText}>
          <p className={styles.heroEyebrow}>{hero.eyebrow.value}</p>

          <h1 id="hero-title" className={styles.heroTitle}>
            {hero.title.value}
          </h1>

          <p className={styles.heroSubheadline}>{hero.subheadline.value}</p>

          <div className={styles.heroCtas}>
            <a className="btn btn-primary" href="#lista-de-espera">
              {hero.primaryCta.value}
            </a>
            <a className="btn btn-secondary" href="#sobre">
              {hero.secondaryCta.value}
            </a>
          </div>

          <ul className={styles.trustList} aria-label="Informações rápidas sobre o atendimento">
            {hero.trustSignals.map((signal) => (
              <li key={signal.id} className={styles.trustItem}>
                <span className={styles.trustDot} aria-hidden="true" />
                {signal.label.value}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.heroAside}>
          <PhotoPlaceholder
            photo={photo}
            displayName={professional.displayName}
            profession={professional.profession}
            label={hero.photoPlaceholderLabel}
            prideReferenceApproved={
              projectConfig.brand.progressPrideReferenceApproved
            }
          />
          <ReviewFlag text={hero.photoPlaceholderLabel} />
        </div>
      </div>
    </section>
  );
}
