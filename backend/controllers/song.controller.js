import Song from '../models/song.model.js'

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 })
    res.status(200).json(songs)
  } catch (error) {
    next(error)
  }
}

export const getMadeForYou = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1
        }
      }
    ])

    res.status(200).json(songs)
  } catch (error) {
    next(error)
  }
}

export const getTodayInMusic = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1
        }
      }
    ])

    res.status(200).json(songs)
  } catch (error) {
    next(error)
  }
}

export const getRecommended = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1
        }
      }
    ])

    res.status(200).json(songs)
  } catch (error) {
    next(error)
  }
}