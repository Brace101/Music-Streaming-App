import { request } from './httpClient'

// Genre: { id, name, description, createdAt, updatedAt }
export const genresApi = {
  getAll: (signal) => request('/api/v1/genres', { signal }),
  getById: (genreId, signal) => request(`/api/v1/genres/${encodeURIComponent(genreId)}`, { signal }),
}
