
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export default function StepCard({ number, title, description, className }: StepCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        'flex flex-col p-6 bg-brandae-gray/60 backdrop-blur-md rounded border border-white/10 relative',
        className
      )}
    >
      <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-brandae-green rounded-full text-brandae-dark font-bold text-lg">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 mt-8">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
}
