'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Briefcase,
  Globe,
} from 'lucide-react'
import { caseStudies } from '@/lib/case-studies'

const CaseStudiesIndexPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6 space-x-3">
            <Briefcase className="w-6 h-6 text-primary" />
            <span className="text-body-sm font-medium text-gray-600 tracking-wide uppercase">
              Portfolio
            </span>
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-display-lg font-display text-gray-900 mb-6 leading-none">
            Case studies — real Canadian
            <span className="text-gradient block mt-2">
              businesses, real builds.
            </span>
          </h1>
          <p className="text-body-lg text-gray-600 mb-4 max-w-3xl mx-auto font-body leading-relaxed">
            Five live websites, each shipped in under six weeks. Custom code,
            no templates, owned by the client.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => {
              const hostname = (() => {
                try {
                  return new URL(study.liveSiteUrl).hostname.replace(
                    'www.',
                    ''
                  )
                } catch {
                  return study.liveSiteUrl
                }
              })()

              return (
                <motion.article
                  key={study.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-2xl shadow-xl border-2 border-gray-400/60 overflow-hidden hover:border-primary/60 transition-colors flex flex-col"
                >
                  {/* Visual placeholder (we don't have screenshots) */}
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 via-gray-50 to-primary/5 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,41,0,0.08),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(130deg,transparent_0%,transparent_60%,rgba(255,41,0,0.06)_100%)]" />
                    <div className="relative z-10 flex flex-col items-center text-center px-6">
                      <Globe className="w-12 h-12 text-gray-300 mb-3 group-hover:text-primary/60 transition-colors" />
                      <h3 className="text-heading-md font-display text-gray-900">
                        {study.clientName}
                      </h3>
                      <p className="mt-1 text-body-sm text-gray-500 font-mono">
                        {hostname}
                      </p>
                    </div>
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                        {study.industry}
                      </span>
                    </div>

                    <h2 className="text-heading-sm font-display text-gray-900 mb-2">
                      {study.clientName}
                    </h2>
                    <p className="text-body-md text-gray-600 font-body mb-4">
                      {study.tagline}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {study.highlights.slice(0, 3).map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start text-body-sm text-gray-700 font-body"
                        >
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/case-studies/${study.slug}/`}
                        className="flex-1"
                      >
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                          Read case study
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                      <a
                        href={study.liveSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary/10"
                        >
                          Visit live site
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA back to SMB pitch */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display-sm font-display mb-4">
            Want something like this?
          </h2>
          <p className="text-body-lg mb-8 text-white/90 max-w-2xl mx-auto font-body">
            Get a free 30-minute audit of your current site and Google Ads.
            We&apos;ll email you a 4-page diagnostic within 2 business days.
          </p>
          <Link href="/services/smb-acquisition/#audit-form">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8"
            >
              Book a free audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default CaseStudiesIndexPage
