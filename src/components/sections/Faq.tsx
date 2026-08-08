import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight } from '@/components/ui/Icons'
import { faqs, site } from '@/config/site'

export function Faq() {
  return (
    <section id="faq" className="section-y relative border-t border-line">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  The questions
                  <br className="hidden sm:block" /> everyone asks first.
                </>
              }
              description="Straight answers on cost, timelines and ownership, including why you should trust a studio this new. If yours is not here, just ask."
            />

            <Reveal delay={200} className="mt-9">
              <div className="card-surface flex flex-col gap-4 p-6">
                <p className="text-sm text-muted">Still deciding?</p>
                {/* Works whether or not they already sell online. "Costing you
                    sales" assumed an existing store, which quietly excluded
                    the visitor who has not built one yet. */}
                <p className="leading-relaxed">
                  Send us your site, or just tell us what you sell. We will reply
                  with three specific things we would do first. Free, no call
                  required, no pitch attached.
                </p>
                <Button
                  href={`mailto:${site.email}`}
                  variant="secondary"
                  className="mt-1 self-start"
                  icon={<ArrowUpRight className="size-4" />}
                >
                  {site.email}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
