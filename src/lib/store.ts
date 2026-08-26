import { create } from 'zustand';
import { CartItem, FilterState, User, Order, Perfume, ProductSales, MonthlyStats } from './types';
import { perfumes as allPerfumes } from './data';

// localStorage helpers
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

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

  // CRM
  productSales: ProductSales[];
  monthlyStats: MonthlyStats[];
  addProductSale: (productId: string, productName: string, quantity: number, price: number) => void;

  // Secret admin access
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
  { id: 'o1', userId: 'u1', items: [], total: 129000, status: 'delivered', address: 'Xorazm, Chilonzor', phone: '+998901234567', createdAt: '2024-08-20' },
  { id: 'o2', userId: 'u2', items: [], total: 214000, status: 'shipped', address: 'Xorazm,中心', phone: '+998912345678', createdAt: '2024-08-22' },
  { id: 'o3', userId: 'u3', items: [], total: 89000, status: 'pending', address: 'Xorazm, Markaz', phone: '+998934567890', createdAt: '2024-08-25' },
  { id: 'o4', userId: 'u1', items: [], total: 310000, status: 'processing', address: 'Xorazm, Mirzo Ulug\'bek', phone: '+998901234567', createdAt: '2024-08-25' },
  { id: 'o5', userId: 'u4', items: [], total: 155000, status: 'delivered', address: 'Xorazm, Shayxontohur', phone: '+998941234567', createdAt: '2024-09-01' },
  { id: 'o6', userId: 'u5', items: [], total: 264000, status: 'delivered', address: 'Xorazm, Bog\'ishamol', phone: '+998951234567', createdAt: '2024-09-05' },
  { id: 'o7', userId: 'u2', items: [], total: 89000, status: 'shipped', address: 'Xorazm, Oybek', phone: '+998912345678', createdAt: '2024-09-10' },
  { id: 'o8', userId: 'u6', items: [], total: 438000, status: 'delivered', address: 'Xorazm, Hamid Olimjon', phone: '+998961234567', createdAt: '2024-09-15' },
];

const mockUsers: User[] = [
  { id: 'u1', name: 'Sardor', email: 'sardor@mail.com', phone: '+998901234567', role: 'user', createdAt: '2024-08-01' },
  { id: 'u2', name: 'Nodira', email: 'nodira@mail.com', phone: '+998912345678', role: 'user', createdAt: '2024-08-05' },
  { id: 'u3', name: 'Jamshid', email: 'jamshid@mail.com', phone: '+998934567890', role: 'user', createdAt: '2024-08-10' },
  { id: 'u4', name: 'Malika', email: 'malika@mail.com', phone: '+998941234567', role: 'user', createdAt: '2024-09-01' },
  { id: 'u5', name: 'Bobur', email: 'bobur@mail.com', phone: '+998951234567', role: 'user', createdAt: '2024-09-05' },
  { id: 'u6', name: 'Gulnora', email: 'gulnora@mail.com', phone: '+998961234567', role: 'user', createdAt: '2024-09-15' },
];

const defaultProductSales: ProductSales[] = [
  { productId: 'p1', productName: 'Royal Oud', totalSold: 45, totalRevenue: 5805000 },
  { productId: 'p2', productName: 'Midnight Rose', totalSold: 38, totalRevenue: 4522000 },
  { productId: 'p3', productName: 'Ocean Breeze', totalSold: 52, totalRevenue: 5148000 },
  { productId: 'p5', productName: 'Amber Gold', totalSold: 30, totalRevenue: 4350000 },
  { productId: 'p8', productName: 'Leather & Spice', totalSold: 28, totalRevenue: 4340000 },
  { productId: 'p4', productName: 'Velvet Vanilla', totalSold: 22, totalRevenue: 2970000 },
  { productId: 'p6', productName: 'Fresh Citrus', totalSold: 35, totalRevenue: 3115000 },
  { productId: 'p7', productName: 'Floral Dream', totalSold: 18, totalRevenue: 1962000 },
];

const defaultMonthlyStats: MonthlyStats[] = [
  { month: '2024-07', registrations: 8, orders: 12, revenue: 1548000 },
  { month: '2024-08', registrations: 15, orders: 28, revenue: 3612000 },
  { month: '2024-09', registrations: 22, orders: 35, revenue: 4550000 },
];

export const useStore = create<StoreState>((set, get) => ({
  // Cart
  cart: loadFromStorage('xonatr_cart', [] as CartItem[]),
  addToCart: (perfume) =>
    set((state) => {
      const existing = state.cart.find((item) => item.perfume.id === perfume.id);
      const newCart = existing
        ? state.cart.map((item) =>
            item.perfume.id === perfume.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { perfume, quantity: 1 }];
      saveToStorage('xonatr_cart', newCart);
      return { cart: newCart };
    }),
  removeFromCart: (perfumeId) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.perfume.id !== perfumeId);
      saveToStorage('xonatr_cart', newCart);
      return { cart: newCart };
    }),
  updateQuantity: (perfumeId, quantity) =>
    set((state) => {
      const newCart = quantity <= 0
        ? state.cart.filter((item) => item.perfume.id !== perfumeId)
        : state.cart.map((item) =>
            item.perfume.id === perfumeId ? { ...item, quantity } : item
          );
      saveToStorage('xonatr_cart', newCart);
      return { cart: newCart };
    }),
  clearCart: () => {
    saveToStorage('xonatr_cart', []);
    set({ cart: [] });
  },
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.perfume.price * item.quantity, 0);
  },
  getCartCount: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Auth
  user: loadFromStorage('xonatr_user', null as User | null),
  isAdmin: loadFromStorage('xonatr_isAdmin', false),
  login: (email, password) => {
    if (email && password.length >= 4) {
      const existingUsers = loadFromStorage('xonatr_users', mockUsers);
      let existingUser = existingUsers.find((u: User) => u.email === email);
      if (!existingUser) {
        existingUser = {
          id: 'u' + Date.now(),
          name: email.split('@')[0],
          email,
          phone: '',
          role: 'user' as const,
          createdAt: new Date().toISOString(),
        };
        const updatedUsers = [...existingUsers, existingUser];
        saveToStorage('xonatr_users', updatedUsers);
        // Update monthly stats
        const stats = loadFromStorage('xonatr_monthlyStats', defaultMonthlyStats);
        const currentMonth = new Date().toISOString().slice(0, 7);
        const monthStat = stats.find((s: MonthlyStats) => s.month === currentMonth);
        if (monthStat) monthStat.registrations += 1;
        else stats.push({ month: currentMonth, registrations: 1, orders: 0, revenue: 0 });
        saveToStorage('xonatr_monthlyStats', stats);
      }
      saveToStorage('xonatr_user', existingUser);
      set({ user: existingUser });
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
      saveToStorage('xonatr_user', user);
      // Add to users list
      const existingUsers = loadFromStorage('xonatr_users', mockUsers);
      const updatedUsers = [...existingUsers, user];
      saveToStorage('xonatr_users', updatedUsers);
      // Update monthly stats
      const stats = loadFromStorage('xonatr_monthlyStats', defaultMonthlyStats);
      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthStat = stats.find((s: MonthlyStats) => s.month === currentMonth);
      if (monthStat) monthStat.registrations += 1;
      else stats.push({ month: currentMonth, registrations: 1, orders: 0, revenue: 0 });
      saveToStorage('xonatr_monthlyStats', stats);
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => {
    saveToStorage('xonatr_user', null);
    set({ user: null });
  },
  adminLogin: (password) => {
    if (password === 'XonAtr2024!') {
      saveToStorage('xonatr_isAdmin', true);
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
    set((state) => {
      const newProducts = [...state.products, product];
      saveToStorage('xonatr_products', newProducts);
      return { products: newProducts };
    }),
  updateProduct: (id, data) =>
    set((state) => {
      const newProducts = state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      );
      saveToStorage('xonatr_products', newProducts);
      return { products: newProducts };
    }),
  deleteProduct: (id) =>
    set((state) => {
      const newProducts = state.products.filter((p) => p.id !== id);
      saveToStorage('xonatr_products', newProducts);
      return { products: newProducts };
    }),

  // Orders
  orders: loadFromStorage('xonatr_orders', mockOrders),
  addOrder: (order) =>
    set((state) => {
      const newOrders = [...state.orders, order];
      saveToStorage('xonatr_orders', newOrders);
      // Update monthly stats
      const stats = loadFromStorage('xonatr_monthlyStats', defaultMonthlyStats);
      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthStat = stats.find((s: MonthlyStats) => s.month === currentMonth);
      if (monthStat) {
        monthStat.orders += 1;
        monthStat.revenue += order.total;
      } else {
        stats.push({ month: currentMonth, registrations: 0, orders: 1, revenue: order.total });
      }
      saveToStorage('xonatr_monthlyStats', stats);
      // Update product sales
      order.items.forEach((item) => {
        const sales = loadFromStorage('xonatr_productSales', defaultProductSales);
        const existing = sales.find((s: ProductSales) => s.productId === item.perfume.id);
        if (existing) {
          existing.totalSold += item.quantity;
          existing.totalRevenue += item.perfume.price * item.quantity;
        } else {
          sales.push({
            productId: item.perfume.id,
            productName: item.perfume.name,
            totalSold: item.quantity,
            totalRevenue: item.perfume.price * item.quantity,
          });
        }
        saveToStorage('xonatr_productSales', sales);
      });
      return { orders: newOrders };
    }),
  updateOrderStatus: (id, status) =>
    set((state) => {
      const newOrders = state.orders.map((o) =>
        o.id === id ? { ...o, status } : o
      );
      saveToStorage('xonatr_orders', newOrders);
      return { orders: newOrders };
    }),

  // Users (admin)
  users: loadFromStorage('xonatr_users', mockUsers),

  // CRM
  productSales: loadFromStorage('xonatr_productSales', defaultProductSales),
  monthlyStats: loadFromStorage('xonatr_monthlyStats', defaultMonthlyStats),
  addProductSale: (productId, productName, quantity, price) =>
    set((state) => {
      const sales = [...state.productSales];
      const existing = sales.find((s) => s.productId === productId);
      if (existing) {
        existing.totalSold += quantity;
        existing.totalRevenue += price * quantity;
      } else {
        sales.push({ productId, productName, totalSold: quantity, totalRevenue: price * quantity });
      }
      saveToStorage('xonatr_productSales', sales);
      return { productSales: sales };
    }),

  // Secret admin access
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
