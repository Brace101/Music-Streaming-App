// Each validator returns an error message, or '' when the value is valid.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  const value = email.trim()
  if (!value) return 'Email is required'
  if (!EMAIL_RE.test(value)) return 'Enter a valid email address'
  return ''
}

/** Backend policy: 8-16 chars, with an uppercase, lowercase, digit and special character. */
export function validateNewPassword(password) {
  if (!password) return 'Password is required'
  if (password.length < 8 || password.length > 16) return 'Password must be 8 to 16 characters'
  if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter'
  if (!/[a-z]/.test(password)) return 'Include at least one lowercase letter'
  if (!/[0-9]/.test(password)) return 'Include at least one number'
  if (!/[^A-Za-z0-9]/.test(password)) return 'Include at least one special character'
  return ''
}

/**
 * The design has one "Full Name" field but the API needs firstName + lastName.
 * First word = firstName, everything after = lastName. Returns null if there's only one word.
 */
export function splitFullName(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length < 2) return null
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}
