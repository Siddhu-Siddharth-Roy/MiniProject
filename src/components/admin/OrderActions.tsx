
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteOrder } from '@/services/orderService';
import { toast } from '@/components/ui/use-toast';

interface OrderActionsProps {
  orderId: string;
  onOrderDeleted?: () => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ orderId, onOrderDeleted }) => {
  const navigate = useNavigate();
  
  const handleDeleteOrder = () => {
    deleteOrder(orderId);
    
    // Show success toast
    toast({
      title: "Order deleted",
      description: `Order #${orderId.substring(0, 10)}... has been deleted successfully.`,
    });
    
    // Call the callback if provided
    if (onOrderDeleted) {
      onOrderDeleted();
    }
    
    // Dispatch a storage event to notify other components about the change
    window.dispatchEvent(new Event('storage'));
  };
  
  return (
    <div className="flex items-center justify-end gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate(`/order-details/${orderId}`)}
      >
        View Details
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteOrder}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderActions;
