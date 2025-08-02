import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Palette, 
  Rocket, 
  Megaphone, 
  BarChart3, 
  Store,
  Smartphone,
  TrendingUp,
  Users,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2,
  Play
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StepCard from '@/components/StepCard';
import AnimatedButton from '@/components/AnimatedButton';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';

export default function HowItWorks() {
  const launchSteps = [
    {
      number: 1,
      title: "Onboard Your Brand & Locations",
      description: "Upload your logo, store details, products, and delivery zones.",
      icon: <Upload className="w-12 h-12" />,
      details: ["Brand assets & logo", "Store information", "Product catalog", "Delivery zones"]
    },
    {
      number: 2,
      title: "Customize Your Storefront", 
      description: "Choose layout, offers, brand colors, and product images.",
      icon: <Palette className="w-12 h-12" />,
      details: ["Custom layouts", "Brand colors", "Special offers", "Product imagery"]
    },
    {
      number: 3,
      title: "Launch Your Apps",
      description: "We publish your mobile & web apps — ready to receive real orders.",
      icon: <Rocket className="w-12 h-12" />,
      details: ["Mobile app", "Web platform", "Order processing", "Live deployment"]
    },
    {
      number: 4,
      title: "Activate Delivery & Marketing",
      description: "Add delivery agents, start cashback/referral campaigns instantly.",
      icon: <Megaphone className="w-12 h-12" />,
      details: ["Delivery network", "Cashback campaigns", "Referral programs", "Marketing tools"]
    },
    {
      number: 5,
      title: "Manage & Grow",
      description: "Track insights, optimize pricing, upsell products, and scale across cities.",
      icon: <BarChart3 className="w-12 h-12" />,
      details: ["Analytics dashboard", "Price optimization", "Upselling tools", "Multi-city scaling"]
    }
  ];

  const platformFeatures = [
    {
      title: "Multi-Store Management",
      description: "Manage multiple store locations from a single dashboard with unified inventory and pricing.",
      icon: <Store className="w-8 h-8" />
    },
    {
      title: "Mobile-First Experience", 
      description: "Native mobile apps for both iOS and Android with seamless web integration.",
      icon: <Smartphone className="w-8 h-8" />
    },
    {
      title: "Growth Analytics",
      description: "Real-time insights into customer behavior, sales trends, and performance metrics.",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      title: "Customer Engagement",
      description: "Built-in tools for customer communication, feedback collection, and loyalty programs.",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const benefits = [
    "Launch in under 48 hours",
    "No technical expertise required", 
    "Built-in marketing tools",
    "Multi-platform deployment",
    "Real-time order tracking",
    "Automated delivery management"
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="How It Works - Launch Your Commerce Platform in 5 Steps"
        description="Launch your branded commerce platform in 5 simple steps. From onboarding to growth, discover how easy it is to start your digital commerce journey."
        keywords="launch commerce platform, branded apps, mobile commerce, e-commerce setup, digital storefront"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Launch Your <span className="gradient-text">Branded</span> Commerce Platform in 
              <span className="gradient-text"> 5 Simple Steps</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Transform your business with a complete digital commerce solution. 
              From setup to scale, we handle the complexity while you focus on growth.
            </p>
            
            {/* Demo Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-brandae-green/20 to-brandae-purple/20 rounded-3xl p-4 border border-brandae-green/30">
                <div className="relative aspect-video bg-brandae-gray rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brandae-dark/80 to-brandae-gray/80">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-brandae-green/20 backdrop-blur-sm border-2 border-brandae-green rounded-full p-8 hover:bg-brandae-green/30 transition-all duration-300 group"
                    >
                      <Play className="w-16 h-16 text-brandae-green ml-2 group-hover:scale-110 transition-transform" />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2">
                    <span className="text-white font-medium">Watch Demo (3:45)</span>
                  </div>
                  <div className="absolute top-6 right-6 bg-brandae-green/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <span className="text-brandae-green font-medium">Live Demo</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mt-6 text-lg">
                See how businesses launch their branded commerce platform and achieve 
                <span className="text-brandae-green font-semibold"> 3x faster growth</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Launch Steps */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your <span className="gradient-text">Launch Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From concept to live platform in 5 streamlined steps. 
              No technical knowledge required, just your vision.
            </p>
          </motion.div>

          <div className="space-y-12">
            {launchSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Step Content */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-brandae-gray to-brandae-gray/70 rounded-3xl p-8 border border-brandae-green/30 hover:border-brandae-green/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-brandae-green">
                        {step.icon}
                      </div>
                      <div className="w-16 h-16 bg-brandae-green rounded-2xl flex items-center justify-center text-brandae-dark font-bold text-2xl">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: (index * 0.2) + (detailIndex * 0.1) }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-brandae-green flex-shrink-0" />
                          <span className="text-gray-300">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Step Visual */}
                <div className="flex-1">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 rounded-3xl p-12 border border-brandae-green/20">
                      <div className="aspect-square bg-brandae-dark rounded-2xl flex items-center justify-center relative overflow-hidden">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-4 border-2 border-brandae-green/20 border-t-brandae-green rounded-full"
                        />
                        <div className="text-6xl text-brandae-green/80">
                          {step.icon}
                        </div>
                      </div>
                      <div className="text-center mt-6">
                        <div className="text-brandae-green font-bold text-lg">
                          Step {step.number} of {launchSteps.length}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Arrow */}
                {index < launchSteps.length - 1 && (
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:mt-8 flex justify-center"
                  >
                    <ArrowRight className="w-8 h-8 text-brandae-green/50 rotate-90 lg:rotate-0" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-brandae-gray/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span> Built In
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to run a successful commerce platform, 
              from day one to enterprise scale.
            </p>
          </motion.div>

          <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <BentoGridItem
                key={feature.title}
                delay={index}
                gradient={index % 2 === 0 ? "brand-dark" : "green"}
                className="p-8"
              >
                <div className="text-brandae-green mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </BentoGridItem>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Benefits & CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Choose Our <span className="gradient-text">Platform</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Join thousands of businesses that have transformed their operations 
                and accelerated growth with our comprehensive commerce solution.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 bg-brandae-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-brandae-green" />
                    </div>
                    <span className="text-gray-300 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <AnimatedButton variant="primary" size="lg" className="flex-1">
                  Start Your Platform
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg" className="flex-1">
                  View Demo
                </AnimatedButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 rounded-3xl p-12 border border-brandae-green/30">
                <div className="space-y-8">
                  {/* Success Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { metric: "3x", label: "Faster Growth" },
                      { metric: "48h", label: "Launch Time" },
                      { metric: "99.9%", label: "Uptime" },
                      { metric: "24/7", label: "Support" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="text-center bg-brandae-dark/50 rounded-2xl p-6 border border-brandae-green/20"
                      >
                        <div className="text-3xl font-bold text-brandae-green mb-2">
                          {stat.metric}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Testimonial */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-brandae-dark/50 rounded-2xl p-8 border border-brandae-green/20"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-brandae-green fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">
                      "We launched our platform in just 2 days and saw immediate results. 
                      The built-in marketing tools alone saved us months of development."
                    </p>
                    <div className="text-brandae-green font-semibold">
                      — Sarah Chen, CEO
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}