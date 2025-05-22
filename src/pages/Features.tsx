
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';
import AnimatedButton from '@/components/AnimatedButton';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ContactForm from '@/components/ContactForm';
import SEO from '@/components/SEO';
import { 
  Layers, 
  CreditCard, 
  Check, 
  Settings, 
  Link, 
  Zap, 
  TrendingUp, 
  Info, 
  Clock, 
  Globe,
  Shield,
  MessageSquare,
  Bell,
  Package,
  Search,
  Users,
  Store,
  ShoppingBag,
  BarChart3,
  Truck,
  Building,
  LayoutGrid
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import FeatureCard from '@/components/FeatureCard';

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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#093d30] to-[#093c2f] text-white">
      <SEO 
        title="Features - Brandae | Grow Your Business with Advanced Ordering Tools" 
        description="Explore the powerful features of Brandae that help restaurants and grocery stores grow with branded ordering apps, marketing tools, and delivery control."
      />
      
      <Navbar />
      
      {/* Hero Section with Moving Elements */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto pt-32 pb-16 px-4 relative"
      >
        <motion.div 
          animate={floatingAnimation} 
          className="absolute top-20 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-[#093d30]/20 to-[#093c2f]/10 blur-xl"
        />
        <motion.div 
          animate={pulseAnimation} 
          className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-[#093c2f]/30 to-[#093d30]/5 blur-xl"
        />
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Powerful <span className="bg-gradient-to-r from-[#093d30] to-[#093c2f] bg-clip-text text-transparent">Features</span> to Grow Your Business
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
          Brandae provides all the tools you need to create your own branded ordering system and take control of your customer experience.
        </p>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 mb-16">
        <Tabs defaultValue="features" onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#093d30]/30 mx-auto border border-white/10">
            <TabsTrigger value="features" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/50 data-[state=active]:to-[#093c2f]/40">
              <Layers className="mr-2 h-4 w-4" />
              Core Features
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/50 data-[state=active]:to-[#093c2f]/40">
              <Link className="mr-2 h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/50 data-[state=active]:to-[#093c2f]/40">
              <Settings className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#093d30]/50 data-[state=active]:to-[#093c2f]/40">
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
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <CreditCard className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Zero Commission Ordering</h3>
                    <p className="text-gray-300">Keep 100% of profits from every order placed through your system.</p>
                  </div>
                </BentoGridItem>
                
                <BentoGridItem gradient="green" delay={1}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <Zap className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Branded Mobile Apps</h3>
                    <p className="text-gray-300">Your own ordering channels with your logo, colors, and identity.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="blue" delay={2}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <Info className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Customer Data Ownership</h3>
                    <p className="text-gray-300">Full access to user data for remarketing and analytics.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="green" delay={3}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <TrendingUp className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Advanced Marketing Tools</h3>
                    <p className="text-gray-300">Push, SMS, email, referral, cashback, and loyalty engines built-in.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="green" delay={4} colSpan={2}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <Settings className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Delivery Management System</h3>
                    <p className="text-gray-300">Assign drivers, track orders in real-time, and auto-optimize routes for efficient deliveries.</p>
                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-center text-sm text-gray-300">
                        <Check className="h-4 w-4 mr-2 text-[#093c2f]" /> Route optimization
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <Check className="h-4 w-4 mr-2 text-[#093c2f]" /> Driver tracking
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <Check className="h-4 w-4 mr-2 text-[#093c2f]" /> Delivery zones
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <Check className="h-4 w-4 mr-2 text-[#093c2f]" /> Status updates
                      </li>
                    </ul>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="mixed" delay={5}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-gradient-to-r from-[#093d30]/20 to-[#093c2f]/20 w-fit">
                      <Check className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
                    <p className="text-gray-300">Insights on sales, order trends, customer behavior, and campaign performance.</p>
                  </div>
                </BentoGridItem>

                {/* Additional Feature Cards */}
                <BentoGridItem gradient="green" delay={6}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <Bell className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Smart Notifications</h3>
                    <p className="text-gray-300">Automated alerts for orders, promotions, and customer engagement.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="blue" delay={7}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <Globe className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Multi-language Support</h3>
                    <p className="text-gray-300">Reach diverse customer bases with localized ordering experiences.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="green" delay={8}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <Shield className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Secure Payment Processing</h3>
                    <p className="text-gray-300">PCI-compliant payment gateway with fraud protection systems.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="green" delay={9}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <MessageSquare className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">In-App Chat Support</h3>
                    <p className="text-gray-300">Direct communication with customers for order issues and feedback.</p>
                  </div>
                </BentoGridItem>
                
                {/* New Feature Cards */}
                <BentoGridItem gradient="green" delay={10}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <ShoppingBag className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Product Catalog Management</h3>
                    <p className="text-gray-300">Intuitive tools to manage your menu or product listings with ease.</p>
                  </div>
                </BentoGridItem>

                <BentoGridItem gradient="green" delay={11}>
                  <div className="p-6 h-full">
                    <div className="mb-4 p-2 rounded-full bg-[#093d30]/20 w-fit">
                      <LayoutGrid className="h-6 w-6 text-[#093c2f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Custom Store Layouts</h3>
                    <p className="text-gray-300">Design your digital storefront to match your brand's unique identity.</p>
                  </div>
                </BentoGridItem>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  animate={pulseAnimation}
                  className="md:col-span-2 lg:col-span-3"
                >
                  <BentoGridItem gradient="mixed" delay={12} colSpan={3}>
                    <div className="p-6 h-full">
                      <div className="mb-4 p-2 rounded-full bg-gradient-to-r from-[#093d30]/20 to-[#093c2f]/20 w-fit">
                        <Truck className="h-6 w-6 text-[#093c2f]" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Order Fulfillment Automation</h3>
                      <p className="text-gray-300 mb-4">Streamline your operations with intelligent order processing that minimizes wait times and manual errors.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#093d30]/30 p-3 rounded-lg">
                          <p className="text-sm font-semibold">Auto Assignment</p>
                        </div>
                        <div className="bg-[#093d30]/30 p-3 rounded-lg">
                          <p className="text-sm font-semibold">Smart Queueing</p>
                        </div>
                        <div className="bg-[#093d30]/30 p-3 rounded-lg">
                          <p className="text-sm font-semibold">Prep Time Estimation</p>
                        </div>
                        <div className="bg-[#093d30]/30 p-3 rounded-lg">
                          <p className="text-sm font-semibold">Batch Processing</p>
                        </div>
                      </div>
                    </div>
                  </BentoGridItem>
                </motion.div>
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
                    className="bg-[#093d30]/20 rounded-xl p-6 border border-white/5"
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
                          <Check className="h-4 w-4 mr-2 text-[#093c2f]" />
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
              
              <div className="bg-[#093d30]/20 rounded-xl p-6 border border-white/5 overflow-hidden">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Dashboard Preview</h3>
                    <span className="text-[#093c2f] text-sm">Live Data</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {dashboardMetrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="bg-[#093d30]/30 p-4 rounded-lg border border-white/5"
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
                  
                  {/* New Dashboard Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-[#093d30]/30 p-6 rounded-lg border border-white/5"
                    >
                      <div className="mb-4 flex items-center">
                        <div className="p-2 rounded-full bg-[#093d30]/50 mr-3">
                          <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-medium">Order Analytics</h3>
                      </div>
                      <div className="h-40 bg-[#093c2f]/20 rounded-lg flex items-center justify-center mb-3">
                        <p className="text-gray-400">Interactive chart visualization</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm text-gray-400">Conversion Rate</p>
                          <p className="text-xl font-semibold">24.8%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Avg. Order Time</p>
                          <p className="text-xl font-semibold">18.5 min</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-[#093d30]/30 p-6 rounded-lg border border-white/5"
                    >
                      <div className="mb-4 flex items-center">
                        <div className="p-2 rounded-full bg-[#093d30]/50 mr-3">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-medium">Customer Insights</h3>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">New Customers</span>
                          <span className="font-medium">42%</span>
                        </div>
                        <div className="w-full h-2 bg-[#093c2f]/20 rounded-full">
                          <div className="h-2 bg-[#093d30] rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Returning Customers</span>
                          <span className="font-medium">58%</span>
                        </div>
                        <div className="w-full h-2 bg-[#093c2f]/20 rounded-full">
                          <div className="h-2 bg-[#093d30] rounded-full" style={{ width: '58%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div>
                          <p className="text-sm text-gray-400">Avg. Spend</p>
                          <p className="text-lg font-semibold">$42.50</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Retention</p>
                          <p className="text-lg font-semibold">67.3%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Lifetime Value</p>
                          <p className="text-lg font-semibold">$850</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-[#093d30]/30 p-6 rounded-lg border border-white/5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Real-time Order Monitoring</h3>
                      <span className="text-xs bg-green-500/20 text-green-400 py-1 px-2 rounded-full">Live Updates</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-[#093c2f]/20 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-400">New Orders</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <div className="bg-[#093c2f]/20 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-400">Preparing</p>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                      <div className="bg-[#093c2f]/20 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-400">Out for Delivery</p>
                        <p className="text-2xl font-bold">5</p>
                      </div>
                      <div className="bg-[#093c2f]/20 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-400">Completed Today</p>
                        <p className="text-2xl font-bold">27</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
          
          {/* New Marketplace Tab Content */}
          <TabsContent value="marketplace" className="pt-8">
            <motion.div
              initial="hidden"
              animate={activeTab === 'marketplace' ? "visible" : "hidden"}
              variants={fadeIn}
              className="space-y-10"
            >
              <div className="text-center mb-8 relative">
                <motion.div 
                  animate={floatingAnimation} 
                  className="absolute top-0 right-20 w-16 h-16 rounded-full bg-[#093d30]/30 blur-md -z-10"
                />
                <h2 className="text-3xl font-bold mb-4">Marketplace Solutions</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Powerful tools for multi-vendor platforms that connect sellers with customers.
                </p>
              </div>
              
              <div className="bg-[#093d30]/20 border border-white/5 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">What is a Marketplace?</h3>
                <p className="text-gray-300 mb-6">
                  Aggregators or multi-vendor platforms that facilitate transactions between multiple independent sellers and customers.
                  Acts as a platform where various vendors can showcase and sell their products or services to a broader customer base.
                  Manages the platform, transactions, and sometimes logistics, while individual vendors maintain control over their offerings.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Examples include online marketplaces like Ubereats, Zomato, Swiggy, Instacart where multiple sellers offer a wide range of products to consumers.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-[#093c2f]/30 p-5 rounded-lg"
                  >
                    <div className="p-2 rounded-full bg-[#093d30]/40 w-fit mb-4">
                      <Store className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Vendor Management</h4>
                    <p className="text-gray-300 text-sm">
                      Complete tools for onboarding, managing, and monitoring vendors on your platform.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-[#093c2f]/30 p-5 rounded-lg"
                  >
                    <div className="p-2 rounded-full bg-[#093d30]/40 w-fit mb-4">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Commission Management</h4>
                    <p className="text-gray-300 text-sm">
                      Flexible commission structures with automated revenue sharing and vendor payouts.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-[#093c2f]/30 p-5 rounded-lg"
                  >
                    <div className="p-2 rounded-full bg-[#093d30]/40 w-fit mb-4">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Multi-location Support</h4>
                    <p className="text-gray-300 text-sm">
                      Manage vendors across different locations with geolocation-based search and filtering.
                    </p>
                  </motion.div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#093d30]/20 border border-white/5 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-4">For Platform Owners</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#093c2f] mt-0.5" />
                      <span>Centralized dashboard for monitoring all vendors and transactions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#093c2f] mt-0.5" />
                      <span>Automated commission calculation and settlement</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#093c2f] mt-0.5" />
                      <span>Vendor performance analytics and quality control tools</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#093c2f] mt-0.5" />
                      <span>Customer service and dispute resolution management</span>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#093d30]/20 border border-white/5 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-4">For Vendors</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#093c2f] mt-0.5" />
                      <span>Dedicated vendor portal to manage products, pricing, and availability</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#093c2f] mt-0.5" />
                      <span>Real-time order notifications and management tools</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#093c2f] mt-0.5" />
                      <span>Sales analytics and customer insights for growth</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#093c2f] mt-0.5" />
                      <span>Automated payout tracking and finance management</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-r from-[#093d30]/40 to-[#093c2f]/30 p-8 rounded-xl border border-white/10 text-center"
              >
                <h3 className="text-2xl font-bold mb-3">Ready to Build Your Marketplace?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Launch your multi-vendor platform with Brandae's complete marketplace solution and start connecting sellers with customers today.
                </p>
                <AnimatedButton variant="primary" size="lg">
                  Get Started
                </AnimatedButton>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* NEW SECTION 1: Customer Success Stories */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real <span className="bg-gradient-to-r from-[#093d30] to-[#093c2f] bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See how businesses like yours are thriving with Brandae's powerful features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#093d30]/20 rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#093d30] to-[#093c2f] flex items-center justify-center text-white font-bold text-xl">
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
                  <p className="text-sm text-[#093c2f] font-medium">{story.result}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* NEW SECTION 2: Feature Comparison */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20 bg-gradient-to-br from-[#093d30]/50 to-transparent rounded-2xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-[#093d30] to-[#093c2f] bg-clip-text text-transparent">Brandae</span>
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
                  <span className="bg-gradient-to-r from-[#093d30] to-[#093c2f] bg-clip-text text-transparent font-bold">Brandae</span>
                </th>
                <th className="p-4 text-center">Third-party Aggregators</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, idx) => (
                <motion.tr 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-white/5"
                >
                  <td className="p-4 font-medium">{feature.name}</td>
                  <td className="p-4 text-center">
                    {feature.brandae ? 
                      <Check className="h-5 w-5 text-[#093c2f] mx-auto" /> : 
                      <span className="text-gray-500">—</span>
                    }
                  </td>
                  <td className="p-4 text-center">
                    {feature.competitors ? 
                      <Check className="h-5 w-5 text-gray-500 mx-auto" /> : 
                      <span className="text-gray-500">—</span>
                    }
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* NEW SECTION 3: How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Brandae <span className="bg-gradient-to-r from-[#093d30] to-[#093c2f] bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Getting started with your own branded ordering system is simple
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {howItWorks.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-[#093d30]/20 p-6 rounded-xl border border-white/10 relative"
            >
              <div className="absolute -top-5 -left-2 h-10 w-10 rounded-full bg-gradient-to-br from-[#093d30] to-[#093c2f] flex items-center justify-center text-white font-bold">
                {idx + 1}
              </div>
              <div className="mb-4 p-2 rounded-full bg-[#093d30]/30 w-fit">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* NEW SECTION 4: FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-[#093d30] to-[#093c2f] bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about Brandae's features and capabilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#093d30]/20 rounded-xl p-6 border border-white/10"
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <h3 className="text-lg font-semibold mb-3 cursor-pointer hover:text-[#093c2f] transition-colors flex items-center gap-2">
                    {faq.question}
                    <Info className="h-4 w-4 text-[#093d30]" />
                  </h3>
                </HoverCardTrigger>
                <HoverCardContent className="bg-[#093d30]/80 border-white/10 w-80">
                  <p className="text-sm text-gray-300">Click to expand for more details about this feature.</p>
                </HoverCardContent>
              </HoverCard>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#093d30]/30 to-[#093c2f]/30 p-8 md:p-12 rounded-2xl border border-white/10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            animate={{ 
              textShadow: ["0 0 0px rgba(9, 61, 48, 0)", "0 0 15px rgba(9, 61, 48, 0.5)", "0 0 0px rgba(9, 61, 48, 0)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Ready to take control of your ordering system?
          </motion.h2>
          <p className="text-gray-300 mb-8">Join thousands of businesses who have increased their revenue with Brandae.</p>
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <AnimatedButton variant="primary" size="lg">
                  Book a Free Demo
                </AnimatedButton>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] bg-[#093d30]/80 border-white/10 text-white">
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

// Success Stories data
const successStories = [
  {
    business: "Spice Garden",
    type: "Indian Restaurant",
    testimonial: "Since implementing Brandae, we've seen a 40% increase in direct orders and saved thousands in commission fees that were previously going to delivery apps.",
    result: "40% increase in direct orders",
  },
  {
    business: "Fresh Market",
    type: "Grocery Store",
    testimonial: "Our customers love the convenience of our branded app. The loyalty program has dramatically increased repeat purchases and average order value.",
    result: "35% higher customer retention",
  },
  {
    business: "Burger Base",
    type: "Fast Food Chain",
    testimonial: "The marketing tools in Brandae have transformed how we engage with customers. Our push notification campaigns have a 30% conversion rate.",
    result: "3x ROI on marketing spend",
  }
];

// Comparison Features
const comparisonFeatures = [
  { name: "Zero Commission Fees", brandae: true, competitors: false },
  { name: "Branded Mobile App", brandae: true, competitors: false },
  { name: "Customer Data Ownership", brandae: true, competitors: false },
  { name: "Direct Customer Relationship", brandae: true, competitors: false },
  { name: "Customizable Loyalty Programs", brandae: true, competitors: true },
  { name: "Marketing Campaign Tools", brandae: true, competitors: false },
  { name: "Delivery Management", brandae: true, competitors: true },
  { name: "Real-time Analytics", brandae: true, competitors: true }
];

// How It Works steps
const howItWorks = [
  {
    title: "Consultation & Setup",
    description: "We'll understand your business needs and set up your branded ordering system with your colors and logo.",
    icon: <Settings className="h-6 w-6 text-[#093c2f]" />
  },
  {
    title: "Integration & Training",
    description: "We'll integrate with your existing systems and train your team on how to use the platform effectively.",
    icon: <Users className="h-6 w-6 text-[#093c2f]" />
  },
  {
    title: "Launch & Grow",
    description: "Launch your branded app and website to customers and use our tools to grow your direct ordering business.",
    icon: <Zap className="h-6 w-6 text-[#093c2f]" />
  }
];

// FAQ items
const faqs = [
  {
    question: "How long does it take to set up?",
    answer: "Most businesses can be fully set up within 2-4 weeks, including app development, menu setup, and staff training."
  },
  {
    question: "Do I need technical knowledge?",
    answer: "No technical knowledge required. Our team handles all the setup, and the platform is designed to be user-friendly."
  },
  {
    question: "Can I keep using third-party platforms?",
    answer: "Yes, you can continue using third-party platforms while gradually shifting your customers to your own branded system."
  },
  {
    question: "How do I handle delivery logistics?",
    answer: "Brandae offers built-in delivery management tools to coordinate your own drivers or integrate with third-party delivery services."
  },
  {
    question: "Is there a contract lock-in period?",
    answer: "We offer flexible monthly plans with no long-term contracts, as well as annual plans with special pricing."
  },
  {
    question: "What kind of support is provided?",
    answer: "We provide 24/7 technical support, regular training sessions, and a dedicated account manager for enterprise clients."
  }
];
