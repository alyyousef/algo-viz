import { memo, useMemo, type JSX } from 'react'

import DesktopIcon96 from '@/systems/win96/components/DesktopIcon96'
import { useWin96WindowManager } from '@/systems/win96/context/Win96WindowManager'

import FolderNavigationBar from './FolderNavigationBar'

import type { ExplorerNode } from '@/data/algoviz-explorer'
import type { FolderWindowState } from '@/systems/win96/context/Win96WindowManager'

const FOLDER_GLYPH = '\uD83D\uDCC1'
const VISUALIZATION_GLYPH = '\uD83D\uDCCA'

const buildAddress = (entries: ExplorerNode[]): string => {
  const segments = entries.slice(1).map((entry) => entry.name)
  return ['C:', 'Users', 'AlgoViz', ...segments].join('\\')
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
  const currentEntry = entries[entries.length - 1]?.node ?? null
  const folderChildren = useMemo(
    () => children.filter((child) => child.kind === 'folder'),
    [children],
  )
  const visibleChildren = folderChildren.length > 0 ? folderChildren : children

  const canGoBack = window.history.length > 0
  const canGoUp = window.path.length > 1
  const address = useMemo(() => buildAddress(entries.map((entry) => entry.node)), [entries])
  const itemCount = visibleChildren.length
  const subtitle =
    currentEntry?.description ?? `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`

  return (
    <div className="folder-window">
      <FolderNavigationBar
        canGoBack={canGoBack}
        canGoUp={canGoUp}
        address={address}
        onBack={() => navigateBack(window.id)}
        onUp={() => navigateUp(window.id)}
      />

      <div className="folder-window__summary">
        <h2 className="folder-window__summary-title">{currentEntry?.name ?? 'Folder'}</h2>
        <span className="folder-window__summary-meta">{subtitle}</span>
      </div>

      <div className="folder-window__content">
        {visibleChildren.length === 0 ? (
          <div className="folder-window__empty">This folder is empty.</div>
        ) : (
          <div className="folder-window__grid">
            {visibleChildren.map((child) => {
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
                  contextUrl={child.route}
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
