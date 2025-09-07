'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Code2, 
  Database, 
  Cloud, 
  Brain,
  Smartphone,
  Shield,
  GitBranch,
  Server,
  Network,
  Globe2,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Zap,
  Layers,
  Cpu,
  Monitor,
  Terminal,
  Workflow,
  Calendar
} from 'lucide-react'

const Expertise = () => {
  const technicalExpertise = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Advanced neural networks, NLP, computer vision, and MLOps pipelines",
      technologies: ["TensorFlow", "PyTorch", "Hugging Face", "OpenAI", "LangChain"]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Architecture",
      description: "Scalable microservices, containerization, and serverless computing",
      technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform"]
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Full-Stack Development", 
      description: "Modern web applications with responsive design and real-time features",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Engineering",
      description: "Big data processing, data pipelines, and analytics infrastructure",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Apache Kafka"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Cross-platform mobile apps with native performance and user experience",
      technologies: ["React Native", "Flutter", "iOS", "Android", "Progressive PWA"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Compliance",
      description: "Enterprise security, encryption, and regulatory compliance frameworks",
      technologies: ["OAuth", "JWT", "HIPAA", "SOC 2", "Penetration Testing"]
    }
  ]

  const developmentPractices = [
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "DevOps & CI/CD",
      description: "Automated testing, deployment pipelines, and infrastructure as code"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Monitoring & Analytics",
      description: "Real-time system monitoring, performance optimization, and user analytics"
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "API Architecture",
      description: "RESTful APIs, GraphQL, and microservices with comprehensive documentation"
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Agile Development",
      description: "Scrum methodology, continuous integration, and iterative development cycles"
    }
  ]

  const achievements = [
    {
      metric: "15+",
      label: "Years of Experience",
      description: "In software development and technology consulting"
    },
    {
      metric: "100+",
      label: "Projects Delivered",
      description: "Enterprise applications and AI solutions deployed globally"
    },
    {
      metric: "99.9%",
      label: "Uptime Achieved",
      description: "Average system reliability across production environments"
    },
    {
      metric: "24/7",
      label: "Support Available",
      description: "Continuous monitoring and maintenance services"
    }
  ]

  const techStack = [
    "Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "TensorFlow", "PyTorch", "AWS", "Google Cloud", "Docker", "Kubernetes",
    "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST APIs", "Microservices"
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full text-primary font-medium mb-4 shadow-sm">
            <Cpu className="w-4 h-4 mr-2" />
            Technology Expertise
          </div>
          <h2 className="text-display-sm font-display text-gray-900 mb-6">
            Built on Technical Excellence
          </h2>
          <p className="text-body-lg text-gray-600 max-w-3xl mx-auto font-body">
            Our comprehensive technology stack and development practices enable us to deliver 
            enterprise-grade solutions that scale, perform, and innovate.
          </p>
        </div>

        {/* Core Technical Expertise */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technicalExpertise.map((item, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-lg text-white mr-4">
                  {item.icon}
                </div>
                <h3 className="text-heading-sm font-display text-gray-900">{item.title}</h3>
              </div>
              
              <p className="text-body-md text-gray-600 mb-4 font-body">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Development Practices */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-16 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-heading-lg font-display text-gray-900 mb-4">
              Development Excellence
            </h3>
            <p className="text-body-md text-gray-600 font-body max-w-2xl mx-auto">
              We follow industry best practices and modern development methodologies 
              to ensure code quality, maintainability, and scalability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentPractices.map((practice, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500/10 to-primary/10 rounded-lg text-primary">
                    {practice.icon}
                  </div>
                </div>
                <h4 className="text-heading-sm font-display text-gray-900 mb-2">
                  {practice.title}
                </h4>
                <p className="text-body-sm text-gray-600 font-body">
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="text-center mb-16">
          <h3 className="text-heading-lg font-display text-gray-900 mb-6">
            Our Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 text-body-sm font-medium text-gray-700 border border-gray-200 hover:border-primary/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg"
            >
              <div className="text-display-sm font-display text-primary mb-2">
                {achievement.metric}
              </div>
              <div className="text-body-md font-display font-semibold text-gray-900 mb-1">
                {achievement.label}
              </div>
              <div className="text-body-sm text-gray-600 font-body">
                {achievement.description}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl p-8 text-white text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-heading-lg font-display mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-8 font-body">
              Let's discuss how our technical expertise can help you achieve your goals. 
              From concept to deployment, we're here to make your vision a reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact/">
                <Button className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3">
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Start Your Project
                </Button>
              </Link>
              <Link href="/demo/">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary px-6 py-3"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Expertise