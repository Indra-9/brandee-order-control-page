
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, ExternalLink, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter",
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: "Subscription Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Integrations', href: '/integrations' },
      { name: 'How it Works', href: '/how-it-works' }
    ],
    resources: [
      { name: 'Documentation', href: '/documentation' },
      { name: 'Blog', href: '/blog' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Support Center', href: '/support' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Partners', href: '/partners' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Security', href: '/security' },
      { name: 'Sitemap', href: '/sitemap' }
    ]
  };

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/brandae',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/brandae',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/brandae',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668-.014 4.948-.072 4.358-2.618 6.78-2.618-6.98-6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668-.072 4.948-.196 4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com/brandae',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-brandae-darker border-t border-brandae-green/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-8 right-8 w-32 h-32 rounded-full bg-brandae-green/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-16 left-16 w-24 h-24 rounded-full bg-brandae-green/10 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8"
        >
          {/* About Us Section - 40% width (2 columns out of 5) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#093d30] to-brandae-green flex items-center justify-center"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <span className="text-white font-bold text-xl">B</span>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white">Brandae</h3>
                <p className="text-brandae-green text-sm">Own Your Orders</p>
              </div>
            </div>

            {/* About Text */}
            <div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Brandae is revolutionizing the food delivery landscape with cutting-edge AI-powered automation 
                and innovative solutions. We empower restaurants and grocery stores to achieve unprecedented 
                growth through intelligent marketing strategies that deliver measurable results and drive 
                sustainable success.
              </p>
              <motion.div
                whileHover="hover"
                variants={linkVariants}
                className="inline-flex items-center gap-2 text-brandae-green hover:text-white transition-colors cursor-pointer text-sm"
              >
                Learn more about our mission
                <ArrowRight size={14} />
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3 text-gray-300 hover:text-brandae-green transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail size={16} />
                <span className="text-sm">hello@brandae.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-300 hover:text-brandae-green transition-colors"
                whileHover={{ x: 5 }}
              >
                <Phone size={16} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-300 hover:text-brandae-green transition-colors"
                whileHover={{ x: 5 }}
              >
                <MapPin size={16} />
                <span className="text-sm">San Francisco, CA</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brandae-gray border border-brandae-green/20 flex items-center justify-center text-gray-400 hover:text-brandae-green hover:border-brandae-green/40 hover:bg-brandae-green/10 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Product
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brandae-green"></div>
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-brandae-green transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <motion.span
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Resources
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brandae-green"></div>
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-brandae-green transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <motion.span
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Company
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brandae-green"></div>
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-brandae-green transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <motion.span
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              Legal
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brandae-green"></div>
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-brandae-green transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <motion.span
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-brandae-green/20"
        >
          <div className="max-w-lg mx-auto text-center">
            <h4 className="text-xl font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-6">
              Get the latest updates on new features, success stories, and industry insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-brandae-gray border border-brandae-green/20 text-white placeholder-gray-400 focus:outline-none focus:border-brandae-green transition-colors"
                disabled={isSubscribing}
                required
              />
              <motion.button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 bg-brandae-green text-brandae-dark rounded-xl font-semibold hover:bg-brandae-green/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: isSubscribing ? 1 : 1.05 }}
                whileTap={{ scale: isSubscribing ? 1 : 0.95 }}
              >
                {isSubscribing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-brandae-dark border-t-transparent rounded-full"
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Subscribe
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-brandae-green/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-gray-400">
            © {currentYear} Brandae. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              🌱 Carbon Neutral Delivery
            </motion.span>
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              🔒 SOC 2 Compliant
            </motion.span>
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              ⚡ 99.9% Uptime
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
