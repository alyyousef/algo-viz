import { memo, useMemo, type JSX } from 'react'

import DesktopIcon96 from '@/systems/win96/components/DesktopIcon96'
import { useWin96WindowManager } from '@/systems/win96/context/Win96WindowManager'

import type { ExplorerNode } from '@/data/algoviz-explorer'
import type { FolderWindowState } from '@/systems/win96/context/Win96WindowManager'

const FOLDER_GLYPH = '\uD83D\uDCC1'
const VISUALIZATION_GLYPH = '\uD83D\uDCCA'

const buildAddress = (entries: ExplorerNode[]): string => {
  const segments = entries.slice(1).map((entry) => entry.name)
  return ['C:', 'User', 'AlgoViz', ...segments].join('/')
}

interface FolderWindowContentProps {
  window: FolderWindowState
}

const FolderWindowContent = ({ window }: FolderWindowContentProps): JSX.Element => {
  const {
    navigateToChild,
    navigateBack,
    navigateUp,
    openVisualizationWindow,
    getChildren,
    getPathEntries,
  } = useWin96WindowManager()

  const entries = useMemo(() => getPathEntries(window.path), [getPathEntries, window.path])
  const currentNodeId = window.path[window.path.length - 1] ?? 'root'
  const children = useMemo(() => getChildren(currentNodeId), [currentNodeId, getChildren])

  const canGoBack = window.history.length > 0
  const canGoUp = window.path.length > 1
  const address = useMemo(() => buildAddress(entries.map((entry) => entry.node)), [entries])

  return (
    <div className="folder-window">
      <div className="folder-window__toolbar">
        <div className="folder-window__controls">
          <button
            type="button"
            className="folder-window__nav-btn"
            onClick={() => navigateBack(window.id)}
            disabled={!canGoBack}
          >
            \u2190 Back
          </button>
          <button
            type="button"
            className="folder-window__nav-btn"
            onClick={() => navigateUp(window.id)}
            disabled={!canGoUp}
          >
            \u2191 Up
          </button>
        </div>
        <div className="folder-window__address">
          <span className="folder-window__address-label">Address:</span>
          <output className="folder-window__address-value">{address}</output>
        </div>
      </div>

      <div className="folder-window__content">
        {children.length === 0 ? (
          <div className="folder-window__empty">This folder is empty.</div>
        ) : (
          <div className="folder-window__grid">
            {children.map((child) => {
              const icon = child.icon ? <span aria-hidden="true">{child.icon}</span> : undefined

              if (child.kind === 'folder') {
                return (
                  <DesktopIcon96
                    key={child.id}
                    label={child.name}
                    icon={icon ?? <span aria-hidden="true">{FOLDER_GLYPH}</span>}
                    onDoubleClick={() => navigateToChild(window.id, child.id)}
                    title={child.description ?? child.name}
                  />
                )
              }

              return (
                <DesktopIcon96
                  key={child.id}
                  label={child.name}
                  icon={icon ?? <span aria-hidden="true">{VISUALIZATION_GLYPH}</span>}
                  onDoubleClick={() => openVisualizationWindow(child.id)}
                  title={child.description ?? child.name}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(FolderWindowContent)
