import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  /* Figma marks required fields with a leading asterisk on the label, paired
     with a "*required" note above the group, rather than a trailing marker. */
  required?: boolean
  hint?: ReactNode
  /* Slot for the show/hide affordance on password fields. */
  trailing?: ReactNode
}

/* Label is Inter Bold 16 on #424242; the input is a 52px tall grey-100 well
   with a 12px radius and #8d8d8d placeholder, gap 8 between the two. */
export function TextField({
  label,
  required = false,
  hint,
  trailing,
  className = '',
  ...props
}: TextFieldProps) {
  const id = useId()

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <label htmlFor={id} className="text-[16px] font-bold text-app-text">
        {required ? '*' : ''}
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          required={required}
          /* With a trailing control the design pads the field to pr-24 and
             leaves a 10px gap before the 24px icon, so text stops at 58px. */
          className={`h-[52px] w-full rounded-[12px] bg-grey-100 px-[12px] text-[16px] text-app-text placeholder:text-slate-200 focus:outline-2 focus:outline-offset-[-2px] focus:outline-jetblue-500 ${trailing ? 'pr-[58px]' : ''} ${className}`}
          {...props}
        />
        {trailing ? (
          <span className="absolute inset-y-0 right-[24px] flex items-center">
            {trailing}
          </span>
        ) : null}
      </div>
      {hint ? <p className="w-full text-[12px] text-app-text">{hint}</p> : null}
    </div>
  )
}
