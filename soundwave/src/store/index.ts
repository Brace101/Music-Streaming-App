import { configureStore } from '@reduxjs/toolkit'
import { setSessionExpiredHandler } from '../api/httpClient'
import authReducer, { sessionExpired } from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// When a token refresh fails, the http client tells the store to end the session.
setSessionExpiredHandler(() => store.dispatch(sessionExpired()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
