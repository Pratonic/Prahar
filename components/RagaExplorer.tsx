'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ragas } from '@/data/ragas';
import { useCartStore } from '@/lib/cart';
import { products, formatPrice } from '@/data/products';

/* ------------------------------------------------------------------ */
/*  Decorative sub-components (per-raga mood)                         */
/* ------------------------------------------------------------------ */

function BhairavDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sunrise glow */}
      <div className="absolute -bottom-20 left-1/2 h-60 w-[140%] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-amber-500/30 via-orange-400/20 to-transparent blur-2xl" />
      {/* Warm radiating circles */}
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/20" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/10" />
      {/* Tiny dots — earth tones */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-amber-300/40"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + ((i * 17) % 80)}%`,
          }}
        />
      ))}
    </div>
  );
}

function SarangDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Bright rays */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/4 h-40 w-px origin-bottom bg-gradient-to-t from-yellow-400/25 to-transparent"
          style={{ transform: `rotate(${i * 45}deg)` }}
        />
      ))}
      {/* Green leaf accents */}
      <div className="absolute right-8 top-12 h-8 w-3 rotate-45 rounded-full bg-green-500/20" />
      <div className="absolute left-10 bottom-20 h-10 w-4 -rotate-12 rounded-full bg-green-400/15" />
      <div className="absolute right-16 bottom-32 h-6 w-2.5 rotate-[30deg] rounded-full bg-lime-500/15" />
    </div>
  );
}

function YamanDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Amber glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-3xl" />
      {/* Flower shapes */}
      {[...Array(5)].map((_, i) => {
        const size = 10 + i * 4;
        return (
          <div
            key={i}
            className="absolute rounded-full border border-orange-300/20"
            style={{
              width: size,
              height: size,
              top: `${15 + ((i * 23) % 60)}%`,
              left: `${8 + ((i * 19) % 80)}%`,
            }}
          />
        );
      })}
      {/* Petal-like ellipses */}
      <div className="absolute left-[20%] top-[60%] h-4 w-10 rotate-[40deg] rounded-full bg-rose-400/10" />
      <div className="absolute left-[70%] top-[30%] h-4 w-10 -rotate-[25deg] rounded-full bg-amber-400/10" />
    </div>
  );
}

function DarbariDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gold stars */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-amber-300/50"
          style={{
            top: `${5 + ((i * 13) % 85)}%`,
            left: `${5 + ((i * 11) % 85)}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      {/* Larger gold sparkles */}
      <div className="absolute left-[15%] top-[20%] h-1.5 w-1.5 rounded-full bg-yellow-300/60" />
      <div className="absolute left-[75%] top-[40%] h-2 w-2 rounded-full bg-amber-200/40" />
      <div className="absolute left-[50%] top-[15%] h-1 w-1 rounded-full bg-yellow-200/50" />
      {/* Dark atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/30 to-transparent" />
    </div>
  );
}

function MalharDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Rain drop streaks */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-gradient-to-b from-teal-300/30 via-teal-200/10 to-transparent"
          style={{
            height: 30 + (i % 3) * 20,
            top: `${(i * 11) % 70}%`,
            left: `${5 + ((i * 10) % 90)}%`,
          }}
        />
      ))}
      {/* Green mist */}
      <div className="absolute -bottom-10 left-0 h-40 w-full bg-gradient-to-t from-emerald-600/15 to-transparent blur-xl" />
      <div className="absolute left-1/4 top-1/2 h-32 w-48 rounded-full bg-teal-500/10 blur-2xl" />
    </div>
  );
}

const decorComponents: Record<string, React.FC> = {
  bhairav: BhairavDecor,
  sarang: SarangDecor,
  yaman: YamanDecor,
  darbari: DarbariDecor,
  malhar: MalharDecor,
};

/* ------------------------------------------------------------------ */
/*  Bottle silhouette SVG                                             */
/* ------------------------------------------------------------------ */

function BottleSilhouette({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 120 320"
      className="h-56 w-auto drop-shadow-2xl sm:h-64 lg:h-72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cap */}
      <rect x="42" y="0" width="36" height="18" rx="4" fill={color} opacity={0.9} />
      {/* Neck */}
      <rect x="48" y="18" width="24" height="32" rx="2" fill={color} opacity={0.7} />
      {/* Shoulder */}
      <path
        d="M48 50 Q48 60 30 75 L30 80 Q30 85 35 85 L85 85 Q90 85 90 80 L90 75 Q72 60 72 50"
        fill={color}
        opacity={0.75}
      />
      {/* Body */}
      <rect x="30" y="85" width="60" height="200" rx="6" fill={color} opacity={0.6} />
      {/* Base */}
      <rect x="26" y="280" width="68" height="14" rx="4" fill={color} opacity={0.8} />
      {/* Label area */}
      <rect x="38" y="140" width="44" height="70" rx="3" fill="white" opacity={0.12} />
      {/* Highlight stripe */}
      <rect x="36" y="90" width="4" height="180" rx="2" fill="white" opacity={0.1} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function RagaExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRaga = ragas[activeIndex];
  const addItem = useCartStore((s) => s.addItem);

  // Find the 50ml EDP product for the active raga
  const edpProduct = products.find(
    (p) => p.ragaId === activeRaga.id && p.category === 'perfume'
  );

  function handleAddToBag() {
    if (!edpProduct) return;
    addItem({
      productId: edpProduct.id,
      name: edpProduct.name,
      price: edpProduct.price,
      size: edpProduct.size,
      ragaId: edpProduct.ragaId,
      category: edpProduct.category,
    });
  }

  const DecorComponent = decorComponents[activeRaga.id];

  /* Framer Motion variants */
  const contentVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const visualVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <section
      className="relative overflow-hidden bg-[#F5EBDD] py-20 md:py-28 lg:py-32"
      id="raga-explorer"
    >
      {/* ---- Section heading ---- */}
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-cormorant text-3xl font-semibold leading-tight tracking-tight text-[#24160F] sm:text-4xl lg:text-5xl">
          Five ragās. Five hours. Five scents you can hear.
        </h2>
        <p className="mt-4 font-inter text-sm tracking-wide text-[#24160F]/60 sm:text-base">
          Select a raga to explore its fragrance
        </p>
      </div>

      {/* ---- Raga navigation tabs / timeline ---- */}
      <div className="mt-12 md:mt-16">
        <div className="hide-scrollbar mx-auto flex max-w-5xl gap-1 overflow-x-auto px-6 sm:gap-2">
          {ragas.map((raga, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={raga.id}
                onClick={() => setActiveIndex(index)}
                className={`group relative flex min-w-[140px] flex-1 flex-col items-center gap-1 rounded-t-lg px-4 py-4 transition-all duration-300 sm:min-w-[160px] ${
                  isActive
                    ? 'bg-[#EADBC5]/60'
                    : 'bg-transparent hover:bg-[#EADBC5]/30'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className={`font-inter text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? 'text-[#B38A45]' : 'text-[#24160F]/35'
                  }`}
                >
                  {raga.number}
                </span>
                <span
                  className={`font-cormorant text-lg font-semibold transition-colors duration-300 sm:text-xl ${
                    isActive ? 'text-[#B38A45]' : 'text-[#24160F]/50'
                  }`}
                >
                  {raga.name}
                </span>
                <span
                  className={`font-inter text-[11px] transition-colors duration-300 ${
                    isActive ? 'text-[#B38A45]/80' : 'text-[#24160F]/30'
                  }`}
                >
                  {raga.time}
                </span>
                {/* Active bottom border */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
                    isActive ? 'bg-[#B38A45]' : 'bg-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- Main content area ---- */}
      <div className="mx-auto mt-2 max-w-6xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRaga.id}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid gap-0 overflow-hidden rounded-2xl border border-[#24160F]/5 bg-white/40 shadow-lg backdrop-blur-sm lg:grid-cols-2"
          >
            {/* ---- Left column — Visual ---- */}
            <motion.div
              variants={visualVariants}
              className={`relative flex min-h-[380px] items-center justify-center bg-gradient-to-br ${activeRaga.colors.gradient} p-8 sm:min-h-[440px] lg:min-h-[540px]`}
            >
              {/* Raga-specific decorative elements */}
              {DecorComponent && <DecorComponent />}

              <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Large raga icon */}
                <span
                  className="text-6xl drop-shadow-md sm:text-7xl"
                  role="img"
                  aria-label={`${activeRaga.name} icon`}
                >
                  {activeRaga.icon}
                </span>

                {/* Bottle silhouette */}
                <BottleSilhouette color={activeRaga.colors.primary} />
              </div>
            </motion.div>

            {/* ---- Right column — Information ---- */}
            <motion.div
              variants={contentVariants}
              className="flex flex-col justify-center px-8 py-10 sm:px-10 lg:px-14 lg:py-14"
            >
              {/* Raga number */}
              <span className="font-cormorant text-5xl font-light text-[#B38A45]/60 sm:text-6xl lg:text-7xl">
                {activeRaga.number}
              </span>

              {/* Raga name */}
              <h3 className="mt-2 font-cormorant text-4xl font-bold tracking-tight text-[#24160F] sm:text-5xl">
                {activeRaga.name}
              </h3>

              {/* Devanagari name */}
              <p className="mt-1 font-cormorant text-2xl text-[#24160F]/50 sm:text-3xl">
                {activeRaga.nameDevanagari}
              </p>

              {/* Time badge & mood */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-block rounded-full border border-[#B38A45]/40 px-4 py-1 font-inter text-xs tracking-wide text-[#B38A45]">
                  {activeRaga.time}
                </span>
                <span className="font-cormorant text-base italic text-[#24160F]/60 sm:text-lg">
                  {activeRaga.mood}
                </span>
              </div>

              {/* Gold divider */}
              <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#B38A45] to-[#D6B77C]" />

              {/* Description */}
              <p className="mt-6 font-inter text-sm leading-relaxed text-[#24160F]/75 sm:text-[15px]">
                {activeRaga.description}
              </p>

              {/* Fragrance notes */}
              <div className="mt-8 space-y-4">
                {(
                  [
                    { label: 'Top Notes', notes: activeRaga.fragranceNotes.top },
                    { label: 'Heart Notes', notes: activeRaga.fragranceNotes.heart },
                    { label: 'Base Notes', notes: activeRaga.fragranceNotes.base },
                  ] as const
                ).map(({ label, notes }) => (
                  <div key={label}>
                    <span className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-[#24160F]/50">
                      {label}
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {notes.map((note) => (
                        <span
                          key={note}
                          className="rounded-full bg-[#EADBC5]/80 px-3 py-1 font-inter text-xs text-[#24160F]/70"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={`/experience/${activeRaga.id}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#24160F] px-6 py-3 font-inter text-sm font-medium tracking-wide text-[#24160F] transition-colors duration-300 hover:bg-[#24160F] hover:text-[#F5EBDD]"
                >
                  Explore this fragrance
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                <button
                  onClick={handleAddToBag}
                  disabled={!edpProduct}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#24160F] px-6 py-3 font-inter text-sm font-medium tracking-wide text-[#F5EBDD] transition-colors duration-300 hover:bg-[#3a271e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Add to bag — {edpProduct ? formatPrice(edpProduct.price) : '—'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom scrollbar-hide utility (injected once) */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .hide-scrollbar *,
          .hide-scrollbar *::before,
          .hide-scrollbar *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
