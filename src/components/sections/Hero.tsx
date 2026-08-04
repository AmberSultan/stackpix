import { Button } from '@/components/ui/Button'
import { ArrowUpRight, ArrowRight } from '@/components/ui/Icons'
import { AuroraBackdrop, GridBackdrop } from '@/components/ui/Backdrop'
import { hero } from '@/config/site'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { cn } from '@/lib/cn'

type Props = {
  /** Gates the entrance animation until the preloader curtain lifts. */
  ready: boolean
}

export function Hero({ ready }: Props) {
  const parallaxRef = useMouseParallax<HTMLElement>()

  /** Shared entrance transition. The delay is an inline style rather than an
   *  arbitrary class because Tailwind only generates classes it can find as
   *  complete strings in the source. */
  const enterClass = cn(
    'transition-[opacity,transform,filter] duration-[1100ms] ease-[var(--ease-out-quint)]',
    ready
      ? 'translate-y-0 opacity-100 blur-0'
      : 'translate-y-8 opacity-0 blur-[10px]',
  )

  const stagger = (index: number) => ({
    transitionDelay: `${100 + index * 110}ms`,
  })

  return (
    <section
      ref={parallaxRef}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-20 md:pt-36"
    >
      {/* Background stack. Each layer takes a different multiple of --mx/--my
          so the field gains depth as the cursor moves. */}
      <GridBackdrop className="[transform:translate3d(calc(var(--mx,0)*-14px),calc(var(--my,0)*-10px),0)]" />
      <AuroraBackdrop className="[transform:translate3d(calc(var(--mx,0)*22px),calc(var(--my,0)*16px),0)]" />

      {/* Horizon line — grounds the composition and hides the grid's hard edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-ink via-ink/80 to-transparent"
      />

      <div className="container-page relative">
        <div className="flex flex-col items-center text-center">
          {/* Availability badge */}
          <div className={enterClass} style={stagger(0)}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-[0.8125rem] text-subtle">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              {hero.badge}
            </span>
          </div>

          {/* Headline — one animated line at a time */}
          <h1 className="text-display mt-8 max-w-[16ch] font-semibold">
            {hero.headline.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  className={cn('text-gradient block', enterClass)}
                  style={stagger(index + 1)}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className={cn(
              'text-lead mt-7 max-w-2xl leading-relaxed text-balance text-subtle',
              enterClass,
            )}
            style={stagger(3)}
          >
            {hero.subline}
          </p>

          <div
            className={cn(
              'mt-11 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row',
              enterClass,
            )}
            style={stagger(4)}
          >
            <Button
              href={hero.primaryCta.href}
              size="lg"
              magnetic
              className="w-full sm:w-auto"
              icon={<ArrowRight className="size-4" />}
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              size="lg"
              variant="secondary"
              magnetic
              className="w-full sm:w-auto"
              icon={<ArrowUpRight className="size-4" />}
            >
              {hero.secondaryCta.label}
            </Button>
          </div>

          {/* Proof strip */}
          <ul
            className={cn(
              'mt-20 grid w-full max-w-2xl grid-cols-3 divide-x divide-white/8',
              enterClass,
            )}
            style={stagger(5)}
          >
            {hero.metrics.map((metric) => (
              <li key={metric.label} className="px-2 sm:px-6">
                <p className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-muted">{metric.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating glass chips — desktop only, purely atmospheric */}
      <FloatingChip
        className="left-[6%] top-[30%] hidden xl:flex"
        depth={-30}
        delay="-2.5s"
        label="Lighthouse"
        value="98 / 100"
      />
      <FloatingChip
        className="right-[6%] top-[42%] hidden xl:flex"
        depth={26}
        delay="-5s"
        label="Avg. build time"
        value="6 weeks"
      />
    </section>
  )
}

function FloatingChip({
  className,
  depth,
  delay,
  label,
  value,
}: {
  className?: string
  depth: number
  delay: string
  label: string
  value: string
}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute', className)}
      style={{
        transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth * 0.7}px), 0)`,
      }}
    >
      <div
        className="animate-float glass flex flex-col gap-1 rounded-2xl px-5 py-4 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)]"
        style={{ animationDelay: delay }}
      >
        <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
          {label}
        </span>
        <span className="text-lg font-semibold tracking-[-0.02em]">{value}</span>
      </div>
    </div>
  )
}
