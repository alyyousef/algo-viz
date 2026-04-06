import { useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'

import { ErrorBoundary } from '@/app/ErrorBoundary'
import { getExplorerNode } from '@/data/algoviz-explorer'
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

const BASE_DESKTOP_WIDTH = 1440
const BASE_DESKTOP_HEIGHT = 900
/** On narrow viewports, scale from a smaller logical canvas so content is usable */
const MOBILE_BREAKPOINT = 768
const BASE_MOBILE_WIDTH = 480
const BASE_MOBILE_HEIGHT = 800
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
const FALLBACK_TASKBAR_HEIGHT = 28

/**
 * Display order for root folders on the desktop and in the Start menu.
 * Folders not in this list appear at the end in discovery order.
 */
const ROOT_FOLDER_ORDER = [
  'folder:0-fundamentals',
  'folder:0-languages-ecosystems',
  'alias:languages-and-frameworks:folder:languages-and-frameworks',
  'folder:1-core-data-structures',
  'folder:2-core-algorithms',
  'folder:3-algorithmic-paradigms',
  'folder:0-cs-problems-theory',
  'folder:4-advanced-topics',
  'folder:5-applied-domains',
]

function sortRootFolders<T extends { id: string }>(folders: T[]): T[] {
  const lookup = new Map(folders.map((node) => [node.id, node]))
  const ordered = ROOT_FOLDER_ORDER.map((id) => lookup.get(id)).filter(
    (node): node is NonNullable<typeof node> => Boolean(node),
  )
  const rest = folders.filter((node) => !ROOT_FOLDER_ORDER.includes(node.id))
  return [...ordered, ...rest]
}

function FolderIcon({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }): JSX.Element {
  return (
    <span aria-hidden="true" className="win96-folder-icon-wrap">
      <img src="/folder.png" alt="" className={`win96-folder-icon win96-folder-icon--${size}`} />
    </span>
  )
}

function VisualizationIcon({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }): JSX.Element {
  return (
    <span aria-hidden="true" className="win96-computer-icon-wrap">
      <img src="/computer.png" alt="" className={`win96-computer-icon win96-computer-icon--${size}`} />
    </span>
  )
}

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
          icon={win.kind === 'folder' ? <FolderIcon size="md" /> : <VisualizationIcon size="md" />}
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
          <ErrorBoundary>{renderContent(win)}</ErrorBoundary>
        </Window96>
      ))}
    </div>
  )
}

function DesktopContainer(): JSX.Element {
  const { rootFolders, openFolderWindow } = useWin96WindowManager()

  const orderedRootFolders = useMemo(() => sortRootFolders(rootFolders), [rootFolders])

  return (
    <div className="win96-desktop win96-desktop--scaled theme-win97">
      <div className="win96-desktop-icons">
        {orderedRootFolders.map((node) => (
          <DesktopIcon96
            key={node.id}
            label={node.name}
            icon={<FolderIcon size="lg" />}
            onDoubleClick={() => openFolderWindow(node.id)}
            title={node.description ?? node.name}
          />
        ))}
      </div>
      <ErrorBoundary>
        <WindowLayer />
      </ErrorBoundary>
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

  const orderedRootFolders = useMemo(() => sortRootFolders(rootFolders), [rootFolders])

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
          win.kind === 'folder' ? <FolderIcon size="sm" /> : <VisualizationIcon size="sm" />
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
      iconLeft={<VisualizationIcon size="sm" />}
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
      const target = getExplorerNode(nodeId)
      if (target?.node.kind === 'visualization' && target.node.route) {
        void navigate(target.node.route)
      }
    }
  }

  return (
    <div className="win96-desktop-chrome">
      {isStartMenuOpen ? (
        <div
          ref={startMenuRef}
          className="win96-start-menu"
          role="dialog"
          aria-label="AlgoViz start menu"
        >
          <div className="win96-start-menu__columns">
            <div className="win96-start-menu__list" role="menu" aria-label="Main menu">
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
                    <span className="win96-start-menu__item-icon" aria-hidden="true"><FolderIcon size="sm" /></span>
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

            <div className="win96-start-menu__subpanel">
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
              <div className="win96-start-menu__sublist" role="menu" aria-label="Sub menu">
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
                        {child.kind === 'folder' ? <FolderIcon size="sm" /> : <VisualizationIcon size="sm" />}
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
      <img
        src="/transparentText.png"
        alt="AlgoViz logo"
        className="win96-desktop-logo"
        draggable={false}
      />
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
  const rootRef = useRef<HTMLDivElement | null>(null)
  const outerRef = useRef<HTMLDivElement | null>(null)
  const scaleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const getViewportSize = () => {
      const viewport = window.visualViewport
      return {
        width: viewport?.width ?? window.innerWidth,
        height: viewport?.height ?? window.innerHeight,
      }
    }

    const getTaskbarHeight = () => {
      if (!rootRef.current) {
        return FALLBACK_TASKBAR_HEIGHT
      }

      const rawValue = window
        .getComputedStyle(rootRef.current)
        .getPropertyValue('--win96-taskbar-total-height')
        .trim()
      const parsedValue = Number.parseFloat(rawValue)

      return Number.isFinite(parsedValue) ? parsedValue : FALLBACK_TASKBAR_HEIGHT
    }

    const applyScale = () => {
      const viewport = getViewportSize()
      const isMobile = viewport.width < MOBILE_BREAKPOINT
      const baseW = isMobile ? BASE_MOBILE_WIDTH : BASE_DESKTOP_WIDTH
      const baseH = isMobile ? BASE_MOBILE_HEIGHT : BASE_DESKTOP_HEIGHT
      const availableHeight = Math.max(viewport.height - getTaskbarHeight(), 0)
      const widthScale = viewport.width / baseW
      const heightScale = availableHeight / baseH
      const nextScale = Math.min(widthScale, heightScale, 1)
      const scale = Number.isFinite(nextScale) ? nextScale : 1

      if (outerRef.current) {
        outerRef.current.style.width = `${Math.round(baseW * scale)}px`
        outerRef.current.style.height = `${Math.round(baseH * scale)}px`
      }
      if (scaleRef.current) {
        scaleRef.current.style.width = `${baseW}px`
        scaleRef.current.style.height = `${baseH}px`
        scaleRef.current.style.transform = `scale(${scale})`
      }
    }

    applyScale()
    window.addEventListener('resize', applyScale)
    window.visualViewport?.addEventListener('resize', applyScale)
    window.visualViewport?.addEventListener('scroll', applyScale)
    return () => {
      window.removeEventListener('resize', applyScale)
      window.visualViewport?.removeEventListener('resize', applyScale)
      window.visualViewport?.removeEventListener('scroll', applyScale)
    }
  }, [])

  useEffect(() => {
    enable()
  }, [enable])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const previousHtmlOverflow = html.style.overflow
    const previousHtmlOverscrollBehavior = html.style.overscrollBehavior
    const previousBodyOverflow = body.style.overflow
    const previousBodyOverscrollBehavior = body.style.overscrollBehavior

    html.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'none'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'

    return () => {
      html.style.overflow = previousHtmlOverflow
      html.style.overscrollBehavior = previousHtmlOverscrollBehavior
      body.style.overflow = previousBodyOverflow
      body.style.overscrollBehavior = previousBodyOverscrollBehavior
    }
  }, [])

  return (
    <Win96WindowManagerProvider>
      <div ref={rootRef} className="win96-desktop-scale-root">
        <div ref={outerRef} className="win96-desktop-scale-outer">
          <div ref={scaleRef} className="win96-desktop-scale">
            <DesktopContainer />
          </div>
        </div>
        <DesktopChrome />
      </div>
    </Win96WindowManagerProvider>
  )
}
