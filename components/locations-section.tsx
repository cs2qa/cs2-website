'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ArrowRight,
  Building
} from 'lucide-react'

const LocationsSection = () => {
  const locations = [
    {
      name: "Toronto Office",
      address: "2424 Finch Ave W, Unit 14",
      city: "Toronto, ON M9M 2E2",
      country: "Canada",
      phone: "+1 905 749 5338",
      email: "toronto@cs2technologies.ca",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM EST",
      isHeadquarters: true
    }
  ]

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Qasim",
      description: "Direct line to your project lead.",
      action: "Call now",
      link: "tel:+19057495338",
      external: false,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email us",
      description: "Replies within one business day.",
      action: "Send email",
      link: "mailto:info@cs2technologies.ca",
      external: false,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Book a 30-min call",
      description: "Grab a time directly on Qasim's calendar.",
      action: "Book now",
      link: "https://calendly.com/qasim-ali-cs2technologies",
      external: true,
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-display-sm font-display text-gray-900 mb-4"
          >
            Our Location in Canada
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body"
          >
            Strategically located across the Greater Toronto Area to serve businesses 
            throughout Canada and North America.
          </motion.p>
        </div>

        {/* Office Location - Redesigned as horizontal layout */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side - Office Info */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary mr-4">
                    <Building className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-heading-md font-display text-gray-900">
                      {locations[0].name}
                    </h3>
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                      Headquarters
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-body-md text-gray-700 font-body">
                      <div>{locations[0].address}</div>
                      <div>{locations[0].city}</div>
                      <div>{locations[0].country}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <div className="text-body-md text-gray-700 font-body">
                      {locations[0].hours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Contact Info */}
              <div className="flex flex-col justify-center">
                <h4 className="text-heading-sm font-display text-gray-900 mb-4">
                  Get in Touch
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <a 
                      href={`tel:+${locations[0].phone.replace(/\D/g, '')}`}
                      className="text-body-lg text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {locations[0].phone}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <a 
                      href={`mailto:${locations[0].email}`}
                      className="text-body-lg text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {locations[0].email}
                    </a>
                  </div>

                  <div className="pt-4">
                    <Link href="/services/smb-acquisition/#audit-form">
                      <Button className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto">
                        Get a free audit
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-heading-lg font-display text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-body-lg text-gray-600 font-body">
              Choose the best way to connect with our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {method.icon}
                  </div>
                </div>
                
                <h4 className="text-heading-sm font-display text-gray-900 mb-2">
                  {method.title}
                </h4>
                
                <p className="text-body-md text-gray-600 mb-4 font-body">
                  {method.description}
                </p>
                
                {method.external ? (
                  <a href={method.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      {method.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                ) : (
                  <Link href={method.link}>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      {method.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationsSection
