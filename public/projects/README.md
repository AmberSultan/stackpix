# Project screenshots

Files here are served from the site root, so `public/projects/ornagems-cover.jpg`
is referenced in `src/config/site.ts` as `/projects/ornagems-cover.jpg`.

## Required

| File | Used for | Spec |
| --- | --- | --- |
| `mirafarms.png` | Work card + case-study cover | Full homepage capture, **1920px wide minimum**, under ~400 kB |
| `ornagems.png` | Work card + case-study cover | as above |

> ### ⚠ These two files are 4.15 MB together
>
> | File | Now | As WebP q80 |
> | --- | --- | --- |
> | `mirafarms.png` | 2.84 MB | ~180 kB |
> | `ornagems.png` | 1.32 MB | ~150 kB |
>
> That is **fifty times the entire JS bundle** (85 kB gzipped). Both are
> lazy-loaded and below the fold so they do not affect the page's LCP score,
> but they are by far the heaviest thing a visitor downloads — and a slow
> portfolio is an awkward look on a site whose Services section sells
> performance optimisation.
>
> Drag each through [squoosh.app](https://squoosh.app), export as WebP at
> quality 80, then update `image` in `src/config/site.ts` to the new filename.
> Two minutes of work for a ~25× saving.

Capture at desktop width (1920×1080 or taller) and **do not crop it yourself** —
the image is always top-aligned, so the header and hero survive whatever crop
the card needs. Any aspect ratio works.

### Framed or full-bleed

Each project chooses how its cover is presented, via `imageFit` in
`src/config/site.ts`:

| `imageFit` | Looks like | Use when |
| --- | --- | --- |
| `'full'` | Screenshot fills the whole card, edge to edge | The hero is a large campaign photograph — it carries the card on its own. **Ornagems uses this.** |
| `'frame'` *(default)* | Screenshot sits inside browser chrome | The screen is UI-led — the chrome signals "this is a website" at a glance |

Change one word to switch. Nothing else needs touching.

## Optional

Add these to the `gallery` array on a project in `src/config/site.ts` and they
render as a two-column grid inside the case study. They are not required — the
gallery section is skipped entirely when the array is absent.

| Suggested file | Shows |
| --- | --- |
| `ornagems-collection.jpg` | A category/collection page — proves the merchandising |
| `ornagems-product.jpg` | A product page — where the conversion work actually happens |
| `ornagems-mobile.jpg` | Mobile viewport (390px wide), tall capture |

## Guidance

- **Compress before committing.** A raw PNG screenshot is often 2–3 MB; the
  same image as WebP at quality 80 is usually under 200 kB and identical to the
  eye. `squoosh.app` is a quick way to do this.
- **Capture a clean state** — no cookie banners, no open dropdowns, no
  browser extensions in frame, cart empty unless the cart is the point.
- **Use real product photography**, not placeholder tiles. The screenshots are
  doing the selling on this page.
