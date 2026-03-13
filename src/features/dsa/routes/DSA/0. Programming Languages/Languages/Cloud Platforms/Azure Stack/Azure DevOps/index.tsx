import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const PAGE_TITLE = 'Azure DevOps'
const PAGE_SUBTITLE = 'Placeholder page'
const PAGE_INTRO =
  'Placeholder content for Azure DevOps. Detailed notes and examples will be added soon.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'azure-overview', label: 'Overview' },
    { id: 'azure-status', label: 'Documentation Status' },
  ],
  'core-concepts': [
    { id: 'azure-core-overview', label: 'Overview and Key Ideas' },
    { id: 'azure-core-notes', label: 'Core Notes' },
  ],
  examples: [
    { id: 'azure-examples-status', label: 'Examples Status' },
    { id: 'azure-examples-references', label: 'References' },
  ],
  glossary: [{ id: 'azure-glossary-status', label: 'Glossary Status' }],
}

const pageStyles = `
.azure-devops-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-devops-help-window {
  display: flex;
  min-height: 100dvh;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.azure-devops-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  min-height: 24px;
}

.azure-devops-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.azure-devops-help-controls {
  display: flex;
  gap: 2px;
}

.azure-devops-help-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.azure-devops-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.azure-devops-help-tab {
  flex: 0 0 auto;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  color: #000;
  cursor: pointer;
}

.azure-devops-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.azure-devops-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #fff;
}

.azure-devops-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-devops-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-devops-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-devops-help-toc-list li {
  margin: 0 0 8px;
}

.azure-devops-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.azure-devops-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.azure-devops-help-doc-title {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 700;
}

.azure-devops-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.azure-devops-help-section {
  margin: 0 0 22px;
}

.azure-devops-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-devops-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-devops-help-content p,
.azure-devops-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-devops-help-content p {
  margin: 0 0 10px;
}

.azure-devops-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-devops-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-devops-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.azure-devops-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .azure-devops-help-main {
    grid-template-columns: 1fr;
  }

  .azure-devops-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function AzureDevOpsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `${PAGE_TITLE} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: PAGE_TITLE,
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="azure-devops-help-page">
      <style>{pageStyles}</style>
      <div className="azure-devops-help-window" role="presentation">
        <header className="azure-devops-help-titlebar">
          <span className="azure-devops-help-title">{PAGE_TITLE}</span>
          <div className="azure-devops-help-controls">
            <button
              className="azure-devops-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="azure-devops-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="azure-devops-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`azure-devops-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="azure-devops-help-main">
          <aside className="azure-devops-help-toc" aria-label="Table of contents">
            <h2 className="azure-devops-help-toc-title">Contents</h2>
            <ul className="azure-devops-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="azure-devops-help-content">
            <h1 className="azure-devops-help-doc-title">{PAGE_TITLE}</h1>
            <p className="azure-devops-help-doc-subtitle">{PAGE_SUBTITLE}</p>
            <p>{PAGE_INTRO}</p>

            {activeTab === 'big-picture' && (
              <>
                <section id="azure-overview" className="azure-devops-help-section">
                  <h2 className="azure-devops-help-heading">Overview</h2>
                  <p>
                    {PAGE_TITLE} is currently represented by a placeholder help entry in this
                    documentation set. The page keeps the route active and preserves the existing
                    summary while the topic is being expanded.
                  </p>
                  <p>{PAGE_INTRO}</p>
                </section>

                <hr className="azure-devops-help-divider" />

                <section id="azure-status" className="azure-devops-help-section">
                  <h2 className="azure-devops-help-heading">Documentation Status</h2>
                  <p>
                    The current draft is intentionally text-first and limited to the material
                    already published for this route.
                  </p>
                  <ul>
                    <li>Overview and key ideas will be added.</li>
                    <li>Core syntax, APIs, ecosystem, and architecture notes will be added.</li>
                    <li>Use cases, tradeoffs, and compare/contrast references will be added.</li>
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="azure-core-overview" className="azure-devops-help-section">
                  <h2 className="azure-devops-help-heading">Overview and Key Ideas</h2>
                  <p>Overview and key ideas will be added.</p>
                </section>

                <section id="azure-core-notes" className="azure-devops-help-section">
                  <h2 className="azure-devops-help-heading">Core Notes</h2>
                  <h3 className="azure-devops-help-subheading">
                    Syntax, APIs, Ecosystem, and Architecture
                  </h3>
                  <p>Core syntax, APIs, ecosystem, and architecture notes will be added.</p>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="azure-examples-status" className="azure-devops-help-section">
                  <h2 className="azure-devops-help-heading">Examples Status</h2>
                  <p>Detailed notes and examples will be added soon.</p>
                  <p>
                    This page does not currently publish code samples, so no code panels are shown
                    in this draft.
                  </p>
                </section>

                <section id="azure-examples-references" className="azure-devops-help-section">
                  <h2 className="azure-devops-help-heading">References</h2>
                  <p>Use cases, tradeoffs, and compare/contrast references will be added.</p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="azure-glossary-status" className="azure-devops-help-section">
                <h2 className="azure-devops-help-heading">Glossary Status</h2>
                <p>
                  Placeholder content for {PAGE_TITLE}. Detailed notes and examples will be added
                  soon.
                </p>
                <p>
                  Glossary terms have not been published yet. The current page preserves the route
                  and tab structure so the tab state can be restored with the URL.
                </p>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
