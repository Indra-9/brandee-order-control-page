
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, Zap, Shield, TrendingUp, Users, Globe, Bot, Lightbulb, 
  Target, Rocket, BarChart3, Lock, Sparkles, Database, Layers, 
  Workflow, Eye, MessageSquare, Settings, ArrowRight, Play,
  Code, Cpu, Network, Gauge, Search, Heart, Star, Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-badge', 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      ).fromTo('.hero-title', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      ).fromTo('.hero-subtitle', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      ).fromTo('.hero-cards', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.1 }
      );

      // Floating elements animation
      gsap.set(floatingElementsRef.current, { opacity: 0.6 });
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: 30 + index * 10,
            rotation: 360,
            duration: 8 + index * 2,
            repeat: -1,
            ease: 'none',
            delay: index * 0.5
          });
        }
      });

      // Section animations
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.fromTo(section.querySelector('.section-header'), 
            { y: 60, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          gsap.fromTo(section.querySelectorAll('.feature-item'), 
            { y: 40, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.6, 
              ease: 'power2.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                end: 'bottom 25%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

      // Stats counter animation
      if (statsRef.current) {
        gsap.fromTo('.stat-number', 
          { innerText: 0 },
          { 
            innerText: (i, target) => target.getAttribute('data-value'),
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reset'
            }
          }
        );
      }

      // Parallax effect for background elements
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-bg',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addFloatingRef = (el: HTMLDivElement | null) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-brandae-dark text-white overflow-hidden" ref={heroRef}>
      <SEO
        title="Features - Brandae: The Future of Marketing"
        description="Explore the cutting-edge features that make Brandae the ultimate marketing solution. AI-powered automation, enhanced security, and real-time analytics."
        keywords="marketing automation, AI, analytics, security, collaboration"
      />
      <Navbar />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div ref={addFloatingRef} className="absolute top-20 left-10 w-72 h-72 bg-brandae-green/5 rounded-full blur-3xl parallax-bg" />
        <div ref={addFloatingRef} className="absolute top-40 right-10 w-96 h-96 bg-brandae-purple/5 rounded-full blur-3xl parallax-bg" />
        <div ref={addFloatingRef} className="absolute bottom-20 left-1/4 w-64 h-64 bg-brandae-green/3 rounded-full blur-2xl parallax-bg" />
        <div ref={addFloatingRef} className="absolute top-1/2 right-1/4 w-48 h-48 bg-brandae-purple/4 rounded-full blur-xl parallax-bg" />
      </div>

      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-6 py-3 bg-brandae-green/10 border border-brandae-green/20 rounded-full text-brandae-green text-sm font-medium mb-8">
            <Sparkles className="w-5 h-5" />
            Next-Generation Marketing Platform
          </div>
          
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Features That{' '}
            <span className="gradient-text">Redefine</span>
            <br />Marketing
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed">
            Experience the future of marketing with our comprehensive suite of AI-powered tools, 
            enterprise-grade security, and seamless integrations that drive unprecedented growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Bot className="w-8 h-8" />, title: "AI-Powered", desc: "Intelligent automation" },
              { icon: <Shield className="w-8 h-8" />, title: "Secure", desc: "Enterprise-grade" },
              { icon: <BarChart3 className="w-8 h-8" />, title: "Analytics", desc: "Real-time insights" },
              { icon: <Zap className="w-8 h-8" />, title: "Fast", desc: "Lightning speed" },
            ].map((item, index) => (
              <div key={index} className="hero-cards group">
                <div className="p-6 bg-brandae-gray/30 backdrop-blur-sm rounded-2xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-brandae-green mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: AI-Powered Features */}
      <section ref={addToRefs} className="relative py-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="section-header text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandae-green/10 border border-brandae-green/20 rounded-full text-brandae-green text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              Artificial Intelligence
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              AI That <span className="gradient-text">Thinks</span> For You
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary AI technology that learns, adapts, and optimizes your marketing campaigns 
              automatically, delivering results beyond human capability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-12 h-12" />,
                title: "Smart Automation",
                desc: "AI-driven workflows that optimize themselves based on performance data",
                features: ["Auto-optimization", "Predictive scaling", "Smart scheduling"]
              },
              {
                icon: <Search className="w-12 h-12" />,
                title: "Intelligent Insights",
                desc: "Deep learning algorithms that uncover hidden patterns in your data",
                features: ["Pattern recognition", "Trend prediction", "Anomaly detection"]
              },
              {
                icon: <Target className="w-12 h-12" />,
                title: "Precision Targeting",
                desc: "Advanced ML models that identify and engage your ideal customers",
                features: ["Behavioral analysis", "Lookalike modeling", "Dynamic segmentation"]
              }
            ].map((feature, index) => (
              <div key={index} className="feature-item group">
                <div className="p-8 bg-brandae-gray/40 backdrop-blur-sm rounded-3xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="text-brandae-green mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.desc}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-brandae-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Security & Compliance */}
      <section ref={addToRefs} className="relative py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-brandae-dark to-brandae-gray/20">
        <div className="container mx-auto">
          <div className="section-header text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandae-green/10 border border-brandae-green/20 rounded-full text-brandae-green text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Security & Compliance
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Fort Knox</span> Level Security
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your data is protected by military-grade encryption and industry-leading security protocols. 
              Trust us with your most sensitive information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: <Lock className="w-8 h-8" />,
                  title: "End-to-End Encryption",
                  desc: "256-bit AES encryption ensures your data remains secure in transit and at rest"
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "SOC 2 Type II Certified",
                  desc: "Independently verified security controls and compliance standards"
                },
                {
                  icon: <Eye className="w-8 h-8" />,
                  title: "Zero-Knowledge Architecture",
                  desc: "We can't see your data, even if we wanted to - privacy by design"
                },
                {
                  icon: <Database className="w-8 h-8" />,
                  title: "Secure Data Centers",
                  desc: "Redundant infrastructure across multiple geographic locations"
                }
              ].map((item, index) => (
                <div key={index} className="feature-item flex items-start gap-4">
                  <div className="text-brandae-green mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="feature-item">
              <div className="relative p-8 bg-brandae-gray/30 backdrop-blur-sm rounded-3xl border border-brandae-green/20">
                <div className="text-center">
                  <div className="text-brandae-green mb-6">
                    <Shield className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">99.9% Uptime SLA</h3>
                  <p className="text-muted-foreground mb-6">
                    Guaranteed availability with automatic failover and redundancy
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-brandae-green/10 rounded-xl">
                      <div className="text-2xl font-bold text-brandae-green">24/7</div>
                      <div className="text-sm text-muted-foreground">Monitoring</div>
                    </div>
                    <div className="p-4 bg-brandae-green/10 rounded-xl">
                      <div className="text-2xl font-bold text-brandae-green">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Analytics & Insights */}
      <section ref={addToRefs} className="relative py-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="section-header text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandae-green/10 border border-brandae-green/20 rounded-full text-brandae-green text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Analytics & Insights
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Data-Driven <span className="gradient-text">Decisions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform raw data into actionable insights with our advanced analytics engine. 
              See what's working, what's not, and what's next.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="feature-item">
              <div className="p-8 bg-brandae-gray/30 backdrop-blur-sm rounded-3xl border border-brandae-green/20 h-full">
                <div className="text-brandae-green mb-6">
                  <TrendingUp className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Real-Time Dashboard</h3>
                <p className="text-muted-foreground mb-6">
                  Monitor your campaigns with live data updates and customizable visualizations
                </p>
                <div className="space-y-3">
                  {["Live performance metrics", "Custom KPI tracking", "Drag-and-drop widgets", "Mobile-responsive design"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-brandae-green" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="feature-item">
              <div className="p-8 bg-brandae-gray/30 backdrop-blur-sm rounded-3xl border border-brandae-green/20 h-full">
                <div className="text-brandae-green mb-6">
                  <Gauge className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Predictive Analytics</h3>
                <p className="text-muted-foreground mb-6">
                  AI-powered forecasting that helps you stay ahead of market trends
                </p>
                <div className="space-y-3">
                  {["Revenue forecasting", "Trend prediction", "Anomaly detection", "Performance modeling"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-brandae-green" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Team Collaboration */}
      <section ref={addToRefs} className="relative py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-brandae-gray/10 to-brandae-dark">
        <div className="container mx-auto">
          <div className="section-header text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandae-green/10 border border-brandae-green/20 rounded-full text-brandae-green text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Team Collaboration
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Seamless</span> Teamwork
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bring your team together with integrated collaboration tools designed for 
              modern marketing teams that work across time zones and platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-10 h-10" />,
                title: "Real-Time Chat",
                desc: "Instant messaging integrated with your campaigns"
              },
              {
                icon: <Workflow className="w-10 h-10" />,
                title: "Workflow Management",
                desc: "Assign tasks, track progress, and manage deadlines"
              },
              {
                icon: <Settings className="w-10 h-10" />,
                title: "Role-Based Access",
                desc: "Granular permissions and access controls"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-item group">
                <div className="p-8 bg-brandae-gray/40 backdrop-blur-sm rounded-3xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-500 hover:transform hover:scale-105 text-center">
                  <div className="text-brandae-green mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Integrations */}
      <section ref={addToRefs} className="relative py-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="section-header text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandae-green/10 border border-brandae-green/20 rounded-full text-brandae-green text-sm font-medium mb-6">
              <Layers className="w-4 h-4" />
              Integrations
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Connect <span className="gradient-text">Everything</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Integrate with your existing tools and platforms seamlessly. 
              Our extensive integration library connects your entire marketing stack.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="feature-item">
              <div className="p-8 bg-brandae-gray/30 backdrop-blur-sm rounded-3xl border border-brandae-green/20">
                <div className="text-brandae-green mb-6">
                  <Network className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">1000+ Integrations</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with popular tools including CRMs, email platforms, social media, 
                  analytics, and more through our robust API ecosystem.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Salesforce", "HubSpot", "Mailchimp", "Slack", "Zapier", "Google Analytics"].map((tool, idx) => (
                    <span key={idx} className="px-3 py-1 bg-brandae-green/10 text-brandae-green rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Code className="w-8 h-8" />,
                  title: "Developer-Friendly API",
                  desc: "RESTful API with comprehensive documentation and SDKs"
                },
                {
                  icon: <Workflow className="w-8 h-8" />,
                  title: "No-Code Automation",
                  desc: "Build complex workflows without writing a single line of code"
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Webhook Support",
                  desc: "Real-time data synchronization across all your tools"
                }
              ].map((item, index) => (
                <div key={index} className="feature-item flex items-start gap-4">
                  <div className="text-brandae-green mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Performance Stats */}
      <section ref={addToRefs} className="relative py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-brandae-green/5 to-brandae-purple/5">
        <div className="container mx-auto" ref={statsRef}>
          <div className="section-header text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of businesses that have transformed their marketing with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "500", suffix: "+", label: "Enterprise Clients", icon: <Users className="w-10 h-10" /> },
              { number: "99.9", suffix: "%", label: "Uptime Guarantee", icon: <Shield className="w-10 h-10" /> },
              { number: "250", suffix: "%", label: "Average ROI Increase", icon: <TrendingUp className="w-10 h-10" /> },
              { number: "10", suffix: "M+", label: "Campaigns Optimized", icon: <Rocket className="w-10 h-10" /> }
            ].map((stat, index) => (
              <div key={index} className="feature-item group">
                <div className="flex flex-col items-center p-8 bg-brandae-gray/50 backdrop-blur-sm rounded-3xl border border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="text-brandae-green mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-bold text-brandae-green mb-2">
                    <span className="stat-number" data-value={stat.number}>0</span>
                    {stat.suffix}
                  </div>
                  <div className="text-muted-foreground font-medium text-center">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: CTA */}
      <section ref={addToRefs} className="relative py-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <div className="section-header max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Marketing?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Join thousands of businesses that have revolutionized their marketing with Brandae. 
              Experience the future of marketing automation and unlock unprecedented growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/auth"
                className="feature-item group inline-flex items-center gap-3 bg-brandae-green text-brandae-dark px-10 py-5 rounded-full font-semibold text-lg hover:shadow-[0_0_40px_rgba(201,242,104,0.4)] transition-all duration-300 hover:scale-105"
              >
                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="/contact"
                className="feature-item group inline-flex items-center gap-3 border-2 border-brandae-green text-brandae-green px-10 py-5 rounded-full font-semibold text-lg hover:bg-brandae-green/10 transition-all duration-300 hover:scale-105"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
