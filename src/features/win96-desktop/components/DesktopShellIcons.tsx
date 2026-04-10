import type { JSX } from 'react'

export function FolderIcon({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }): JSX.Element {
  return (
    <span aria-hidden="true" className="win96-folder-icon-wrap">
      <img src="/folder.png" alt="" className={`win96-folder-icon win96-folder-icon--${size}`} />
    </span>
  )
}

export function VisualizationIcon({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }): JSX.Element {
  return (
    <span aria-hidden="true" className="win96-computer-icon-wrap">
      <img
        src="/computer.png"
        alt=""
        className={`win96-computer-icon win96-computer-icon--${size}`}
      />
    </span>
  )
}
