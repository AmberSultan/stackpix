/* ============================================================================
 *  SITE CONFIG — the single source of truth for every word on this website.
 *
 *  POSITIONING NOTE (read before editing):
 *
 *  Stackpixx is a new studio. This copy is written to be true on day one — it
 *  claims no project count, no client roster and no testimonials that do not
 *  exist. Instead it competes on terms a new studio can genuinely offer and a
 *  large agency usually cannot: fixed pricing, direct access to the builder,
 *  a speed guarantee, and full ownership.
 *
 *  If you add a number to this file, make sure you could prove it on request.
 *  A prospect who catches one invented figure discounts everything else.
 * ==========================================================================*/

export const site = {
  name: 'StackPixx',
  /** Short form used inside the logo mark (1–2 characters look best). */
  mark: 'S',
  /** Legal entity shown in the footer copyright line. */
  legalName: 'StackPixx',

  tagline: 'Don\'t Just Exist. Stand Out',
  /* A `description` field used to sit here but was never rendered — the meta
     description lives in index.html, and two sources for one string drift. */

  email: 'stackpixx@gmail.com',
  location: 'Working with brands worldwide',

  /**
   * Web3Forms access key. Submissions land in the inbox above.
   *
   * Safe to commit — Web3Forms designs this to be public and it is visible in
   * the client bundle either way. It identifies the destination inbox; it
   * grants no access to anything.
   *
   * Empty this string and the contact form stops rendering, with the CTA
   * falling back to buttons. That guard exists because a form which silently
   * fails to send is worse than no form: the visitor believes they got through
   * and you never hear from them.
   */
  contactFormKey: '4ffcdfde-107d-4515-87fc-41ec36058749',

  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/stackpixx/' },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61592625421670',
    },
  ],
} as const

/* ------------------------------------------------------------ enquiry links */

/**
 * Direct-email routes, kept in one place.
 *
 * These are secondary: the contact form is the main way in. They exist as the
 * escape hatch shown alongside it, and as the fallback if the form key is ever
 * cleared. The subject line tells you at a glance which route someone took.
 *
 * There is deliberately no "book a call" route. It asked for the largest
 * commitment a stranger can give, and on a desktop with no mail client the
 * mailto opened an OS app-picker listing web browsers.
 */
const mailTo = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`

export const enquiry = {
  quote: mailTo('Project quote request'),
  audit: mailTo('Free store audit'),
}

/** The CTA renders the contact form only once a key exists. */
export const contactFormEnabled = Boolean(site.contactFormKey)

/** What "what do you need?" offers. Keep these aligned with `services`. */
export const enquiryTypes = [
  'A free audit of my current site',
  'A new Shopify store',
  'Fixing an existing store',
  'A website (React / Next.js)',
  'UI/UX design for a website',
  'Branding or logo design',
  'Social media creatives',
  'Not sure yet',
] as const

/* ---------------------------------------------------------------- navigation */

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Why us', href: '#why-us' },
  { label: 'FAQ', href: '#faq' },
] as const

/* -------------------------------------------------------------------- hero */

export const hero = {
  /** Honest scarcity beats invented volume — but only if you keep it accurate. */
  badge: 'Stop taking orders in the DMs. Start taking them 24/7.',
  /* Three lines rather than two: at 66 characters this headline is roughly
     three times the length of the old one, so it needs the extra break and a
     smaller display size to fit. See --text-display in globals.css. */
  headline: [
    'We Design & Develop',
    'High-Converting Websites',
    'for Growing Businesses.',
  ],
  headlineAccent: 'for Growing Businesses.',
  subline:
    'Shopify Stores • UI/UX Design • React & Next.js Development • Branding • Social Media Design',
  /**
   * Leads with something given rather than something asked for.
   *
   * "Book a Free Call" wanted a slot in a stranger's day before they had any
   * reason to trust us — the highest-commitment thing you can request, from
   * a studio with two case studies and no reviews yet. An audit reverses it:
   * they get proof of how we think before spending anything, and we get a
   * warm conversation instead of a cold one.
   *
   * It scrolls to the form rather than opening email, because a mailto on a
   * desktop with no mail client shows an OS app-picker listing browsers.
   */
  primaryCta: { label: 'Get a free store audit', href: '#contact' },
  secondaryCta: { label: 'See our work', href: '#work' },
  /**
   * One credential plus two promises.
   *
   * "4+ years" is the only claim here about the past, and it is the ordinary
   * kind a buyer expects — keep it accurate by counting the design and dev
   * work you did before Stackpixx existed.
   *
   * A "98% client satisfaction" figure used to sit in the middle slot. It was
   * removed because it cannot be evidenced without a survey, and standing
   * beside "4+ years" it implied a client history the Work section does not
   * show — which puts the honest numbers around it in doubt too.
   *
   * "24h reply" replaced "24/7 support" so the fold matches the FAQ and the
   * Care service card, which both promise a reply within a working day.
   */
  metrics: [
    { value: '4+', label: 'Years of experience' },
    { value: '2–4 wks', label: 'From kickoff to live' },
    { value: '24h', label: 'Reply time' },
  ],
  /**
   * The two floating chips either side of the hero. Deliberately NOT a repeat
   * of `metrics` above — these carry the two commitments that strip does not,
   * so the fold says four things rather than three twice.
   *
   * Keep them consistent with `stats`. They used to be hardcoded in Hero.tsx
   * and drifted into claiming a 98/100 Lighthouse and a 6-week build, both of
   * which contradicted the rest of the page.
   */
  /**
   * Deliberately no price and no free-support window here.
   *
   * Money on the fold invites a visitor to compare on cost before they have
   * seen anything, which is the one frame a new studio cannot win. Pricing is
   * answered properly in the FAQ, where there is room to justify it.
   *
   * Both of these answer an unspoken worry instead, and both cost nothing to
   * honour: "what if the design is wrong and I am stuck with it", and "what if
   * they hold my store hostage".
   */
  chips: [
    { label: 'Design', value: 'Approved by you' },
    { label: 'Ownership', value: '100% yours' },
  ],
} as const

/* ------------------------------------------------------------------ toolbelt */

export type TechName =
  | 'shopify'
  | 'react'
  | 'next'
  | 'typescript'
  | 'tailwind'
  | 'figma'
  | 'node'
  | 'vercel'

/**
 * A capability strip, not a client list. A new studio with two builds cannot
 * fill a "trusted by" row without inventing brands — but showing what the work
 * is built on is both honest and reassuring to a non-technical buyer.
 *
 * The marks are drawn in Icons.tsx as simplified monochrome glyphs, and each
 * one is shown alongside its name — so nothing depends on the drawing being a
 * pixel-accurate reproduction of someone else's trademark. To use official
 * artwork instead, drop each brand's SVG into `public/brand/tech/` and swap the
 * <TechLogo> in TrustedBy.tsx for an <img>.
 */
export const toolbelt: { name: string; logo: TechName }[] = [
  { name: 'Shopify', logo: 'shopify' },
  { name: 'React', logo: 'react' },
  { name: 'Next.js', logo: 'next' },
  { name: 'TypeScript', logo: 'typescript' },
  { name: 'Tailwind', logo: 'tailwind' },
  { name: 'Figma', logo: 'figma' },
  { name: 'Node.js', logo: 'node' },
  { name: 'Vercel', logo: 'vercel' },
]

/* ---------------------------------------------------------------- services */

export type IconName =
  | 'store'
  | 'theme'
  | 'app'
  | 'design'
  | 'code'
  | 'speed'
  | 'shield'
  | 'support'
  | 'brand'
  | 'social'

export type EnquiryType = (typeof enquiryTypes)[number]

export type Service = {
  id: string
  title: string
  description: string
  bullets: string[]
  icon: IconName
  /** Featured cards span two columns on desktop. */
  featured?: boolean
  /**
   * Which dropdown option this card's "Get a quote" preselects in the form.
   * Typed against `enquiryTypes`, so renaming an option there fails the build
   * rather than silently sending people to a value that no longer exists.
   */
  enquiryType: EnquiryType
}

export const services: Service[] = [
  {
    id: 'shopify-development',
    title: 'Shopify Store Development',
    description:
      'A complete store, built and launched. Design, products, payments, shipping and delivery — set up properly so you can run it yourself the day we hand it over.',
    /* "Custom design, not a stock theme" used to sit here. It ruled out
       starting from a premium theme, which is often the right call on budget
       and timeline — so it was a promise that would sometimes have to be
       broken. This says the outcome instead of the method: however we get
       there, the store looks like the brand rather than the template. */
    bullets: [
      'Designed around your brand',
      'Payments & COD configured',
      'Training so you can run it',
    ],
    icon: 'store',
    featured: true,
    enquiryType: 'A new Shopify store',
  },
  {
    id: 'store-rescue',
    title: 'Store Rescue & Rebuild',
    description:
      'Already have a site that is not bringing in orders? We audit it, tell you exactly what is costing you sales, then fix it — or rebuild it if that is genuinely cheaper.',
    bullets: ['Free audit first', 'Fix the leaks, keep the brand', 'No rebuild unless it is warranted'],
    icon: 'shield',
    enquiryType: 'Fixing an existing store',
  },
  {
    id: 'theme-customization',
    title: 'Theme Customization',
    description:
      'Own your look without paying for a full build. We take your theme and shape it into something that actually resembles your brand.',
    bullets: ['Bespoke sections', 'Settings you can edit', 'No page-builder bloat'],
    icon: 'theme',
    enquiryType: 'Fixing an existing store',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description:
      'Interface design grounded in how people really shop on a phone — clear hierarchy, obvious next step, and a checkout with nothing in the way.',
    bullets: ['Mobile-first, always', 'Designed in Figma first', 'Built to convert, not just to look good'],
    icon: 'design',
    featured: true,
    enquiryType: 'UI/UX design for a website',
  },
  {
    id: 'react-next',
    title: 'React / Next.js Development',
    description:
      'Marketing sites, landing pages and custom web apps on the modern React stack — for when Shopify is not the right tool for the job.',
    bullets: ['Next.js & React', 'Type-safe end to end', 'Deployed and documented'],
    icon: 'code',
    enquiryType: 'A website (React / Next.js)',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity & Logo Design',
    description:
      'The system your whole business is built on — a mark that works at every size, and the rules that keep everything after it consistent.',
    bullets: ['Logo design', 'Brand guidelines', 'Typography', 'Colour system'],
    icon: 'brand',
    enquiryType: 'Branding or logo design',
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description:
      'Creative built for the feed, not repurposed from a website. Designed to stop the scroll and sized correctly for every placement.',
    bullets: ['Instagram posts', 'Facebook ads', 'LinkedIn creatives', 'Carousel posts'],
    icon: 'social',
    enquiryType: 'Social media creatives',
  },
]

/* ------------------------------------------------------------- case studies */

export type Project = {
  slug: string
  client: string
  category: string
  year: string
  /** Tints the cover artwork, and is the fallback when `image` is absent. */
  visual: 'fashion' | 'jewelry' | 'beauty' | 'lifestyle'
  /**
   * Real screenshot, served from `public/`. A missing file degrades to the
   * generated mock rather than a broken image.
   */
  image?: string
  /**
   * How `image` is presented.
   *  - `full`  — edge to edge. Best when the store's hero is a big piece of
   *              photography that should carry the card on its own.
   *  - `frame` — inside a browser frame (the default). Best for UI-led screens.
   */
  imageFit?: 'full' | 'frame'
  /** Extra screenshots shown as a gallery inside the case study. */
  gallery?: string[]
  /** Live site. Adds a "Visit site" link to the case study header. */
  url?: string
  summary: string
  overview: string
  stack: string[]
  problem: string
  solution: string
  results: { value: string; label: string }[]
}

/**
 * Results that are safe to show. A placeholder row (`—` or empty) is skipped,
 * and a project whose figures are all placeholders renders no results block at
 * all — so real work can go live before its analytics are in, without the page
 * ever looking half-finished.
 */
export function publishedResults(project: Project) {
  return project.results.filter((result) => {
    const value = result.value.trim()
    return value !== '' && value !== '—'
  })
}

/**
 * Only real work belongs here. One genuine case study with an honest write-up
 * outsells four invented ones — the invented ones cannot survive a single
 * follow-up question.
 *
 * To add your second build (the one delivered through another company): ask
 * that company whether you may show it and how to credit it. "Built for
 * [brand] in partnership with [company]" is normal, and being straight about
 * it reads better than a vague claim.
 */
export const projects: Project[] = [
  {
    slug: 'mira-farms',
    client: 'Mira Farms',
    category: 'Gourmet & gifting — Shopify',
    year: '2026', // ← CHECK ME
    visual: 'lifestyle',
    image: '/projects/mirafarms.webp',
    imageFit: 'full',
    url: 'https://mirafarms.com/',
    summary:
      'A Dubai social enterprise selling saffron, dates and gift boxes — where the gifting route had to be as considered as the product.',
    overview:
      'Mira Farms sells luxury dried fruit, nuts, saffron, honey and chocolate from Dubai Design District under the line "luxury products with social impact", sourcing from Afghan farmers.',
    stack: [
      'Shopify',
      'Liquid',
      'Custom theme',
      'Responsive design',
      'Collection merchandising',
      'Email capture',
    ],
    /* ↓↓↓ VERIFY BEFORE PUBLISHING. These two paragraphs are written from what
       is observable on the live site, not from the actual brief. Replace them
       with what the client really asked for and what you really changed — you
       will be asked about this in a sales call. ↓↓↓ */
    problem:
      'A social enterprise selling luxury gifts has to tell two stories that can easily undercut each other: the product has to feel worth its price, and the farmer-impact story has to be told without turning the shop into a charity appeal. On top of that, most visitors to a brand like this arrive wanting a gift rather than a specific jar of honey — so a catalogue organised purely by product type asks them to do the work.',
    solution:
      'Gifting is promoted to its own top-level route rather than being buried as a collection, with the named boxes doing the choosing for undecided buyers. The impact story lives in a dedicated Story section so it supports the brand without interrupting the buying path, and a first-order code (FIRSTTIME10) converts first-time visitors while they are still on the page.',
    results: [
      { value: '—', label: 'Conversion rate' },
      { value: '—', label: 'Gift box share of orders' },
      { value: '—', label: 'Mobile Lighthouse' },
      { value: '—', label: 'Average order value' },
    ],
  },
  {
    slug: 'ornagems',
    client: 'Ornagems',
    category: 'Jewellery — Shopify',
    year: '2026',
    visual: 'jewelry',
    image: '/projects/ornagems.webp',
    // The Ornagems hero is a full-bleed campaign shot — it earns the whole
    // card. Switch to 'frame' to render it inside browser chrome instead.
    imageFit: 'full',
    url: 'https://sza504-6m.myshopify.com/',
    summary:
      'A launch-ready jewellery storefront built around everyday luxury — and a checkout that steers a cash-on-delivery market toward paying up front.',
    overview:
      'Ornagems by Zahra launched direct-to-consumer with a demi-fine range built for daily wear rather than the vault. The storefront leads with editorial campaign photography and routes shoppers straight into intent-led entry points — New Arrivals, Clearance Sale and Gift for Her — instead of burying everything under a single catalogue.',
    stack: [
      'Shopify',
      'Liquid',
      'Custom theme',
      'Responsive design',
      'WhatsApp Business',
      'Meta Pixel',
    ],
    problem:
      'A brand new label launching into a cash-on-delivery market carries two problems at once. COD ties up working capital and invites refused deliveries, and a store nobody has heard of has no reviews or reputation to lean on when a shopper is deciding whether to trust it with a jewellery purchase.',
    solution:
      'A rotating announcement bar puts a concrete reason to prepay above the fold — Rs. 100 off and no 4% COD surcharge — so the incentive is seen before the cart, not at it. A persistent WhatsApp button turns pre-purchase hesitation into a conversation, a launch-wide 20% offer creates a reason to buy now, and a dedicated gifting route captures buyers shopping for someone else.',
    /* ↓↓↓ Fill these in once the store has 30 days of data. Until then the
       results block hides itself rather than showing empty dashes. ↓↓↓ */
    results: [
      { value: '—', label: 'Prepaid order share' },
      { value: '—', label: 'Conversion rate' },
      { value: '—', label: 'Mobile Lighthouse' },
      { value: '—', label: 'Average order value' },
    ],
  },
]

/* ---------------------------------------------------------------- process */

export const processSteps = [
  {
    title: 'Free audit',
    duration: 'Day 1',
    description:
      'Send us your Instagram or your current site. We come back with what is costing you sales and what we would do about it — written down, no call required, no charge.',
  },
  {
    title: 'Scope & quote',
    duration: 'Day 2–3',
    description:
      'You get a fixed price and a fixed date before anything starts. If we underestimate the work, that is ours to absorb — not a change request halfway through.',
  },
  {
    title: 'Design',
    duration: 'Week 1',
    description:
      'We design the key screens in Figma and show you on your own phone before writing any code. Changes are cheap at this stage and expensive later, so this is where we slow down.',
  },
  {
    title: 'Build',
    duration: 'Week 2–3',
    description:
      'Products, payments, shipping and delivery configured alongside the design. You get a live preview link from day one, so you are never waiting to find out how it is going.',
  },
  {
    title: 'Test',
    duration: 'Week 3',
    description:
      'Real test orders through real payment methods, on real phones. We check the whole path a customer takes, not just that the pages load.',
  },
  {
    title: 'Launch & handover',
    duration: 'Week 4',
    description:
      'Domain, analytics and pixels connected, then we walk you through running it yourself — adding products, editing sections, launching a sale. Recorded, so you can rewatch it.',
  },
  {
    title: 'Aftercare',
    duration: '14 days, included',
    description:
      'Two weeks of fixes and questions included with every build, no retainer required. Almost everything that surfaces after a launch surfaces in that window. Stay on monthly afterwards if it is useful; leave if it is not.',
  },
] as const

/* ------------------------------------------------------------------- stats */

export type Stat = {
  value: number
  suffix: string
  label: string
  caption: string
  /** Fixed decimal places while counting. */
  decimals: number
}

/**
 * Commitments, not history. Every figure here is a promise we control and can
 * be held to on day one — as opposed to a project count, which a new studio
 * can only inflate.
 */
export const stats: Stat[] = [
  /* "90+ Lighthouse" and "24h reply time" were removed here: the first was
     tied to the Speed & Performance service card that no longer exists, and
     reply time now lives in the hero metrics instead, so repeating it here
     would say the same thing twice on one page. */
  {
    // Was 30. A free month of support on a fixed-price build is a large
    // amount of billable time to give away, and most post-launch issues
    // appear within the first fortnight anyway.
    value: 14,
    suffix: '',
    label: 'Days of aftercare',
    caption: 'Included with every build',
    decimals: 0,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Yours to keep',
    caption: 'Store, code, designs and accounts',
    decimals: 0,
  },
]

export const differentiators = [
  {
    title: 'You talk to the person building it',
    description:
      'We are a small studio, so there is no account manager relaying messages and no junior quietly inheriting your project. You get the builder, directly, start to finish.',
  },
  {
    title: 'Fixed price, agreed before we start',
    description:
      'You approve a number and a date up front. If the work takes longer than we estimated, that is our problem to absorb — not an invoice you did not expect.',
  },
  {
    title: 'Built to a speed budget',
    description:
      'Every store ships at 90+ mobile Lighthouse or we keep working until it does. We send you the score at launch so you can check it yourself.',
  },
  {
    title: 'You own everything, from day one',
    description:
      'The Shopify account, the theme code, the Figma file and every login are yours. Nothing is built on something that keeps you tied to us.',
  },
] as const

/* ------------------------------------------------------------ testimonials */

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  /** Rendered as the large pull-quote at the top of the section. */
  featured?: boolean
}

/**
 * EMPTY ON PURPOSE. The section does not render while this array is empty,
 * which is the correct behaviour — an invented testimonial with a stock-photo
 * name is the fastest way to lose a prospect who thinks to check.
 *
 * Ask every client for two lines the week after launch, while they are still
 * pleased. Add the first real one here and the section appears automatically:
 *
 *   { quote: '…', name: '…', role: 'Founder', company: '…', featured: true }
 */
export const testimonials: Testimonial[] = []

/* --------------------------------------------------------------------- FAQ */

export const faqs = [
  {
    question: 'I sell on Instagram already — do I actually need a website?',
    answer:
      'If you are happy answering "price?" fifty times a day, no. A store earns its keep by doing the parts you are doing manually: showing prices and sizes, taking the order and the payment at 2am, and letting a customer buy without waiting for you to reply. Instagram is where people find you; the store is where they buy without you in the room.',
  },
  {
    question: 'How much does a Shopify store cost?',
    answer:
      'Every store is different — cost depends on your products, pages, design complexity and integrations: payments, inventory, apps and the rest. We start with a free audit to understand exactly what you need, then give you a fixed price. Never open-ended hourly billing, and no surprises later.',
    /* Consider adding a starting figure to this answer. "It depends" is the
       most common answer on agency sites and one of the most expensive: a
       visitor who gets no signal on cost usually assumes "expensive" and
       leaves, while everyone who does write in has to be disqualified by
       hand. A floor — "projects start at PKR X" — is not a quote, it is a
       filter that works while you sleep. */
    cta: { label: 'Book your free audit', href: '#contact' },
  },
  {
    question: 'How long does it take?',
    answer:
      'Two to four weeks from kickoff to live for most stores. Simple catalogues land closer to two; anything with custom features or a large product import runs closer to four. You get the date in writing before we start, and a preview link from the first week so you can watch it come together.',
  },
  {
    question: 'My store is already live but it is not getting sales.',
    answer:
      'That is the most common thing we are asked to look at, and it is usually a handful of specific problems rather than a mystery — slow loading on mobile data, no trust signals, a checkout that asks for too much, or products that are hard to find. Send us the link and we will tell you which ones apply to you, free. If a rebuild is not warranted, we will say so.',
  },
  {
    question: 'You are a new studio. Why should I trust you with my brand?',
    answer:
      'Fair question, and here is the honest answer: we are small and new, which is exactly why your project gets our full attention rather than being third in a queue. We de-risk it for you instead of asking you to take our word — a free audit before you spend anything, a fixed price agreed up front, payment split across milestones rather than in advance, and everything in your own accounts from day one. If we disappear tomorrow, you still own a working store.',
  },
  {
    question: 'Do you set up products, payments and delivery too?',
    answer:
      'Yes, all of it. Product uploads, variants and pricing, payment methods including cash on delivery, shipping rates and courier integration, plus the abandoned-cart and order emails. We hand over a store that is ready to take a real order, not an empty shell.',
  },
  {
    question: 'Who owns the store and the code?',
    answer:
      'You do, entirely. The Shopify account is created in your name, the theme code and Figma file are handed over, and you get every login. We do not hold anything hostage and there is no lock-in.',
  },
] as const
