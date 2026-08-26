'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[10%] w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-gold/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-surface/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(233,69,96,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(233,69,96,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-8"
        >
          <Sparkles size={14} className="text-gold" />
          <span className="text-xs sm:text-sm font-medium text-gold">
            1,200+ mamnun mijozlar ishonchida
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-text">Atir — sizning</span>
          <br />
          <span className="gradient-text">ko&apos;rinmaydigan,</span>
          <br />
          <span className="text-text">
            ammo{' '}
            <span className="gradient-text-gold">eng uzoq</span>{' '}
            qoladigan
          </span>
          <br />
          <span className="text-text">taassurotingiz</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium parfyumeriya — 8-12 soat turadi, bepul yetkaziladi,
          14 kun kafolat bilan. Hoziroq o&apos;z hidni toping!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/quiz"
            className="group flex items-center gap-2 px-8 py-4 btn-primary rounded-2xl text-white font-semibold text-base"
          >
            Atir tanlash
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/#catalog"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-text-muted hover:text-text hover:border-accent/30 hover:bg-white/5 transition-all duration-300 font-medium text-base"
          >
            Katalogni ko&apos;rish
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: <Shield size={18} />, text: '14 kun kafolat', color: 'text-emerald-400' },
            { icon: <Truck size={18} />, text: 'Bepul yetkazish', color: 'text-blue-400' },
            { icon: <RotateCcw size={18} />, text: '2 kunda almashtiramiz', color: 'text-gold' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-sm text-text-muted">
              <span className={badge.color}>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
