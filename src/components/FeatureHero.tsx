
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface FeatureHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function FeatureHero({ title, subtitle, description }: FeatureHeroProps) {
  const moveAnimation = useAnimation();

  // Animation for moving elements
  useEffect(() => {
    const animateMovement = async () => {
      await moveAnimation.start({
        y: [0, -10, 0],
        transition: { 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut" 
        }
      });
    };
    
    animateMovement();
  }, [moveAnimation]);

  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeIn} 
      className="container mx-auto pt-32 pb-16 px-4 relative"
    >
      {/* Moving Element 1 - Top Left */}
      <motion.div 
        animate={moveAnimation}
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-[#093d30]/30 to-brandae-green/30 blur-xl"
      />
      
      {/* Moving Element 2 - Top Right */}
      <motion.div 
        animate={{
          y: [0, -15, 0],
          transition: { 
            repeat: Infinity, 
            duration: 4, 
            ease: "easeInOut",
            delay: 0.5
          }
        }}
        className="absolute top-24 right-10 w-16 h-16 rounded-full bg-brandae-green/20 blur-lg"
      />
      
      {/* Background Light Shadows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-brandae-green/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-br from-[#093d30]/10 to-transparent rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          {title} <span className="text-brandae-green">{subtitle}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
          {description}
        </p>
      </div>
      
      {/* Moving Element 3 - Bottom Center */}
      <motion.div 
        animate={{
          x: [0, 10, 0, -10, 0],
          transition: { 
            repeat: Infinity, 
            duration: 6, 
            ease: "easeInOut" 
          }
        }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 rounded-full bg-[#093d30]/40 blur-md"
      />
    </motion.div>
  );
}
