'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Volume2, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { ragas } from '@/data/ragas';
import { products, formatPrice } from '@/data/products';
import { useCartStore } from '@/lib/cart';

export default function FragrancesPage() {
  const [addedId, setAddedId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (ragaId: string) => {
    const matchingProduct = products.find(
      (p) => p.ragaId === ragaId && p.category === 'perfume'
    );
    if (matchingProduct) {
      addItem({
        productId: matchingProduct.id,
        name: matchingProduct.name,
        price: matchingProduct.price,
        size: matchingProduct.size,
        ragaId: matchingProduct.ragaId,
        category: matchingProduct.category,
      });
      setAddedId(ragaId);
      setTimeout(() => setAddedId(null), 2200);
    }
  };

  return (
    <div className="pt-28 pb-32 bg-[#F5EBDD] min-h-screen">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
              The Quintessential Collection
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#24160F] tracking-tight leading-[1.1]">
            The Five <span className="italic font-normal text-[#B96A2D]">Ragās.</span>
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#B96A2D] mt-4">
            "Five hours. Five emotions. Five fragrances you can hear."
          </p>

          <p className="mt-6 text-base sm:text-lg text-[#24160F]/75 font-sans leading-relaxed">
            In Indian classical musicology, a raga is never merely a scale; it is an organic spiritual entity 
            with a personality, a season, and an assigned hour of performance. PRAHAR decodes these sonic 
            blueprints into haute perfumery.
          </p>
        </div>

        {/* Detailed Vertical Editorial Showcase for Each Raga */}
        <div className="space-y-24">
          {ragas.map((raga, index) => {
            const product = products.find(
              (p) => p.ragaId === raga.id && p.category === 'perfume'
            );
            const isReversed = index % 2 === 1;

            return (
              <motion.article
                key={raga.id}
                id={raga.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#EADBC5]/40 rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#B38A45]/30 shadow-lg ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Flask Stage */}
                <div
                  className={`lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px] rounded-2xl overflow-hidden bg-[#17131D] p-8 ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${raga.colors.gradient} opacity-85`}
                  />

                  {/* Ambient Mood Graphic */}
                  <div className="absolute top-8 right-8 text-6xl opacity-30 select-none">
                    {raga.icon}
                  </div>

                  {/* Bottle Silhouette */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-10 rounded-t-md bg-gradient-to-r from-[#8B6914] via-[#D6B77C] to-[#8B6914] shadow-md border border-white/20" />
                    <div className="w-8 h-3 bg-[#B38A45] border-y border-[#24160F]/50" />
                    <div className="relative w-44 sm:w-48 h-64 sm:h-68 rounded-b-3xl rounded-t-xl bg-gradient-to-b from-white/25 via-white/10 to-black/40 backdrop-blur-md border border-white/30 shadow-2xl flex flex-col justify-between p-6 items-center">
                      <div
                        className="absolute inset-x-2 bottom-2 top-8 rounded-b-2xl opacity-40 blur-xs"
                        style={{ backgroundColor: raga.colors.primary }}
                      />
                      <div className="relative z-10 w-full py-4 px-3 bg-[#F5EBDD]/90 rounded border border-[#B38A45]/40 text-center shadow">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-[#B96A2D] font-mono">
                          PRAHAR • {raga.number}
                        </span>
                        <h3 className="font-serif text-2xl text-[#24160F] tracking-wide mt-1">
                          {raga.name}
                        </h3>
                        <span className="block text-xs text-[#24160F]/60">
                          {raga.nameDevanagari}
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 bg-black/50 rounded-full border border-white/20 text-[10px] text-white/90">
                        <Volume2 className="w-3 h-3 text-[#D6B77C]" />
                        <span>Interactive Audio Tag</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Badge */}
                  <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs text-white/90">
                    <Clock className="w-3.5 h-3.5 text-[#D6B77C]" />
                    <span>{raga.time}</span>
                  </div>
                </div>

                {/* Editorial Content */}
                <div className={`lg:col-span-7 flex flex-col justify-center ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-[#B38A45]/20 text-[#B96A2D] border border-[#B38A45]/30">
                      Raga {raga.number}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#24160F]/60 font-sans">
                      Time of {raga.timeRange}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 mt-3">
                    <h2 className="font-serif text-4xl sm:text-5xl text-[#24160F] tracking-tight">
                      {raga.name}
                    </h2>
                    <span className="font-serif text-3xl text-[#B96A2D]">
                      {raga.nameDevanagari}
                    </span>
                  </div>

                  <p className="font-serif italic text-2xl text-[#B96A2D] mt-2">
                    "{raga.character}"
                  </p>

                  <p className="mt-4 text-[#24160F]/80 text-base sm:text-lg leading-relaxed font-sans">
                    {raga.longDescription}
                  </p>

                  {/* Notes Grid */}
                  <div className="mt-8 pt-6 border-t border-[#24160F]/15">
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#B38A45] mb-4">
                      Fragrance Architecture
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-[#F5EBDD] p-3.5 rounded-xl border border-[#B38A45]/20">
                        <span className="text-[11px] uppercase tracking-wider text-[#B96A2D] font-semibold block mb-1">
                          Top Notes
                        </span>
                        <p className="text-xs text-[#24160F]/80">
                          {raga.fragranceNotes.top.join(', ')}
                        </p>
                      </div>

                      <div className="bg-[#F5EBDD] p-3.5 rounded-xl border border-[#B38A45]/20">
                        <span className="text-[11px] uppercase tracking-wider text-[#B96A2D] font-semibold block mb-1">
                          Heart Notes
                        </span>
                        <p className="text-xs text-[#24160F]/80">
                          {raga.fragranceNotes.heart.join(', ')}
                        </p>
                      </div>

                      <div className="bg-[#F5EBDD] p-3.5 rounded-xl border border-[#B38A45]/20">
                        <span className="text-[11px] uppercase tracking-wider text-[#B96A2D] font-semibold block mb-1">
                          Base Notes
                        </span>
                        <p className="text-xs text-[#24160F]/80">
                          {raga.fragranceNotes.base.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={() => handleAddToCart(raga.id)}
                      className="flex-1 py-4 px-8 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                    >
                      {addedId === raga.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add Eau de Parfum — {product ? formatPrice(product.price) : '₹2,799'}</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/experience/${raga.id}`}
                      className="py-4 px-6 rounded-full border border-[#24160F]/30 hover:border-[#B38A45] hover:text-[#B96A2D] text-xs uppercase tracking-[0.2em] font-semibold text-[#24160F] flex items-center justify-center gap-2 transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-[#B38A45]" />
                      <span>Experience Soundtrack</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
