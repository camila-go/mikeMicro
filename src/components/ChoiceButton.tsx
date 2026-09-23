import type { ButtonHTMLAttributes } from 'react'

/* Figma: the answer options in the goals wizard (9:1022 unselected,
   48:7594 selected). Same 52px height, 12px radius, grey-200 hairline and
   bold jetblue-500 label in both states. Only the fill changes: grey-100
   unselected, grey-200 selected. */
export function ChoiceButton({
  selected = false,
  className = '',
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={`h-[52px] w-full rounded-[12px] border border-grey-200 px-[12px] text-[16px] font-bold text-btn-secondary-text transition-colors ${
        selected ? 'bg-grey-200' : 'bg-grey-100 hover:bg-grey-200/60'
      } ${className}`}
      {...props}
    />
  )
}
