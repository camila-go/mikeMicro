import type { ReactNode } from 'react'

type ScreenProps = {
  children: ReactNode
  /* Background for the whole viewport: white on most screens, brand blue on
     the splash. */
  className?: string
  /* "column" is the default reading layout, a centred measure with gutters.
     "center" fills the viewport and centres in both axes, for the splash. */
  variant?: 'column' | 'center'
}

/* The Figma frames are drawn at a fixed 375x812, but this renders as a real
   responsive app rather than a phone mockup, so the width flexes and the page
   scrolls normally.

   Gutters are the design's 37px from 375px up, which reproduces its 301px
   content column exactly at that width, and tighten to 24px below it so a
   320px phone still has a usable measure. The column is capped at 420px so
   forms stay a comfortable measure on a desktop instead of stretching.

   Vertical padding is lighter than the design's 80px: that 80px included the
   44px iOS status bar, which no longer exists here, so keeping it would leave
   a large void at the top. */
const variants: Record<NonNullable<ScreenProps['variant']>, string> = {
  column: 'mx-auto w-full max-w-[420px] px-6 py-12 xs:px-[37px] sm:py-16',
  center:
    'flex min-h-dvh w-full flex-col items-center justify-center px-6 py-12 xs:px-[37px]',
}

export function Screen({
  children,
  className = 'bg-app-bg',
  variant = 'column',
}: ScreenProps) {
  return (
    <div className={`min-h-dvh ${className}`}>
      <div className={variants[variant]}>{children}</div>
    </div>
  )
}
