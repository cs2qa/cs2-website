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
  Calendar,
  Clock,
  Video,
  Phone,
  Star,
  Award,
  Zap,
  Shield,
  PlayCircle,
  AlertCircle
} from 'lucide-react'

type SubmitStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

export default function ScheduleDemo() {
  const [selectedDemo, setSelectedDemo] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmitStatus>({ kind: 'idle' })
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    additionalInfo: ''
  })

  const demoTypes = [
    {
      id: 'cs2-health',
      icon: <Heart className="w-8 h-8" />,
      title: 'CS2 Health Demo',
      duration: '30 minutes',
      description: 'See how AI transforms healthcare workflows',
      features: [
        'Live Knowledge Base Agent demonstration',
        'Clinical notes transcription in action',
        'EHR integration walkthrough',
        'ROI calculator and pricing discussion'
      ]
    },
    {
      id: 'b2b-ecommerce',
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'B2B Commerce Demo',
      duration: '45 minutes',
      description: 'Experience intelligent B2B commerce platform',
      features: [
        'AI-powered product recommendations',
        'Smart search and discovery',
        'Automated procurement demo',
        'Analytics and reporting overview'
      ]
    },
    {
      id: 'ai-chatbot',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'AI Chatbot Demo',
      duration: '20 minutes',
      description: 'Interactive chatbot capabilities showcase',
      features: [
        'Natural language conversation demo',
        'Multi-language support showcase',
        'Integration possibilities',
        'Customization options overview'
      ]
    },
    {
      id: 'custom-solution',
      icon: <Brain className="w-8 h-8" />,
      title: 'Custom AI Consultation',
      duration: '60 minutes',
      description: 'Discuss your specific AI needs and possibilities',
      features: [
        'Business requirements analysis',
        'AI feasibility assessment',
        'Technology recommendations',
        'Implementation roadmap discussion'
      ]
    }
  ]

  const timeSlots = [
    { id: 'morning', label: 'Morning (9:00 AM - 12:00 PM)', available: true },
    { id: 'afternoon', label: 'Afternoon (1:00 PM - 5:00 PM)', available: true },
    { id: 'evening', label: 'Evening (6:00 PM - 8:00 PM)', available: true }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ kind: 'submitting' })

    try {
      const demoType = demoTypes.find(demo => demo.id === selectedDemo)
      const timeSlot = timeSlots.find(slot => slot.id === selectedTime)

      // Get API URL from environment or use placeholder
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL || 'YOUR_API_GATEWAY_URL_HERE'

      const emailData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        subject: `Demo Request - ${demoType?.title}`,
        message: `Demo Request Details:

Demo Type: ${demoType?.title} (${demoType?.duration})
Preferred Time: ${timeSlot?.label}
Job Title: ${formData.jobTitle || 'Not provided'}
Company: ${formData.company}
Phone: ${formData.phone}

Additional Information:
${formData.additionalInfo || 'None provided'}

Demo Features Requested:
${demoType?.features.map(feature => `• ${feature}`).join('\n')}
        `
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setStatus({ kind: 'success' })
      setFormSubmitted(true)

    } catch (error) {
      console.error('Error submitting demo request:', error)
      const message =
        error instanceof Error && error.message
          ? `We couldn't schedule your demo: ${error.message}. Please try again or email info@cs2technologies.ca.`
          : "We couldn't schedule your demo. Please try again or email info@cs2technologies.ca."
      setStatus({ kind: 'error', message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (formSubmitted) {
    return (
      <main className="min-h-screen">
        <Navigation />
        
        <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Demo Scheduled Successfully!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for scheduling a demo with CS2 Technologies. We're excited to show you 
                how our AI solutions can transform your business.
              </p>

              <Card className="text-left mb-8">
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold">Calendar Invite</h4>
                        <p className="text-gray-600 text-sm">You'll receive a calendar invite with Zoom/Teams link within the next hour</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold">Pre-Demo Call</h4>
                        <p className="text-gray-600 text-sm">Our team may reach out 24 hours before to understand your specific needs</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <PlayCircle className="w-5 h-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold">Interactive Demo</h4>
                        <p className="text-gray-600 text-sm">Live demonstration tailored to your use case with Q&A session</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold">Next Steps Discussion</h4>
                        <p className="text-gray-600 text-sm">Pricing, timeline, and implementation planning if you're interested</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/enterprise/get-started/">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/enterprise/solutions/">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Explore Solutions
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
              Schedule Your
              <span className="text-gradient block mt-2">Personalized Demo</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See our AI solutions in action with a live, interactive demonstration 
              tailored to your specific business needs and use cases.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Why Schedule a Demo?</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Video className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Live Interactive Experience</h3>
                    <p className="text-gray-600">See our AI solutions working with real data, not just screenshots or videos.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Tailored to Your Needs</h3>
                    <p className="text-gray-600">We customize the demo to show exactly how our solutions fit your business.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">No Time Wasted</h3>
                    <p className="text-gray-600">Focused sessions that respect your time while covering what matters most.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Expert Guidance</h3>
                    <p className="text-gray-600">Direct access to our AI specialists and implementation experts.</p>
                  </div>
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">What Our Customers Say</h3>
                  <blockquote className="text-blue-800 italic mb-3">
                    "The demo was incredibly impressive. Within 30 minutes, I could see exactly how CS2 Health would fit into our workflow and save us hours every day."
                  </blockquote>
                  <p className="text-sm text-blue-700">— Dr. Sarah Johnson, Regional Medical Center</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Demo</CardTitle>
                  <CardDescription>
                    Choose your preferred solution demo and we'll schedule a personalized session.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {status.kind === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="mb-6 flex items-start gap-3 rounded-xl border-2 border-red-500 bg-red-50 p-4"
                    >
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900">
                          We couldn&apos;t schedule your demo.
                        </p>
                        <p className="text-sm text-red-800 mt-1">
                          {status.message}
                        </p>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Demo Type Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Which solution interests you most? *
                      </label>
                      <div className="grid gap-3">
                        {demoTypes.map((demo) => (
                          <div
                            key={demo.id}
                            className={`cursor-pointer border-2 rounded-lg p-4 transition-colors ${
                              selectedDemo === demo.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedDemo(demo.id)}
                          >
                            <div className="flex items-start">
                              <div className="text-primary mr-3">{demo.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold">{demo.title}</h4>
                                  <span className="text-sm text-gray-500">{demo.duration}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{demo.description}</p>
                                <ul className="text-xs text-gray-500">
                                  {demo.features.slice(0, 2).map((feature, idx) => (
                                    <li key={idx}>• {feature}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company *</label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Job Title</label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Preferred Time *
                      </label>
                      <div className="space-y-2">
                        {timeSlots.map((slot) => (
                          <label
                            key={slot.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedTime === slot.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <input
                              type="radio"
                              name="timeSlot"
                              value={slot.id}
                              checked={selectedTime === slot.id}
                              onChange={(e) => setSelectedTime(e.target.value)}
                              disabled={!slot.available}
                              className="sr-only"
                            />
                            <Clock className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="font-medium">{slot.label}</span>
                            {!slot.available && (
                              <span className="ml-auto text-sm text-red-600">Not Available</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Anything specific you'd like to see in the demo?
                      </label>
                      <textarea
                        rows={3}
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="e.g., integration with our current system, specific use cases, ROI calculations..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={!selectedDemo || !selectedTime || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.company || isSubmitting}
                    >
                      {isSubmitting ? 'Scheduling...' : 'Schedule My Demo'}
                      <Calendar className="ml-2 w-4 h-4" />
                    </Button>

                    {(!selectedDemo || !selectedTime || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.company) && (
                      <p className="text-center text-sm text-gray-500 mt-2">
                        Please complete all required fields and selections above
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>

              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>No spam</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>No obligation</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Expert guidance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}