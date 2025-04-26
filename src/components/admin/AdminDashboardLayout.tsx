
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface AdminDashboardLayoutProps {
  userName?: string | null;
  userEmail?: string | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
  userName,
  userEmail,
  onLogout,
  children
}) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="container mx-auto py-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        </div>
        
        <div className="mb-6">
          <p className="text-towel-gray">Welcome, Admin {userName || userEmail}</p>
        </div>
        
        {children}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => navigate('/admin/orders')}
          >
            View All Orders
          </Button>
          
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => navigate('/towel-management')}
          >
            Manage Towel Collection
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          className="w-full mt-4"
          onClick={() => {
            onLogout();
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminDashboardLayout;
