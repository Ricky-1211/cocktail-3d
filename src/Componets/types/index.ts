export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  preferences: string[];
  createdAt: string;
}

export interface MocktailOrder {
  id: string;
  userId: string;
  name: string;
  ingredients: string[];
  price: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  orderDate: string;
  specialInstructions?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (userData: Omit<User, 'id' | 'createdAt'>, password: string) => boolean;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  addOrder: (order: Omit<MocktailOrder, 'id' | 'userId' | 'orderDate' | 'status'>) => void;
  getUserOrders: () => MocktailOrder[];
}