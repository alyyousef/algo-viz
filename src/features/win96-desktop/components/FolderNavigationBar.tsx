import type { JSX } from 'react'

export interface FolderNavigationBarProps {
  canGoBack: boolean
  canGoUp: boolean
  address: string
  onBack: () => void
  onUp: () => void
}

const BACK_ARROW = '\u2190'
const UP_ARROW = '\u2191'
const ADDRESS_GLYPH = '\uD83D\uDCC1'

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
          <span aria-hidden="true">{UP_ARROW}</span>
        </button>
      </div>
      <div className="folder-window__address-group">
        <span className="folder-window__address-label">Address</span>
        <div className="folder-window__address-bar" title={address}>
          <span className="folder-window__address-glyph" aria-hidden="true">
            {ADDRESS_GLYPH}
          </span>
          <span className="folder-window__address-text">{address}</span>
        </div>
      </div>
    </header>
  )
}
