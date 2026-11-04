'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Radio, Play, Pause, Sparkles, Flame, Music, Share2 } from 'lucide-react';
import { useAudioStore } from '@/lib/audio';

const days = [
  { day: 'DAY 1', time: '6 am', title: 'Bhairav clip', ragaId: 'bhairav' },
  { day: 'DAY 2', time: 'Noon', title: 'Sarang clip', ragaId: 'sarang' },
  { day: 'DAY 3', time: '7 pm', title: 'Yaman clip', ragaId: 'yaman' },
  { day: 'DAY 4', time: 'Midnight', title: 'Darbari clip', ragaId: 'darbari' },
  { day: 'DAY 5', time: 'In the rain', title: 'Malhar clip', ragaId: 'malhar' },
  { day: 'DAY 6', time: 'Wear it', title: 'Ab ise pehno', ragaId: 'yaman' },
  { day: 'DAY 7', time: 'Launch', title: 'Film + site live', ragaId: 'bhairav' },
];

export default function CampaignSection() {
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const playRaga = useAudioStore((s) => s.playRaga);

  return (
    <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#17131D] text-white overflow-hidden border-t border-[#B38A45]/30">
      <div className="mx-auto max-w-[1440px]">
        {/* Header from Slide 10 */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-12">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
            <span className="font-serif text-lg text-[#D6B77C]">प्रहर</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D6B77C]">
            <Clock className="w-3.5 h-3.5" />
            <span>18:00 • DUSK</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Campaign Concept & Timelines */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6B77C] block mb-2">
              LAUNCH CAMPAIGN
            </span>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white">
              #ListenToTheScent
            </h2>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#D6B77C] mt-2 mb-8">
              "India hears it before it smells it."
            </p>

            {/* 7-Day Teaser Timeline */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D6B77C]">
                  TEASER • 7 DAYS • SOUND FIRST, NO PRODUCT
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white/60">
                  AIDA: ATTENTION • INTEREST
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {days.map((item) => {
                  const isThisPlaying = isPlaying && currentRagaId === item.ragaId;
                  return (
                    <button
                      key={item.day}
                      onClick={() => playRaga(item.ragaId)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isThisPlaying
                          ? 'bg-[#B38A45] border-[#D6B77C] text-white shadow-md'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                      }`}
                    >
                      <div className="text-[9px] font-mono text-[#D6B77C] uppercase">
                        {item.day}
                      </div>
                      <div className="text-xs font-bold mt-0.5">{item.time}</div>
                      <div className="text-[10px] opacity-70 mt-1 truncate">{item.title}</div>
                      <div className="mt-2 text-[9px] uppercase font-mono text-[#D6B77C]">
                        {isThisPlaying ? 'Playing' : '▶ Play'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Launch Night & Festive Gifting Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D6B77C] block mb-1">
                  LAUNCH NIGHT
                </span>
                <h4 className="font-serif text-xl text-white">
                  Rahman live in concert
                </h4>
                <p className="text-xs text-white/70 font-sans mt-2 leading-relaxed">
                  As each raga plays, its corresponding fragrance mist fills the acoustic venue.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D6B77C] block mb-1">
                  DIWALI FESTIVE SEASON
                </span>
                <h4 className="font-serif text-xl text-white">
                  Raga candles lead gifting
                </h4>
                <p className="text-xs text-white/70 font-sans mt-2 leading-relaxed">
                  Diwali Diya Set ₹2,499, the season's premier luxury spiritual gift box.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Real High-Res Photo from Slide 10 */}
          <div className="lg:col-span-5 relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30">
            <Image
              src="/images/extracted/img_p10_1.jpeg"
              alt="Listen to the Scent Campaign with Phone and Candles"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Slide 10 Bottom Signature Bar */}
        <div className="mt-14 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-white/50">
          <span>PRAHAR प्रहर</span>
          <span className="hidden sm:inline">MADE FOR EVERY HOUR • ROOTED IN INDIA • MORE THAN A PERFUME</span>
          <span>#LISTENTOTHESCENT</span>
        </div>
      </div>
    </section>
  );
}
