import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Quote, Star } from '@/components/ui/Icons'
import { testimonials, type Testimonial } from '@/config/site'

/**
 * One large pull-quote followed by a masonry-ish column layout. Giving the
 * strongest quote room to breathe is worth more than four equal cards.
 */
export function Testimonials() {
  // Renders nothing until there is at least one real quote. A testimonials
  // section with invented names is worse than no testimonials section — see
  // the note above `testimonials` in config/site.ts.
  if (testimonials.length === 0) return null

  const featured = testimonials.find((item) => item.featured) ?? testimonials[0]
  const rest = testimonials.filter((item) => item !== featured)

  return (
    <section id="testimonials" className="section-y relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="What founders say afterwards."
          description="A launch is easy to celebrate. These are the words we got back three, six and twelve months later."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {/* Featured quote spans two columns */}
          <Reveal className="lg:col-span-2">
            <figure className="card-surface relative flex h-full flex-col justify-between overflow-hidden p-8 md:p-11">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-10 size-72 rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle, color-mix(in oklab, var(--p-brand) 18%, transparent), transparent 65%)',
                }}
              />

              <Quote className="relative size-9 text-brand/40" />

              <blockquote className="relative mt-7 text-xl leading-snug font-medium tracking-[-0.02em] text-balance md:text-[1.75rem] md:leading-[1.3]">
                “{featured.quote}”
              </blockquote>

              <Attribution testimonial={featured} className="relative mt-9" />
            </figure>
          </Reveal>

          {/* Supporting quotes */}
          <div className="grid gap-4">
            {rest.slice(0, 2).map((item, index) => (
              <Reveal key={item.name} delay={(index + 1) * 90}>
                <QuoteCard testimonial={item} />
              </Reveal>
            ))}
          </div>

          {rest.slice(2).map((item, index) => (
            <Reveal key={item.name} delay={index * 90}>
              <QuoteCard testimonial={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="card-surface flex h-full flex-col justify-between p-7 transition-colors duration-500 hover:bg-elevated md:p-8">
      <div className="flex gap-0.5 text-brand">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="size-3.5" />
        ))}
      </div>

      <blockquote className="mt-5 leading-relaxed text-subtle">
        “{testimonial.quote}”
      </blockquote>

      <Attribution testimonial={testimonial} className="mt-7" />
    </figure>
  )
}

function Attribution({
  testimonial,
  className,
}: {
  testimonial: Testimonial
  className?: string
}) {
  const initials = testimonial.name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  return (
    <figcaption className={className}>
      <div className="flex items-center gap-3.5">
        {/* Monogram stands in for a headshot — consistent and never a broken
            image. Swap for an <img> when real photos exist. */}
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-fill-2 text-[0.8125rem] font-semibold tracking-tight">
          {initials}
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{testimonial.name}</p>
          <p className="truncate text-[0.8125rem] text-muted">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </figcaption>
  )
}
