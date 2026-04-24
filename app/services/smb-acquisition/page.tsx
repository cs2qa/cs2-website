'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Wrench,
  ShieldCheck,
  ExternalLink,
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  Tag,
  DollarSign,
  FileText,
  Loader2,
  AlertCircle,
  Rocket,
  Store,
  CreditCard,
} from 'lucide-react'

type Industry =
  | ''
  | 'service-business'
  | 'clinic'
  | 'trades'
  | 'professional-services'
  | 'retail'
  | 'ecommerce'
  | 'restaurant'
  | 'other'

type AdSpend =
  | ''
  | 'none'
  | '100-500'
  | '500-2000'
  | '2000-5000'
  | '5000+'

interface AuditFormState {
  name: string
  email: string
  phone: string
  businessName: string
  businessUrl: string
  industry: Industry
  adSpendMonthly: AdSpend
  whatIssue: string
}

type SubmitStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

const INITIAL_FORM: AuditFormState = {
  name: '',
  email: '',
  phone: '',
  businessName: '',
  businessUrl: '',
  industry: '',
  adSpendMonthly: '',
  whatIssue: '',
}

const TIERS = [
  {
    name: 'Foundation',
    tagline: 'Lead Gen',
    icon: <Rocket className="w-7 h-7" />,
    setup: 'CAD $4,500',
    monthly: '$650/mo',
    bestFor:
      'Service businesses — clinics, trades, consultants, law firms, real estate.',
    includes: [
      'Custom-built website (no template)',
      'CRM + lead capture forms',
      'Google Ads campaign management',
      'Hosting, SSL & daily backups',
      'Landing pages tuned for conversion',
    ],
    highlight: false,
  },
  {
    name: 'Growth',
    tagline: 'Payments & Bookings',
    icon: <CreditCard className="w-7 h-7" />,
    setup: 'CAD $8,500',
    monthly: '$1,200/mo',
    bestFor:
      'VR arcades, gyms, salons, courses, subscription services.',
    includes: [
      'Everything in Foundation',
      'Stripe payments integration',
      'Booking & scheduling system',
      'Email automations & reminders',
      'Customer dashboards',
    ],
    highlight: true,
  },
  {
    name: 'Scale',
    tagline: 'E-Commerce',
    icon: <Store className="w-7 h-7" />,
    setup: 'CAD $15,000',
    monthly: '$2,250/mo',
    bestFor: 'Retail, D2C brands, wholesale operators.',
    includes: [
      'Everything in Growth',
      'Shopping cart & inventory management',
      'HST multi-province tax handling',
      'Multi-product CRM',
      'Advanced attribution & reporting',
    ],
    highlight: false,
  },
]

const PORTFOLIO = [
  {
    name: 'Etobicoke VR Arena',
    slug: 'etobicoke-vr-arena',
    url: 'https://www.etobicokevrarena.ca/',
    screenshot: '/case-studies/etobicoke-vr-arena.jpg',
    description:
      'VR arcade — booking-first site with tiered party packages and Google Ads-ready page speed.',
  },
  {
    name: 'Notermed',
    slug: 'notermed',
    url: 'https://www.notermed.com/',
    screenshot: '/case-studies/notermed.jpg',
    description:
      'AI medical transcription SaaS — marketing site + authenticated product app on one Next.js codebase.',
  },
  {
    name: 'The Majestik Group',
    slug: 'majestik-group',
    url: 'https://www.themajestikgroup.com/',
    screenshot: '/case-studies/majestik-group.jpg',
    description:
      'Premium furniture retailer — catalog-driven Next.js site with quote flow and wholesale portal.',
  },
  {
    name: 'GWS Connect',
    slug: 'gws-connect',
    url: 'https://www.gwsconnect24.com/',
    screenshot: '/case-studies/gws-connect.jpg',
    description:
      'B2B wholesale brokerage — member-gated platform with buyer / supplier auth and deal feeds.',
  },
  {
    name: 'Mint Imports',
    slug: 'mint-imports',
    url: 'https://www.minttimports.ca/',
    screenshot: '/case-studies/mint-imports.jpg',
    description:
      'Canadian furniture importer — wholesale credibility site with category-driven quote flow.',
  },
]

const FAQS = [
  {
    q: 'How long before I see results?',
    a: 'Your site ships in 4 weeks. Google Ads can drive qualified traffic within the first week of launch; SEO compounds over 3-6 months. Lead volume depends on spend, offer, and industry — we set realistic benchmarks at kickoff.',
  },
  {
    q: "What if it doesn't work — can I cancel?",
    a: 'Yes. You can cancel after any phase. You keep the code, the domain, the CRM data, and the Google Ads account. No contracts lock you in and no platform tax holds your store hostage.',
  },
  {
    q: 'Who owns the domain and the Google Ads account?',
    a: 'You do. We set everything up under your accounts from day one. If you ever leave us, you walk away with everything — domain, code, ad account, customer data, analytics.',
  },
  {
    q: 'Is the ad spend included in your fee?',
    a: 'No. Ad spend is paid directly to Google / Meta from your card — we do not mark it up. Our monthly retainer covers campaign management, hosting, CRM, and ongoing optimization.',
  },
  {
    q: 'Do you only work with Toronto businesses?',
    a: 'We are based in Toronto but we serve SMBs across Canada — from Vancouver to Halifax. Everything is delivered remotely with weekly check-ins.',
  },
]

const SMBAcquisitionPage = () => {
  const [form, setForm] = useState<AuditFormState>(INITIAL_FORM)
  const [status, setStatus] = useState<SubmitStatus>({ kind: 'idle' })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ kind: 'submitting' })

    const apiUrl =
      process.env.NEXT_PUBLIC_CONTACT_API_URL || 'YOUR_API_GATEWAY_URL_HERE'

    // Eager fetch — fire the request immediately on submit.
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: 'audit',
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.businessName,
          businessUrl: form.businessUrl,
          industry: form.industry,
          adSpendMonthly: form.adSpendMonthly,
          whatIssue: form.whatIssue,
        }),
      })

      const result = await response
        .json()
        .catch(() => ({} as { error?: string; message?: string }))

      if (!response.ok) {
        const message =
          (result && typeof result.error === 'string' && result.error) ||
          `Request failed (HTTP ${response.status}). Please try again or email info@cs2technologies.ca.`
        setStatus({ kind: 'error', message })
        return
      }

      setStatus({ kind: 'success' })
      setForm(INITIAL_FORM)
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? `Couldn't reach the audit service: ${err.message}. Please try again or email info@cs2technologies.ca.`
          : "Couldn't reach the audit service. Please try again or email info@cs2technologies.ca."
      setStatus({ kind: 'error', message })
    }
  }

  const scrollToForm = () => {
    const el = document.getElementById('audit-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6 space-x-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-body-sm font-medium text-gray-600 tracking-wide uppercase">
              Productized for Canadian SMBs
            </span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-display-lg font-display text-gray-900 mb-6 leading-none">
            Custom websites for
            <span className="text-gradient block mt-2">
              Canadian businesses, launched in 4 weeks.
            </span>
          </h1>
          <p className="text-body-lg text-gray-600 mb-8 max-w-3xl mx-auto font-body leading-relaxed">
            Lead generation, online bookings, or full e-commerce — with hosting,
            Google Ads management, and CRM included. You own the code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Get a Free Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                See Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-display text-gray-900 mb-4">
              Template speed. Custom quality.
            </h2>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
              Three reasons Canadian SMBs pick CS2 over Shopify, Wix, and
              Squarespace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-400/60"
            >
              <div className="p-3 bg-primary rounded-lg text-white inline-flex mb-4">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-heading-sm font-display text-gray-900 mb-3">
                Custom-built in 4 weeks
              </h3>
              <p className="text-body-md text-gray-600 font-body">
                Not a drag-and-drop template. A bespoke site, designed around
                your offer and shipped to production in 4 weeks flat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-400/60"
            >
              <div className="p-3 bg-primary rounded-lg text-white inline-flex mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-heading-sm font-display text-gray-900 mb-3">
                AI-accelerated development
              </h3>
              <p className="text-body-md text-gray-600 font-body">
                We use modern AI tooling to compress months of engineering into
                weeks — without the quality, speed, or SEO penalty of
                no-code platforms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-400/60"
            >
              <div className="p-3 bg-primary rounded-lg text-white inline-flex mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-heading-sm font-display text-gray-900 mb-3">
                No platform tax
              </h3>
              <p className="text-body-md text-gray-600 font-body">
                No Shopify transaction fees. No Wix lock-in. No Squarespace
                caps. You own your code, your domain, and your customer data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-display text-gray-900 mb-4">
              Pick the tier that matches your business
            </h2>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
              Transparent pricing. One setup fee. One monthly retainer.
              Everything included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                id={`tier-${tier.name.toLowerCase()}`}
                className={`bg-white rounded-xl p-8 shadow-xl border-2 scroll-mt-28 ${
                  tier.highlight
                    ? 'border-primary shadow-2xl scale-100 md:scale-105 relative'
                    : 'border-gray-400/60'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold uppercase tracking-wide px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary rounded-lg text-white mr-3">
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-display text-gray-900">
                      {tier.name}
                    </h3>
                    <p className="text-body-sm text-gray-500 font-body">
                      {tier.tagline}
                    </p>
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-heading-md font-display text-gray-900">
                      {tier.setup}
                    </span>
                    <span className="text-body-sm text-gray-500">setup</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-heading-sm font-display text-primary">
                      {tier.monthly}
                    </span>
                    <span className="text-body-sm text-gray-500">retainer</span>
                  </div>
                </div>

                <p className="text-body-sm text-gray-600 font-body mb-4">
                  <span className="font-semibold text-gray-900">Best for: </span>
                  {tier.bestFor}
                </p>

                <ul className="space-y-2 mb-6">
                  {tier.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-body-sm text-gray-700 font-body"
                    >
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToForm}
                  className={`w-full ${
                    tier.highlight
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Start with {tier.name}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl border-2 border-gray-400/60 p-6">
            <p className="text-body-sm text-gray-600 font-body text-center">
              <span className="font-semibold text-gray-900">Note: </span>
              Ad spend is paid directly to Google / Meta (we don&apos;t mark it
              up). Hosting is always included in the monthly retainer. You own
              your domain, code, and data. Cancel after any phase.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-display text-gray-900 mb-4">
              Sites we&apos;ve shipped
            </h2>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
              Real Canadian businesses running on CS2-built sites today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((site) => (
              <div
                key={site.url}
                className="group bg-white rounded-xl shadow-xl border-2 border-gray-400/60 overflow-hidden hover:border-primary transition-colors flex flex-col"
              >
                <Link
                  href={`/case-studies/${site.slug}/`}
                  className="block"
                  aria-label={`Read ${site.name} case study`}
                >
                  <div className="aspect-video overflow-hidden bg-gray-100 relative">
                    <img
                      src={site.screenshot}
                      alt={`${site.name} live site homepage`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-mono text-gray-700">
                      {new URL(site.url).hostname.replace('www.', '')}
                    </div>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-heading-sm font-display text-gray-900 mb-2">
                    {site.name}
                  </h3>
                  <p className="text-body-sm text-gray-600 font-body mb-4">
                    {site.description}
                  </p>
                  <div className="mt-auto flex flex-col sm:flex-row gap-2">
                    <Link
                      href={`/case-studies/${site.slug}/`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex-1"
                    >
                      Read case study
                      <ArrowRight className="ml-1.5 w-4 h-4" />
                    </Link>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-md border-2 border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors flex-1"
                    >
                      Visit live site
                      <ExternalLink className="ml-1.5 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/15 rounded-full text-white font-medium mb-4">
            <Wrench className="w-4 h-4 mr-2" />
            Free 30-Minute Audit
          </div>
          <h2 className="text-display-sm font-display mb-4">
            Not sure where to start?
          </h2>
          <p className="text-body-lg mb-8 text-white/90 max-w-2xl mx-auto font-body">
            Get a free 30-minute Google Ads + website audit. We&apos;ll email
            you a 4-page diagnostic within 2 business days — no sales pitch,
            just findings.
          </p>
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-white text-primary hover:bg-white/90 px-8"
          >
            Request Your Free Audit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Audit Form */}
      <section id="audit-form" className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-display-sm font-display text-gray-900 mb-4">
              Request your free audit
            </h2>
            <p className="text-body-lg text-gray-600 font-body">
              Tell us about your business. We&apos;ll email your diagnostic
              within 2 business days.
            </p>
          </div>

          <Card className="shadow-xl bg-white rounded-2xl">
            <CardContent className="p-8">
              {status.kind === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 flex items-start gap-3 rounded-xl border-2 border-green-500 bg-green-50 p-4"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900">
                      Thanks! We&apos;ll review and email your audit within 2
                      business days.
                    </p>
                    <p className="text-body-sm text-green-800 mt-1">
                      Keep an eye on your inbox (and spam folder) for a message
                      from info@cs2technologies.ca.
                    </p>
                  </div>
                </div>
              )}

              {status.kind === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 flex items-start gap-3 rounded-xl border-2 border-red-500 bg-red-50 p-4"
                >
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">
                      We couldn&apos;t submit your audit request.
                    </p>
                    <p className="text-body-sm text-red-800 mt-1">
                      {status.message}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="audit-name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="audit-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="audit-email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="audit-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="audit-phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone <span className="text-gray-400">(optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="audit-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="audit-business-name"
                      className="block text-sm font-medium mb-2"
                    >
                      Business name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="audit-business-name"
                        type="text"
                        name="businessName"
                        value={form.businessName}
                        onChange={handleChange}
                        required
                        placeholder="Your business"
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="audit-business-url"
                    className="block text-sm font-medium mb-2"
                  >
                    Business website URL <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="audit-business-url"
                      type="url"
                      name="businessUrl"
                      value={form.businessUrl}
                      onChange={handleChange}
                      required
                      placeholder="https://yourbusiness.ca"
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    If you don&apos;t have one yet, enter your Google Business
                    Profile or a social page.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="audit-industry"
                      className="block text-sm font-medium mb-2"
                    >
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        id="audit-industry"
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                      >
                        <option value="">Select industry</option>
                        <option value="service-business">Service business</option>
                        <option value="clinic">Clinic</option>
                        <option value="trades">Trades</option>
                        <option value="professional-services">
                          Professional services
                        </option>
                        <option value="retail">Retail</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="audit-ad-spend"
                      className="block text-sm font-medium mb-2"
                    >
                      Current monthly Google Ads spend{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        id="audit-ad-spend"
                        name="adSpendMonthly"
                        value={form.adSpendMonthly}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                      >
                        <option value="">Select range</option>
                        <option value="none">Not yet running</option>
                        <option value="100-500">$100–$500</option>
                        <option value="500-2000">$500–$2,000</option>
                        <option value="2000-5000">$2,000–$5,000</option>
                        <option value="5000+">$5,000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="audit-issue"
                    className="block text-sm font-medium mb-2"
                  >
                    What&apos;s the #1 issue you&apos;re trying to solve?{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-4 pointer-events-none" />
                    <textarea
                      id="audit-issue"
                      name="whatIssue"
                      value={form.whatIssue}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="e.g., Not getting enough leads from Google Ads, site looks dated, can't take bookings online, losing sales to Shopify fees..."
                      className="w-full min-h-[160px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none resize-y"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={status.kind === 'submitting'}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                >
                  {status.kind === 'submitting' ? (
                    <span className="inline-flex items-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      Request My Free Audit
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We&apos;ll only use your info to prepare your audit. No
                  spam, no list-selling.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-display text-gray-900 mb-4">
              Frequently asked
            </h2>
            <p className="text-body-lg text-gray-600 font-body">
              Straight answers. No fine print.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((item, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-xl border-2 border-gray-400/60 p-6 hover:border-primary/40 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-heading-sm font-display text-gray-900 pr-4">
                    {item.q}
                  </h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-primary font-bold group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-body-md text-gray-600 font-body leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default SMBAcquisitionPage
