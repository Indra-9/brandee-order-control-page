import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  UtensilsCrossed, 
  Pill, 
  Heart, 
  Building2, 
  Package, 
  Check, 
  ArrowRight,
  Zap,
  Clock,
  Users,
  Star,
  TrendingUp,
  Globe
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
const solutionSections = [
  {
    id: 'grocery',
    title: 'Grocery Marketplaces',
    description: 'Power your own version of BigBasket or Blinkit with complete control. Let local kirana stores, supermarkets, or organic food sellers list their own products while you manage orders, delivery, and promotions.',
    icon: <ShoppingCart className="h-12 w-12" />,
    features: [
      'Store-wise catalogs & pricing',
      'Perishable item handling (expiry dates, batch tracking)',
      'Zone-wise delivery logic',
      'Bulk import for large SKUs',
      'Inventory auto-sync (manual, POS or API integration)'
    ],
    useCase: {
      title: 'LokalBasket Success Story',
      description: 'Cloudify helped "LokalBasket" onboard 12 stores in 2 weeks and process 5,000+ orders in the first month by automating inventory and delivery workflows.'
    },
    gradient: 'from-green-400 to-emerald-600'
  },
  {
    id: 'restaurant',
    title: 'Restaurant Delivery Platforms',
    description: 'Build a Swiggy or Zomato alternative where restaurants, cloud kitchens, and home chefs can accept direct orders. Give them their own storefront while retaining central control.',
    icon: <UtensilsCrossed className="h-12 w-12" />,
    features: [
      'Food-specific product modules (variants, add-ons, combos)',
      'Order preparation time, delivery time buffer',
      'Delivery scheduling & cut-off controls',
      'Ratings, reviews, and in-app chat',
      'KOT, printer, and kitchen notification integrations'
    ],
    useCase: {
      title: 'SwadExpress Success Story',
      description: '"SwadExpress" onboarded 35 restaurants in a city and saved over ₹18L in commissions annually using Cloudify\'s white-labeled ordering system.'
    },
    gradient: 'from-orange-400 to-red-600'
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy Aggregators',
    description: 'Enable local chemists to deliver over-the-counter and prescription medicines. Support compliance workflows while maintaining a user-friendly customer experience.',
    icon: <Pill className="h-12 w-12" />,
    features: [
      'Prescription uploads with validation',
      'Vendor-level compliance status',
      'Medicine availability syncing',
      'Scheduled delivery & refill reminder tools',
      'Multi-level product search (by name, salt, brand)'
    ],
    useCase: {
      title: 'MediDrop Success Story',
      description: '"MediDrop" launched in 3 zones and achieved 1,000+ verified prescription orders in their first 45 days by using Cloudify\'s multi-store checkout and delivery timing controls.'
    },
    gradient: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'specialty',
    title: 'Specialty / Niche Marketplaces',
    description: 'Whether it\'s pet food, baby care, bakery items, or health products — Cloudify can handle specialty product variants, vendor-level brand stories, and repeat-order logic.',
    icon: <Heart className="h-12 w-12" />,
    features: [
      'Subscription flows & scheduled deliveries',
      'Vendor spotlight pages (e.g., "Top Pet Food Stores Near You")',
      'Bundle pricing, packs, and combos',
      'Add-on upsells (e.g., "Add treats for ₹99")',
      'WhatsApp or chat integration for boutique sellers'
    ],
    useCase: {
      title: 'PetMart Hub Success Story',
      description: '"PetMart Hub" created a hyperlocal pet supply platform in Pune with 20+ niche vendors and built a loyal repeat customer base in under 60 days.'
    },
    gradient: 'from-pink-400 to-purple-600'
  },
  {
    id: 'franchise',
    title: 'Franchise & Chain Model',
    description: 'Support city-wide, state-wide, or national franchise businesses. Let each outlet manage its own inventory, delivery staff, and promotions, while you maintain brand and policy consistency.',
    icon: <Building2 className="h-12 w-12" />,
    features: [
      'Centralized branding with local product/price overrides',
      'Store-specific performance dashboards',
      'Region-wise delivery teams & zone mapping',
      'Internal communication tools (HQ ↔ Branch)',
      'SLA-based order monitoring & alerts'
    ],
    useCase: {
      title: 'Dairy Franchise Success Story',
      description: 'A dairy franchise used Cloudify to roll out their branded delivery app to 50+ outlets across two states, maintaining consistent delivery experience and store-level autonomy.'
    },
    gradient: 'from-indigo-400 to-blue-600'
  },
  {
    id: 'essentials',
    title: 'Essentials & Hyperlocal Delivery',
    description: 'Enable daily or emergency delivery of essentials like milk, bread, snacks, packaged food, toiletries, or household goods — directly from nearby vendors.',
    icon: <Package className="h-12 w-12" />,
    features: [
      'Smart product discovery with distance filtering',
      'Stock-aware search (see only in-stock items)',
      'Multi-store cart & checkout',
      'Delivery-time filters (e.g., "Deliver in 15 minutes", "Next day delivery")',
      'Zone-based marketing campaigns'
    ],
    useCase: {
      title: 'CityMart Success Story',
      description: '"CityMart" served over 40,000 households by launching a rapid-delivery essentials app powered by Cloudify, reducing delivery time to <20 mins with auto-assignment logic.'
    },
    gradient: 'from-teal-400 to-green-600'
  }
];

const whyCloudifyFeatures = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Modular Architecture',
    description: 'Flexible and scalable for any product or service'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'No-Code Builder',
    description: 'Easy storefront creation for sellers'
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Cloud Infrastructure',
    description: 'Secure, scalable hosting with 99.9% uptime'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Localization Support',
    description: 'Regional languages, tax rules, and currencies'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Third-Party Integrations',
    description: 'APIs for POS, ERP, CRM systems'
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Marketing Automation',
    description: 'Built-in tools for customer engagement'
  }
];

export default function Solutions() {
  return (
    <>
      <SEO 
        title="Purpose-Built Solutions - Cloudify Multi-Vendor Platform"
        description="Discover comprehensive solutions for grocery marketplaces, restaurant delivery, pharmacy aggregators, and specialty commerce platforms."
      />
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-brandae-green to-brandae-purple bg-clip-text text-transparent">
                Purpose-Built Solutions
              </span>
              <br />
              <span className="text-white">for Every Local Commerce Model</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Whether you run a grocery marketplace, restaurant delivery app, or neighborhood essentials platform — 
              Cloudify equips you with the tools to launch, manage, and scale your multi-vendor business.
            </motion.p>
          </div>
        </section>

        {/* Solutions Sections */}
        {solutionSections.map((solution, index) => (
          <section key={solution.id} className={`py-20 px-4 ${index % 2 === 1 ? 'bg-brandae-gray' : ''}`}>
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${solution.gradient} mb-6`}>
                    <div className="text-white">
                      {solution.icon}
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold mb-6">{solution.title}</h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-brandae-green">Key Features:</h3>
                  <ul className="space-y-3 mb-8">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-brandae-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brandae-dark/50 p-8 rounded-2xl border border-brandae-green/20">
                  <h3 className="text-2xl font-bold mb-4 text-brandae-green">
                    {solution.useCase.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed italic">
                    "{solution.useCase.description}"
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* Custom Solution CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-brandae-purple/20 to-brandae-green/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Want a Custom Solution?</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Not seeing your category above? Cloudify is flexible and modular. From laundry delivery 
                to alcohol delivery (where permitted), our platform can be tailored for any multi-vendor use case.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-brandae-purple to-brandae-green text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                  Talk to an Expert <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border border-brandae-green text-brandae-green px-8 py-4 rounded-lg font-semibold hover:bg-brandae-green hover:text-brandae-dark transition-colors">
                  Book a Custom Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Cloudify Works */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Why Cloudify Works for All These Models</h2>
              <p className="text-xl text-gray-400">Built for flexibility, designed for growth</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyCloudifyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-brandae-gray p-6 rounded-xl border border-brandae-green/20 hover:border-brandae-green/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-brandae-green/20 rounded-lg text-brandae-green">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Platform?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of businesses using Cloudify to power their multi-vendor platforms 
                and transform local commerce.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-brandae-purple to-brandae-green text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                  Start Building Now <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border border-brandae-green text-brandae-green px-8 py-4 rounded-lg font-semibold hover:bg-brandae-green hover:text-brandae-dark transition-colors">
                  View Live Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}