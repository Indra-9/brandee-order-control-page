
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe, Users } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized solutions."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee."
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy worldwide with our global infrastructure network."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless collaboration tools for your entire team."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      content: "This platform has transformed how we manage our operations. The efficiency gains are remarkable.",
      avatar: "/lovable-uploads/a14793e5-192f-4f20-b156-b312a832363a.png"
    },
    {
      name: "Michael Chen",
      role: "Product Manager, StartupXYZ",
      content: "The integration capabilities are outstanding. We've streamlined our entire workflow.",
      avatar: "/lovable-uploads/b7b83b2d-2567-4919-a07d-da4094321086.png"
    },
    {
      name: "Emily Rodriguez",
      role: "Director of Engineering, ScaleCo",
      content: "Incredible support team and robust features. Exactly what we needed for our growth.",
      avatar: "/lovable-uploads/a14793e5-192f-4f20-b156-b312a832363a.png"
    }
  ];

  return (
    <>
      <SEO 
        title="Brandae - Transform Your Business Operations"
        description="Discover how Brandae's innovative solutions can streamline your business operations and drive growth with our cutting-edge technology platform."
      />
      
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transform Your Business
              <span className="block text-brandae-green">Operations</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Streamline your workflows, boost productivity, and drive growth with our 
              innovative business solutions designed for the modern enterprise.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AnimatedButton href="/features" className="group">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
              <AnimatedButton href="/how-it-works" variant="outline">
                Learn More
              </AnimatedButton>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-gray">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-brandae-green">Brandae</span>?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Discover the powerful features that make Brandae the perfect solution 
                for businesses looking to optimize their operations.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="text-brandae-green">Clients</span> Say
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what industry leaders 
                have to say about their experience with Brandae.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TestimonialCard
                    name={testimonial.name}
                    role={testimonial.role}
                    content={testimonial.content}
                    avatar={testimonial.avatar}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-brandae-gray">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p 
              className="text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join thousands of companies that have already revolutionized their 
              operations with Brandae. Start your journey today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedButton href="/pricing" size="lg" className="group">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
