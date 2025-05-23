
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';
import AnimatedButton from '@/components/AnimatedButton';
import FeatureCard from '@/components/FeatureCard';
import StepCard from '@/components/StepCard';
import TestimonialCard from '@/components/TestimonialCard';
import IntegrationLogo from '@/components/IntegrationLogo';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ContactForm from '@/components/ContactForm';
import SEO from '@/components/SEO';
import { 
  ArrowRight, 
  Check, 
  Smartphone, 
  CreditCard, 
  Users, 
  TrendingUp,
  Zap,
  Shield,
  MessageSquare,
  Star,
  ChevronRight,
  Globe
} from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brandae-darker to-brandae-dark text-white">
      <SEO />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-brandae-green/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-br from-[#093d30]/20 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-20 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Take Control of Your
              <span className="block text-brandae-green">Ordering System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stop paying 20-35% commissions to third-party apps. Build your own branded ordering platform and keep 100% of your profits.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <AnimatedButton variant="primary" size="lg">
                      Book a Free Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </AnimatedButton>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] bg-brandae-gray border-brandae-green/20 text-white">
                  <ContactForm />
                </PopoverContent>
              </Popover>
              
              <AnimatedButton variant="outline" size="lg">
                <Globe className="mr-2 h-5 w-5" />
                View Live Demo
              </AnimatedButton>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl font-bold text-brandae-green">0%</div>
                <div className="text-gray-300">Commission Fees</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl font-bold text-brandae-green">50K+</div>
                <div className="text-gray-300">Orders Processed</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-brandae-green">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold text-brandae-green">24/7</div>
                <div className="text-gray-300">Support</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="text-brandae-green">Grow</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful tools designed specifically for restaurants and grocery stores to build their own ordering ecosystem.
            </p>
          </motion.div>

          <BentoGrid>
            <BentoGridItem gradient="brand-dark" delay={0}>
              <div className="p-6 h-full">
                <Smartphone className="h-8 w-8 text-brandae-green mb-4" />
                <h3 className="text-xl font-bold mb-2">Branded Mobile Apps</h3>
                <p className="text-gray-300">Your own iOS and Android apps with your branding, colors, and identity.</p>
              </div>
            </BentoGridItem>
            
            <BentoGridItem gradient="green" delay={1}>
              <div className="p-6 h-full">
                <CreditCard className="h-8 w-8 text-brandae-green mb-4" />
                <h3 className="text-xl font-bold mb-2">Zero Commission</h3>
                <p className="text-gray-300">Keep 100% of your profits. No hidden fees or per-order commissions.</p>
              </div>
            </BentoGridItem>

            <BentoGridItem gradient="mixed" delay={2}>
              <div className="p-6 h-full">
                <Users className="h-8 w-8 text-brandae-green mb-4" />
                <h3 className="text-xl font-bold mb-2">Customer Data</h3>
                <p className="text-gray-300">Own your customer relationships and data for better marketing.</p>
              </div>
            </BentoGridItem>

            <BentoGridItem gradient="blue" delay={3} colSpan={2}>
              <div className="p-6 h-full">
                <TrendingUp className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Marketing Automation</h3>
                <p className="text-gray-300 mb-4">Built-in tools for push notifications, SMS, email campaigns, and loyalty programs.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-brandae-green" />
                    Push notification campaigns
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-brandae-green" />
                    SMS marketing automation
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-brandae-green" />
                    Customer loyalty programs
                  </li>
                </ul>
              </div>
            </BentoGridItem>

            <BentoGridItem gradient="orange" delay={4}>
              <div className="p-6 h-full">
                <Zap className="h-8 w-8 text-orange-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
                <p className="text-gray-300">Live order tracking and delivery management for your customers.</p>
              </div>
            </BentoGridItem>
          </BentoGrid>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-brandae-darker/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-brandae-green">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get your branded ordering system up and running in just 3 simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              step={1}
              title="Setup & Branding"
              description="We'll create your branded ordering system with your logo, colors, and menu setup."
              delay={0}
            />
            <StepCard
              step={2}
              title="Launch Your Apps"
              description="Your mobile apps go live on App Store and Google Play within 2-3 weeks."
              delay={0.2}
            />
            <StepCard
              step={3}
              title="Grow Your Business"
              description="Start taking orders with zero commission and build direct customer relationships."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="text-brandae-green">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from businesses that took control of their ordering system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Chen"
              business="Dragon Palace Restaurant"
              quote="Since switching to Brandae, we've increased our direct orders by 60% and saved thousands in commission fees."
              rating={5}
              delay={0}
            />
            <TestimonialCard
              name="Mike Rodriguez"
              business="Fresh Market Grocery"
              quote="The marketing tools have transformed how we engage customers. Our repeat order rate is now 75%."
              rating={5}
              delay={0.2}
            />
            <TestimonialCard
              name="Lisa Thompson"
              business="Corner Cafe"
              quote="Having our own app has given us complete control over our customer experience. Game changer!"
              rating={5}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-gradient-to-r from-brandae-darker/30 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Seamless <span className="text-brandae-green">Integrations</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with your existing tools and systems for a unified workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
            <IntegrationLogo name="Stripe" delay={0} />
            <IntegrationLogo name="PayPal" delay={0.1} />
            <IntegrationLogo name="Square" delay={0.2} />
            <IntegrationLogo name="WhatsApp" delay={0.3} />
            <IntegrationLogo name="Google Analytics" delay={0.4} />
            <IntegrationLogo name="Zapier" delay={0.5} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#093d30]/20 to-brandae-green/20 p-8 md:p-12 rounded-2xl border border-brandae-green/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Take Control?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of businesses who have increased their revenue by building their own ordering system.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <AnimatedButton variant="primary" size="lg">
                      Book Your Free Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </AnimatedButton>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] bg-brandae-gray border-brandae-green/20 text-white">
                  <ContactForm />
                </PopoverContent>
              </Popover>
              
              <AnimatedButton variant="outline" size="lg">
                View Pricing Plans
                <ChevronRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-brandae-green" />
                No setup fees
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-brandae-green" />
                14-day free trial
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-brandae-green" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
