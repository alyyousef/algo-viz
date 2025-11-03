import { useEffect, useMemo, useRef, useState, type JSX } from 'react'

import DesktopIcon96 from '@/systems/win96/components/DesktopIcon96'
import Window96 from '@/systems/win96/components/Window96'
import {
  Win96WindowManagerProvider,
  useWin96WindowManager,
  type WindowState,
} from '@/systems/win96/context/Win96WindowManager'
import Button97 from '@/systems/win97/components/Button97'
import Taskbar97 from '@/systems/win97/components/Taskbar97'
import useWin97Theme from '@/systems/win97/hooks/useWin97Theme'

import FolderWindowContent from './components/FolderWindowContent'
import VisualizationWindowContent from './components/VisualizationWindowContent'

const FOLDER_GLYPH = '\uD83D\uDCC1'
const VISUALIZATION_GLYPH = '\uD83D\uDCCA'

const WindowLayer = (): JSX.Element => {
  const { windows, activeWindowId, focusWindow, minimizeWindow, closeWindow } =
    useWin96WindowManager()

  const sortedWindows = useMemo(() => [...windows].sort((a, b) => a.zIndex - b.zIndex), [windows])

  const renderContent = (window: WindowState) => {
    switch (window.kind) {
      case 'folder':
        return <FolderWindowContent window={window} />
      case 'visualization':
        return <VisualizationWindowContent window={window} />
      default:
        return null
    }
  }

  return (
    <div className="win96-window-layer">
      {sortedWindows.map((win) => (
        <Window96
          key={win.id}
          title={win.title}
          icon={win.kind === 'folder' ? FOLDER_GLYPH : VISUALIZATION_GLYPH}
          initialPosition={win.initialPosition}
          onPointerDown={() => focusWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onClose={() => closeWindow(win.id)}
          style={{
            zIndex: win.zIndex,
            visibility: win.isMinimized ? 'hidden' : undefined,
            pointerEvents: win.isMinimized ? 'none' : undefined,
            opacity: win.isMinimized ? 0 : 1,
          }}
          className={activeWindowId === win.id ? 'win96-window--active' : undefined}
        >
          {renderContent(win)}
        </Window96>
      ))}
    </div>
  )
}

function DesktopContainer(): JSX.Element {
  const {
    windows,
    activeWindowId,
    rootFolders,
    openFolderWindow,
    toggleMinimize,
  } = useWin96WindowManager()
  const [now, setNow] = useState(() => new Date())
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const startMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 60_000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (!isStartMenuOpen) {
      return
    }

    const listenerOptions: AddEventListenerOptions = { capture: true }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (
        !(target instanceof Node) ||
        startMenuRef.current?.contains(target) ||
        (target instanceof Element && target.closest('.start-button-97'))
      ) {
        return
      }
      setIsStartMenuOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsStartMenuOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown, listenerOptions)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, listenerOptions)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isStartMenuOpen])

  const handleStartButtonClick = () => {
    setIsStartMenuOpen((open) => !open)
  }

  const handleSelectFolder = (folderId: string) => {
    setIsStartMenuOpen(false)
    openFolderWindow(folderId)
  }

  const timeLabel = useMemo(
    () => now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    [now],
  )

  const orderedWindows = useMemo(() => [...windows].sort((a, b) => a.zIndex - b.zIndex), [windows])

  const runningItemsContent =
    orderedWindows.length === 0 ? (
      <span className="taskbar-97__placeholder">Start a program</span>
    ) : (
      orderedWindows.map((win) => {
        const isActive = !win.isMinimized && activeWindowId === win.id
        const classes = [
          'win96-taskbar__button',
          isActive ? 'win96-taskbar__button--active' : undefined,
          win.isMinimized ? 'win96-taskbar__button--minimized' : undefined,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <Button97
            key={win.id}
            size="sm"
            className={classes}
            iconLeft={
              <span aria-hidden="true">
                {win.kind === 'folder' ? FOLDER_GLYPH : VISUALIZATION_GLYPH}
              </span>
            }
            data-state={isActive ? 'active' : win.isMinimized ? 'minimized' : 'inactive'}
            onClick={() => toggleMinimize(win.id)}
          >
            {win.title}
          </Button97>
        )
      })
    )

  const startMenuEntries = useMemo(
    () => rootFolders.filter((node) => node.kind === 'folder'),
    [rootFolders],
  )

  return (
    <div className="win96-desktop theme-win97">
      <div className="win96-desktop-icons">
        {rootFolders.map((node) => (
          <DesktopIcon96
            key={node.id}
            label={node.name}
            icon={<span aria-hidden="true">{node.icon ?? FOLDER_GLYPH}</span>}
            onDoubleClick={() => openFolderWindow(node.id)}
            title={node.description ?? node.name}
          />
        ))}
      </div>
      <WindowLayer />
      {isStartMenuOpen ? (
        <div
          ref={startMenuRef}
          className="win96-start-menu"
          role="menu"
          aria-label="AlgoViz start menu"
        >
          <div className="win96-start-menu__sidebar">
            <span className="win96-start-menu__sidebar-label">AlgoViz</span>
          </div>
          <div className="win96-start-menu__list">
            {startMenuEntries.map((node) => (
              <button
                key={node.id}
                type="button"
                className="win96-start-menu__item"
                role="menuitem"
                onClick={() => handleSelectFolder(node.id)}
              >
                <span className="win96-start-menu__item-icon" aria-hidden="true">
                  {node.icon ?? FOLDER_GLYPH}
                </span>
                <span className="win96-start-menu__item-content">
                  <span className="win96-start-menu__item-label">{node.name}</span>
                  {node.description ? (
                    <span className="win96-start-menu__item-description">{node.description}</span>
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <Taskbar97
        startButtonProps={{
          onClick: handleStartButtonClick,
          'aria-label': 'Show programs menu',
          pressed: isStartMenuOpen,
          'aria-expanded': isStartMenuOpen,
          'aria-haspopup': 'menu',
        }}
        runningItems={<div className="win96-taskbar__items">{runningItemsContent}</div>}
        tray={<div className="win96-taskbar__clock">{timeLabel}</div>}
      />
    </div>
  )
}

export default function Win96AlgoVizDesktop(): JSX.Element {
  const { enable } = useWin97Theme()

  useEffect(() => {
    enable()
  }, [enable])

  return (
    <Win96WindowManagerProvider>
      <DesktopContainer />
    </Win96WindowManagerProvider>
  )
}
