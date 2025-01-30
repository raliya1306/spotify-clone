import { FileMusic } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import AddAlbum from './AddAlbum'
import AlbumsTable from './AlbumsTable'

const AlbumsTabContent = () => {
  return (
    <Card>
    <CardHeader>
    <div className='flex items-center justify-between'>
      <div>
        <CardTitle className='flex items-center gap-2 mb-1'>
          <FileMusic color='green' size={17} /> Songs Library
        </CardTitle>
        <CardDescription>Manage music tracks</CardDescription>
      </div>
      <AddAlbum />
    </div>
    </CardHeader>
    <CardContent>
      <AlbumsTable />
    </CardContent>
  </Card>
  )
}

export default AlbumsTabContent