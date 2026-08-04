import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Options = {
  duration?: number
  decimals?: number
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Counts from zero to `value`, starting the first time the element scrolls
 * into view. Returns the formatted string plus the ref to attach.
 *
 * The animated fraction lives in state and the displayed number is derived
 * from it during render, so the "don't animate" paths (reduced motion, no
 * IntersectionObserver) need no state write at all — they simply render the
 * final value.
 */
export function useCountUp(
  value: number,
  { duration = 1800, decimals = 0 }: Options = {},
) {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const canAnimate =
    !reducedMotion && typeof IntersectionObserver !== 'undefined'

  const [progress, setProgress] = useState(0)
  const current = canAnimate ? value * progress : value

  useEffect(() => {
    const node = ref.current
    if (!node || !canAnimate) return

    let frame = 0
    let start: number | null = null

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const t = Math.min((timestamp - start) / duration, 1)
      setProgress(easeOutExpo(t))
      if (t < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.unobserve(node)
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [canAnimate, duration])

  return {
    ref,
    /** Locale-formatted so 1200 renders as "1,200" rather than "1200". */
    display: current.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  }
}
