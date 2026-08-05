/* ============================================================================
 *  SITE CONFIG — the single source of truth for every word on this website.
 *
 *  Everything below is PLACEHOLDER content. Edit this one file to rebrand the
 *  entire site: agency name, services, case studies, stats, testimonials, FAQ,
 *  contact details and social links. No component needs to be touched.
 * ==========================================================================*/

export const site = {
  /** ↓↓↓ CHANGE ME — your agency name ↓↓↓ */
  name: 'Northlane',
  /** Short form used inside the logo mark (1–2 characters look best). */
  mark: 'N',
  /** Legal entity shown in the footer copyright line. */
  legalName: 'Northlane Studio',

  tagline: 'Building Premium Shopify Stores & Digital Experiences.',
  description:
    'We design and build premium Shopify stores for fashion, jewellery, beauty and lifestyle brands — stores that look world-class and sell like it.',

  email: 'hello@northlane.studio',
  phone: '+1 (555) 010-0199',
  location: 'Remote — working worldwide',
  bookingUrl: 'https://cal.com/', // ← CHANGE ME: your Cal.com / Calendly link

  socials: [
    { label: 'Dribbble', href: 'https://dribbble.com' },
    { label: 'Behance', href: 'https://behance.net' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'X', href: 'https://x.com' },
  ],
} as const

/* ---------------------------------------------------------------- navigation */

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#why-us' },
  { label: 'FAQ', href: '#faq' },
] as const

/* -------------------------------------------------------------------- hero */

export const hero = {
  badge: 'Shopify Partner — booking Q3 projects',
  headline: ['We made Shopify stores', 'that customers love.'],
  subline:
    'A premium design & development studio for fashion, jewellery, beauty and lifestyle brands. We turn browsers into buyers with stores that feel as considered as the products they sell.',
  primaryCta: { label: 'View Work', href: '#work' },
  secondaryCta: { label: 'Book Discovery Call', href: '#contact' },
  metrics: [
    { value: '50+', label: 'Stores shipped' },
    { value: '4.2×', label: 'Avg. conversion lift' },
    { value: '98', label: 'Median Lighthouse' },
  ],
} as const

/* ---------------------------------------------------------------- trusted by */

/** Real clients first; the rest are placeholder wordmarks. Swap them for real
 *  brands, or drop in <img> logos by editing `components/sections/TrustedBy.tsx`. */
export const clients = [
  'ORNAGEMS',
  'MAISON ÉCLAT',
  'AURELIA',
  'NORTH & PINE',
  'VELVET CO.',
  'LUMEN BEAUTY',
  'ATELIER 9',
  'SABLE',
  'ORO STUDIO',
] as const

/* ---------------------------------------------------------------- services */

export type IconName =
  | 'store'
  | 'theme'
  | 'app'
  | 'design'
  | 'code'
  | 'speed'
  | 'shield'

export type Service = {
  id: string
  title: string
  description: string
  bullets: string[]
  icon: IconName
  /** Featured cards span two columns on desktop. */
  featured?: boolean
}

export const services: Service[] = [
  {
    id: 'shopify-development',
    title: 'Shopify Store Development',
    description:
      'End-to-end builds on Shopify and Shopify Plus — architecture, custom theme, product data, checkout and launch. Built to scale past your first thousand orders.',
    bullets: ['Custom Liquid themes', 'Headless when it earns its keep', 'Launch & migration handled'],
    icon: 'store',
    featured: true,
  },
  {
    id: 'theme-customization',
    title: 'Shopify Theme Customization',
    description:
      'Own your look without a rebuild. We take Dawn or a premium theme and shape it into something unmistakably yours.',
    bullets: ['Bespoke sections', 'Merchant-friendly settings', 'No page-builder bloat'],
    icon: 'theme',
  },
  {
    id: 'app-development',
    title: 'Shopify App Development',
    description:
      'Private and public apps that close the gap between your store and how your business actually runs.',
    bullets: ['Polaris admin UIs', 'Checkout & theme extensions', 'Webhooks and integrations'],
    icon: 'app',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description:
      'Interface design grounded in how people really shop — considered typography, deliberate hierarchy, and a checkout path with nothing in the way.',
    bullets: ['Design systems in Figma', 'Conversion-led wireframes', 'Motion & interaction specs'],
    icon: 'design',
    featured: true,
  },
  {
    id: 'react-next',
    title: 'React / Next.js Development',
    description:
      'Headless storefronts, marketing sites and custom web apps built on the modern React stack.',
    bullets: ['Next.js App Router', 'Hydrogen & Storefront API', 'Type-safe end to end'],
    icon: 'code',
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description:
      'Every 100ms of load time costs you revenue. We find it, cut it, and prove the difference.',
    bullets: ['Core Web Vitals audit', 'Image & script diet', 'Before/after reporting'],
    icon: 'speed',
  },
  {
    id: 'maintenance',
    title: 'Store Maintenance',
    description:
      'A retained team on standby — updates, fixes, new sections and seasonal campaigns, without the hiring.',
    bullets: ['Priority response times', 'Monthly health reports', 'Continuous improvements'],
    icon: 'shield',
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
   * Real screenshot, served from `public/`. Rendered inside the browser-frame
   * composition in ProjectVisual, so any aspect ratio works and a missing file
   * degrades to the generated mock rather than a broken image.
   */
  image?: string
  /**
   * How `image` is presented.
   *  - `full`  — edge to edge. Best when the store's hero is a big piece of
   *              photography that should carry the card on its own.
   *  - `frame` — inside a browser frame (the default). Best for UI-led screens,
   *              where the chrome signals "this is a website" at a glance.
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

export const projects: Project[] = [
  /* ------------------------------------------------------------------------
   * REAL CLIENT WORK. Everything below this entry is placeholder content —
   * replace it as more real projects ship.
   * ---------------------------------------------------------------------- */
  {
    slug: 'ornagems',
    client: 'Ornagems',
    category: 'Jewellery — Shopify',
    year: '2026',
    visual: 'jewelry',
    image: '/projects/ornagems.png',
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
    /* ↓↓↓ PLACEHOLDER — replace with Ornagems' real analytics before publishing.
       These are the four figures most worth reporting for this build. ↓↓↓ */
    results: [
      { value: '—', label: 'Prepaid order share' },
      { value: '—', label: 'Conversion rate' },
      { value: '—', label: 'Mobile Lighthouse' },
      { value: '—', label: 'Average order value' },
    ],
  },
  {
    slug: 'maison-eclat',
    client: 'Maison Éclat',
    category: 'Fashion — Shopify Plus',
    year: '2025',
    visual: 'fashion',
    summary:
      'A ready-to-wear label rebuilt on Shopify Plus, with an editorial storefront that finally matched the clothes.',
    overview:
      'Maison Éclat had outgrown a marketplace-style theme that flattened a decade of brand building into a grid of thumbnails. We rebuilt the storefront from the ground up around their lookbook photography, then rewired the buying path so a browsing session leads somewhere.',
    stack: ['Shopify Plus', 'Liquid', 'Tailwind CSS', 'Alpine.js', 'Klaviyo', 'Contentful'],
    problem:
      'Product pages buried fit and fabric detail below three folds of boilerplate. Mobile shoppers — 71% of traffic — abandoned at the size selector, and the team could not publish a campaign without a developer.',
    solution:
      'A mobile-first product page with sticky add-to-cart, an inline size guide built from real garment measurements, and shoppable lookbooks the marketing team edits themselves. Checkout dropped from five steps to two.',
    results: [
      { value: '+184%', label: 'Conversion rate' },
      { value: '-46%', label: 'Bounce on PDP' },
      { value: '2.1s', label: 'LCP on 4G' },
      { value: '99', label: 'Lighthouse' },
    ],
  },
  {
    slug: 'aurelia',
    client: 'Aurelia Fine Jewellery',
    category: 'Jewellery — Custom Build',
    year: '2025',
    visual: 'jewelry',
    summary:
      'A configurator for made-to-order pieces, wrapped in a storefront quiet enough to let the product speak.',
    overview:
      'Aurelia sells bespoke engagement pieces where every order is a conversation. We replaced a form-and-email workflow with a live configurator that prices metal, stone and setting combinations in real time and hands the studio a production-ready spec.',
    stack: ['Shopify', 'Hydrogen', 'React', 'TypeScript', 'Storefront API', 'Sanity'],
    problem:
      'Each custom order took eleven days and roughly twenty emails to specify. Quotes were assembled by hand, pricing drifted between staff, and high-intent buyers went cold waiting.',
    solution:
      'A three-step configurator with real-time pricing and 360° previews, backed by a rules engine the studio maintains. Deposits are taken at the point of excitement rather than a week later.',
    results: [
      { value: '11d → 2d', label: 'Quote turnaround' },
      { value: '+62%', label: 'AOV' },
      { value: '+3.4×', label: 'Custom orders' },
      { value: '0', label: 'Manual quotes' },
    ],
  },
  {
    slug: 'lumen-beauty',
    client: 'Lumen Beauty',
    category: 'Beauty — Subscription',
    year: '2024',
    visual: 'beauty',
    summary:
      'A skincare range with a subscription flow people actually finish — and a customer portal they stay in.',
    overview:
      'Lumen had strong repeat demand trapped behind a subscription flow bolted onto a stock theme. We rebuilt the funnel around a short diagnostic quiz and gave subscribers a portal that makes staying easy.',
    stack: ['Shopify', 'Liquid', 'Recharge', 'Next.js', 'Vercel', 'Klaviyo'],
    problem:
      'Subscription checkout leaked 68% of starts. Managing a plan meant emailing support, so cancellations arrived as complaints rather than pauses.',
    solution:
      'A four-question routine quiz that lands on a pre-filled cart, plus a self-serve portal for skipping, swapping and pausing. Retention messaging now meets people at the moment they hesitate.',
    results: [
      { value: '+127%', label: 'Subscriber growth' },
      { value: '-38%', label: 'Churn' },
      { value: '+54%', label: 'LTV' },
      { value: '4.9★', label: 'Support rating' },
    ],
  },
  {
    slug: 'north-and-pine',
    client: 'North & Pine',
    category: 'Lifestyle — Performance',
    year: '2024',
    visual: 'lifestyle',
    summary:
      'A homeware catalogue of 2,400 SKUs made fast enough to browse on a train.',
    overview:
      'North & Pine had the range and the traffic; the store simply could not keep up. We ran a full performance rebuild — app audit, asset pipeline, collection architecture — without changing the visual identity the brand had earned.',
    stack: ['Shopify', 'Liquid', 'Vite', 'Cloudflare', 'Algolia', 'Web Vitals'],
    problem:
      'Fourteen apps injected 3.2MB of blocking JavaScript. Collection pages took 8.4s to become interactive on mobile, and paid traffic bounced before the first product rendered.',
    solution:
      'Nine apps replaced with native code, images moved to responsive AVIF, and search handed to Algolia with instant faceting. Everything above the fold now ships in a single critical request.',
    results: [
      { value: '8.4s → 1.3s', label: 'Time to interactive' },
      { value: '+41%', label: 'Revenue per session' },
      { value: '-72%', label: 'JS payload' },
      { value: '100', label: 'Performance score' },
    ],
  },
]

/* ---------------------------------------------------------------- process */

export const processSteps = [
  {
    title: 'Discovery',
    duration: 'Week 1',
    description:
      'We start with your numbers and your customers, not a moodboard. Goals, margins, blockers, and what "working" would actually look like six months out.',
  },
  {
    title: 'Research',
    duration: 'Week 1–2',
    description:
      'Competitor teardowns, analytics and session review, and a hard look at where the current funnel loses people. Findings come back as decisions, not a slide deck.',
  },
  {
    title: 'Design',
    duration: 'Week 2–4',
    description:
      'Wireframes to high-fidelity in Figma, built as a reusable system. You review real screens on real devices before a line of code is written.',
  },
  {
    title: 'Development',
    duration: 'Week 4–8',
    description:
      'Clean, documented Liquid and React. You get a staging URL from day one and weekly builds you can click through, not a black box.',
  },
  {
    title: 'Testing',
    duration: 'Week 8–9',
    description:
      'Cross-browser and cross-device QA, accessibility passes, checkout testing with live payment methods, and a Core Web Vitals budget we hold ourselves to.',
  },
  {
    title: 'Launch',
    duration: 'Week 9',
    description:
      'DNS, redirects, analytics and tracking verified before go-live. We ship mid-week, in the morning, with the whole team watching the dashboards.',
  },
  {
    title: 'Support',
    duration: 'Ongoing',
    description:
      'Thirty days of post-launch cover as standard, then a retainer if you want us to keep iterating. Either way, you own everything.',
  },
] as const

/* ------------------------------------------------------------------- stats */

export type Stat = {
  value: number
  suffix: string
  label: string
  caption: string
  /** Fixed decimal places while counting — keeps "4.2×" from flickering. */
  decimals: number
}

export const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Projects delivered', caption: 'Across 14 countries', decimals: 0 },
  { value: 99, suffix: '%', label: 'Client satisfaction', caption: 'Post-project survey', decimals: 0 },
  { value: 4.2, suffix: '×', label: 'Average conversion lift', caption: 'Measured at 90 days', decimals: 1 },
  { value: 98, suffix: '', label: 'Median Lighthouse score', caption: 'Mobile, at launch', decimals: 0 },
]

export const differentiators = [
  {
    title: 'Senior team only',
    description:
      'The people you meet in the pitch are the people who do the work. No handover to juniors after the contract is signed.',
  },
  {
    title: 'Fixed scope, fixed price',
    description:
      'You approve a scope and a number before we start. If we underestimate, that is our problem to absorb — not a change request.',
  },
  {
    title: 'Pixel-perfect, provably',
    description:
      'Designs are built to the pixel and tested across the browsers your customers actually use, down to older Safari on iOS.',
  },
  {
    title: 'You own everything',
    description:
      'Code, designs, documentation and accounts are yours on day one. No proprietary lock-in, no hostage-taking.',
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

export const testimonials: Testimonial[] = [
  {
    quote:
      'They rebuilt our store in six weeks and the first month out-sold our best quarter. What stood out was how much of the thinking was commercial rather than cosmetic — every decision came with a reason attached to revenue.',
    name: 'Camille Rousseau',
    role: 'Founder',
    company: 'Maison Éclat',
    featured: true,
  },
  {
    quote:
      'The configurator changed how we sell. Quotes that used to take a fortnight now close in two days.',
    name: 'Priya Raman',
    role: 'Creative Director',
    company: 'Aurelia',
  },
  {
    quote:
      'First agency that sent us a performance budget before an invoice. Our mobile store went from embarrassing to the fastest in our category.',
    name: 'Daniel Okafor',
    role: 'Head of Ecommerce',
    company: 'North & Pine',
  },
  {
    quote:
      'Communication was the thing. Weekly builds, no surprises, and every question answered the same day. We have already booked them for phase two.',
    name: 'Sofia Lindqvist',
    role: 'COO',
    company: 'Lumen Beauty',
  },
  {
    quote:
      'We came for a theme tweak and stayed for a full rebuild. Two years on they still run our store like it is their own.',
    name: 'Marcus Hale',
    role: 'Managing Director',
    company: 'Velvet Co.',
  },
]

/* --------------------------------------------------------------------- FAQ */

export const faqs = [
  {
    question: 'How much does a premium Shopify store cost?',
    answer:
      'Most full builds land between $12,000 and $45,000 depending on scope, integrations and how much custom functionality you need. Theme customisation projects typically start around $4,000. You get a fixed price after discovery — never an open-ended hourly estimate.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'A focused store build runs six to nine weeks end to end. Larger Shopify Plus or headless projects run ten to sixteen. We only take on a limited number of builds at a time, so the timeline you are quoted is the timeline you get.',
  },
  {
    question: 'Do you work with brands outside fashion and beauty?',
    answer:
      'Often. Fashion, jewellery, beauty and lifestyle are where we have the deepest pattern library, but the underlying work — clear merchandising, fast pages, a checkout that gets out of the way — applies to any considered-purchase brand.',
  },
  {
    question: 'Can you migrate us from WooCommerce, Magento or a custom platform?',
    answer:
      'Yes. Migrations are a regular part of the work: products, customers, order history, reviews and SEO equity all move across. We map redirects before launch so you keep the rankings you have earned.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Thirty days of post-launch support is included with every build — bug fixes, tweaks and training for your team. After that, most clients move onto a monthly retainer for ongoing work, but there is no obligation and no lock-in.',
  },
  {
    question: 'Who owns the code and the designs?',
    answer:
      'You do, entirely, from the first commit. You get the repository, the Figma file, full documentation and admin access to every account we touch. Nothing is built on a proprietary system that keeps you tied to us.',
  },
  {
    question: 'How do we start?',
    answer:
      'Book a 30-minute discovery call. We will talk through your goals, current numbers and constraints, and you will leave with an honest read on scope, budget and timeline — whether or not you work with us.',
  },
] as const
