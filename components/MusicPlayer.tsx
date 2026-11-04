'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  QrCode,
  Sparkles,
  ExternalLink,
  Disc3,
  Music,
} from 'lucide-react';
import { ragas } from '@/data/ragas';

// Frequency maps for synthesized Indian ambient drone chords per raga
const ragaPitches: Record<string, number[]> = {
  bhairav: [130.81, 138.59, 164.81, 196.0, 207.65], // C3, Db3, E3, G3, Ab3 (Bhairav scale tones)
  sarang: [146.83, 164.81, 196.0, 220.0, 261.63], // D3, E3, G3, A3, C4 (Sarang scale tones)
  yaman: [130.81, 164.81, 185.0, 196.0, 246.94], // C3, E3, F#3, G3, B3 (Teevra Ma Yaman)
  darbari: [110.0, 130.81, 146.83, 164.81, 196.0], // A2, C3, D3, E3, G3 (Deep Darbari Kanada)
  malhar: [146.83, 174.61, 196.0, 220.0, 261.63], // D3, F3, G3, A3, C4 (Megh / Mian ki Malhar)
};

export default function MusicPlayer() {
  const [currentRagaIndex, setCurrentRagaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const duration = 210; // 3 mins 30 secs
  const currentRaga = ragas[currentRagaIndex];

  // Web Audio API refs for generative ambient sound
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Stop audio synthesis
  const stopAudio = useCallback(() => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    oscillatorsRef.current = [];
  }, []);

  // Start Indian drone synthesis for current raga
  const startAudio = useCallback(() => {
    stopAudio();

    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      const currentVol = isMuted ? 0 : volume * 0.15; // gentle ambient level
      masterGain.gain.setValueAtTime(currentVol, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const pitches = ragaPitches[currentRaga.id] || [130.81, 196.0, 261.63];

      // Tanpura-like drone with warm detuning
      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // subtle vibrato / movement
        osc.detune.setValueAtTime((idx - 1) * 3, ctx.currentTime);

        // Relative balance
        oscGain.gain.setValueAtTime(1 / pitches.length, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscillatorsRef.current.push(osc);
      });
    } catch {
      // AudioContext fallback
    }
  }, [currentRaga.id, isMuted, volume, stopAudio]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  };

  // Timer loop when playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            // Next track
            setCurrentRagaIndex((i) => (i + 1) % ragas.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  // Update audio when raga changes while playing
  useEffect(() => {
    if (isPlaying) {
      startAudio();
    }
    return () => {
      stopAudio();
    };
  }, [currentRagaIndex, isPlaying, startAudio, stopAudio]);

  // Adjust volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetVol = isMuted ? 0 : volume * 0.15;
      gainNodeRef.current.gain.setTargetAtTime(targetVol, audioCtxRef.current.currentTime, 0.05);
    }
  }, [volume, isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopAudio]);

  const handleNext = () => {
    setCurrentTime(0);
    setCurrentRagaIndex((prev) => (prev + 1) % ragas.length);
  };

  const handlePrev = () => {
    setCurrentTime(0);
    setCurrentRagaIndex((prev) => (prev - 1 + ragas.length) % ragas.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(Math.floor(ratio * duration));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="experience" className="relative bg-[#17131D] py-24 md:py-32 overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[160px] opacity-25 transition-all duration-1000"
        style={{ backgroundColor: currentRaga.colors.primary }}
      />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-[450px] w-[450px] rounded-full blur-[140px] opacity-20 bg-[#B96A2D]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
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

          <p className="mt-6 text-base sm:text-lg text-white/70 font-sans leading-relaxed">
            Every PRAHAR fragrance connects the physical world of perfumery with the digital world of music. 
            Each bottle features an NFC & QR gateway allowing you to unlock its time-bound raga symphony.
          </p>
        </div>

        {/* Two-Column Grid: Music Player + QR Experience Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Digital Audio Player */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Top Bar: Raga Selection Badges */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#D6B77C] font-mono mb-4 flex items-center justify-between">
                <span>Select Raga Stream</span>
                <span className="text-white/40">5 Compositions</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {ragas.map((r, idx) => {
                  const isCurrent = idx === currentRagaIndex;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setCurrentTime(0);
                        setCurrentRagaIndex(idx);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-300 font-sans flex items-center gap-2 ${
                        isCurrent
                          ? 'bg-[#B38A45] text-white shadow-md font-medium'
                          : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                      }`}
                    >
                      <span className="font-serif">{r.name}</span>
                      <span className="text-[10px] opacity-70">({r.timeRange})</span>
                    </button>
                  );
                })}
              </div>

              {/* Now Playing Info */}
              <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                {/* Vinyl / Disc graphic */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-950 border-2 border-[#D6B77C]/40 p-1 flex items-center justify-center shrink-0 shadow-lg">
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying ? { repeat: Infinity, duration: 8, ease: 'linear' } : {}}
                    className="w-full h-full rounded-full border border-dashed border-white/20 flex items-center justify-center"
                    style={{ backgroundColor: currentRaga.colors.primary + '33' }}
                  >
                    <Disc3 className="w-8 h-8 text-[#D6B77C]" />
                  </motion.div>
                  {/* Center pin */}
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
                    Mood: <span className="text-white/90">{currentRaga.mood}</span> • Notes:{' '}
                    <span className="italic">{currentRaga.character}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Waveform Visualization */}
            <div className="my-8">
              <div className="flex items-end justify-between gap-1 sm:gap-1.5 h-16 px-2 py-1 bg-black/30 rounded-xl border border-white/5">
                {[...Array(32)].map((_, i) => {
                  const seed = (i * 7) % 20;
                  const activeHeight = isPlaying ? Math.max(15, (Math.sin(i + currentTime * 0.5) + 1) * 28 + seed) : 8;

                  return (
                    <motion.div
                      key={i}
                      animate={{ height: `${activeHeight}px` }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex-1 rounded-t-sm transition-colors"
                      style={{
                        backgroundColor: i < (currentTime / duration) * 32 ? '#D6B77C' : 'rgba(214, 183, 124, 0.25)',
                      }}
                    />
                  );
                })}
              </div>

              {/* Progress Slider */}
              <div className="mt-4">
                <div
                  onClick={handleSeek}
                  className="relative h-2 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden group"
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#B38A45] to-[#D6B77C] rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-white/50 mt-1.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Playback Controls & Volume */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Transport Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
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
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Next track"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsMuted(!isMuted)}
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
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-24 sm:w-28 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D6B77C]"
                />
              </div>

              {/* Direct QR Link */}
              <Link
                href={`/experience/${currentRaga.id}`}
                className="text-xs font-mono uppercase tracking-wider text-[#D6B77C] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Full Experience</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-white/40 font-mono text-center sm:text-left flex items-center justify-between">
              <span>*Interactive Indian Classical tanpura & raga harmony synthesis via Web Audio API</span>
              <span>PRAHAR SoundLab</span>
            </div>
          </div>

          {/* Right Column: Physical-to-Digital QR Concept Demonstration */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-[#1F1928] to-[#17131D] border border-[#B38A45]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#D6B77C]">
                  Physical Meets Digital
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#B38A45]/20 text-[#D6B77C] text-[10px] font-mono border border-[#B38A45]/30">
                  Every Bottle
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-white">
                Scan. Listen.{' '}
                <span className="italic text-[#D6B77C] font-normal">Immerse.</span>
              </h3>

              <p className="mt-4 text-sm text-white/70 font-sans leading-relaxed">
                When you hold a physical bottle of PRAHAR, the back label carries a laser-engraved micro QR emblem. 
                Tapping or scanning seamlessly connects your phone to the raga experience tailored for that moment.
              </p>

              {/* Visual Mockup of Bottle Label & Smartphone Scanner */}
              <div className="my-8 relative rounded-2xl bg-black/40 border border-white/10 p-6 flex flex-col items-center justify-center overflow-hidden">
                {/* Glowing laser scanline animation */}
                <motion.div
                  animate={{ y: [0, 140, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D6B77C] to-transparent shadow-[0_0_12px_#D6B77C]"
                />

                {/* QR Code graphic */}
                <div className="p-4 bg-white rounded-xl shadow-2xl border-4 border-[#D6B77C] mb-4">
                  <div className="w-28 h-28 grid grid-cols-7 grid-rows-7 gap-1 p-1 bg-white">
                    {/* Realistic QR pattern blocks */}
                    <div className="col-span-3 row-span-3 bg-[#17131D] rounded-xs p-1">
                      <div className="w-full h-full bg-white rounded-xs p-1">
                        <div className="w-full h-full bg-[#17131D]" />
                      </div>
                    </div>
                    <div className="col-start-5 col-span-3 row-span-3 bg-[#17131D] rounded-xs p-1">
                      <div className="w-full h-full bg-white rounded-xs p-1">
                        <div className="w-full h-full bg-[#17131D]" />
                      </div>
                    </div>
                    <div className="col-span-3 row-start-5 row-span-3 bg-[#17131D] rounded-xs p-1">
                      <div className="w-full h-full bg-white rounded-xs p-1">
                        <div className="w-full h-full bg-[#17131D]" />
                      </div>
                    </div>
                    <div className="col-start-4 row-start-2 bg-[#B96A2D]" />
                    <div className="col-start-4 row-start-4 bg-[#B38A45]" />
                    <div className="col-start-5 row-start-5 bg-[#17131D]" />
                    <div className="col-start-6 row-start-6 bg-[#B38A45]" />
                    <div className="col-start-7 row-start-4 bg-[#17131D]" />
                  </div>
                </div>

                <div className="text-center">
                  <div className="font-serif text-lg text-white">PRAHAR Authenticated Gateway</div>
                  <div className="text-xs text-[#D6B77C] font-mono mt-0.5">
                    /experience/{currentRaga.id}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Try QR modal trigger & Link */}
            <div className="space-y-3">
              <Link
                href={`/experience/${currentRaga.id}`}
                className="w-full py-3.5 px-6 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <QrCode className="w-4 h-4" />
                <span>Simulate Bottle QR Scan</span>
              </Link>

              <p className="text-[11px] text-white/50 text-center font-sans">
                Experience what customers see upon opening their luxury PRAHAR packaging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
