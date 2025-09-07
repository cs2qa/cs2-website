'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight,
  CheckCircle,
  Calendar,
  MessageSquare
} from 'lucide-react'

const CTASection = () => {
  const benefits = [
    "Free consultation and project assessment",
    "Custom solution tailored to your needs",
    "Experienced team with proven track record",
    "Ongoing support and maintenance"
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-display-sm font-display text-white mb-6"
            >
              Ready to Transform Your Business?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-body-lg text-white/90 mb-8 font-body"
            >
              Join the growing number of businesses leveraging AI and cloud technology 
              to drive growth, improve efficiency, and stay ahead of the competition. 
              Let's discuss how CS2 Technologies can help you achieve your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-3 mb-8"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                  <span className="text-body-md text-white font-body">
                    {benefit}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/demo/">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/contact/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary px-8"
                >
                  <MessageSquare className="mr-2 w-5 h-5" />
                  Get In Touch
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Contact Form Teaser */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
        >
            <h3 className="text-heading-md font-display text-white mb-6">
              Start Your Project Today
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2 font-body">
                  Project Type
                </label>
                <select className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white">
                  <option value="">Select a service...</option>
                  <option value="ai">AI & Machine Learning</option>
                  <option value="cloud">Cloud Solutions</option>
                  <option value="healthcare">Healthcare Technology</option>
                  <option value="ecommerce">B2B E-commerce</option>
                  <option value="custom">Custom Development</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2 font-body">
                  Timeline
                </label>
                <select className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white">
                  <option value="">When do you need this?</option>
                  <option value="asap">ASAP</option>
                  <option value="1-2months">1-2 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6+months">6+ months</option>
                </select>
              </div>
            </div>
            
            <Link href="/get-started/" className="block">
              <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100">
                Get Detailed Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <p className="text-center text-white/70 text-sm mt-4 font-body">
              No commitment required • Free consultation included
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
