import { useMusicStore } from '@/stores/useMusicStore'
import { useRef, useState } from 'react'
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import toast from 'react-hot-toast'
import { axiosInstance } from '@/lib/axios'

interface NewSong {
	title: string,
	artist: string,
	album: string,
	duration: string
}

const AddSong = () => {
	const { albums } = useMusicStore()
	const [songDialogOpen, setSongDialogOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [newSong, setNewSong] = useState<NewSong>({
		title: '',
		artist: '',
		album: '',
		duration: '0'
	})
	const [files, setFiles] = useState<{ audio: File | null, image: File | null }>({
		audio: null,
		image: null
	})

	const audioInputRef = useRef<HTMLInputElement>(null)
	const imageInputRef = useRef<HTMLInputElement>(null)

	const handleSubmit = async () => {
		setIsLoading(true)
		try {
			if (!files.audio || !files.image) {
				return toast.error('Please upload both audio and image files')
			}

			const formData = new FormData()

			formData.append('title', newSong.title)
			formData.append('artist', newSong.artist)
			formData.append('duration', newSong.duration)
			if (newSong.album && newSong.album !== 'none') {
				formData.append('albumId', newSong.album)
			}

			formData.append('audioFile', files.audio)
			formData.append('imageFile', files.image)

			await axiosInstance.post('/admin/songs', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			setNewSong({
				title: '',
				artist: '',
				album: '',
				duration: '0',
			})

			setFiles({
				audio: null,
				image: null,
			})

			toast.success('Song added successfully')
		} catch (error: any) {
			toast.error('Error when adding song')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					Add Song
				</Button>
			</DialogTrigger>
			<DialogContent className='overflow-auto max-h-[80vh]'>
				<DialogHeader>
					<DialogTitle>Add a new Song</DialogTitle>
					<DialogDescription>
						Add a new song to the spotify music library
					</DialogDescription>
				</DialogHeader>
				<div className='py-4 space-y-4'>
					<input
						type='file'
						accept='audio/*'
						ref={audioInputRef}
						hidden
						onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
					/>

					<input
						type='file'
						ref={imageInputRef}
						className='hidden'
						accept='image/*'
						onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
					/>
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => imageInputRef.current?.click()}
					>
						<div className='text-center'>
							{files.image ? (
								<div className='space-y-2'>
									<div className='text-sm text-emerald-500'>Image selected:</div>
									<div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
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
						<label className='text-sm font-medium'>Audio File</label>
						<div className='flex items-center gap-2'>
							<Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full'>
								{files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
							</Button>
						</div>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Title</label>
						<Input value={newSong.title}
							onChange={(e) => setNewSong({ ...newSong, title: e.target.value })} />
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Artist</label>
						<Input value={newSong.artist}
							onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })} />
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Duration (seconds)</label>
						<Input
						min='0' 
						value={newSong.duration} 
						onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })} />
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Album (Optional)</label>						
						<Select value={newSong.album}
							onValueChange={(value) => setNewSong({ ...newSong, album: value })}>
							<SelectTrigger className='bg-zinc-800/50 p-2 rounded-md'>
								<SelectValue placeholder='Select album' />
							</SelectTrigger>
							<SelectContent className='bg-zinc-800'>
								<SelectItem value='none'>
									No Album (Single)
								</SelectItem>
								{albums.map((a) => (
									<SelectItem key={a._id} value={a._id} >
										{a.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>						
					</div>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => setSongDialogOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? 'Uploading' : 'Add Song'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AddSong