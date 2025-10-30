import React, { forwardRef, type InputHTMLAttributes, type ReactNode, type Ref } from 'react'

import '@/styles/win97.css'

type Radio97Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode
  wrapperClassName?: string
  labelClassName?: string
}

const Radio97 = forwardRef(function Radio97(
  { label, wrapperClassName, labelClassName, className, ...rest }: Radio97Props,
  ref: Ref<HTMLInputElement>,
) {
  const isDisabled = Boolean(rest.disabled)
  const wrapperClasses = [
    'radio-97',
    isDisabled ? 'radio-97--disabled' : undefined,
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ')
  const labelClasses = ['radio-97__label', labelClassName].filter(Boolean).join(' ')
  const inputClasses = ['radio-97__input', className].filter(Boolean).join(' ')

  return (
    <label data-disabled={isDisabled ? 'true' : undefined} className={wrapperClasses}>
      <input ref={ref} type="radio" className={inputClasses} {...rest} />
      <span className="radio-97__bullet" aria-hidden="true" />
      {label ? <span className={labelClasses}>{label}</span> : null}
    </label>
  )
})

export default Radio97
