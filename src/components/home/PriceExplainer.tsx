'use client';

import { motion } from 'framer-motion';
import { Coffee, TrendingDown } from 'lucide-react';

export default function PriceExplainer() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-gold rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center text-white mx-auto mb-6"
            >
              <Coffee size={28} />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="gradient-text-gold">129,000 so&apos;m</span>{' '}
              <span className="text-text">= 30 kun</span>
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-text mb-2">
              Kuniga atigi{' '}
              <span className="gradient-text-gold">4,300 so&apos;m</span>
            </p>
            <p className="text-lg text-text-muted mb-6">
              — bir piyola kofe arzon!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="glass rounded-xl px-5 py-3">
                <p className="text-xs text-text-muted">Kofe (Starbucks)</p>
                <p className="text-lg font-bold text-text">35,000 so&apos;m</p>
              </div>
              <TrendingDown size={20} className="text-gold" />
              <div className="glass-gold rounded-xl px-5 py-3 border border-gold/30">
                <p className="text-xs text-gold/80">Xon Atr (kuniga)</p>
                <p className="text-lg font-bold text-gold">4,300 so&apos;m</p>
              </div>
            </div>

            <p className="text-sm text-text-muted mt-6">
              Bitta kofe narxiga <span className="text-gold font-semibold">8 kun</span> boylik baxsh etadigan atir!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
