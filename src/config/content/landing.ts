import { confirmed, pending } from './helpers';
import type {
  ApproachesContent,
  ContentBlock,
  Credential,
  FaqItem,
  FooterContent,
  HeroContent,
  HowItWorksContent,
  NavLink,
  SeoContent,
  WaitlistContent,
} from '@/config/types';

// Anchors are absolute so the header works identically on the landing page and
// on the legal pages.
export const nav: readonly NavLink[] = [
  { id: 'nav-sobre', href: '/#sobre', label: confirmed('Sobre') },
  { id: 'nav-como-trabalho', href: '/#como-trabalho', label: confirmed('Como trabalho') },
  { id: 'nav-atendimento', href: '/#atendimento', label: confirmed('Atendimento') },
  { id: 'nav-duvidas', href: '/#duvidas', label: confirmed('Dúvidas') },
];

export const skipLinkLabel = confirmed('Ir para o conteúdo');

export const headerCta = confirmed('Entrar na lista de espera');

export const seo: SeoContent = {
  title: pending(
    'Felipe Carvalho — Psicólogo (CRP 02/23810) · Psicologia clínica on-line',
    'Título de busca redigido pelo estúdio; depende de aprovação do profissional.',
  ),
  description: pending(
    'Psicologia clínica on-line para pessoas adultas, com Terapia Cognitivo-Comportamental e postura clínica afirmativa. Agenda com disponibilidade limitada: entre na lista de espera.',
    'Meta description redigida pelo estúdio; depende de aprovação do profissional.',
  ),
  ogTagline: confirmed('Psicologia clínica on-line • Adultos'),
};

export const hero: HeroContent = {
  id: 'hero',
  eyebrow: confirmed('Psicologia clínica on-line • Adultos'),
  title: confirmed(
    'Psicologia clínica on-line, com escuta acolhedora e prática baseada em evidências.',
  ),
  subheadline: confirmed(
    'Atendimento em Terapia Cognitivo-Comportamental (TCC) e abordagem afirmativa, com foco especial na população LGBTQIA+.',
  ),
  paragraphs: [],
  primaryCta: confirmed('Entrar na lista de espera'),
  secondaryCta: confirmed('Conhecer meu trabalho'),
  trustSignals: [
    { id: 'trust-online', label: confirmed('On-line') },
    { id: 'trust-duracao', label: confirmed('Sessões de 50 min') },
    { id: 'trust-publico', label: confirmed('Para adultos') },
    { id: 'trust-crp', label: confirmed('CRP 02/23810') },
  ],
  photoPlaceholderLabel: pending(
    'Espaço reservado para a fotografia profissional — pendente de aprovação',
    'Retrato profissional de Felipe Carvalho.',
  ),
};

export const about: readonly ContentBlock[] = [
  {
    id: 'sobre',
    eyebrow: confirmed('Sobre Felipe'),
    title: pending(
      'Escuta clínica com método e sem julgamento',
      'Título de seção redigido pelo estúdio; depende de aprovação.',
    ),
    paragraphs: [
      confirmed(
        'Sou psicólogo clínico, atuo em Pernambuco e ofereço atendimento totalmente on-line. Minha prática é fundamentada na Terapia Cognitivo-Comportamental (TCC), unida a uma postura clínica afirmativa — o que significa que cada pessoa que chega até mim é recebida a partir de quem ela é, sem julgamentos, com espaço genuíno para suas vivências e sua história.',
      ),
      confirmed(
        'Sou especialista em Sexologia Clínica e estou concluindo minha segunda especialização, em TCC. Também sigo me atualizando por meio de formações em Psicologia Baseada em Evidências e Terapia Cognitivo-Sexual, buscando unir rigor técnico a um cuidado verdadeiramente humano.',
      ),
      confirmed(
        'Minha trajetória também passa por um compromisso com a população LGBTQIA+: já participei da organização de eventos, simpósios e discussões políticas voltadas à garantia de direitos e ao enfrentamento do preconceito.',
      ),
    ],
    highlight: confirmed('Acredito que terapia é, antes de tudo, um espaço de escuta.'),
  },
];

export const approaches: ApproachesContent = {
  block: {
    id: 'como-trabalho',
    eyebrow: confirmed('Como trabalho'),
    title: pending(
      'Duas frentes que caminham juntas',
      'Título de seção redigido pelo estúdio; depende de aprovação.',
    ),
    paragraphs: [
      pending(
        'A abordagem técnica e a postura clínica não competem entre si: elas se sustentam mutuamente ao longo do processo terapêutico.',
        'Texto de apoio redigido pelo estúdio; depende de aprovação.',
      ),
    ],
  },
  items: [
    {
      id: 'abordagem-tcc',
      title: confirmed('Terapia Cognitivo-Comportamental'),
      paragraphs: [
        confirmed(
          'Trabalho estruturado, baseado em evidências, voltado à compreensão e transformação de padrões de pensamento e comportamento relacionados ao sofrimento.',
        ),
      ],
    },
    {
      id: 'abordagem-afirmativa',
      title: confirmed('Postura clínica afirmativa'),
      paragraphs: [
        confirmed(
          'Prática que reconhece e valida identidades de gênero e orientações sexuais sem patologização, criando um espaço seguro para vivências e questões específicas.',
        ),
      ],
    },
  ],
  synthesis: confirmed(
    'Um cuidado que une rigor técnico e acolhimento: ferramentas da TCC com uma postura clínica afirmativa, que reconhece e valida a diversidade de identidades e vivências.',
  ),
};

export const credentialsBlock: ContentBlock = {
  id: 'formacao',
  eyebrow: confirmed('Formação e áreas de atuação'),
  title: pending(
    'Formação em curso e concluída, sem ambiguidade',
    'Título de seção redigido pelo estúdio; depende de aprovação.',
  ),
  paragraphs: [
    pending(
      'Títulos concluídos e formações em andamento aparecem separadamente, com marcação explícita.',
      'Texto de apoio redigido pelo estúdio; depende de aprovação.',
    ),
  ],
};

export const credentials: readonly Credential[] = [
  {
    id: 'sexologia-clinica',
    label: confirmed('Sexologia Clínica'),
    detail: confirmed('Especialização concluída'),
    status: 'concluida',
    kind: 'especializacao',
  },
  {
    id: 'tcc',
    label: confirmed('Terapia Cognitivo-Comportamental (TCC)'),
    detail: confirmed('Segunda especialização em andamento'),
    status: 'em-andamento',
    kind: 'especializacao',
  },
  {
    id: 'psicologia-baseada-em-evidencias',
    label: confirmed('Psicologia Baseada em Evidências'),
    detail: confirmed('Formação em andamento'),
    status: 'em-andamento',
    kind: 'formacao',
  },
  {
    id: 'terapia-cognitivo-sexual',
    label: confirmed('Terapia Cognitivo-Sexual'),
    detail: confirmed('Formação em andamento'),
    status: 'em-andamento',
    kind: 'formacao',
  },
  {
    id: 'atuacao-lgbtqia',
    label: confirmed('Atendimento e acolhimento à população LGBTQIA+'),
    detail: confirmed('Área de atuação'),
    // `kind` is what the UI renders for this entry; it is never presented as a
    // concluded or ongoing academic title.
    status: 'concluida',
    kind: 'area-de-atuacao',
  },
];

/**
 * Index 0 is the section intro; every block whose id starts with
 * `lgbtq-experiencia` is one of the four confirmed experiences.
 * No dates or ordering are implied — the briefing confirmed none.
 */
export const lgbtqCommitment: readonly ContentBlock[] = [
  {
    id: 'lgbtq-intro',
    eyebrow: confirmed('Compromisso com a população LGBTQIA+'),
    title: pending(
      'Um compromisso que começa antes do consultório',
      'Título de seção redigido pelo estúdio; depende de aprovação.',
    ),
    paragraphs: [
      confirmed(
        'Minha atuação com a população LGBTQIA+ vai além do consultório: já participei de eventos, simpósios e discussões políticas voltadas à garantia de direitos e ao enfrentamento do preconceito.',
      ),
    ],
  },
  {
    id: 'lgbtq-experiencia-hiv',
    title: confirmed('Eventos sobre HIV/AIDS'),
    paragraphs: [confirmed('Desenvolvimento de eventos sobre HIV/AIDS.')],
  },
  {
    id: 'lgbtq-experiencia-lgbtfobia',
    title: confirmed('Combate à LGBTfobia'),
    paragraphs: [confirmed('Organização de eventos de combate à LGBTfobia.')],
  },
  {
    id: 'lgbtq-experiencia-simposios',
    title: confirmed('Simpósios, congressos e grupos de apoio'),
    paragraphs: [
      confirmed(
        'Participação em simpósios, congressos e grupos de apoio à população LGBTQIA+.',
      ),
    ],
  },
  {
    id: 'lgbtq-experiencia-nome-social',
    title: confirmed('Nome social na universidade'),
    paragraphs: [
      confirmed(
        'Participação em discussões políticas sobre a implementação do nome social na universidade onde me formei.',
      ),
    ],
  },
];

export const howItWorks: HowItWorksContent = {
  block: {
    id: 'atendimento',
    eyebrow: confirmed('Como funciona o atendimento'),
    title: pending(
      'Três passos, sem burocracia',
      'Título de seção redigido pelo estúdio; depende de aprovação.',
    ),
    paragraphs: [],
  },
  steps: [
    {
      id: 'passo-lista',
      title: confirmed('Entre na lista de espera'),
      description: confirmed('Envie apenas os dados necessários para contato.'),
    },
    {
      id: 'passo-contato',
      title: confirmed('Aguarde o contato'),
      description: confirmed(
        'Quando houver disponibilidade, Felipe verificará se ainda existe interesse.',
      ),
    },
    {
      id: 'passo-inicio',
      title: confirmed('Converse sobre o início'),
      description: confirmed(
        'Modalidade on-line, sessão de 50 minutos, via Google Meet.',
      ),
    },
  ],
  notes: [
    confirmed('O atendimento é destinado a pessoas adultas.'),
    confirmed('O atendimento é particular.'),
    confirmed(
      'É emitida Receita Saúde, que pode ser usada para solicitar reembolso a alguns convênios.',
    ),
    confirmed(
      'O reembolso depende das regras de cada plano de saúde e não é garantido.',
    ),
  ],
};

export const waitlist: WaitlistContent = {
  title: confirmed('Entre na lista de espera'),
  intro: confirmed(
    'No momento, a agenda está com disponibilidade limitada. Deixe seus dados para entrar na lista de espera. Quando surgir uma vaga, entrarei em contato para verificar se você ainda tem interesse em iniciar a terapia.',
  ),
  closedNotice: confirmed(
    'A lista de espera está temporariamente fechada. Você ainda pode conhecer o trabalho de Felipe pelo Instagram.',
  ),
  closedNoticeNoChannel: pending(
    'A lista de espera está temporariamente fechada no momento.',
    'WL-CLOSED-ALT. Usada quando a lista fecha antes de o Instagram ser confirmado, já que WL-CLOSED cita esse canal. Redação do estúdio; depende de aprovação.',
  ),
  consentLabel: confirmed(
    'Li e concordo com a Política de Privacidade e autorizo o tratamento dos meus dados para contato sobre a lista de espera e o agendamento.',
  ),
  consentLinkLabel: confirmed('Ler a Política de Privacidade'),
  requiredSuffix: confirmed('obrigatório'),
  noPreferenceLabel: confirmed('Sem preferência'),
  honeypotLabel: confirmed('Não preencha este campo'),
  rateLimitedMessage: pending(
    'Recebemos muitos envios deste dispositivo em pouco tempo. Aguarde alguns minutos e tente novamente.',
    'Mensagem redigida pelo estúdio; depende de aprovação.',
  ),
  submitLabel: confirmed('Entrar na lista de espera'),
  submittingLabel: confirmed('Enviando…'),
  successTitle: pending(
    'Cadastro recebido',
    'Título da mensagem de sucesso redigido pelo estúdio; depende de aprovação.',
  ),
  successMessage: confirmed(
    'Recebi seus dados. Quando houver disponibilidade, entrarei em contato para confirmar se você ainda tem interesse.',
  ),
  successNextSteps: [
    pending(
      'Seus dados ficam registrados apenas para esse contato — não há triagem clínica nem avaliação neste formulário.',
      'Texto complementar redigido pelo estúdio; depende de aprovação.',
    ),
    pending(
      'O contato acontece pelo canal que você indicou, quando houver disponibilidade na agenda.',
      'Texto complementar redigido pelo estúdio; depende de aprovação.',
    ),
    pending(
      'Se quiser sair da lista ou corrigir alguma informação, basta responder ao contato solicitando a exclusão.',
      'Depende da definição do canal oficial para exercício de direitos do titular.',
    ),
  ],
  errorMessage: confirmed(
    'Não foi possível enviar agora. Revise sua conexão ou tente novamente mais tarde.',
  ),
  duplicateMessage: pending(
    'Este contato já consta na lista de espera. Não é necessário enviar novamente.',
    'Mensagem redigida pelo estúdio; depende de aprovação.',
  ),
  offlineMessage: pending(
    'Você parece estar sem conexão. O envio não foi feito — tente novamente quando estiver on-line.',
    'Mensagem redigida pelo estúdio; depende de aprovação.',
  ),
  validationSummary: pending(
    'Revise os campos destacados para continuar.',
    'Mensagem redigida pelo estúdio; depende de aprovação.',
  ),
  mockNotice: pending(
    'Modo de teste: nenhum dado foi armazenado ou enviado a qualquer serviço. Este envio é simulado.',
    'Aviso técnico exibido apenas enquanto o adaptador de destino for o mock.',
  ),
  fields: {
    fullName: {
      label: confirmed('Nome completo'),
      hint: pending(
        'Como você prefere ser chamado(a) pode ser combinado no contato.',
        'Texto de apoio redigido pelo estúdio; depende de aprovação.',
      ),
    },
    email: {
      label: confirmed('E-mail'),
      hint: pending(
        'Usado apenas para o contato sobre a lista de espera.',
        'Texto de apoio redigido pelo estúdio; depende de aprovação.',
      ),
    },
    phone: {
      label: confirmed('WhatsApp ou telefone'),
      optionalSuffix: confirmed('opcional'),
      hint: pending(
        'Ainda não há um canal de WhatsApp confirmado, por isso este campo é opcional.',
        'Se o WhatsApp for confirmado como canal operacional, este campo passa a ser obrigatório.',
      ),
    },
    contactPreference: {
      label: confirmed('Preferência de contato'),
      optionalSuffix: confirmed('opcional'),
    },
    availability: {
      label: confirmed('Disponibilidade geral'),
      optionalSuffix: confirmed('opcional'),
      hint: pending(
        'Apenas o turno em que costuma estar disponível. Não é um agendamento.',
        'Texto de apoio redigido pelo estúdio; depende de aprovação.',
      ),
    },
    referral: {
      label: confirmed('Como conheceu o trabalho'),
      optionalSuffix: confirmed('opcional'),
    },
  },
  contactPreferenceOptions: [
    { value: 'whatsapp', label: confirmed('WhatsApp') },
    { value: 'email', label: confirmed('E-mail') },
  ],
  availabilityOptions: [
    { value: 'manha', label: confirmed('Manhã') },
    { value: 'tarde', label: confirmed('Tarde') },
    { value: 'noite', label: confirmed('Noite') },
  ],
};

export const faqBlock: ContentBlock = {
  id: 'duvidas',
  eyebrow: confirmed('Dúvidas frequentes'),
  title: pending(
    'Perguntas que costumam aparecer',
    'Título de seção redigido pelo estúdio; depende de aprovação.',
  ),
  paragraphs: [],
};

export const faq: readonly FaqItem[] = [
  {
    id: 'faq-online',
    question: confirmed('O atendimento é só on-line?'),
    answer: confirmed(
      'Sim. O atendimento é realizado on-line, pela plataforma Google Meet.',
    ),
  },
  {
    id: 'faq-lista',
    question: confirmed('Como funciona a lista de espera?'),
    answer: confirmed(
      'À medida que surgem vagas ou mudanças na agenda, Felipe entra em contato para verificar se a pessoa ainda tem interesse.',
    ),
  },
  {
    id: 'faq-convenio',
    question: confirmed('Você atende convênio ou somente particular?'),
    answer: confirmed(
      'O atendimento é particular. É emitida Receita Saúde, que pode ser usada para solicitar reembolso a alguns convênios, conforme as regras de cada plano.',
    ),
  },
  {
    id: 'faq-prazo',
    question: confirmed('Quanto tempo demora para eu ser chamado?'),
    answer: confirmed(
      'Não é possível prever um prazo, pois a disponibilidade depende da agenda e do andamento dos atendimentos.',
    ),
  },
  {
    id: 'faq-publico',
    question: confirmed('Quem pode ser atendido?'),
    answer: confirmed('Pessoas adultas.'),
  },
];

export const footer: FooterContent = {
  identification: confirmed(
    'Felipe Gonzaga de Carvalho Gondim — Psicólogo — CRP 02/23810',
  ),
  emergencyNotice: confirmed(
    'Este site, o formulário de lista de espera e eventuais canais de mensagem não são canais de emergência e não substituem atendimento de urgência. Em situação de risco imediato, procure um serviço de emergência.',
  ),
  emergencyPending: pending(
    'Contatos oficiais de emergência ainda não foram validados e, por isso, não são divulgados aqui.',
    'Os números de emergência dependem de validação oficial antes de qualquer publicação.',
  ),
  credit: confirmed('Desenvolvido com Hudi Pages, um projeto Hudi Labs'),
  copyright: pending(
    '© {ano} Felipe Gonzaga de Carvalho Gondim. Conteúdo desta página de uso exclusivo do profissional.',
    'Texto de rodapé redigido pelo estúdio; depende de aprovação.',
  ),
  legalLinks: [
    {
      id: 'legal-privacidade',
      href: '/politica-de-privacidade',
      label: confirmed('Política de Privacidade'),
    },
    { id: 'legal-termos', href: '/termos', label: confirmed('Termos de uso') },
  ],
};
