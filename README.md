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
| Logo mark and favicon | [`public/brand/`](public/brand/) |
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

### Switching theme

The site ships **both** palettes — peacock on off-white, and peacock on
near-black — and visitors switch with the toggle in the header. There is
nothing to configure.

Resolution order on load:

1. The visitor's saved choice (`localStorage`, key `stacklabs-theme`)
2. Otherwise their OS setting (`prefers-color-scheme`)
3. Otherwise light

Until someone touches the toggle, the site follows their OS live — change the
system theme and the page follows. After that their choice wins and sticks, and
syncs across open tabs.

**To force one theme**, delete `<ThemeToggle />` from `Navbar.tsx` and hardcode
`data-theme` on `<html>` in `index.html`.

#### Why the inline script in index.html

It sets `data-theme` **before the browser paints**. Applying the theme from
React instead would give every dark-mode visitor a full white flash on each
page load — the single most common bug in hand-rolled theme switchers. It is
inline and dependency-free so nothing has to be fetched first, and it runs
ahead of both the stylesheet and the app bundle (asserted by the render test).

The storage key is duplicated between that script and `src/lib/theme.ts` —
change both together.

### How it works

Palette values live in `:root` / `[data-theme='dark']` as `--p-*` variables.
The `@theme inline` block maps them to Tailwind utilities, so `bg-ink` compiles
to `background-color: var(--p-ink)` and re-resolves when the attribute changes
— rather than baking one theme's value into the class.

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `ink` | `#f7f7f4` | `#050505` | page background |
| `surface` | `#eeeee9` | `#111111` | alternating section bands |
| `card` | `#ffffff` | `#181818` | cards and popovers |
| `accent` | `#111614` | `#ffffff` | primary text |
| `subtle` | `#414b4a` | `#9ca3af` | body copy |
| `muted` | `#5b6370` | `#6b7280` | captions |
| `brand` | `#0b7a87` | `#0d8a98` | CTAs, emphasis, interaction |
| `brand-bright` | `#0d8a98` | `#2ab5c4` | hover, gradient centre |
| `on-brand` | `#ffffff` | `#04191b` | label colour on a brand fill |

> **Why the brand differs between themes.** The chosen value is `#0d8a98`. On
> near-black it measures 4.96:1 and is used directly. On the off-white it
> measures **3.83:1** — fine for icons and fills, but below the 4.5:1 AA floor
> for small text, and the section eyebrows are 11px. Light mode therefore runs
> the same hue one step deeper (`#0b7a87`, 4.7:1) wherever colour meets text,
> and `#0d8a98` remains the hover tone and the centre of the gradient.
>
> To use `#0d8a98` everywhere regardless, set `--p-brand` in the light block —
> just know the eyebrows will fail contrast.
| `line` / `line-strong` | ink at 11% / 20% | white at 8% / 14% | hairlines |
| `fill-1` / `fill-2` | ink at 3.5% / 7% | white at 3% / 6% | subtle surfaces |

### Rules that keep both themes working

- **Never hardcode a colour in a component.** If you reach for `white/10`, add
  a token instead. The only exceptions are `Logo`, `Work` and `ProjectVisual`,
  where the surface sits over imagery and must stay dark in both themes.
- **Every brand fill uses `text-on-brand`**, not a fixed black or white — the
  two themes need opposite labels. Both clear WCAG AA (6.1:1 light, 8.9:1 dark).
- `subtle` is *darker* than `muted` on light and *lighter* on dark. Both themes
  keep body copy as the more readable of the two.
- Depth is themed too: `--p-lift-shadow`, `--p-chip-shadow` and
  `--p-nav-shadow`. A near-opaque black shadow reads as dirt on a light page.

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
