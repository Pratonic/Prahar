'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  QrCode,
  Music,
  ExternalLink,
  Disc3,
} from 'lucide-react';
import { ragas } from '@/data/ragas';
import { useAudioStore } from '@/lib/audio';

export default function MusicPlayer() {
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const playRaga = useAudioStore((s) => s.playRaga);
  const togglePlay = useAudioStore((s) => s.togglePlay);
  const nextTrack = useAudioStore((s) => s.nextTrack);
  const prevTrack = useAudioStore((s) => s.prevTrack);
  const currentTime = useAudioStore((s) => s.currentTime);
  const duration = useAudioStore((s) => s.duration);
  const seek = useAudioStore((s) => s.seek);
  const volume = useAudioStore((s) => s.volume);
  const setVolume = useAudioStore((s) => s.setVolume);
  const isMuted = useAudioStore((s) => s.isMuted);
  const toggleMute = useAudioStore((s) => s.toggleMute);

  const currentRaga = ragas.find((r) => r.id === currentRagaId) || ragas[0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="experience" className="relative bg-[#17131D] py-20 lg:py-28 px-5 sm:px-10 lg:px-16 text-white border-t border-[#B38A45]/30">
      <div className="mx-auto max-w-[1440px]">
        {/* Header from Deck */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/40 bg-white/5 mb-4 backdrop-blur-md">
            <Music className="w-3.5 h-3.5 text-[#D6B77C]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B77C] font-mono">
              The Digital Music Experience
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            Your fragrance has a{' '}
            <span className="italic font-normal text-[#D6B77C]">soundtrack.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 font-sans leading-relaxed">
            Every PRAHAR fragrance connects the physical bottle to an authentic classical raga composition. 
            Click play below to stream the high-fidelity classical tanpura and melodic raga harmonics.
          </p>
        </div>

        {/* Two-Column Grid: Music Player + Phone Visual from Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Digital Audio Player */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div>
              {/* Raga Selection Badges */}
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#D6B77C] font-mono mb-4 flex items-center justify-between">
                <span>Select Raga Stream</span>
                <span className="text-white/40">5 Sacred Hours</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {ragas.map((r) => {
                  const isCurrent = r.id === currentRagaId;
                  return (
                    <button
                      key={r.id}
                      onClick={() => playRaga(r.id)}
                      className={`px-4 py-2 rounded-full text-xs transition-all duration-300 font-sans flex items-center gap-2 ${
                        isCurrent
                          ? 'bg-[#B38A45] text-white shadow-md font-semibold'
                          : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                      }`}
                    >
                      <span className="font-serif text-sm">{r.name}</span>
                      <span className="text-[10px] opacity-70">({r.time})</span>
                    </button>
                  );
                })}
              </div>

              {/* Now Playing Info */}
              <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-stone-900 border-2 border-[#D6B77C]/40 p-1 flex items-center justify-center shrink-0 shadow-lg">
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying ? { repeat: Infinity, duration: 8, ease: 'linear' } : {}}
                    className="w-full h-full rounded-full border border-dashed border-white/20 flex items-center justify-center"
                    style={{ backgroundColor: currentRaga.colors.primary + '33' }}
                  >
                    <Disc3 className="w-8 h-8 text-[#D6B77C]" />
                  </motion.div>
                  <div className="absolute w-3 h-3 rounded-full bg-[#D6B77C] shadow-inner" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#D6B77C]">
                      Raga {currentRaga.number} • {currentRaga.time}
                    </span>
                    {isPlaying && (
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white truncate mt-1">
                    {currentRaga.name}{' '}
                    <span className="text-xl text-[#D6B77C] font-normal">
                      ({currentRaga.nameDevanagari})
                    </span>
                  </h3>
                  <p className="text-xs text-white/60 font-sans mt-1">
                    Mood: <span className="text-white/90 font-medium">{currentRaga.mood}</span> • Notes:{' '}
                    <span className="italic">{currentRaga.character}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Waveform Visualization */}
            <div className="my-8">
              <div className="flex items-end justify-between gap-1 sm:gap-1.5 h-16 px-3 py-1 bg-black/40 rounded-xl border border-white/5">
                {[...Array(32)].map((_, i) => {
                  const seed = (i * 7) % 20;
                  const activeHeight = isPlaying
                    ? Math.max(12, (Math.sin(i + currentTime * 0.5) + 1) * 26 + seed)
                    : 8;

                  return (
                    <motion.div
                      key={i}
                      animate={{ height: `${activeHeight}px` }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex-1 rounded-t-sm transition-colors"
                      style={{
                        backgroundColor:
                          i < (currentTime / (duration || 45)) * 32
                            ? '#D6B77C'
                            : 'rgba(214, 183, 124, 0.25)',
                      }}
                    />
                  );
                })}
              </div>

              {/* Progress Slider */}
              <div className="mt-4">
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    seek(Math.floor(ratio * (duration || 45)));
                  }}
                  className="relative h-2 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden group"
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#B38A45] to-[#D6B77C] rounded-full"
                    style={{ width: `${((currentTime / (duration || 45)) * 100).toFixed(1)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-white/50 mt-1.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 45)}</span>
                </div>
              </div>
            </div>

            {/* Playback Controls & Volume */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Transport Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevTrack}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#B38A45] to-[#D6B77C] text-[#17131D] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-[#B38A45]/30"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Next track"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={toggleMute}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 sm:w-28 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D6B77C]"
                />
              </div>

              {/* Direct Link to Raga Experience */}
              <Link
                href={`/experience/${currentRaga.id}`}
                className="text-xs font-mono uppercase tracking-wider text-[#D6B77C] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Full QR Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-white/40 font-mono text-center sm:text-left flex items-center justify-between">
              <span>*Plays authentic uncompressed 44.1kHz audio recording for {currentRaga.name}</span>
              <span>PRAHAR SoundLab</span>
            </div>
          </div>

          {/* Right Column: Pure Photo with iPhone and Bottle */}
          <div className="lg:col-span-5 relative min-h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#B38A45]/30 bg-[#17131D]">
            <Image
              src="/images/clean/iphone_raga_ritual_pure.jpg"
              alt="PRAHAR iPhone Music Experience with Bottle"
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 p-5 rounded-2xl bg-[#17131D]/85 backdrop-blur-md border border-white/20 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6B77C] block mb-1">
                EVERY BOTTLE HAS A SOUNDTRACK
              </span>
              <p className="text-xs text-white/80 font-sans leading-relaxed">
                "Scan the bottle's NFC emblem to launch your personalized classical raga player synced to your time of day."
              </p>
              <button
                onClick={() => playRaga(currentRaga.id)}
                className="mt-3 w-full py-2.5 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Current Raga' : `Play Raga ${currentRaga.name}`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
