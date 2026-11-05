'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Feather, Heart, Leaf, Store, MapPin, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function BrandPhilosophy() {
  return (
    <div className="bg-[#F5EBDD] text-[#24160F]">
      {/* ── THE THREE PILLARS ────────────────────────────────────────── */}
      <section className="relative py-28 lg:py-36 px-5 sm:px-10 lg:px-16 border-t border-[#B38A45]/20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/60 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
                Our Creed
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#24160F] tracking-tight leading-[1.08]">
              More than a fragrance.{' '}
              <span className="italic font-normal text-[#B96A2D] block sm:inline">
                A movement.
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#24160F]/75 font-sans leading-relaxed">
              PRAHAR exists to revive India's rich musical lineage, ground everyday life in circadian presence, 
              and champion regenerative artisan distilling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cultural Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#EADBC5]/40 border border-[#B38A45]/25 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-xl transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/30 flex items-center justify-center text-[#B96A2D] mb-6">
                  <Feather className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B38A45] font-bold block mb-1">
                  HERITAGE PRESERVATION
                </span>
                <h3 className="font-serif text-3xl text-[#24160F] mb-3">
                  Cultural Impact
                </h3>
                <p className="text-sm text-[#24160F]/75 font-sans leading-relaxed">
                  Indian classical music is an intangible treasury of profound emotional sophistication. 
                  By translating ragas into wearable scents, we re-anchor ancient temporal wisdom into modern daily lives.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#24160F]/10 text-xs font-mono text-[#B96A2D]">
                A.R. Rahman Partnership
              </div>
            </motion.div>

            {/* Wellbeing Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#EADBC5]/40 border border-[#B38A45]/25 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-xl transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/30 flex items-center justify-center text-[#B96A2D] mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B38A45] font-bold block mb-1">
                  CIRCADIAN MINDFULNESS
                </span>
                <h3 className="font-serif text-3xl text-[#24160F] mb-3">
                  Wellbeing Impact
                </h3>
                <p className="text-sm text-[#24160F]/75 font-sans leading-relaxed">
                  Our bodies are calibrated to the sun. By coordinating scent and sound to the five prahars of the day, 
                  our fragrances serve as biological rituals fostering dawn meditation, noon vitality, and twilight serenity.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#24160F]/10 text-xs font-mono text-[#B96A2D]">
                Mindful Chronobiology
              </div>
            </motion.div>

            {/* Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#EADBC5]/40 border border-[#B38A45]/25 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-xl transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/30 flex items-center justify-center text-[#B96A2D] mb-6">
                  <Leaf className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B38A45] font-bold block mb-1">
                  ETHICAL PROVENANCE
                </span>
                <h3 className="font-serif text-3xl text-[#24160F] mb-3">
                  Artisan Patronage
                </h3>
                <p className="text-sm text-[#24160F]/75 font-sans leading-relaxed">
                  From multigenerational sandalwood distillers in Karnataka to kewra farmers in coastal Odisha and Kannauj attar masters, 
                  every vessel supports living artisan traditions, biodegradable wax, and infinitely recyclable glass.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#24160F]/10 text-xs font-mono text-[#B96A2D]">
                Regenerative Sourcing
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE SANCTUARY & HORIZON ──────────────────────────────────── */}
      <section className="relative py-28 lg:py-36 px-5 sm:px-10 lg:px-16 bg-[#17131D] text-white border-t border-white/10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D6B77C] block mb-3">
                WHERE RITUAL MEETS REALITY
              </span>

              <h2 className="font-serif text-5xl sm:text-6xl text-white tracking-tight leading-[1.08]">
                Curated spaces.{' '}
                <span className="italic font-normal text-[#D6B77C] block">
                  Delivered to your doorstep.
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-white/70 font-sans leading-relaxed">
                Experience PRAHAR online with complimentary Pan-India air fulfillment, at flagship acoustic stores in Bangalore, 
                and across select luxury retail partners including Nykaa Luxe, Tira, and Sublime.
              </p>

              <div className="mt-8 space-y-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-lg font-bold text-white block">Official D2C Storefront</span>
                    <span className="text-xs text-white/60 font-sans">Full collection, Discovery Sets, and Diwali Diya sets with express delivery</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold shrink-0">Live Nationwide</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-lg font-bold text-white block">Flagship Sanctuary • Bangalore</span>
                    <span className="text-xs text-white/60 font-sans">Indiranagar sensory boutique with spatial acoustic listening pods</span>
                  </div>
                  <span className="text-xs font-mono text-[#D6B77C] font-semibold shrink-0">Flagship</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-lg font-bold text-white block">Select Retail Lounges</span>
                    <span className="text-xs text-white/60 font-sans">Nykaa Luxe, Tira, Sublime (Mumbai, Delhi, Bangalore)</span>
                  </div>
                  <span className="text-xs font-mono text-white/50 shrink-0">Partner Stores</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#17131D]">
              <Image
                src="/images/clean/varanasi_ghats_pure.jpg"
                alt="Varanasi Ghats at Dusk with Temple Diya Lights"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif italic text-2xl sm:text-3xl text-white/95 leading-snug">
                  "Because every hour in India has a story. And now, a scent."
                </p>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D6B77C] mt-2 block">
                  PRAHAR • प्रहर × A.R. RAHMAN
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
