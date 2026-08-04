import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { ArrowUpRight, ArrowRight } from '@/components/ui/Icons'
import { AuroraBackdrop, GridBackdrop } from '@/components/ui/Backdrop'
import { site } from '@/config/site'
import { useMouseParallax } from '@/hooks/useMouseParallax'

/**
 * Closing conversion block. Mirrors the hero's treatment on purpose — the
 * page opens and closes on the same note, and the visitor lands back on the
 * same two decisions.
 */
export function CallToAction() {
  const parallaxRef = useMouseParallax<HTMLDivElement>(0.09)

  return (
    <section id="contact" className="section-y relative">
      <div className="container-page">
        <Reveal variant="scale">
          <div
            ref={parallaxRef}
            className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-linear-to-b from-surface to-ink px-6 py-20 md:px-16 md:py-28"
          >
            <GridBackdrop className="[transform:translate3d(calc(var(--mx,0)*-10px),calc(var(--my,0)*-8px),0)]" />
            <AuroraBackdrop className="[transform:translate3d(calc(var(--mx,0)*16px),calc(var(--my,0)*12px),0)]" />

            <div className="relative flex flex-col items-center text-center">
              <Eyebrow>Let's talk</Eyebrow>

              <h2 className="text-h1 text-gradient mt-7 max-w-[15ch] font-semibold">
                Let's build something amazing.
              </h2>

              <p className="text-lead mt-6 max-w-xl leading-relaxed text-balance text-subtle">
                Tell us about your brand and where your store is falling short.
                You will get an honest read on scope, budget and timeline within
                two working days.
              </p>

              <div className="mt-11 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                <Button
                  href={site.bookingUrl}
                  size="lg"
                  magnetic
                  className="w-full sm:w-auto"
                  icon={<ArrowUpRight className="size-4" />}
                >
                  Book Discovery Call
                </Button>
                <Button
                  href={`mailto:${site.email}`}
                  size="lg"
                  variant="secondary"
                  magnetic
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="size-4" />}
                >
                  Email us instead
                </Button>
              </div>

              {/* Reassurance line — removes the last objection to clicking */}
              <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.8125rem] text-muted">
                <li>Free 30-minute consultation</li>
                <li aria-hidden className="hidden size-1 rounded-full bg-muted sm:block" />
                <li>Fixed scope and price</li>
                <li aria-hidden className="hidden size-1 rounded-full bg-muted sm:block" />
                <li>No obligation</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
