// Single place that touches token storage, so the storage strategy can be
// changed later (e.g. memory + HttpOnly cookie) without touching the rest of the app.
// Never log these values.

const ACCESS_KEY = 'sw_access_token'
const REFRESH_KEY = 'sw_refresh_token'
const USER_ID_KEY = 'sw_user_id'

function read(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // storage unavailable (private mode / quota) - session just won't persist
  }
}

function remove(key) {
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
  setSession({ accessToken, refreshToken, userId }) {
    write(ACCESS_KEY, accessToken)
    write(REFRESH_KEY, refreshToken)
    if (userId) write(USER_ID_KEY, userId)
  },

  clear() {
    remove(ACCESS_KEY)
    remove(REFRESH_KEY)
    remove(USER_ID_KEY)
  },
}
