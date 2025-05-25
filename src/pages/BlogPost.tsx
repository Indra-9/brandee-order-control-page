
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2, BookmarkPlus, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import AnimatedButton from '@/components/AnimatedButton';
import Footer from '@/components/Footer';

// Mock blog post data - in a real app, this would come from an API
const blogPost = {
  id: 1,
  title: "How to Reduce Food Delivery Costs by 30% Without Compromising Quality",
  content: `
    <p>The food delivery industry has revolutionized how restaurants operate, but the associated costs can be overwhelming. Many restaurant owners find themselves caught between providing convenient delivery options and maintaining profitable margins.</p>
    
    <p>In this comprehensive guide, we'll explore proven strategies that successful restaurants use to significantly reduce their delivery costs while maintaining exceptional food quality and customer satisfaction.</p>
    
    <h2>Understanding Your Current Delivery Costs</h2>
    
    <p>Before optimizing your delivery operations, it's crucial to understand where your money is going. Most restaurants face these primary cost drivers:</p>
    
    <ul>
      <li><strong>Commission Fees:</strong> Traditional aggregators typically charge 20-30% commission per order</li>
      <li><strong>Delivery Personnel:</strong> Whether in-house or third-party, delivery costs add up quickly</li>
      <li><strong>Packaging Materials:</strong> Quality packaging is essential but can be expensive</li>
      <li><strong>Technology Costs:</strong> Platform fees, payment processing, and app maintenance</li>
    </ul>
    
    <h2>Strategy 1: Implement Zero-Commission Ordering</h2>
    
    <p>The most impactful change you can make is switching to a zero-commission ordering platform. This single decision can save you 20-30% on every order, translating to thousands of dollars monthly for most restaurants.</p>
    
    <blockquote>
      "After switching to Brandae's zero-commission platform, we saved over $3,000 monthly in commission fees alone. That money now goes directly into improving our ingredients and expanding our menu." - Maria Rodriguez, Spice Garden Restaurant
    </blockquote>
    
    <h2>Strategy 2: Optimize Your Delivery Zones</h2>
    
    <p>Smart zone management can dramatically reduce delivery costs while improving service quality:</p>
    
    <ul>
      <li>Analyze order density in different areas</li>
      <li>Set minimum order values for distant zones</li>
      <li>Create time-based delivery pricing</li>
      <li>Partner with local businesses for pickup points</li>
    </ul>
    
    <h2>Strategy 3: Implement Smart Packaging Solutions</h2>
    
    <p>Packaging represents a significant cost that many restaurants overlook. Here's how to optimize:</p>
    
    <p><strong>Bulk Purchasing:</strong> Order packaging materials in bulk to reduce per-unit costs by 15-25%.</p>
    
    <p><strong>Eco-Friendly Alternatives:</strong> Sustainable packaging often costs less and appeals to environmentally conscious customers.</p>
    
    <p><strong>Right-Sizing:</strong> Use appropriately sized containers to reduce waste and shipping costs.</p>
    
    <h2>Strategy 4: Leverage Customer Data for Efficiency</h2>
    
    <p>When you own your customer data (unlike with traditional aggregators), you can:</p>
    
    <ul>
      <li>Predict order patterns and optimize staffing</li>
      <li>Create loyalty programs that encourage larger orders</li>
      <li>Send targeted promotions to reduce slow periods</li>
      <li>Implement subscription-based ordering for regular customers</li>
    </ul>
    
    <h2>Strategy 5: Build a Hybrid Delivery Model</h2>
    
    <p>Don't put all your eggs in one basket. The most successful restaurants use a combination of:</p>
    
    <ul>
      <li><strong>In-house delivery</strong> for nearby, high-frequency customers</li>
      <li><strong>Third-party services</strong> for occasional long-distance orders</li>
      <li><strong>Customer pickup incentives</strong> with discounts for self-collection</li>
      <li><strong>Scheduled delivery slots</strong> to optimize route efficiency</li>
    </ul>
    
    <h2>Measuring Your Success</h2>
    
    <p>Track these key metrics to ensure your cost reduction strategies are working:</p>
    
    <ul>
      <li>Cost per delivery as a percentage of order value</li>
      <li>Average order value trends</li>
      <li>Customer retention rates</li>
      <li>Monthly commission savings</li>
      <li>Overall profit margins</li>
    </ul>
    
    <h2>Getting Started Today</h2>
    
    <p>You don't need to implement all these strategies at once. Start with the highest-impact changes:</p>
    
    <ol>
      <li>Evaluate your current commission costs</li>
      <li>Research zero-commission platforms</li>
      <li>Analyze your delivery zone profitability</li>
      <li>Negotiate better rates with packaging suppliers</li>
    </ol>
    
    <p>Remember, reducing delivery costs isn't about cutting corners—it's about optimizing your operations to work smarter, not harder. The money you save can be reinvested into better ingredients, staff training, and customer experience improvements that drive long-term growth.</p>
  `,
  excerpt: "Discover proven strategies that successful restaurants use to cut delivery costs while maintaining excellent customer experience and food quality.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
  author: "Sarah Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Cost Optimization",
  tags: ["cost reduction", "delivery optimization", "restaurant management", "profit margins"]
};

const relatedPosts = [
  {
    id: 2,
    title: "The Complete Guide to Building Customer Loyalty in Food Delivery",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    category: "Marketing"
  },
  {
    id: 3,
    title: "2024 Food Tech Trends: What Restaurant Owners Need to Know",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80",
    category: "Technology"
  },
  {
    id: 4,
    title: "Zero Commission vs Traditional Platforms: A Financial Breakdown",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    category: "Finance"
  }
];

const BlogPost = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title={`${blogPost.title} | Brandae Blog`}
        description={blogPost.excerpt}
        keywords={`restaurant tips, ${blogPost.tags.join(', ')}, food delivery, brandae`}
      />

      {/* Floating animated elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-40 right-20 w-2 h-2 bg-brandae-green/40 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 left-12 w-3 h-3 bg-[#093d30]/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <Navbar />
      
      {/* Breadcrumb */}
      <section className="pt-32 pb-8 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.nav 
            className="flex items-center gap-2 text-sm text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="hover:text-brandae-green transition-colors">Home</Link>
            <ChevronRight size={16} />
            <Link to="/blog" className="hover:text-brandae-green transition-colors">Blog</Link>
            <ChevronRight size={16} />
            <span className="text-white">{blogPost.category}</span>
          </motion.nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="pb-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="px-4 py-2 bg-brandae-green/20 text-brandae-green rounded-full text-sm">
                {blogPost.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{blogPost.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 bg-brandae-gray border border-brandae-green/30 rounded-lg hover:border-brandae-green transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={18} />
                <span>Share</span>
              </motion.button>
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 bg-brandae-gray border border-brandae-green/30 rounded-lg hover:border-brandae-green transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookmarkPlus size={18} />
                <span>Save</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mb-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-brandae-green/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={blogPost.image} 
              alt={blogPost.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="prose prose-lg prose-invert max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div 
              className="article-content text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </motion.div>
        </div>
      </section>

      {/* Tags */}
      <section className="pb-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-gray-400">Tags:</span>
            {blogPost.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="px-3 py-1 bg-[#093d30]/30 text-brandae-green rounded-full text-sm cursor-pointer hover:bg-[#093d30]/50 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                #{tag.replace(/\s+/g, '')}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-brandae-darker">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Related <span className="gradient-text">Articles</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-brandae-gray rounded-xl overflow-hidden border border-brandae-green/20 group hover:border-brandae-green/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 15px 30px rgba(201, 242, 104, 0.1)" 
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#093d30]/80 text-gray-200 rounded-full text-sm backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <Link to={`/blog/${post.id}`}>
                    <motion.button 
                      className="text-brandae-green hover:text-white transition-colors duration-200 flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      Read Article <ChevronRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <Link to="/blog">
            <AnimatedButton variant="outline" size="lg">
              <ArrowLeft size={20} className="mr-2" />
              Back to All Articles
            </AnimatedButton>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPost;
