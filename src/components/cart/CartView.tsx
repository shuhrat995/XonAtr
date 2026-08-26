'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CartView() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useStore();
  const total = getCartTotal();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';

  const handleOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="text-7xl mb-6"
        >
          🎉
        </motion.div>
        <h2 className="text-3xl font-bold gradient-text mb-4">
          Buyurtma qabul qilindi!
        </h2>
        <p className="text-text-muted max-w-md mx-auto mb-8">
          Tez orada sizning telefon raqamingizga aloqaga chiqamiz.
          Yetkazish 1-3 kun ichida amalga oshiriladi.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 btn-primary rounded-xl text-white font-medium"
        >
          Bosh sahifaga qaytish
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    );
  }

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <ShoppingBag size={64} className="mx-auto text-text-muted/30 mb-4" />
        <h2 className="text-2xl font-bold text-text mb-2">Savatcha bo&apos;sh</h2>
        <p className="text-text-muted mb-6">
          Hali hech qanday atir tanlamadingiz
        </p>
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-2 px-6 py-3 btn-primary rounded-xl text-white font-medium"
        >
          Katalogni ko&apos;rish
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items */}
      <div className="lg:col-span-2 space-y-4">
        {cart.map((item, index) => (
          <motion.div
            key={item.perfume.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-4 flex gap-4"
          >
            <img
              src={item.perfume.image}
              alt={item.perfume.name}
              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-muted uppercase">{item.perfume.brand}</p>
              <h3 className="text-sm sm:text-base font-semibold text-text truncate">
                {item.perfume.name}
              </h3>
              <p className="text-sm text-text-muted mt-0.5">{item.perfume.volume}</p>

              <div className="flex items-center justify-between mt-3">
                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.perfume.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-medium text-text w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.perfume.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-accent">
                    {formatPrice(item.perfume.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.perfume.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="glass rounded-2xl p-6 sticky top-24">
          <h3 className="text-lg font-bold text-text mb-4">Buyurtma xulosasi</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Mahsulotlar ({cart.length})</span>
              <span className="text-text">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Yetkazish</span>
              <span className="text-emerald-400 font-medium">Bepul</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between">
              <span className="font-semibold text-text">Jami</span>
              <span className="text-xl font-bold text-accent">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Kafolat */}
          <div className="glass-gold rounded-xl p-3 mb-6">
            <div className="flex items-start gap-2">
              <Shield size={16} className="text-gold shrink-0 mt-0.5" />
              <p className="text-xs text-gold/80">
                2 kun ichida agar sizga yoqmagan bo&apos;lsa, almashtiriladi
              </p>
            </div>
          </div>

          {!showCheckout ? (
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 btn-primary rounded-xl text-white font-semibold"
            >
              Buyurtma berish
              <ArrowRight size={16} />
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Yetkazish manzili"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
              />
              <input
                type="tel"
                placeholder="Telefon raqam"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
              />
              <p className="text-[11px] text-red-400">
                ⚠️ Yetkazishda shu nomerga tel bo&apos;ladi
              </p>
              <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-2 py-3.5 btn-gold rounded-xl text-white font-semibold"
              >
                ✅ Tasdiqlash — {formatPrice(total)}
              </button>
            </motion.div>
          )}

          {/* Trust */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Truck size={12} /> Bepul yetkazish
            </span>
            <span className="flex items-center gap-1">
              <RotateCcw size={12} /> 2 kunda almashtiramiz
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
