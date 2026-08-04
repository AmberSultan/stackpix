import { useCallback, useEffect, useState } from 'react'

import { Preloader } from '@/components/layout/Preloader'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NoiseOverlay } from '@/components/ui/Backdrop'

import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { Services } from '@/components/sections/Services'
import { Work } from '@/components/sections/Work'
import { Process } from '@/components/sections/Process'
import { WhyUs } from '@/components/sections/WhyUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { CallToAction } from '@/components/sections/CallToAction'

import { initSmoothScroll } from '@/lib/smoothScroll'

export default function App() {
  const [ready, setReady] = useState(false)

  // Lenis owns the page scroll for the app's whole lifetime.
  useEffect(() => initSmoothScroll(), [])

  // Stable identity — Preloader's effect depends on it and must not re-run.
  const handleLoaded = useCallback(() => setReady(true), [])

  return (
    <>
      <Preloader onComplete={handleLoaded} />
      <NoiseOverlay />

      <Navbar />

      <main>
        <Hero ready={ready} />
        <TrustedBy />
        <Services />
        <Work />
        <Process />
        <WhyUs />
        <Testimonials />
        <Faq />
        <CallToAction />
      </main>

      <Footer />
    </>
  )
}
