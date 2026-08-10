'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { BrandLockup } from '@/components/brand/BrandLockup';
import type { AssetRef, ManagedText, NavLink } from '@/config/types';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
  horizontalLogo: AssetRef | null;
  symbolLogo: AssetRef | null;
  displayName: string;
  profession: string;
  registration: string;
  nav: readonly NavLink[];
  cta: ManagedText;
  ctaHref: string;
  homeHref: string;
};

const FOCUSABLE = 'a[href], button:not([disabled])';

export function SiteHeader({
  horizontalLogo,
  symbolLogo,
  displayName,
  profession,
  registration,
  nav,
  cta,
  ctaHref,
  homeHref,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  // Focus trap + Escape, active only while the panel is open.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const items = () => Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    items()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = items();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  // A resize past the breakpoint reveals the desktop nav; the panel must not
  // stay open behind it.
  useEffect(() => {
    if (!open || typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia('(min-width: 56rem)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link
          href={homeHref}
          className={styles.logoLink}
          aria-label={`${displayName}, ${profession} — ir para o início`}
        >
          <span className={styles.logoWide}>
            <BrandLockup
              asset={horizontalLogo}
              displayName={displayName}
              profession={profession}
              registration={registration}
              priority
            />
          </span>
          <span className={styles.logoCompact}>
            <BrandLockup
              asset={symbolLogo}
              displayName={displayName}
              profession={profession}
              registration={registration}
              size="sm"
              showRegistration={false}
            />
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.id}>
                <a className={styles.navLink} href={item.href}>
                  {item.label.value}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a className={`btn btn-primary ${styles.desktopCta}`} href={ctaHref}>
            {cta.value}
          </a>

          <button
            ref={triggerRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => (open ? close(true) : setOpen(true))}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span className={open ? styles.barTopOpen : styles.barTop} />
              <span className={open ? styles.barMidOpen : styles.barMid} />
              <span className={open ? styles.barBottomOpen : styles.barBottom} />
            </span>
            {open ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        className={styles.panel}
        hidden={!open}
        data-state={open ? 'open' : 'closed'}
      >
        <nav className="container" aria-label="Navegação principal em dispositivos móveis">
          <ul className={styles.panelList}>
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  className={styles.panelLink}
                  href={item.href}
                  onClick={() => close(false)}
                >
                  {item.label.value}
                </a>
              </li>
            ))}
          </ul>
          <a
            className={`btn btn-primary ${styles.panelCta}`}
            href={ctaHref}
            onClick={() => close(false)}
          >
            {cta.value}
          </a>
        </nav>
      </div>
    </header>
  );
}
