import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'SolidJS is a frontend library for building reactive user interfaces with fine-grained reactivity and JSX-based authoring. It is often discussed alongside component frameworks, but its identity is strongly tied to signals, direct DOM updates, and a runtime model that avoids broad component rerenders.',
      'In practice, SolidJS is used for interactive web applications, dashboards, embedded UI surfaces, and products where teams want a React-like JSX authoring experience with a smaller reactive surface and lower rendering overhead for many update patterns.',
      'The original page scope was placeholder content for SolidJS. This help-style version keeps that scope while organizing the material into overview, key ideas, syntax, APIs, ecosystem, architecture, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why Teams Reach For SolidJS',
    paragraphs: [
      'SolidJS is attractive when the team wants a highly reactive UI model without paying the mental or runtime cost of rerendering whole component functions after each state change. Signals, memos, and effects update exactly the dependent parts of the UI.',
      'The practical appeal is that components can still look familiar to developers coming from JSX-heavy stacks, while the underlying update model is more fine-grained and often more explicit about dependency relationships.',
    ],
  },
  {
    id: 'bp-scope',
    title: 'What This Page Covers',
    paragraphs: [
      'This page keeps all of the original planned concepts: overview and key ideas, core syntax, APIs, ecosystem, architecture, use cases, tradeoffs, and compare-and-contrast references that place SolidJS among other frontend options.',
      'The layout follows a text-first Win98 help-document style so the page reads like a reference manual rather than a card-based overview.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where SolidJS Fits Well',
    paragraphs: [
      'SolidJS is often a strong fit for teams that like JSX, care about rendering efficiency, and want direct control over reactive data flow without adopting a larger framework runtime. It is especially appealing when UI performance and reactive precision matter more than ecosystem breadth.',
      'It can also be a good fit for engineers who want a modern reactive model that feels closer to signals and dependency graphs than to rerender-driven component execution.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'SolidJS centers on fine-grained reactivity, signals, and JSX-based component authoring.',
      'Its main strengths are reactive precision, direct DOM updates, and a compact mental model for state propagation.',
      'Its main tradeoffs usually involve smaller ecosystem breadth, a more specialized mental model than mainstream React-style rerendering, and a less standardized application-platform story than the biggest frontend stacks.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-key-ideas',
    title: 'Overview and Key Ideas',
    paragraphs: [
      'SolidJS follows a fine-grained reactive model. Instead of rerendering whole component functions after each state change, it tracks dependencies between reactive values and the exact computations or DOM bindings that depend on them.',
      'The key ideas are signals for state, memos for derivation, effects for side effects, JSX for authoring UI structure, and a rendering model that updates only what actually depends on changed values.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Model',
    paragraphs: [
      'SolidJS components are usually functions written with JSX, which can make the surface look familiar to React developers. The important difference is that the component function typically runs once to establish the reactive graph rather than rerunning on every state update.',
      'That gives SolidJS a distinct feel. The component body sets up signals, derived computations, and event handlers, while reactive reads inside JSX stay connected to the fine-grained update system.',
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      'SolidJS uses JSX, but reactive values are commonly read by calling accessors such as `count()` instead of reading plain variables. Control flow is often handled with primitives such as `<Show>` and `<For>`, which make dependencies explicit and work well with the library\'s update model.',
      'This means the syntax looks familiar at first glance but behaves differently from rerender-driven JSX frameworks. The important habit is understanding where reactive reads happen and how those reads connect to computations and DOM updates.',
    ],
  },
  {
    id: 'core-reactivity',
    title: 'Reactivity Model',
    paragraphs: [
      'Fine-grained reactivity is the defining SolidJS concept. `createSignal` provides reactive state, `createMemo` derives cached values from dependencies, and `createEffect` runs effectful logic when dependencies change.',
      'Because SolidJS updates dependents directly, it often avoids the broad rerender work associated with component-level diffing models. That can make updates efficient and predictable, but it also means developers need to think in terms of reactive dependency edges rather than function reruns.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs and Authoring Style',
    paragraphs: [
      'SolidJS has a compact core API surface centered on reactive primitives and rendering helpers. Common building blocks include `createSignal`, `createMemo`, `createEffect`, `createResource`, and context-related helpers for shared state.',
      'The authoring style is usually praised for being direct once the signal mental model clicks. It rewards understanding of reactive reads and can feel very efficient for teams comfortable with explicit data-flow primitives.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Architecture',
    paragraphs: [
      'The Solid ecosystem is smaller than the largest frontend ecosystems, but it is organized around a clear reactive philosophy. Router support, data utilities, and surrounding tooling exist, and SolidStart provides the broader application-framework story for routing, server rendering, and full-stack workflows.',
      'Architecturally, this means teams often distinguish between SolidJS as the reactive UI library and SolidStart as the path to a more integrated app platform, much as other ecosystems distinguish component layers from broader application frameworks.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'SolidJS is frequently a good fit for dashboards, data-heavy interfaces, control panels, interactive widgets, and applications where highly responsive UI updates matter. It is also attractive for teams that want JSX ergonomics without adopting a rerender-driven model.',
      'For larger applications with routing, SSR, or server-aware workflows, teams often evaluate SolidJS together with SolidStart rather than in isolation.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'SolidJS offers a very strong local reactivity story, but the ecosystem is smaller and the reactive model is less familiar to the average frontend team than the mainstream React mental model. That can affect hiring, onboarding, and availability of long-tail third-party guidance.',
      'Another tradeoff is that the precision of the reactive system expects developers to reason accurately about dependency tracking. Used well, this is a strength. Used casually, it can confuse teams that still expect component reruns to be the default mechanism.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'SolidJS is commonly compared with React for JSX familiarity versus rerender semantics, with Vue for explicit reactivity versus signal-based fine-grained updates, and with Svelte for fine-grained reactivity versus compile-time component transformation.',
      'These comparisons help position SolidJS clearly: smaller and more reactive than broad framework ecosystems, more runtime-signal-oriented than compiler-first approaches, and more specialized in its mental model than mainstream component rerender systems.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Example',
    description:
      'A small component shows the SolidJS pattern of signal-based local state with JSX that reads reactive values through accessors.',
    snippets: [
      {
        label: 'Counter.tsx',
        code: `import { createMemo, createSignal } from 'solid-js'

export default function Counter() {
  const [count, setCount] = createSignal(0)
  const isEven = createMemo(() => count() % 2 === 0)

  return (
    <>
      <button onClick={() => setCount((value) => value + 1)}>
        Count: {count()}
      </button>
      <p>{isEven() ? 'even' : 'odd'}</p>
    </>
  )
}`,
      },
    ],
    takeaway:
      'The UI updates where the signal is read, without rerendering the whole component function after each increment.',
  },
  {
    id: 'examples-derived',
    title: 'Derived State Example',
    description:
      'Memos model derived values in a way that stays explicit about dependencies while avoiding unnecessary recomputation.',
    snippets: [
      {
        label: 'PriceSummary.tsx',
        code: `import { createMemo } from 'solid-js'

export default function PriceSummary(props: {
  items: Array<{ price: number }>
}) {
  const total = createMemo(() =>
    props.items.reduce((sum, item) => sum + item.price, 0)
  )

  return <p>Total: {total()}</p>
}`,
      },
    ],
    takeaway:
      'Derived state is modeled as a reactive computation rather than as a rerender-time expression alone.',
  },
  {
    id: 'examples-patterns',
    title: 'Architecture Snapshot',
    description:
      'A typical Solid application separates the reactive UI layer from the broader application shell when routing or SSR becomes important.',
    snippets: [
      {
        label: 'Common Stack',
        code: `SolidJS core for signals, memos, effects, and JSX rendering
Solid Router or routing utilities for navigation
SolidStart when SSR, file-based routing, and app-platform behavior are needed
Context or module patterns for shared application state`,
      },
    ],
    takeaway:
      'The ecosystem story is narrower than the largest stacks, but it is coherent once the team distinguishes SolidJS from the broader app framework layer.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'SolidJS',
    definition: 'A reactive UI library centered on signals, fine-grained updates, and JSX-based component authoring.',
  },
  {
    term: 'Signal',
    definition: 'A reactive state primitive that tracks reads and notifies dependents when the value changes.',
  },
  {
    term: 'createSignal',
    definition: 'A SolidJS API that creates a reactive value accessor and a setter.',
  },
  {
    term: 'createMemo',
    definition: 'A SolidJS API for derived reactive values that recompute when dependencies change.',
  },
  {
    term: 'createEffect',
    definition: 'A SolidJS API for running side-effectful logic in response to reactive changes.',
  },
  {
    term: 'Fine-grained reactivity',
    definition: 'A model where updates target the exact computations or DOM bindings that depend on changed state.',
  },
  {
    term: 'Accessor',
    definition: 'The function form used to read a reactive value such as `count()` from a signal.',
  },
  {
    term: 'JSX',
    definition: 'The syntax used to express UI structure in SolidJS component functions.',
  },
  {
    term: 'Show',
    definition: 'A SolidJS control-flow helper for conditional rendering.',
  },
  {
    term: 'For',
    definition: 'A SolidJS control-flow helper for rendering lists reactively.',
  },
  {
    term: 'createResource',
    definition: 'A SolidJS helper for async reactive data loading patterns.',
  },
  {
    term: 'SolidStart',
    definition: 'The broader Solid application framework used for routing, SSR, and full-stack workflows.',
  },
] as const

const helpStyles = `
.solid-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.solid-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.solid-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.solid-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.solid-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.solid-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
}

.solid-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.solid-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.solid-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.solid-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.solid-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.solid-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.solid-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.solid-help-toc-list li {
  margin: 0 0 8px;
}

.solid-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.solid-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.solid-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.solid-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.solid-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.solid-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.solid-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.solid-help-content p,
.solid-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.solid-help-content p {
  margin: 0 0 10px;
}

.solid-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.solid-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.solid-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.solid-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .solid-help-main {
    grid-template-columns: 1fr;
  }

  .solid-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .solid-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    padding-left: 4px;
    white-space: normal;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function SolidJsPage(): JSX.Element {
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
    document.title = `SolidJS (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'SolidJS',
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
    <div className="solid-help-page">
      <style>{helpStyles}</style>
      <div className="solid-help-window" role="presentation">
        <header className="solid-help-titlebar">
          <span className="solid-help-titletext">SolidJS</span>
          <div className="solid-help-controls">
            <button className="solid-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="solid-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="solid-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`solid-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="solid-help-main">
          <aside className="solid-help-toc" aria-label="Table of contents">
            <h2 className="solid-help-toc-title">Contents</h2>
            <ul className="solid-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="solid-help-content">
            <h1 className="solid-help-doc-title">SolidJS</h1>
            <p className="solid-help-doc-subtitle">
              Manual-style reference covering overview, signals, fine-grained reactivity, JSX authoring, ecosystem, architecture,
              use cases, tradeoffs, and examples.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="solid-help-section">
                    <h2 className="solid-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="solid-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="solid-help-section">
                  <h2 className="solid-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="solid-help-section">
                  <h2 className="solid-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="solid-help-subheading">{snippet.label}</h3>
                      <div className="solid-help-codebox">
                        <code>{snippet.code}</code>
                      </div>
                    </Fragment>
                  ))}
                  <p>
                    <strong>Takeaway:</strong> {example.takeaway}
                  </p>
                </section>
              ))}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="solid-help-section">
                <h2 className="solid-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
