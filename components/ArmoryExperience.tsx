'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import {
  Play,
  Pause,
  Clock,
  ShoppingBag,
  Volume2,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Disc,
  Radio,
  Flame,
} from 'lucide-react';
import { ragas } from '@/data/ragas';
import { products, formatPrice } from '@/data/products';
import { useAudioStore } from '@/lib/audio';
import { useCartStore } from '@/lib/cart';

// Armory Stage Markers
const stages = [
  { id: 'identity', code: '01', label: 'IDENTITY', progress: 0.05 },
  { id: 'chronos', code: '02', label: 'THE LAW OF TIME', progress: 0.28 },
  { id: 'ragas', code: '03', label: 'FIVE PRAHARS', progress: 0.52 },
  { id: 'soundlab', code: '04', label: 'SOUNDLAB', progress: 0.76 },
  { id: 'collection', code: '05', label: 'ACQUISITION', progress: 0.95 },
];

export default function ArmoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRagaIdx, setActiveRagaIdx] = useState(0);
  const [timeStr, setTimeStr] = useState('05:00');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const activeRaga = ragas[activeRagaIdx];

  // Global Audio Store
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const playRaga = useAudioStore((s) => s.playRaga);
  const togglePlay = useAudioStore((s) => s.togglePlay);

  // Sync active raga with audio store if user changes track elsewhere
  useEffect(() => {
    const idx = ragas.findIndex((r) => r.id === currentRagaId);
    if (idx !== -1 && idx !== activeRagaIdx) {
      setActiveRagaIdx(idx);
    }
  }, [currentRagaId, activeRagaIdx]);

  // Cart Store
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.toggleCart);

  // Scroll Progress across 500vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth Springs for Scroll Transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // Bottle 3D Transform on Scroll:
  // Stage 1: scale 1.0 (centered)
  // Stage 2: scale 1.42 (deep macro zoom on glass & amber liquid)
  // Stage 3: scale 1.08 (framed by 5 Prahars)
  // Stage 4: scale 1.15, shifted slightly right on desktop
  // Stage 5: scale 0.92 (pulling back for the full collection)
  const bottleScale = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [1.0, 1.42, 1.08, 1.16, 0.92]);
  const bottleY = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, -15, 10, -10, -35]);
  const bottleX = useTransform(smoothProgress, [0, 0.65, 0.78, 0.88, 1], [0, 0, 130, 110, 0]);
  const bottleRotateZ = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, -3.5, 2, -2.5, 0]);

  // Stage Fade Opacities & Y-Translations
  const stage1Opacity = useTransform(smoothProgress, [0, 0.16, 0.22], [1, 1, 0]);
  const stage1Y = useTransform(smoothProgress, [0, 0.16, 0.22], [0, 0, -40]);

  const stage2Opacity = useTransform(smoothProgress, [0.22, 0.28, 0.42, 0.47], [0, 1, 1, 0]);
  const stage2Y = useTransform(smoothProgress, [0.22, 0.28, 0.42, 0.47], [40, 0, 0, -40]);

  const stage3Opacity = useTransform(smoothProgress, [0.46, 0.51, 0.68, 0.73], [0, 1, 1, 0]);
  const stage3Y = useTransform(smoothProgress, [0.46, 0.51, 0.68, 0.73], [40, 0, 0, -40]);

  const stage4Opacity = useTransform(smoothProgress, [0.72, 0.77, 0.87, 0.91], [0, 1, 1, 0]);
  const stage4Y = useTransform(smoothProgress, [0.72, 0.77, 0.87, 0.91], [40, 0, 0, -40]);

  const stage5Opacity = useTransform(smoothProgress, [0.89, 0.94, 1], [0, 1, 1]);
  const stage5Y = useTransform(smoothProgress, [0.89, 0.94, 1], [40, 0, 0]);

  // Active Stage Index for HUD Vertical Bar
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', (val) => {
      if (val < 0.2) setCurrentStageIdx(0);
      else if (val < 0.44) setCurrentStageIdx(1);
      else if (val < 0.69) setCurrentStageIdx(2);
      else if (val < 0.88) setCurrentStageIdx(3);
      else setCurrentStageIdx(4);
    });
  }, [scrollYProgress]);

  // Live Clock
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

  // 3D Interactive Mouse Tilt Physics (For the real bottle image)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 140, damping: 22 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 140, damping: 22 });

  // Specular sheen position
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), { stiffness: 100, damping: 25 });
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), { stiffness: 100, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

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
    setTimeout(() => setAddedItem(null), 2200);
  };

  const scrollToStage = (progressTarget: number) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: containerRef.current.offsetTop + totalHeight * progressTarget,
      behavior: 'smooth',
    });
  };

  // Color mapping for atmospheric auras
  const auraColors: Record<string, string> = {
    bhairav: 'rgba(212, 139, 56, 0.32)', // Golden amber
    sarang: 'rgba(255, 122, 0, 0.30)',  // Solar citrus orange
    yaman: 'rgba(224, 109, 83, 0.32)',   // Twilight rose gold
    darbari: 'rgba(79, 70, 229, 0.30)',  // Midnight royal indigo
    malhar: 'rgba(13, 148, 136, 0.32)',  // Monsoon petrichor teal
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#0B0C10] text-white min-h-[500vh] font-sans selection:bg-[#ff4d17]/40 selection:text-white"
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* FIXED PINNED VIEWPORT (Armory.in Pinned Architecture)         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Subtle Armory Dot Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Dynamic Color Atmosphere Aura (Glows behind the photorealistic bottle) */}
        <motion.div
          animate={{
            backgroundColor: auraColors[activeRaga.id] || auraColors.bhairav,
          }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="pointer-events-none absolute w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full blur-[190px]"
        />

        {/* Floating Musical Clef Ambient Accent (Subtle, from Deck Slide 1) */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] flex items-center justify-center select-none overflow-hidden">
          <svg className="w-[1200px] h-[700px] stroke-white fill-none stroke-[0.75]" viewBox="0 0 1000 600">
            <path d="M 0 300 Q 250 100 500 300 T 1000 300" />
            <path d="M 0 340 Q 250 140 500 340 T 1000 340" />
            <path d="M 0 380 Q 250 180 500 380 T 1000 380" />
            <path d="M 0 420 Q 250 220 500 420 T 1000 420" />
            <path d="M 0 460 Q 250 260 500 460 T 1000 460" />
          </svg>
        </div>

        {/* ── ARMORY HUD: CORNER BRACKETS [ + ] ─────────────────────── */}
        <div className="pointer-events-none absolute inset-6 sm:inset-10 z-30 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-white/35 tracking-widest">[ + ]</span>
            <span className="font-mono text-xs text-white/35 tracking-widest">[ + ]</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-mono text-xs text-white/35 tracking-widest">[ + ]</span>
            <span className="font-mono text-xs text-white/35 tracking-widest">[ + ]</span>
          </div>
        </div>

        {/* ── ARMORY HUD: TELEMETRY BAR (Top under Nav) ─────────────── */}
        <div className="absolute top-[76px] inset-x-0 z-30 px-6 sm:px-12 flex items-center justify-between text-[11px] font-mono tracking-widest text-white/45 border-b border-white/[0.07] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d17] animate-pulse" />
            <span className="text-white font-medium">{timeStr}</span>
            <span className="opacity-40">•</span>
            <span className="text-[#ff4d17] font-semibold uppercase">{activeRaga.time}</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span>KANNAUJ 27.05°N, 79.91°E</span>
            <span className="opacity-30">•</span>
            <span className="text-white/80">INDIAN WEATHER PROOF</span>
            <span className="opacity-30">•</span>
            <span className="text-[#ff4d17]">432Hz HARMONIC</span>
          </div>

          <div className="flex items-center gap-2 text-white/70">
            <Clock className="w-3.5 h-3.5 text-[#ff4d17]" />
            <span className="uppercase tracking-wider font-semibold">PRAHAR {activeRagaIdx + 1} • {activeRaga.name}</span>
          </div>
        </div>

        {/* ── ARMORY HUD: VERTICAL SCROLL TRACKER (Right Side) ──────── */}
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-6">
          <div className="flex flex-col gap-3 font-mono text-[11px] tracking-widest text-right">
            {stages.map((stg, i) => {
              const isActive = i === currentStageIdx;
              return (
                <button
                  key={stg.id}
                  onClick={() => scrollToStage(stg.progress)}
                  className={`transition-all text-right flex items-center gap-3 py-0.5 cursor-pointer ${
                    isActive ? 'text-[#ff4d17] font-bold translate-x-0' : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  <span className="text-[9px] opacity-60">{stg.code}</span>
                  <span>{stg.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d17]" />}
                </button>
              );
            })}
          </div>

          {/* Vertical Progress Line with Armory Flame Slider */}
          <div className="w-[2px] h-36 bg-white/10 rounded-full relative overflow-hidden self-end mr-1">
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-[#ff4d17]"
            />
          </div>
        </div>

        {/* ── CENTER: THE REAL PHOTOREALISTIC BOTTLE (With 3D Physics) ── */}
        <div className="relative z-10 w-full h-full max-w-[540px] max-h-[680px] flex items-center justify-center pointer-events-none px-4">
          <motion.div
            style={{
              scale: bottleScale,
              y: bottleY,
              x: bottleX,
              rotateZ: bottleRotateZ,
              rotateX: tiltX,
              rotateY: tiltY,
              perspective: 1200,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-72 sm:w-88 md:w-[380px] h-[400px] sm:h-[480px] md:h-[530px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
          >
            {/* Dynamic Ground Shadow */}
            <div className="absolute -bottom-6 w-3/4 h-8 bg-black/80 rounded-full blur-xl scale-y-50 pointer-events-none" />

            {/* The Real Ultra-Clean Transparent Cutout of the PRAHAR Perfume Bottle */}
            <div className="relative w-full h-full drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
              <Image
                src="/images/bottle_hero.png"
                alt="PRAHAR Luxury Fragrance Bottle"
                fill
                sizes="(max-width: 768px) 300px, 450px"
                className="object-contain pointer-events-none select-none"
                priority
              />

              {/* Specular Light Sheen Overlay (Reacts dynamically to mouse tilt) */}
              <motion.div
                style={{
                  x: sheenX,
                  y: sheenY,
                }}
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-tr from-transparent via-white to-transparent rounded-3xl"
              />
            </div>
          </motion.div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* OVERLAY STAGES (Minimalist, Punchy, Editorial Luxury)         */}
        {/* ───────────────────────────────────────────────────────────── */}

        {/* ── STAGE 1: THE IDENTITY ─────────────────────────────────── */}
        <motion.div
          style={{ opacity: stage1Opacity, y: stage1Y }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end pb-24 sm:pb-28 px-6 sm:px-14 lg:px-20"
        >
          <div className="max-w-2xl pointer-events-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] uppercase bg-white/5 border border-white/15 text-[#ff4d17]">
                PRAHAR प्रहर × A.R. RAHMAN
              </span>
              <span className="text-white/40 text-[11px] font-mono hidden sm:inline">
                {"//"} 05:00 · PRE-DAWN
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              The fragrance you can hear.
            </h1>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#ff4d17] mt-3">
              "Every hour has a story. Every raga has a scent."
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => playRaga(activeRaga.id)}
                className="px-8 py-4 rounded-full bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3 shadow-[0_0_35px_rgba(255,77,23,0.45)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                <span>{isPlaying ? 'Pause Audio' : `Hear Raga ${activeRaga.name}`}</span>
              </button>

              <button
                onClick={() => handleAddToCart(activeRaga.id + '-edp', activeRaga.name + ' 50ml EDP', 2799, '50ml')}
                className="px-8 py-4 rounded-full border border-white/20 hover:border-[#ff4d17] bg-[#14161F]/60 backdrop-blur-md text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedItem ? 'Added to Bag ✓' : 'Order 50ml — ₹2,799'}</span>
              </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[11px] font-mono text-white/40 tracking-wider">
              <ChevronDown className="w-4 h-4 animate-bounce text-[#ff4d17]" />
              <span>SCROLL TO EXPLORE THE HOURS</span>
            </div>
          </div>
        </motion.div>

        {/* ── STAGE 2: THE QUESTION (Macro Zoom) ─────────────────────── */}
        <motion.div
          style={{ opacity: stage2Opacity, y: stage2Y }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-14 lg:px-20"
        >
          <div className="max-w-xl pointer-events-auto p-6 sm:p-10 rounded-3xl bg-[#14161F]/85 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#ff4d17] block mb-2">
              01 // THE LAW OF TIME
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              What if you could wear this?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/80 font-sans leading-relaxed">
              For centuries, Indian classical musicians sang each raga only at its own hour. 
              A morning raga sung at dusk disturbed the equilibrium of the soul.
            </p>

            <p className="mt-3 text-lg sm:text-xl text-[#ff4d17] font-serif italic">
              PRAHAR gives every hour its own scent and its own sound.
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
              <span>8 PRAHARS • 24 HOURS</span>
              <span>KANNNAUJ NATURAL EXTRACTION</span>
            </div>
          </div>
        </motion.div>

        {/* ── STAGE 3: THE FIVE PRAHARS (Interactive Sound & Light Shift) ── */}
        <motion.div
          style={{ opacity: stage3Opacity, y: stage3Y }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between py-24 sm:py-26 px-6 sm:px-14 lg:px-20"
        >
          <div className="text-center max-w-xl mx-auto pointer-events-auto">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#ff4d17] block mb-1">
              02 // THE FIVE SACRED MOVEMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
              Five hours. Five scents you can hear.
            </h2>
          </div>

          {/* Interactive Raga Matrix Pills */}
          <div className="pointer-events-auto max-w-4xl mx-auto w-full">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 bg-[#14161F]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/15 shadow-2xl">
              {ragas.map((r, i) => {
                const isSelected = i === activeRagaIdx;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleRagaSelect(i)}
                    className={`p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ff4d17] text-white shadow-[0_0_25px_rgba(255,77,23,0.4)] scale-102 font-semibold'
                        : 'bg-white/[0.04] border border-white/5 hover:bg-white/10 text-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                      <span>{r.time}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    </div>
                    <div className="font-serif text-lg font-bold mt-1 truncate">
                      {r.name}
                    </div>
                    <div className={`text-[10px] truncate font-sans ${isSelected ? 'text-white/90' : 'text-white/50'}`}>
                      {r.mood}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Selected Bar with Live Sound & 1-Click Buy */}
            <div className="mt-3 p-4 rounded-2xl bg-[#14161F]/90 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-[#ff4d17] uppercase tracking-wider font-bold shrink-0">
                  {activeRaga.name} NOTES:
                </span>
                <span className="text-white/80 truncate">
                  {activeRaga.character}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(activeRaga.id + '-edp', activeRaga.name + ' 50ml EDP', 2799, '50ml')}
                className="px-5 py-2.5 rounded-full bg-[#ff4d17] hover:bg-[#e03d07] text-white uppercase tracking-wider font-bold transition-all shadow flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{addedItem ? 'Added ✓' : 'Add 50ml • ₹2,799'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── STAGE 4: DIGITAL SOUNDLAB (A.R. Rahman Collaboration) ─── */}
        <motion.div
          style={{ opacity: stage4Opacity, y: stage4Y }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-14 lg:px-20"
        >
          <div className="max-w-xl pointer-events-auto p-6 sm:p-10 rounded-3xl bg-[#14161F]/90 backdrop-blur-2xl border border-white/15 shadow-2xl">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#ff4d17] block mb-2">
              03 // A.R. RAHMAN COLLABORATION
            </span>

            <h3 className="font-serif text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Sound and scent share the exact same language.
            </h3>

            <p className="font-serif italic text-xl sm:text-2xl text-[#ff4d17] mt-2">
              "Notes. Chords. Accords. Resonance."
            </p>

            <p className="text-sm text-white/70 font-sans mt-4 leading-relaxed">
              Every physical PRAHAR bottle embeds a digital gateway. 
              Scan the authenticated QR on the bottle base to stream its exclusive raga performance mastered in 432Hz.
            </p>

            {/* Live 24-Bar Waveform Equalizer */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-end gap-1.5 h-8">
                {[10, 22, 30, 14, 28, 18, 26, 12, 24, 16, 30, 14, 20, 28, 12, 24].map((h, idx) => (
                  <motion.span
                    key={idx}
                    animate={
                      isPlaying
                        ? { height: ['4px', `${h}px`, '4px'] }
                        : { height: '4px' }
                    }
                    transition={
                      isPlaying
                        ? { repeat: Infinity, duration: 0.45 + (idx % 4) * 0.12, ease: 'easeInOut' }
                        : {}
                    }
                    className="w-1 bg-[#ff4d17] rounded-full"
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (isPlaying) togglePlay();
                  else playRaga(activeRaga.id);
                }}
                className="px-6 py-2.5 rounded-full bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(255,77,23,0.4)] cursor-pointer"
              >
                {isPlaying ? 'Pause Audio' : `Stream Raga ${activeRaga.name}`}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── STAGE 5: THE COLLECTION / ACQUISITION ──────────────────── */}
        <motion.div
          style={{ opacity: stage5Opacity, y: stage5Y }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-16 px-6 sm:px-14 lg:px-20"
        >
          <div className="max-w-5xl mx-auto w-full pointer-events-auto">
            <div className="text-center mb-6">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#ff4d17] block mb-1">
                04 // CHOOSE YOUR RITUAL
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
                Beyond the bottle.
              </h2>
              <p className="font-serif italic text-lg text-[#ff4d17] mt-1">
                Wear a prahar. Gift a prahar. Live the ritual.
              </p>
            </div>

            {/* 4 Minimalist Dark Luxury Buy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: 50ml EDP */}
              <div className="p-5 rounded-2xl bg-[#14161F] border border-white/10 flex flex-col justify-between hover:border-[#ff4d17] transition-all shadow-lg">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d17] block">
                    HAUTE PARFUM • 50ML
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white mt-1">
                    {activeRaga.name} EDP
                  </h4>
                  <span className="font-serif text-2xl font-bold text-white block mt-2">
                    ₹2,799
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(activeRaga.id + '-edp', activeRaga.name + ' 50ml EDP', 2799, '50ml')}
                  className="mt-5 w-full py-2.5 rounded-xl bg-[#ff4d17] hover:bg-[#e03d07] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow"
                >
                  {addedItem === activeRaga.id + '-edp' ? 'Added ✓' : '+ Add to Bag'}
                </button>
              </div>

              {/* Card 2: 10ml Attar */}
              <div className="p-5 rounded-2xl bg-[#14161F] border border-white/10 flex flex-col justify-between hover:border-[#ff4d17] transition-all shadow-lg">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                    PURE ATTAR • 10ML
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white mt-1">
                    {activeRaga.name} Roll-on
                  </h4>
                  <span className="font-serif text-2xl font-bold text-white block mt-2">
                    ₹1,499
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(activeRaga.id + '-attar', activeRaga.name + ' 10ml Attar', 1499, '10ml')}
                  className="mt-5 w-full py-2.5 rounded-xl border border-white/20 hover:border-[#ff4d17] text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {addedItem === activeRaga.id + '-attar' ? 'Added ✓' : '+ Add to Bag'}
                </button>
              </div>

              {/* Card 3: Discovery Set */}
              <div className="p-5 rounded-2xl bg-[#14161F] border border-white/10 flex flex-col justify-between hover:border-[#ff4d17] transition-all shadow-lg">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d17] block">
                    BESTSELLER • 5×2ML
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white mt-1">
                    Discovery Set
                  </h4>
                  <span className="font-serif text-2xl font-bold text-white block mt-2">
                    ₹999
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart('discovery-set-5', 'PRAHAR Discovery Set (5×2ml)', 999, '5×2ml')}
                  className="mt-5 w-full py-2.5 rounded-xl border border-white/20 hover:border-[#ff4d17] text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {addedItem === 'discovery-set-5' ? 'Added ✓' : '+ Add to Bag'}
                </button>
              </div>

              {/* Card 4: Raga Candle */}
              <div className="p-5 rounded-2xl bg-[#14161F] border border-white/10 flex flex-col justify-between hover:border-[#ff4d17] transition-all shadow-lg">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                    SOY BEESWAX • 200G
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white mt-1">
                    {activeRaga.name} Candle
                  </h4>
                  <span className="font-serif text-2xl font-bold text-white block mt-2">
                    ₹1,299
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(activeRaga.id + '-candle', activeRaga.name + ' Candle 200g', 1299, '200g')}
                  className="mt-5 w-full py-2.5 rounded-xl border border-white/20 hover:border-[#ff4d17] text-white hover:text-[#ff4d17] font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {addedItem === activeRaga.id + '-candle' ? 'Added ✓' : '+ Add to Bag'}
                </button>
              </div>
            </div>

            {/* Minimal Armory Footer Navigation */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/40">
              <div className="flex items-center gap-6">
                <Link href="/our-story" className="hover:text-[#ff4d17] transition-colors">
                  [ 01 OUR STORY ]
                </Link>
                <Link href="/fragrances" className="hover:text-[#ff4d17] transition-colors">
                  [ 02 THE FIVE RAGAS ]
                </Link>
                <Link href="/experience" className="hover:text-[#ff4d17] transition-colors">
                  [ 03 DIGITAL SOUNDLAB ]
                </Link>
              </div>
              <span>PRAHAR प्रहर © 2026 • ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
