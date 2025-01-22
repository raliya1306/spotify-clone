import { axiosInstance } from '@/lib/axios'
import { useUser } from '@clerk/clerk-react'
import { Ellipsis } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser()
  const navigate = useNavigate()
  const [isSynced, setIsSynced] = useState(false)

  useEffect(() => {
    const syncUser = async () => {
      if(!isLoaded || !user || isSynced) return
      try {    
        setIsSynced(true)    
        await axiosInstance.post('/auth/callback', {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        })
      } catch (error) {
        console.log('Error in auth callback', error)
      } finally {
        navigate('/')
      }
    }
    syncUser()
  }, [isLoaded, user, navigate])
  return (
    <div className='h-screen w-full flex items-center justify-center bg-zinc-800/80'>
      <Ellipsis className='text-slate-100 animate-pulse' size={50} />
    </div>
  )
}

export default AuthCallbackPage