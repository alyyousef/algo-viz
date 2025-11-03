import Button97 from '@/systems/win97/components/Button97'

import type { JSX } from 'react'

export interface FolderNavigationBarProps {
  canGoBack: boolean
  canGoUp: boolean
  address: string
  onBack: () => void
  onUp: () => void
}

export default function FolderNavigationBar({
  canGoBack,
  canGoUp,
  address,
  onBack,
  onUp,
}: FolderNavigationBarProps): JSX.Element {
  return (
    <div className="folder-window__toolbar" role="navigation" aria-label="Folder navigation">
      <div className="folder-window__controls">
        <Button97
          size="sm"
          variant="ghost"
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="Go back to the previous folder"
          iconLeft={<span aria-hidden="true">←</span>}
        >
          Back
        </Button97>
        <Button97
          size="sm"
          variant="ghost"
          onClick={onUp}
          disabled={!canGoUp}
          aria-label="Go up one level"
          iconLeft={<span aria-hidden="true">↑</span>}
        >
          Up
        </Button97>
      </div>
      <label className="folder-window__address">
        <span className="folder-window__address-label">Address</span>
        <input
          className="folder-window__address-input"
          value={address}
          readOnly
          aria-readonly="true"
        />
      </label>
    </div>
  )
}
