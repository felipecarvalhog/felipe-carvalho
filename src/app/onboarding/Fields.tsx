'use client';

import { useId } from 'react';
import { confirmLabels, contentDecisionLabels } from './export';
import type {
  ConfirmValue,
  ContentDecision,
  FieldAnswer,
  Question,
} from './wizard-types';
import styles from './onboarding.module.css';

type FieldProps = {
  question: Question;
  answer: FieldAnswer | undefined;
  onChange: (answer: FieldAnswer) => void;
};

const CONFIRM_VALUES: ConfirmValue[] = ['sim', 'nao', 'a-definir'];
const CONTENT_DECISIONS: ContentDecision[] = ['aprovado', 'editar', 'remover'];
const OTHER_VALUE = '__outro__';

function FieldShell({
  question,
  controlId,
  children,
  labelAs = 'label',
}: {
  question: Question;
  controlId?: string;
  children: React.ReactNode;
  labelAs?: 'label' | 'legend';
}) {
  const helpId = `${controlId ?? question.id}-help`;

  return (
    <div className={styles.question}>
      {labelAs === 'label' ? (
        <label className={styles.questionLabel} htmlFor={controlId}>
          {question.label}
        </label>
      ) : (
        <legend className={styles.questionLabel}>{question.label}</legend>
      )}

      {question.help ? (
        <p className={styles.questionHelp} id={helpId}>
          {question.help}
        </p>
      ) : null}

      {question.guardrail ? (
        <p className={styles.guardrail}>
          <span aria-hidden="true">◆</span> {question.guardrail}
        </p>
      ) : null}

      {children}
    </div>
  );
}

export function QuestionField({ question, answer, onChange }: FieldProps) {
  const generatedId = useId();
  const controlId = `${generatedId}-${question.id}`;
  const helpId = question.help ? `${controlId}-help` : undefined;

  if (question.kind === 'text') {
    const value =
      answer?.kind === 'text' ? answer.value : (question.prefill ?? '');

    return (
      <FieldShell question={question} controlId={controlId}>
        {question.multiline ? (
          <textarea
            id={controlId}
            className={styles.textarea}
            rows={4}
            value={value}
            aria-describedby={helpId}
            placeholder={question.placeholder}
            onChange={(event) => onChange({ kind: 'text', value: event.target.value })}
          />
        ) : (
          <input
            id={controlId}
            className={styles.input}
            type="text"
            value={value}
            aria-describedby={helpId}
            placeholder={question.placeholder}
            onChange={(event) => onChange({ kind: 'text', value: event.target.value })}
          />
        )}
      </FieldShell>
    );
  }

  if (question.kind === 'choice') {
    const current =
      answer?.kind === 'choice' ? answer.value : (question.prefill ?? '');
    const other = answer?.kind === 'choice' ? (answer.other ?? '') : '';

    return (
      <fieldset className={styles.fieldset}>
        <FieldShell question={question} labelAs="legend">
          <div className={styles.choices}>
            {question.options.map((option) => (
              <label key={option.value} className={styles.choice}>
                <input
                  type="radio"
                  name={controlId}
                  value={option.value}
                  checked={current === option.value}
                  onChange={() => onChange({ kind: 'choice', value: option.value, other })}
                />
                <span>{option.label}</span>
              </label>
            ))}
            {question.allowOther ? (
              <label className={styles.choice}>
                <input
                  type="radio"
                  name={controlId}
                  value={OTHER_VALUE}
                  checked={current === OTHER_VALUE}
                  onChange={() => onChange({ kind: 'choice', value: OTHER_VALUE, other })}
                />
                <span>Outro</span>
              </label>
            ) : null}
          </div>

          {question.allowOther && current === OTHER_VALUE ? (
            <input
              className={styles.input}
              type="text"
              aria-label={`${question.label} — outro valor`}
              value={other}
              onChange={(event) =>
                onChange({ kind: 'choice', value: OTHER_VALUE, other: event.target.value })
              }
            />
          ) : null}
        </FieldShell>
      </fieldset>
    );
  }

  if (question.kind === 'multi') {
    const values = answer?.kind === 'multi' ? answer.values : [];

    return (
      <fieldset className={styles.fieldset}>
        <FieldShell question={question} labelAs="legend">
          <div className={styles.choices}>
            {question.options.map((option) => (
              <label key={option.value} className={styles.choice}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={values.includes(option.value)}
                  onChange={(event) =>
                    onChange({
                      kind: 'multi',
                      values: event.target.checked
                        ? [...values, option.value]
                        : values.filter((item) => item !== option.value),
                    })
                  }
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </FieldShell>
      </fieldset>
    );
  }

  if (question.kind === 'confirm') {
    const current = answer?.kind === 'confirm' ? answer.value : undefined;
    const note = answer?.kind === 'confirm' ? (answer.note ?? '') : '';

    return (
      <fieldset className={styles.fieldset}>
        <FieldShell question={question} labelAs="legend">
          <div className={styles.choices}>
            {CONFIRM_VALUES.map((value) => (
              <label key={value} className={styles.choice}>
                <input
                  type="radio"
                  name={controlId}
                  value={value}
                  checked={current === value}
                  onChange={() => onChange({ kind: 'confirm', value, note })}
                />
                <span>{confirmLabels[value]}</span>
              </label>
            ))}
          </div>
          <input
            className={styles.input}
            type="text"
            aria-label={`${question.label} — observação`}
            placeholder="Observação (opcional)"
            value={note}
            onChange={(event) =>
              onChange({
                kind: 'confirm',
                value: current ?? 'a-definir',
                note: event.target.value,
              })
            }
          />
        </FieldShell>
      </fieldset>
    );
  }

  if (question.kind === 'file') {
    const fileName = answer?.kind === 'file' ? answer.fileName : undefined;

    return (
      <FieldShell question={question} controlId={controlId}>
        <input
          id={controlId}
          className={styles.input}
          type="file"
          accept="image/*"
          aria-describedby={helpId}
          // Only the file name is read; the file itself never leaves the device.
          onChange={(event) =>
            onChange({ kind: 'file', fileName: event.target.files?.[0]?.name })
          }
        />
        {fileName ? (
          <p className={styles.fileName}>Arquivo selecionado: {fileName}</p>
        ) : null}
      </FieldShell>
    );
  }

  // question.kind === 'content'
  const decision: ContentDecision =
    answer?.kind === 'content' ? answer.decision : 'aprovado';
  const text = answer?.kind === 'content' ? answer.text : question.current;

  return (
    <fieldset className={styles.fieldset}>
      <FieldShell question={question} labelAs="legend">
        <div className={styles.choices}>
          {CONTENT_DECISIONS.map((value) => (
            <label key={value} className={styles.choice}>
              <input
                type="radio"
                name={controlId}
                value={value}
                checked={decision === value}
                onChange={() => onChange({ kind: 'content', decision: value, text })}
              />
              <span>{contentDecisionLabels[value]}</span>
            </label>
          ))}
        </div>

        <label className={styles.subLabel} htmlFor={`${controlId}-text`}>
          Texto atual (edite se quiser)
        </label>
        <textarea
          id={`${controlId}-text`}
          className={styles.textarea}
          rows={Math.min(16, Math.max(5, text.split('\n').length + 2))}
          value={text}
          onChange={(event) =>
            onChange({ kind: 'content', decision, text: event.target.value })
          }
        />
      </FieldShell>
    </fieldset>
  );
}
