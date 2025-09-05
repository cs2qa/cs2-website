'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Brain, 
  MessageSquare, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe, 
  GitBranch,
  Cpu,
  Shield,
  Zap
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "AI & Machine Learning",
      description: "Custom AI solutions using cutting-edge LLMs, neural networks, and deep learning models",
      features: ["Custom LLM Development", "Fine-tuning & Training", "Model Optimization", "AI Integration"]
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: "RAG & Knowledge Graphs",
      description: "Advanced retrieval systems and graph-based knowledge management",
      features: ["Vector Databases", "Semantic Search", "Knowledge Extraction", "Graph Analytics"]
    },
    {
      icon: <MessageSquare className="w-10 h-10" />,
      title: "AI Chatbots",
      description: "Intelligent conversational interfaces for customer service and support",
      features: ["Natural Language Processing", "Multi-language Support", "Context Awareness", "Sentiment Analysis"]
    },
    {
      icon: <Cloud className="w-10 h-10" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure on AWS and Google Cloud Platform",
      features: ["Cloud Migration", "Serverless Architecture", "Auto-scaling", "Cost Optimization"]
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Mobile Development",
      description: "Native and hybrid mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "Native iOS/Android", "Cross-platform Solutions"]
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Web Applications",
      description: "Modern, responsive web applications with cutting-edge technologies",
      features: ["Progressive Web Apps", "Real-time Applications", "API Development", "Microservices"]
    }
  ]

  const techStack = [
    { name: "OpenAI GPT", category: "LLM" },
    { name: "Claude", category: "LLM" },
    { name: "LLaMA", category: "Open Source" },
    { name: "Mistral", category: "Open Source" },
    { name: "TensorFlow", category: "ML Framework" },
    { name: "PyTorch", category: "ML Framework" },
    { name: "AWS", category: "Cloud" },
    { name: "Google Cloud", category: "Cloud" },
    { name: "React/Next.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "PostgreSQL", category: "Database" }
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
            Our Technology Stack & Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions powered by the latest technologies and frameworks, 
            delivered with expertise gained from years of enterprise consulting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-primary mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Zap className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Technology Expertise</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-100 hover:bg-primary hover:text-white transition-colors duration-300 px-4 py-2 rounded-full"
              >
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Enterprise Security</h4>
            <p className="text-gray-600">HIPAA compliant, SOC2 certified solutions with end-to-end encryption</p>
          </div>
          <div className="text-center">
            <GitBranch className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Open Source Philosophy</h4>
            <p className="text-gray-600">Transparent, auditable code with active community contribution</p>
          </div>
          <div className="text-center">
            <Cpu className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Performance Optimized</h4>
            <p className="text-gray-600">Edge computing and distributed processing for minimal latency</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services