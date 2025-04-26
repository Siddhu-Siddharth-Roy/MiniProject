
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DashboardCards } from '@/components/admin/DashboardCards';
import SalesAnalysisChart from '@/components/admin/SalesAnalysisChart';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import CustomRequestsPanel from '@/components/admin/CustomRequestsPanel';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { getAllOrders, syncSalesDataWithOrders } from '@/services/orderService';

interface Order {
  id: string;
  items: any[];
  total: number;
  date: string;
  status: string;
}

interface CustomRequest {
  id: string;
  title: string;
  status: string;
  date: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    // First sync sales data with current orders to ensure accuracy
    syncSalesDataWithOrders();
    
    const loadData = () => {
      // Get orders
      const currentOrders = getAllOrders();
      setOrders(currentOrders);
      
      // Get custom requests
      const savedRequests = localStorage.getItem('customRequests');
      if (savedRequests) {
        setCustomRequests(JSON.parse(savedRequests));
      }
      
      // Get sales data
      const savedSalesData = localStorage.getItem('salesData');
      if (savedSalesData) {
        const parsedData = JSON.parse(savedSalesData);
        const chartData = Object.entries(parsedData).map(([name, value]) => ({
          name,
          value
        }));
        setSalesData(chartData);
      } else {
        // If no sales data, set empty array
        setSalesData([]);
      }
    };
    
    loadData();
    
    // Add event listener to detect changes in localStorage from other components
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'orders' || e.key === 'salesData') {
        loadData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also set up a regular refresh interval to catch any changes
    const intervalId = setInterval(loadData, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const newOrders = orders.filter(order => order.status === 'Processing').length;
  const shippedOrders = orders.filter(order => order.status === 'Shipped').length;
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  const pendingRequests = customRequests.filter(req => req.status === 'pending').length;

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminDashboardLayout
      userName={user?.name}
      userEmail={user?.email}
      onLogout={logout}
    >
      <DashboardCards
        totalRevenue={totalRevenue}
        newOrders={newOrders}
        shippedOrders={shippedOrders}
        deliveredOrders={deliveredOrders}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SalesAnalysisChart salesData={salesData} />
        <RecentOrdersTable orders={orders} />
      </div>
      
      <CustomRequestsPanel 
        customRequests={customRequests} 
        pendingRequests={pendingRequests} 
      />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
