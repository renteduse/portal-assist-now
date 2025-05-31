import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Mock users for demonstration with new IT role
  const mockUsers: Record<string, { password: string; user: User }> = {
    'admin@helphub.com': {
      password: 'admin123',
      user: {
        id: '1',
        name: 'Super Admin',
        email: 'admin@helphub.com',
        role: 'super-admin',
        department: 'Management'
      }
    },
    'hr@helphub.com': {
      password: 'hr123',
      user: {
        id: '2',
        name: 'HR Manager',
        email: 'hr@helphub.com',
        role: 'hr',
        department: 'Human Resources'
      }
    },
    'it@helphub.com': {
      password: 'it123',
      user: {
        id: '3',
        name: 'IT Support',
        email: 'it@helphub.com',
        role: 'it',
        department: 'Information Technology'
      }
    },
    'admin-user@helphub.com': {
      password: 'admin123',
      user: {
        id: '4',
        name: 'Admin User',
        email: 'admin-user@helphub.com',
        role: 'admin',
        department: 'Administration'
      }
    },
    'employee@helphub.com': {
      password: 'emp123',
      user: {
        id: '5',
        name: 'John Doe',
        email: 'employee@helphub.com',
        role: 'employee',
        department: 'Engineering'
      }
    }
  };

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('helphub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem('helphub_user', JSON.stringify(mockUser.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('helphub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
