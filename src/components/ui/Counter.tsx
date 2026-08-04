import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/cn'

type Props = {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

/**
 * Animated statistic. `tabular-nums` is essential here — without it the digits
 * change width mid-count and the whole row jitters.
 */
export function Counter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
}: Props) {
  const { ref, display } = useCountUp(value, { decimals })

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {/* Screen readers get the final figure once, rather than a stream of
          intermediate values as the count animates. */}
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  )
}
