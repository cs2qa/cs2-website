'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('cs2_banner_dismissed') === '1'
      if (dismissed) setShowBanner(false)
    } catch {}
  }, [])

  const dismissBanner = () => {
    setShowBanner(false)
    try { localStorage.setItem('cs2_banner_dismissed', '1') } catch {}
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/products', label: 'Products' },
    { href: '/expertise', label: 'Expertise' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 inset-x-0 z-50">
          <div className="h-10 flex items-center justify-center px-4 bg-gradient-to-r from-primary to-blue-600 text-white text-sm">
            <span className="mr-3">Free consultation available — limited slots this month.</span>
            <Link href="/demo" className="underline underline-offset-2 font-medium hover:text-white/90">Book now</Link>
            <button
              aria-label="Dismiss announcement"
              onClick={dismissBanner}
              className="ml-4 rounded-full px-2 py-1 text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <nav className={`fixed ${showBanner ? 'top-10' : 'top-0'} w-full relative z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-md' : 'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b'}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logoCS2.svg"
                alt="CS2 Technologies"
                width={500}
                height={500}
                className="h-14 w-auto drop-shadow-sm"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-200 ${active ? 'text-primary bg-primary/10' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/get-started">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-8 shadow-md hover:shadow-lg">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute inset-x-0 top-full bg-white/95 backdrop-blur border-b shadow-sm">
          <div className="px-3 pt-3 pb-4 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg font-medium transition-colors ${active ? 'text-primary bg-primary/10' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/get-started">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-8 mt-3 shadow-md hover:shadow-lg">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
      {/* Gradient accent line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </nav>
    </>
  )
}
