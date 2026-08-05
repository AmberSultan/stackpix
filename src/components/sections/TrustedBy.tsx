import { Marquee } from '@/components/ui/Marquee'
import { Reveal } from '@/components/ui/Reveal'
import { toolbelt } from '@/config/site'

/**
 * Capability strip.
 *
 * This slot usually holds client logos, but a studio without a client roster
 * cannot fill it without inventing one — and an invented logo wall is the
 * easiest claim on a site to disprove. Showing the stack instead is honest,
 * and it reassures a non-technical buyer that the store is built on things
 * they have heard of.
 *
 * Swap this for real client names once there are four or more.
 */
export function TrustedBy() {
  return (
    <section
      aria-label="Technology we build with"
      className="relative border-y border-line bg-surface/50 py-14"
    >
      <div className="container-page">
        <Reveal variant="fade">
          <p className="mb-10 text-center font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase">
            Built on tools your store can grow with
          </p>
        </Reveal>
      </div>

      <Reveal variant="fade" delay={120}>
        <Marquee duration={46}>
          {toolbelt.map((tool) => (
            <span
              key={tool}
              className="px-8 text-lg font-medium tracking-[0.14em] whitespace-nowrap text-muted opacity-70 transition-all duration-500 hover:text-brand hover:opacity-100 sm:px-12 sm:text-xl"
            >
              {tool}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
