import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  /* The design marks required fields with a leading asterisk on the label
     rather than a trailing one, so the flag drives that prefix. */
  required?: boolean
  hint?: ReactNode
  /* Slot for the show/hide affordance on password fields. */
  trailing?: ReactNode
}

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
    <div className="mb-3">
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-semibold text-slate-300"
      >
        {required ? '*' : ''}
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          required={required}
          className={`h-10 w-full rounded border border-grey-200 bg-grey-100 px-3 text-sm text-slate-300 placeholder:text-slate-200 focus:border-jetblue-500 focus:bg-white focus:outline-none ${trailing ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {trailing ? (
          <span className="absolute inset-y-0 right-2 flex items-center">
            {trailing}
          </span>
        ) : null}
      </div>
      {hint ? (
        <p className="mt-1 text-[10px] leading-snug text-slate-200">{hint}</p>
      ) : null}
    </div>
  )
}
