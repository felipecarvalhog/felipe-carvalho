import type { MetadataRoute } from 'next';
import { isReviewMode, siteUrl } from '@/config/public-env';

export const dynamic = 'force-static';

/** Only indexable pages. `/onboarding` is intentionally absent. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (isReviewMode) return [];

  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${siteUrl}/politica-de-privacidade`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/termos`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
