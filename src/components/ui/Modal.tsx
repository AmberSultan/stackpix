import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { initNestedScroll, setScrollLocked } from '@/lib/smoothScroll'
import { ModalCloseContext } from './modalClose'
import { Close } from './Icons'
import { cn } from '@/lib/cn'

/** Must match the panel's transition duration below. */
const EXIT_DURATION = 420

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  label: string
  /**
   * `sheet` — near full-height panel rising from the bottom. For long content
   * that the visitor will scroll through, like a case study.
   *
   * `dialog` — centred, width-capped card. For a short, self-contained task
   * such as a form. A form floating in the middle of a full-height sheet
   * reads as an empty page with something small in it.
   */
  variant?: 'sheet' | 'dialog'
}

/**
 * Focus-trapping overlay.
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
export function Modal({
  open,
  onClose,
  children,
  label,
  variant = 'sheet',
}: Props) {
  const isDialog = variant === 'dialog'

  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const closingRef = useRef(false)

  // Drives the transition. Flipped a frame after mount so the panel animates
  // in rather than appearing at its final position.
  const [entered, setEntered] = useState(false)

  /**
   * `after` runs once the overlay is fully gone. Anything a child wants to do
   * to the page underneath — scrolling to a section, focusing a field — has to
   * wait for that, or it happens behind a full-screen panel and looks to the
   * visitor like the button did nothing.
   */
  const requestClose = useCallback(
    (after?: () => void) => {
      if (closingRef.current) return
      closingRef.current = true

      setEntered(false)
      window.setTimeout(() => {
        // preventScroll: restoring focus to the element that opened the modal
        // would otherwise drag the page back to it, undoing anything `after`
        // is about to do.
        restoreFocusRef.current?.focus({ preventScroll: true })
        onClose()

        if (!after) return

        // Release the lock here rather than waiting for the unmount effect to
        // do it. `onClose` only *schedules* a re-render, so at this instant
        // Lenis is still stopped and the page still has overflow:hidden — a
        // scroll requested now is silently dropped. Unlock, let React commit,
        // then run the callback.
        setScrollLocked(false)
        requestAnimationFrame(() => after())
      }, EXIT_DURATION)
    },
    [onClose],
  )

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

  /* The panel is its own scroll container, and the page instance is told to
     leave it alone (`data-lenis-prevent`). Without this it would be the one
     surface on the site that scrolls natively, which is jarring immediately
     after an eased page scroll. */
  useEffect(() => {
    if (!open) return
    const wrapper = panelRef.current
    const content = contentRef.current
    if (!wrapper || !content) return
    return initNestedScroll(wrapper, content)
  }, [open])

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

  // No portal target outside a browser. A modal is never open on first paint,
  // so returning null costs nothing and keeps the tree safe to render on the
  // server — which prerendering would otherwise crash on.
  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <ModalCloseContext.Provider value={requestClose}>
    <div
      className={cn(
        'fixed inset-0 z-100',
        isDialog && 'flex items-center justify-center p-4 sm:p-6',
      )}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        // Wrapped, not passed directly: as a handler it would hand the click
        // event to `requestClose` as its `after` callback, which then tries to
        // invoke the event.
        onClick={() => requestClose()}
        className={cn(
          'absolute inset-0 cursor-default bg-scrim backdrop-blur-xl',
          'transition-opacity duration-500 ease-[var(--ease-out-quint)]',
          entered ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        data-lenis-prevent
        className={cn(
          'overflow-y-auto bg-ink outline-none',
          'transition-[transform,opacity] duration-[420ms] ease-[var(--ease-out-quint)]',
          isDialog
            ? [
                // Capped height rather than fixed, so a short form sits at its
                // natural size and a long one scrolls inside the card.
                'relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl',
                'rounded-[var(--radius-panel)] border border-line shadow-[var(--p-lift-shadow)]',
                entered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
              ]
            : [
                'absolute inset-x-0 top-4 bottom-0',
                'rounded-t-[1.75rem] border-t border-line sm:top-8 md:top-12',
                entered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
              ],
        )}
      >
        {/* Everything that scrolls lives in one child of the panel, which is
            what Lenis needs to measure a nested container. The header stays
            sticky inside it: sticky resolves against the scrollport (the
            panel), not against its immediate parent. */}
        <div ref={contentRef}>
          <div
            className={cn(
              'sticky top-0 z-10 flex justify-end border-b border-line bg-ink/85 backdrop-blur-xl',
              isDialog ? 'px-4 py-3' : 'px-5 py-4 md:px-10',
            )}
          >
            <button
              type="button"
              onClick={() => requestClose()}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2',
                'text-sm text-subtle transition-colors duration-300',
                'hover:border-line-strong hover:bg-fill-2 hover:text-accent',
              )}
            >
              Close
              <Close className="size-4" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
    </ModalCloseContext.Provider>,
    document.body,
  )
}
