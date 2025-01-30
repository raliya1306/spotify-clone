import { useMusicStore } from '@/stores/useMusicStore'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'

const SongsTable = () => {
  const { songs, deleteSong } = useMusicStore()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px]'></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className='text-right'>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id} className='hover:bg-zinc-800/50'>
            <TableCell>
              <img src={song.imageUrl} alt={song.title} className='h-7 w-7 rounded object-cover' />
            </TableCell>
            <TableCell className='font-medium'>{song.title}</TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>
              <span className='text-zinc-400'>
                {song.createdAt.split('T')[0]}
              </span>
            </TableCell>

            <TableCell className='text-right'>
              <div className='flex gap-2 justify-end'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                  onClick={() => deleteSong(song._id)}
                >
                  <Trash size={4} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SongsTable