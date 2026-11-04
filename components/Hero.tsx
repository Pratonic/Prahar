'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ──────────────────────────────────────────────
   Palette tokens
   ────────────────────────────────────────────── */
const COLORS = {
  bg: '#17131D',
  white: '#FFFFFF',
  gold: '#B38A45',
  champagne: '#D6B77C',
  amber: '#B96A2D',
  charcoal: '#24160F',
};

/* ──────────────────────────────────────────────
   Musical note data
   ────────────────────────────────────────────── */
const MUSICAL_NOTES = [
  { char: '♪', top: '12%', left: '8%', size: 'text-2xl', delay: 0, dur: 6 },
  { char: '♫', top: '22%', right: '10%', size: 'text-3xl', delay: 1.5, dur: 7 },
  { char: '♩', top: '60%', left: '5%', size: 'text-xl', delay: 3, dur: 5 },
  { char: '♪', top: '45%', right: '7%', size: 'text-2xl', delay: 2, dur: 8 },
  { char: '♫', top: '75%', left: '12%', size: 'text-lg', delay: 4, dur: 6.5 },
  { char: '♩', top: '35%', right: '15%', size: 'text-xl', delay: 0.8, dur: 7.5 },
];

/* ──────────────────────────────────────────────
   Particle data (small gold dots)
   ────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: `${8 + Math.random() * 80}%`,
  left: `${5 + Math.random() * 90}%`,
  size: 2 + Math.random() * 3,
  opacity: 0.15 + Math.random() * 0.45,
  delay: Math.random() * 5,
  dur: 4 + Math.random() * 6,
}));

/* ──────────────────────────────────────────────
   Soundwave bar data
   ────────────────────────────────────────────── */
const WAVE_BARS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  delay: i * 0.08,
  height: 8 + Math.sin(i * 0.6) * 14,
}));

/* ──────────────────────────────────────────────
   Letter-stagger helper
   ────────────────────────────────────────────── */
const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.07, duration: 0.6, ease: 'easeOut' },
  }),
};

/* ══════════════════════════════════════════════
   HERO COMPONENT
   ══════════════════════════════════════════════ */
export default function Hero() {
  /* ── Clock ─────────────────────────────────── */
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Scroll parallax ───────────────────────── */
  const { scrollY } = useScroll();
  const bottleY = useTransform(scrollY, [0, 600], [0, 120]);
  const textY = useTransform(scrollY, [0, 600], [0, -60]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0, 0.5]);

  /* ── Reduced-motion ────────────────────────── */
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const PRAHAR_LETTERS = 'PRAHAR'.split('');

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* ── Warm sunlight radial glow ───────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 55%, rgba(185,106,45,0.22) 0%, rgba(179,138,69,0.08) 40%, transparent 75%)',
        }}
      />

      {/* ── Thin gold decorative lines ──────── */}
      <div
        className="pointer-events-none absolute left-6 top-0 z-10 hidden h-full w-px md:block"
        style={{
          background: `linear-gradient(to bottom, transparent, ${COLORS.gold}33, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute right-6 top-0 z-10 hidden h-full w-px md:block"
        style={{
          background: `linear-gradient(to bottom, transparent, ${COLORS.gold}33, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute left-0 top-16 z-10 hidden h-px w-full md:block"
        style={{
          background: `linear-gradient(to right, transparent, ${COLORS.gold}22, transparent)`,
        }}
      />

      {/* ── Digital clock ────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute right-6 top-6 z-30 md:right-12 md:top-10"
      >
        <div
          className="rounded-sm border px-4 py-1.5"
          style={{
            borderColor: `${COLORS.gold}44`,
            background: `${COLORS.bg}cc`,
          }}
        >
          <span
            className="font-serif text-sm tracking-[0.15em] md:text-base"
            style={{ color: COLORS.gold, fontFamily: 'Cormorant Garamond, serif' }}
          >
            {time}
          </span>
        </div>
      </motion.div>

      {/* ── Atmospheric particles ────────────── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute z-10 rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: COLORS.gold,
            opacity: p.opacity,
          }}
          animate={
            prefersReduced
              ? {}
              : {
                  y: [0, -30, 10, -20, 0],
                  x: [0, 10, -8, 5, 0],
                  opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.6, p.opacity * 1.2, p.opacity],
                }
          }
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Musical notes ────────────────────── */}
      {MUSICAL_NOTES.map((note, i) => (
        <motion.span
          key={i}
          className={`pointer-events-none absolute z-10 ${note.size}`}
          style={{
            top: note.top,
            left: note.left,
            right: note.right,
            color: `${COLORS.champagne}55`,
            fontFamily: 'serif',
          }}
          animate={
            prefersReduced
              ? {}
              : {
                  y: [0, -18, 8, -12, 0],
                  rotate: [0, 8, -6, 4, 0],
                  opacity: [0.25, 0.45, 0.2, 0.4, 0.25],
                }
          }
          transition={{
            duration: note.dur,
            delay: note.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {note.char}
        </motion.span>
      ))}

      {/* ── Atmospheric smoke layers ─────────── */}
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          className="pointer-events-none absolute z-[5]"
          style={{
            width: `${280 + idx * 120}px`,
            height: `${180 + idx * 60}px`,
            left: `${25 + idx * 12}%`,
            top: `${40 + idx * 8}%`,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, rgba(185,106,45,${0.04 + idx * 0.02}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, 30 - idx * 15, -20 + idx * 10, 0],
                  y: [0, -15 + idx * 8, 10, 0],
                  scale: [1, 1.06, 0.97, 1],
                }
          }
          transition={{
            duration: 10 + idx * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Scroll-driven overlay ────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[6] bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* ══════════════════════════════════════
         PERFUME BOTTLE VISUAL
         ══════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[8] flex items-center justify-center"
        style={{ y: bottleY }}
      >
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Warm halo behind bottle */}
          <div
            className="absolute -inset-20 z-0 md:-inset-32"
            style={{
              background:
                'radial-gradient(circle, rgba(185,106,45,0.18) 0%, rgba(179,138,69,0.08) 35%, transparent 65%)',
            }}
          />

          {/* Jasmine flowers — small decorative circles */}
          {[
            { t: '-10%', l: '-18%', s: 10, d: 0.5 },
            { t: '5%', l: '105%', s: 8, d: 1.2 },
            { t: '30%', l: '-22%', s: 6, d: 2 },
            { t: '25%', l: '110%', s: 9, d: 0.8 },
            { t: '-5%', l: '90%', s: 7, d: 1.8 },
            { t: '50%', l: '-15%', s: 5, d: 2.5 },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="absolute z-[2] rounded-full"
              style={{
                top: f.t,
                left: f.l,
                width: f.s,
                height: f.s,
                background: 'radial-gradient(circle, #FFF8F0 30%, #EAD9C4 100%)',
                boxShadow: '0 0 6px rgba(255,248,240,0.3)',
              }}
              animate={
                prefersReduced
                  ? {}
                  : {
                      y: [0, -6, 3, -4, 0],
                      x: [0, 3, -2, 1, 0],
                      opacity: [0.7, 1, 0.6, 0.9, 0.7],
                    }
              }
              transition={{
                duration: 5 + i,
                delay: f.d,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Bottle body */}
          <div className="relative z-[1] flex flex-col items-center">
            {/* Cap */}
            <div
              className="h-5 w-6 rounded-t-sm md:h-7 md:w-8"
              style={{
                background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.champagne})`,
              }}
            />
            {/* Neck */}
            <div
              className="h-6 w-3 md:h-8 md:w-4"
              style={{
                background: `linear-gradient(180deg, ${COLORS.champagne}cc, ${COLORS.amber}aa)`,
              }}
            />
            {/* Shoulder */}
            <div
              className="h-3 w-16 rounded-t-lg md:h-4 md:w-24"
              style={{
                background: `linear-gradient(180deg, ${COLORS.amber}dd, ${COLORS.amber})`,
              }}
            />
            {/* Main body */}
            <div
              className="relative flex h-40 w-16 items-center justify-center overflow-hidden rounded-b-lg md:h-56 md:w-24"
              style={{
                background: `linear-gradient(160deg, ${COLORS.amber}, ${COLORS.gold} 55%, ${COLORS.champagne} 100%)`,
                boxShadow: `0 0 60px rgba(185,106,45,0.3), inset 0 0 30px rgba(255,255,255,0.08)`,
              }}
            >
              {/* Label on bottle */}
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="text-xs tracking-[0.25em] md:text-sm"
                  style={{
                    color: `${COLORS.bg}cc`,
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600,
                  }}
                >
                  PRAHAR
                </span>
                <div
                  className="my-1 h-px w-8 md:w-12"
                  style={{ backgroundColor: `${COLORS.bg}44` }}
                />
                <span
                  className="text-[8px] tracking-[0.15em] md:text-[10px]"
                  style={{ color: `${COLORS.bg}99` }}
                >
                  प्रहर
                </span>
              </div>
              {/* Glass highlight */}
              <div
                className="absolute left-1 top-0 h-full w-1/4 rounded-bl-lg"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)',
                }}
              />
            </div>
          </div>

          {/* Stone pedestal */}
          <div className="relative z-[1] flex flex-col items-center">
            <div
              className="h-2 w-20 md:h-3 md:w-28"
              style={{
                background: 'linear-gradient(180deg, #5a5a5a, #3a3a3a)',
                borderRadius: '0 0 2px 2px',
              }}
            />
            <div
              className="h-3 w-24 md:h-4 md:w-32"
              style={{
                background: 'linear-gradient(180deg, #4a4a4a, #2a2a2a)',
                borderRadius: '0 0 4px 4px',
              }}
            />
            {/* Pedestal reflection */}
            <div
              className="h-8 w-20 md:h-12 md:w-28"
              style={{
                background:
                  'linear-gradient(180deg, rgba(179,138,69,0.08) 0%, transparent 100%)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════
         TEXT CONTENT OVERLAY
         ══════════════════════════════════════ */}
      <motion.div
        className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center md:pt-0"
        style={{ y: textY }}
      >
        {/* ── PRAHAR (letter stagger) ──────── */}
        <div className="mb-2 flex overflow-hidden" aria-label="PRAHAR">
          {PRAHAR_LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block text-6xl font-light tracking-[0.2em] sm:text-7xl md:text-8xl lg:text-9xl"
              style={{
                color: COLORS.white,
                fontFamily: 'Cormorant Garamond, serif',
                textShadow: '0 0 80px rgba(185,106,45,0.25)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* ── प्रहर ────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
          className="mb-6 text-lg tracking-[0.15em] sm:text-xl md:mb-8 md:text-2xl"
          style={{
            color: COLORS.white,
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          प्रहर
        </motion.p>

        {/* ── Tagline ──────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          className="mb-4 text-xs tracking-[0.3em] uppercase sm:text-sm md:mb-6 md:text-base"
          style={{
            color: COLORS.champagne,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          The fragrance you can hear.
        </motion.p>

        {/* ── Quote ────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
          className="mb-10 max-w-md text-sm italic leading-relaxed md:mb-14 md:max-w-lg md:text-base"
          style={{
            color: `${COLORS.white}cc`,
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Every hour has a story. <br className="hidden md:block" />
          Every raga has a scent.
        </motion.p>

        {/* ── CTAs ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-5 md:flex-row md:gap-8"
        >
          {/* Primary CTA */}
          <Link
            href="/fragrances"
            className="group relative inline-block overflow-hidden border px-8 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-500 md:px-10 md:py-3.5 md:text-sm"
            style={{
              borderColor: COLORS.gold,
              color: COLORS.gold,
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.gold;
              e.currentTarget.style.color = COLORS.bg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = COLORS.gold;
            }}
          >
            Explore the Fragrances
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/quiz"
            className="text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:underline hover:underline-offset-4 md:text-sm"
            style={{
              color: COLORS.champagne,
              fontFamily: 'Inter, sans-serif',
              textDecorationColor: COLORS.gold,
            }}
          >
            Discover Your Raga
          </Link>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════
         SOUNDWAVE BARS (bottom)
         ══════════════════════════════════════ */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-end gap-[3px] md:bottom-28">
        {WAVE_BARS.map((bar) => (
          <motion.div
            key={bar.id}
            className="rounded-full"
            style={{
              width: 2,
              height: bar.height,
              backgroundColor: `${COLORS.gold}44`,
            }}
            animate={
              prefersReduced
                ? {}
                : {
                    height: [bar.height, bar.height * 1.8, bar.height * 0.5, bar.height],
                  }
            }
            transition={{
              duration: 2,
              delay: bar.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════
         SCROLL INDICATOR
         ══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase md:text-xs"
          style={{
            color: `${COLORS.champagne}88`,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Scroll to discover
        </span>
        <motion.svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          animate={prefersReduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M8 2 L8 18 M2 13 L8 20 L14 13"
            stroke={`${COLORS.champagne}88`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
