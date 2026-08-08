import { useId, useState } from 'react'
import { ArrowRight, Plus } from './Icons'
import { scrollToSection } from '@/lib/smoothScroll'
import { cn } from '@/lib/cn'

export type AccordionItem = {
  question: string
  answer: string
  /** Optional action below the answer, for questions where the honest reply
   *  is "it depends — let us look at yours". */
  cta?: { label: string; href: string }
}

type Props = {
  items: readonly AccordionItem[]
  /** Index open on first paint. Pass `null` for all-closed. */
  defaultOpen?: number | null
}

/**
 * Single-open accordion.
 *
 * Height animates via `grid-template-rows: 0fr → 1fr`, which transitions
 * smoothly without measuring the content or hardcoding a max-height that
 * breaks the moment the copy changes.
 */
export function Accordion({ items, defaultOpen = 0 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)
  const baseId = useId()

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={item.question} className="group">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left',
                  'transition-colors duration-300 hover:text-accent md:py-7',
                  isOpen ? 'text-accent' : 'text-subtle',
                )}
              >
                <span className="text-base font-medium tracking-[-0.01em] text-balance md:text-lg">
                  {item.question}
                </span>

                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full border border-line',
                    'transition-all duration-500 ease-[var(--ease-out-quint)]',
                    isOpen
                      ? 'rotate-45 border-transparent bg-brand text-on-brand'
                      : 'bg-fill-1 group-hover:border-brand/50 group-hover:text-brand',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-quint)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pr-12 leading-relaxed text-muted">
                  {item.answer}
                </p>

                {item.cta ? (
                  <a
                    href={item.cta.href}
                    onClick={(event) => {
                      if (!item.cta!.href.startsWith('#')) return
                      event.preventDefault()
                      scrollToSection(item.cta!.href)
                    }}
                    className="group/cta mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-300 hover:text-brand-bright"
                  >
                    {item.cta.label}
                    <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover/cta:translate-x-0.5" />
                  </a>
                ) : null}

                <div className="pb-7" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
