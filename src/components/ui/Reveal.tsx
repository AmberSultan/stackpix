import { createElement, type ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/cn'

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'span' | 'p' | 'header'

type RevealProps = {
  children: ReactNode
  /** Direction the element travels in from. */
  variant?: 'up' | 'fade' | 'left' | 'right' | 'scale'
  /** Milliseconds. Use small increments (60–90ms) to stagger a list. */
  delay?: number
  className?: string
  as?: RevealTag
  threshold?: number
}

/**
 * Declarative wrapper around useReveal. The element starts hidden and fades
 * up the first time it enters the viewport.
 *
 * For staggered groups, pass an incrementing `delay`:
 *   items.map((item, i) => <Reveal key={item.id} delay={i * 70}>…</Reveal>)
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  as = 'div',
  threshold,
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ threshold })

  return createElement(
    as,
    {
      ref,
      className: cn(className),
      'data-reveal': variant,
      style: delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined,
    },
    children,
  )
}
