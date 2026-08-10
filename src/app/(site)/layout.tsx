import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { ReviewPanel } from '@/components/review/ReviewPanel';
import { getBrandAsset } from '@/config/brand-assets';
import { projectConfig } from '@/config/project.config';
import { resolveAsset } from '@/lib/public-assets';

export const MAIN_CONTENT_ID = 'conteudo';

/**
 * Shell for every public page. The private wizard deliberately does not use it.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const { professional, content } = projectConfig;

  // Logo files are produced by a separate pipeline; `resolveAsset` returns null
  // until they physically exist, and the lockup falls back to text.
  const horizontalLogo = resolveAsset(getBrandAsset('logoHorizontalColor'));
  const symbolLogo = resolveAsset(getBrandAsset('symbol'));

  return (
    <>
      <SkipLink label={content.skipLinkLabel.value} targetId={MAIN_CONTENT_ID} />
      <ReviewPanel />
      <SiteHeader
        horizontalLogo={horizontalLogo}
        symbolLogo={symbolLogo}
        displayName={professional.displayName}
        profession={professional.profession}
        registration={professional.registration}
        nav={content.nav}
        cta={content.headerCta}
        ctaHref="/#lista-de-espera"
        homeHref="/"
      />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
