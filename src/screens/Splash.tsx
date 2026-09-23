import { Link } from 'react-router-dom'
import mikeMark from '../assets/brand/mike-mark.svg'
import { Screen } from '../components/Screen'

/* Figma: Sign In/0 (29:1149). The frame positions the mark and the two lines
   absolutely; here they are a centred column so the screen works at any size.
   Spacing follows the frame: 85px from the mark down to the wordmark, then
   11px to the tagline.

   The whole screen links onward, which the design does not specify. It is
   here so the flow can be clicked through. */
export default function Splash() {
  return (
    <Screen className="bg-jetblue-700" variant="center">
      <Link
        to="/sign-in"
        className="flex flex-col items-center text-center"
        aria-label="Continue to sign in"
      >
        <img
          src={mikeMark}
          alt="Mike"
          className="block w-[45vw] max-w-[175px]"
        />
        <span className="mt-[64px] block text-[32px] font-bold text-white sm:mt-[85px]">
          Mike
        </span>
        <span className="mt-[11px] block max-w-[267px] text-[18px] text-white">
          Education customized to take you further
        </span>
      </Link>
    </Screen>
  )
}
