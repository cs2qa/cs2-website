'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      company: "MedTech Solutions",
      content: "CS2 Technologies transformed our clinical workflows with their AI-powered patient management system. The efficiency gains have been remarkable, allowing our team to focus more on patient care.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "Global Commerce Inc.",
      content: "The B2B e-commerce platform CS2 built for us exceeded all expectations. Their attention to detail and understanding of complex business requirements is unparalleled.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Jennifer Walsh",
      role: "Director of Operations",
      company: "TechFlow Enterprises",
      content: "Working with CS2 on our cloud migration was seamless. Their expertise in AWS and automation helped us scale our operations while reducing costs by 40%.",
      rating: 5,
      image: "/api/placeholder/64/64"
    }
  ]

  const stats = [
    { number: "50+", label: "Successful Projects" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "15+", label: "Years of Experience" },
    { number: "24/7", label: "Support Available" }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-display-sm font-display text-gray-900 mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body"
          >
            Don't just take our word for it. See what our clients say about their experience 
            working with CS2 Technologies.
          </motion.p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl p-6 border-2 border-gray-400/60"
            >
              <div className="text-display-sm font-display text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-body-md text-gray-600 font-body">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8 relative border-2 border-gray-400/60"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-body-md text-gray-700 mb-6 font-body italic">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="text-body-md font-medium text-gray-900 font-display">
                    {testimonial.name}
                  </div>
                  <div className="text-body-sm text-gray-600 font-body">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
