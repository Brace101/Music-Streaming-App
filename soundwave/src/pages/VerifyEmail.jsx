import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../api/auth.api'
import { ApiError } from '../api/httpClient'
import Button from '../components/Button'
import StatusScreen from '../components/StatusScreen'

/** Landing page for the link in the verification email: /verify-email?token=... */
export default function VerifyEmail() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token = params.get('token')

  const [result, setResult] = useState(token ? { status: 'loading' } : { status: 'missing' })
  const startedRef = useRef(false) // verify exactly once, even under React StrictMode

  useEffect(() => {
    if (!token || startedRef.current) return
    startedRef.current = true

    authApi
      .verifyEmail(token)
      .then(() => setResult({ status: 'success' }))
      .catch((error) =>
        setResult({
          status: 'error',
          message: error instanceof ApiError ? error.message : 'Something went wrong. Please try again.',
        }),
      )
  }, [token])

  const goToSignIn = <Button onClick={() => navigate('/signin')}>GO TO SIGN IN</Button>

  if (result.status === 'loading') {
    return <StatusScreen title="Verifying your email...">One moment please.</StatusScreen>
  }
  if (result.status === 'success') {
    return (
      <StatusScreen title="Email verified" action={goToSignIn}>
        Your email has been verified. You can now sign in.
      </StatusScreen>
    )
  }
  if (result.status === 'missing') {
    return (
      <StatusScreen title="Invalid link" action={goToSignIn}>
        This verification link is missing its token. Please use the link from your email.
      </StatusScreen>
    )
  }
  return (
    <StatusScreen title="Verification failed" action={goToSignIn}>
      {result.message}
    </StatusScreen>
  )
}
