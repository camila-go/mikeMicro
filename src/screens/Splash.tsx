import { Link } from 'react-router-dom'
import mikeMark from '../assets/brand/mike-mark.svg'
import { PhoneFrame } from '../components/PhoneFrame'

/* Figma: Sign In/0 (29:1149). A fixed 375x812 brand screen, so the mark and
   the two lines of type keep their absolute positions from the frame.
   The whole screen links onward, which the design does not specify; it is
   here so the prototype can be clicked through. */
export default function Splash() {
  return (
    <PhoneFrame className="bg-jetblue-700" statusTone="dark">
      <Link to="/sign-in" className="absolute inset-0 block" aria-label="Continue to sign in">
        <span className="absolute left-[101px] top-[273px] block size-[175px] overflow-clip">
          <img src={mikeMark} alt="Mike" className="block size-full" />
        </span>
        <span className="absolute left-1/2 top-[533px] block w-[194px] -translate-x-1/2 text-center text-[32px] font-bold leading-none text-white">
          Mike
        </span>
        <span className="absolute left-1/2 top-[582px] block w-[267px] -translate-x-1/2 text-center text-[18px] text-white">
          Education customized
          <br />
          to take you further
        </span>
      </Link>
    </PhoneFrame>
  )
}
