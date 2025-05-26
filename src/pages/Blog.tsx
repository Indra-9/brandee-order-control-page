import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import AnimatedButton from '@/components/AnimatedButton';
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  author: string;
  category: string;
  tags: string[];
  read_time: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}
const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchBlogPosts();
  }, []);
  const fetchBlogPosts = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blog_posts').select('*').eq('published', true).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setBlogPosts(data || []);

      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data?.map(post => post.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const filteredPosts = selectedCategory === "All" ? blogPosts : blogPosts.filter(post => post.category === selectedCategory);
  const featuredPost = blogPosts.find(post => post.featured);
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
        
        <div className="container mx-auto relative z-10">
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
      {categories.length > 1 && <section className="md:px-12 lg:px-24 mb-12 px-0">
          <div className="container py-0 mx-0 my-0">
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="flex flex-wrap justify-center gap-4 px-0">
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
        </section>}

      {/* Loading State */}
      {isLoading && <section className="px-6 md:px-12 lg:px-24 py-20">
          <div className="container mx-auto text-center">
            <div className="text-gray-400">Loading blog posts...</div>
          </div>
        </section>}

      {/* No Posts State */}
      {!isLoading && blogPosts.length === 0 && <section className="px-6 md:px-12 lg:px-24 py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">No blog posts yet</h2>
            <p className="text-gray-400">Check back soon for expert insights and industry tips!</p>
          </div>
        </section>}

      {/* Featured Post */}
      {selectedCategory === "All" && featuredPost && <section className="px-6 md:px-12 lg:px-24 mb-20">
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
                  <img src={featuredPost.image_url} alt={featuredPost.title} className="w-full h-64 md:h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-brandae-green/20 text-brandae-green rounded-full text-sm">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-[#093d30]/30 text-gray-300 rounded-full text-sm">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(featuredPost.created_at).toLocaleDateString()}</span>
                      </div>
                      {featuredPost.read_time && <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{featuredPost.read_time}</span>
                        </div>}
                    </div>
                    <Link to={`/blog/${featuredPost.slug}`}>
                      <motion.button className="text-brandae-green hover:text-white transition-colors duration-200 flex items-center gap-2" whileHover={{
                    x: 5
                  }}>
                        Read More <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>}

      {/* Blog Grid */}
      {!isLoading && filteredPosts.length > 0 && <section className="px-6 md:px-12 lg:px-24 pb-20">
          <div className="container mx-auto px-0">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
              {filteredPosts.filter(post => selectedCategory === "All" ? !post.featured : true).map((post, index) => <motion.article key={post.id} className="bg-brandae-gray rounded-xl overflow-hidden border border-brandae-green/20 group hover:border-brandae-green/40 transition-all duration-300" initial={{
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
                    <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
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
                      {post.read_time && <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{post.read_time}</span>
                        </div>}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <Link to={`/blog/${post.slug}`}>
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
        </section>}

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