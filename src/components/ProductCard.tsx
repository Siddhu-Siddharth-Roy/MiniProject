import { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const ProductCard = ({ id, name, price, image, category, isNew, isBestseller }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      toast.info("Login required", {
        description: "Please login to add items to your cart.",
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    
    // Use the global addToCart function from Navbar
    if (window.addToCart) {
      window.addToCart({ id, name, price, image });
      
      // Show toast notification
      toast.success("Added to cart", {
        description: `${name} has been added to your cart.`,
        duration: 3000,
      });
    }
  };

  const handleActionClick = (action: string) => {
    if (!isAuthenticated) {
      toast.info("Login required", {
        description: `Please login to ${action} this product.`,
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    
    // Handle other actions here when authenticated
    if (action === 'view') {
      // View product details logic
    } else if (action === 'wishlist') {
      toast.success("Added to wishlist", {
        description: `${name} has been added to your wishlist.`,
        duration: 3000,
      });
    }
  };
  
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-72">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 rounded-full bg-towel-blue text-white text-xs font-medium">
              New
            </span>
          )}
          {isBestseller && (
            <span className="px-3 py-1 rounded-full bg-towel-dark text-white text-xs font-medium">
              Bestseller
            </span>
          )}
        </div>
        
        <div 
          className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-all duration-300"
          style={{ 
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(20px)'
          }}
        >
          <button 
            className="p-2 rounded-full glass-panel hover:bg-white/90 transition-colors text-towel-dark"
            onClick={() => handleActionClick('wishlist')}
          >
            <Heart size={18} />
          </button>
          <button 
            className="p-2 rounded-full glass-panel hover:bg-white/90 transition-colors text-towel-dark"
            onClick={() => handleActionClick('view')}
          >
            <Eye size={18} />
          </button>
          <button 
            className="p-2 rounded-full glass-panel hover:bg-white/90 transition-colors text-towel-dark"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <span className="text-xs text-towel-gray font-medium uppercase">{category}</span>
        <h3 className="font-medium text-lg mt-1 mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-towel-dark">₹{price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            {Array(5).fill(0).map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-towel-gray ml-1">(4.8)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
