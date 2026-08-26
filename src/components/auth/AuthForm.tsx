'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Phone, User, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const { login, register } = useStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!form.email || !form.password) {
        setError('Barcha maydonlarni to\'ldiring');
        return;
      }
      const success = login(form.email, form.password);
      if (success) {
        router.push('/');
      } else {
        setError('Email yoki parol xato');
      }
    } else {
      if (!form.name || !form.email || !form.password || !form.phone) {
        setError('Barcha maydonlarni to\'ldiring');
        return;
      }
      if (form.password.length < 4) {
        setError('Parol kamida 4 ta belgi bo\'lishi kerak');
        return;
      }
      const success = register(form.name, form.email, form.password, form.phone);
      if (success) {
        router.push('/');
      } else {
        setError('Ro\'yxatdan o\'tishda xatolik');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
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
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-gold flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
          >
            X
          </motion.div>
          <h1 className="text-2xl font-bold gradient-text mb-2">
            {isLogin ? 'Xush kelibsiz!' : 'Ro\'yxatdan o\'ting'}
          </h1>
          <p className="text-sm text-text-muted">
            {isLogin
              ? 'Hisobingizga kiring'
              : 'Yangi hisob yarating va premium atirlarga ega bo\'ling'}
          </p>
        </div>

        {/* Form */}
        <motion.form
          layout
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          {!isLogin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4"
            >
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Ism
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ismingiz"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </motion.div>
          )}

          <div className="mb-4">
            <label className="block text-xs font-medium text-text-muted mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-text-muted mb-1.5">
              Parol
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4"
            >
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Telefon raqam
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+998 XX XXX XX XX"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1">
                ⚠️ Yetkazishda shu nomerga tel bo&apos;ladi, iltimos to&apos;g&apos;ri raqam yozing
              </p>
            </motion.div>
          )}

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
            {isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
            <ArrowRight size={16} />
          </button>
        </motion.form>

        {/* Switch */}
        <p className="text-center mt-6 text-sm text-text-muted">
          {isLogin ? 'Hisobingiz yo\'qmi?' : 'Hisobingiz bormi?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-accent hover:underline font-medium"
          >
            {isLogin ? 'Ro\'yxatdan o\'ting' : 'Kiring'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
