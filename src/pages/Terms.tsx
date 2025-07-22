
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Terms() {
  return (
    <div className="min-h-screen bg-brandae-dark">
      <SEO 
        title="Terms and Conditions | Brandae"
        description="Read Brandae's terms and conditions for using our zero-commission booking platform and marketplace solutions."
        keywords="terms and conditions, legal, service agreement, brandae platform"
      />
      
      {/* Header */}
      <div className="bg-brandae-gray border-b border-brandae-green/20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-brandae-green hover:text-brandae-green/80 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-brandae-green" />
              <h1 className="text-4xl font-bold text-white">Terms and Conditions</h1>
            </div>
            <p className="text-gray-300 text-lg">Last updated: December 2024</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-brandae-gray/50 border border-brandae-green/20 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-brandae-green" />
                <h2 className="text-xl font-semibold text-white m-0">Important Notice</h2>
              </div>
              <p className="text-gray-300 m-0">
                By accessing and using Brandae's platform, you agree to be bound by these Terms and Conditions. 
                Please read them carefully before using our services.
              </p>
            </div>
          </section>

          {/* Agreement to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-brandae-green" />
              1. Agreement to Terms
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                These Terms and Conditions ("Terms") govern your use of Brandae's zero-commission booking platform 
                and marketplace solutions ("Service") operated by Brandae ("us", "we", or "our").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any 
                part of these terms, then you may not access the Service.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">2. Service Description</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Brandae provides a comprehensive booking and marketplace platform that includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Zero-commission booking system for restaurants and service providers</li>
                <li>Multi-vendor marketplace solutions</li>
                <li>Integrated payment processing</li>
                <li>Customer management tools</li>
                <li>Analytics and reporting features</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">3. User Responsibilities</h2>
            <div className="text-gray-300 space-y-4">
              <p>When using our platform, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in compliance with applicable laws</li>
                <li>Not engage in fraudulent or malicious activities</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">4. Payment Terms</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Our zero-commission model means we don't charge transaction fees on bookings. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Subscription fees for platform access may apply</li>
                <li>Payment processing fees may be charged by third-party processors</li>
                <li>Custom development work is subject to separate agreements</li>
                <li>All fees are non-refundable unless otherwise specified</li>
              </ul>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">5. Privacy and Data Protection</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed by our 
                <Link to="/privacy" className="text-brandae-green hover:underline ml-1">Privacy Policy</Link>, 
                which is incorporated into these Terms by reference.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">6. Limitation of Liability</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                To the maximum extent permitted by law, Brandae shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including without limitation, loss of profits, data, 
                use, goodwill, or other intangible losses.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">7. Termination</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice 
                or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">8. Changes to Terms</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">9. Contact Information</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-brandae-gray/50 border border-brandae-green/20 rounded-lg p-4">
                <p className="m-0">Email: legal@brandae.com</p>
                <p className="m-0">Phone: +1 (555) 123-4567</p>
                <p className="m-0">Address: 123 Business Ave, Suite 100, City, State 12345</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
