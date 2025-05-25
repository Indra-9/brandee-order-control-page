
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AnimatedButton from '@/components/AnimatedButton';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EnhancedContactForm from '@/components/EnhancedContactForm';
import { Check, CreditCard } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Footer from '@/components/Footer';

// Define new feature sets for the plans
const essentialFeatures = [
  "Basic Ordering System",
  "Standard Analytics",
  "Email Support",
  "Up to 50 Menu Items",
  "Single Location"
];

const premiumFeatures = [
  "Advanced Ordering System",
  "Advanced Analytics & Reporting",
  "Priority Email & Chat Support",
  "Up to 200 Menu Items",
  "Multi-Location Support (up to 5)",
  "Basic Marketing Tools"
];

const businessFeatures = [
  "Full Ordering Suite",
  "Premium Analytics & Custom Reports",
  "Dedicated Account Manager & Phone Support",
  "Unlimited Menu Items",
  "Multi-Location Support (unlimited)",
  "Advanced Marketing Suite & API Access"
];


export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const getYearlyPrice = (monthlyPrice: number) => {
    const yearly = monthlyPrice * 10; // 2 months free
    return yearly;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto pt-32 pb-16 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-primary">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto text-center mb-8">
          No hidden fees, no commissions. Just one predictable monthly fee for all the tools you need.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className={`mr-3 ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <div 
            className="w-14 h-7 bg-gray-200 rounded-full p-1 cursor-pointer relative"
            onClick={() => setIsYearly(!isYearly)}
          >
            <motion.div 
              className="w-5 h-5 bg-primary rounded-full absolute"
              animate={{ x: isYearly ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>
          <span className={`ml-3 ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly <span className="text-accent text-xs">Save 20%</span>
          </span>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Essential Plan */}
          <motion.div 
            variants={fadeIn}
            className="bg-white shadow-lg rounded border border-border hover:border-primary/40 transition-all"
          >
            <div className="p-8">
              <div className="text-sm text-accent mb-3">Essential</div>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-primary">${isYearly ? (49 * 10) : 49}</span>
                <span className="text-muted-foreground ml-2">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <p className="text-muted-foreground mb-6">Ideal for new businesses and single locations.</p>
              
              <ul className="space-y-3 mb-8">
                {essentialFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-accent" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <AnimatedButton variant="outline" className="w-full">
                      Get Started
                    </AnimatedButton>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <EnhancedContactForm />
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div 
            variants={fadeIn}
            className="bg-white shadow-lg rounded border border-primary shadow-xl shadow-primary/20 overflow-hidden relative hover:border-primary/60 transition-all transform scale-[1.02]"
          >
            <div className="bg-primary h-1.5 w-full"></div>
            <div className="bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded-full absolute -top-3 right-4">
              Most Popular
            </div>
            <div className="p-8">
              <div className="text-sm text-accent mb-3">Premium</div>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-primary">${isYearly ? (149 * 10) : 149}</span>
                <span className="text-muted-foreground ml-2">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <p className="text-muted-foreground mb-6">Perfect for growing businesses with multiple outlets.</p>
              
              <ul className="space-y-3 mb-8">
                {premiumFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-accent" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <AnimatedButton variant="default" className="w-full">
                      Get Started
                    </AnimatedButton>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <EnhancedContactForm />
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Business Plan */}
          <motion.div 
            variants={fadeIn}
            className="bg-white shadow-lg rounded border border-border hover:border-primary/40 transition-all"
          >
            <div className="p-8">
              <div className="text-sm text-accent mb-3">Business</div>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-primary">${isYearly ? (299 * 10) : 299}</span>
                <span className="text-muted-foreground ml-2">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <p className="text-muted-foreground mb-6">For established businesses and marketplaces.</p>
              
              <ul className="space-y-3 mb-8">
                {businessFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-accent" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <AnimatedButton variant="outline" className="w-full">
                      Get Started
                    </AnimatedButton>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <EnhancedContactForm />
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-brandae-gray rounded-xl border border-white/10 p-6 overflow-x-auto"
        >
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
              {comparisonFeatures.map((feature, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell>
                    {feature.singleStore ? 
                      typeof feature.singleStore === 'boolean' ? 
                        <Check className="h-5 w-5 text-brandae-green" /> : 
                        feature.singleStore : 
                      <span className="text-gray-500">—</span>
                    }
                  </TableCell>
                  <TableCell>
                    {feature.brandStores ? 
                      typeof feature.brandStores === 'boolean' ? 
                        <Check className="h-5 w-5 text-brandae-green" /> : 
                        feature.brandStores : 
                      <span className="text-gray-500">—</span>
                    }
                  </TableCell>
                  <TableCell>
                    {feature.marketplace ? 
                      typeof feature.marketplace === 'boolean' ? 
                        <Check className="h-5 w-5 text-brandae-green" /> : 
                        feature.marketplace : 
                      <span className="text-gray-500">—</span>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white shadow-sm rounded p-6 border border-border">
                <h3 className="text-xl font-bold mb-2 text-primary">{faq.question}</h3>
                <p className="text-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-3xl mx-auto bg-secondary p-8 md:p-12 rounded border border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Ready to grow your business?</h2>
          <p className="text-foreground mb-8">Join thousands of businesses who have increased their revenue with Brandae.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <AnimatedButton variant="default" size="lg">
                    Book a Free Demo
                  </AnimatedButton>
                </div>
              </DialogTrigger>
              <DialogContent>
                <EnhancedContactForm />
              </DialogContent>
            </Dialog>
            
            <AnimatedButton variant="outline" size="lg">
              <CreditCard className="mr-2 h-5 w-5" /> View Enterprise Plans
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

// Updated Comparison table features
const comparisonFeatures = [
  { name: "Menu Items", essential: "Up to 50", premium: "Up to 200", business: "Unlimited" },
  { name: "Locations", essential: "1", premium: "Up to 5", business: "Unlimited" },
  { name: "Basic Ordering", essential: true, premium: true, business: true },
  { name: "Standard Analytics", essential: true, premium: true, business: true },
  { name: "Advanced Analytics", essential: false, premium: true, business: true },
  { name: "Custom Reports", essential: false, premium: false, business: true },
  { name: "Basic Marketing Tools", essential: false, premium: true, business: true },
  { name: "Advanced Marketing Suite", essential: false, premium: false, business: true },
  { name: "API Access", essential: false, premium: false, business: true },
  { name: "Email Support", essential: true, premium: true, business: true },
  { name: "Priority Chat Support", essential: false, premium: true, business: true },
  { name: "Dedicated Account Manager", essential: false, premium: false, business: true },
];

// Updated FAQs
const faqs = [
  {
    question: "Is there a setup fee?",
    answer: "No, there are no hidden setup fees. The monthly subscription price covers everything you need to get started."
  },
  {
    question: "What does 'zero commission fee' mean?",
    answer: "Unlike aggregator apps that charge 20-30% commission on each order, Brandae lets you keep 100% of your order value. You pay only the fixed monthly subscription."
  },
  {
    question: "How long does it take to get my app live?",
    answer: "Typically, we can have your branded app ready within 2-3 weeks from signing up, including app store approval time."
  },
  {
    question: "Do I need technical knowledge to use Brandae?",
    answer: "Not at all. Our platform is designed to be user-friendly, and we provide full onboarding support to help you get comfortable with all features."
  },
  {
    question: "Can I migrate my existing customer data?",
    answer: "Yes, we provide tools and support to help you migrate customer data from your existing platforms into Brandae."
  }
];
