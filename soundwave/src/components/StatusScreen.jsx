/** Simple centered message screen (no Figma design yet): used for "check your email" and verification results. */
export default function StatusScreen({ title, children, action }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="text-[34px] font-bold">{title}</h1>
      <p className="mt-4 max-w-105 text-base text-muted">{children}</p>
      {action && <div className="mt-10">{action}</div>}
    </main>
  )
}
