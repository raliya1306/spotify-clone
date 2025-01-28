const RecommendedSkeleton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3'>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className='flex items-center bg-zinc-800/50 rounded-md animate-pulse'>
          <div className='bg-zinc-800 flex-shrink-0 rounded-tl-md rounded-bl-md' />
          <div className='flex flex-col flex-1 p-3 gap-2'>
            <div className='h-4 w-3/4 bg-zinc-800 rounded' />
            <div className='h-4 w-2/4 bg-zinc-800 rounded' />
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default RecommendedSkeleton