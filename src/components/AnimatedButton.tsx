
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
}

export default function AnimatedButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  type = "button",
  disabled,
  form,
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
        'rounded-xl font-medium transition-all',
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      form={form}
      {...props}
    >
      {children}
    </motion.button>
  );
}
