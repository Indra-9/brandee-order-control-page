import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BadgeCheck, Loader2, User, Mail, Phone, Building2, MessageSquare, Sparkles, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
}

export default function EnhancedContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>();

  const watchedFields = watch();

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
      toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        reset();
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error sending your message. Please try again.');
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

      console.log(`Found ${webhooks.length} active webhooks`);

      // Trigger each webhook with complete form data
      const webhookPromises = webhooks.map(async (webhook) => {
        try {
          console.log(`Triggering webhook: ${webhook.name} at ${webhook.url}`);
          
          const payload = {
            type: 'contact_submission',
            form_data: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              business: formData.business,
              message: formData.message || ''
            },
            timestamp: new Date().toISOString(),
            webhook_name: webhook.name,
            source: 'brandae_contact_form'
          };

          console.log('Webhook payload:', JSON.stringify(payload, null, 2));

          const response = await fetch(webhook.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          console.log(`Webhook ${webhook.name} response status:`, response.status);
          
          if (!response.ok) {
            console.error(`Webhook ${webhook.name} failed with status:`, response.status);
          }
        } catch (error) {
          console.error(`Error triggering webhook ${webhook.name}:`, error);
        }
      });

      await Promise.all(webhookPromises);
      console.log('All webhooks triggered');
    } catch (error) {
      console.error('Error in webhook triggering:', error);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 max-w-md mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-white mb-2"
        >
          Thank You!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-sm"
        >
          Your message has been sent successfully. We'll get back to you within 24 hours.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 max-w-md mx-auto relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-brandae-green/5 via-transparent to-brandae-purple/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-brandae-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-brandae-purple/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <motion.div 
            className="flex items-center justify-center gap-2 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-5 h-5 text-brandae-green" />
            <h3 className="text-2xl font-bold gradient-text">Book Your Free Demo</h3>
            <Sparkles className="w-5 h-5 text-brandae-purple" />
          </motion.div>
          <motion.p 
            className="text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get a personalized walkthrough of how Brandae can boost your revenue by up to 40%.
          </motion.p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors group-focus-within:text-brandae-green" />
              <input
                type="text"
                placeholder="Your Full Name"
                {...register('name', { required: 'Name is required' })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/70 border-2 ${
                  errors.name ? 'border-red-500 animate-pulse' : 
                  watchedFields.name ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 
                  'border-white/10'
                } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green/50 transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
              />
              {watchedFields.name && !errors.name && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle className="w-4 h-4 text-brandae-green" />
                </motion.div>
              )}
            </div>
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.name.message}
              </motion.p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors group-focus-within:text-brandae-green" />
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
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/70 border-2 ${
                  errors.email ? 'border-red-500 animate-pulse' : 
                  watchedFields.email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(watchedFields.email) ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 
                  'border-white/10'
                } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green/50 transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
              />
              {watchedFields.email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(watchedFields.email) && !errors.email && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle className="w-4 h-4 text-brandae-green" />
                </motion.div>
              )}
            </div>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.email.message}
              </motion.p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative group"
          >
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors group-focus-within:text-brandae-green" />
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register('phone', { required: 'Phone number is required' })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/70 border-2 ${
                  errors.phone ? 'border-red-500 animate-pulse' : 
                  watchedFields.phone ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 
                  'border-white/10'
                } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green/50 transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
              />
              {watchedFields.phone && !errors.phone && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle className="w-4 h-4 text-brandae-green" />
                </motion.div>
              )}
            </div>
            {errors.phone && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.phone.message}
              </motion.p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="relative group"
          >
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors group-focus-within:text-brandae-green" />
              <input
                type="text"
                placeholder="Your Business Name"
                {...register('business', { required: 'Business name is required' })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/70 border-2 ${
                  errors.business ? 'border-red-500 animate-pulse' : 
                  watchedFields.business ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 
                  'border-white/10'
                } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green/50 transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
              />
              {watchedFields.business && !errors.business && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle className="w-4 h-4 text-brandae-green" />
                </motion.div>
              )}
            </div>
            {errors.business && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1"
              >
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.business.message}
              </motion.p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative group"
          >
            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 text-gray-400 h-4 w-4 transition-colors group-focus-within:text-brandae-green" />
              <textarea
                placeholder="Tell us about your business goals and how we can help..."
                {...register('message')}
                rows={3}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/70 border-2 ${
                  watchedFields.message ? 'border-brandae-green shadow-lg shadow-brandae-green/20' : 'border-white/10'
                } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green/50 resize-none transition-all duration-300 backdrop-blur-sm hover:border-brandae-green/50`}
              />
            </div>
          </motion.div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brandae-purple via-brandae-green to-brandae-purple bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-3 rounded-lg font-medium relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-brandae-green/25"
            whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              backgroundSize: '200% 100%'
            }}
          >
            <span className="flex items-center justify-center gap-2 relative z-10">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending Your Request...
                </>
              ) : (
                <>
                  <BadgeCheck size={18} />
                  Get My Free Demo
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brandae-green/20 to-brandae-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          <motion.div 
            className="text-center pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Trusted by 500+ businesses worldwide
            </p>
            <p className="text-xs text-gray-500 mt-1">
              By submitting, you agree to our 
              <a href="#" className="text-brandae-green hover:underline ml-1">Privacy Policy</a>
            </p>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
