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
              <Eyebrow>Free audit</Eyebrow>

              <h2 className="text-h1 text-gradient mt-7 max-w-[16ch] font-semibold">
                Send us your Instagram. Get a plan back.
              </h2>

              <p className="text-lead mt-6 max-w-xl leading-relaxed text-balance text-subtle">
                No form to fill in and nothing to pay. Send your handle or your
                store link and we will reply within two working days with what is
                costing you sales, what we would build, and what it would cost.
              </p>

              <div className="mt-11 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                <Button
                  href={`mailto:${site.email}?subject=Free%20store%20audit`}
                  size="lg"
                  magnetic
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="size-4" />}
                >
                  Get my free audit
                </Button>
                <Button
                  href={site.bookingUrl}
                  size="lg"
                  variant="secondary"
                  magnetic
                  className="w-full sm:w-auto"
                  icon={<ArrowUpRight className="size-4" />}
                >
                  Book a 20-min call
                </Button>
              </div>

              {/* Reassurance line — removes the last objection to clicking */}
              <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.8125rem] text-muted">
                <li>Free audit, no strings</li>
                <li aria-hidden className="hidden size-1 rounded-full bg-muted sm:block" />
                <li>Fixed price before we start</li>
                <li aria-hidden className="hidden size-1 rounded-full bg-muted sm:block" />
                <li>You own everything</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
