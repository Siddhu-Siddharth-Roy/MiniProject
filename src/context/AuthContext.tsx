
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '@/types/auth';
import { 
  getUserByCredentials, 
  saveUserToDatabase, 
  saveUserSession, 
  getUserSession, 
  clearUserSession,
  deleteUserFromDatabase
} from '@/services/userService';

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user session on load
  useEffect(() => {
    const savedUser = getUserSession();
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation
      if (!email || !password) {
        return false;
      }

      // Get user by credentials
      const loggedInUser = getUserByCredentials(email, password);
      
      // Check if user exists
      if (!loggedInUser) {
        return false;
      }
      
      // Verify role if provided (for extra security)
      if (role && loggedInUser.role !== role) {
        return false;
      }

      // Save to state and localStorage for session
      setUser(loggedInUser);
      setIsAuthenticated(true);
      saveUserSession(loggedInUser);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Signup function
  const signup = async (email: string, name: string, password: string, role: UserRole, phone?: string): Promise<boolean> => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation
      if (!email || !password || !name) {
        return false;
      }

      // Check if user already exists
      const existingUser = getUserByCredentials(email, password);
      if (existingUser) {
        return false;
      }

      // Save user to database with phone number
      const newUser = saveUserToDatabase(email, password, role, name, phone);

      // Save to state and localStorage for session
      setUser(newUser);
      setIsAuthenticated(true);
      saveUserSession(newUser);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    clearUserSession();
  };

  // Delete account function
  const deleteAccount = async (): Promise<boolean> => {
    try {
      if (!user) return false;
      
      // Delete user from database
      const success = deleteUserFromDatabase(user.email);
      
      if (success) {
        // Clear user session
        logout();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Delete account error:', error);
      return false;
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      login, 
      signup,
      logout,
      deleteAccount 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
