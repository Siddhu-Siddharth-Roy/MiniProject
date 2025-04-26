import { ShoppingBag, X, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addOrder } from '@/services/orderService';
import { useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartModal = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  removeFromCart,
  updateQuantity 
}: CartModalProps) => {
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Track inputs to handle direct quantity changes
  const [quantityInputs, setQuantityInputs] = useState<Record<string, string>>({});
  
  const handleQuantityChange = (id: string, value: string) => {
    setQuantityInputs(prev => ({ ...prev, [id]: value }));
  }
  
  const handleQuantityBlur = (id: string) => {
    const value = quantityInputs[id];
    if (value) {
      const quantity = parseInt(value, 10);
      // Only update if it's a valid number
      if (!isNaN(quantity) && quantity > 0) {
        updateQuantity(id, quantity);
      }
    }
    
    // Reset the input to match the actual quantity in the cart
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      setQuantityInputs(prev => ({ ...prev, [id]: currentItem.quantity.toString() }));
    }
  }
  
  const handleQuantityKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleQuantityBlur(id);
    }
  }
  
  const incrementQuantity = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
      setQuantityInputs(prev => ({ ...prev, [id]: (item.quantity + 1).toString() }));
    }
  }
  
  const decrementQuantity = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
      setQuantityInputs(prev => ({ ...prev, [id]: (item.quantity - 1).toString() }));
    }
  }
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout",
        variant: "destructive"
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to place an order",
        variant: "destructive"
      });
      
      onClose();
      navigate('/login');
      return;
    }
    
    // Save order to localStorage
    const orderId = `order-${Date.now()}`;
    const order = {
      id: orderId,
      items: cartItems,
      total: subtotal,
      date: new Date().toISOString(),
      status: "Processing",
      userEmail: user.email
    };
    
    // Use the orderService to add the order
    addOrder(order);
    
    // Clear cart and show success message
    localStorage.setItem('cartItems', '[]');
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    
    onClose();
    navigate(`/order-details/${orderId}`);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Cart panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-xl z-50 flex flex-col overflow-hidden"
            style={{ maxHeight: '100vh' }}
          >
            {/* Header */}
            <div className="py-4 px-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Your Cart
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-towel-gray p-6">
                  <ShoppingBag className="h-12 w-12 mb-4 opacity-30" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="mt-2 text-sm text-center">Looks like you haven't added any items to your cart yet.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 premium-button"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex p-4 gap-4">
                      {/* Product image */}
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-towel-dark">{item.name}</h3>
                        
                        {/* Quantity selector */}
                        <div className="flex items-center mt-2 mb-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-l-md rounded-r-none border-r-0"
                            onClick={() => decrementQuantity(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={quantityInputs[item.id] === undefined ? item.quantity : quantityInputs[item.id]}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            onBlur={() => handleQuantityBlur(item.id)}
                            onKeyDown={(e) => handleQuantityKeyDown(e, item.id)}
                            className="h-8 w-12 text-center rounded-none border-x-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-r-md rounded-l-none border-l-0"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <p className="font-semibold mt-1">₹{item.price.toFixed(2)}</p>
                      </div>
                      
                      {/* Remove button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 self-start p-2 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer with summary */}
            {cartItems.length > 0 && (
              <div className="border-t p-6 bg-gray-50 space-y-4 sticky bottom-0 z-10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-4 space-y-3">
                  <button 
                    className="w-full bg-towel-dark text-white py-3 px-4 rounded font-medium hover:bg-opacity-90 transition"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full text-center text-towel-dark hover:text-towel-blue transition-colors py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
