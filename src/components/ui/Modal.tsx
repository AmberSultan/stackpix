import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { setScrollLocked } from '@/lib/smoothScroll'
import { Close } from './Icons'
import { cn } from '@/lib/cn'

/** Must match the panel's transition duration below. */
const EXIT_DURATION = 420

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  label: string
}

/**
 * Full-screen overlay used for case studies.
 *
 * Closing is initiated from inside the component: the exit transition plays
 * first, then `onClose` fires and the parent unmounts it. That ordering keeps
 * every state change inside an event handler or timer callback rather than a
 * render effect, and means the panel is never yanked off screen mid-animation.
 *
 * It also handles the parts that are easy to forget and obvious when missing:
 * scroll lock (including Lenis), Escape to dismiss, focus moved into the
 * dialog and restored on close, and a keyboard trap so Tab cannot wander
 * behind the overlay.
 */
export function Modal({ open, onClose, children, label }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const closingRef = useRef(false)

  // Drives the transition. Flipped a frame after mount so the panel animates
  // in rather than appearing at its final position.
  const [entered, setEntered] = useState(false)

  const requestClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true

    setEntered(false)
    window.setTimeout(() => {
      restoreFocusRef.current?.focus()
      onClose()
    }, EXIT_DURATION)
  }, [onClose])

  useEffect(() => {
    if (!open) return

    closingRef.current = false
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    setScrollLocked(true)

    const frame = requestAnimationFrame(() => setEntered(true))

    return () => {
      cancelAnimationFrame(frame)
      setScrollLocked(false)
    }
  }, [open])

  // Move focus into the dialog once it has arrived.
  useEffect(() => {
    if (entered) panelRef.current?.focus()
  }, [entered])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        requestClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, requestClose])

  // Release the lock even if the tree unmounts mid-transition.
  useEffect(() => () => setScrollLocked(false), [])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-100" role="dialog" aria-modal="true" aria-label={label}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={requestClose}
        className={cn(
          'absolute inset-0 cursor-default bg-black/80 backdrop-blur-xl',
          'transition-opacity duration-500 ease-[var(--ease-out-quint)]',
          entered ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        data-lenis-prevent
        className={cn(
          'absolute inset-x-0 top-4 bottom-0 overflow-y-auto outline-none',
          'rounded-t-[1.75rem] border-t border-line bg-ink sm:top-8 md:top-12',
          'transition-[transform,opacity] duration-[420ms] ease-[var(--ease-out-quint)]',
          entered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        )}
      >
        <div className="sticky top-0 z-10 flex justify-end border-b border-line bg-ink/85 px-5 py-4 backdrop-blur-xl md:px-10">
          <button
            type="button"
            onClick={requestClose}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2',
              'text-sm text-subtle transition-colors duration-300',
              'hover:border-line-strong hover:bg-white/[0.05] hover:text-accent',
            )}
          >
            Close
            <Close className="size-4" />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  )
}
