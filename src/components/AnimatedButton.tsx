
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function AnimatedButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: AnimatedButtonProps) {
  const variants = {
    primary: 'bg-brandae-green text-black hover:shadow-glow',
    secondary: 'bg-brandae-purple text-white hover:shadow-purple-glow',
    outline: 'bg-transparent border border-brandae-green text-brandae-green hover:bg-brandae-green/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'rounded-md font-medium transition-all',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
