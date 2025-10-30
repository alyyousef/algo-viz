import React, { forwardRef, type InputHTMLAttributes, type Ref } from 'react'

import '@/styles/win97.css'

export interface Input97Props extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string
}

const Input97 = forwardRef(function Input97(
  { className, wrapperClassName, ...rest }: Input97Props,
  ref: Ref<HTMLInputElement>,
) {
  const wrapperClasses = ['input-97', 'bevel-in', wrapperClassName].filter(Boolean).join(' ')
  const controlClasses = ['input-97__control', className].filter(Boolean).join(' ')

  return (
    <span className={wrapperClasses}>
      <input ref={ref} className={controlClasses} {...rest} />
    </span>
  )
})

export default Input97
