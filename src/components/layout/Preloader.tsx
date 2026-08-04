import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { setScrollLocked } from '@/lib/smoothScroll'
import { cn } from '@/lib/cn'

const DURATION = 1500
/** Time the curtain takes to clear the viewport, per the transition below. */
const LIFT_DURATION = 1100

type Props = {
  /** Fires when the curtain starts lifting, so the hero can animate in behind it. */
  onComplete: () => void
}

/**
 * Counter-and-curtain intro.
 *
 * Deliberately short. A loading animation buys goodwill for roughly a second
 * and starts costing conversions after that, so it holds only as long as the
 * count takes and then gets out of the way.
 *
 * Under reduced motion the component renders nothing at all and the page is
 * interactive immediately.
 */
export function Preloader({ onComplete }: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)
  const [lifting, setLifting] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      return
    }

    setScrollLocked(true)

    let frame = 0
    let timer = 0
    let start: number | null = null

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp
      const t = Math.min((timestamp - start) / DURATION, 1)
      // Ease-out so the count decelerates into 100 rather than snapping.
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))

      if (t < 1) {
        frame = requestAnimationFrame(tick)
        return
      }

      setLifting(true)
      onComplete()
      setScrollLocked(false)
      timer = window.setTimeout(() => setHidden(true), LIFT_DURATION)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      setScrollLocked(false)
    }
  }, [reducedMotion, onComplete])

  if (reducedMotion || hidden) return null

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-100 flex flex-col justify-between overflow-hidden bg-ink px-6 py-10 md:px-10',
        'transition-[transform,opacity] duration-[1000ms] ease-[var(--ease-in-out-quint)]',
        lifting && '-translate-y-full opacity-0',
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-[0.6rem] bg-accent text-sm font-bold text-ink">
          {site.mark}
        </span>
        <span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
          {site.name}
        </span>
      </div>

      <div className="flex items-end justify-between gap-8">
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          {site.tagline}
        </p>
        <span className="text-[clamp(4rem,14vw,10rem)] leading-[0.8] font-semibold tracking-[-0.05em] tabular-nums">
          {progress}
        </span>
      </div>

      {/* Progress rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
