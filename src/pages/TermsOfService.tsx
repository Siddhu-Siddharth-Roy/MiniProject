
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import Footer from '@/components/Footer';

const TermsOfService = () => {
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
            <FileText className="h-8 w-8 text-towel-blue" />
            <h1 className="text-3xl font-semibold">Terms of Service</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using the services provided by Se Towels ("we," "us," or "our"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">2. Use of Services</h2>
              <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You are prohibited from:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violating any applicable laws or regulations.</li>
                <li>Impersonating any person or entity.</li>
                <li>Interfering with the proper working of the services.</li>
                <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the services.</li>
              </ul>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">3. Account Registration</h2>
              <p>Some features of our services may require you to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
              <p>You are responsible for safeguarding your password and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">4. Products and Orders</h2>
              <p>All products are subject to availability. We reserve the right to discontinue any product at any time.</p>
              <p>Prices for products are subject to change without notice. We reserve the right to refuse or cancel any order for any reason at any time.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">5. Shipping and Delivery</h2>
              <p>Delivery times are estimates and not guaranteed. We are not responsible for delays beyond our control.</p>
              <p>Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">6. Returns and Refunds</h2>
              <p>Our return and refund policy is designed to ensure your satisfaction with our products. Please refer to our separate return policy for detailed information.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">7. Intellectual Property</h2>
              <p>All content included on the website, such as text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Se Towels or its content suppliers and protected by international copyright laws.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p>In no event shall Se Towels, its officers, directors, employees, or agents, be liable to you for any indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Errors, mistakes, or inaccuracies of content.</li>
                <li>Personal injury or property damage related to your use of the services.</li>
                <li>Unauthorized access to or use of our secure servers.</li>
                <li>Interruption or cessation of transmission to or from our services.</li>
              </ul>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">9. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">10. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. It is your responsibility to check these Terms periodically for changes.</p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">11. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p className="mt-2">Email: legal@se.com</p>
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

export default TermsOfService;
