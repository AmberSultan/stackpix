import { useEffect, useRef, useState } from 'react'

/**
 * Returns how far the viewport has travelled through an element, from 0 when
 * its top reaches the middle of the screen to 1 when its bottom does.
 *
 * Reads are batched into a rAF so the scroll listener never touches layout
 * more than once a frame.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0

    const measure = () => {
      const rect = node.getBoundingClientRect()
      const anchor = window.innerHeight * 0.5
      const travelled = anchor - rect.top
      const total = rect.height

      if (total <= 0) return
      setProgress(Math.min(Math.max(travelled / total, 0), 1))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { ref, progress }
}
