import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  /** Seconds for one full pass. Longer = calmer. */
  duration?: number
  /** Pauses on hover so a visitor can actually read a logo. */
  pauseOnHover?: boolean
  className?: string
}

/**
 * Infinite horizontal scroller. The track holds two identical copies of the
 * children and translates by exactly -50%, so the seam lands on a duplicate
 * and the loop is invisible.
 */
export function Marquee({
  children,
  duration = 42,
  pauseOnHover = true,
  className,
}: Props) {
  return (
    <div
      className={cn('mask-fade-x group relative overflow-hidden', className)}
    >
      <div
        className={cn(
          'animate-marquee flex w-max items-center',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        {/* Duplicate is decorative — hidden from assistive tech so logos
            aren't announced twice. */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
