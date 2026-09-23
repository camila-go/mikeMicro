import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import visibilityOff from '../assets/icons/visibility-off.svg'
import { Button } from '../components/Button'
import { Divider } from '../components/Divider'
import { Screen } from '../components/Screen'
import { SocialButton } from '../components/SocialButton'
import { TextField } from '../components/TextField'

/* Figma: Sign In/2 (3:2093) for the empty state and Sign In/wForm (48:7201)
   for the filled one. Both are the same screen, so the filled frame is just
   this one with values typed in. */
export default function Join() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Screen>
      <div className="flex flex-col">
        <div className="flex w-full flex-col items-center gap-[12px]">
          <div className="flex w-full flex-col gap-[6px]">
            <h1 className="text-[24px] font-bold text-app-text">Join Mike</h1>
            <p className="flex items-center gap-[6px] text-[16px] text-app-text">
              or
              <Link to="/sign-in" className="font-bold text-app-link">
                Sign in
              </Link>
            </p>
          </div>

          <div className="flex w-full flex-col gap-[4px]">
            <p className="py-[4px] pl-[4px] text-[14px] font-medium text-app-text">
              *required
            </p>

            <div className="flex w-full flex-col gap-[20px]">
              <div className="flex w-full flex-col gap-[20px]">
                <TextField
                  label="First Name"
                  required
                  autoComplete="given-name"
                  placeholder="Enter your first name"
                />
                <TextField
                  label="Last Name"
                  required
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                />
              </div>

              <div className="flex w-full flex-col gap-[20px]">
                <TextField
                  label="Email or Phone"
                  required
                  autoComplete="username"
                  placeholder="Enter your Email or Phone"
                />
                <TextField
                  label="Password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  hint="Password must be 6 characters long"
                  trailing={
                    /* Figma only ships the visibility_off glyph, so the icon
                       does not change when the password is revealed. The
                       paired "visibility" icon needs exporting. */
                    <button
                      type="button"
                      onClick={() => setShowPassword((on) => !on)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="block size-[24px]"
                    >
                      <img src={visibilityOff} alt="" className="block size-full" />
                    </button>
                  }
                />
              </div>

              <div className="flex w-full flex-col gap-[4px] text-[12px]">
                <p className="text-app-text">
                  By clicking Agree &amp; Join you agree to the Mike
                </p>
                <p className="font-bold text-app-link">
                  User Agreement, Privacy Policy, and CookiePolicy.
                </p>
                <p className="text-app-text">
                  For phone number signups we will send a verification code via
                  SMS.
                </p>
              </div>

              <Button block onClick={() => navigate('/import')}>
                Agree and Join
              </Button>
            </div>
          </div>

          <Divider label="or" />
        </div>

        {/* The frame also carries a transparent "Forgot password?" label,
            which only existed to pad out its fixed height. Dropped, since
            nothing here is a fixed height any more. */}
        <div className="flex w-full flex-col items-center pt-[12px]">
          <SocialButton provider="linkedin">Continue with LinkedIn</SocialButton>
          <SocialButton provider="google">Continue with Google</SocialButton>
        </div>
      </div>
    </Screen>
  )
}
