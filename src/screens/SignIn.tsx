import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import checkboxChecked from '../assets/icons/checkbox-checked.svg'
import { Button } from '../components/Button'
import { Divider } from '../components/Divider'
import { Screen } from '../components/Screen'
import { SocialButton } from '../components/SocialButton'
import { TextField } from '../components/TextField'

/* Figma: Sign In/1 (3:2010). Gutters and the content measure now come from
   Screen, so this only owns the form itself. */
export default function SignIn() {
  const navigate = useNavigate()
  const [remember, setRemember] = useState(true)

  return (
    <Screen>
      <div className="flex flex-col">
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

          <div className="flex flex-col gap-[6px]">
            <p className="p-[4px] text-[14px] font-medium text-app-text">
              *required
            </p>
            <div className="flex flex-col gap-[20px]">
              <TextField
                label="Email or Phone"
                required
                autoComplete="username"
                placeholder="Enter your full name"
              />
              <TextField
                label="Password"
                required
                type="password"
                autoComplete="current-password"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Figma only exports the checked mark, so the unchecked state is a
              plain box matching its geometry until that variant is exported. */}
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
        </div>

        <div className="flex flex-col items-center gap-[24px] pb-[24px]">
          <Divider label="or" />
          <div className="flex w-full flex-col items-center">
            <SocialButton provider="linkedin">Sign in with LinkedIn</SocialButton>
            <SocialButton provider="google">Sign in with Google</SocialButton>
          </div>
        </div>

        <Button block onClick={() => navigate('/import')}>
          Continue
        </Button>
      </div>
    </Screen>
  )
}
