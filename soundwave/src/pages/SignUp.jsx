import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'
import StatusScreen from '../components/StatusScreen'
import { register } from '../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { splitFullName, validateEmail, validateNewPassword } from '../utils/validation'

export default function SignUp() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useAppSelector((state) => state.auth.status === 'loading')

  const [values, setValues] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [registeredEmail, setRegisteredEmail] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading) return

    const name = splitFullName(values.fullName)
    const nextErrors = {
      fullName: name ? '' : 'Enter your first and last name',
      email: validateEmail(values.email),
      password: validateNewPassword(values.password),
      confirmPassword: values.confirmPassword === values.password ? '' : 'Passwords do not match',
    }
    if (!values.confirmPassword) nextErrors.confirmPassword = 'Confirm your password'
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    try {
      const email = values.email.trim()
      await dispatch(register({ ...name, email, password: values.password })).unwrap()
      setRegisteredEmail(email)
    } catch (message) {
      setServerError(typeof message === 'string' ? message : 'Sign up failed. Please try again.')
    }
  }

  // Registering does not sign the user in: the email must be verified first.
  if (registeredEmail) {
    return (
      <StatusScreen
        title="Check your email"
        action={<Button onClick={() => navigate('/signin')}>GO TO SIGN IN</Button>}
      >
        We sent a verification link to {registeredEmail}. Verify your email, then sign in.
      </StatusScreen>
    )
  }

  return (
    <main className="flex min-h-screen justify-center bg-black px-6 pt-32.5 pb-10 text-white">
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-105">
        <h1 className="text-[34px] font-bold">Create Your Account</h1>

        <div className="mt-9.5 flex flex-col gap-7">
          <AuthInput label="Full Name" name="fullName" autoComplete="name" value={values.fullName} onChange={handleChange} error={errors.fullName} />
          <AuthInput label="Email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
          <AuthInput label="Password" name="password" type="password" autoComplete="new-password" value={values.password} onChange={handleChange} error={errors.password} />
          <AuthInput label="Confirm Password" name="confirmPassword" type="password" autoComplete="new-password" value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
        </div>

        {serverError && (
          <p role="alert" className="mt-4 text-center text-sm text-red-400">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={loading} className="mt-10 w-full">
          {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
        </Button>

        <div className="mt-6 flex flex-col items-center">
          <p className="text-sm text-muted">Sign up with social media</p>
          <SocialButtons className="mt-5.5" />
          <p className="mt-7 text-sm text-label">
            Have an account?
            <Link to="/signin" className="ml-1.5 hover:text-white hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </main>
  )
}
