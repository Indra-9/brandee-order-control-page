
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "food ordering app, restaurant app, zero commission, delivery management, restaurant tech, online ordering system, food delivery app",
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  ogUrl = "https://brandae.com",
  twitterImage = "https://lovable.dev/opengraph-image-p98pqg.png"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Helper function to create or update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        (element as HTMLMetaElement).name = name;
        document.head.appendChild(element);
      }
      (element as HTMLMetaElement).content = content;
    };
    
    // Helper function for Open Graph meta tags
    const updateOgMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        (element as HTMLMetaElement).setAttribute('property', property);
        document.head.appendChild(element);
      }
      (element as HTMLMetaElement).content = content;
    };
    
    // Set meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Set Open Graph meta tags
    updateOgMetaTag('og:title', title);
    updateOgMetaTag('og:description', description);
    updateOgMetaTag('og:type', 'website');
    updateOgMetaTag('og:url', ogUrl);
    updateOgMetaTag('og:image', ogImage);
    
    // Set Twitter meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', twitterImage);
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      (canonicalLink as HTMLLinkElement).rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    (canonicalLink as HTMLLinkElement).href = ogUrl;
    
    // Cleanup function to prevent memory leaks
    return () => {
      // No need to remove meta tags when component unmounts,
      // as they'll be updated when another SEO component mounts
    };
  }, [title, description, keywords, ogImage, ogUrl, twitterImage]);
  
  return null; // This component doesn't render anything visibly
};

export default SEO;
