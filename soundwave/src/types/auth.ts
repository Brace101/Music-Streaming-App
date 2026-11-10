export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface RegisterUserResponse {
  userId: string
  message: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginUserResponse {
  userId: string
  accessToken: string
  refreshToken: string
  message: string
}

export interface RefreshRequest {
  refreshToken: string
}
