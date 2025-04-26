
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-towel-beige/50 to-towel-light z-0" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_#1D3557_1px,_transparent_0)] bg-[size:40px_40px] z-0" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className={`max-w-2xl transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-towel-accent/20 text-towel-navy text-sm font-medium mb-6 animate-fade-in">
              Premium Collection
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
              Elevate Your <br />
              <span className="text-towel-blue">Bath Experience</span>
            </h1>
            <p className="text-lg text-towel-gray mb-8 max-w-lg">
              Discover our collection of premium towels crafted with the finest materials. 
              Experience luxury, comfort, and elegance in every touch.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="premium-button group"
                onClick={scrollToProducts}
              >
                Shop Collection
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <Link to="/about">
                <button className="border border-towel-dark text-towel-dark px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:bg-towel-dark hover:text-white">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="w-[550px] h-[550px] relative">
              {/* Main product image */}
              <div className="absolute inset-0 rounded-full bg-white shadow-2xl overflow-hidden animate-scale-in">
                <img 
                  src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Premium towel collection" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-towel-beige shadow-lg flex items-center justify-center p-6 animate-fade-in delay-500">
                <span className="text-center text-sm font-medium">100% Organic Cotton</span>
              </div>
              
              <div className="absolute -bottom-5 -left-5 w-40 h-40 rounded-full bg-towel-accent/30 shadow-lg flex items-center justify-center p-6 animate-fade-in delay-700">
                <span className="text-center text-sm font-medium">Ultra Absorbent Technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
