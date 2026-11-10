import type { ButtonHTMLAttributes } from 'react'

export default function Button({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`h-14 cursor-pointer rounded-full bg-brand px-12 text-[15px] font-semibold tracking-[1px] text-white transition-opacity hover:opacity-90 ${className}`}
      {...props}
    />
  )
}
