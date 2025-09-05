import type { Metadata } from 'next'
import { Inter, Poppins, DM_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap'
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'CS2 Technologies - AI Solutions for Healthcare & Business',
  description: 'CS2 Technologies specializes in cutting-edge AI solutions, healthcare technology, and enterprise software development. Transform your business with our innovative AI chatbots, RAG systems, and cloud-based solutions.',
  keywords: 'AI, Healthcare AI, RAG, Knowledge Graph, LLM, Machine Learning, Cloud Solutions, CS2 Health, B2B Ecommerce',
  authors: [{ name: 'CS2 Technologies' }],
  openGraph: {
    title: 'CS2 Technologies - AI Solutions for Healthcare & Business',
    description: 'Transform your business with cutting-edge AI solutions',
    url: 'https://www.cs2technologies.ca',
    siteName: 'CS2 Technologies',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CS2 Technologies - AI Solutions',
    description: 'Transform your business with cutting-edge AI solutions',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${dmSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}