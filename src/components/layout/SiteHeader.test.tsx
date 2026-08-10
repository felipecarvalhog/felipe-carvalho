import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { NavLink } from '@/config/types';
import { SiteHeader } from './SiteHeader';

const nav: NavLink[] = [
  { id: 'nav-sobre', href: '/#sobre', label: { value: 'Sobre', status: 'confirmado' } },
  {
    id: 'nav-duvidas',
    href: '/#duvidas',
    label: { value: 'Dúvidas', status: 'confirmado' },
  },
];

const renderHeader = () =>
  render(
    <SiteHeader
      horizontalLogo={null}
      symbolLogo={null}
      displayName="Felipe Carvalho"
      profession="Psicólogo"
      registration="CRP 02/23810"
      nav={nav}
      cta={{ value: 'Entrar na lista de espera', status: 'confirmado' }}
      ctaHref="/#lista-de-espera"
      homeHref="/"
    />,
  );

const getTrigger = () => screen.getByRole('button', { name: /menu|fechar/i });

describe('SiteHeader mobile menu', () => {
  it('starts closed and advertises its state', () => {
    renderHeader();

    const trigger = getTrigger();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');

    const panelId = trigger.getAttribute('aria-controls') as string;
    expect(document.getElementById(panelId)).not.toBeNull();
    expect(document.getElementById(panelId)).not.toBeVisible();
  });

  it('opens on click and moves focus into the panel', async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = getTrigger();
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const panelId = trigger.getAttribute('aria-controls') as string;
    const panel = document.getElementById(panelId) as HTMLElement;
    expect(panel).toBeVisible();
    expect(panel.contains(document.activeElement)).toBe(true);
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = getTrigger();
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');

    expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
    expect(getTrigger()).toHaveFocus();
  });

  it('keeps Tab inside the panel while it is open', async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = getTrigger();
    await user.click(trigger);

    const panelId = trigger.getAttribute('aria-controls') as string;
    const panel = document.getElementById(panelId) as HTMLElement;
    const focusable = panel.querySelectorAll<HTMLElement>('a[href], button');

    // Cycle past the last item and land back on the first.
    for (let index = 0; index < focusable.length; index += 1) {
      await user.tab();
    }

    expect(panel.contains(document.activeElement)).toBe(true);
  });

  it('always shows the professional identification in the text lockup', () => {
    renderHeader();
    expect(screen.getAllByText(/CRP 02\/23810/).length).toBeGreaterThan(0);
  });
});
