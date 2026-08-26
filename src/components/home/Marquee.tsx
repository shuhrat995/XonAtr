'use client';

export default function Marquee() {
  const items = [
    '🚚 Bepul yetkazish',
    '⭐ 14 kun kafolat',
    '💎 Premium sifat',
    '🔥 8-12 soat turadi',
    '🎁 Sovg\'a sifatida ideal',
    '✅ 1,200+ mamnun mijoz',
    '💰 Naqd pul bilan to\'lov',
    '🔄 2 kunda almashtiramiz',
  ];

  return (
    <div className="relative overflow-hidden py-3 bg-gradient-to-r from-accent/10 via-gold/5 to-accent/10 border-y border-white/5">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-text-muted">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
