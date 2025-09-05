'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Brain, Cloud, Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center mb-6 space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-body-sm font-medium text-gray-600 tracking-wide uppercase">Leading Innovation in AI</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          
          <h1 className="text-display-lg md:text-display-lg font-display text-gray-900 mb-6 leading-none">
            Transforming Business with
            <span className="text-gradient block mt-2">Intelligent Solutions</span>
          </h1>
          
          <p className="text-body-lg md:text-body-lg text-gray-600 mb-8 max-w-3xl mx-auto font-body leading-relaxed">
            From telecommunications expertise to cutting-edge AI innovation. 
            CS2 Technologies delivers transformative healthcare and business solutions 
            powered by advanced artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/solutions">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                Explore Our Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Schedule Demo
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Cloud className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-heading-sm font-display mb-2">Cloud-Native Solutions</h3>
              <p className="text-body-md text-gray-600 font-body">Scalable AWS & Google Cloud deployments</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Brain className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-heading-sm font-display mb-2">AI-Powered Innovation</h3>
              <p className="text-body-md text-gray-600 font-body">RAG, LLMs, and Knowledge Graphs</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Sparkles className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-heading-sm font-display mb-2">Healthcare Excellence</h3>
              <p className="text-body-md text-gray-600 font-body">Transforming clinical workflows with AI</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero