
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Users, TrendingUp, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const steps = [
  {
    step: '01',
    title: 'Sign Up & Onboard',
    description: 'Get started in minutes with our simple onboarding process. Upload your menu, set your preferences, and customize your brand.',
    icon: Smartphone,
    color: 'from-[#093d30] to-[#093c2f]'
  },
  {
    step: '02',
    title: 'Launch Your App',
    description: 'Deploy your branded mobile and web app instantly. Your customers can start ordering directly from your platform.',
    icon: Users,
    color: 'from-[#093c2f] to-[#c9f268]'
  },
  {
    step: '03',
    title: 'Grow & Scale',
    description: 'Use our powerful analytics and marketing tools to understand your customers and grow your business sustainably.',
    icon: TrendingUp,
    color: 'from-[#c9f268] to-[#093d30]'
  }
];

const features = [
  'Zero commission fees',
  'Complete customer data ownership',
  'Branded mobile & web apps',
  'Real-time analytics dashboard',
  'Automated marketing campaigns',
  'Multi-location management',
  'Custom loyalty programs',
  'Integrated payment processing'
];

export default function HowItWorks() {
  return (
    <>
      <SEO 
        title="How It Works - Brandae"
        description="Learn how Brandae helps restaurants build their own ordering platform in 3 simple steps. Own your orders, own your customers, grow your business."
      />
      <div className="min-h-screen bg-brandae-dark">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                How It <span className="gradient-text">Works</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Transform your restaurant with our simple 3-step process. From setup to scale, 
                we'll help you build a thriving direct-to-consumer business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-brandae-gray border-2 border-[#c9f268] rounded-2xl p-8 h-full hover:shadow-lg hover:shadow-[#c9f268]/20 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-[#c9f268] text-sm font-semibold mb-2">STEP {step.step}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-[#c9f268]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-brandae-gray/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Everything You Need to <span className="gradient-text">Succeed</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our comprehensive platform includes all the tools you need to build, 
                manage, and grow your direct ordering business.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-brandae-gray border border-[#c9f268] rounded-xl p-6 hover:shadow-lg hover:shadow-[#c9f268]/20 transition-all duration-300"
                >
                  <CheckCircle className="w-6 h-6 text-[#c9f268] mb-3" />
                  <p className="text-white font-medium">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#093d30] to-[#093c2f] rounded-3xl p-12 border border-[#c9f268]"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of restaurants who have already taken control of their ordering business.
              </p>
              <button className="bg-[#c9f268] text-brandae-dark px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#b8e055] transition-colors">
                Start Your Free Trial
              </button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
