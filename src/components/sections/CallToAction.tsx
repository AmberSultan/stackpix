import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { ArrowUpRight, ArrowRight } from '@/components/ui/Icons'
import { AuroraBackdrop, GridBackdrop } from '@/components/ui/Backdrop'
import { ContactForm } from './ContactForm'
import { contactFormEnabled, enquiry, site } from '@/config/site'
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

              <h2 className="text-h1 text-gradient mt-7 max-w-[16ch] font-semibold">
                Ready to build something amazing?
              </h2>

              <p className="text-lead mt-6 max-w-xl leading-relaxed text-balance text-subtle">
                Let's discuss your project today.
              </p>

              {contactFormEnabled ? (
                /* A form beats mailto: links outright — it works on every
                   device, never hands the visitor an OS app-picker, and it
                   arrives with the context needed to answer properly. */
                <div className="mt-11 w-full max-w-2xl">
                  <ContactForm />
                </div>
              ) : (
                /* Only reached if the form key is cleared. Kept working, and
                   kept consistent with the rest of the site: an audit first,
                   email second, no call. */
                <>
                  <div className="mt-11 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                    <Button
                      href={enquiry.audit}
                      size="lg"
                      magnetic
                      className="w-full sm:w-auto"
                      icon={<ArrowUpRight className="size-4" />}
                    >
                      Get a free store audit
                    </Button>
                    <Button
                      href={enquiry.quote}
                      size="lg"
                      variant="secondary"
                      magnetic
                      className="w-full sm:w-auto"
                      icon={<ArrowRight className="size-4" />}
                    >
                      Email us
                    </Button>
                  </div>

                  {/* Both buttons are mailto: links here. On a desktop with no
                      mail client one opens an OS app-picker or nothing at all,
                      so the address is always shown as copyable text too. */}
                  <p className="mt-6 text-sm text-muted">
                    Or email us directly at{' '}
                    <a
                      href={enquiry.quote}
                      className="text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                    >
                      {site.email}
                    </a>
                  </p>
                </>
              )}

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
