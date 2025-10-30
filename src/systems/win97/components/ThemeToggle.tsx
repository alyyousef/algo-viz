import React, { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type Ref } from 'react'

import useWin97Theme from '@/systems/win97/hooks/useWin97Theme'

import Button97 from './Button97'

export interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onLabel?: React.ReactNode
  offLabel?: React.ReactNode
}

const ThemeToggle = forwardRef(function ThemeToggle(
  {
    onLabel = 'Disable Win97 theme',
    offLabel = 'Enable Win97 theme',
    className,
    onClick,
    children,
    ...rest
  }: ThemeToggleProps,
  ref: Ref<HTMLButtonElement>,
) {
  const { enabled, toggle } = useWin97Theme()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event)
    }
    if (event.defaultPrevented) return
    toggle()
  }

  const computedLabel = children ?? (enabled ? onLabel : offLabel)

  return (
    <Button97
      ref={ref}
      className={className}
      aria-pressed={enabled}
      onClick={handleClick}
      {...rest}
    >
      {computedLabel}
    </Button97>
  )
})

export default ThemeToggle
