
import React from 'react';
import { motion } from 'framer-motion';
import { Store, Users, Calendar, ShoppingBag, Truck, Star, ArrowRight, CheckCircle, Play, Zap, Globe, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import StepCard from '@/components/StepCard';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Sellers Register & Setup",
      description: "Shop owners register on our platform, create their digital storefront, and list their products and bookable services.",
      icon: <Store className="w-12 h-12" />
    },
    {
      number: 2,
      title: "Customers Browse & Discover",
      description: "Customers explore multiple vendors, compare products and services, read reviews, and make informed decisions.",
      icon: <Users className="w-12 h-12" />
    },
    {
      number: 3,
      title: "Book & Order Seamlessly",
      description: "Customers can instantly book services, order products, and schedule appointments all in one unified experience.",
      icon: <Calendar className="w-12 h-12" />
    },
    {
      number: 4,
      title: "Secure Transactions",
      description: "Integrated payment processing ensures secure transactions between customers and vendors with automated payouts.",
      icon: <ShoppingBag className="w-12 h-12" />
    },
    {
      number: 5,
      title: "Delivery & Fulfillment",
      description: "Our delivery network ensures products reach customers while service bookings are managed efficiently.",
      icon: <Truck className="w-12 h-12" />
    },
    {
      number: 6,
      title: "Reviews & Growth",
      description: "Customer feedback drives quality improvement, helping vendors grow their business and reputation.",
      icon: <Star className="w-12 h-12" />
    }
  ];

  const features = [
    {
      title: "Multi-Vendor Marketplace",
      description: "Enable multiple sellers to operate their own digital storefronts under one unified platform.",
      icon: <Store className="w-8 h-8" />
    },
    {
      title: "Integrated Booking System",
      description: "Seamlessly manage both product sales and service bookings with real-time availability.",
      icon: <Calendar className="w-8 h-8" />
    },
    {
      title: "Delivery Network",
      description: "Connect with delivery services to ensure reliable fulfillment and customer satisfaction.",
      icon: <Truck className="w-8 h-8" />
    },
    {
      title: "Customer Interaction Hub",
      description: "Foster direct communication between customers and vendors for better service delivery.",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const platformStats = [
    { number: "500+", label: "Active Businesses", icon: <Store className="w-6 h-6" /> },
    { number: "10K+", label: "Daily Orders", icon: <ShoppingBag className="w-6 h-6" /> },
    { number: "50K+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="How It Works - Brandae Multi-Vendor Platform"
        description="Learn how Brandae's multi-vendor e-commerce marketplace with integrated booking system works. From seller registration to customer satisfaction."
        keywords="how it works, multi-vendor platform, booking system, e-commerce marketplace, seller registration, customer experience"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How <span className="gradient-text">Brandae</span> Works
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Discover how our multi-vendor e-commerce marketplace with integrated booking system 
              revolutionizes the way businesses connect with customers.
            </p>
            
            {/* Video/Demo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-gradient-to-br from-brandae-green/20 to-brandae-purple/20 rounded-2xl p-8 border border-brandae-green/20 mb-8"
            >
              <div className="relative aspect-video bg-brandae-gray rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6 hover:bg-white/20 transition-all duration-300"
                  >
                    <Play className="w-12 h-12 text-white ml-1" />
                  </motion.button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm text-white">Watch Demo (2:30)</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                See how businesses are increasing revenue by 40% with our platform
              </p>
            </motion.div>

            <div className="bg-brandae-gray/50 rounded-2xl p-8 border border-brandae-green/20">
              <h2 className="text-2xl font-semibold mb-4 gradient-text">Our Platform Offering</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                The offering of our application is a <strong className="text-white">multi-vendor e-commerce marketplace</strong> with an 
                <strong className="text-white"> integrated booking system</strong>. It enables sellers (shops) to register, manage products 
                (including bookable services), and sell to customers. Customers can browse, order, book, and interact 
                with these shops. Delivery services and associated roles are also supported.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-gray/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-brandae-green/20 rounded-full flex items-center justify-center text-brandae-green">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">Complete Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From vendor registration to customer satisfaction, here's how every interaction flows seamlessly through our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-brandae-gray rounded-2xl p-8 border border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className="text-brandae-green"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.icon}
                    </motion.div>
                    <div className="w-12 h-12 bg-brandae-green rounded-full flex items-center justify-center text-brandae-dark font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </motion.div>
                
                {index < steps.length - 1 && index % 3 !== 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 text-brandae-green/50" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Demo */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-brandae-gray/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Interactive Experience</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the power of our platform through interactive demonstrations of key features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-brandae-dark/50 rounded-xl p-6 border border-brandae-green/20 cursor-pointer hover:border-brandae-green/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Globe className="w-8 h-8 text-brandae-green" />
                    <h3 className="text-lg font-semibold">Global Reach</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Connect with customers worldwide through our scalable platform</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-brandae-dark/50 rounded-xl p-6 border border-brandae-purple/20 cursor-pointer hover:border-brandae-purple/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Shield className="w-8 h-8 text-brandae-purple" />
                    <h3 className="text-lg font-semibold">Secure Transactions</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Bank-grade security for all payments and customer data</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-brandae-dark/50 rounded-xl p-6 border border-blue-500/20 cursor-pointer hover:border-blue-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Zap className="w-8 h-8 text-blue-400" />
                    <h3 className="text-lg font-semibold">Lightning Fast</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Optimized performance ensuring quick load times and smooth interactions</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 rounded-2xl p-8 border border-brandae-green/20">
                <div className="aspect-square bg-brandae-gray rounded-xl overflow-hidden mb-6">
                  <div className="h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border-4 border-brandae-green/30 border-t-brandae-green rounded-full"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Real-time Dashboard</h3>
                <p className="text-gray-300 text-center">
                  Monitor your business performance with live analytics and insights
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Core Features</span> That Drive Success
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every feature is designed to create seamless experiences for vendors, customers, and service providers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index}
                className="bg-brandae-dark/50"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-brandae-gray/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="gradient-text">Brandae</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our platform brings together the best of e-commerce and service booking, 
                creating new opportunities for growth and customer engagement.
              </p>
              
              <div className="space-y-4">
                {[
                  "Unified platform for products and services",
                  "Integrated payment and delivery systems",
                  "Real-time booking and inventory management",
                  "Multi-vendor marketplace capabilities",
                  "Customer interaction and review systems"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-brandae-green flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 rounded-2xl p-8 border border-brandae-green/20"
            >
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Ready to Get Started?</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of successful businesses already using Brandae to grow their revenue 
                and improve customer experiences.
              </p>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-brandae-green rounded-full flex items-center justify-center text-brandae-dark font-bold text-sm">1</div>
                  <span>Sign up and create your account</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-brandae-green rounded-full flex items-center justify-center text-brandae-dark font-bold text-sm">2</div>
                  <span>Set up your storefront and services</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-brandae-green rounded-full flex items-center justify-center text-brandae-dark font-bold text-sm">3</div>
                  <span>Start selling and booking customers</span>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-8 bg-gradient-to-r from-brandae-purple to-brandae-green text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
