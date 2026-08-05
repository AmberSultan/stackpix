import { useCallback, useEffect, useState } from 'react'
import {
  applyTheme,
  hasStoredPreference,
  preferredTheme,
  readTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from '@/lib/theme'

/**
 * Current theme plus a toggle.
 *
 * State is seeded from the DOM, which the boot script has already set, so the
 * first render matches what the user is looking at. Everything after that is
 * one-way: state changes, the effect writes it to the document.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Keep other tabs in step.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY || !event.newValue) return
      setTheme(event.newValue === 'dark' ? 'dark' : 'light')
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Follow the OS only until the visitor expresses a preference of their own.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      if (hasStoredPreference()) return
      setTheme(event.matches ? 'dark' : 'light')
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle, setTheme, preferred: preferredTheme }
}
