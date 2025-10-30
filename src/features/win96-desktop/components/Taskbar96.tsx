import { useEffect, useMemo, useState, type JSX } from 'react'

import { useWin96WindowManager } from '@/systems/win96/context/Win96WindowManager'

import type { WindowState } from '@/systems/win96/context/Win96WindowManager'

const FOLDER_GLYPH = '\uD83D\uDCC1'
const VISUALIZATION_GLYPH = '\uD83D\uDCCA'
const START_GLYPH = '\uD83E\uDE9F'

interface Taskbar96Props {
  windows: WindowState[]
  activeWindowId?: string
}

const TaskbarButton = ({
  window,
  isActive,
  onClick,
}: {
  window: WindowState
  isActive: boolean
  onClick: () => void
}) => (
  <button
    type="button"
    className="taskbar-96__button"
    data-active={isActive}
    data-minimized={window.isMinimized}
    onClick={onClick}
  >
    <span className="taskbar-96__button-icon" aria-hidden="true">
      {window.kind === 'folder' ? FOLDER_GLYPH : VISUALIZATION_GLYPH}
    </span>
    <span className="taskbar-96__button-label">{window.title}</span>
  </button>
)

export default function Taskbar96({ windows, activeWindowId }: Taskbar96Props): JSX.Element {
  const { toggleMinimize } = useWin96WindowManager()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date())
    }, 60_000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  const timeLabel = useMemo(
    () => now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    [now],
  )

  const ordered = useMemo(() => [...windows].sort((a, b) => a.zIndex - b.zIndex), [windows])

  return (
    <footer className="taskbar-96">
      <div className="taskbar-96__start" aria-hidden="true">
        <button type="button" className="taskbar-96__start-button">
          <span className="taskbar-96__start-icon" aria-hidden="true">
            {START_GLYPH}
          </span>
          <span className="taskbar-96__start-label">Start</span>
        </button>
      </div>
      <div className="taskbar-96__items">
        {ordered.map((win) => (
          <TaskbarButton
            key={win.id}
            window={win}
            isActive={!win.isMinimized && activeWindowId === win.id}
            onClick={() => toggleMinimize(win.id)}
          />
        ))}
      </div>
      <div className="taskbar-96__tray">
        <div className="taskbar-96__clock" aria-live="polite">
          {timeLabel}
        </div>
      </div>
    </footer>
  )
}
