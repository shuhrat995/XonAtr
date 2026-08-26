'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { categories, scentTypes, occasions } from '@/lib/data';
import { SlidersHorizontal, X, ChevronDown, Star, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Catalog() {
  const { products, filters, setFilter, resetFilters, addToCart } = useStore();
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Gender filter
    if (filters.gender) {
      if (filters.gender === 'sovga-ayollar' || filters.gender === 'sovga-erkaklar') {
        result = result.filter((p) => p.giftFor === (filters.gender === 'sovga-ayollar' ? 'ayollar' : 'erkaklar'));
      } else {
        result = result.filter((p) => p.gender === filters.gender);
      }
    }

    // Occasion filter
    if (filters.occasion.length > 0) {
      result = result.filter((p) =>
        filters.occasion.some((o) => p.occasion.includes(o))
      );
    }

    // Scent type filter
    if (filters.scentType) {
      result = result.filter((p) => p.scentType === filters.scentType);
    }

    // Price range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Search
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [products, filters]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';

  return (
    <section id="catalog" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Katalog</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            O&apos;zingizga mos atirni toping — filtrlar yordamida qidirish mumkin
          </p>
        </motion.div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setFilter('gender', filters.gender === cat.slug ? '' : cat.slug)
              }
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filters.gender === cat.slug
                  ? 'btn-primary text-white'
                  : 'glass text-text-muted hover:text-text hover:border-accent/30'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-text-muted hover:text-accent transition-all"
            >
              <SlidersHorizontal size={16} />
              Filtrlar
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {filters.occasion.length > 0 || filters.scentType ? (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-accent hover:bg-accent/10 transition-all"
              >
                <X size={14} />
                Tozalash
              </button>
            ) : null}
          </div>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilter('sortBy', e.target.value as typeof filters.sortBy)}
            className="px-4 py-2.5 rounded-xl glass text-sm text-text bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-accent/50 cursor-pointer"
          >
            <option value="popular">Mashhur</option>
            <option value="newest">Yangi</option>
            <option value="price-low">Narx: arzon → qimmat</option>
            <option value="price-high">Narx: qimmat → arzon</option>
            <option value="rating">Baholash</option>
          </select>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="glass rounded-2xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Occasion */}
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-3">Vaziyat</h4>
                    <div className="flex flex-wrap gap-2">
                      {occasions.map((occ) => (
                        <button
                          key={occ.id}
                          onClick={() => {
                            const current = filters.occasion;
                            setFilter(
                              'occasion',
                              current.includes(occ.id)
                                ? current.filter((o) => o !== occ.id)
                                : [...current, occ.id]
                            );
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            filters.occasion.includes(occ.id)
                              ? 'bg-accent/20 text-accent border border-accent/30'
                              : 'bg-white/5 text-text-muted hover:bg-white/10'
                          }`}
                        >
                          {occ.icon} {occ.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scent Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-3">Hid turi</h4>
                    <div className="flex flex-wrap gap-2">
                      {scentTypes.map((st) => (
                        <button
                          key={st.id}
                          onClick={() =>
                            setFilter('scentType', filters.scentType === st.id ? '' : st.id)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            filters.scentType === st.id
                              ? 'bg-accent/20 text-accent border border-accent/30'
                              : 'bg-white/5 text-text-muted hover:bg-white/10'
                          }`}
                        >
                          {st.icon} {st.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-3">
                      Narx: {formatPrice(filters.priceRange[0])} — {formatPrice(filters.priceRange[1])}
                    </h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={0}
                        max={200000}
                        step={10000}
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          setFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])
                        }
                        className="w-full accent-accent"
                      />
                      <input
                        type="range"
                        min={0}
                        max={200000}
                        step={10000}
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
                        }
                        className="w-full accent-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((perfume, index) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group card-hover"
            >
              <div className="glass rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {perfume.isNew && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold uppercase">
                        Yangi
                      </span>
                    )}
                    {perfume.isBestseller && (
                      <span className="px-2 py-0.5 rounded-md bg-gold text-black text-[10px] font-bold uppercase flex items-center gap-0.5">
                        <Sparkles size={10} /> Bestseller
                      </span>
                    )}
                    {perfume.originalPrice && (
                      <span className="px-2 py-0.5 rounded-md bg-accent text-white text-[10px] font-bold">
                        -{Math.round((1 - perfume.price / perfume.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  {/* Quick actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                    <button
                      onClick={() => addToCart(perfume)}
                      className="px-4 py-2 rounded-xl btn-primary text-white text-xs font-medium flex items-center gap-1.5"
                    >
                      <ShoppingCart size={14} />
                      Savatga
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4">
                  <p className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider mb-1">
                    {perfume.brand} • {perfume.volume}
                  </p>
                  <h3 className="text-sm sm:text-base font-semibold text-text group-hover:text-accent transition-colors duration-300 mb-1 truncate">
                    {perfume.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="text-gold fill-gold" />
                    <span className="text-xs text-text-muted">
                      {perfume.rating} ({perfume.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-bold text-accent">
                      {formatPrice(perfume.price)}
                    </span>
                    {perfume.originalPrice && (
                      <span className="text-xs text-text-muted line-through">
                        {formatPrice(perfume.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg text-text-muted">
              Hech qanday atir topilmadi. Filtrlarni o&apos;zgartiring.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2.5 btn-primary rounded-xl text-white text-sm font-medium"
            >
              Filtrlarni tozalash
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
