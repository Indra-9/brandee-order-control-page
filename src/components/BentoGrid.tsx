
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function BentoGrid({ children, className }: BentoGridProps) {
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
}

export function BentoGridItem({ 
  children, 
  className, 
  colSpan = 1, 
  rowSpan = 1,
  delay = 0
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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'bg-brandae-gray rounded-xl border border-white/5 overflow-hidden',
        colSpanClasses[colSpan as keyof typeof colSpanClasses],
        rowSpanClasses[rowSpan as keyof typeof rowSpanClasses],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
