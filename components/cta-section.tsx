'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Wrench } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-display-sm font-display text-white mb-6"
        >
          Ready to grow your Canadian business?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-body-lg text-white/90 mb-8 font-body max-w-2xl mx-auto"
        >
          Start with a free 30-minute audit. We&apos;ll review your Google Ads,
          your website, and your funnel, then tell you what to fix — no sales
          call required to read it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
        >
          <Link href="/services/smb-acquisition/#audit-form">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8">
              <Wrench className="mr-2 w-5 h-5" />
              Get a Free Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a
            href="https://calendly.com/qasim-ali-cs2technologies"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book a 30-min call
            </Button>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-body-sm text-white/80 font-body"
        >
          No lock-in. You own everything we build. Cancel after any phase.
        </motion.p>
      </div>
    </section>
  )
}

export default CTASection
