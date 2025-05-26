import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';
import AnimatedButton from '@/components/AnimatedButton';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ContactForm from '@/components/ContactForm';
import SEO from '@/components/SEO';
import { Layers, CreditCard, Check, Settings, Link, Zap, TrendingUp, Info, Clock, Globe, Shield, MessageSquare, Bell, Package, Search, Users, Store, Building, ShoppingCart, DollarSign, Database, ExternalLink, BarChart3, Medal, CircleUser, Truck, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import FeatureCard from '@/components/FeatureCard';
export default function Features() {
  const [activeTab, setActiveTab] = useState('features');
  const moveAnimation = useAnimation();

  // Animation for moving elements
  useEffect(() => {
    const animateMovement = async () => {
      await moveAnimation.start({
        y: [0, -10, 0],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      });
    };
    animateMovement();
  }, [moveAnimation]);
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  const staggerContainer = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-brandae-darker to-brandae-dark text-white">
      <SEO title="Features - Brandae | Grow Your Business with Advanced Ordering Tools" description="Explore the powerful features of Brandae that help restaurants and grocery stores grow with branded ordering apps, marketing tools, and delivery control." />
      
      <Navbar />
      
      {/* Hero Section with Moving Elements */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="container mx-auto pt-32 pb-16 px-4 relative">
        {/* Moving Element 1 - Top Left */}
        <motion.div animate={moveAnimation} className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-[#093d30]/30 to-brandae-green/30 blur-xl" />
        {/* Moving Element 2 - Top Right */}
        <motion.div animate={{
        y: [0, -15, 0],
        transition: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 0.5
        }
      }} className="absolute top-24 right-10 w-16 h-16 rounded-full bg-brandae-green/20 blur-lg" />
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Powerful <span className="text-brandae-green">Features</span> to Grow Your Business
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
          Brandae provides all the tools you need to create your own branded ordering system and take control of your customer experience.
        </p>
        
        {/* Moving Element 3 - Bottom Center */}
        <motion.div animate={{
        x: [0, 10, 0, -10, 0],
        transition: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut"
        }
      }} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 rounded-full bg-[#093d30]/40 blur-md" />
      </motion.div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 mb-16">
        <Tabs defaultValue="features" onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-brandae-gray/50 mx-auto border border-white/10 rounded-none px-0 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="features" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/20 data-[state=active]:to-brandae-green/20 text-xs md:text-sm px-2 md:px-4 py-3 md:py-2 rounded">
              <Layers className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Core </span>Features
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/20 data-[state=active]:to-brandae-green/20 text-xs md:text-sm px-2 md:px-4 py-3 md:py-2">
              <Link className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Integrations</span>
              <span className="sm:hidden">Plugins</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/20 data-[state=active]:to-brandae-green/20 text-xs md:text-sm px-2 md:px-4 py-3 md:py-2">
              <Settings className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/20 data-[state=active]:to-brandae-green/20 text-xs md:text-sm px-2 md:px-4 py-3 md:py-2">
              <Store className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Marketplace</span>
              <span className="sm:hidden">Market</span>
            </TabsTrigger>
          </TabsList>

          {/* Features Tab Content */}
          <TabsContent value="features" className="pt-8">
            <motion.div initial="hidden" animate={activeTab === 'features' ? "visible" : "hidden"} variants={staggerContainer}>
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

                {/* New Feature Cards */}
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
            <motion.div initial="hidden" animate={activeTab === 'integrations' ? "visible" : "hidden"} variants={staggerContainer} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">Connect Brandae with your existing tools and systems for a unified workflow.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((category, idx) => <motion.div key={category.title} variants={fadeIn} custom={idx} className="bg-brandae-gray rounded-xl p-6 border border-brandae-green/30">
                    <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.items.map((item, i) => <motion.li key={i} initial={{
                    opacity: 0,
                    x: -10
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: 0.1 * i
                  }} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-brandae-green" />
                          <span>{item}</span>
                        </motion.li>)}
                    </ul>
                  </motion.div>)}
              </div>
            </motion.div>
          </TabsContent>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="pt-8">
            <motion.div initial="hidden" animate={activeTab === 'dashboard' ? "visible" : "hidden"} variants={fadeIn} className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Powerful Dashboard</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">Everything you need to manage your business in one place.</p>
              </div>
              
              <div className="bg-brandae-gray rounded-xl p-6 border border-brandae-green/30 overflow-hidden">
                <motion.div initial={{
                y: 100,
                opacity: 0
              }} animate={{
                y: 0,
                opacity: 1
              }} transition={{
                delay: 0.2,
                duration: 0.7
              }}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Dashboard Preview</h3>
                    <span className="text-brandae-green text-sm">Live Data</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {dashboardMetrics.map((metric, idx) => <motion.div key={idx} initial={{
                    scale: 0.9,
                    opacity: 0
                  }} animate={{
                    scale: 1,
                    opacity: 1
                  }} transition={{
                    delay: 0.2 + idx * 0.1
                  }} className="bg-brandae-dark p-4 rounded-lg border border-brandae-green/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">{metric.name}</span>
                          {metric.change > 0 ? <span className="text-green-400 text-xs flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />+{metric.change}%
                            </span> : <span className="text-red-400 text-xs">-{Math.abs(metric.change)}%</span>}
                        </div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                      </motion.div>)}
                  </div>
                  
                  {/* Additional Dashboard Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.6
                  }} className="md:col-span-2 bg-brandae-dark rounded-lg border border-brandae-green/20 p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-brandae-green" />
                        Revenue Overview
                      </h4>
                      <div className="h-40 w-full bg-gradient-to-r from-[#093d30]/30 to-brandae-green/10 rounded flex items-center justify-center">
                        <p className="text-sm text-gray-400">Interactive revenue chart</p>
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.7
                  }} className="bg-brandae-dark rounded-lg border border-brandae-green/20 p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-brandae-green" />
                        Customer Growth
                      </h4>
                      <div className="h-40 w-full bg-gradient-to-r from-[#093d30]/30 to-brandae-green/10 rounded flex items-center justify-center">
                        <p className="text-sm text-gray-400">Customer acquisition chart</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.8
                  }} className="bg-brandae-dark rounded-lg border border-brandae-green/20 p-4">
                      <h4 className="font-medium mb-2">Recent Orders</h4>
                      <ul className="space-y-2">
                        {[1, 2, 3].map(i => <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-sm">Order #{10243 + i}</span>
                            <span className="text-xs text-brandae-green">$47.{20 + i}</span>
                          </li>)}
                      </ul>
                    </motion.div>
                    
                    <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.9
                  }} className="bg-brandae-dark rounded-lg border border-brandae-green/20 p-4">
                      <h4 className="font-medium mb-2">Popular Items</h4>
                      <ul className="space-y-2">
                        {['Classic Burger', 'Chicken Wings', 'Veggie Salad'].map((item, i) => <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-sm">{item}</span>
                            <span className="text-xs text-gray-400">{93 - i * 12}% popularity</span>
                          </li>)}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
          
          {/* NEW: Marketplace Tab Content */}
          <TabsContent value="marketplace" className="pt-8">
            <motion.div initial="hidden" animate={activeTab === 'marketplace' ? "visible" : "hidden"} variants={fadeIn} className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Marketplace Solutions</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Create your own branded marketplace with multi-vendor support, connecting sellers and customers seamlessly.
                </p>
              </div>
              
              {/* Marketplace Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.1
              }} className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/30">
                  <div className="mb-4 p-3 rounded-full bg-[#093d30]/20 w-fit">
                    <Store className="h-8 w-8 text-brandae-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Multi-Vendor Platform</h3>
                  <p className="text-gray-300 mb-4">
                    Facilitates transactions between multiple independent sellers and customers, all under your brand.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Individual vendor dashboards
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Customizable commission structures
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Automated vendor payments
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.2
              }} className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/30">
                  <div className="mb-4 p-3 rounded-full bg-[#093d30]/20 w-fit">
                    <ShoppingCart className="h-8 w-8 text-brandae-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Vendor Management</h3>
                  <p className="text-gray-300 mb-4">
                    Acts as a platform where various vendors can showcase and sell their products or services.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Vendor onboarding workflows
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Product approval systems
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Performance analytics
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.3
              }} className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/30">
                  <div className="mb-4 p-3 rounded-full bg-[#093d30]/20 w-fit">
                    <DollarSign className="h-8 w-8 text-brandae-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Transaction Management</h3>
                  <p className="text-gray-300 mb-4">
                    Manages the platform, transactions, and logistics while vendors control their offerings.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Split payments
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Tax management
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Refund processing
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.4
              }} className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/30">
                  <div className="mb-4 p-3 rounded-full bg-[#093d30]/20 w-fit">
                    <Truck className="h-8 w-8 text-brandae-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Logistics Coordination</h3>
                  <p className="text-gray-300 mb-4">
                    Similar to marketplaces like UberEats, Zomato, Swiggy, and Instacart with centralized delivery.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Multi-vendor order bundling
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Optimized delivery routing
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 mr-2 text-brandae-green" /> Driver assignment algorithms
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              {/* Marketplace Comparison */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="bg-brandae-gray rounded-xl border border-brandae-green/30 p-6 max-w-5xl mx-auto">
                <h3 className="text-xl font-bold mb-4">Why Build Your Own Marketplace?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg text-brandae-green mb-2">Your Platform</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-brandae-green" />
                        <span className="text-gray-300 text-sm">Full control over branding and user experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-brandae-green" />
                        <span className="text-gray-300 text-sm">Direct customer relationships</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-brandae-green" />
                        <span className="text-gray-300 text-sm">Customizable commission structures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-brandae-green" />
                        <span className="text-gray-300 text-sm">Complete data ownership</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg text-gray-400 mb-2">Third-Party Platforms</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-gray-500" />
                        <span className="text-gray-400 text-sm">Limited control over customer experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-gray-500" />
                        <span className="text-gray-400 text-sm">High commission fees (25-35% per order)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-gray-500" />
                        <span className="text-gray-400 text-sm">No access to customer data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-gray-500" />
                        <span className="text-gray-400 text-sm">Limited marketing opportunities</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <motion.div whileHover={{
                  scale: 1.05
                }} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#093d30] to-brandae-green/90 rounded-lg text-white">
                    <ExternalLink className="h-4 w-4" />
                    <span>Learn more about marketplace solutions</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* NEW SECTION 1: Customer Success Stories */}
      <motion.section initial={{
      opacity: 0,
      y: 50
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }} className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real <span className="text-brandae-green">Success Stories</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See how businesses like yours are thriving with Brandae's powerful features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, idx) => <motion.div key={idx} initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.1
        }} className="bg-brandae-gray rounded-xl p-6 border border-brandae-green/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#093d30] to-brandae-green flex items-center justify-center text-white font-bold text-xl">
                  {story.business[0]}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{story.business}</h3>
                  <p className="text-sm text-gray-400">{story.type}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{story.testimonial}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-brandae-green font-medium">{story.result}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>)}
                </div>
              </div>
            </motion.div>)}
        </div>
      </motion.section>

      {/* NEW SECTION 2: Feature Comparison */}
      <motion.section initial={{
      opacity: 0,
      y: 50
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }} className="container mx-auto px-4 py-20 bg-gradient-to-br from-brandae-darker/50 to-transparent rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-brandae-green">Brandae</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See how our features stack up against third-party aggregators
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left">Feature</th>
                <th className="p-4 text-center">
                  <span className="text-brandae-green font-bold">Brandae</span>
                </th>
                <th className="p-4 text-center">Third-party Aggregators</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, idx) => <motion.tr key={idx} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: idx * 0.05
            }} className="border-b border-white/5">
                  <td className="p-4 font-medium">{feature.name}</td>
                  <td className="p-4 text-center">
                    {feature.brandae ? <Check className="h-5 w-5 text-brandae-green mx-auto" /> : <span className="text-gray-500">—</span>}
                  </td>
                  <td className="p-4 text-center">
                    {feature.competitors ? <Check className="h-5 w-5 text-gray-500 mx-auto" /> : <span className="text-gray-500">—</span>}
                  </td>
                </motion.tr>)}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* NEW SECTION 3: How It Works */}
      <motion.section initial={{
      opacity: 0,
      y: 50
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }} className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Brandae <span className="text-brandae-green">Works</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Getting started with your own branded ordering system is simple
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {howItWorks.map((step, idx) => <motion.div key={idx} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.2
        }} className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/30 relative">
              <div className="absolute -top-5 -left-2 h-10 w-10 rounded-full bg-gradient-to-br from-[#093d30] to-brandae-green flex items-center justify-center text-white font-bold">
                {idx + 1}
              </div>
              <div className="mb-4 p-2 rounded-full bg-brandae-dark/50 w-fit">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>)}
        </div>
      </motion.section>

      {/* NEW SECTION 4: FAQ */}
      <motion.section initial={{
      opacity: 0,
      y: 50
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }} className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-brandae-green">Questions</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about Brandae's features and capabilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => <motion.div key={idx} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.1
        }} className="bg-brandae-gray rounded-xl p-6 border border-brandae-green/30">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <h3 className="text-lg font-semibold mb-3 cursor-pointer hover:text-brandae-green transition-colors flex items-center gap-2">
                    {faq.question}
                    <Info className="h-4 w-4 text-[#093d30]" />
                  </h3>
                </HoverCardTrigger>
                <HoverCardContent className="bg-brandae-darker border-brandae-green/20 w-80">
                  <p className="text-sm text-gray-300">Click to expand for more details about this feature.</p>
                </HoverCardContent>
              </HoverCard>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>)}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }} className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#093d30]/20 to-brandae-green/20 p-8 md:p-12 rounded-2xl border border-brandae-green/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take control of your ordering system?</h2>
          <p className="text-gray-300 mb-8">Join thousands of businesses who have increased their revenue with Brandae.</p>
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <AnimatedButton variant="primary" size="lg" className="rounded">
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
    </div>;
}

// Integration categories and items
const integrations = [{
  title: "Payment Providers",
  items: ["Stripe", "PayPal", "Razorpay", "Square", "Braintree"]
}, {
  title: "POS Systems",
  items: ["Petpooja", "Square", "Toast", "Lightspeed", "Clover"]
}, {
  title: "Marketing Tools",
  items: ["WhatsApp Business", "SMS APIs", "Email Marketing", "Push Notifications", "Customer CRM"]
}, {
  title: "Delivery Services",
  items: ["Internal Delivery", "Third-party Delivery", "Route Optimization", "Tracking APIs"]
}, {
  title: "Analytics & Reporting",
  items: ["Google Analytics", "Custom Reports", "Data Export", "Business Intelligence"]
}, {
  title: "Other Tools",
  items: ["Inventory Management", "Accounting Software", "Customer Loyalty", "Zapier"]
}];

// Dashboard metrics for demonstration - expanded with more metrics
const dashboardMetrics = [{
  name: "Total Orders",
  value: "1,234",
  change: 12.5
}, {
  name: "Revenue",
  value: "$9,876",
  change: 8.3
}, {
  name: "Active Users",
  value: "587",
  change: 15.2
}, {
  name: "Avg. Order Value",
  value: "$42.50",
  change: -2.1
}, {
  name: "Conversion Rate",
  value: "3.8%",
  change: 5.6
}, {
  name: "New Customers",
  value: "127",
  change: 9.4
}, {
  name: "Repeat Orders",
  value: "64%",
  change: 3.2
}, {
  name: "Delivery Time",
  value: "28 min",
  change: -4.7
}];

// Success Stories data
const successStories = [{
  business: "Spice Garden",
  type: "Indian Restaurant",
  testimonial: "Since implementing Brandae, we've seen a 40% increase in direct orders and saved thousands in commission fees that were previously going to delivery apps.",
  result: "40% increase in direct orders"
}, {
  business: "Fresh Market",
  type: "Grocery Store",
  testimonial: "Our customers love the convenience of our branded app. The loyalty program has dramatically increased repeat purchases and average order value.",
  result: "35% higher customer retention"
}, {
  business: "Burger Base",
  type: "Fast Food Chain",
  testimonial: "The marketing tools in Brandae have transformed how we engage with customers. Our push notification campaigns have a 30% conversion rate.",
  result: "3x ROI on marketing spend"
}];

// Comparison Features
const comparisonFeatures = [{
  name: "Zero Commission Fees",
  brandae: true,
  competitors: false
}, {
  name: "Branded Mobile App",
  brandae: true,
  competitors: false
}, {
  name: "Customer Data Ownership",
  brandae: true,
  competitors: false
}, {
  name: "Direct Customer Relationship",
  brandae: true,
  competitors: false
}, {
  name: "Customizable Loyalty Programs",
  brandae: true,
  competitors: true
}, {
  name: "Marketing Campaign Tools",
  brandae: true,
  competitors: false
}, {
  name: "Delivery Management",
  brandae: true,
  competitors: true
}, {
  name: "Real-time Analytics",
  brandae: true,
  competitors: true
}];

// How It Works steps
const howItWorks = [{
  title: "Consultation & Setup",
  description: "We'll understand your business needs and set up your branded ordering system with your colors and logo.",
  icon: <Settings className="h-6 w-6 text-brandae-green" />
}, {
  title: "Integration & Training",
  description: "We'll integrate with your existing systems and train your team on how to use the platform effectively.",
  icon: <Users className="h-6 w-6 text-brandae-green" />
}, {
  title: "Launch & Grow",
  description: "Launch your branded app and website to customers and use our tools to grow your direct ordering business.",
  icon: <Zap className="h-6 w-6 text-blue-400" />
}];

// FAQ items
const faqs = [{
  question: "How long does it take to set up?",
  answer: "Most businesses can be fully set up within 2-4 weeks, including app development, menu setup, and staff training."
}, {
  question: "Do I need technical knowledge?",
  answer: "No technical knowledge required. Our team handles all the setup, and the platform is designed to be user-friendly."
}, {
  question: "Can I keep using third-party platforms?",
  answer: "Yes, you can continue using third-party platforms while gradually shifting your customers to your own branded system."
}, {
  question: "How do I handle delivery logistics?",
  answer: "Brandae offers built-in delivery management tools to coordinate your own drivers or integrate with third-party delivery services."
}, {
  question: "Is there a contract lock-in period?",
  answer: "We offer flexible monthly plans with no long-term contracts, as well as annual plans with special pricing."
}, {
  question: "What kind of support is provided?",
  answer: "We provide 24/7 technical support, regular training sessions, and a dedicated account manager for enterprise clients."
}];