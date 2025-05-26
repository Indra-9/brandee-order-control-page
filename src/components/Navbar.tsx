import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import EnhancedContactForm from './EnhancedContactForm';
import AnimatedButton from './AnimatedButton';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
const navItems = [{
  name: 'Features',
  href: '/features'
}, {
  name: 'How It Works',
  href: '/how-it-works'
}, {
  name: 'Solutions',
  href: '/solutions'
}, {
  name: 'Case Studies',
  href: '/case-studies'
}, {
  name: 'Blog',
  href: '/blog'
}, {
  name: 'Pricing',
  href: '/pricing'
}];
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-brandae-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5
        }} className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#093d30] to-brandae-green flex items-center justify-center text-white font-bold text-xl">B</div>
              <span className="text-white text-xl font-bold">Brandae</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => <motion.div key={item.name} initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1,
            duration: 0.5
          }} whileHover={{
            scale: 1.05
          }}>
                {item.href.startsWith('/') ? <Link to={item.href} className="text-gray-300 hover:text-brandae-green transition-colors">
                    {item.name}
                  </Link> : <a href={item.href} className="text-gray-300 hover:text-brandae-green transition-colors">
                    {item.name}
                  </a>}
              </motion.div>)}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {!session && <Link to="/auth">
                
              </Link>}
            
            <Popover>
              <PopoverTrigger asChild>
                <motion.div initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: 0.6,
                duration: 0.5
              }} whileHover={{
                scale: 1.05
              }}>
                  <AnimatedButton variant="primary" size="md" className="py-2 rounded-xl font-semibold flex items-center justify-center gap-2">Book a Demo</AnimatedButton>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] bg-brandae-gray border-white/10 text-white p-0 rounded-lg">
                <EnhancedContactForm />
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden", isMenuOpen ? "max-h-80 border-t border-white/5" : "max-h-0")}>
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          {navItems.map(item => <div key={item.name} onClick={() => setIsMenuOpen(false)}>
              {item.href.startsWith('/') ? <Link to={item.href} className="text-gray-300 hover:text-brandae-green transition-colors py-2 block">
                  {item.name}
                </Link> : <a href={item.href} className="text-gray-300 hover:text-brandae-green transition-colors py-2 block">
                  {item.name}
                </a>}
            </div>)}
          
          {!session && <div onClick={() => setIsMenuOpen(false)}>
              <Link to="/auth" className="text-gray-300 hover:text-brandae-green transition-colors py-2 block">
                Sign In
              </Link>
            </div>}
          
          <Popover>
            <PopoverTrigger asChild>
              <div className="py-2">
                <AnimatedButton variant="primary" size="md" className="w-full justify-center">
                  Book a Demo
                </AnimatedButton>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] bg-brandae-gray border-white/10 text-white p-0 rounded-lg">
              <EnhancedContactForm />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>;
}