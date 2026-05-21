'use client';

import { useState } from 'react';
import clsx from 'clsx';

/* ────────────────────────────────────────────────────────────────────
 * ZeffyEmbed
 *
 * Reusable wrapper around the Zeffy iframe (donations + newsletter).
 * Gives us:
 *   - A consistent sandbox + permission set across every embed
 *   - A skeleton state while the iframe loads (Zeffy can be slow on
 *     first paint and an empty white box would shatter the design)
 *   - A graceful link-out fallback if the iframe fails to load
 *
 * No new dependency — straight HTMLIFrameElement.
 * ──────────────────────────────────────────────────────────────────── */

interface ZeffyEmbedProps {
  /** The Zeffy URL — e.g. EXTERNAL.zeffyDonate from data/nav.ts */
  src: string;
  /** Visible label used by screen readers and in the loading state. */
  title: string;
  /** Embed height. Newsletter forms are short; donate forms are tall. */
  height?: number;
  /** Variant for visual styling and skeleton width. */
  variant?: 'donate' | 'newsletter';
  /** External fallback link text. Defaults per variant. */
  fallbackLabel?: string;
}

export function ZeffyEmbed({
  src,
  title,
  height = 800,
  variant = 'donate',
  fallbackLabel,
}: ZeffyEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const defaultFallback =
    variant === 'donate' ? 'Open the donation form ↗' : 'Open the newsletter signup ↗';

  return (
    <div
      className={clsx(
        'zeffy-embed relative w-full',
        variant === 'newsletter' && 'mx-auto'
      )}
      style={{ minHeight: variant === 'newsletter' ? 220 : 480 }}
    >
      {/* Iframe */}
      {!errored && (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          // Zeffy serves the form from same origin in their embed flow;
          // these attributes match their published embed snippet.
          allow="payment *; clipboard-read; clipboard-write"
          allowTransparency
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={clsx(
            'block w-full transition-opacity duration-500 ease-out',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            height: `${height}px`,
            border: 0,
            colorScheme: 'normal',
          }}
        />
      )}

      {/* Skeleton — covers the iframe while it loads */}
      {!loaded && !errored && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center border border-dashed border-hairline"
          style={{ minHeight: variant === 'newsletter' ? 220 : 480 }}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              className="block h-1.5 w-12 animate-pulse"
              style={{ backgroundColor: 'rgb(var(--brass) / 0.5)' }}
            />
            <p className="micro-label" style={{ color: 'var(--fg-quiet)' }}>
              Loading {variant === 'donate' ? 'donation form' : 'newsletter signup'}
            </p>
          </div>
        </div>
      )}

      {/* Errored fallback — direct link out to Zeffy */}
      {errored && (
        <div className="border border-hairline p-8 text-center">
          <p className="micro-label mb-4" style={{ color: 'var(--fg-muted)' }}>
            The embed couldn&rsquo;t load.
          </p>
          <a
            href={src}
            target="_blank"
            rel="noreferrer noopener"
            className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
          >
            {fallbackLabel ?? defaultFallback}
          </a>
        </div>
      )}
    </div>
  );
}
