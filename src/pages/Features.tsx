
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe, 
  Brain,
  Rocket,
  Target,
  BarChart3,
  MessageSquare,
  Lock,
  Smartphone,
  ArrowRight,
  Settings,
  CreditCard,
  Bell,
  Package,
  Truck,
  Calendar,
  Star,
  Gift,
  MapPin,
  Clock,
  DollarSign,
  ChevronRight,
  Play
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import FeatureCard from '@/components/FeatureCard';
import AnimatedButton from '@/components/AnimatedButton';
import Footer from '@/components/Footer';

const Features = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Core Platform Features
  const coreFeatures = [
    {
      title: "Multi-Store Management",
      description: "Manage multiple stores from a single dashboard with centralized inventory, orders, and customer management.",
      icon: <Package size={32} />,
    },
    {
      title: "Advanced Analytics",
      description: "Real-time insights with comprehensive reporting, sales analytics, and performance tracking across all channels.",
      icon: <BarChart3 size={32} />,
    },
    {
      title: "Mobile-First Design",
      description: "Fully responsive platform optimized for mobile devices with native iOS and Android applications.",
      icon: <Smartphone size={32} />,
    },
    {
      title: "AI-Powered Automation",
      description: "Intelligent automation for inventory management, pricing optimization, and customer engagement.",
      icon: <Brain size={32} />,
    },
  ];

  // E-commerce Capabilities
  const ecommerceFeatures = [
    {
      title: "Product Catalog Management",
      description: "Advanced product management with bulk upload, variant handling, and rich media support.",
      icon: <Package size={28} />,
    },
    {
      title: "Order Processing",
      description: "Streamlined order workflow with automated processing, status tracking, and fulfillment management.",
      icon: <Settings size={28} />,
    },
    {
      title: "Payment Gateway Integration",
      description: "Support for 50+ payment gateways with secure processing and multi-currency support.",
      icon: <CreditCard size={28} />,
    },
    {
      title: "Inventory Management",
      description: "Real-time stock tracking, automated reorder points, and multi-warehouse management.",
      icon: <BarChart3 size={28} />,
    },
  ];

  // Marketing & Customer Engagement
  const marketingFeatures = [
    {
      title: "Push Notifications",
      description: "Targeted push notifications with advanced segmentation and A/B testing capabilities.",
      icon: <Bell size={28} />,
    },
    {
      title: "Loyalty Programs",
      description: "Customizable loyalty programs with points, rewards, and referral system integration.",
      icon: <Gift size={28} />,
    },
    {
      title: "Email Marketing",
      description: "Automated email campaigns with personalization, drip sequences, and performance tracking.",
      icon: <MessageSquare size={28} />,
    },
    {
      title: "Social Media Integration",
      description: "Seamless integration with social platforms for marketing campaigns and customer engagement.",
      icon: <Users size={28} />,
    },
  ];

  // Delivery & Logistics
  const logisticsFeatures = [
    {
      title: "Real-time Tracking",
      description: "Live order tracking with GPS integration and automated customer notifications.",
      icon: <MapPin size={28} />,
    },
    {
      title: "Route Optimization",
      description: "AI-powered route planning for efficient delivery with cost and time optimization.",
      icon: <Truck size={28} />,
    },
    {
      title: "Delivery Scheduling",
      description: "Flexible delivery slots with calendar integration and capacity management.",
      icon: <Calendar size={28} />,
    },
    {
      title: "Driver Management",
      description: "Complete driver portal with performance tracking, payment management, and communication tools.",
      icon: <Users size={28} />,
    },
  ];

  // Customer Management
  const customerFeatures = [
    {
      title: "Customer Profiles",
      description: "Comprehensive customer database with purchase history, preferences, and behavior analysis.",
      icon: <Users size={28} />,
    },
    {
      title: "Support System",
      description: "Integrated help desk with live chat, ticket management, and knowledge base.",
      icon: <MessageSquare size={28} />,
    },
    {
      title: "Review Management",
      description: "Customer review system with moderation, response management, and rating analytics.",
      icon: <Star size={28} />,
    },
    {
      title: "Feedback Collection",
      description: "Automated feedback collection with surveys, NPS scoring, and improvement insights.",
      icon: <Target size={28} />,
    },
  ];

  // Business Intelligence
  const businessFeatures = [
    {
      title: "Sales Analytics",
      description: "Detailed sales reports with trend analysis, forecasting, and performance metrics.",
      icon: <TrendingUp size={28} />,
    },
    {
      title: "Financial Reports",
      description: "Comprehensive financial reporting with P&L statements, tax reports, and reconciliation.",
      icon: <DollarSign size={28} />,
    },
    {
      title: "Operational Insights",
      description: "Operational metrics including delivery performance, customer satisfaction, and efficiency KPIs.",
      icon: <BarChart3 size={28} />,
    },
    {
      title: "Custom Dashboards",
      description: "Personalized dashboards with drag-and-drop widgets and real-time data visualization.",
      icon: <Settings size={28} />,
    },
  ];

  // Integration & API
  const integrationFeatures = [
    {
      title: "Third-party Integrations",
      description: "Pre-built integrations with popular tools including CRM, ERP, and accounting software.",
      icon: <Globe size={28} />,
    },
    {
      title: "API Access",
      description: "RESTful APIs with comprehensive documentation for custom integrations and development.",
      icon: <Settings size={28} />,
    },
    {
      title: "Webhook Support",
      description: "Real-time webhook notifications for seamless data synchronization across platforms.",
      icon: <Zap size={28} />,
    },
    {
      title: "Data Export",
      description: "Flexible data export options with scheduled reports and multiple format support.",
      icon: <BarChart3 size={28} />,
    },
  ];

  const benefits = [
    "Increase sales by up to 300% with advanced e-commerce features",
    "Reduce operational costs by 40% through automation",
    "Improve customer satisfaction by 85% with better service",
    "Scale your business 10x faster with our platform",
    "Get real-time insights with advanced analytics",
    "24/7 expert support and dedicated account management"
  ];

  const featureSections = [
    { title: "Core Platform", features: coreFeatures },
    { title: "E-commerce", features: ecommerceFeatures },
    { title: "Marketing", features: marketingFeatures },
    { title: "Delivery & Logistics", features: logisticsFeatures },
    { title: "Customer Management", features: customerFeatures },
    { title: "Business Intelligence", features: businessFeatures },
    { title: "Integrations", features: integrationFeatures },
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO
        title="Features - Brandae: Complete E-commerce Platform"
        description="Explore comprehensive features that power your online business. From e-commerce to delivery management, analytics to customer engagement - everything you need in one platform."
        keywords="e-commerce platform, online store, delivery management, business analytics, customer engagement, mobile commerce"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brandae-green/5 to-brandae-purple/5" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Everything You Need to <span className="gradient-text">Grow Your Business</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              From e-commerce to delivery management, customer engagement to business analytics - 
              our comprehensive platform provides all the tools you need to build, manage, and scale your online business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                onClick={() => window.location.href = '/auth'} 
                className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
              >
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </AnimatedButton>
              <AnimatedButton 
                onClick={() => window.location.href = '#demo'} 
                variant="outline"
              >
                <Play size={20} className="mr-2" />
                Watch Demo
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Navigation */}
      <section className="py-8 px-6 md:px-12 lg:px-24 bg-brandae-darker/50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {featureSections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeSection === index
                    ? 'bg-brandae-green text-brandae-dark'
                    : 'bg-brandae-gray text-gray-300 hover:bg-brandae-green/20'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Feature Sections */}
      {featureSections.map((section, sectionIndex) => (
        <section 
          key={sectionIndex}
          className={`py-16 px-6 md:px-12 lg:px-24 ${sectionIndex % 2 === 0 ? 'bg-brandae-dark' : 'bg-brandae-darker'}`}
          style={{ display: activeSection === sectionIndex ? 'block' : 'none' }}
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {section.title} Features
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Powerful tools designed to streamline your operations and accelerate growth.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {section.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all"
                >
                  <div className="text-brandae-green mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* All Features Overview */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Feature Overview
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore all our features across different categories to see how our platform can transform your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featureSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, x: sectionIndex % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/20"
              >
                <h3 className="text-xl font-bold mb-4 text-brandae-green">{section.title}</h3>
                <div className="space-y-3">
                  {section.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="text-brandae-green mr-3 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <span className="font-medium text-white">{feature.title}</span>
                        <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveSection(sectionIndex)}
                  className="mt-4 text-brandae-green hover:text-brandae-green/80 font-medium text-sm flex items-center"
                >
                  Learn More <ChevronRight size={16} className="ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Join thousands of successful businesses who have transformed their operations 
                with our comprehensive e-commerce platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <Check className="text-brandae-green mr-3 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 p-8 rounded-2xl border border-brandae-green/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Platform Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brandae-green mb-2">10,000+</div>
                    <div className="text-gray-300 text-sm">Active Stores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brandae-green mb-2">$50M+</div>
                    <div className="text-gray-300 text-sm">GMV Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brandae-green mb-2">99.9%</div>
                    <div className="text-gray-300 text-sm">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brandae-green mb-2">50+</div>
                    <div className="text-gray-300 text-sm">Countries</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience all these powerful features firsthand. Start your free trial today 
              and discover why industry leaders choose our platform for their e-commerce needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                onClick={() => window.location.href = '/auth'} 
                size="lg"
                className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
              >
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </AnimatedButton>
              <AnimatedButton 
                onClick={() => window.location.href = '/contact'} 
                size="lg"
                variant="outline"
              >
                Schedule Demo
              </AnimatedButton>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
