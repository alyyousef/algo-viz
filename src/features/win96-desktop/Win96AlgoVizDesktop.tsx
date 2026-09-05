import { useEffect, useMemo, type JSX } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ErrorBoundary } from '@/app/ErrorBoundary'
import { getKbRouteByPath } from '@/features/kb/routeManifest'
import DesktopIcon96 from '@/systems/win96/components/DesktopIcon96'
import Window96 from '@/systems/win96/components/Window96'
import {
  Win96WindowManagerProvider,
  isFolderWindow,
  isTopicWindow,
  useWin96WindowManager,
} from '@/systems/win96/context/Win96WindowManager'

import DesktopChrome from './components/DesktopChrome'
import { FolderIcon, VisualizationIcon } from './components/DesktopShellIcons'
import FolderWindowContent from './components/FolderWindowContent'
import TopicRouteSync from './components/TopicRouteSync'
import TopicWindowContent from './components/TopicWindowContent'
import { useCompactViewport } from './hooks/useCompactViewport'
import { useViewportScale } from './hooks/useViewportScale'

const BASE_DESKTOP_WIDTH = 1440
const BASE_DESKTOP_HEIGHT = 900
const MOBILE_BREAKPOINT = 768
const BASE_MOBILE_WIDTH = 480
const BASE_MOBILE_HEIGHT = 800

const WindowLayer = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const { windows, activeWindowId, focusWindow, minimizeWindow, closeWindow } =
    useWin96WindowManager()
  const compactViewport = useCompactViewport()

  const sortedWindows = useMemo(() => [...windows].sort((a, b) => a.zIndex - b.zIndex), [windows])

  const handleClose = (windowId: string) => {
    const target = windows.find((win) => win.id === windowId)
    closeWindow(windowId)

    if (
      target &&
      isTopicWindow(target) &&
      getKbRouteByPath(location.pathname)?.path === target.route
    ) {
      void navigate('/algoViz')
    }
  }

  return (
    <div className="win96-window-layer">
      {sortedWindows.map((win) => (
        <ErrorBoundary key={win.id}>
          <Window96
            title={win.title}
            icon={isTopicWindow(win) ? <VisualizationIcon size="md" /> : <FolderIcon size="md" />}
            initialPosition={win.initialPosition}
            initialSize={isTopicWindow(win) ? win.initialSize : undefined}
            defaultMaximized={isTopicWindow(win) && compactViewport}
            fillHost={isTopicWindow(win)}
            isMinimized={win.isMinimized}
            onPointerDown={() => focusWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onClose={() => handleClose(win.id)}
            style={{
              zIndex: win.zIndex,
              visibility: win.isMinimized ? 'hidden' : undefined,
              pointerEvents: win.isMinimized ? 'none' : undefined,
            }}
            className={[
              activeWindowId === win.id ? 'win96-window--active' : undefined,
              isTopicWindow(win) ? 'win96-window--topic' : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {isFolderWindow(win) ? (
              <ErrorBoundary>
                <FolderWindowContent window={win} />
              </ErrorBoundary>
            ) : (
              <TopicWindowContent route={win.route} />
            )}
          </Window96>
        </ErrorBoundary>
      ))}
    </div>
  )
}

function UnknownTopicNotice(): JSX.Element | null {
  const location = useLocation()
  const navigate = useNavigate()
  const isUnknownKb = location.pathname.startsWith('/kb/') && !getKbRouteByPath(location.pathname)

  if (!isUnknownKb) {
    return null
  }

  return (
    <Window96
      title="Cannot find file"
      initialPosition={{ x: 220, y: 160 }}
      initialSize={{ width: 420, height: 180 }}
      onClose={() => void navigate('/algoViz')}
    >
      <div className="bin98-content" style={{ padding: '16px' }}>
        <p>Windows cannot find that topic.</p>
        <p>{location.pathname}</p>
        <button type="button" className="bin98-button" onClick={() => void navigate('/algoViz')}>
          OK
        </button>
      </div>
    </Window96>
  )
}

function DesktopContainer(): JSX.Element {
  const { orderedRootFolders, openFolderWindow } = useWin96WindowManager()

  return (
    <div className="win96-desktop win96-desktop--scaled">
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
      <UnknownTopicNotice />
    </div>
  )
}

export default function Win96AlgoVizDesktop(): JSX.Element {
  const { rootRef, outerRef, scaleRef } = useViewportScale({
    desktopWidth: BASE_DESKTOP_WIDTH,
    desktopHeight: BASE_DESKTOP_HEIGHT,
    mobileWidth: BASE_MOBILE_WIDTH,
    mobileHeight: BASE_MOBILE_HEIGHT,
    mobileBreakpoint: MOBILE_BREAKPOINT,
  })

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
      <TopicRouteSync />
      <div ref={rootRef} className="win96-desktop-scale-root theme-win97">
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
