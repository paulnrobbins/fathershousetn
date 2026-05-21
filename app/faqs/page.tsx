import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { FaqItem } from '@/components/content/FaqItem';
import { FAQS, type Faq } from '@/data/faqs';

export const metadata: Metadata = {
  title: "FAQ's",
  description:
    'What you need to know about eligibility, daily life in the house, the program structure, and what comes after graduation.',
};

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — /faqs
 *
 * Mode 1 maintenance: edit individual questions/answers in
 * `data/faqs.ts`. Edit the page-level header copy below.
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Page header
const HEADER = {
  eyebrow: 'Pre-threshold · For the man',
  index: '02',
  title: 'Questions, answered.',
};

// EDIT HERE: Section labels (the four FAQ categories from data/faqs.ts)
const SECTION_LABELS: Record<NonNullable<Faq['category']>, string> = {
  apply: 'Applying',
  program: 'The program',
  support: 'Standing with us',
  general: 'General',
};

const SECTION_ORDER: NonNullable<Faq['category']>[] = [
  'apply',
  'program',
  'support',
  'general',
];

export default function FaqsPage() {
  // Group FAQs by category, preserving authoring order within each group.
  const grouped = FAQS.reduce<Record<string, Faq[]>>((acc, faq) => {
    const cat = faq.category ?? 'general';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  // If no FAQs at all, render a graceful state with contact callout.
  const hasAny = FAQS.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={HEADER.eyebrow}
        index={HEADER.index}
        title={HEADER.title}
      />

      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />

        {hasAny ? (
          <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-3">
              <p className="micro-label micro-label--brass">FAQ</p>
            </div>

            <div className="md:col-span-9 space-y-20">
              {SECTION_ORDER.map((cat) => {
                const items = grouped[cat];
                if (!items || items.length === 0) return null;

                return (
                  <div key={cat}>
                    <h2
                      className="font-display-soft mb-6 text-fg"
                      style={{
                        fontSize: 'clamp(1.625rem, 3vw, 2.25rem)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {SECTION_LABELS[cat]}
                    </h2>

                    <div>
                      {items.map((faq, i) => (
                        <FaqItem key={faq.id} faq={faq} index={i + 1} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-hairline px-6 py-16 text-center">
            <p
              className="font-mono text-[0.6875rem] uppercase tracking-[0.22em]"
              style={{ color: 'var(--fg-quiet)' }}
            >
              FAQ entries coming soon — edit data/faqs.ts to add them.
            </p>
          </div>
        )}
      </section>

      {/* ─── Did this miss your question? ─────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-12" />
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-3">
            <p className="micro-label">Still wondering?</p>
          </div>
          <div className="md:col-span-9">
            <p
              className="font-display-soft text-balance text-fg"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              If your question is not here, the fastest way to get an answer
              is to call or email us directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                href="/contact-us"
                className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
              >
                <span>Contact us</span>
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <Link
                href="/future-applicants"
                className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
              >
                <span>If you&rsquo;re thinking of applying</span>
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
