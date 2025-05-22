
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BadgeCheck } from 'lucide-react';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // In a real app, you would send the data to a server here
    toast.success('Thanks for reaching out! We\'ll be in touch soon.');
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-2"
    >
      <h3 className="text-xl font-bold mb-4">Book Your Free Demo</h3>
      <p className="text-sm text-gray-300 mb-6">Get a personalized walkthrough of how Brandae can boost your revenue.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 rounded bg-brandae-dark border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Email Address"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="w-full p-2 rounded bg-brandae-dark border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone', { required: 'Phone number is required' })}
            className="w-full p-2 rounded bg-brandae-dark border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Business Name"
            {...register('business', { required: 'Business name is required' })}
            className="w-full p-2 rounded bg-brandae-dark border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green"
          />
          {errors.business && <p className="text-red-500 text-xs mt-1">{errors.business.message}</p>}
        </div>
        
        <div>
          <textarea
            placeholder="How can we help you?"
            {...register('message')}
            rows={3}
            className="w-full p-2 rounded bg-brandae-dark border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandae-green resize-none"
          />
        </div>
        
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-brandae-purple to-brandae-green text-white py-2 rounded font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            <BadgeCheck size={18} />
            Submit Request
          </span>
        </motion.button>
        
        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to our 
          <a href="#" className="text-brandae-green hover:underline ml-1">Privacy Policy</a>
        </p>
      </form>
    </motion.div>
  );
}
