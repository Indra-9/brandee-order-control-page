import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { 
  BadgeCheck, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MessageSquare, 
  Sparkles, 
  CheckCircle,
  X,
  Calendar,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
}

interface DemoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoFormModal({ isOpen, onClose }: DemoFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>();

  const watchedFields = watch();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    console.log('Submitting form data:', data);

    try {
      // Insert into contact_submissions table
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          business: data.business,
          message: data.message
        }]);

      if (insertError) {
        console.error('Error inserting contact submission:', insertError);
        throw insertError;
      }

      // Trigger webhooks with complete form data
      await triggerWebhooks(data);

      setIsSubmitted(true);
      toast.success('Thank you! Your demo request has been submitted successfully. We\'ll contact you within 24 hours.');
      
      // Reset form after 4 seconds
      setTimeout(() => {
        reset();
        setIsSubmitted(false);
        setCurrentStep(0);
        onClose();
      }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error sending your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerWebhooks = async (formData: FormValues) => {
    try {
      // Get active webhook endpoints
      const { data: webhooks, error } = await supabase
        .from('webhook_endpoints')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching webhooks:', error);
        return;
      }

      if (!webhooks || webhooks.length === 0) {
        console.log('No active webhooks found');
        return;
      }

      // Trigger each webhook with complete form data
      const webhookPromises = webhooks.map(async (webhook) => {
        try {
          const payload = {
            type: 'demo_request',
            form_data: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              business: formData.business,
              message: formData.message || ''
            },
            timestamp: new Date().toISOString(),
            webhook_name: webhook.name,
            source: 'brandae_demo_form'
          };

          const response = await fetch(webhook.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            console.error(`Webhook ${webhook.name} failed with status:`, response.status);
          }
        } catch (error) {
          console.error(`Error triggering webhook ${webhook.name}:`, error);
        }
      });

      await Promise.all(webhookPromises);
    } catch (error) {
      console.error('Error in webhook triggering:', error);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setTimeout(() => {
        setCurrentStep(0);
        setIsSubmitted(false);
        reset();
      }, 300);
    }
  };

  const benefits = [
    "40% average revenue increase",
    "24/7 automated customer engagement",
    "Real-time analytics dashboard",
    "Seamless integration setup"
  ];

  if (isSubmitted) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={handleClose}
            />
            
            {/* Success Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="relative z-10 bg-gradient-to-br from-brandae-gray to-brandae-dark border border-brandae-green/20 rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
                className="w-20 h-20 bg-gradient-to-r from-brandae-green to-brandae-purple rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-white mb-4"
              >
                Demo Booked! 🎉
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                Thank you for your interest! Our team will contact you within 24 hours to schedule your personalized demo.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-4 bg-brandae-green/10 rounded-xl border border-brandae-green/20"
              >
                <p className="text-brandae-green text-sm font-medium">
                  Check your email for confirmation details
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-6xl mx-4 h-[90vh] bg-gradient-to-br from-brandae-gray to-brandae-dark border border-brandae-green/20 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>

            <div className="flex h-full">
              {/* Left Side - Benefits & Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brandae-purple/20 to-brandae-green/20 p-12 flex-col justify-center relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-brandae-green/10 via-transparent to-brandae-purple/10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-brandae-green/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brandae-purple/20 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <Sparkles className="w-8 h-8 text-brandae-green" />
                    <h2 className="text-4xl font-bold gradient-text">Free Demo</h2>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-300 mb-8 leading-relaxed"
                  >
                    See how Brandae can transform your business with AI-powered customer engagement.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4 mb-8"
                  >
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-brandae-green flex-shrink-0" />
                        <span className="text-white font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex items-center gap-6 text-gray-400"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">30 min session</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Same day booking</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mt-8 flex items-center gap-2"
                  >
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-r from-brandae-green to-brandae-purple rounded-full border-2 border-brandae-dark" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">500+ happy customers</span>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right Side - Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative overflow-y-auto"
              >
                {/* Mobile header */}
                <div className="lg:hidden mb-8 text-center">
                  <h2 className="text-3xl font-bold gradient-text mb-4">Book Your Free Demo</h2>
                  <p className="text-gray-300">Get a personalized walkthrough in just 30 minutes</p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-brandae-green" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        {...register('name', { required: 'Name is required' })}
                        className={`w-full pl-12 pr-12 py-4 rounded-xl bg-brandae-dark/70 border-2 ${
                          errors.name ? 'border-red-500' : 
                          watchedFields.name ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 
                          'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-brandae-green/50 transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
                      />
                      {watchedFields.name && !errors.name && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="w-5 h-5 text-brandae-green" />
                        </motion.div>
                      )}
                    </div>
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.name.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-brandae-green" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address"
                          }
                        })}
                        className={`w-full pl-12 pr-12 py-4 rounded-xl bg-brandae-dark/70 border-2 ${
                          errors.email ? 'border-red-500' : 
                          watchedFields.email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(watchedFields.email) ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 
                          'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-brandae-green/50 transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
                      />
                      {watchedFields.email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(watchedFields.email) && !errors.email && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="w-5 h-5 text-brandae-green" />
                        </motion.div>
                      )}
                    </div>
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-brandae-green" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        {...register('phone', { required: 'Phone number is required' })}
                        className={`w-full pl-12 pr-12 py-4 rounded-xl bg-brandae-dark/70 border-2 ${
                          errors.phone ? 'border-red-500' : 
                          watchedFields.phone ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 
                          'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-brandae-green/50 transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
                      />
                      {watchedFields.phone && !errors.phone && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="w-5 h-5 text-brandae-green" />
                        </motion.div>
                      )}
                    </div>
                    {errors.phone && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.phone.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-brandae-green" />
                      <input
                        type="text"
                        placeholder="Your business name"
                        {...register('business', { required: 'Business name is required' })}
                        className={`w-full pl-12 pr-12 py-4 rounded-xl bg-brandae-dark/70 border-2 ${
                          errors.business ? 'border-red-500' : 
                          watchedFields.business ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 
                          'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-brandae-green/50 transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
                      />
                      {watchedFields.business && !errors.business && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="w-5 h-5 text-brandae-green" />
                        </motion.div>
                      )}
                    </div>
                    {errors.business && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.business.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">What are your goals? (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-brandae-green" />
                      <textarea
                        placeholder="Tell us about your business goals and challenges..."
                        {...register('message')}
                        rows={4}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl bg-brandae-dark/70 border-2 ${
                          watchedFields.message ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-brandae-green/50 resize-none transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brandae-purple via-brandae-green to-brandae-purple bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-4 px-8 rounded-xl font-semibold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brandae-green/25"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    style={{
                      backgroundSize: '200% 100%'
                    }}
                  >
                    <span className="flex items-center justify-center gap-3 relative z-10">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Booking Your Demo...
                        </>
                      ) : (
                        <>
                          <BadgeCheck size={20} />
                          Book My Free Demo
                          <ArrowRight size={20} />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-brandae-green/20 to-brandae-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  <motion.div 
                    className="text-center pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="text-xs text-gray-400">
                      By submitting, you agree to our{' '}
                      <a href="/terms" className="text-brandae-green hover:underline">Terms & Conditions</a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-brandae-green hover:underline">Privacy Policy</a>
                    </p>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}