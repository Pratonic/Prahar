'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Clock,
  ShoppingBag,
  Volume2,
  Sparkles,
  ArrowRight,
  Disc,
  Radio,
  Flame,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sun,
  Moon,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { ragas } from '@/data/ragas';
import { products, formatPrice } from '@/data/products';
import { useAudioStore } from '@/lib/audio';
import { useCartStore } from '@/lib/cart';

export default function ArmoryExperience() {
  const [activeRagaIdx, setActiveRagaIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'edp' | 'attar' | 'candles'>('all');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState('05:00');
  const [currentPraharName, setCurrentPraharName] = useState('BHAIRAV');

  const activeRaga = ragas[activeRagaIdx];

  // Global Audio Store
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const playRaga = useAudioStore((s) => s.playRaga);
  const togglePlay = useAudioStore((s) => s.togglePlay);

  // Cart Store
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.toggleCart);

  // Sync active raga with audio store
  useEffect(() => {
    const idx = ragas.findIndex((r) => r.id === currentRagaId);
    if (idx !== -1 && idx !== activeRagaIdx) {
      setActiveRagaIdx(idx);
    }
  }, [currentRagaId, activeRagaIdx]);

  // Real-time clock & automatic prahar detection
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      setCurrentTimeStr(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      );

      // Determine prahar based on time
      if (h >= 3 && h < 6) {
        setCurrentPraharName('BHAIRAV (PRE-DAWN)');
      } else if (h >= 11 && h < 15) {
        setCurrentPraharName('SARANG (MIDDAY)');
      } else if (h >= 18 && h < 21) {
        setCurrentPraharName('YAMAN (DUSK)');
      } else if (h >= 22 || h < 3) {
        setCurrentPraharName('DARBARI (MIDNIGHT)');
      } else {
        setCurrentPraharName('MALHAR (RENEWAL)');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // 3D Interactive Mouse Tilt Physics for the Perfume Bottle
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), { stiffness: 150, damping: 20 });
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-45, 45]), { stiffness: 120, damping: 25 });
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-35, 35]), { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAddToCart = (productId: string, name: string, price: number, size: string = '50ml', ragaId: string = activeRaga.id) => {
    addItem({
      productId,
      name,
      price,
      size,
      ragaId,
      category: 'perfume',
    });
    setAddedItem(productId);
    toggleCart();
    setTimeout(() => setAddedItem(null), 2500);
  };

  const handleRagaChange = (idx: number) => {
    setActiveRagaIdx(idx);
    playRaga(ragas[idx].id);
  };

  return (
    <div className="bg-[#0B0C10] text-white selection:bg-[#ff4d17]/40 selection:text-white font-sans min-h-screen">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 1: HERO — THE FIRST IMPRESSION                        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/[0.08]">
        {/* Subtle Armory Dot Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Dynamic Ambient Color Glow */}
        <motion.div
          animate={{
            backgroundColor: activeRaga.colors.primary,
          }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] opacity-25"
        />

        {/* Armory Corner Brackets */}
        <div className="pointer-events-none absolute inset-6 sm:inset-10 z-20 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-white/30 tracking-widest">[ + ]</span>
            <span className="font-mono text-xs text-white/30 tracking-widest">[ + ]</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-mono text-xs text-white/30 tracking-widest">[ + ]</span>
            <span className="font-mono text-xs text-white/30 tracking-widest">[ + ]</span>
          </div>
        </div>

        {/* Armory Top Telemetry Bar */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] flex items-center justify-between text-[11px] font-mono tracking-widest text-white/45 border-b border-white/[0.08] pb-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d17] animate-pulse" />
            <span className="text-white font-semibold">{currentTimeStr}</span>
            <span className="opacity-30">•</span>
            <span className="text-[#ff4d17] font-semibold">{currentPraharName}</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span>KANNAUJ 27.05°N, 79.91°E</span>
            <span className="opacity-30">•</span>
            <span>INDIAN HEAT FORMULA (24% OIL)</span>
            <span className="opacity-30">•</span>
            <span className="text-[#ff4d17]">432Hz ACOUSTIC MASTER</span>
          </div>

          <div className="flex items-center gap-2 text-white/70">
            <Clock className="w-3.5 h-3.5 text-[#ff4d17]" />
            <span className="uppercase tracking-wider">PRAHAR प्रहर</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-grow py-4">
          {/* Left Column: Bold Editorial Copy & Direct Acquisition CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] uppercase bg-[#ff4d17]/15 border border-[#ff4d17]/30 text-[#ff4d17] font-semibold">
                PRAHAR प्रहर × A.R. RAHMAN
              </span>
              <span className="text-white/40 text-[11px] font-mono hidden sm:inline">
                {"//"} LUXURY PARFUM & ACOUSTIC RAGAS
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              The fragrance <br />
              <span className="italic text-[#ff4d17]">you can hear.</span>
            </h1>

            <p className="font-serif italic text-2xl sm:text-3xl text-white/80 mt-4 leading-snug">
              "Every hour has a story. Every raga has a scent."
            </p>

            <p className="mt-4 text-base sm:text-lg text-white/60 font-sans max-w-xl leading-relaxed">
              Co-founded with composer A.R. Rahman following <em>Le Musk</em>. 
              Handcrafted in Kannauj with natural botanical attars, matched to the five sacred movements of the Indian day.
            </p>

            {/* Direct High-Conversion CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary: Audio Preview */}
              <button
                onClick={() => playRaga(activeRaga.id)}
                className="px-8 py-4 rounded-full bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3 shadow-[0_0_35px_rgba(255,77,23,0.45)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                <span>{isPlaying ? 'Pause Audio' : `Hear Raga ${activeRaga.name}`}</span>
              </button>

              {/* Secondary: Buy 50ml */}
              <button
                onClick={() => handleAddToCart(`${activeRaga.id}-edp`, `${activeRaga.name} 50ml Haute Parfum`, 2799, '50ml')}
                className="px-7 py-4 rounded-full border border-white/20 hover:border-[#ff4d17] bg-[#14161F]/80 backdrop-blur-md text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#ff4d17]" />
                <span>Order 50ml — ₹2,799</span>
              </button>

              {/* Bestseller Discovery Set Pill */}
              <button
                onClick={() => handleAddToCart('discovery-set-5', 'PRAHAR Discovery Set (5×2ml)', 999, '5×2ml')}
                className="px-6 py-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 text-white/70 hover:text-white font-mono text-xs uppercase tracking-[0.15em] transition-all cursor-pointer"
              >
                Discovery Set — ₹999
              </button>
            </div>

            {/* Guarantees Strip */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono text-white/50">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ff4d17]" /> Free Shipping in India
              </span>
              <span className="flex items-center gap-2">
                <Disc className="w-4 h-4 text-[#ff4d17]" /> Authenticated 432Hz NFC Bottle
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ff4d17]" /> 2 Samples With Every Order
              </span>
            </div>
          </div>

          {/* Right Column: The 3D Interactive Photorealistic Bottle */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[520px] cursor-grab active:cursor-grabbing"
          >
            {/* Interactive 3D Perspective Stage */}
            <motion.div
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                perspective: 1200,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-64 sm:w-80 md:w-92 h-[380px] sm:h-[450px] md:h-[490px] flex items-center justify-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
            >
              {/* Dynamic Ground Shadow */}
              <div className="absolute -bottom-8 w-4/5 h-10 bg-black/85 rounded-full blur-2xl scale-y-40 pointer-events-none" />

              {/* The Genuine High-Resolution Transparent Cutout */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/bottle_hero.png"
                  alt="PRAHAR Luxury Amber Perfume Bottle"
                  fill
                  sizes="(max-width: 768px) 320px, 450px"
                  className="object-contain pointer-events-none select-none"
                  priority
                />

                {/* Moving Specular Sheen on Glass */}
                <motion.div
                  style={{
                    x: sheenX,
                    y: sheenY,
                  }}
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay bg-gradient-to-tr from-transparent via-white to-transparent rounded-3xl"
                />
              </div>
            </motion.div>

            {/* Quick Interactive Tooltip */}
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d17]" />
              <span>Interactive 3D Glass // Move Cursor to Tilt</span>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] pt-4 flex items-center justify-between text-[11px] font-mono text-white/40 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-[#ff4d17]">NOW PLAYING:</span>
            <span className="text-white uppercase font-bold">RAGA {activeRaga.name}</span>
            <span>({activeRaga.time})</span>
          </div>
          <a
            href="#ragas-matrix"
            className="flex items-center gap-1.5 text-white/60 hover:text-[#ff4d17] transition-colors"
          >
            <span>EXPLORE THE 5 PRAHARS</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#ff4d17]" />
          </a>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 2: LIVE PRAHAR CIRCADIAN CLOCK                        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 bg-[#0E1017] border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ff4d17]/10 border border-[#ff4d17]/30 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#ff4d17]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d17] block">
                CIRCADIAN CHRONO-BIOLOGY
              </span>
              <h3 className="font-serif text-2xl text-white">
                Your Prahar for this hour: <span className="italic text-[#ff4d17]">{currentPraharName}</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => playRaga(activeRaga.id)}
              className="px-6 py-3 rounded-full bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer shadow"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              <span>Stream {activeRaga.name} Audio</span>
            </button>

            <button
              onClick={() => handleAddToCart(`${activeRaga.id}-edp`, `${activeRaga.name} 50ml EDP`, 2799, '50ml')}
              className="px-6 py-3 rounded-full border border-white/20 hover:border-[#ff4d17] text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
            >
              + Quick Add ₹2,799
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 3: THE SIGNATURE FIVE RAGAS (Core Explorer)          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="ragas-matrix" className="py-24 px-6 sm:px-10 lg:px-16 border-b border-white/[0.08] relative">
        <div className="mx-auto max-w-[1440px]">
          {/* Section Heading */}
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#ff4d17] block mb-2">
              01 // THE SACRED FIVE
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Five hours. Five ragas. <br />
              <span className="italic text-[#ff4d17]">Five scents you can hear.</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-white/60 font-sans leading-relaxed">
              Click any prahar below to stream its authentic Indian classical raga and explore its botanical accord formulated specifically for Indian climate.
            </p>
          </div>

          {/* Horizontal Raga Matrix Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-2 bg-[#14161F] rounded-2xl border border-white/10 mb-8">
            {ragas.map((r, i) => {
              const isSelected = i === activeRagaIdx;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRagaChange(i)}
                  className={`p-4 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ff4d17] text-white shadow-[0_0_30px_rgba(255,77,23,0.45)] scale-102 font-semibold'
                      : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] text-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                    <span>{r.time}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  </div>
                  <div className="font-serif text-2xl font-bold mt-1.5">
                    {r.name}
                  </div>
                  <div className="text-xs font-serif opacity-80">
                    {r.nameDevanagari}
                  </div>
                  <div className={`text-[11px] mt-2 font-sans ${isSelected ? 'text-white/95 font-medium' : 'text-white/50'}`}>
                    {r.mood}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Raga Deep Dive Panel */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#14161F]/90 backdrop-blur-2xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
            {/* Left: Notes & Identity */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/5 text-[#ff4d17] border border-white/10">
                  PRAHAR {activeRagaIdx + 1} • {activeRaga.time}
                </span>
                <span className="text-xs font-mono text-white/50">
                  MOOD: {activeRaga.mood.toUpperCase()}
                </span>
              </div>

              <h3 className="font-serif text-4xl sm:text-5xl text-white">
                Raga {activeRaga.name}{' '}
                <span className="text-2xl text-[#ff4d17] font-normal">({activeRaga.nameDevanagari})</span>
              </h3>

              <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed font-sans">
                {activeRaga.description}
              </p>

              {/* Fragrance Notes Breakdown */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d17] block">
                    TOP NOTES
                  </span>
                  <span className="font-serif text-base text-white mt-1 block">
                    {activeRaga.fragranceNotes.top.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d17] block">
                    HEART NOTES
                  </span>
                  <span className="font-serif text-base text-white mt-1 block">
                    {activeRaga.fragranceNotes.heart.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d17] block">
                    BASE NOTES
                  </span>
                  <span className="font-serif text-base text-white mt-1 block">
                    {activeRaga.fragranceNotes.base.join(', ')}
                  </span>
                </div>
              </div>

              {/* Audio Track Player for this Raga */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => playRaga(activeRaga.id)}
                  className="px-6 py-3 rounded-full bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer shadow"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  <span>{isPlaying ? 'Pause Raga Music' : `Play Raga ${activeRaga.name}`}</span>
                </button>

                <button
                  onClick={() => handleAddToCart(`${activeRaga.id}-edp`, `${activeRaga.name} 50ml EDP`, 2799, '50ml')}
                  className="px-6 py-3 rounded-full border border-white/20 hover:border-[#ff4d17] text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order 50ml Eau de Parfum — ₹2,799</span>
                </button>

                <button
                  onClick={() => handleAddToCart(`${activeRaga.id}-attar`, `${activeRaga.name} 10ml Pure Attar`, 1499, '10ml')}
                  className="px-5 py-3 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Order 10ml Attar — ₹1,499
                </button>
              </div>
            </div>

            {/* Right: Raga Bottle Visual & Aura */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[380px]">
              <div
                className="absolute inset-0 rounded-full blur-[140px] opacity-35"
                style={{ backgroundColor: activeRaga.colors.primary }}
              />

              <div className="relative w-56 sm:w-68 h-[340px] sm:h-[390px] drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]">
                <Image
                  src="/images/bottle_hero.png"
                  alt={`${activeRaga.name} Bottle`}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-3 text-center">
                <span className="font-serif text-lg text-white font-semibold block">
                  {activeRaga.name} • 50ml Haute Parfum
                </span>
                <span className="text-xs font-mono text-[#ff4d17]">
                  24% Oil Concentration // Indian Climate Proof
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 4: THE BESTSELLER DISCOVERY SET (₹999)               */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0E1017] border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#ff4d17] block mb-2">
              CAN’T DECIDE ON AN HOUR?
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              The PRAHAR Discovery Set. <br />
              <span className="italic text-[#ff4d17]">All 5 sacred hours in one box.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/70 font-sans leading-relaxed max-w-xl">
              Experience the full circadian journey. Five 2ml luxury travel atomizers (Bhairav, Sarang, Yaman, Darbari, Malhar) 
              plus exclusive streaming access to all five Rahman classical recordings.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-mono text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#ff4d17]" />
                <span>5 × 2ml Luxury Atomizers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#ff4d17]" />
                <span>₹999 Voucher for 50ml Bottle</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#ff4d17]" />
                <span>Free Express Shipping</span>
              </div>
            </div>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-serif text-4xl font-bold text-white">₹999</span>
              <span className="text-sm font-mono text-white/40 line-through">₹1,499</span>
              <span className="px-2.5 py-1 rounded-md bg-[#ff4d17]/20 border border-[#ff4d17]/40 text-[#ff4d17] text-xs font-mono font-bold">
                SAVE ₹500
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleAddToCart('discovery-set-5', 'PRAHAR Discovery Set (5×2ml)', 999, '5×2ml')}
                className="px-8 py-4 rounded-full bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_25px_rgba(255,77,23,0.45)] flex items-center gap-3 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Discovery Set to Bag — ₹999</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#14161F] flex items-center justify-center p-6">
              <Image
                src="/images/ritual_box.jpg"
                alt="PRAHAR Discovery Set Packaging"
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute bottom-6 inset-x-6 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold tracking-wider">PRAHAR 5×2ML SET</span>
                <span className="text-[#ff4d17] font-semibold">₹999 INCL. TAXES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 5: BEYOND THE BOTTLE — COMPLETE CATALOGUE (Slide 12)  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#ff4d17] block mb-2">
                02 // BEYOND THE BOTTLE
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-tight">
                Wear a prahar. Gift a prahar. <br />
                <span className="italic text-[#ff4d17]">Live the ritual.</span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 p-1 bg-[#14161F] rounded-xl border border-white/10 text-xs font-mono">
              {(['all', 'edp', 'attar', 'candles'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#ff4d17] text-white font-bold shadow'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Products' : cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. 50ml EDP */}
            {(activeCategory === 'all' || activeCategory === 'edp') && (
              <div className="p-6 rounded-3xl bg-[#14161F] border border-white/10 flex flex-col justify-between hover:border-[#ff4d17] transition-all shadow-xl group">
                <div>
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-black/40 mb-5 flex items-center justify-center p-4">
                    <Image
                      src="/images/bottle_hero.png"
                      alt={`${activeRaga.name} EDP`}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d17] block">
                    HAUTE PARFUM • 50ML
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-1">
                    {activeRaga.name} EDP
                  </h4>
                  <p className="text-xs text-white/50 mt-1 font-sans">
                    {activeRaga.character}
                  </p>
                  <span className="font-serif text-2xl font-bold text-white block mt-3">
                    ₹2,799
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(`${activeRaga.id}-edp`, `${activeRaga.name} 50ml EDP`, 2799, '50ml')}
                  className="mt-6 w-full py-3.5 rounded-xl bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow cursor-pointer"
                >
                  {addedItem === `${activeRaga.id}-edp` ? 'Added to Bag ✓' : '+ Add to Bag'}
                </button>
              </div>
            )}

            {/* 2. 10ml Pure Attar */}
            {(activeCategory === 'all' || activeCategory === 'attar') && (
              <div className="p-6 rounded-3xl bg-[#14161F] border border-white/10 flex flex-col justify-between hover:border-[#ff4d17] transition-all shadow-xl group">
                <div>
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-black/40 mb-5 flex items-center justify-center p-4">
                    <Image
                      src="/images/bottle_hero.png"
                      alt={`${activeRaga.name} Attar`}
                      fill
                      className="object-contain scale-75 group-hover:scale-80 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                    PURE ATTAR • 10ML ROLL-ON
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-1">
                    {activeRaga.name} Attar
                  </h4>
                  <p className="text-xs text-white/50 mt-1 font-sans">
                    Non-alcoholic pure perfume oil
                  </p>
                  <span className="font-serif text-2xl font-bold text-white block mt-3">
                    ₹1,499
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(`${activeRaga.id}-attar`, `${activeRaga.name} 10ml Attar`, 1499, '10ml')}
                  className="mt-6 w-full py-3.5 rounded-xl border border-white/20 hover:border-[#ff4d17] text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {addedItem === `${activeRaga.id}-attar` ? 'Added to Bag ✓' : '+ Add to Bag'}
                </button>
              </div>
            )}

            {/* 3. Discovery Set 5×2ml */}
            {(activeCategory === 'all' || activeCategory === 'edp') && (
              <div className="p-6 rounded-3xl bg-[#14161F] border border-[#ff4d17]/40 flex flex-col justify-between hover:border-[#ff4d17] transition-all shadow-xl group relative">
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#ff4d17] text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                  BEST VALUE
                </span>
                <div>
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-black/40 mb-5 flex items-center justify-center">
                    <Image
                      src="/images/ritual_box.jpg"
                      alt="Discovery Set"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d17] block">
                    DISCOVERY SET • 5×2ML
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-1">
                    All 5 Sacred Hours
                  </h4>
                  <p className="text-xs text-white/50 mt-1 font-sans">
                    Includes ₹999 voucher for full bottle
                  </p>
                  <span className="font-serif text-2xl font-bold text-white block mt-3">
                    ₹999
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart('discovery-set-5', 'PRAHAR Discovery Set (5×2ml)', 999, '5×2ml')}
                  className="mt-6 w-full py-3.5 rounded-xl bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow cursor-pointer"
                >
                  {addedItem === 'discovery-set-5' ? 'Added to Bag ✓' : '+ Add to Bag'}
                </button>
              </div>
            )}

            {/* 4. Diwali Raga Candle */}
            {(activeCategory === 'all' || activeCategory === 'candles') && (
              <div className="p-6 rounded-3xl bg-[#14161F] border border-white/10 flex flex-col justify-between hover:border-[#ff4d17] transition-all shadow-xl group">
                <div>
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-black/40 mb-5 flex items-center justify-center">
                    <Image
                      src="/images/candles_box.jpg"
                      alt="Diwali Raga Candle"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                    SOY & BEESWAX • 200G
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-1">
                    {activeRaga.name} Candle
                  </h4>
                  <p className="text-xs text-white/50 mt-1 font-sans">
                    Infused with natural raga essences
                  </p>
                  <span className="font-serif text-2xl font-bold text-white block mt-3">
                    ₹1,299
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(`${activeRaga.id}-candle`, `${activeRaga.name} Candle 200g`, 1299, '200g')}
                  className="mt-6 w-full py-3.5 rounded-xl border border-white/20 hover:border-[#ff4d17] text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {addedItem === `${activeRaga.id}-candle` ? 'Added to Bag ✓' : '+ Add to Bag'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 6: FROM RAGA TO RITUAL — 4-STEP JOURNEY (Slide 11)   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0E1017] border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#ff4d17] block mb-2">
              03 // HOW IT WORKS
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              From Raga to Ritual.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-white/60 font-sans">
              A seamless daily practice uniting Indian classical sound and natural fragrance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-[#14161F] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#ff4d17] block mb-4">01 // HEAR</span>
                <Disc className="w-8 h-8 text-[#ff4d17] mb-4" />
                <h4 className="font-serif text-2xl font-bold text-white">Listen</h4>
                <p className="mt-3 text-sm text-white/60 font-sans leading-relaxed">
                  Start with the raga designated for your specific hour. Scan the QR beneath the bottle to stream in 432Hz.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-[#14161F] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#ff4d17] block mb-4">02 // MATCH</span>
                <Radio className="w-8 h-8 text-[#ff4d17] mb-4" />
                <h4 className="font-serif text-2xl font-bold text-white">Match</h4>
                <p className="mt-3 text-sm text-white/60 font-sans leading-relaxed">
                  Select the PRAHAR fragrance formulated for that mood and hour, balancing mind and atmosphere.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-[#14161F] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#ff4d17] block mb-4">03 // WEAR</span>
                <Flame className="w-8 h-8 text-[#ff4d17] mb-4" />
                <h4 className="font-serif text-2xl font-bold text-white">Wear</h4>
                <p className="mt-3 text-sm text-white/60 font-sans leading-relaxed">
                  Apply to pulse points. Handcrafted Kannauj hydro-distillation guarantees a warm 10-hour lingering trail.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-8 rounded-3xl bg-[#14161F] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#ff4d17] block mb-4">04 // LIVE</span>
                <Sparkles className="w-8 h-8 text-[#ff4d17] mb-4" />
                <h4 className="font-serif text-2xl font-bold text-white">Live</h4>
                <p className="mt-3 text-sm text-white/60 font-sans leading-relaxed">
                  Move through the day in emotional harmony, re-aligning your circadian rhythm with every hour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 7: WHY PRAHAR WINS — THE DIFFERENCE (Slide 3 & 5)     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/five_bottles_stone.jpg"
              alt="PRAHAR Lineup on Ancient Carved Stone"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 inset-x-6 text-xs font-mono text-white/80">
              <span className="text-[#ff4d17] font-bold block mb-1">KANNAUJ DISTILLATION</span>
              <span>Layered natural extracts • 0% synthetic fillers</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#ff4d17] block mb-2">
              04 // THE SCIENCE & CRAFT
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Why Indians wear PRAHAR.
            </h2>

            <div className="mt-8 space-y-6">
              <div className="p-5 rounded-2xl bg-[#14161F] border border-white/10 flex items-start gap-4">
                <span className="text-xl font-serif text-[#ff4d17] font-bold">01</span>
                <div>
                  <h4 className="font-serif text-xl font-bold text-white">Engineered for Indian Climate</h4>
                  <p className="text-sm text-white/60 font-sans mt-1">
                    Standard European fragrances evaporate within 3 hours in tropical heat. 
                    PRAHAR uses high-density 24% perfume oil concentrations anchored by Kannauj Mitti attar and aged sandalwood.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14161F] border border-white/10 flex items-start gap-4">
                <span className="text-xl font-serif text-[#ff4d17] font-bold">02</span>
                <div>
                  <h4 className="font-serif text-xl font-bold text-white">Exclusive A.R. Rahman Compositions</h4>
                  <p className="text-sm text-white/60 font-sans mt-1">
                    Music and perfumery are twin arts. Every bottle connects via NFC to master studio tracks recorded in 432Hz harmonic tuning.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14161F] border border-white/10 flex items-start gap-4">
                <span className="text-xl font-serif text-[#ff4d17] font-bold">03</span>
                <div>
                  <h4 className="font-serif text-xl font-bold text-white">Direct Kannauj Artisan Sourcing</h4>
                  <p className="text-sm text-white/60 font-sans mt-1">
                    We partner with multi-generational deg-bhapka distillers in Kannauj, supporting traditional Indian perfumers with sustainable fair compensation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
