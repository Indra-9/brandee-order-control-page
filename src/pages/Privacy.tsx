
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-brandae-dark">
      <SEO 
        title="Privacy Policy | Brandae"
        description="Learn how Brandae protects your privacy and handles your personal data on our zero-commission booking platform."
        keywords="privacy policy, data protection, personal information, brandae privacy"
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
              <Shield className="w-8 h-8 text-brandae-green" />
              <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
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
                <UserCheck className="w-6 h-6 text-brandae-green" />
                <h2 className="text-xl font-semibold text-white m-0">Your Privacy Matters</h2>
              </div>
              <p className="text-gray-300 m-0">
                At Brandae, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-brandae-green" />
              1. Information We Collect
            </h2>
            <div className="text-gray-300 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
                <p>When you use our platform, we may collect:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Business information and account details</li>
                  <li>Payment and billing information</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Usage Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Device information and IP address</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Booking and transaction history</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-brandae-green" />
              2. How We Use Your Information
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our booking platform services</li>
                <li>Process transactions and manage your account</li>
                <li>Send important updates and notifications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">3. Information Sharing and Disclosure</h2>
            <div className="text-gray-300 space-y-4">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To service providers who assist in our operations</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-brandae-green" />
              4. Data Security
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>We implement industry-standard security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and authentication requirements</li>
                <li>Secure payment processing through trusted providers</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">5. Your Privacy Rights</h2>
            <div className="text-gray-300 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">6. Cookies and Tracking Technologies</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We use cookies and similar technologies to enhance your experience on our platform. 
                These help us remember your preferences, analyze site usage, and provide personalized content.
              </p>
              <p>
                You can control cookie settings through your browser preferences, though disabling certain 
                cookies may limit platform functionality.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">7. Data Retention</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We retain your personal information only as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p>
                When you delete your account, we will remove your personal information within 30 days, 
                except where we're required to retain it for legal or regulatory purposes.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">8. Children's Privacy</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Our platform is not intended for use by children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If we become aware that we have collected 
                such information, we will take steps to delete it promptly.
              </p>
            </div>
          </section>

          {/* International Users */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">9. International Data Transfers</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance with 
                applicable privacy laws.
              </p>
            </div>
          </section>

          {/* Updates to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">10. Updates to This Policy</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on this page and updating the "last updated" date.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">11. Contact Us</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-brandae-gray/50 border border-brandae-green/20 rounded-lg p-4">
                <p className="m-0">Email: privacy@brandae.com</p>
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
