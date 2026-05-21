import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { CONTACT } from '@/data/nav';

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    "Pray, give, mentor, hire, host, partner. The men of Our Father's House are not on an island, and neither are we.",
};

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — /get-involved
 *
 * Mode 1 maintenance: edit the strings below.
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Page header
const HEADER = {
  eyebrow: 'Past the threshold · Donate now',
  index: '04',
  title: 'How to walk alongside us.',
};

// EDIT HERE: The six involvement paths
const PATHS = [
  {
    n: '01',
    label: 'Pray',
    body: 'Pray for the men, the staff, the families they came from, and the families they are building. Reach out and let us put names on your prayer list.',
    cta: { label: 'Reach out to pray with us', href: '/contact-us', external: false },
  },
  {
    n: '02',
    label: 'Give',
    body: 'Beds, food, training, accountability — the cost of recovery is real. A one-time or recurring gift through Zeffy goes farther than you think; Zeffy charges no platform fees on nonprofit donations.',
    cta: { label: 'Donate now', href: '/donate-now', external: false },
  },
  {
    n: '03',
    label: 'Mentor',
    body: 'If you have walked the road of recovery and faith, your time is the most valuable thing you can give. We pair mentors with men in the program for a year of consistent presence.',
    cta: { label: 'Reach out to start', href: '/contact-us', external: false },
  },
  {
    n: '04',
    label: 'Hire',
    body: 'Our men learn the trades, the Word, and the value of an honest day. If your business has openings, we will gladly send you trained, accountable, hard-working brothers.',
    cta: { label: 'Talk with us', href: '/contact-us', external: false },
  },
  {
    n: '05',
    label: 'Host',
    body: 'Host a banquet, a meal, a Bible study, or a sending night at your church. The work is most alive when local churches surround it.',
    cta: { label: 'Plan an event with us', href: '/contact-us', external: false },
  },
  {
    n: '06',
    label: 'Partner',
    body: "Churches, businesses, judges, recovery communities — there is a partner shape for every shape of organization. Tell us what you do; we will tell you how the men of Our Father's House could stand alongside it.",
    cta: { label: 'Start the conversation', href: '/contact-us', external: false },
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow={HEADER.eyebrow}
        index={HEADER.index}
        title={HEADER.title}
      />

      {/* ─── Six involvement paths ────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />
        <p className="micro-label micro-label--brass mb-12">Six ways in</p>

        <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {PATHS.map((path) => (
            <li
              key={path.n}
              className="border-t border-hairline pt-6 transition-colors duration-300 hover:border-brass focus-within:border-brass"
            >
              <p
                className="font-mono mb-4 text-[0.6875rem] uppercase tracking-[0.22em]"
                style={{ color: 'rgb(var(--brass))' }}
              >
                {path.n}
              </p>
              <h3
                className="font-display text-fg"
                style={{
                  fontSize: 'clamp(1.875rem, 3.5vw, 2.625rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {path.label}
              </h3>
              <div className="mt-6">
                {path.cta.external ? (
                  <a
                    href={path.cta.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
                  >
                    <span>{path.cta.label}</span>
                    <span aria-hidden="true" className="ml-1">↗</span>
                  </a>
                ) : (
                  <Link
                    href={path.cta.href}
                    className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
                  >
                    <span>{path.cta.label}</span>
                    <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Tail contact line ────────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-12" />
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-3">
            <p className="micro-label">Talk with us</p>
          </div>
          <div className="md:col-span-9 flex flex-wrap gap-x-10 gap-y-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
