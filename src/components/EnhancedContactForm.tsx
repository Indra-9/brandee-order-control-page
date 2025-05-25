
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BadgeCheck, Loader2, User, Mail, Phone, Building2, MessageSquare } from 'lucide-react';
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

      // Trigger webhooks
      await triggerWebhooks(data);

      toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      reset();
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

      // Trigger each webhook
      const webhookPromises = webhooks?.map(async (webhook) => {
        try {
          await fetch(webhook.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'contact_submission',
              data: formData,
              timestamp: new Date().toISOString(),
              webhook_name: webhook.name
            }),
          });
        } catch (error) {
          console.error(`Error triggering webhook ${webhook.name}:`, error);
        }
      });

      if (webhookPromises) {
        await Promise.all(webhookPromises);
      }
    } catch (error) {
      console.error('Error in webhook triggering:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <motion.h3 
          className="text-2xl font-bold mb-2 gradient-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Book Your Free Demo
        </motion.h3>
        <motion.p 
          className="text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Get a personalized walkthrough of how Brandae can boost your revenue.
        </motion.p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Your Full Name"
              {...register('name', { required: 'Name is required' })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/50 border ${
                errors.name ? 'border-red-500' : watchedFields.name ? 'border-brandae-green' : 'border-white/10'
              } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green transition-all duration-200 backdrop-blur-sm`}
            />
          </div>
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1 ml-1"
            >
              {errors.name.message}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/50 border ${
                errors.email ? 'border-red-500' : watchedFields.email ? 'border-brandae-green' : 'border-white/10'
              } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green transition-all duration-200 backdrop-blur-sm`}
            />
          </div>
          {errors.email && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1 ml-1"
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register('phone', { required: 'Phone number is required' })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/50 border ${
                errors.phone ? 'border-red-500' : watchedFields.phone ? 'border-brandae-green' : 'border-white/10'
              } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green transition-all duration-200 backdrop-blur-sm`}
            />
          </div>
          {errors.phone && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1 ml-1"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Your Business Name"
              {...register('business', { required: 'Business name is required' })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/50 border ${
                errors.business ? 'border-red-500' : watchedFields.business ? 'border-brandae-green' : 'border-white/10'
              } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green transition-all duration-200 backdrop-blur-sm`}
            />
          </div>
          {errors.business && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1 ml-1"
            >
              {errors.business.message}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="relative"
        >
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 text-gray-400 h-4 w-4" />
            <textarea
              placeholder="Tell us about your business goals..."
              {...register('message')}
              rows={3}
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark/50 border ${
                watchedFields.message ? 'border-brandae-green' : 'border-white/10'
              } text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green resize-none transition-all duration-200 backdrop-blur-sm`}
            />
          </div>
        </motion.div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brandae-purple to-brandae-green text-white py-3 rounded-lg font-medium relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span className="flex items-center justify-center gap-2 relative z-10">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <BadgeCheck size={18} />
                Submit Request
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-brandae-green to-brandae-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
        
        <motion.p 
          className="text-xs text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          By submitting, you agree to our 
          <a href="#" className="text-brandae-green hover:underline ml-1">Privacy Policy</a>
        </motion.p>
      </form>
    </motion.div>
  );
}
