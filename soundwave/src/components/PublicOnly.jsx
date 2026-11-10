import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

/** Wraps routes (onboarding, sign in, sign up) that signed-in users shouldn't see. */
export default function PublicOnly() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}
