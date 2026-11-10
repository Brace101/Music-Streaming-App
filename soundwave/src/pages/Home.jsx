import Button from '../components/Button'
import { logout } from '../features/auth/authSlice'
import { useAppDispatch } from '../store/hooks'

// Temporary placeholder so the sign-in flow has somewhere to land.
// Replaced by the real Home screen (inside the app shell) later.
export default function Home() {
  const dispatch = useAppDispatch()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
      <h1 className="text-[34px] font-bold">You're signed in</h1>
      <p className="text-muted">The Home screen is coming next.</p>
      <Button className="mt-6" onClick={() => dispatch(logout())}>
        SIGN OUT
      </Button>
    </main>
  )
}
