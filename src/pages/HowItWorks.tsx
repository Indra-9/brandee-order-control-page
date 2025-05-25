
import React from 'react';
import { motion } from 'framer-motion';
import { Store, Users, Calendar, ShoppingBag, Truck, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import StepCard from '@/components/StepCard';

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

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
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
                <div className="bg-brandae-gray rounded-2xl p-8 border border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-brandae-green">
                      {step.icon}
                    </div>
                    <div className="w-12 h-12 bg-brandae-green rounded-full flex items-center justify-center text-brandae-dark font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && index % 3 !== 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-brandae-green/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
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
      <section className="py-20 px-6 md:px-12 lg:px-24">
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
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brandae-green rounded-full flex items-center justify-center text-brandae-dark font-bold text-sm">1</div>
                  <span>Sign up and create your account</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brandae-green rounded-full flex items-center justify-center text-brandae-dark font-bold text-sm">2</div>
                  <span>Set up your storefront and services</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brandae-green rounded-full flex items-center justify-center text-brandae-dark font-bold text-sm">3</div>
                  <span>Start selling and booking customers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
