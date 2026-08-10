// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { projectConfig } from '@/config/project.config';
import { resolveClosedNotice } from './waitlist-notice';

const copy = projectConfig.content.waitlist;

describe('resolveClosedNotice', () => {
  it('uses the approved copy and links the channel when the URL exists', () => {
    const notice = resolveClosedNotice(copy, 'https://instagram.com/exemplo');

    expect(notice.text).toBe(copy.closedNotice);
    expect(notice.text.value).toContain('Instagram');
    expect(notice.instagramUrl).toBe('https://instagram.com/exemplo');
  });

  it('falls back to the channel-free variant when the URL is missing', () => {
    const notice = resolveClosedNotice(copy, undefined);

    expect(notice.text).toBe(copy.closedNoticeNoChannel);
    expect(notice.text.value).toBe(
      'A lista de espera está em configuração e não recebe cadastros nesta versão de revisão.',
    );
    expect(notice.instagramUrl).toBeUndefined();
  });

  it('never names a channel the visitor cannot reach', () => {
    const notice = resolveClosedNotice(copy, undefined);

    expect(notice.text.value).not.toMatch(/instagram|whatsapp|e-mail/i);
  });

  it('is the branch the site takes today, since no Instagram is configured', () => {
    expect(projectConfig.contact.instagramUrl).toBeUndefined();
    expect(resolveClosedNotice(copy, projectConfig.contact.instagramUrl).text).toBe(
      copy.closedNoticeNoChannel,
    );
  });
});
