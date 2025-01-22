import mongoose from 'mongoose'
import { MONGODB_URI } from '../utils/config.js'
import Song from '../models/song.model.js'

const songs = [
  {
    title: 'Don\'t blame me',
    artist: 'Taylor Swift',
    imageUrl: '/cover/img2.png',
    audioUrl: '/songs/song1.mp3',
    duration: 29
  },
  {
    title: 'Enchanted',
    artist: 'Taylor Swift',
    imageUrl: '/cover/img2.png',
    audioUrl: '/songs/song2.mp3',
    duration: 50
  },
  {
    title: 'Cardigan',
    artist: 'Taylor Swift',
    imageUrl: '/cover/img2.png',
    audioUrl: '/songs/song3.mp3',
    duration: 26
  },
  {
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    imageUrl: '/cover/img2.png',
    audioUrl: '/songs/song4.mp3',
    duration: 48
  },
  {
    title: 'Eenie meenie',
    artist: 'Justin Bieber',
    imageUrl: '/cover/img4.png',
    audioUrl: '/songs/song5.mp3',
    duration: 16
  },
  {
    title: 'Ghost',
    artist: 'Justin Bieber',
    imageUrl: '/cover/img4.png',
    audioUrl: '/songs/song6.mp3',
    duration: 32
  },
  {
    title: 'Peaches',
    artist: 'Justin Bieber',
    imageUrl: '/cover/img4.png',
    audioUrl: '/songs/song7.mp3',
    duration: 44
  },
  {
    title: 'Shape of you',
    artist: 'Ed Sheeran',
    imageUrl: '/cover/img6.png',
    audioUrl: '/songs/song8.mp3',
    duration: 59
  },
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    imageUrl: '/cover/img6.png',
    audioUrl: '/songs/song9.mp3',
    duration: 19
  },
  {
    title: 'Photograpgh',
    artist: 'Ed Sheeran',
    imageUrl: '/cover/img6.png',
    audioUrl: '/songs/song10.mp3',
    duration: 33
  },
]

const updateSongs = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    await Song.deleteMany({})
    await Song.insertMany(songs)
    console.log('Successfully updated songs')
  } catch (error) {
    console.log('Error updating songs', error)
  } finally {
    mongoose.connection.close()
  }
}

updateSongs()