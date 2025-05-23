
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';
import AnimatedButton from '@/components/AnimatedButton';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ContactForm from '@/components/ContactForm';
import SEO from '@/components/SEO';
import FeatureHero from '@/components/FeatureHero';
import MarketplaceSection from '@/components/MarketplaceSection';
import DashboardPreview from '@/components/DashboardPreview';
import { 
  Layers, CreditCard, Check, Settings, Link, Zap, TrendingUp, Info, 
  Clock, Globe, Shield, MessageSquare, Bell, Package, Search, 
  Users, Store, Building, ShoppingCart, DollarSign, Database,
  ExternalLink, BarChart3, Medal, CircleUser, Truck, ArrowRight
} from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function Features() {
  const [activeTab, setActiveTab] = useState('features');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-brandae-darker to-brandae-dark text-white relative overflow-hidden">
      <SEO title="Features - Brandae | Grow Your Business with Advanced Ordering Tools" description="Explore the powerful features of Brandae that help restaurants and grocery stores grow with branded ordering apps, marketing tools, and delivery control." />
      
      {/* Global Background Light Shadows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brandae-green/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-[#093d30]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#093c2f]/4 to-transparent rounded-full blur-2xl"></div>
      </div>
      
      <Navbar />
      
      {/* Hero Section */}
      <FeatureHero 
        title="Powerful"
        subtitle="Features"
        description="Brandae provides all the tools you need to create your own branded ordering system and take control of your customer experience."
      />

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <Tabs defaultValue="features" onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-brandae-gray/50 mx-auto border-2 border-brandae-green/30 rounded-xl px-0 shadow-lg shadow-brandae-green/5">
            <TabsTrigger 
              value="features" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/20 data-[state=active]:to-brandae-green/20"
            >
              <Layers className="mr-2 h-4 w-4" />
              Core Features
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/20 data-[state=active]:to-brandae-green/20"
            >
              <Link className="mr-2 h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/20 data-[state=active]:to-brandae-green/20"
            >
              <Settings className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="marketplace" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/20 data-[state=active]:to-brandae-green/20"
            >
              <Store className="mr-2 h-4 w-4" />
              Marketplace
            </TabsTrigger>
          </TabsList>

          {/* Features Tab Content */}
          <TabsContent value="features" className="pt-8">
            <motion.div 
              initial="hidden" 
              animate={activeTab === 'features' ? "visible" : "hidden"} 
              variants={staggerContainer}
            >
              <BentoGrid>
                <BentoGridItem gradient="green" delay={0}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-brandae-green/10 w-fit">
                      <CreditCard className="h-6 w-6 text-brandae-green" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Zero Commission Ordering</h3>
                    <p className="text-gray-300">Keep 100% of profits from every order placed through your system.</p>
                  </div>
                </BentoGridItem>
                
                <BentoGridItem gradient="brand-dark" delay={1}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <Zap className="h-6 w-6 text-brandae-green" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Branded Mobile Apps</h3>
                    <p className="text-gray-300">Your own ordering channels with your logo, colors, and identity.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="blue" delay={2}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-blue-500/10 w-fit">
                      <Info className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Customer Data Ownership</h3>
                    <p className="text-gray-300">Full access to user data for remarketing and analytics.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="pink" delay={3}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-pink-500/10 w-fit">
                      <TrendingUp className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Advanced Marketing Tools</h3>
                    <p className="text-gray-300">Push, SMS, email, referral, cashback, and loyalty engines built-in.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="orange" delay={4} colSpan={2}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-orange-500/10 w-fit">
                      <Settings className="h-6 w-6 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Delivery Management System</h3>
                    <p className="text-gray-300">Assign drivers, track orders in real-time, and auto-optimize routes for efficient deliveries.</p>
                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-center text-sm text-gray-300">
                        <Check className="h-4 w-4 mr-2 text-brandae-green" /> Route optimization
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <Check className="h-4 w-4 mr-2 text-brandae-green" /> Driver tracking
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <Check className="h-4 w-4 mr-2 text-brandae-green" /> Delivery zones
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <Check className="h-4 w-4 mr-2 text-brandae-green" /> Status updates
                      </li>
                    </ul>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="mixed" delay={5}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-gradient-to-r from-[#093d30]/20 to-brandae-green/10 w-fit">
                      <Check className="h-6 w-6 text-brandae-green" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
                    <p className="text-gray-300">Insights on sales, order trends, customer behavior, and campaign performance.</p>
                  </div>
                </BentoGridItem>

                {/* Additional Feature Cards */}
                <BentoGridItem gradient="green" delay={6}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-green-500/10 w-fit">
                      <Bell className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Smart Notifications</h3>
                    <p className="text-gray-300">Automated alerts for orders, promotions, and customer engagement.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="blue" delay={7}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-blue-500/10 w-fit">
                      <Globe className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Multi-language Support</h3>
                    <p className="text-gray-300">Reach diverse customer bases with localized ordering experiences.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="brand-dark" delay={8}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <Shield className="h-6 w-6 text-brandae-green" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Secure Payment Processing</h3>
                    <p className="text-gray-300">PCI-compliant payment gateway with fraud protection systems.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="pink" delay={9}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-pink-500/10 w-fit">
                      <MessageSquare className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">In-App Chat Support</h3>
                    <p className="text-gray-300">Direct communication with customers for order issues and feedback.</p>
                  </div>
                </BentoGridItem>

                {/* More Feature Cards */}
                <BentoGridItem gradient="mixed" delay={10}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-gradient-to-r from-[#093d30]/20 to-brandae-green/10 w-fit">
                      <Database className="h-6 w-6 text-brandae-green" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
                    <p className="text-gray-300">Real-time stock tracking and automatic low stock alerts to manage inventory efficiently.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="orange" delay={11}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-orange-500/10 w-fit">
                      <Medal className="h-6 w-6 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Loyalty Programs</h3>
                    <p className="text-gray-300">Customizable reward systems to encourage repeat business and customer retention.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="green" delay={12}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-green-500/10 w-fit">
                      <CircleUser className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Customer Profiles</h3>
                    <p className="text-gray-300">Detailed customer data and order history to provide personalized experiences.</p>
                  </div>
                </BentoGridItem>
              </BentoGrid>
            </motion.div>
          </TabsContent>

          {/* Integrations Tab Content */}
          <TabsContent value="integrations" className="pt-8">
            <motion.div 
              initial="hidden" 
              animate={activeTab === 'integrations' ? "visible" : "hidden"} 
              variants={staggerContainer} 
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">Connect Brandae with your existing tools and systems for a unified workflow.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((category, idx) => (
                  <motion.div 
                    key={category.title} 
                    variants={fadeIn} 
                    custom={idx} 
                    className="bg-brandae-gray rounded-xl p-6 border-2 border-brandae-green/30 shadow-lg shadow-brandae-green/5"
                  >
                    <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.items.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center"
                        >
                          <Check className="h-4 w-4 mr-2 text-brandae-green" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="pt-8">
            <DashboardPreview />
          </TabsContent>
          
          {/* Marketplace Tab Content */}
          <TabsContent value="marketplace" className="pt-8">
            <MarketplaceSection />
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16 text-center relative z-10"
      >
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#093d30]/20 to-brandae-green/20 p-8 md:p-12 rounded-2xl border-2 border-brandae-green/20 shadow-lg shadow-brandae-green/5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take control of your ordering system?</h2>
          <p className="text-gray-300 mb-8">Join thousands of businesses who have increased their revenue with Brandae.</p>
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <AnimatedButton variant="primary" size="lg">
                  Book a Free Demo
                </AnimatedButton>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] bg-brandae-gray border-brandae-green/20 text-white">
              <ContactForm />
            </PopoverContent>
          </Popover>
        </div>
      </motion.div>
    </div>
  );
}

// Integration categories and items
const integrations = [
  {
    title: "Payment Providers",
    items: ["Stripe", "PayPal", "Razorpay", "Square", "Braintree"]
  },
  {
    title: "POS Systems",
    items: ["Petpooja", "Square", "Toast", "Lightspeed", "Clover"]
  },
  {
    title: "Marketing Tools",
    items: ["WhatsApp Business", "SMS APIs", "Email Marketing", "Push Notifications", "Customer CRM"]
  },
  {
    title: "Delivery Services",
    items: ["Internal Delivery", "Third-party Delivery", "Route Optimization", "Tracking APIs"]
  },
  {
    title: "Analytics & Reporting",
    items: ["Google Analytics", "Custom Reports", "Data Export", "Business Intelligence"]
  },
  {
    title: "Other Tools",
    items: ["Inventory Management", "Accounting Software", "Customer Loyalty", "Zapier"]
  }
];
