
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartButtonProps {
  cartItemsCount: number;
  onClick: () => void;
}

const CartButton = ({ cartItemsCount, onClick }: CartButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={onClick}
      className="relative"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-towel-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemsCount}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
