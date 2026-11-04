'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, Sparkles, Clock, Flame, Gift, ArrowRight } from 'lucide-react';
import { products, formatPrice, type Product } from '@/data/products';
import { useCartStore } from '@/lib/cart';

interface ProductGridProps {
  showTitle?: boolean;
}

export default function ProductGrid({ showTitle = true }: ProductGridProps) {
  const [addedId, setAddedId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      ragaId: product.ragaId,
      category: product.category,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2200);
  };

  return (
    <section id="shop" className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#F5EBDD] border-t border-[#B38A45]/20 text-[#24160F]">
      <div className="mx-auto max-w-[1440px]">
        {/* Header from Slide 12 */}
        <div className="flex items-center justify-between border-b border-[#24160F]/15 pb-4 mb-12">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
            <span className="font-serif text-lg text-[#B96A2D]">प्रहर</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B96A2D]">
            <span>USAGE & EXTENSIONS</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#24160F] tracking-tight">
            Beyond the bottle.
          </h2>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#B96A2D] mt-2">
            "Wear a prahar. Gift a prahar. Live the ritual."
          </p>
          <div className="mt-4 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#24160F]/70">
            FOR EVERY OCCASION: Perfume 50 ml ₹2,799 • Attar roll-on ₹1,499 • Discovery Set of 5 ₹999
          </div>
        </div>

        {/* Full Collection Banner Image from Slide 12 */}
        <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30 mb-16">
          <Image
            src="/images/extracted/img_p12_1.jpeg"
            alt="PRAHAR Full Collection Lineup of Bottles and Candles"
            fill
            className="object-cover"
          />
        </div>

        {/* The 5 Occasions & Fragrance Formats */}
        <div className="mb-20">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#B96A2D] mb-6">
            The Signature Five Formulations (50ml EDP • ₹2,799)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Bhairav */}
            <div className="p-6 rounded-2xl bg-[#EADBC5]/40 border border-[#B38A45]/20 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-lg transition-all">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B96A2D] block mb-1">
                  01 • 3–6 AM
                </span>
                <h3 className="font-serif text-2xl text-[#24160F]">BHAIRAV</h3>
                <span className="text-xs text-[#24160F]/60 block mb-3">Focus & Mindfulness</span>
                <p className="text-xs text-[#24160F]/75 font-sans leading-relaxed">
                  Meditation, study, slow mornings. Sandalwood, khus, sacred tulsi.
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(products[0])}
                className="mt-6 w-full py-2.5 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {addedId === products[0].id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                <span>{addedId === products[0].id ? 'Added' : 'Add EDP — ₹2,799'}</span>
              </button>
            </div>

            {/* Sarang */}
            <div className="p-6 rounded-2xl bg-[#EADBC5]/40 border border-[#B38A45]/20 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-lg transition-all">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B96A2D] block mb-1">
                  02 • 12–3 PM
                </span>
                <h3 className="font-serif text-2xl text-[#24160F]">SARANG</h3>
                <span className="text-xs text-[#24160F]/60 block mb-3">Energy & Clarity</span>
                <p className="text-xs text-[#24160F]/75 font-sans leading-relaxed">
                  Work, creative days, new beginnings. Neroli, green mango, lemongrass.
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(products[1])}
                className="mt-6 w-full py-2.5 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {addedId === products[1].id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                <span>{addedId === products[1].id ? 'Added' : 'Add EDP — ₹2,799'}</span>
              </button>
            </div>

            {/* Yaman */}
            <div className="p-6 rounded-2xl bg-[#EADBC5]/40 border border-[#B38A45]/20 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-lg transition-all">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B96A2D] block mb-1">
                  03 • 6–9 PM
                </span>
                <h3 className="font-serif text-2xl text-[#24160F]">YAMAN</h3>
                <span className="text-xs text-[#24160F]/60 block mb-3">Romance & Connection</span>
                <p className="text-xs text-[#24160F]/75 font-sans leading-relaxed">
                  Dates, evenings, intimate gatherings. Rajnigandha, mogra, soft amber.
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(products[2])}
                className="mt-6 w-full py-2.5 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {addedId === products[2].id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                <span>{addedId === products[2].id ? 'Added' : 'Add EDP — ₹2,799'}</span>
              </button>
            </div>

            {/* Darbari */}
            <div className="p-6 rounded-2xl bg-[#EADBC5]/40 border border-[#B38A45]/20 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-lg transition-all">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B96A2D] block mb-1">
                  04 • MIDNIGHT
                </span>
                <h3 className="font-serif text-2xl text-[#24160F]">DARBARI</h3>
                <span className="text-xs text-[#24160F]/60 block mb-3">Presence & Power</span>
                <p className="text-xs text-[#24160F]/75 font-sans leading-relaxed">
                  Formal events, important meetings. Opulent oud, royal saffron, rose.
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(products[3])}
                className="mt-6 w-full py-2.5 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {addedId === products[3].id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                <span>{addedId === products[3].id ? 'Added' : 'Add EDP — ₹2,799'}</span>
              </button>
            </div>

            {/* Malhar */}
            <div className="p-6 rounded-2xl bg-[#EADBC5]/40 border border-[#B38A45]/20 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-lg transition-all">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B96A2D] block mb-1">
                  05 • MONSOON
                </span>
                <h3 className="font-serif text-2xl text-[#24160F]">MALHAR</h3>
                <span className="text-xs text-[#24160F]/60 block mb-3">Calm & Renewal</span>
                <p className="text-xs text-[#24160F]/75 font-sans leading-relaxed">
                  Rainy days, self-care, reflection. Kannauj mitti attar, wet greens.
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(products[4])}
                className="mt-6 w-full py-2.5 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {addedId === products[4].id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                <span>{addedId === products[4].id ? 'Added' : 'Add EDP — ₹2,799'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* DIWALI RAGA CANDLES & DISCOVERY SETS (Slide 12) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#EADBC5]/60 border border-[#B38A45]/30">
          <div className="flex flex-col lg:flex-row items-baseline justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B96A2D] block mb-1">
                FESTIVE EXTENSION
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#24160F]">
                DIWALI RAGA CANDLES
              </h3>
            </div>
            <div className="text-xs sm:text-sm font-mono text-[#24160F]/80">
              The same five ragas as candles: <span className="font-bold text-[#B96A2D]">₹1,299 each</span> • Diwali gift box: <span className="font-bold text-[#B96A2D]">₹2,499</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Candle Highlight 1 */}
            <div className="p-6 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/20">
              <Gift className="w-6 h-6 text-[#B96A2D] mb-3" />
              <h4 className="font-serif text-xl font-bold text-[#24160F]">Curated Festive Gift Boxes</h4>
              <p className="text-xs text-[#24160F]/70 font-sans mt-2">
                Handcrafted packaging with gold foil Devanagari lettering and complimentary matchbox.
              </p>
              <button
                onClick={() => handleAddToCart(products.find((p) => p.slug === 'diwali-gift-box') || products[0])}
                className="mt-4 text-xs font-mono uppercase tracking-wider text-[#B96A2D] hover:underline"
              >
                Order Gift Box — ₹2,499 →
              </button>
            </div>

            {/* Candle Highlight 2 */}
            <div className="p-6 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/20">
              <Flame className="w-6 h-6 text-[#B96A2D] mb-3" />
              <h4 className="font-serif text-xl font-bold text-[#24160F]">Soy Wax & Pure Attar Infusion</h4>
              <p className="text-xs text-[#24160F]/70 font-sans mt-2">
                40-hour burn time with crackling wooden wick, filling your home with raga presence.
              </p>
              <button
                onClick={() => handleAddToCart(products.find((p) => p.category === 'candle') || products[0])}
                className="mt-4 text-xs font-mono uppercase tracking-wider text-[#B96A2D] hover:underline"
              >
                Select Single Candle — ₹1,299 →
              </button>
            </div>

            {/* Discovery Set */}
            <div className="p-6 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/20">
              <Sparkles className="w-6 h-6 text-[#B96A2D] mb-3" />
              <h4 className="font-serif text-xl font-bold text-[#24160F]">The Five Ragās Discovery Set</h4>
              <p className="text-xs text-[#24160F]/70 font-sans mt-2">
                Five 2ml spray vials spanning Dawn to Midnight. Includes ₹999 voucher for your first full bottle.
              </p>
              <button
                onClick={() => handleAddToCart(products.find((p) => p.slug === 'discovery-set') || products[0])}
                className="mt-4 text-xs font-mono uppercase tracking-wider text-[#B96A2D] hover:underline"
              >
                Order Discovery Set — ₹999 →
              </button>
            </div>
          </div>
        </div>

        {/* Slide 12 Bottom Signature Bar */}
        <div className="mt-14 pt-4 border-t border-[#24160F]/15 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#24160F]/70">
          <span>PRAHAR प्रहर</span>
          <span className="hidden sm:inline">MADE FOR EVERY HOUR • ROOTED IN INDIA • MORE THAN A PERFUME</span>
          <span>WEAR A PRAHAR. GIFT A PRAHAR.</span>
        </div>
      </div>
    </section>
  );
}
