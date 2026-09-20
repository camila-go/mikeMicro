import type { ReactNode } from 'react'
import { StatusBar } from './StatusBar'

type PhoneFrameProps = {
  children: ReactNode
  /* Splash and other brand screens run a blue field behind the status bar,
     which flips the status chrome to white. */
  dark?: boolean
  className?: string
}

/* Every frame in the Figma file is drawn at iPhone 14 size, so the prototype
   renders inside a fixed 390x844 viewport rather than reflowing. */
export function PhoneFrame({
  children,
  dark = false,
  className = '',
}: PhoneFrameProps) {
  return (
    <div
      className={`relative flex h-[844px] w-[390px] shrink-0 flex-col overflow-hidden bg-app-bg ${className}`}
    >
      <StatusBar dark={dark} />
      {/* Dynamic Island */}
      <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-[30px] w-[105px] -translate-x-1/2 rounded-full bg-black" />
      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
