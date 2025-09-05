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
  ArrowLeft,
  Clock,
  Star
} from 'lucide-react'

export default function GetStarted() {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  const solutions = [
    {
      id: 'cs2-health',
      icon: <Heart className="w-12 h-12" />,
      title: 'CS2 Health',
      description: 'AI-powered healthcare solution for clinicians',
      features: ['Knowledge Base Agent', 'Clinical Notes Transcription', 'EHR Integration'],
      pricing: 'Starting at $299/month',
      timeline: '2-4 weeks implementation',
      bestFor: 'Healthcare providers, clinics, hospitals'
    },
    {
      id: 'b2b-ecommerce',
      icon: <ShoppingCart className="w-12 h-12" />,
      title: 'B2B AI Ecommerce',
      description: 'Intelligent B2B commerce platform',
      features: ['AI Personalization', 'Smart Search', 'Automated Procurement'],
      pricing: 'Custom pricing',
      timeline: '4-8 weeks implementation',
      bestFor: 'B2B retailers, distributors, manufacturers'
    },
    {
      id: 'ai-chatbot',
      icon: <MessageSquare className="w-12 h-12" />,
      title: 'AI Chatbot',
      description: 'Custom conversational AI for your business',
      features: ['Natural Language Processing', 'Multi-language Support', 'Custom Training'],
      pricing: 'Starting at $199/month',
      timeline: '1-3 weeks implementation',
      bestFor: 'Any business needing customer support'
    },
    {
      id: 'custom-ai',
      icon: <Brain className="w-12 h-12" />,
      title: 'Custom AI Solution',
      description: 'Tailored AI solution for your specific needs',
      features: ['Custom Development', 'Dedicated Support', 'Full Integration'],
      pricing: 'Quote on request',
      timeline: '6-12 weeks implementation',
      bestFor: 'Large enterprises with specific requirements'
    }
  ]

  const steps = [
    { number: 1, title: 'Choose Your Solution', description: 'Select the AI solution that best fits your needs' },
    { number: 2, title: 'Tell Us About You', description: 'Share your business requirements and goals' },
    { number: 3, title: 'Get Your Quote', description: 'Receive a customized proposal and timeline' }
  ]

  const handleSolutionSelect = (solutionId: string) => {
    setSelectedSolution(solutionId)
    setCurrentStep(2)
  }

  const selectedSolutionData = solutions.find(s => s.id === selectedSolution)

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
              Get Started with
              <span className="text-gradient block mt-2">CS2 Technologies</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your business with AI in just a few simple steps. 
              Choose your solution and we'll guide you through the process.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-gray-300 text-gray-300'
                  }`}>
                    {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Choose Solution */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Choose Your AI Solution</h2>
                <p className="text-gray-600">Select the solution that best matches your business needs</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {solutions.map((solution) => (
                  <Card 
                    key={solution.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary"
                    onClick={() => handleSolutionSelect(solution.id)}
                  >
                    <CardHeader>
                      <div className="text-primary mb-4">{solution.icon}</div>
                      <CardTitle className="text-xl">{solution.title}</CardTitle>
                      <CardDescription>{solution.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {solution.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-xs text-gray-500">Pricing</p>
                            <p className="font-semibold text-sm">{solution.pricing}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Timeline</p>
                            <p className="font-semibold text-sm">{solution.timeline}</p>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-xs text-gray-500">Best for: {solution.bestFor}</p>
                        </div>
                        
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Select This Solution
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Tell Us About You */}
          {currentStep === 2 && selectedSolutionData && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-3xl mx-auto">
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentStep(1)}
                  className="mb-6"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Solutions
                </Button>
                
                <div className="text-center mb-8">
                  <div className="text-primary mb-4">{selectedSolutionData.icon}</div>
                  <h2 className="text-3xl font-bold mb-2">Tell Us About Your Business</h2>
                  <p className="text-gray-600">
                    You've selected <strong>{selectedSolutionData.title}</strong>. 
                    Help us understand your needs better.
                  </p>
                </div>

                <Card>
                  <CardContent className="p-8">
                    <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Company *</label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Company Size</label>
                          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">Select size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="500+">500+ employees</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Current Challenges</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          placeholder="What challenges are you hoping to solve with AI?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Timeline</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">When do you need this implemented?</option>
                          <option value="asap">ASAP</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="3-months">Within 3 months</option>
                          <option value="6-months">Within 6 months</option>
                          <option value="exploring">Just exploring</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Budget Range (Optional)</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">Select budget range</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-15k">$5,000 - $15,000</option>
                          <option value="15k-50k">$15,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k+">$100,000+</option>
                        </select>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentStep(3)
                        }}
                      >
                        Get My Custom Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 3: Get Quote */}
          {currentStep === 3 && selectedSolutionData && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-3xl mx-auto text-center">
                <div className="mb-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
                  <p className="text-xl text-gray-600 mb-6">
                    We've received your information and will prepare a custom proposal for {selectedSolutionData.title}.
                  </p>
                </div>

                <Card className="text-left mb-8">
                  <CardHeader>
                    <CardTitle>What Happens Next?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-primary mr-3 mt-1" />
                        <div>
                          <h4 className="font-semibold">Within 24 Hours</h4>
                          <p className="text-gray-600 text-sm">Our team will review your requirements and prepare a detailed proposal</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="w-5 h-5 text-primary mr-3 mt-1" />
                        <div>
                          <h4 className="font-semibold">Personal Consultation</h4>
                          <p className="text-gray-600 text-sm">We'll schedule a call to discuss your needs and answer any questions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Star className="w-5 h-5 text-primary mr-3 mt-1" />
                        <div>
                          <h4 className="font-semibold">Custom Demo</h4>
                          <p className="text-gray-600 text-sm">See exactly how our solution will work for your specific use case</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/demo">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Schedule Demo Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/solutions">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Explore More Solutions
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}