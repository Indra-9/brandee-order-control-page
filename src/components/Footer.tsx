
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brandae-darker border-t border-brandae-green/20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#093d30] to-brandae-green flex items-center justify-center text-white font-bold">B</div>
              <span className="text-white text-lg font-bold">Brandae</span>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing marketing with AI-powered automation and cutting-edge solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-brandae-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brandae-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brandae-green transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brandae-green transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Features</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">How It Works</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Solutions</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/case-studies" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Case Studies</Link></li>
            </ul>
          </motion.div>

          {/* Resources */}
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
              <li><Link to="/integrations" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Integrations</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brandae-green" />
                <span className="text-gray-400 text-sm">hello@brandae.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-brandae-green" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-brandae-green" />
                <span className="text-gray-400 text-sm">San Francisco, CA</span>
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
          <p className="text-gray-400 text-sm">
            © 2024 Brandae. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/sitemap" className="text-gray-400 hover:text-brandae-green transition-colors text-sm">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
