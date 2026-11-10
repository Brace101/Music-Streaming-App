import type {
  LoginRequest,
  LoginUserResponse,
  RegisterRequest,
  RegisterUserResponse,
} from '../types/auth'
import { request } from './httpClient'

export const authApi = {
  register: (body: RegisterRequest) =>
    request<RegisterUserResponse>('/api/v1/auth/register', { method: 'POST', body }),

  login: (body: LoginRequest) =>
    request<LoginUserResponse>('/api/v1/auth/login', { method: 'POST', body }),

  /** Returns the plain-text success message. */
  verifyEmail: (token: string) =>
    request<string>('/api/v1/auth/verify-email', { query: { token } }),

  logout: (refreshToken: string) =>
    request<void>('/api/v1/auth/logout', { method: 'POST', body: { refreshToken } }),
}
