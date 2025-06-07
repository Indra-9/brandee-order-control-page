
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe, 
  Brain,
  Rocket,
  Target,
  BarChart3,
  MessageSquare,
  Lock,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import FeatureCard from '@/components/FeatureCard';
import AnimatedButton from '@/components/AnimatedButton';
import Footer from '@/components/Footer';

const Features = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Core Features Section
  const coreFeatures = [
    {
      title: "AI-Powered Automation",
      description: "Leverage cutting-edge artificial intelligence to automate complex marketing workflows, from content creation to campaign optimization.",
      icon: <Brain size={32} />,
    },
    {
      title: "Advanced Analytics",
      description: "Get deep insights with real-time analytics, predictive modeling, and customizable dashboards that drive data-driven decisions.",
      icon: <BarChart3 size={32} />,
    },
    {
      title: "Smart Targeting",
      description: "Reach the right audience with precision targeting powered by machine learning algorithms and behavioral analysis.",
      icon: <Target size={32} />,
    },
  ];

  // Security & Compliance Features
  const securityFeatures = [
    {
      title: "Enterprise Security",
      description: "Bank-level encryption, SOC 2 compliance, and advanced threat protection keep your data secure.",
      icon: <Shield size={32} />,
    },
    {
      title: "Access Control",
      description: "Granular permissions, multi-factor authentication, and role-based access ensure controlled data access.",
      icon: <Lock size={32} />,
    },
    {
      title: "Data Privacy",
      description: "GDPR compliant with automated data handling, retention policies, and user consent management.",
      icon: <Globe size={32} />,
    },
  ];

  // Collaboration Features
  const collaborationFeatures = [
    {
      title: "Team Workspaces",
      description: "Collaborative environments with shared projects, commenting, and real-time editing capabilities.",
      icon: <Users size={32} />,
    },
    {
      title: "Communication Hub",
      description: "Built-in messaging, video calls, and notification systems to keep your team connected.",
      icon: <MessageSquare size={32} />,
    },
    {
      title: "Project Management",
      description: "Integrated task management, timeline tracking, and milestone monitoring for seamless project execution.",
      icon: <Rocket size={32} />,
    },
  ];

  // Performance Features
  const performanceFeatures = [
    {
      title: "Lightning Fast",
      description: "Optimized infrastructure delivering sub-second response times and 99.9% uptime guarantee.",
      icon: <Zap size={32} />,
    },
    {
      title: "Auto-Scaling",
      description: "Automatically adjusts resources based on demand, ensuring consistent performance during traffic spikes.",
      icon: <TrendingUp size={32} />,
    },
    {
      title: "Mobile Optimized",
      description: "Native mobile apps and responsive design provide full functionality across all devices.",
      icon: <Smartphone size={32} />,
    },
  ];

  const benefits = [
    "Increase conversion rates by up to 300%",
    "Reduce manual work by 80% with automation",
    "Get insights 10x faster than traditional tools",
    "Scale campaigns without additional overhead",
    "Integrate with 500+ popular business tools",
    "24/7 expert support and onboarding assistance"
  ];

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO
        title="Features - Brandae: The Future of Marketing"
        description="Explore the cutting-edge features that make Brandae the ultimate marketing solution. AI-powered automation, enhanced security, real-time analytics, and more."
        keywords="marketing automation, AI, analytics, security, collaboration, performance optimization"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brandae-green/5 to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for <span className="gradient-text">Modern Marketing</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Discover comprehensive tools designed to revolutionize your marketing strategy. 
              From AI-powered automation to enterprise-grade security, we've got everything you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                onClick={() => window.location.href = '/auth'} 
                className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
              >
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </AnimatedButton>
              <AnimatedButton 
                onClick={() => window.location.href = '/pricing'} 
                variant="outline"
              >
                View Pricing
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Core AI Features */}
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
              AI-Powered Core Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to transform your marketing operations
              with intelligent automation and predictive insights.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {coreFeatures.map((feature, index) => (
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

      {/* Section 2: Analytics & Insights */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Advanced Analytics & Insights
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Transform raw data into actionable insights with our comprehensive analytics suite. 
                Track performance, predict trends, and optimize campaigns in real-time.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="text-brandae-green mr-3" size={20} />
                  Real-time dashboard with customizable widgets
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="text-brandae-green mr-3" size={20} />
                  Predictive analytics and forecasting
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="text-brandae-green mr-3" size={20} />
                  Advanced segmentation and cohort analysis
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="text-brandae-green mr-3" size={20} />
                  Automated reporting and alerts
                </li>
              </ul>
              <AnimatedButton 
                onClick={() => window.location.href = '/demo'} 
                variant="outline"
              >
                See Analytics Demo
              </AnimatedButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-brandae-gray p-8 rounded-2xl border border-brandae-green/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brandae-dark p-4 rounded-lg">
                    <div className="text-brandae-green text-2xl font-bold">+247%</div>
                    <div className="text-sm text-gray-300">Conversion Rate</div>
                  </div>
                  <div className="bg-brandae-dark p-4 rounded-lg">
                    <div className="text-brandae-green text-2xl font-bold">89%</div>
                    <div className="text-sm text-gray-300">Lead Quality</div>
                  </div>
                  <div className="bg-brandae-dark p-4 rounded-lg">
                    <div className="text-brandae-green text-2xl font-bold">3.2x</div>
                    <div className="text-sm text-gray-300">ROI Increase</div>
                  </div>
                  <div className="bg-brandae-dark p-4 rounded-lg">
                    <div className="text-brandae-green text-2xl font-bold">-67%</div>
                    <div className="text-sm text-gray-300">Cost per Lead</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Security & Compliance */}
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
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your data security is our top priority. Built with enterprise-grade security 
              measures and compliance standards to protect your business.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {securityFeatures.map((feature, index) => (
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

      {/* Section 4: Team Collaboration */}
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
              Seamless Team Collaboration
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Work together efficiently with built-in collaboration tools that keep your team 
              aligned and productive across all your marketing initiatives.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {collaborationFeatures.map((feature, index) => (
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

      {/* Section 5: Performance & Scalability */}
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
              Unmatched Performance & Scale
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for speed and scale. Our platform delivers lightning-fast performance 
              that grows with your business needs.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {performanceFeatures.map((feature, index) => (
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

      {/* Section 6: Benefits Overview */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Brandae?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Join thousands of successful businesses who have transformed their marketing 
                operations with Brandae's comprehensive feature set.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <Check className="text-brandae-green mr-3 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 p-8 rounded-2xl border border-brandae-green/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Success Metrics</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Customer Satisfaction</span>
                    <span className="text-brandae-green font-bold">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Time to ROI</span>
                    <span className="text-brandae-green font-bold">30 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Platform Uptime</span>
                    <span className="text-brandae-green font-bold">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Support Response Time</span>
                    <span className="text-brandae-green font-bold">&lt; 1 hour</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 7: Call to Action */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience all these powerful features firsthand. Start your free trial today 
              and discover why industry leaders choose Brandae for their marketing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                onClick={() => window.location.href = '/auth'} 
                size="lg"
                className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
              >
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </AnimatedButton>
              <AnimatedButton 
                onClick={() => window.location.href = '/contact'} 
                size="lg"
                variant="outline"
              >
                Schedule Demo
              </AnimatedButton>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
