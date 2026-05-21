'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { Faq } from '@/data/faqs';
import { usePrefersReducedMotion } from '@/lib/motion';

/* ────────────────────────────────────────────────────────────────────
 * FaqItem
 *
 * Accordion-style FAQ entry. Built on native <details>/<summary> for
 * accessibility (keyboard, screen readers, "find in page") with a
 * subtle layered visual treatment:
 *
 *   - Question is Fraunces, fluid sized, with a brass plus/cross marker
 *     on the right that rotates 45° when expanded
 *   - Hairline rule under each item; brass on hover
 *   - Animated max-height reveal, eased — falls back to instant on
 *     prefers-reduced-motion
 *
 * Implementation note on the animation: <details> doesn't natively
 * animate. We listen for the toggle event and run a small height
 * transition on the answer pane. The native open/close still works
 * for users with JS disabled.
 * ──────────────────────────────────────────────────────────────────── */

interface FaqItemProps {
  faq: Faq;
  /** 1-indexed position within its category. Decorative. */
  index?: number;
}

export function FaqItem({ faq, index }: FaqItemProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Sync local open state from native <details> open attribute so the
  // marker rotation and content height transition stay in lockstep
  // with native behavior (keyboard space, SR action, browser find).
  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    const onToggle = () => setOpen(el.open);
    el.addEventListener('toggle', onToggle);
    return () => el.removeEventListener('toggle', onToggle);
  }, []);

  return (
    <details
      ref={detailsRef}
      className="faq-item group border-b border-hairline transition-colors duration-300 hover:border-[rgb(var(--brass)/0.5)]"
    >
      <summary
        className={clsx(
          'faq-item__summary list-none cursor-pointer select-none',
          'flex items-baseline gap-6 py-7 sm:py-8',
          'transition-colors duration-300'
        )}
      >
        {typeof index === 'number' && (
          <span
            className="font-mono text-[0.6875rem] uppercase tracking-[0.22em]"
            style={{ color: 'rgb(var(--brass))' }}
            aria-hidden="true"
          >
            {String(index).padStart(2, '0')}
          </span>
        )}

        <h3
          className="font-display-soft flex-1 text-balance"
          style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.625rem)',
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            color: 'var(--fg)',
          }}
        >
          {faq.question}
        </h3>

        <span
          aria-hidden="true"
          className={clsx(
            'faq-item__marker relative ml-auto inline-block',
            'h-3 w-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            open ? 'rotate-45' : 'rotate-0'
          )}
          style={{ color: 'rgb(var(--brass))' }}
        >
          {/* Plus icon — rotates 45° to become an × on open */}
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        </span>
      </summary>

      <div
        ref={contentRef}
        className={clsx(
          'faq-item__answer overflow-hidden',
          prefersReducedMotion
            ? 'duration-0'
            : 'transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
        )}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
        }}
      >
        <div className="min-h-0">
          <p
            className="pb-8 text-pretty leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
              color: 'var(--fg-muted)',
              maxWidth: '52rem',
            }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </details>
  );
}
