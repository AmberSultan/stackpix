import { cn } from '@/lib/cn'

/**
 * Renders a plain string with `**bold**` segments emphasised.
 *
 * Config stays as ordinary strings — easy to edit, no JSX in a data file — and
 * nothing is injected as HTML, so a stray angle bracket in copy can never
 * become markup.
 *
 * Emphasised runs are brighter than the surrounding text as well as heavier.
 * In a paragraph set in `muted`, weight alone is too quiet to catch the eye of
 * someone scanning rather than reading.
 */
export function RichText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  // The capturing group keeps the delimiters in the output, so the split
  // alternates between plain text and marked-up runs.
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <p className={cn(className)}>
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold text-accent">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </p>
  )
}
