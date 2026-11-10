// All UUIDs are strings. Dates are ISO-8601 strings (Instant = UTC).

export interface Genre {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export interface Album {
  id: string
  title: string
  artistId: string
  songIds: string[]
  description: string | null
  coverArtUrl: string | null
  releaseDate: string
  createdAt: string
  updatedAt: string
}

export interface Song {
  id: string
  title: string
  albumId: string | null
  artistIds: string[]
  genreIds: string[]
  durationInSeconds: number
  audioFileUrl: string
  coverArtUrl: string | null
  releaseDate: string | null
  createdAt: string
  updatedAt: string
}
