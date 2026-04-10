import { useEffect, useMemo, useRef, useState, type JSX } from 'react'

import {
  getExplorerNode,
  type ExplorerFolderNode,
  type ExplorerNode,
} from '@/data/algoviz-explorer'

import { FolderIcon, VisualizationIcon } from './DesktopShellIcons'

interface StartMenu96Props {
  isOpen: boolean
  folders: ExplorerFolderNode[]
  getChildren: (nodeId: string) => ExplorerNode[]
  onClose: () => void
  onOpenFolder: (nodeId: string) => void
  onNavigate: (route: string) => void
}

export default function StartMenu96({
  isOpen,
  folders,
  getChildren,
  onClose,
  onOpenFolder,
  onNavigate,
}: StartMenu96Props): JSX.Element | null {
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null)
  const startMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setActiveFolderId((current) => current ?? folders[0]?.id ?? null)
  }, [folders, isOpen])

  useEffect(() => {
    if (!isOpen) {
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

      onClose()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('pointerdown', handlePointerDown, listenerOptions)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, listenerOptions)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const activeFolder = useMemo(
    () => folders.find((node) => node.id === activeFolderId) ?? folders[0],
    [activeFolderId, folders],
  )

  const activeFolderChildren = useMemo(() => {
    if (!activeFolder) {
      return []
    }

    return getChildren(activeFolder.id)
  }, [activeFolder, getChildren])

  const handleLaunchNode = (nodeId: string, kind: 'folder' | 'visualization') => {
    onClose()

    if (kind === 'folder') {
      onOpenFolder(nodeId)
      return
    }

    const target = getExplorerNode(nodeId)
    if (target?.node.kind === 'visualization' && target.node.route) {
      onNavigate(target.node.route)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      ref={startMenuRef}
      className="win96-start-menu"
      role="dialog"
      aria-label="AlgoViz start menu"
    >
      <div className="win96-start-menu__columns">
        <div className="win96-start-menu__list" role="menu" aria-label="Main menu">
          {folders.map((node) => {
            const isActive = node.id === activeFolder?.id
            return (
              <button
                key={node.id}
                type="button"
                className={`win96-start-menu__item${isActive ? ' win96-start-menu__item--active' : ''}`}
                role="menuitem"
                onClick={() => setActiveFolderId(node.id)}
              >
                <span className="win96-start-menu__item-icon" aria-hidden="true">
                  <FolderIcon size="sm" />
                </span>
                <span className="win96-start-menu__item-content">
                  <span className="win96-start-menu__item-label">{node.name}</span>
                  {node.description ? (
                    <span className="win96-start-menu__item-description">{node.description}</span>
                  ) : null}
                </span>
              </button>
            )
          })}
        </div>

        <div className="win96-start-menu__subpanel">
          <div className="win96-start-menu__subpanel-header">
            <span className="win96-start-menu__subpanel-title">
              {activeFolder?.name ?? 'Items'}
            </span>
            {activeFolder ? (
              <button
                type="button"
                className="win96-start-menu__subpanel-action"
                onClick={() => handleLaunchNode(activeFolder.id, 'folder')}
              >
                Open
              </button>
            ) : null}
          </div>
          <div className="win96-start-menu__sublist" role="menu" aria-label="Sub menu">
            {activeFolderChildren.length === 0 ? (
              <div className="win96-start-menu__subpanel-empty">No items</div>
            ) : (
              activeFolderChildren.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  className="win96-start-menu__item win96-start-menu__item--sub"
                  role="menuitem"
                  onClick={() => handleLaunchNode(child.id, child.kind)}
                >
                  <span className="win96-start-menu__item-icon" aria-hidden="true">
                    {child.kind === 'folder' ? (
                      <FolderIcon size="sm" />
                    ) : (
                      <VisualizationIcon size="sm" />
                    )}
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
  )
}
