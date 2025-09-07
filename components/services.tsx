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
  Zap,
  Building2,
  Server,
  Briefcase
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
      icon: <Building2 className="w-10 h-10" />,
      title: "Enterprise Java Solutions",
      description: "Modern and legacy Java enterprise application development and maintenance",
      features: ["Spring Boot & Spring AI", "Microservices Architecture", "J2EE/EJB Migration", "Legacy System Modernization"]
    },
    {
      icon: <Server className="w-10 h-10" />,
      title: "Cloud Infrastructure",
      description: "Multi-cloud infrastructure with OpenStack, AWS, and Google Cloud expertise",
      features: ["OpenStack Deployment", "Private Cloud Solutions", "Hybrid Cloud Architecture", "Infrastructure as Code"]
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
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full text-primary font-medium mb-4 shadow-sm">
            <Briefcase className="w-4 h-4 mr-2" />
            Our Services
          </div>
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

        {/* Enterprise Solutions Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-heading-lg font-display text-white text-center mb-12">
            Enterprise Solutions & Legacy Modernization
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-heading-sm font-display text-white mb-4">
                Java Enterprise Development
              </h4>
              <p className="text-body-md text-gray-200 mb-4 font-body">
                Comprehensive Java enterprise solutions leveraging modern frameworks and maintaining legacy systems
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-body-sm">Spring Boot & Spring Cloud microservices</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-body-sm">Spring AI for intelligent applications</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-body-sm">J2EE, EJB, and legacy Java maintenance</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-body-sm">WebSphere, WebLogic, JBoss expertise</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-heading-sm font-display text-white mb-4">
                Legacy System Modernization
              </h4>
              <p className="text-body-md text-gray-200 mb-4 font-body">
                Transform and modernize your legacy infrastructure while maintaining business continuity
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-body-sm">COBOL to Java/Cloud migration</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-body-sm">Monolith to microservices transformation</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-body-sm">Database modernization & migration</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-body-sm">API-first architecture implementation</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-body-lg text-gray-300 font-body">
              20+ years of experience in enterprise Java development and legacy system transformation
            </p>
          </div>
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
        <div className="relative bg-gradient-to-br from-white via-primary/5 to-blue-500/10 rounded-2xl p-6 md:p-8 overflow-hidden">
          {/* Subtle animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5 opacity-50"></div>
          
          <div className="relative z-10">
            <h3 className="text-heading-lg font-display text-gray-900 text-center mb-3">
              Technologies We Work With
            </h3>
            <p className="text-center text-gray-600 mb-8 text-body-md max-w-2xl mx-auto">
              Leveraging cutting-edge tools and frameworks to deliver enterprise-grade solutions
            </p>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* AI & Data */}
              <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-heading-sm font-display text-gray-900 ml-3">
                    AI & Data
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "LangChain", "Spring AI"].map((tech, index) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-gradient-to-r from-purple-50 to-primary/10 text-gray-700 text-xs font-medium rounded-md border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100 transition-all duration-200 cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Enterprise */}
              <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-heading-sm font-display text-gray-900 ml-3">
                    Enterprise
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "Spring Cloud", "J2EE/EJB", "Hibernate", "Apache Kafka", "Maven/Gradle"].map((tech, index) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-gradient-to-r from-orange-50 to-red-50 text-gray-700 text-xs font-medium rounded-md border border-orange-200/50 hover:border-orange-300 hover:bg-orange-100 transition-all duration-200 cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Modern Stack */}
              <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-heading-sm font-display text-gray-900 ml-3">
                    Modern Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "TypeScript", "GraphQL", "REST APIs", "Microservices"].map((tech, index) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-gradient-to-r from-green-50 to-teal-50 text-gray-700 text-xs font-medium rounded-md border border-green-200/50 hover:border-green-300 hover:bg-green-100 transition-all duration-200 cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Infrastructure */}
              <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-heading-sm font-display text-gray-900 ml-3">
                    Infrastructure
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["OpenStack", "AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Ansible"].map((tech, index) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-700 text-xs font-medium rounded-md border border-blue-200/50 hover:border-blue-300 hover:bg-blue-100 transition-all duration-200 cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Statistics Bar */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30+</div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-gray-600">Core Domains</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600">Cloud Native</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Services
