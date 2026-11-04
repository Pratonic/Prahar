'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { products, type Product } from '@/data/products';

interface ProductGridProps {
  initialCategory?: string;
  showTitle?: boolean;
}

const categories = [
  { id: 'all', label: 'All Creations' },
  { id: 'perfume', label: 'Eau de Parfum' },
  { id: 'attar', label: 'Attar Roll-ons' },
  { id: 'discovery', label: 'Discovery Sets' },
  { id: 'candle', label: 'Raga Candles' },
  { id: 'gift-box', label: 'Diwali Gifts' },
];

export default function ProductGrid({ initialCategory = 'all', showTitle = true }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="shop" className="relative bg-[#F5EBDD] py-24 md:py-32 overflow-hidden border-t border-[#B38A45]/20">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/50 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
                The PRAHAR Collection
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#24160F] tracking-tight leading-[1.15]">
              Beyond the{' '}
              <span className="italic font-normal text-[#B96A2D]">bottle.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#24160F]/70 font-sans leading-relaxed">
              Crafted in small batches with rare botanicals, natural extracts, and centuries of Indian musical soul. 
              Available as Eau de Parfum, alcohol-free Attar, Discovery Sets, and artisanal Soy Candles.
            </p>
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-3">
          <div className="inline-flex items-center p-1.5 bg-[#EADBC5]/60 rounded-full border border-[#B38A45]/20 backdrop-blur-sm max-w-full overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#B38A45] text-white shadow-md font-semibold'
                      : 'text-[#24160F]/70 hover:text-[#24160F] hover:bg-white/40'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#24160F]/10 text-[#24160F]/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
