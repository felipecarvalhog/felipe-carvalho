// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { projectConfig } from './project.config';
import type { ManagedText } from './types';

/**
 * Guard rails. These assertions exist so that a well-meaning edit cannot
 * quietly publish an invented contact, replace the authorised photo, add a price or a
 * forbidden marketing claim.
 */

const collectStrings = (node: unknown, out: string[] = []): string[] => {
  if (typeof node === 'string') {
    out.push(node);
  } else if (Array.isArray(node)) {
    node.forEach((child) => collectStrings(child, out));
  } else if (typeof node === 'object' && node !== null) {
    Object.values(node).forEach((child) => collectStrings(child, out));
  }
  return out;
};

const allCopy = collectStrings(projectConfig.content).join('\n');

// The legal pages legitimately name the things the site must NOT do
// ("ausência de depoimentos ou casos clínicos"), so marketing-tone guards run
// against the promotional copy only.
const { legal: _legal, ...marketingSections } = projectConfig.content;
const marketingCopy = collectStrings(marketingSections).join('\n');

describe('projectConfig — invented data', () => {
  it('has no Instagram, WhatsApp or e-mail configured', () => {
    expect(projectConfig.contact.instagramUrl).toBeUndefined();
    expect(projectConfig.contact.whatsappNumber).toBeUndefined();
    expect(projectConfig.contact.email).toBeUndefined();
  });

  it('uses the authorised professional photograph', () => {
    expect(projectConfig.professional.photo).toEqual({
      src: '/felipe-carvalho-professional.jpg',
      width: 512,
      height: 640,
      alt: 'Felipe Carvalho, psicólogo',
    });
  });

  it('has no external privacy policy URL configured', () => {
    expect(projectConfig.privacy.policyUrl).toBeUndefined();
  });

  it('has no Hudi Pages credit URL configured', () => {
    expect(projectConfig.hudiPages.creditUrl).toBeUndefined();
  });

  it.each([
    ['instagram.com', /instagram\.com/i],
    ['wa.me', /wa\.me/i],
    ['telefone', /\+55\s?\d{2}\s?9?\d{4}/],
    ['e-mail', /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i],
  ])('never leaks a fabricated %s into the copy', (_label, pattern) => {
    expect(allCopy).not.toMatch(pattern);
  });
});

describe('projectConfig — privacy posture', () => {
  it('keeps sensitive fields structurally disabled', () => {
    expect(projectConfig.privacy.sensitiveFieldsEnabled).toBe(false);
  });

  it('marks the retention period as still unconfirmed', () => {
    expect(projectConfig.privacy.retentionStatus).toBe('a-confirmar');
    expect(projectConfig.privacy.retentionDays).toBe(180);
  });

  it('keeps the case-study consent switched off', () => {
    expect(projectConfig.hudiPages.caseStudyConsent).toBe(false);
  });

  it('keeps the Progress Pride reference unapproved by default', () => {
    expect(projectConfig.brand.progressPrideReferenceApproved).toBe(false);
  });
});

describe('projectConfig — professional identification', () => {
  it('always carries the full name, profession and registration', () => {
    expect(projectConfig.professional.fullName).toBe(
      'Felipe Gonzaga de Carvalho Gondim',
    );
    expect(projectConfig.professional.profession).toBe('Psicólogo');
    expect(projectConfig.professional.registration).toBe('CRP 02/23810');
    expect(projectConfig.content.footer.identification.value).toContain(
      'CRP 02/23810',
    );
  });

  it('never presents an ongoing course as concluded', () => {
    const ongoing = projectConfig.content.credentials.filter(
      (credential) => credential.status === 'em-andamento',
    );

    expect(ongoing).toHaveLength(3);
    for (const credential of ongoing) {
      expect(credential.detail.value.toLowerCase()).toContain('em andamento');
    }

    const concluded = projectConfig.content.credentials.find(
      (credential) => credential.id === 'sexologia-clinica',
    );
    expect(concluded?.status).toBe('concluida');
    expect(concluded?.detail.value.toLowerCase()).toContain('concluída');
  });

  it('communicates availability only as a status', () => {
    expect(projectConfig.service.availabilityStatus).toBe('waitlist-closed');
    expect(allCopy).not.toMatch(/cinco pessoas|5 pessoas/i);
  });

  it('keeps data collection disabled in the public review', () => {
    expect(projectConfig.content.headerCta.value).toBe('Ver disponibilidade');
    expect(projectConfig.content.hero.primaryCta.value).toBe('Ver disponibilidade');
    expect(projectConfig.content.waitlist.closedNoticeNoChannel.value).toContain(
      'não recebe cadastros',
    );
  });
});

describe('projectConfig — forbidden claims', () => {
  it.each([
    'Últimas vagas',
    'Seu lugar está garantido',
    'Transforme sua vida',
    'Resultados comprovados',
    'cura garantida',
    'melhor psicólogo',
  ])('never uses the phrase "%s"', (phrase) => {
    expect(allCopy.toLowerCase()).not.toContain(phrase.toLowerCase());
  });

  it('never publishes a price', () => {
    expect(allCopy).not.toMatch(/R\$\s?\d/);
    expect(allCopy).not.toMatch(/\bpre[çc]o\b/i);
  });

  it('never promises reimbursement', () => {
    expect(allCopy).toMatch(/reembolso/i);
    expect(allCopy).toMatch(/não é garantido/i);
  });

  it('carries no testimonial or clinical case section', () => {
    expect(marketingCopy.toLowerCase()).not.toContain('depoimento');
    expect(marketingCopy.toLowerCase()).not.toContain('caso clínico');
    expect(marketingCopy.toLowerCase()).not.toContain('antes e depois');
  });
});

describe('projectConfig — measured brand dots', () => {
  // Measured from the vector master, not declared by the designer
  // (docs/ASSETS.md §4.1). Left to right.
  const measured = ['#C30B0B', '#E58B21', '#FAEC37', '#6CBE2D', '#3E63FF', '#8F0AC6'];

  const tokens = readFileSync(
    fileURLToPath(new URL('../styles/tokens.css', import.meta.url)),
    'utf8',
  );

  it('records the six dots exactly as measured', () => {
    expect(projectConfig.brand.measuredDotColors).toEqual(measured);
  });

  it('keeps them out of the approved four-colour palette', () => {
    expect(Object.values(projectConfig.brand.colors)).toHaveLength(4);
    for (const dot of measured) {
      expect(Object.values(projectConfig.brand.colors)).not.toContain(dot);
    }
  });

  it('mirrors the same values in the CSS tokens, so the two cannot drift', () => {
    measured.forEach((hex, index) => {
      expect(tokens).toContain(`--brand-dot-${index + 1}: ${hex.toLowerCase()};`);
    });
  });
});

describe('projectConfig — review metadata', () => {
  const managedTexts: ManagedText[] = [];

  const walk = (node: unknown): void => {
    if (typeof node !== 'object' || node === null) return;
    const candidate = node as Record<string, unknown>;
    if (
      typeof candidate.value === 'string' &&
      (candidate.status === 'confirmado' || candidate.status === 'a-confirmar')
    ) {
      managedTexts.push(candidate as unknown as ManagedText);
      return;
    }
    Object.values(candidate).forEach(walk);
  };

  walk(projectConfig.content);

  it('tags every piece of copy with a review status', () => {
    expect(managedTexts.length).toBeGreaterThan(50);
    for (const text of managedTexts) {
      expect(['confirmado', 'a-confirmar']).toContain(text.status);
    }
  });

  it('explains why each unconfirmed string is pending', () => {
    const pending = managedTexts.filter((text) => text.status === 'a-confirmar');
    expect(pending.length).toBeGreaterThan(0);
    for (const text of pending) {
      expect(text.note, `missing note for "${text.value}"`).toBeTruthy();
    }
  });
});
