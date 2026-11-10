import { Navigate, Route, Routes } from 'react-router-dom'
import PublicOnly from './components/PublicOnly'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'
import Welcome from './pages/Welcome'

export default function App() {
  return (
    <Routes>
      {/* Signed-out only: signed-in users are sent to "/" */}
      <Route element={<PublicOnly />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Reachable by anyone: the link in the verification email lands here */}
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Signed-in only: signed-out users are sent to /onboarding */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
