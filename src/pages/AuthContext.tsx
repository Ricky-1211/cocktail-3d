import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthContextType, User, MocktailOrder } from '../Componets/types/index.ts';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        setUser(JSON.parse(currentUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const getUsers = (): User[] => {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]') as User[];
    } catch (error) {
      console.error('Error parsing users:', error);
      return [];
    }
  };

  const getOrders = (): MocktailOrder[] => {
    try {
      return JSON.parse(localStorage.getItem('mocktailOrders') || '[]') as MocktailOrder[];
    } catch (error) {
      console.error('Error parsing orders:', error);
      return [];
    }
  };

  const saveUsers = (users: User[]) => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const saveOrders = (orders: MocktailOrder[]) => {
    try {
      localStorage.setItem('mocktailOrders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const userData = users.find(u => u.email === email);
    
    if (userData) {
      const userPassword = localStorage.getItem(`password_${userData.id}`);
      if (userPassword === password) {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        return true;
      }
    }
    return false;
  };

  const register = (userData: Omit<User, 'id' | 'createdAt'>, password: string): boolean => {
    const users = getUsers();
    
    if (users.find(u => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);
    
    // WARNING: Storing passwords in plain text is insecure. Use a backend with hashed passwords in production.
    localStorage.setItem(`password_${newUser.id}`, password);
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;

    const users = getUsers();
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...userData } : u
    );
    
    const updatedUser = { ...user, ...userData };
    
    saveUsers(updatedUsers);
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const addOrder = (orderData: Omit<MocktailOrder, 'id' | 'userId' | 'orderDate' | 'status'>) => {
    if (!user) return;

    const orders = getOrders();
    const newOrder: MocktailOrder = {
      ...orderData,
      id: Date.now().toString(),
      userId: user.id,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };

    orders.push(newOrder);
    saveOrders(orders);
  };

  const getUserOrders = (): MocktailOrder[] => {
    if (!user) return [];
    const orders = getOrders();
    return orders.filter(order => order.userId === user.id);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    addOrder,
    getUserOrders,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};