'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, X, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/cart';
import { useAudioStore } from '@/lib/audio';
import { ragas } from '@/data/ragas';

const navLinks = [
  { label: 'Discover', href: '/discover' },
  { label: 'The Five Ragās', href: '/fragrances' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Experience', href: '/experience' },
];

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) => s.getItemCount());

  const isAudioPlaying = useAudioStore((s) => s.isPlaying);
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const togglePlay = useAudioStore((s) => s.togglePlay);
  const playRaga = useAudioStore((s) => s.playRaga);

  const activeRaga = ragas.find((r) => r.id === currentRagaId) || ragas[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const showSolid = !transparent || scrolled;

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: showSolid ? 'rgba(7, 6, 10, 0.95)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: showSolid ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link
            href="/"
            className="font-serif text-xl tracking-wider transition-colors duration-400 md:text-2xl text-white"
          >
            PRAHAR{' '}
            <span className="text-base text-[#D6B77C] opacity-80 md:text-lg">प्रहर</span>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────────────── */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative font-sans text-[13px] uppercase tracking-[0.18em] transition-colors duration-400 text-white/70 hover:text-white"
                >
                  {link.label}
                  {/* hover underline */}
                  <span className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full bg-[#D6B77C]" />
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right Icons ──────────────────────────────────────── */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Live Acoustic Soundwave Pill */}
            <button
              onClick={() => {
                if (isAudioPlaying) {
                  togglePlay();
                } else {
                  playRaga(currentRagaId || 'bhairav');
                }
              }}
              aria-label={isAudioPlaying ? 'Pause Raga Soundtrack' : 'Play Raga Soundtrack'}
              className={`group flex items-center gap-2 rounded-full px-3 py-1.5 transition-all text-xs font-mono uppercase tracking-wider ${
                isAudioPlaying
                  ? 'border border-[#D6B77C] bg-[#D6B77C]/15 text-[#D6B77C] shadow-xs'
                  : 'border border-white/20 text-white/75 hover:border-[#D6B77C] hover:text-[#D6B77C]'
              }`}
            >
              {isAudioPlaying ? (
                <div className="flex items-end gap-[2px] h-3 w-3 pb-0.5">
                  <span className="w-[2px] bg-[#D6B77C] h-full animate-pulse" />
                  <span className="w-[2px] bg-[#D6B77C] h-2/3 animate-pulse delay-75" />
                  <span className="w-[2px] bg-[#D6B77C] h-4/5 animate-pulse delay-150" />
                  <span className="w-[2px] bg-[#D6B77C] h-1/2 animate-pulse delay-200" />
                </div>
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-[#D6B77C]" />
              )}
              <span className="hidden sm:inline text-[11px] font-medium tracking-widest">
                {isAudioPlaying ? `${activeRaga.name} • SOUND` : 'RAGA SOUND'}
              </span>
            </button>

            <button
              aria-label="Search"
              className="hidden transition-colors duration-400 lg:block text-white/70 hover:text-white"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            <button
              aria-label="Account"
              className="hidden transition-colors duration-400 lg:block text-white/70 hover:text-white"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            {/* Shopping Bag */}
            <button
              aria-label="Shopping bag"
              onClick={toggleCart}
              className="relative transition-colors duration-400 text-white/70 hover:text-white"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B38A45] text-[10px] font-semibold leading-none text-white"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden transition-colors duration-400 text-white/80 hover:text-white"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" strokeWidth={1.5} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>

        {/* ── Gold accent line ──────────────────────────────────── */}
        <motion.div
          initial={false}
          animate={{ opacity: showSolid ? 1 : 0.35 }}
          transition={{ duration: 0.4 }}
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #B38A45 20%, #D6B77C 50%, #B38A45 80%, transparent 100%)',
          }}
        />
      </motion.header>

      {/* ── Mobile Menu Overlay ──────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col bg-[#17131D] lg:hidden"
          >
            {/* Top bar with close button */}
            <div className="flex h-[72px] items-center justify-between px-5 md:px-10">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="font-serif text-xl tracking-wider text-white md:text-2xl"
              >
                PRAHAR{' '}
                <span className="text-base opacity-70 md:text-lg">प्रहर</span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Gold line */}
            <div
              className="h-px w-full opacity-30"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, #B38A45 20%, #D6B77C 50%, #B38A45 80%, transparent 100%)',
              }}
            />

            {/* Links */}
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.08 * i,
                    ease: 'easeOut',
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group relative font-serif text-2xl tracking-widest text-white/90 transition-colors hover:text-[#D6B77C] md:text-3xl"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[#D6B77C] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Sound Control */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex items-center gap-3 px-4 py-2 rounded-full border border-[#D6B77C]/30 bg-white/5"
              >
                <button
                  onClick={() => {
                    if (isAudioPlaying) {
                      togglePlay();
                    } else {
                      playRaga(currentRagaId || 'bhairav');
                    }
                  }}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D6B77C]"
                >
                  {isAudioPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#D6B77C]" />
                      <span>Sound: {activeRaga.name} (Pause)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#D6B77C]" />
                      <span>Play Raga: {activeRaga.name}</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Mobile utility links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * navLinks.length }}
                className="mt-8 flex items-center gap-8"
              >
                <button
                  aria-label="Search"
                  className="text-white/50 transition-colors hover:text-[#D6B77C]"
                >
                  <Search className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  aria-label="Account"
                  className="text-white/50 transition-colors hover:text-[#D6B77C]"
                >
                  <User className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  aria-label="Shopping bag"
                  onClick={() => {
                    setMobileOpen(false);
                    toggleCart();
                  }}
                  className="relative text-white/50 transition-colors hover:text-[#D6B77C]"
                >
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                  {itemCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B38A45] text-[10px] font-semibold leading-none text-white">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </button>
              </motion.div>
            </div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pb-10 text-center font-serif text-sm italic tracking-wider text-white/30"
            >
              The fragrance you can hear.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
