import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'A monolith and a modular monolith share one major trait: both are deployed as a single application unit. The difference is internal structure. A plain monolith may allow business capabilities to bleed across the codebase with weak boundaries. A modular monolith keeps one deployment unit but imposes stronger module boundaries, clearer ownership, and more deliberate dependency control inside that unit.',
  'This comparison matters because many teams think the only options are a simple monolith or a distributed microservices architecture. In reality, a modular monolith often provides the operational simplicity of a monolith with much better long-term maintainability. It is frequently the architectural middle ground that organizations need but fail to name clearly.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'A monolith is a single deployable application containing many features in one codebase and one runtime process or closely coupled deployment unit. That does not automatically mean the code is bad. A monolith can be well designed or badly designed. The term only describes the deployment shape.',
      'A modular monolith is also a single deployable application, but the internal code is split into well-defined modules with stronger boundaries, explicit dependencies, and clearer ownership. It aims to preserve simple operations while reducing the architectural entropy that often accumulates in large monoliths.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Share',
    paragraphs: [
      'Both approaches avoid the network overhead, distributed-system complexity, and operational burden of splitting every business capability into separately deployed services. Both can offer fast local development, simpler deployment pipelines, easier end-to-end debugging, and fewer infrastructure moving parts.',
      'This is why the comparison is important. A modular monolith is not a rejection of the monolith idea. It is an attempt to keep the good parts of monolithic deployment while improving the internal architecture.',
    ],
    bullets: [
      'Single deployment unit.',
      'Simpler operational model than distributed services.',
      'Local development without cross-service orchestration.',
      'Easier debugging when behavior stays inside one runtime boundary.',
    ],
  },
  {
    id: 'bp-when-monolith-fits',
    title: 'When a Plain Monolith Is Usually Good Enough',
    paragraphs: [
      'A plain monolith is often good enough when the system is still small, the team is small, and the domain boundaries are not yet clear enough to justify formal internal modularization. Early over-structuring can slow delivery if the software has not yet revealed where the real seams are.',
      'It is especially appropriate for early-stage products, small internal tools, and straightforward applications where the cost of internal architectural ceremony would exceed the value it brings.',
    ],
    bullets: [
      'Small codebases and small teams.',
      'Early-stage products with evolving domain understanding.',
      'Applications where speed of delivery matters more than long-term internal scale.',
      'Systems that genuinely remain simple over time.',
    ],
  },
  {
    id: 'bp-when-modular-monolith-fits',
    title: 'When a Modular Monolith Is Usually Better',
    paragraphs: [
      'A modular monolith is usually better when the system is large enough that internal coupling is becoming painful, but not so operationally complex that separate distributed services are clearly justified. It is a strong answer when teams need clearer domain boundaries, safer changes, and better ownership without introducing network boundaries.',
      'It is especially useful for growing products, multi-team applications, and systems where business capabilities are distinct enough to deserve boundaries but still benefit from one deployable runtime.',
    ],
    bullets: [
      'Growing codebases with coupling problems.',
      'Multi-team applications that still want simple deployment.',
      'Systems with emerging domain boundaries that should be enforced in code.',
      'Organizations that want to defer or avoid microservices complexity.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The right question is not whether monoliths are modern or whether modularity is fashionable. The right question is how much internal architectural discipline the application now needs, and whether that need can be satisfied without paying distributed-system costs.',
    ],
    bullets: [
      'Choose a plain monolith when the system is still truly small and fluid.',
      'Choose a modular monolith when coupling is rising but distributed services are not justified.',
      'Treat modularity as an internal scaling tool, not a branding exercise.',
      'Do not adopt microservices just because the monolith became uncomfortable.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-deployment-shape',
    title: 'Deployment Shape',
    paragraphs: [
      'A plain monolith and a modular monolith both deploy as one application. That is the key point many teams miss. A modular monolith is not halfway to microservices in deployment terms. It is still one artifact, one runtime boundary, and one operational unit.',
      'This is why modular monoliths can preserve many operational advantages: simpler deployment, fewer network failure modes, easier local setup, and simpler observability compared to distributed services.',
    ],
  },
  {
    id: 'core-internal-boundaries',
    title: 'Internal Boundaries',
    paragraphs: [
      'The main difference is whether the codebase enforces meaningful boundaries between business capabilities. In a plain monolith, modules may exist informally, but dependencies can drift until any part of the system can reach into any other part.',
      'In a modular monolith, modules have explicit boundaries, clearer contracts, and stricter dependency control. The point is not creating many folders. The point is limiting architectural bleed between capabilities.',
    ],
  },
  {
    id: 'core-team-scaling',
    title: 'Team Scaling and Ownership',
    paragraphs: [
      'A plain monolith can work very well for a small team because everyone can understand most of the system and changes remain local. As teams grow, that same openness can become a liability if ownership boundaries are vague and changes ripple unpredictably.',
      'A modular monolith supports team scaling better because modules can become units of ownership, review responsibility, and architectural accountability while still avoiding the overhead of separate deployments.',
    ],
  },
  {
    id: 'core-testing-debugging',
    title: 'Testing and Debugging',
    paragraphs: [
      'Both approaches benefit from running in one deployment boundary, which often makes integration testing and end-to-end debugging simpler than in distributed systems. There are fewer network hops, fewer deployment environments, and fewer moving parts to coordinate.',
      'A modular monolith improves this further by giving tests cleaner seams and module-scoped behavior. The architecture becomes easier to test because boundaries are more intentional, not because the deployment model changed.',
    ],
  },
  {
    id: 'core-coupling-risk',
    title: 'Coupling and Change Risk',
    paragraphs: [
      'The major risk of a plain monolith is uncontrolled internal coupling. Over time, business logic, persistence concerns, UI concerns, and cross-cutting utilities can tangle together until every change feels risky.',
      'A modular monolith addresses that risk by limiting how modules interact and by making business boundaries more explicit. It is an answer to monolithic entropy, not an abandonment of monolithic deployment.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-data-boundaries',
    title: 'Data Boundaries and Module Discipline',
    paragraphs: [
      'A plain monolith often ends up with a shared data layer that every part of the application reaches into directly. That can be workable early on, but it also makes it easy for one feature area to depend on the internal details of another.',
      'A modular monolith tries to limit that behavior. Modules may still share a physical database, but access patterns and ownership rules are more explicit. The architectural benefit comes from controlling how the code touches data, not merely where the tables live.',
    ],
  },
  {
    id: 'core-delivery-speed',
    title: 'Delivery Speed Over Time',
    paragraphs: [
      'A plain monolith is often fastest at the beginning because it imposes almost no structural overhead. Teams can ship quickly while the domain is still being discovered.',
      'A modular monolith is often faster in the medium and long term because it reduces the cost of understanding, changing, and testing larger systems. It trades a bit of upfront design discipline for lower future coordination cost.',
    ],
  },
  {
    id: 'core-migration-path',
    title: 'Migration and Evolution Path',
    paragraphs: [
      'A modular monolith is often a strong stepping stone when an organization may eventually extract services later. If modules have clear boundaries, it becomes much easier to identify what should stay together and what can safely split out.',
      'That does not mean a modular monolith exists merely to become microservices. Often it remains the best final architecture. The important point is that good boundaries preserve future options.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'A plain monolith often wins on simplicity of initial development. A modular monolith often wins on simplicity of long-term internal change. The tradeoff is between immediate freedom and disciplined maintainability.',
      'The mistake is to think that adding modules automatically solves architecture problems. Badly designed modules are just tangled code with prettier folder names. The value comes from real dependency control, ownership, and boundary clarity.',
    ],
    bullets: [
      'Use a plain monolith when early simplicity is genuinely enough.',
      'Use a modular monolith when internal scale is the real pain point.',
      'Do not confuse folder structure with architecture.',
      'Enforce boundaries in code and review, not only in diagrams.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'Start with the simplest structure that matches the actual problem. If the codebase is small, a plain monolith may be exactly right. As the domain clarifies and coupling pain appears, add module boundaries deliberately inside the monolith rather than jumping directly to distributed services.',
      'If the organization wants the operational simplicity of one deployable unit but the internal discipline of bounded capabilities, a modular monolith is often the best answer. It is especially strong when the team wants to scale code organization before scaling deployment topology.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-plain-monolith',
    title: 'Plain Monolith Shape',
    description: [
      'A plain monolith often starts as one application with broad internal freedom and relatively little enforced separation.',
    ],
    code: `app
  controllers
  services
  models
  utils
  repositories`,
    notes: [
      'This can be fast and effective early on.',
      'The risk appears when every area can depend on every other area without constraint.',
    ],
  },
  {
    id: 'examples-modular-monolith',
    title: 'Modular Monolith Shape',
    description: [
      'A modular monolith keeps one deployable unit but organizes code around explicit business modules.',
    ],
    code: `app
  billing
    api
    domain
    infrastructure
  catalog
    api
    domain
    infrastructure
  identity
    api
    domain
    infrastructure`,
    notes: [
      'The deployment remains one application.',
      'The architectural gain comes from clear boundaries inside that application.',
    ],
  },
  {
    id: 'examples-team-ownership',
    title: 'Ownership Contrast',
    description: [
      'The same deployment model can support very different team dynamics depending on internal structure.',
    ],
    code: `Plain monolith:
ownership often informal
cross-cutting changes frequent

Modular monolith:
module ownership clearer
cross-module dependencies more deliberate`,
    notes: [
      'This is one reason modular monoliths help as teams grow.',
      'They reduce coordination pain without requiring distributed deployment.',
    ],
  },
  {
    id: 'examples-evolution',
    title: 'Evolution Path',
    description: [
      'A modular monolith often creates better future options than an unstructured monolith.',
    ],
    code: `Early system:
plain monolith

Growing system:
modular monolith

Only if truly justified later:
selected service extraction`,
    notes: [
      'This is a common healthy progression.',
      'It avoids premature microservices while still investing in architectural quality.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-monolith',
    title: 'Monolith Terms',
    terms: [
      {
        term: 'Monolith',
        definition:
          'A system deployed as a single application unit rather than as many separately deployed services.',
      },
      {
        term: 'Tight Coupling',
        definition:
          'A condition where many parts of the system depend directly on each other’s internal details.',
      },
      {
        term: 'Shared Data Layer',
        definition:
          'A data access pattern where many parts of the application interact with the same persistence structures without strong ownership boundaries.',
      },
    ],
  },
  {
    id: 'glossary-modular',
    title: 'Modular Monolith Terms',
    terms: [
      {
        term: 'Module',
        definition:
          'A bounded internal area of the application with clear responsibilities and constrained dependencies.',
      },
      {
        term: 'Boundary',
        definition:
          'A rule or interface that limits how one part of the codebase can interact with another.',
      },
      {
        term: 'Internal Contract',
        definition:
          'The explicit API or dependency rule through which one module communicates with another.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Architecture Terms',
    terms: [
      {
        term: 'Deployment Unit',
        definition:
          'The artifact or runtime bundle that is built, shipped, and operated as one application.',
      },
      {
        term: 'Bounded Context',
        definition:
          'A conceptual domain boundary within which a specific model and language remain consistent.',
      },
      {
        term: 'Architectural Entropy',
        definition:
          'The gradual loss of boundary clarity and structural discipline as a system evolves.',
      },
      {
        term: 'Service Extraction',
        definition:
          'The act of moving one bounded capability out of a larger application into a separately deployed service.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'Shared Goal' },
    { id: 'bp-when-monolith-fits', label: 'When a Plain Monolith Fits' },
    { id: 'bp-when-modular-monolith-fits', label: 'When a Modular Monolith Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-deployment-shape', label: 'Deployment Shape' },
    { id: 'core-internal-boundaries', label: 'Internal Boundaries' },
    { id: 'core-team-scaling', label: 'Team Scaling and Ownership' },
    { id: 'core-testing-debugging', label: 'Testing and Debugging' },
    { id: 'core-coupling-risk', label: 'Coupling and Change Risk' },
    { id: 'core-data-boundaries', label: 'Data Boundaries and Module Discipline' },
    { id: 'core-delivery-speed', label: 'Delivery Speed Over Time' },
    { id: 'core-migration-path', label: 'Migration and Evolution Path' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-plain-monolith', label: 'Plain Monolith Shape' },
    { id: 'examples-modular-monolith', label: 'Modular Monolith Shape' },
    { id: 'examples-team-ownership', label: 'Ownership Contrast' },
    { id: 'examples-evolution', label: 'Evolution Path' },
  ],
  glossary: [
    { id: 'glossary-monolith', label: 'Monolith Terms' },
    { id: 'glossary-modular', label: 'Modular Monolith Terms' },
    { id: 'glossary-shared', label: 'Shared Architecture Terms' },
  ],
}

const pageStyles = `
.mono-modmono-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.mono-modmono-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.mono-modmono-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  min-height: 24px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.mono-modmono-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.mono-modmono-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.mono-modmono-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.mono-modmono-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.mono-modmono-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.mono-modmono-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.mono-modmono-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.mono-modmono-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.mono-modmono-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.mono-modmono-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.mono-modmono-help-toc-item {
  margin: 0 0 8px;
}

.mono-modmono-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.mono-modmono-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.mono-modmono-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.mono-modmono-help-section {
  margin: 0 0 20px;
}

.mono-modmono-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.mono-modmono-help-content p,
.mono-modmono-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.mono-modmono-help-content p {
  margin: 0 0 10px;
}

.mono-modmono-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.mono-modmono-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.mono-modmono-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.mono-modmono-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .mono-modmono-help-main {
    grid-template-columns: 1fr;
  }

  .mono-modmono-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .mono-modmono-help-page {
    min-height: auto;
  }

  .mono-modmono-help-window {
    min-height: auto;
  }

  .mono-modmono-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .mono-modmono-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    white-space: normal;
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

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="mono-modmono-help-section">
      <h2 className="mono-modmono-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="mono-modmono-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="mono-modmono-help-section">
      <h2 className="mono-modmono-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="mono-modmono-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="mono-modmono-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="mono-modmono-help-section">
      <h2 className="mono-modmono-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="mono-modmono-help-divider" />}
    </section>
  )
}

export default function MonolithVsModularMonolithPage(): JSX.Element {
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
    document.title = `Monolith vs Modular Monolith (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Monolith vs Modular Monolith',
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
    <div className="mono-modmono-help-page">
      <style>{pageStyles}</style>
      <div className="mono-modmono-help-window" role="presentation">
        <header className="mono-modmono-help-titlebar">
          <span className="mono-modmono-help-titletext">Monolith vs Modular Monolith</span>
          <div className="mono-modmono-help-controls">
            <button
              className="mono-modmono-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="mono-modmono-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="mono-modmono-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`mono-modmono-help-tab ${activeTab === tab.id ? 'mono-modmono-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mono-modmono-help-main">
          <aside className="mono-modmono-help-toc" aria-label="Table of contents">
            <h2 className="mono-modmono-help-toc-title">Contents</h2>
            <ul className="mono-modmono-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="mono-modmono-help-toc-item">
                  <a href={`#${section.id}`} className="mono-modmono-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="mono-modmono-help-content">
            <h1 className="mono-modmono-help-doc-title">Monolith vs Modular Monolith</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1),
                )
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) =>
                  renderExampleSection(section, index === exampleSections.length - 1),
                )
              : null}

            {activeTab === 'glossary'
              ? glossarySections.map((section, index) =>
                  renderGlossarySection(section, index === glossarySections.length - 1),
                )
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
