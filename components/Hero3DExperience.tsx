'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Sparkles,
  ArrowRight,
  Rotate3d,
  ShoppingBag,
} from 'lucide-react';
import Bottle3D from './Bottle3D';
import { ragas } from '@/data/ragas';
import { useAudioStore } from '@/lib/audio';
import { products, formatPrice } from '@/data/products';
import { useCartStore } from '@/lib/cart';

export default function Hero3DExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedRagaIdx, setSelectedRagaIdx] = useState(0);
  const [timeStr, setTimeStr] = useState('05:00');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic transforms based on scroll
  const bottleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1.5]);
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Audio Store
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const playRaga = useAudioStore((s) => s.playRaga);
  const togglePlay = useAudioStore((s) => s.togglePlay);

  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const activeRaga = ragas[selectedRagaIdx];
  const matchingProduct = products.find(
    (p) => p.ragaId === activeRaga.id && p.category === 'perfume'
  );

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRagaChange = (idx: number) => {
    setSelectedRagaIdx(idx);
    playRaga(ragas[idx].id);
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
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#07050B] text-white">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 1: THE 3D INTERACTIVE HERO STAGE                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-5 sm:px-10 lg:px-16 overflow-hidden">
        {/* Atmospheric background aura synced with raga liquid color */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-25 transition-colors duration-1000"
          style={{ backgroundColor: activeRaga.colors.primary }}
        />

        {/* Ambient Top Chronometer & Brand Info */}
        <div className="relative z-20 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl tracking-[0.2em] font-medium text-white">
              PRAHAR
            </span>
            <span className="font-serif text-xl text-[#D6B77C]">प्रहर</span>
            <span className="hidden sm:inline text-xs font-mono tracking-widest uppercase text-white/50 border-l border-white/15 pl-3">
              × A.R. RAHMAN
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#D6B77C]">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Clock className="w-3.5 h-3.5" />
              <span>{timeStr} • PRE-DAWN</span>
            </div>

            <button
              onClick={() => playRaga(activeRaga.id)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B38A45]/30 hover:bg-[#B38A45] border border-[#B38A45]/40 text-white transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlaying ? 'Audio Live' : 'Enable Sound'}</span>
            </button>
          </div>
        </div>

        {/* Center Grid: 3D Bottle Stage + Editorial Typography */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
          {/* Left Editorial Text */}
          <div className="lg:col-span-5 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D6B77C] block mb-3">
                {activeRaga.time} • THE AWAKENING SCENT
              </span>

              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                PRAHAR
              </h1>

              <p className="font-serif italic text-3xl sm:text-4xl text-[#E8A856] mt-3">
                The fragrance you can hear.
              </p>

              <p className="mt-6 text-sm sm:text-base text-white/70 font-sans leading-relaxed max-w-md mx-auto lg:mx-0">
                For centuries, Indian musicians sang each raga only at its own hour. 
                PRAHAR translates that sacred relationship between time, emotion, and melody into haute perfumery.
              </p>

              {/* 3D Interaction Prompt Badge */}
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-xs font-mono text-[#D6B77C]/80">
                <Rotate3d className="w-4 h-4 text-[#D6B77C] animate-spin-slow" />
                <span>Interactive 3D Vessel • Click & drag to rotate 360°</span>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => playRaga(activeRaga.id)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#B38A45] via-[#D6B77C] to-[#B38A45] text-[#17131D] font-sans text-xs uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(214,183,124,0.35)] hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  <span>{isPlaying ? 'Pause Raga Track' : `Hear Raga ${activeRaga.name}`}</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 hover:border-[#D6B77C] text-white hover:text-[#D6B77C] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? 'Added to Bag' : `Order 50ml — ₹2,799`}</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: The 3D Perfume Bottle Canvas */}
          <div className="lg:col-span-7 relative h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center order-1 lg:order-2">
            <motion.div
              style={{ scale: bottleScale, y: bottleY }}
              className="w-full h-full"
            >
              <Bottle3D
                liquidColor={activeRaga.colors.primary}
                interactive={true}
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Interactive 5 Ragas Time Dial Ribbon */}
        <div className="relative z-20 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D6B77C]">
              Select A Sacred Hour (Chronobiological Tuning)
            </span>
            <span className="text-xs text-white/50 font-mono">
              5 Divisions of the Solar Day
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {ragas.map((r, idx) => {
              const isSelected = idx === selectedRagaIdx;
              const isRagaPlaying = isPlaying && currentRagaId === r.id;

              return (
                <button
                  key={r.id}
                  onClick={() => handleRagaChange(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-white/15 border-[#D6B77C] shadow-lg scale-102'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-1">
                    <span className="text-[#D6B77C]">{r.time}</span>
                    {isRagaPlaying && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <div className="font-serif text-lg font-bold text-white truncate">
                    {r.name}
                  </div>
                  <div className="text-[11px] text-white/60 font-sans truncate">
                    {r.mood}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 2: SCROLL-ZOOM IMMERSIVE STORY EXPERIENCE            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative py-32 px-5 sm:px-10 lg:px-16 border-t border-white/10 overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-[#B38A45]/20 text-[#D6B77C] border border-[#B38A45]/30 mb-4 inline-block">
              The Architecture of Scent & Sound
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
              Every hour has a story.{' '}
              <span className="italic font-normal text-[#D6B77C] block sm:inline">
                Every raga has a scent.
              </span>
            </h2>
          </div>

          {/* Staggered Editorial Feature Cards */}
          <div className="space-y-16">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-4 text-center md:text-left">
                <span className="font-serif text-6xl text-[#D6B77C] font-light">01</span>
                <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#D6B77C] mt-2">
                  Chronobiological Harmony
                </span>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-serif text-3xl text-white mb-3">
                  Why Scent Must Change with the Sun
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
                  Most people wear one perfume from their 9 AM meeting to a late dinner, but in Indian heat it fades by afternoon. 
                  PRAHAR crafts five distinct formulations calibrated to the temperature, mood, and psychological rhythm of each prahar.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-4 text-center md:text-left">
                <span className="font-serif text-6xl text-[#D6B77C] font-light">02</span>
                <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#D6B77C] mt-2">
                  A.R. Rahman × Le Musk
                </span>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-serif text-3xl text-white mb-3">
                  Music and Scent as One Unified Art
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
                  Maestro A.R. Rahman pioneered multi-sensory storytelling with his Cannes XR VR film <em>Le Musk</em>. 
                  With PRAHAR, he brings exclusive raga compositions directly into every physical perfume vessel.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-4 text-center md:text-left">
                <span className="font-serif text-6xl text-[#D6B77C] font-light">03</span>
                <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#D6B77C] mt-2">
                  Ancient Kannauj Provenance
                </span>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-serif text-3xl text-white mb-3">
                  Hydro-Distilled in Pure Copper Degs
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
                  From Mysore sandalwood to wild coastal kewra and baked-earth mitti attar that captures the first rain, 
                  our distillations honor multi-generational Indian artisan techniques without synthetic shortcuts.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
