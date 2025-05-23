import React from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import AnimatedButton from '@/components/AnimatedButton';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <>
      <SEO 
        title="Brandae - Own Your Orders. Own Your Customers."
        description="Say goodbye to aggregator commissions and customer data loss. Brandae helps you grow with your own branded app, powerful marketing tools, and delivery control."
      />
      <div className="min-h-screen bg-brandae-dark text-white overflow-hidden">
        {/* Moving Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-[#c9f268]/10 rounded-full"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-24 h-24 bg-[#093d30]/20 rounded-full"
            animate={{
              y: [0, 30, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-40 h-40 bg-[#093c2f]/15 rounded-full"
            animate={{
              y: [0, -25, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <Navbar />
        
        {/* Hero Section with enhanced animations */}
        <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Own Your{" "}
                  <motion.span 
                    className="gradient-text"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    Orders
                  </motion.span>
                  . Own Your Customers.
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Say goodbye to aggregator commissions and customer data loss. 
                  Brandae helps you grow with your own branded app, powerful marketing tools, and delivery control.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <AnimatedButton variant="primary" size="lg">
                          Get Started - It's Free
                        </AnimatedButton>
                      </motion.div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[350px] bg-brandae-gray border-[#c9f268] text-white">
                      <ContactForm />
                    </PopoverContent>
                  </Popover>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <AnimatedButton variant="secondary" size="lg">
                      Watch Demo
                    </AnimatedButton>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 1, 0, -1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-gradient-to-br from-[#093d30] to-[#093c2f] rounded-3xl p-8 border-2 border-[#c9f268] shadow-lg shadow-[#c9f268]/20"
                >
                  <div className="aspect-video bg-brandae-dark rounded-2xl border border-[#c9f268]/30 p-6">
                    <div className="h-full flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[#c9f268] text-6xl font-bold"
                      >
                        📱
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
