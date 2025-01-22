import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { create } from 'zustand';

interface MusicStore {
  songs: Song[],
  albums: Album[],
  isLoading: boolean,
  error: string | null,
  getAlbums: () => Promise<void>
  getAlbumbyId: (id: string) => Promise<void>,
  currentAlbum: Album | null
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

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
      // console.log(res.data)
      set({ currentAlbum: res.data })
    } catch (error: any) {
      set({ error: error.response })
    } finally {
      set({ isLoading: false })
    }
  }
}))