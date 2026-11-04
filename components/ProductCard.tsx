'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, Sparkles, Volume2 } from 'lucide-react';
import { type Product, formatPrice } from '@/data/products';
import { getRagaById } from '@/data/ragas';
import { useCartStore } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const raga = getRagaById(product.ragaId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      ragaId: product.ragaId,
      category: product.category,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const getCategoryLabel = (category: Product['category']) => {
    switch (category) {
      case 'perfume':
        return 'Eau de Parfum';
      case 'attar':
        return 'Pure Attar Roll-on';
      case 'discovery':
        return 'Curated Set';
      case 'candle':
        return 'Scented Candle';
      case 'gift-box':
        return 'Diwali Edition';
      default:
        return 'Fragrance';
    }
  };

  // Background styling based on raga or collection
  const cardGradient = raga
    ? raga.colors.gradient
    : 'from-amber-950/80 via-stone-900/60 to-yellow-900/40';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#EADBC5]/30 border border-[#B38A45]/20 hover:border-[#B38A45]/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link href={`/shop/${product.slug}`} className="block p-5 sm:p-6 flex-1 flex flex-col">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#B96A2D] bg-[#F5EBDD] px-2.5 py-1 rounded-full border border-[#B38A45]/20">
            {getCategoryLabel(product.category)}
          </span>
          <span className="text-xs font-mono text-[#24160F]/60">
            {product.size}
          </span>
        </div>

        {/* Product Visual Container */}
        <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-[#17131D] flex items-center justify-center p-6 shadow-inner group-hover:shadow-2xl transition-all">
          {/* Raga atmospheric gradient */}
          <div className={`absolute inset-0 bg-gradient-to-b ${cardGradient} opacity-80 group-hover:opacity-95 transition-opacity duration-500`} />

          {/* Decorative ambient ring */}
          <div className="absolute w-40 h-40 rounded-full border border-white/10 group-hover:scale-110 transition-transform duration-700" />

          {/* Minimalist Luxury Vessel Architecture */}
          {product.category === 'candle' || product.category === 'gift-box' ? (
            // Candle shape
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-1.5 h-3 bg-amber-200 rounded-full blur-[1px] animate-pulse mb-1 shadow-[0_0_8px_#F5DEB3]" />
              <div className="w-24 sm:w-28 h-28 sm:h-32 rounded-lg bg-gradient-to-b from-stone-200/90 via-stone-300/80 to-stone-400/90 shadow-2xl border border-white/40 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#B96A2D]">
                  PRAHAR
                </span>
                <span className="font-serif text-sm font-semibold text-[#24160F] truncate w-full mt-1">
                  {raga ? raga.name : 'Candle'}
                </span>
                <span className="text-[9px] text-[#24160F]/60 mt-1">Soy Wax</span>
              </div>
              <div className="w-28 h-2 rounded-full bg-black/50 blur-xs mt-2" />
            </div>
          ) : (
            // Perfume / Attar Bottle shape
            <div className="relative z-10 flex flex-col items-center">
              {/* Cap */}
              <div className="w-9 h-6 rounded-t-sm bg-gradient-to-r from-[#8B6914] via-[#D6B77C] to-[#8B6914] shadow-sm border border-white/20" />
              <div className="w-5 h-1.5 bg-[#B38A45]" />
              {/* Bottle */}
              <div className="relative w-24 sm:w-28 h-36 sm:h-40 rounded-b-xl rounded-t-sm bg-gradient-to-b from-white/25 via-white/10 to-black/50 backdrop-blur-sm border border-white/30 shadow-2xl flex flex-col items-center justify-center p-2.5 text-center">
                <div
                  className="absolute inset-1 rounded-b-lg opacity-40 blur-xs"
                  style={{ backgroundColor: raga?.colors.primary || '#D6B77C' }}
                />
                <div className="relative z-10 w-full py-2 px-1 bg-[#F5EBDD]/90 rounded border border-[#B38A45]/30 shadow">
                  <span className="block text-[8px] tracking-[0.25em] uppercase text-[#B96A2D] font-mono">
                    PRAHAR
                  </span>
                  <span className="block font-serif text-xs font-semibold text-[#24160F] truncate">
                    {raga ? raga.name : 'Discovery'}
                  </span>
                  <span className="block text-[7px] text-[#24160F]/60">
                    {raga ? raga.nameDevanagari : '5 Ragās'}
                  </span>
                </div>
              </div>
              <div className="w-24 h-2 rounded-full bg-black/60 blur-xs mt-2" />
            </div>
          )}

          {/* Raga time tag */}
          {raga && (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
              <Volume2 className="w-2.5 h-2.5 text-[#D6B77C]" />
              <span>{raga.time}</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="mt-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#24160F] tracking-tight group-hover:text-[#B96A2D] transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-[#24160F]/70 font-sans line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#24160F]/10 flex items-baseline justify-between">
            <span className="font-serif text-2xl font-semibold text-[#B38A45]">
              {formatPrice(product.price)}
            </span>
            <span className="text-[11px] text-[#24160F]/50 font-sans">
              Free Express Delivery
            </span>
          </div>
        </div>
      </Link>

      {/* Add To Bag Action */}
      <div className="p-5 sm:p-6 pt-0">
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 px-4 rounded-xl font-sans text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
            isAdded
              ? 'bg-emerald-700 text-white'
              : 'bg-[#B38A45] hover:bg-[#8B6914] text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
