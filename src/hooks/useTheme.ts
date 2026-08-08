import { useCallback, useEffect, useState } from 'react'
import {
  applyTheme,
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
 *
 * The operating system's colour-scheme preference is intentionally not
 * consulted — see DEFAULT_THEME in lib/theme.ts.
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

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle, setTheme }
}
