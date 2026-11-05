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
          {/* Left: Atmospheric Vessel Showcase (100% Bespoke Stage, No Cut-Off Slide) */}
          <div className="lg:col-span-6 relative min-h-[520px] sm:min-h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30 bg-[#120F17] flex flex-col justify-between p-6 sm:p-8">
            {/* Dynamic Ambient Aura matched to the raga's soul */}
            <div
              className="absolute inset-0 opacity-40 transition-all duration-1000 blur-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${activeRaga.colors.primary} 0%, transparent 70%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

            {/* Top Bar: Movement Badge + Live 24-Hour Prahar Dial */}
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/10 text-[#D6B77C] border border-white/15">
                  <Clock className="w-3 h-3 text-[#D6B77C]" />
                  <span>PRAHAR {activeRaga.number} • {activeRaga.time}</span>
                </span>
                <span className="block font-serif text-xs text-white/60 mt-1.5 tracking-wider">
                  {activeRaga.timeRange}
                </span>
              </div>

              {/* Native SVG 24-Hour Solar Chronometer */}
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 100 100">
                  {/* Outer 24-hr dial circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="3"
                  />
                  {/* Cardinal hour markers */}
                  <circle cx="92" cy="50" r="2" fill="rgba(214,183,124,0.6)" />
                  <circle cx="50" cy="92" r="2" fill="rgba(214,183,124,0.6)" />
                  <circle cx="8" cy="50" r="2" fill="rgba(214,183,124,0.6)" />
                  <circle cx="50" cy="8" r="2" fill="rgba(214,183,124,0.6)" />
                  {/* Active Prahar Highlight Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#D6B77C"
                    strokeWidth="6"
                    strokeDasharray="66 198"
                    strokeDashoffset={
                      activeRaga.id === 'bhairav'
                        ? '-33'
                        : activeRaga.id === 'sarang'
                        ? '-132'
                        : activeRaga.id === 'yaman'
                        ? '-198'
                        : activeRaga.id === 'darbari'
                        ? '0'
                        : '-99'
                    }
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="text-right">
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-white/50">
                    Circadian
                  </span>
                  <span className="block text-xs font-mono font-bold text-[#D6B77C]">
                    {activeRaga.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Pure High-Res PRAHAR Perfume Bottle with Gentle Floating Physics */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-6">
              <motion.div
                key={activeRaga.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative flex items-center justify-center"
              >
                {/* Glowing pedestal aura */}
                <div
                  className="absolute bottom-4 w-44 h-10 rounded-full blur-xl opacity-60"
                  style={{ backgroundColor: activeRaga.colors.primary }}
                />

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  className="relative w-48 sm:w-56 h-72 sm:h-80 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                >
                  <Image
                    src="/images/extracted/img_p1_2.png"
                    alt={`PRAHAR ${activeRaga.name} Eau de Parfum`}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom: Interactive Audio Controller & Waveform */}
            <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="min-w-0 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6B77C]">
                    Raga {activeRaga.number} • {activeRaga.mood}
                  </span>
                  {isCurrentRagaPlaying && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-white mt-0.5 truncate">
                  {activeRaga.name} <span className="text-[#D6B77C] font-normal font-serif">({activeRaga.nameDevanagari})</span>
                </h4>
              </div>

              {/* Animated Waveform Equalizer when playing */}
              <div className="flex items-center gap-3">
                {isCurrentRagaPlaying && (
                  <div className="hidden sm:flex items-end gap-1 h-5 px-2">
                    {[6, 14, 18, 10, 16, 8, 12].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: ['4px', `${h}px`, '4px'] }}
                        transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: 'easeInOut' }}
                        className="w-1 bg-[#D6B77C] rounded-full"
                      />
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handleAudioClick(activeRaga.id)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B38A45] to-[#D6B77C] hover:brightness-110 text-[#17131D] text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  {isCurrentRagaPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause Track</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      <span>Play Raga Sound</span>
                    </>
                  )}
                </button>
              </div>
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
