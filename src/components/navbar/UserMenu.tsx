
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface UserMenuProps {
  user: {
    name?: string;
    email: string;
  } | null;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  if (!user) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center">
      <span className="text-sm font-medium text-foreground mr-4">
        {user.name || user.email}
      </span>
      <Button variant="outline" size="sm" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
