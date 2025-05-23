import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import AnimatedButton from '@/components/AnimatedButton';
const blogPosts = [{
  id: 1,
  title: "How to Reduce Food Delivery Costs by 30% Without Compromising Quality",
  excerpt: "Discover proven strategies that successful restaurants use to cut delivery costs while maintaining excellent customer experience and food quality.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  author: "Sarah Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Cost Optimization",
  featured: true
}, {
  id: 2,
  title: "The Complete Guide to Building Customer Loyalty in Food Delivery",
  excerpt: "Learn how to turn one-time customers into loyal advocates using data-driven marketing strategies and personalized experiences.",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  author: "Mike Rodriguez",
  date: "2024-01-12",
  readTime: "12 min read",
  category: "Marketing"
}, {
  id: 3,
  title: "2024 Food Tech Trends: What Restaurant Owners Need to Know",
  excerpt: "Stay ahead of the competition with insights into the latest technology trends shaping the food industry landscape.",
  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
  author: "David Kim",
  date: "2024-01-10",
  readTime: "6 min read",
  category: "Technology"
}, {
  id: 4,
  title: "Zero Commission vs Traditional Platforms: A Financial Breakdown",
  excerpt: "Real numbers and case studies comparing the costs and benefits of zero-commission platforms versus traditional aggregators.",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  author: "Emma Thompson",
  date: "2024-01-08",
  readTime: "10 min read",
  category: "Finance"
}, {
  id: 5,
  title: "Setting Up Your First Online Ordering System: A Step-by-Step Guide",
  excerpt: "Everything you need to know to launch your online ordering platform, from setup to going live with your first orders.",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
  author: "John Martinez",
  date: "2024-01-05",
  readTime: "15 min read",
  category: "Getting Started"
}, {
  id: 6,
  title: "Customer Data Analytics: Turn Insights into Revenue Growth",
  excerpt: "Master the art of using customer data to drive personalized marketing campaigns and increase order frequency.",
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  author: "Lisa Wang",
  date: "2024-01-03",
  readTime: "9 min read",
  category: "Analytics"
}];
const categories = ["All", "Cost Optimization", "Marketing", "Technology", "Finance", "Getting Started", "Analytics"];
const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const filteredPosts = selectedCategory === "All" ? blogPosts : blogPosts.filter(post => post.category === selectedCategory);
  return <div className="min-h-screen bg-brandae-dark text-white">
      <SEO title="Brandae Blog - Restaurant Technology & Business Growth Tips" description="Expert insights, guides, and strategies for restaurant owners to grow their business with zero-commission ordering platforms and customer data ownership." keywords="restaurant blog, food delivery tips, restaurant technology, customer retention, online ordering" />

      {/* Floating animated elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-32 right-16 w-3 h-3 bg-brandae-green/30 rounded-full" animate={{
        y: [0, -15, 0],
        opacity: [0.3, 0.7, 0.3]
      }} transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute top-1/2 left-8 w-4 h-4 bg-[#093d30]/40 rounded-full" animate={{
        x: [0, 20, 0],
        y: [0, -10, 0]
      }} transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }} />
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#093d30]/10 to-transparent"></div>
        
        <div className="container mx-auto relative z-10 px-0">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Restaurant <span className="gradient-text">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Expert insights, proven strategies, and actionable tips to help you grow your restaurant business with zero-commission ordering platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-12 lg:px-24 mb-12">
        <div className="container mx-auto px-0">
          <motion.div className="flex flex-wrap justify-center gap-4" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            {categories.map((category, index) => <motion.button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-3 rounded-full border transition-all duration-300 ${selectedCategory === category ? 'bg-brandae-green text-brandae-dark border-brandae-green' : 'border-brandae-green text-brandae-green hover:bg-brandae-green/10'}`} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: index * 0.1
          }}>
                {category}
              </motion.button>)}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All" && <section className="px-6 md:px-12 lg:px-24 mb-20">
          <div className="container mx-auto px-0">
            <motion.div className="bg-brandae-gray rounded-2xl overflow-hidden border border-brandae-green/20 shadow-lg" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} whileHover={{
          boxShadow: "0 20px 40px rgba(201, 242, 104, 0.1)"
        }}>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-64 md:h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-brandae-green/20 text-brandae-green rounded-full text-sm">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-[#093d30]/30 text-gray-300 rounded-full text-sm">
                      {blogPosts[0].category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{blogPosts[0].readTime}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${blogPosts[0].id}`}>
                      
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>}

      {/* Blog Grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="container mx-auto px-0">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            {filteredPosts.slice(selectedCategory === "All" ? 1 : 0).map((post, index) => <motion.article key={post.id} className="bg-brandae-gray rounded-xl overflow-hidden border border-brandae-green/20 group hover:border-brandae-green/40 transition-all duration-300" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} whileHover={{
            y: -8,
            boxShadow: "0 15px 30px rgba(201, 242, 104, 0.1)"
          }}>
                <div className="relative overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#093d30]/80 text-gray-200 rounded-full text-sm backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <Link to={`/blog/${post.id}`}>
                      <motion.button className="text-brandae-green hover:text-white transition-colors duration-200 flex items-center gap-2" whileHover={{
                    x: 5
                  }}>
                        Read More <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.article>)}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#093d30]/10 to-[#093c2f]/10"></div>
        <div className="container mx-auto relative z-10 px-0">
          <motion.div className="text-center max-w-2xl mx-auto" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with <span className="gradient-text">Industry Insights</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Get the latest restaurant technology trends, business growth tips, and platform updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-brandae-gray border border-brandae-green/30 rounded-lg focus:outline-none focus:border-brandae-green text-white" />
              <AnimatedButton variant="primary" size="md">
                Subscribe
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>;
};
export default Blog;