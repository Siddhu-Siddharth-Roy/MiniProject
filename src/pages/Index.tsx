import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { Sparkles, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Admin Dashboard Button */}
      {isAdmin && (
        <div className="container mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-towel-blue text-white p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Admin Controls</h3>
                <p className="text-sm opacity-90">Manage your towel store</p>
              </div>
              <Button 
                onClick={() => navigate('/admin-dashboard')}
                className="bg-white text-towel-blue hover:bg-white/90"
              >
                Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      )}
      
      <Hero />
      
      {/* Features section */}
      <section className="py-16 px-4 bg-towel-beige/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="flex flex-col items-center text-center p-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="p-3 rounded-full bg-towel-accent/30 mb-4">
                <Sparkles className="text-towel-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-towel-gray">
                Crafted with the finest materials for ultimate comfort and durability.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="flex flex-col items-center text-center p-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="p-3 rounded-full bg-towel-accent/30 mb-4">
                <Truck className="text-towel-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-towel-gray">
                Enjoy free shipping on all orders over $50. Fast and reliable delivery.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="flex flex-col items-center text-center p-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="p-3 rounded-full bg-towel-accent/30 mb-4">
                <ShieldCheck className="text-towel-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-towel-gray">
                Love your towels or get your money back with our 100% satisfaction guarantee.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              className="flex flex-col items-center text-center p-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="p-3 rounded-full bg-towel-accent/30 mb-4">
                <RotateCcw className="text-towel-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-towel-gray">
                Hassle-free 30-day return policy. No questions asked returns and exchanges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <div id="products-section">
        <ProductGrid />
      </div>
      
      {/* Testimonials */}
      <section className="py-20 px-4 bg-towel-beige/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">What Our Customers Say</h2>
            <p className="text-towel-gray max-w-2xl mx-auto">
              Don't just take our word for it. See what our customers have to say about their experience with our towels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-md"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="flex items-center mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-towel-gray">
                "These towels are amazing! So soft and absorbent. They're the perfect addition to my bathroom and have elevated my daily routine."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-towel-accent/50 flex items-center justify-center font-semibold text-towel-dark mr-3">
                  SJ
                </div>
                <div>
                  <h4 className="font-medium">Samarth Jadhav</h4>
                  <p className="text-sm text-towel-gray">Verified Customer</p>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-md"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="flex items-center mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-towel-gray">
                "I've tried many premium towels, but these are on another level. The quality and durability are exceptional, and they stay soft wash after wash."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-towel-accent/50 flex items-center justify-center font-semibold text-towel-dark mr-3">
                  DB
                </div>
                <div>
                  <h4 className="font-medium">Dhiraj Battul</h4>
                  <p className="text-sm text-towel-gray">Verified Customer</p>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-md"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="flex items-center mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-towel-gray">
                "कस्टम डिज़ाइन सेवा शानदार है! मैंने अपने परिवार के लिए पर्सनलाइज़्ड टॉवल्स मंगवाए, और वे बहुत सुंदर निकले। शिपिंग भी बहुत तेज़ थी!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-towel-accent/50 flex items-center justify-center font-semibold text-towel-dark mr-3">
                    YB
                </div>
                <div>
                  <h4 className="font-medium">Yash Bajaj</h4>
                  <p className="text-sm text-towel-gray">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
