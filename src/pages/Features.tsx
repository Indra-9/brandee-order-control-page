
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, TrendingUp, Users, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import FeatureCard from '@/components/FeatureCard';

const Features = () => {
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
      description:
        "Automate repetitive tasks with our advanced AI, saving you time and resources.",
      icon: <Zap size={32} />,
    },
    {
      title: "Enhanced Security",
      description:
        "Protect your data with state-of-the-art security measures and encryption protocols.",
      icon: <Shield size={32} />,
    },
    {
      title: "Real-Time Analytics",
      description:
        "Gain valuable insights with real-time data analytics and customizable dashboards.",
      icon: <TrendingUp size={32} />,
    },
    {
      title: "Team Collaboration",
      description:
        "Seamlessly collaborate with your team using our integrated communication tools.",
      icon: <Users size={32} />,
    },
    {
      title: "Global Accessibility",
      description:
        "Access your data and tools from anywhere in the world with our cloud-based platform.",
      icon: <Globe size={32} />,
    },
    {
      title: "Customizable Solutions",
      description:
        "Tailor our platform to meet your specific needs with our flexible and customizable solutions.",
      icon: <Check size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO
        title="Features - Brandae: The Future of Marketing"
        description="Explore the cutting-edge features that make Brandae the ultimate marketing solution. AI-powered automation, enhanced security, and real-time analytics."
        keywords="marketing automation, AI, analytics, security, collaboration"
      />
      <Navbar />
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Unlock the Power of <span className="gradient-text">Brandae</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the innovative features that set us apart and drive
              unparalleled results for your business.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
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

      <section className="bg-brandae-darker py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of marketing with Brandae. Sign up today and
              unlock a world of possibilities.
            </p>
            <a
              href="/auth"
              className="bg-brandae-green text-brandae-dark py-3 px-8 rounded-full font-semibold hover:bg-brandae-green/90 transition-colors duration-300"
            >
              Get Started Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;
