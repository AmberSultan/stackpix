import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Publishes the cursor's position within a container as two CSS custom
 * properties, `--mx` and `--my`, each running from -1 to 1 with 0 at centre.
 *
 * Children opt into the effect with plain CSS, e.g.
 *   `translate3d(calc(var(--mx) * 18px), calc(var(--my) * 12px), 0)`
 *
 * Keeping the maths in CSS means one rAF loop drives any number of layers,
 * and every layer can pick its own depth without extra JS.
 */
export function useMouseParallax<T extends HTMLElement = HTMLDivElement>(
  /** Easing factor per frame — lower is heavier and more expensive-feeling. */
  smoothing = 0.075,
) {
  const ref = useRef<T>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reducedMotion) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0
    let running = false

    const tick = () => {
      current.x += (target.x - current.x) * smoothing
      current.y += (target.y - current.y) * smoothing

      node.style.setProperty('--mx', current.x.toFixed(4))
      node.style.setProperty('--my', current.y.toFixed(4))

      // Park the loop once the layers have settled; restart on the next move.
      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001

      if (settled) {
        running = false
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1
      start()
    }

    const onPointerLeave = () => {
      target.x = 0
      target.y = 0
      start()
    }

    node.addEventListener('pointermove', onPointerMove, { passive: true })
    node.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [smoothing, reducedMotion])

  return ref
}
