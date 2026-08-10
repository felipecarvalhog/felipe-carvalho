// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('public review search protection', () => {
  it('blocks crawlers and omits the sitemap entries in review mode', async () => {
    vi.stubEnv('NEXT_PUBLIC_REVIEW_MODE', 'true');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://psicologogay.hudilabs.com');

    const [{ default: robots }, { default: sitemap }, { isReviewMode }] =
      await Promise.all([
        import('./robots'),
        import('./sitemap'),
        import('@/config/public-env'),
      ]);

    expect(isReviewMode).toBe(true);
    expect(robots()).toEqual({
      rules: [{ userAgent: '*', disallow: '/' }],
    });
    expect(sitemap()).toEqual([]);
  });

  it('restores indexable routes when review mode is disabled', async () => {
    vi.stubEnv('NEXT_PUBLIC_REVIEW_MODE', 'false');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://psicologogay.hudilabs.com');

    const [{ default: robots }, { default: sitemap }] = await Promise.all([
      import('./robots'),
      import('./sitemap'),
    ]);

    expect(robots()).toMatchObject({
      rules: [{ userAgent: '*', allow: '/' }],
      host: 'https://psicologogay.hudilabs.com',
    });
    expect(sitemap()).toHaveLength(3);
  });
});
