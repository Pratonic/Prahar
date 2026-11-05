'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Radio, Sparkles, Feather, Volume2 } from 'lucide-react';
import { useAudioStore } from '@/lib/audio';

export default function HowItWorks() {
  const playRaga = useAudioStore((s) => s.playRaga);

  return (
    <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#F5EBDD] border-t border-[#B38A45]/20 text-[#24160F]">
      <div className="mx-auto max-w-[1440px]">
        {/* Header from Slide 9 */}
        <div className="flex items-center justify-between border-b border-[#24160F]/15 pb-4 mb-12">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
            <span className="font-serif text-lg text-[#B96A2D]">प्रहर</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B96A2D]">
            <Clock className="w-3.5 h-3.5" />
            <span>10:00 • MORNING</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 4 Steps from Slide 9 */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-5xl sm:text-6xl text-[#24160F] tracking-tight">
              How it works.
            </h2>

            <p className="font-serif italic text-2xl text-[#B96A2D] mt-2 mb-2">
              Fragrance and music, synced to your hour.
            </p>

            <p className="text-sm sm:text-base text-[#24160F]/70 font-sans mb-10">
              Simple, seamless and personal.
            </p>

            {/* Step list with vertical line */}
            <div className="relative pl-8 space-y-8 border-l-2 border-[#B38A45]/30 ml-2">
              {/* Step 01 */}
              <div className="relative group">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#F5EBDD] border-2 border-[#B38A45] flex items-center justify-center text-[10px] font-mono text-[#B38A45] font-bold">
                  1
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#B96A2D] font-semibold">
                    01 • CHOOSE YOUR HOUR
                  </span>
                  <h3 className="font-serif text-2xl text-[#24160F] mt-0.5">
                    Pick a raga or let the app suggest.
                  </h3>
                  <p className="text-sm text-[#24160F]/75 font-sans mt-1">
                    Select based on current time or take our intuitive psychological consultation.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="relative group">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#F5EBDD] border-2 border-[#B38A45] flex items-center justify-center text-[10px] font-mono text-[#B38A45] font-bold">
                  2
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#B96A2D] font-semibold">
                    02 • PLAY THE RAGA
                  </span>
                  <h3 className="font-serif text-2xl text-[#24160F] mt-0.5">
                    The app plays a curated Raga soundtrack.
                  </h3>
                  <p className="text-sm text-[#24160F]/75 font-sans mt-1">
                    Every bottle features a QR code linking directly to its raga-inspired musical performance.
                  </p>
                  <button
                    onClick={() => playRaga('sarang')}
                    className="mt-2 text-xs font-mono uppercase tracking-wider text-[#B96A2D] hover:underline flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Try Streaming Sarang Now →</span>
                  </button>
                </div>
              </div>

              {/* Step 03 */}
              <div className="relative group">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#F5EBDD] border-2 border-[#B38A45] flex items-center justify-center text-[10px] font-mono text-[#B38A45] font-bold">
                  3
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#B96A2D] font-semibold">
                    03 • WEAR THE SCENT
                  </span>
                  <h3 className="font-serif text-2xl text-[#24160F] mt-0.5">
                    Apply the matching PRAHAR attar or perfume.
                  </h3>
                  <p className="text-sm text-[#24160F]/75 font-sans mt-1">
                    Roll or spray onto pulse points to complete the sensory immersion.
                  </p>
                </div>
              </div>

              {/* Step 04 */}
              <div className="relative group">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#F5EBDD] border-2 border-[#B38A45] flex items-center justify-center text-[10px] font-mono text-[#B38A45] font-bold">
                  4
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#B96A2D] font-semibold">
                    04 • LIVE THE HOUR
                  </span>
                  <h3 className="font-serif text-2xl text-[#24160F] mt-0.5">
                    Let fragrance and music set your mood.
                  </h3>
                  <p className="text-sm text-[#24160F]/75 font-sans mt-1">
                    Carry emotional presence and tranquil focus throughout your day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pure Photo of iPhone Music Interface & Bottle */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30 bg-[#17131D]">
            <Image
              src="/images/clean/iphone_raga_ritual_pure.jpg"
              alt="PRAHAR app on iPhone with perfume bottle"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Slide 9 Bottom Signature Bar */}
        <div className="mt-14 pt-4 border-t border-[#24160F]/15 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#24160F]/70">
          <span>PRAHAR प्रहर</span>
          <span className="hidden sm:inline">MADE FOR EVERY HOUR • ROOTED IN INDIA • MORE THAN A PERFUME</span>
          <span>SAME RAGA. DIFFERENT YOU.</span>
        </div>
      </div>
    </section>
  );
}
