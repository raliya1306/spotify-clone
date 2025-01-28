export interface Song {
  _id: string,
  title: string,
  artist: string,
  imageUrl: string,
  audioUrl: string,
  duration: number,
  albumId: string | null,
  createdAt: Date,
  updatedAt: Date
}

export interface Album {
  _id: string,
  title: string,
  artist: string,
  imageUrl: string,
  releaseYear: number,
  songs: Song[]
}

export interface Stats {
  totalSongs: number,
  totalAlbums: number,
  totalArtists: number,
  totalUsers: number
}