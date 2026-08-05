import { cn } from '@/lib/cn'

/**
 * Layered background treatments. Every one of these is decorative and
 * pointer-events-none, so they can be dropped into any section without
 * affecting layout or interaction.
 */

/** Dot grid that fades out toward the edges of its container. */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'bg-grid pointer-events-none absolute inset-0',
        '[mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_10%,transparent_75%)]',
        className,
      )}
    />
  )
}

/**
 * Slow-drifting light source. Offset blooms read as a single soft light above
 * the fold rather than an obvious "gradient blob".
 *
 * The white bloom carries the brightness and a warm brand bloom sits behind it
 * — enough to tint the top of the page without turning the background orange.
 */
export function AuroraBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        className="animate-aurora absolute -top-[30%] left-1/2 h-[52rem] w-[64rem] -translate-x-1/2 rounded-full blur-[70px]"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--p-aurora-1), transparent 62%)',
        }}
      />
      <div
        className="animate-aurora absolute -top-[16%] left-[38%] h-[34rem] w-[44rem] -translate-x-1/2 rounded-full blur-[90px]"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--p-aurora-2), transparent 66%)',
          animationDelay: '-4s',
        }}
      />
      <div
        className="animate-aurora absolute top-[8%] right-[6%] h-[30rem] w-[30rem] rounded-full blur-[80px]"
        style={{
          background:
            'radial-gradient(circle, var(--p-aurora-3), transparent 65%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-14%] left-[4%] h-[26rem] w-[34rem] rounded-full blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, var(--p-aurora-2), transparent 68%)',
          animationDelay: '-13s',
        }}
      />
    </div>
  )
}

/** Film grain over the whole page — kills gradient banding on flat blacks. */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="bg-noise pointer-events-none fixed inset-0 z-50 opacity-[0.028] mix-blend-soft-light"
    />
  )
}

/** Hairline rule that fades in from both ends — used between sections. */
export function HairlineDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'h-px w-full bg-linear-to-r from-transparent via-line-strong to-transparent',
        className,
      )}
    />
  )
}
