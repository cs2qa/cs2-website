'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Users, Award, Building2 } from 'lucide-react'

const About = () => {
  const milestones = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Strategic Evolution",
      description: "Transitioned from European telecommunications consulting to pioneering AI solutions"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Mission-Driven",
      description: "Democratizing AI technology for healthcare and business transformation"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client-Focused",
      description: "Building trusted partnerships with leading healthcare providers and enterprises"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Innovation Excellence",
      description: "Leveraging open-source technologies for transparent, adaptable solutions"
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full text-primary font-medium mb-4 shadow-sm">
            <Building2 className="w-4 h-4 mr-2" />
            About CS2 Technologies
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Journey to AI Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From telecommunications expertise to healthcare AI leadership, CS2 Technologies 
            represents a strategic evolution in solving complex business challenges through 
            intelligent automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">Our Story</h3>
            <p className="text-gray-600 leading-relaxed">
              CS2 Technologies began as a specialized telecommunications consultancy, 
              serving major European telecom providers with strategic insights and 
              operational excellence. Our deep understanding of complex systems and 
              network architectures provided the perfect foundation for our transition 
              into artificial intelligence.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Recognizing the transformative potential of AI in healthcare, we pivoted 
              our focus to develop cutting-edge solutions that address real-world clinical 
              challenges. Today, we combine our systems expertise with advanced AI 
              technologies to deliver solutions that truly make a difference.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our flagship product, CS2 Health, exemplifies this evolution—bringing together 
              open-source LLMs, sophisticated RAG systems, and intuitive interfaces to 
              revolutionize healthcare workflows.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">Our Philosophy</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-400/60">
                <h4 className="font-semibold text-lg mb-2 text-primary">Transparency First</h4>
                <p className="text-gray-600">
                  We believe in open-source solutions that provide complete visibility 
                  into how AI decisions are made, ensuring trust and accountability.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-400/60">
                <h4 className="font-semibold text-lg mb-2 text-primary">Adaptability at Core</h4>
                <p className="text-gray-600">
                  Every organization is unique. Our solutions are designed to adapt to 
                  specific workflows and requirements, not the other way around.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-400/60">
                <h4 className="font-semibold text-lg mb-2 text-primary">Scalability by Design</h4>
                <p className="text-gray-600">
                  From single clinics to enterprise health systems, our cloud-native 
                  architecture ensures seamless growth alongside your organization.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl p-6 border-2 border-gray-400/60"
            >
              <div className="text-primary mb-4 flex justify-center">
                {milestone.icon}
              </div>
              <h4 className="font-semibold text-lg mb-2">{milestone.title}</h4>
              <p className="text-gray-600 text-sm">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
