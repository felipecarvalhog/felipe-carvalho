import type { ScopeTier } from '@/config/types';

/** Tri-state so "ainda não sei" is a first-class answer, not an empty field. */
export type ConfirmValue = 'sim' | 'nao' | 'a-definir';

export type ContentDecision = 'aprovado' | 'editar' | 'remover';

export type FeatureChoice = 'nao-quero' | 'quero-agora' | 'talvez-depois';

export type Priority = 'obrigatorio' | 'desejavel' | 'futuro';

export type FieldAnswer =
  | { kind: 'text'; value: string }
  | { kind: 'choice'; value: string; other?: string }
  | { kind: 'multi'; values: string[] }
  | { kind: 'confirm'; value: ConfirmValue; note?: string }
  | { kind: 'file'; fileName?: string }
  | { kind: 'content'; decision: ContentDecision; text: string };

export type Answers = {
  fields: Record<string, FieldAnswer>;
  features: Record<string, FeatureChoice>;
  priorities: Record<string, Priority>;
};

export type ChoiceOption = {
  value: string;
  label: string;
  help?: string;
};

type BaseQuestion = {
  id: string;
  label: string;
  help?: string;
  /** Shown in the wizard when the answer carries a legal or ethical constraint. */
  guardrail?: string;
};

export type Question =
  | (BaseQuestion & { kind: 'text'; multiline?: boolean; prefill?: string; placeholder?: string })
  | (BaseQuestion & { kind: 'choice'; options: ChoiceOption[]; prefill?: string; allowOther?: boolean })
  | (BaseQuestion & { kind: 'multi'; options: ChoiceOption[] })
  | (BaseQuestion & { kind: 'confirm' })
  | (BaseQuestion & { kind: 'file' })
  | (BaseQuestion & { kind: 'content'; current: string });

export type WizardStep = {
  id: string;
  letter: string;
  title: string;
  intro: string;
  questions: Question[];
  /** Steps F and H render a purpose-built control instead of a question list. */
  special?: 'features' | 'priorities';
};

export type MatrixRow = {
  id: string;
  requisito: string;
  prioridade: string;
  escopo: string;
  complexidade: string;
  dependencia: string;
  decisao: string;
};

export type RequirementDefinition = {
  id: string;
  label: string;
  tiers: readonly ScopeTier[];
  dependency: string;
};
