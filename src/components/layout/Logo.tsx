import { site } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Wordmark: the brand mark as a tile, plus the name set in the site's own type.
 *
 * The name is HTML rather than part of the SVG on purpose — it stays crisp at
 * any size, and it re-colours with the theme, which a baked-in wordmark cannot.
 * `site.mark` sits behind the image as a fallback, so a failed request degrades
 * to the lettered tile instead of an empty box.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label={`${site.name} home`}
      className={cn('group flex items-center gap-2.5', className)}
    >
      <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-[0.6rem] bg-brand text-on-brand">
        <span className="text-sm font-bold tracking-tight">{site.mark}</span>

        {/* The mark's own artwork is a full-bleed tile, so it covers the
            fallback letter completely once loaded. */}
        <img
          src="/brand/logo.svg"
          alt=""
          width={32}
          height={32}
          className="absolute inset-0 size-full"
        />

        {/* Light sweeps across the tile on hover */}
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/25 to-transparent transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:translate-x-full" />
      </span>

      <span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
        {site.name}
      </span>
    </a>
  )
}
