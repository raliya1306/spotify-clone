import { useMusicStore } from '@/stores/useMusicStore'
import RecommendedSkeleton from '@/components/skeletons/RecommendedSkeleton'
import PlayButton from './PlayButton'

const RecommendedSection = () => {
  const { recommendedSongs, isLoading } = useMusicStore()

  if (isLoading) return <RecommendedSkeleton />

  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8'>
      {recommendedSongs.map((song) => (
        <div key={song._id} className='flex items-center bg-zinc-700/80 rounded-sm overflow-hidden transition-colors group cursor-pointer relative hover:bg-zinc-600/80'>
          <img src={song.imageUrl} alt={song.title} className='w-16 h-16 object-cover flex-shrink-0' />
          <div className='flex-1 p-3'>
            <p className='font-bold text-md truncate'>{song.title}</p>
          </div>
          <PlayButton song={song} />
        </div>
      ))

      }
    </div>
  )
}

export default RecommendedSection