import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { CONTACT } from '@/data/nav';

export const metadata: Metadata = {
  title: 'Future Applicants',
  description:
    "If you're considering Our Father's House for yourself or someone you love — what we offer, who we serve, and how to take the next step.",
};

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — /future-applicants
 *
 * Mode 1 maintenance: Paul edits the strings below directly. Per the
 * Phase 1 lock there is NO intake form on this page — applicants are
 * routed to email/call. This page's job is to make that path clear,
 * dignified, and frictionless.
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: The page header (eyebrow + index + title + kicker)
const HEADER = {
  eyebrow: 'Pre-threshold · For the man',
  index: '01',
  title: "If you're ready, so are we.",
  kicker:
    'What we look for. What you can expect. How to take the first step.',
};

// EDIT HERE: Eligibility + expectations columns
const COLUMNS = {
  whoWeServe: {
    label: 'Who we serve',
    points: [
      'Men, 18 and older.',
      'Men coming out of incarceration, addiction, or both.',
      'Men ready to live a Christ-centered, structured life with brothers in recovery.',
    ],
  },
  whatToExpect: {
    label: 'What to expect',
    points: [
      'A Christ-centered home where scripture, prayer, and discipleship are the daily rhythm.',
      'A structured Reformers Unanimous recovery program walked beside men who have walked it themselves.',
      'Real life-skills work — job, finances, family — the practical disciplines a free life requires.',
      'Accountability, brotherhood, and time. Real change is slow and worth it.',
    ],
  },
};

// EDIT HERE: What to include when you reach out
const REACH_OUT = {
  label: 'When you reach out, please tell us',
  points: [
    'Your name.',
    'Your current situation — what you are coming out of, or running from.',
    'Where you are right now (city, state, or facility).',
    'How urgent — days, weeks, or just exploring.',
    'When you would be available to start.',
    'A phone number or email we can reach you at.',
  ],
};

export default function FutureApplicantsPage() {
  return (
    <>
      <PageHeader
        eyebrow={HEADER.eyebrow}
        index={HEADER.index}
        title={HEADER.title}
        kicker={HEADER.kicker}
      />

      {/* ─── Eligibility + expectations ───────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />

        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-3">
          </div>
          <div className="md:col-span-9 grid gap-12 md:grid-cols-2 md:gap-x-10">
            <Column data={COLUMNS.whoWeServe} />
            <Column data={COLUMNS.whatToExpect} />
          </div>
        </div>
      </section>

      {/* ─── Reach-out checklist ──────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />

        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-3">
          </div>
          <div className="md:col-span-9">
            <h2
              className="font-display text-balance text-fg"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              {REACH_OUT.label}
            </h2>

            <ol className="mt-10 space-y-4">
              {REACH_OUT.points.map((p, i) => (
                <li
                  key={i}
                  className="border-b border-hairline pb-4"
                >
                  <span
                    className="text-pretty leading-relaxed"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: 'var(--fg)' }}
                  >
                    {p}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Contact methods (the actual ask of this page) ────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />

        <div className="grid gap-10 md:grid-cols-2 md:gap-x-10">
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="group block border border-hairline p-8 transition-colors duration-300 hover:border-brass focus-visible:border-brass"
          >
            <p
              className="font-display text-fg"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              {CONTACT.phone}
            </p>
            <p className="mt-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
              Real people answer. If we miss your call, leave a message — we
              return every voicemail.
            </p>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="group block border border-hairline p-8 transition-colors duration-300 hover:border-brass focus-visible:border-brass"
          >
            <p
              className="font-display break-all text-fg"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              {CONTACT.email}
            </p>
            <p className="mt-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
              Use the checklist above as a guide. We will respond within a
              few days.
            </p>
          </a>
        </div>

        <p
          className="mt-12 max-w-2xl text-pretty leading-relaxed"
          style={{ fontSize: '1.0625rem', color: 'var(--fg-muted)' }}
        >
          If you are calling for a brother, son, or husband — that is fine.
          We will talk with whoever can answer the questions above. The man
          will need to want this for himself before he comes through the door,
          but the conversation can start anywhere.
        </p>

        {/* Cross-link to FAQs */}
        <div className="mt-12">
          <Link
            href="/faqs"
            className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
          >
            <span>Read the frequently asked questions</span>
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─── Small reusable list block ─────────────────────────────────── */
interface ColumnData {
  label: string;
  points: string[];
}

function Column({ data }: { data: ColumnData }) {
  return (
    <div>
      <ul className="space-y-4">
        {data.points.map((p, i) => (
          <li
            key={i}
            className="flex gap-3 border-b border-hairline pb-4 text-pretty leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.0625rem)', color: 'var(--fg)' }}
          >
            <span
              aria-hidden="true"
              className="mt-2 inline-block h-1 w-3 shrink-0"
              style={{ backgroundColor: 'rgb(var(--brass))' }}
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
