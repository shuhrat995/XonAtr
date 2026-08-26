'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut,
  Plus, Trash2, Edit3, Eye, TrendingUp, BarChart3, Search,
  ChevronDown, X, Save, Image as ImageIcon
} from 'lucide-react';

type Tab = 'dashboard' | 'products' | 'orders' | 'users';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { products, orders, users, deleteProduct, updateOrderStatus, isAdmin, deactivateSecretMode } = useStore();

  if (!isAdmin) return null;

  const stats = [
    { label: 'Mahsulotlar', value: products.length, icon: <Package size={20} />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Buyurtmalar', value: orders.length, icon: <ShoppingCart size={20} />, color: 'from-emerald-500 to-teal-500' },
    { label: 'Foydalanuvchilar', value: users.length, icon: <Users size={20} />, color: 'from-purple-500 to-pink-500' },
    { label: 'Daromad', value: orders.reduce((s, o) => s + o.total, 0), icon: <TrendingUp size={20} />, color: 'from-gold to-orange-500', format: true },
  ];

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
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
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

                  {/* Recent Orders */}
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

              {activeTab === 'products' && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-text">Mahsulotlar ({products.length})</h3>
                      <button className="flex items-center gap-2 px-4 py-2 btn-primary rounded-xl text-white text-sm font-medium">
                        <Plus size={14} />
                        Yangi qo&apos;shish
                      </button>
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
                          {products.map((p) => (
                            <tr key={p.id} className="border-b border-white/5">
                              <td className="py-3">
                                <img src={p.image} alt={p.name} className="w-10 h-12 rounded-lg object-cover" />
                              </td>
                              <td className="py-3">
                                <p className="text-text font-medium">{p.name}</p>
                                <p className="text-xs text-text-muted">{p.brand}</p>
                              </td>
                              <td className="py-3 text-accent font-medium">{formatPrice(p.price)}</td>
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
                                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted hover:text-blue-400 transition-all">
                                    <Edit3 size={14} />
                                  </button>
                                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted hover:text-accent transition-all">
                                    <Eye size={14} />
                                  </button>
                                  <button
                                    onClick={() => deleteProduct(p.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-text mb-6">Buyurtmalar ({orders.length})</h3>
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="glass rounded-xl p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-mono text-text-muted">#{order.id}</p>
                              <p className="text-sm text-text mt-0.5">{order.address}</p>
                              <p className="text-xs text-text-muted">{order.phone}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-accent font-bold">{formatPrice(order.total)}</span>
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-text focus:outline-none focus:border-accent/50 cursor-pointer"
                              >
                                {Object.entries(statusLabels).map(([key, label]) => (
                                  <option key={key} value={key}>{label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
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
                            <tr key={u.id} className="border-b border-white/5">
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
    </div>
  );
}
