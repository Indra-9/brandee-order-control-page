
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FeatureCard({ title, description, icon, className, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(9, 61, 48, 0.2), 0 10px 10px -5px rgba(9, 61, 48, 0.1)' }}
      className={cn(
        'flex flex-col p-6 bg-[#093d30]/20 rounded-xl border border-white/5 transition-all duration-300',
        className
      )}
    >
      {icon && <div className="mb-4 text-[#093c2f]">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
}
