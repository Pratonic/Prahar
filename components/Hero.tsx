'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Volume2, Play, Pause, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useAudioStore } from '@/lib/audio';

export default function Hero() {
  const [timeStr, setTimeStr] = useState('05:00');
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const playRaga = useAudioStore((s) => s.playRaga);
  const togglePlay = useAudioStore((s) => s.togglePlay);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hrs}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroPlay = () => {
    if (isPlaying && currentRagaId === 'bhairav') {
      togglePlay();
    } else {
      playRaga('bhairav');
    }
  };

  return (
    <section className="relative min-h-screen bg-[#07050B] text-white flex flex-col justify-between pt-24 pb-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,33,85,0.4)_0%,rgba(7,5,11,1)_70%)]" />

      {/* Atmospheric flowing musical staves & floating notes in deep blue/violet */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35">
        <svg
          className="absolute w-[180%] -left-[40%] top-1/4 h-[500px]"
          viewBox="0 0 1600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stave lines */}
          <path d="M0,280 C400,100 800,450 1600,200" stroke="#4C347E" strokeWidth="1.5" />
          <path d="M0,300 C400,120 800,470 1600,220" stroke="#4C347E" strokeWidth="1.5" />
          <path d="M0,320 C400,140 800,490 1600,240" stroke="#4C347E" strokeWidth="1.5" />
          <path d="M0,340 C400,160 800,510 1600,260" stroke="#4C347E" strokeWidth="1.5" />
          <path d="M0,360 C400,180 800,530 1600,280" stroke="#4C347E" strokeWidth="1.5" />
        </svg>

        {/* Floating musical symbols (treble clef, bass clef, notes) */}
        <div className="absolute top-1/3 left-16 text-6xl text-[#6B4EAA]/40 font-serif select-none animate-float-slow">
          𝄞
        </div>
        <div className="absolute top-1/4 right-24 text-7xl text-[#6B4EAA]/35 font-serif select-none animate-float-delayed">
          𝄢
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-5xl text-[#D6B77C]/30 select-none animate-float">
          ♪
        </div>
        <div className="absolute top-2/3 right-1/3 text-6xl text-[#6B4EAA]/40 select-none animate-float-slow">
          ♫
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-5 md:px-10 lg:px-16 flex flex-col items-center text-center my-auto">
        {/* Top Tag: 05:00 · PRE-DAWN */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-4 text-xs font-mono tracking-[0.3em] uppercase text-[#D6B77C]"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{timeStr} • PRE-DAWN • RAGA BHAIRAV</span>
        </motion.div>

        {/* Brand Title: PRAHAR */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-6xl sm:text-8xl lg:text-9xl tracking-[0.25em] text-white font-normal"
        >
          PRAHAR
        </motion.h1>

        {/* Devanagari & Collaboration Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center mt-1"
        >
          <span className="font-serif text-3xl sm:text-4xl text-[#E8A856] tracking-wider">
            प्रहर
          </span>
          <span className="text-xs sm:text-sm font-serif tracking-[0.35em] uppercase text-white/80 mt-2 font-light">
            × A.R. RAHMAN
          </span>
        </motion.div>

        {/* Central High-Definition Perfume Bottle from Deck */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative my-8 sm:my-10 w-64 sm:w-80 h-72 sm:h-96 flex items-center justify-center group"
        >
          {/* Subtle warm amber radial light emanating from behind bottle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B96A2D]/40 to-[#D6B77C]/30 blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />

          {/* Real extracted bottle render from Slide 1 of the PDF */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/extracted/img_p1_2.png"
              alt="PRAHAR Luxury Perfume Bottle"
              width={340}
              height={480}
              priority
              className="object-contain drop-shadow-[0_20px_50px_rgba(232,168,86,0.25)] hover:scale-102 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-serif italic text-2xl sm:text-3xl text-white/90"
        >
          The fragrance you can hear.
        </motion.p>

        {/* Action Buttons: Hear The Music & Explore */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleHeroPlay}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#B38A45] via-[#D6B77C] to-[#B38A45] text-[#17131D] font-sans text-xs uppercase tracking-[0.25em] font-bold flex items-center gap-3 shadow-[0_0_30px_rgba(214,183,124,0.35)] hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying && currentRagaId === 'bhairav' ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Pre-Dawn Raga</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Hear Raga Bhairav (Audio)</span>
              </>
            )}
          </button>

          <Link
            href="/fragrances"
            className="px-8 py-4 rounded-full border border-white/30 hover:border-[#D6B77C] text-white hover:text-[#D6B77C] font-sans text-xs uppercase tracking-[0.25em] font-semibold transition-colors flex items-center gap-2 backdrop-blur-sm"
          >
            <span>Explore The 5 Fragrances</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>

      {/* Slide 1 Footer Credit Banner */}
      <div className="relative z-10 w-full border-t border-white/10 pt-4 text-center">
        <div className="text-[11px] font-mono tracking-[0.2em] text-white/50 uppercase">
          ARYAN • ABHINAV • PRATYUSH • ATHARV VYAS • PES UNIVERSITY
        </div>
        <div className="text-[10px] font-mono tracking-[0.25em] text-[#D6B77C]/70 uppercase mt-1">
          VENDITION VENDETTA • ATHARV RANBHOOMI '26 • IIM INDORE
        </div>
      </div>
    </section>
  );
}
