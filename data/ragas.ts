export interface Raga {
  id: string;
  name: string;
  nameDevanagari: string;
  number: string;
  time: string;
  timeRange: string;
  mood: string;
  character: string;
  fragranceNotes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string;
  longDescription: string;
  visualDirection: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  image: string;
  icon: string;
}

export const ragas: Raga[] = [
  {
    id: 'bhairav',
    name: 'Bhairav',
    nameDevanagari: 'भैरव',
    number: '01',
    time: '3 AM – 6 AM',
    timeRange: 'Dawn',
    mood: 'Awakening',
    character: 'Sandalwood, tulsi and a meditative atmosphere.',
    fragranceNotes: {
      top: ['Tulsi leaf', 'Bergamot', 'Cardamom'],
      heart: ['Sandalwood', 'Frankincense', 'Jasmine sambac'],
      base: ['Vetiver', 'Cedarwood', 'White musk'],
    },
    description:
      'The first light breaks through silence. Bhairav captures the sacred stillness of dawn — meditative, grounding, awakening.',
    longDescription:
      'In the tradition of Indian classical music, Raga Bhairav is performed at the break of dawn. It carries a profound sense of devotion and introspection. This fragrance translates that spiritual awakening into sandalwood and tulsi, grounded with vetiver — a scent that feels like the first breath of morning.',
    visualDirection:
      'Sunrise, temple architecture, warm morning light and earthy tones.',
    colors: {
      primary: '#D4A574',
      secondary: '#8B6914',
      accent: '#F5DEB3',
      gradient: 'from-amber-900/80 via-orange-800/60 to-yellow-700/40',
    },
    image: '/images/bhairav.jpg',
    icon: '🌅',
  },
  {
    id: 'sarang',
    name: 'Sarang',
    nameDevanagari: 'सारंग',
    number: '02',
    time: '12 PM – 3 PM',
    timeRange: 'Midday',
    mood: 'Brightness',
    character: 'Neroli, green mango and invigorating freshness.',
    fragranceNotes: {
      top: ['Neroli', 'Green mango', 'Lemon zest'],
      heart: ['Orange blossom', 'Jasmine', 'Green tea'],
      base: ['White cedar', 'Ambrette', 'Light musk'],
    },
    description:
      'The sun at its zenith. Sarang is the scent of full brightness — vibrant, fresh, alive with the energy of an Indian afternoon.',
    longDescription:
      'Raga Sarang is traditionally performed at high noon, embodying the full intensity of the midday sun. This fragrance captures that radiant energy through neroli and green mango, balanced with orange blossom — a scent that feels like sunlight on warm skin.',
    visualDirection:
      'Bright sunlight, greenery and vibrant Indian summer landscapes.',
    colors: {
      primary: '#7CB342',
      secondary: '#F9A825',
      accent: '#DCEDC8',
      gradient: 'from-green-800/60 via-yellow-700/40 to-amber-500/30',
    },
    image: '/images/sarang.jpg',
    icon: '☀️',
  },
  {
    id: 'yaman',
    name: 'Yaman',
    nameDevanagari: 'यमन',
    number: '03',
    time: '6 PM – 9 PM',
    timeRange: 'Twilight',
    mood: 'Romance',
    character: 'Rajnigandha, mogra and soft amber.',
    fragranceNotes: {
      top: ['Rajnigandha (tuberose)', 'Saffron', 'Pink pepper'],
      heart: ['Mogra (jasmine)', 'Rose absolute', 'Ylang ylang'],
      base: ['Amber', 'Tonka bean', 'Vanilla orchid'],
    },
    description:
      'The golden hour descends. Yaman is the fragrance of twilight romance — warm, floral, intimate, like an evening raga played by candlelight.',
    longDescription:
      'Raga Yaman is the quintessential evening raga, known for its romantic and serene character. This fragrance translates that twilight beauty into rajnigandha and mogra, warmed with amber — a scent that feels like the last golden rays of sunset.',
    visualDirection:
      'Sunset, warm amber lighting, flowers and romantic architecture.',
    colors: {
      primary: '#E65100',
      secondary: '#BF360C',
      accent: '#FFE0B2',
      gradient: 'from-orange-900/70 via-red-800/50 to-amber-600/40',
    },
    image: '/images/yaman.jpg',
    icon: '🌇',
  },
  {
    id: 'darbari',
    name: 'Darbari',
    nameDevanagari: 'दरबारी',
    number: '04',
    time: 'Midnight',
    timeRange: 'Night',
    mood: 'Regal',
    character: 'Oud, saffron and rose.',
    fragranceNotes: {
      top: ['Saffron', 'Black pepper', 'Oud'],
      heart: ['Damask rose', 'Incense', 'Labdanum'],
      base: ['Oud wood', 'Amber', 'Mysore sandalwood'],
    },
    description:
      'The court convenes at midnight. Darbari is the fragrance of kings — opulent, deep, commanding, a raga that once filled Mughal palaces.',
    longDescription:
      'Raga Darbari Kanada was the court raga of Emperor Akbar, performed by the legendary Tansen at midnight. This fragrance captures that royal grandeur through oud and saffron, deepened with damask rose — a scent that feels like walking through a moonlit palace.',
    visualDirection:
      'Dark palace interiors, deep shadows and luxurious gold details.',
    colors: {
      primary: '#1A1A2E',
      secondary: '#16213E',
      accent: '#D4AF37',
      gradient: 'from-indigo-950/90 via-slate-900/70 to-amber-900/50',
    },
    image: '/images/darbari.jpg',
    icon: '🌙',
  },
  {
    id: 'malhar',
    name: 'Malhar',
    nameDevanagari: 'मल्हार',
    number: '05',
    time: 'Monsoon',
    timeRange: 'Rain',
    mood: 'Renewal',
    character: 'Kewra, green notes and a rain-inspired atmosphere.',
    fragranceNotes: {
      top: ['Kewra (pandanus)', 'Petrichor accord', 'Green leaves'],
      heart: ['Rain-washed jasmine', 'Water lily', 'Vetiver'],
      base: ['Wet earth (mitti attar)', 'Patchouli', 'Damp wood'],
    },
    description:
      'The first rain arrives. Malhar is the fragrance of the monsoon — earthy, green, alive with the promise of renewal and the scent of rain on dry earth.',
    longDescription:
      'Raga Malhar has been associated with the monsoon for centuries, believed to have the power to summon rain. This fragrance captures that primal connection through kewra and petrichor, grounded with mitti attar — a scent that feels like the first monsoon shower on parched earth.',
    visualDirection: 'Rainfall, wet stone, forests and monsoon landscapes.',
    colors: {
      primary: '#2E7D32',
      secondary: '#1B5E20',
      accent: '#A5D6A7',
      gradient: 'from-emerald-900/80 via-teal-800/60 to-green-700/40',
    },
    image: '/images/malhar.jpg',
    icon: '🌧️',
  },
];

export function getRagaById(id: string): Raga | undefined {
  return ragas.find((r) => r.id === id);
}

export function getRagaByTime(hour: number): Raga {
  if (hour >= 3 && hour < 6) return ragas[0]; // Bhairav
  if (hour >= 12 && hour < 15) return ragas[1]; // Sarang
  if (hour >= 18 && hour < 21) return ragas[2]; // Yaman
  if (hour >= 0 && hour < 3) return ragas[3]; // Darbari (midnight)
  if (hour >= 21) return ragas[3]; // Darbari
  // Default based on closest
  if (hour >= 6 && hour < 9) return ragas[0]; // Morning → Bhairav
  if (hour >= 9 && hour < 12) return ragas[1]; // Late morning → Sarang
  if (hour >= 15 && hour < 18) return ragas[2]; // Afternoon → Yaman
  return ragas[4]; // Malhar as default
}
