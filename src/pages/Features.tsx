
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, TrendingUp, Users, Globe, Bot, Lightbulb, Target, Rocket, BarChart3, Lock, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';
import FeatureCard from '@/components/FeatureCard';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const heroFeatures = [
    {
      title: "AI-Powered Marketing",
      description: "Automate campaigns with intelligent optimization and real-time adjustments.",
      icon: <Bot className="w-8 h-8" />,
    },
    {
      title: "Enterprise Security",
      description: "Military-grade encryption with SOC 2 compliance and multi-factor authentication.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Real-Time Analytics",
      description: "Comprehensive insights with predictive analytics and custom dashboards.",
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      title: "Global Collaboration",
      description: "Work seamlessly with your team from anywhere in the world.",
      icon: <Globe className="w-8 h-8" />,
    },
  ];

  const mainFeatures = [
    {
      title: "AI-Powered Automation",
      description: "Leverage cutting-edge artificial intelligence to automate your marketing workflows, saving you countless hours while delivering superior results.",
      icon: <Zap className="w-12 h-12" />,
      features: ["Automated campaign optimization", "Smart content generation", "Intelligent lead scoring", "Real-time performance adjustments"],
      gradient: "brand-dark" as const,
      colSpan: 2,
    },
    {
      title: "Enhanced Security",
      description: "Your data is protected with military-grade encryption and state-of-the-art security protocols.",
      icon: <Shield className="w-12 h-12" />,
      features: ["End-to-end encryption", "SOC 2 compliance", "Multi-factor authentication", "Regular security audits"],
      gradient: "green" as const,
    },
    {
      title: "Real-Time Analytics",
      description: "Make informed decisions with comprehensive analytics and customizable dashboards.",
      icon: <TrendingUp className="w-12 h-12" />,
      features: ["Live performance tracking", "Custom dashboard creation", "Predictive analytics", "Automated reporting"],
      gradient: "blue" as const,
    },
    {
      title: "Team Collaboration",
      description: "Seamlessly collaborate with your team using integrated communication tools.",
      icon: <Users className="w-12 h-12" />,
      features: ["Shared project workspaces", "Real-time collaboration", "Task management", "Team performance metrics"],
      gradient: "pink" as const,
      colSpan: 2,
    },
    {
      title: "Global Accessibility",
      description: "Access your marketing tools and data from anywhere in the world with our cloud-based platform.",
      icon: <Globe className="w-12 h-12" />,
      features: ["Cloud-based platform", "Mobile optimization", "Multi-language support", "Global CDN delivery"],
      gradient: "orange" as const,
    },
    {
      title: "Smart Automation",
      description: "Our intelligent automation system learns from your data and continuously improves performance.",
      icon: <Bot className="w-12 h-12" />,
      features: ["Machine learning algorithms", "Behavioral pattern recognition", "Automated A/B testing", "Self-optimizing campaigns"],
      gradient: "mixed" as const,
    },
    {
      title: "Creative Intelligence",
      description: "Generate compelling marketing content with AI-powered creative tools that understand your brand voice.",
      icon: <Lightbulb className="w-12 h-12" />,
      features: ["AI content generation", "Brand voice consistency", "Creative asset library", "Dynamic personalization"],
      gradient: "green" as const,
      colSpan: 2,
    },
    {
      title: "Precision Targeting",
      description: "Advanced targeting algorithms ensure your message reaches the right people at the right time.",
      icon: <Target className="w-12 h-12" />,
      features: ["Advanced audience segmentation", "Behavioral targeting", "Lookalike audience creation", "Cross-platform synchronization"],
      gradient: "blue" as const,
    },
    {
      title: "Growth Acceleration",
      description: "Accelerate your business growth with tools designed to scale efficiently as your marketing needs evolve.",
      icon: <Rocket className="w-12 h-12" />,
      features: ["Scalable infrastructure", "Performance optimization", "Growth tracking", "Expansion planning tools"],
      gradient: "pink" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white overflow-hidden">
      <SEO
        title="Features - Brandae: The Future of Marketing"
        description="Explore the cutting-edge features that make Brandae the ultimate marketing solution. AI-powered automation, enhanced security, and real-time analytics."
        keywords="marketing automation, AI, analytics, security, collaboration"
      />
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-brandae-green/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-brandae-purple/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-brandae-green/10 border border-brandae-green/20 rounded-full text-brandae-green text-sm font-medium mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-4 h-4" />
              Advanced Marketing Platform
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Unlock the Power of{" "}
              <motion.span 
                className="gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Brandae
              </motion.span>
            </h1>
            <motion.p
              className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover the innovative features that set us apart and drive unparalleled results for your business. 
              From AI-powered automation to enterprise-grade security, we've got everything you need to succeed.
            </motion.p>
          </motion.div>

          {/* Hero Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {heroFeatures.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  delay={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive suite of features is designed to transform your marketing strategy 
              and deliver exceptional results at every stage of your growth journey.
            </p>
          </motion.div>

          <BentoGrid className="max-w-7xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <BentoGridItem
                key={index}
                colSpan={feature.colSpan}
                gradient={feature.gradient}
                delay={index}
                className="min-h-[300px]"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="text-brandae-green mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <Check className="w-4 h-4 text-brandae-green flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </BentoGridItem>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-brandae-green/5 to-brandae-purple/5">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {[
              { number: "500+", label: "Enterprise Clients", icon: <Users className="w-8 h-8" /> },
              { number: "99.9%", label: "Uptime Guarantee", icon: <Shield className="w-8 h-8" /> },
              { number: "2.5x", label: "Average ROI Increase", icon: <TrendingUp className="w-8 h-8" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-8 bg-brandae-gray/50 rounded-2xl border border-brandae-green/20 backdrop-blur-sm"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-brandae-green mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-brandae-green mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your{" "}
              <span className="gradient-text">Business?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of businesses that have revolutionized their marketing with Brandae. 
              Experience the future of marketing automation and unlock unprecedented growth.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.a
                href="/auth"
                className="inline-flex items-center gap-2 bg-brandae-green text-brandae-dark px-8 py-4 rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Rocket className="w-5 h-5" />
                Get Started Now
              </motion.a>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 border border-brandae-green text-brandae-green px-8 py-4 rounded-full font-semibold text-lg hover:bg-brandae-green/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="w-5 h-5" />
                Schedule Demo
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
