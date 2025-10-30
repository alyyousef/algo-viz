import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type JSX,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type Ref,
} from 'react'

import '@/styles/win96.css'

interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

type InteractionKind = 'idle' | 'dragging' | 'resizing'

type DragState =
  | { type: null }
  | {
      type: 'drag'
      pointerId: number
      offsetX: number
      offsetY: number
    }
  | {
      type: 'resize'
      pointerId: number
      startX: number
      startY: number
      width: number
      height: number
    }

export interface Window96Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string
  children: ReactNode
  className?: string
  icon?: ReactNode
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  draggable?: boolean
  resizable?: boolean
  initialPosition?: Position
  initialSize?: Size
  minWidth?: number
  minHeight?: number
  statusText?: string
  style?: CSSProperties
}

export interface Window96Handle {
  focus: () => void
}

const DEFAULT_POSITION: Position = { x: 120, y: 120 }
const DEFAULT_SIZE: Size = { width: 420, height: 320 }

const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ')

const Window96 = forwardRef(function Window96(
  {
    title,
    children,
    className,
    icon,
    onClose,
    onMinimize,
    onMaximize,
    draggable = true,
    resizable = true,
    initialPosition = DEFAULT_POSITION,
    initialSize = DEFAULT_SIZE,
    minWidth = 280,
    minHeight = 200,
    statusText,
    style,
  }: Window96Props,
  ref: Ref<Window96Handle>,
): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<DragState>({ type: null })

  const [position, setPosition] = useState<Position>(() => ({
    x: initialPosition.x,
    y: initialPosition.y,
  }))
  const [size, setSize] = useState<Size>(() => ({
    width: initialSize.width,
    height: initialSize.height,
  }))
  const [interaction, setInteraction] = useState<InteractionKind>('idle')

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        containerRef.current?.focus()
      },
    }),
    [],
  )

  const ensureWithinViewport = useCallback(
    (next: Position): Position => {
      if (typeof window === 'undefined') {
        return next
      }

      const maxX = Math.max(0, window.innerWidth - size.width)
      const maxY = Math.max(0, window.innerHeight - size.height)

      return {
        x: Math.min(Math.max(0, next.x), maxX),
        y: Math.min(Math.max(0, next.y), maxY),
      }
    },
    [size.height, size.width],
  )

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const state = dragStateRef.current
      if (state.type === null || state.pointerId !== event.pointerId) {
        return
      }

      if (state.type === 'drag') {
        event.preventDefault()
        setPosition((prev) => {
          const next = ensureWithinViewport({
            x: event.clientX - state.offsetX,
            y: event.clientY - state.offsetY,
          })

          if (prev.x === next.x && prev.y === next.y) {
            return prev
          }

          return next
        })
      } else if (state.type === 'resize') {
        event.preventDefault()
        setSize((prev) => {
          const nextWidth = Math.max(minWidth, state.width + (event.clientX - state.startX))
          const nextHeight = Math.max(minHeight, state.height + (event.clientY - state.startY))

          if (prev.width === nextWidth && prev.height === nextHeight) {
            return prev
          }

          return {
            width: nextWidth,
            height: nextHeight,
          }
        })
      }
    },
    [ensureWithinViewport, minHeight, minWidth],
  )

  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      const state = dragStateRef.current
      if (state.type === null || state.pointerId !== event.pointerId) {
        return
      }

      dragStateRef.current = { type: null }
      setInteraction('idle')
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    },
    [handlePointerMove],
  )

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  const startDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggable) {
        return
      }

      event.preventDefault()

      dragStateRef.current = {
        type: 'drag',
        pointerId: event.pointerId,
        offsetX: event.clientX - position.x,
        offsetY: event.clientY - position.y,
      }

      setInteraction('dragging')

      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    },
    [draggable, handlePointerMove, handlePointerUp, position.x, position.y],
  )

  const startResize = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!resizable) {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      dragStateRef.current = {
        type: 'resize',
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        width: size.width,
        height: size.height,
      }

      setInteraction('resizing')

      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    },
    [handlePointerMove, handlePointerUp, resizable, size.height, size.width],
  )

  const windowStyle = useMemo<CSSProperties>(
    () => ({
      width: size.width,
      height: size.height,
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      ...style,
    }),
    [position.x, position.y, size.height, size.width, style],
  )

  return (
    <div
      ref={containerRef}
      className={cn('win96-window', className)}
      style={windowStyle}
      tabIndex={-1}
      data-interaction={interaction}
    >
      <div className="win96-window__title-bar" onPointerDown={startDrag}>
        {icon ? <span className="win96-window__icon">{icon}</span> : null}
        <span className="win96-window__title" title={title}>
          {title}
        </span>
        <div className="win96-window__controls">
          <button
            type="button"
            className="win96-window__button"
            aria-label="Minimize window"
            onClick={onMinimize}
          >
            _
          </button>
          <button
            type="button"
            className="win96-window__button"
            aria-label="Maximize window"
            onClick={onMaximize}
          >
            ▢
          </button>
          <button
            type="button"
            className="win96-window__button"
            aria-label="Close window"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="win96-window__body">{children}</div>

      {statusText ? <div className="win96-window__status-bar">{statusText}</div> : null}

      {resizable ? (
        <div className="win96-window__resizer" role="presentation" onPointerDown={startResize} />
      ) : null}
    </div>
  )
})

export default Window96
