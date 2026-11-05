'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Rotate3d,
  Check,
  Disc3,
  Layers,
  ChevronDown,
} from 'lucide-react';
import Bottle3D from './Bottle3D';
import { ragas } from '@/data/ragas';
import { products, formatPrice } from '@/data/products';
import { useAudioStore } from '@/lib/audio';
import { useCartStore } from '@/lib/cart';

const stages = [
  { id: 'identity', label: '01 IDENTITY', progress: 0.05 },
  { id: 'anatomy', label: '02 ANATOMY', progress: 0.28 },
  { id: 'prahars', label: '03 5 PRAHARS', progress: 0.52 },
  { id: 'resonance', label: '04 RESONANCE', progress: 0.74 },
  { id: 'collection', label: '05 ACQUISITION', progress: 0.95 },
];

export default function ArmoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRagaIdx, setActiveRagaIdx] = useState(0);
  const [timeStr, setTimeStr] = useState('05:00');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const activeRaga = ragas[activeRagaIdx];

  // Audio Store
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const playRaga = useAudioStore((s) => s.playRaga);
  const togglePlay = useAudioStore((s) => s.togglePlay);

  // Cart Store
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) => s.getItemCount());

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic Camera & Bottle Transforms
  const cameraZoom = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.0, 1.35, 1.05, 1.15, 0.95]
  );

  const rotationAngle = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.6, 1.4, 2.2, 3.14]
  );

  // Stage Visibility Opacities
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1, 0]);
  const stage2Opacity = useTransform(scrollYProgress, [0.18, 0.25, 0.4, 0.46], [0, 1, 1, 0]);
  const stage3Opacity = useTransform(scrollYProgress, [0.44, 0.5, 0.65, 0.7], [0, 1, 1, 0]);
  const stage4Opacity = useTransform(scrollYProgress, [0.68, 0.74, 0.84, 0.88], [0, 1, 1, 0]);
  const stage5Opacity = useTransform(scrollYProgress, [0.86, 0.92, 1], [0, 1, 1]);

  // Current Active Stage for HUD indicator
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (val) => {
      if (val < 0.2) setCurrentStageIdx(0);
      else if (val < 0.45) setCurrentStageIdx(1);
      else if (val < 0.68) setCurrentStageIdx(2);
      else if (val < 0.86) setCurrentStageIdx(3);
      else setCurrentStageIdx(4);
    });
  }, [scrollYProgress]);

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRagaSelect = (idx: number) => {
    setActiveRagaIdx(idx);
    playRaga(ragas[idx].id);
  };

  const handleAddToCart = (productId: string, name: string, price: number, size: string = '50ml') => {
    addItem({
      productId,
      name,
      price,
      size,
      ragaId: activeRaga.id,
      category: 'perfume',
    });
    setAddedItem(productId);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const scrollToStage = (progressTarget: number) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: containerRef.current.offsetTop + totalHeight * progressTarget,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="relative bg-[#07060A] text-white min-h-[450vh]">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* FIXED PINNED VIEWPORT (Armory.in Signature Layout)            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Dynamic Atmosphere Aura (Color Morphs with Raga Liquid) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25 blur-[160px] transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeRaga.colors.primary} 0%, transparent 65%)`,
          }}
        />

        {/* ── ARMORY HUD FRAME: CORNER BRACKETS ────────────────────── */}
        <div className="pointer-events-none absolute inset-5 sm:inset-8 z-30 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-white/30 tracking-widest">[ + ]</span>
            <span className="font-mono text-[10px] text-white/30 tracking-widest">[ + ]</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-mono text-[10px] text-white/30 tracking-widest">[ + ]</span>
            <span className="font-mono text-[10px] text-white/30 tracking-widest">[ + ]</span>
          </div>
        </div>

        {/* ── ARMORY HUD: TOP NAVIGATION & TELEMETRY ───────────────── */}
        <header className="absolute top-0 inset-x-0 z-40 px-5 sm:px-10 py-6 flex items-center justify-between border-b border-white/[0.08] backdrop-blur-md">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-2xl tracking-[0.25em] font-medium text-white group-hover:text-[#D6B77C] transition-colors">
              PRAHAR
            </span>
            <span className="font-serif text-lg text-[#D6B77C] opacity-80">प्रहर</span>
          </Link>

          {/* Center Coordinates & Circadian Telemetry */}
          <div className="hidden md:flex items-center gap-6 text-[11px] font-mono tracking-widest text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#D6B77C]" />
              <span className="text-[#D6B77C]">{timeStr}</span>
              <span className="text-white/40">• {activeRaga.time}</span>
            </div>
            <div className="w-px h-3 bg-white/20" />
            <span className="text-white/40">KANNAUJ 27.05°N, 79.91°E</span>
            <div className="w-px h-3 bg-white/20" />
            <span className="text-white/40">432Hz HARMONIC</span>
          </div>

          {/* Right: Audio Pill & Cart Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isPlaying) togglePlay();
                else playRaga(activeRaga.id);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-[#D6B77C] bg-white/[0.04] text-xs font-mono uppercase tracking-wider transition-all"
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-[2px] h-3 w-3 pb-0.5">
                    <span className="w-[2px] bg-[#D6B77C] h-full animate-pulse" />
                    <span className="w-[2px] bg-[#D6B77C] h-2/3 animate-pulse delay-75" />
                    <span className="w-[2px] bg-[#D6B77C] h-full animate-pulse delay-150" />
                  </div>
                  <span className="text-[#D6B77C]">{activeRaga.name} LIVE</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-white/80">RAGA SOUND</span>
                </>
              )}
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full border border-white/20 hover:border-[#D6B77C] bg-white/[0.04] text-white/80 transition-all"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B38A45] text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* ── ARMORY HUD: VERTICAL SCROLL PROGRESS BAR (Right Edge) ─── */}
        <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5">
          <div className="flex flex-col gap-3 font-mono text-[10px] tracking-widest text-right">
            {stages.map((stg, i) => {
              const isActive = i === currentStageIdx;
              return (
                <button
                  key={stg.id}
                  onClick={() => scrollToStage(stg.progress)}
                  className={`transition-all text-right ${
                    isActive ? 'text-[#D6B77C] font-bold scale-105' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {stg.label}
                </button>
              );
            })}
          </div>

          {/* Thin Progress Track */}
          <div className="w-[2px] h-32 bg-white/10 rounded-full relative overflow-hidden self-end mr-1">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-[#D6B77C]"
            />
          </div>
        </div>

        {/* ── CENTER: PHOTOREALISTIC 3D BOTTLE (Pinned Canvas) ─────── */}
        <div className="relative z-10 w-full h-full max-w-[850px] max-h-[850px] flex items-center justify-center pointer-events-auto">
          <Bottle3D
            liquidColor={activeRaga.colors.primary}
            interactive={true}
            className="w-full h-full"
          />
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* OVERLAY STAGES (Armory.in Scrollytelling Architecture)        */}
        {/* ───────────────────────────────────────────────────────────── */}

        {/* ── STAGE 1: THE IDENTITY ─────────────────────────────────── */}
        <motion.div
          style={{ opacity: stage1Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end pb-24 sm:pb-28 px-6 sm:px-16"
        >
          <div className="max-w-2xl pointer-events-auto">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] uppercase bg-white/10 text-[#D6B77C] border border-white/15 mb-3">
              PRAHAR • EIGHT DIVISIONS OF THE DAY
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.02] text-white">
              The fragrance you can hear.
            </h1>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#E0852A] mt-3">
              "Every hour has a story. Every raga has a scent."
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => playRaga(activeRaga.id)}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#B38A45] to-[#D6B77C] text-[#07060A] font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2.5 shadow-[0_0_30px_rgba(214,183,124,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                <span>{isPlaying ? 'Pause Track' : `Hear Raga ${activeRaga.name}`}</span>
              </button>

              <button
                onClick={() => handleAddToCart(activeRaga.id + '-edp', activeRaga.name + ' 50ml EDP', 2799, '50ml')}
                className="px-7 py-3.5 rounded-full border border-white/20 hover:border-[#D6B77C] text-white hover:text-[#D6B77C] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{addedItem ? 'Added to Bag' : 'Order 50ml — ₹2,799'}</span>
              </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[11px] font-mono text-white/40 tracking-wider">
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              <span>SCROLL TO INSPECT VESSEL ANATOMY</span>
            </div>
          </div>
        </motion.div>

        {/* ── STAGE 2: VESSEL ANATOMY (Technical HUD Callouts) ──────── */}
        <motion.div
          style={{ opacity: stage2Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between py-24 sm:py-28 px-6 sm:px-16"
        >
          <div className="flex justify-between items-start pointer-events-auto">
            {/* Top-Left Callout: Crystal Cap */}
            <div className="max-w-xs p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
              <span className="font-mono text-[10px] text-[#D6B77C] uppercase tracking-widest block mb-1">
                [ 01 ] OPTICAL CRYSTAL CAP
              </span>
              <h4 className="font-serif text-lg text-white">6-Axis Beveled Chamfers</h4>
              <p className="text-xs text-white/60 font-sans mt-1">
                Solid optical glass cut to refract and split morning light across the vanity.
              </p>
            </div>

            {/* Top-Right Callout: 24k Gold Atomizer */}
            <div className="max-w-xs p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-right">
              <span className="font-mono text-[10px] text-[#D6B77C] uppercase tracking-widest block mb-1">
                [ 02 ] 24K GOLD ATOMIZER
              </span>
              <h4 className="font-serif text-lg text-white">Micro-Droplet Dispersal</h4>
              <p className="text-xs text-white/60 font-sans mt-1">
                High-pressure pump engineered for an expansive, whispering mist cloud.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end pointer-events-auto">
            {/* Bottom-Left Callout: Solid Base & Curved Tube */}
            <div className="max-w-xs p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
              <span className="font-mono text-[10px] text-[#D6B77C] uppercase tracking-widest block mb-1">
                [ 03 ] SOLID CRYSTAL BASE
              </span>
              <h4 className="font-serif text-lg text-white">Zero-Residue Curved Tube</h4>
              <p className="text-xs text-white/60 font-sans mt-1">
                Heavy lead-free crystal base with curved siphon ensuring every drop is savored.
              </p>
            </div>

            {/* Bottom-Right Callout: Heat-Proof Formulation */}
            <div className="max-w-xs p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-right">
              <span className="font-mono text-[10px] text-[#D6B77C] uppercase tracking-widest block mb-1">
                [ 04 ] CLIMATE-RESILIENT OILS
              </span>
              <h4 className="font-serif text-lg text-white">Kannauj Hydro-Distillates</h4>
              <p className="text-xs text-white/60 font-sans mt-1">
                Alcohol-reduced essential oils formulated to flourish in 40°C+ Indian heat.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── STAGE 3: THE CHRONO-OLFACTORY ENGINE (5 Ragas Dial) ──── */}
        <motion.div
          style={{ opacity: stage3Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between py-24 sm:py-28 px-6 sm:px-16"
        >
          <div className="text-center max-w-xl mx-auto pointer-events-auto">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D6B77C] block mb-1">
              03 // CHRONO-OLFACTORY TUNING
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight">
              Five hours. Five scents you can hear.
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-sans mt-2">
              Select any prahar to morph the liquid color, note architecture, and soundscape in real time.
            </p>
          </div>

          {/* Interactive Raga Matrix Pill Bar */}
          <div className="pointer-events-auto max-w-4xl mx-auto w-full">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 bg-black/70 backdrop-blur-xl p-3 rounded-2xl border border-white/15">
              {ragas.map((r, i) => {
                const isSelected = i === activeRagaIdx;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleRagaSelect(i)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-[#B38A45]/30 border border-[#D6B77C] text-white shadow-lg'
                        : 'bg-white/[0.03] border border-white/5 hover:bg-white/10 text-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#D6B77C] uppercase">
                      <span>{r.time}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    </div>
                    <div className="font-serif text-base font-bold mt-1 truncate">
                      {r.name}
                    </div>
                    <div className="text-[10px] text-white/50 truncate font-sans">
                      {r.mood}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Raga Architecture Drawer */}
            <div className="mt-3 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-[#D6B77C] uppercase tracking-wider">
                  NOTES:
                </span>
                <span className="text-white/80">
                  {activeRaga.fragranceNotes.top.slice(0, 2).join(', ')} • {activeRaga.fragranceNotes.heart[0]} • {activeRaga.fragranceNotes.base[0]}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(activeRaga.id + '-edp', activeRaga.name + ' 50ml EDP', 2799, '50ml')}
                className="px-4 py-2 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{addedItem ? 'Added' : 'Add 50ml • ₹2,799'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── STAGE 4: ACOUSTIC RESONANCE (A.R. Rahman Collaboration) ─ */}
        <motion.div
          style={{ opacity: stage4Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-16"
        >
          <div className="max-w-xl pointer-events-auto p-6 sm:p-8 rounded-3xl bg-black/70 backdrop-blur-xl border border-white/15">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D6B77C] block mb-2">
              04 // ACOUSTIC RESONANCE × A.R. RAHMAN
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
              Sound and scent share one language.
            </h3>

            <p className="font-serif italic text-xl text-[#E0852A] mt-1">
              "Notes. Chords. Accords. Resonance."
            </p>

            <p className="text-xs sm:text-sm text-white/70 font-sans mt-4 leading-relaxed">
              Co-founded with Academy Award-winning composer A.R. Rahman following his Cannes XR multi-sensory film <em>Le Musk</em>. 
              Every physical PRAHAR bottle embeds an authenticated QR gateway unlocking its exclusive classical raga soundtrack.
            </p>

            {/* Live Audio Spectrum Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 h-6">
                {[8, 18, 24, 12, 28, 16, 22, 10, 18, 14, 26, 12].map((h, idx) => (
                  <motion.span
                    key={idx}
                    animate={
                      isPlaying
                        ? { height: ['4px', `${h}px`, '4px'] }
                        : { height: '4px' }
                    }
                    transition={
                      isPlaying
                        ? { repeat: Infinity, duration: 0.6 + (idx % 3) * 0.15, ease: 'easeInOut' }
                        : {}
                    }
                    className="w-1 bg-[#D6B77C] rounded-full"
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (isPlaying) togglePlay();
                  else playRaga(activeRaga.id);
                }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B38A45] to-[#D6B77C] text-[#07060A] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow"
              >
                {isPlaying ? 'Pause Audio' : `Stream ${activeRaga.name}`}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── STAGE 5: ACQUISITION / COLLECTION (Minimal D2C Storefront) ── */}
        <motion.div
          style={{ opacity: stage5Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-16 px-6 sm:px-16"
        >
          <div className="max-w-5xl mx-auto w-full pointer-events-auto">
            <div className="text-center mb-6">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D6B77C] block mb-1">
                05 // CHOOSE YOUR RITUAL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
                The PRAHAR Collection
              </h2>
            </div>

            {/* 4 Minimalist Dark Luxury Buy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: 50ml EDP */}
              <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 flex flex-col justify-between hover:border-[#D6B77C]/60 transition-all">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#D6B77C] block">
                    HAUTE PARFUM • 50ML
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mt-1">
                    {activeRaga.name} EDP
                  </h4>
                  <span className="font-serif text-xl font-bold text-[#E0852A] block mt-1">
                    ₹2,799
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(activeRaga.id + '-edp', activeRaga.name + ' 50ml EDP', 2799, '50ml')}
                  className="mt-4 w-full py-2 rounded-xl bg-[#B38A45] hover:bg-[#8B6914] text-white font-mono text-[11px] uppercase tracking-wider font-bold transition-all"
                >
                  {addedItem === activeRaga.id + '-edp' ? 'Added ✓' : 'Add to Bag'}
                </button>
              </div>

              {/* Card 2: 10ml Attar */}
              <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 flex flex-col justify-between hover:border-[#D6B77C]/60 transition-all">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#D6B77C] block">
                    PURE ATTAR • 10ML
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mt-1">
                    {activeRaga.name} Roll-on
                  </h4>
                  <span className="font-serif text-xl font-bold text-[#E0852A] block mt-1">
                    ₹1,499
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(activeRaga.id + '-attar', activeRaga.name + ' 10ml Attar', 1499, '10ml')}
                  className="mt-4 w-full py-2 rounded-xl border border-white/20 hover:border-[#D6B77C] text-white hover:text-[#D6B77C] font-mono text-[11px] uppercase tracking-wider font-bold transition-all"
                >
                  {addedItem === activeRaga.id + '-attar' ? 'Added ✓' : 'Add to Bag'}
                </button>
              </div>

              {/* Card 3: Discovery Set */}
              <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 flex flex-col justify-between hover:border-[#D6B77C]/60 transition-all">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#D6B77C] block">
                    DISCOVERY SET • 5×2ML
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mt-1">
                    All 5 Sacred Hours
                  </h4>
                  <span className="font-serif text-xl font-bold text-[#E0852A] block mt-1">
                    ₹999
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart('discovery-set-5', 'PRAHAR Discovery Set (5×2ml)', 999, '5×2ml')}
                  className="mt-4 w-full py-2 rounded-xl border border-white/20 hover:border-[#D6B77C] text-white hover:text-[#D6B77C] font-mono text-[11px] uppercase tracking-wider font-bold transition-all"
                >
                  {addedItem === 'discovery-set-5' ? 'Added ✓' : 'Add to Bag'}
                </button>
              </div>

              {/* Card 4: Raga Candle */}
              <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 flex flex-col justify-between hover:border-[#D6B77C]/60 transition-all">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#D6B77C] block">
                    SOY BEESWAX • 200G
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mt-1">
                    {activeRaga.name} Candle
                  </h4>
                  <span className="font-serif text-xl font-bold text-[#E0852A] block mt-1">
                    ₹1,299
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(activeRaga.id + '-candle', activeRaga.name + ' Candle 200g', 1299, '200g')}
                  className="mt-4 w-full py-2 rounded-xl border border-white/20 hover:border-[#D6B77C] text-white hover:text-[#D6B77C] font-mono text-[11px] uppercase tracking-wider font-bold transition-all"
                >
                  {addedItem === activeRaga.id + '-candle' ? 'Added ✓' : 'Add to Bag'}
                </button>
              </div>
            </div>

            {/* Minimal Sub-Navigation Links */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/50">
              <div className="flex items-center gap-6">
                <Link href="/our-story" className="hover:text-[#D6B77C] transition-colors">
                  [ 01 OUR STORY ]
                </Link>
                <Link href="/fragrances" className="hover:text-[#D6B77C] transition-colors">
                  [ 02 THE FIVE RAGĀS ]
                </Link>
                <Link href="/experience" className="hover:text-[#D6B77C] transition-colors">
                  [ 03 DIGITAL SOUNDLAB ]
                </Link>
              </div>
              <span className="text-white/30">PRAHAR प्रहर © 2026 • ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}