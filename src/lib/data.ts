import { Perfume, QuizQuestion, BlogPost, Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Erkaklar', slug: 'erkaklar', icon: '👔' },
  { id: '2', name: 'Ayollar', slug: 'ayollar', icon: '👗' },
  { id: '3', name: 'Uniseks', slug: 'uniseks', icon: '✨' },
  { id: '4', name: 'Sovg\'a - Ayollar', slug: 'sovga-ayollar', icon: '🎁' },
  { id: '5', name: 'Sovg\'a - Erkaklar', slug: 'sovga-erkaklar', icon: '🎁' },
  { id: '6', name: 'Maktab uchun', slug: 'maktab', icon: '📚' },
  { id: '7', name: 'Institut/Talabalar', slug: 'institut', icon: '🎓' },
  { id: '8', name: 'Ish/Ofis', slug: 'ish', icon: '💼' },
  { id: '9', name: 'Uchrashuvlar', slug: 'uchrashuvlar', icon: '🤝' },
];

export const perfumes: Perfume[] = [
  {
    id: 'p1',
    name: 'Royal Oud',
    brand: 'Xon Atr',
    price: 129000,
    originalPrice: 159000,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop',
    gender: 'erkaklar',
    occasion: ['ish', 'uchrashuvlar'],
    scentType: 'yog\'simon',
    description: 'Nohob va qimmatbaho yog\'simon hid — nafislik va kuchning uyg\'unligi. Oud, sandal va ambra notalari.',
    notes: {
      top: ['Qora qalampir', 'Bergamot', 'Zanjabil'],
      middle: ['Oud', 'Sandal', 'Kadife guli'],
      base: ['Ambra', 'Mushk', 'Vanil'],
    },
    volume: '100ml',
    inStock: true,
    rating: 4.8,
    reviewCount: 234,
    isBestseller: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'p2',
    name: 'Midnight Rose',
    brand: 'Xon Atr',
    price: 119000,
    originalPrice: 139000,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=500&fit=crop',
    gender: 'ayollar',
    occasion: ['uchrashuvlar', 'maktab'],
    scentType: 'gul',
    description: 'Kechasi gulzorning sirli hidida — atirgul, peoni va vanil muvozanati.',
    notes: {
      top: ['Qizil gul', 'Mandarin', 'Pear'],
      middle: ['Atirgul', 'Peoni', 'Jasmin'],
      base: ['Vanil', 'Patchouli', 'Oq mushk'],
    },
    volume: '75ml',
    inStock: true,
    rating: 4.9,
    reviewCount: 312,
    isNew: true,
    createdAt: '2024-06-01',
  },
  {
    id: 'p3',
    name: 'Ocean Breeze',
    brand: 'Xon Atr',
    price: 99000,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=500&fit=crop',
    gender: 'erkaklar',
    occasion: ['maktab', 'institut', 'ish'],
    scentType: 'dengiz',
    description: 'Tuproq va dengizning tetiklantiruvchi uyg\'unligi — kun bo\'yi yangilik baxsh etadi.',
    notes: {
      top: ['Limon', 'Qanquloq', 'Bergamot'],
      middle: ['Dengiz tuzi', 'Lavanda', 'Geranium'],
      base: ['Cedar', 'Ambergris', 'Mushk'],
    },
    volume: '100ml',
    inStock: true,
    rating: 4.6,
    reviewCount: 189,
    isBestseller: true,
    createdAt: '2024-02-10',
  },
  {
    id: 'p4',
    name: 'Velvet Vanilla',
    brand: 'Xon Atr',
    price: 135000,
    originalPrice: 165000,
    image: 'https://images.unsplash.com/photo-1594035910387-fbbd5583e988?w=400&h=500&fit=crop',
    gender: 'ayollar',
    occasion: ['uchrashuvlar', 'ish'],
    scentType: 'mevali',
    description: 'Shokolad va vanilning qattiqo\'zligi — shirin, lekin jozibali.',
    notes: {
      top: ['Qulupnay', 'Mandarin', 'Qora smorodina'],
      middle: ['Vanil', 'Karamell', 'Gulk kvinti'],
      base: ['Shokolad', 'Sandal', 'Patchouli'],
    },
    volume: '50ml',
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    createdAt: '2024-03-20',
  },
  {
    id: 'p5',
    name: 'Amber Gold',
    brand: 'Xon Atr',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=500&fit=crop',
    gender: 'uniseks',
    occasion: ['ish', 'uchrashuvlar'],
    scentType: 'yog\'simon',
    description: 'Oltin ambra — har qanday voqeaga mos, hashamatli va doimiy.',
    notes: {
      top: ['Kardamon', 'Bergamot', 'Qizil qalampir'],
      middle: ['Ambra', 'Oud', 'Iris'],
      base: ['Vanil', 'Sandal', 'Labdanum'],
    },
    volume: '100ml',
    inStock: true,
    rating: 4.8,
    reviewCount: 198,
    isBestseller: true,
    createdAt: '2024-01-25',
  },
  {
    id: 'p6',
    name: 'Fresh Citrus',
    brand: 'Xon Atr',
    price: 89000,
    image: 'https://images.unsplash.com/photo-1592945550527-cfb375cbab2e?w=400&h=500&fit=crop',
    gender: 'erkaklar',
    occasion: ['maktab', 'institut'],
    scentType: 'sitrus',
    description: 'Limon va limonning tetikligi — maktab va institut uchun ideal.',
    notes: {
      top: ['Limón', 'Grapefruit', 'Nane'],
      middle: ['Limon verbena', 'Jasmin', 'Kadife guli'],
      base: ['Cedar', 'Oq mushk', 'Ambra'],
    },
    volume: '75ml',
    inStock: true,
    rating: 4.5,
    reviewCount: 167,
    isNew: true,
    createdAt: '2024-07-01',
  },
  {
    id: 'p7',
    name: 'Floral Dream',
    brand: 'Xon Atr',
    price: 109000,
    originalPrice: 129000,
    image: 'https://images.unsplash.com/photo-1563170351-604009820082?w=400&h=500&fit=crop',
    gender: 'ayollar',
    occasion: ['maktab', 'uchrashuvlar'],
    scentType: 'gul',
    description: 'Gullar olamiga sayohat — yasmin, atirgul va magnoliya.',
    notes: {
      top: ['Qizil mevalar', 'Pear blossom', 'Bergamot'],
      middle: ['Yasmin', 'Atirgul', 'Magnoliya'],
      base: ['Sandal', 'Vanil', 'Oq mushk'],
    },
    volume: '50ml',
    inStock: true,
    rating: 4.6,
    reviewCount: 143,
    createdAt: '2024-04-15',
  },
  {
    id: 'p8',
    name: 'Leather & Spice',
    brand: 'Xon Atr',
    price: 155000,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=500&fit=crop',
    gender: 'erkaklar',
    occasion: ['ish', 'uchrashuvlar'],
    scentType: 'yog\'simon',
    description: 'Teri va ziravorlarning qudratli uyg\'unligi — kuch va ishonch.',
    notes: {
      top: ['Zanjabil', 'Qalampir', 'Kardamon'],
      middle: ['Teri', 'Tabak', 'Oud'],
      base: ['Benzoin', 'Sandal', 'Mushk'],
    },
    volume: '100ml',
    inStock: true,
    rating: 4.9,
    reviewCount: 201,
    isBestseller: true,
    createdAt: '2024-02-28',
  },
  {
    id: 'p9',
    name: 'Cotton Candy',
    brand: 'Xon Atr',
    price: 95000,
    originalPrice: 115000,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=500&fit=crop',
    gender: 'ayollar',
    occasion: ['maktab', 'uchrashuvlar'],
    scentType: 'shirin',
    description: 'Paxta qandining xushbo\'yi — yosh, shirin va baxtli.',
    notes: {
      top: ['Berry', 'Mandarin', 'Vanil'],
      middle: ['Karamell', 'Pashka', 'Gulk kvinti'],
      base: ['Vanil', 'Mushk', 'Sandal'],
    },
    volume: '50ml',
    inStock: true,
    rating: 4.4,
    reviewCount: 98,
    createdAt: '2024-08-01',
  },
  {
    id: 'p10',
    name: 'Dark Obsession',
    brand: 'Xon Atr',
    price: 169000,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=500&fit=crop',
    gender: 'erkaklar',
    occasion: ['ish', 'uchrashuvlar'],
    scentType: 'yog\'simon',
    description: 'Qorong\'u va sirli — tabak, oud va ambra kombinatsiyasi.',
    notes: {
      top: ['Qora qalampir', 'Bergamot', 'Zanjabil'],
      middle: ['Tabak', 'Oud', 'Iris'],
      base: ['Ambra', 'Vanil', 'Patchouli'],
    },
    volume: '100ml',
    inStock: true,
    rating: 4.7,
    reviewCount: 176,
    isNew: true,
    createdAt: '2024-05-10',
  },
  {
    id: 'p11',
    name: 'Rose Garden',
    brand: 'Xon Atr',
    price: 115000,
    image: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf1bf?w=400&h=500&fit=crop',
    gender: 'ayollar',
    occasion: ['uchrashuvlar', 'ish'],
    scentType: 'gul',
    description: 'Gulzorning to\'liq tajribasi — turli xil atirgullar birlashmasi.',
    notes: {
      top: ['Gul suvi', 'Limon', 'Bergamot'],
      middle: ['Atirgul', 'Peoni', 'Gulk kvinti'],
      base: ['Sandal', 'Vanil', 'Oq mushk'],
    },
    volume: '75ml',
    inStock: true,
    rating: 4.5,
    reviewCount: 132,
    createdAt: '2024-03-05',
  },
  {
    id: 'p12',
    name: 'Sport Active',
    brand: 'Xon Atr',
    price: 79000,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop',
    gender: 'erkaklar',
    occasion: ['maktab', 'institut'],
    scentType: 'dengiz',
    description: 'Sport va faollik uchun — tetiklantiruvchi va energiya beruvchi.',
    notes: {
      top: ['Nane', 'Limon', 'Qalampir'],
      middle: ['Dengiz tuzi', 'Lavanda', 'Geranium'],
      base: ['Cedar', 'Ambra', 'Oq mushk'],
    },
    volume: '100ml',
    inStock: true,
    rating: 4.3,
    reviewCount: 156,
    createdAt: '2024-04-20',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qaysi voqega atir olmoqchisiz?',
    options: [
      { label: 'Maktabga', value: 'maktab', icon: '📚' },
      { label: 'Institutga', value: 'institut', icon: '🎓' },
      { label: 'Ishga', value: 'ish', icon: '💼' },
      { label: 'Uchrashuvga', value: 'uchrashuvlar', icon: '🤝' },
    ],
  },
  {
    id: 2,
    question: 'Qanday hidni yoqtirasiz?',
    options: [
      { label: 'Gullar hidini', value: 'gul', icon: '🌸' },
      { label: 'Dengiz yoki namlilik', value: 'dengiz', icon: '🌊' },
      { label: 'Yog\'simon va kuchli', value: 'yog\'simon', icon: '🔥' },
      { label: 'Shirin va mevali', value: 'shirin', icon: '🍬' },
    ],
  },
  {
    id: 3,
    question: 'Atir kim uchun olmoqchisiz?',
    options: [
      { label: 'O\'zim uchun (Erkak)', value: 'erkaklar', icon: '👨' },
      { label: 'O\'zim uchun (Ayol)', value: 'ayollar', icon: '👩' },
      { label: 'Erkakka sovg\'a', value: 'sovga-erkaklar', icon: '🎁' },
      { label: 'Ayolga sovg\'a', value: 'sovga-ayollar', icon: '🎁' },
    ],
  },
  {
    id: 4,
    question: 'Byudjetingiz qancha?',
    options: [
      { label: '100,000 gacha', value: 'low', icon: '💰' },
      { label: '100,000 - 130,000', value: 'mid', icon: '💰💰' },
      { label: '130,000+', value: 'high', icon: '💰💰💰' },
      { label: 'Farqi yo\'q, eng yaxshisini', value: 'best', icon: '👑' },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Atirni to\'g\'ri saqlashning 7 sirri',
    excerpt: 'Atiringiz uzoq turishi uchun quyidagi maslahatlarga amal qiling...',
    content: `Atirning saqlanish muddati va hidining o'zgarishi saqlash sharoitiga bog'liq. Quyida atirni to'g'ri saqlashning asosiy qoidalari:

1. **Salqin joyda saqlang** — Atirni quyosh nuri to'g'ridan-to'g'ri tushmaydigan joyda saqlang. Ideal harorat 15-20°C.

2. **Havo o'tkazmaydigan idishda** — Atirni har safar ishlatganingizdan keyin mahkam yuming.

3. **Vannaxonada saqlamang** — Namlik va harorat o'zgarishi atirning tarkibiga zarar yetkazadi.

4. **Original qadoqlaganda saqlang** — Quti atirni ultrabinafsha nurlardan himoya qiladi.

5. **Muzlatgichga qo'ymang** — juda salqin ham zararli.

6. **Boshqa atirlar bilan aralashtirmang** — Har bir atir o'ziga xos muhitda saqlanishi kerak.

7. **Muntazam ishlating** — Ochildan keyin 1-2 yil ichida ishlatish tavsiya etiladi.`,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=400&fit=crop',
    author: 'Xon Atr jamoasi',
    date: '2024-08-15',
    tags: ['maslahat', 'atir saqlash', 'parfyumeriya'],
  },
  {
    id: 'b2',
    title: 'Erkaklar uchun eng yaxshi atirlar top-10',
    excerpt: 'Bu yilgi eng mashhur erkaklar atirlari ro\'yxati...',
    content: `Erkaklar uchun atir tanlash — bu san'at. Sizning shaxsiyatingizga mos atir topish uchun quyidagi ro'yxat bilan tanishing:

1. **Royal Oud** — Nohob va qimmatbaho yog'simon hid
2. **Ocean Breeze** — Dengiz va namlilik
3. **Leather & Spice** — Teri va ziravorlar
4. **Dark Obsession** — Qorong'u va sirli
5. **Sport Active** — Faol hayot tarzi uchun

Har bir atir o'ziga xos xususiyatga ega va turli voqealarga mos keladi.`,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=400&fit=crop',
    author: 'Xon Atr jamoasi',
    date: '2024-08-10',
    tags: ['erkaklar', 'top-10', 'tavsiya'],
  },
  {
    id: 'b3',
    title: 'Atir hidining turlari — Qaysi biri sizga mos?',
    excerpt: 'Atir hidlari turli xil bo\'ladi — gul, yog\'simon, dengiz va boshqalar...',
    content: `Atir hidlari bir nechta asosiy kategoriyaga bo'linadi:

🌸 **Gul hidlari** — Atirgul, yasmin, peoni asosida. Romantik va nafis.

🌊 **Dengiz hidlari** — Tetiklantiruvchi va yangi. Kun bo'yi energiya beradi.

🔥 **Yog'simon hidlari** — Oud, ambra, sandal. Kuchli va uzoq turadi.

🍬 **Shirin hidlari** — Vanil, karamell, shokolad. Yumshoq va jozibali.

🍋 **Sitrus hidlari** — Limon, bergamot, mandarin. Tetik va faol.

Har bir kishi o'ziga mos hidni topishi mumkin. Eng muhimi — sinab ko'ring!`,
    image: 'https://images.unsplash.com/photo-1594035910387-fbbd5583e988?w=800&h=400&fit=crop',
    author: 'Xon Atr jamoasi',
    date: '2024-08-05',
    tags: ['hid turlari', 'maslahat', 'tanlash'],
  },
  {
    id: 'b4',
    title: 'Sovg\'a sifatida atir qanday tanlash kerak?',
    excerpt: 'Sevganlaringizga mukammal sovg\'a topish uchun yo\'riqnoma...',
    content: `Atir — bu eng shaxsiy sovg'alaridan biri. Uni to'g'ri tanlash uchun:

1. **Sevishingizning hidini aniqlang** — U qanday hidlarni yoqtirishini kuzating.

2. **Kategoriyaga qarang** — Erkaklar uchun yoki ayollar uchun?

3. **Vaziyatga moslang** — Kundalikmi yoki maxsus kun uchun?

4. **Hajmni tanlang** — Kichik hajm (50ml) yoki katta (100ml)?

5. **Bizning "Atir tanlay olmayapman" testini topshiring** — 4 ta savolga javob bering, biz sizga eng mos atirni tavsiya qilamiz!`,
    image: 'https://images.unsplash.com/photo-1563170351-604009820082?w=800&h=400&fit=crop',
    author: 'Xon Atr jamoasi',
    date: '2024-07-28',
    tags: ['sovga', 'tanlash', 'maslahat'],
  },
];

export const scentTypes = [
  { id: 'gul', name: 'Gul', icon: '🌸' },
  { id: 'dengiz', name: 'Dengiz', icon: '🌊' },
  { id: 'yog\'simon', name: 'Yog\'simon', icon: '🔥' },
  { id: 'shirin', name: 'Shirin', icon: '🍬' },
  { id: 'sitrus', name: 'Sitrus', icon: '🍋' },
  { id: 'mevali', name: 'Mevali', icon: '🍎' },
];

export const occasions = [
  { id: 'maktab', name: 'Maktab uchun', icon: '📚' },
  { id: 'institut', name: 'Institut/Talabalar', icon: '🎓' },
  { id: 'ish', name: 'Ish/Ofis', icon: '💼' },
  { id: 'uchrashuvlar', name: 'Uchrashuvlar', icon: '🤝' },
];
