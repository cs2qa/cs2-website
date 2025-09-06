import Navigation from '@/components/navigation'
import About from '@/components/about'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-28">
        <About />
      </div>
      <Footer />
    </main>
  )
}