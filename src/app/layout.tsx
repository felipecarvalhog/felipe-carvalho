import type { Metadata, Viewport } from 'next';
import { Manrope, Source_Sans_3 } from 'next/font/google';
import { getBrandAsset } from '@/config/brand-assets';
import { projectConfig } from '@/config/project.config';
import { isReviewMode, siteUrl } from '@/config/public-env';
import { resolveAsset } from '@/lib/public-assets';
import '@/styles/globals.css';

/**
 * Fonts are downloaded at build time and served from this origin. No runtime
 * request ever reaches Google — which is both a performance and an LGPD
 * decision, since a third-party font request would leak visitor IPs.
 */
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['500', '600', '700', '800'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
  weight: ['400', '600', '700'],
});

const { professional, content } = projectConfig;

const favicon = resolveAsset(getBrandAsset('favicon'));

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: content.seo.title.value,
    template: `%s · ${professional.displayName}`,
  },
  description: content.seo.description.value,
  applicationName: `${professional.displayName} — ${professional.profession}`,
  authors: [{ name: professional.fullName }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: `${professional.displayName} — ${professional.profession}`,
    title: content.seo.title.value,
    description: content.seo.description.value,
  },
  twitter: {
    card: 'summary_large_image',
    title: content.seo.title.value,
    description: content.seo.description.value,
  },
  icons: {
    // The brand favicon when the assets pipeline has delivered it, otherwise
    // the in-repo mark. Never a broken icon reference.
    icon: favicon
      ? [{ url: favicon.src, type: 'image/svg+xml' }]
      : [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  robots: {
    index: !isReviewMode,
    follow: !isReviewMode,
    googleBot: {
      index: !isReviewMode,
      follow: !isReviewMode,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: '#2B4BA9',
  colorScheme: 'light',
  // Zoom is never restricted: the page must stay usable at 200%.
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
