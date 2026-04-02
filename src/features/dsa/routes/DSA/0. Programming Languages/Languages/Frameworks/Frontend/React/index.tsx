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
      'React is a UI library for building component-based user interfaces with declarative rendering and a broad surrounding ecosystem. It focuses first on describing interface structure and state-driven updates rather than defining a complete application framework by itself.',
      'In practice, React is used for dashboards, product interfaces, design systems, content applications, internal tools, and large front-end products. Many teams also adopt React-based frameworks when routing, SSR, server-side data flow, or broader platform structure becomes important.',
      'The original page scope was placeholder content for React. This help-style version keeps that scope while organizing the material into overview, key ideas, syntax, APIs, ecosystem, architecture, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why Teams Reach For React',
    paragraphs: [
      'React is attractive when the team wants a component-library-first model, JSX-based authoring, and freedom to choose surrounding tools deliberately. That flexibility is one of its defining strengths because teams can scale from small widgets to large application ecosystems without starting from a single all-in framework.',
      'The practical appeal is not only the component model. React also has one of the largest front-end ecosystems, which gives teams access to extensive libraries, frameworks, educational material, hiring familiarity, and long-lived architectural patterns.',
    ],
  },
  {
    id: 'bp-scope',
    title: 'What This Page Covers',
    paragraphs: [
      'This page keeps all of the original planned concepts: overview and key ideas, core syntax, APIs, ecosystem, architecture, use cases, tradeoffs, and compare-and-contrast references that place React among other front-end options.',
      'The layout follows a text-first desktop help-document model so the page reads like a reference manual instead of a card-based landing page.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where React Fits Well',
    paragraphs: [
      'React is often a strong fit when the team values flexibility, incremental adoption, and an ecosystem large enough to support very different application shapes. It is especially attractive in organizations already deep in JavaScript or TypeScript front-end work.',
      'It is also a strong fit when a company wants to standardize around one broad component model while still leaving room for different routing, data, state, and framework choices across products.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'React centers on components, JSX, and state-driven rerendering.',
      'Its main strengths are ecosystem breadth, composability, and flexibility in surrounding architecture.',
      'Its main tradeoffs usually involve the need to choose more surrounding tools, higher variance between codebases, and the fact that React alone is a UI library rather than a full application framework.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-key-ideas',
    title: 'Overview and Key Ideas',
    paragraphs: [
      'React follows a declarative UI model where components describe how the interface should look for a given state. Instead of imperatively updating the DOM in many places, developers update state and let the framework coordinate the resulting UI changes.',
      'The key ideas are reusable components, props for inputs, hooks for state and related behavior, and a rendering model built around state changes and rerendering.',
    ],
  },
  {
    id: 'core-library',
    title: 'Library Scope',
    paragraphs: [
      'React is primarily a UI library rather than a full framework. It focuses on rendering and component composition, while routing, data fetching, forms, and broader application structure often come from the ecosystem or from a React-based framework.',
      'This scope is one of React\'s biggest advantages and one of its biggest costs. Teams get freedom, but they also inherit responsibility for choosing and maintaining surrounding architecture.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Model',
    paragraphs: [
      'Modern React components are usually JavaScript or TypeScript functions written with JSX. Logic and UI structure live together in the component body, which many teams find natural because conditions, loops, and composition all remain inside one language model.',
      'This function-component style is now the normal React mental model. Hooks provide the mechanism for local state, effects, context usage, and related behaviors within those components.',
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      'React uses JSX, a syntax extension that lets developers express UI structure inside JavaScript or TypeScript. JSX looks similar to HTML in many places, but it follows JavaScript expression rules and component composition semantics.',
      'This makes rendering feel code-centric rather than template-centric. For teams that like UI and logic to live in the same language surface, JSX is one of React\'s defining ergonomic choices.',
    ],
  },
  {
    id: 'core-hooks',
    title: 'Hooks and State',
    paragraphs: [
      'Hooks such as `useState`, `useEffect`, and `useContext` let function components use state, side effects, and shared values. More advanced hooks and custom hooks help teams extract logic into reusable units without moving back to older class-based component patterns.',
      'React state changes typically trigger rerendering for affected components, and derived UI is often expressed directly in render logic. That model is powerful, but it means state architecture still needs discipline as applications grow.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs and Authoring Style',
    paragraphs: [
      'React\'s authoring style is shaped by function components, hooks, context, refs, and JSX. Modern React guidance also includes concurrency-aware primitives such as transitions and deferred values, and tooling like the React Compiler is intended to reduce some performance-related boilerplate in common patterns.',
      'The important point is that the visible React API is relatively small compared with a full framework. Much of the broader developer experience comes from how teams combine React with routing, server-state, form, and framework choices around it.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Architecture',
    paragraphs: [
      'React has one of the largest front-end ecosystems in the industry. Teams can choose from a huge range of solutions for routing, forms, animation, design systems, state management, server data, and application frameworks.',
      'That breadth is a real strategic advantage, but it also means there is no single canonical React architecture for every application. Healthy React codebases usually succeed by deliberately narrowing choices and enforcing shared conventions.',
    ],
  },
  {
    id: 'core-platform',
    title: 'React and Higher-Level Frameworks',
    paragraphs: [
      'React often becomes part of a broader app-platform discussion because many teams adopt a React-based framework for routing, SSR, streaming, or server-side workflows instead of using plain React alone. This is why conversations about React frequently overlap with conversations about frameworks built on top of it.',
      'The practical engineering question is not only whether React can render the UI. It is whether the project wants plain React plus selected libraries, or a surrounding React framework that provides more structure from the start.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'React is commonly used for SaaS dashboards, consumer-facing products, design systems, admin panels, content products, e-commerce front ends, and embedded interface islands inside larger applications.',
      'It also works well for incremental adoption because teams can introduce it into part of an application and later grow into more structured architecture if the product expands.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'React can feel approachable at the component level but complex at the application-architecture level because many important choices are intentionally left open. Routing, state strategy, forms, server data, and SSR usually require surrounding decisions rather than a single official answer from core React.',
      'Another tradeoff is that ecosystem freedom creates variance. Two React codebases can feel very different from each other depending on the conventions and libraries a team chose, which affects onboarding and long-term consistency.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'React is commonly compared with Vue for library-first flexibility versus more integrated framework ergonomics, with Angular for UI-library scope versus full-framework structure, and with other modern UI systems for how they model reactivity and application architecture.',
      'These comparisons help position React clearly: broader in ecosystem than many alternatives, lighter in framework scope than batteries-included platforms, and strongest when the team values flexibility enough to own surrounding architectural choices.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Example',
    description:
      'A small function component shows the normal React authoring pattern: hooks for local state and JSX for rendered structure.',
    snippets: [
      {
        label: 'Counter.tsx',
        code: `import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      Count: {count}
    </button>
  )
}`,
      },
    ],
    takeaway:
      'The core React experience is function components plus hooks, with rendering expressed directly in JSX.',
  },
  {
    id: 'examples-derived',
    title: 'Derived State Example',
    description:
      'React often expresses derived UI state through ordinary JavaScript expressions inside the render path rather than through a separate dedicated reactive primitive.',
    snippets: [
      {
        label: 'PriceSummary.tsx',
        code: `export default function PriceSummary(props: {
  items: Array<{ price: number }>
}) {
  const total = props.items.reduce((sum, item) => sum + item.price, 0)

  return <p>Total: {total}</p>
}`,
      },
    ],
    takeaway:
      'A large part of React\'s appeal is that many UI derivations stay as plain JavaScript rather than requiring a separate template or reactive API.',
  },
  {
    id: 'examples-patterns',
    title: 'Architecture Snapshot',
    description:
      'A typical React application separates the core UI library from the surrounding architectural choices that shape the full product.',
    snippets: [
      {
        label: 'Common Stack',
        code: `React core for components and hooks
Routing chosen through a React router or a React-based framework
Server-state, forms, and shared state chosen from ecosystem tools
Optional higher-level framework when SSR or platform structure is needed`,
      },
    ],
    takeaway:
      'React\'s flexibility is real, but it means the team must be deliberate about the architecture around the library.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'React',
    definition: 'A UI library for building component-based user interfaces with declarative rendering.',
  },
  {
    term: 'JSX',
    definition: 'A JavaScript or TypeScript syntax extension used to describe UI structure inside React component code.',
  },
  {
    term: 'Hook',
    definition: 'A React function such as `useState` or `useEffect` that lets function components access React features.',
  },
  {
    term: 'Function component',
    definition: 'The modern React component form where a function returns JSX and uses hooks for state and related behavior.',
  },
  {
    term: 'Props',
    definition: 'Inputs passed from a parent component to a child component.',
  },
  {
    term: 'State',
    definition: 'Component-managed data that can change over time and trigger rerendering.',
  },
  {
    term: 'Context',
    definition: 'A React feature for passing values through the component tree without manual prop drilling.',
  },
  {
    term: 'Rerender',
    definition: 'The process where React runs component rendering logic again after relevant state or props change.',
  },
  {
    term: 'Custom hook',
    definition: 'A reusable function that combines React hooks into a shareable unit of logic.',
  },
  {
    term: 'Transition',
    definition: 'A React mechanism for marking some updates as lower-priority so urgent UI work can stay responsive.',
  },
  {
    term: 'Deferred value',
    definition: 'A React mechanism for letting some rendered values lag behind urgent state changes to improve responsiveness.',
  },
  {
    term: 'Component tree',
    definition: 'The hierarchy of React components that together make up an application interface.',
  },
] as const

const helpStyles = `
.react-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.react-help-window {
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

.react-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.react-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.react-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.react-help-control {
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

.react-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.react-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.react-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.react-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.react-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.react-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.react-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.react-help-toc-list li {
  margin: 0 0 8px;
}

.react-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.react-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.react-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.react-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.react-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.react-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.react-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.react-help-content p,
.react-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.react-help-content p {
  margin: 0 0 10px;
}

.react-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.react-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.react-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.react-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .react-help-main {
    grid-template-columns: 1fr;
  }

  .react-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .react-help-titletext {
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

export default function ReactPage(): JSX.Element {
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
    document.title = `React (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'React',
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
    <div className="react-help-page">
      <style>{helpStyles}</style>
      <div className="react-help-window" role="presentation">
        <header className="react-help-titlebar">
          <span className="react-help-titletext">React</span>
          <div className="react-help-controls">
            <button className="react-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="react-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="react-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`react-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="react-help-main">
          <aside className="react-help-toc" aria-label="Table of contents">
            <h2 className="react-help-toc-title">Contents</h2>
            <ul className="react-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="react-help-content">
            <h1 className="react-help-doc-title">React</h1>
            <p className="react-help-doc-subtitle">
              Manual-style reference covering overview, JSX, hooks, ecosystem shape, architecture, use cases, tradeoffs, and
              examples.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="react-help-section">
                    <h2 className="react-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="react-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="react-help-section">
                  <h2 className="react-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="react-help-section">
                  <h2 className="react-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="react-help-subheading">{snippet.label}</h3>
                      <div className="react-help-codebox">
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
              <section id="glossary-terms" className="react-help-section">
                <h2 className="react-help-heading">Glossary</h2>
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
