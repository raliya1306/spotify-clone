import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useMusicStore } from '@/stores/useMusicStore'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { Clock, Ellipsis, List, Pause, Play, PlusCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const formatDuration = (sec: number) => {
  const minutes = Math.floor(sec / 60)
  const remainingSec = sec % 60
  return `${minutes}:${remainingSec.toString().padStart(2, '0')}`
}

const AlbumPage = () => {
  const { id } = useParams()
  const { getAlbumbyId, currentAlbum, isLoading } = useMusicStore()
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

  useEffect(() => {
    if (id) {
      getAlbumbyId(id)
    }
  }, [id, getAlbumbyId])

  if (isLoading) return null

  const handlePlayAlbum = () => {
    if(!currentAlbum) return
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(song => song._id === currentSong?._id)
    if(isCurrentAlbumPlaying) {
      togglePlay()
    } else {
      playAlbum(currentAlbum?.songs, 0)
    }
  }

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return

    const isCurrentSongplaying = currentSong?._id === currentAlbum?.songs[index]._id

    if(isCurrentSongplaying) {
      togglePlay()
    } else {
     playAlbum(currentAlbum?.songs, index)

    }
  }

  return (
    <div>
      <ScrollArea className='h-[calc(100vh-160px)] rounded-lg'>
        <ScrollBar className='z-20' />
        <div className='relative min-h-full'>
          <div className='absolute bg-gradient-to-b from-zinc-800/100 to-zinc-800 inset-0 pointer-events-none rounded-lg' />
          <div className='relative z-10'>
            <div className='flex p-6 pb-8 gap-6'>
              <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} className='w-[210px] h-[210px] rounded shadow-xl' />
              <div className='flex flex-col justify-end'>
                <span className='text-sm font-semibold'>Album</span>
                <h1 className='text-8xl font-extrabold'>{currentAlbum?.title}</h1>
                <div className='flex gap-0 ml-2'>
                  <span className='text-sm font-bold'>{currentAlbum?.artist}&thinsp;</span>
                  <span className='text-sm font-medium text-zinc-50/55'>•&thinsp;{currentAlbum?.releaseYear}&thinsp;</span>
                  <span className='text-sm font-medium text-zinc-50/55'>•&thinsp;{currentAlbum?.songs.length} songs</span>
                </div>
              </div>
            </div>
            <div className='bg-black/40 backdrop-blur-sm'>
              <div className='flex justify-between px-6 py-5'>
                <div className='flex items-center gap-6'>
                  <Button onClick={handlePlayAlbum} size='icon' className='h-12 w-12 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 p-0'>
                    {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                      <Pause color='black' fill='black' />
                    ) : (
                    <Play color='black' fill='black' />
                    )
                    }
                  </Button>
                  <PlusCircle color='#D4D4D8' className='h-7 w-7 hover:scale-105 cursor-pointer' />
                  <Ellipsis color='#D4D4D8' className='h-7 w-7 hover:scale-105 cursor-pointer' />
                </div>
                <div className='flex gap-2 items-center  cursor-pointer group'>
                  <span className='text-zinc-200 text-sm group-hover:scale-105'>List</span>
                  <List color='#D4D4D8' className='h-5 w-5 group-hover:scale-105' />
                </div>
              </div>
              <div className='grid grid-cols-[18px_3fr_1fr] border-b border-white/5 text-sm text-zinc-300 px-12 py-2'>
                <div className='text-base'>#</div>
                <div className='pl-3'>Title</div>
                <div className='flex justify-end items-center'>
                  <Clock className='h-5 w-5' />
                </div>
              </div>
              <div className='px-1'>
                <div className='py-3'>
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id
                    return (
                      <div key={song._id}
                      onClick={() => handlePlaySong(index)}
                      className='grid grid-cols-[18px_2fr_1fr] text-sm text-zinc-300 px-10 py-2 cursor-pointer group hover:bg-slate-300/10 hover:rounded-md'>
                        <div className='flex items-center justify-center'>
                          {isCurrentSong && isPlaying ? (
                            <Pause fill='green' color='green' />
                          ) : (
                          <span className='group-hover:hidden text-base'>{index + 1}</span>
                          )}
                          {!isCurrentSong && (
                          <Play fill='white' className='h-4 w-4 hidden group-hover:block' />
                          )}
                        </div>
                        <div className='flex flex-col gap-1 pl-4'>
                          <div className='text-white text-lg'>{song.title}</div>
                          <div>{song.artist}</div>
                        </div>
                        <div className='flex justify-end pr-1'>{formatDuration(song.duration)}</div>
                      </div>
                    )
                  })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default AlbumPage