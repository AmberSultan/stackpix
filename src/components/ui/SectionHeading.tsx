import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/cn'

type Props = {
  /** Small label above the title. Sets the section's context in two words. */
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  /** Slot for a CTA that sits opposite the title on wide screens. */
  action?: ReactNode
  className?: string
}

/** Small monospaced label with a leading dot — the section marker used
 *  throughout the site. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] tracking-[0.18em] text-brand uppercase">
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-brand shadow-[0_0_12px_2px_rgba(255,90,31,0.55)]"
      />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}: Props) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-8',
        // The action sits inline on desktop and stacks under the copy on
        // mobile, so the heading never competes with the button for width.
        action && !centered && 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-5',
          centered && 'items-center text-center',
          !centered && 'max-w-3xl',
        )}
      >
        {eyebrow ? (
          <Reveal variant="fade">
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}

        <Reveal delay={60}>
          <h2 className="text-h2 text-gradient font-semibold">{title}</h2>
        </Reveal>

        {description ? (
          <Reveal delay={120}>
            <p
              className={cn(
                'text-lead leading-relaxed text-subtle',
                centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
              )}
            >
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal delay={180} className={cn(centered && 'mx-auto')}>
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}
