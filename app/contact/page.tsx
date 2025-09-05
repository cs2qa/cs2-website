import Navigation from '@/components/navigation'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}