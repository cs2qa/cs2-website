import Navigation from '@/components/navigation'
import Services from '@/components/services'
import Footer from '@/components/footer'

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-6">
        <Services />
      </div>
      <Footer />
    </main>
  )
}