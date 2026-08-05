import { site } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Wordmark. The mark is a typographic tile rather than a bespoke glyph, so a
 * rebrand only needs `site.name` / `site.mark` changed — drop in an SVG here
 * when a real logo exists.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label={`${site.name} — home`}
      className={cn('group flex items-center gap-2.5', className)}
    >
      <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-[0.6rem] bg-brand text-on-brand">
        <span className="text-sm font-bold tracking-tight">{site.mark}</span>
        {/* Light sweeps across the tile on hover */}
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/25 to-transparent transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:translate-x-full" />
      </span>
      <span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
        {site.name}
      </span>
    </a>
  )
}
