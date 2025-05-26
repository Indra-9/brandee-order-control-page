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