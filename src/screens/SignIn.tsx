import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import checkboxChecked from '../assets/icons/checkbox-checked.svg'
import { Button } from '../components/Button'
import { Divider } from '../components/Divider'
import { Screen } from '../components/Screen'
import { SocialButton } from '../components/SocialButton'
import { TextField } from '../components/TextField'
import { useAuth } from '../state/authContext'

/* Figma: Sign In/1 (3:2010). The form authenticates for real against
   Supabase: LinkedIn through the linkedin_oidc provider, and the email and
   password fields through password auth. */
export default function SignIn() {
  const navigate = useNavigate()
  const { user, loading, configured, signInWithLinkedIn, signInWithPassword } =
    useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* Someone already signed in has no business on this screen. */
  useEffect(() => {
    if (!loading && user) navigate('/resume', { replace: true })
  }, [loading, user, navigate])

  async function run(action: () => Promise<void>) {
    setError(null)
    setBusy(true)
    try {
      await action()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Sign in failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Screen>
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          event.preventDefault()
          void run(() => signInWithPassword(email, password))
        }}
      >
        <div className="flex flex-col gap-[20px] py-[24px]">
          <div className="flex flex-col gap-[12px] pb-[24px]">
            <h1 className="text-[24px] font-bold text-app-text">Sign in</h1>
            <p className="flex items-center gap-[6px] text-[16px] text-app-text">
              or
              <Link to="/join" className="font-bold text-app-link">
                join Mike
              </Link>
            </p>
          </div>

          {!configured ? (
            <p className="w-full rounded-[12px] bg-chip-demand px-[12px] py-[14px] text-[14px] text-app-text">
              Sign in is not connected yet. Add your Supabase project details
              to <code>.env.local</code> to enable it.
            </p>
          ) : null}

          <div className="flex flex-col gap-[6px]">
            <p className="p-[4px] text-[14px] font-medium text-app-text">
              *required
            </p>
            <div className="flex flex-col gap-[20px]">
              <TextField
                label="Email or Phone"
                required
                type="email"
                autoComplete="username"
                placeholder="Enter your full name"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                label="Password"
                required
                type="password"
                autoComplete="current-password"
                placeholder="Enter your email"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            role="checkbox"
            aria-checked={remember}
            onClick={() => setRemember((on) => !on)}
            className="flex items-center gap-[4px] text-left"
          >
            {remember ? (
              <img src={checkboxChecked} alt="" className="size-[24px]" />
            ) : (
              <span className="size-[24px] rounded-[2px] border-2 border-slate-300" />
            )}
            <span className="text-[14px] text-app-text">
              Remember me.{' '}
              <span className="font-bold text-app-link">Learn more</span>
            </span>
          </button>

          {error ? (
            <p
              role="alert"
              className="w-full rounded-[12px] bg-chip-demand px-[12px] py-[14px] text-[14px] text-app-text"
            >
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-[24px] pb-[24px]">
          <Divider label="or" />
          <div className="flex w-full flex-col items-center">
            <SocialButton
              provider="linkedin"
              disabled={busy || !configured}
              onClick={() => void run(signInWithLinkedIn)}
            >
              Sign in with LinkedIn
            </SocialButton>
            <SocialButton
              provider="google"
              onClick={() =>
                setError(
                  'Google sign in is not set up yet. Use LinkedIn or your email.',
                )
              }
            >
              Sign in with Google
            </SocialButton>
          </div>
        </div>

        <Button type="submit" block disabled={busy || !configured}>
          {busy ? 'Signing in...' : 'Continue'}
        </Button>
      </form>
    </Screen>
  )
}
