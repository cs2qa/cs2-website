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
    { href: '/about/', label: 'About' },
    { href: '/services/', label: 'Services' },
    { href: '/products/', label: 'Products' },
    { href: '/expertise/', label: 'Expertise' },
    { href: '/contact/', label: 'Contact' },
  ]

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 inset-x-0 z-50">
          <div className="h-10 flex items-center justify-center px-4 bg-gradient-to-r from-primary to-blue-600 text-white text-sm">
            <span className="mr-3">Free consultation available — limited slots this month.</span>
            <Link href="/demo/" className="underline underline-offset-2 font-medium hover:text-white/90">Book now</Link>
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
      <nav className={`fixed ${showBanner ? 'top-10' : 'top-0'} w-full relative z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/85 shadow-xl border-b border-gray-100' : 'bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 border-b border-gray-100/50'}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/logoCS2.svg"
                  alt="CS2 Technologies"
                  width={500}
                  height={500}
                  className="h-14 w-auto drop-shadow-sm relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                    active 
                      ? 'text-white bg-gradient-to-r from-primary to-primary/90 shadow-lg transform scale-105' 
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {!active && (
                    <>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300 transform group-hover:scale-110"></span>
                    </>
                  )}
                  <span className="relative z-10 flex items-center">
                    {item.label}
                    {active && (
                      <span className="ml-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    )}
                  </span>
                </Link>
              )
            })}
            <Link href="/get-started/" className="ml-2">
              <Button 
                size="lg" 
                className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary/90 text-white px-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-primary/20 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
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
        <div className="md:hidden absolute inset-x-0 top-full bg-white/95 backdrop-blur-xl border-b shadow-xl">
          <div className="px-3 pt-3 pb-4 space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    active 
                      ? 'text-white bg-gradient-to-r from-primary to-primary/90 shadow-md transform scale-105' 
                      : 'text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-blue-500/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="flex items-center">
                    {item.label}
                    {active && (
                      <span className="ml-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    )}
                  </span>
                </Link>
              )
            })}
            <Link href="/get-started/">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary/90 text-white px-8 mt-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-primary/20">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
      {/* Animated gradient accent line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 transform translate-x-full animate-slide-infinite"></div>
      </div>
    </nav>
    </>
  )
}
