/**
 * FAQ entries — listed on the /faqs page in category-grouped order.
 *
 * EDITING:
 *   - Each FAQ has a question, an answer, and an optional category.
 *   - Categories: 'apply' | 'program' | 'support' | 'general'.
 *   - The /faqs page groups by category in this order:
 *     Applying → The program → Standing with us → General.
 */

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: 'apply' | 'program' | 'support' | 'general';
}

// EDIT HERE: FAQ list. Add new entries with a unique id.
export const FAQS: Faq[] = [
  {
    id: 'who-eligible',
    question: 'Is this program for men and women?',
    answer:
      'Currently it is only for men 18 and up, but we plan on having a program for women in the future.',
    category: 'apply',
  },
  {
    id: 'age-requirement',
    question: 'What is the age requirement?',
    answer: '18 years and older.',
    category: 'apply',
  },
  {
    id: 'acceptance-time',
    question:
      'How long does it take to be accepted once a pre-entry form has been submitted?',
    answer:
      'Acceptance depends on circumstances, but the process can be rapid sometimes.',
    category: 'apply',
  },
  {
    id: 'insurance-needed',
    question: "Is insurance needed to enter Our Father's House?",
    answer: 'No.',
    category: 'apply',
  },
  {
    id: 'cost',
    question: 'What are the costs?',
    answer:
      "Our Father's House is 100% FREE! Just how Jesus wants you to be FREE!",
    category: 'apply',
  },

  {
    id: 'what-is-program',
    question: 'What is the program?',
    answer:
      "Our Father's House offers a residential discipleship program, where the study of God's word in community with mentors and brothers lays the foundation for a life of freedom. The program curriculum is through Reformer's Unanimous (rurecovery.com).",
    category: 'program',
  },
  {
    id: 'program-length',
    question: 'How long is the program?',
    answer:
      'Our program has 4 stages, work at your own pace, designed to be completed in 12 months.',
    category: 'program',
  },
  {
    id: 'faith-based',
    question: "Is Our Father's House faith-based?",
    answer:
      'Yes, all board and staff members subscribe to this doctrinal statement: We believe the Gospel of Jesus Christ is the foundation and pathway to becoming a new creation and thriving with a life that overflows. (2 Corinthians 5:17; John 10:10)',
    category: 'program',
  },
  {
    id: 'counseling',
    question: 'Is counseling provided?',
    answer:
      'We do not provide licensed mental health counseling, however, we do provide a strong evidence based Biblical counseling.',
    category: 'program',
  },
  {
    id: 'transportation',
    question: 'Is transportation provided?',
    answer:
      'Yes, we are able to pick up from Rhea County Justice Center. We offer limited transportation for church, work, and other approved activities.',
    category: 'program',
  },
  {
    id: 'cell-phone',
    question: 'Can I have my cell phone?',
    answer:
      'We do not allow residents access to their cell phones so they can have the best recovery outcome.',
    category: 'program',
  },
  {
    id: 'medication',
    question: 'Do you administer medication?',
    answer: 'All medications must be approved, then are self-administered.',
    category: 'program',
  },
  {
    id: 'meals',
    question: 'Are meals provided?',
    answer: 'Yes.',
    category: 'program',
  },
  {
    id: 'laundry',
    question: 'Are there laundry facilities on site?',
    answer: 'Yes.',
    category: 'program',
  },
  {
    id: 'overnight-passes',
    question: 'Are overnight and weekend passes allowed?',
    answer: 'Yes, in stages 3 and 4 of the program.',
    category: 'program',
  },
  {
    id: 'visits',
    question: 'Are visits from friends and family allowed?',
    answer:
      "No, not on Our Father's House premises. Church attendance is required.",
    category: 'program',
  },
  {
    id: 'car',
    question: "Can I have my car while residing at Our Father's House?",
    answer: 'No.',
    category: 'program',
  },
];
