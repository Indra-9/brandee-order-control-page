
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IntegrationLogoProps {
  name: string;
  logo: string;
  className?: string;
}

export default function IntegrationLogo({ name, logo, className }: IntegrationLogoProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={cn(
        'flex flex-col items-center justify-center p-4 bg-brandae-gray rounded-xl border border-white/5',
        className
      )}
    >
      <img src={logo} alt={name} className="h-12 mb-2" />
      <p className="text-xs text-center text-muted-foreground">{name}</p>
    </motion.div>
  );
}
