
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
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
import { Trash2 } from 'lucide-react';

const UserProfile = () => {
  const { user, isAuthenticated, logout, deleteAccount } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const success = await deleteAccount();
      if (success) {
        toast({
          title: "Account Deleted",
          description: "Your account has been permanently deleted.",
        });
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: "Failed to delete your account. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div 
      className="container mx-auto py-32 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">My Profile</h1>
        
        <div className="mb-8">
          <p className="text-towel-gray">Welcome, {user?.name || user?.email}</p>
        </div>
        
        <div className="glass-panel p-6 rounded-lg mb-8">
          <h2 className="text-xl font-medium mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-towel-gray">Name</p>
              <p className="font-medium">{user?.name || "Not provided"}</p>
            </div>
            
            <div>
              <p className="text-sm text-towel-gray">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-towel-gray">Phone</p>
              <p className="font-medium">{user?.phone || "Not provided"}</p>
            </div>
            
            <div>
              <p className="text-sm text-towel-gray">Account Type</p>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete My Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAccount} 
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
