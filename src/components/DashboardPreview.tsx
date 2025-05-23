
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Users, Clock, Globe, Package, MessageSquare, Star } from 'lucide-react';

const dashboardMetrics = [
  { name: "Total Orders", value: "1,234", change: 12.5 },
  { name: "Revenue", value: "$9,876", change: 8.3 },
  { name: "Active Users", value: "587", change: 15.2 },
  { name: "Avg. Order Value", value: "$42.50", change: -2.1 },
  { name: "Conversion Rate", value: "3.8%", change: 5.6 },
  { name: "New Customers", value: "127", change: 9.4 },
  { name: "Repeat Orders", value: "64%", change: 3.2 },
  { name: "Delivery Time", value: "28 min", change: -4.7 }
];

export default function DashboardPreview() {
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
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-br from-brandae-green/8 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-gradient-to-br from-[#093d30]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4">Powerful Dashboard</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">Everything you need to manage your business in one place.</p>
      </div>
      
      <div className="bg-brandae-gray rounded-xl p-6 border-2 border-brandae-green/30 overflow-hidden shadow-lg shadow-brandae-green/5 relative z-10">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Dashboard Preview</h3>
            <span className="text-brandae-green text-sm">Live Data</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardMetrics.map((metric, idx) => (
              <motion.div 
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-brandae-dark p-4 rounded-lg border border-brandae-green/20"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">{metric.name}</span>
                  {metric.change > 0 ? (
                    <span className="text-green-400 text-xs flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />+{metric.change}%
                    </span>
                  ) : (
                    <span className="text-red-400 text-xs">-{Math.abs(metric.change)}%</span>
                  )}
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Dashboard Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="md:col-span-2 bg-brandae-dark rounded-lg border border-brandae-green/20 p-4"
            >
              <h4 className="font-medium mb-2 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-brandae-green" />
                Revenue Overview
              </h4>
              <div className="h-40 w-full bg-gradient-to-r from-[#093d30]/30 to-brandae-green/10 rounded flex items-center justify-center">
                <p className="text-sm text-gray-400">Interactive revenue chart</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-brandae-dark rounded-lg border border-brandae-green/20 p-4"
            >
              <h4 className="font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2 text-brandae-green" />
                Customer Growth
              </h4>
              <div className="h-40 w-full bg-gradient-to-r from-[#093d30]/30 to-brandae-green/10 rounded flex items-center justify-center">
                <p className="text-sm text-gray-400">Customer acquisition chart</p>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-brandae-dark rounded-lg border border-brandae-green/20 p-4"
            >
              <h4 className="font-medium mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-brandae-green" />
                Recent Orders
              </h4>
              <ul className="space-y-2">
                {[1, 2, 3].map(i => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">Order #{10243 + i}</span>
                    <span className="text-xs text-brandae-green">${47.20 + i}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-brandae-dark rounded-lg border border-brandae-green/20 p-4"
            >
              <h4 className="font-medium mb-2 flex items-center">
                <Star className="h-4 w-4 mr-2 text-brandae-green" />
                Popular Items
              </h4>
              <ul className="space-y-2">
                {['Classic Burger', 'Chicken Wings', 'Veggie Salad'].map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">{item}</span>
                    <span className="text-xs text-gray-400">{93 - (i * 12)}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-brandae-dark rounded-lg border border-brandae-green/20 p-4"
            >
              <h4 className="font-medium mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-2 text-brandae-green" />
                Active Locations
              </h4>
              <ul className="space-y-2">
                {['Downtown', 'Mall Plaza', 'Airport'].map((location, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">{location}</span>
                    <span className="text-xs text-green-400">Online</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-brandae-dark rounded-lg border border-brandae-green/20 p-4"
            >
              <h4 className="font-medium mb-2 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-brandae-green" />
                Customer Messages
              </h4>
              <ul className="space-y-2">
                {['Support Query', 'Order Issue', 'Feedback'].map((msg, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">{msg}</span>
                    <span className="text-xs text-orange-400">New</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
