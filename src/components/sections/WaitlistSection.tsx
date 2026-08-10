import { ReviewNote } from '@/components/review/ReviewNote';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { projectConfig } from '@/config/project.config';
import { resolveClosedNotice } from '@/lib/waitlist-notice';
import styles from './sections.module.css';

const PRIVACY_HREF = '/politica-de-privacidade';

export function WaitlistSection() {
  const { service, content, contact, privacy } = projectConfig;
  const copy = content.waitlist;
  const isClosed = service.availabilityStatus === 'waitlist-closed';
  const closed = resolveClosedNotice(copy, contact.instagramUrl);

  return (
    <section
      id="lista-de-espera"
      className={`section ${styles.waitlist}`}
      aria-labelledby="lista-de-espera-title"
    >
      <div className={`container ${styles.waitlistInner}`}>
        <div className={styles.waitlistIntro}>
          <h2 id="lista-de-espera-title" className="section-title">
            {copy.title.value}
          </h2>

          {isClosed ? (
            <>
              <p className="section-lede">{closed.text.value}</p>
              {closed.instagramUrl ? (
                <a
                  className="btn btn-secondary"
                  href={closed.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              ) : null}
            </>
          ) : (
            <p className="section-lede">{copy.intro.value}</p>
          )}

          <ReviewNote title="Campos sensíveis desativados por padrão">
            <p>
              Perguntas clínicas (motivo da busca, terapia anterior, sintomas,
              diagnóstico, identidade de gênero, orientação sexual, medicação,
              histórico de saúde) estão desligadas por design:
              <code> privacy.sensitiveFieldsEnabled = {String(privacy.sensitiveFieldsEnabled)}</code>.
              Este formulário é um contato, não uma triagem.
            </p>
          </ReviewNote>
        </div>

        {isClosed ? null : (
          <div className={styles.waitlistCard}>
            <WaitlistForm copy={copy} privacyHref={PRIVACY_HREF} />
          </div>
        )}
      </div>
    </section>
  );
}
