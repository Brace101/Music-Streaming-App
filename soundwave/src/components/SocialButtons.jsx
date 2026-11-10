import { FacebookIcon, MailIcon } from './icons'

// Shown as designed, but the backend has no social-login endpoints yet, so they are disabled.
export default function SocialButtons({ className = '' }) {
  return (
    <div className={`flex gap-7 ${className}`}>
      <button type="button" disabled title="Coming soon" aria-label="Continue with email (coming soon)" className="cursor-not-allowed">
        <MailIcon />
      </button>
      <button type="button" disabled title="Coming soon" aria-label="Continue with Facebook (coming soon)" className="cursor-not-allowed">
        <FacebookIcon />
      </button>
    </div>
  )
}
