
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Footer = () => {
  const { isAdmin } = useAuth();

  return (
    <footer className="bg-towel-dark text-white">
      {/* Main footer */}
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">DTex TOWELS</h3>
            <p className="text-towel-gray mb-4 max-w-md">
              Premium towels crafted with the finest materials for a luxurious bathing experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Help - Only show for customers */}
          {!isAdmin && (
            <div className="flex flex-col items-center text-center">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/track-order" className="text-towel-gray hover:text-white transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link to="/my-orders" className="text-towel-gray hover:text-white transition-colors">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-towel-gray hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          )}
          
          {/* Contact */}
          <div className={isAdmin ? "md:col-span-2" : ""}>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-towel-accent flex-shrink-0 mt-1" />
                <span className="text-towel-gray">
                  MIDC, Solpaur, Maharashtra, India.
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-towel-accent flex-shrink-0" />
                <span className="text-towel-gray">+91 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-towel-accent flex-shrink-0" />
                <span className="text-towel-gray">contact@dtex.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-towel-gray text-sm">
              © {new Date().getFullYear()} DTex. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy-policy" className="text-towel-gray text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-towel-gray text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/login" className="text-towel-gray text-sm hover:text-white transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
