import TopicPageNavigation from '@/features/kb/components/TopicPageNavigation'

import type { JSX, ReactNode } from 'react'

interface ConceptTemplateProps {
  title: string
  children: ReactNode
}

export function ConceptTemplate({ title, children }: ConceptTemplateProps): JSX.Element {
  return (
    <div className="bin98-help-page">
      <div className="bin98-window" role="presentation">
        <header className="bin98-titlebar">
          <span className="bin98-title-text">{title}</span>
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
          <div className="bin98-tabs">
            <button type="button" className="bin98-tab active" role="tab" aria-selected="true">
              Overview
            </button>
          </div>
          <TopicPageNavigation />
        </div>

        <div className="bin98-main">
          <aside className="bin98-toc" aria-label="Table of contents">
            <h2 className="bin98-toc-title">Contents</h2>
            <ul className="bin98-toc-list">
              <li>
                <a href="#">Overview</a>
              </li>
            </ul>
          </aside>
          <div className="bin98-content" style={{ padding: '20px' }}>
            <h1 className="bin98-doc-title">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
