import type { LoginUserResponse } from '../types/auth'
import { tokenStorage } from './tokenStorage'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''

/** Normalized error thrown by every failed request. status 0 = network failure. */
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  query?: Record<string, string | number | boolean | undefined>
  headers?: Record<string, string>
  /** Attach the Bearer token and enable refresh-on-401. Default false. */
  auth?: boolean
  /** Lets callers cancel stale requests (e.g. search-as-you-type). */
  signal?: AbortSignal
}

// ---- session-expiry hook (registered by the store, avoids a circular import) ----
let onSessionExpired: (() => void) | null = null
export function setSessionExpiredHandler(handler: () => void): void {
  onSessionExpired = handler
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value)) // encodes for us
    }
  }
  return API_BASE_URL ? url.toString() : `${url.pathname}${url.search}`
}

async function toApiError(response: Response): Promise<ApiError> {
  let message = ''
  try {
    const text = await response.text()
    if (text) {
      try {
        const data: unknown = JSON.parse(text)
        if (data && typeof data === 'object' && 'message' in data) {
          message = String((data as { message: unknown }).message)
        } else {
          message = text
        }
      } catch {
        message = text // plain-text error body
      }
    }
  } catch {
    // unreadable body
  }
  return new ApiError(response.status, message || `Request failed (${response.status})`)
}

async function parseBody<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T
  const text = await response.text()
  if (!text) return undefined as T // e.g. empty 200 on logout
  try {
    return JSON.parse(text) as T
  } catch {
    return text as T // e.g. verify-email returns plain text
  }
}

async function send(path: string, options: RequestOptions, accessToken: string | null): Promise<Response> {
  const headers: Record<string, string> = { ...options.headers }
  if (options.body !== undefined) headers['Content-Type'] = 'application/json'
  if (options.auth && accessToken) headers['Authorization'] = `Bearer ${accessToken}`

  try {
    return await fetch(buildUrl(path, options.query), {
      method: options.method ?? 'GET',
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError(0, 'Network error. Check your connection and try again.')
  }
}

// ---- token refresh: one shared in-flight promise prevents refresh storms ----
let refreshPromise: Promise<string> | null = null

function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const refreshToken = tokenStorage.getRefreshToken()
    if (!refreshToken) throw new ApiError(401, 'Session expired')

    // Plain request (not via request()) so a failing refresh can never loop.
    const response = await send('/api/v1/auth/refresh', { method: 'POST', body: { refreshToken } }, null)
    if (!response.ok) throw await toApiError(response)

    const data = await parseBody<LoginUserResponse>(response)
    // Replace both tokens together, only after a successful refresh.
    tokenStorage.setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken, userId: data.userId })
    return data.accessToken
  })().finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  let response = await send(path, options, tokenStorage.getAccessToken())

  // On an eligible 401: refresh once, retry the original request once.
  if (response.status === 401 && options.auth && tokenStorage.getRefreshToken()) {
    try {
      const newAccessToken = await refreshAccessToken()
      response = await send(path, options, newAccessToken)
    } catch {
      tokenStorage.clear()
      onSessionExpired?.()
      throw new ApiError(401, 'Your session has expired. Please sign in again.')
    }
  }

  if (!response.ok) throw await toApiError(response)
  return parseBody<T>(response)
}
