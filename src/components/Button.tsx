import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  /* Buttons in the design run full width inside the phone frame, but the
     Back/Next pairs sit side by side, so width is opt-in. */
  block?: boolean
}

/* Mirrors standardButton/* in Figma: filled brand blue for primary, white
   with a blue hairline for secondary, plus the disabled pair. */
const base =
  'h-11 rounded-md px-4 text-sm font-semibold transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jetblue-600 ' +
  'disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'bg-btn-primary-bg text-btn-primary-text hover:bg-jetblue-600 active:bg-jetblue-800 ' +
    'disabled:bg-btn-primary-bg-disabled disabled:text-btn-primary-text-disabled',
  secondary:
    'border border-btn-secondary-border bg-btn-secondary-bg text-btn-secondary-text ' +
    'hover:bg-jetblue-100/40 active:bg-jetblue-100 ' +
    'disabled:border-btn-secondary-text-disabled disabled:text-btn-secondary-text-disabled',
}

export function Button({
  variant = 'primary',
  block = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${block ? 'w-full' : ''} ${className}`}
      {...props}
    />
  )
}
