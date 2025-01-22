import mongoose from 'mongoose'
import { MONGODB_URI } from '../utils/config.js'
import Album from '../models/album.model.js'
import Song from '../models/song.model.js'

const updateAlbums = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    await Album.deleteMany({})
    await Song.deleteMany({})

    const createdSongs = await Song.insertMany([
      {
        title: 'Don\'t blame me',
        artist: 'Taylor Swift',
        imageUrl: '/cover/img2.jpeg',
        audioUrl: '/songs/song1.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 29
      },
      {
        title: 'Enchanted',
        artist: 'Taylor Swift',
        imageUrl: '/cover/img2.jpeg',
        audioUrl: '/songs/song2.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 50
      },
      {
        title: 'Cardigan',
        artist: 'Taylor Swift',
        imageUrl: '/cover/img2.jpeg',
        audioUrl: '/songs/song3.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 26
      },
      {
        title: 'Cruel Summer',
        artist: 'Taylor Swift',
        imageUrl: '/cover/img2.jpeg',
        audioUrl: '/songs/song4.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 48
      },
      {
        title: 'Eenie meenie',
        artist: 'Justin Bieber',
        imageUrl: '/cover/img4.jpeg',
        audioUrl: '/songs/song5.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 16
      },
      {
        title: 'Ghost',
        artist: 'Justin Bieber',
        imageUrl: '/cover/img4.jpeg',
        audioUrl: '/songs/song6.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 32
      },
      {
        title: 'Peaches',
        artist: 'Justin Bieber',
        imageUrl: '/cover/img4.jpeg',
        audioUrl: '/songs/song7.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 44
      },
      {
        title: 'Shape of you',
        artist: 'Ed Sheeran',
        imageUrl: '/cover/img6.jpeg',
        audioUrl: '/songs/song8.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 59
      },
      {
        title: 'Perfect',
        artist: 'Ed Sheeran',
        imageUrl: '/cover/img6.jpeg',
        audioUrl: '/songs/song9.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 19
      },
      {
        title: 'Photograpgh',
        artist: 'Ed Sheeran',
        imageUrl: '/cover/img6.jpeg',
        audioUrl: '/songs/song10.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 33
      },
    ])

    const albums = [
      {
        title: 'Lover',
        artist: 'Taylor Swift',
        imageUrl: '/cover/img2.jpeg',
        releaseYear: '2017',
        songs: createdSongs.slice(0, 4).map((song) => song._id)
      },
      {
        title: 'Justice',
        artist: 'Justin Bieber',
        imageUrl: '/cover/img4.jpeg',
        releaseYear: '2017',
        songs: createdSongs.slice(4, 7).map((song) => song._id)
      },
      {
        title: 'x',
        artist: 'Ed Sheeran',
        imageUrl: '/cover/img6.jpeg',
        releaseYear: '2019',
        songs: createdSongs.slice(7, 10).map((song) => song._id)
      },
    ]

    const createdAlbums = await Album.insertMany(albums)
    for (let i = 0; i < createdAlbums.length; i++) {
      const album = createdAlbums[i]
      const albumSongs = album.songs
         
      await Song.updateMany({ _id: { $in: albumSongs }}, { albumId: album._id })
    }
  
    console.log('Albums update successfully')
  } catch (error) {
    console.log('Error updating albums', error)
  } finally {
    mongoose.connection.close()
  }
}

updateAlbums()