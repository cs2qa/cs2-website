import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import ServicesSection from '@/components/services-section'
import AboutOverview from '@/components/about-overview'
import CaseStudyPreviews from '@/components/case-study-previews'
import LocationsSection from '@/components/locations-section'
import CTASection from '@/components/cta-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ServicesSection />
      <AboutOverview />
      <CaseStudyPreviews />
      <LocationsSection />
      <CTASection />
      <Footer />
    </main>
  )
}