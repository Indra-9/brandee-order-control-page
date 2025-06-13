
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brandae-darker border-t border-brandae-green/20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About Us - 20% width (1 column out of 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#093d30] to-brandae-green flex items-center justify-center">
                <span className="text-white text-xl font-bold">B</span>
              </div>
              <span className="text-white text-2xl font-bold">Brandae</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-brandae-green font-semibold text-lg">About Brandae</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Brandae is revolutionizing the marketing landscape with cutting-edge AI-powered automation 
                and innovative solutions. We empower businesses to achieve unprecedented growth through 
                intelligent marketing strategies.
              </p>
            </div>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://twitter.com/brandae" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brandae-green transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://facebook.com/brandae" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brandae-green transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://linkedin.com/company/brandae" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brandae-green transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com/brandae" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brandae-green transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Features</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">How It Works</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Solutions</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/integrations" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Integrations</Link></li>
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Blog</Link></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Documentation</Link></li>
              <li><Link to="/case-studies" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Case Studies</Link></li>
              <li><Link to="/sitemap" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Sitemap</Link></li>
            </ul>
          </motion.div>

          {/* Legal & Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Legal & Support</h3>
            <ul className="space-y-2 mb-4">
              <li><Link to="/privacy" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Terms of Service</Link></li>
            </ul>
            
            <div className="space-y-3 pt-2 border-t border-brandae-green/20">
              <h4 className="text-brandae-green font-medium text-sm">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-brandae-green" />
                  <span className="text-gray-400 text-sm">hello@brandae.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-brandae-green" />
                  <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-brandae-green" />
                  <span className="text-gray-400 text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-brandae-green/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <span>© 2024 Brandae. All rights reserved. Made with</span>
            <Heart size={14} className="text-red-400 fill-current" />
            <span>for marketers worldwide.</span>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/sitemap" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">
              Sitemap
            </Link>
            <Link to="/auth" className="text-brandae-green hover:text-brandae-green/80 transition-colors text-sm font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
