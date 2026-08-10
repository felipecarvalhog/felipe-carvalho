import { projectConfig } from '@/config/project.config';
import type { ManagedText } from '@/config/types';

/**
 * Walks the config and collects every string still marked `a-confirmar`, so
 * review mode can show one consolidated list instead of scattering markers
 * over the whole page.
 */

export type PendingEntry = {
  path: string;
  value: string;
  note?: string;
};

const isManagedText = (value: unknown): value is ManagedText => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.value === 'string' &&
    (candidate.status === 'confirmado' || candidate.status === 'a-confirmar')
  );
};

const walk = (node: unknown, path: string, out: PendingEntry[]): void => {
  if (isManagedText(node)) {
    if (node.status === 'a-confirmar') {
      out.push({ path, value: node.value, note: node.note });
    }
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((child, index) => walk(child, `${path}[${index}]`, out));
    return;
  }

  if (typeof node === 'object' && node !== null) {
    for (const [key, child] of Object.entries(node)) {
      walk(child, path ? `${path}.${key}` : key, out);
    }
  }
};

export const collectPendingCopy = (): PendingEntry[] => {
  const out: PendingEntry[] = [];
  walk(projectConfig.content, 'content', out);
  walk(projectConfig.professional, 'professional', out);
  return out;
};

/** Facts and assets that are missing entirely, rather than merely unapproved. */
export const collectMissingItems = (): PendingEntry[] => {
  const { professional, contact, privacy } = projectConfig;
  const items: PendingEntry[] = [];

  if (!professional.photo) {
    items.push({
      path: 'professional.photo',
      value: 'Fotografia profissional',
      note: 'Nenhuma foto autorizada foi fornecida. O hero usa um espaço reservado.',
    });
  }
  if (!contact.instagramUrl) {
    items.push({
      path: 'contact.instagramUrl',
      value: 'URL do Instagram',
      note: 'Não configurada — o link não é exibido em nenhum lugar do site.',
    });
  }
  if (!contact.whatsappNumber) {
    items.push({
      path: 'contact.whatsappNumber',
      value: 'Número de WhatsApp',
      note: 'Não configurado — o botão de WhatsApp não é exibido e o campo do formulário segue opcional.',
    });
  }
  if (!contact.email) {
    items.push({
      path: 'contact.email',
      value: 'E-mail profissional',
      note: 'Não configurado — nenhum e-mail é publicado no site.',
    });
  }
  if (!privacy.policyUrl) {
    items.push({
      path: 'privacy.policyUrl',
      value: 'URL externa da política de privacidade',
      note: 'Não configurada — o site usa a página interna /politica-de-privacidade.',
    });
  }
  if (privacy.retentionStatus === 'a-confirmar') {
    items.push({
      path: 'privacy.retentionDays',
      value: `Prazo de retenção: ${privacy.retentionDays ?? '—'} dias`,
      note: 'Prazo de referência sugerido pelo estúdio; depende de confirmação.',
    });
  }

  items.push({
    path: 'operacao.emergencia',
    value: 'Contatos oficiais de emergência',
    note: 'Não divulgados: dependem de validação oficial.',
  });
  items.push({
    path: 'operacao.abrangencia',
    value: 'Abrangência geográfica do atendimento on-line',
    note: 'Ainda não confirmada, por isso não aparece no FAQ.',
  });

  return items;
};
