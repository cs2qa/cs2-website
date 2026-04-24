'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Calendar,
  Wrench,
  Mail,
  Phone,
  MapPin,
  User,
  Users,
  Briefcase,
} from 'lucide-react'

const PHILOSOPHY = [
  'Custom code, not templates. You own it, not us.',
  'Transparent pricing. Ad spend goes direct to Google — we don’t mark it up.',
  'No lock-in. Leave any time with a clean 30-day export.',
]

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
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
              About CS2 Technologies
            </span>
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-lg font-display text-gray-900 mb-6 leading-none"
          >
            Toronto-based.
            <span className="text-gradient block mt-2">
              Built for Canadian SMBs.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-gray-600 mb-8 max-w-3xl mx-auto font-body leading-relaxed"
          >
            We build custom websites that help small and mid-sized businesses
            grow — launched in 4 weeks, with hosting and Google Ads management
            included.
          </motion.p>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-display-sm font-display text-gray-900 mb-8 text-center"
          >
            What we do
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-body-lg text-gray-700 font-body leading-relaxed"
          >
            <p>
              CS2 Technologies builds custom websites for Canadian small and
              mid-sized businesses. Not templates, not page-builder sites — real
              custom code, shipped on Next.js and hosted on modern
              infrastructure (AWS, Vercel, CloudFront). Every build is owned
              outright by the client.
            </p>
            <p>
              AI-accelerated development is the reason we can deliver custom
              work in 3–4 weeks at a price point that used to require Shopify
              templates or Wix drag-and-drop. The stack is boringly modern, the
              delivery is fast, and the output is a site you own forever.
            </p>
            <p>
              Our work is packaged into three tiers based on what your business
              actually does. <strong>Foundation</strong> is for service
              businesses that need reliable lead flow — clinics, trades,
              consultants, law firms, real estate. <strong>Growth</strong> is
              for businesses taking bookings, subscriptions, or payments online
              — gyms, salons, VR arcades, course creators. <strong>Scale</strong>
              is for retailers and D2C brands running full e-commerce.
            </p>
            <p>
              Every tier includes hosting (AWS or Vercel), SSL, daily backups,
              security patches, uptime monitoring, Google Ads campaign
              management, and CRM integration — all bundled into one monthly
              retainer. Ad spend is paid directly to Google or Meta from your
              card. We do not mark it up. You own your domain, your code, and
              your data, and you can leave at any time with a 30-day clean
              export.
            </p>
            <div className="pt-4 text-center">
              <Link href="/services/smb-acquisition/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                  See pricing and full details
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4"
            >
              <Users className="w-4 h-4 mr-2" />
              Who we are
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-display-sm font-display text-gray-900 mb-4"
            >
              A small senior team, not a body-shop agency.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-400/60"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary rounded-lg text-white mr-3">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-heading-sm font-display text-gray-900">
                    Sobia Ashfaq
                  </h3>
                  <p className="text-body-sm text-gray-500 font-body">
                    CEO & Co-Founder
                  </p>
                </div>
              </div>
              <p className="text-body-md text-gray-700 font-body leading-relaxed">
                Sobia founded CS2 Technologies in 2023 to bring enterprise-grade
                custom software to Canadian small and mid-sized businesses.
                She leads the company from our Toronto office and sets the
                standard for how CS2 builds: custom code, transparent pricing,
                and zero lock-in.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-400/60"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary rounded-lg text-white mr-3">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-heading-sm font-display text-gray-900">
                    Qasim Ali
                  </h3>
                  <p className="text-body-sm text-gray-500 font-body">
                    Head of SMB Engagements
                  </p>
                </div>
              </div>
              <p className="text-body-md text-gray-700 font-body leading-relaxed mb-4">
                Qasim is your direct contact from the first audit call through
                launch and into ongoing support. He runs every SMB engagement
                end-to-end, so the person you talk to in week one is the same
                person you talk to six months later.
              </p>
              <div className="space-y-2 text-body-sm text-gray-700 font-body">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                  <a
                    href="mailto:info@cs2technologies.ca"
                    className="hover:text-primary transition-colors"
                  >
                    info@cs2technologies.ca
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                  <a
                    href="tel:+19057495338"
                    className="hover:text-primary transition-colors"
                  >
                    905-749-5338
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our philosophy */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-sm font-display text-gray-900 mb-4"
            >
              Our philosophy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-body-lg text-gray-600 font-body"
            >
              Three principles that keep the work honest.
            </motion.p>
          </div>

          <ul className="space-y-4">
            {PHILOSOPHY.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start bg-gray-50 rounded-xl p-6 border-2 border-gray-400/60"
              >
                <CheckCircle className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-0.5" />
                <span className="text-body-lg text-gray-800 font-body">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-sm font-display text-gray-900 mb-4"
            >
              Offices
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-400/60"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-body-md text-gray-700 font-body">
                  <div className="font-semibold text-gray-900 mb-1">Toronto</div>
                  2424 Finch Ave W, Unit 14
                  <br />
                  Toronto, ON M9M 2E2
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-body-md text-gray-700 font-body">
                  <div className="font-semibold text-gray-900 mb-1">Email</div>
                  <a
                    href="mailto:info@cs2technologies.ca"
                    className="hover:text-primary transition-colors"
                  >
                    info@cs2technologies.ca
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-body-md text-gray-700 font-body">
                  <div className="font-semibold text-gray-900 mb-1">Phone</div>
                  <a
                    href="tel:+19057495338"
                    className="hover:text-primary transition-colors"
                  >
                    905-749-5338
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Let's talk */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>

        <div className="max-w-4xl mx-auto relative text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-display-sm font-display text-white mb-6"
          >
            Want to work together?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-lg text-white/90 mb-8 font-body max-w-2xl mx-auto"
          >
            Start with a free 30-minute audit, or grab a time on Qasim&apos;s
            calendar directly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default AboutPage
