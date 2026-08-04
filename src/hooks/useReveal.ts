import { useEffect, useRef } from 'react'

type Options = {
  /** Fraction of the element that must be visible before it animates in. */
  threshold?: number
  /** Shrinks the viewport from the bottom so elements settle before they land. */
  rootMargin?: string
  /** Re-hide the element when it leaves the viewport. Off by default — content
   *  that re-animates on every pass reads as a gimmick rather than a detail. */
  repeat?: boolean
}

/**
 * Attaches an IntersectionObserver that flips `data-revealed` on the element.
 * All of the actual motion is declared in globals.css, which keeps the
 * animation reviewable in one place and costs no JS on the main thread.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  repeat = false,
}: Options = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // If the browser can't observe, show the content rather than hiding it.
    if (typeof IntersectionObserver === 'undefined') {
      node.dataset.revealed = 'true'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.revealed = 'true'
          if (!repeat) observer.unobserve(node)
        } else if (repeat) {
          node.dataset.revealed = 'false'
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, repeat])

  return ref
}
