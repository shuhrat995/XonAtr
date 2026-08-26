'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '@/lib/data';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

export default function BlogList() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl overflow-hidden card-hover"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-64 shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {post.author}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-text mb-2 hover:text-accent transition-colors cursor-pointer">
                  {post.title}
                </h2>

                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {expanded === post.id ? post.content : post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-xs text-text-muted"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-sm text-accent hover:underline font-medium mt-auto"
                >
                  {expanded === post.id ? 'Kamroq' : "To'liq o'qish"}
                  <ArrowRight size={14} className={`transition-transform ${expanded === post.id ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
