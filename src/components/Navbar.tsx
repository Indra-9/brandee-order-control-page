
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ContactForm from './ContactForm';
import AnimatedButton from './AnimatedButton';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brandae-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brandae-purple to-brandae-green flex items-center justify-center text-white font-bold text-xl">B</div>
              <span className="text-white text-xl font-bold">Brandae</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Popover>
              <PopoverTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatedButton variant="primary" size="md">Book a Demo</AnimatedButton>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
                <ContactForm />
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden transition-all duration-300 overflow-hidden",
        isMenuOpen ? "max-h-80 border-t border-white/5" : "max-h-0"
      )}>
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <div className="py-2">
                <AnimatedButton variant="primary" size="md" className="w-full justify-center">
                  Book a Demo
                </AnimatedButton>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white">
              <ContactForm />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
