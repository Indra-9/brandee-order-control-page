import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AnimatedButton from '@/components/AnimatedButton';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ContactForm from '@/components/ContactForm';
import { Check, CreditCard } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  const getYearlyPrice = (monthlyPrice: number) => {
    const yearly = monthlyPrice * 10; // 2 months free
    return yearly;
  };
  return <div className="min-h-screen bg-gradient-to-b from-brandae-darker to-brandae-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="container mx-auto pt-32 pb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
          No hidden fees, no commissions. Just one predictable monthly fee for all the tools you need.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className={`mr-3 ${!isYearly ? "text-white" : "text-gray-400"}`}>Monthly</span>
          <div className="w-14 h-7 bg-brandae-gray rounded-full p-1 cursor-pointer relative" onClick={() => setIsYearly(!isYearly)}>
            <motion.div className="w-5 h-5 bg-brandae-green rounded-full absolute" animate={{
            x: isYearly ? 26 : 2
          }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }} />
          </div>
          <span className={`ml-3 ${isYearly ? "text-white" : "text-gray-400"}`}>
            Yearly <span className="text-brandae-green text-xs">Save 20%</span>
          </span>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Single Store Plan */}
          <motion.div variants={fadeIn} className="bg-gradient-to-b from-brandae-gray to-brandae-dark rounded-xl border border-white/10 overflow-hidden hover:border-brandae-green/40 transition-all">
            <div className="p-8">
              <div className="text-sm text-brandae-green mb-3">Single Store</div>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">${isYearly ? 99 * 10 : 99}</span>
                <span className="text-gray-400 ml-2">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <p className="text-gray-300 mb-6">For Custom Store App</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Single Store</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Web | iOS | Android</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Marketing Automation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Inbuilt Chat System</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Inbuilt POS System + App</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Realtime Order Tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Table Reservation system</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Detailed Analytics and more</span>
                </li>
              </ul>
              
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <AnimatedButton variant="outline" className="w-full rounded">
                      Get Started
                    </AnimatedButton>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
                  <ContactForm />
                </PopoverContent>
              </Popover>
            </div>
          </motion.div>

          {/* Brand Stores Plan */}
          <motion.div variants={fadeIn} className="bg-gradient-to-b from-brandae-gray to-brandae-dark rounded-xl border border-brandae-purple/50 overflow-hidden relative hover:border-brandae-purple transition-all transform scale-[1.02] shadow-xl shadow-brandae-purple/20">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-brandae-purple to-brandae-green h-1"></div>
            <div className="bg-gradient-to-r from-brandae-purple/10 to-brandae-green/10 text-white text-center py-2">
              Most Popular
            </div>
            <div className="p-8">
              <div className="text-sm text-brandae-green mb-3">Brand Stores</div>
              <div className="flex items-end mb-2">
                <span className="text-4xl font-bold">${isYearly ? 399 * 10 : 399}</span>
                <span className="text-gray-400 ml-2">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <p className="text-sm text-brandae-purple mb-4">12 Outlets</p>
              <p className="text-gray-300 mb-6">For Multi-outlet Brand App</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>All in Single Store +</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Up-to 12 Outlets</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Auto Nearest Outlet Assign</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Central Dashboard</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Integrated POS System</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>QR Scan & Ordering</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Zero commission Fee*</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Custom Franchise App</span>
                </li>
              </ul>
              
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <AnimatedButton variant="primary" className="w-full rounded">
                      Get Started
                    </AnimatedButton>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
                  <ContactForm />
                </PopoverContent>
              </Popover>
            </div>
          </motion.div>

          {/* Marketplace Plan */}
          <motion.div variants={fadeIn} className="bg-gradient-to-b from-brandae-gray to-brandae-dark rounded-xl border border-white/10 overflow-hidden hover:border-brandae-green/40 transition-all">
            <div className="p-8">
              <div className="text-sm text-brandae-green mb-3">Marketplace</div>
              <div className="flex items-end mb-2">
                <span className="text-4xl font-bold">${isYearly ? 449 * 10 : 449}</span>
                <span className="text-gray-400 ml-2">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <p className="text-sm text-brandae-purple mb-4">Aggregator</p>
              <p className="text-gray-300 mb-6">For Multivendor Marketplaces</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Unlimited Stores</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Web | iOS | Android</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Custom Report</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Marketing Automation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Fully Customisable Design</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Zero commission Fee*</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>Create Dynamic Offers</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-brandae-green" />
                  <span>And 100+ more features</span>
                </li>
              </ul>
              
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <AnimatedButton variant="outline" className="w-full rounded">
                      Get Started
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
      </motion.div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }} viewport={{
        once: true
      }} className="bg-brandae-gray rounded-xl border border-white/10 p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">Compare Plans</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Feature</TableHead>
                <TableHead>Single Store</TableHead>
                <TableHead>Brand Stores</TableHead>
                <TableHead>Marketplace</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFeatures.map((feature, idx) => <TableRow key={idx}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell>
                    {feature.singleStore ? typeof feature.singleStore === 'boolean' ? <Check className="h-5 w-5 text-brandae-green" /> : feature.singleStore : <span className="text-gray-500">—</span>}
                  </TableCell>
                  <TableCell>
                    {feature.brandStores ? typeof feature.brandStores === 'boolean' ? <Check className="h-5 w-5 text-brandae-green" /> : feature.brandStores : <span className="text-gray-500">—</span>}
                  </TableCell>
                  <TableCell>
                    {feature.marketplace ? typeof feature.marketplace === 'boolean' ? <Check className="h-5 w-5 text-brandae-green" /> : feature.marketplace : <span className="text-gray-500">—</span>}
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }} className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => <div key={idx} className="bg-brandae-gray p-6 border border-white/10 rounded">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>)}
          </div>
        </div>
      </motion.div>

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
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-brandae-purple/20 to-brandae-green/20 p-8 md:p-12 rounded-2xl border border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to grow your business?</h2>
          <p className="text-gray-300 mb-8">Join thousands of businesses who have increased their revenue with Brandae.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <AnimatedButton variant="primary" size="lg" className="rounded">
                    Book a Free Demo
                  </AnimatedButton>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
                <ContactForm />
              </PopoverContent>
            </Popover>
            
            
          </div>
        </div>
      </motion.div>
    </div>;
}

// Comparison table features
const comparisonFeatures = [{
  name: "Number of Locations",
  singleStore: "1",
  brandStores: "Up to 12",
  marketplace: "Unlimited"
}, {
  name: "Branded Mobile App",
  singleStore: true,
  brandStores: true,
  marketplace: true
}, {
  name: "Web Ordering",
  singleStore: true,
  brandStores: true,
  marketplace: true
}, {
  name: "POS Integration",
  singleStore: true,
  brandStores: true,
  marketplace: true
}, {
  name: "Marketing Tools",
  singleStore: true,
  brandStores: true,
  marketplace: true
}, {
  name: "Customer Database",
  singleStore: true,
  brandStores: true,
  marketplace: true
}, {
  name: "Multi-outlet Management",
  singleStore: false,
  brandStores: true,
  marketplace: true
}, {
  name: "Centralized Dashboard",
  singleStore: false,
  brandStores: true,
  marketplace: true
}, {
  name: "QR Code Ordering",
  singleStore: true,
  brandStores: true,
  marketplace: true
}, {
  name: "Vendor Management",
  singleStore: false,
  brandStores: false,
  marketplace: true
}, {
  name: "Commission Control",
  singleStore: false,
  brandStores: false,
  marketplace: true
}, {
  name: "White Label Option",
  singleStore: "Add-on",
  brandStores: "Add-on",
  marketplace: true
}];

// FAQs
const faqs = [{
  question: "Is there a setup fee?",
  answer: "No, there are no hidden setup fees. The monthly subscription price covers everything you need to get started."
}, {
  question: "What does 'zero commission fee' mean?",
  answer: "Unlike aggregator apps that charge 20-30% commission on each order, Brandae lets you keep 100% of your order value. You pay only the fixed monthly subscription."
}, {
  question: "How long does it take to get my app live?",
  answer: "Typically, we can have your branded app ready within 2-3 weeks from signing up, including app store approval time."
}, {
  question: "Do I need technical knowledge to use Brandae?",
  answer: "Not at all. Our platform is designed to be user-friendly, and we provide full onboarding support to help you get comfortable with all features."
}, {
  question: "Can I migrate my existing customer data?",
  answer: "Yes, we provide tools and support to help you migrate customer data from your existing platforms into Brandae."
}];