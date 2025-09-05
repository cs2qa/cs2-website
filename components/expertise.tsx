'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Wifi, 
  Radio, 
  Server, 
  Network,
  Building2,
  Globe2,
  TrendingUp,
  Award
} from 'lucide-react'

const Expertise = () => {
  const telecomExpertise = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Network Architecture",
      description: "Designed and optimized 5G/4G networks for major European carriers"
    },
    {
      icon: <Radio className="w-8 h-8" />,
      title: "Spectrum Management",
      description: "Strategic frequency allocation and interference optimization"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Core Systems",
      description: "Implementation of carrier-grade billing and provisioning systems"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "IoT Solutions",
      description: "Large-scale M2M deployments and edge computing strategies"
    }
  ]

  const clients = [
    "European Tier-1 Carriers",
    "Government Agencies",
    "Infrastructure Providers",
    "MVNO Operators",
    "Enterprise Clients",
    "Healthcare Systems"
  ]

  const achievements = [
    {
      metric: "15+",
      label: "Years of Experience",
      description: "In telecommunications and technology consulting"
    },
    {
      metric: "50+",
      label: "Major Projects",
      description: "Successfully delivered across Europe and North America"
    },
    {
      metric: "€100M+",
      label: "Cost Savings",
      description: "Generated for clients through optimization strategies"
    },
    {
      metric: "99.99%",
      label: "Uptime",
      description: "Average system reliability across deployed solutions"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built on Telecom Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our deep telecommunications heritage provides the foundation for building 
            robust, scalable AI solutions that meet enterprise standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Building2 className="w-8 h-8 text-primary mr-3" />
              Telecommunications Heritage
            </h3>
            <div className="space-y-4">
              {telecomExpertise.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="text-primary mr-4">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 text-primary mr-3" />
              AI Transformation Journey
            </h3>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">2008-2018: Telecom Consulting</h4>
                  <p className="text-gray-600">
                    Built reputation as trusted advisors to Europe&apos;s leading telecommunications 
                    providers, delivering complex network and system integrations.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">2019-2021: Strategic Pivot</h4>
                  <p className="text-gray-600">
                    Recognized AI&apos;s transformative potential and began developing proprietary 
                    machine learning solutions for healthcare applications.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-2">2022-Present: AI Leadership</h4>
                  <p className="text-gray-600">
                    Launched CS2 Health and B2B AI solutions, securing partnerships with leading 
                    healthcare providers and validating our AI-first approach.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-primary/10 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <Globe2 className="w-6 h-6 text-primary mr-2" />
                Client Portfolio
              </h4>
              <div className="flex flex-wrap gap-2">
                {clients.map((client, index) => (
                  <span 
                    key={index}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 text-center shadow-lg"
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {achievement.metric}
              </div>
              <div className="font-semibold mb-1">{achievement.label}</div>
              <div className="text-sm text-gray-600">{achievement.description}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-white text-center"
        >
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Enterprise-Grade Solutions with Startup Innovation
          </h3>
          <p className="max-w-2xl mx-auto">
            We combine the reliability and scalability requirements learned from telecom 
            infrastructure with the agility and innovation of modern AI development, 
            delivering solutions that are both cutting-edge and production-ready.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Expertise