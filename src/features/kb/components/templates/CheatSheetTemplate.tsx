import TopicPageNavigation from '@/features/kb/components/TopicPageNavigation'

import type { JSX, ReactNode } from 'react'

interface CheatSheetTemplateProps {
  title: string
  children: ReactNode
}

export function CheatSheetTemplate({ title, children }: CheatSheetTemplateProps): JSX.Element {
  return (
    <div className="bin98-help-page">
      <div className="bin98-window" role="presentation">
        <header
          className="bin98-titlebar"
          style={{ background: 'linear-gradient(90deg, #800000 0%, #ff0000 100%)' }}
        >
          <span className="bin98-title-text">{title} - Cheat Sheet</span>
          <div className="bin98-title-controls">
            <button
              className="bin98-control"
              type="button"
              aria-label="Close"
              data-return-target="history-or-desktop"
            >
              X
            </button>
          </div>
        </header>

        <div className="bin98-tabs-row" style={{ paddingBottom: '4px' }}>
          <div className="bin98-tabs" />
          <TopicPageNavigation />
        </div>

        <div className="bin98-main">
          <div
            className="bin98-content"
            style={{ padding: '20px', width: '100%', maxWidth: 'none' }}
          >
            <h1 className="bin98-doc-title">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
