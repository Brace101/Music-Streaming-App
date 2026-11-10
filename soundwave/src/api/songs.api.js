import { request } from './httpClient'

// Read-only for now: catalogue write permissions are still unconfirmed by the backend team.
// Song: { id, title, albumId, artistIds[], genreIds[], durationInSeconds, audioFileUrl,
//         coverArtUrl, releaseDate, createdAt, updatedAt }
export const songsApi = {
  getAll: (signal) => request('/api/v1/songs', { signal }),
  getById: (songId, signal) => request(`/api/v1/songs/${encodeURIComponent(songId)}`, { signal }),
  getByArtist: (artistId, signal) => request(`/api/v1/songs/artist/${encodeURIComponent(artistId)}`, { signal }),
  getByAlbum: (albumId, signal) => request(`/api/v1/songs/album/${encodeURIComponent(albumId)}`, { signal }),
  getByGenre: (genreId, signal) => request(`/api/v1/songs/genre/${encodeURIComponent(genreId)}`, { signal }),
  search: (title, signal) => request('/api/v1/songs/search', { query: { title }, signal }),
}
