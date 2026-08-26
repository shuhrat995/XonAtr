'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const names = [
  { name: 'Nodira', city: 'Xorazm' },
  { name: 'Sanjar', city: 'Samarqand' },
  { name: 'Malika', city: 'Buxoro' },
  { name: 'Jasur', city: 'Farg\'ona' },
  { name: 'Dilnoza', city: 'Andijon' },
  { name: 'Otabek', city: 'Namangan' },
  { name: 'Gulnora', city: 'Xiva' },
  { name: 'Rustam', city: 'Qashqadaryo' },
  { name: 'Sabohat', city: 'Navoiy' },
  { name: 'Bekzod', city: 'Jizzax' },
];

export default function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const show = () => {
      setCurrent((prev) => (prev + 1) % names.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const firstTimer = setTimeout(show, 8000);
    const interval = setInterval(show, 18000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const person = names[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-20 left-4 z-40 glass rounded-2xl p-4 shadow-2xl max-w-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center text-white text-sm font-bold shrink-0">
              {person.name[0]}
            </div>
            <div>
              <p className="text-sm font-medium text-text">
                {person.name} — {person.city}dan
              </p>
              <p className="text-xs text-text-muted">
                buyurtma qildi 🎉
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
