'use client'

import React from 'react'
import Link from 'next/link'
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
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-display-sm font-display text-gray-900 mb-6">
            Our Flagship Products
          </h2>
          <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
            Purpose-built solutions that leverage our AI expertise to solve real-world 
            challenges in healthcare and commerce.
          </p>
        </div>

        {/* CS2 Health Product */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Heart className="w-12 h-12 text-red-500 mr-4" />
                  <h3 className="text-heading-lg font-display text-gray-900">
                    CS2 Health
                  </h3>
                </div>
                
                <p className="text-body-lg text-gray-700 mb-8 font-body">
                  Revolutionary AI-powered healthcare platform that transforms how medical 
                  professionals access, process, and utilize clinical information. Built 
                  specifically for healthcare workflows with HIPAA compliance at its core.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Intelligent Knowledge Base Agent</h4>
                      <p className="text-gray-600 text-sm">AI assistant that understands medical context and provides instant answers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Clinical Notes Transcription</h4>
                      <p className="text-gray-600 text-sm">Convert voice notes to structured, searchable clinical documentation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">EHR Integration</h4>
                      <p className="text-gray-600 text-sm">Seamlessly integrates with existing Electronic Health Record systems</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/demo">
                    <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                      Schedule CS2 Health Demo
                      <Heart className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-xl shadow-2xl p-6">
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-red-500 mr-2" />
                      <span className="font-semibold text-gray-800">Patient Query</span>
                    </div>
                    <p className="text-sm text-gray-600">"What are the latest treatment protocols for Type 2 diabetes?"</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Heart className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="font-semibold text-gray-800">CS2 Health Response</span>
                    </div>
                    <p className="text-sm text-gray-600">Based on the latest ADA guidelines and your facility's protocols, here are the current evidence-based treatment approaches...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* B2B Commerce Product */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="bg-white rounded-xl shadow-2xl p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <Package className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <div className="text-xs font-semibold text-gray-700">Smart Inventory</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <BarChart3 className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-xs font-semibold text-gray-700">AI Analytics</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Revenue Growth</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">+34%</div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <ShoppingCart className="w-12 h-12 text-green-500 mr-4" />
                  <h3 className="text-heading-lg font-display text-gray-900">
                    B2B Commerce Platform
                  </h3>
                </div>
                
                <p className="text-body-lg text-gray-700 mb-8 font-body">
                  Next-generation B2B commerce platform powered by AI that streamlines 
                  procurement, optimizes pricing, and enhances buyer-seller relationships 
                  through intelligent automation.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">AI-Powered Product Recommendations</h4>
                      <p className="text-gray-600 text-sm">Machine learning algorithms suggest relevant products based on purchase history</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Smart Search & Discovery</h4>
                      <p className="text-gray-600 text-sm">Advanced search capabilities with natural language processing</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Automated Procurement</h4>
                      <p className="text-gray-600 text-sm">Streamlined ordering process with approval workflows and budget controls</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/demo">
                    <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                      Schedule Commerce Demo
                      <ShoppingCart className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Comparison */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <h3 className="text-heading-lg font-display text-gray-900 text-center mb-12">
            Choose the Right Solution for Your Business
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h4 className="text-heading-md font-display text-gray-900 mb-2">CS2 Health</h4>
                <p className="text-body-md text-gray-600 font-body">For Healthcare Organizations</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <Building className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Hospitals & Clinics</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Medical Professionals</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Clinical Documentation</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">24/7 AI Assistant</span>
                </div>
              </div>
              
              <Link href="/demo" className="block">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  Get Started with CS2 Health
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <ShoppingCart className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-heading-md font-display text-gray-900 mb-2">B2B Commerce</h4>
                <p className="text-body-md text-gray-600 font-body">For B2B Businesses</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <Building className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Manufacturing & Distribution</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Multi-channel Sales</span>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Advanced Analytics</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Revenue Optimization</span>
                </div>
              </div>
              
              <Link href="/demo" className="block">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Get Started with B2B Commerce
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-heading-lg font-display mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-body-lg text-white/90 mb-8 max-w-2xl mx-auto font-body">
            Join the growing number of organizations using CS2 Technologies to drive 
            innovation, improve efficiency, and deliver exceptional results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                Schedule a Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products