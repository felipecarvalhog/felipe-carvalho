import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/public-env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The onboarding wizard is private and the API is not content.
        disallow: ['/onboarding', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
