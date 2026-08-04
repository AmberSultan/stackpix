import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Counter } from '@/components/ui/Counter'
import { Check } from '@/components/ui/Icons'
import { stats, differentiators } from '@/config/site'

export function WhyUs() {
  return (
    <section id="why-us" className="section-y relative border-y border-line bg-surface/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why choose us"
          align="center"
          title="The numbers behind the work."
          description="We track outcomes because our clients do. These figures come from post-launch analytics and a survey we send every client at project close."
        />

        {/* Stats */}
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal as="li" key={stat.label} delay={index * 90}>
              <div className="card-surface group relative h-full overflow-hidden p-7 text-center md:p-8">
                {/* Light rakes across the tile on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.10), transparent 60%)',
                  }}
                />

                <p className="text-gradient relative text-[clamp(2.75rem,5vw,3.75rem)] leading-none font-semibold tracking-[-0.04em]">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </p>

                <p className="relative mt-4 text-sm font-medium text-accent">
                  {stat.label}
                </p>

                <p className="relative mt-1 text-[0.8125rem] text-muted">
                  {stat.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Differentiators */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {differentiators.map((item, index) => (
            <Reveal key={item.title} delay={(index % 2) * 90}>
              <div className="card-surface flex h-full gap-5 p-7 md:p-8">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                  <Check className="size-4" strokeWidth={2} />
                </span>

                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
