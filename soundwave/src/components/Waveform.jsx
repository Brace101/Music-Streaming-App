import { useEffect, useRef } from 'react'

// Colors follow the brand palette in index.css (--color-brand: #0d9588).
const STOPS = [
  [0, '#064e47'],
  [0.5, '#0d9588'],
  [1, '#5eead4'],
]

/**
 * Full-width animated waveform that never stops. Bars swell near the pointer.
 * With "reduce motion" on, it keeps moving but slower and ignores the pointer.
 */
export default function Waveform({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speed = reduce ? 0.4 : 1
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let pointer = -1 // 0..1 across the canvas, -1 = none

    const draw = (t) => {
      t *= speed
      ctx.clearRect(0, 0, w, h)
      const count = Math.max(28, Math.floor(w / 10))
      const slot = w / count
      const barW = Math.max(2, slot * 0.46)

      const grad = ctx.createLinearGradient(0, 0, w, 0)
      STOPS.forEach(([at, color]) => grad.addColorStop(at, color))
      ctx.fillStyle = grad

      for (let i = 0; i < count; i++) {
        const p = i / (count - 1)
        const envelope = Math.pow(Math.sin(p * Math.PI), 1.4)
        const wave =
          0.5 * Math.sin(p * 9 + t * 0.0012) +
          0.35 * Math.sin(p * 23 - t * 0.0019) +
          0.15 * Math.sin(p * 41 + t * 0.003)
        const near = pointer < 0 ? 0 : Math.exp(-((p - pointer) ** 2) / 0.004)
        const amp = (Math.abs(wave) * 0.85 + 0.07 + near * 0.55) * envelope
        const bh = Math.max(barW, amp * h * 0.92)

        ctx.beginPath()
        ctx.roundRect(i * slot + (slot - barW) / 2, (h - bh) / 2, barW, bh, barW / 2)
        ctx.fill()
      }
    }

    // Use layout size (clientWidth/Height), not getBoundingClientRect: the rect is
    // squashed by the opening scaleY animation and would size the canvas ~6px tall.
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const loop = (t) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer = (e.clientX - r.left) / r.width
    }
    const onLeave = () => {
      pointer = -1
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    if (!reduce) {
      window.addEventListener('pointermove', onMove)
      document.addEventListener('pointerleave', onLeave)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
