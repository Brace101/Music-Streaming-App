import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from './icons'

/** Underlined text field from the auth designs. Password type gets a show/hide toggle. */
export default function AuthInput({ label, type = 'text', error, className = '', ...props }) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className={className}>
      <div className="relative">
        <input
          type={isPassword && visible ? 'text' : type}
          aria-label={label}
          aria-invalid={error ? true : undefined}
          placeholder={label}
          className={`h-9 w-full border-b bg-transparent pb-4 text-[14px] text-white outline-none placeholder:text-label ${
            error ? 'border-red-500' : 'border-line focus:border-brand'
          } ${isPassword ? 'pr-8' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute top-0.5 right-0 cursor-pointer"
          >
            {visible ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-[13px] text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
