const variants = {
  solid: 'bg-brand',
  outline: 'border-2 border-brand bg-transparent',
}

export default function Button({ variant = 'solid', className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`h-[56px] cursor-pointer rounded-full px-[48px] whitespace-nowrap text-[15px] font-semibold tracking-[1px] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
