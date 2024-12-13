import Album from '../models/album.model.js'
import Song from '../models/song.model.js'
import User from '../models/user.model.js'

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, artistsArray] = await Promise.all([
    await Song.countDocuments(),
    await Album.countDocuments(),
    await User.countDocuments(),
    
    Song.aggregate([
      {
        $unionWith: {
          coll: 'albums',
          pipeline: []
        }
      },
      {
        $group: {
          _id: 'artist'
        }
      },
      {
        $count: 'count'
      }
    ])
  ]) 
  res.status(200).json({
    totalSongs,
    totalAlbums,
    totalUsers,
    totalArtists: artistsArray.length
  })
  } catch (error) {
    next(error)
  }
}