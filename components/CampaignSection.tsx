'use client';

import { motion } from 'framer-motion';
import { Radio, Sparkles, Clock, Share2, Instagram, Music2, Eye } from 'lucide-react';

const drops = [
  {
    phase: 'Phase 00',
    time: '7 Days Before Launch',
    title: 'Sound First, No Product',
    detail:
      'Unlabelled classical audio excerpts broadcast across streaming platforms and architectural sound installations in Mumbai, Delhi & Bangalore. India hears the atmosphere before knowing the scent.',
    tag: 'Teaser Wave',
  },
  {
    phase: 'Phase 01',
    time: '6:00 AM Dawn',
    title: 'The Bhairav Sunrise Drop',
    detail:
      'As morning mist touches temple stairs, the first physical drop unlocks. Meditative sandalwood and sacred tulsi revealed exclusively to dawn risers.',
    tag: 'Drop 01',
  },
  {
    phase: 'Phase 02',
    time: '12:00 PM Midday',
    title: 'The Sarang Summer Drop',
    detail:
      'High noon under intense Indian sunshine. Neroli and green mango released as temperature peaks, capturing raw radiance.',
    tag: 'Drop 02',
  },
  {
    phase: 'Phase 03',
    time: '7:00 PM Golden Hour',
    title: 'The Yaman Twilight Drop',
    detail:
      'As streetlights illuminate and romance fills the twilight air, rajnigandha and mogra flower notes go live.',
    tag: 'Drop 03',
  },
  {
    phase: 'Phase 04',
    time: '12:00 AM Midnight',
    title: 'The Darbari Royal Midnight Drop',
    detail:
      'The court raga of Emperor Akbar unlocked precisely at the stroke of twelve. Opulent oud, Kashmiri saffron and dark damask rose.',
    tag: 'Drop 04',
  },
  {
    phase: 'Phase 05',
    time: 'The First Rain',
    title: 'The Malhar Monsoon Drop',
    detail:
      'Triggered dynamically across meteorological forecasts when first rains strike. Petrichor, mitti attar, and wet stone.',
    tag: 'Drop 05',
  },
  {
    phase: 'Phase 06',
    time: 'Official Launch Day',
    title: 'The Full Raga Collection Reveal',
    detail:
      'The entire five-piece collection, Discovery Sets, and Soy Wax Raga Candles unveiled globally with live classical performances.',
    tag: 'Grand Finale',
  },
];

export default function CampaignSection() {
  return (
    <section className="relative bg-[#17131D] py-24 md:py-32 overflow-hidden text-white border-t border-[#B38A45]/30">
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-40 right-10 h-[500px] w-[500px] rounded-full blur-[160px] opacity-20 bg-[#B96A2D]" />
      <div className="pointer-events-none absolute -bottom-40 left-10 h-[500px] w-[500px] rounded-full blur-[160px] opacity-20 bg-[#B38A45]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/40 bg-white/5 mb-4 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-[#D6B77C]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B77C] font-mono">
              Cultural Launch Strategy
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            #ListenToTheScent
          </h2>

          <p className="font-serif italic text-2xl text-[#D6B77C] mt-2">
            "India hears it before it smells it."
          </p>

          <p className="mt-6 text-base sm:text-lg text-white/70 font-sans leading-relaxed">
            A radical departure from standard cosmetic marketing. Instead of perfume models and glossy ads, 
            PRAHAR launches as an auditory phenomenon, synchronizing each product drop with its authentic natural hour.
          </p>
        </div>

        {/* Campaign Timeline */}
        <div className="relative border-l border-[#B38A45]/40 pl-6 sm:pl-10 space-y-12 ml-2 sm:ml-6 max-w-4xl">
          {drops.map((drop, index) => (
            <motion.div
              key={drop.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative group"
            >
              {/* Timeline Indicator Pin */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#17131D] border-2 border-[#D6B77C] group-hover:scale-125 group-hover:bg-[#D6B77C] transition-all" />

              <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 group-hover:border-[#D6B77C]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D6B77C]">
                    {drop.phase} • {drop.time}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/70 uppercase">
                    {drop.tag}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  {drop.title}
                </h3>

                <p className="text-sm sm:text-base text-white/70 font-sans mt-3 leading-relaxed">
                  {drop.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Campaign Teaser Cards */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#D6B77C]">
                Digital Amplification
              </span>
              <h3 className="font-serif text-3xl text-white mt-1">
                Visual & Sonic Campaign Assets
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <Instagram className="w-4 h-4 text-[#D6B77C]" />
              <span>@prahar.fragrance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#2A1D33] to-[#17131D] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D6B77C] mb-2">
                Audio Reel 01
              </div>
              <h4 className="font-serif text-xl text-white mb-2">The 3 AM Silence</h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans mb-4">
                "What does dawn smell like before the world wakes up?" Ambient tanpura paired with slow-motion sandalwood distilling.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#D6B77C]">
                <Music2 className="w-3.5 h-3.5" />
                <span>Raga Bhairav Audio Master</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#2A1D33] to-[#17131D] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D6B77C] mb-2">
                Cinematic Short 02
              </div>
              <h4 className="font-serif text-xl text-white mb-2">The Sitar of Yaman</h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans mb-4">
                Close-up of plucked bronze strings vibrating against fresh night-blooming mogra petals during Jaipur golden hour.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#D6B77C]">
                <Eye className="w-3.5 h-3.5" />
                <span>Editorial Film Series</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#2A1D33] to-[#17131D] border border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D6B77C] mb-2">
                Installation 03
              </div>
              <h4 className="font-serif text-xl text-white mb-2">The Monsoon Sound Chamber</h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans mb-4">
                Interactive acoustic pods spraying petrichor mist synced to the first thunderous notes of Raga Megh Malhar.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#D6B77C]">
                <Share2 className="w-3.5 h-3.5" />
                <span>Experiential PR Pods</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
