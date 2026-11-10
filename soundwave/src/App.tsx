import { Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './pages/Onboarding'

export default function App() {
  return (
    <Routes>
      {/* Temporary: send "/" to onboarding until Home and auth exist */}
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  )
}
