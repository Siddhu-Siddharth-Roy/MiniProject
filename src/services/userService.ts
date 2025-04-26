import { User, UserCredentials, UserRole } from "@/types/auth";

// Storage key for the user database
const USERS_STORAGE_KEY = 'app_users_database';

/**
 * Get all users from local storage
 */
export const getStoredUsers = (): Record<string, UserCredentials> => {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  
  // Initialize with admin account
  const initialUsers = {
    'admin@dtex.com': {
      id: 'admin-1',
      email: 'admin@dtex.com',
      password: 'admin123',
      role: 'admin' as UserRole
    }
  };
  
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
  return initialUsers;
};

/**
 * Save a new user to the database
 */
export const saveUserToDatabase = (
  email: string, 
  password: string, 
  role: UserRole, 
  name?: string,
  phone?: string
): User => {
  const users = getStoredUsers();
  
  // Create user entry
  const userId = `user-${Math.random().toString(36).substring(2)}`;
  users[email] = {
    id: userId,
    email,
    password, // In a real app, this would be hashed!
    role,
    ...(name ? { name } : {}),
    ...(phone ? { phone } : {})
  };
  
  // Save updated users
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  
  // Return user data (without password)
  return {
    id: userId,
    email,
    role,
    ...(name ? { name } : {}),
    ...(phone ? { phone } : {})
  };
};

/**
 * Get a stored user by email and password
 */
export const getUserByCredentials = (email: string, password: string): User | null => {
  const users = getStoredUsers();
  const userRecord = users[email];
  
  if (!userRecord || userRecord.password !== password) {
    return null;
  }
  
  return {
    id: userRecord.id,
    email: userRecord.email,
    name: userRecord.name,
    phone: userRecord.phone,
    role: userRecord.role,
  };
};

/**
 * Get a user by email
 */
export const getUserByEmail = (email: string): User | null => {
  const users = getStoredUsers();
  const userRecord = users[email];
  
  if (!userRecord) {
    return null;
  }
  
  return {
    id: userRecord.id,
    email: userRecord.email,
    name: userRecord.name,
    phone: userRecord.phone,
    role: userRecord.role,
  };
};

/**
 * Delete a user from the database
 */
export const deleteUserFromDatabase = (email: string): boolean => {
  const users = getStoredUsers();
  
  if (!users[email]) {
    return false;
  }
  
  // Delete user from database
  delete users[email];
  
  // Save updated users
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  
  // Clear any orders associated with this user
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const updatedOrders = orders.filter((order: any) => order.userEmail !== email);
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
  
  // Clear any custom requests associated with this user
  const requests = JSON.parse(localStorage.getItem('customRequests') || '[]');
  const updatedRequests = requests.filter((request: any) => request.userEmail !== email);
  localStorage.setItem('customRequests', JSON.stringify(updatedRequests));
  
  return true;
};

/**
 * Save the current user to localStorage for session persistence
 */
export const saveUserSession = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get the current user from localStorage
 */
export const getUserSession = (): User | null => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    return JSON.parse(savedUser);
  }
  return null;
};

/**
 * Clear the user session from localStorage
 */
export const clearUserSession = (): void => {
  localStorage.removeItem('user');
};
