import { scopeTierLabels } from '@/config/content/scope';
import { projectConfig } from '@/config/project.config';
import type { ScopeTier } from '@/config/types';
import { launchRequirements, wizardSteps } from './questions';
import type {
  Answers,
  ConfirmValue,
  FeatureChoice,
  MatrixRow,
  Priority,
  Question,
} from './wizard-types';

export const confirmLabels: Record<ConfirmValue, string> = {
  sim: 'Sim',
  nao: 'Não',
  'a-definir': 'A definir',
};

export const featureLabels: Record<FeatureChoice, string> = {
  'nao-quero': 'Não quero',
  'quero-agora': 'Quero agora',
  'talvez-depois': 'Talvez depois',
};

export const priorityLabels: Record<Priority, string> = {
  obrigatorio: 'Obrigatório para lançamento',
  desejavel: 'Desejável',
  futuro: 'Futuro',
};

export const contentDecisionLabels = {
  aprovado: 'Aprovado como está',
  editar: 'Editado',
  remover: 'Remover do site',
} as const;

const SCOPE_TIERS: ScopeTier[] = ['incluido-no-escopo-base'];

const splitTiers = (tiers: readonly ScopeTier[]) => {
  const escopo = tiers.filter((tier) => SCOPE_TIERS.includes(tier));
  const complexidade = tiers.filter(
    (tier) => tier.startsWith('personalizacao') && !SCOPE_TIERS.includes(tier),
  );
  const terceiro = tiers.includes('custo-de-terceiro');

  return {
    escopo: escopo.length
      ? escopo.map((tier) => scopeTierLabels[tier]).join(' + ')
      : 'Fora do escopo-base',
    complexidade: complexidade.length
      ? complexidade.map((tier) => scopeTierLabels[tier]).join(' + ')
      : '—',
    terceiro,
  };
};

const answerToText = (
  question: Question,
  answers: Answers,
): { text: string; pending: boolean } => {
  const answer = answers.fields[question.id];

  if (!answer) return { text: '—', pending: true };

  switch (answer.kind) {
    case 'text':
      return {
        text: answer.value.trim() || '—',
        pending: answer.value.trim().length === 0,
      };
    case 'choice': {
      if (!answer.value) return { text: '—', pending: true };
      if (answer.value === '__outro__') {
        const other = answer.other?.trim() ?? '';
        return { text: other || '—', pending: other.length === 0 };
      }
      const option =
        question.kind === 'choice'
          ? question.options.find((item) => item.value === answer.value)
          : undefined;
      return { text: option?.label ?? answer.value, pending: false };
    }
    case 'multi': {
      if (answer.values.length === 0) return { text: '—', pending: true };
      const labels =
        question.kind === 'multi'
          ? answer.values.map(
              (value) =>
                question.options.find((item) => item.value === value)?.label ?? value,
            )
          : answer.values;
      return { text: labels.join(', '), pending: false };
    }
    case 'confirm': {
      const note = answer.note?.trim();
      return {
        text: `${confirmLabels[answer.value]}${note ? ` — ${note}` : ''}`,
        pending: answer.value === 'a-definir',
      };
    }
    case 'file':
      return {
        text: answer.fileName ?? '—',
        pending: !answer.fileName,
      };
    case 'content': {
      const decision = contentDecisionLabels[answer.decision];
      return { text: `${decision}\n\n${answer.text}`, pending: false };
    }
    default:
      return { text: '—', pending: true };
  }
};

export const buildMatrix = (answers: Answers): MatrixRow[] => {
  const featureRows: MatrixRow[] = projectConfig.hudiPages.scopeClassification.map(
    (item) => {
      const { escopo, complexidade, terceiro } = splitTiers(item.tiers);
      const choice = answers.features[item.id];
      const priority = answers.priorities[item.id];

      return {
        id: item.id,
        requisito: item.label,
        prioridade: priority ? priorityLabels[priority] : 'Não classificado',
        escopo,
        complexidade: item.recurring ? `${complexidade} (recorrente)` : complexidade,
        dependencia: terceiro ? 'Serviço de terceiro contratado à parte' : '—',
        decisao: choice ? featureLabels[choice] : 'Não respondido',
      };
    },
  );

  const launchRows: MatrixRow[] = launchRequirements.map((requirement) => {
    const { escopo, complexidade, terceiro } = splitTiers(requirement.tiers);
    const priority = answers.priorities[requirement.id];

    return {
      id: requirement.id,
      requisito: requirement.label,
      prioridade: priority ? priorityLabels[priority] : 'Não classificado',
      escopo,
      complexidade,
      dependencia: terceiro
        ? `${requirement.dependency} (custo de terceiro)`
        : requirement.dependency,
      decisao: '—',
    };
  });

  return [...launchRows, ...featureRows];
};

export const collectPendencias = (answers: Answers): string[] => {
  const pendencias: string[] = [];

  for (const step of wizardSteps) {
    for (const question of step.questions) {
      const { pending } = answerToText(question, answers);
      if (pending) {
        pendencias.push(`${step.letter} · ${question.label}`);
      }
    }
  }

  for (const item of projectConfig.hudiPages.scopeClassification) {
    if (!answers.features[item.id]) {
      pendencias.push(`F · Funcionalidade sem decisão: ${item.label}`);
    }
  }

  for (const row of buildMatrix(answers)) {
    if (row.prioridade === 'Não classificado') {
      pendencias.push(`H · Requisito sem prioridade: ${row.requisito}`);
    }
  }

  return pendencias;
};

export type StructuredExport = {
  meta: {
    projeto: string;
    profissional: string;
    registro: string;
    geradoEm: string;
    versao: string;
    aviso: string;
  };
  etapas: Array<{
    letra: string;
    titulo: string;
    respostas: Array<{ id: string; pergunta: string; resposta: string; pendente: boolean }>;
  }>;
  funcionalidades: Array<{
    id: string;
    item: string;
    decisao: string;
    escopo: string;
    complexidade: string;
    dependencia: string;
  }>;
  matriz: MatrixRow[];
  pendencias: string[];
};

export const buildStructuredExport = (answers: Answers): StructuredExport => ({
  meta: {
    projeto: 'felipe-carvalho-hudi-pages',
    profissional: projectConfig.professional.fullName,
    registro: projectConfig.professional.registration,
    geradoEm: new Date().toISOString(),
    versao: '1',
    aviso:
      'Documento gerado localmente no navegador. Nenhuma resposta foi enviada pela rede.',
  },
  etapas: wizardSteps.map((step) => ({
    letra: step.letter,
    titulo: step.title,
    respostas: step.questions.map((question) => {
      const { text, pending } = answerToText(question, answers);
      return {
        id: question.id,
        pergunta: question.label,
        resposta: text,
        pendente: pending,
      };
    }),
  })),
  funcionalidades: projectConfig.hudiPages.scopeClassification.map((item) => {
    const { escopo, complexidade, terceiro } = splitTiers(item.tiers);
    const choice = answers.features[item.id];
    return {
      id: item.id,
      item: item.label,
      decisao: choice ? featureLabels[choice] : 'Não respondido',
      escopo,
      complexidade,
      dependencia: terceiro ? 'Serviço de terceiro' : '—',
    };
  }),
  matriz: buildMatrix(answers),
  pendencias: collectPendencias(answers),
});

const escapeCell = (value: string): string =>
  value.replace(/\|/g, '\\|').replace(/\n+/g, ' ');

export const buildMarkdown = (answers: Answers): string => {
  const data = buildStructuredExport(answers);
  const lines: string[] = [];

  lines.push(`# Especificação — ${data.meta.projeto}`);
  lines.push('');
  lines.push(`- **Profissional:** ${data.meta.profissional}`);
  lines.push(`- **Registro:** ${data.meta.registro}`);
  lines.push(`- **Gerado em:** ${data.meta.geradoEm}`);
  lines.push(`- **Aviso:** ${data.meta.aviso}`);
  lines.push('');

  lines.push('## Pendências');
  lines.push('');
  if (data.pendencias.length === 0) {
    lines.push('Nenhuma pendência registrada.');
  } else {
    for (const pendencia of data.pendencias) {
      lines.push(`- [ ] ${pendencia}`);
    }
  }
  lines.push('');

  for (const step of data.etapas) {
    lines.push(`## ${step.letra} — ${step.titulo}`);
    lines.push('');
    for (const answer of step.respostas) {
      lines.push(`### ${answer.pergunta}`);
      lines.push('');
      lines.push(answer.pendente ? '_Pendente._' : answer.resposta);
      lines.push('');
    }
  }

  lines.push('## F — Funcionalidades e classificação');
  lines.push('');
  lines.push('| Item | Decisão | Escopo | Complexidade | Dependência |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const feature of data.funcionalidades) {
    lines.push(
      `| ${escapeCell(feature.item)} | ${escapeCell(feature.decisao)} | ${escapeCell(feature.escopo)} | ${escapeCell(feature.complexidade)} | ${escapeCell(feature.dependencia)} |`,
    );
  }
  lines.push('');

  lines.push('## Matriz requisito × prioridade × escopo × complexidade × dependência');
  lines.push('');
  lines.push('| Requisito | Prioridade | Escopo | Complexidade | Dependência | Decisão |');
  lines.push('| --- | --- | --- | --- | --- | --- |');
  for (const row of data.matriz) {
    lines.push(
      `| ${escapeCell(row.requisito)} | ${escapeCell(row.prioridade)} | ${escapeCell(row.escopo)} | ${escapeCell(row.complexidade)} | ${escapeCell(row.dependencia)} | ${escapeCell(row.decisao)} |`,
    );
  }
  lines.push('');
  lines.push('> Classificação por complexidade. Nenhum valor financeiro é informado.');
  lines.push('');

  return lines.join('\n');
};

export const summarizeAnswer = answerToText;
