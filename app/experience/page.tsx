import Link from 'next/link';
import { Sparkles, QrCode, Music, Disc3, ArrowRight, ShieldCheck } from 'lucide-react';
import { ragas } from '@/data/ragas';
import MusicPlayer from '@/components/MusicPlayer';

export const metadata = {
  title: 'Digital Music Experience — PRAHAR',
  description:
    'Every PRAHAR fragrance connects the physical world of perfumery with the digital world of music. Listen to the raga compositions for each hour.',
};

export default function ExperiencePage() {
  return (
    <div className="bg-[#17131D] text-white min-h-screen pt-28 pb-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/40 bg-white/5 mb-4 backdrop-blur-md">
            <Music className="w-3.5 h-3.5 text-[#D6B77C]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B77C] font-mono">
              The Digital Sanctuary
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            The fragrance you can{' '}
            <span className="italic font-normal text-[#D6B77C]">hear.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/70 font-sans leading-relaxed">
            Indian classical music was composed to be experienced in concert with the natural elements. 
            Select any of the five classical raga environments below, or stream using our interactive audio deck.
          </p>
        </div>

        {/* Embedded Full Interactive Deck */}
        <div className="mb-24">
          <MusicPlayer />
        </div>

        {/* The 5 Dedicated QR Experience Gateways */}
        <div className="border-t border-white/10 pt-16">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D6B77C]">
                Dedicated NFC / QR Gateways
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mt-1">
                Enter an Individual Raga Realm
              </h2>
            </div>
            <span className="text-xs text-white/50 font-mono">
              5 Dedicated Master Portals
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ragas.map((raga) => (
              <Link
                key={raga.id}
                href={`/experience/${raga.id}`}
                className="group relative p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#D6B77C]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                <div
                  className="absolute -right-16 -top-16 w-44 h-44 rounded-full blur-[70px] opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: raga.colors.primary }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono tracking-widest text-[#D6B77C]">
                      Raga {raga.number} • {raga.time}
                    </span>
                    <span className="text-2xl">{raga.icon}</span>
                  </div>

                  <h3 className="font-serif text-3xl text-white group-hover:text-[#D6B77C] transition-colors">
                    {raga.name}
                  </h3>
                  <span className="text-xs text-white/60 block mt-0.5">
                    {raga.nameDevanagari} • {raga.mood}
                  </span>

                  <p className="mt-4 text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed font-sans">
                    {raga.character} {raga.description}
                  </p>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#D6B77C]">
                  <span>Launch Soundscape</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
