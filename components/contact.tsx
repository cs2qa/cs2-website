'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle,
  Calendar,
  Sparkles,
  User,
  Building2,
  Tag,
  FileText,
  Loader2,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [consent, setConsent] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL

      if (!apiUrl) {
        throw new Error(
          "The contact form isn't configured yet. Please email info@cs2technologies.ca or call 905-749-5338 and we'll get right back to you."
        )
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(
          `We couldn't send your message (status ${response.status}). Please try again in a moment, or email info@cs2technologies.ca.`
        )
      }

      await response.json()

      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: ''
        })
        setConsent(false)
      }, 5000)

    } catch (error) {
      setIsSubmitting(false)
      const message =
        error instanceof Error
          ? error.message
          : "We couldn't send your message. Please try again or email info@cs2technologies.ca."
      setErrorMessage(message)
    }
  }

  type ContactInfoItem = {
    icon: React.ReactNode
    title: string
    content: string
    link?: string
    external?: boolean
  }

  const contactInfo: ContactInfoItem[] = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "info@cs2technologies.ca",
      link: "mailto:info@cs2technologies.ca"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+1 905 749 5338",
      link: "tel:+19057495338"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Toronto Office",
      content: "2424 Finch Ave W, Unit 14, Toronto ON M9M 2E2, Canada"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Book a 30-min call",
      content: "Grab a time on Qasim's calendar directly.",
      link: "https://calendly.com/qasim-ali-cs2technologies",
      external: true
    }
  ]

  return (
    <section className="pt-0 pb-20 px-4 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full text-primary font-medium mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Get in Touch
          </div>
          <h2 className="text-display-sm font-display text-gray-900 mb-6">
            Let&apos;s talk about your website
          </h2>
          <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
            Send us a note, email directly, or grab a time on Qasim&apos;s
            calendar. We reply within one business day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-lg mr-4">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-heading-lg font-display text-gray-900">Send Us a Message</h3>
                </div>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                    <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                    <p className="text-gray-600">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                            className="w-full rounded-xl border-2 border-gray-200 bg-white/90 px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@company.com"
                            className="w-full rounded-xl border-2 border-gray-200 bg-white/90 px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">We’ll never share your email.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <div className="relative">
                          <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Organization name"
                            className="w-full rounded-xl border-2 border-gray-200 bg-white/90 px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <div className="relative">
                          <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Optional"
                            className="w-full rounded-xl border-2 border-gray-200 bg-white/90 px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Tag className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white/90 px-4 py-3 pl-11 text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                        >
                          <option value="">Select a subject</option>
                          <option value="free-audit">Free website &amp; Google Ads audit</option>
                          <option value="foundation">Foundation — lead generation site</option>
                          <option value="growth">Growth — bookings &amp; payments site</option>
                          <option value="scale">Scale — full e-commerce</option>
                          <option value="existing-client">I&apos;m an existing client</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-4 pointer-events-none" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={7}
                          placeholder="Tell us a bit about your goals..."
                          className="w-full min-h-[220px] rounded-xl border-2 border-gray-200 bg-white/90 px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none resize-y"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl bg-gray-50/60 border border-gray-200 p-4">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600">
                        I agree to be contacted about my inquiry. We&apos;ll only
                        use the information you provide to respond to this
                        message.
                      </label>
                    </div>

                    {errorMessage && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                      >
                        {errorMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !consent}
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-heading-lg font-display text-gray-900">Get in Touch</h3>
              </div>
              <p className="text-body-md text-gray-600 font-body">
                Whether you want a free audit, a detailed quote, or just want
                to talk through whether we&apos;re the right fit — we&apos;re
                happy to help. Every SMB engagement is run directly by Qasim.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => {
                const cardClass =
                  'flex items-start p-5 bg-gradient-to-br from-white to-gray-50/50 rounded-xl hover:from-primary/5 hover:to-primary/10 transition-all duration-300 shadow-md hover:shadow-lg'
                const body = (
                  <>
                    <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4 flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-display font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-body-sm text-gray-600 font-body">{item.content}</p>
                    </div>
                  </>
                )

                if (!item.link) {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={cardClass}
                    >
                      {body}
                    </motion.div>
                  )
                }

                return (
                  <motion.a
                    key={index}
                    href={item.link}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={cardClass}
                  >
                    {body}
                  </motion.a>
                )
              })}
            </div>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50/30">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Clock className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <h4 className="font-semibold mb-2">Business Hours</h4>
                    <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-sm text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-sm text-gray-600">
                      We typically respond within 24 business hours. For urgent inquiries, 
                      please call us directly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white/20 rounded-lg mr-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-display font-bold text-xl">Ready to get started?</h4>
                </div>
                <p className="mb-6 text-white/90 font-body">
                  Skip the form. Get a free 30-minute audit of your website
                  and Google Ads, or grab a time on Qasim&apos;s calendar.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/services/smb-acquisition/#audit-form" className="inline-block">
                    <Button className="bg-white text-primary hover:bg-gray-100 shadow-lg px-6 py-3">
                      Get a free audit
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <a
                    href="https://calendly.com/qasim-ali-cs2technologies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-6 py-3">
                      <Calendar className="mr-2 w-5 h-5" />
                      Book a 30-min call
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
