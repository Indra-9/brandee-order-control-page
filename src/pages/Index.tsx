
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Shield, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import AnimatedButton from '@/components/AnimatedButton';
import FeatureCard from '@/components/FeatureCard';
import StepCard from '@/components/StepCard';
import TestimonialCard from '@/components/TestimonialCard';
import Footer from '@/components/Footer';

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeInOut" },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const features = [
    {
      title: "AI-Powered Automation",
      description: "Automate repetitive tasks with our advanced AI, saving you time and resources.",
      icon: <Zap size={32} />,
    },
    {
      title: "Enhanced Security", 
      description: "Protect your data with state-of-the-art security measures and encryption protocols.",
      icon: <Shield size={32} />,
    },
    {
      title: "Real-Time Analytics",
      description: "Gain valuable insights with real-time data analytics and customizable dashboards.", 
      icon: <TrendingUp size={32} />,
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your account in minutes and get started with our intuitive platform.",
    },
    {
      number: 2,
      title: "Configure",
      description: "Set up your preferences and customize the platform to match your workflow.",
    },
    {
      number: 3,
      title: "Launch",
      description: "Start automating your processes and watch your productivity soar.",
    },
  ];

  const testimonials = [
    {
      quote: "This platform has transformed how we handle our marketing campaigns. The AI automation features are incredible!",
      author: "Sarah Johnson",
      company: "TechCorp Inc.",
      image: "/placeholder.svg"
    },
    {
      quote: "The analytics dashboard gives us insights we never had before. Highly recommend for any growing business.",
      author: "Michael Chen", 
      company: "Growth Solutions",
      image: "/placeholder.svg"
    },
    {
      quote: "Security was our main concern, but this platform exceeded all our expectations. Top-notch protection.",
      author: "Emily Rodriguez",
      company: "SecureData Ltd.",
      image: "/placeholder.svg"
    },
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO
        title="Brandae: The Future of Marketing"
        description="Transform your marketing with AI-powered automation, advanced analytics, and seamless integrations. Join thousands of businesses already using Brandae."
        keywords="marketing automation, AI, analytics, business growth, digital marketing"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Future of <span className="gradient-text">Marketing</span> is Here
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your marketing strategy with AI-powered automation, 
              advanced analytics, and seamless integrations that drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton onClick={() => window.location.href = '/auth'} className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                Get Started Free
                <ArrowRight size={20} className="ml-2" />
              </AnimatedButton>
              <AnimatedButton onClick={() => window.location.href = '/features'} variant="outline">
                Learn More
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to streamline your marketing and accelerate growth.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get started in three simple steps and begin transforming your business today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their businesses with Brandae.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                company={testimonial.company}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of businesses already using Brandae to automate their marketing 
              and drive unprecedented growth.
            </p>
            <AnimatedButton onClick={() => window.location.href = '/auth'} size="lg" className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
              Start Your Free Trial
              <ArrowRight size={20} className="ml-2" />
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
