'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowRight, 
  CheckCircle, 
  Heart, 
  ShoppingCart, 
  MessageSquare,
  Brain,
  Users,
  Building,
  Clock,
  Star,
  Zap,
  Shield,
  Globe,
  Database,
  Cloud,
  Smartphone,
  TrendingUp,
  FileText,
  BarChart3
} from 'lucide-react'

export default function Solutions() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Solutions', count: 8 },
    { id: 'healthcare', label: 'Healthcare', count: 2 },
    { id: 'ecommerce', label: 'E-commerce', count: 2 },
    { id: 'ai-services', label: 'AI Services', count: 4 }
  ]

  const solutions = [
    {
      id: 'cs2-health-pro',
      category: 'healthcare',
      featured: true,
      icon: <Heart className="w-12 h-12" />,
      title: 'CS2 Health Pro',
      subtitle: 'Complete Healthcare AI Suite',
      description: 'Comprehensive AI solution for healthcare providers with advanced features and enterprise support.',
      longDescription: 'CS2 Health Pro includes all features of CS2 Health plus advanced analytics, multi-location support, custom integrations, and dedicated account management.',
      features: [
        'Knowledge Base Agent with Custom Training',
        'Clinical Notes Transcription & AI Documentation',
        'Advanced EHR Integration (Epic, Cerner, Allscripts)',
        'AI Billing & Revenue Cycle Management',
        'Patient Portal with AI Chatbot',
        'Advanced Analytics & Reporting',
        'Multi-location Support',
        'Dedicated Account Manager'
      ],
      benefits: [
        '80% reduction in documentation time',
        '60% faster patient information retrieval',
        '40% improvement in billing accuracy',
        'HIPAA compliant with SOC 2 certification'
      ],
      pricing: 'Starting at $899/month',
      timeline: '3-6 weeks implementation',
      clientTypes: 'Large clinics, hospitals, health systems',
      caseStudy: 'Regional Health Network saw 70% reduction in admin tasks'
    },
    {
      id: 'cs2-health-starter',
      category: 'healthcare',
      icon: <Heart className="w-12 h-12" />,
      title: 'CS2 Health Starter',
      subtitle: 'Essential Healthcare AI',
      description: 'Perfect for small to medium practices looking to get started with AI-powered healthcare solutions.',
      longDescription: 'CS2 Health Starter provides core AI functionality to help smaller practices improve efficiency and patient care without overwhelming complexity.',
      features: [
        'Knowledge Base Agent',
        'Basic Clinical Notes Transcription',
        'Tebra EHR Integration',
        'Standard Support',
        'Basic Analytics Dashboard'
      ],
      benefits: [
        '50% reduction in documentation time',
        '40% faster information access',
        'Easy setup in under 2 weeks',
        'Affordable monthly pricing'
      ],
      pricing: 'Starting at $299/month',
      timeline: '1-2 weeks implementation',
      clientTypes: 'Small to medium practices, specialty clinics',
      caseStudy: 'Family Practice improved patient throughput by 30%'
    },
    {
      id: 'b2b-ecommerce-enterprise',
      category: 'ecommerce',
      featured: true,
      icon: <ShoppingCart className="w-12 h-12" />,
      title: 'B2B AI Commerce Enterprise',
      subtitle: 'Complete B2B Platform',
      description: 'Full-featured B2B e-commerce platform with advanced AI capabilities for large organizations.',
      longDescription: 'Enterprise-grade B2B commerce solution with AI-powered personalization, advanced analytics, and custom integrations.',
      features: [
        'AI-Powered Product Recommendations',
        'Intelligent Search & Discovery',
        'Automated Procurement & Reordering',
        'Dynamic Pricing Engine',
        'Advanced Analytics & BI',
        'Multi-tenant Architecture',
        'Custom API Integrations',
        'White-label Options'
      ],
      benefits: [
        '45% increase in average order value',
        '60% improvement in search conversion',
        '35% reduction in procurement time',
        'Multi-language & currency support'
      ],
      pricing: 'Custom pricing from $2,500/month',
      timeline: '6-12 weeks implementation',
      clientTypes: 'Large distributors, manufacturers, enterprise retailers',
      caseStudy: 'Manufacturing distributor increased sales by 120%'
    },
    {
      id: 'b2b-ecommerce-starter',
      category: 'ecommerce',
      icon: <ShoppingCart className="w-12 h-12" />,
      title: 'B2B AI Commerce Starter',
      subtitle: 'Smart B2B E-commerce',
      description: 'Essential B2B commerce features with AI enhancements for growing businesses.',
      longDescription: 'Get started with B2B e-commerce powered by AI with essential features for growing businesses.',
      features: [
        'Basic AI Product Recommendations',
        'Smart Search Functionality',
        'Automated Inventory Alerts',
        'Customer Portal',
        'Basic Analytics',
        'Payment Processing'
      ],
      benefits: [
        '25% increase in order frequency',
        '30% faster product discovery',
        'Streamlined B2B ordering process',
        'Mobile-responsive design'
      ],
      pricing: 'Starting at $799/month',
      timeline: '3-4 weeks implementation',
      clientTypes: 'Small to medium B2B sellers, distributors',
      caseStudy: 'Industrial supplier doubled online orders in 6 months'
    },
    {
      id: 'ai-chatbot-pro',
      category: 'ai-services',
      icon: <MessageSquare className="w-12 h-12" />,
      title: 'AI Chatbot Pro',
      subtitle: 'Advanced Conversational AI',
      description: 'Sophisticated AI chatbot with natural language understanding and custom integrations.',
      longDescription: 'Professional-grade conversational AI with advanced NLP, custom training, and enterprise integrations.',
      features: [
        'Advanced Natural Language Processing',
        'Custom Knowledge Base Training',
        'Multi-language Support (20+ languages)',
        'Voice Integration',
        'Sentiment Analysis',
        'CRM Integration',
        'Advanced Analytics',
        'White-label Options'
      ],
      benefits: [
        '85% query resolution without human intervention',
        '60% reduction in support tickets',
        '24/7 customer support availability',
        'Improved customer satisfaction scores'
      ],
      pricing: 'Starting at $499/month',
      timeline: '2-3 weeks implementation',
      clientTypes: 'Medium to large businesses, e-commerce sites',
      caseStudy: 'SaaS company reduced support costs by 70%'
    },
    {
      id: 'ai-chatbot-basic',
      category: 'ai-services',
      icon: <MessageSquare className="w-12 h-12" />,
      title: 'AI Chatbot Basic',
      subtitle: 'Essential Customer Support AI',
      description: 'Simple, effective AI chatbot for customer support and lead generation.',
      longDescription: 'Get started with AI customer support with our essential chatbot solution.',
      features: [
        'Pre-trained Customer Support Model',
        'FAQ Integration',
        'Basic Multi-language Support',
        'Lead Capture Forms',
        'Basic Analytics',
        'Easy Website Integration'
      ],
      benefits: [
        '70% of common queries answered instantly',
        '40% increase in lead capture',
        'Quick setup and deployment',
        'Affordable entry point to AI'
      ],
      pricing: 'Starting at $199/month',
      timeline: '1 week implementation',
      clientTypes: 'Small businesses, startups, local services',
      caseStudy: 'Restaurant chain increased reservations by 45%'
    },
    {
      id: 'custom-ai-development',
      category: 'ai-services',
      featured: true,
      icon: <Brain className="w-12 h-12" />,
      title: 'Custom AI Development',
      subtitle: 'Bespoke AI Solutions',
      description: 'Fully customized AI solutions tailored to your specific business requirements and use cases.',
      longDescription: 'Our team develops custom AI solutions from the ground up, designed specifically for your unique business needs and challenges.',
      features: [
        'Custom Machine Learning Models',
        'Proprietary Algorithm Development',
        'Data Pipeline Architecture',
        'Custom UI/UX Design',
        'Advanced Integration Capabilities',
        'Dedicated Development Team',
        'Ongoing Support & Optimization',
        'Intellectual Property Rights'
      ],
      benefits: [
        'Competitive advantage through unique AI',
        'Perfect fit for specific business processes',
        'Scalable architecture for future growth',
        'Full ownership and control'
      ],
      pricing: 'Starting at $50,000',
      timeline: '3-6 months development',
      clientTypes: 'Fortune 500, innovative startups, research institutions',
      caseStudy: 'Fintech startup achieved 300% efficiency improvement'
    },
    {
      id: 'ai-consulting',
      category: 'ai-services',
      icon: <Users className="w-12 h-12" />,
      title: 'AI Strategy Consulting',
      subtitle: 'Expert AI Guidance',
      description: 'Strategic consulting to help you identify and implement the right AI solutions for your business.',
      longDescription: 'Work with our AI experts to develop a comprehensive AI strategy and roadmap for your organization.',
      features: [
        'AI Readiness Assessment',
        'Use Case Identification',
        'Technology Stack Recommendations',
        'Implementation Roadmap',
        'ROI Analysis & Projections',
        'Change Management Support',
        'Vendor Evaluation',
        'Ongoing Advisory Services'
      ],
      benefits: [
        'Clear AI strategy and roadmap',
        'Risk mitigation and best practices',
        'Faster time to AI value',
        'Expert guidance throughout journey'
      ],
      pricing: 'Starting at $15,000',
      timeline: '4-8 weeks engagement',
      clientTypes: 'C-suite executives, innovation leaders, transformation teams',
      caseStudy: 'Healthcare network developed 3-year AI roadmap'
    }
  ]

  const filteredSolutions = selectedCategory === 'all' 
    ? solutions 
    : solutions.filter(s => s.category === selectedCategory)

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore Our
              <span className="text-gradient block mt-2">AI Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI solutions designed to transform your business operations, 
              improve efficiency, and drive innovation across industries.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredSolutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full hover:shadow-xl transition-shadow duration-300 ${
                  solution.featured ? 'border-2 border-primary' : ''
                }`}>
                  {solution.featured && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-semibold">
                      ⭐ MOST POPULAR
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-primary">{solution.icon}</div>
                      {solution.featured && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-2xl">{solution.title}</CardTitle>
                    <CardDescription className="text-lg text-primary font-medium">
                      {solution.subtitle}
                    </CardDescription>
                    <p className="text-gray-600">{solution.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {solution.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                        {solution.features.length > 4 && (
                          <p className="text-sm text-gray-500 ml-6">
                            + {solution.features.length - 4} more features
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Key Benefits:</h4>
                      <div className="space-y-2">
                        {solution.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Starting Price</p>
                        <p className="font-semibold">{solution.pricing}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Implementation</p>
                        <p className="font-semibold">{solution.timeline}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-gray-500">Perfect for:</p>
                      <p className="text-sm font-medium">{solution.clientTypes}</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Success Story:</strong> {solution.caseStudy}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Link href="/get-started/" className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Get Started
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href="/demo/">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          Demo
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Not Sure Which Solution Is Right for You?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our AI experts are here to help you find the perfect solution for your business needs. 
              Get a free consultation and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo/">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Schedule Free Consultation
                  <Users className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/get-started/">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Start Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}