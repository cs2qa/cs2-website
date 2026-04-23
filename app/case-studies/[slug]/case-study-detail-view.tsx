'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Sparkles,
  Wrench,
  Target,
  Trophy,
  Globe,
} from 'lucide-react'
import type { CaseStudy } from '@/lib/case-studies'

type Props = {
  study: CaseStudy
}

const CaseStudyDetailView: React.FC<Props> = ({ study }) => {
  const hostname = (() => {
    try {
      return new URL(study.liveSiteUrl).hostname.replace('www.', '')
    } catch {
      return study.liveSiteUrl
    }
  })()

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link
              href="/case-studies/"
              className="inline-flex items-center text-body-sm text-gray-600 hover:text-primary transition-colors font-body"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              All case studies
            </Link>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
              {study.industry}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-mono">
              {hostname}
            </span>
          </div>

          <h1 className="text-display-md font-display text-gray-900 mb-5 leading-tight">
            {study.clientName}
          </h1>
          <p className="text-body-lg text-gray-600 font-body leading-relaxed max-w-3xl mb-8">
            {study.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={study.liveSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                Visit live site
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <Link href="/services/smb-acquisition/#audit-form">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Book a free audit
              </Button>
            </Link>
          </div>

          {/* Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative mt-12 aspect-[16/8] bg-gradient-to-br from-gray-100 via-gray-50 to-primary/5 rounded-2xl shadow-xl border-2 border-gray-400/60 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,41,0,0.12),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(130deg,transparent_0%,transparent_55%,rgba(255,41,0,0.08)_100%)]" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <Globe className="w-16 h-16 text-gray-300 mb-4" />
              <h2 className="text-heading-md font-display text-gray-900 mb-1">
                {study.clientName}
              </h2>
              <p className="text-body-sm text-gray-500 font-mono">
                {hostname}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero blurb */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-body-lg text-gray-700 font-body leading-relaxed">
            {study.heroBlurb}
          </p>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-5">
            <div className="p-3 bg-primary rounded-lg text-white mr-3">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-heading-lg font-display text-gray-900">
              The challenge
            </h2>
          </div>
          <p className="text-body-lg text-gray-700 font-body leading-relaxed">
            {study.challenge}
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-5">
            <div className="p-3 bg-primary rounded-lg text-white mr-3">
              <Wrench className="w-6 h-6" />
            </div>
            <h2 className="text-heading-lg font-display text-gray-900">
              What we built
            </h2>
          </div>
          <p className="text-body-lg text-gray-700 font-body leading-relaxed">
            {study.solution}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary rounded-lg text-white mr-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-heading-lg font-display text-gray-900">
              Highlights
            </h2>
          </div>
          <ul className="space-y-3">
            {study.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start bg-white rounded-xl border-2 border-gray-400/60 p-4"
              >
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-body-md text-gray-700 font-body">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-heading-lg font-display text-gray-900 mb-5">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {study.techStack.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-body-sm font-medium border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-5">
            <div className="p-3 bg-primary rounded-lg text-white mr-3">
              <Trophy className="w-6 h-6" />
            </div>
            <h2 className="text-heading-lg font-display text-gray-900">
              The outcome
            </h2>
          </div>
          <p className="text-body-lg text-gray-700 font-body leading-relaxed">
            {study.outcome}
          </p>
        </div>
      </section>

      {/* What this proves + CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/15 rounded-full text-white font-medium mb-5">
            <Sparkles className="w-4 h-4 mr-2" />
            What this proves
          </div>
          <h2 className="text-display-sm font-display mb-8 leading-tight">
            {study.whatThisProves}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/services/smb-acquisition/#audit-form">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8"
              >
                Want something like this? Book a free audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/case-studies/">
              <Button
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10"
              >
                See other case studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default CaseStudyDetailView
