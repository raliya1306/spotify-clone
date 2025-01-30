import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
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
  deleteSong: (id: string) => Promise<void>, 
  deleteAlbum: (id: string) => Promise<void>, 
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
  deleteSong: async (id) => {
      set({ isLoading: true, error: null })
      try {
        await axiosInstance.delete(`/admin/songs/${id}`)
  
        set((state) => ({
          songs: state.songs.filter((song) => song._id !== id)
        }))
        toast.success('Song deleted successfully')
      } catch (error: any) {
        set({ error: error.message })
        toast.error('Error deleting song')
      } finally {
        set({ isLoading: false })
      }    
  },
  deleteAlbum: async (id) => {
		set({ isLoading: true, error: null })
		try {
			await axiosInstance.delete(`/admin/albums/${id}`)
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				)
			}))
			toast.success('Album deleted successfully')
		} catch (error: any) {
      set({ error: error.message })
			toast.error('Error deleting album')
		} finally {
			set({ isLoading: false })
		}
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
      set({ stats: res.data })
    } catch (error:any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  }
}))