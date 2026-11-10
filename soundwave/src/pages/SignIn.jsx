import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import Button from '../components/Button'
import { login } from '../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { validateEmail } from '../utils/validation'

export default function SignIn() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.auth.status === 'loading')

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading) return

    const nextErrors = {
      email: validateEmail(values.email),
      password: values.password ? '' : 'Password is required',
    }
    setErrors(nextErrors)
    if (nextErrors.email || nextErrors.password) return

    try {
      // On success the PublicOnly guard sends the user to the app.
      await dispatch(login({ email: values.email.trim(), password: values.password })).unwrap()
    } catch (message) {
      setServerError(typeof message === 'string' ? message : 'Sign in failed. Please try again.')
    }
  }

  return (
    <main className="flex min-h-screen justify-center bg-black px-6 pt-50 text-white">
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-105">
        <h1 className="text-[38px] font-bold">Hello, Sign In!</h1>

        <div className="mt-11 flex flex-col gap-8.5">
          <AuthInput label="Email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
          <AuthInput label="Password" name="password" type="password" autoComplete="current-password" value={values.password} onChange={handleChange} error={errors.password} />
        </div>

        <div className="mt-5 flex justify-end">
          {/* No password-reset endpoint on the backend yet */}
          <button type="button" disabled title="Coming soon" className="cursor-not-allowed text-[13px] text-label">
            Forgot Password?
          </button>
        </div>

        {serverError && (
          <p role="alert" className="mt-4 text-center text-sm text-red-400">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={loading} className="mt-10 w-full">
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </Button>

        <p className="mt-6 text-center text-sm text-label">
          Don't have an account?
          <Link to="/signup" className="ml-1.5 hover:text-white hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  )
}
