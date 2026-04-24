'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  CheckCircle,
  Rocket,
  CreditCard,
  Store,
} from 'lucide-react'

const TIERS = [
  {
    icon: <Rocket className="w-7 h-7" />,
    name: 'Foundation',
    tagline:
      'For service businesses that need reliable lead flow.',
    includes: [
      'Custom website (no template)',
      'Lead capture forms + CRM',
      'Google Ads setup + management',
      'Hosting, SSL, daily backups',
    ],
    href: '/services/smb-acquisition/#tier-foundation',
  },
  {
    icon: <CreditCard className="w-7 h-7" />,
    name: 'Growth',
    tagline:
      'For businesses taking bookings, subscriptions, or payments online.',
    includes: [
      'Everything in Foundation',
      'Stripe payments + online booking',
      'Email automations & reminders',
      'Customer dashboards',
    ],
    href: '/services/smb-acquisition/#tier-growth',
    highlight: true,
  },
  {
    icon: <Store className="w-7 h-7" />,
    name: 'Scale',
    tagline:
      'For retailers, D2C brands, and wholesalers running full e-commerce.',
    includes: [
      'Everything in Growth',
      'Shopping cart + inventory',
      'HST multi-province tax handling',
      'Advanced attribution & reporting',
    ],
    href: '/services/smb-acquisition/#tier-scale',
  },
]

const ServicesSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-display-sm font-display text-gray-900 mb-4"
          >
            Three ways we help Canadian businesses grow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body"
          >
            CS2 builds custom websites for Canadian SMBs — delivered in 4 weeks,
            with hosting, Google Ads management, and CRM included. Pick the tier
            that matches what your business actually does.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-xl p-8 shadow-xl border-2 flex flex-col ${
                tier.highlight
                  ? 'border-primary'
                  : 'border-gray-400/60'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary rounded-lg text-white mr-3">
                  {tier.icon}
                </div>
                <div>
                  <h3 className="text-heading-sm font-display text-gray-900">
                    {tier.name}
                  </h3>
                </div>
              </div>
              <p className="text-body-md text-gray-700 mb-5 font-body">
                {tier.tagline}
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {tier.includes.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-body-sm text-gray-700 font-body"
                  >
                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors mt-auto"
              >
                See details
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services/smb-acquisition/">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              See pricing and full details
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
