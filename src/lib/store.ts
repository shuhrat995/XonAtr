import { create } from 'zustand';
import { CartItem, FilterState, User, Order, Perfume } from './types';
import { perfumes as allPerfumes } from './data';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (perfume: Perfume) => void;
  removeFromCart: (perfumeId: string) => void;
  updateQuantity: (perfumeId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // User/Auth
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, phone: string) => boolean;
  logout: () => void;
  adminLogin: (password: string) => boolean;

  // Filters
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: FilterState[keyof FilterState]) => void;
  resetFilters: () => void;

  // Products
  products: Perfume[];
  addProduct: (product: Perfume) => void;
  updateProduct: (id: string, data: Partial<Perfume>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;

  // Users (admin)
  users: User[];

  // Secret admin access
  secretCode: string;
  isSecretMode: boolean;
  activateSecretMode: (code: string) => void;
  deactivateSecretMode: () => void;
}

const defaultFilters: FilterState = {
  gender: '',
  occasion: [],
  priceRange: [0, 200000],
  scentType: '',
  searchQuery: '',
  sortBy: 'popular',
};

const mockOrders: Order[] = [
  { id: 'o1', userId: 'u1', items: [], total: 129000, status: 'delivered', address: 'Toshkent, Chilonzor', phone: '+998901234567', createdAt: '2024-08-20' },
  { id: 'o2', userId: 'u2', items: [], total: 214000, status: 'shipped', address: 'Samarqand,中心', phone: '+998912345678', createdAt: '2024-08-22' },
  { id: 'o3', userId: 'u3', items: [], total: 89000, status: 'pending', address: 'Buxoro, Markaz', phone: '+998934567890', createdAt: '2024-08-25' },
  { id: 'o4', userId: 'u1', items: [], total: 310000, status: 'processing', address: 'Toshkent, Mirzo Ulug\'bek', phone: '+998901234567', createdAt: '2024-08-25' },
];

const mockUsers: User[] = [
  { id: 'u1', name: 'Sardor', email: 'sardor@mail.com', phone: '+998901234567', role: 'user', createdAt: '2024-08-01' },
  { id: 'u2', name: 'Nodira', email: 'nodira@mail.com', phone: '+998912345678', role: 'user', createdAt: '2024-08-05' },
  { id: 'u3', name: 'Jamshid', email: 'jamshid@mail.com', phone: '+998934567890', role: 'user', createdAt: '2024-08-10' },
];

export const useStore = create<StoreState>((set, get) => ({
  // Cart
  cart: [],
  addToCart: (perfume) =>
    set((state) => {
      const existing = state.cart.find((item) => item.perfume.id === perfume.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.perfume.id === perfume.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { perfume, quantity: 1 }] };
    }),
  removeFromCart: (perfumeId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.perfume.id !== perfumeId),
    })),
  updateQuantity: (perfumeId, quantity) =>
    set((state) => ({
      cart: quantity <= 0
        ? state.cart.filter((item) => item.perfume.id !== perfumeId)
        : state.cart.map((item) =>
            item.perfume.id === perfumeId ? { ...item, quantity } : item
          ),
    })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.perfume.price * item.quantity, 0);
  },
  getCartCount: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Auth
  user: null,
  isAdmin: false,
  login: (email, password) => {
    if (email && password.length >= 4) {
      const user: User = {
        id: 'u' + Date.now(),
        name: email.split('@')[0],
        email,
        phone: '',
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      set({ user });
      return true;
    }
    return false;
  },
  register: (name, email, password, phone) => {
    if (name && email && password.length >= 4 && phone) {
      const user: User = {
        id: 'u' + Date.now(),
        name,
        email,
        phone,
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAdmin: false }),
  adminLogin: (password) => {
    if (password === 'XonAtr2024!') {
      set({ isAdmin: true });
      return true;
    }
    return false;
  },

  // Filters
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: defaultFilters }),

  // Products
  products: allPerfumes,
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  // Orders
  orders: mockOrders,
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status } : o
      ),
    })),

  // Users (admin)
  users: mockUsers,

  // Secret admin access
  secretCode: 'xonAdmin',
  isSecretMode: false,
  activateSecretMode: (code) => {
    if (code === 'xonAdmin') {
      set({ isSecretMode: true });
      return true;
    }
    return false;
  },
  deactivateSecretMode: () => set({ isSecretMode: false }),
}));
