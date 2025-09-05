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
  Globe,
  MessageSquare,
  CheckCircle,
  Calendar,
  Sparkles
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
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
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "info@cs2technologies.ca",
      link: "mailto:info@cs2technologies.ca"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      content: "Toronto, Canada",
      link: "#"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Website",
      content: "www.cs2technologies.ca",
      link: "https://www.cs2technologies.ca"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full text-primary font-medium mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Get in Touch
          </div>
          <h2 className="text-display-sm font-display text-gray-900 mb-6">
            Let&apos;s Transform Your Business
          </h2>
          <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
            Ready to leverage AI for your organization? Contact us to discuss how our 
            solutions can drive innovation and efficiency in your operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-400/60 bg-white/80 backdrop-blur-sm">
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 hover:border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 hover:border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 hover:border-gray-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="cs2-health">CS2 Health Demo</option>
                        <option value="b2b-ecommerce">B2B Ecommerce Solution</option>
                        <option value="ai-consulting">AI Consulting</option>
                        <option value="custom-development">Custom Development</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 w-5 h-5" />
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
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-heading-lg font-display text-gray-900">Get in Touch</h3>
              </div>
              <p className="text-body-md text-gray-600 font-body">
                Our team is ready to help you harness the power of AI for your business. 
                Whether you&apos;re looking for a demo, have questions about our solutions, 
                or want to explore partnership opportunities, we&apos;re here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start p-5 bg-gradient-to-br from-white to-gray-50/50 rounded-xl hover:from-primary/5 hover:to-primary/10 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-100 hover:border-primary/20"
                >
                  <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4 flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-display font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-body-sm text-gray-600 font-body">{item.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-gray-50/30">
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
                  <h4 className="font-display font-bold text-xl">Ready to Get Started?</h4>
                </div>
                <p className="mb-6 text-white/90 font-body">
                  Schedule a personalized demo to see how CS2 Technologies can transform 
                  your business with AI.
                </p>
                <Link href="/demo">
                  <Button className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3">
                    <Calendar className="mr-2 w-5 h-5" />
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact