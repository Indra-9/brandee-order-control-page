
import React from 'react';
import { motion } from 'framer-motion';
import { Store, Truck, Users2, BarChart3, ShoppingBag, Utensils } from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const solutions = [
  {
    icon: Store,
    title: 'Single Location Restaurants',
    description: 'Perfect for independent restaurants looking to build their own ordering platform and reduce dependency on third-party apps.',
    features: ['Custom branded app', 'Direct customer relationships', 'Zero commission fees', 'Complete data ownership'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop'
  },
  {
    icon: Truck,
    title: 'Multi-Location Chains',
    description: 'Streamline operations across multiple locations with centralized management and consistent branding.',
    features: ['Multi-location dashboard', 'Centralized menu management', 'Location-specific analytics', 'Unified customer database'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop'
  },
  {
    icon: Users2,
    title: 'Cloud Kitchens',
    description: 'Optimize delivery-only operations with powerful tools designed for virtual restaurants and ghost kitchens.',
    features: ['Delivery optimization', 'Virtual brand management', 'Order aggregation', 'Performance tracking'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop'
  },
  {
    icon: BarChart3,
    title: 'Enterprise Solutions',
    description: 'Advanced features and dedicated support for large restaurant groups and enterprise clients.',
    features: ['Advanced analytics', 'API integrations', 'Dedicated support', 'Custom development'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
  }
];

const industries = [
  {
    icon: Utensils,
    title: 'Fine Dining',
    description: 'Maintain your premium brand experience with elegant ordering interfaces.',
    color: 'from-[#093d30] to-[#093c2f]'
  },
  {
    icon: ShoppingBag,
    title: 'Quick Service',
    description: 'Speed up orders with streamlined interfaces built for high-volume operations.',
    color: 'from-[#093c2f] to-[#c9f268]'
  },
  {
    icon: Store,
    title: 'Coffee Shops',
    description: 'Perfect for cafes and coffee shops with loyalty programs and pre-ordering.',
    color: 'from-[#c9f268] to-[#093d30]'
  }
];

export default function Solutions() {
  return (
    <>
      <SEO 
        title="Solutions - Brandae"
        description="Discover tailored solutions for every type of restaurant business. From single locations to enterprise chains, we have the perfect solution for you."
      />
      <div className="min-h-screen bg-brandae-dark">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Solutions for Every <span className="gradient-text">Business</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Whether you're a single restaurant or a multi-location chain, 
                we have the perfect solution to help you own your orders and grow your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-brandae-gray border-2 border-[#c9f268] rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#c9f268]/20 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={solution.image} 
                      alt={solution.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#c9f268] flex items-center justify-center mr-4">
                        <solution.icon className="w-6 h-6 text-brandae-dark" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{solution.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">{solution.description}</p>
                    <div className="space-y-2">
                      {solution.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <div className="w-2 h-2 bg-[#c9f268] rounded-full mr-3"></div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-brandae-gray/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Built for Every <span className="gradient-text">Industry</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform adapts to your specific industry needs, 
                providing tailored features and experiences for different restaurant types.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${industry.color} flex items-center justify-center mx-auto mb-6 border-2 border-[#c9f268]`}>
                    <industry.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{industry.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{industry.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#093d30] to-[#093c2f] rounded-3xl p-12 border border-[#c9f268]"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Trusted by Restaurants Worldwide
                </h2>
                <p className="text-xl text-gray-300">
                  Join the growing community of successful restaurant owners
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-[#c9f268] mb-2">10,000+</div>
                  <div className="text-gray-300">Active Restaurants</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#c9f268] mb-2">$2M+</div>
                  <div className="text-gray-300">Orders Processed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#c9f268] mb-2">99.9%</div>
                  <div className="text-gray-300">Uptime</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#c9f268] mb-2">24/7</div>
                  <div className="text-gray-300">Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
