import { tokenStorage } from './tokenStorage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

/** Normalized error thrown by every failed request. status 0 = network failure. */
export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// ---- session-expiry hook (registered by the store, avoids a circular import) ----
let onSessionExpired = null
export function setSessionExpiredHandler(handler) {
  onSessionExpired = handler
}

function buildUrl(path, query) {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value)) // encodes for us
    }
  }
  return API_BASE_URL ? url.toString() : `${url.pathname}${url.search}`
}

async function toApiError(response) {
  let message = ''
  try {
    const text = await response.text()
    if (text) {
      try {
        const data = JSON.parse(text)
        message = data && typeof data === 'object' && 'message' in data ? String(data.message) : text
      } catch {
        message = text // plain-text error body
      }
    }
  } catch {
    // unreadable body
  }
  return new ApiError(response.status, message || `Request failed (${response.status})`)
}

async function parseBody(response) {
  if (response.status === 204) return undefined
  const text = await response.text()
  if (!text) return undefined // e.g. empty 200 on logout
  try {
    return JSON.parse(text)
  } catch {
    return text // e.g. verify-email returns plain text
  }
}

/**
 * options: {
 *   method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'   (default 'GET')
 *   body:    object, sent as JSON
 *   query:   { key: value } appended (and encoded) as ?key=value
 *   headers: extra headers
 *   auth:    true => attach Bearer token and refresh once on 401 (default false)
 *   signal:  AbortSignal, to cancel stale requests (e.g. search-as-you-type)
 * }
 */
async function send(path, options, accessToken) {
  const headers = { ...options.headers }
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
let refreshPromise = null

function refreshAccessToken() {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const refreshToken = tokenStorage.getRefreshToken()
    if (!refreshToken) throw new ApiError(401, 'Session expired')

    // Plain request (not via request()) so a failing refresh can never loop.
    const response = await send('/api/v1/auth/refresh', { method: 'POST', body: { refreshToken } }, null)
    if (!response.ok) throw await toApiError(response)

    const data = await parseBody(response)
    // Replace both tokens together, only after a successful refresh.
    tokenStorage.setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken, userId: data.userId })
    return data.accessToken
  })().finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}

export async function request(path, options = {}) {
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
  return parseBody(response)
}
