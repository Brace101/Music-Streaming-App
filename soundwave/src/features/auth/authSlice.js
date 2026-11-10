import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api/auth.api'
import { ApiError } from '../../api/httpClient'
import { tokenStorage } from '../../api/tokenStorage'

// Tokens live in tokenStorage, NOT in Redux, so they never show up in devtools/state dumps.
// state: { userId, isAuthenticated, status: 'idle' | 'loading' | 'failed', error }
const initialState = {
  userId: tokenStorage.getUserId(),
  isAuthenticated: Boolean(tokenStorage.getRefreshToken()),
  status: 'idle',
  error: null,
}

function errorMessage(error) {
  return error instanceof ApiError ? error.message : 'Something went wrong. Please try again.'
}

/** credentials: { email, password } */
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authApi.login(credentials)
    tokenStorage.setSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      userId: data.userId,
    })
    return data.userId
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

/** details: { firstName, lastName, email, password }. The user must verify their email before signing in. */
export const register = createAsyncThunk('auth/register', async (details, { rejectWithValue }) => {
  try {
    const data = await authApi.register(details)
    return data.message
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const refreshToken = tokenStorage.getRefreshToken()
  try {
    if (refreshToken) await authApi.logout(refreshToken)
  } catch {
    // clear local session even if the request fails
  } finally {
    tokenStorage.clear()
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Dispatched by the http client when a token refresh fails. */
    sessionExpired(state) {
      state.userId = null
      state.isAuthenticated = false
      state.status = 'idle'
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userId = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Sign in failed'
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Registration failed'
      })
      .addCase(logout.fulfilled, (state) => {
        state.userId = null
        state.isAuthenticated = false
        state.status = 'idle'
        state.error = null
      })
  },
})

export const { sessionExpired, clearAuthError } = authSlice.actions
export default authSlice.reducer
