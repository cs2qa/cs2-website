'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Cloud, 
  Code, 
  Database, 
  Smartphone, 
  Shield, 
  ArrowRight,
  Cpu,
  Network,
  Globe
} from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Custom AI solutions including RAG systems, LLMs, knowledge graphs, and intelligent chatbots that transform your business processes.",
      features: ["Custom LLM Implementation", "RAG Systems", "Knowledge Graphs", "AI Chatbots"],
      link: "/services/ai"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure on AWS and Google Cloud with enterprise-grade security and performance optimization.",
      features: ["AWS & GCP Deployment", "Auto-scaling", "DevOps & CI/CD", "Security & Compliance"],
      link: "/services/cloud"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Development",
      description: "Full-stack web and mobile applications built with modern technologies and best practices for optimal performance.",
      features: ["Web Applications", "Mobile Apps", "API Development", "System Integration"],
      link: "/services/development"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Healthcare Technology",
      description: "Specialized healthcare solutions including patient management systems, clinical workflows, and HIPAA-compliant platforms.",
      features: ["Patient Management", "Clinical Workflows", "HIPAA Compliance", "Healthcare Analytics"],
      link: "/services/healthcare"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "B2B E-commerce",
      description: "Enterprise e-commerce platforms with advanced inventory management, multi-vendor support, and seamless integrations.",
      features: ["Multi-vendor Platforms", "Inventory Management", "Payment Processing", "Analytics & Reporting"],
      link: "/services/ecommerce"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Telecommunications",
      description: "Leveraging decades of telecom expertise to build robust communication systems and network solutions.",
      features: ["Network Design", "Communication Systems", "VoIP Solutions", "System Monitoring"],
      link: "/services/telecom"
    }
  ]
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-display-sm font-display text-gray-900 mb-4">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
            From AI-powered innovations to cloud infrastructure, we deliver cutting-edge solutions 
            that drive business transformation across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-xl transition-shadow duration-300 group border-2 border-gray-400/60"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary rounded-lg text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-heading-sm font-display text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-body-md text-gray-600 mb-6 font-body">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-body-sm text-gray-600 font-body">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link href={service.link} className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div>
            <Link href="/services/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
