# Project screenshots

> **This folder is published.** Everything in `public/` is copied into the build
> and served at the site root, so treat filenames and this file as public. Never
> name a confidential client here.

Files are served from the root: `public/projects/gifting-brand.webp` is
referenced in `src/config/site.ts` as `/projects/gifting-brand.webp`.

## Adding or replacing a screenshot

1. Put the raw capture in **`design/screenshots/`** — that folder sits outside
   `public/`, so multi-megabyte originals never reach the build.
2. Name it after the *project slug*, not the client: `gifting-brand.png`.
3. Run `npm run optimize:images`.

That resizes to 1600px wide, converts to WebP at quality 80, and writes the
result here. Raw PNG captures run 1–3 MB; the WebP output is usually
under 200 kB and identical to the eye.

The script skips any WebP that is already newer than its source, so it is safe
to re-run.

## Capture guidance

- **Full desktop width**, 1920px or wider. Do not crop — the cover is always
  top-aligned, so the header and hero survive whatever crop the card needs.
- **Clean state**: no cookie banners, no open dropdowns, no browser extensions
  in frame.
- **Nothing identifying** if the project is marked `confidential` in the
  config. That means no logo, no brand name in hero copy, no custom domain in a
  visible address bar. A product grid, cart or checkout step works well and is
  better evidence of commerce work than a hero image anyway.

## Framed or full-bleed

Each project chooses via `imageFit` in `src/config/site.ts`:

| `imageFit` | Looks like | Use when |
| --- | --- | --- |
| `'full'` | Fills the whole card, edge to edge | The hero is a large photograph that can carry the card |
| `'frame'` *(default)* | Sits inside browser chrome | The screen is UI-led, and the chrome signals "this is a website" |
