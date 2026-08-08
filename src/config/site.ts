/* ============================================================================
 *  SITE CONFIG — the single source of truth for every word on this website.
 *
 *  POSITIONING NOTE (read before editing):
 *
 *  StackPixx is a new studio. This copy is written to be true on day one — it
 *  claims no project count, no client roster and no testimonials that do not
 *  exist. Instead it competes on terms a new studio can genuinely offer and a
 *  large agency usually cannot: fixed pricing, direct access to the builder,
 *  performance as standard, and full ownership.
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
  plan: mailTo('Free plan request'),
}

/** The CTA renders the contact form only once a key exists. */
export const contactFormEnabled = Boolean(site.contactFormKey)

/** What "what do you need?" offers. Keep these aligned with `services`. */
export const enquiryTypes = [
  'A free plan for my brand',
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
   * a studio with two case studies and no reviews yet. A free plan reverses it:
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
      'A complete store, built and launched. Design, products, payments, shipping and delivery, all set up properly so you can run it yourself the day we hand it over.',
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
      'Already have a site that is not bringing in orders? We audit it, tell you exactly what is costing you sales, then fix it, or rebuild it if that is genuinely cheaper.',
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
      'Interface design grounded in how people really shop on a phone: clear hierarchy, obvious next step, and a checkout with nothing in the way.',
    bullets: ['Mobile-first, always', 'Designed in Figma first', 'Built to convert, not just to look good'],
    icon: 'design',
    featured: true,
    enquiryType: 'UI/UX design for a website',
  },
  {
    id: 'react-next',
    title: 'React / Next.js Development',
    description:
      'Marketing sites, landing pages and custom web apps on the modern React stack, for when Shopify is not the right tool for the job.',
    bullets: ['Next.js & React', 'Type-safe end to end', 'Deployed and documented'],
    icon: 'code',
    enquiryType: 'A website (React / Next.js)',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity & Logo Design',
    description:
      'The system your whole business is built on: a mark that works at every size, and the rules that keep everything after it consistent.',
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
  /**
   * Rendered publicly, and shipped inside the JavaScript bundle.
   *
   * Never put a name here you could not publish. Everything in this object
   * reaches the browser: a "confidential" flag hides fields from the page, it
   * does not hide them from anyone who opens devtools. For a client you cannot
   * name, put a descriptor here and keep the real name in a code comment,
   * which is stripped at build time.
   */
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
  /**
   * Runs the case study anonymised: the live link is hidden and the study is
   * labelled "Client confidential".
   *
   * Labelled rather than silently unnamed. Omitting a name looks like hiding
   * something; stating that the client is confidential is a normal line on an
   * agency portfolio and reads as professional.
   *
   * Set to false to publish the real name and link again.
   */
  confidential?: boolean
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
 * Only real work belongs here. Two genuine case studies with honest write-ups
 * outsell six invented ones — the invented ones cannot survive a single
 * follow-up question.
 *
 * Each `problem` and `solution` should describe what the client actually
 * asked for and what you actually changed, because you will be asked about
 * both in a sales call.
 *
 * Both entries currently run `confidential`, so neither carries a client name
 * or a live link. That makes the write-ups unverifiable by design: they show
 * how you think rather than proving what you shipped. A project you own
 * outright — your own concept store, or a direct client — is the thing that
 * closes that gap, and nobody can ask you to take it down.
 */
export const projects: Project[] = [
  {
    slug: 'gifting-brand',
    /* Real client: Mira Farms (mirafarms.com). Kept in this comment only.
       Comments are stripped at build time; anything in the data below ships
       inside the JavaScript bundle and is readable in devtools. */
    client: 'Luxury gifting brand, Dubai',
    category: 'Gourmet & gifting · Custom Shopify theme',
    year: '2026', // ← CHECK ME
    visual: 'lifestyle',
    /* Filename is deliberately generic: an <img src> naming the client would
       identify them just as plainly as the heading would. */
    image: '/projects/gifting-brand.webp',
    imageFit: 'full',
    /* No `url` while confidential. It would ship in the bundle and identify
       the client to anyone who opened devtools. The live URL is in the comment
       above; restore it here if the client can be named. */
    confidential: true,
    summary:
      'A Dubai gifting brand whose storefront had fallen a long way behind its product. Rebuilt as a custom Shopify theme, designed screen by screen in Figma before a line of code was written.',
    overview:
      'A Dubai brand selling saffron, dates, nuts and curated gift boxes, positioned around luxury with social impact and sourcing from Afghan farmers. The range is premium and much of it is bought as a gift, but none of the care that goes into the product was reaching the people buying it.',
    stack: [
      'Figma',
      'Shopify',
      'Liquid',
      'Custom theme',
      'Motion design',
      'Responsive design',
    ],
    /* `**double asterisks**` render bold and brighter — see ui/RichText.tsx.
       Mark the argument, not the adjectives: one or two runs per paragraph,
       on the sentence a skimmer should leave with. */
    problem:
      'The existing site worked, which is **the hardest kind of problem to justify fixing**. It was simply dated, visually flat, entirely static, and built on a template that had never been shaped around the brand. That gap costs more in gifting than in almost any other category: **someone choosing a gift is buying presentation as much as contents**, and a storefront that feels ordinary quietly argues against a premium price. A range spanning seven categories and a named gift-box collection also needed a structure no off-the-shelf theme was built to hold.',
    solution:
      'We **designed the storefront in Figma first**, every key screen, agreed with the client before any code existed, then **built it as a custom Shopify theme** from those designs rather than bending a purchased theme toward them. That route is slower at the start and pays for itself immediately after, because **layout, typography and motion are all ours to control** instead of things to work around. Animation was used where it earns attention rather than everywhere, gifting was given a route of its own, and the catalogue was restructured so a visitor can shop by occasion as easily as by product.',
    results: [
      { value: '—', label: 'Conversion rate' },
      { value: '—', label: 'Gift box share of orders' },
      { value: '—', label: 'Mobile Lighthouse' },
      { value: '—', label: 'Average order value' },
    ],
  },
  {
    slug: 'jewellery-brand',
    /* Real client: Ornagems. Kept in this comment only, for the same reason. */
    client: 'Demi-fine jewellery store, Pakistan',
    /* Deliberately labelled differently from Mira Farms. That build was a
       custom theme designed in Figma; this one started from a premium theme
       and was taken to code level. Naming both routes shows a studio that
       picks the right one rather than selling the same thing twice. */
    category: 'Jewellery · Shopify store build',
    year: '2026',
    visual: 'jewelry',
    image: '/projects/jewellery-brand.webp',
    // Full-bleed campaign shot: it earns the whole card. Switch to 'frame' to
    // render it inside browser chrome instead.
    imageFit: 'full',
    confidential: true,
    summary:
      'A demi-fine jewellery label taken from nothing to a working store, with the theme customised at code level until it matched the reference site the client had in mind.',
    overview:
      'A new label selling demi-fine jewellery built for daily wear rather than the vault. There was no store to improve on and no checkout to repair, so everything was built from the ground up: the catalogue, the cart, payments, delivery, and the trust signals a new label needs before anyone will spend money on jewellery online.',
    stack: [
      'Shopify',
      'Clarity theme',
      'Liquid',
      'Theme customisation',
      'Product reviews app',
      'WhatsApp Business',
    ],
    problem:
      'A new jewellery label launching with nothing behind it meets three problems at once. **There is no store**, so every part of the buying path has to be built rather than improved. **There is no reputation**, and jewellery is a considered purchase few people make on trust alone. And the market runs on cash on delivery, which ties up working capital and invites refused parcels. The client also arrived with a clear picture of the result they wanted, in the form of a reference site, and no theme matches another site out of the box.',
    solution:
      'We started from the **Clarity theme** rather than building one from scratch, because the client had a reference to match and a launch date to hit, then **took the theme to code level** to close the distance between the two. From there the full commerce spine was set up properly: product catalogue and variants, **add to cart, checkout flow, delivery charges and discount codes**, each tested with real orders before launch. A **live reviews app** gives a brand with no history somewhere to start building one, and a persistent WhatsApp button turns pre-purchase hesitation into a conversation. The announcement bar puts a concrete reason to prepay above the fold, so the incentive is seen before the cart rather than at it.',
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
    title: 'Free plan',
    duration: 'Day 1',
    description:
      'Send us your site if you have one, or just tell us what you sell. We come back with what we would do first and why, written down. No call required, no charge.',
  },
  {
    title: 'Scope & quote',
    duration: 'Day 2–3',
    description:
      'You get a fixed price and a fixed date before anything starts. If we underestimate the work, that is ours to absorb, not a change request halfway through.',
  },
  {
    title: 'Design',
    duration: 'Week 1',
    /* Two routes, because there genuinely are two. Describing only the Figma
       path would promise custom design screens to every client, including the
       ones on a premium theme who will never receive them. This step is also
       the only place the hero's "Design — approved by you" chip is now
       substantiated, since the matching FAQ was removed — so the sign-off
       promise has to survive both routes. */
    description:
      'For a pre-built theme, you share the websites, styles, and ideas you like, and we shape the theme around your brand and vision.For a custom build, we design the key screens in Figma and show you before any code is written.Either way, the choice is yours. ',
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
      'Domain, analytics and pixels connected, then we walk you through running it yourself: adding products, editing sections, launching a sale. Recorded, so you can rewatch it.',
  },
  {
    title: 'Aftercare',
    duration: '14 days, included',
    /* Kept at 14 rather than cut to 7. The risk here is not the length of the
       window but what people put through it, so the scope is stated instead:
       fixes and questions are covered, new work is quoted. Seven days would
       give a Friday launch only five working days and buy back very little. */
    description:
      'Two weeks of bug fixes and questions, included with every build and no retainer required. Almost everything that surfaces after a launch surfaces in that window. New features and design changes are quoted separately. If you want us on hand after that, there is a monthly plan you can leave whenever it stops being useful.',
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

/**
 * Each of these answers a specific fear rather than making a generic claim:
 * will they understand me, will the cost move, will it be slow, will I be
 * stuck with them. That is why they work — "we are passionate about design"
 * answers nothing anyone was actually worried about.
 */
export const differentiators = [
  {
    title: 'You talk directly to the person building it',
    description:
      'You work directly with the person building your store, from start to finish. No account managers or unnecessary layers. Your questions and feedback go straight to the people doing the work.',
  },
  {
    title: 'Fixed price, agreed before we start',
    /* "within the agreed scope" is doing real work here: it commits us to
       absorbing our own underestimates without also committing us to absorb
       every new requirement added after the quote. */
    description:
      'You approve the scope, price and timeline before development begins. If we underestimate the work within the agreed scope, we absorb the difference, not you. No surprise invoices halfway through the project.',
  },
  {
    title: 'Performance is built in',
    /* Deliberately no "90+ Lighthouse or we keep working" here any more.
       Shopify scores move with third-party apps, review widgets and tracking
       scripts that the client often insists on and we do not control — so a
       hard number was a promise that could be broken by someone else's
       decision. This commits to the work and to showing the result, which is
       entirely ours to keep. */
    description:
      'Performance is not an afterthought. We optimise your store for fast loading and strong Lighthouse performance, then share the results with you at launch so you can verify them yourself.',
  },
  {
    title: 'You own everything, from day one',
    /* "every login" was removed: third-party apps and subscriptions sometimes
       sit under the client's own accounts or under different arrangements, so
       it was a wider promise than we can always keep. */
    description:
      'Your Shopify account, theme, code, Figma files, domain and project assets belong to you. You get full access from day one, no lock-ins and no dependency on us to run your store.',
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
    question: 'I sell on Instagram already. Do I actually need a website?',
    answer:
      'If you are happy answering "price?" fifty times a day, no. A store earns its keep by doing the parts you are doing manually: showing prices and sizes, taking the order and the payment at 2am, and letting a customer buy without waiting for you to reply. Instagram is where people find you; the store is where they buy without you in the room.',
  },
  {
    question: 'How much does a Shopify store cost?',
    answer:
      'Every store is different. Cost depends on your products, pages, design complexity and integrations: payments, inventory, apps and the rest. We start with a free audit to understand exactly what you need, then give you a fixed price. Never open-ended hourly billing, and no surprises later.',
    /* Consider adding a starting figure to this answer. "It depends" is the
       most common answer on agency sites and one of the most expensive: a
       visitor who gets no signal on cost usually assumes "expensive" and
       leaves, while everyone who does write in has to be disqualified by
       hand. A floor — "projects start at PKR X" — is not a quote, it is a
       filter that works while you sleep. */
    cta: { label: 'Get your free plan', href: '#contact' },
  },
  {
    question: 'How long does it take?',
    answer:
      'Two to four weeks from kickoff to live for most stores. Simple catalogues land closer to two; anything with custom features or a large product import runs closer to four. You get the date in writing before we start, and a preview link from the first week so you can watch it come together.',
  },
  {
    question: 'My store is already live but it is not getting sales.',
    answer:
      'That is the most common thing we are asked to look at, and it is usually a handful of specific problems rather than a mystery: slow loading on mobile data, no trust signals, a checkout that asks for too much, or products that are hard to find. Send us the link and we will tell you which ones apply to you, free. If a rebuild is not warranted, we will say so.',
  },
  {
    question: 'You are a new studio. Why should I trust you with my brand?',
    answer:
      'Fair question, and here is the honest answer: we are small and new, which is exactly why your project gets our full attention rather than being third in a queue. We de-risk it for you instead of asking you to take our word: a free audit before you spend anything, a fixed price agreed up front, payment split across milestones rather than in advance, and everything in your own accounts from day one. If we disappear tomorrow, you still own a working store.',
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
