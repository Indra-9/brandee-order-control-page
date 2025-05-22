
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';
import AnimatedButton from '@/components/AnimatedButton';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ContactForm from '@/components/ContactForm';
import { Layers, CreditCard, Check, Settings, Link, Zap, TrendingUp, Info } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-brandae-darker to-brandae-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto pt-32 pb-16 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Powerful <span className="gradient-text">Features</span> to Grow Your Business
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
          Brandae provides all the tools you need to create your own branded ordering system and take control of your customer experience.
        </p>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 mb-16">
        <Tabs defaultValue="features" onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-brandae-gray/50 mx-auto border border-white/10">
            <TabsTrigger value="features" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brandae-purple/20 data-[state=active]:to-brandae-green/20">
              <Layers className="mr-2 h-4 w-4" />
              Core Features
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brandae-purple/20 data-[state=active]:to-brandae-green/20">
              <Link className="mr-2 h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brandae-purple/20 data-[state=active]:to-brandae-green/20">
              <Settings className="mr-2 h-4 w-4" />
              Dashboard
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
                
                <BentoGridItem gradient="purple" delay={1}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-brandae-purple/10 w-fit">
                      <Zap className="h-6 w-6 text-brandae-purple" />
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
                    <div className="mb-4 p-2 rounded-full bg-gradient-to-r from-brandae-purple/10 to-brandae-green/10 w-fit">
                      <Check className="h-6 w-6 text-brandae-green" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
                    <p className="text-gray-300">Insights on sales, order trends, customer behavior, and campaign performance.</p>
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
                    className="bg-brandae-gray rounded-xl p-6 border border-white/5"
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
            <motion.div
              initial="hidden"
              animate={activeTab === 'dashboard' ? "visible" : "hidden"}
              variants={fadeIn}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Powerful Dashboard</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">Everything you need to manage your business in one place.</p>
              </div>
              
              <div className="bg-brandae-gray rounded-xl p-6 border border-white/5 overflow-hidden">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Dashboard Preview</h3>
                    <span className="text-brandae-green text-sm">Live Data</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {dashboardMetrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="bg-brandae-dark p-4 rounded-lg border border-white/5"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">{metric.name}</span>
                          {metric.change > 0 ? (
                            <span className="text-green-400 text-xs flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />+{metric.change}%
                            </span>
                          ) : (
                            <span className="text-red-400 text-xs">-{Math.abs(metric.change)}%</span>
                          )}
                        </div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="h-48 md:h-64 bg-brandae-dark rounded-lg border border-white/5 flex items-center justify-center">
                    <p className="text-gray-400">Interactive analytics dashboard visualization</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-brandae-purple/20 to-brandae-green/20 p-8 md:p-12 rounded-2xl border border-white/10">
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
            <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
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

// Dashboard metrics for demonstration
const dashboardMetrics = [
  {
    name: "Total Orders",
    value: "1,234",
    change: 12.5
  },
  {
    name: "Revenue",
    value: "$9,876",
    change: 8.3
  },
  {
    name: "Active Users",
    value: "587",
    change: 15.2
  },
  {
    name: "Avg. Order Value",
    value: "$42.50",
    change: -2.1
  }
];
