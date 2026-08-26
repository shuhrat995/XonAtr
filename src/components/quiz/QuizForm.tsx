'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '@/lib/data';
import { useStore } from '@/lib/store';
import { ArrowLeft, ArrowRight, RotateCcw, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

export default function QuizForm() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const { products, addToCart } = useStore();

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: value }));
    if (currentQ < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const getRecommendations = () => {
    const occasion = answers[0] || '';
    const scent = answers[1] || '';
    const gender = answers[2] || '';
    const budget = answers[3] || '';

    return products.filter((p) => {
      let match = true;
      if (occasion && !p.occasion.includes(occasion)) match = false;
      if (scent && p.scentType !== scent) match = false;
      if (gender) {
        if (gender === 'erkaklar' && p.gender !== 'erkaklar') match = false;
        if (gender === 'ayollar' && p.gender !== 'ayollar') match = false;
      }
      if (budget === 'low' && p.price > 100000) match = false;
      if (budget === 'mid' && (p.price < 100000 || p.price > 130000)) match = false;
      return match;
    });
  };

  const recommendations = getRecommendations();
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';

  const restart = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-5xl mb-4">🎉</p>
          <h2 className="text-3xl font-bold gradient-text mb-3">
            Sizga mos atirlar topildi!
          </h2>
          <p className="text-text-muted">
            Javoblaringiz asosida {recommendations.length} ta atir tavsiya etiladi
          </p>
        </motion.div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((perfume, index) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden card-hover"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-text-muted uppercase">{perfume.brand}</p>
                  <h3 className="text-lg font-semibold text-text mb-1">{perfume.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="text-gold fill-gold" />
                    <span className="text-xs text-text-muted">{perfume.rating}</span>
                  </div>
                  <p className="text-lg font-bold text-accent mb-3">{formatPrice(perfume.price)}</p>
                  <button
                    onClick={() => addToCart(perfume)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 btn-primary rounded-xl text-white text-sm font-medium"
                  >
                    <ShoppingCart size={14} />
                    Savatga qo&apos;shish
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass rounded-2xl">
            <p className="text-4xl mb-4">😔</p>
            <p className="text-lg text-text-muted mb-4">
              Afsuski, sizning javoblaringizga mos atir topilmadi.
            </p>
            <p className="text-sm text-text-muted mb-6">
              Katalogdan o&apos;zizga mos atirni toping yoki boshqacha javob bering.
            </p>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={restart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass text-text-muted hover:text-text hover:border-accent/30 transition-all"
          >
            <RotateCcw size={16} />
            Qaytadan
          </button>
          <Link
            href="/#catalog"
            className="flex items-center gap-2 px-6 py-3 btn-primary rounded-xl text-white font-medium"
          >
            Katalogni ko&apos;rish
          </Link>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-muted">
            Savol {currentQ + 1} / {quizQuestions.length}
          </span>
          <span className="text-sm text-accent font-medium">
            {Math.round(((currentQ + 1) / quizQuestions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-accent to-gold rounded-full"
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            {question.question}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(option.value)}
                className={`glass rounded-2xl p-6 text-center hover:border-accent/40 transition-all duration-300 ${
                  answers[currentQ] === option.value
                    ? 'border-accent bg-accent/10'
                    : ''
                }`}
              >
                <span className="text-3xl mb-3 block">{option.icon}</span>
                <span className="text-sm sm:text-base font-medium text-text">
                  {option.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)}
          disabled={currentQ === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft size={16} />
          Oldingi
        </button>
      </div>
    </div>
  );
}
