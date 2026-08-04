# Agency Site

A premium single-page marketing site for a Shopify design & development studio.
Built with Vite, React 19, TypeScript and Tailwind CSS v4.

```bash
npm run dev       # dev server with HMR
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

---

## Rebranding: start here

**Almost everything you need to change lives in [`src/config/site.ts`](src/config/site.ts).**
It holds the agency name, tagline, contact details, social links, services,
case studies, process steps, stats, testimonials and FAQ. No component reads
copy from anywhere else.

The three things that live outside that file:

| What | Where |
| --- | --- |
| Page `<title>`, meta description, Open Graph tags | [`index.html`](index.html) |
| Favicon (currently a typographic tile) | [`public/favicon.svg`](public/favicon.svg) |
| Colours, type scale, motion curves | the `@theme` block in [`src/styles/globals.css`](src/styles/globals.css) |

Search the project for `CHANGE ME` to find every placeholder.

---

## Structure

```
src/
├── config/site.ts          all copy and content — the only file a rebrand needs
├── styles/globals.css      design tokens, base styles, utilities, keyframes
├── lib/
│   ├── cn.ts               class-name joiner
│   └── smoothScroll.ts     Lenis instance, scroll lock, anchor scrolling
├── hooks/
│   ├── usePrefersReducedMotion.ts   motion preference (every animation checks it)
│   ├── useReveal.ts                 fade-up on scroll
│   ├── useMagnetic.ts               cursor-following buttons
│   ├── useMouseParallax.ts          publishes --mx / --my for parallax layers
│   ├── useCountUp.ts                animated statistics
│   ├── useScrollProgress.ts         0→1 travel through an element
│   └── useActiveSection.ts          nav highlighting
├── components/
│   ├── layout/             Preloader, Navbar, Footer, Logo
│   ├── ui/                 Button, Reveal, Modal, Accordion, Marquee, Counter,
│   │                       SectionHeading, Backdrop, Icons, ProjectVisual
│   └── sections/           Hero, TrustedBy, Services, Work, CaseStudy, Process,
│                           WhyUs, Testimonials, Faq, CallToAction
└── App.tsx                 composes the sections in page order
```

---

## Design system

Tokens are declared once in the `@theme` block of `globals.css`, and Tailwind
generates utilities from them — `--color-card` becomes `bg-card`, `--text-h2`
becomes `text-h2`.

| Token | Value | Usage |
| --- | --- | --- |
| `ink` | `#050505` | page background |
| `surface` | `#111111` | alternating section bands |
| `card` | `#181818` | cards and popovers |
| `elevated` | `#1f1f1f` | card hover |
| `accent` | `#ffffff` | primary text, buttons |
| `muted` | `#6b7280` | secondary text |
| `subtle` | `#9ca3af` | body copy on dark cards |
| `line` / `line-strong` | white at 8% / 14% | hairline borders |

Type is fluid: `--text-display`, `--text-h1`, `--text-h2`, `--text-h3` and
`--text-lead` all use `clamp()`, so headings scale continuously between 375px
and 1440px rather than jumping at breakpoints.

Composite utilities: `container-page`, `section-y`, `card-surface`, `glass`,
`text-gradient`, `bg-grid`, `bg-noise`, `mask-fade-x`.

---

## Motion

There is no animation library. Everything is CSS transitions and keyframes,
triggered by small hooks — which is why the JS bundle is ~84 kB gzipped, most
of it React itself.

- **Scroll reveals** — `useReveal` toggles `data-revealed` on an element; the
  motion is declared in `globals.css`. Stagger a list by passing an
  incrementing `delay` to `<Reveal>`.
- **Smooth scroll** — Lenis, initialised once in `App.tsx`.
- **Magnetic buttons / mouse parallax** — pointer-driven, and skipped entirely
  on touch devices where there is no hover to respond to.
- **Preloader** — runs for 1.5s, then lifts.

**Reduced motion is handled in two places and covers the whole site:** the
`@media (prefers-reduced-motion: reduce)` block at the bottom of `globals.css`
neutralises CSS animation, and `usePrefersReducedMotion()` makes the JS-driven
effects no-op. The preloader does not render at all, and counters show their
final value immediately.

---

## Notes

- **Project artwork.** A project with an `image` in its config renders that
  screenshot inside a browser frame; one without falls back to a generated
  storefront mock. A screenshot that fails to load falls back to the mock too,
  so a missing file is never a broken image. Drop screenshots in
  [`public/projects/`](public/projects/) — see the README there for specs.
- **Placeholder results.** A result row whose value is `—` is not rendered, and
  a project with no real figures shows no results block at all. Real work can go
  live before its analytics are in without the page looking half-finished.
- **Client logos** in the Trusted By marquee are set as typographic wordmarks.
  Swap the `<span>` in `TrustedBy.tsx` for `<img>` when real assets arrive.
- **Testimonial avatars** are monograms for the same reason — consistent, and
  never a broken image.
- **Fonts** are self-hosted via `@fontsource-variable/inter`. All subsets are
  built, but each `@font-face` carries a `unicode-range`, so a typical visitor
  downloads only the ~48 kB latin file.
- **Case studies** open in a modal rather than on their own routes, which keeps
  this a genuine single page. If you add routing later, `CaseStudy.tsx` is
  already a standalone component and will drop straight into a route.
