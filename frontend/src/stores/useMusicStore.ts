import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import { create } from 'zustand';

interface MusicStore {
  songs: Song[],
  albums: Album[],
  isLoading: boolean,
  error: string | null,
  currentAlbum: Album | null,
  madeForYou: Song[],  
  todayInMusic: Song[],
  recommendedSongs: Song[],
  getAlbums: () => Promise<void>
  getAlbumbyId: (id: string) => Promise<void>,
  getMadeForYou: () => Promise<void>, 
  getRecommendedSongs: () => Promise<void>, 
  getTodayInMusic: () => Promise<void>, 
  getSongs: () => Promise<void>, 
  getStats: () => Promise<void>, 
  stats: Stats
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYou: [],
  todayInMusic: [],
  recommendedSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalUsers: 0
  },

  getAlbums: async () => {
    set({ isLoading: true, error: null })

    try {
      const res = await axiosInstance.get('/albums')
      set({ albums: res.data })
    } catch (error:any) {
      set({ error: error.response })      
    } finally {
      set({ isLoading: false })
    }
  },

  getAlbumbyId: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.get(`/albums/${id}`)
      set({ currentAlbum: res.data })
    } catch (error: any) {
      set({ error: error.response })
    } finally {
      set({ isLoading: false })
    }
  },
  getMadeForYou: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.get('/songs/made-for-you')
      set({ madeForYou: res.data })
    } catch (error: any) {
      set({error: error.response})
    } finally {
      set({ isLoading: false })
    }
  },
  getTodayInMusic: async () => {
    set({ isLoading: false, error: null })
    try {
      const res = await axiosInstance.get('/songs/today-in-music')
      set({ todayInMusic: res.data })
    } catch (error: any) {
      set({error: error.response})
    } finally {
      set({ isLoading: false })
    }
  },
  getRecommendedSongs: async () => {
    set({ isLoading: false, error: null })
    try {
      const res = await axiosInstance.get('/songs/recommended')
      set({ recommendedSongs: res.data })
    } catch (error: any) {
      set({error: error.response})
    } finally {
      set({ isLoading: false })
    }
  },
  getSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.get('/songs')
      set({ songs: res.data })
    } catch (error:any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  getStats: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.get('/stats')
      set({ songs: res.data })
    } catch (error:any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  }
}))