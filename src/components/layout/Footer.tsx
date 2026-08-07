import { Logo } from './Logo'
import { ArrowUpRight } from '@/components/ui/Icons'
import { HairlineDivider } from '@/components/ui/Backdrop'
import { services, site, navLinks } from '@/config/site'
import { scrollToSection } from '@/lib/smoothScroll'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      {/* Oversized wordmark bleeding off the bottom edge — a quiet sign-off
          that fills the footer without adding another content block. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[3vw] flex justify-center overflow-hidden select-none"
      >
        <span className="bg-linear-to-b from-wordmark to-transparent bg-clip-text text-[19vw] leading-[0.75] font-bold tracking-[-0.05em] text-transparent">
          {site.name}
        </span>
      </div>

      <div className="container-page relative pt-20 pb-12 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs space-y-5">
            <Logo />
            <p className="text-sm leading-relaxed text-muted">{site.tagline}</p>
            <p className="text-sm text-muted">{site.location}</p>
          </div>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink key={service.id} href="#services">
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {navLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
            <FooterLink href="#contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Follow">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1 text-sm text-muted transition-colors duration-300 hover:text-brand"
                >
                  {social.label}
                  <ArrowUpRight className="size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 mb-8">
          <HairlineDivider />
        </div>

        <div className="flex flex-col-reverse items-start gap-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="transition-colors duration-300 hover:text-accent"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('#top')}
              className="group flex cursor-pointer items-center gap-1.5 transition-colors duration-300 hover:text-accent"
            >
              Back to top
              <ArrowUpRight className="size-3.5 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ pieces */

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-5 font-mono text-[0.6875rem] tracking-[0.18em] text-accent uppercase">
        {title}
      </h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <a
        href={href}
        onClick={(event) => {
          event.preventDefault()
          scrollToSection(href)
        }}
        className="text-sm text-muted transition-colors duration-300 hover:text-accent"
      >
        {children}
      </a>
    </li>
  )
}
