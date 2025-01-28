import { Song } from '@/types'
import SongSectionSkeleton from './skeletons/SongSectionSkeleton'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import PlayButton from './PlayButton'

type SongSectionsProps = {
  title: string,
  songs: Song[],
  isLoading: boolean
}

const SongSections = ({ title, songs, isLoading }: SongSectionsProps) => {

  if (isLoading) return <SongSectionSkeleton />

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-3'>
        <h2 className='text-2xl font-bold ml-4'>{title}</h2>
        <Button variant='link' className='text-zinc-400 hover:text-white'>
          Show all
        </Button>
      </div>
      <Carousel >
        <CarouselContent className='p-2'>
          {songs.map((song) => (
            <CarouselItem key={song._id} className='lg:basis-1/5 basis-1/2 md:basis-1/3'>
              <div className='hover:bg-zinc-700/50 rounded-md group cursor-pointer'>
                <div className='p-4 aspect-square'>
                  <div className='rounded-md relative'>
                    <img src={song.imageUrl} alt={song.title} className='object-cover' />
                    <PlayButton song={song} />
                  </div>
                </div>
                <h3 className='font-medium pl-4'>{song.title}</h3>
                <p className='text-md text-slate-400 pl-4 pb-3'>{song.artist}</p>
              </div>
            </CarouselItem>
          ))
          }
        </CarouselContent>
        <CarouselPrevious className='ml-12 size-10' />
        <CarouselNext className='mr-12 size-10' />
      </Carousel>
    </div>
  )
}

export default SongSections