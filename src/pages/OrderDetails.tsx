
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserByEmail } from '@/services/userService';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { getOrderById } from '@/services/orderService';

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
  userEmail?: string;
}

interface CustomerDetails {
  name?: string;
  email?: string;
  phone?: string;
}

// Components
const CustomerInformation = ({ customer }: { customer: CustomerDetails | null }) => {
  if (!customer) return null;
  
  return (
    <div className="mb-8 bg-towel-blue/10 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <User className="h-5 w-5" />
        <h2 className="text-lg font-medium">Customer Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-towel-gray">Name</p>
          <p className="font-medium">{customer.name || "Not provided"}</p>
        </div>
        <div>
          <p className="text-towel-gray">Email</p>
          <p className="font-medium">{customer.email}</p>
        </div>
        <div className="flex flex-col">
          <div className="text-towel-gray flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" />
            <span>Phone</span>
          </div>
          <p className="font-medium">{customer.phone || "Not provided"}</p>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = ({ order }: { order: Order }) => (
  <div className="mb-8">
    <div className="flex flex-wrap justify-between gap-4 text-sm text-towel-gray">
      <div>
        <p>Order ID</p>
        <p className="font-medium text-foreground">{order.id}</p>
      </div>
      <div>
        <p>Date Placed</p>
        <p className="font-medium text-foreground">
          {new Date(order.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      <div>
        <p>Total Amount</p>
        <p className="font-medium text-foreground">₹{order.total.toFixed(2)}</p>
      </div>
    </div>
  </div>
);

const OrderItems = ({ items }: { items: OrderItem[] }) => (
  <div className="mb-8">
    <h2 className="text-xl font-medium mb-4">Order Items</h2>
    <div className="bg-white rounded-lg shadow divide-y">
      {items.map(item => (
        <div key={item.id} className="p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-towel-beige/20 rounded-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-towel-gray">Qty: {item.quantity}</p>
          </div>
          <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}
    </div>
  </div>
);

const PaymentSummary = ({ total }: { total: number }) => (
  <div className="bg-towel-beige/20 p-6 rounded-lg">
    <div className="flex justify-between mb-2">
      <span>Subtotal</span>
      <span>₹{total.toFixed(2)}</span>
    </div>
    <div className="flex justify-between mb-2">
      <span>Shipping</span>
      <span>Free</span>
    </div>
    <div className="flex justify-between font-semibold text-lg pt-3 border-t">
      <span>Total</span>
      <span>₹{total.toFixed(2)}</span>
    </div>
  </div>
);

// Main component
const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const isAdminView = window.location.pathname.includes('/admin/orders');

  useEffect(() => {
    const loadOrderDetails = () => {
      setLoading(true);
      try {
        if (!orderId) {
          toast({
            title: "Order ID missing",
            description: "No order ID was provided.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const foundOrder = getOrderById(orderId);
        
        if (foundOrder) {
          setOrder(foundOrder);
          
          // Get customer details if available
          if (foundOrder.userEmail) {
            const userData = getUserByEmail(foundOrder.userEmail);
            if (userData) {
              setCustomer({
                name: userData.name,
                email: userData.email,
                phone: userData.phone
              });
            }
          } else if (user && !isAdminView) {
            // Use the logged-in user's details if this isn't an admin view
            setCustomer({
              name: user.name,
              email: user.email,
              phone: user.phone
            });
          }
        } else {
          toast({
            title: "Order not found",
            description: "The requested order could not be found.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading order details:", error);
        toast({
          title: "Error loading order details",
          description: "There was a problem loading the order details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadOrderDetails();
    
    // Listen for storage events to update order details in real-time
    window.addEventListener('storage', loadOrderDetails);
    
    return () => {
      window.removeEventListener('storage', loadOrderDetails);
    };
  }, [orderId, user, isAdminView]);

  if (loading) {
    return (
      <div className="container mx-auto py-24 px-4 flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-24 px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">Order Not Found</h1>
        <p className="text-towel-gray mb-6">We couldn't find the order you're looking for.</p>
        <Link to="/">
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  const backLink = isAdminView ? "/admin/orders" : "/my-orders";

  return (
    <motion.div 
      className="container mx-auto py-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Order Details</h1>
          <div className="bg-towel-beige/30 px-4 py-2 rounded-full text-sm font-medium">
            {order.status}
          </div>
        </div>
        
        <CustomerInformation customer={customer} />
        <OrderSummary order={order} />
        <OrderItems items={order.items} />
        <PaymentSummary total={order.total} />
        
        <div className="mt-8 flex justify-center">
          <div className="flex flex-col items-center text-towel-gray">
            <Package className="mb-2 h-10 w-10 text-towel-blue" />
            <p className="font-medium text-lg text-foreground">Thank you for your order!</p>
            <p className="text-sm">You will receive an update when your order ships.</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to={backLink}>
            <Button variant="outline">Back to Orders</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
