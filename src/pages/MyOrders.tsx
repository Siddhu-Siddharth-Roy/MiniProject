
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ExternalLink, PackageCheck, FileText, Timer, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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

interface CustomRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  title: string;
  description: string;
  quantity: number;
  budget: number;
  phone: string;
  image: string | null;
  status: string;
  date: string;
  completionTime?: number;
  rejectionReason?: string;
}

const MyOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadOrderData = () => {
      if (isAuthenticated && user && user.email) {
        setLoading(true);
        console.log("Loading orders for user:", user.email);
        
        try {
          // Load all orders from localStorage
          const allOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
          
          // Filter orders for current user only by matching email
          const userOrders = allOrders.filter(order => 
            order.userEmail === user.email
          );
          
          console.log(`Found ${userOrders.length} orders for user ${user.email}`);
          setOrders(userOrders);
          
          // Handle custom requests similarly
          const allRequests: CustomRequest[] = JSON.parse(localStorage.getItem('customRequests') || '[]');
          const userRequests = allRequests.filter(request => 
            request.userEmail === user.email
          );
          
          console.log(`Found ${userRequests.length} custom requests for user ${user.email}`);
          setCustomRequests(userRequests);
        } catch (error) {
          console.error("Error loading orders:", error);
          toast({
            title: "Error loading orders",
            description: "There was a problem loading your orders. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setOrders([]);
        setCustomRequests([]);
        setLoading(false);
      }
    };
    
    loadOrderData();
    
    // Listen for storage events to update orders in real-time
    window.addEventListener('storage', loadOrderData);
    
    return () => {
      window.removeEventListener('storage', loadOrderData);
    };
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.div
      className="container mx-auto py-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-6 w-6" />
          <h1 className="text-3xl font-semibold">My Orders</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse">Loading your orders...</div>
          </div>
        ) : (
          <Tabs defaultValue="regular" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="regular" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Regular Orders
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Custom Designs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="regular">
              {orders.length > 0 ? (
                <div className="space-y-6">
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">All Orders</TabsTrigger>
                      <TabsTrigger value="processing">Processing</TabsTrigger>
                      <TabsTrigger value="shipped">Shipped</TabsTrigger>
                      <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all">
                      <OrderList orders={orders} />
                    </TabsContent>
                    
                    <TabsContent value="processing">
                      <OrderList orders={orders.filter(order => 
                        order.status.toLowerCase() === 'processing'
                      )} />
                    </TabsContent>
                    
                    <TabsContent value="shipped">
                      <OrderList orders={orders.filter(order => 
                        order.status.toLowerCase() === 'shipped'
                      )} />
                    </TabsContent>
                    
                    <TabsContent value="delivered">
                      <OrderList orders={orders.filter(order => 
                        order.status.toLowerCase() === 'delivered'
                      )} />
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg border-dashed">
                  <PackageCheck className="h-12 w-12 mx-auto text-towel-gray mb-4" />
                  <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                  <p className="text-towel-gray mb-6">You haven't placed any orders yet.</p>
                  <Button onClick={() => navigate('/')}>
                    Start Shopping
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="custom">
              {customRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customRequests.map((request) => (
                    <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{request.title}</CardTitle>
                            <CardDescription>
                              {new Date(request.date).toLocaleDateString()} • Quantity: {request.quantity}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={
                              request.status.toLowerCase() === 'pending' ? 'secondary' :
                              request.status.toLowerCase() === 'approved' ? 'success' :
                              'destructive'
                            }
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {request.description}
                          </p>
                          {request.image && (
                            <div className="h-24 w-full bg-gray-100 rounded overflow-hidden">
                              <img 
                                src={request.image} 
                                alt="Design reference" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          
                          {request.status === 'approved' && request.completionTime && (
                            <div className="flex items-center gap-2 text-green-700 mt-2">
                              <Timer className="h-4 w-4" />
                              <p className="text-sm">
                                Estimated completion: {request.completionTime} days
                              </p>
                            </div>
                          )}
                          
                          {request.status === 'rejected' && request.rejectionReason && (
                            <div className="flex items-start gap-2 text-red-700 bg-red-50 p-3 rounded mt-2">
                              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Reason for rejection:</p>
                                <p className="text-sm">{request.rejectionReason}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div>
                          <p className="text-sm text-towel-gray">Budget per item</p>
                          <p className="font-semibold">₹{request.budget.toFixed(2)}</p>
                        </div>
                        {request.status.toLowerCase() === 'approved' && (
                          <div className="text-right">
                            <p className="text-sm text-towel-gray">Estimated delivery</p>
                            <p className="text-sm font-medium">
                              {request.completionTime} days
                            </p>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg border-dashed">
                  <FileText className="h-12 w-12 mx-auto text-towel-gray mb-4" />
                  <h3 className="text-xl font-medium mb-2">No custom designs yet</h3>
                  <p className="text-towel-gray mb-6">You haven't submitted any custom design requests yet.</p>
                  <Button onClick={() => navigate('/custom-request')}>
                    Create Custom Request
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </motion.div>
  );
};

const OrderList = ({ orders }: { orders: Order[] }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg border-dashed">
        <p className="text-towel-gray">No orders found in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Order #{order.id.substring(0, 8)}</CardTitle>
                <CardDescription>
                  {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                </CardDescription>
              </div>
              <Badge
                variant={
                  order.status.toLowerCase() === 'processing' ? 'secondary' :
                  order.status.toLowerCase() === 'shipped' ? 'secondary' :
                  order.status.toLowerCase() === 'delivered' ? 'success' :
                  'destructive'
                }
              >
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image || '/placeholder.svg'} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-towel-gray">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              
              {order.items.length > 2 && (
                <p className="text-sm text-towel-gray">
                  +{order.items.length - 2} more item(s)
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div>
              <p className="text-sm text-towel-gray">Total</p>
              <p className="font-semibold">₹{order.total.toFixed(2)}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/order-details/${order.id}`} className="flex items-center gap-1">
                View Details <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyOrders;
