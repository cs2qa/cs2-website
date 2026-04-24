import Navigation from '@/components/navigation'
import Expertise from '@/components/expertise'
import Footer from '@/components/footer'

export default function ExpertisePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div>
        <Expertise />
      </div>
      <Footer />
    </main>
  )
}