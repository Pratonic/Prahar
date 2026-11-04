'use client';

import { motion } from 'framer-motion';
import { Heart, Globe, Sparkles, Leaf, Compass, Feather } from 'lucide-react';

const pillars = [
  {
    title: 'Cultural Impact',
    subtitle: 'Reviving Ancient Musical Heritage',
    description:
      'Indian classical ragas are an intangible heritage of immense mathematical and emotional refinement. PRAHAR translates this oral tradition into contemporary olfactory art, introducing the time-tested philosophy of prahar (periods of the day) to a global audience.',
    icon: Feather,
    highlight: 'Heritage Reimagined',
  },
  {
    title: 'Wellbeing Impact',
    subtitle: 'Mindful Living & Chronobiology',
    description:
      'Modern life has decoupled humanity from the circadian cycles of the sun. By pairing scent notes to specific periods of the day, our fragrances act as gentle biological anchors — fostering meditation at dawn, alertness at midday, romance at dusk, and stillness at midnight.',
    icon: Heart,
    highlight: 'Emotional Harmony',
  },
  {
    title: 'Conscious Craft & Sustainability',
    subtitle: 'Artisans, Soil & Responsible Luxury',
    description:
      'We partner with multi-generational sandalwood distillers in Karnataka, kewra farmers in coastal Odisha, and Kannauj attar masters. Our vessels use infinitely recyclable glass, FSC-certified unbleached cotton papers, and biodegradable soy wax.',
    icon: Leaf,
    highlight: 'Ethical Provenance',
  },
];

const futureVisions = [
  {
    title: 'Home Fragrances',
    description: 'Ultrasonic nebulizers calibrated to play automated ambient raga drones alongside time-released room mists.',
    icon: '01',
  },
  {
    title: 'Wellness & Spas',
    description: 'Immersive acoustic bathing sanctuaries combining binaural classical ragas with heated ayurvedic herbal oils.',
    icon: '02',
  },
  {
    title: 'Artist Collaborations',
    description: 'Limited-edition annual drops co-created with India’s leading sitar, sarod, and bansuri virtuosos.',
    icon: '03',
  },
  {
    title: 'Global Cultural Reach',
    description: 'Bringing Indian classical olfactory science to design galleries, luxury boutiques, and concert halls worldwide.',
    icon: '04',
  },
];

export default function BrandPhilosophy() {
  return (
    <section className="relative bg-[#F5EBDD] py-24 md:py-32 overflow-hidden border-t border-[#B38A45]/20">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/50 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
              Philosophy & Purpose
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#24160F] tracking-tight leading-[1.15]">
            More than a fragrance.{' '}
            <span className="italic font-normal text-[#B96A2D]">A movement.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#24160F]/70 font-sans leading-relaxed">
            PRAHAR is an ode to the rhythm of time. We believe luxury is not frivolous consumption; 
            it is the deliberate slowing down to listen, breathe, and honor the sacred hour you inhabit.
          </p>
        </div>

        {/* Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-[#EADBC5]/40 rounded-3xl p-8 border border-[#B38A45]/25 flex flex-col justify-between hover:border-[#B38A45]/60 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F5EBDD] border border-[#B38A45]/30 flex items-center justify-center text-[#B96A2D] mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B38A45] block mb-1">
                    {pillar.highlight}
                  </span>

                  <h3 className="font-serif text-3xl text-[#24160F] tracking-tight">
                    {pillar.title}
                  </h3>

                  <div className="font-serif italic text-lg text-[#B96A2D] mt-1 mb-4">
                    {pillar.subtitle}
                  </div>

                  <p className="text-sm text-[#24160F]/75 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#24160F]/10 flex items-center gap-2 text-xs font-mono text-[#B96A2D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B38A45]" />
                  <span>Permanent Commitment</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future Horizon Expansion Showcase */}
        <div className="rounded-3xl bg-[#17131D] text-white p-8 sm:p-12 lg:p-16 border border-[#B38A45]/30 relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full blur-[140px] opacity-25 bg-[#B38A45]" />

          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D6B77C]">
              Future Horizons
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white mt-1">
              The Evolution of the Ritual
            </h3>
            <p className="text-sm sm:text-base text-white/70 font-sans mt-3 leading-relaxed">
              Our vision spans beyond wearable fragrances into complete multi-sensory environments that bridge 
              ancient Indian aesthetics with cutting-edge experiential design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureVisions.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#D6B77C]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-2xl font-light text-[#D6B77C] block mb-3">
                    {item.icon}
                  </span>
                  <h4 className="font-serif text-xl text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 text-[10px] font-mono uppercase tracking-widest text-[#D6B77C]/60">
                  Coming 2025–2026
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
