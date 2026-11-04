'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Music, Sparkles } from 'lucide-react';
import { useAudioStore } from '@/lib/audio';
import { ragas } from '@/data/ragas';

export default function GlobalAudioBar() {
  const currentRagaId = useAudioStore((s) => s.currentRagaId);
  const isPlaying = useAudioStore((s) => s.isPlaying);
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
  const playRaga = useAudioStore((s) => s.playRaga);

  const currentRaga = ragas.find((r) => r.id === currentRagaId) || ragas[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#17131D]/95 backdrop-blur-xl border-t border-[#B38A45]/30 shadow-2xl text-white">
      {/* Top micro progress line */}
      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          seek(Math.floor(ratio * (duration || 45)));
        }}
        className="h-1 w-full bg-white/10 cursor-pointer relative group"
      >
        <div
          className="h-full bg-gradient-to-r from-[#B38A45] to-[#D6B77C] transition-all"
          style={{ width: `${((currentTime / (duration || 45)) * 100).toFixed(1)}%` }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Now Playing Info */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={togglePlay}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#B38A45] to-[#D6B77C] text-[#17131D] flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-md"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D6B77C]">
                {currentRaga.time}
              </span>
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </div>
            <div className="flex items-baseline gap-2 truncate">
              <span className="font-serif text-base sm:text-lg text-white font-medium">
                Raga {currentRaga.name}
              </span>
              <span className="text-xs font-serif text-[#D6B77C] hidden sm:inline">
                ({currentRaga.nameDevanagari})
              </span>
              <span className="text-xs text-white/50 hidden md:inline font-sans truncate">
                • {currentRaga.character}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Waveform & Transport */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={prevTrack}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Previous Raga"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* 16 Animated Waveform Bars */}
          <div className="flex items-end gap-1 h-5 px-3 py-1 bg-black/40 rounded-full border border-white/5">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                animate={
                  isPlaying
                    ? {
                        height: ['4px', `${6 + ((i * 5 + currentTime * 3) % 18)}px`, '4px'],
                      }
                    : { height: '4px' }
                }
                transition={
                  isPlaying
                    ? {
                        repeat: Infinity,
                        duration: 0.6 + (i % 4) * 0.15,
                        ease: 'easeInOut',
                      }
                    : {}
                }
                className="w-1 rounded-full bg-[#D6B77C]"
              />
            ))}
          </div>

          <button
            onClick={nextTrack}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Next Raga"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-mono text-white/50 min-w-16">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Right: Quick Raga Selector & Volume */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Quick Raga Switcher buttons */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {ragas.map((r) => {
              const active = r.id === currentRagaId;
              return (
                <button
                  key={r.id}
                  onClick={() => playRaga(r.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-[#B38A45] text-white font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {r.name}
                </button>
              );
            })}
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-white/60 hover:text-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D6B77C] hidden sm:inline-block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
