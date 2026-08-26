'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Perfume, ProductSales } from '@/lib/types';
import {
  LayoutDashboard, Package, ShoppingCart, Users, LogOut,
  Plus, Trash2, Edit3, TrendingUp, Search, X, Save, Star,
  Eye, AlertTriangle, Upload, BarChart3, FileText, MessageSquare,
  ChevronRight, Bell, Image as ImageIcon, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

type Tab = 'dashboard' | 'products' | 'orders' | 'users' | 'analytics';

const emptyProduct: Partial<Perfume> = {
  name: '',
  brand: 'Xon Atr',
  price: 0,
  originalPrice: 0,
  image: '',
  gender: 'erkaklar',
  occasion: [],
  scentType: 'gul',
  description: '',
  notes: { top: [], middle: [], base: [] },
  volume: '100ml',
  inStock: true,
  rating: 5,
  reviewCount: 0,
  isNew: true,
  isBestseller: false,
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Perfume | null>(null);
  const [productForm, setProductForm] = useState<Partial<Perfume>>(emptyProduct);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showProductDetail, setShowProductDetail] = useState<Perfume | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    products, orders, users, deleteProduct, addProduct, updateProduct,
    updateOrderStatus, isAdmin, deactivateSecretMode, productSales, monthlyStats
  } = useStore();

  if (!isAdmin) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    processing: 'bg-blue-50 text-blue-700 border border-blue-200',
    shipped: 'bg-purple-50 text-purple-700 border border-purple-200',
    delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    cancelled: 'bg-red-50 text-red-700 border border-red-200',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Kutilmoqda',
    processing: 'Qayta ishlanmoqda',
    shipped: 'Jo\'natilgan',
    delivered: 'Yetkazilgan',
    cancelled: 'Bekor qilindi',
  };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const stats = [
    { label: 'Foydalanuvchilar', value: users.length, icon: <Users size={22} />, color: 'bg-emerald-50 text-emerald-600', change: '+12%', up: true },
    { label: 'Buyurtmalar', value: orders.length, icon: <ShoppingCart size={22} />, color: 'bg-emerald-50 text-emerald-600', change: '+8%', up: true },
    { label: 'Mahsulotlar', value: products.length, icon: <Package size={22} />, color: 'bg-emerald-50 text-emerald-600', change: '+3', up: true },
    { label: 'Daromad', value: formatPrice(totalRevenue), icon: <TrendingUp size={22} />, color: 'bg-emerald-50 text-emerald-600', change: '+24%', up: true },
    { label: 'Kutilayotgan', value: pendingOrders, icon: <Bell size={22} />, color: 'bg-amber-50 text-amber-600', change: `${pendingOrders} ta`, up: false },
  ];

  const quickLinks = [
    { label: 'Mahsulotlar', sub: `${products.length} ta mahsulot`, icon: <Package size={22} />, tab: 'products' as Tab, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Buyurtmalar', sub: `${orders.length} ta buyurtma`, icon: <ShoppingCart size={22} />, tab: 'orders' as Tab, color: 'bg-blue-50 text-blue-600' },
    { label: 'Hisobotlar', sub: 'Daromad va statistika', icon: <BarChart3 size={22} />, tab: 'analytics' as Tab, color: 'bg-purple-50 text-purple-600' },
    { label: 'Foydalanuvchilar', sub: `${users.length} ta a'zo`, icon: <Users size={22} />, tab: 'users' as Tab, color: 'bg-amber-50 text-amber-600' },
  ];

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.scentType.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({ ...emptyProduct });
    setShowProductModal(true);
  };

  const openEditProduct = (product: Perfume) => {
    setEditingProduct(product);
    setProductForm({ ...product });
    setShowProductModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProductForm(prev => ({ ...prev, image: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const saveProduct = () => {
    if (!productForm.name || !productForm.price) return;
    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
    } else {
      const newProduct: Perfume = {
        id: 'p' + Date.now(),
        name: productForm.name || '',
        brand: productForm.brand || 'Xon Atr',
        price: productForm.price || 0,
        originalPrice: productForm.originalPrice,
        image: productForm.image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop',
        gender: (productForm.gender as 'erkaklar' | 'ayollar' | 'uniseks') || 'erkaklar',
        occasion: productForm.occasion || [],
        scentType: productForm.scentType || 'gul',
        description: productForm.description || '',
        notes: productForm.notes || { top: [], middle: [], base: [] },
        volume: productForm.volume || '100ml',
        inStock: productForm.inStock ?? true,
        rating: productForm.rating || 5,
        reviewCount: productForm.reviewCount || 0,
        isNew: productForm.isNew ?? true,
        isBestseller: productForm.isBestseller ?? false,
        createdAt: new Date().toISOString(),
      };
      addProduct(newProduct);
    }
    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm(emptyProduct);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const sidebarItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Boshqaruv', icon: <LayoutDashboard size={18} /> },
    { id: 'products', label: 'Mahsulotlar', icon: <Package size={18} /> },
    { id: 'orders', label: 'Buyurtmalar', icon: <ShoppingCart size={18} /> },
    { id: 'analytics', label: 'Hisobotlar', icon: <BarChart3 size={18} /> },
    { id: 'users', label: 'Foydalanuvchilar', icon: <Users size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a2e1a] text-white flex flex-col shrink-0 fixed h-full z-40">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              XA
            </div>
            <div>
              <span className="text-lg font-bold">Xon</span>
              <span className="text-lg font-bold text-emerald-400 ml-1">Atr</span>
              <p className="text-[10px] text-emerald-300/60 uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Admin info */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <span className="text-sm font-medium">admin</span>
          </div>
          <button
            onClick={deactivateSecretMode}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-emerald-300/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={16} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-900">Boshqaruv paneli</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Qidirish (bo'lim ichida)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 w-64"
                />
              </div>
              <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-all relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* ============ DASHBOARD ============ */}
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Boshqaruv paneli</h2>
                <p className="text-sm text-gray-500 mb-6">Platforma holati bir qarashda — foydalanuvchilar, buyurtmalar va mahsulotlar.</p>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                        {stat.icon}
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <p className="text-xs text-gray-500">{stat.label}</p>
                        <span className={`text-[10px] font-medium flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Links */}
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tezkor havolalar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {quickLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => setActiveTab(link.tab)}
                      className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group"
                    >
                      <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center`}>
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{link.label}</p>
                        <p className="text-xs text-gray-500">{link.sub}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    </button>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">So&apos;nggi buyurtmalar</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left py-3 text-gray-500 font-medium">ID</th>
                          <th className="text-left py-3 text-gray-500 font-medium">Manzil</th>
                          <th className="text-left py-3 text-gray-500 font-medium">Telefon</th>
                          <th className="text-left py-3 text-gray-500 font-medium">Summa</th>
                          <th className="text-left py-3 text-gray-500 font-medium">Holat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(-5).reverse().map((order) => (
                          <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-3 text-gray-900 font-mono text-xs">#{order.id}</td>
                            <td className="py-3 text-gray-600">{order.address}</td>
                            <td className="py-3 text-gray-600">{order.phone}</td>
                            <td className="py-3 text-emerald-600 font-medium">{formatPrice(order.total)}</td>
                            <td className="py-3">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============ PRODUCTS ============ */}
            {activeTab === 'products' && (
              <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Mahsulotlar ({filteredProducts.length})</h2>
                  <button
                    onClick={openAddProduct}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-all"
                  >
                    <Plus size={16} />
                    Yangi qo&apos;shish
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                      <div className="relative h-48 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          {p.isNew && <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">YANGI</span>}
                          {p.isBestseller && <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">BEST</span>}
                        </div>
                        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setShowProductDetail(p)} className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                            <Eye size={14} />
                          </button>
                          <button onClick={() => openEditProduct(p)} className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => setDeleteConfirm(p.id)} className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{p.brand} • {p.volume}</p>
                        <h3 className="font-semibold text-gray-900 mt-1">{p.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs text-gray-600">{p.rating}</span>
                          <span className="text-xs text-gray-400">({p.reviewCount})</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-lg font-bold text-emerald-600">{formatPrice(p.price)}</span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="text-xs text-gray-400 line-through">{formatPrice(p.originalPrice)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${p.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            {p.inStock ? 'Mavjud' : 'Tugagan'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] capitalize">{p.gender}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <Package size={48} className="mx-auto mb-4 opacity-30" />
                    <p>Mahsulot topilmadi</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ============ ORDERS ============ */}
            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Buyurtmalar ({orders.length})</h2>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-mono text-gray-500">#{order.id}</span>
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[order.status]}`}>
                              {statusLabels[order.status]}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 font-medium">{order.address}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{order.phone}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-emerald-600 font-bold text-lg">{formatPrice(order.total)}</span>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
                          >
                            {Object.entries(statusLabels).map(([key, label]) => (
                              <option key={key} value={key}>{label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                      <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                      <p>Hali buyurtmalar yo&apos;q</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ============ ANALYTICS ============ */}
            {activeTab === 'analytics' && (
              <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hisobotlar</h2>

                {/* Monthly Stats */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Oylik statistika</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left py-3 text-gray-500 font-medium">Oy</th>
                          <th className="text-left py-3 text-gray-500 font-medium">Ro&apos;yxatdan o&apos;tganlar</th>
                          <th className="text-left py-3 text-gray-500 font-medium">Buyurtmalar</th>
                          <th className="text-left py-3 text-gray-500 font-medium">Daromad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyStats.map((stat) => (
                          <tr key={stat.month} className="border-b border-gray-50">
                            <td className="py-3 text-gray-900 font-medium">{stat.month}</td>
                            <td className="py-3 text-gray-600">{stat.registrations}</td>
                            <td className="py-3 text-gray-600">{stat.orders}</td>
                            <td className="py-3 text-emerald-600 font-medium">{formatPrice(stat.revenue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Product Sales */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Har bir atrdan qancha sotilgani</h3>
                  <div className="space-y-3">
                    {productSales.sort((a, b) => b.totalSold - a.totalSold).map((sale) => {
                      const maxSold = Math.max(...productSales.map(s => s.totalSold));
                      const percentage = (sale.totalSold / maxSold) * 100;
                      return (
                        <div key={sale.productId} className="flex items-center gap-4">
                          <div className="w-40 shrink-0">
                            <p className="text-sm font-medium text-gray-900">{sale.productName}</p>
                          </div>
                          <div className="flex-1">
                            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700">
                                {sale.totalSold} ta
                              </span>
                            </div>
                          </div>
                          <div className="w-36 text-right shrink-0">
                            <p className="text-sm font-medium text-emerald-600">{formatPrice(sale.totalRevenue)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============ USERS ============ */}
            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Foydalanuvchilar ({users.length})</h2>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="text-left py-3 px-5 text-gray-500 font-medium">Foydalanuvchi</th>
                          <th className="text-left py-3 px-5 text-gray-500 font-medium">Email</th>
                          <th className="text-left py-3 px-5 text-gray-500 font-medium">Telefon</th>
                          <th className="text-left py-3 px-5 text-gray-500 font-medium">Rol</th>
                          <th className="text-left py-3 px-5 text-gray-500 font-medium">Sana</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                                  {u.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-gray-900 font-medium">{u.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-5 text-gray-600">{u.email}</td>
                            <td className="py-3 px-5 text-gray-600">{u.phone || '—'}</td>
                            <td className="py-3 px-5">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                                u.role === 'admin' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {u.role === 'admin' ? 'Admin' : 'Foydalanuvchi'}
                              </span>
                            </td>
                            <td className="py-3 px-5 text-gray-500 text-xs">
                              {new Date(u.createdAt).toLocaleDateString('uz-UZ')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ============ PRODUCT MODAL (Add/Edit) ============ */}
      <AnimatePresence>
        {showProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowProductModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
                </h2>
                <button onClick={() => setShowProductModal(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Image Upload */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Rasm</label>
                  <div className="flex items-center gap-4">
                    {productForm.image && (
                      <img src={productForm.image} alt="Preview" className="w-20 h-24 rounded-xl object-cover border border-gray-200" />
                    )}
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all"
                      >
                        <Upload size={14} />
                        Rasm yuklash
                      </button>
                      <p className="text-[10px] text-gray-400 mt-1">JPG, PNG — maks. 5MB</p>
                    </div>
                  </div>
                  <input
                    type="url"
                    value={productForm.image || ''}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="Yoki rasm URL kiriting"
                    className="w-full mt-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Nomi *</label>
                  <input
                    type="text"
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Atir nomi"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Brend</label>
                  <input
                    type="text"
                    value={productForm.brand || ''}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    placeholder="Xon Atr"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Hajm</label>
                  <input
                    type="text"
                    value={productForm.volume || ''}
                    onChange={(e) => setProductForm({ ...productForm, volume: e.target.value })}
                    placeholder="100ml"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Narx (so&apos;m) *</label>
                  <input
                    type="number"
                    value={productForm.price || ''}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    placeholder="129000"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Asl narx (chegirma uchun)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice || ''}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) || undefined })}
                    placeholder="159000"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Jins</label>
                  <select
                    value={productForm.gender || 'erkaklar'}
                    onChange={(e) => setProductForm({ ...productForm, gender: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="erkaklar">Erkaklar</option>
                    <option value="ayollar">Ayollar</option>
                    <option value="uniseks">Uniseks</option>
                  </select>
                </div>

                {/* Scent Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Hid turi</label>
                  <select
                    value={productForm.scentType || 'gul'}
                    onChange={(e) => setProductForm({ ...productForm, scentType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="gul">Gul</option>
                    <option value="dengiz">Dengiz</option>
                    <option value="yog'simon">Yog&apos;simon</option>
                    <option value="shirin">Shirin</option>
                    <option value="sitrus">Sitrus</option>
                    <option value="mevali">Mevali</option>
                  </select>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Tavsif</label>
                  <textarea
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Atir haqida qisqacha ma'lumot..."
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.inStock ?? true}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Mavjud</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isNew ?? false}
                      onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Yangi</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isBestseller ?? false}
                      onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Bestseller</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all text-sm font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={saveProduct}
                  disabled={!productForm.name || !productForm.price}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Save size={14} />
                  {editingProduct ? 'Saqlash' : 'Qo\'shish'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ DELETE CONFIRM ============ */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white rounded-2xl p-6 text-center shadow-2xl"
            >
              <AlertTriangle size={40} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">O&apos;chirishni tasdiqlaysizmi?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Bu mahsulot butunlay o&apos;chiriladi. Bu amalni bekor qilib bo&apos;lmaydi.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all text-sm font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => handleDeleteProduct(deleteConfirm)}
                  className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-all"
                >
                  Ha, o&apos;chirish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ PRODUCT DETAIL ============ */}
      <AnimatePresence>
        {showProductDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowProductDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={showProductDetail.image} alt={showProductDetail.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">{showProductDetail.brand} • {showProductDetail.volume}</p>
                    <h2 className="text-xl font-bold text-gray-900">{showProductDetail.name}</h2>
                  </div>
                  <button onClick={() => setShowProductDetail(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                    <X size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-700">{showProductDetail.rating}</span>
                  <span className="text-xs text-gray-400">({showProductDetail.reviewCount} sharh)</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-emerald-600">{formatPrice(showProductDetail.price)}</span>
                  {showProductDetail.originalPrice && showProductDetail.originalPrice > showProductDetail.price && (
                    <span className="text-sm text-gray-400 line-through">{formatPrice(showProductDetail.originalPrice)}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{showProductDetail.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg bg-gray-100 text-xs text-gray-600 capitalize">{showProductDetail.gender}</span>
                  <span className="px-2 py-1 rounded-lg bg-gray-100 text-xs text-gray-600">{showProductDetail.scentType}</span>
                  {showProductDetail.isNew && <span className="px-2 py-1 rounded-lg bg-emerald-50 text-xs text-emerald-600">Yangi</span>}
                  {showProductDetail.isBestseller && <span className="px-2 py-1 rounded-lg bg-amber-50 text-xs text-amber-600">Bestseller</span>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
