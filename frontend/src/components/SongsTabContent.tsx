import { Music } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import SongsTable from './SongsTable'
import AddSong from './AddSong'

const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
      <div className='flex items-center justify-between'>
        <div>
          <CardTitle className='flex items-center gap-2 mb-1'>
            <Music color='green' size={17} /> Songs Library
          </CardTitle>
          <CardDescription>Manage music tracks</CardDescription>
        </div>
        <AddSong />
      </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  )
}

export default SongsTabContent