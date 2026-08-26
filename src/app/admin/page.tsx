'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import AdminPanel from '@/components/admin/AdminPanel';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  const { isAdmin, adminLogin } = useStore();
  const [showLogin, setShowLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
    if (isAdmin) {
      setShowLogin(false);
    }
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = adminLogin(password);
    if (success) {
      setShowLogin(false);
    } else {
      setError('Noto\'g\'ri parol. Qaytadan urinib ko\'ring.');
      setPassword('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {showLogin && !isAdmin ? (
        <main className="min-h-screen flex items-center justify-center pt-20 pb-8 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 left-[10%] w-72 h-72 bg-accent/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute bottom-20 right-[10%] w-96 h-96 bg-gold/8 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-md px-4"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-gold flex items-center justify-center text-white mx-auto mb-4"
              >
                <Lock size={28} />
              </motion.div>
              <h1 className="text-2xl font-bold gradient-text mb-2">Admin Panel</h1>
              <p className="text-sm text-text-muted">
                Kirish uchun maxsus parolni kiriting
              </p>
            </div>

            <form onSubmit={handleLogin} className="glass rounded-2xl p-6 sm:p-8">
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Admin paroli
              </label>
              <div className="relative mb-4">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 mb-4"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 btn-primary rounded-xl text-white font-semibold"
              >
                Kirish
                <ArrowRight size={16} />
              </button>

              <p className="text-[11px] text-text-muted text-center mt-4">
                💡 Maslahat: Navigatsiya pastki o&apos;ng burchagidagi 🔐 tugmasini bosing
              </p>
            </form>
          </motion.div>
        </main>
      ) : (
        <AdminPanel />
      )}
    </>
  );
}
