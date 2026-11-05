'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Music2, Sun, Droplets, ArrowRight } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="relative bg-[#F5EBDD] text-[#24160F] py-28 lg:py-40 overflow-hidden">
      {/* Subtle background ambient warmth */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 bg-[#B96A2D]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 bg-[#B38A45]" />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-16">
        {/* ── CHAPTER 1: THE PHILOSOPHY ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/60 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
                The Origin
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[#24160F]">
              What if you could{' '}
              <span className="italic font-normal text-[#B96A2D] block sm:inline">
                wear this?
              </span>
            </h2>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#B96A2D] mt-4">
              "Every hour has a story. Every raga has a scent."
            </p>

            <div className="mt-8 space-y-5 text-base sm:text-lg text-[#24160F]/80 font-sans leading-relaxed">
              <p>
                In the classical Hindustani tradition, ragas were never performed at random. 
                A dawn raga played at twilight was believed to disrupt the subtle emotional equilibrium of the human spirit.
              </p>
              <p>
                PRAHAR was born from a singular question: what if perfume respected that same natural law? 
                Instead of forcing one synthetic fragrance to battle the intense heat of an Indian day from morning meetings to late dinner, 
                we composed five time-bound olfactory movements — each harmonized to the temperature, mood, and biological rhythm of its own prahar.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <Link
                href="/fragrances"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#B96A2D] hover:text-[#8B6914] group"
              >
                <span>Explore the 5 Sacred Hours</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Large Editorial Photograph with Parallax Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[520px] sm:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30 bg-[#17131D]">
              <Image
                src="/images/clean/story_bottle_pure.jpg"
                alt="PRAHAR pure perfume vessel on stone with curling aromatic smoke"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D6B77C] block mb-1">
                  PRAHAR प्रहर • CHRONO-OLFACTION
                </span>
                <p className="font-serif italic text-xl sm:text-2xl text-white/95">
                  "The fragrance you can hear."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CHAPTER 2: THE MAESTRO × LE MUSK ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-36">
          {/* Visual on the Left: Bespoke Interactive Venn Diagram & Craft Stage (No Cut-Off Slide) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 order-2 lg:order-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30 bg-[#17131D] text-white p-6 sm:p-8 flex flex-col justify-between">
              {/* Top Collaboration Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D6B77C]" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#D6B77C]">
                    THE MAESTRO'S CONVERGENCE
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                  Cannes XR • Le Musk
                </span>
              </div>

              {/* Native Interactive Venn Diagram: Rahman × Olfaction */}
              <div className="relative py-4 px-2 my-auto">
                <div className="grid grid-cols-2 gap-3 relative z-10">
                  {/* Left Circle: Rahman's Realm */}
                  <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-[#D6B77C]/30 text-left flex flex-col justify-between min-h-[170px]">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#D6B77C] block mb-1">
                        SONIC VISION
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white">
                        A.R. Rahman
                      </h4>
                    </div>
                    <ul className="text-[11px] text-white/70 space-y-1 font-sans">
                      <li>• 2 Oscars & 2 Grammys</li>
                      <li>• Microtonal classical ragas</li>
                      <li>• <em>Le Musk</em> multi-sensory cinema</li>
                    </ul>
                  </div>

                  {/* Right Circle: India's Olfactory Heritage */}
                  <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-[#B96A2D]/30 text-left flex flex-col justify-between min-h-[170px]">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#B96A2D] block mb-1">
                        PERFUMERY HERITAGE
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white">
                        Kannauj Craft
                      </h4>
                    </div>
                    <ul className="text-[11px] text-white/70 space-y-1 font-sans">
                      <li>• 400-year deg-bhapka still</li>
                      <li>• Mysore sandalwood & mitti</li>
                      <li>• Heat-proof alcohol-free attars</li>
                    </ul>
                  </div>
                </div>

                {/* Golden Center Intersect Pill */}
                <div className="relative -mt-4 mx-auto max-w-[280px] p-3 rounded-xl bg-gradient-to-r from-[#B38A45]/90 via-[#D6B77C]/90 to-[#B38A45]/90 text-[#17131D] text-center shadow-lg border border-white/20">
                  <span className="block text-[10px] font-mono uppercase tracking-widest font-bold">
                    THE PRAHAR SYNTHESIS
                  </span>
                  <p className="font-serif italic text-xs font-semibold mt-0.5">
                    "Where musical notes become olfactory accords."
                  </p>
                </div>
              </div>

              {/* Bottom Photo & Authenticity Verification */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#D6B77C]/30 shadow-md">
                  <Image
                    src="/images/clean/rahman_le_musk_craft_only.jpg"
                    alt="Artisanal agarwood, white flowers, and amber perfume oil"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-medium text-white/90 truncate">
                    Artisanal botanical extraction with raw oud & Kannauj flowers
                  </span>
                  <span className="block text-[10px] font-mono text-[#D6B77C] mt-0.5">
                    Formula designed to endure 40°C+ Indian heat
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Content on the Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/60 mb-6">
              <Music2 className="w-3.5 h-3.5 text-[#B38A45]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
                The Collaboration
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl tracking-tight leading-[1.08] text-[#24160F]">
              A Rahman fragrance house{' '}
              <span className="italic font-normal text-[#B96A2D] block">
                built on India's weather.
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#24160F]/80 font-sans leading-relaxed">
              Academy Award and Grammy-winning composer A.R. Rahman didn't lend his name to a fragrance; 
              he co-founded a sonic-olfactory movement. Scent and sound share the same artistic lexicon: notes, harmonies, accords, and resonance.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#EADBC5]/50 border border-[#B38A45]/20">
                <span className="font-serif text-2xl font-bold text-[#24160F] block">
                  Exclusive Tracks
                </span>
                <span className="text-xs text-[#24160F]/70 font-sans mt-1 block">
                  Every product unlocks an exclusive classical audio stream via bottle QR gateway.
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-[#EADBC5]/50 border border-[#B38A45]/20">
                <span className="font-serif text-2xl font-bold text-[#B96A2D] block">
                  Heat-Proof Craft
                </span>
                <span className="text-xs text-[#24160F]/70 font-sans mt-1 block">
                  Alcohol-reduced pure hydro-distillates formulated to flourish in subcontinental warmth.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CHAPTER 3: THE PROVENANCE ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/60 mb-6">
              <Droplets className="w-3.5 h-3.5 text-[#B38A45]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
                Artisanal Distillation
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl tracking-tight leading-[1.08] text-[#24160F]">
              Hydro-distilled in Kannauj's{' '}
              <span className="italic font-normal text-[#B96A2D]">sacred copper cauldrons.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#24160F]/80 font-sans leading-relaxed">
              We reject synthetic shortcuts. In Kannauj — the perfume capital of India where degs and bhapkas have distilled nature for over 400 years — our master artisans capture aged Mysore sandalwood, wild coastal kewra, Rajnigandha, and baked-earth mitti attar that bottles the first scent of rain on parched soil.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-[#EADBC5]/40 border-l-4 border-[#B96A2D]">
              <p className="font-serif italic text-xl text-[#24160F]">
                "Because every hour in India has a story. And now, a scent you can hear."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30 bg-[#17131D] text-white p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6B77C] block mb-1">
                    ARTISANAL PROVENANCE
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white">
                    Kannauj Deg-Bhapka Distillation
                  </h4>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                  400-Yr Heritage
                </span>
              </div>

              {/* Four Sacred Botanical Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <span className="text-xs font-serif font-bold text-[#D6B77C] block">
                    Mysore Sandalwood
                  </span>
                  <span className="text-[11px] text-white/60 font-sans mt-0.5 block">
                    Aged Heartwood distilled over low woodfires in pure copper degs.
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <span className="text-xs font-serif font-bold text-[#D6B77C] block">
                    Mitti Attar (Petrichor)
                  </span>
                  <span className="text-[11px] text-white/60 font-sans mt-0.5 block">
                    Sun-baked Gangetic clay distilled to bottle the first monsoon rain.
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <span className="text-xs font-serif font-bold text-[#D6B77C] block">
                    Odisha Wild Kewra
                  </span>
                  <span className="text-[11px] text-white/60 font-sans mt-0.5 block">
                    Wild coastal pandanus blossoms harvested at dawn in Ganjam.
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <span className="text-xs font-serif font-bold text-[#D6B77C] block">
                    Midnight Rajnigandha
                  </span>
                  <span className="text-[11px] text-white/60 font-sans mt-0.5 block">
                    Heady night-blooming tuberose captured at peak nocturnal sillage.
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
                <span>Natural Botanicals • 0% Synthetic Fixatives</span>
                <span className="text-[#D6B77C]">Kannauj, Uttar Pradesh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
