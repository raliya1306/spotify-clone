import { usePlayerStore } from '@/stores/usePlayerStore'
import { Song } from '@/types'
import { Button } from './ui/button'
import { Pause, Play } from 'lucide-react'

type PlayButtonProps = {
  song: Song
}

const PlayButton = ({ song }: PlayButtonProps) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore()
  const isCurrentSong = currentSong?._id === song._id

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay()
    } else {
      setCurrentSong(song)
    }
  }

  return (
    <Button
      onClick={handlePlay} size='icon' className={`h-9 w-9 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 bottom-3 right-2 absolute 
      ${isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
      {isCurrentSong && isPlaying ? (
        <Pause color='black' fill='black' />
      ) : (
        <Play color='black' fill='black' />
      )
      }
    </Button>
  )
}

export default PlayButton