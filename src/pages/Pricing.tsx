import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Star, ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import AnimatedButton from '@/components/AnimatedButton';
import ContactForm from '@/components/ContactForm';

const Pricing = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const pricingPlans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started and exploring the platform.',
      features: [
        'Zero commission fees',
        'Basic online ordering',
        'Limited analytics',
        'Up to 50 orders per month',
        'Community support'
      ],
      cta: 'Get Started',
      mostPopular: false
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'Grow your business with advanced features and dedicated support.',
      features: [
        'Everything in Basic, plus:',
        'Advanced analytics',
        'Unlimited orders',
        'Customer engagement tools',
        'Priority support',
        'Custom branding'
      ],
      cta: 'Start Free Trial',
      mostPopular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large restaurant chains and franchises.',
      features: [
        'Everything in Pro, plus:',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'White-label options',
        '24/7 support'
      ],
      cta: 'Contact Us',
      mostPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="Pricing - Brandae" 
        description="Simple, transparent pricing for restaurants. Start free with zero commission fees. Scale your business without hidden costs."
        keywords="restaurant pricing, zero commission pricing, affordable restaurant platform, transparent pricing"
      />
      
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Start free with zero commission fees. Scale your business without hidden costs.
            </p>
            <AnimatedButton 
              onClick={() => setShowContactForm(true)}
              className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
            >
              Book a Free Demo <ArrowRight size={20} className="ml-2" />
            </AnimatedButton>
          </motion.div>

          {/* Pricing Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-brandae-gray border border-brandae-green/20 rounded-2xl p-6 hover:border-brandae-green/40 transition-colors ${plan.mostPopular ? 'scale-105' : ''}`}
              >
                {plan.mostPopular && (
                  <div className="absolute top-0 right-0 bg-brandae-green text-brandae-dark text-xs font-medium py-1 px-3 rounded-bl-2xl rounded-tr-2xl">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold mb-4">
                  {plan.price === 'Free' ? 'Free' : plan.price}
                  {plan.price !== 'Free' && <span className="text-sm text-gray-300">/month</span>}
                </p>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-brandae-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <AnimatedButton 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-brandae-purple to-brandae-green text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-brandae-green/25 transition-all"
                >
                  {plan.cta}
                </AnimatedButton>
              </motion.div>
            ))}
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <h2 className="text-4xl font-bold mb-8">Why Choose Brandae?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-brandae-gray border border-brandae-green/20 rounded-2xl p-6 hover:border-brandae-green/40 transition-colors"
              >
                <Zap size={48} className="text-brandae-green mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Zero Commission Fees</h3>
                <p className="text-gray-300">Keep 100% of your revenue. No hidden fees or commissions.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-brandae-gray border border-brandae-green/20 rounded-2xl p-6 hover:border-brandae-green/40 transition-colors"
              >
                <Users size={48} className="text-brandae-green mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Customer Engagement</h3>
                <p className="text-gray-300">Engage with your customers through loyalty programs and personalized offers.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-brandae-gray border border-brandae-green/20 rounded-2xl p-6 hover:border-brandae-green/40 transition-colors"
              >
                <TrendingUp size={48} className="text-brandae-green mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
                <p className="text-gray-300">Make informed decisions with comprehensive analytics and reporting.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24"
          >
            <h2 className="text-4xl font-bold mb-8 text-center">
              What Our Customers Say
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-brandae-gray border border-brandae-green/20 rounded-2xl p-6"
              >
                <Star size={24} className="text-brandae-green mb-4" />
                <p className="text-gray-300 mb-4 italic">
                  "Brandae has transformed our restaurant. Zero commission fees and amazing customer support!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brandae-green"></div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm text-gray-400">Restaurant Owner</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-brandae-gray border border-brandae-green/20 rounded-2xl p-6"
              >
                <Star size={24} className="text-brandae-green mb-4" />
                <p className="text-gray-300 mb-4 italic">
                  "The analytics dashboard is a game-changer. We've increased our revenue by 30%!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brandae-green"></div>
                  <div>
                    <h4 className="font-bold">Jane Smith</h4>
                    <p className="text-sm text-gray-400">Restaurant Manager</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-24 text-center"
          >
            <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of successful restaurants and boost your revenue today.
            </p>
            <AnimatedButton 
              onClick={() => setShowContactForm(true)}
              className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
            >
              Book a Free Demo <ArrowRight size={20} className="ml-2" />
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
      
      <ContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  );
};

export default Pricing;
