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
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0E1017]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl text-white">
      {/* Top micro progress line with Armory orange slider */}
      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          seek(Math.floor(ratio * (duration || 45)));
        }}
        className="h-1 w-full bg-white/10 cursor-pointer relative group"
      >
        <div
          className="h-full bg-[#ff4d17] transition-all"
          style={{ width: `${((currentTime / (duration || 45)) * 100).toFixed(1)}%` }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Now Playing Info */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={togglePlay}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#ff4d17] hover:bg-[#e03d07] text-white flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,77,23,0.35)] cursor-pointer"
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
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff4d17]">
                {currentRaga.time}
              </span>
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d17] animate-pulse" />
              )}
            </div>
            <div className="flex items-baseline gap-2 truncate">
              <span className="font-serif text-base sm:text-lg text-white font-medium">
                Raga {currentRaga.name}
              </span>
              <span className="text-xs font-serif text-white/50 hidden sm:inline">
                ({currentRaga.nameDevanagari})
              </span>
              <span className="text-xs text-white/40 hidden md:inline font-mono truncate">
                • {currentRaga.character}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Waveform & Transport */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={prevTrack}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous Raga"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* 16 Animated Waveform Bars */}
          <div className="flex items-end gap-1 h-5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-[#ff4d17] rounded-full"
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${Math.max(3, (i * 7) % 18)}px`,
                          `${Math.max(4, ((16 - i) * 8) % 20)}px`,
                          `${Math.max(3, (i * 5) % 16)}px`,
                        ],
                      }
                    : { height: '3px' }
                }
                transition={
                  isPlaying
                    ? {
                        repeat: Infinity,
                        duration: 0.5 + (i % 3) * 0.2,
                        ease: 'easeInOut',
                      }
                    : { duration: 0.3 }
                }
              />
            ))}
          </div>

          <button
            onClick={nextTrack}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Next Raga"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-white/40 ml-2">
            {formatTime(currentTime)} / {formatTime(duration || 45)}
          </span>
        </div>

        {/* Right: Quick Raga Selector & Volume */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Raga Switcher */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-[10px]">
            {ragas.map((r) => (
              <button
                key={r.id}
                onClick={() => playRaga(r.id)}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  currentRagaId === r.id
                    ? 'bg-[#ff4d17] text-white font-bold'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* Volume toggle */}
          <button
            onClick={toggleMute}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-[#ff4d17]" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
