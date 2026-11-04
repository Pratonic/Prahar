'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Feather, Heart, Leaf, Clock, Store, MapPin, Gift, Award, Music2 } from 'lucide-react';

export default function BrandPhilosophy() {
  return (
    <div className="bg-[#F5EBDD] text-[#24160F]">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 13: Impact & Future                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#F5EBDD] border-t border-[#B38A45]/20">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#24160F]/15 pb-4 mb-12">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
              <span className="font-serif text-lg text-[#B96A2D]">प्रहर</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B96A2D]">
              <Clock className="w-3.5 h-3.5" />
              <span>13 • IMPACT & FUTURE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Pillars & Future Expansions */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-5xl sm:text-6xl text-[#24160F] tracking-tight">
                Impact & Future.
              </h2>
              <p className="mt-2 text-base text-[#24160F]/80 font-sans leading-relaxed">
                PRAHAR is more than a fragrance — it's a movement to bring mindfulness, culture and emotion back into everyday living.
              </p>

              {/* 3 Pillars from Slide 13 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                <div className="p-5 rounded-2xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <Feather className="w-5 h-5 text-[#B96A2D] mb-2" />
                  <h4 className="font-serif text-lg font-bold">CULTURAL IMPACT</h4>
                  <p className="text-xs text-[#24160F]/70 font-sans mt-1">
                    Revives India's rich musical heritage for a modern generation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <Heart className="w-5 h-5 text-[#B96A2D] mb-2" />
                  <h4 className="font-serif text-lg font-bold">WELLBEING IMPACT</h4>
                  <p className="text-xs text-[#24160F]/70 font-sans mt-1">
                    Encourages mindful living, emotional balance and presence in daily life.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <Leaf className="w-5 h-5 text-[#B96A2D] mb-2" />
                  <h4 className="font-serif text-lg font-bold">SUSTAINABILITY</h4>
                  <p className="text-xs text-[#24160F]/70 font-sans mt-1">
                    Clean ingredients, eco-friendly packaging, and support for local artisans and farmers.
                  </p>
                </div>
              </div>

              {/* Future Expansion from Slide 13 */}
              <div className="p-6 rounded-2xl bg-[#EADBC5]/40 border border-[#B38A45]/25">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B96A2D] block mb-4">
                  FUTURE EXPANSION ROADMAP
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
                  <div>
                    <span className="font-bold block text-[#24160F]">HOME FRAGRANCES</span>
                    <span className="text-[#24160F]/70">Diffusers, incense and room mists.</span>
                  </div>
                  <div>
                    <span className="font-bold block text-[#24160F]">WELLNESS</span>
                    <span className="text-[#24160F]/70">Raga meditation retreats & sessions.</span>
                  </div>
                  <div>
                    <span className="font-bold block text-[#24160F]">ARTIST DROPS</span>
                    <span className="text-[#24160F]/70">Limited fragrances with iconic musicians.</span>
                  </div>
                  <div>
                    <span className="font-bold block text-[#24160F]">GLOBAL REACH</span>
                    <span className="text-[#24160F]/70">Taking Indian fragrance & music to the world.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Real Photo from Slide 13 (Varanasi Ghats at Dusk) */}
            <div className="lg:col-span-5 relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30">
              <Image
                src="/images/extracted/img_p13_1.jpeg"
                alt="Varanasi Ghats at Sunset with Prahar Perfume Bottle"
                fill
                className="object-cover"
              />
              <div className="absolute top-6 right-6 p-4 rounded-2xl bg-black/50 backdrop-blur-md text-white text-right max-w-xs border border-white/20">
                <p className="font-serif italic text-lg leading-snug">
                  "Rooted in India. Made for every hour. Meant for everywhere."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 14: Where Ritual Meets Reality (Retail & Distribution)  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#EADBC5]/40 border-t border-[#B38A45]/20">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center justify-between border-b border-[#24160F]/15 pb-4 mb-12">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
              <span className="font-serif text-lg text-[#B96A2D]">प्रहर</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B96A2D]">
              <Store className="w-3.5 h-3.5" />
              <span>14 • RETAIL & DISTRIBUTION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-5">
              <h2 className="font-serif text-5xl sm:text-6xl text-[#24160F] tracking-tight leading-[1.1]">
                Where Ritual{' '}
                <span className="italic font-normal text-[#B96A2D] block">
                  Meets Reality.
                </span>
              </h2>

              <p className="mt-4 text-base text-[#24160F]/80 font-sans leading-relaxed">
                From curated retail spaces to your doorstep — PRAHAR is designed to be experienced, everywhere.
              </p>

              {/* Channels List */}
              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-xl bg-[#F5EBDD] border border-[#B38A45]/20">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#B96A2D] font-bold block mb-1">
                    ONLINE ACCESS • D2C FIRST • LAUNCH
                  </span>
                  <p className="text-xs text-[#24160F]/70 font-sans">
                    Official Website, Amazon & Flipkart, Social Commerce (Instagram Shop), and Limited Edition Drops.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5EBDD] border border-[#B38A45]/20">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#B38A45] font-bold block mb-1">
                    SELECT RETAIL PARTNERS • 2029+
                  </span>
                  <p className="text-xs text-[#24160F]/70 font-sans">
                    Sublime (Bangalore), Nykaa Luxe (Select Cities), and Tira Luxury Lounges.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5EBDD] border border-[#B38A45]/20">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#B38A45] font-bold block mb-1">
                    FLAGSHIP EXPERIENCE STORES
                  </span>
                  <p className="text-xs text-[#24160F]/70 font-sans">
                    Bangalore (Indiranagar Flagship) • Upcoming: Delhi & Mumbai.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: High-Res Photo from Slide 14 */}
            <div className="lg:col-span-7 relative h-[440px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30">
              <Image
                src="/images/extracted/img_p14_1.jpeg"
                alt="PRAHAR Retail Stores and Gifting Boxes"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 15: More Than a Fragrance. A Movement.                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#17131D] text-white border-t border-[#B38A45]/30">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-12">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
              <span className="font-serif text-lg text-[#D6B77C]">प्रहर</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D6B77C]">
              <span>15 • IMPACT & ROADMAP</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Heading & Indicative Year-One Budget */}
            <div className="lg:col-span-6">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                More Than a Fragrance.{' '}
                <span className="italic font-normal text-[#D6B77C] block">
                  A Movement.
                </span>
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/70 font-sans">
                Why customers come back: refills, a monsoon edition every year, new Rahman tracks and raga candles.
              </p>

              {/* Year-One Budget ₹3 Cr from Slide 15 */}
              <div className="mt-8 p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D6B77C]">
                    YEAR-ONE BUDGET • ₹3 CR (INDICATIVE)
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <span className="font-serif text-xl font-bold text-[#D6B77C] block">25%</span>
                    <span className="text-[10px] text-white/60">Sampling</span>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <span className="font-serif text-xl font-bold text-[#D6B77C] block">25%</span>
                    <span className="text-[10px] text-white/60">Rahman Film</span>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <span className="font-serif text-xl font-bold text-[#D6B77C] block">20%</span>
                    <span className="text-[10px] text-white/60">Ads</span>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <span className="font-serif text-xl font-bold text-[#D6B77C] block">15%</span>
                    <span className="text-[10px] text-white/60">Creators</span>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <span className="font-serif text-xl font-bold text-[#D6B77C] block">10%</span>
                    <span className="text-[10px] text-white/60">Nykaa</span>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <span className="font-serif text-xl font-bold text-[#D6B77C] block">5%</span>
                    <span className="text-[10px] text-white/60">PR Launch</span>
                  </div>
                </div>
              </div>

              {/* Cultural Legacy note */}
              <div className="mt-6 p-4 rounded-xl bg-[#B38A45]/20 border border-[#B38A45]/30">
                <p className="font-serif italic text-sm text-[#D6B77C]">
                  "Every purchase keeps the raga alive. A portion of proceeds goes towards supporting Indian classical music education and heritage preservation."
                </p>
              </div>
            </div>

            {/* Right: High-Res Photo from Slide 15 */}
            <div className="lg:col-span-6 relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/images/extracted/img_p15_1.jpeg"
                alt="PRAHAR Roadmap and Movement Visual"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 16: Thank You. Let's Bring Every PRAHAR to Life.       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#0E0B14] text-white border-t border-[#B38A45]/20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D6B77C] block mb-2">
                INDIAN ROOTS • MODERN EXPRESSIONS
              </span>

              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
                Thank You.{' '}
                <span className="italic font-normal text-[#D6B77C] block">
                  Let's Bring Every PRAHAR to Life.
                </span>
              </h2>

              <p className="mt-4 text-base text-white/80 font-sans leading-relaxed">
                PRAHAR is more than a fragrance brand — it is a celebration of India's timeless ragas, designed for today's world.
              </p>

              {/* 3 Pillars from Slide 16 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-[#D6B77C] block mb-1">01 • SENSORY REVIVAL</span>
                  <p className="text-xs text-white/70">Bringing Indian classical music into everyday life through scent.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-[#D6B77C] block mb-1">02 • MEANINGFUL IMPACT</span>
                  <p className="text-xs text-white/70">Supporting Indian artists, preserving heritage, and empowering artisans.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-[#D6B77C] block mb-1">03 • SCALABLE FUTURE</span>
                  <p className="text-xs text-white/70">Expanding globally with retail, digital, and live acoustic experiences.</p>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#B38A45]/30 to-transparent border-l-4 border-[#D6B77C]">
                <p className="font-serif italic text-xl text-[#D6B77C]">
                  "Because every hour in India has a story. And now, a scent."
                </p>
                <span className="block text-xs font-mono text-white/50 mt-2 uppercase">PRAHAR • प्रहर</span>
              </div>
            </div>

            {/* Right: High-Res Photo from Slide 16 */}
            <div className="lg:col-span-6 relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/images/extracted/img_p16_1.jpeg"
                alt="Varanasi Ghats Temple Lights at Dusk"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
