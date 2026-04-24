'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, Code2, ShieldCheck, ExternalLink } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-20 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center mb-6 space-x-3"
        >
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-body-sm font-medium text-gray-600 tracking-wide uppercase">
            For Canadian small businesses
          </span>
          <Sparkles className="w-6 h-6 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-display-lg md:text-display-lg font-display text-gray-900 mb-6 leading-none"
        >
          Custom websites for Canadian businesses,
          <span className="text-gradient block mt-2">
            launched in 4 weeks.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-body-lg md:text-body-lg text-gray-600 mb-8 max-w-3xl mx-auto font-body leading-relaxed"
        >
          Lead generation, online bookings, or full e-commerce — with hosting,
          Google Ads management, and CRM included. You own the code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
        >
          <Link href="/services/smb-acquisition/#audit-form">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              Get a Free Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a
            href="https://calendly.com/qasim-ali-cs2technologies"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Book a 30-min call
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border-2 border-gray-200 text-body-sm font-medium text-gray-700 shadow-sm">
            <Zap className="w-4 h-4 mr-1.5 text-primary" />
            4-week delivery
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border-2 border-gray-200 text-body-sm font-medium text-gray-700 shadow-sm">
            <Code2 className="w-4 h-4 mr-1.5 text-primary" />
            You own the code
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border-2 border-gray-200 text-body-sm font-medium text-gray-700 shadow-sm">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-primary" />
            No platform tax
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-xl transition-shadow"
          >
            <Zap className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h3 className="text-heading-sm font-display mb-2">Launched in 4 weeks</h3>
            <p className="text-body-md text-gray-600 font-body">
              AI-accelerated delivery — not 4 months, not 4 quarters.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-xl transition-shadow"
          >
            <Code2 className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h3 className="text-heading-sm font-display mb-2">Custom code, not templates</h3>
            <p className="text-body-md text-gray-600 font-body">
              Built on Next.js — no Wix lock-in, no Shopify platform tax.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-xl transition-shadow"
          >
            <ShieldCheck className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h3 className="text-heading-sm font-display mb-2">Hosting, ads &amp; CRM included</h3>
            <p className="text-body-md text-gray-600 font-body">
              One monthly retainer. Ad spend paid directly — never marked up.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
