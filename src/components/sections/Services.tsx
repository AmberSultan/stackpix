import type { MouseEvent } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ServiceIcon, ArrowUpRight, Check } from '@/components/ui/Icons'
import { services, type Service } from '@/config/site'
import { cn } from '@/lib/cn'

export function Services() {
  return (
    <section id="services" className="section-y relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Everything your store needs,
              <br className="hidden sm:block" /> without the agency overhead.
            </>
          }
          description="Take the whole build, or the one piece that is holding you back. Shopify is where we spend most of our time — React and design work sit alongside it when a project needs them."
          action={
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              icon={<ArrowUpRight className="size-4" />}
            >
              Tell us what you need
            </Button>
          }
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={(index % 3) * 90}
              className={cn(service.featured && 'lg:col-span-2')}
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  /** Moves a soft highlight with the cursor. Written to CSS variables so the
   *  gradient itself is declared in the class list and never re-rendered. */
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <article
      onMouseMove={handleMouseMove}
      className={cn(
        'card-surface group relative flex h-full flex-col overflow-hidden p-7 md:p-8',
        'transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-out-quint)]',
        'hover:-translate-y-1 hover:border-line-strong hover:bg-elevated',
      )}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--p-brand) 14%, transparent), transparent 70%)',
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-fill-2 text-accent transition-colors duration-500 group-hover:border-brand/45 group-hover:bg-brand/10 group-hover:text-brand">
          <ServiceIcon name={service.icon} className="size-5.5" />
        </span>

        <ArrowUpRight className="size-5 text-muted opacity-0 transition-all duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100" />
      </div>

      <h3 className="text-h3 relative mt-7 font-semibold">{service.title}</h3>

      <p className="relative mt-3.5 leading-relaxed text-muted">
        {service.description}
      </p>

      <ul
        className={cn(
          'relative mt-7 grid gap-2.5 border-t border-line pt-6',
          // Featured cards are twice as wide, so their bullets read better in
          // two columns than as one very long list.
          service.featured && 'sm:grid-cols-2',
        )}
      >
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-subtle">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Pushes the CTA to the bottom so cards of unequal height still align */}
      <div className="relative mt-auto pt-7">
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          <span className="relative">
            Learn more
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-brand transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:origin-left group-hover:scale-x-100" />
          </span>
          <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  )
}
