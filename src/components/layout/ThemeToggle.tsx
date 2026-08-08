import { Sun, Moon } from '@/components/ui/Icons'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'

/**
 * Light/dark switch.
 *
 * Both icons are always in the DOM, stacked, and swap by rotating through each
 * other — a crossfade alone reads as a glitch at this size, while the rotation
 * makes it look like one object turning over.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <>
      {/* The button's own label flips as a side effect of the click, which
          screen readers do not announce. This says what happened. */}
      <span aria-live="polite" className="sr-only">
        {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
      </span>

    <button
      type="button"
      onClick={toggle}
      // The label states the outcome, not the current state — "Switch to dark"
      // is unambiguous where "Dark mode" is not.
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={cn(
        'group relative flex size-9 cursor-pointer items-center justify-center overflow-hidden',
        'rounded-full border border-line text-accent',
        'transition-colors duration-300 hover:border-brand/50 hover:bg-fill-2 hover:text-brand',
        className,
      )}
    >
      <span
        className={cn(
          'absolute transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)]',
          isDark
            ? 'translate-y-0 rotate-0 opacity-100'
            : '-translate-y-5 rotate-90 opacity-0',
        )}
      >
        <Moon className="size-4.5" />
      </span>

      <span
        className={cn(
          'absolute transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)]',
          isDark
            ? 'translate-y-5 -rotate-90 opacity-0'
            : 'translate-y-0 rotate-0 opacity-100',
        )}
      >
        <Sun className="size-4.5" />
      </span>
    </button>
    </>
  )
}
