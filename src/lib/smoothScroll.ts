import Lenis from 'lenis'

/**
 * A single Lenis instance owned by the app shell. Exposed through this module
 * so anything that needs to pause scrolling (the mobile menu, the case-study
 * overlay) can do so without prop-drilling a ref through the tree.
 */
let lenis: Lenis | null = null

export function initSmoothScroll(): () => void {
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  // Native scrolling is the correct behaviour here — hijacking it would
  // reintroduce exactly the motion the user opted out of.
  if (prefersReduced) return () => {}

  lenis = new Lenis({
    duration: 1.05,
    // Matches --ease-out-quint so momentum scrolling and element transitions
    // decelerate on the same curve.
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Touch devices already have excellent native momentum; overriding it
    // makes a site feel laggy rather than smooth.
    syncTouch: false,
    wheelMultiplier: 1,
  })

  let frame = 0
  const raf = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

/** Pause/resume wheel + touch scrolling (used by overlays). */
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
    lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.35 })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
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
