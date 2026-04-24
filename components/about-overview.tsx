'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Building2,
  Zap,
  Briefcase,
  Package,
  KeyRound,
} from 'lucide-react'

const AboutOverview = () => {
  const achievements = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: '4-week delivery guarantee',
      description:
        'Foundation-tier builds ship in four weeks — quoted up front, enforced on delivery.',
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: '5 live custom builds, 5 different industries',
      description:
        'Furniture retail, B2B wholesale, wholesale import, medical SaaS, and VR experiences — all shipping today.',
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Hosting, Google Ads, and CRM bundled',
      description:
        'One monthly fee covers the infrastructure and the marketing plumbing. Ad spend goes direct to Google — no markup.',
    },
    {
      icon: <KeyRound className="w-6 h-6" />,
      title: 'You own your domain, code, and data',
      description:
        'No lock-in. 30-day clean-export guarantee if you ever want to leave.',
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full text-primary font-medium mb-4 shadow-sm"
            >
              <Building2 className="w-4 h-4 mr-2" />
              About CS2 Technologies
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-display-sm font-display text-gray-900 mb-6"
            >
              Toronto-based. Built for Canadian SMBs.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-body-lg text-gray-600 font-body mb-4"
            >
              CS2 Technologies is a small senior team that builds custom
              websites for Canadian small and mid-sized businesses.
              AI-accelerated development lets us ship custom code in 3–4 weeks
              at a price that used to require templated platforms like Shopify
              or Wix. You own the code, the domain, and the data. No platform
              tax.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-body-md text-gray-600 font-body mb-6"
            >
              Canadian-owned and incorporated in 2023, operating out of Toronto.
              Led by CEO Sobia Ashfaq, with Qasim Ali as your direct contact for
              every SMB engagement. Every client gets a dedicated senior team —
              no junior hand-offs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/case-studies/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                  See our case studies
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about/">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  More about CS2
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="grid grid-cols-1 gap-4">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-400/60 flex items-start"
              >
                <div className="p-3 bg-primary/10 rounded-lg text-primary mr-4 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-heading-sm font-display text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-body-md text-gray-600 font-body">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutOverview
