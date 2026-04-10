import { useEffect, useMemo, type JSX } from 'react'

import { ErrorBoundary } from '@/app/ErrorBoundary'
import DesktopIcon96 from '@/systems/win96/components/DesktopIcon96'
import Window96 from '@/systems/win96/components/Window96'
import {
  Win96WindowManagerProvider,
  useWin96WindowManager,
} from '@/systems/win96/context/Win96WindowManager'

import DesktopChrome from './components/DesktopChrome'
import { FolderIcon } from './components/DesktopShellIcons'
import FolderWindowContent from './components/FolderWindowContent'
import { useViewportScale } from './hooks/useViewportScale'

const BASE_DESKTOP_WIDTH = 1440
const BASE_DESKTOP_HEIGHT = 900
const MOBILE_BREAKPOINT = 768
const BASE_MOBILE_WIDTH = 480
const BASE_MOBILE_HEIGHT = 800

const WindowLayer = (): JSX.Element => {
  const { windows, activeWindowId, focusWindow, minimizeWindow, closeWindow } =
    useWin96WindowManager()

  const sortedWindows = useMemo(() => [...windows].sort((a, b) => a.zIndex - b.zIndex), [windows])

  return (
    <div className="win96-window-layer">
      {sortedWindows.map((win) => (
        <Window96
          key={win.id}
          title={win.title}
          icon={<FolderIcon size="md" />}
          initialPosition={win.initialPosition}
          isMinimized={win.isMinimized}
          onPointerDown={() => focusWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onClose={() => closeWindow(win.id)}
          style={{
            zIndex: win.zIndex,
            visibility: win.isMinimized ? 'hidden' : undefined,
            pointerEvents: win.isMinimized ? 'none' : undefined,
          }}
          className={activeWindowId === win.id ? 'win96-window--active' : undefined}
        >
          <ErrorBoundary>
            <FolderWindowContent window={win} />
          </ErrorBoundary>
        </Window96>
      ))}
    </div>
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
