import { request } from './httpClient'

// Album: { id, title, artistId, songIds[], description, coverArtUrl, releaseDate, createdAt, updatedAt }
export const albumsApi = {
  getAll: (signal) => request('/api/v1/albums', { signal }),
  getById: (albumId, signal) => request(`/api/v1/albums/${encodeURIComponent(albumId)}`, { signal }),
  getByArtist: (artistId, signal) => request(`/api/v1/albums/artist/${encodeURIComponent(artistId)}`, { signal }),
  search: (title, signal) => request('/api/v1/albums/search', { query: { title }, signal }),
}
