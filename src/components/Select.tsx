import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

/* Matches the text field well: 52px tall, 12px radius, grey-100 fill, with
   the label in Inter Bold 16 above it. */
export function Select({
  label,
  options,
  placeholder,
  className = '',
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: string[]
  placeholder?: string
}) {
  const id = useId()

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <label htmlFor={id} className="text-[16px] font-bold text-app-text">
        {label}
      </label>
      <select
        id={id}
        className={`h-[52px] w-full rounded-[12px] bg-grey-100 px-[12px] text-[16px] text-app-text focus:outline-2 focus:outline-offset-[-2px] focus:outline-jetblue-500 ${className}`}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
