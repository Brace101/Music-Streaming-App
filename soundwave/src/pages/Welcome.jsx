import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'
import { HeadphonesIcon } from '../components/icons'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen bg-black text-white">
      <section className="hidden w-160 shrink-0 flex-col justify-center bg-panel pl-20 lg:flex">
        <HeadphonesIcon />
        <p className="mt-1.5 text-[26px] font-bold tracking-[5px]">SOUND STREAM</p>
        <p className="mt-5 text-[22px] text-panel-text">
          Millions of songs.
          <br />
          Zero limits.
        </p>
      </section>

      <section className="flex flex-1 flex-col justify-center px-6 pt-8 lg:pl-40">
        <div className="w-full max-w-100">
          <h1 className="text-[53px] leading-normal font-bold">Welcome Back</h1>
          <p className="-mt-2 text-xl text-muted">Sign in to pick up right where you left off.</p>

          <Button className="mt-10 w-full" onClick={() => navigate('/signin')}>
            SIGN IN
          </Button>
          <Button variant="outline" className="mt-4 w-full" onClick={() => navigate('/signup')}>
            SIGN UP
          </Button>

          <p className="mt-10.5 text-sm text-muted">Or login with social media</p>
          <SocialButtons className="mt-6" />
        </div>
      </section>
    </main>
  )
}
