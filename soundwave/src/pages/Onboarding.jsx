import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Waveform from '../components/Waveform'
import headset from '../assets/headset.png'

export default function Onboarding() {
  const navigate = useNavigate()
  const tilt = useRef(null)

  // The headset leans slightly toward the pointer (skipped for reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const onMove = (e) => {
      const el = tilt.current
      if (!el) return
      el.style.setProperty('--ry', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3))
      el.style.setProperty('--rx', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3))
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-center text-white">
      {/* Ambient glow behind the content */}
      <div
        aria-hidden="true"
        className="cine-glow pointer-events-none absolute top-1/2 left-1/2 size-176 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[140px]"
      />

      {/* Waveform opens from a single line of light, then keeps moving */}
      <div
        aria-hidden="true"
        className="cine-open pointer-events-none absolute inset-x-0 top-1/2 h-[70vh] -translate-y-1/2 opacity-60"
      >
        <Waveform className="h-full w-full" />
      </div>

      {/* Keeps the text legible over the waveform */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.55)_38%,transparent_75%)]"
      />

      <div className="relative flex flex-col items-center">
        <div className="cine-rise relative flex h-[208px] w-[190px] items-center justify-center" style={{ '--i': 0 }}>
          {/* Sound rings radiating from the headset */}
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              aria-hidden="true"
              className="ring pointer-events-none absolute size-[210px] rounded-full border border-brand/60"
              style={{ animationDelay: `${n * 1.3}s` }}
            />
          ))}
          <div ref={tilt} className="tilt relative">
            <img
              src={headset}
              alt=""
              className="float w-[190px] drop-shadow-[0_0_34px_rgba(13,149,136,0.5)]"
            />
          </div>
        </div>

        <p className="cine-rise mt-8 text-[32px] font-bold tracking-[6px]" style={{ '--i': 1 }}>
          SOUND STREAM
        </p>

        <h1 className="cine-rise mt-8 max-w-150 text-[44px] font-bold" style={{ '--i': 2 }}>
          Your music,
          <br />
          anywhere you go.
        </h1>

        <p className="cine-rise mt-6 max-w-140 text-lg text-muted" style={{ '--i': 3 }}>
          Stream millions of songs, curated playlists, and podcasts on any device.
        </p>

        <Button
          className="cine-rise mt-9 w-[240px] shadow-[0_0_44px_-6px_rgba(13,149,136,0.7)]"
          style={{ '--i': 4 }}
          onClick={() => navigate('/welcome')}
        >
          GET STARTED
        </Button>
      </div>
    </main>
  )
}
