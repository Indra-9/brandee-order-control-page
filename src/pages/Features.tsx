import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Users, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Clock, 
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import ContactForm from '@/components/ContactForm';

const Features = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const features = [
    {
      icon: Zap,
      title: 'Zero Commission Ordering',
      description: 'Keep 100% of your revenue. No commission fees on any orders.',
      highlight: 'Maximize your profits'
    },
    {
      icon: Users,
      title: 'Customer Relationship Management',
      description: 'Build direct relationships with your customers. Own your data and engage directly.',
      highlight: 'Own your customer data'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Track sales, customer behavior, and marketing performance with detailed analytics.',
      highlight: 'Data-driven decisions'
    },
    {
      icon: Shield,
      title: 'Secure and Reliable',
      description: 'Ensure secure transactions and reliable service with our robust platform.',
      highlight: 'Trusted platform'
    },
    {
      icon: Smartphone,
      title: 'Mobile-Optimized Experience',
      description: 'Provide a seamless ordering experience on any device.',
      highlight: 'Any device, anywhere'
    },
    {
      icon: BarChart3,
      title: 'Marketing Tools',
      description: 'Boost your sales with built-in marketing tools and promotions.',
      highlight: 'Increase your revenue'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get round-the-clock support from our dedicated team.',
      highlight: 'Always there for you'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Expand your reach to new customers around the world.',
      highlight: 'Reach more customers'
    }
  ];

  const testimonials = [
    {
      name: 'Chef Emily Thompson',
      restaurant: 'The Cozy Bistro',
      testimonial: 'Brandae has transformed our business. Zero commission fees mean more profit, and we finally own our customer data!',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f8593ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudCUyMGNoZWZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      rating: 5
    },
    {
      name: 'Ricardo Rodriguez',
      restaurant: 'Ricardo\'s Pizzeria',
      testimonial: 'The analytics dashboard is a game-changer. We can see exactly what our customers want and adjust our menu accordingly.',
      image: 'https://images.unsplash.com/photo-1565083675544-4499e2c5398a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnQlMjBjaGVmfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      rating: 4
    },
    {
      name: 'Priya Patel',
      restaurant: 'Spice Route Indian Cuisine',
      testimonial: 'The customer engagement tools have helped us build a loyal customer base. We\'re now able to offer personalized promotions and rewards.',
      image: 'https://images.unsplash.com/photo-1547480053-76ac4f80f401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnQlMjBjaGVmfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="Features - Brandae" 
        description="Discover powerful features that help restaurants grow without commission fees. Zero-commission ordering, analytics, customer engagement tools and more."
        keywords="restaurant features, zero commission, online ordering, restaurant analytics, customer engagement"
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-brandae-darker">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Empowering Restaurants with <span className="gradient-text">Zero Commission</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Discover the features that help restaurants grow without high commission fees. Zero-commission ordering, analytics, customer engagement tools, and more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-gradient-to-r from-brandae-purple to-brandae-green text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-brandae-green/25 transition-all"
            >
              Book a Free Demo
            </button>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-brandae-gray border border-white/10 text-white py-3 px-6 rounded-xl font-medium hover:bg-white/10 transition-all"
            >
              <Play size={20} className="mr-2" />
              Watch Video
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore the powerful features that make Brandae the ultimate platform for restaurant growth.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-brandae-gray">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients <span className="gradient-text">Say</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Read real testimonials from restaurants that have transformed their business with Brandae.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 md:py-32 bg-brandae-darker">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-8"
          >
            Ready to Transform Your Restaurant?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center gap-4"
          >
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-gradient-to-r from-brandae-purple to-brandae-green text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-brandae-green/25 transition-all"
            >
              Book a Free Demo
            </button>
            <a
              href="/pricing"
              className="inline-flex items-center bg-brandae-gray border border-white/10 text-white py-3 px-6 rounded-xl font-medium hover:bg-white/10 transition-all"
            >
              View Pricing
              <ArrowRight size={20} className="ml-2" />
            </a>
          </motion.div>
        </div>
      </section>
      
      <ContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  );
};

export default Features;
