'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { mainNavItems, donateItem } from '@/data/nav';

/**
 * Nav
 * Fixed top nav. Mobile-first per the brief.
 *
 *   Mobile  — wordmark + hamburger; tap reveals full-screen overlay menu
 *             with editorial numbering and oversized Fraunces labels.
 *   Desktop — wordmark + inline nav (md+) + bordered Donate CTA.
 *
 * Backdrop blur only kicks in once user scrolls past the hero so the
 * initial impression is unmediated 3D.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Backdrop intensifies after the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // All non-home items, excluding the Donate Now item (surfaced as CTA)
  const navLinks = mainNavItems.filter(
    (item) => item.href !== '/' && item.href !== donateItem.href
  );

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 transition-all duration-500',
        'before:absolute before:inset-0 before:transition-opacity before:duration-500',
        'before:backdrop-blur-nav before:content-[""]',
        scrolled
          ? 'before:opacity-100 before:bg-bg/70'
          : 'before:opacity-0 before:bg-bg/0'
      )}
      style={{ zIndex: 'var(--z-nav)' }}
    >
      <div className="container-edge relative flex items-center justify-between py-4 md:py-5">
        {/* Wordmark */}
        <Link
          href="/"
          className="relative z-10 flex items-baseline gap-2 font-display text-lg leading-none tracking-tight md:text-xl"
          aria-label="Our Father's House — home"
        >
          <span className="text-fg">Our Father&rsquo;s House</span>
          <span aria-hidden="true" className="hidden text-brass md:inline">
            —
          </span>
          <span
            aria-hidden="true"
            className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] md:inline"
            style={{ color: 'var(--fg-quiet)' }}
          >
            TN
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="relative z-10 hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'relative font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300',
                  active ? 'text-brass' : 'hover:text-fg'
                )}
                style={{ color: active ? undefined : 'var(--fg-muted)' }}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-brass"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Donate CTA + mobile toggle */}
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href={donateItem.href}
            className={clsx(
              'hidden md:inline-flex items-center gap-2 px-5 py-2.5',
              'border border-brass text-brass',
              'font-mono text-[0.6875rem] uppercase tracking-[0.18em]',
              'transition-all duration-300',
              'hover:bg-brass hover:text-bg'
            )}
          >
            <span>Donate</span>
            <span aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden relative h-10 w-10 -mr-2 grid place-items-center"
          >
            <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
            <span
              aria-hidden="true"
              className={clsx(
                'absolute h-px w-6 bg-fg transition-all duration-300',
                open ? 'rotate-45' : '-translate-y-1.5'
              )}
            />
            <span
              aria-hidden="true"
              className={clsx(
                'absolute h-px w-6 bg-fg transition-all duration-300',
                open ? '-rotate-45' : 'translate-y-1.5'
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={clsx(
          'fixed inset-0 lg:hidden transition-opacity duration-500',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        style={{ zIndex: 'var(--z-overlay)' }}
      >
        <div className="absolute inset-0 bg-bg" />

        {/* Close button — always reachable inside the overlay.
            Sits in the same screen position as the hamburger toggle so
            the X feels like a transformation of the original icon. */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-[max(1.25rem,env(safe-area-inset-right))] top-4 z-10 grid h-10 w-10 place-items-center md:top-5"
        >
          <span className="sr-only">Close</span>
          <span
            aria-hidden="true"
            className="absolute h-px w-6 rotate-45 bg-fg"
          />
          <span
            aria-hidden="true"
            className="absolute h-px w-6 -rotate-45 bg-fg"
          />
        </button>

        <nav
          aria-label="Mobile main"
          className="container-edge relative flex h-full flex-col justify-between pt-24 pb-12"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="overflow-hidden border-b border-hairline">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'group flex items-baseline justify-between py-5 transition-colors',
                      active ? 'text-brass' : 'text-fg'
                    )}
                  >
                    <span className="font-display text-3xl tracking-tight sm:text-4xl">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={donateItem.href}
            onClick={() => setOpen(false)}
            className={clsx(
              'mt-8 flex items-center justify-between px-5 py-5',
              'border border-brass text-brass',
              'font-mono text-xs uppercase tracking-[0.18em]'
            )}
          >
            <span>Donate Now</span>
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
