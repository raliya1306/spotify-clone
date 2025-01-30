import AdminHeader from '@/components/AdminHeader'
import AlbumsTabContent from '@/components/AlbumsTabContent'
import SongsTabContent from '@/components/SongsTabContent'
import Stats from '@/components/Stats'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMusicStore } from '@/stores/useMusicStore'
import { TabsContent } from '@radix-ui/react-tabs'
import { FileMusic, Music } from 'lucide-react'
import { useEffect } from 'react'

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore()
  const { getAlbums, getSongs, getStats } = useMusicStore()

  useEffect(() => {
    getAlbums()
    getSongs()
    getStats()
  }, [getAlbums, getSongs, getStats])

  if(!isAdmin && !isLoading) return <div>Unauthorized</div>

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white p-4'>
      <AdminHeader />
      <Stats />
      <Tabs defaultValue='songs'>
        <TabsList className='mb-3'>
          <TabsTrigger value='songs' className='data-[state-active]-bg-zinc-800'>
            <Music className='mr-2'/> Songs
          </TabsTrigger><TabsTrigger value='albums'   className='data-[state-active]-bg-zinc-800'>
            <FileMusic className='mr-2' />Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value='songs'>
          <SongsTabContent />
        </TabsContent><TabsContent value='albums'>
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default AdminPage