'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  ShoppingCart, 
  FileText, 
  Users, 
  BarChart3, 
  Clock,
  CheckCircle,
  ArrowRight,
  Building,
  Package,
  TrendingUp,
  Globe
} from 'lucide-react'

const Products = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Flagship Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Purpose-built solutions that leverage our AI expertise to solve real-world 
            challenges in healthcare and commerce.
          </p>
        </motion.div>

        {/* CS2 Health Product */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Heart className="w-10 h-10 text-primary mr-3" />
                  <h3 className="text-3xl font-bold">CS2 Health</h3>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Revolutionary AI-powered healthcare solution transforming clinical workflows 
                  and improving patient outcomes through intelligent automation.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Knowledge Base Agent</h4>
                      <p className="text-gray-600 text-sm">
                        Instant access to medical information and enterprise documents with AI-powered search
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Clinical Notes Transcription</h4>
                      <p className="text-gray-600 text-sm">
                        Automated patient-doctor conversation recording with structured clinical note generation
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">EHR Integration</h4>
                      <p className="text-gray-600 text-sm">
                        Seamless integration with Tebra and major EMR systems
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Future-Ready</h4>
                      <p className="text-gray-600 text-sm">
                        AI billing agent and patient portal in development
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Link href="/demo">
                    <Button className="bg-primary hover:bg-primary/90">
                      Schedule Demo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/solutions">
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <Users className="w-8 h-8 text-primary mb-3" />
                  <h5 className="font-semibold mb-1">Clinician-Friendly</h5>
                  <p className="text-sm text-gray-600">Intuitive interface designed for healthcare professionals</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <Clock className="w-8 h-8 text-primary mb-3" />
                  <h5 className="font-semibold mb-1">Time-Saving</h5>
                  <p className="text-sm text-gray-600">Reduce administrative workload by 60%</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <FileText className="w-8 h-8 text-primary mb-3" />
                  <h5 className="font-semibold mb-1">Accurate Documentation</h5>
                  <p className="text-sm text-gray-600">AI-generated clinical notes with 95% accuracy</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <BarChart3 className="w-8 h-8 text-primary mb-3" />
                  <h5 className="font-semibold mb-1">Analytics & Insights</h5>
                  <p className="text-sm text-gray-600">Real-time dashboard with actionable metrics</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CS2 B2B AI Ecommerce */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <Building className="w-8 h-8 text-primary mb-3" />
                    <h5 className="font-semibold mb-1">Enterprise Ready</h5>
                    <p className="text-sm text-gray-600">Scalable B2B marketplace platform</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <Package className="w-8 h-8 text-primary mb-3" />
                    <h5 className="font-semibold mb-1">Smart Inventory</h5>
                    <p className="text-sm text-gray-600">AI-powered demand forecasting</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <TrendingUp className="w-8 h-8 text-primary mb-3" />
                    <h5 className="font-semibold mb-1">Revenue Growth</h5>
                    <p className="text-sm text-gray-600">Increase conversions by 40%</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <Globe className="w-8 h-8 text-primary mb-3" />
                    <h5 className="font-semibold mb-1">Global Scale</h5>
                    <p className="text-sm text-gray-600">Multi-language, multi-currency support</p>
                  </motion.div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-primary mr-3" />
                  <h3 className="text-3xl font-bold">CS2 B2B AI Ecommerce</h3>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Next-generation B2B commerce platform powered by artificial intelligence, 
                  revolutionizing how businesses buy and sell online.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">AI-Powered Personalization</h4>
                      <p className="text-gray-600 text-sm">
                        Dynamic pricing and product recommendations based on buyer behavior
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Intelligent Search & Discovery</h4>
                      <p className="text-gray-600 text-sm">
                        Natural language product search with semantic understanding
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Automated Procurement</h4>
                      <p className="text-gray-600 text-sm">
                        Smart reordering and supply chain optimization
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Advanced Analytics</h4>
                      <p className="text-gray-600 text-sm">
                        Real-time insights into sales, inventory, and customer behavior
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Link href="/demo">
                    <Button className="bg-primary hover:bg-primary/90">
                      Request Demo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/solutions">
                    <Button variant="outline">
                      View Case Studies
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Products