import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
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

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

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
      x: number
      y: number
      direction: ResizeDirection
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
  isMinimized?: boolean
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
const DESKTOP_MARGIN = 8
const TASKBAR_HEIGHT = 36
const MOBILE_BREAKPOINT = 768

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
    isMinimized = false,
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
  const previousMetricsRef = useRef<{ position: Position; size: Size } | null>(null)
  const hasNormalizedInitialLayoutRef = useRef(false)

  const [position, setPosition] = useState<Position>(() => ({
    x: initialPosition.x,
    y: initialPosition.y,
  }))
  const [size, setSize] = useState<Size>(() => ({
    width: initialSize.width,
    height: initialSize.height,
  }))
  const [interaction, setInteraction] = useState<InteractionKind>('idle')
  const [isMaximized, setIsMaximized] = useState(false)
  const { width: currentWidth, height: currentHeight } = size

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        containerRef.current?.focus()
      },
    }),
    [],
  )

  const getHostBounds = useCallback(() => {
    if (typeof window === 'undefined') {
      return {
        width: currentWidth,
        height: currentHeight,
      }
    }

    const host = containerRef.current?.parentElement

    return {
      width: host?.clientWidth ?? window.innerWidth,
      height: host?.clientHeight ?? window.innerHeight,
    }
  }, [currentHeight, currentWidth])

  const constrainWindowMetrics = useCallback(
    (
      nextPosition: Position,
      nextSize: Size,
      options?: {
        preferCenteredX?: boolean
      },
    ) => {
      const host = getHostBounds()
      const availableWidth = Math.max(minWidth, host.width - DESKTOP_MARGIN * 2)
      const availableHeight = Math.max(minHeight, host.height - DESKTOP_MARGIN * 2)
      const constrainedSize = {
        width: Math.min(nextSize.width, availableWidth),
        height: Math.min(nextSize.height, availableHeight),
      }
      const maxX = Math.max(DESKTOP_MARGIN, host.width - constrainedSize.width - DESKTOP_MARGIN)
      const maxY = Math.max(DESKTOP_MARGIN, host.height - constrainedSize.height - DESKTOP_MARGIN)
      const shouldCenterX = Boolean(options?.preferCenteredX) && host.width <= MOBILE_BREAKPOINT
      const centeredX = Math.max(
        DESKTOP_MARGIN,
        Math.round((host.width - constrainedSize.width) / 2),
      )
      const preferredPosition = shouldCenterX
        ? {
            x: centeredX,
            y: Math.max(DESKTOP_MARGIN, nextPosition.y),
          }
        : nextPosition

      return {
        size: constrainedSize,
        position: {
          x: Math.min(Math.max(DESKTOP_MARGIN, preferredPosition.x), maxX),
          y: Math.min(Math.max(DESKTOP_MARGIN, preferredPosition.y), maxY),
        },
      }
    },
    [getHostBounds, minHeight, minWidth],
  )

  const normalizeWindowLayout = useCallback(
    (preferCenteredX: boolean) => {
      const constrainedMetrics = constrainWindowMetrics(position, size, { preferCenteredX })

      setSize((prev) => {
        if (
          prev.width === constrainedMetrics.size.width &&
          prev.height === constrainedMetrics.size.height
        ) {
          return prev
        }
        return constrainedMetrics.size
      })

      setPosition((prev) => {
        if (prev.x === constrainedMetrics.position.x && prev.y === constrainedMetrics.position.y) {
          return prev
        }
        return constrainedMetrics.position
      })
    },
    [constrainWindowMetrics, position, size],
  )

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const state = dragStateRef.current
      if (state.type === null || state.pointerId !== event.pointerId) {
        return
      }

      if (state.type === 'drag') {
        event.preventDefault()
        const nextPosition = constrainWindowMetrics(
          {
            x: event.clientX - state.offsetX,
            y: event.clientY - state.offsetY,
          },
          size,
        ).position

        setPosition((prev) => {
          if (prev.x === nextPosition.x && prev.y === nextPosition.y) {
            return prev
          }
          return nextPosition
        })
        return
      }

      if (state.type === 'resize') {
        event.preventDefault()
        const deltaX = event.clientX - state.startX
        const deltaY = event.clientY - state.startY

        let nextWidth = state.width
        let nextHeight = state.height
        let nextX = state.x
        let nextY = state.y
        const direction = state.direction

        if (direction.includes('e')) {
          nextWidth = Math.max(minWidth, state.width + deltaX)
        }

        if (direction.includes('s')) {
          nextHeight = Math.max(minHeight, state.height + deltaY)
        }

        if (direction.includes('w')) {
          const proposedWidth = state.width - deltaX
          const clampedWidth = Math.max(minWidth, proposedWidth)
          const usedDelta = state.width - clampedWidth
          nextWidth = clampedWidth
          nextX = state.x + usedDelta
        }

        if (direction.includes('n')) {
          const proposedHeight = state.height - deltaY
          const clampedHeight = Math.max(minHeight, proposedHeight)
          const usedDelta = state.height - clampedHeight
          nextHeight = clampedHeight
          nextY = state.y + usedDelta
        }

        const constrainedMetrics = constrainWindowMetrics(
          { x: nextX, y: nextY },
          { width: nextWidth, height: nextHeight },
        )

        setSize((prev) => {
          if (
            prev.width === constrainedMetrics.size.width &&
            prev.height === constrainedMetrics.size.height
          ) {
            return prev
          }
          return constrainedMetrics.size
        })

        setPosition((prev) => {
          if (
            prev.x === constrainedMetrics.position.x &&
            prev.y === constrainedMetrics.position.y
          ) {
            return prev
          }
          return constrainedMetrics.position
        })
      }
    },
    [constrainWindowMetrics, minHeight, minWidth, size],
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
      if (!draggable || isMaximized) {
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
    [draggable, handlePointerMove, handlePointerUp, isMaximized, position.x, position.y],
  )

  useLayoutEffect(() => {
    if (isMaximized || hasNormalizedInitialLayoutRef.current) {
      return
    }

    normalizeWindowLayout(true)
    hasNormalizedInitialLayoutRef.current = true
  }, [isMaximized, normalizeWindowLayout])

  const createResizeStart = useCallback(
    (direction: ResizeDirection) => (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!resizable || isMaximized) {
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
        x: position.x,
        y: position.y,
        direction,
      }

      setInteraction('resizing')

      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    },
    [
      handlePointerMove,
      handlePointerUp,
      position.x,
      position.y,
      resizable,
      isMaximized,
      size.height,
      size.width,
    ],
  )

  const computeMaximizedMetrics = useCallback(() => {
    if (typeof window === 'undefined') {
      return {
        position: { x: position.x, y: position.y },
        size: { width: size.width, height: size.height },
      }
    }

    // Maximize within the desktop layer bounds (not raw browser viewport).
    // The desktop can be scaled/cropped, so viewport math can overflow and hide controls.
    const host = getHostBounds()
    const viewportWidth = Math.max(minWidth, host.width - DESKTOP_MARGIN * 2)
    const viewportHeight = Math.max(minHeight, host.height - TASKBAR_HEIGHT - DESKTOP_MARGIN * 2)

    return {
      position: { x: DESKTOP_MARGIN, y: DESKTOP_MARGIN },
      size: { width: viewportWidth, height: viewportHeight },
    }
  }, [getHostBounds, minHeight, minWidth, position.x, position.y, size.height, size.width])

  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      const previous = previousMetricsRef.current
      if (previous) {
        setPosition(previous.position)
        setSize(previous.size)
      }
      previousMetricsRef.current = null
      setIsMaximized(false)
      return
    }

    previousMetricsRef.current = { position, size }
    const metrics = computeMaximizedMetrics()
    setPosition(metrics.position)
    setSize(metrics.size)
    setIsMaximized(true)
    onMaximize?.()
  }, [computeMaximizedMetrics, isMaximized, onMaximize, position, size])

  useEffect(() => {
    if (!isMaximized) {
      const handleResize = () => {
        normalizeWindowLayout(false)
      }

      handleResize()
      window.addEventListener('resize', handleResize)
      window.visualViewport?.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
        window.visualViewport?.removeEventListener('resize', handleResize)
      }
    }

    const handleResize = () => {
      const metrics = computeMaximizedMetrics()
      setPosition(metrics.position)
      setSize(metrics.size)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [computeMaximizedMetrics, isMaximized, normalizeWindowLayout])

  const handleResizeNorth = useMemo(() => createResizeStart('n'), [createResizeStart])
  const handleResizeSouth = useMemo(() => createResizeStart('s'), [createResizeStart])
  const handleResizeEast = useMemo(() => createResizeStart('e'), [createResizeStart])
  const handleResizeWest = useMemo(() => createResizeStart('w'), [createResizeStart])
  const handleResizeNorthEast = useMemo(() => createResizeStart('ne'), [createResizeStart])
  const handleResizeNorthWest = useMemo(() => createResizeStart('nw'), [createResizeStart])
  const handleResizeSouthEast = useMemo(() => createResizeStart('se'), [createResizeStart])
  const handleResizeSouthWest = useMemo(() => createResizeStart('sw'), [createResizeStart])

  const windowStyle = useMemo<CSSProperties>(
    () => ({
      width: size.width,
      height: size.height,
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      ...style,
    }),
    [position.x, position.y, size.height, size.width, style],
  )

  const handleTitleDoubleClick = useCallback(() => {
    if (!resizable) {
      return
    }
    handleMaximize()
  }, [handleMaximize, resizable])

  const handleControlPointerDown = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('win96-window', className)}
      style={windowStyle}
      tabIndex={-1}
      data-interaction={interaction}
      data-maximized={isMaximized ? 'true' : undefined}
    >
      <div
        className="win96-window__title-bar"
        onPointerDown={startDrag}
        onDoubleClick={handleTitleDoubleClick}
      >
        {icon ? <span className="win96-window__icon">{icon}</span> : null}
        <span className="win96-window__title" title={title}>
          {title}
        </span>
        <div className="win96-window__controls">
          <button
            type="button"
            className="win96-window__button"
            aria-label="Minimize window"
            onPointerDown={handleControlPointerDown}
            onClick={onMinimize}
          >
            _
          </button>
          <button
            type="button"
            className="win96-window__button"
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
            onPointerDown={handleControlPointerDown}
            onClick={handleMaximize}
          >
            {isMaximized ? '[ ]' : '[]'}
          </button>
          <button
            type="button"
            className="win96-window__button"
            aria-label="Close window"
            onPointerDown={handleControlPointerDown}
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>

      <div className="win96-window__body">{isMinimized ? null : children}</div>

      {statusText ? <div className="win96-window__status-bar">{statusText}</div> : null}

      {resizable && !isMaximized ? (
        <>
          <div
            className="win96-window__resize-handle win96-window__resize-handle--n"
            role="presentation"
            onPointerDown={handleResizeNorth}
          />
          <div
            className="win96-window__resize-handle win96-window__resize-handle--s"
            role="presentation"
            onPointerDown={handleResizeSouth}
          />
          <div
            className="win96-window__resize-handle win96-window__resize-handle--e"
            role="presentation"
            onPointerDown={handleResizeEast}
          />
          <div
            className="win96-window__resize-handle win96-window__resize-handle--w"
            role="presentation"
            onPointerDown={handleResizeWest}
          />
          <div
            className="win96-window__resize-handle win96-window__resize-handle--ne"
            role="presentation"
            onPointerDown={handleResizeNorthEast}
          />
          <div
            className="win96-window__resize-handle win96-window__resize-handle--nw"
            role="presentation"
            onPointerDown={handleResizeNorthWest}
          />
          <div
            className="win96-window__resize-handle win96-window__resize-handle--se"
            role="presentation"
            onPointerDown={handleResizeSouthEast}
          />
          <div
            className="win96-window__resize-handle win96-window__resize-handle--sw"
            role="presentation"
            onPointerDown={handleResizeSouthWest}
          />
        </>
      ) : null}
    </div>
  )
})

export default Window96
