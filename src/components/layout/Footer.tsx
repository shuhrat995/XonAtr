'use client';

import Link from 'next/link';
import { Globe, Send, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/5 bg-bg/80">
      {/* Glow line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-gold flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                X
              </div>
              <span className="text-2xl font-bold gradient-text">Xon Atr</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              O&apos;zbekistondagi eng ishonchli parfyumeriya do&apos;koni.
              Premium sifat, bepul yetkazish, 14 kun kafolat.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <Globe size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300">
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Navigatsiya
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Bosh sahifa' },
                { href: '/quiz', label: 'Atir tanlash' },
                { href: '/blog', label: 'Blog' },
                { href: '/cart', label: 'Savatcha' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Kategoriyalar
            </h3>
            <ul className="space-y-2.5">
              {['Erkaklar uchun', 'Ayollar uchun', 'Uniseks', 'Sovg\'alar'].map((cat) => (
                <li key={cat}>
                  <span className="text-sm text-text-muted hover:text-accent transition-colors duration-300 cursor-pointer">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Aloqa
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-text-muted">
                <Phone size={14} className="text-accent shrink-0" />
                +998 90 123 45 67
              </li>
              <li className="flex items-center gap-2.5 text-sm text-text-muted">
                <Mail size={14} className="text-accent shrink-0" />
                info@xonatr.uz
              </li>
              <li className="flex items-center gap-2.5 text-sm text-text-muted">
                <MapPin size={14} className="text-accent shrink-0" />
                Xorazm, O&apos;zbekiston
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © 2024 Xon Atr. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1">
            <Heart size={12} className="text-accent" />
            bilan O&apos;zbekistonda yaratilgan
          </p>
        </div>
      </div>
    </footer>
  );
}
