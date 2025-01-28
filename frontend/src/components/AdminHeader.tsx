import { UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <div className='flex items-center justify-between mb-8'>
      <div className='flex items-center gap-4'>
        <Link to='/'>
          <img src='/spotify-logo.jpg' className='size-8 rounded-full' />
        </Link>
        <div>
          <h1 className='font-bold text-xl'>Music Manager</h1>
          <p className='text-sm text-zinc-400'>Manage spotify music</p>
        </div>
      </div>
      <UserButton />
    </div>
  )
}

export default AdminHeader