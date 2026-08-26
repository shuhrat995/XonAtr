export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  gender: 'erkaklar' | 'ayollar' | 'uniseks';
  occasion: string[];
  giftFor?: 'ayollar' | 'erkaklar';
  scentType: string;
  description: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  volume: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: string;
  phone: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  perfumeIds?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
    icon?: string;
  }[];
}

export interface FilterState {
  gender: string;
  occasion: string[];
  priceRange: [number, number];
  scentType: string;
  searchQuery: string;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular' | 'rating';
}
