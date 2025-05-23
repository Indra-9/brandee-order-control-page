
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Store, ShoppingCart, DollarSign, Truck, Check, 
  ArrowRight, ExternalLink, Users, Building2 
} from 'lucide-react';

export default function MarketplaceSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeIn} 
      className="space-y-12 relative"
    >
      {/* Background Light Shadows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-brandae-green/5 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-gradient-to-br from-[#093d30]/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4">Marketplace Solutions</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Create your own branded marketplace with multi-vendor support, connecting sellers and customers seamlessly.
        </p>
      </div>
      
      {/* Marketplace Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-brandae-gray p-6 rounded-xl border-2 border-brandae-green/30 shadow-lg shadow-brandae-green/5"
        >
          <div className="mb-4 p-3 rounded-full bg-[#093d30]/20 w-fit">
            <Store className="h-8 w-8 text-brandae-green" />
          </div>
          <h3 className="text-xl font-bold mb-2">Multi-Vendor Platform</h3>
          <p className="text-gray-300 mb-4">
            Facilitates transactions between multiple independent sellers and customers, all under your brand.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Individual vendor dashboards
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Customizable commission structures
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Automated vendor payments
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-brandae-gray p-6 rounded-xl border-2 border-brandae-green/30 shadow-lg shadow-brandae-green/5"
        >
          <div className="mb-4 p-3 rounded-full bg-[#093d30]/20 w-fit">
            <ShoppingCart className="h-8 w-8 text-brandae-green" />
          </div>
          <h3 className="text-xl font-bold mb-2">Vendor Management</h3>
          <p className="text-gray-300 mb-4">
            Acts as a platform where various vendors can showcase and sell their products or services.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Vendor onboarding workflows
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Product approval systems
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Performance analytics
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-brandae-gray p-6 rounded-xl border-2 border-brandae-green/30 shadow-lg shadow-brandae-green/5"
        >
          <div className="mb-4 p-3 rounded-full bg-[#093d30]/20 w-fit">
            <DollarSign className="h-8 w-8 text-brandae-green" />
          </div>
          <h3 className="text-xl font-bold mb-2">Transaction Management</h3>
          <p className="text-gray-300 mb-4">
            Manages the platform, transactions, and logistics while vendors control their offerings.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Split payments
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Tax management
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Refund processing
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-brandae-gray p-6 rounded-xl border-2 border-brandae-green/30 shadow-lg shadow-brandae-green/5"
        >
          <div className="mb-4 p-3 rounded-full bg-[#093d30]/20 w-fit">
            <Truck className="h-8 w-8 text-brandae-green" />
          </div>
          <h3 className="text-xl font-bold mb-2">Logistics Coordination</h3>
          <p className="text-gray-300 mb-4">
            Similar to marketplaces like UberEats, Zomato, Swiggy, and Instacart with centralized delivery.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Multi-vendor order bundling
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Optimized delivery routing
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 mr-2 text-brandae-green" /> Driver assignment algorithms
            </li>
          </ul>
        </motion.div>
      </div>
      
      {/* Marketplace Comparison */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brandae-gray rounded-xl border-2 border-brandae-green/30 p-6 max-w-5xl mx-auto shadow-lg shadow-brandae-green/5 relative z-10"
      >
        <h3 className="text-xl font-bold mb-4">Why Build Your Own Marketplace?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg text-brandae-green mb-2">Your Platform</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-brandae-green" />
                <span className="text-gray-300 text-sm">Full control over branding and user experience</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-brandae-green" />
                <span className="text-gray-300 text-sm">Direct customer relationships</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-brandae-green" />
                <span className="text-gray-300 text-sm">Customizable commission structures</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-brandae-green" />
                <span className="text-gray-300 text-sm">Complete data ownership</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg text-gray-400 mb-2">Third-Party Platforms</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1 text-gray-500" />
                <span className="text-gray-400 text-sm">Limited control over customer experience</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1 text-gray-500" />
                <span className="text-gray-400 text-sm">High commission fees (25-35% per order)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1 text-gray-500" />
                <span className="text-gray-400 text-sm">No access to customer data</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1 text-gray-500" />
                <span className="text-gray-400 text-sm">Limited marketing opportunities</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#093d30] to-brandae-green/90 rounded-lg text-white cursor-pointer"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Learn more about marketplace solutions</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
