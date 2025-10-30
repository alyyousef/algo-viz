import React, { forwardRef, type InputHTMLAttributes, type ReactNode, type Ref } from 'react'

import '@/styles/win97.css'

type Checkbox97Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode
  wrapperClassName?: string
  labelClassName?: string
}

const Checkbox97 = forwardRef(function Checkbox97(
  { label, wrapperClassName, labelClassName, className, ...rest }: Checkbox97Props,
  ref: Ref<HTMLInputElement>,
) {
  const isDisabled = Boolean(rest.disabled)
  const wrapperClasses = [
    'checkbox-97',
    isDisabled ? 'checkbox-97--disabled' : undefined,
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ')
  const labelClasses = ['checkbox-97__label', labelClassName].filter(Boolean).join(' ')
  const inputClasses = ['checkbox-97__input', className].filter(Boolean).join(' ')

  return (
    <label data-disabled={isDisabled ? 'true' : undefined} className={wrapperClasses}>
      <input ref={ref} type="checkbox" className={inputClasses} {...rest} />
      <span className="checkbox-97__box" aria-hidden="true" />
      {label ? <span className={labelClasses}>{label}</span> : null}
    </label>
  )
})

export default Checkbox97
