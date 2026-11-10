import type { Album } from '../types/catalog'
import { request } from './httpClient'

export const albumsApi = {
  getAll: (signal?: AbortSignal) => request<Album[]>('/api/v1/albums', { signal }),
  getById: (albumId: string, signal?: AbortSignal) =>
    request<Album>(`/api/v1/albums/${encodeURIComponent(albumId)}`, { signal }),
  getByArtist: (artistId: string, signal?: AbortSignal) =>
    request<Album[]>(`/api/v1/albums/artist/${encodeURIComponent(artistId)}`, { signal }),
  search: (title: string, signal?: AbortSignal) =>
    request<Album[]>('/api/v1/albums/search', { query: { title }, signal }),
}
