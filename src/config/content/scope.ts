import type { ScopeItem, ScopeTier } from '@/config/types';

/** Human labels for the complexity tiers. Complexity only — never prices. */
export const scopeTierLabels: Readonly<Record<ScopeTier, string>> = {
  'incluido-no-escopo-base': 'Incluído no escopo-base',
  'personalizacao-simples': 'Personalização simples',
  'personalizacao-intermediaria': 'Personalização intermediária',
  'personalizacao-avancada': 'Personalização avançada',
  personalizacao: 'Personalização (serviço recorrente)',
  'custo-de-terceiro': 'Custo de terceiro',
};

/**
 * Fixed classification used both by the public config and by step F of the
 * onboarding wizard, so the two can never diverge.
 * WhatsApp appears twice because the link and the official API sit in very
 * different complexity tiers.
 */
export const scopeClassification: readonly ScopeItem[] = [
  {
    id: 'formulario-simples',
    label: 'Formulário simples (lista de espera)',
    tiers: ['incluido-no-escopo-base'],
    impact:
      'Já faz parte do site: a pessoa preenche nome, e-mail e contato, e os dados chegam pelo canal configurado.',
  },
  {
    id: 'envio-por-email',
    label: 'Envio das respostas por e-mail',
    tiers: ['personalizacao-simples', 'custo-de-terceiro'],
    impact:
      'Cada envio do formulário vira um e-mail automático. Exige um serviço externo de disparo, que é contratado à parte.',
  },
  {
    id: 'planilha',
    label: 'Registro em planilha',
    tiers: ['personalizacao-simples'],
    impact:
      'As respostas ficam organizadas em uma planilha, fácil de consultar e filtrar, sem sistema novo para aprender.',
  },
  {
    id: 'crm',
    label: 'CRM (gestão de contatos)',
    tiers: ['personalizacao-intermediaria', 'custo-de-terceiro'],
    impact:
      'Permite acompanhar o status de cada contato da lista. Depende de uma ferramenta externa, com assinatura própria.',
  },
  {
    id: 'whatsapp-link',
    label: 'WhatsApp por link direto',
    tiers: ['incluido-no-escopo-base'],
    impact:
      'Um botão abre a conversa com uma mensagem neutra já escrita. Nenhuma resposta do formulário é enviada pelo link.',
  },
  {
    id: 'whatsapp-api',
    label: 'WhatsApp API (mensagens automáticas)',
    tiers: ['personalizacao-avancada', 'custo-de-terceiro'],
    impact:
      'Mensagens automáticas e integração oficial. Exige aprovação da Meta, número dedicado e cobrança por conversa.',
  },
  {
    id: 'agendamento',
    label: 'Google Calendar / agendamento on-line',
    tiers: ['personalizacao-intermediaria', 'custo-de-terceiro'],
    impact:
      'A pessoa escolhe o horário sozinha. Muda a lógica da lista de espera e depende de uma ferramenta de agenda externa.',
  },
  {
    id: 'analytics',
    label: 'Analytics (métricas de acesso)',
    tiers: ['personalizacao-simples'],
    impact:
      'Mostra quantas pessoas visitam o site. Passa a existir tratamento de dados de navegação, o que exige aviso na política de privacidade.',
  },
  {
    id: 'blog-cms',
    label: 'Blog ou CMS (edição de conteúdo)',
    tiers: ['personalizacao-intermediaria'],
    impact:
      'Permite publicar e editar textos sem programador. Cada publicação precisa respeitar as regras do CFP.',
  },
  {
    id: 'multi-idiomas',
    label: 'Múltiplos idiomas',
    tiers: ['personalizacao-intermediaria'],
    impact:
      'Duplica o conteúdo do site em outro idioma, incluindo a manutenção futura de cada versão.',
  },
  {
    id: 'painel-administrativo',
    label: 'Painel administrativo',
    tiers: ['personalizacao-avancada', 'custo-de-terceiro'],
    impact:
      'Área com login para gerenciar contatos e conteúdo. Envolve autenticação, banco de dados e hospedagem dedicada.',
  },
  {
    id: 'automacoes',
    label: 'Automações',
    tiers: ['personalizacao-intermediaria'],
    impact:
      'Conecta o formulário a outras ferramentas de forma automática, reduzindo trabalho manual.',
  },
  {
    id: 'manutencao-recorrente',
    label: 'Manutenção recorrente',
    tiers: ['personalizacao'],
    recurring: true,
    impact:
      'Acompanhamento contínuo: atualizações, pequenas correções e ajustes de conteúdo ao longo do tempo.',
  },
];
