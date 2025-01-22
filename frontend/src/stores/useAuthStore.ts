import { axiosInstance } from '@/lib/axios'
import { create } from 'zustand'

interface AuthStore {
  isAdmin: boolean,
  isLoading: boolean,
  error: string | null,
  checkAdmin: () => Promise<void>,
  reset: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  checkAdmin: async () => {
    try {
      const res = await axiosInstance.get('/admin/check')
      set({ isAdmin: res.data.admin })
    } catch (error: any) {
      set({ error: error.response, isAdmin: false })
    }
  },
  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null })
  }
}))