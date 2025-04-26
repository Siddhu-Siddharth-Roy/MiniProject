
import React from 'react';
import { updateOrderStatus } from '@/services/orderService';

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
  onStatusUpdate?: (newStatus: string) => void;
}

const OrderStatusSelect: React.FC<OrderStatusSelectProps> = ({ 
  orderId, 
  currentStatus,
  onStatusUpdate
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    updateOrderStatus(orderId, newStatus);
    
    if (onStatusUpdate) {
      onStatusUpdate(newStatus);
    }
  };
  
  return (
    <select 
      value={currentStatus}
      onChange={handleStatusChange}
      className="px-2 py-1 rounded border border-input bg-transparent text-sm"
    >
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
};

export default OrderStatusSelect;
