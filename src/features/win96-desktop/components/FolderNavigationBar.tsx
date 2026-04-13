import type { JSX } from 'react'

export interface FolderNavigationBarProps {
  canGoBack: boolean
  canGoForward: boolean
  canGoUp: boolean
  address: string
  onBack: () => void
  onForward: () => void
  onUp: () => void
}

const BACK_ARROW = '\u2190'
const FORWARD_ARROW = '\u2192'
const UP_ARROW = '\u2191'

export default function FolderNavigationBar({
  canGoBack,
  canGoForward,
  canGoUp,
  address,
  onBack,
  onForward,
  onUp,
}: FolderNavigationBarProps): JSX.Element {
  return (
    <header className="folder-window__header" role="navigation" aria-label="Folder navigation">
      <div className="folder-window__nav-buttons">
        <button
          type="button"
          className="folder-window__nav-button"
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="Go back"
        >
          <span aria-hidden="true">{BACK_ARROW}</span>
        </button>
        <button
          type="button"
          className="folder-window__nav-button"
          onClick={onForward}
          disabled={!canGoForward}
          aria-label="Go forward"
        >
          <span aria-hidden="true">{FORWARD_ARROW}</span>
        </button>
        <button
          type="button"
          className="folder-window__nav-button"
          onClick={onUp}
          disabled={!canGoUp}
          aria-label="Go up"
        >
          <span aria-hidden="true">{UP_ARROW}</span>
        </button>
      </div>
      <div className="folder-window__address-group">
        <span className="folder-window__address-label">Address</span>
        <div className="folder-window__address-bar" title={address}>
          <span className="folder-window__address-glyph" aria-hidden="true">
            <img src="/folder.png" alt="" className="win96-folder-icon win96-folder-icon--sm" />
          </span>
          <span className="folder-window__address-text">{address}</span>
        </div>
      </div>
    </header>
  )
}
