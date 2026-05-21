/**
 * Testimonies — first and last names per Paul's Phase 1 decision.
 * The home page (Phase 4) features 1–2 of these as full-bleed
 * editorial billboards. The /testimonies page lists all of them.
 *
 * EDITING:
 *   1. Add a new testimony by copying an existing entry.
 *   2. The `featured` flag controls whether it appears on the home page.
 *   3. The `excerpt` is what shows in the home billboard; the `full`
 *      text shows on /testimonies and on hover-reveal interactions.
 *   4. Use \n\n inside the `full` string to mark paragraph breaks.
 */

export interface Testimony {
  id: string;
  /** Full first + last name (Paul confirmed Phase 1). */
  name: string;
  /** Year of graduation, or stage in program. Optional. */
  context?: string;
  /** Short pull-quote for the home billboard. <200 chars. */
  excerpt: string;
  /** Full testimony for the /testimonies page. */
  full: string;
  /** True if this should appear on the home page. */
  featured?: boolean;
}

export const TESTIMONIES: Testimony[] = [
  // EDIT HERE: Add a testimony by copying an entry below.
  {
    id: 'jeremy-prather',
    name: 'Jeremy Prather',
    excerpt:
      'Back in prison, I knew that if I was going to serve the Lord, I had to deal with my addiction. There is no magic formula, my brothers; there is just one day at a time resting in the Lord Jesus Christ.',
    full: `My name is Jeremy Prather, and I'm a grateful believer in Jesus Christ and I struggled with drug addiction. First let me say, I do not glorify anything of my past and I give all the glory to my Lord and Savior Jesus Christ who pulled me out of the quicksand of hell and into a new life in His kingdom. I believed I could live anyway I wanted. My motto was "If I can survive in the streets, I can survive in prison."

I took to the streets and started doing drugs at the age of twelve, by age 16 there was no turning back for me…or so I thought. My mother was attracted to drug dealers. I idolized them! I had no relationship with God growing up. I'd been to churches for Easter and even played basketball at one of the churches near the projects. I used to think that if God existed, He had a sick sense of humor. Why would He let a 16-year-old boy be in a motel bathroom sticking needles in his arm? I would plow over people with manipulation in some shape, form, or fashion. This attitude led me to a life of incarcerations and broken relationships.

This lifestyle ultimately led me to an overdose where my heart stopped beating completely. I died right before my mother's eyes. After the doctor got my heart back to beating and my stomach pumped, I laid in ICU for three days. I got out of the hospital and was back on drugs a week later.

Back in prison, I knew that if I was going to serve the Lord, I had to deal with my addiction. There is no magic formula, my brothers; there is just one day at a time resting in the Lord Jesus Christ. Jesus said in John 10:10 "I CAME THAT THEY MAY HAVE LIFE AND HAVE IT MORE ABUNDANTLY." So, I approached my recovery by giving it to Him based on this truth. I had to surrender it all to the Lord and be obedient to His commands for my life and depend on the Holy Spirit to guide and direct me in my recovery. I'm still working on making amends and I probably will be doing it for the rest of my life.

I also had to learn how to forgive; I met my dad when I was 17 years old through drugs. At this point, I and my dad became drug buddies. When I was released from prison after my incarceration my dad had surrendered his life to Christ. We serve a God of reconciliation and my dad was a big part of my conversion and we now have a father and son relationship.

My walk with God has really changed, thanks to a childhood friend (Ryan), who thought it was important enough to share the Gospel with me. I now can stand before God because I have been justified by faith in Jesus Christ! I now have the Spirit of God indwelling me, and where the Spirit of the Lord is there is freedom!

The Bible states: "And they have conquered him by the blood of the Lamb and by the word of their testimony, for they loved not their lives even unto death" (Revelation 12:11). I don't know about you, my brothers, but I want my testimony to be a part of Satan being overthrown! Remember we are at war with Satan and his crew. Are you being a good soldier of Christ? Are you on the front lines fighting this battle?

Postscript. Jeremy's testimony is now published in an in-prison seminary textbook he wrote! Now released from prison, Jeremy is an ordained minister and is a Georgia regional director for an in-prison mentoring ministry.

Look what God can do!`,
    featured: true,
  },
];

export function getFeaturedTestimonies(): Testimony[] {
  return TESTIMONIES.filter((t) => t.featured);
}
