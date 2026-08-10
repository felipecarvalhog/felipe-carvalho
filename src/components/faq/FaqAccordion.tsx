'use client';

import { useRef, useState } from 'react';
import type { FaqItem } from '@/config/types';
import styles from './FaqAccordion.module.css';

/**
 * Accordion following the ARIA authoring practice: a heading wraps a button
 * that owns `aria-expanded` and points at a region that always exists in the
 * DOM (hidden, not removed), so `aria-controls` is never dangling.
 * Panels open independently — closing one never hides another.
 */
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIds, setOpenIds] = useState<readonly string[]>([]);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const toggle = (id: string) => {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const buttons = buttonsRef.current.filter(
      (button): button is HTMLButtonElement => button !== null,
    );
    if (buttons.length === 0) return;

    const focusAt = (target: number) => {
      event.preventDefault();
      buttons[(target + buttons.length) % buttons.length]?.focus();
    };

    switch (event.key) {
      case 'ArrowDown':
        focusAt(index + 1);
        break;
      case 'ArrowUp':
        focusAt(index - 1);
        break;
      case 'Home':
        focusAt(0);
        break;
      case 'End':
        focusAt(buttons.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${item.id}-trigger`;
        const panelId = `${item.id}-panel`;

        return (
          <div key={item.id} className={styles.item} data-state={isOpen ? 'open' : 'closed'}>
            <h3 className={styles.heading}>
              <button
                ref={(node) => {
                  buttonsRef.current[index] = node;
                }}
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className={styles.question}>{item.question.value}</span>
                <span className={styles.icon} aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <p className={styles.answer}>{item.answer.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
