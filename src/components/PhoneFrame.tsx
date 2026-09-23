import type { ReactNode } from 'react'
import { StatusBar } from './StatusBar'

type PhoneFrameProps = {
  children: ReactNode
  /* Screens set their own background: white on most, brand blue on the
     splash. Passed here so it covers the full frame including behind the
     status bar. */
  className?: string
  /* Status glyphs go white on the brand-blue splash. */
  statusTone?: 'light' | 'dark'
}

/* Frames in Figma are drawn at 375x812 (iPhone X). Several are taller than
   812 because they include content that scrolls, so the frame is a fixed
   viewport and anything longer scrolls inside it. */
export function PhoneFrame({
  children,
  className = 'bg-app-bg',
  statusTone = 'light',
}: PhoneFrameProps) {
  return (
    <div
      className={`relative h-[812px] w-[375px] shrink-0 overflow-hidden ${className}`}
    >
      <div className="h-full overflow-y-auto">
        <div className="relative min-h-full w-[375px]">{children}</div>
      </div>
      <StatusBar tone={statusTone} />
    </div>
  )
}
