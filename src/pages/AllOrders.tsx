
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search } from 'lucide-react';
import { getUserByEmail } from '@/services/userService';
import { getAllOrders } from '@/services/orderService';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';
import OrderActions from '@/components/admin/OrderActions';

interface Order {
  id: string;
  items: any[];
  total: number;
  date: string;
  status: string;
  userName?: string;
  userEmail?: string;
}

const AllOrders = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not an admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  // Load orders from localStorage and add user names
  const loadOrders = () => {
    const allOrders = getAllOrders();
    
    // Enhance orders with user names if available
    const enhancedOrders = allOrders.map((order: Order) => {
      if (order.userEmail) {
        const user = getUserByEmail(order.userEmail);
        if (user && user.name) {
          return {
            ...order,
            userName: user.name
          };
        }
      }
      return order;
    });
    
    setOrders(enhancedOrders);
    setFilteredOrders(
      searchTerm.trim() === '' 
        ? enhancedOrders 
        : enhancedOrders.filter(order => order.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => 
        order.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };

  // Handle order status update
  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
    
    setFilteredOrders(
      filteredOrders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  // Handle order deletion
  const handleOrderDeleted = () => {
    // Reload orders to ensure synchronization with localStorage
    loadOrders();
  };

  return (
    <motion.div 
      className="container mx-auto py-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">All Orders</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-towel-gray h-4 w-4" />
            <Input
              className="pl-10 w-[250px]"
              placeholder="Search by order ID..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {filteredOrders.length > 0 ? (
          <Table>
            <TableCaption>A list of all customer orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link to={`/order-details/${order.id}`} className="hover:underline text-towel-blue">
                      {order.id.substring(0, 10)}...
                    </Link>
                  </TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <OrderStatusSelect 
                      orderId={order.id} 
                      currentStatus={order.status}
                      onStatusUpdate={(newStatus) => handleStatusUpdate(order.id, newStatus)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <OrderActions 
                      orderId={order.id} 
                      onOrderDeleted={handleOrderDeleted}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-towel-gray">No orders found</p>
            {searchTerm && (
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setFilteredOrders(orders);
                }}
              >
                Clear search
              </Button>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin-dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AllOrders;
