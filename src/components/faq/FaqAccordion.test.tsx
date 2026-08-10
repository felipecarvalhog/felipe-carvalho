import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { FaqItem } from '@/config/types';
import { FaqAccordion } from './FaqAccordion';

const items: FaqItem[] = [
  {
    id: 'faq-online',
    question: { value: 'O atendimento é só on-line?', status: 'confirmado' },
    answer: {
      value: 'Sim. O atendimento é realizado on-line, pela plataforma Google Meet.',
      status: 'confirmado',
    },
  },
  {
    id: 'faq-lista',
    question: { value: 'Como funciona a lista de espera?', status: 'confirmado' },
    answer: { value: 'Felipe entra em contato quando houver vaga.', status: 'confirmado' },
  },
];

describe('FaqAccordion', () => {
  it('starts with every panel collapsed', () => {
    render(<FaqAccordion items={items} />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveAttribute('aria-expanded', 'false');

      // A collapsed panel is removed from the accessibility tree, so it is
      // looked up by the id the trigger points at rather than by role.
      const panelId = button.getAttribute('aria-controls') as string;
      expect(document.getElementById(panelId)).not.toBeVisible();
    }
  });

  it('toggles a panel from the keyboard and keeps aria-expanded in sync', async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    const trigger = screen.getByRole('button', { name: /só on-line/ });

    await user.tab();
    expect(trigger).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('region', { name: 'O atendimento é só on-line?' }),
    ).toBeVisible();

    await user.keyboard(' ');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('points aria-controls at a region that actually exists', async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    const trigger = screen.getByRole('button', { name: /lista de espera/ });
    const panelId = trigger.getAttribute('aria-controls');

    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId as string)).not.toBeNull();

    await user.click(trigger);
    expect(document.getElementById(panelId as string)).toBeVisible();
  });

  it('opens panels independently of each other', async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    const [first, second] = screen.getAllByRole('button');
    await user.click(first as HTMLElement);
    await user.click(second as HTMLElement);

    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('moves focus between headers with the arrow keys', async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    const [first, second] = screen.getAllByRole('button');
    (first as HTMLElement).focus();

    await user.keyboard('{ArrowDown}');
    expect(second).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(first).toHaveFocus();
  });
});
