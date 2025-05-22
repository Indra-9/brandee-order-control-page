import React, { useEffect } from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AnimatedButton from '@/components/AnimatedButton';
import FeatureCard from '@/components/FeatureCard';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';
import StepCard from '@/components/StepCard';
import TestimonialCard from '@/components/TestimonialCard';
import IntegrationLogo from '@/components/IntegrationLogo';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <Helmet>
        <title>Brandae - Own Your Orders, Own Your Customers | Food Ordering Apps</title>
        <meta name="description" content="Say goodbye to aggregator commissions and customer data loss. Brandae helps restaurants and grocery stores grow with your own branded ordering app, powerful marketing tools, and delivery control." />
        <meta name="keywords" content="food ordering app, restaurant app, zero commission, delivery management, restaurant tech, online ordering system, food delivery app" />
        <meta property="og:title" content="Brandae - Own Your Orders, Own Your Customers | Food Ordering Apps" />
        <meta property="og:description" content="Say goodbye to aggregator commissions and customer data loss. Brandae helps restaurants and grocery stores grow with your own branded ordering app, powerful marketing tools, and delivery control." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandae.com" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brandae - Own Your Orders, Own Your Customers" />
        <meta name="twitter:description" content="Say goodbye to aggregator commissions and customer data loss. Brandae helps restaurants and grocery stores grow with your own branded ordering app, powerful marketing tools, and delivery control." />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <link rel="canonical" href="https://brandae.com" />
      </Helmet>

      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brandae-darker to-brandae-dark z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_70%)]"></div>
        
        <div className="container mx-auto z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Own Your Orders. <br />
                <span className="gradient-text">Own Your Customers.</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Say goodbye to aggregator commissions and customer data loss. Brandae helps you grow with your own branded app, powerful marketing tools, and delivery control.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <AnimatedButton variant="primary" size="lg">Book a Demo</AnimatedButton>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
                    <ContactForm />
                  </PopoverContent>
                </Popover>
                <AnimatedButton variant="outline" size="lg">Watch How it Works</AnimatedButton>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-brandae-purple/20 to-transparent rounded-3xl filter blur-xl"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Brandae App Demo" 
                  className="relative z-10 w-full h-auto rounded-3xl shadow-xl border border-white/10"
                />
              </div>
              
              <motion.div 
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-brandae-green/30 rounded-full filter blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </div>
        </div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brandae-green"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>
      
      {/* Featured Sections - Bento Grid */}
      <section id="features" className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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
            
            <BentoGridItem delay={1} gradient="purple">
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
            
            <BentoGridItem delay={6} gradient="green">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">POS & Payment Integration</h3>
                <p className="text-muted-foreground">Works out-of-the-box with major systems like Razorpay, Petpooja, Stripe, and more.</p>
              </div>
            </BentoGridItem>
            
            <BentoGridItem delay={7} gradient="blue">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M7 7h.01" />
                    <path d="M17 7h.01" />
                    <path d="M7 17h.01" />
                    <path d="M17 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Admin Control Panel</h3>
                <p className="text-muted-foreground">Modify menu, pricing, offers, and track orders – no technical skills needed.</p>
              </div>
            </BentoGridItem>
            
            <BentoGridItem delay={8} gradient="purple">
              <div className="p-6 h-full">
                <div className="mb-4 text-brandae-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 10h.01" />
                    <path d="M12 10h.01" />
                    <path d="M8 10h.01" />
                    <path d="M16 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M8 14h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Affordable for SMBs</h3>
                <p className="text-muted-foreground">Fast setup, low monthly pricing, and massive ROI compared to traditional aggregators.</p>
              </div>
            </BentoGridItem>
          </BentoGrid>
        </div>
      </section>
      
      {/* How It Works - 3-Step Flow */}
      <section id="how-it-works" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Online in <span className="gradient-text">3 Simple Steps</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Launch your digital storefront in minutes, not months.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number={1}
              title="Create Your Storefront"
              description="Add your logo, menu items with images, and select your brand theme to match your identity perfectly."
            />
            
            <StepCard 
              number={2}
              title="Customize & Set Offers"
              description="Set your pricing, delivery areas, and create launch campaigns to attract your first customers."
            />
            
            <StepCard 
              number={3}
              title="Go Live & Start Earning"
              description="Share your app link, QR code, and start accepting orders directly with zero commission fees."
            />
          </div>
        </div>
      </section>
      
      {/* Branded For Different Verticals */}
      <section id="solutions" className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for <span className="gradient-text">Every Local Business</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Tailored solutions for different types of food and grocery businesses.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="relative h-64 rounded-xl overflow-hidden group"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img src="/placeholder.svg" alt="Restaurants" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Restaurants</h3>
                <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Full-menu online ordering optimized for dine-in and takeout experiences.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative h-64 rounded-xl overflow-hidden group"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img src="/placeholder.svg" alt="Cloud Kitchens" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Cloud Kitchens</h3>
                <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Delivery-optimized ordering with multi-brand support and virtual storefronts.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative h-64 rounded-xl overflow-hidden group"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img src="/placeholder.svg" alt="Grocery Stores" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">Grocery Stores</h3>
                <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Category-based browsing with inventory management and scheduled deliveries.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative h-64 rounded-xl overflow-hidden group"
              whileHover={{ y: -5 }}
            >
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
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Track Everything.</span><br />
                Improve Every Day.
              </h2>
              
              <p className="text-lg text-gray-300 mb-8">
                Powerful analytics dashboard with real-time insights into your business performance. Make data-driven decisions to optimize menu items, marketing campaigns, and delivery operations.
              </p>
              
              <ul className="space-y-4">
                {[
                  { title: 'Sales Trends', description: 'Track daily, weekly, and monthly revenue patterns' },
                  { title: 'Repeat Customers', description: 'Monitor customer retention and ordering frequency' },
                  { title: 'Average Order Value', description: 'Identify opportunities to increase order sizes' },
                  { title: 'Campaign ROI', description: 'Measure the effectiveness of your marketing efforts' }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mt-1 text-brandae-green">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-brandae-purple/20 to-transparent rounded-3xl filter blur-xl"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Analytics Dashboard" 
                  className="relative z-10 w-full h-auto rounded-xl shadow-xl border border-white/10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by <span className="gradient-text">1,000+ Local Businesses</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">See what our customers are saying about their experience with Brandae.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Since switching to Brandae, our profit margins have gone up by 25%. No more commission fees means we can finally invest in growing our business."
              author="Raj Kumar"
              company="Spice Garden Restaurant"
              image="/placeholder.svg"
            />
            
            <TestimonialCard
              quote="The marketing tools are incredible. Our customer retention is up by 40% thanks to the automated loyalty program and push notifications."
              author="Sarah Chen"
              company="Green Basket Grocery"
              image="/placeholder.svg"
            />
            
            <TestimonialCard
              quote="The setup was so easy! Within a week, we had our own branded app and were taking direct orders. Support team was super helpful."
              author="Mike Johnson"
              company="City Brew Coffee"
              image="/placeholder.svg"
            />
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatedButton variant="outline" size="md">See More Success Stories</AnimatedButton>
          </motion.div>
        </div>
      </section>
      
      {/* Admin Panel & Toolkit */}
      <section id="toolkit" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">You're Always <span className="gradient-text">in Control</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Powerful yet intuitive tools that put you in the driver's seat.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-brandae-gray p-6 rounded-xl border border-white/5 group hover:border-brandae-green transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Menu Editor</h3>
              <p className="text-muted-foreground mb-6">Easily update your menu items, prices, descriptions, and availability in real-time.</p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt="Menu Editor" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
                  <span className="text-sm text-white">Intuitive drag-and-drop interface</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-brandae-gray p-6 rounded-xl border border-white/5 group hover:border-brandae-green transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Campaign Builder</h3>
              <p className="text-muted-foreground mb-6">Create and launch marketing campaigns with customizable templates in minutes.</p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt="Campaign Builder" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
                  <span className="text-sm text-white">Track performance in real-time</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-brandae-gray p-6 rounded-xl border border-white/5 group hover:border-brandae-green transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Live Order Feed</h3>
              <p className="text-muted-foreground mb-6">Monitor incoming orders, kitchen status, and delivery progress from one dashboard.</p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt="Live Order Feed" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
                  <span className="text-sm text-white">Real-time notifications</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-brandae-gray p-6 rounded-xl border border-white/5 group hover:border-brandae-green transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
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
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Plug & Play With <span className="gradient-text">Your Tools</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Brandae seamlessly integrates with your existing tech stack.</p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-brandae-gray p-4 rounded-xl flex items-center justify-center h-24 border border-white/5"
              >
                <img src="/placeholder.svg" alt={`Integration ${index}`} className="max-h-12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Security & Reliability */}
      <section id="security" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="container mx-auto">
          <div className="bg-brandae-gray rounded-2xl p-8 md:p-12 border border-white/5">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="gradient-text">Enterprise-grade Security,</span><br />
                  SMB Pricing
                </h2>
                
                <ul className="space-y-4">
                  {[
                    'End-to-end encryption for all transactions',
                    'GDPR-ready data policies and storage',
                    'Daily automated backups of your critical data',
                    '99.99% uptime guarantee with 24/7 monitoring'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-brandae-green">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          <path d="M9.9 12.1L11.5 14l2.6-4" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="flex-shrink-0 w-full md:w-1/3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-brandae-green/20 rounded-full blur-3xl"></div>
                  <img 
                    src="/placeholder.svg"
                    alt="Security"
                    className="relative z-10 w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section with Form Popup */}
      <section className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brandae-purple/20 to-transparent opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to <span className="gradient-text">Boost Your Revenue?</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join thousands of local businesses who have taken control of their online ordering experience and increased their revenue by up to 30%.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <div className="inline-block">
                    <AnimatedButton variant="primary" size="lg">
                      Schedule Your Free Demo
                    </AnimatedButton>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
                  <ContactForm />
                </PopoverContent>
              </Popover>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
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
        <div className="absolute inset-0 bg-gradient-to-br from-brandae-purple/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-gradient-radial from-brandae-green/10 to-transparent opacity-50"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Launch Your Branded Ordering App <span className="gradient-text">Today</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-10">
              No commissions. No middlemen. Full control.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <AnimatedButton variant="primary" size="lg">Start Free Trial</AnimatedButton>
              <AnimatedButton variant="outline" size="lg">Talk to Sales</AnimatedButton>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="text-brandae-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span>GDPR Compliant</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="text-brandae-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span>Zero Commission</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="text-brandae-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span>Free Setup</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-24 py-12 bg-brandae-darker border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold mb-4 text-lg">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">© 2025 Brandae. All rights reserved.</p>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
