import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { label: 'Foundation — Lead Gen', href: '/services/smb-acquisition/#tier-foundation' },
      { label: 'Growth — Bookings & Payments', href: '/services/smb-acquisition/#tier-growth' },
      { label: 'Scale — E-Commerce', href: '/services/smb-acquisition/#tier-scale' },
      { label: 'All services & pricing', href: '/services/smb-acquisition/' },
    ],
    company: [
      { label: 'About Us', href: '/about/' },
      { label: 'Case Studies', href: '/case-studies/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Get a free audit', href: '/services/smb-acquisition/#audit-form' },
    ],
    resources: [
      {
        label: 'Book a 30-min call',
        href: 'https://calendly.com/qasim-ali-cs2technologies',
        external: true,
      },
      { label: 'Case Studies', href: '/case-studies/' },
      { label: 'Enterprise (legacy)', href: '/enterprise/services/' },
    ],
  }

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/company/cs2technologies',
      label: 'LinkedIn',
      external: true,
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logoCS2.png"
                alt="CS2 Technologies"
                width={150}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Custom websites for Canadian small businesses, launched in 4 weeks.
              Hosting, Google Ads, and CRM included. You own the code.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              2424 Finch Ave W, Unit 14<br />
              Toronto ON M9M 2E2, Canada
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} CS2 Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/about/" className="text-gray-400 hover:text-white text-sm">
                About
              </Link>
              <Link href="/contact/" className="text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4" />
            <p className="text-sm">
              Ready to talk? Email us at{' '}
              <a href="mailto:info@cs2technologies.ca" className="underline">
                info@cs2technologies.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
