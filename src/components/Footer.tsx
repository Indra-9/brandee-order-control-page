
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface FooterConfig {
  logo_url: string;
  about_text: string;
  copyright_text: string;
}

interface FooterLinkCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

interface FooterLink {
  id: string;
  category_id: string;
  title: string;
  url: string;
  is_external: boolean;
  sort_order: number;
}

interface FooterContact {
  email: string;
  phone: string;
  address: string;
}

interface FooterSocialLink {
  platform: string;
  url: string;
  icon_name: string;
  sort_order: number;
}

const Footer = () => {
  const [config, setConfig] = useState<FooterConfig | null>(null);
  const [categories, setCategories] = useState<FooterLinkCategory[]>([]);
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [contact, setContact] = useState<FooterContact | null>(null);
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      // Fetch footer config
      const { data: configData } = await supabase
        .from('footer_config')
        .select('*')
        .single();
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('footer_link_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      // Fetch links
      const { data: linksData } = await supabase
        .from('footer_links')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      // Fetch contact
      const { data: contactData } = await supabase
        .from('footer_contact')
        .select('*')
        .single();

      // Fetch social links
      const { data: socialData } = await supabase
        .from('footer_social_links')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (configData) setConfig(configData);
      if (categoriesData) setCategories(categoriesData);
      if (linksData) setLinks(linksData);
      if (contactData) setContact(contactData);
      if (socialData) setSocialLinks(socialData);
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSocialIcon = (iconName: string) => {
    const iconProps = { size: 20 };
    
    switch (iconName.toLowerCase()) {
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'youtube':
        return <Youtube {...iconProps} />;
      default:
        return <Mail {...iconProps} />;
    }
  };

  const getLinksByCategory = (categoryId: string) => {
    return links.filter(link => link.category_id === categoryId);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  if (!config) return null;

  return (
    <motion.footer
      className="bg-brandae-dark border-t border-brandae-green/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {/* Logo and About Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="mb-6">
              {config.logo_url && (
                <motion.img
                  src={config.logo_url}
                  alt="Company Logo"
                  className="h-12 w-auto mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {config.about_text}
            </p>
          </motion.div>

          {/* Link Categories */}
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <h3 className="text-brandae-green font-semibold text-lg mb-4">
                {category.name}
              </h3>
              <ul className="space-y-3">
                {getLinksByCategory(category.id).map((link) => (
                  <motion.li
                    key={link.id}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.is_external ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-brandae-green transition-colors text-sm"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        to={link.url}
                        className="text-gray-300 hover:text-brandae-green transition-colors text-sm"
                      >
                        {link.title}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Subscription */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h3 className="text-brandae-green font-semibold text-lg mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-brandae-gray border-brandae-green/20 text-white placeholder:text-gray-400"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brandae-green text-brandae-dark hover:bg-brandae-green/90 transition-colors"
              >
                <Send size={16} className="mr-2" />
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>

            {/* Contact Details */}
            {contact && (
              <div className="mt-8 space-y-3">
                <h4 className="text-brandae-green font-medium">Contact Us</h4>
                <div className="space-y-2">
                  {contact.email && (
                    <motion.div
                      className="flex items-center text-gray-300 text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail size={16} className="mr-2 text-brandae-green" />
                      <a href={`mailto:${contact.email}`} className="hover:text-brandae-green transition-colors">
                        {contact.email}
                      </a>
                    </motion.div>
                  )}
                  {contact.phone && (
                    <motion.div
                      className="flex items-center text-gray-300 text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Phone size={16} className="mr-2 text-brandae-green" />
                      <a href={`tel:${contact.phone}`} className="hover:text-brandae-green transition-colors">
                        {contact.phone}
                      </a>
                    </motion.div>
                  )}
                  {contact.address && (
                    <motion.div
                      className="flex items-start text-gray-300 text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin size={16} className="mr-2 text-brandae-green mt-0.5" />
                      <span>{contact.address}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-brandae-green/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          {/* Copyright */}
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            {config.copyright_text}
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brandae-green transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {renderSocialIcon(social.icon_name)}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
