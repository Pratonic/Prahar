'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Mail, Compass, Music, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#17131D] text-white pt-20 pb-12 overflow-hidden border-t border-[#B38A45]/30">
      {/* Subtle background ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[700px] rounded-full blur-[160px] opacity-15 bg-[#B38A45]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Top Branding Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10 items-start">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block group">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl sm:text-5xl tracking-[0.2em] text-white group-hover:text-[#D6B77C] transition-colors">
                  PRAHAR
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-[#D6B77C]">
                  प्रहर
                </span>
              </div>
            </Link>

            <p className="font-serif italic text-lg sm:text-xl text-[#D6B77C] mt-4">
              "Rooted in India. Modern expressions. A fragrance for every hour."
            </p>

            <p className="mt-4 text-xs sm:text-sm text-white/60 font-sans max-w-md leading-relaxed">
              PRAHAR brings the sacred ancient Indian relationship between time, emotion, and music 
              into the realm of luxury perfumery. Handcrafted in India.
            </p>

            <div className="mt-6 flex items-center gap-4 text-xs font-mono text-white/50">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Studio & Laboratory: Mumbai • Kannauj • Bengaluru</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Col 1: Discover */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D6B77C] block mb-4">
                Discover
              </span>
              <ul className="space-y-3 text-xs sm:text-sm font-sans text-white/70">
                <li>
                  <Link href="/fragrances" className="hover:text-white transition-colors">
                    The Five Ragās
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    The Collection
                  </Link>
                </li>
                <li>
                  <Link href="/shop/discovery-set" className="hover:text-white transition-colors">
                    Discovery Set
                  </Link>
                </li>
                <li>
                  <Link href="/shop/diwali-gift-box" className="hover:text-white transition-colors">
                    Diwali Gift Box
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="hover:text-[#D6B77C] text-[#D6B77C]/90 font-medium transition-colors flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Find Your Raga</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: The Ragās */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D6B77C] block mb-4">
                The 5 Hours
              </span>
              <ul className="space-y-3 text-xs sm:text-sm font-sans text-white/70">
                <li>
                  <Link href="/experience/bhairav" className="hover:text-white transition-colors">
                    01 Bhairav (Dawn)
                  </Link>
                </li>
                <li>
                  <Link href="/experience/sarang" className="hover:text-white transition-colors">
                    02 Sarang (Noon)
                  </Link>
                </li>
                <li>
                  <Link href="/experience/yaman" className="hover:text-white transition-colors">
                    03 Yaman (Dusk)
                  </Link>
                </li>
                <li>
                  <Link href="/experience/darbari" className="hover:text-white transition-colors">
                    04 Darbari (Midnight)
                  </Link>
                </li>
                <li>
                  <Link href="/experience/malhar" className="hover:text-white transition-colors">
                    05 Malhar (Rain)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Story & Experience */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D6B77C] block mb-4">
                Experience
              </span>
              <ul className="space-y-3 text-xs sm:text-sm font-sans text-white/70">
                <li>
                  <Link href="/experience" className="hover:text-white transition-colors flex items-center gap-1">
                    <Music className="w-3 h-3 text-[#D6B77C]" />
                    <span>Music Player</span>
                  </Link>
                </li>
                <li>
                  <Link href="/our-story" className="hover:text-white transition-colors">
                    Brand Story
                  </Link>
                </li>
                <li>
                  <Link href="/discover" className="hover:text-white transition-colors">
                    #ListenToTheScent
                  </Link>
                </li>
                <li>
                  <Link href="/our-story#philosophy" className="hover:text-white transition-colors">
                    Three Pillars
                  </Link>
                </li>
                <li>
                  <Link href="/our-story#craft" className="hover:text-white transition-colors">
                    Kannauj Distilling
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Concierge */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D6B77C] block mb-4">
                Concierge
              </span>
              <ul className="space-y-3 text-xs sm:text-sm font-sans text-white/70">
                <li>
                  <a
                    href="mailto:concierge@prahar.in"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-[#D6B77C]" />
                    <span>concierge@prahar.in</span>
                  </a>
                </li>
                <li>
                  <span className="text-white/40 cursor-default">
                    +91 1800-PRAHAR
                  </span>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#D6B77C] transition-colors flex items-center gap-1.5"
                  >
                    <Instagram className="w-3 h-3 text-[#D6B77C]" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <span className="text-[10px] font-mono text-white/40 block mt-2">
                    Complimentary Pan-India shipping on all orders
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ambient Animated Soundwave Ribbon */}
        <div className="py-8 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D6B77C]">
              Continuous Raga Resonance
            </span>
            <div className="flex items-end gap-1 h-5">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: ['4px', `${8 + ((i * 5) % 16)}px`, '4px'],
                  }}
                  transition={{
                    duration: 1.2 + (i % 5) * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-0.5 bg-[#D6B77C] rounded-full"
                />
              ))}
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-[#D6B77C] transition-colors group"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-sans gap-4">
          <div>
            © {new Date().getFullYear()} PRAHAR (प्रहर) Luxury Fragrances. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/our-story" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/our-story" className="hover:text-white transition-colors">
              Terms of Experience
            </Link>
            <span>•</span>
            <span className="text-white/40 flex items-center gap-1">
              Crafted with classical devotion in Bharat
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
