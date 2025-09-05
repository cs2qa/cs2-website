'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Award, 
  Users, 
  Target, 
  Lightbulb,
  ArrowRight,
  CheckCircle 
} from 'lucide-react'

const AboutOverview = () => {
  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation First",
      description: "We stay at the forefront of technology, continuously adopting emerging trends and best practices."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Results Driven",
      description: "Every solution we build is designed to deliver measurable business value and ROI."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client Partnership",
      description: "We work as an extension of your team, understanding your unique challenges and goals."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Excellence",
      description: "We maintain the highest standards in code quality, security, and performance."
    }
  ]

  const achievements = [
    "15+ years of telecommunications expertise",
    "50+ successful AI and cloud projects",
    "HIPAA-compliant healthcare solutions",
    "AWS and Google Cloud certified partners",
    "24/7 ongoing support and maintenance",
    "Agile development methodology"
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-display-sm font-display text-gray-900 mb-6"
            >
              Transforming Businesses Through Technology
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-body-lg text-gray-600 mb-8 font-body"
            >
              Founded with deep roots in telecommunications, CS2 Technologies has evolved into a 
              leading provider of AI-powered solutions, cloud infrastructure, and custom software 
              development. We combine decades of technical expertise with innovative thinking to 
              solve complex business challenges.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-body-lg text-gray-600 mb-8 font-body"
            >
              Our specialization in healthcare technology, B2B e-commerce, and enterprise AI 
              solutions has helped businesses across North America achieve digital transformation 
              and operational excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/about">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Get In Touch
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content */}
          <div>
            {/* Company Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-gray-400/60"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary mr-3">
                      {value.icon}
                    </div>
                    <h3 className="text-heading-sm font-display text-gray-900">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-body-sm text-gray-600 font-body">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Key Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-heading-md font-display text-gray-900 mb-6">
                Why Choose CS2 Technologies?
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-body-md text-gray-700 font-body">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutOverview
