export interface Product {
  id: string;
  name: string;
  ragaId: string;
  category: 'perfume' | 'attar' | 'discovery' | 'candle' | 'gift-box';
  price: number;
  size: string;
  description: string;
  longDescription: string;
  features: string[];
  inStock: boolean;
  slug: string;
}

export const products: Product[] = [
  // Perfumes (50ml)
  {
    id: 'perf-bhairav',
    name: 'Bhairav — Eau de Parfum',
    ragaId: 'bhairav',
    category: 'perfume',
    price: 2799,
    size: '50ml',
    description: 'A meditative sandalwood fragrance inspired by the dawn raga.',
    longDescription:
      'Bhairav Eau de Parfum captures the sacred stillness of dawn. Opening with tulsi and bergamot, it settles into a meditative heart of sandalwood and frankincense, resting on a base of vetiver and cedarwood. Designed for the hours between 3 AM and 6 AM — the time of awakening.',
    features: [
      'Eau de Parfum concentration',
      '50ml hand-crafted bottle',
      'QR code linking to Raga Bhairav musical experience',
      'Designed for dawn hours (3 AM – 6 AM)',
    ],
    inStock: true,
    slug: 'bhairav-edp',
  },
  {
    id: 'perf-sarang',
    name: 'Sarang — Eau de Parfum',
    ragaId: 'sarang',
    category: 'perfume',
    price: 2799,
    size: '50ml',
    description:
      'A vibrant citrus and green fragrance inspired by the midday raga.',
    longDescription:
      'Sarang Eau de Parfum embodies the full brightness of noon. Neroli and green mango burst open with energy, flowing into a heart of orange blossom and jasmine, settling on white cedar and light musk. Designed for the hours between 12 PM and 3 PM — the time of radiance.',
    features: [
      'Eau de Parfum concentration',
      '50ml hand-crafted bottle',
      'QR code linking to Raga Sarang musical experience',
      'Designed for midday hours (12 PM – 3 PM)',
    ],
    inStock: true,
    slug: 'sarang-edp',
  },
  {
    id: 'perf-yaman',
    name: 'Yaman — Eau de Parfum',
    ragaId: 'yaman',
    category: 'perfume',
    price: 2799,
    size: '50ml',
    description:
      'A romantic floral fragrance inspired by the twilight raga.',
    longDescription:
      'Yaman Eau de Parfum captures the golden hour. Rajnigandha and saffron create a luxurious opening, blooming into a heart of mogra and rose absolute, resting on warm amber and tonka bean. Designed for the hours between 6 PM and 9 PM — the time of romance.',
    features: [
      'Eau de Parfum concentration',
      '50ml hand-crafted bottle',
      'QR code linking to Raga Yaman musical experience',
      'Designed for twilight hours (6 PM – 9 PM)',
    ],
    inStock: true,
    slug: 'yaman-edp',
  },
  {
    id: 'perf-darbari',
    name: 'Darbari — Eau de Parfum',
    ragaId: 'darbari',
    category: 'perfume',
    price: 2799,
    size: '50ml',
    description: 'A regal oud fragrance inspired by the midnight raga.',
    longDescription:
      'Darbari Eau de Parfum channels the grandeur of the Mughal court. Saffron and oud open with commanding presence, leading into a heart of damask rose and incense, settling on deep oud wood and Mysore sandalwood. Designed for the midnight hour — the time of kings.',
    features: [
      'Eau de Parfum concentration',
      '50ml hand-crafted bottle',
      'QR code linking to Raga Darbari musical experience',
      'Designed for midnight hours',
    ],
    inStock: true,
    slug: 'darbari-edp',
  },
  {
    id: 'perf-malhar',
    name: 'Malhar — Eau de Parfum',
    ragaId: 'malhar',
    category: 'perfume',
    price: 2799,
    size: '50ml',
    description:
      'An earthy petrichor fragrance inspired by the monsoon raga.',
    longDescription:
      'Malhar Eau de Parfum captures the first monsoon shower. Kewra and petrichor accord create an evocative opening, flowing into rain-washed jasmine and water lily, grounded with mitti attar and patchouli. Designed for the monsoon — the time of renewal.',
    features: [
      'Eau de Parfum concentration',
      '50ml hand-crafted bottle',
      'QR code linking to Raga Malhar musical experience',
      'Designed for the monsoon season',
    ],
    inStock: true,
    slug: 'malhar-edp',
  },
  // Attar Roll-ons
  {
    id: 'attar-bhairav',
    name: 'Bhairav — Attar Roll-on',
    ragaId: 'bhairav',
    category: 'attar',
    price: 1499,
    size: '10ml',
    description: 'Pure attar roll-on. Sandalwood and tulsi.',
    longDescription:
      'A concentrated attar roll-on capturing the essence of Raga Bhairav in its purest form. Alcohol-free, crafted in the traditional Indian attar style.',
    features: [
      'Pure attar concentration',
      '10ml roll-on applicator',
      'Alcohol-free formulation',
      'Traditional Indian attar craft',
    ],
    inStock: true,
    slug: 'bhairav-attar',
  },
  {
    id: 'attar-sarang',
    name: 'Sarang — Attar Roll-on',
    ragaId: 'sarang',
    category: 'attar',
    price: 1499,
    size: '10ml',
    description: 'Pure attar roll-on. Neroli and green mango.',
    longDescription:
      'A concentrated attar roll-on capturing the essence of Raga Sarang in its purest form. Alcohol-free, crafted in the traditional Indian attar style.',
    features: [
      'Pure attar concentration',
      '10ml roll-on applicator',
      'Alcohol-free formulation',
      'Traditional Indian attar craft',
    ],
    inStock: true,
    slug: 'sarang-attar',
  },
  {
    id: 'attar-yaman',
    name: 'Yaman — Attar Roll-on',
    ragaId: 'yaman',
    category: 'attar',
    price: 1499,
    size: '10ml',
    description: 'Pure attar roll-on. Rajnigandha and mogra.',
    longDescription:
      'A concentrated attar roll-on capturing the essence of Raga Yaman in its purest form. Alcohol-free, crafted in the traditional Indian attar style.',
    features: [
      'Pure attar concentration',
      '10ml roll-on applicator',
      'Alcohol-free formulation',
      'Traditional Indian attar craft',
    ],
    inStock: true,
    slug: 'yaman-attar',
  },
  {
    id: 'attar-darbari',
    name: 'Darbari — Attar Roll-on',
    ragaId: 'darbari',
    category: 'attar',
    price: 1499,
    size: '10ml',
    description: 'Pure attar roll-on. Oud and saffron.',
    longDescription:
      'A concentrated attar roll-on capturing the essence of Raga Darbari in its purest form. Alcohol-free, crafted in the traditional Indian attar style.',
    features: [
      'Pure attar concentration',
      '10ml roll-on applicator',
      'Alcohol-free formulation',
      'Traditional Indian attar craft',
    ],
    inStock: true,
    slug: 'darbari-attar',
  },
  {
    id: 'attar-malhar',
    name: 'Malhar — Attar Roll-on',
    ragaId: 'malhar',
    category: 'attar',
    price: 1499,
    size: '10ml',
    description: 'Pure attar roll-on. Kewra and petrichor.',
    longDescription:
      'A concentrated attar roll-on capturing the essence of Raga Malhar in its purest form. Alcohol-free, crafted in the traditional Indian attar style.',
    features: [
      'Pure attar concentration',
      '10ml roll-on applicator',
      'Alcohol-free formulation',
      'Traditional Indian attar craft',
    ],
    inStock: true,
    slug: 'malhar-attar',
  },
  // Discovery Set
  {
    id: 'discovery-set',
    name: 'The Five Ragās — Discovery Set',
    ragaId: 'all',
    category: 'discovery',
    price: 999,
    size: '5 × 2ml',
    description:
      'Experience all five ragas. Five miniature fragrances in one curated set.',
    longDescription:
      'Begin your PRAHAR journey with the complete Discovery Set. Five individually crafted 2ml vials, each representing a different raga and time of day. The perfect introduction to the world of fragrance and music.',
    features: [
      'Five 2ml sample vials',
      'Includes all five raga fragrances',
      'Premium presentation box',
      'Fragrance guide included',
      'QR codes for all five musical experiences',
    ],
    inStock: true,
    slug: 'discovery-set',
  },
  // Candles
  {
    id: 'candle-bhairav',
    name: 'Bhairav — Raga Candle',
    ragaId: 'bhairav',
    category: 'candle',
    price: 1299,
    size: '200g',
    description: 'Hand-poured soy candle. Sandalwood and frankincense.',
    longDescription:
      'A hand-poured soy wax candle infused with the meditative essence of Raga Bhairav. Sandalwood and frankincense fill the room with dawn-like tranquillity. Burn time approximately 40 hours.',
    features: [
      'Hand-poured soy wax',
      '200g net weight',
      'Approx. 40-hour burn time',
      'Cotton wick',
      'Reusable ceramic vessel',
    ],
    inStock: true,
    slug: 'bhairav-candle',
  },
  {
    id: 'candle-yaman',
    name: 'Yaman — Raga Candle',
    ragaId: 'yaman',
    category: 'candle',
    price: 1299,
    size: '200g',
    description: 'Hand-poured soy candle. Rajnigandha and amber.',
    longDescription:
      'A hand-poured soy wax candle infused with the romantic essence of Raga Yaman. Rajnigandha and warm amber create the perfect twilight atmosphere. Burn time approximately 40 hours.',
    features: [
      'Hand-poured soy wax',
      '200g net weight',
      'Approx. 40-hour burn time',
      'Cotton wick',
      'Reusable ceramic vessel',
    ],
    inStock: true,
    slug: 'yaman-candle',
  },
  {
    id: 'candle-darbari',
    name: 'Darbari — Raga Candle',
    ragaId: 'darbari',
    category: 'candle',
    price: 1299,
    size: '200g',
    description: 'Hand-poured soy candle. Oud and rose.',
    longDescription:
      'A hand-poured soy wax candle infused with the regal essence of Raga Darbari. Oud and damask rose transform any space into a midnight court. Burn time approximately 40 hours.',
    features: [
      'Hand-poured soy wax',
      '200g net weight',
      'Approx. 40-hour burn time',
      'Cotton wick',
      'Reusable ceramic vessel',
    ],
    inStock: true,
    slug: 'darbari-candle',
  },
  // Gift Box
  {
    id: 'gift-diwali',
    name: 'The Diwali Collection — Gift Box',
    ragaId: 'all',
    category: 'gift-box',
    price: 2499,
    size: '3 candles',
    description:
      'Three raga candles in a premium gift box. Perfect for Diwali.',
    longDescription:
      'A curated Diwali gift box featuring three raga candles — Bhairav, Yaman and Darbari. Presented in a handcrafted box with gold foil detailing, this collection makes for a meaningful celebration gift.',
    features: [
      'Three 200g raga candles',
      'Bhairav, Yaman and Darbari',
      'Premium gift box with gold foil',
      'Includes fragrance guide',
      'Gift wrapping included',
    ],
    inStock: true,
    slug: 'diwali-gift-box',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByRaga(ragaId: string): Product[] {
  return products.filter((p) => p.ragaId === ragaId || p.ragaId === 'all');
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
