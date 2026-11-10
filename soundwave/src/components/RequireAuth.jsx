import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

/** Wraps routes that need a signed-in user. */
export default function RequireAuth() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/onboarding" replace />
}
