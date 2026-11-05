'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Clock, Check, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { ragas, type Raga } from '@/data/ragas';
import { products, formatPrice } from '@/data/products';
import { useCartStore } from '@/lib/cart';
import { useAudioStore } from '@/lib/audio';

export default function RagaExplorer() {
  const [selectedRagaId, setSelectedRagaId] = useState('bhairav');
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const isAudioPlaying = useAudioStore((s) => s.isPlaying);
  const currentAudioRagaId = useAudioStore((s) => s.currentRagaId);
  const playRaga = useAudioStore((s) => s.playRaga);
  const togglePlay = useAudioStore((s) => s.togglePlay);

  const activeRaga = ragas.find((r) => r.id === selectedRagaId) || ragas[0];
  const matchingProduct = products.find(
    (p) => p.ragaId === activeRaga.id && p.category === 'perfume'
  );

  const isCurrentRagaPlaying = isAudioPlaying && currentAudioRagaId === activeRaga.id;

  const handleAudioClick = (ragaId: string) => {
    if (isAudioPlaying && currentAudioRagaId === ragaId) {
      togglePlay();
    } else {
      playRaga(ragaId);
    }
  };

  const handleAddToCart = () => {
    if (matchingProduct) {
      addItem({
        productId: matchingProduct.id,
        name: matchingProduct.name,
        price: matchingProduct.price,
        size: matchingProduct.size,
        ragaId: matchingProduct.ragaId,
        category: matchingProduct.category,
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2200);
    }
  };

  return (
    <section id="ragas" className="relative py-28 lg:py-36 px-5 sm:px-10 lg:px-16 bg-[#F5EBDD] border-t border-[#B38A45]/20 text-[#24160F]">
      <div className="mx-auto max-w-[1440px]">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
              The Five Sacred Movements
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#24160F] tracking-tight leading-[1.08]">
            Five ragas. Five hours.{' '}
            <span className="italic font-normal text-[#B96A2D] block sm:inline">
              Five scents you can hear.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#24160F]/75 font-sans leading-relaxed">
            Select any movement to tune your environment. Every fragrance is harmonized with its dedicated raga composition and time of day.
          </p>
        </div>

        {/* Interactive Horizontal Timeline Navigation Bar */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-16 gap-2 sm:gap-3 scrollbar-none">
          {ragas.map((raga) => {
            const isSelected = raga.id === selectedRagaId;
            return (
              <button
                key={raga.id}
                onClick={() => setSelectedRagaId(raga.id)}
                className={`px-5 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#B38A45] text-white shadow-lg font-semibold'
                    : 'bg-[#EADBC5]/60 text-[#24160F]/70 hover:bg-[#EADBC5] hover:text-[#24160F]'
                }`}
              >
                <span>{raga.number} • {raga.name}</span>
                <span className="text-[10px] opacity-75">({raga.time})</span>
              </button>
            );
          })}
        </div>

        {/* Main Stage Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#EADBC5]/30 rounded-3xl p-6 sm:p-12 lg:p-16 border border-[#B38A45]/25 shadow-xl">
          {/* Left: Atmospheric Vessel Showcase */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-[#B38A45]/30 group">
            <Image
              src="/images/extracted/img_p8_1.jpeg"
              alt="PRAHAR 24-Hour Time Dial and Bottle"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Floating Now-Playing Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#17131D]/85 backdrop-blur-md border border-white/20 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6B77C]">
                    Raga {activeRaga.number} • {activeRaga.time}
                  </span>
                  {isCurrentRagaPlaying && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <h4 className="font-serif text-2xl text-white mt-0.5">
                  {activeRaga.name} ({activeRaga.nameDevanagari})
                </h4>
              </div>

              <button
                onClick={() => handleAudioClick(activeRaga.id)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B38A45] to-[#D6B77C] text-[#17131D] text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow"
              >
                {isCurrentRagaPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                <span>{isCurrentRagaPlaying ? 'Pause Audio' : 'Play Music'}</span>
              </button>
            </div>
          </div>

          {/* Right: Olfactory Notes, Story & Purchasing */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-[#B38A45]/20 text-[#B96A2D] border border-[#B38A45]/30">
                Movement {activeRaga.number}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#24160F]/60 font-sans">
                {activeRaga.timeRange}
              </span>
            </div>

            <div className="flex items-baseline gap-4 mt-3">
              <h3 className="font-serif text-4xl sm:text-5xl text-[#24160F] tracking-tight">
                {activeRaga.name}
              </h3>
              <span className="font-serif text-3xl text-[#B96A2D]">
                {activeRaga.nameDevanagari}
              </span>
            </div>

            <p className="font-serif italic text-2xl text-[#B96A2D] mt-2">
              "{activeRaga.character}"
            </p>

            <p className="mt-4 text-[#24160F]/80 text-base sm:text-lg leading-relaxed font-sans">
              {activeRaga.longDescription}
            </p>

            {/* Notes Pyramid */}
            <div className="mt-8 pt-6 border-t border-[#24160F]/15">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B38A45] block mb-3">
                Olfactory Accord Structure
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#F5EBDD] p-3 rounded-xl border border-[#B38A45]/20">
                  <span className="text-[10px] uppercase font-mono text-[#B96A2D] font-bold block mb-1">
                    Top
                  </span>
                  <span className="text-xs text-[#24160F]/80">{activeRaga.fragranceNotes.top.join(', ')}</span>
                </div>
                <div className="bg-[#F5EBDD] p-3 rounded-xl border border-[#B38A45]/20">
                  <span className="text-[10px] uppercase font-mono text-[#B96A2D] font-bold block mb-1">
                    Heart
                  </span>
                  <span className="text-xs text-[#24160F]/80">{activeRaga.fragranceNotes.heart.join(', ')}</span>
                </div>
                <div className="bg-[#F5EBDD] p-3 rounded-xl border border-[#B38A45]/20">
                  <span className="text-[10px] uppercase font-mono text-[#B96A2D] font-bold block mb-1">
                    Base
                  </span>
                  <span className="text-xs text-[#24160F]/80">{activeRaga.fragranceNotes.base.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Add to Bag Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-8 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Add 50ml EDP — {matchingProduct ? formatPrice(matchingProduct.price) : '₹2,799'}</span>
                  </>
                )}
              </button>

              <Link
                href={`/experience/${activeRaga.id}`}
                className="py-4 px-6 rounded-full border border-[#24160F]/30 hover:border-[#B38A45] hover:text-[#B96A2D] text-xs uppercase tracking-[0.2em] font-semibold text-[#24160F] flex items-center justify-center gap-2 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-[#B38A45]" />
                <span>Dedicated Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
