import { axiosInstance } from '@/lib/axios'
import { ChangeEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface NewAlbum {
  title: string,
  artist: string,
  releaseYear: string,
}

const AddAlbum = () => {
  const [songDialogOpen, setSongDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newAlbum, setNewAlbum] = useState<NewAlbum>({
    title: '',
    artist: '',
    releaseYear: new Date().getFullYear().toString()
  })

  const [image, setImage] = useState<File | null>(null)

  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (!image) {
        return toast.error('Please upload album image')
      }

      const formData = new FormData()

      formData.append('title', newAlbum.title)
      formData.append('artist', newAlbum.artist)
      formData.append('releaseYear', newAlbum.releaseYear)

      formData.append('imageFile', image)

      await axiosInstance.post('/admin/albums', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setNewAlbum({
        title: '',
        artist: '',
        releaseYear: new Date().getFullYear().toString()
      })

      setImage(null)
      toast.success('Album added successfully')
    } catch (error: any) {
      toast.error('Error when adding album')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className='overflow-auto max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle>Add a new Album</DialogTitle>
          <DialogDescription>
            Add a new album to the spotify music library
          </DialogDescription>
        </DialogHeader>
        <div className='py-4 space-y-4'>
          <input
            type='file'
            ref={imageInputRef}
            className='hidden'
            accept='image/*'
            onChange={handleImage}
          />
          <div
            className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
            onClick={() => imageInputRef.current?.click()}
          >
            <div className='text-center'>
              {image ? (
                <div className='space-y-2'>
                  <div className='text-sm text-emerald-500'>Image selected:</div>
                  <div className='text-xs text-zinc-400'>{image.name.slice(0, 20)}</div>
                </div>
              ) : (
                <>
                  <div className='text-sm text-zinc-400 mb-2'>Upload image</div>
                  <Button variant='outline' size='sm' className='text-xs'>
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Title</label>
            <Input value={newAlbum.title}
              onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })} />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Artist</label>
            <Input value={newAlbum.artist}
              onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })} />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Release Year</label>
            <Input
              min={1900}
              max={new Date().getFullYear()}
              value={newAlbum.releaseYear}
              onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: e.target.value })} />
          </div>          
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setSongDialogOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Uploading' : 'Add Album'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddAlbum