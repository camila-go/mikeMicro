import type { ReactNode } from 'react'

/* Figma: the explanatory note at the top of the wizard steps (9:1110). A
   jetblue-800 rule on the left with 14px copy in the same colour. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="w-full border-l border-jetblue-800 px-[12px] py-[14px] text-[14px] text-jetblue-800">
      {children}
    </p>
  )
}
