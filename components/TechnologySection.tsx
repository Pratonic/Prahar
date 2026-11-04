'use client';

import { motion } from 'framer-motion';
import { Smartphone, QrCode, Cpu, ShoppingCart, BarChart3, ArrowRight, Sparkles } from 'lucide-react';

const techComponents = [
  {
    step: '01',
    title: 'Digital-First Discovery',
    description:
      'Customers explore fragrances, ragas, and time-based philosophies through an interactive digital realm designed like an editorial art exhibition.',
    icon: Smartphone,
  },
  {
    step: '02',
    title: 'QR & NFC Music Gateway',
    description:
      'Every bespoke bottle integrates a physical QR emblem connecting directly to its corresponding raga-inspired soundtrack without requiring app downloads.',
    icon: QrCode,
  },
  {
    step: '03',
    title: 'Personalized Raga Engine',
    description:
      'Interactive psychological and chronobiological matching algorithms guide seekers to their destined fragrance based on daily rituals and emotional desires.',
    icon: Cpu,
  },
  {
    step: '04',
    title: 'D2C-First Omnichannel',
    description:
      'Direct-to-consumer storefront built on modern headless infrastructure providing rapid domestic fulfillment, discovery sets, and personalized gifting.',
    icon: ShoppingCart,
  },
  {
    step: '05',
    title: 'Data-Driven Engagement',
    description:
      'Customer listening preferences and time-of-day listening habits inform future raga creations, candle editions, and seasonal artisan batches.',
    icon: BarChart3,
  },
];

const ecosystemFlow = [
  'Customer',
  'Digital Experience',
  'Raga Discovery',
  'Physical Bottle & QR',
  'Soundtrack Stream',
  'Customer Ritual & Retention',
];

export default function TechnologySection() {
  return (
    <section className="relative bg-[#F5EBDD] py-24 md:py-32 overflow-hidden border-t border-[#B38A45]/20">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/50 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
              Integrated Innovation Model
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#24160F] tracking-tight leading-[1.15]">
            More than a fragrance.{' '}
            <span className="italic font-normal text-[#B96A2D]">A connected experience.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#24160F]/70 font-sans leading-relaxed">
            PRAHAR reimagines the direct-to-consumer fragrance paradigm by fusing physical craftsmanship with 
            seamless digital soundscapes, creating an enduring ritual that lives beyond the vanity table.
          </p>
        </div>

        {/* Animated Connected Ecosystem Flow Ribbon */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-[#EADBC5]/50 border border-[#B38A45]/30 shadow-sm overflow-x-auto">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#B96A2D] mb-4 text-center sm:text-left">
            Connected Brand Ecosystem Architecture
          </div>
          <div className="flex items-center justify-between min-w-[850px] gap-2">
            {ecosystemFlow.map((node, i) => (
              <div key={node} className="flex items-center gap-2 flex-1">
                <div className="flex-1 px-4 py-3 bg-[#F5EBDD] rounded-xl border border-[#B38A45]/20 text-center shadow-xs">
                  <span className="text-xs font-mono font-semibold text-[#24160F] block">
                    {node}
                  </span>
                </div>
                {i < ecosystemFlow.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#B38A45] shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Five Technology Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {techComponents.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-[#EADBC5]/30 border border-[#B38A45]/20 hover:border-[#B38A45]/60 hover:bg-[#EADBC5]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#B38A45]">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F5EBDD] border border-[#B38A45]/20 flex items-center justify-center text-[#B96A2D]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-[#24160F] tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#24160F]/70 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#24160F]/10 flex items-center gap-2 text-xs font-mono text-[#B96A2D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B38A45]" />
                  <span>PRAHAR Platform Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
