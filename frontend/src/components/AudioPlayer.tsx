import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useRef } from 'react'

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null)
  const { currentSong, isPlaying, playNextSong } = usePlayerStore()

  //play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying])

  //song end
  useEffect(() => {
    const audio = audioRef.current
    const handleEnded = () => {
      playNextSong()
    }
    audio?.addEventListener('ended', handleEnded)
    return () => audio?.removeEventListener('ended', handleEnded)
  }, [playNextSong])

  useEffect(() => {
    if(!audioRef.current || !currentSong) return
    const audio = audioRef.current
    const isSongChanged = prevSongRef.current !== currentSong?.audioUrl

    if(isSongChanged) {
      audio.src = currentSong?.audioUrl
      audio.currentTime = 0
      prevSongRef.current = currentSong?.audioUrl

      if(isPlaying) audio.play()
    }
  }, [currentSong, isPlaying])

  return <audio ref={audioRef} />
}

export default AudioPlayer