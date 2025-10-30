import {
  useCallback,
  useMemo,
  useState,
  type JSX,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'

import '@/styles/win96.css'

const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ')

export interface DesktopIcon96Props {
  label: string
  icon?: ReactNode
  className?: string
  selected?: boolean
  defaultSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
  onOpen?: () => void
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void
  onDoubleClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void
  onContextMenu?: (event: ReactMouseEvent<HTMLButtonElement>) => void
  title?: string
}

export default function DesktopIcon96({
  label,
  icon,
  className,
  selected,
  defaultSelected = false,
  onSelectedChange,
  onOpen,
  onClick,
  onDoubleClick,
  onContextMenu,
  title,
}: DesktopIcon96Props): JSX.Element {
  const isControlled = typeof selected === 'boolean'
  const [internalSelected, setInternalSelected] = useState(defaultSelected)

  const isSelected = isControlled ? Boolean(selected) : internalSelected

  const select = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalSelected(value)
      }
      onSelectedChange?.(value)
    },
    [isControlled, onSelectedChange],
  )

  const handleClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      select(true)
      onClick?.(event)
    },
    [onClick, select],
  )

  const handleBlur = useCallback(() => {
    select(false)
  }, [select])

  const handleDoubleClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      onDoubleClick?.(event)
      onOpen?.()
    },
    [onDoubleClick, onOpen],
  )

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        onOpen?.()
      }
    },
    [onOpen],
  )

  const iconContent = useMemo(() => {
    if (icon) {
      return icon
    }

    return (
      <span
        aria-hidden="true"
        className="desktop-icon-96__placeholder"
        style={{
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(59,109,165,0.9) 100%)',
          border: '1px solid rgba(0,0,0,0.35)',
        }}
      />
    )
  }, [icon])

  return (
    <button
      type="button"
      className={cn('desktop-icon-96', className)}
      data-selected={isSelected}
      onClick={handleClick}
      onBlur={handleBlur}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={onContextMenu}
      tabIndex={0}
      aria-selected={isSelected}
      title={title ?? label}
    >
      <span className="desktop-icon-96__image">{iconContent}</span>
      <span className="desktop-icon-96__label">{label}</span>
    </button>
  )
}
