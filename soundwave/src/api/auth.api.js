import { request } from './httpClient'

export const authApi = {
  /** body: { firstName, lastName, email, password } -> { userId, message } */
  register: (body) => request('/api/v1/auth/register', { method: 'POST', body }),

  /** body: { email, password } -> { userId, accessToken, refreshToken, message } */
  login: (body) => request('/api/v1/auth/login', { method: 'POST', body }),

  /** Returns the plain-text success message. */
  verifyEmail: (token) => request('/api/v1/auth/verify-email', { query: { token } }),

  logout: (refreshToken) => request('/api/v1/auth/logout', { method: 'POST', body: { refreshToken } }),
}
