
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, text }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `text-sm font-medium transition-colors hover:text-towel-blue ${
        isActive ? 'text-towel-blue' : 'text-foreground'
      }`
    }
  >
    {text}
  </RouterNavLink>
);

interface NavLinksProps {
  isAdmin: boolean;
}

const NavLinks = ({ isAdmin }: NavLinksProps) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavLink to="/" text="Home" />
      {!isAdmin && (
        <NavLink to="/custom-request" text="Custom Design" />
      )}
    </div>
  );
};

export { NavLink };
export default NavLinks;
