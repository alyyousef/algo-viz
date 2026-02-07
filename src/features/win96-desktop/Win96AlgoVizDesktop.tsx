import { useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'

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
const BASE_DESKTOP_WIDTH = 1440
const BASE_DESKTOP_HEIGHT = 900
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

interface MinimizedHelpTask {
  id: string
  title: string
  url: string
  kind: 'help'
}

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
  const { rootFolders, openFolderWindow } = useWin96WindowManager()

  const orderedRootFolders = useMemo(() => {
    const desiredOrder = [
      'folder:0-fundamentals',
      'folder:0-programming-languages',
      'folder:1-core-data-structures',
      'folder:2-core-algorithms',
      'folder:3-algorithmic-paradigms',
      'folder:0-cs-problems',
      'folder:4-domain-specific-advanced',
      'folder:5-specialized-applications',
    ]
    const lookup = new Map(rootFolders.map((node) => [node.id, node]))
    const ordered = desiredOrder
      .map((id) => lookup.get(id))
      .filter((node): node is NonNullable<typeof node> => Boolean(node))
    const rest = rootFolders.filter((node) => !desiredOrder.includes(node.id))
    return [...ordered, ...rest]
  }, [rootFolders])

  return (
    <div className="win96-desktop win96-desktop--scaled theme-win97">
      <div className="win96-desktop-icons">
        {orderedRootFolders.map((node) => (
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
    </div>
  )
}

function DesktopChrome(): JSX.Element {
  const navigate = useNavigate()
  const {
    windows,
    activeWindowId,
    rootFolders,
    openFolderWindow,
    openVisualizationWindow,
    toggleMinimize,
    getChildren,
  } = useWin96WindowManager()
  const [now, setNow] = useState(() => new Date())
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [activeStartFolderId, setActiveStartFolderId] = useState<string | null>(null)
  const [minimizedHelpTasks, setMinimizedHelpTasks] = useState<MinimizedHelpTask[]>([])
  const startMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loadTasks = () => {
      const raw = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
      if (!raw) {
        setMinimizedHelpTasks([])
        return
      }
      try {
        const parsed = JSON.parse(raw) as MinimizedHelpTask[]
        setMinimizedHelpTasks(Array.isArray(parsed) ? parsed : [])
      } catch {
        setMinimizedHelpTasks([])
      }
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === MINIMIZED_HELP_TASKS_KEY) {
        loadTasks()
      }
    }

    loadTasks()
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const orderedRootFolders = useMemo(() => {
    const desiredOrder = [
      'folder:0-fundamentals',
      'folder:0-programming-languages',
      'folder:1-core-data-structures',
      'folder:2-core-algorithms',
      'folder:3-algorithmic-paradigms',
      'folder:0-cs-problems',
      'folder:4-domain-specific-advanced',
      'folder:5-specialized-applications',
    ]
    const lookup = new Map(rootFolders.map((node) => [node.id, node]))
    const ordered = desiredOrder
      .map((id) => lookup.get(id))
      .filter((node): node is NonNullable<typeof node> => Boolean(node))
    const rest = rootFolders.filter((node) => !desiredOrder.includes(node.id))
    return [...ordered, ...rest]
  }, [rootFolders])

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

  const startMenuEntries = useMemo(
    () => orderedRootFolders.filter((node) => node.kind === 'folder'),
    [orderedRootFolders],
  )

  const handleStartButtonClick = () => {
    setIsStartMenuOpen((open) => {
      const next = !open
      if (next) {
        const firstFolder = startMenuEntries[0]
        setActiveStartFolderId(firstFolder ? firstFolder.id : null)
      }
      return next
    })
  }

  const timeLabel = useMemo(
    () => now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    [now],
  )

  const orderedWindows = useMemo(() => [...windows].sort((a, b) => a.zIndex - b.zIndex), [windows])

  const runningItemsContent = orderedWindows.map((win) => {
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

  const minimizedHelpButtons = minimizedHelpTasks.map((task) => (
    <Button97
      key={task.id}
      size="sm"
      className="win96-taskbar__button win96-taskbar__button--minimized"
      data-state="minimized"
      onClick={() => {
        const nextTasks = minimizedHelpTasks.filter((item) => item.id !== task.id)
        window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))
        setMinimizedHelpTasks(nextTasks)
        void navigate(task.url)
      }}
      iconLeft={<span aria-hidden="true">{VISUALIZATION_GLYPH}</span>}
    >
      {task.title}
    </Button97>
  ))

  const activeStartFolder = useMemo(
    () => startMenuEntries.find((node) => node.id === activeStartFolderId) ?? startMenuEntries[0],
    [activeStartFolderId, startMenuEntries],
  )

  const activeStartFolderChildren = useMemo(() => {
    if (!activeStartFolder) {
      return []
    }
    return getChildren(activeStartFolder.id)
  }, [activeStartFolder, getChildren])

  const handleSelectStartFolder = (folderId: string) => {
    setActiveStartFolderId(folderId)
  }

  const handleLaunchNode = (nodeId: string, kind: 'folder' | 'visualization') => {
    setIsStartMenuOpen(false)
    if (kind === 'folder') {
      openFolderWindow(nodeId)
    } else {
      openVisualizationWindow(nodeId)
    }
  }

  return (
    <div className="win96-desktop-chrome">
      {isStartMenuOpen ? (
        <div
          ref={startMenuRef}
          className="win96-start-menu"
          role="menu"
          aria-label="AlgoViz start menu"
        >
          <div className="win96-start-menu__columns">
            <div className="win96-start-menu__list">
              {startMenuEntries.map((node) => {
                const isActive = node.id === activeStartFolder?.id
                return (
                  <button
                    key={node.id}
                    type="button"
                    className={`win96-start-menu__item${isActive ? ' win96-start-menu__item--active' : ''}`}
                    role="menuitem"
                    onClick={() => handleSelectStartFolder(node.id)}
                  >
                    <span className="win96-start-menu__item-icon" aria-hidden="true">
                      {node.icon ?? FOLDER_GLYPH}
                    </span>
                    <span className="win96-start-menu__item-content">
                      <span className="win96-start-menu__item-label">{node.name}</span>
                      {node.description ? (
                        <span className="win96-start-menu__item-description">
                          {node.description}
                        </span>
                      ) : null}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="win96-start-menu__subpanel" role="menu">
              <div className="win96-start-menu__subpanel-header">
                <span className="win96-start-menu__subpanel-title">
                  {activeStartFolder?.name ?? 'Items'}
                </span>
                {activeStartFolder ? (
                  <button
                    type="button"
                    className="win96-start-menu__subpanel-action"
                    onClick={() => handleLaunchNode(activeStartFolder.id, 'folder')}
                  >
                    Open
                  </button>
                ) : null}
              </div>
              <div className="win96-start-menu__sublist">
                {activeStartFolderChildren.length === 0 ? (
                  <div className="win96-start-menu__subpanel-empty">No items</div>
                ) : (
                  activeStartFolderChildren.map((child) => (
                    <button
                      key={child.id}
                      type="button"
                      className="win96-start-menu__item win96-start-menu__item--sub"
                      role="menuitem"
                      onClick={() => handleLaunchNode(child.id, child.kind)}
                    >
                      <span className="win96-start-menu__item-icon" aria-hidden="true">
                        {child.icon ?? (child.kind === 'folder' ? FOLDER_GLYPH : VISUALIZATION_GLYPH)}
                      </span>
                      <span className="win96-start-menu__item-content">
                        <span className="win96-start-menu__item-label">{child.name}</span>
                        {child.description ? (
                          <span className="win96-start-menu__item-description">
                            {child.description}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
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
        runningItems={
          <div className="win96-taskbar__items">
            {runningItemsContent}
            {minimizedHelpButtons}
          </div>
        }
        tray={<div className="win96-taskbar__clock">{timeLabel}</div>}
      />
    </div>
  )
}

export default function Win96AlgoVizDesktop(): JSX.Element {
  const { enable } = useWin97Theme()
  const [scaleState, setScaleState] = useState(() => ({
    scale: 1,
    scaledWidth: BASE_DESKTOP_WIDTH,
    scaledHeight: BASE_DESKTOP_HEIGHT,
  }))

  useEffect(() => {
    const updateScale = () => {
      const widthScale = window.innerWidth / BASE_DESKTOP_WIDTH
      const heightScale = window.innerHeight / BASE_DESKTOP_HEIGHT
      const nextScale = Math.min(widthScale, heightScale, 1)
      const safeScale = Number.isFinite(nextScale) ? nextScale : 1
      setScaleState({
        scale: safeScale,
        scaledWidth: Math.round(BASE_DESKTOP_WIDTH * safeScale),
        scaledHeight: Math.round(BASE_DESKTOP_HEIGHT * safeScale),
      })
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  useEffect(() => {
    enable()
  }, [enable])

  return (
    <Win96WindowManagerProvider>
      <div className="win96-desktop-scale-root">
        <div
          className="win96-desktop-scale-outer"
          style={{
            width: `${scaleState.scaledWidth}px`,
            height: `${scaleState.scaledHeight}px`,
          }}
        >
          <div
            className="win96-desktop-scale"
            style={{
              width: `${BASE_DESKTOP_WIDTH}px`,
              height: `${BASE_DESKTOP_HEIGHT}px`,
              transform: `scale(${scaleState.scale})`,
            }}
          >
            <DesktopContainer />
          </div>
        </div>
        <DesktopChrome />
      </div>
    </Win96WindowManagerProvider>
  )
}
