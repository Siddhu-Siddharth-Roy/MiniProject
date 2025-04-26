
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { NavLink } from './NavLinks';

interface MobileMenuProps {
  user: any;
  isAdmin: boolean;
  onLogout: () => void;
  cartItemsCount: number;
  onCartOpen: () => void;
}

const MobileMenu = ({ user, isAdmin, onLogout, cartItemsCount, onCartOpen }: MobileMenuProps) => {
  if (!user) return null;
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-sm">
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Navigate through the app
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <NavLink to="/" text="Home" />
          {!isAdmin && (
            <NavLink to="/custom-request" text="Custom Design" />
          )}
          <Button variant="outline" size="sm" onClick={onLogout} className="w-full mt-4">
            Logout
          </Button>
          
          {!isAdmin && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCartOpen}
              className="w-full mt-2"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              View Cart ({cartItemsCount})
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
