
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<AuthFormData>();
  const password = watch("password");

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name
            }
          }
        });
        
        if (error) throw error;
        
        toast.success('Account created successfully! Please check your email to verify your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
        
        toast.success('Welcome back!');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    reset();
  };

  return (
    <div className="min-h-screen bg-brandae-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#093d30] to-brandae-green flex items-center justify-center text-white font-bold text-xl">B</div>
            <span className="text-white text-2xl font-bold">Brandae</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">
            {isSignUp ? 'Create Admin Account' : 'Admin Login'}
          </h1>
          <p className="text-gray-400">
            {isSignUp ? 'Set up your admin account to manage the dashboard' : 'Access your admin dashboard'}
          </p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-brandae-gray border border-white/10 rounded-lg p-6"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register('name', { required: isSignUp ? 'Name is required' : false })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brandae-green"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brandae-green"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-brandae-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brandae-green"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {isSignUp && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register('confirmPassword', { 
                    required: isSignUp ? 'Please confirm your password' : false,
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-brandae-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brandae-green"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brandae-purple to-brandae-green text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-brandae-green hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-400 hover:text-brandae-green transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
