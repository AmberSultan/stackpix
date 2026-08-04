import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Options = {
  /** How far the element follows the cursor, as a fraction of the offset. */
  strength?: number
  /** Distance in px beyond the element's bounds that still counts as a hover. */
  padding?: number
  /** Lets a caller keep the hook order stable while opting out of the effect. */
  enabled?: boolean
}

/**
 * Pulls an element gently toward the cursor while it is nearby, then springs
 * it home on exit. Pointer-driven, so it is skipped entirely on touch devices
 * and when the user has asked for reduced motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>({
  strength = 0.32,
  padding = 28,
  enabled = true,
}: Options = {}) {
  const ref = useRef<T>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled || reducedMotion) return

    // Coarse pointers have no hover, so the effect would only ever fire as a
    // jump on tap. Not worth the listener.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = event.clientX - centerX
        const dy = event.clientY - centerY

        const withinX = Math.abs(dx) < rect.width / 2 + padding
        const withinY = Math.abs(dy) < rect.height / 2 + padding

        if (withinX && withinY) {
          node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
        } else {
          node.style.transform = 'translate3d(0, 0, 0)'
        }
      })
    }

    const reset = () => {
      cancelAnimationFrame(frame)
      node.style.transform = 'translate3d(0, 0, 0)'
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', reset)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', reset)
    }
  }, [strength, padding, enabled, reducedMotion])

  return ref
}
