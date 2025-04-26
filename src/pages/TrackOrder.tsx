
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: string;
}

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!orderId) {
      toast({
        title: "Error",
        description: "Please enter an order ID",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find(order => order.id === orderId);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast({
          title: "Order not found",
          description: "We couldn't find an order with that ID",
          variant: "destructive",
        });
        setOrder(null);
      }
      
      setIsSearching(false);
    }, 800);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Package className="h-6 w-6 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'Your order has been received and is being processed.';
      case 'shipped':
        return 'Your order has been shipped and is on its way to you.';
      case 'delivered':
        return 'Your order has been delivered. Enjoy your products!';
      case 'cancelled':
        return 'Your order has been cancelled.';
      default:
        return 'Status information unavailable.';
    }
  };

  // Add a useEffect to listen for storage changes to update order status in real-time
  React.useEffect(() => {
    const handleStorageChange = () => {
      if (order) {
        const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrder = orders.find(o => o.id === order.id);
        if (updatedOrder && updatedOrder.status !== order.status) {
          setOrder(updatedOrder);
          toast({
            title: "Order Updated",
            description: `Order status changed to ${updatedOrder.status}`,
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // For local changes within the same window
    const intervalId = setInterval(() => {
      if (order) {
        const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrder = orders.find(o => o.id === order.id);
        if (updatedOrder && updatedOrder.status !== order.status) {
          setOrder(updatedOrder);
          toast({
            title: "Order Updated",
            description: `Order status changed to ${updatedOrder.status}`,
          });
        }
      }
    }, 5000); // Check every 5 seconds
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [order]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <motion.div 
        className="container mx-auto pt-32 pb-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>
          
          <div className="glass-panel p-8 rounded-lg mb-8">
            <p className="text-towel-gray mb-4">
              Enter your order ID to track your order status and delivery information.
            </p>
            
            <div className="flex gap-3">
              <Input
                placeholder="Enter your order ID (e.g., order-1234567890)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Track"}
              </Button>
            </div>
          </div>
          
          {order && (
            <motion.div 
              className="glass-panel p-8 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Order #{order.id.substring(6, 13)}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 mb-6">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-medium">Status: {order.status}</p>
                  <p className="text-towel-gray text-sm">{getStatusDescription(order.status)}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Order Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-towel-gray">Order Date:</span>
                    <span>{new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-towel-gray">Items:</span>
                    <span>{order.items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-towel-gray">Total Amount:</span>
                    <span className="font-semibold">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Link to={`/order-details/${order.id}`}>
                  <Button variant="outline">View Order Details</Button>
                </Link>
              </div>
            </motion.div>
          )}
          
          <div className="text-center mt-8 text-towel-gray">
            <p>If you need assistance with your order, please contact our customer support.</p>
            <p className="mt-2">Email: support@se.com | Phone: +1 (800) 123-4567</p>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default TrackOrder;
