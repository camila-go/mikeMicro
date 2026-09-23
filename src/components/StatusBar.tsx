import type { CSSProperties } from 'react'
import notch from '../assets/status/notch.svg'
import rightSide from '../assets/status/right-side.svg'
import time from '../assets/status/time.svg'

/* "light" is a white screen with black glyphs, "dark" is the brand-blue
   splash with white glyphs. Only the glyph colour and the pill's blue change;
   the notch is black on both. */
type Tone = 'light' | 'dark'

/* The exported SVGs are single-colour black, and Figma renders the same
   vectors in white on the splash. Tinting them through a mask reuses the real
   letterforms and icon shapes instead of redrawing them per tone. */
function mask(src: string): CSSProperties {
  return {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  }
}

/* iOS status bar, Figma component 3:967. Note that the code generator exports
   the base component: black glyphs and no pill behind the time. What Figma
   actually renders is a SystemBlue pill with a white label, on every screen,
   so the pill is drawn here and the glyph vector is tinted on top. */
export function StatusBar({ tone = 'light' }: { tone?: Tone }) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-20 h-[44px] w-[375px]">
      <img
        src={notch}
        alt=""
        className="absolute left-[78px] top-[-2px] h-[30px] w-[219px]"
      />

      <div
        className={`absolute left-[21px] top-[12px] h-[21px] w-[54px] rounded-full ${
          tone === 'dark' ? 'bg-system-blue-dark' : 'bg-system-blue'
        }`}
      >
        <span
          aria-hidden
          className="block size-full bg-white"
          style={mask(time)}
        />
        <span className="sr-only">9:41</span>
      </div>

      <span
        aria-hidden
        className={`absolute right-[14.67px] top-[17.33px] h-[11.336px] w-[66.661px] ${
          tone === 'dark' ? 'bg-white' : 'bg-black'
        }`}
        style={mask(rightSide)}
      />
    </div>
  )
}
