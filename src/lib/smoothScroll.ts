import Lenis from 'lenis'

/**
 * Scroll behaviour for the whole site.
 *
 * The page itself is driven by one Lenis instance. Overlays introduce a second
 * problem: a panel with its own `overflow-y-auto` is a separate scroll
 * container, and the page instance deliberately ignores it (`data-lenis-prevent`).
 * Left alone those panels scroll natively, which reads as a jolt straight after
 * an eased page scroll. `initNestedScroll` gives them the same easing, so the
 * site has one scroll feel rather than two.
 *
 * Every instance is driven from a single rAF loop. Per-instance loops would
 * each schedule their own frame, and the panel would then update on a different
 * tick from the page behind it.
 */

/**
 * Shared so the page and every overlay behave identically.
 *
 * Deliberately `lerp` rather than `duration`. Lenis treats the two as
 * alternatives: given a duration it animates every single wheel notch over
 * that fixed span, so a scroll could not settle in under a second no matter
 * how small the gesture, and a second notch mid-flight restarted the clock.
 * That is what made the page feel heavy and a beat behind the wheel.
 *
 * Lerp instead eases a fraction of the remaining distance each frame: it moves
 * immediately, most of the travel happens in the first few frames, and a burst
 * of notches accumulates rather than queueing. Higher is snappier, lower is
 * floatier. 0.13 keeps a visible glide without the lag.
 */
const SCROLL_OPTIONS = {
  lerp: 0.13,
  smoothWheel: true,
  // Touch devices already have excellent native momentum; overriding it makes
  // a site feel laggy rather than smooth.
  syncTouch: false,
  // A notch of the wheel covers slightly more ground, so reaching the next
  // section takes fewer of them.
  wheelMultiplier: 1.15,
} as const

/**
 * Timed easing, used only where the page moves itself: jumping to a section,
 * or bringing an invalid field into view. A fixed duration is right there,
 * because the distance is arbitrary and the travel should read as deliberate
 * rather than depending on how far away the target happened to be.
 *
 * Matches --ease-out-quint, so these scrolls and the site's CSS transitions
 * sit on the same curve.
 */
const EASE_OUT_QUINT = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

/** The page instance. Null under reduced motion, and before init. */
let lenis: Lenis | null = null

/** Nested panels, keyed by their scroll container so a scroll request can find
 *  the instance that owns the element it needs to reach. */
const nested = new Map<HTMLElement, Lenis>()

const running = new Set<Lenis>()
let frame = 0

function tick(time: number) {
  running.forEach((instance) => instance.raf(time))
  frame = requestAnimationFrame(tick)
}

function register(instance: Lenis) {
  running.add(instance)
  if (!frame) frame = requestAnimationFrame(tick)
}

function unregister(instance: Lenis) {
  running.delete(instance)
  if (running.size === 0 && frame) {
    cancelAnimationFrame(frame)
    frame = 0
  }
}

/**
 * Honoured everywhere rather than only at init: someone can change this
 * setting while the page is open, and a scroll requested after that should
 * respect it even though the page instance was built before.
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function initSmoothScroll(): () => void {
  // Native scrolling is the correct behaviour here. Hijacking it would
  // reintroduce exactly the motion the visitor opted out of.
  if (prefersReducedMotion()) return () => {}

  const instance = new Lenis(SCROLL_OPTIONS)
  lenis = instance
  register(instance)

  return () => {
    unregister(instance)
    instance.destroy()
    if (lenis === instance) lenis = null
  }
}

/**
 * Smooth wheel scrolling inside an overlay panel.
 *
 * `wrapper` is the element with `overflow-y-auto`; `content` is its single
 * child holding everything that scrolls. Returns a cleanup function.
 *
 * Note this does not use `autoToggle`, which would let Lenis write
 * `overflow: clip` onto the wrapper and break the panel's own scrolling.
 */
export function initNestedScroll(
  wrapper: HTMLElement,
  content: HTMLElement,
): () => void {
  if (prefersReducedMotion()) return () => {}

  // `eventsTarget` defaults to the wrapper, so this instance only reacts to
  // wheel and touch events over the panel itself.
  const instance = new Lenis({ ...SCROLL_OPTIONS, wrapper, content })
  nested.set(wrapper, instance)
  register(instance)

  return () => {
    unregister(instance)
    nested.delete(wrapper)
    instance.destroy()
  }
}

/** Pause/resume wheel + touch scrolling on the page (used by overlays). */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }

  // Also required when Lenis is inactive (reduced motion, or before init).
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  document.body.style.overflow = locked ? 'hidden' : ''
}

/**
 * Smoothly scroll to a `#section-id`, accounting for the fixed header.
 *
 * `pushHistory` writes the hash into the address bar so a section can be
 * shared or bookmarked, and so the Back button steps back through the page
 * rather than leaving the site. It is off for programmatic scrolls (the skip
 * link, restoring an inbound hash) where a history entry would be noise.
 */
export function scrollToSection(hash: string, pushHistory = true) {
  const target = document.querySelector(hash)
  if (!target) return

  if (pushHistory && window.location.hash !== hash) {
    window.history.pushState(null, '', hash)
  }

  if (lenis) {
    lenis.scrollTo(target as HTMLElement, {
      offset: -80,
      duration: 1,
      easing: EASE_OUT_QUINT,
    })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

/** The scroll container an element actually lives in, or null for the page. */
function scrollParent(element: HTMLElement): HTMLElement | null {
  let node = element.parentElement

  while (node && node !== document.body) {
    const overflowY = window.getComputedStyle(node).overflowY
    if (
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      node.scrollHeight > node.clientHeight
    ) {
      return node
    }
    node = node.parentElement
  }

  return null
}

/**
 * Bring an element into view with the site's easing, wherever it lives.
 *
 * Used for things the page moves to on the visitor's behalf, such as the first
 * invalid field in a form. Those are the easiest places to end up with a hard
 * jump, because the browser's own `focus()` and `scrollIntoView()` default to
 * instant. Pair this with `focus({ preventScroll: true })`, or the browser
 * jumps first and there is nothing left to animate.
 */
export function scrollElementIntoView(element: HTMLElement, offset = -32) {
  const container = scrollParent(element)
  const instance = container ? nested.get(container) : lenis

  if (instance) {
    instance.scrollTo(element, { offset, duration: 0.7, easing: EASE_OUT_QUINT })
    return
  }

  // No Lenis on this surface: reduced motion, or a container we do not own.
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'center',
  })
}

/**
 * Makes Back and Forward move between sections, and honours a hash the visitor
 * arrived with. Returns a cleanup function.
 */
export function initHashNavigation(): () => void {
  const goToCurrentHash = () => {
    const { hash } = window.location
    if (hash && document.querySelector(hash)) scrollToSection(hash, false)
  }

  window.addEventListener('popstate', goToCurrentHash)
  return () => window.removeEventListener('popstate', goToCurrentHash)
}

/** Scroll to an inbound `#hash` once the page is interactive. */
export function restoreInboundHash() {
  const { hash } = window.location
  if (hash && document.querySelector(hash)) scrollToSection(hash, false)
}
