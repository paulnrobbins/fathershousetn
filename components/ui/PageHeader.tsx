/**
 * PageHeader
 * Shared sub-page hero component. Cinematic editorial setup —
 * Fraunces oversized title, mono eyebrow, optional kicker paragraph.
 *
 * Used by all 8 sub-pages to establish architecture before Phase 4 fills
 * in real content.
 */

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  kicker?: string;
  /** Optional Roman numeral or section index (editorial flourish) */
  index?: string;
};

export function PageHeader({ eyebrow, title, kicker, index }: PageHeaderProps) {
  return (
    <header className="container-edge pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-2">
          <p className="micro-label micro-label--brass">{eyebrow}</p>
          {index && (
            <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--fg-quiet)]">
              {index}
            </p>
          )}
        </div>
        <div className="md:col-span-9 md:col-start-3">
          <h1 className="font-display text-display-lg text-balance text-fg">
            {title}
          </h1>
          {kicker && (
            <p className="mt-8 max-w-2xl text-body-xl text-[var(--fg-muted)] text-pretty">
              {kicker}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
