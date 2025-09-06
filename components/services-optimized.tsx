'use client'

import React from 'react'
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
      features: ["Knowledge Base Construction", "Semantic Search", "Graph Analytics", "Information Retrieval"]
    },
    {
      icon: <MessageSquare className="w-10 h-10" />,
      title: "AI Chatbots & Assistants",
      description: "Intelligent conversational agents tailored to your business needs",
      features: ["Natural Language Processing", "Multi-channel Support", "Context Awareness", "Custom Training"]
    },
    {
      icon: <Cloud className="w-10 h-10" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure on AWS and Google Cloud platforms",
      features: ["Cloud Migration", "DevOps & CI/CD", "Auto-scaling", "Security & Compliance"]
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Full-Stack Development",
      description: "End-to-end web and mobile application development",
      features: ["React/Next.js", "Mobile Apps", "API Development", "Database Design"]
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security and regulatory compliance solutions",
      features: ["HIPAA Compliance", "Data Encryption", "Access Control", "Security Audits"]
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display-sm font-display text-gray-900 mb-6">
            Comprehensive Technology Services
          </h2>
          <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
            From AI development to cloud deployment, we provide end-to-end technology 
            solutions that drive business transformation and competitive advantage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary mr-4">
                    {service.icon}
                  </div>
                </div>
                <CardTitle className="text-heading-sm font-display">{service.title}</CardTitle>
                <CardDescription className="text-body-md font-body">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-body-sm text-gray-600 font-body">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
          <h3 className="text-heading-lg font-display text-gray-900 text-center mb-12">
            Our Proven Development Process
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="text-heading-sm font-display text-gray-900 mb-2">Discovery</h4>
              <p className="text-body-sm text-gray-600 font-body">We analyze your requirements and define project scope</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="text-heading-sm font-display text-gray-900 mb-2">Design</h4>
              <p className="text-body-sm text-gray-600 font-body">Architecture and system design with your approval</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="text-heading-sm font-display text-gray-900 mb-2">Development</h4>
              <p className="text-body-sm text-gray-600 font-body">Agile development with regular progress updates</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h4 className="text-heading-sm font-display text-gray-900 mb-2">Deploy</h4>
              <p className="text-body-sm text-gray-600 font-body">Production deployment with ongoing support</p>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-8 md:p-12">
          <h3 className="text-heading-lg font-display text-gray-900 text-center mb-12">
            Technologies We Work With
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-heading-sm font-display text-gray-900 mb-4 flex items-center">
                <Brain className="w-6 h-6 text-primary mr-2" />
                AI & Data
              </h4>
              <div className="space-y-2">
                {["Python", "TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "LangChain"].map((tech) => (
                  <div key={tech} className="text-body-sm text-gray-600 font-body">{tech}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-heading-sm font-display text-gray-900 mb-4 flex items-center">
                <Cpu className="w-6 h-6 text-primary mr-2" />
                Development
              </h4>
              <div className="space-y-2">
                {["React", "Next.js", "Node.js", "TypeScript", "GraphQL", "REST APIs"].map((tech) => (
                  <div key={tech} className="text-body-sm text-gray-600 font-body">{tech}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-heading-sm font-display text-gray-900 mb-4 flex items-center">
                <Cloud className="w-6 h-6 text-primary mr-2" />
                Infrastructure
              </h4>
              <div className="space-y-2">
                {["AWS", "Google Cloud", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"].map((tech) => (
                  <div key={tech} className="text-body-sm text-gray-600 font-body">{tech}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services