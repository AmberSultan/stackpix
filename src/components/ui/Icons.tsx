import type { SVGProps } from 'react'
import type { IconName } from '@/config/site'

/**
 * Hand-drawn icon set on a 24px grid with a 1.5 stroke — consistent weight is
 * what makes an icon row look designed rather than assembled. No icon library
 * dependency, no unused glyphs in the bundle.
 */

type IconProps = SVGProps<SVGSVGElement>

const defaults: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

/* ------------------------------------------------------------ service icons */

const Store = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M3.5 9.5 5 4.5h14l1.5 5" />
    <path d="M4.5 9.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9" />
    <path d="M3.5 9.5a2.5 2.5 0 0 0 4.25 1.77 2.5 2.5 0 0 0 4.25-.02 2.5 2.5 0 0 0 4.25.02A2.5 2.5 0 0 0 20.5 9.5" />
    <path d="M9.75 19.5v-5h4.5v5" />
  </svg>
)

const Theme = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 9h18" />
    <path d="M9 9v11" />
    <circle cx="5.75" cy="6.5" r=".6" fill="currentColor" stroke="none" />
    <path d="M12.5 12.5h5.5M12.5 16h3.5" />
  </svg>
)

const AppIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <rect x="4.5" y="2.5" width="15" height="19" rx="3" />
    <path d="M10 5.75h4" />
    <path d="M8.5 12.25 10.75 14.5 8.5 16.75" />
    <path d="M13 16.75h3" />
  </svg>
)

const Design = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 2.75 4 7.25v9.5L12 21.25l8-4.5v-9.5Z" />
    <path d="M4 7.25 12 11.75l8-4.5" />
    <path d="M12 11.75v9.5" />
    <circle cx="12" cy="11.75" r="2.25" />
  </svg>
)

const Code = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="m8 8-4.5 4L8 16" />
    <path d="m16 8 4.5 4L16 16" />
    <path d="m13.5 5.5-3 13" />
  </svg>
)

const Speed = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M3.5 17.5a9 9 0 1 1 17 0" />
    <path d="m12 13.5 4-4" />
    <circle cx="12" cy="14.5" r="1.5" />
    <path d="M12 4.5v1.5M4.9 7.4l1.1 1.1M19.1 7.4 18 8.5" />
  </svg>
)

const Shield = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 2.75 4.75 5.5v6c0 4.4 2.95 8.35 7.25 9.75 4.3-1.4 7.25-5.35 7.25-9.75v-6Z" />
    <path d="m9 12 2.25 2.25L15.5 10" />
  </svg>
)

const serviceIcons: Record<IconName, (props: IconProps) => React.ReactElement> = {
  store: Store,
  theme: Theme,
  app: AppIcon,
  design: Design,
  code: Code,
  speed: Speed,
  shield: Shield,
}

/** Resolves a service's `icon` key from the site config to a component. */
export function ServiceIcon({
  name,
  ...props
}: IconProps & { name: IconName }) {
  const Component = serviceIcons[name]
  return <Component {...props} />
}

/* -------------------------------------------------------------- ui glyphs */

export const ArrowUpRight = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </svg>
)

export const ArrowRight = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </svg>
)

export const Plus = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Close = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M6 6 18 18M18 6 6 18" />
  </svg>
)

export const Menu = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M3.5 8h17M3.5 16h17" />
  </svg>
)

export const Check = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

export const Star = (props: IconProps) => (
  <svg {...defaults} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="m12 2.5 2.9 6.05 6.6.9-4.8 4.6 1.2 6.55L12 17.5 6.1 20.6l1.2-6.55-4.8-4.6 6.6-.9Z" />
  </svg>
)

export const Sun = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <circle cx="12" cy="12" r="4.25" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
  </svg>
)

export const Moon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M20 13.4A8.2 8.2 0 0 1 10.6 4a8.5 8.5 0 1 0 9.4 9.4Z" />
  </svg>
)

export const Quote = (props: IconProps) => (
  <svg {...defaults} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M9.4 5.5C6.2 7 4.5 9.7 4.5 13.4c0 3.2 1.7 5.1 4.2 5.1 2.1 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.9.1.4-1.7 1.7-3.2 3.5-4.2Zm9.5 0c-3.2 1.5-4.9 4.2-4.9 7.9 0 3.2 1.7 5.1 4.2 5.1 2.1 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.9.1.4-1.7 1.7-3.2 3.5-4.2Z" />
  </svg>
)
