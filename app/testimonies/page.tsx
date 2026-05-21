import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { TestimonyCard } from '@/components/content/TestimonyCard';
import { TESTIMONIES } from '@/data/testimonies';

export const metadata: Metadata = {
  title: 'Testimonies',
  description:
    'These men have done the work — recovery, discipleship, life skills, faith. Their stories are why we keep building.',
};

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — /testimonies
 *
 * Mode 1 maintenance: edit individual testimonies in
 * `data/testimonies.ts`. Edit the page header + video list below.
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Page header
const HEADER = {
  eyebrow: 'Past the threshold',
  index: '03',
  title: 'From prison to purpose.',
};

// EDIT HERE: Video testimonies — YouTube IDs only (the bit after v=).
// To add a video: copy a YouTube share URL, grab the part after "v=",
// and add a new entry below.
const VIDEO_TESTIMONIES = [
  {
    id: 'imJZxNx4bUo',
    name: 'Justin Dannel',
    label: "Justin Dannel's testimony",
  },
  {
    id: 'lki9ZFa9x4s',
    name: 'JT Evans',
    label: "JT Evans's testimony",
  },
];

// EDIT HERE: Tail call-to-action
const TAIL = {
  framing:
    'If their stories sound like the next chapter you need, or the work you want to stand behind — keep going.',
  applicantCta: { label: 'Apply now', href: '/future-applicants' },
  partnerCta: { label: 'Donate now', href: '/donate-now' },
};

export default function TestimoniesPage() {
  return (
    <>
      <PageHeader
        eyebrow={HEADER.eyebrow}
        index={HEADER.index}
        title={HEADER.title}
      />

      {/* ─── Video testimonies ────────────────────────────────────── */}
      {VIDEO_TESTIMONIES.length > 0 && (
        <section className="container-edge pb-section">
          <div className="rule-h mb-16" />
          <p className="micro-label micro-label--brass mb-12">
            Watch their stories
          </p>

          <ul className="grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
            {VIDEO_TESTIMONIES.map((video) => (
              <li key={video.id}>
                <div
                  className="relative w-full overflow-hidden border border-hairline"
                  style={{ aspectRatio: '16 / 9' }}
                >
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.label}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p
                  className="font-display-soft mt-5 text-fg"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {video.name}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ─── Written testimonies ──────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />
        <p className="micro-label micro-label--brass mb-12">In their own words</p>

        {TESTIMONIES.length === 0 ? (
          <div className="border border-dashed border-hairline px-6 py-16 text-center">
            <p
              className="font-mono text-[0.6875rem] uppercase tracking-[0.22em]"
              style={{ color: 'var(--fg-quiet)' }}
            >
              Testimonies coming soon — edit data/testimonies.ts to add them.
            </p>
          </div>
        ) : (
          <div className="grid gap-y-24 md:grid-cols-12 md:gap-x-10 md:gap-y-32">
            {TESTIMONIES.map((t, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={t.id}
                  className={
                    isEven
                      ? 'md:col-span-7'
                      : 'md:col-span-7 md:col-start-6 md:translate-y-12'
                  }
                >
                  <TestimonyCard testimony={t} index={i} variant="page" />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── Tail CTA ─────────────────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-12" />
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5">
            <p className="micro-label micro-label--brass mb-6">Your turn</p>
            <p
              className="font-display text-balance text-fg"
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              {TAIL.framing}
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-4 self-end sm:flex-row">
            <Link
              href={TAIL.applicantCta.href}
              className="inline-flex items-center justify-between gap-3 px-5 py-4 min-w-[15rem] border border-brass text-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-brass hover:text-bg focus-visible:bg-brass focus-visible:text-bg"
            >
              <span>{TAIL.applicantCta.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={TAIL.partnerCta.href}
              className="inline-flex items-center justify-between gap-3 px-5 py-4 min-w-[15rem] bg-brass text-bg border border-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-transparent hover:text-brass focus-visible:bg-transparent focus-visible:text-brass"
            >
              <span>{TAIL.partnerCta.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
