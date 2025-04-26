
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <motion.div 
        className="container mx-auto py-32 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-panel p-8 rounded-lg max-w-4xl mx-auto">
          <div className="flex items-center mb-8 gap-3">
            <Shield className="h-8 w-8 text-towel-blue" />
            <h1 className="text-3xl font-semibold">Privacy Policy</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p>Welcome to Se Towels. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
              <p>We may collect the following types of information from you:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Identity Data: includes first name, last name, username or similar identifier.</li>
                <li>Contact Data: includes billing address, delivery address, email address and telephone numbers.</li>
                <li>Transaction Data: includes details about payments to and from you and other details of products you have purchased from us.</li>
                <li>Technical Data: includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              </ul>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>To register you as a new customer.</li>
                <li>To process and deliver your order.</li>
                <li>To manage your relationship with us.</li>
                <li>To improve our website, products/services, marketing, and customer relationships.</li>
              </ul>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">5. Data Retention</h2>
              <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">6. Your Legal Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
              <p className="mt-2">Email: privacy@se.com</p>
              <p>Phone: +91 (555) 123-4567</p>
              <p>Address: MIDC, Solpaur, Maharashtra, India.</p>
            </section>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button asChild className="mr-4">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
