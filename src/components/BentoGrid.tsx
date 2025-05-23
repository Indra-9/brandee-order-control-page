
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
      className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}
    >
      {children}
    </motion.div>
  );
}

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  delay?: number;
  gradient?: "brand-dark" | "green" | "blue" | "pink" | "orange" | "mixed" | undefined;
}

export function BentoGridItem({ 
  children, 
  className, 
  colSpan = 1, 
  rowSpan = 1,
  delay = 0,
  gradient
}: BentoGridItemProps) {
  const colSpanClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
  };

  const rowSpanClasses = {
    1: 'md:row-span-1',
    2: 'md:row-span-2',
    3: 'md:row-span-3',
  };
  
  const gradientClasses = {
    'brand-dark': 'before:bg-gradient-to-br before:from-[#093d30]/20 before:to-[#093c2f]/10',
    'green': 'before:bg-gradient-to-br before:from-green-500/20 before:to-green-800/10',
    'blue': 'before:bg-gradient-to-br before:from-blue-500/20 before:to-blue-800/10', 
    'pink': 'before:bg-gradient-to-br before:from-pink-500/20 before:to-pink-800/10',
    'orange': 'before:bg-gradient-to-br before:from-orange-500/20 before:to-orange-800/10',
    'mixed': 'before:bg-gradient-to-br before:from-[#093d30]/20 before:to-brandae-green/10',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(201, 242, 104, 0.1), 0 10px 10px -5px rgba(201, 242, 104, 0.04)" }}
      className={cn(
        'bg-brandae-gray rounded-xl border-2 border-brandae-green/40 overflow-hidden relative group shadow-lg shadow-brandae-green/5',
        'before:absolute before:inset-0 before:opacity-40 before:rounded-xl before:z-0',
        gradient && gradientClasses[gradient],
        colSpanClasses[colSpan as keyof typeof colSpanClasses],
        rowSpanClasses[rowSpan as keyof typeof rowSpanClasses],
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Also export BentoGrid as default for backward compatibility
export default BentoGrid;
