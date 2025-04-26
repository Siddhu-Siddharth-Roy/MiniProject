
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <motion.div 
        className="container mx-auto pt-32 pb-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-towel-dark hover:text-towel-blue mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About DTex Brand</h1>
          
          <div className="relative rounded-xl overflow-hidden h-80 mb-12">
            <img 
              src="https://images.unsplash.com/photo-1602810320073-1230c46d89d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
              alt="DTex brand" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose max-w-none">
            <h2>Our Story</h2>
            <p>
              Founded in 2010, DTex has been at the forefront of premium towel manufacturing for over a decade. 
              What began as a small family business has grown into a renowned brand recognized for exceptional 
              quality, innovative designs, and sustainable manufacturing practices.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              At DTex, we believe that everyday items should bring joy and comfort to your life. Our mission is to 
              elevate your daily routine with towels that combine luxury, functionality, and sustainability. 
              We're committed to creating products that not only feel amazing but also minimize environmental impact.
            </p>
            
            <h2>Quality & Craftsmanship</h2>
            <p>
              Each DTex towel is crafted with meticulous attention to detail using only the finest materials. 
              We source premium long-staple cotton from sustainable farms and employ traditional weaving techniques 
              combined with modern technology to create towels with exceptional absorbency, durability, and softness.
            </p>
            
            <h2>Innovation</h2>
            <p>
              Our dedicated research and development team continuously explores new materials, weaving techniques, 
              and finishing processes to enhance our products. DTex's proprietary Ultra Absorbent Technology ensures 
              our towels dry faster while maintaining their softness wash after wash.
            </p>
            
            <h2>Sustainability Commitment</h2>
            <p>
              Environmental responsibility is at the heart of everything we do. From water conservation in our manufacturing 
              processes to organic cotton sourcing and eco-friendly packaging, we're constantly working to reduce our 
              ecological footprint. Our factory operates on 60% renewable energy, and we aim to reach 100% by 2025.
            </p>
            
            <h2>Community Impact</h2>
            <p>
              We believe in giving back to the communities where we operate. Through our Comfort for All initiative, 
              we donate towels to homeless shelters and disaster relief organizations. We also support educational 
              programs in textile communities to promote sustainable practices and preserve traditional craftsmanship.
            </p>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link to="/">
              <Button variant="default">
                Shop Our Collection
              </Button>
            </Link>
            <Button variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default About;
