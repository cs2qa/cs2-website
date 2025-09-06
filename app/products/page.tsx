import Navigation from '@/components/navigation'
import Products from '@/components/products'
import Footer from '@/components/footer'

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-28">
        <Products />
      </div>
      <Footer />
    </main>
  )
}