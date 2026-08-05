import { useState } from 'react'
import type { Project } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Cover artwork for a case study.
 *
 * Three ways a project can render, in order of preference:
 *
 *  1. `image` + `imageFit: 'full'` — the screenshot fills the card. Best when
 *     the store's hero is a large piece of photography.
 *  2. `image` + `imageFit: 'frame'` — the screenshot sits inside browser
 *     chrome. Best for UI-led screens.
 *  3. No image — a composed storefront mock, tinted by vertical. A screenshot
 *     that fails to load falls back here too, so a missing file is never a
 *     broken image.
 *
 * The mock's hero is a mesh gradient rather than a flat panel. That matters:
 * a dark empty rectangle reads as an image that failed to load, whereas a lit
 * colour field reads as artwork someone chose.
 */

type Variant = Project['visual']

type Tint = {
  /** Card background, behind the floating frame. */
  from: string
  to: string
  /** Ambient glow behind the frame. */
  glow: string
  /** Mesh gradient stops for the mock's hero panel. */
  base: string
  bloomA: string
  bloomB: string
  bloomC: string
}

/** One palette per vertical — warm sand, gold, rose and sage. Saturated enough
 *  to look deliberate on a black card, restrained enough to stay premium. */
const tints: Record<Variant, Tint> = {
  fashion: {
    from: '#2a2320',
    to: '#0b0a09',
    glow: 'rgba(214,183,160,0.30)',
    base: '#171310',
    bloomA: 'rgba(232,203,176,0.90)',
    bloomB: 'rgba(146,102,76,0.80)',
    bloomC: 'rgba(48,36,30,0.95)',
  },
  jewelry: {
    from: '#2b2718',
    to: '#0b0a08',
    glow: 'rgba(226,203,138,0.30)',
    base: '#16130c',
    bloomA: 'rgba(243,219,157,0.90)',
    bloomB: 'rgba(164,128,58,0.80)',
    bloomC: 'rgba(46,38,22,0.95)',
  },
  beauty: {
    from: '#2a1f24',
    to: '#0b0809',
    glow: 'rgba(226,170,190,0.28)',
    base: '#171016',
    bloomA: 'rgba(242,195,209,0.88)',
    bloomB: 'rgba(166,100,126,0.78)',
    bloomC: 'rgba(48,30,38,0.95)',
  },
  lifestyle: {
    from: '#1d2622',
    to: '#080a09',
    glow: 'rgba(160,201,181,0.26)',
    base: '#0f1512',
    bloomA: 'rgba(196,224,209,0.85)',
    bloomB: 'rgba(94,142,122,0.76)',
    bloomC: 'rgba(28,42,36,0.95)',
  },
}

type Props = {
  project: Project
  className?: string
}

export function ProjectVisual({ project, className }: Props) {
  const tint = tints[project.visual]
  const [imageFailed, setImageFailed] = useState(false)
  const showScreenshot = Boolean(project.image) && !imageFailed
  const fullBleed = project.imageFit === 'full'

  const initials = project.client
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  const screenshot = (
    <img
      src={project.image}
      alt={`The ${project.client} storefront homepage`}
      loading="lazy"
      decoding="async"
      onError={() => setImageFailed(true)}
      // Top-aligned so the header and hero always survive the crop, whatever
      // the capture's aspect ratio happens to be.
      className="size-full object-cover object-top"
    />
  )

  return (
    <div
      className={cn(
        'relative isolate size-full overflow-hidden',
        // Scales up fractionally behind the card's overflow-hidden on hover —
        // the classic editorial image reveal.
        'transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]',
        className,
      )}
      style={{
        background: `linear-gradient(155deg, ${tint.from} 0%, ${tint.to} 62%)`,
      }}
      // The generated mock carries no information, so it is hidden from
      // assistive tech. A real screenshot describes itself via the img alt.
      aria-hidden={showScreenshot ? undefined : 'true'}
    >
      {showScreenshot && fullBleed ? (
        <div className="absolute inset-0">{screenshot}</div>
      ) : (
        <>
          {/* Ambient glow */}
          <div
            className="absolute -top-1/4 left-1/2 size-[120%] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${tint.glow} 0%, transparent 62%)`,
            }}
          />

          {/* Storefront, floating slightly off the bottom edge */}
          <div className="absolute inset-x-[10%] top-[14%] bottom-[-14%]">
            {/* Explicitly dark rather than the themed `glass` utility: this is
                artwork, not chrome. It sits on its own tinted gradient and must
                look identical whichever theme the page is in. */}
            <div className="flex size-full flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-white/[0.06] p-2.5 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-3.5">
              {/* Browser chrome */}
              <div className="mb-2.5 flex shrink-0 items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-white/25" />
                <span className="size-1.5 rounded-full bg-white/15" />
                <span className="size-1.5 rounded-full bg-white/10" />
                <span className="ml-2 h-3 flex-1 rounded-full bg-white/[0.06]" />
              </div>

              {showScreenshot ? (
                <div className="relative flex-1 overflow-hidden rounded-lg border border-white/10">
                  {screenshot}
                </div>
              ) : (
                <MockStorefront initials={initials} tint={tint} />
              )}
            </div>
          </div>
        </>
      )}

      {/* Bottom vignette so the storefront dissolves into the card, and a top
          scrim so the year badge stays legible over bright photography. */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent" />
      {fullBleed && showScreenshot ? (
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-transparent" />
      ) : null}
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}

/**
 * Abstract storefront for projects with no screenshot yet.
 *
 * The hero and each product tile are built from layered radial gradients — a
 * mesh, not a fill. Real CSS gradients are used rather than blurred elements
 * because they stay smooth at any size and cost nothing to composite.
 */
function MockStorefront({ initials, tint }: { initials: string; tint: Tint }) {
  const heroMesh = [
    `radial-gradient(120% 95% at 16% 4%, ${tint.bloomA} 0%, transparent 56%)`,
    `radial-gradient(100% 85% at 90% 20%, ${tint.bloomB} 0%, transparent 58%)`,
    `radial-gradient(150% 110% at 48% 118%, ${tint.bloomC} 0%, transparent 64%)`,
    tint.base,
  ].join(', ')

  return (
    <>
      {/* Nav row */}
      <div className="mb-2.5 flex shrink-0 items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-2">
        <span className="text-[0.5rem] font-semibold tracking-[0.22em] text-white/70">
          {initials}
        </span>
        <div className="flex gap-1.5">
          <span className="h-1 w-6 rounded-full bg-white/20" />
          <span className="h-1 w-5 rounded-full bg-white/15" />
          <span className="h-1 w-7 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Hero block */}
      <div
        className="relative mb-2.5 h-[38%] shrink-0 overflow-hidden rounded-xl border border-white/10"
        style={{ background: heroMesh }}
      >
        {/* Scrim under the caption bars so they read against the light areas */}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-2.5 left-3 space-y-1.5">
          <span className="block h-1.5 w-16 rounded-full bg-white/85 sm:w-24" />
          <span className="block h-1 w-11 rounded-full bg-white/45 sm:w-16" />
        </div>

        {/* Light sweep across the hero */}
        <div className="animate-shimmer absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* Product grid — each tile lit from a different angle, so the row reads
          as three different photographs rather than one swatch repeated. */}
      <div className="grid shrink-0 grid-cols-3 gap-2">
        {[
          { x: '28%', y: '18%', bloom: tint.bloomA },
          { x: '70%', y: '26%', bloom: tint.bloomB },
          { x: '45%', y: '12%', bloom: tint.bloomA },
        ].map((tile, index) => (
          <div
            key={index}
            className="space-y-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] p-1.5"
          >
            <div
              className="aspect-square rounded-md"
              style={{
                background: [
                  `radial-gradient(85% 75% at ${tile.x} ${tile.y}, ${tile.bloom} 0%, transparent 62%)`,
                  `radial-gradient(120% 100% at 50% 120%, ${tint.bloomC} 0%, transparent 66%)`,
                  tint.base,
                ].join(', '),
              }}
            />
            <span className="block h-0.5 w-3/4 rounded-full bg-white/25" />
            <span className="block h-0.5 w-1/3 rounded-full bg-white/15" />
          </div>
        ))}
      </div>
    </>
  )
}
