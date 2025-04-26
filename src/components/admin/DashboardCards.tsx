
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  className?: string;
}

export const DashboardCard = ({ title, value, className }: DashboardCardProps) => {
  return (
    <div className={`glass-panel p-6 rounded-lg ${className}`}>
      <h3 className="text-sm text-towel-gray mb-1">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export const DashboardCards = ({ 
  totalRevenue, 
  newOrders, 
  shippedOrders, 
  deliveredOrders 
}: { 
  totalRevenue: number;
  newOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <DashboardCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
      <DashboardCard title="New Orders" value={newOrders} />
      <DashboardCard title="Shipped" value={shippedOrders} />
      <DashboardCard title="Delivered" value={deliveredOrders} />
    </div>
  );
};
