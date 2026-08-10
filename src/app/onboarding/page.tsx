import Link from 'next/link';
import { SkipLink } from '@/components/layout/SkipLink';
import { projectConfig } from '@/config/project.config';
import { OnboardingWizard } from './OnboardingWizard';
import styles from './onboarding.module.css';

const MAIN_ID = 'conteudo-onboarding';

export default function OnboardingPage() {
  const { professional } = projectConfig;

  return (
    <>
      <SkipLink label="Ir para o conteúdo" targetId={MAIN_ID} />

      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.kicker}>Documento interno de trabalho</p>
          <h1 className={styles.pageTitle}>
            Onboarding — {professional.displayName}
          </h1>
          <p className={styles.pageSubtitle}>
            Questionário de definição do site. Serve para transformar decisões em
            especificação, sem adivinhar nada.
          </p>
        </div>
      </header>

      <main id={MAIN_ID} tabIndex={-1}>
        <div className="container">
          <div className={styles.banner} role="note">
            <h2 className={styles.bannerTitle}>
              <span aria-hidden="true">◆</span> Protótipo sem autenticação
            </h2>
            <ul className={styles.bannerList}>
              <li>
                Esta página <strong>não tem login</strong>. Quem tiver o endereço
                consegue abri-la.
              </li>
              <li>
                As respostas ficam <strong>apenas neste navegador</strong>, em
                armazenamento local. Nada é enviado pela rede.
              </li>
              <li>
                <strong>Nada é publicado</strong> a partir daqui. O site público só
                muda quando as decisões forem aplicadas ao código.
              </li>
              <li>
                A página está marcada como <code>noindex, nofollow</code> e bloqueada
                no <code>robots.txt</code>.
              </li>
              <li>
                Se você limpar os dados do navegador ou usar outro dispositivo, as
                respostas somem. Exporte o JSON ou o Markdown ao terminar.
              </li>
            </ul>
          </div>

          <OnboardingWizard />

          <p className={styles.backLink}>
            <Link href="/">Voltar para o site público</Link>
          </p>
        </div>
      </main>
    </>
  );
}
