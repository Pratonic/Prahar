'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Award, Music, Film, CheckCircle2 } from 'lucide-react';

export default function StorySection() {
  return (
    <div className="bg-[#F5EBDD] text-[#24160F]">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 2: What if you could wear this?                        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] bg-[#E8850C] text-[#24160F] flex flex-col justify-between py-16 px-5 sm:px-10 lg:px-16 overflow-hidden">
        {/* Real Slide 2 Background with Smoke curling into musical notes */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/extracted/img_p2_1.jpeg"
            alt="Prahar Bottle with musical smoke"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8850C]/90 via-[#E8850C]/50 to-transparent lg:w-3/5" />
        </div>

        {/* Slide 2 Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#24160F]/15 pb-4">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-medium">
              PRAHAR
            </span>
            <span className="font-serif text-lg sm:text-xl text-[#24160F]/80">
              प्रहर
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#24160F]">
            <Clock className="w-3.5 h-3.5" />
            <span>06:00 • BHAIRAV</span>
          </div>
        </div>

        {/* Slide 2 Editorial Copy */}
        <div className="relative z-10 max-w-2xl my-auto py-12">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif italic text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#24160F] leading-[1.05]"
          >
            What if you could wear this?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-2xl sm:text-3xl text-[#24160F] mt-6 font-medium"
          >
            Prahar: the fragrance you can hear.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-base sm:text-lg text-[#24160F]/90 mt-4 leading-relaxed max-w-lg"
          >
            For centuries, Indian musicians sang each raga only at its own hour. 
            Prahar gives every hour its own scent.
          </motion.p>
        </div>

        {/* Slide 2 Bottom Signature Bar */}
        <div className="relative z-10 pt-4 border-t border-[#24160F]/15 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#24160F]/70">
          <span>PRAHAR प्रहर</span>
          <span className="hidden sm:inline">MADE FOR EVERY HOUR • ROOTED IN INDIA</span>
          <span>THE FRAGRANCE YOU CAN HEAR</span>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 3: A Rahman fragrance house                            */}
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
              <span>07:00 • MORNING</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: 4 Pillars */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#24160F] tracking-tight leading-[1.15]">
                A Rahman fragrance house{' '}
                <span className="italic font-normal text-[#B96A2D] block">
                  built on India's ragas and India's weather.
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                <div className="p-6 rounded-2xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B38A45] font-semibold block mb-1">
                    01 • WHO?
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-[#24160F] mb-1">
                    A.R. Rahman as co-founder.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#24160F]/70 font-sans leading-relaxed">
                    Musical maestro bringing his Sufi roots, cinematic sensibility, and deep devotion to Indian melody.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B38A45] font-semibold block mb-1">
                    02 • WHAT?
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-[#24160F] mb-1">
                    Five raga scents + candles.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#24160F]/70 font-sans leading-relaxed">
                    Every product comes with an exclusive Rahman audio track accessed via QR gateway.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B38A45] font-semibold block mb-1">
                    03 • WHY WE WIN?
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-[#24160F] mb-1">
                    Formulas for Indian climate.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#24160F]/70 font-sans leading-relaxed">
                    A real link to scent through Le Musk, non-fading natural distillates, and exclusive compositions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B38A45] font-semibold block mb-1">
                    04 • HOW?
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-[#24160F] mb-1">
                    ₹999 discovery set · Online first.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#24160F]/70 font-sans leading-relaxed">
                    Accessible entry point with premium retention and ~₹3 Cr indicative year-one plan.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: High-Resolution Photo from Slide 3 */}
            <div className="lg:col-span-5 relative h-[440px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30">
              <Image
                src="/images/extracted/img_p3_1.jpeg"
                alt="Prahar bottle with white flowers and saffron"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-14 py-3 bg-[#EADBC5]/60 rounded-full border border-[#B38A45]/30 text-center font-mono text-xs uppercase tracking-[0.3em] text-[#B96A2D]">
            ONE DAY. FIVE RAGAS. A SCENT YOU CAN HEAR.
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 4: Rahman has already made scent part of his art       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#EADBC5]/40 border-t border-[#B38A45]/20">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#24160F]/15 pb-4 mb-12">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
              <span className="font-serif text-lg text-[#B96A2D]">प्रहर</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B96A2D]">
              <Clock className="w-3.5 h-3.5" />
              <span>08:00 • DAWN</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Headline & Metrics & Venn Diagram */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#24160F] tracking-tight leading-[1.15]">
                Rahman has already made scent{' '}
                <span className="italic font-normal text-[#B96A2D]">part of his art.</span>
              </h2>

              {/* Accolades Bar */}
              <div className="grid grid-cols-3 gap-4 my-8 p-4 bg-[#F5EBDD] rounded-2xl border border-[#B38A45]/20 text-center">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#24160F] block">
                    2 Oscars • 2 Grammys
                  </span>
                  <span className="text-[11px] text-[#24160F]/60 font-sans">Global Recognition</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-semibold text-[#B96A2D] block">
                    Airtel Tune
                  </span>
                  <span className="text-[11px] text-[#24160F]/60 font-sans">Most recognized melody</span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#24160F] block">
                    ~4.5M+
                  </span>
                  <span className="text-[11px] text-[#24160F]/60 font-sans">Global Community</span>
                </div>
              </div>

              {/* Venn Diagram from Slide 4 */}
              <div className="p-6 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/30">
                <div className="text-xs font-mono uppercase tracking-widest text-[#B38A45] mb-4 text-center">
                  The Scent-Music Intersection
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                  <div className="w-44 h-44 rounded-full border-2 border-[#B38A45]/40 p-4 flex flex-col justify-center items-center bg-[#EADBC5]/40">
                    <span className="font-serif text-sm font-semibold text-[#24160F]">RAHMAN'S WORLD</span>
                    <span className="text-[11px] text-[#24160F]/70 mt-1">Music • Sufi • Global Fans</span>
                  </div>
                  <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#B38A45] to-[#D6B77C] text-white p-4 flex flex-col justify-center items-center shadow-lg -mx-4 z-10">
                    <span className="font-serif text-lg font-bold">Le Musk</span>
                    <span className="text-[10px] italic">A shared language of senses</span>
                  </div>
                  <div className="w-44 h-44 rounded-full border-2 border-[#B38A45]/40 p-4 flex flex-col justify-center items-center bg-[#EADBC5]/40">
                    <span className="font-serif text-sm font-semibold text-[#24160F]">FRAGRANCE'S WORLD</span>
                    <span className="text-[11px] text-[#24160F]/70 mt-1">Attar Heritage • Memory • Emotion</span>
                  </div>
                </div>
                <div className="text-center text-xs text-[#24160F]/60 font-sans mt-4 italic">
                  *Le Musk — multisensory VR film directed by Rahman; Cannes XR premiere, 2022.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#24160F]/15 text-sm text-[#24160F]/80 font-sans flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B38A45] shrink-0" />
                <span>
                  <strong>Co-founder with equity and royalty.</strong> Rahman owns the music; Prahar holds the exclusive licence.
                </span>
              </div>
            </div>

            {/* Right: Real Photo from Slide 4 */}
            <div className="lg:col-span-5 relative h-[460px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30">
              <Image
                src="/images/extracted/img_p4_1.jpeg"
                alt="Prahar bottle with white jasmine blossoms and wood"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 5: The Problem & Opportunity                           */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#F5EBDD] border-t border-[#B38A45]/20">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center justify-between border-b border-[#24160F]/15 pb-4 mb-12">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-xl tracking-[0.2em]">PRAHAR</span>
              <span className="font-serif text-lg text-[#B96A2D]">प्रहर</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B96A2D]">
              <Clock className="w-3.5 h-3.5" />
              <span>09:00 • MORNING</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Photo from Slide 5: Bottle with pink lotus & temple arch */}
            <div className="lg:col-span-5 relative h-[440px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30">
              <Image
                src="/images/extracted/img_p5_1.jpeg"
                alt="Prahar bottle with pink lotus and temple archway"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: Data & Answer */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#24160F] tracking-tight leading-[1.2]">
                INDIANS WEAR ONE PERFUME ALL DAY,{' '}
                <span className="italic text-[#B96A2D] font-normal block">
                  and Indian heat makes it fade.
                </span>
              </h2>

              {/* 3 Metrics from Slide 5 */}
              <div className="grid grid-cols-3 gap-4 my-8">
                <div className="p-4 rounded-xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#24160F]">
                    USD 1.25 BN
                  </span>
                  <span className="text-xs text-[#24160F]/70 block mt-1">India perfume market, 2025</span>
                </div>
                <div className="p-4 rounded-xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#B96A2D]">
                    5.36%
                  </span>
                  <span className="text-xs text-[#24160F]/70 block mt-1">Yearly growth to 2034</span>
                </div>
                <div className="p-4 rounded-xl bg-[#EADBC5]/60 border border-[#B38A45]/20">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#24160F]">
                    58%
                  </span>
                  <span className="text-xs text-[#24160F]/70 block mt-1">Share of premium perfume</span>
                </div>
              </div>

              {/* Quote & Our Answer */}
              <div className="p-6 rounded-2xl bg-[#EADBC5]/50 border-l-4 border-[#B96A2D] my-6">
                <p className="font-serif italic text-lg sm:text-xl text-[#24160F]">
                  "Most people wear one scent from the 9 am meeting to a late dinner, and in Indian heat it fades by afternoon."
                </p>
                <div className="mt-4 pt-3 border-t border-[#24160F]/15 flex items-baseline justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B96A2D]">
                    OUR ANSWER:
                  </span>
                  <span className="font-serif text-xl font-bold text-[#24160F]">
                    5 scents, one for each part of the day.
                  </span>
                </div>
              </div>

              <div className="mt-8 font-serif text-2xl text-[#24160F] tracking-wide">
                SO WHAT:{' '}
                <span className="italic font-bold text-[#B96A2D]">
                  DIFFERENTIATE OR DISAPPEAR.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 7: Blue Ocean ERRC Grid                                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 px-5 sm:px-10 lg:px-16 bg-[#EADBC5]/30 border-t border-[#B38A45]/20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-[#B38A45]/20 text-[#B96A2D] border border-[#B38A45]/30 mb-3 inline-block">
              Blue Ocean ERRC Grid
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#24160F] tracking-tight">
              Every hour has its own fragrance,{' '}
              <span className="italic font-normal text-[#B96A2D]">and its own Rahman raga.</span>
            </h2>
            <p className="text-base text-[#24160F]/70 font-sans mt-3">
              "Indian musicians once sang each raga only at its proper hour. We lost that rhythm to screens; Prahar brings it back."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ELIMINATE */}
            <div className="p-6 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/25">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-700 font-semibold block mb-3">
                ELIMINATE
              </span>
              <ul className="space-y-2 text-sm text-[#24160F]/80 font-sans">
                <li>• Foreign notes like lavender</li>
                <li>• Celebrity 'personal memory' stories</li>
                <li>• Generic European tropes</li>
              </ul>
            </div>

            {/* REDUCE */}
            <div className="p-6 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/25">
              <span className="text-xs font-mono tracking-widest uppercase text-amber-700 font-semibold block mb-3">
                REDUCE
              </span>
              <ul className="space-y-2 text-sm text-[#24160F]/80 font-sans">
                <li>• Cost of first trial: ₹999 discovery set</li>
                <li>• Eliminating ₹3,000 blind buys</li>
                <li>• Heavy alcohol sprays during daytime</li>
              </ul>
            </div>

            {/* RAISE */}
            <div className="p-6 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/25">
              <span className="text-xs font-mono tracking-widest uppercase text-emerald-700 font-semibold block mb-3">
                RAISE
              </span>
              <ul className="space-y-2 text-sm text-[#24160F]/80 font-sans">
                <li>• Longevity in intense Indian heat</li>
                <li>• Authentic cultural & musical depth</li>
                <li>• Festive gifting appeal (Diwali boxes)</li>
              </ul>
            </div>

            {/* CREATE */}
            <div className="p-6 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/25">
              <span className="text-xs font-mono tracking-widest uppercase text-[#B96A2D] font-semibold block mb-3">
                CREATE
              </span>
              <ul className="space-y-2 text-sm text-[#24160F]/80 font-sans">
                <li>• Music with every single bottle</li>
                <li>• A scent for each of the 5 prahars</li>
                <li>• Hand-poured Raga Soy Candles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
