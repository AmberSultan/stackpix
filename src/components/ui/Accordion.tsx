import { useId, useState } from 'react'
import { Plus } from './Icons'
import { cn } from '@/lib/cn'

export type AccordionItem = {
  question: string
  answer: string
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
    <div className="divide-y divide-white/8 border-y border-white/8">
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
                      ? 'rotate-45 border-transparent bg-accent text-ink'
                      : 'bg-white/[0.03] group-hover:border-line-strong',
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
                <p className="max-w-2xl pr-12 pb-7 leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
