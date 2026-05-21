import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
};

/**
 * 404 — keeps the user in the Threshold Cinema world rather than
 * dropping them onto a default Next.js error page.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brass to-transparent opacity-30"
      />

      <div className="container-edge relative z-10 text-center">
        <p className="micro-label micro-label--brass mb-8">Error · 404</p>

        <h1 className="font-display mx-auto max-w-3xl text-display-md text-balance text-fg">
          This door doesn&rsquo;t open here.
        </h1>

        <p
          className="text-body-xl mx-auto mt-8 max-w-md text-balance"
          style={{ color: 'var(--fg-muted)' }}
        >
          The page you&rsquo;re looking for moved, was renamed, or never
          existed. Try the home page.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-3 border border-brass px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-brass transition-all duration-300 hover:bg-brass hover:text-bg"
        >
          <span aria-hidden="true">←</span>
          <span>Back to home</span>
        </Link>
      </div>
    </section>
  );
}
