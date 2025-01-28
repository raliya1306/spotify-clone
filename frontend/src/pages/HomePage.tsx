import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react'
import RecommendedSection from '../components/RecommendedSection'
import { ScrollArea } from '@/components/ui/scroll-area'
import SongSections from '@/components/SongSections'
import { usePlayerStore } from '@/stores/usePlayerStore'

const HomePage = () => {
  const { getMadeForYou, getTodayInMusic, getRecommendedSongs, madeForYou, todayInMusic, recommendedSongs, isLoading } = useMusicStore()
  const { initializeQueue } = usePlayerStore()

  useEffect(() => {
    getMadeForYou()
    getTodayInMusic()
    getRecommendedSongs()
  }, [getMadeForYou, getTodayInMusic, getRecommendedSongs])

  useEffect(() => {
    if(recommendedSongs.length > 0 && madeForYou.length > 0 && todayInMusic.length > 0) {
      const songs = [...recommendedSongs, ...madeForYou, ...todayInMusic]
      initializeQueue(songs)
    }
  }, [])


  return (
    <div className='bg-zinc-900 rounded-lg'>
      <ScrollArea className='h-[calc(100vh-160px)]'>
        <div className='p-3 pt-5'>
          <h1 className='font-bold text-xl mb-4'>Good afternoon</h1>
          <RecommendedSection />
        </div>
        <div>
          <SongSections title='Made For You' songs={madeForYou} isLoading={isLoading} />
          <SongSections title='Today In Music' songs={todayInMusic} isLoading={isLoading} />
        </div>
      </ScrollArea>
    </div>
  )
}

export default HomePage