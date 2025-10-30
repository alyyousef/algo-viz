import { useMemo, type JSX } from 'react'

import DesktopIcon96 from '@/systems/win96/components/DesktopIcon96'
import Window96 from '@/systems/win96/components/Window96'
import {
  Win96WindowManagerProvider,
  useWin96WindowManager,
  type WindowState,
} from '@/systems/win96/context/Win96WindowManager'

import FolderWindowContent from './components/FolderWindowContent'
import Taskbar96 from './components/Taskbar96'
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
  const { windows, activeWindowId, rootFolders, openFolderWindow } = useWin96WindowManager()

  return (
    <div className="win96-desktop">
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
      <Taskbar96 windows={windows} activeWindowId={activeWindowId} />
    </div>
  )
}

export default function Win96AlgoVizDesktop(): JSX.Element {
  return (
    <Win96WindowManagerProvider>
      <DesktopContainer />
    </Win96WindowManagerProvider>
  )
}
