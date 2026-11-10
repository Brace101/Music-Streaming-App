import type { Song } from '../types/catalog'
import { request } from './httpClient'

// Read-only for now: catalogue write permissions are still unconfirmed by the backend team.
export const songsApi = {
  getAll: (signal?: AbortSignal) => request<Song[]>('/api/v1/songs', { signal }),
  getById: (songId: string, signal?: AbortSignal) =>
    request<Song>(`/api/v1/songs/${encodeURIComponent(songId)}`, { signal }),
  getByArtist: (artistId: string, signal?: AbortSignal) =>
    request<Song[]>(`/api/v1/songs/artist/${encodeURIComponent(artistId)}`, { signal }),
  getByAlbum: (albumId: string, signal?: AbortSignal) =>
    request<Song[]>(`/api/v1/songs/album/${encodeURIComponent(albumId)}`, { signal }),
  getByGenre: (genreId: string, signal?: AbortSignal) =>
    request<Song[]>(`/api/v1/songs/genre/${encodeURIComponent(genreId)}`, { signal }),
  search: (title: string, signal?: AbortSignal) =>
    request<Song[]>('/api/v1/songs/search', { query: { title }, signal }),
}
