import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Globe, HandHeart, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const Partners = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_website: '',
    address: '',
    country: '',
    state: '',
    pin_code: '',
    proposal: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('partner_submissions')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Application Submitted Successfully!",
        description: "Thank you for your interest in partnering with us. We'll review your application and get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company_website: '',
        address: '',
        country: '',
        state: '',
        pin_code: '',
        proposal: ''
      });
    } catch (error) {
      console.error('Error submitting partner application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Increase your revenue streams with our commission-based partnership model"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Get access to our partner success team and exclusive training resources"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Expand your market reach with our international client base"
    },
    {
      icon: HandHeart,
      title: "Mutual Success",
      description: "We grow together through collaborative partnerships and shared goals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brandae-dark via-brandae-gray to-brandae-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 bg-brandae-green/20 text-brandae-green border-brandae-green/30">
              Partnership Program
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Join Our <span className="text-brandae-green">Partner</span> Network
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Collaborate with Brandae to deliver exceptional digital solutions to clients worldwide. 
              Grow your business while helping others achieve their digital transformation goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join a network of successful partners and unlock new opportunities for growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-brandae-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-brandae-green" />
                    </div>
                    <CardTitle className="text-white text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-center">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Registration Form */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Partner Registration
                </CardTitle>
                <p className="text-gray-300 text-lg">
                  Fill out the form below to apply for our partnership program
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Phone Number with Country Code *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Company Website
                      </label>
                      <Input
                        type="url"
                        name="company_website"
                        value={formData.company_website}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Address *
                      </label>
                      <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Enter your address"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Country *
                      </label>
                      <Input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Enter your country"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        State/Province *
                      </label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Enter your state/province"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        PIN/ZIP Code *
                      </label>
                      <Input
                        type="text"
                        name="pin_code"
                        value={formData.pin_code}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Enter PIN/ZIP code"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Partnership Proposal
                    </label>
                    <Textarea
                      name="proposal"
                      value={formData.proposal}
                      onChange={handleInputChange}
                      rows={6}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Tell us about your company, your expertise, and how you'd like to partner with us..."
                    />
                  </div>

                  <div className="text-center pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brandae-green hover:bg-brandae-green/90 text-white px-12 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Submit Application
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;