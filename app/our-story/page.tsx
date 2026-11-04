import Link from 'next/link';
import { Sparkles, Feather, Heart, Leaf, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import BrandPhilosophy from '@/components/BrandPhilosophy';

export const metadata = {
  title: 'Our Story — PRAHAR (प्रहर)',
  description:
    'For centuries, Indian musicians sang each raga only at its own hour. PRAHAR brings that relationship between time, emotion and music into the world of luxury fragrance.',
};

export default function OurStoryPage() {
  return (
    <div className="pt-28 pb-32 bg-[#F5EBDD] min-h-screen">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Editorial Narrative Header */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/60 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
              The Genesis & Heritage
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#24160F] tracking-tight leading-[1.08]">
            What if you could{' '}
            <span className="italic font-normal text-[#B96A2D]">wear this?</span>
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#B96A2D] mt-4">
            "PRAHAR — The fragrance you can hear."
          </p>

          <p className="mt-8 text-lg sm:text-xl text-[#24160F]/80 font-sans leading-relaxed">
            For centuries, Indian classical musicians sang each raga only at its own designated hour. 
            A morning raga sung at dusk was believed to disrupt the cosmic order of the spirit. 
            PRAHAR resurrects this timeless bond between chronobiology, sonic vibration, and olfactory emotion.
          </p>
        </div>

        {/* Narrative Chapters in Editorial Split-Screen */}
        <div className="space-y-20 mb-28">
          {/* Chapter 1: The Philosophy of Prahar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#EADBC5]/40 rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#B38A45]/25">
            <div className="lg:col-span-5 relative min-h-[380px] rounded-2xl bg-[#17131D] flex flex-col justify-between p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/60 via-stone-900/80 to-stone-950" />
              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#D6B77C]">
                <span>CHAPTER I</span>
                <span>CHRONO-AESTHETICS</span>
              </div>
              <div className="relative z-10 text-center my-auto">
                <span className="font-serif text-7xl text-white block">प्रहर</span>
                <span className="text-xs tracking-[0.3em] uppercase text-[#D6B77C] font-mono mt-2 block">
                  Eight Divisions of the Day
                </span>
              </div>
              <div className="relative z-10 text-[11px] text-white/50 font-mono">
                Sanskrit: Pra-hara — An interval of approximately three hours.
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-mono tracking-widest text-[#B96A2D] block mb-2">
                01 • The Temporal Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24160F] tracking-tight mb-4">
                The Eight Hours of Human Feeling
              </h2>
              <p className="text-[#24160F]/80 leading-relaxed font-sans text-base sm:text-lg mb-4">
                In classical Vedic and Hindustani tradition, the 24-hour solar cycle is divided into eight prahars. 
                Each prahar commands a distinct physical temperature, mental state, and emotional vibration. 
                The dawn prahar awakens; noon demands sharp focus; twilight invites communion and surrender; 
                midnight commands introspective majesty.
              </p>
              <p className="text-[#24160F]/80 leading-relaxed font-sans text-base sm:text-lg">
                Instead of static "day perfumes" or "evening perfumes," PRAHAR designs five micro-season fragrances 
                calibrated to precisely accompany your daily emotional transformation.
              </p>
            </div>
          </div>

          {/* Chapter 2: Kannauj Hydro-Distillation Craft */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#EADBC5]/40 rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#B38A45]/25">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <span className="text-xs uppercase font-mono tracking-widest text-[#B96A2D] block mb-2">
                02 • Artisanal Provenance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24160F] tracking-tight mb-4">
                Kannauj Deg-Bhapka & Indian Botanicals
              </h2>
              <p className="text-[#24160F]/80 leading-relaxed font-sans text-base sm:text-lg mb-4">
                We refuse synthetic shortcuts. Our foundational essences are hand-harvested and distilled in Kannauj — 
                the perfume capital of India where copper cauldrons (degs) and bamboo condenser pipes (chonga) have 
                captured flowers over low wood fires for over four centuries.
              </p>
              <p className="text-[#24160F]/80 leading-relaxed font-sans text-base sm:text-lg">
                From aged Mysore sandalwood to wild coastal Odisha kewra and the rare baked-earth mitti attar that 
                encapsulates the first drops of monsoon rain, every ingredient honors its authentic geographical terroir.
              </p>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 relative min-h-[380px] rounded-2xl bg-[#17131D] flex flex-col justify-between p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-950/60 via-stone-900/80 to-stone-950" />
              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#D6B77C]">
                <span>CHAPTER II</span>
                <span>NATURAL EXTRACTIONS</span>
              </div>
              <div className="relative z-10 text-center my-auto">
                <span className="font-serif text-5xl text-white block">Deg & Bhapka</span>
                <span className="text-xs tracking-[0.2em] uppercase text-[#D6B77C] font-mono mt-2 block">
                  Ancient Steam Distillation
                </span>
              </div>
              <div className="relative z-10 text-[11px] text-white/50 font-mono">
                100% Pure Essential Oils & Hydro-Distillates
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Brand Philosophy Component */}
        <div id="philosophy">
          <BrandPhilosophy />
        </div>
      </div>
    </div>
  );
}
