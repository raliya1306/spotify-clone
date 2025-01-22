import { axiosInstance } from '@/lib/axios'
import { useAuthStore } from '@/stores/useAuthStore'
import { useAuth } from '@clerk/clerk-react'
import { Ellipsis } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const updateToken = (token:string | null) => {
  if(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']
  }
}

const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const { getToken } = useAuth()
  const [loading, setLoading] = useState(true)
  const { checkAdmin } = useAuthStore()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getToken()
        updateToken(token)
        if(token) {
          await checkAdmin()
        }
      } catch (error) {
        updateToken(null)
        console.log('Error in auth provider', error)
      } finally {
        setLoading(false)
      }
    }
    
    initializeAuth()
  },[getToken])

  if (loading) {
    return (
      <div className='h-screen w-full flex items-center justify-center bg-zinc-800/80'>
        <Ellipsis className='text-slate-100 animate-pulse' size={50} />
      </div>
    )
  }

  return <>{ children }</>
}

export default AuthProvider