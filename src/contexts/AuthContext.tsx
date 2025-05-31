
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'hr' | 'admin' | 'it' | 'super-admin';
  department?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and validate with backend
    const checkAuth = async () => {
      const token = localStorage.getItem('helphub_token');
      if (token) {
        try {
          const response = await authApi.getMe();
          setUser({
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            department: response.user.department
          });
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('helphub_token');
          localStorage.removeItem('helphub_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authApi.login(email, password);
      
      const userData: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        department: response.user.department
      };
      
      setUser(userData);
      localStorage.setItem('helphub_token', response.token);
      localStorage.setItem('helphub_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('helphub_token');
    localStorage.removeItem('helphub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
