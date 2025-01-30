import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { MicVocal, MonitorSmartphone, Pause, Play, RepeatIcon, Rows3, Shuffle, SkipBackIcon, SkipForwardIcon, Volume1 } from 'lucide-react'
import { Slider } from './ui/slider'

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const AudioControls = () => {
  const { currentSong, isPlaying, togglePlay, playNextSong, playPreviousSong } = usePlayerStore()
  const [volume, setVolume] = useState(75)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = document.querySelector('audio')
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false })
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)

    }
  }, [currentSong])

  const handlePlay = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
    }
  }

  return (
    <footer className='h-20 sm:h-24 bg-black border-zinc-800 px-4'>
      <div className='flex items-center h-full max-w-[1800px] mx-auto'>
        <div className='hidden sm:flex items-center mb-3 gap-4 min-w-[180px] w-[30%] sm:mr-10'>
          {currentSong &&
            (
              <>
                <img src={currentSong.imageUrl}
                  alt={currentSong.title}
                  className='object-cover w-14 h-14 rounded-md' />
                <div className='flex-1 min-w-0'>
                  <div className='font-medium truncate'>
                    {currentSong.title}
                  </div>
                  <div className='text-sm text-zinc-400 truncate'>
                    {currentSong.artist}
                  </div>
                </div>
              </>
            )
          }
        </div>
        <div className='flex flex-col items-center flex-1 max-w-full sm:max-w-[45%] gap-2'>
          <div className='flex items-center gap-4 sm:gap-6'>
            <Button size='icon' variant='ghost' className='hidden sm:inline-flex hover:text-white hover:bg-transparent hover:scale-105 text-zinc-400'>
              <Shuffle />
            </Button>
            <Button size='icon' variant='ghost' className='hover:text-white hover:bg-transparent hover:scale-105 text-zinc-400' onClick={playPreviousSong} disabled={!currentSong}>
              <SkipBackIcon />
            </Button>
            <Button size='icon' variant='ghost' className='hover:bg-transparent hover:scale-105' onClick={togglePlay} disabled={!currentSong}>
              {isPlaying ? <Pause fill='black' className='bg-white rounded-full' /> : <Play fill='black' className='bg-white rounded-full' />}
            </Button>
            <Button size='icon' variant='ghost' className='text-zinc-400 hover:text-white hover:bg-transparent hover:scale-105' onClick={playNextSong} disabled={!currentSong}>
              <SkipForwardIcon />
            </Button>
            <Button size='icon' variant='ghost' className='text-zinc-400 hover:text-white hover:bg-transparent hover:scale-105 hidden sm:inline-flex' onClick={playPreviousSong} disabled={!currentSong}>
              <RepeatIcon />
            </Button>
          </div>
          <div className='hidden sm:flex items-center gap-2 w-full mb-3'>
            <div className='text-xs text-zinc-400'>
              {formatTime(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className='hover:cursor-grab active:cursor-grabbing w-full'
              onValueChange={handlePlay} />
            <div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
          </div>
        </div>
        <div className='hidden md:flex items-center gap-1 min-w-[180px] w-[30%] justify-end mb-2'>
          <Button size='icon' variant='ghost' className='text-zinc-400 hover:text-white hover:bg-transparent hover:scale-105'>
            <MicVocal />
          </Button><Button size='icon' variant='ghost' className='text-zinc-400 hover:text-white hover:bg-transparent hover:scale-105'>
            <Rows3 />
          </Button><Button size='icon' variant='ghost' className='text-zinc-400 hover:text-white hover:bg-transparent hover:scale-105'>
            <MonitorSmartphone />
          </Button>

          <div className='flex items-center gap-2'>
            <Button size='icon' variant='ghost' className='text-zinc-400 hover:bg-transparent'>
              <Volume1 />
            </Button>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className='w-24 hover:cursor-grab active:cursor-grabbing'
              onValueChange={(value) => {
                setVolume(value[0])
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100
                }
              }} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AudioControls