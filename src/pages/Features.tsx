
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, TrendingUp, Users, Globe, Bot, Lightbulb, Target, Rocket } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

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

  const sections = [
    {
      title: "AI-Powered Automation",
      subtitle: "Smart Marketing Made Simple",
      description: "Leverage cutting-edge artificial intelligence to automate your marketing workflows, saving you countless hours while delivering superior results.",
      icon: <Zap size={64} />,
      features: ["Automated campaign optimization", "Smart content generation", "Intelligent lead scoring", "Real-time performance adjustments"]
    },
    {
      title: "Enhanced Security",
      subtitle: "Enterprise-Grade Protection",
      description: "Your data is protected with military-grade encryption and state-of-the-art security protocols, ensuring complete peace of mind.",
      icon: <Shield size={64} />,
      features: ["End-to-end encryption", "SOC 2 compliance", "Multi-factor authentication", "Regular security audits"]
    },
    {
      title: "Real-Time Analytics",
      subtitle: "Data-Driven Insights",
      description: "Make informed decisions with comprehensive analytics and customizable dashboards that provide actionable insights in real-time.",
      icon: <TrendingUp size={64} />,
      features: ["Live performance tracking", "Custom dashboard creation", "Predictive analytics", "Automated reporting"]
    },
    {
      title: "Team Collaboration",
      subtitle: "Work Better Together",
      description: "Seamlessly collaborate with your team using integrated communication tools and shared workspaces designed for marketing teams.",
      icon: <Users size={64} />,
      features: ["Shared project workspaces", "Real-time collaboration", "Task management", "Team performance metrics"]
    },
    {
      title: "Global Accessibility",
      subtitle: "Work From Anywhere",
      description: "Access your marketing tools and data from anywhere in the world with our cloud-based platform that scales with your business.",
      icon: <Globe size={64} />,
      features: ["Cloud-based platform", "Mobile optimization", "Multi-language support", "Global CDN delivery"]
    },
    {
      title: "Smart Automation",
      subtitle: "AI That Learns",
      description: "Our intelligent automation system learns from your data and continuously improves performance without manual intervention.",
      icon: <Bot size={64} />,
      features: ["Machine learning algorithms", "Behavioral pattern recognition", "Automated A/B testing", "Self-optimizing campaigns"]
    },
    {
      title: "Creative Intelligence",
      subtitle: "Innovative Content Solutions",
      description: "Generate compelling marketing content with AI-powered creative tools that understand your brand voice and audience preferences.",
      icon: <Lightbulb size={64} />,
      features: ["AI content generation", "Brand voice consistency", "Creative asset library", "Dynamic personalization"]
    },
    {
      title: "Precision Targeting",
      subtitle: "Reach The Right Audience",
      description: "Advanced targeting algorithms ensure your message reaches the right people at the right time with surgical precision.",
      icon: <Target size={64} />,
      features: ["Advanced audience segmentation", "Behavioral targeting", "Lookalike audience creation", "Cross-platform synchronization"]
    },
    {
      title: "Growth Acceleration",
      subtitle: "Scale Your Success",
      description: "Accelerate your business growth with tools designed to scale efficiently as your marketing needs evolve and expand.",
      icon: <Rocket size={64} />,
      features: ["Scalable infrastructure", "Performance optimization", "Growth tracking", "Expansion planning tools"]
    },
    {
      title: "Customizable Solutions",
      subtitle: "Tailored To Your Needs",
      description: "Every business is unique. Our platform adapts to your specific requirements with flexible customization options.",
      icon: <Check size={64} />,
      features: ["Custom integrations", "Flexible workflows", "Personalized dashboards", "API access"]
    }
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO
        title="Features - Brandae: The Future of Marketing"
        description="Explore the cutting-edge features that make Brandae the ultimate marketing solution. AI-powered automation, enhanced security, and real-time analytics."
        keywords="marketing automation, AI, analytics, security, collaboration"
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
              Unlock the Power of <span className="gradient-text">Brandae</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the innovative features that set us apart and drive
              unparalleled results for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Sections */}
      {sections.map((section, index) => (
        <section key={index} className={`py-20 px-6 md:px-12 lg:px-24 ${index % 2 === 0 ? 'bg-brandae-dark' : 'bg-brandae-darker'}`}>
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1 space-y-6">
                  <div className="text-brandae-green">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-brandae-green uppercase tracking-wider mb-2">
                      {section.subtitle}
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {section.title}
                    </h2>
                    <p className="text-xl text-gray-300 mb-6">
                      {section.description}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {section.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check size={20} className="text-brandae-green flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-brandae-green/10 to-brandae-green/5 rounded-2xl p-8 border border-brandae-green/20">
                    <div className="aspect-video bg-brandae-gray rounded-lg flex items-center justify-center">
                      <div className="text-brandae-green opacity-50">
                        {section.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-brandae-darker py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

      <Footer />
    </div>
  );
};

export default Features;
