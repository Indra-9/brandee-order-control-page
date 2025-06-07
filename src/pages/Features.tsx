
import React, { useState, useEffect } from 'react';
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
  Play,
  Eye,
  Headphones,
  Database,
  Layers,
  MonitorIcon as Monitor,
  Percent,
  RefreshCw
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import AnimatedButton from '@/components/AnimatedButton';
import Footer from '@/components/Footer';

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

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

  // Feature categories with comprehensive features
  const featureCategories = [
    {
      title: "E-commerce & Store",
      description: "Complete online store management with advanced e-commerce capabilities",
      features: [
        {
          title: "App Commission Billing",
          description: "Flexible commission structures with automated billing and transparent fee management.",
          icon: <CreditCard size={24} />
        },
        {
          title: "Branded Mobile Apps",
          description: "Custom-branded iOS and Android apps with your logo, colors, and complete customization.",
          icon: <Smartphone size={24} />
        },
        {
          title: "Customer Data Ownership",
          description: "Complete ownership and control of your customer data with advanced analytics and insights.",
          icon: <Database size={24} />
        },
        {
          title: "Advanced Marketing Tools",
          description: "Push notifications, email campaigns, loyalty programs, and targeted marketing automation.",
          icon: <Target size={24} />
        },
        {
          title: "Delivery Management System",
          description: "End-to-end delivery management with real-time tracking and route optimization.",
          icon: <Truck size={24} />
        },
        {
          title: "Inventory Management",
          description: "Real-time stock tracking, automated reorder points, and multi-location inventory sync.",
          icon: <Package size={24} />
        }
      ]
    },
    {
      title: "Analytics & Insights",
      description: "Powerful analytics and business intelligence tools",
      features: [
        {
          title: "Real-Time Analytics",
          description: "Live dashboard with sales metrics, customer behavior, and performance indicators.",
          icon: <BarChart3 size={24} />
        },
        {
          title: "Sales Forecasting",
          description: "AI-powered sales predictions and trend analysis for better business planning.",
          icon: <TrendingUp size={24} />
        },
        {
          title: "Customer Insights",
          description: "Detailed customer analytics including purchase patterns and lifetime value.",
          icon: <Users size={24} />
        },
        {
          title: "Multi-Channel Reports",
          description: "Comprehensive reporting across all sales channels with exportable data.",
          icon: <Globe size={24} />
        }
      ]
    },
    {
      title: "Customer Experience",
      description: "Enhanced customer engagement and satisfaction tools",
      features: [
        {
          title: "Live Chat Support",
          description: "Integrated customer support with live chat, ticket management, and help desk.",
          icon: <MessageSquare size={24} />
        },
        {
          title: "Loyalty Programs",
          description: "Customizable reward systems with points, cashback, and referral programs.",
          icon: <Gift size={24} />
        },
        {
          title: "Push Notifications",
          description: "Targeted messaging with personalization and automated campaign management.",
          icon: <Bell size={24} />
        },
        {
          title: "Review & Rating System",
          description: "Customer feedback collection with review management and response tools.",
          icon: <Star size={24} />
        }
      ]
    }
  ];

  // Additional comprehensive features
  const additionalFeatures = [
    {
      category: "Secure Payment Processing",
      items: [
        "50+ Payment Gateways",
        "Secure Payment Processing",
        "Multi-Currency Support",
        "Subscription Management"
      ]
    },
    {
      category: "In-App Live Support",
      items: [
        "24/7 Customer Support",
        "Live Chat Integration",
        "Help Desk Management",
        "Knowledge Base"
      ]
    },
    {
      category: "Inventory Management",
      items: [
        "Real-time Stock Tracking",
        "Multi-location Management",
        "Automated Reordering",
        "Product Variants"
      ]
    },
    {
      category: "Loyalty Programs",
      items: [
        "Points & Rewards System",
        "Referral Programs",
        "Cashback Management",
        "Customer Tiers"
      ]
    },
    {
      category: "Customer Profile",
      items: [
        "Complete Customer Database",
        "Purchase History",
        "Behavior Analytics",
        "Segmentation Tools"
      ]
    },
    {
      category: "Social Login",
      items: [
        "Facebook Login",
        "Google Authentication",
        "Apple Sign-in",
        "Phone Number Verification"
      ]
    }
  ];

  // Success stories data
  const successStories = [
    {
      name: "Alem Gebeta",
      role: "CEO, Fresh Market",
      image: "/lovable-uploads/b7b83b2d-2567-4919-a07d-da4094321086.png",
      rating: 5,
      quote: "Brandae transformed our local grocery store into a thriving online business. Sales increased by 300% in just 6 months!",
      results: "300% Sales Growth"
    },
    {
      name: "Food Market",
      role: "Restaurant Chain",
      image: "/lovable-uploads/a14793e5-192f-4f20-b156-b312a832363a.png",
      rating: 5,
      quote: "The delivery management system is incredible. We reduced delivery time by 40% and customer satisfaction is at an all-time high.",
      results: "40% Faster Delivery"
    },
    {
      name: "Burger Bros",
      role: "Fast Food Chain",
      image: "/lovable-uploads/b7b83b2d-2567-4919-a07d-da4094321086.png",
      rating: 5,
      quote: "Zero commission model saved us thousands monthly. The branded app gave us complete control over our customer experience.",
      results: "Zero Commission Savings"
    }
  ];

  // Why choose Brandae reasons
  const whyChooseBrandae = [
    {
      title: "Development & Setup",
      description: "Complete setup and development of your custom platform with ongoing technical support.",
      icon: <Settings size={32} />
    },
    {
      title: "Integration & Training",
      description: "Seamless integration with existing systems and comprehensive team training programs.",
      icon: <Globe size={32} />
    },
    {
      title: "Launch & Grow",
      description: "Successful platform launch with growth strategies and continuous optimization support.",
      icon: <Rocket size={32} />
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "How long does it take to set up?",
      answer: "Our standard setup takes 2-4 weeks depending on customization requirements. We provide a detailed timeline during onboarding."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer 24/7 technical support, regular updates, and dedicated account management for all our clients."
    },
    {
      question: "Can I customize the mobile apps?",
      answer: "Absolutely! Our branded mobile apps are fully customizable with your logo, colors, themes, and specific features."
    },
    {
      question: "What about data ownership?",
      answer: "You have complete ownership of all your customer data, sales data, and business analytics. We never share or sell your data."
    },
    {
      question: "Is there a commission fee?",
      answer: "No, we operate on a zero-commission model. You keep 100% of your sales revenue and only pay our platform fee."
    },
    {
      question: "What kind of support is included?",
      answer: "We provide comprehensive support including technical assistance, training, marketing guidance, and business growth consulting."
    }
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO
        title="Powerful Features to Grow Your Business - Brandae"
        description="Discover comprehensive e-commerce features including branded mobile apps, delivery management, analytics, and more. Everything you need to build and scale your online business."
        keywords="e-commerce platform, mobile apps, delivery management, business analytics, online store features, customer management"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brandae-green/5 to-brandae-purple/5" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features to <span className="gradient-text">Grow Your Business</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Discover everything that's built in-to help you grow your business while creating amazing experiences for your customers.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-brandae-gray px-4 py-2 rounded-full">
                <Check className="text-brandae-green mr-2" size={16} />
                <span className="text-sm">E-Commerce</span>
              </div>
              <div className="flex items-center bg-brandae-gray px-4 py-2 rounded-full">
                <Check className="text-brandae-green mr-2" size={16} />
                <span className="text-sm">Analytics</span>
              </div>
              <div className="flex items-center bg-brandae-gray px-4 py-2 rounded-full">
                <Check className="text-brandae-green mr-2" size={16} />
                <span className="text-sm">Marketing</span>
              </div>
              <div className="flex items-center bg-brandae-gray px-4 py-2 rounded-full">
                <Check className="text-brandae-green mr-2" size={16} />
                <span className="text-sm">Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Features Tabs */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {featureCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === index
                    ? 'bg-brandae-green text-brandae-dark'
                    : 'bg-brandae-gray text-gray-300 hover:bg-brandae-green/20'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {featureCategories[activeTab].title}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {featureCategories[activeTab].description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCategories[activeTab].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all"
                >
                  <div className="text-brandae-green mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything You Need in One Platform
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all"
              >
                <h3 className="text-lg font-semibold mb-4 text-brandae-green">{feature.category}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-300">
                      <Check className="text-brandae-green mr-2 flex-shrink-0" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how businesses like yours are thriving with our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{story.name}</h4>
                    <p className="text-sm text-gray-400">{story.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="text-brandae-green" size={16} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="text-sm text-gray-300 mb-4 italic">
                  "{story.quote}"
                </blockquote>
                <div className="text-brandae-green font-semibold text-sm">
                  {story.results}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Brandae */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Brandae
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just a platform provider, we're your growth partners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseBrandae.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="text-center bg-brandae-gray p-8 rounded-xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all"
              >
                <div className="text-brandae-green mb-6 flex justify-center">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{reason.title}</h3>
                <p className="text-gray-300">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about our platform and services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/20"
              >
                <h3 className="text-lg font-semibold mb-3 text-brandae-green">
                  {faq.question}
                </h3>
                <p className="text-gray-300 text-sm">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 p-12 rounded-2xl border border-brandae-green/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to take control of your ordering system?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Start selling through your own branded app & website in <strong>3 days</strong> or less!
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
                Book Free Demo
              </AnimatedButton>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              No setup fees • No commission • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
