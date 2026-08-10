import { projectConfig } from '@/config/project.config';
import type { RequirementDefinition, WizardStep } from './wizard-types';

const { content, professional } = projectConfig;

const joinParagraphs = (paragraphs: readonly { value: string }[]): string =>
  paragraphs.map((paragraph) => paragraph.value).join('\n\n');

const heroText = [
  content.hero.eyebrow.value,
  content.hero.title.value,
  content.hero.subheadline.value,
].join('\n\n');

const aboutText = content.about[0]
  ? [
      joinParagraphs(content.about[0].paragraphs),
      content.about[0].highlight?.value ?? '',
    ]
      .filter(Boolean)
      .join('\n\n')
  : '';

const approachesText = [
  ...content.approaches.items.map((item) =>
    `${item.title?.value ?? ''}\n${joinParagraphs(item.paragraphs)}`.trim(),
  ),
  content.approaches.synthesis.value,
].join('\n\n');

const credentialsText = content.credentials
  .map((credential) => `${credential.label.value} — ${credential.detail.value}`)
  .join('\n');

const lgbtqText = content.lgbtqCommitment
  .map((block) =>
    `${block.title?.value ?? ''}\n${joinParagraphs(block.paragraphs)}`.trim(),
  )
  .join('\n\n');

const howItWorksText = [
  ...content.howItWorks.steps.map(
    (step) => `${step.title.value} — ${step.description.value}`,
  ),
  ...content.howItWorks.notes.map((note) => note.value),
].join('\n');

const faqText = content.faq
  .map((item) => `P: ${item.question.value}\nR: ${item.answer.value}`)
  .join('\n\n');

const LOGO_OPTIONS = [
  { value: 'horizontal-color', label: 'Horizontal colorida' },
  { value: 'vertical-color', label: 'Vertical colorida' },
  { value: 'horizontal-white', label: 'Horizontal branca' },
  { value: 'horizontal-negative', label: 'Horizontal negativa' },
  { value: 'symbol', label: 'Apenas o símbolo' },
];

export const wizardSteps: WizardStep[] = [
  {
    id: 'identidade',
    letter: 'A',
    title: 'Identidade e aprovação',
    intro:
      'Confirmação do nome, do registro profissional e das decisões de marca. Nada é publicado sem esta etapa.',
    questions: [
      {
        id: 'a1-nome-profissional',
        kind: 'text',
        label: 'Nome profissional exato, como deve aparecer no site',
        prefill: professional.displayName,
        help: `O nome completo (${professional.fullName}) continua aparecendo no rodapé, junto do CRP.`,
      },
      {
        id: 'a2-crp',
        kind: 'confirm',
        label: `O registro ${professional.registration} está correto e a situação está ativa?`,
        guardrail:
          'A identificação completa com nome, profissão e CRP é obrigatória em toda divulgação.',
      },
      {
        id: 'a3-pronomes',
        kind: 'text',
        label: 'Nome e pronomes que devem ser usados na comunicação',
        placeholder: 'Ex.: Felipe · ele/dele',
      },
      {
        id: 'a4-logo-topo',
        kind: 'choice',
        label: 'Versão de logo preferida para o topo do site',
        options: LOGO_OPTIONS,
      },
      {
        id: 'a4b-logo-redes',
        kind: 'choice',
        label: 'Versão de logo preferida para redes sociais',
        options: LOGO_OPTIONS,
      },
      {
        id: 'a4c-logo-fundo-escuro',
        kind: 'choice',
        label: 'Versão de logo preferida para fundos escuros',
        options: LOGO_OPTIONS,
      },
      {
        id: 'a5-foto',
        kind: 'file',
        label: 'Fotografia profissional autorizada',
        help: 'O arquivo NÃO é enviado para lugar nenhum. Só o nome do arquivo é registrado aqui, para combinarmos qual foto usar.',
      },
      {
        id: 'a6-paleta',
        kind: 'confirm',
        label:
          'A paleta está aprovada? (#CEE4EA névoa, #D0DEED azul-lavanda, #4D576B ardósia, #2B4BA9 cobalto)',
      },
      {
        id: 'a7-progress-pride',
        kind: 'confirm',
        label:
          'Autoriza uma referência discreta e contextual à bandeira Progress Pride (por exemplo, seis pontos como micro detalhe)?',
        help: 'Se não autorizar, nenhum elemento remete à bandeira.',
      },
      {
        id: 'a8-palavras-transmitir',
        kind: 'text',
        multiline: true,
        label: 'Palavras que a marca deve transmitir',
        placeholder: 'Ex.: pensamento, conexão, acolhimento…',
      },
      {
        id: 'a9-palavras-evitar',
        kind: 'text',
        multiline: true,
        label: 'Palavras, símbolos ou clichês a evitar',
        placeholder: 'Ex.: cérebro 3D, flor de lótus, quebra-cabeça, divã…',
      },
    ],
  },

  {
    id: 'publico',
    letter: 'B',
    title: 'Público e posicionamento',
    intro: 'Para quem o site fala e com que tom.',
    questions: [
      {
        id: 'b1-publico-prioritario',
        kind: 'text',
        multiline: true,
        label: 'Público prioritário',
      },
      {
        id: 'b2-faixa-etaria',
        kind: 'text',
        label: 'Faixa etária atendida',
        prefill: 'Pessoas adultas',
      },
      {
        id: 'b3-abrangencia',
        kind: 'text',
        label: 'Abrangência geográfica do atendimento on-line',
        help: 'Enquanto não for confirmada, o site não afirma nada sobre localidade de atendimento.',
      },
      {
        id: 'b4-demandas-publicas',
        kind: 'text',
        multiline: true,
        label: 'Demandas que podem ser comunicadas publicamente',
        guardrail:
          'Sem promessa de cura, resultado, prazo ou eficácia; sem casos clínicos.',
      },
      {
        id: 'b5-demandas-nao-atende',
        kind: 'text',
        multiline: true,
        label: 'Demandas que não atende ou que encaminha',
      },
      {
        id: 'b6-papel-lgbtqia',
        kind: 'choice',
        label: 'Papel do foco na população LGBTQIA+ na comunicação',
        options: [
          { value: 'central', label: 'Central' },
          { value: 'importante', label: 'Importante' },
          { value: 'complementar', label: 'Complementar' },
        ],
      },
      {
        id: 'b7-tom',
        kind: 'choice',
        label: 'Tom da comunicação',
        options: [
          { value: 'clinico', label: 'Mais clínico' },
          { value: 'proximo', label: 'Mais próximo' },
          { value: 'equilibrado', label: 'Equilibrado' },
        ],
      },
      {
        id: 'b8-sem-promessas',
        kind: 'confirm',
        label:
          'Confirma que o site não fará promessas de resultado, cura, prazo ou eficácia?',
        guardrail: 'Exigência ética do CFP. Não é negociável no material publicado.',
      },
    ],
  },

  {
    id: 'servico',
    letter: 'C',
    title: 'Serviço',
    intro: 'Como o atendimento funciona na prática.',
    questions: [
      {
        id: 'c1-modalidade',
        kind: 'text',
        label: 'Modalidade e plataforma',
        prefill: 'On-line, pelo Google Meet',
      },
      {
        id: 'c2-duracao',
        kind: 'text',
        label: 'Duração da sessão',
        prefill: '50 minutos',
      },
      {
        id: 'c3-pagamento',
        kind: 'text',
        multiline: true,
        label: 'Particular, convênios e reembolso',
        prefill:
          'Atendimento particular. É emitida Receita Saúde, que pode ser usada para solicitar reembolso a alguns convênios, conforme as regras de cada plano. O reembolso não é garantido.',
        guardrail: 'Valores nunca são publicados no site.',
      },
      {
        id: 'c4-status-agenda',
        kind: 'choice',
        label: 'Status da agenda a comunicar publicamente',
        prefill: 'vagas-limitadas',
        options: [
          { value: 'vagas-abertas', label: 'Vagas abertas' },
          { value: 'vagas-limitadas', label: 'Vagas limitadas' },
          { value: 'lista-fechada', label: 'Lista de espera fechada' },
        ],
        guardrail:
          'O número de pessoas atendidas nunca é divulgado — apenas o status da agenda.',
      },
      {
        id: 'c5-regra-contato',
        kind: 'text',
        multiline: true,
        label: 'Regra de contato da lista de espera',
        placeholder: 'Ex.: ordem de chegada, revisão semanal, tentativa única…',
      },
      {
        id: 'c6-retencao',
        kind: 'choice',
        label: 'Prazo de retenção dos contatos da lista de espera',
        allowOther: true,
        options: [
          { value: '90', label: '90 dias' },
          { value: '180', label: '180 dias' },
          { value: '365', label: '365 dias' },
        ],
      },
      {
        id: 'c7-canal-operacional',
        kind: 'choice',
        label: 'Canal operacional responsável pelo retorno',
        options: [
          { value: 'whatsapp', label: 'WhatsApp' },
          { value: 'email', label: 'E-mail' },
          { value: 'telefone', label: 'Telefone' },
          { value: 'a-definir', label: 'Ainda a definir' },
        ],
        help: 'Se for WhatsApp, o campo de telefone do formulário passa a ser obrigatório.',
      },
      {
        id: 'c8-dias-turnos',
        kind: 'text',
        label: 'Dias e turnos relevantes para o atendimento',
      },
    ],
  },

  {
    id: 'conteudo',
    letter: 'D',
    title: 'Conteúdo',
    intro:
      'Cada bloco aparece com o texto atual. Aprove, edite ou marque para remoção.',
    questions: [
      { id: 'd1-hero', kind: 'content', label: 'Hero (topo da página)', current: heroText },
      { id: 'd2-sobre', kind: 'content', label: 'Sobre Felipe', current: aboutText },
      { id: 'd3-abordagens', kind: 'content', label: 'Como trabalho', current: approachesText },
      {
        id: 'd4-formacoes',
        kind: 'content',
        label: 'Formação e áreas de atuação',
        current: credentialsText,
        guardrail:
          'Títulos concluídos e formações em andamento precisam continuar visivelmente separados.',
      },
      {
        id: 'd5-lgbtqia',
        kind: 'content',
        label: 'Compromisso com a população LGBTQIA+',
        current: lgbtqText,
      },
      {
        id: 'd6-atendimento',
        kind: 'content',
        label: 'Como funciona o atendimento',
        current: howItWorksText,
      },
      { id: 'd7-faq', kind: 'content', label: 'Dúvidas frequentes', current: faqText },
      {
        id: 'd8-sexologia',
        kind: 'confirm',
        label: 'Sexologia Clínica — especialização CONCLUÍDA. Está correto?',
      },
      {
        id: 'd8b-tcc',
        kind: 'confirm',
        label: 'TCC — segunda especialização EM ANDAMENTO. Está correto?',
      },
      {
        id: 'd8c-pbe',
        kind: 'confirm',
        label: 'Psicologia Baseada em Evidências — formação EM ANDAMENTO. Está correto?',
      },
      {
        id: 'd8d-tcs',
        kind: 'confirm',
        label: 'Terapia Cognitivo-Sexual — formação EM ANDAMENTO. Está correto?',
      },
      {
        id: 'd8e-area-lgbtqia',
        kind: 'confirm',
        label:
          'Atendimento e acolhimento à população LGBTQIA+ como ÁREA DE ATUAÇÃO. Está correto?',
      },
      {
        id: 'd9-documentos',
        kind: 'text',
        multiline: true,
        label: 'Links ou documentos de suporte (certificados, currículo, materiais)',
      },
      {
        id: 'd10-remover',
        kind: 'text',
        multiline: true,
        label: 'Itens que devem ser removidos do site',
      },
      {
        id: 'd11-faq-extra',
        kind: 'text',
        multiline: true,
        label: 'Perguntas frequentes adicionais (pergunta + resposta)',
      },
      {
        id: 'd12-aviso-emergencia',
        kind: 'text',
        multiline: true,
        label: 'Aviso de emergência aprovado para o rodapé',
        prefill: content.footer.emergencyNotice.value,
        guardrail:
          'Nenhum telefone de crise será publicado sem validação oficial da fonte.',
      },
      {
        id: 'd13-ortografia',
        kind: 'choice',
        label: 'Ortografia preferida',
        prefill: 'on-line',
        options: [
          { value: 'on-line', label: 'on-line (com hífen)' },
          { value: 'online', label: 'online (sem hífen)' },
        ],
      },
    ],
  },

  {
    id: 'canais',
    letter: 'E',
    title: 'Canais e domínio',
    intro:
      'Enquanto um canal não for informado aqui, ele simplesmente não aparece no site.',
    questions: [
      {
        id: 'e1-instagram',
        kind: 'text',
        label: 'URL do Instagram',
        placeholder: 'https://instagram.com/…',
      },
      {
        id: 'e2-whatsapp',
        kind: 'text',
        label: 'WhatsApp em formato internacional',
        placeholder: '+55 81 90000-0000',
      },
      {
        id: 'e3-email',
        kind: 'text',
        label: 'E-mail profissional',
        placeholder: 'contato@…',
      },
      {
        id: 'e4-mensagem-whatsapp',
        kind: 'text',
        multiline: true,
        label: 'Mensagem neutra que abre no WhatsApp',
        prefill: projectConfig.contact.whatsappMessage ?? '',
        guardrail:
          'Nenhuma resposta do formulário é colocada no link do WhatsApp: link não é canal seguro.',
      },
      {
        id: 'e5-slug',
        kind: 'text',
        label: 'Slug desejado para o subdomínio',
        prefill: 'felipecarvalho',
        help: 'Recomendação: felipecarvalho. Evite apelidos informais — o endereço acompanha a identidade profissional por anos.',
      },
      {
        id: 'e6-dominio',
        kind: 'text',
        label: 'Domínio próprio desejado',
        placeholder: 'exemplo.com.br',
      },
      {
        id: 'e7-status-dominio',
        kind: 'choice',
        label: 'Status de compra do domínio',
        options: [
          { value: 'nao-comprado', label: 'Ainda não comprado' },
          { value: 'em-compra', label: 'Em processo de compra' },
          { value: 'comprado', label: 'Já comprado' },
        ],
      },
      {
        id: 'e8-dns',
        kind: 'text',
        label: 'Quem controla o DNS e a renovação do domínio',
      },
      {
        id: 'e9-url-privacidade',
        kind: 'text',
        label: 'URL externa da política de privacidade, se houver',
        help: 'Em branco significa usar a página interna /politica-de-privacidade.',
      },
      {
        id: 'e10-url-termos',
        kind: 'text',
        label: 'URL externa dos termos, se houver',
        help: 'Em branco significa usar a página interna /termos.',
      },
    ],
  },

  {
    id: 'funcionalidades',
    letter: 'F',
    title: 'Funcionalidades',
    intro:
      'Para cada item: o que ele muda na prática e em que categoria de complexidade ele cai. Sem valores — apenas escopo e complexidade.',
    special: 'features',
    questions: [],
  },

  {
    id: 'privacidade',
    letter: 'G',
    title: 'Privacidade e operação',
    intro:
      'A base para a política de privacidade real. Tudo que ficar em branco continua marcado como pendente no site.',
    questions: [
      {
        id: 'g1-controlador',
        kind: 'text',
        label: 'Quem é o controlador dos dados',
        prefill: professional.fullName,
      },
      {
        id: 'g2-operadores',
        kind: 'text',
        multiline: true,
        label: 'Operadores e serviços de terceiros envolvidos',
        placeholder: 'Ex.: hospedagem, serviço de e-mail, planilha, CRM…',
      },
      {
        id: 'g3-finalidades',
        kind: 'text',
        multiline: true,
        label: 'Finalidade de cada campo coletado',
        prefill:
          'Nome: identificar quem procurou. E-mail: retornar o contato. Telefone: contato alternativo. Preferência de contato: usar o canal mais confortável. Disponibilidade: organizar a agenda. Como conheceu: contexto.',
      },
      {
        id: 'g4-base-legal',
        kind: 'text',
        multiline: true,
        label: 'Base legal a validar juridicamente',
        placeholder:
          'Ex.: consentimento e/ou procedimentos preliminares relacionados a contrato',
      },
      {
        id: 'g5-retencao',
        kind: 'text',
        label: 'Prazo de retenção confirmado',
        placeholder: 'Ex.: 180 dias',
      },
      {
        id: 'g6-acesso',
        kind: 'text',
        label: 'Quem terá acesso aos dados',
      },
      {
        id: 'g7-canal-direitos',
        kind: 'text',
        label: 'Canal para o titular exercer seus direitos (LGPD)',
      },
      {
        id: 'g8-exclusao',
        kind: 'text',
        multiline: true,
        label: 'Política de exclusão dos dados',
      },
      {
        id: 'g9-sem-dados-sensiveis',
        kind: 'confirm',
        label:
          'Confirma que o MVP não coletará dados sensíveis (diagnóstico, sintomas, medicação, histórico de saúde, identidade de gênero, orientação sexual, relato clínico)?',
        guardrail:
          'O formulário não pode virar triagem clínica. Esta trava é estrutural no código.',
      },
      {
        id: 'g10-consentimento-case',
        kind: 'confirm',
        label:
          'CONSENTIMENTO 1 — autoriza o uso do site como case do Hudi Pages (menção ao projeto e link)?',
        help: 'Este consentimento é separado e independente do próximo.',
      },
      {
        id: 'g11-consentimento-imagem',
        kind: 'confirm',
        label:
          'CONSENTIMENTO 2 — autoriza o uso de imagem, marca, métricas e depoimento em materiais do Hudi Pages?',
        help: 'Pode ser negado sem afetar o consentimento anterior nem o projeto.',
      },
    ],
  },

  {
    id: 'aprovacao',
    letter: 'H',
    title: 'Aprovação e prioridades',
    intro:
      'Classifique cada requisito e registre as aprovações finais antes do lançamento.',
    special: 'priorities',
    questions: [
      { id: 'h2-aprovar-copy', kind: 'confirm', label: 'Aprova os textos do site?' },
      { id: 'h3-aprovar-layout', kind: 'confirm', label: 'Aprova o layout?' },
      {
        id: 'h4-aprovar-foto-logos',
        kind: 'confirm',
        label: 'Aprova a fotografia e as versões de logo?',
      },
      { id: 'h5-aprovar-links', kind: 'confirm', label: 'Aprova os links e canais?' },
      {
        id: 'h6-aprovar-politica',
        kind: 'confirm',
        label: 'Aprova a política de privacidade e os termos?',
      },
      {
        id: 'h7-responsavel',
        kind: 'text',
        label: 'Responsável final pela aprovação',
      },
      {
        id: 'h8-observacoes',
        kind: 'text',
        multiline: true,
        label: 'Observações livres',
      },
    ],
  },
];

/**
 * Requirements for the priority matrix: the feature list from step F plus the
 * launch approvals, which have no third-party cost but do gate publication.
 */
export const launchRequirements: RequirementDefinition[] = [
  {
    id: 'aprovar-copy',
    label: 'Aprovação dos textos',
    tiers: ['incluido-no-escopo-base'],
    dependency: 'Aprovação do profissional',
  },
  {
    id: 'aprovar-layout',
    label: 'Aprovação do layout',
    tiers: ['incluido-no-escopo-base'],
    dependency: 'Aprovação do profissional',
  },
  {
    id: 'foto-profissional',
    label: 'Fotografia profissional autorizada',
    tiers: ['incluido-no-escopo-base'],
    dependency: 'Material fornecido pelo profissional',
  },
  {
    id: 'logos-finais',
    label: 'Arquivos finais de logo',
    tiers: ['incluido-no-escopo-base'],
    dependency: 'Entrega da identidade visual',
  },
  {
    id: 'politica-privacidade',
    label: 'Política de privacidade revisada juridicamente',
    tiers: ['incluido-no-escopo-base'],
    dependency: 'Revisão jurídica externa',
  },
  {
    id: 'canais-contato',
    label: 'Instagram, WhatsApp e e-mail confirmados',
    tiers: ['incluido-no-escopo-base'],
    dependency: 'Definição do profissional',
  },
  {
    id: 'dominio',
    label: 'Domínio próprio e DNS',
    tiers: ['personalizacao-simples', 'custo-de-terceiro'],
    dependency: 'Registro e renovação do domínio',
  },
  {
    id: 'contatos-emergencia',
    label: 'Aviso e contatos de emergência validados',
    tiers: ['incluido-no-escopo-base'],
    dependency: 'Validação de fonte oficial',
  },
];
