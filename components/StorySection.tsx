'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F5EBDD] py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Left: Visual Area ── */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full lg:w-[45%] flex-shrink-0"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#F5EBDD] via-[#EADBC5] to-[#B96A2D]/40">
              {/* Golden light circle */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#B38A45]/20 blur-3xl" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-48 md:h-48 rounded-full bg-[#D6B77C]/30 blur-2xl" />

              {/* Floating petals */}
              {[
                { top: '18%', left: '25%', size: 'w-5 h-7', delay: 0, rotate: 25 },
                { top: '40%', left: '65%', size: 'w-4 h-6', delay: 0.8, rotate: -15 },
                { top: '60%', left: '35%', size: 'w-6 h-8', delay: 1.6, rotate: 40 },
                { top: '28%', left: '72%', size: 'w-3 h-5', delay: 2.2, rotate: -35 },
                { top: '72%', left: '58%', size: 'w-4 h-6', delay: 1.2, rotate: 10 },
                { top: '50%', left: '20%', size: 'w-3 h-5', delay: 0.4, rotate: -50 },
              ].map((petal, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${petal.size} rounded-full bg-gradient-to-br from-[#B38A45]/30 to-[#B96A2D]/20`}
                  style={{
                    top: petal.top,
                    left: petal.left,
                    borderRadius: '50% 50% 50% 0%',
                    rotate: `${petal.rotate}deg`,
                  }}
                  animate={{
                    y: [0, -14, 0, 10, 0],
                    x: [0, 6, -4, 8, 0],
                    rotate: [petal.rotate, petal.rotate + 12, petal.rotate - 8, petal.rotate],
                    opacity: [0.5, 0.8, 0.6, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 7 + i * 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: petal.delay,
                  }}
                />
              ))}

              {/* Central decorative bottle silhouette */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Cap */}
                <div className="w-6 h-4 bg-[#B38A45]/40 rounded-t-md" />
                {/* Neck */}
                <div className="w-3 h-6 bg-[#B38A45]/30" />
                {/* Body */}
                <div className="w-20 h-28 md:w-24 md:h-32 rounded-lg bg-gradient-to-b from-[#B38A45]/25 to-[#B96A2D]/20 border border-[#B38A45]/20" />
              </div>

              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#B38A45]/10" />
            </div>
          </motion.div>

          {/* ── Right: Editorial Text ── */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 md:gap-8">
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="text-xs md:text-sm font-sans font-medium tracking-[0.25em] uppercase text-[#B38A45]"
            >
              The Story
            </motion.span>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#24160F]"
            >
              What if you could{' '}
              <span className="italic text-[#B96A2D]">wear</span> this?
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="font-serif italic text-lg md:text-xl text-[#B96A2D]"
            >
              PRAHAR — The fragrance you can hear.
            </motion.p>

            {/* Body text */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
              className="flex flex-col gap-4"
            >
              <p className="font-sans text-base md:text-lg leading-relaxed text-[#24160F]/75">
                For centuries, Indian musicians sang each raga only at its own hour.
                PRAHAR brings that relationship between time, emotion and music into
                the world of fragrance.
              </p>
              <p className="font-sans text-base md:text-lg leading-relaxed text-[#24160F]/75">
                Every fragrance represents a specific raga, designed to capture its
                mood, atmosphere and character.
              </p>
            </motion.div>

            {/* Gold divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1.5px] bg-[#B38A45] rounded-full"
            />

            {/* Decorative quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.05, ease: 'easeOut' }}
              className="font-serif italic text-xl md:text-2xl text-[#24160F]/60 pt-2"
            >
              &ldquo;Where sound meets scent.&rdquo;
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
