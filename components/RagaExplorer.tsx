'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Clock, Check, ShoppingBag, ArrowRight } from 'lucide-react';
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
    <section id="ragas" className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#F5EBDD] border-t border-[#B38A45]/20">
      <div className="mx-auto max-w-[1440px]">
        {/* Header from Slide 8 */}
        <div className="flex items-center justify-between border-b border-[#24160F]/15 pb-4 mb-12">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
            <span className="font-serif text-lg text-[#B96A2D]">प्रहर</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B96A2D]">
            <Clock className="w-3.5 h-3.5" />
            <span>08:00 • THE FIVE HOURS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Headline & 5 Ragas List */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#24160F] tracking-tight leading-[1.1]">
              Five ragas, five hours,{' '}
              <span className="italic font-normal text-[#B96A2D] block">
                five scents you can hear.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#24160F]/80 font-sans leading-relaxed">
              Each fragrance is built around the mood of a raga, crafted for a specific hour of the day. 
              Click any raga to hear its dedicated audio track.
            </p>

            {/* The 5 Ragas Interactive Selector from Slide 8 */}
            <div className="mt-8 space-y-3">
              {ragas.map((raga) => {
                const isSelected = raga.id === selectedRagaId;
                const isPlayingThis = isAudioPlaying && currentAudioRagaId === raga.id;

                return (
                  <div
                    key={raga.id}
                    onClick={() => setSelectedRagaId(raga.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#EADBC5] border-[#B38A45] shadow-md'
                        : 'bg-[#EADBC5]/30 border-[#B38A45]/20 hover:bg-[#EADBC5]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      {/* Play/Pause icon button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAudioClick(raga.id);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isPlayingThis
                            ? 'bg-[#B38A45] text-white shadow-md'
                            : 'bg-[#F5EBDD] text-[#B96A2D] hover:scale-110'
                        }`}
                        aria-label={isPlayingThis ? 'Pause Audio' : 'Play Audio'}
                      >
                        {isPlayingThis ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#24160F]">
                            {raga.name.toUpperCase()}
                          </span>
                          <span className="text-xs font-mono text-[#B38A45]">
                            {raga.time}
                          </span>
                        </div>
                        <div className="text-xs text-[#24160F]/70 font-sans truncate">
                          <span className="font-medium text-[#24160F]">{raga.mood}</span> • {raga.character}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAudioClick(raga.id);
                      }}
                      className="shrink-0 text-xs font-mono uppercase tracking-wider text-[#B96A2D] hover:text-[#8B6914] flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {isPlayingThis ? 'Playing...' : 'Hear Track'}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-xs font-sans italic text-[#24160F]/60">
              *Our attars are layered blends of several oils, not single-note oils.
            </p>
          </div>

          {/* Right: Real High-Definition Slide 8 Visual with Dial & Stone */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full h-[460px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30 group">
              <Image
                src="/images/extracted/img_p8_1.jpeg"
                alt="24-Hour Circular Dial with Prahar Bottle"
                fill
                className="object-cover"
              />

              {/* Live Overlay for Currently Selected Raga */}
              <div className="absolute inset-x-4 bottom-4 p-5 rounded-2xl bg-[#17131D]/90 backdrop-blur-md border border-[#B38A45]/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D6B77C]">
                      Raga {activeRaga.number} • {activeRaga.time}
                    </span>
                    {isCurrentRagaPlaying && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <h3 className="font-serif text-2xl text-white mt-0.5">
                    {activeRaga.name} ({activeRaga.nameDevanagari})
                  </h3>
                  <p className="text-xs text-white/70 font-sans mt-0.5">
                    {activeRaga.character}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleAudioClick(activeRaga.id)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {isCurrentRagaPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isCurrentRagaPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all shadow"
                  >
                    {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                    <span>{isAdded ? 'Added' : '₹2,799'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 8 Signature Footer */}
        <div className="mt-14 pt-4 border-t border-[#24160F]/15 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#24160F]/70">
          <span>PRAHAR प्रहर</span>
          <span className="hidden sm:inline">MADE FOR EVERY HOUR • ROOTED IN INDIA • MORE THAN A PERFUME</span>
          <span>5 RAGAS • 5 HOURS</span>
        </div>
      </div>
    </section>
  );
}
