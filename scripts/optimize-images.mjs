/**
 * Image pipeline. Run with `npm run optimize:images`.
 *
 *  1. Converts every screenshot in public/projects/ to WebP. Raw PNG captures
 *     run 1–3 MB each; at quality 80 they land near 150–200 kB with no visible
 *     difference, and they are the heaviest thing a visitor downloads.
 *  2. Renders public/brand/og-image.png (1200×630) for social sharing, from
 *     the SVG template beside it.
 *
 * Safe to re-run: it skips a WebP that is already newer than its source.
 */
import sharp from 'sharp'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/** Raw captures live outside public/ so the multi-megabyte originals are never
 *  copied into the build — only the WebP output is served. */
const SOURCES = 'design/screenshots'
const PROJECTS = 'public/projects'
const BRAND = 'public/brand'

const kb = (bytes) => `${Math.round(bytes / 1024)} kB`

/* ---------------------------------------------------- screenshots → webp -- */

let saved = 0

for (const file of existsSync(SOURCES) ? readdirSync(SOURCES) : []) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue

  const from = join(SOURCES, file)
  const to = join(PROJECTS, file.replace(/\.(png|jpe?g)$/i, '.webp'))

  if (existsSync(to) && statSync(to).mtimeMs > statSync(from).mtimeMs) {
    console.log(`skip   ${file} (webp is current)`)
    continue
  }

  const before = statSync(from).size
  await sharp(from)
    // 1600px is twice the widest slot the cover is ever rendered into, which
    // covers retina without paying for pixels nobody sees.
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(to)

  const after = statSync(to).size
  saved += before - after
  console.log(
    `webp   ${file} → ${file.replace(/\.\w+$/, '.webp')}  ${kb(before)} → ${kb(after)}  (${Math.round((1 - after / before) * 100)}% smaller)`,
  )
}

/* ------------------------------------------------------- og image → png -- */

/* ------------------------------------------------- apple touch icon → png */

/* iOS ignores SVG for `apple-touch-icon`: a home-screen save falls back to a
   blank tile or a screenshot of the page. It needs a real 180×180 raster. */
const logo = join(BRAND, 'logo.svg')
if (existsSync(logo)) {
  const out = join(BRAND, 'apple-touch-icon.png')
  await sharp(logo, { density: 400 })
    .resize(180, 180, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(out)
  console.log(`icon   logo.svg → apple-touch-icon.png  ${kb(statSync(out).size)}  (180×180)`)
}

const ogSvg = join(BRAND, 'og-image.svg')
if (existsSync(ogSvg)) {
  const out = join(BRAND, 'og-image.png')
  await sharp(ogSvg, { density: 200 })
    .resize(1200, 630, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(out)
  console.log(`og     og-image.svg → og-image.png  ${kb(statSync(out).size)}  (1200×630)`)
} else {
  console.log(`og     skipped — ${ogSvg} not found`)
}

if (saved > 0) console.log(`\ntotal saved: ${kb(saved)}`)
