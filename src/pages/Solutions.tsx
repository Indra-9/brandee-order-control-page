
import React from 'react';
import { motion } from 'framer-motion';
import { Store, ShoppingBag, Calendar, Users, Truck, CreditCard, Star, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

export default function Solutions() {
  const solutions = [
    {
      title: "Multi-Vendor Marketplace",
      description: "Create a thriving ecosystem where multiple sellers can operate their own digital storefronts under one unified platform.",
      icon: <Store className="w-12 h-12" />,
      features: [
        "Individual seller dashboards",
        "Custom storefront themes",
        "Independent inventory management",
        "Seller analytics and reporting",
        "Commission management"
      ]
    },
    {
      title: "Integrated Booking System",
      description: "Seamlessly combine product sales with service bookings, offering customers a complete shopping experience.",
      icon: <Calendar className="w-12 h-12" />,
      features: [
        "Real-time availability tracking",
        "Automated booking confirmations",
        "Calendar synchronization",
        "Service scheduling tools",
        "Customer reminder system"
      ]
    },
    {
      title: "Customer Experience Hub",
      description: "Deliver exceptional customer experiences with comprehensive tools for interaction and engagement.",
      icon: <Users className="w-12 h-12" />,
      features: [
        "Unified customer profiles",
        "Review and rating system",
        "Live chat support",
        "Loyalty programs",
        "Personalized recommendations"
      ]
    },
    {
      title: "Delivery Management",
      description: "Complete logistics solution connecting customers, vendors, and delivery services for efficient fulfillment.",
      icon: <Truck className="w-12 h-12" />,
      features: [
        "Real-time tracking",
        "Route optimization",
        "Delivery partner network",
        "Automated dispatch",
        "Customer notifications"
      ]
    },
    {
      title: "Payment Processing",
      description: "Secure, flexible payment solutions supporting multiple methods and automatic vendor payouts.",
      icon: <CreditCard className="w-12 h-12" />,
      features: [
        "Multiple payment methods",
        "Automatic split payments",
        "Fraud protection",
        "Recurring billing",
        "Financial reporting"
      ]
    },
    {
      title: "Analytics & Insights",
      description: "Comprehensive data analytics providing actionable insights for vendors and platform administrators.",
      icon: <BarChart3 className="w-12 h-12" />,
      features: [
        "Sales performance tracking",
        "Customer behavior analysis",
        "Revenue forecasting",
        "Inventory optimization",
        "Market trend insights"
      ]
    }
  ];

  const industries = [
    {
      name: "Restaurants & Food",
      description: "Enable restaurants to sell food and offer table reservations in one platform",
      benefits: ["Online ordering", "Table booking", "Delivery coordination", "Menu management"]
    },
    {
      name: "Beauty & Wellness",
      description: "Beauty salons can sell products and book appointments seamlessly",
      benefits: ["Product sales", "Appointment booking", "Service packages", "Client management"]
    },
    {
      name: "Retail & Services",
      description: "Retail stores offering both products and professional services",
      benefits: ["Inventory management", "Service scheduling", "Customer loyalty", "Multi-location support"]
    },
    {
      name: "Events & Entertainment",
      description: "Event organizers selling tickets and merchandise together",
      benefits: ["Ticket sales", "Merchandise store", "Event management", "Attendee engagement"]
    }
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="Solutions - Brandae Multi-Vendor E-commerce Platform"
        description="Discover comprehensive solutions for multi-vendor marketplaces with integrated booking systems. Perfect for restaurants, beauty salons, retail stores, and service providers."
        keywords="multi-vendor marketplace, booking system, e-commerce solutions, restaurant ordering, beauty appointments, retail services"
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
              Complete <span className="gradient-text">Solutions</span> for Every Business
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your business with our comprehensive multi-vendor e-commerce platform. 
              From restaurants to beauty salons, retail stores to service providers - we have the perfect solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-brandae-green/10 border border-brandae-green/20 rounded-full px-6 py-2">
                <span className="text-brandae-green font-semibold">✓ Zero Setup Fees</span>
              </div>
              <div className="bg-brandae-purple/10 border border-brandae-purple/20 rounded-full px-6 py-2">
                <span className="text-brandae-purple font-semibold">✓ 24/7 Support</span>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2">
                <span className="text-blue-400 font-semibold">✓ 30-Day Free Trial</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
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
              <span className="gradient-text">Comprehensive Solutions</span> for Modern Commerce
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform provides everything you need to build, manage, and scale your multi-vendor marketplace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-brandae-gray rounded-2xl p-8 border border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 group"
              >
                <div className="text-brandae-green mb-6 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{solution.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-brandae-green flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
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
              <span className="gradient-text">Industry-Specific</span> Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tailored solutions designed for specific industries, each with unique features and capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-brandae-dark/50 rounded-2xl p-8 border border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 gradient-text">{industry.name}</h3>
                <p className="text-gray-300 mb-6">{industry.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {industry.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-brandae-green flex-shrink-0" />
                      <span className="text-sm text-gray-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 rounded-2xl p-12 border border-brandae-green/20 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful businesses using Brandae to increase revenue, 
              improve customer experience, and streamline operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-brandae-purple to-brandae-green text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-brandae-green text-brandae-green px-8 py-4 rounded-xl font-semibold hover:bg-brandae-green/10 transition-colors"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
