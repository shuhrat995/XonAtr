'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, Clock, Star, Heart } from 'lucide-react';

const features = [
  {
    icon: <Shield size={24} />,
    title: '14 kun kafolat',
    description: 'Agar atir sizga yoqmasa, 14 kun ichida qaytarishingiz mumkin',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Truck size={24} />,
    title: 'Bepul yetkazish',
    description: 'Toshkent bo\'ylab 1-3 kun ichida bepul yetkaziladi',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Clock size={24} />,
    title: '8-12 soat turadi',
    description: 'Premium sifatli atirlar kun bo\'yi hidini saqlab qoladi',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <RotateCcw size={24} />,
    title: '2 kunda almashtiramiz',
    description: 'Yoqmasa, 2 kun ichida yangisi bilan almashtiramiz',
    color: 'from-gold to-orange-500',
  },
  {
    icon: <Star size={24} />,
    title: '1,200+ mamnun mijoz',
    description: 'Mijozlarimizning 98%i bizni tavsiya qiladi',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: <Heart size={24} />,
    title: 'Naqd pul bilan to\'lov',
    description: 'Yetkazishda naqd pul yoki karta orqali to\'lash mumkin',
    color: 'from-red-500 to-rose-500',
  },
];

export default function Features() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Nega Xon Atr?</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Biz sizning ishonchingizni qozonish uchun eng yaxshisini qilamiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 card-hover group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
