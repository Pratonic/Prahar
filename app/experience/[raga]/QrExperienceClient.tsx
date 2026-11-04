'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  ShieldCheck,
  Disc3,
  ShoppingBag,
  Check,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { type Raga, ragas } from '@/data/ragas';
import { products, formatPrice } from '@/data/products';
import { useCartStore } from '@/lib/cart';
import { useAudioStore } from '@/lib/audio';

interface QrExperienceClientProps {
  raga: Raga;
}

export default function QrExperienceClient({ raga }: QrExperienceClientProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const isAudioPlaying = useAudioStore((s) => s.isPlaying);
  const playRaga = useAudioStore((s) => s.playRaga);
  const togglePlay = useAudioStore((s) => s.togglePlay);
  const currentTime = useAudioStore((s) => s.currentTime);
  const duration = useAudioStore((s) => s.duration);

  const isCurrentPlaying = isAudioPlaying && currentRagaId === raga.id;

  const product = products.find(
    (p) => p.ragaId === raga.id && p.category === 'perfume'
  );

  const handleAudioToggle = () => {
    if (isAudioPlaying && currentRagaId === raga.id) {
      togglePlay();
    } else {
      playRaga(raga.id);
    }
  };

  const handleAddToCart = () => {
    if (product) {
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
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#17131D] text-white pt-24 pb-28 relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/fragrances"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>The Collection</span>
          </Link>

          {/* Authenticated NFC/QR Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authenticated Bottle NFC / QR Gateway</span>
          </div>
        </div>

        {/* Hero Banner for this Raga Experience */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Spinning Master Disc Visual */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-stone-900 border-4 border-[#D6B77C]/40 p-2 flex items-center justify-center shrink-0 shadow-2xl">
              <motion.div
                animate={isCurrentPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isCurrentPlaying ? { repeat: Infinity, duration: 8, ease: 'linear' } : {}}
                className="w-full h-full rounded-full border border-dashed border-white/20 flex flex-col items-center justify-center"
                style={{ backgroundColor: raga.colors.primary + '33' }}
              >
                <Disc3 className="w-12 h-12 text-[#D6B77C]" />
                <span className="text-[10px] font-mono text-[#D6B77C] mt-2">
                  {raga.time}
                </span>
              </motion.div>
              <div className="absolute w-4 h-4 rounded-full bg-[#D6B77C] shadow-inner" />
            </div>

            {/* Track Info & Time Alignment */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-[#B38A45]/30 text-[#D6B77C] border border-[#B38A45]/40">
                  Raga {raga.number} • {raga.timeRange}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/10 text-white/70">
                  Mood: {raga.mood}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mt-2">
                {raga.name}{' '}
                <span className="italic font-normal text-[#D6B77C]">
                  ({raga.nameDevanagari})
                </span>
              </h1>

              <p className="font-serif italic text-xl sm:text-2xl text-[#D6B77C] mt-2">
                "{raga.character}"
              </p>

              <p className="mt-4 text-sm sm:text-base text-white/75 font-sans leading-relaxed">
                {raga.longDescription}
              </p>

              {/* Player Controls */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-6">
                <button
                  onClick={handleAudioToggle}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#B38A45] to-[#D6B77C] text-[#17131D] font-sans text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-transform"
                >
                  {isCurrentPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>Pause Raga Track</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                      <span>Stream {raga.name} Audio</span>
                    </>
                  )}
                </button>

                {/* Waveform indicator */}
                <div className="flex items-center gap-1 h-6">
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={
                        isCurrentPlaying
                          ? { height: ['4px', `${6 + ((i * 7 + currentTime * 2) % 22)}px`, '4px'] }
                          : { height: '4px' }
                      }
                      transition={
                        isCurrentPlaying
                          ? { repeat: Infinity, duration: 0.8 + (i % 4) * 0.2, ease: 'easeInOut' }
                          : {}
                      }
                      className="w-1 bg-[#D6B77C] rounded-full"
                    />
                  ))}
                </div>

                <div className="text-xs font-mono text-white/50">
                  {formatTime(currentTime)} / {formatTime(duration || 45)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sensory Ritual & Notes Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Left: Fragrance Pyramid */}
          <div className="md:col-span-6 bg-white/[0.03] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D6B77C] block mb-4">
              Olfactory Architecture
            </span>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D6B77C] block mb-1">
                  Top Notes
                </span>
                <p className="text-sm text-white/90">
                  {raga.fragranceNotes.top.join(' • ')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D6B77C] block mb-1">
                  Heart Notes
                </span>
                <p className="text-sm text-white/90">
                  {raga.fragranceNotes.heart.join(' • ')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D6B77C] block mb-1">
                  Base Notes
                </span>
                <p className="text-sm text-white/90">
                  {raga.fragranceNotes.base.join(' • ')}
                </p>
              </div>
            </div>
          </div>

          {/* Right: The Suggested Ritual */}
          <div className="md:col-span-6 bg-white/[0.03] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D6B77C] block mb-4">
                The Sacred Application Ritual
              </span>

              <ol className="space-y-4 text-sm text-white/75 font-sans">
                <li className="flex items-start gap-3">
                  <span className="font-serif text-lg text-[#D6B77C]">01.</span>
                  <span>Apply two sprays to the pulse points of your wrists and throat during {raga.time}.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-serif text-lg text-[#D6B77C]">02.</span>
                  <span>Allow 30 seconds for the alcohol to evaporate without rubbing the wrists together.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-serif text-lg text-[#D6B77C]">03.</span>
                  <span>Close your eyes, play this soundtrack, and breathe slowly for five conscious cycles.</span>
                </li>
              </ol>
            </div>

            {/* Replenish or Purchase this Raga */}
            {product && (
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/50 block font-mono">Eau de Parfum 50ml</span>
                  <span className="font-serif text-2xl font-semibold text-[#D6B77C]">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-white" />
                      <span>Order Replenishment</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Explore Other Ragas in the Collection */}
        <div className="pt-8 border-t border-white/10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D6B77C] block mb-6">
            Journey to Other Sacred Hours
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ragas
              .filter((r) => r.id !== raga.id)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/experience/${other.id}`}
                  className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-[#D6B77C]/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#D6B77C] block mb-1">
                      {other.time}
                    </span>
                    <h3 className="font-serif text-xl text-white group-hover:text-[#D6B77C] transition-colors">
                      {other.name}
                    </h3>
                  </div>
                  <span className="text-xs text-white/50 mt-3 font-sans">
                    {other.mood} →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
