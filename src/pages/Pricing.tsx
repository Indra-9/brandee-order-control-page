import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/AnimatedButton';
import DemoFormModal from '@/components/DemoFormModal';
import { Check, Zap, Shield, Globe, Users, Smartphone, BarChart3, Star, Crown, Sparkles } from 'lucide-react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'halfyearly' | 'yearly'>('monthly');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  const basePrice = 399;
  const prices = {
    monthly: basePrice,
    halfyearly: Math.round(basePrice * 0.8), // 20% off
    yearly: Math.round(basePrice * 0.75) // 25% off
  };

  const animations = {
    fadeIn: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    },
    slideInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
      }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
    }
  };

  const getSavings = (cycle: string) => {
    if (cycle === 'halfyearly') return '20% OFF';
    if (cycle === 'yearly') return '25% OFF';
    return '';
  };

  const getTotalPrice = (cycle: string) => {
    if (cycle === 'halfyearly') return prices.halfyearly * 6;
    if (cycle === 'yearly') return prices.yearly * 12;
    return prices.monthly;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brandae-darker to-brandae-dark text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={animations.fadeIn} 
        className="container mx-auto pt-32 pb-20 px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-brandae-green/10 border border-brandae-green/30 rounded-full px-6 py-2 mb-8"
        >
          <Sparkles className="h-4 w-4 text-brandae-green" />
          <span className="text-brandae-green font-medium">Marketplace Solution</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          One Plan, <span className="gradient-text">Unlimited Growth</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
          Everything you need to build and scale your marketplace empire. No hidden fees, no limits, just pure growth.
        </p>

        {/* Billing Toggle */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16"
        >
          <div className="flex items-center bg-brandae-gray/50 backdrop-blur-md rounded-2xl p-2 border border-white/10">
            {['monthly', 'halfyearly', 'yearly'].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle as any)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 relative ${
                  billingCycle === cycle 
                    ? 'bg-brandae-green text-brandae-dark font-bold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {cycle === 'monthly' && 'Monthly'}
                {cycle === 'halfyearly' && 'Half Yearly'}
                {cycle === 'yearly' && 'Yearly'}
                {getSavings(cycle) && (
                  <span className="absolute -top-2 -right-2 bg-brandae-purple text-white text-xs px-2 py-1 rounded-full">
                    {getSavings(cycle)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Pricing Card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.scaleIn}
        className="container mx-auto px-4 pb-20"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-brandae-gray/80 to-brandae-dark/80 backdrop-blur-md rounded-3xl border-2 border-brandae-green/30 overflow-hidden shadow-2xl shadow-brandae-green/10"
          >
            {/* Premium Badge */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-brandae-purple to-brandae-green h-1"></div>
            <div className="bg-gradient-to-r from-brandae-purple/20 to-brandae-green/20 text-center py-4 border-b border-white/10">
              <div className="inline-flex items-center gap-2">
                <Crown className="h-5 w-5 text-brandae-green" />
                <span className="text-brandae-green font-bold">MARKETPLACE PLAN</span>
              </div>
            </div>

            <div className="p-12">
              {/* Pricing */}
              <div className="text-center mb-12">
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-6xl md:text-7xl font-bold text-brandae-green">
                    ${prices[billingCycle]}
                  </span>
                  <span className="text-2xl text-gray-400 ml-3">
                    /{billingCycle === 'yearly' ? 'month' : billingCycle === 'halfyearly' ? 'month' : 'month'}
                  </span>
                </div>
                {billingCycle !== 'monthly' && (
                  <div className="text-lg text-brandae-green mb-4">
                    Billed {billingCycle === 'yearly' ? 'annually' : 'every 6 months'} (${getTotalPrice(billingCycle)} total)
                  </div>
                )}
                <p className="text-xl text-gray-300">
                  Complete marketplace platform with unlimited potential
                </p>
              </div>

              {/* CTA Button */}
              <div className="text-center mb-12">
                <div onClick={() => setIsDemoModalOpen(true)}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <AnimatedButton variant="primary" size="lg" className="rounded-2xl px-12 py-4 text-xl font-bold">
                      Start Building Your Marketplace
                    </AnimatedButton>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-400 mt-3">30-day money-back guarantee</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Sections */}
      
      {/* Section 1: Core Platform */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <motion.div variants={animations.fadeIn} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brandae-purple/10 border border-brandae-purple/30 rounded-full px-6 py-2 mb-6">
            <Zap className="h-4 w-4 text-brandae-purple" />
            <span className="text-brandae-purple font-medium">Core Platform</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to Launch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get your marketplace up and running with our comprehensive platform that handles everything from vendors to customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Globe className="h-8 w-8" />,
              title: "Multi-Platform Presence",
              description: "Web, iOS, and Android apps for maximum reach and accessibility"
            },
            {
              icon: <Users className="h-8 w-8" />,
              title: "Unlimited Vendors",
              description: "Onboard as many vendors as you want with our scalable infrastructure"
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Zero Commission Fees",
              description: "Keep 100% of your earnings with our transparent pricing model"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={animations.fadeIn}
              whileHover={{ y: -5 }}
              className="bg-brandae-gray/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-brandae-green/30 transition-all duration-300"
            >
              <div className="text-brandae-green mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 2: Advanced Features */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.staggerContainer}
        className="container mx-auto px-4 py-20 bg-gradient-to-r from-brandae-purple/5 to-brandae-green/5"
      >
        <motion.div variants={animations.fadeIn} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brandae-green/10 border border-brandae-green/30 rounded-full px-6 py-2 mb-6">
            <Smartphone className="h-4 w-4 text-brandae-green" />
            <span className="text-brandae-green font-medium">Advanced Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Tools for Growth
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced marketplace features that help you optimize operations and maximize revenue.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Custom Branding & Design",
            "Real-time Order Tracking",
            "Integrated Payment Gateway",
            "Vendor Dashboard & Analytics",
            "Customer Loyalty Programs",
            "Dynamic Pricing & Offers",
            "Inventory Management",
            "Marketing Automation"
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={animations.fadeIn}
              whileHover={{ scale: 1.05 }}
              className="bg-brandae-gray/30 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-brandae-green/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-brandae-green flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 3: Business Intelligence */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={animations.slideInLeft}>
            <div className="inline-flex items-center gap-2 bg-brandae-purple/10 border border-brandae-purple/30 rounded-full px-6 py-2 mb-6">
              <BarChart3 className="h-4 w-4 text-brandae-purple" />
              <span className="text-brandae-purple font-medium">Business Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Data-Driven Decisions
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive analytics and reporting tools to help you understand your marketplace performance and make informed decisions.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time Revenue Tracking",
                "Vendor Performance Analytics",
                "Customer Behavior Insights",
                "Commission Management",
                "Custom Report Generation"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-brandae-green" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            variants={animations.slideInRight}
            className="bg-gradient-to-br from-brandae-gray/50 to-brandae-dark/50 backdrop-blur-md rounded-3xl p-8 border border-white/10"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Revenue Growth", value: "+285%" },
                { label: "Active Vendors", value: "1,250+" },
                { label: "Monthly Orders", value: "45K+" },
                { label: "Customer Satisfaction", value: "98.5%" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-brandae-green mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 4: Scalability */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.staggerContainer}
        className="container mx-auto px-4 py-20 bg-gradient-to-r from-brandae-green/5 to-brandae-purple/5"
      >
        <motion.div variants={animations.fadeIn} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brandae-green/10 border border-brandae-green/30 rounded-full px-6 py-2 mb-6">
            <Zap className="h-4 w-4 text-brandae-green" />
            <span className="text-brandae-green font-medium">Enterprise Ready</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built to Scale with You
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our infrastructure grows with your business, handling everything from startup to enterprise-level traffic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "99.9% Uptime",
              description: "Reliable infrastructure ensures your marketplace is always available",
              icon: <Shield className="h-12 w-12 text-brandae-green" />
            },
            {
              title: "Global CDN",
              description: "Lightning-fast loading times worldwide with our content delivery network",
              icon: <Globe className="h-12 w-12 text-brandae-purple" />
            },
            {
              title: "Auto-Scaling",
              description: "Seamlessly handle traffic spikes during peak seasons and promotions",
              icon: <Zap className="h-12 w-12 text-brandae-green" />
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={animations.fadeIn}
              whileHover={{ y: -10 }}
              className="text-center bg-brandae-gray/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-brandae-green/30 transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 5: Support & Integration */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={animations.slideInLeft}
            className="bg-gradient-to-br from-brandae-purple/20 to-brandae-green/20 backdrop-blur-md rounded-3xl p-12 border border-white/10"
          >
            <h3 className="text-3xl font-bold mb-6">24/7 Expert Support</h3>
            <p className="text-xl text-gray-300 mb-8">
              Our dedicated team is here to help you succeed at every step of your marketplace journey.
            </p>
            <ul className="space-y-4">
              {[
                "Dedicated account manager",
                "Technical integration support",
                "Business growth consultation",
                "Priority email & chat support"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-brandae-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={animations.slideInRight}>
            <div className="inline-flex items-center gap-2 bg-brandae-green/10 border border-brandae-green/30 rounded-full px-6 py-2 mb-6">
              <Users className="h-4 w-4 text-brandae-green" />
              <span className="text-brandae-green font-medium">Integration Ready</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect with all your favorite tools and services to create the perfect marketplace ecosystem.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Payment Gateways",
                "CRM Systems",
                "Email Marketing",
                "SMS Providers",
                "Social Media",
                "Analytics Tools"
              ].map((integration, index) => (
                <div key={index} className="bg-brandae-gray/30 rounded-xl p-4 text-center border border-white/10">
                  <span className="font-medium">{integration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 6: FAQ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.staggerContainer}
        className="container mx-auto px-4 py-20 bg-gradient-to-r from-brandae-dark/50 to-brandae-gray/50"
      >
        <motion.div variants={animations.fadeIn} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about our marketplace platform
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              question: "How quickly can I launch my marketplace?",
              answer: "Most marketplaces are live within 2-3 weeks, including custom branding, vendor onboarding, and app store approvals."
            },
            {
              question: "Is there a limit on the number of vendors?",
              answer: "No limits! Our platform scales seamlessly to support unlimited vendors and can handle enterprise-level traffic."
            },
            {
              question: "What payment methods are supported?",
              answer: "We support all major payment gateways including Stripe, PayPal, and regional providers for global reach."
            },
            {
              question: "Do you provide technical support?",
              answer: "Yes! 24/7 technical support, dedicated account management, and business growth consultation are included."
            },
            {
              question: "Can I customize the design and branding?",
              answer: "Absolutely! Full white-label customization with your branding, colors, and design preferences."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={animations.fadeIn}
              className="bg-brandae-gray/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-brandae-green/30 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-brandae-green">{faq.question}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Final CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.fadeIn}
        className="container mx-auto px-4 py-20 text-center"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brandae-purple/20 to-brandae-green/20 backdrop-blur-md p-16 rounded-3xl border border-white/10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brandae-green/20 border border-brandae-green/30 rounded-full px-6 py-2 mb-8"
          >
            <Crown className="h-4 w-4 text-brandae-green" />
            <span className="text-brandae-green font-medium">Ready to Launch?</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Start Your Marketplace Journey Today
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join successful marketplace owners who chose our platform to build their business empire. No setup fees, no hidden costs.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
            <div onClick={() => setIsDemoModalOpen(true)}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <AnimatedButton variant="primary" size="lg" className="rounded-2xl px-12 py-4 text-xl font-bold">
                  Book Free Demo
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brandae-green" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brandae-green" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brandae-green" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <DemoFormModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
}