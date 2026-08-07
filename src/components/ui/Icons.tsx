import type { SVGProps } from 'react'
import type { IconName, TechName } from '@/config/site'


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

const Support = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <circle cx="12" cy="12" r="8.75" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="m5.85 5.85 3.67 3.67M14.48 14.48l3.67 3.67M18.15 5.85l-3.67 3.67M9.52 14.48l-3.67 3.67" />
  </svg>
)

const Brand = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 3.25a8.75 8.75 0 1 0 0 17.5c.97 0 1.75-.78 1.75-1.75 0-.45-.17-.86-.45-1.17a1.74 1.74 0 0 1 1.3-2.9h2.06A4.34 4.34 0 0 0 21 10.6c0-4.06-4.03-7.35-9-7.35Z" />
    <circle cx="7.4" cy="12.2" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="9.4" cy="8.1" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="14.2" cy="7.5" r="1.05" fill="currentColor" stroke="none" />
  </svg>
)

const Social = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M20.75 11.4c0 4.2-3.92 7.6-8.75 7.6-1.07 0-2.1-.17-3.04-.48L4 20.5l1.62-4.05A7.1 7.1 0 0 1 3.25 11.4C3.25 7.2 7.17 3.8 12 3.8s8.75 3.4 8.75 7.6Z" />
    <path d="M12 14.4s-2.85-1.7-2.85-3.6a1.7 1.7 0 0 1 2.85-1.22 1.7 1.7 0 0 1 2.85 1.22c0 1.9-2.85 3.6-2.85 3.6Z" />
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
  support: Support,
  brand: Brand,
  social: Social,
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

/* ------------------------------------------------------------- tech marks */

/**
 * Simplified monochrome glyphs for the toolbelt strip.
 *
 * These are recognisable stand-ins, not pixel-accurate reproductions of other
 * companies' trademarks — which is why TrustedBy always renders the name next
 * to the mark. For official artwork, download each brand's SVG into
 * `public/brand/tech/` and swap the component for an <img>.
 */

const ShopifyMark = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M7 8V6.5a5 5 0 0 1 10 0V8" />
    <path d="M4.4 8h15.2l1.1 11.6a1.6 1.6 0 0 1-1.6 1.75H4.9a1.6 1.6 0 0 1-1.6-1.75L4.4 8Z" />
    <path d="M13.9 11.6a2.4 2.4 0 0 0-3.9 1.8c0 2.2 3.5 1.6 3.5 3.6a2.3 2.3 0 0 1-3.8 1.5" />
  </svg>
)

const ReactMark = (props: IconProps) => (
  <svg {...defaults} {...props} strokeWidth={1.1}>
    <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="9.6" ry="3.9" />
    <ellipse cx="12" cy="12" rx="9.6" ry="3.9" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.6" ry="3.9" transform="rotate(120 12 12)" />
  </svg>
)

const NextMark = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <circle cx="12" cy="12" r="9.3" />
    <path d="M8.9 16.1V7.9l7 10.2" />
    <path d="M15.15 7.9v4.7" />
  </svg>
)

const TypeScriptMark = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <rect x="2.7" y="2.7" width="18.6" height="18.6" rx="2.6" />
    <path d="M6.1 11.2h5M8.6 11.2v6.6" />
    <path d="M18.5 11.9a2.2 2.2 0 0 0-3.6 1.7c0 2.3 3.6 1.55 3.6 3.6a2.15 2.15 0 0 1-3.6 1.4" />
  </svg>
)

const TailwindMark = (props: IconProps) => (
  <svg {...defaults} {...props} fill="currentColor" stroke="none">
    <path d="M12 6.2c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98.99 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.36 14.49 6.2 12 6.2ZM7 12.2c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98.99 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35-.98-.99-2.11-2.15-4.6-2.15Z" />
  </svg>
)

const FigmaMark = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M9.9 2.6h2.6v4.6H9.9a2.3 2.3 0 1 1 0-4.6Z" />
    <path d="M12.5 2.6h1.6a2.3 2.3 0 1 1 0 4.6h-1.6V2.6Z" />
    <path d="M9.9 7.2h2.6v4.6H9.9a2.3 2.3 0 1 1 0-4.6Z" />
    <circle cx="14.1" cy="9.5" r="2.3" />
    <path d="M12.5 11.8v2.3a2.3 2.3 0 1 1-2.6-2.3h2.6Z" />
  </svg>
)

const NodeMark = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 2.6 20.4 7.3v9.4L12 21.4 3.6 16.7V7.3L12 2.6Z" />
    <path d="M14.9 14.4c0 1.05-1.2 1.7-2.85 1.7s-2.9-.65-2.9-1.85M14.9 9.6v4.6" />
  </svg>
)

const VercelMark = (props: IconProps) => (
  <svg {...defaults} {...props} fill="currentColor" stroke="none">
    <path d="M12 3.6 22 20.4H2L12 3.6Z" />
  </svg>
)

const techMarks: Record<TechName, (props: IconProps) => React.ReactElement> = {
  shopify: ShopifyMark,
  react: ReactMark,
  next: NextMark,
  typescript: TypeScriptMark,
  tailwind: TailwindMark,
  figma: FigmaMark,
  node: NodeMark,
  vercel: VercelMark,
}

export function TechLogo({ name, ...props }: IconProps & { name: TechName }) {
  const Component = techMarks[name]
  return <Component {...props} />
}

export const Quote = (props: IconProps) => (
  <svg {...defaults} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M9.4 5.5C6.2 7 4.5 9.7 4.5 13.4c0 3.2 1.7 5.1 4.2 5.1 2.1 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.9.1.4-1.7 1.7-3.2 3.5-4.2Zm9.5 0c-3.2 1.5-4.9 4.2-4.9 7.9 0 3.2 1.7 5.1 4.2 5.1 2.1 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.9.1.4-1.7 1.7-3.2 3.5-4.2Z" />
  </svg>
)
