'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Icon Components ── */

function ListenIcon() {
  return (
    <div className="flex items-end justify-center gap-[5px] h-12">
      {[{ h: 'h-5', delay: 0 }, { h: 'h-10', delay: 0.15 }, { h: 'h-7', delay: 0.3 }].map(
        (bar, i) => (
          <motion.div
            key={i}
            className={`w-[5px] ${bar.h} rounded-full bg-gradient-to-t from-[#B38A45] to-[#D6B77C]`}
            animate={{ scaleY: [1, 1.35, 0.8, 1.15, 1], opacity: [0.7, 1, 0.8, 1, 0.7] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: bar.delay,
            }}
            style={{ originY: 1 }}
          />
        ),
      )}
    </div>
  );
}

function MatchIcon() {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Cap */}
      <div className="w-4 h-2.5 bg-[#B38A45] rounded-t-sm" />
      {/* Neck */}
      <div className="w-2 h-3 bg-[#D6B77C]" />
      {/* Shoulder */}
      <div className="w-10 h-1 bg-[#B38A45] rounded-t-sm" />
      {/* Body */}
      <div className="w-10 h-14 rounded-b-lg bg-gradient-to-b from-[#D6B77C] to-[#B38A45] border border-[#B38A45]/30" />
    </motion.div>
  );
}

function WearIcon() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    >
      {/* Teardrop */}
      <div className="w-10 h-14 relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#D6B77C] to-[#B38A45]"
          style={{
            borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
          }}
        />
        {/* Highlight */}
        <div
          className="absolute top-3 left-2.5 w-2.5 h-4 bg-white/25 rounded-full rotate-[-15deg]"
        />
      </div>
    </motion.div>
  );
}

function LiveIcon() {
  return (
    <motion.div
      className="relative w-14 h-14 flex items-center justify-center"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      {/* Center circle */}
      <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-[#D6B77C] to-[#B38A45]" />
      {/* Radiating lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-3 bg-[#B38A45] rounded-full"
          style={{
            transform: `rotate(${i * 45}deg) translateY(-16px)`,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ── Step Data ── */

const steps = [
  {
    number: '01',
    title: 'LISTEN',
    description: 'Start with a raga for the hour.',
    Icon: ListenIcon,
  },
  {
    number: '02',
    title: 'MATCH',
    description: 'Find the fragrance inspired by that raga.',
    Icon: MatchIcon,
  },
  {
    number: '03',
    title: 'WEAR',
    description: 'Apply the fragrance and experience its character.',
    Icon: WearIcon,
  },
  {
    number: '04',
    title: 'LIVE',
    description: 'Carry the mood and musical experience throughout your day.',
    Icon: LiveIcon,
  },
];

/* ── Connecting Lines ── */

function HorizontalConnector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.div
      className="hidden lg:block absolute top-1/2 -right-10 w-20 h-[1.5px] -translate-y-1/2 origin-left bg-[#B38A45]/40"
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function VerticalConnector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.div
      className="block lg:hidden mx-auto w-[1.5px] h-10 origin-top bg-[#B38A45]/40"
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/* ── Main Component ── */

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F5EBDD] py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* ── Heading ── */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#24160F] leading-tight"
          >
            From Raga to Ritual
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mt-4 font-sans text-base md:text-lg text-[#24160F]/55 max-w-lg mx-auto"
          >
            Four steps to a musical fragrance experience
          </motion.p>

          {/* Decorative gold line below heading */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 h-[1.5px] bg-[#B38A45] rounded-full"
          />
        </div>

        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-0">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const staggerDelay = 0.3 + index * 0.18;

            return (
              <div key={step.number} className="flex flex-col items-center">
                {/* Vertical connector above (mobile only, skip first) */}
                {index > 0 && (
                  <VerticalConnector inView={isInView} delay={staggerDelay - 0.1} />
                )}

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: staggerDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative w-full max-w-[280px] lg:max-w-none"
                >
                  <div className="relative flex flex-col items-center text-center p-8 md:p-10 rounded-2xl border border-[#B38A45]/15 bg-[#F5EBDD]/60 backdrop-blur-sm">
                    {/* Step number */}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: staggerDelay + 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="font-serif text-5xl md:text-6xl text-[#B38A45]/30 leading-none mb-5 select-none"
                    >
                      {step.number}
                    </motion.span>

                    {/* Icon area */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#EADBC5] to-[#F5EBDD] flex items-center justify-center mb-6 shadow-sm ring-1 ring-[#B38A45]/10">
                      <step.Icon />
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-[#24160F] mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-sm md:text-base leading-relaxed text-[#24160F]/60">
                      {step.description}
                    </p>
                  </div>

                  {/* Horizontal connector (desktop only, skip last) */}
                  {!isLast && (
                    <HorizontalConnector inView={isInView} delay={staggerDelay + 0.3} />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
