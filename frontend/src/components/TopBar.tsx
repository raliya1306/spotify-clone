import { SignedOut, UserButton } from '@clerk/clerk-react'
import { Bell, DownloadIcon, Home, LayoutList, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import SignInButton from './SignInButton'
import { Button } from './ui/button'
import { useAuthStore } from '@/stores/useAuthStore'

const TopBar = () => {
  const { isAdmin } = useAuthStore()

  return (
    <div className='flex items-center justify-between py-2 px-4 sticky top-0 bg-black z-20 h-16'>
      <Link to={'/'}>
        <img src='spotify-white.jpg' className='ml-2 w-[30px] h-[30px] flex-shrink-0' alt='spotify logo' />
      </Link>
      <div className='flex items-center gap-2'>
        <Link to={'/'}>
          <div className='bg-zinc-400/30 rounded-full hover:bg-zinc-400/40 p-3'>
            <Home size={26} />
          </div>
        </Link>
        <div className='bg-zinc-400/30 flex gap-2 items-center rounded-full'>
          <Search color='white' className='cursor-pointer ml-3' />
          <input className='bg-transparent h-14 w-80 outline-none border-none' type='text' placeholder='What do you want to play?' name='search' />
        </div>
      </div>
      <div className='flex gap-1 items-center'>
        <Button className='bg-white hover:bg-gray-200 rounded-full font-bold hover:scale-105'>Explore Premium</Button>
        <Button variant='ghost' className='rounded-full font-bold hover:bg-transparent hover:scale-105'>
          <DownloadIcon /> Install App
        </Button>
        <Bell size={18} className='hover:cursor-pointer hover:scale-105 mr-3' />
        {isAdmin && (
          <Link to='/admin'>
            <Button variant='ghost' className='hover:scale-105 hover:bg-transparent'>
              <LayoutList />
              <span className='text-sm'>Admin Dashboard</span>
            </Button>
          </Link>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  )
}

export default TopBar