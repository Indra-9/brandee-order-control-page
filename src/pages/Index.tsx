import React, { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AnimatedButton from '@/components/AnimatedButton';
import FeatureCard from '@/components/FeatureCard';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';
import StepCard from '@/components/StepCard';
import TestimonialCard from '@/components/TestimonialCard';
import IntegrationLogo from '@/components/IntegrationLogo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import SEO from '@/components/SEO';

const Index = () => {
  const {
    scrollYProgress
  } = useScroll();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return <div className="min-h-screen bg-brandae-dark text-white relative overflow-hidden">
      <SEO title="Brandae - Own Your Orders, Own Your Customers | Food Ordering Apps" description="Say goodbye to aggregator commissions and customer data loss. Brandae helps restaurants and grocery stores grow with your own branded ordering app, powerful marketing tools, and delivery control." />

      {/* Floating animated elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-20 left-10 w-4 h-4 bg-brandae-green/30 rounded-full" animate={{
        y: [0, -20, 0],
        x: [0, 10, 0]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute top-1/3 right-20 w-6 h-6 bg-[#093d30]/40 rounded-full" animate={{
        y: [0, 30, 0],
        x: [0, -15, 0]
      }} transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }} />
        <motion.div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-brandae-green/25 rounded-full" animate={{
        y: [0, -25, 0],
        x: [0, 20, 0]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }} />
        <motion.div className="absolute top-2/3 right-1/3 w-5 h-5 bg-[#093c2f]/30 rounded-full" animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      }} transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }} />
      </div>

      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brandae-darker via-brandae-dark to-brandae-darker/80 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(9,61,48,0.25),transparent_60%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandae-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brandae-green/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto z-10 px-0">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1 space-y-8" 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-brandae-green/10 border border-brandae-green/20 text-brandae-green text-sm font-medium"
              >
                🚀 Zero Commission Platform
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold leading-tight" 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Own Your Orders.<br />
                <span className="gradient-text">Own Your Future.</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl" 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Break free from aggregator fees. Build your branded food delivery empire with our commission-free platform, advanced marketing tools, and complete customer ownership.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 pt-4" 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <AnimatedButton 
                        variant="primary" 
                        size="lg" 
                        className="rounded-2xl px-8 py-4 text-lg font-semibold shadow-2xl shadow-brandae-green/25 hover:shadow-brandae-green/40 transition-all duration-300"
                      >
                        Start Free Trial
                      </AnimatedButton>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] bg-brandae-gray border-white/10 text-white rounded-2xl">
                    <ContactForm 
                      isOpen={isContactFormOpen} 
                      onClose={() => setIsContactFormOpen(false)} 
                    />
                  </PopoverContent>
                </Popover>
                <AnimatedButton 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl px-8 py-4 text-lg font-semibold border-2 hover:bg-white/5 transition-all duration-300"
                >
                  Watch Demo
                </AnimatedButton>
              </motion.div>

              <motion.div 
                className="flex items-center gap-8 pt-8" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-brandae-green border-2 border-brandae-dark"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-brandae-dark"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-brandae-dark"></div>
                  </div>
                  <span className="text-sm text-gray-400">Trusted by 1,000+ restaurants</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm text-gray-400">4.9/5 rating</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative" 
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-brandae-green/30 to-blue-500/30 rounded-3xl blur-2xl opacity-75"></div>
                <div className="relative">
                  <img 
                    alt="Brandae App Demo" 
                    src="/lovable-uploads/a14793e5-192f-4f20-b156-b312a832363a.png" 
                    className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 object-cover transform hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brandae-dark/20 to-transparent rounded-3xl"></div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-8 -right-8 w-24 h-24 bg-brandae-green/20 rounded-2xl backdrop-blur-sm border border-brandae-green/30 flex items-center justify-center"
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-3xl">📱</span>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30 flex items-center justify-center"
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-2xl">💰</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brandae-green">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>
      
      {/* Featured Sections - Bento Grid */}
      <section id="features" className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
        <div className="container mx-auto px-0">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to <span className="gradient-text">Own Your Digital Storefront</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">All the tools you need to build a successful online ordering business without the hefty fees.</p>
          </motion.div>
          
          <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BentoGridItem delay={0} gradient="green">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Zero Commission Ordering System</h3>
                <p className="text-muted-foreground">Keep 100% of profits from every order – no more sharing 20-30% with aggregators.</p>
              </div>
            </BentoGridItem>
            
            <BentoGridItem delay={1} gradient="brand-dark">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Branded Mobile Apps & Website</h3>
                <p className="text-muted-foreground">Your own ordering channels with your logo, colors, and brand identity.</p>
              </div>
            </BentoGridItem>
            
            <BentoGridItem delay={2} gradient="blue">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Data Ownership</h3>
                <p className="text-muted-foreground">Full access to user data for remarketing and analytics to build lasting relationships.</p>
              </div>
            </BentoGridItem>
            
            <BentoGridItem delay={3} gradient="pink">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12Z" />
                    <path d="M18 18h4" />
                    <path d="M18 14h4" />
                    <path d="M18 10h4" />
                    <path d="M18 6h4" />
                    <path d="M2 17v-3a4 4 0 0 1 8 0v3" />
                    <path d="M4 17h4" />
                    <circle cx="6" cy="10" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Marketing Tools</h3>
                <p className="text-muted-foreground">Push, SMS, email, referral, cashback, and loyalty engines built-in to retain customers.</p>
              </div>
            </BentoGridItem>
            
            <BentoGridItem delay={4} gradient="orange">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="M9.9 12.1L11.5 14l2.6-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Delivery Management System</h3>
                <p className="text-muted-foreground">Assign drivers, track orders in real-time, and auto-optimize delivery routes.</p>
              </div>
            </BentoGridItem>
            
            <BentoGridItem delay={5} gradient="mixed">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M5 12v4.604a1 1 0 0 0 .32.734l3.058 2.688a1 1 0 0 0 1.524-.281L12 16M19 12V5.604a1 1 0 0 0-.32-.734l-3.058-2.688a1 1 0 0 0-1.524.281L12 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
                <p className="text-muted-foreground">Insights on sales, order trends, customer behavior, and campaign performance.</p>
              </div>
            </BentoGridItem>
          </BentoGrid>
        </div>
      </section>
      
      {/* How It Works - 3-Step Flow */}
      <section id="how-it-works" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="container mx-auto px-0">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Online in <span className="gradient-text">3 Simple Steps</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Launch your digital storefront in minutes, not months.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard number={1} title="Create Your Storefront" description="Add your logo, menu items with images, and select your brand theme to match your identity perfectly." />
            
            <StepCard number={2} title="Customize & Set Offers" description="Set your pricing, delivery areas, and create launch campaigns to attract your first customers." />
            
            <StepCard number={3} title="Go Live & Start Earning" description="Share your app link, QR code, and start accepting orders directly with zero commission fees." />
          </div>
        </div>
      </section>
      
      {/* Branded For Different Verticals */}
      <section id="solutions" className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
        <div className="container mx-auto px-0">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for <span className="gradient-text">Every Local Business</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Tailored solutions for different types of food and grocery businesses.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div className="relative h-64 rounded-xl overflow-hidden group" whileHover={{
            y: -5
          }}>
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img src="/placeholder.svg" alt="Restaurants" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Restaurants</h3>
                <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Full-menu online ordering optimized for dine-in and takeout experiences.</p>
              </div>
            </motion.div>
            
            <motion.div className="relative h-64 rounded-xl overflow-hidden group" whileHover={{
            y: -5
          }}>
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img src="/placeholder.svg" alt="Cloud Kitchens" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Cloud Kitchens</h3>
                <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delivery-optimized ordering with multi-brand support and virtual storefronts.</p>
              </div>
            </motion.div>
            
            <motion.div className="relative h-64 rounded-xl overflow-hidden group" whileHover={{
            y: -5
          }}>
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img src="/placeholder.svg" alt="Grocery Stores" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Grocery Stores</h3>
                <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Category-based browsing with inventory management and scheduled deliveries.</p>
              </div>
            </motion.div>
            
            <motion.div className="relative h-64 rounded-xl overflow-hidden group" whileHover={{
            y: -5
          }}>
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img src="/placeholder.svg" alt="Cafes & Bakeries" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Cafes & Bakeries</h3>
                <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Pre-ordering, pickup scheduling, and loyalty programs for regular customers.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview */}
      <section id="dashboard" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="container mx-auto px-0">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div className="flex-1" initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Track Everything.</span><br />
                Improve Every Day.
              </h2>
              
              <p className="text-lg text-gray-300 mb-8">
                Powerful analytics dashboard with real-time insights into your business performance. Make data-driven decisions to optimize menu items, marketing campaigns, and delivery operations.
              </p>
              
              <ul className="space-y-4">
                {[{
                title: 'Sales Trends',
                description: 'Track daily, weekly, and monthly revenue patterns'
              }, {
                title: 'Repeat Customers',
                description: 'Monitor customer retention and ordering frequency'
              }, {
                title: 'Average Order Value',
                description: 'Identify opportunities to increase order sizes'
              }, {
                title: 'Campaign ROI',
                description: 'Measure the effectiveness of your marketing efforts'
              }].map((item, index) => <motion.li key={index} className="flex items-start gap-3" initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }}>
                    <div className="mt-1 text-brandae-green">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.li>)}
              </ul>
            </motion.div>
            
            <motion.div className="flex-1 relative" initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }}>
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-[#093d30]/20 to-transparent rounded-3xl filter blur-xl"></div>
                <img src="/placeholder.svg" alt="Analytics Dashboard" className="relative z-10 w-full h-auto rounded-xl shadow-xl border border-white/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
        <div className="container mx-auto px-0">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by <span className="gradient-text">1,000+ Local Businesses</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">See what our customers are saying about their experience with Brandae.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard quote="Since switching to Brandae, our profit margins have gone up by 25%. No more commission fees means we can finally invest in growing our business." author="Raj Kumar" company="Spice Garden Restaurant" image="/placeholder.svg" />
            
            <TestimonialCard quote="The marketing tools are incredible. Our customer retention is up by 40% thanks to the automated loyalty program and push notifications." author="Sarah Chen" company="Green Basket Grocery" image="/placeholder.svg" />
            
            <TestimonialCard quote="The setup was so easy! Within a week, we had our own branded app and were taking direct orders. Support team was super helpful." author="Mike Johnson" company="City Brew Coffee" image="/placeholder.svg" />
          </div>
          
          <motion.div className="mt-12 text-center" whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <AnimatedButton variant="outline" size="md" className="rounded">See More Success Stories</AnimatedButton>
          </motion.div>
        </div>
      </section>
      
      {/* Admin Panel & Toolkit */}
      <section id="toolkit" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="container mx-auto px-0">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">You're Always <span className="gradient-text">in Control</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Powerful yet intuitive tools that put you in the driver's seat.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div className="bg-brandae-gray p-6 rounded-xl border border-white/5 group hover:border-brandae-green transition-colors duration-300" whileHover={{
            y: -5
          }}>
              <h3 className="text-xl font-semibold mb-4">Menu Editor</h3>
              <p className="text-muted-foreground mb-6">Easily update your menu items, prices, descriptions, and availability in real-time.</p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt="Menu Editor" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
                  <span className="text-sm text-white">Intuitive drag-and-drop interface</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-brandae-gray p-6 rounded-xl border border-white/5 group hover:border-brandae-green transition-colors duration-300" whileHover={{
            y: -5
          }}>
              <h3 className="text-xl font-semibold mb-4">Campaign Builder</h3>
              <p className="text-muted-foreground mb-6">Create and launch marketing campaigns with customizable templates in minutes.</p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt="Campaign Builder" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
                  <span className="text-sm text-white">Track performance in real-time</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-brandae-gray p-6 rounded-xl border border-white/5 group hover:border-brandae-green transition-colors duration-300" whileHover={{
            y: -5
          }}>
              <h3 className="text-xl font-semibold mb-4">Live Order Feed</h3>
              <p className="text-muted-foreground mb-6">Monitor incoming orders, kitchen status, and delivery progress from one dashboard.</p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt="Live Order Feed" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
                  <span className="text-sm text-white">Real-time notifications</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-brandae-gray p-6 rounded-xl border border-white/5 group hover:border-brandae-green transition-colors duration-300" whileHover={{
            y: -5
          }}>
              <h3 className="text-xl font-semibold mb-4">Driver Assignment</h3>
              <p className="text-muted-foreground mb-6">Manage your delivery fleet, optimize routes, and track deliveries in real-time.</p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt="Driver Assignment" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
                  <span className="text-sm text-white">Automated route optimization</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Integrations */}
      <section id="integrations" className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Plug & Play With <span className="gradient-text">Your Tools</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Brandae seamlessly integrates with your existing tech stack.</p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <motion.div key={index} whileHover={{
            y: -5,
            scale: 1.05
          }} className="bg-brandae-gray p-4 rounded-xl flex items-center justify-center h-24 border border-white/5">
                <img src="/placeholder.svg" alt={`Integration ${index}`} className="max-h-12" />
              </motion.div>)}
          </div>
        </div>
      </section>
      
      {/* Security & Reliability */}
      <section id="security" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="container mx-auto px-0">
          <div className="bg-brandae-gray p-8 md:p-12 border border-white/5 bg-brandae-dark/50 p-6 border border-brandae-purple/20 cursor-pointer hover:border-brandae-purple/40 transition-all duration-300 rounded-3xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div className="flex-1" initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="gradient-text">Enterprise-grade Security,</span><br />
                  SMB Pricing
                </h2>
                
                <ul className="space-y-4">
                  {['End-to-end encryption for all transactions', 'GDPR-ready data policies and storage', 'Daily automated backups of your critical data', '99.99% uptime guarantee with 24/7 monitoring'].map((item, index) => <motion.li key={index} className="flex items-center gap-3" initial={{
                  opacity: 0,
                  y: 10
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}>
                      <div className="text-brandae-green">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          <path d="M9.9 12.1L11.5 14l2.6-4" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </motion.li>)}
                </ul>
              </motion.div>
              
              <motion.div className="flex-shrink-0 w-full md:w-1/3" initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-brandae-green/20 rounded-full blur-3xl"></div>
                  <img src="/placeholder.svg" alt="Security" className="relative z-10 w-full h-auto" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section with Form Popup */}
      <section className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#093d30]/20 to-transparent opacity-50"></div>
        <div className="container mx-auto relative z-10 px-0">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              Ready to <span className="gradient-text">Boost Your Revenue?</span>
            </motion.h2>
            
            <motion.p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }}>
              Join thousands of local businesses who have taken control of their online ordering experience and increased their revenue by up to 30%.
            </motion.p>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="inline-block">
                    <AnimatedButton variant="primary" size="lg" className="rounded">
                      Schedule Your Free Demo
                    </AnimatedButton>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
                  <ContactForm 
                    isOpen={isContactFormOpen} 
                    onClose={() => setIsContactFormOpen(false)} 
                  />
                </PopoverContent>
              </Popover>
            </motion.div>
            
            <motion.div className="mt-8 flex flex-wrap justify-center gap-6" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }}>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-4 h-4 rounded-full bg-brandae-green/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brandae-green"></div>
                </div>
                <span>No credit card required</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-4 h-4 rounded-full bg-brandae-green/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brandae-green"></div>
                </div>
                <span>30-day free trial</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-4 h-4 rounded-full bg-brandae-green/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brandae-green"></div>
                </div>
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="px-6 md:px-12 lg:px-24 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#093d30]/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-gradient-radial from-brandae-green/10 to-transparent opacity-50"></div>
        
        <div className="container mx-auto relative z-10 px-0">
          <motion.div className="text-center max-w-3xl mx-auto" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Launch Your Branded Ordering App <span className="gradient-text">Today</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-10">
              No commissions. No middlemen. Full control.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <AnimatedButton variant="primary" size="lg" className="rounded">Start Free Trial</AnimatedButton>
              <AnimatedButton variant="outline" size="lg" className="rounded">Talk to Sales</AnimatedButton>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="text-brandae-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span>GDPR Compliant</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="text-brandae-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span>Zero Commission</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="text-brandae-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span>Free Setup</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>;
};

export default Index;
