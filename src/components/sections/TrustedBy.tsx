import { Marquee } from '@/components/ui/Marquee'
import { Reveal } from '@/components/ui/Reveal'
import { clients } from '@/config/site'

/**
 * Social proof strip.
 *
 * Client names are set as tracked-out wordmarks rather than dropped in as
 * image logos — a consistent typographic treatment reads more deliberate than
 * eight mismatched PNGs. Swap the <span> for an <img> when real assets land.
 */
export function TrustedBy() {
  return (
    <section
      aria-label="Clients"
      className="relative border-y border-line bg-surface/50 py-14"
    >
      <div className="container-page">
        <Reveal variant="fade">
          <p className="mb-10 text-center font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase">
            Trusted by brands that care about craft
          </p>
        </Reveal>
      </div>

      <Reveal variant="fade" delay={120}>
        <Marquee duration={46}>
          {clients.map((client) => (
            <span
              key={client}
              className="px-8 text-lg font-medium tracking-[0.14em] whitespace-nowrap text-white/35 transition-colors duration-500 hover:text-white/80 sm:px-12 sm:text-xl"
            >
              {client}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
