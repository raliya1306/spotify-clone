const SongSectionSkeleton = () => {
  return (
    <div className='mb-8'>
    <div className='h-8 w-1/2 ml-3 bg-zinc-800 rounded-md mb-2 animate-pulse' />
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='bg-zinc-800/50 rounded-md animate-pulse p-4'>
          <div className='aspect-square bg-zinc-800 rounded-md mb-2' />
          <div className='flex flex-col flex-1 gap-2'>
            <div className='h-3 w-3/4 bg-zinc-800 rounded-sm' />
            <div className='h-3 w-2/4 bg-zinc-800 rounded-sm' />
          </div>
        </div>
      ))
      }
    </div>
    </div>
  )
}

export default SongSectionSkeleton