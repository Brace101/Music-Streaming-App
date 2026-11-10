// Single place that touches token storage, so the storage strategy can be
// changed later (e.g. memory + HttpOnly cookie) without touching the rest of the app.
// Never log these values.

const ACCESS_KEY = 'sw_access_token'
const REFRESH_KEY = 'sw_refresh_token'
const USER_ID_KEY = 'sw_user_id'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // storage unavailable (private mode / quota) - session just won't persist
  }
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

export const tokenStorage = {
  getAccessToken: () => read(ACCESS_KEY),
  getRefreshToken: () => read(REFRESH_KEY),
  getUserId: () => read(USER_ID_KEY),

  /** Replace both tokens together so they never get out of sync. */
  setSession(session: { accessToken: string; refreshToken: string; userId?: string }): void {
    write(ACCESS_KEY, session.accessToken)
    write(REFRESH_KEY, session.refreshToken)
    if (session.userId) write(USER_ID_KEY, session.userId)
  },

  clear(): void {
    remove(ACCESS_KEY)
    remove(REFRESH_KEY)
    remove(USER_ID_KEY)
  },
}
