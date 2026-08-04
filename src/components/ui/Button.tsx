import type { ReactNode, MouseEvent } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { scrollToSection } from '@/lib/smoothScroll'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type BaseProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Adds the cursor-following effect. Off for dense UI, on for hero CTAs. */
  magnetic?: boolean
  icon?: ReactNode
}

type ButtonProps = BaseProps & {
  href?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
  type?: 'button' | 'submit'
  ariaLabel?: string
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'whitespace-nowrap select-none transition-[background-color,color,border-color,box-shadow,transform] ' +
  'duration-300 ease-[var(--ease-out-quint)] active:scale-[0.97] will-change-transform'

const variants: Record<Variant, string> = {
  // The house CTA: white pill, black label, and a soft white bloom on hover.
  primary:
    'bg-accent text-ink hover:shadow-[0_8px_40px_-8px_rgba(255,255,255,0.45)] hover:bg-white',
  // Reads as glass over the hero gradient, as a hairline button elsewhere.
  secondary:
    'border border-line-strong bg-white/[0.03] text-accent backdrop-blur-md ' +
    'hover:bg-white/[0.08] hover:border-white/25',
  ghost:
    'text-subtle hover:text-accent',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[3.25rem] px-7 text-[0.9375rem]',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  magnetic = false,
  icon,
  href,
  onClick,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const ref = useMagnetic<HTMLElement>({ strength: 0.3, enabled: magnetic })
  const classes = cn(base, variants[variant], sizes[size], className)

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span className="relative z-10 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </>
  )

  if (href) {
    const isAnchor = href.startsWith('#')
    // mailto: and tel: must stay in the same tab — a blank target opens an
    // empty window alongside the mail client on most browsers.
    const isExternal = /^https?:/.test(href)

    return (
      <a
        ref={magnetic ? (ref as React.Ref<HTMLAnchorElement>) : undefined}
        href={href}
        aria-label={ariaLabel}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
        onClick={(event) => {
          // In-page links go through Lenis so the CTA and the scrollbar share
          // the same easing.
          if (isAnchor) {
            event.preventDefault()
            scrollToSection(href)
          }
          onClick?.(event)
        }}
        className={classes}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={magnetic ? (ref as React.Ref<HTMLButtonElement>) : undefined}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  )
}
