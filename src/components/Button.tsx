import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  /* Most buttons run the full 301px content width, but the Back/Next pairs
     in the goals wizard sit side by side, so width is opt-in. */
  block?: boolean
}

/* Figma's lightBtn (3:1560) / darkBtn (3:1692) components: 52px tall, 12px
   radius, Inter Bold 16. Colours come from the standardButton/* tokens. */
const base =
  'h-[52px] rounded-[12px] px-[12px] text-[16px] font-bold transition-colors ' +
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
