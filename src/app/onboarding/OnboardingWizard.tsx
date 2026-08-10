'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { scopeTierLabels } from '@/config/content/scope';
import { projectConfig } from '@/config/project.config';
import { QuestionField } from './Fields';
import {
  buildMarkdown,
  buildMatrix,
  buildStructuredExport,
  collectPendencias,
  featureLabels,
  priorityLabels,
} from './export';
import { launchRequirements, wizardSteps } from './questions';
import type {
  Answers,
  FeatureChoice,
  FieldAnswer,
  Priority,
} from './wizard-types';
import styles from './onboarding.module.css';

const STORAGE_KEY = 'felipe-carvalho-onboarding-v1';

const FEATURE_CHOICES: FeatureChoice[] = ['nao-quero', 'quero-agora', 'talvez-depois'];
const PRIORITIES: Priority[] = ['obrigatorio', 'desejavel', 'futuro'];

const emptyAnswers = (): Answers => ({ fields: {}, features: {}, priorities: {} });

type Persisted = { answers: Answers; stepIndex: number };

const readStorage = (): Persisted | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    if (!parsed.answers) return null;
    return {
      answers: {
        fields: parsed.answers.fields ?? {},
        features: parsed.answers.features ?? {},
        priorities: parsed.answers.priorities ?? {},
      },
      stepIndex: typeof parsed.stepIndex === 'number' ? parsed.stepIndex : 0,
    };
  } catch {
    return null;
  }
};

const download = (filename: string, contents: string, mime: string) => {
  const blob = new Blob([contents], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export function OnboardingWizard() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [transferMessage, setTransferMessage] = useState('');

  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  const summaryIndex = wizardSteps.length;
  const isSummary = stepIndex === summaryIndex;
  const step = wizardSteps[stepIndex];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = readStorage();
      if (stored) {
        setAnswers(stored.answers);
        setStepIndex(Math.min(stored.stepIndex, wizardSteps.length));
      }
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, stepIndex } satisfies Persisted),
      );
    } catch {
      // Private browsing or a full quota: the wizard still works in memory.
    }
  }, [answers, stepIndex, hydrated]);

  // Move focus to the new step heading so keyboard and screen-reader users are
  // not left at the bottom of the previous step.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [stepIndex]);

  const setField = useCallback((id: string, answer: FieldAnswer) => {
    setAnswers((current) => ({
      ...current,
      fields: { ...current.fields, [id]: answer },
    }));
  }, []);

  const setFeature = useCallback((id: string, choice: FeatureChoice) => {
    setAnswers((current) => ({
      ...current,
      features: { ...current.features, [id]: choice },
    }));
  }, []);

  const setPriority = useCallback((id: string, priority: Priority) => {
    setAnswers((current) => ({
      ...current,
      priorities: { ...current.priorities, [id]: priority },
    }));
  }, []);

  const goTo = (index: number) => {
    setStepIndex(Math.max(0, Math.min(index, summaryIndex)));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const reset = () => {
    setAnswers(emptyAnswers());
    setStepIndex(0);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up if storage is unavailable.
    }
    setTransferMessage('Respostas apagadas deste navegador.');
  };

  const copy = async (contents: string, label: string) => {
    try {
      await navigator.clipboard.writeText(contents);
      setTransferMessage(`${label} copiado para a área de transferência.`);
    } catch {
      setTransferMessage(
        `Não foi possível copiar automaticamente. Use o botão de download do ${label}.`,
      );
    }
  };

  const pendencias = collectPendencias(answers);
  const matrix = buildMatrix(answers);
  const structured = buildStructuredExport(answers);
  const markdown = buildMarkdown(answers);
  const scopeItems = projectConfig.hudiPages.scopeClassification;

  return (
    <div className={styles.wizard}>
      <nav aria-label="Progresso do questionário">
        <ol className={styles.steps}>
          {wizardSteps.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.stepChip}
                aria-current={index === stepIndex ? 'step' : undefined}
                data-state={index === stepIndex ? 'current' : 'idle'}
                onClick={() => goTo(index)}
              >
                <span className={styles.stepLetter}>{item.letter}</span>
                <span className={styles.stepName}>{item.title}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className={styles.stepChip}
              aria-current={isSummary ? 'step' : undefined}
              data-state={isSummary ? 'current' : 'idle'}
              onClick={() => goTo(summaryIndex)}
            >
              <span className={styles.stepLetter}>✓</span>
              <span className={styles.stepName}>Resumo</span>
            </button>
          </li>
        </ol>
      </nav>

      {!isSummary && step ? (
        <section className={styles.panel} aria-labelledby="step-title">
          <p className={styles.stepCounter}>
            Etapa {stepIndex + 1} de {wizardSteps.length}
          </p>
          <h2 id="step-title" className={styles.stepTitle} ref={headingRef} tabIndex={-1}>
            {step.letter} — {step.title}
          </h2>
          <p className={styles.stepIntro}>{step.intro}</p>

          {step.special === 'features' ? (
            <div className={styles.featureList}>
              {scopeItems.map((item) => (
                <fieldset key={item.id} className={styles.featureItem}>
                  <legend className={styles.questionLabel}>{item.label}</legend>
                  <p className={styles.questionHelp}>{item.impact}</p>
                  <p className={styles.tierRow}>
                    {item.tiers.map((tier) => (
                      <span key={tier} className={styles.tierChip} data-tier={tier}>
                        {scopeTierLabels[tier]}
                      </span>
                    ))}
                  </p>
                  <div className={styles.choices}>
                    {FEATURE_CHOICES.map((choice) => (
                      <label key={choice} className={styles.choice}>
                        <input
                          type="radio"
                          name={`feature-${item.id}`}
                          value={choice}
                          checked={answers.features[item.id] === choice}
                          onChange={() => setFeature(item.id, choice)}
                        />
                        <span>{featureLabels[choice]}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <p className={styles.guardrail}>
                <span aria-hidden="true">◆</span> A classificação indica apenas
                complexidade e dependências. Nenhum valor é informado aqui.
              </p>
            </div>
          ) : null}

          {step.special === 'priorities' ? (
            <div className={styles.featureList}>
              {[
                ...launchRequirements.map((item) => ({ id: item.id, label: item.label })),
                ...scopeItems.map((item) => ({ id: item.id, label: item.label })),
              ].map((requirement) => (
                <fieldset key={requirement.id} className={styles.featureItem}>
                  <legend className={styles.questionLabel}>{requirement.label}</legend>
                  <div className={styles.choices}>
                    {PRIORITIES.map((priority) => (
                      <label key={priority} className={styles.choice}>
                        <input
                          type="radio"
                          name={`priority-${requirement.id}`}
                          value={priority}
                          checked={answers.priorities[requirement.id] === priority}
                          onChange={() => setPriority(requirement.id, priority)}
                        />
                        <span>{priorityLabels[priority]}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          ) : null}

          <div className={styles.questionList}>
            {step.questions.map((question) => (
              <QuestionField
                key={question.id}
                question={question}
                answer={answers.fields[question.id]}
                onChange={(answer) => setField(question.id, answer)}
              />
            ))}
          </div>

          <div className={styles.navRow}>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => goTo(stepIndex - 1)}
              disabled={stepIndex === 0}
            >
              Voltar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => goTo(stepIndex + 1)}
            >
              {stepIndex === wizardSteps.length - 1 ? 'Ver resumo' : 'Avançar'}
            </button>
          </div>
        </section>
      ) : null}

      {isSummary ? (
        <section className={styles.panel} aria-labelledby="summary-title">
          <h2 id="summary-title" className={styles.stepTitle} ref={headingRef} tabIndex={-1}>
            Resumo e exportação
          </h2>
          <p className={styles.stepIntro}>
            Tudo abaixo foi gerado no seu navegador. Nada foi enviado pela rede e
            nenhuma cobrança é feita.
          </p>

          <h3 className={styles.summaryHeading}>
            Pendências ({pendencias.length})
          </h3>
          {pendencias.length === 0 ? (
            <p>Nenhuma pendência registrada.</p>
          ) : (
            <ul className={styles.pendingList}>
              {pendencias.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          <h3 className={styles.summaryHeading}>Respostas</h3>
          {structured.etapas.map((etapa) => (
            <div key={etapa.letra} className={styles.summaryBlock}>
              <h4 className={styles.summaryStepTitle}>
                {etapa.letra} — {etapa.titulo}
              </h4>
              <dl className={styles.summaryList}>
                {etapa.respostas.map((resposta) => (
                  <div key={resposta.id} className={styles.summaryRow}>
                    <dt>{resposta.pergunta}</dt>
                    <dd data-pending={resposta.pendente ? 'true' : undefined}>
                      {resposta.pendente ? 'Pendente' : resposta.resposta}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <h3 className={styles.summaryHeading}>Funcionalidades escolhidas</h3>
          <dl className={styles.summaryList}>
            {scopeItems.map((item) => (
              <div key={item.id} className={styles.summaryRow}>
                <dt>{item.label}</dt>
                <dd>
                  {answers.features[item.id]
                    ? featureLabels[answers.features[item.id] as FeatureChoice]
                    : 'Não respondido'}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className={styles.summaryHeading}>
            Matriz requisito × prioridade × escopo × complexidade × dependência
          </h3>
          <div className={styles.tableWrapper} tabIndex={0} role="group" aria-label="Matriz de requisitos">
            <table className={styles.matrix}>
              <caption className="visually-hidden">
                Matriz de requisitos com prioridade, escopo, complexidade,
                dependência e decisão
              </caption>
              <thead>
                <tr>
                  <th scope="col">Requisito</th>
                  <th scope="col">Prioridade</th>
                  <th scope="col">Escopo</th>
                  <th scope="col">Complexidade</th>
                  <th scope="col">Dependência</th>
                  <th scope="col">Decisão</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.requisito}</th>
                    <td>{row.prioridade}</td>
                    <td>{row.escopo}</td>
                    <td>{row.complexidade}</td>
                    <td>{row.dependencia}</td>
                    <td>{row.decisao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className={styles.summaryHeading}>Exportar</h3>
          <div className={styles.exportRow}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => copy(JSON.stringify(structured, null, 2), 'JSON')}
            >
              Copiar JSON
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                download(
                  'felipe-carvalho-onboarding.json',
                  JSON.stringify(structured, null, 2),
                  'application/json',
                )
              }
            >
              Baixar JSON
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => copy(markdown, 'Markdown')}
            >
              Copiar Markdown
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                download('felipe-carvalho-onboarding.md', markdown, 'text/markdown')
              }
            >
              Baixar Markdown
            </button>
          </div>

          <p aria-live="polite" className={styles.transferMessage}>
            {transferMessage}
          </p>

          <details className={styles.rawDetails}>
            <summary>Ver especificação em Markdown</summary>
            <pre className={styles.raw}>{markdown}</pre>
          </details>

          <div className={styles.navRow}>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => goTo(summaryIndex - 1)}
            >
              Voltar
            </button>
            <button type="button" className="btn btn-quiet" onClick={reset}>
              Apagar respostas deste navegador
            </button>
          </div>
        </section>
      ) : null}

      <p className="visually-hidden" aria-live="polite">
        {isSummary
          ? 'Resumo final'
          : `Etapa ${stepIndex + 1} de ${wizardSteps.length}: ${step?.title ?? ''}`}
      </p>
    </div>
  );
}
