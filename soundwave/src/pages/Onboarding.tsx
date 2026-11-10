import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import headphones from '../assets/headphones.svg'

export default function Onboarding() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <img src={headphones} alt="" className="size-35" />

      <p className="mt-10 text-[32px] font-bold tracking-[6px]">SOUND STREAM</p>

      <h1 className="mt-8 max-w-150 text-[44px] font-bold">
        Your music,
        <br />
        anywhere you go.
      </h1>

      <p className="mt-6 max-w-140 text-lg text-muted">
        Stream millions of songs, curated playlists, and podcasts on any device.
      </p>

      <Button className="mt-9 w-60" onClick={() => navigate('/welcome')}>
        GET STARTED
      </Button>
    </main>
  )
}
