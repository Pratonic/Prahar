import { create } from 'zustand';
import { ragas, type Raga } from '@/data/ragas';

export interface AudioState {
  currentRagaId: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playRaga: (ragaId: string) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

// Global audio element reference (singleton)
let globalAudio: HTMLAudioElement | null = null;

const ragaAudioFiles: Record<string, string> = {
  bhairav: '/audio/bhairav.wav',
  sarang: '/audio/sarang.wav',
  yaman: '/audio/yaman.wav',
  darbari: '/audio/darbari.wav',
  malhar: '/audio/malhar.wav',
};

export const useAudioStore = create<AudioState>((set, get) => {
  const getAudio = () => {
    if (typeof window === 'undefined') return null;
    if (!globalAudio) {
      globalAudio = new Audio();
      globalAudio.preload = 'auto';

      globalAudio.addEventListener('timeupdate', () => {
        if (globalAudio) {
          set({ currentTime: Math.floor(globalAudio.currentTime) });
        }
      });

      globalAudio.addEventListener('loadedmetadata', () => {
        if (globalAudio) {
          set({ duration: Math.floor(globalAudio.duration) || 45 });
        }
      });

      globalAudio.addEventListener('ended', () => {
        get().nextTrack();
      });
    }
    return globalAudio;
  };

  return {
    currentRagaId: 'bhairav',
    isPlaying: false,
    currentTime: 0,
    duration: 45,
    volume: 0.8,
    isMuted: false,

    playRaga: (ragaId: string) => {
      const audio = getAudio();
      const current = get();

      if (current.currentRagaId === ragaId && current.isPlaying) {
        // Toggle pause
        if (audio) audio.pause();
        set({ isPlaying: false });
        return;
      }

      if (audio) {
        audio.src = ragaAudioFiles[ragaId] || '/audio/bhairav.wav';
        audio.volume = current.isMuted ? 0 : current.volume;
        audio.play().then(() => {
          set({ currentRagaId: ragaId, isPlaying: true, currentTime: 0 });
        }).catch(() => {
          // Fallback if browser autoplay policies block
          set({ currentRagaId: ragaId, isPlaying: true });
        });
      } else {
        set({ currentRagaId: ragaId, isPlaying: true });
      }
    },

    togglePlay: () => {
      const audio = getAudio();
      const { isPlaying, currentRagaId, volume, isMuted } = get();

      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        set({ isPlaying: false });
      } else {
        if (!audio.src || !audio.src.includes('.wav')) {
          audio.src = ragaAudioFiles[currentRagaId] || '/audio/bhairav.wav';
        }
        audio.volume = isMuted ? 0 : volume;
        audio.play().then(() => {
          set({ isPlaying: true });
        }).catch(() => {
          set({ isPlaying: true });
        });
      }
    },

    pause: () => {
      const audio = getAudio();
      if (audio) audio.pause();
      set({ isPlaying: false });
    },

    seek: (time: number) => {
      const audio = getAudio();
      if (audio) {
        audio.currentTime = time;
        set({ currentTime: time });
      }
    },

    setVolume: (vol: number) => {
      const audio = getAudio();
      if (audio) {
        audio.volume = vol;
      }
      set({ volume: vol, isMuted: vol === 0 });
    },

    toggleMute: () => {
      const audio = getAudio();
      const { isMuted, volume } = get();
      const nextMuted = !isMuted;
      if (audio) {
        audio.volume = nextMuted ? 0 : volume;
      }
      set({ isMuted: nextMuted });
    },

    nextTrack: () => {
      const { currentRagaId } = get();
      const idx = ragas.findIndex((r) => r.id === currentRagaId);
      const nextIdx = (idx + 1) % ragas.length;
      get().playRaga(ragas[nextIdx].id);
    },

    prevTrack: () => {
      const { currentRagaId } = get();
      const idx = ragas.findIndex((r) => r.id === currentRagaId);
      const prevIdx = (idx - 1 + ragas.length) % ragas.length;
      get().playRaga(ragas[prevIdx].id);
    },
  };
});
