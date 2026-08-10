import Link from 'next/link';
import { BrandLockup } from '@/components/brand/BrandLockup';
import { ReviewNote } from '@/components/review/ReviewNote';
import { projectConfig } from '@/config/project.config';
import { getBrandAsset } from '@/config/brand-assets';
import { fill } from '@/lib/managed-text';
import { resolveAsset } from '@/lib/public-assets';
import { buildWhatsappUrl } from '@/lib/whatsapp';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const { professional, contact, content, hudiPages } = projectConfig;
  const footer = content.footer;

  const logo = resolveAsset(
    getBrandAsset('logoHorizontalWhite') ?? getBrandAsset('logoHorizontalNegative'),
  );
  const whatsappUrl = buildWhatsappUrl(
    contact.whatsappNumber,
    contact.whatsappMessage,
  );
  const hasChannels = Boolean(contact.instagramUrl || whatsappUrl);

  return (
    <footer className={`${styles.footer} on-deep`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <BrandLockup
            asset={logo}
            displayName={professional.displayName}
            profession={professional.profession}
            registration={professional.registration}
            tone="deep"
          />
          <p className={styles.identification}>{footer.identification.value}</p>
          {professional.locationLabel ? (
            <p className={styles.location}>{professional.locationLabel.value}</p>
          ) : null}
        </div>

        <div className={styles.columns}>
          {hasChannels ? (
            <nav className={styles.column} aria-label="Canais de contato">
              <h2 className={styles.columnTitle}>Contato</h2>
              <ul className={styles.linkList}>
                {contact.instagramUrl ? (
                  <li>
                    <a
                      className={styles.link}
                      href={contact.instagramUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Instagram
                    </a>
                  </li>
                ) : null}
                {whatsappUrl ? (
                  <li>
                    <a
                      className={styles.link}
                      href={whatsappUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          ) : null}

          <nav className={styles.column} aria-label="Documentos legais">
            <h2 className={styles.columnTitle}>Informações</h2>
            <ul className={styles.linkList}>
              {footer.legalLinks.map((item) => (
                <li key={item.id}>
                  <Link className={styles.link} href={item.href}>
                    {item.label.value}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.notice} role="note">
          <h2 className={styles.columnTitle}>Este não é um canal de emergência</h2>
          <p className={styles.noticeText}>{footer.emergencyNotice.value}</p>
          <p className={styles.noticeText}>{footer.emergencyPending.value}</p>
          <ReviewNote title="Contatos de emergência">
            <p>
              Nenhum telefone de crise é publicado enquanto os canais oficiais não
              forem validados. Este bloco fica reservado para eles.
            </p>
          </ReviewNote>
        </div>

        <div className={styles.baseline}>
          <p className={styles.copyright}>
            {fill(footer.copyright, { ano: new Date().getFullYear() })}
          </p>
          {hudiPages.showCredit ? (
            <p className={styles.credit}>
              {hudiPages.creditUrl ? (
                <a
                  className={styles.link}
                  href={hudiPages.creditUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {footer.credit.value}
                </a>
              ) : (
                footer.credit.value
              )}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
