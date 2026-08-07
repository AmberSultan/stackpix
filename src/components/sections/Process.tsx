import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight } from '@/components/ui/Icons'
import { processSteps } from '@/config/site'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * Seven-step timeline. The rail fills as the section scrolls, which turns a
 * long list into something with a sense of travel.
 */
export function Process() {
  const { ref, progress } = useScrollProgress<HTMLOListElement>()

  return (
    <section id="process" className="section-y relative">
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* Sticky column keeps the section's purpose on screen while the
              steps scroll past it. */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Process"
              title={
                <>
                  A transparent process,
                  <br className="hidden sm:block" /> from start to launch.
                </>
              }
              description="We believe great projects start with clear communication. From discovery to delivery, you'll always know what's happening, what's coming next, and what we need from you — no guesswork, no long periods of silence, and no hidden surprises."
            />

            <Reveal delay={200} className="mt-10">
              <Button
                href="#contact"
                size="lg"
                magnetic
                icon={<ArrowUpRight className="size-4" />}
              >
                Start with discovery
              </Button>
            </Reveal>
          </div>

          <ol ref={ref} className="relative">
            {/* Rail */}
            <div
              aria-hidden
              className="absolute top-2 bottom-2 left-[1.4375rem] w-px bg-line-strong"
            >
              <div
                className="w-full bg-linear-to-b from-brand to-brand-deep"
                style={{ height: `${progress * 100}%` }}
              />
            </div>

            {processSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={40}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Node */}
                <span className="relative z-10 flex size-11.5 shrink-0 items-center justify-center rounded-full border border-line bg-card font-mono text-[0.8125rem] text-subtle">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <span className="rounded-full border border-line bg-fill-1 px-2.5 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                      {step.duration}
                    </span>
                  </div>

                  <p className="mt-3 max-w-lg leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
