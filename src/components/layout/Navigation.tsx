'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [secretInput, setSecretInput] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [secretError, setSecretError] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const secretRef = useRef<HTMLInputElement>(null);

  const { cart, user, logout, setFilter, filters, activateSecretMode } = useStore();
  const cartCount = useStore((s) => s.getCartCount());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (showSecret && secretRef.current) secretRef.current.focus();
  }, [showSecret]);

  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretInput === 'xonAdmin') {
      activateSecretMode('xonAdmin');
      setSecretInput('');
      setShowSecret(false);
      setSecretError('');
      window.location.href = '/admin';
    } else {
      setSecretError('Noto\'g\'ri kod!');
      setSecretInput('');
      setTimeout(() => setSecretError(''), 3000);
    }
  };

  const navLinks = [
    { href: '/', label: 'Bosh sahifa' },
    { href: '/quiz', label: 'Atir tanlash' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg/95 backdrop-blur-xl shadow-lg shadow-accent/5 border-b border-accent/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-accent to-gold flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                X
              </div>
              <span className="text-xl sm:text-2xl font-bold gradient-text hidden sm:block">
                Xon Atr
              </span>
              <span className="text-lg font-bold gradient-text sm:hidden">
                XA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-white/5 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl hover:bg-white/5 text-text-muted hover:text-accent transition-all duration-300"
              >
                <Search size={20} />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl hover:bg-white/5 text-text-muted hover:text-accent transition-all duration-300"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* User/Auth */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/5 text-text-muted hover:text-accent transition-all duration-300">
                    <User size={18} />
                    <span className="hidden sm:inline text-sm">{user.name}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 glass rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-text-muted hover:text-accent hover:bg-white/5 transition-all"
                    >
                      <LogOut size={16} />
                      Chiqish
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary text-white text-sm font-medium"
                >
                  <User size={16} />
                  Kirish
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 rounded-xl hover:bg-white/5 text-text-muted hover:text-accent transition-all duration-300"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => setFilter('searchQuery', e.target.value)}
                    placeholder="Atir qidirish..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden glass border-t border-white/5"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                {!user && (
                  <Link
                    href="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium btn-primary text-white text-center mt-2"
                  >
                    Kirish / Ro&apos;yxatdan o&apos;tish
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Secret Admin Access - bottom right corner */}
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {showSecret ? (
            <motion.form
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onSubmit={handleSecretSubmit}
              className="glass rounded-2xl p-4 shadow-2xl shadow-accent/20 border border-accent/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-text-muted">🔒 Maxsus kirish</span>
              </div>
              {secretError && (
                <p className="text-xs text-red-400 mb-2">{secretError}</p>
              )}
              <div className="flex gap-2">
                <input
                  ref={secretRef}
                  type="password"
                  value={secretInput}
                  onChange={(e) => setSecretInput(e.target.value)}
                  placeholder="Kodni kiriting..."
                  className="w-40 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                />
                <button
                  type="submit"
                  className="px-3 py-2 btn-primary rounded-lg text-white text-sm font-medium"
                >
                  Kirish
                </button>
              </div>
              <button
                type="button"
                onClick={() => { setShowSecret(false); setSecretError(''); setSecretInput(''); }}
                className="mt-2 text-[10px] text-text-muted hover:text-text"
              >
                Bekor qilish
              </button>
            </motion.form>
          ) : (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setShowSecret(true)}
              className="w-10 h-10 rounded-full bg-bg-card border border-white/10 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 hover:scale-110"
              title="Maxsus kirish"
            >
              🔐
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
