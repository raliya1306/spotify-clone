import { Song } from '@/types';
import { create } from 'zustand';

interface PlayerStore {
  currentSong: Song | null,
  isPlaying: boolean,
  currentIndex: number,
  queue: Song[],
  initializeQueue: (songs: Song[]) => void,
  playAlbum: (songs: Song[], startIndex?: number) => void,
  setCurrentSong: (song: Song | null) => void,
  togglePlay: () => void,
  playNextSong: () => void,
  playPreviousSong: () => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  currentIndex: -1,
  queue: [],
  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
    })
  },
  playAlbum: (songs: Song[], startIndex = 0) => {
    const song = songs[startIndex]
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true
    })
  },
  setCurrentSong: (song: Song | null) => {
    if (!song) return
    const songIndex = get().queue.findIndex((s) => s._id === song._id)
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex 
    })
  },
  togglePlay: () => {
    const startPlaying = !get().isPlaying

    set({
      isPlaying: startPlaying
    })
  },
  playNextSong: () => {
    const { currentIndex, queue } = get()
    const nextIndex = currentIndex + 1

    if(nextIndex < queue.length) {
      const nextSong = queue[nextIndex]
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true
      })
    } else {
      set({ isPlaying: false })
    }
  },
  playPreviousSong: () => {
    const { currentIndex, queue } = get()
    const prevIndex = currentIndex - 1

    if(prevIndex < queue.length) {
      const nextSong = queue[prevIndex]
      set({
        currentSong: nextSong,
        currentIndex: prevIndex,
        isPlaying: true
      })
    } else {
      set({ isPlaying: false })
    }
  }
}))