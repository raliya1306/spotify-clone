import { useMusicStore } from '@/stores/useMusicStore'
import { FileMusic, MicVocal, Music, User } from 'lucide-react'
import StatsCard from './StatsCard'

const Stats = () => {
  const { stats } = useMusicStore()

  const statsData = [
    {
      icon: Music,
      label: 'Total Songs',
      value: stats.totalSongs.toString()
    },
    {
      icon: FileMusic,
      label: 'Total Albums',
      value: stats.totalAlbums.toString()
    },
    {
      icon: MicVocal,
      label: 'Total Artists',
      value: stats.totalArtists.toString()
    },
    {
      icon: User,
      label: 'Total Users',
      value: stats.totalUsers.toString()
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
      {statsData.map((data) => (
        <StatsCard
          key={data.label}
          icon={data.icon}
          label={data.label}
          value={data.value}
        />
      ))}
    </div>
  )
}

export default Stats