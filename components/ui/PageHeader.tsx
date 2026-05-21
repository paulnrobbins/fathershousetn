/**
 * PageHeader
 * Shared sub-page hero component. Cinematic editorial setup —
 * Fraunces oversized title, optional kicker paragraph. No more
 * mono-uppercase eyebrows or numeric indexes — these read as
 * organizational labels that don't earn their visual weight.
 */

type PageHeaderProps = {
  /** @deprecated No longer rendered — accepted for backwards-compat. */
  eyebrow?: string;
  title: string;
  kicker?: string;
  /** @deprecated No longer rendered — accepted for backwards-compat. */
  index?: string;
};

export function PageHeader({ title, kicker }: PageHeaderProps) {
  return (
    <header className="container-edge pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-11">
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
