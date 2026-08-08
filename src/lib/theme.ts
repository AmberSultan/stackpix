export type Theme = 'light' | 'dark'

/** Also read by the inline boot script in index.html — keep the two in sync. */
export const THEME_STORAGE_KEY = 'stackpixx-theme'

/** Browser-chrome colour per theme. Mirrors --p-ink in globals.css. */
const THEME_COLOR: Record<Theme, string> = {
  light: '#f7f7f4',
  dark: '#050505',
}

/**
 * The theme is already on <html> by the time React mounts — the boot script in
 * index.html puts it there before first paint. Reading it back, rather than
 * recomputing, guarantees React's idea of the theme matches what is on screen.
 */
export function readTheme(): Theme {
  if (typeof document === 'undefined') return DEFAULT_THEME
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/**
 * What a first-time visitor gets.
 *
 * Light, regardless of their operating system's dark-mode setting. That is a
 * deliberate departure from the usual advice to follow `prefers-color-scheme`:
 * this site was designed light-first, and on a laptop set to dark a visitor
 * would land on the alternate palette and never see the intended one.
 *
 * Dark remains one tap away and is remembered once chosen — it is the default
 * that changes here, not the choice.
 *
 * Kept in sync with the boot script in index.html, which applies the same rule
 * before first paint.
 */
export const DEFAULT_THEME: Theme = 'light'

/** Skips the cross-fade on the very first apply, which happens on mount and
 *  would otherwise animate a theme that is already correct. */
let applied = false

export function applyTheme(theme: Theme) {
  const root = document.documentElement

  // Transition every colour at once so the switch reads as one movement
  // rather than each element changing on its own schedule. Gated on motion
  // preference, since this is decoration rather than feedback.
  const animate =
    applied && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (animate) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 360)
  }

  root.dataset.theme = theme
  applied = true

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[theme])

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Private browsing or blocked storage — the theme still applies for this
    // session, it just will not be remembered.
  }
}
