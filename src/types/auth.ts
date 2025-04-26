
// Define types related to authentication

export type UserRole = 'customer' | 'admin' | null;

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: UserRole;
}

export interface UserCredentials {
  id: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (email: string, name: string, password: string, role: UserRole, phone?: string) => Promise<boolean>;
  logout: () => void;
  deleteAccount: () => Promise<boolean>;
}
