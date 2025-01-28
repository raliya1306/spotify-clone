import { Library } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import LibrarySkeleton from './skeletons/LibrarySkeleton'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { albums, getAlbums, isLoading } = useMusicStore()

  useEffect(() => {
    getAlbums()
  }, [getAlbums])

  return (
    <div className='rounded-lg bg-zinc-900 p-5 px-2 h-full md:p-5'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center text-gray-400 font-bold px-3 gap-2 md:px-3'>
          <Library className='size-7'/>
          <span className='hidden md:inline'>Your Library</span>
        </div>
      </div>
      <ScrollArea className='h-[calc(100vh-300px)]'>
        <div className='space-y-2'>
          {isLoading ? <LibrarySkeleton /> : 
            (
              albums.map(album => (
                <Link to={`/albums/${album._id}`} key={album._id} className='p-2 flex items-center justify-center cursor-pointer gap-2 hover:bg-zinc-800 rounded-md'>
                  <img src={album.imageUrl} alt='album image' className='size-12 rounded-md flex-shrink-0 object-cover' />
                  <div className='flex-1 min-w-0 hidden md:block'>
                    <p className='font-medium truncate'>{album.title}</p>
                    <p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
                  </div>
                </Link>
              ))
            )
          }
        </div>
      </ScrollArea>
    </div>
  )
}

export default Sidebar