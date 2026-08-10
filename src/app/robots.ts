import type { MetadataRoute } from 'next';
import { isReviewMode, siteUrl } from '@/config/public-env';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (isReviewMode) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
