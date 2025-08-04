import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  Globe,
  Sparkles,
  Shield,
  Layers
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

// Import images
import groceryImage from '@/assets/grocery-marketplace.jpg';
import restaurantImage from '@/assets/restaurant-delivery.jpg';
import pharmacyImage from '@/assets/pharmacy-aggregator.jpg';
import specialtyImage from '@/assets/specialty-marketplace.jpg';
import franchiseImage from '@/assets/franchise-chain.jpg';
import essentialsImage from '@/assets/essentials-delivery.jpg';
const solutionSections = [
  {
    id: 'grocery',
    title: 'Grocery Marketplaces',
    description: 'Power your own version of BigBasket or Blinkit with complete control. Let local kirana stores, supermarkets, or organic food sellers list their own products while you manage orders, delivery, and promotions.',
    icon: <ShoppingCart className="h-8 w-8" />,
    image: groceryImage,
    features: [
      'Store-wise catalogs & pricing',
      'Perishable item handling (expiry dates, batch tracking)',
      'Zone-wise delivery logic',
      'Bulk import for large SKUs',
      'Inventory auto-sync (manual, POS or API integration)'
    ],
    useCase: {
      title: 'LokalBasket Success Story',
      description: 'Cloudify helped "LokalBasket" onboard 12 stores in 2 weeks and process 5,000+ orders in the first month by automating inventory and delivery workflows.',
      metrics: ['12 stores', '2 weeks', '5,000+ orders']
    },
    gradient: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10'
  },
  {
    id: 'restaurant',
    title: 'Restaurant Delivery Platforms',
    description: 'Build a Swiggy or Zomato alternative where restaurants, cloud kitchens, and home chefs can accept direct orders. Give them their own storefront while retaining central control.',
    icon: <UtensilsCrossed className="h-8 w-8" />,
    image: restaurantImage,
    features: [
      'Food-specific product modules (variants, add-ons, combos)',
      'Order preparation time, delivery time buffer',
      'Delivery scheduling & cut-off controls',
      'Ratings, reviews, and in-app chat',
      'KOT, printer, and kitchen notification integrations'
    ],
    useCase: {
      title: 'SwadExpress Success Story',
      description: '"SwadExpress" onboarded 35 restaurants in a city and saved over ₹18L in commissions annually using Cloudify\'s white-labeled ordering system.',
      metrics: ['35 restaurants', '₹18L saved', '1 city']
    },
    gradient: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy Aggregators',
    description: 'Enable local chemists to deliver over-the-counter and prescription medicines. Support compliance workflows while maintaining a user-friendly customer experience.',
    icon: <Pill className="h-8 w-8" />,
    image: pharmacyImage,
    features: [
      'Prescription uploads with validation',
      'Vendor-level compliance status',
      'Medicine availability syncing',
      'Scheduled delivery & refill reminder tools',
      'Multi-level product search (by name, salt, brand)'
    ],
    useCase: {
      title: 'MediDrop Success Story',
      description: '"MediDrop" launched in 3 zones and achieved 1,000+ verified prescription orders in their first 45 days by using Cloudify\'s multi-store checkout and delivery timing controls.',
      metrics: ['3 zones', '1,000+ orders', '45 days']
    },
    gradient: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'specialty',
    title: 'Specialty / Niche Marketplaces',
    description: 'Whether it\'s pet food, baby care, bakery items, or health products — Cloudify can handle specialty product variants, vendor-level brand stories, and repeat-order logic.',
    icon: <Heart className="h-8 w-8" />,
    image: specialtyImage,
    features: [
      'Subscription flows & scheduled deliveries',
      'Vendor spotlight pages (e.g., "Top Pet Food Stores Near You")',
      'Bundle pricing, packs, and combos',
      'Add-on upsells (e.g., "Add treats for ₹99")',
      'WhatsApp or chat integration for boutique sellers'
    ],
    useCase: {
      title: 'PetMart Hub Success Story',
      description: '"PetMart Hub" created a hyperlocal pet supply platform in Pune with 20+ niche vendors and built a loyal repeat customer base in under 60 days.',
      metrics: ['20+ vendors', 'Pune city', '60 days']
    },
    gradient: 'from-pink-500 to-purple-600',
    bgColor: 'bg-pink-500/10'
  },
  {
    id: 'franchise',
    title: 'Franchise & Chain Model',
    description: 'Support city-wide, state-wide, or national franchise businesses. Let each outlet manage its own inventory, delivery staff, and promotions, while you maintain brand and policy consistency.',
    icon: <Building2 className="h-8 w-8" />,
    image: franchiseImage,
    features: [
      'Centralized branding with local product/price overrides',
      'Store-specific performance dashboards',
      'Region-wise delivery teams & zone mapping',
      'Internal communication tools (HQ ↔ Branch)',
      'SLA-based order monitoring & alerts'
    ],
    useCase: {
      title: 'Dairy Franchise Success Story',
      description: 'A dairy franchise used Cloudify to roll out their branded delivery app to 50+ outlets across two states, maintaining consistent delivery experience and store-level autonomy.',
      metrics: ['50+ outlets', '2 states', 'Consistent experience']
    },
    gradient: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-500/10'
  },
  {
    id: 'essentials',
    title: 'Essentials & Hyperlocal Delivery',
    description: 'Enable daily or emergency delivery of essentials like milk, bread, snacks, packaged food, toiletries, or household goods — directly from nearby vendors.',
    icon: <Package className="h-8 w-8" />,
    image: essentialsImage,
    features: [
      'Smart product discovery with distance filtering',
      'Stock-aware search (see only in-stock items)',
      'Multi-store cart & checkout',
      'Delivery-time filters (e.g., "Deliver in 15 minutes", "Next day delivery")',
      'Zone-based marketing campaigns'
    ],
    useCase: {
      title: 'CityMart Success Story',
      description: '"CityMart" served over 40,000 households by launching a rapid-delivery essentials app powered by Cloudify, reducing delivery time to <20 mins with auto-assignment logic.',
      metrics: ['40,000 households', '<20 mins', 'Rapid delivery']
    },
    gradient: 'from-teal-500 to-green-600',
    bgColor: 'bg-teal-500/10'
  }
];

const whyCloudifyFeatures = [
  {
    icon: <Layers className="h-8 w-8" />,
    title: 'Modular Architecture',
    description: 'Flexible and scalable for any product or service',
    color: 'text-emerald-400'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'No-Code Builder',
    description: 'Easy storefront creation for sellers',
    color: 'text-blue-400'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Cloud Infrastructure',
    description: 'Secure, scalable hosting with 99.9% uptime',
    color: 'text-purple-400'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Localization Support',
    description: 'Regional languages, tax rules, and currencies',
    color: 'text-pink-400'
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Third-Party Integrations',
    description: 'APIs for POS, ERP, CRM systems',
    color: 'text-orange-400'
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: 'Marketing Automation',
    description: 'Built-in tools for customer engagement',
    color: 'text-cyan-400'
  }
];

const SolutionCard = ({ solution, index }: { solution: typeof solutionSections[0], index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="min-w-[90vw] md:min-w-[80vw] lg:min-w-[70vw] xl:min-w-[60vw] snap-center"
    >
      <div className={`relative overflow-hidden rounded-3xl ${solution.bgColor} border border-white/10 backdrop-blur-sm`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        
        <div className="relative p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${solution.gradient}`}>
                  <div className="text-white">
                    {solution.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {solution.title}
                  </h3>
                  <div className={`h-1 w-20 bg-gradient-to-r ${solution.gradient} rounded-full`} />
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                {solution.description}
              </p>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Key Features
                </h4>
                <div className="grid gap-3">
                  {solution.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <Check className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image & Use Case Side */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="relative w-full h-64 lg:h-80 object-cover rounded-2xl border border-white/20 group-hover:scale-105 transition-all duration-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.6 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <h5 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  {solution.useCase.title}
                </h5>
                <p className="text-gray-300 leading-relaxed mb-4 italic">
                  "{solution.useCase.description}"
                </p>
                <div className="flex flex-wrap gap-2">
                  {solution.useCase.metrics.map((metric, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 bg-gradient-to-r ${solution.gradient} text-white text-sm font-medium rounded-full`}
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Solutions() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <>
      <SEO 
        title="Purpose-Built Solutions - Cloudify Multi-Vendor Platform"
        description="Discover comprehensive solutions for grocery marketplaces, restaurant delivery, pharmacy aggregators, and specialty commerce platforms."
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        
        {/* Hero Section */}
        <section ref={containerRef} className="relative py-32 px-4 overflow-hidden">
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,255,214,0.2),transparent_50%)]" />
          
          <motion.div 
            style={{ y: textY }}
            className="relative max-w-7xl mx-auto text-center z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-white/20 mb-6">
                <Sparkles className="h-4 w-4" />
                Purpose-Built Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Every Local Commerce
              </span>
              <br />
              <span className="text-foreground">Model Covered</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
            >
              Whether you run a grocery marketplace, restaurant delivery app, or neighborhood essentials platform — 
              Cloudify equips you with the tools to launch, manage, and scale your multi-vendor business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="group bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2 justify-center">
                Explore Solutions
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-primary/20 bg-white/5 backdrop-blur-sm text-foreground px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Solutions Horizontal Scroll */}
        <section className="py-20">
          <div className="px-4 mb-16">
            <div className="max-w-7xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold mb-6"
              >
                Solutions Tailored for Your
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> Business Model</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                Discover how Cloudify powers different types of multi-vendor platforms across industries
              </motion.p>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-8 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              {solutionSections.map((solution, index) => (
                <SolutionCard key={solution.id} solution={solution} index={index} />
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Scroll to explore more</span>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Solution CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20 p-12 rounded-3xl border border-white/10 backdrop-blur-sm text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10" />
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Want a Custom Solution?</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                  Not seeing your category above? Cloudify is flexible and modular. From laundry delivery 
                  to alcohol delivery (where permitted), our platform can be tailored for any multi-vendor use case.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2 justify-center">
                    Talk to an Expert 
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="border border-primary/20 bg-white/5 backdrop-blur-sm text-foreground px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
                    Book a Custom Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Cloudify Works */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold mb-6"
              >
                Why Cloudify Works for 
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> All These Models</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Built for flexibility, designed for growth
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyCloudifyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 bg-white/10 rounded-xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {feature.description}
                  </p>
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
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Launch Your Platform?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of businesses using Cloudify to power their multi-vendor platforms 
                and transform local commerce.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2 justify-center">
                  Start Building Now 
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-primary/20 bg-white/5 backdrop-blur-sm text-foreground px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
                  View Live Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}