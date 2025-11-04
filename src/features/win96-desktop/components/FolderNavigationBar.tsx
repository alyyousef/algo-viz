import type { JSX } from 'react'

export interface FolderNavigationBarProps {
  canGoBack: boolean
  canGoUp: boolean
  address: string
  onBack: () => void
  onUp: () => void
}

const BACK_ARROW = '\u2190'
const FORWARD_ARROW = '\u2192'

export default function FolderNavigationBar({
  canGoBack,
  canGoUp,
  address,
  onBack,
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
          onClick={onUp}
          disabled={!canGoUp}
          aria-label="Go up one level"
        >
          <span aria-hidden="true">{FORWARD_ARROW}</span>
        </button>
      </div>
      <div className="folder-window__address-bar" title={address}>
        <span className="folder-window__address-text">{address}</span>
      </div>
    </header>
  )
}
