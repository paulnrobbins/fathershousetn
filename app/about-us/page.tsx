import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'A Christ-centered recovery home in Rhea County, Tennessee — born of Reformers Unanimous, led by faith, and built for lasting change.',
};

/* ════════════════════════════════════════════════════════════════════
 * EDITABLE COPY — /about-us
 *
 * Mode 1 maintenance: edit the strings below to update the page.
 * The mission paragraph + 82% statistic are part of the Phase 1
 * "sacred cows" — change with care.
 * ════════════════════════════════════════════════════════════════════ */

// EDIT HERE: Page header
const HEADER = {
  eyebrow: 'Past the threshold',
  index: '05',
  title: 'Who we are.',
  kicker:
    "A Christ-centered recovery home in Rhea County, Tennessee — born of Reformers Unanimous, led by faith, and built for lasting change in the men we serve and the community we share.",
};

// EDIT HERE: Mission section (kept verbatim per Phase 1 sacred-cow lock)
const MISSION = {
  eyebrow: 'Mission',
  headline:
    'A Christ-centered recovery home for men in Rhea County, Tennessee.',
  body: [
    "Our Father's House exists to walk men out of incarceration and addiction and into a Christ-centered, structured, brotherhood-built life. We do this through the Reformers Unanimous recovery program, daily discipleship, and the practical disciplines of work, finances, and family.",
    'We are a registered 501(c)(3) nonprofit. The men who live in the house are not customers — they are sons, brothers, and disciples. Every part of this work is built that way.',
  ],
};

// EDIT HERE: Reformers Unanimous partnership block
const RU_PARTNERSHIP = {
  eyebrow: 'Reformers Unanimous',
  headline: 'A program with two-year staying power.',
  body: 'Reformers Unanimous is a Christ-centered addiction recovery program with a documented track record. The 82% figure is not marketing — it is the published outcome rate for men who complete the Reformers Unanimous program in Rockford, IL and remain in recovery two years after graduation. We adopted the RU model because the long arc is the only arc that matters.',
  stat: '82%',
  statLabel:
    'of men completing the Reformers Unanimous program in Rockford, IL remain in recovery two years after graduation.',
};

// EDIT HERE: Three pillars of the program model
const PILLARS = [
  {
    n: '01',
    label: 'Recovery',
    body: 'A structured walk out of substance dependence — beside men who have walked it themselves.',
  },
  {
    n: '02',
    label: 'Discipleship',
    body: 'Daily life with Christ — scripture, prayer, and accountability inside a brother-led house.',
  },
  {
    n: '03',
    label: 'Life Skills',
    body: 'Work, finances, family — the practical disciplines that hold a free life in place.',
  },
];

// EDIT HERE: Where & where we serve (Rhea County context)
const PLACE = {
  eyebrow: 'Place',
  headline: 'Rhea County, Tennessee.',
  body: 'The house sits in Rhea County, where, in 2021, drug arrests reached roughly 1,279.96 per 100,000 residents — among the highest rates in Tennessee. The need for this work is not theoretical here. It is on every street.',
  cta: { label: 'See the data — Scene 03 of the home page', href: '/' },
};

// EDIT HERE: Board of Directors + general staff/officers
const LEADERSHIP = {
  eyebrow: 'Leadership',
  headline: 'Led by people who walk beside the men.',
  officers: [
    { role: 'President', name: 'Jonathan Jouben' },
    { role: 'Treasurer', name: 'Steve Zimmerman' },
    { role: 'Secretary', name: 'Jim Woychuk' },
  ],
  boardMembers: [
    'Al Buxton',
    'Justin Dannel',
    'Bob Nordyke',
    'Justin Evans',
    'Rusty Tew',
    'Brian Miller',
    'Paul Robbins',
  ],
};

// EDIT HERE: Statement of Faith — the doctrinal articles every board
// member subscribes to. Each article has a heading + body. Scripture
// references stay inside the body string; the page renders them as
// emphasized inline text via the (parenthetical) convention.
const STATEMENT_OF_FAITH = {
  eyebrow: 'Statement of Faith',
  headline: 'What we believe.',
  articles: [
    {
      heading: "God's Word",
      body: "WE BELIEVE… That the Holy Scriptures are the verbally inspired word of God and are the final authority for faith, life, and conduct; that they were given without error and are preserved without error. (1 Cor. 2:7-14; 2 Tim. 3:16-17; Heb. 4:12; 2 Pet. 1:21)",
    },
    {
      heading: 'Salvation',
      body: 'WE BELIEVE… That salvation is by grace, through faith in the substitutionary work of the Son of God, the just dying for the unjust. That all true believers are eternally secure in Christ. (John 10:15; Rom. 3:24,25; 4:25; 5:8-9; 8:34; 1 Cor. 3:15; 15:3, 20; Heb. 9:12-22; 1 Pet. 2:24, 3:18)',
    },
    {
      heading: 'Holy Spirit',
      body: "WE BELIEVE… That the Holy Spirit was active in the creation; that in His relation to the unbelieving world He restrains the Evil one until God's purpose is fulfilled; that He convicts of sin, of judgment and of righteousness; that He bears witness to the Truth of the Gospel in preaching and testimony; and that He is the agent in the New Birth: that he seals, indues, guides, teaches, witnesses, sanctifies and helps the believer. We believe the sign gifts are not necessary to justification and sanctification. (John 16:7-9; Rom. 8:9; 1 Cor. 1:22; 2:10-13; 13:8; 14:21-22; 2 Cor. 3:6; 3:18; 12:12; Eph. 1:13; 4:7-12, 30; 5:18; Heb. 9:14; 5:18)",
    },
    {
      heading: "Christ's Return",
      body: 'WE BELIEVE… That the return of Jesus Christ is both sure and soon coming; that this second coming will be a literal, bodily, personal return both for His bride, the church, and subsequently to set up His literal physical kingdom on the earth; that there will be a bodily resurrection for the just and unjust to join their souls for a final judgment, the unjust to an eternal conscious punishment in the lake of fire, the just to an eternal conscious blessedness in the city of God. (Acts 1:9-11; 1 Thess. 4:16-18; Rev. 3:21, 20:1-15)',
    },
    {
      heading: 'Local Church',
      body: "WE BELIEVE… That the local church is essential for spiritual growth, where are practiced the two ordinances: water baptism and the Lord's Supper. (Acts 8:36-39; 2:38-42; 1 Cor. 11:23-32; 12:12-13; Col. 1:18; Heb. 10:24-25)",
    },
    {
      heading: 'Marriage',
      body: "WE BELIEVE… That God has commanded that no sexual activity be engaged in outside of a marriage between one man and one woman. We believe that anything other than this is a sinful perversion of God's gift of sex. We believe that God disapproves of and forbids any attempt to alter one's biological sex by any means. (Gen. 2:24; 19:5, 13; 28-9; Lev. 18:1-30; Rom. 1:26-29; 1 Cor. 5:1; 6:9; 1 Thess. 4:1-8; Heb. 13:4)",
    },
  ],
};

export default function AboutUsPage() {
  return (
    <>
      <PageHeader
        eyebrow={HEADER.eyebrow}
        index={HEADER.index}
        title={HEADER.title}
        kicker={HEADER.kicker}
      />

      {/* ─── Mission ──────────────────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
                    <div className="md:col-start-4 md:col-span-9">
            <h2
              className="font-display text-balance text-fg"
              style={{
                fontSize: 'clamp(2.25rem, 6vw, 4rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
              }}
            >
              {MISSION.headline}
            </h2>
            <div className="mt-10 max-w-2xl space-y-6 text-pretty leading-relaxed" style={{ fontSize: '1.125rem', color: 'var(--fg-muted)' }}>
              {MISSION.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RU partnership + 82% ─────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
                    <div className="md:col-start-4 md:col-span-9">
            <h2
              className="font-display-soft text-balance text-fg"
              style={{
                fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              {RU_PARTNERSHIP.headline}
            </h2>
            <p
              className="mt-8 max-w-2xl text-pretty leading-relaxed"
              style={{ fontSize: '1.0625rem', color: 'var(--fg-muted)' }}
            >
              {RU_PARTNERSHIP.body}
            </p>

            {/* Stat — large editorial figure */}
            <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-hairline pt-8">
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(4rem, 12vw, 9rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: 'rgb(var(--brass))',
                }}
              >
                {RU_PARTNERSHIP.stat}
              </span>
              <p
                className="font-mono max-w-md text-[0.6875rem] uppercase leading-relaxed tracking-[0.18em]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {RU_PARTNERSHIP.statLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Three pillars ────────────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
                    <div className="md:col-start-4 md:col-span-9 grid gap-10 sm:grid-cols-3 sm:gap-x-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.n}>
                <h3
                  className="font-display text-fg"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.4vw, 1.875rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {pillar.label}
                </h3>
                <p
                  className="mt-3 text-pretty text-sm leading-relaxed"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Place — Rhea County ──────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
                    <div className="md:col-start-4 md:col-span-9">
            <h2
              className="font-display-soft text-balance text-fg"
              style={{
                fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              {PLACE.headline}
            </h2>

            {/* The actual house — Rhea County, TN */}
            <figure className="mt-10">
              <div className="relative overflow-hidden border border-hairline">
                <img
                  src="/photos/the-house.jpg"
                  alt="Our Father's House — the navy blue house in Rhea County, Tennessee"
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption
                className="font-mono mt-3 text-[0.6875rem] uppercase tracking-[0.22em]"
                style={{ color: 'var(--fg-quiet)' }}
              >
                Our Father&rsquo;s House &middot; 165 Landfill Rd, Dayton, TN
              </figcaption>
            </figure>

            <p
              className="mt-10 max-w-2xl text-pretty leading-relaxed"
              style={{ fontSize: '1.0625rem', color: 'var(--fg-muted)' }}
            >
              {PLACE.body}
            </p>
            <div className="mt-8">
              <Link
                href={PLACE.cta.href}
                className="link-brass font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
              >
                <span>{PLACE.cta.label}</span>
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Leadership ──────────────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
                    <div className="md:col-start-4 md:col-span-9">
            <h2
              className="font-display-soft text-balance text-fg"
              style={{
                fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              {LEADERSHIP.headline}
            </h2>

            {/* Officers — Board of Directors */}
            <div className="mt-12">
              <ul className="space-y-4">
                {LEADERSHIP.officers.map((o) => (
                  <li
                    key={o.role}
                    className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-hairline pb-4"
                  >
                    <span
                      className="font-mono text-[0.6875rem] uppercase tracking-[0.22em]"
                      style={{ color: 'rgb(var(--brass))' }}
                    >
                      {o.role}
                    </span>
                    <span
                      className="font-display-soft"
                      style={{
                        fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.015em',
                        color: 'var(--fg)',
                      }}
                    >
                      {o.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Board Members */}
            <div className="mt-12">
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {LEADERSHIP.boardMembers.map((name) => (
                  <li
                    key={name}
                    className="font-display-soft border-b border-hairline pb-3"
                    style={{
                      fontSize: 'clamp(1.125rem, 1.6vw, 1.25rem)',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      color: 'var(--fg)',
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Statement of Faith ──────────────────────────────────── */}
      <section className="container-edge pb-section">
        <div className="rule-h mb-16" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
                    <div className="md:col-start-4 md:col-span-9">
            <h2
              className="font-display-soft text-balance text-fg"
              style={{
                fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              {STATEMENT_OF_FAITH.headline}
            </h2>

            <div className="mt-12 space-y-12">
              {STATEMENT_OF_FAITH.articles.map((article) => (
                <article
                  key={article.heading}
                  className="border-t border-hairline pt-8"
                >
                  <div>
                    <h3
                      className="font-display text-fg"
                      style={{
                        fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {article.heading}
                    </h3>
                  </div>
                  <p
                    className="mt-5 max-w-3xl text-pretty leading-relaxed"
                    style={{
                      fontSize: 'clamp(1rem, 1.3vw, 1.0625rem)',
                      color: 'var(--fg-muted)',
                    }}
                  >
                    {article.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
