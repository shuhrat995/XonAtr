'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Perfume } from '@/lib/types';
import {
  LayoutDashboard, Package, ShoppingCart, Users, LogOut,
  Plus, Trash2, Edit3, TrendingUp, Search, X, Save, Star,
  ChevronDown, Eye, EyeOff, AlertTriangle
} from 'lucide-react';

type Tab = 'dashboard' | 'products' | 'orders' | 'users';

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

  const {
    products, orders, users, deleteProduct, addProduct, updateProduct,
    updateOrderStatus, isAdmin, deactivateSecretMode
  } = useStore();

  if (!isAdmin) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-purple-500/20 text-purple-400',
    delivered: 'bg-emerald-500/20 text-emerald-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Kutilmoqda',
    processing: 'Qayta ishlanmoqda',
    shipped: 'Jo\'natilgan',
    delivered: 'Yetkazilgan',
    cancelled: 'Bekor qilindi',
  };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const stats = [
    { label: 'Mahsulotlar', value: products.length, icon: <Package size={20} />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Buyurtmalar', value: orders.length, icon: <ShoppingCart size={20} />, color: 'from-emerald-500 to-teal-500' },
    { label: 'Foydalanuvchilar', value: users.length, icon: <Users size={20} />, color: 'from-purple-500 to-pink-500' },
    { label: 'Daromad', value: totalRevenue, icon: <TrendingUp size={20} />, color: 'from-yellow-500 to-orange-500', format: true },
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

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'products', label: 'Mahsulotlar', icon: <Package size={18} /> },
    { id: 'orders', label: 'Buyurtmalar', icon: <ShoppingCart size={18} /> },
    { id: 'users', label: 'Foydalanuvchilar', icon: <Users size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-bg pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-sm text-text-muted mt-1">Xon Atr boshqaruv tizimi</p>
          </div>
          <button
            onClick={deactivateSecretMode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-text-muted hover:text-red-400 hover:border-red-400/30 transition-all text-sm"
          >
            <LogOut size={16} />
            Chiqish
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-56 shrink-0">
            <nav className="glass rounded-2xl p-3 flex lg:flex-col gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'btn-primary text-white'
                      : 'text-text-muted hover:text-text hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {/* ============ DASHBOARD ============ */}
              {activeTab === 'dashboard' && (
                <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => (
                      <div key={stat.label} className="glass rounded-2xl p-5">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
                          {stat.icon}
                        </div>
                        <p className="text-2xl font-bold text-text">
                          {stat.format ? formatPrice(stat.value) : stat.value}
                        </p>
                        <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-text mb-4">So&apos;nggi buyurtmalar</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 text-text-muted font-medium">ID</th>
                            <th className="text-left py-3 text-text-muted font-medium">Manzil</th>
                            <th className="text-left py-3 text-text-muted font-medium">Summa</th>
                            <th className="text-left py-3 text-text-muted font-medium">Holat</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(-5).reverse().map((order) => (
                            <tr key={order.id} className="border-b border-white/5">
                              <td className="py-3 text-text font-mono text-xs">{order.id}</td>
                              <td className="py-3 text-text-muted">{order.address}</td>
                              <td className="py-3 text-accent font-medium">{formatPrice(order.total)}</td>
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
                  <div className="glass rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                      <h3 className="text-lg font-bold text-text">Mahsulotlar ({filteredProducts.length})</h3>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Qidirish..."
                            className="w-full sm:w-48 pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                          />
                        </div>
                        <button
                          onClick={openAddProduct}
                          className="flex items-center gap-2 px-4 py-2 btn-primary rounded-xl text-white text-sm font-medium shrink-0"
                        >
                          <Plus size={14} />
                          Yangi qo&apos;shish
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 text-text-muted font-medium">Rasm</th>
                            <th className="text-left py-3 text-text-muted font-medium">Nomi</th>
                            <th className="text-left py-3 text-text-muted font-medium">Narx</th>
                            <th className="text-left py-3 text-text-muted font-medium">Jins</th>
                            <th className="text-left py-3 text-text-muted font-medium">Holat</th>
                            <th className="text-left py-3 text-text-muted font-medium">Amallar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((p) => (
                            <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              <td className="py-3">
                                <img src={p.image} alt={p.name} className="w-10 h-12 rounded-lg object-cover" />
                              </td>
                              <td className="py-3">
                                <p className="text-text font-medium">{p.name}</p>
                                <p className="text-xs text-text-muted">{p.brand}</p>
                              </td>
                              <td className="py-3">
                                <p className="text-accent font-medium">{formatPrice(p.price)}</p>
                                {p.originalPrice && p.originalPrice > p.price && (
                                  <p className="text-xs text-text-muted line-through">{formatPrice(p.originalPrice)}</p>
                                )}
                              </td>
                              <td className="py-3 text-text-muted capitalize">{p.gender}</td>
                              <td className="py-3">
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                  p.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                  {p.inStock ? 'Mavjud' : 'Tugagan'}
                                </span>
                              </td>
                              <td className="py-3">
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => setShowProductDetail(p)}
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted hover:text-blue-400 transition-all"
                                    title="Ko'rish"
                                  >
                                    <Eye size={14} />
                                  </button>
                                  <button
                                    onClick={() => openEditProduct(p)}
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted hover:text-gold transition-all"
                                    title="Tahrirlash"
                                  >
                                    <Edit3 size={14} />
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(p.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all"
                                    title="O'chirish"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredProducts.length === 0 && (
                        <div className="text-center py-8 text-text-muted text-sm">
                          Mahsulot topilmadi
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ============ ORDERS ============ */}
              {activeTab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-text mb-6">Buyurtmalar ({orders.length})</h3>
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="glass rounded-xl p-4 hover:bg-white/[0.02] transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-mono text-text-muted">#{order.id}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${statusColors[order.status]}`}>
                                  {statusLabels[order.status]}
                                </span>
                              </div>
                              <p className="text-sm text-text">{order.address}</p>
                              <p className="text-xs text-text-muted">{order.phone}</p>
                              <p className="text-xs text-text-muted mt-1">
                                {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-accent font-bold text-lg">{formatPrice(order.total)}</span>
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-text focus:outline-none focus:border-accent/50 cursor-pointer"
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
                        <p className="text-center text-text-muted text-sm py-8">Hali buyurtmalar yo&apos;q</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ============ USERS ============ */}
              {activeTab === 'users' && (
                <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-text mb-6">Foydalanuvchilar ({users.length})</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 text-text-muted font-medium">Ism</th>
                            <th className="text-left py-3 text-text-muted font-medium">Email</th>
                            <th className="text-left py-3 text-text-muted font-medium">Telefon</th>
                            <th className="text-left py-3 text-text-muted font-medium">Rol</th>
                            <th className="text-left py-3 text-text-muted font-medium">Sana</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((u) => (
                            <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 text-text font-medium">{u.name}</td>
                              <td className="py-3 text-text-muted">{u.email}</td>
                              <td className="py-3 text-text-muted">{u.phone || '—'}</td>
                              <td className="py-3">
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                  u.role === 'admin' ? 'bg-accent/20 text-accent' : 'bg-white/5 text-text-muted'
                                }`}>
                                  {u.role === 'admin' ? 'Admin' : 'Foydalanuvchi'}
                                </span>
                              </td>
                              <td className="py-3 text-text-muted text-xs">
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
      </div>

      {/* ============ PRODUCT MODAL (Add/Edit) ============ */}
      <AnimatePresence>
        {showProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProductModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold gradient-text">
                  {editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
                </h2>
                <button onClick={() => setShowProductModal(false)} className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-text">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Nomi *</label>
                  <input
                    type="text"
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Atir nomi"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Brend</label>
                  <input
                    type="text"
                    value={productForm.brand || ''}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    placeholder="Xon Atr"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                  />
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Hajm</label>
                  <input
                    type="text"
                    value={productForm.volume || ''}
                    onChange={(e) => setProductForm({ ...productForm, volume: e.target.value })}
                    placeholder="100ml"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Narx (so&apos;m) *</label>
                  <input
                    type="number"
                    value={productForm.price || ''}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    placeholder="129000"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Asl narx (chegirma uchun)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice || ''}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) || undefined })}
                    placeholder="159000"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Jins</label>
                  <select
                    value={productForm.gender || 'erkaklar'}
                    onChange={(e) => setProductForm({ ...productForm, gender: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text focus:outline-none focus:border-accent/50 cursor-pointer"
                  >
                    <option value="erkaklar">Erkaklar</option>
                    <option value="ayollar">Ayollar</option>
                    <option value="uniseks">Uniseks</option>
                  </select>
                </div>

                {/* Scent Type */}
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Hid turi</label>
                  <select
                    value={productForm.scentType || 'gul'}
                    onChange={(e) => setProductForm({ ...productForm, scentType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text focus:outline-none focus:border-accent/50 cursor-pointer"
                  >
                    <option value="gul">Gul</option>
                    <option value="dengiz">Dengiz</option>
                    <option value="yog'">Yog&apos;simon</option>
                    <option value="shirin">Shirin</option>
                    <option value="sitrus">Sitrus</option>
                    <option value="mevali">Mevali</option>
                  </select>
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Rasm URL</label>
                  <input
                    type="url"
                    value={productForm.image || ''}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Tavsif</label>
                  <textarea
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Atir haqida qisqacha ma'lumot..."
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 resize-none"
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.inStock ?? true}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 accent-accent rounded"
                    />
                    <span className="text-sm text-text">Mavjud</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isNew ?? false}
                      onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                      className="w-4 h-4 accent-accent rounded"
                    />
                    <span className="text-sm text-text">Yangi</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isBestseller ?? false}
                      onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                      className="w-4 h-4 accent-accent rounded"
                    />
                    <span className="text-sm text-text">Bestseller</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-5 py-2.5 rounded-xl glass text-text-muted hover:text-text transition-all text-sm"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={saveProduct}
                  disabled={!productForm.name || !productForm.price}
                  className="flex items-center gap-2 px-5 py-2.5 btn-primary rounded-xl text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm glass rounded-2xl p-6 text-center"
            >
              <AlertTriangle size={40} className="text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-text mb-2">O&apos;chirishni tasdiqlaysizmi?</h3>
              <p className="text-sm text-text-muted mb-6">
                Bu mahsulot butunlay o&apos;chiriladi. Bu amalni bekor qilib bo&apos;lmaydi.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-5 py-2.5 rounded-xl glass text-text-muted hover:text-text transition-all text-sm"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProductDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass rounded-2xl overflow-hidden"
            >
              <img src={showProductDetail.image} alt={showProductDetail.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-text-muted uppercase">{showProductDetail.brand} • {showProductDetail.volume}</p>
                    <h2 className="text-xl font-bold text-text">{showProductDetail.name}</h2>
                  </div>
                  <button onClick={() => setShowProductDetail(null)} className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted">
                    <X size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Star size={14} className="text-gold fill-gold" />
                  <span className="text-sm text-text">{showProductDetail.rating}</span>
                  <span className="text-xs text-text-muted">({showProductDetail.reviewCount} sharh)</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-accent">{formatPrice(showProductDetail.price)}</span>
                  {showProductDetail.originalPrice && showProductDetail.originalPrice > showProductDetail.price && (
                    <span className="text-sm text-text-muted line-through">{formatPrice(showProductDetail.originalPrice)}</span>
                  )}
                </div>
                <p className="text-sm text-text-muted leading-relaxed mb-4">{showProductDetail.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg bg-white/5 text-xs text-text-muted capitalize">{showProductDetail.gender}</span>
                  <span className="px-2 py-1 rounded-lg bg-white/5 text-xs text-text-muted">{showProductDetail.scentType}</span>
                  {showProductDetail.isNew && <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-xs text-emerald-400">Yangi</span>}
                  {showProductDetail.isBestseller && <span className="px-2 py-1 rounded-lg bg-gold/20 text-xs text-gold">Bestseller</span>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
