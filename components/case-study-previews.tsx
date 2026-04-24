'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink, Globe, CheckCircle } from 'lucide-react'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'

const FEATURED_SLUGS = ['etobicoke-vr-arena', 'notermed', 'majestik-group'] as const

const CaseStudyPreviews = () => {
  const featured: CaseStudy[] = FEATURED_SLUGS
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c))

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-display-sm font-display text-gray-900 mb-4"
          >
            Real Canadian businesses, real builds
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body"
          >
            Five live websites, each shipped in under six weeks. Custom code,
            no templates, owned by the client.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {featured.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl shadow-xl border-2 border-gray-400/60 overflow-hidden hover:border-primary transition-colors flex flex-col"
            >
              <Link
                href={`/case-studies/${study.slug}/`}
                className="block"
                aria-label={`Read ${study.clientName} case study`}
              >
                <div className="aspect-video overflow-hidden bg-gray-100 relative">
                  <img
                    src={study.screenshot}
                    alt={`${study.clientName} live site homepage`}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-mono text-gray-700">
                    {new URL(study.liveSiteUrl).hostname.replace('www.', '')}
                  </div>
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {study.industry}
                  </span>
                </div>
                <h3 className="text-heading-sm font-display text-gray-900 mb-2">
                  {study.clientName}
                </h3>
                <p className="text-body-sm text-gray-600 font-body mb-4">
                  {study.tagline}
                </p>

                <ul className="space-y-2 mb-6">
                  {study.highlights.slice(0, 2).map((highlight, hi) => (
                    <li
                      key={hi}
                      className="flex items-start text-body-sm text-gray-700 font-body"
                    >
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/case-studies/${study.slug}/`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex-1"
                  >
                    Read case study
                    <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Link>
                  <a
                    href={study.liveSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md border-2 border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors flex-1"
                  >
                    Visit live site
                    <ExternalLink className="ml-1.5 w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/case-studies/">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              See all 5 case studies
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CaseStudyPreviews
