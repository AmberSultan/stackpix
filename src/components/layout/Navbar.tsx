import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/Button'
import { Menu, Close, ArrowUpRight } from '@/components/ui/Icons'
import { hero, navLinks, site } from '@/config/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToSection, setScrollLocked } from '@/lib/smoothScroll'
import { cn } from '@/lib/cn'

const SECTION_IDS = navLinks.map((link) => link.href.slice(1))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  // Condense the header once the hero starts leaving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Only ever acts while the menu is open. Calling setScrollLocked(false)
  // unconditionally on mount would release the preloader's lock, since this
  // effect runs while the curtain is still up.
  useEffect(() => {
    if (!menuOpen) return
    setScrollLocked(true)
    return () => setScrollLocked(false)
  }, [menuOpen])

  // A resize past the mobile breakpoint should not leave the overlay stuck open.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    // Let the overlay begin closing before the scroll starts, or the two
    // animations fight each other.
    window.setTimeout(() => scrollToSection(href), menuOpen ? 220 : 0)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-90 transition-[padding] duration-500 ease-[var(--ease-out-quint)]',
          scrolled ? 'py-3' : 'py-5',
        )}
      >
        <div className="container-page">
          <div
            className={cn(
              'flex items-center justify-between rounded-full transition-all duration-500 ease-[var(--ease-out-quint)]',
              scrolled
                ? 'glass px-4 py-2.5 shadow-[var(--p-nav-shadow)] md:px-5'
                : 'border border-transparent px-1 py-2.5',
            )}
          >
            <Logo />

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-accent' : 'text-muted hover:text-accent',
                    )}
                  >
                    {isActive ? (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-brand/25 bg-brand/12"
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </a>
                )
              })}
            </nav>

            {/* Below lg the header is just the wordmark and the menu button.
                The CTA and the theme toggle both live inside the overlay —
                four controls in a mobile header leaves none of them enough
                room, and the CTA is the first thing to get squeezed.

                `max-lg:hidden` rather than `hidden lg:flex`: both components
                set their own display in their base classes, and a media-query
                variant reliably beats a plain utility regardless of the order
                Tailwind emits them in. */}
            <div className="flex items-center gap-2">
              <ThemeToggle className="max-lg:hidden" />

              <Button href="#contact" size="sm" className="max-lg:hidden">
                Start a project
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label="Open menu"
                className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line text-accent transition-colors duration-300 hover:bg-fill-2 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / tablet overlay */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-95 lg:hidden',
          'transition-[opacity,visibility] duration-500 ease-[var(--ease-out-quint)]',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className="absolute inset-0 bg-ink/95 backdrop-blur-2xl" />

        <div className="relative flex h-full flex-col">
          <div className="container-page flex items-center justify-between py-8">
            <Logo />

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line text-accent transition-colors duration-300 hover:bg-fill-2"
              >
                <Close className="size-5" />
              </button>
            </div>
          </div>

          <nav
            aria-label="Mobile"
            className="container-page flex flex-1 flex-col justify-center gap-1"
          >
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  handleNavClick(link.href)
                }}
                style={{ transitionDelay: menuOpen ? `${120 + index * 55}ms` : '0ms' }}
                className={cn(
                  'border-b border-line py-5 text-[2rem] font-medium tracking-[-0.03em]',
                  'transition-[opacity,transform] duration-700 ease-[var(--ease-out-quint)]',
                  menuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* The header's CTA moves here on mobile, where it gets full width
              and a reason to tap rather than four words squeezed into a pill. */}
          <div className="container-page space-y-4 pb-12">
            <Button
              href={hero.primaryCta.href}
              size="lg"
              className="w-full"
              icon={<ArrowUpRight className="size-4" />}
              onClick={() => setMenuOpen(false)}
            >
              {hero.primaryCta.label}
            </Button>

            <a
              href={`mailto:${site.email}`}
              className="block text-center text-sm text-muted transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
