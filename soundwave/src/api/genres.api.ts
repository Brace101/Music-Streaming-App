import type { Genre } from '../types/catalog'
import { request } from './httpClient'

export const genresApi = {
  getAll: (signal?: AbortSignal) => request<Genre[]>('/api/v1/genres', { signal }),
  getById: (genreId: string, signal?: AbortSignal) =>
    request<Genre>(`/api/v1/genres/${encodeURIComponent(genreId)}`, { signal }),
}
