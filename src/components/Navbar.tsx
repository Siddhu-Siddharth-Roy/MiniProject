
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import CartModal from './CartModal';
import NavLinks from './navbar/NavLinks';
import UserMenu from './navbar/UserMenu';
import CartButton from './navbar/CartButton';
import MobileMenu from './navbar/MobileMenu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  loadCartFromStorage, 
  removeItemFromCart, 
  addItemToCart, 
  updateItemQuantity,
  CartItem 
} from './navbar/cartUtils';

// Define CartItem type for global access
declare global {
  interface Window {
    addToCart: (item: {
      id: string;
      name: string;
      price: number;
      quantity?: number;
      image: string;
    }) => void;
  }
}

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Load cart items from localStorage on component mount
  useEffect(() => {
    setCartItems(loadCartFromStorage());
    
    // Create global addToCart function
    window.addToCart = (item) => {
      setCartItems(prevItems => addItemToCart(item, prevItems));
    };
    
    // Clean up on unmount
    return () => {
      delete window.addToCart;
    };
  }, []);

  // Create a new useEffect to listen for storage events
  useEffect(() => {
    const handleStorageChange = () => {
      setCartItems(loadCartFromStorage());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => removeItemFromCart(id, prevItems));
  };

  // Update quantity of an item in the cart
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => updateItemQuantity(id, quantity, prevItems));
  };

  // Calculate total items in cart
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-towel-blue mr-8">SE</Link>
          <NavLinks isAdmin={isAdmin} />
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Profile Icon for customer */}
              {!isAdmin && (
                <Link to="/profile" className="hidden md:flex items-center">
                  <Avatar className="h-9 w-9 hover:ring-2 hover:ring-towel-blue transition-all">
                    <AvatarFallback className="bg-towel-blue text-white">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
              
              <UserMenu user={user} onLogout={logout} />
              
              {!isAdmin && (
                <CartButton 
                  cartItemsCount={cartItemsCount} 
                  onClick={() => setIsCartOpen(true)} 
                />
              )}
              
              <MobileMenu 
                user={user} 
                isAdmin={isAdmin} 
                onLogout={logout} 
                cartItemsCount={cartItemsCount}
                onCartOpen={() => setIsCartOpen(true)}
              />
            </>
          ) : (
            <UserMenu user={null} onLogout={logout} />
          )}
        </div>
      </nav>
      
      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </header>
  );
};

export default Navbar;
