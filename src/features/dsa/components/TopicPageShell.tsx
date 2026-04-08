import { Link } from 'react-router-dom'

import type { TopicTab } from '@/features/dsa/hooks/useTopicTabs'
import type { JSX, ReactNode } from 'react'

export interface SectionLink {
  id: string
  label: string
}

interface TopicPageShellProps<T extends string> {
  /** Displayed in the Win98 title bar */
  title: string
  tabs: TopicTab<T>[]
  activeTab: T
  onTabChange: (tab: T) => void
  /** Section anchor links shown in the left-hand TOC for the current tab */
  tocLinks: SectionLink[]
  onMinimize: () => void
  children: ReactNode
}

/**
 * Shared Win98 help-page chrome used by all DSA topic pages.
 *
 * Renders: title bar (minimize + close), tab bar, TOC sidebar, content area.
 * Styles come from src/styles/bin98.css (imported once in main.tsx).
 *
 * Usage:
 *   <TopicPageShell title="Binary Search" tabs={tabs} activeTab={activeTab}
 *                   onTabChange={setActiveTab} tocLinks={sectionLinks[activeTab]}
 *                   onMinimize={handleMinimize}>
 *     {activeTab === 'big-picture' && <BigPictureContent />}
 *     {activeTab === 'examples' && <ExamplesContent />}
 *   </TopicPageShell>
 */
export default function TopicPageShell<T extends string>({
  title,
  tabs,
  activeTab,
  onTabChange,
  tocLinks,
  onMinimize,
  children,
}: TopicPageShellProps<T>): JSX.Element {
  return (
    <div className="bin98-help-page">
      <div className="bin98-window" role="presentation">
        <header className="bin98-titlebar">
          <span className="bin98-title-text">{title}</span>
          <div className="bin98-title-controls">
            <button
              className="bin98-control"
              type="button"
              aria-label="Minimize"
              onClick={onMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="bin98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="bin98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bin98-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id ? 'true' : 'false'}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bin98-main">
          <aside className="bin98-toc" aria-label="Table of contents">
            <h2 className="bin98-toc-title">Contents</h2>
            <ul className="bin98-toc-list">
              {tocLinks.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="bin98-content">{children}</div>
        </div>
      </div>
    </div>
  )
}
