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
      'Svelte is a component framework with a compiler-first model. Instead of relying as heavily on a large generic browser runtime, it pushes more work into compilation so components can ship with smaller, more specialized update logic.',
      'In practice, Svelte is used for modern interactive frontends, single-page applications, content-heavy interfaces, and products that value concise component authoring with low runtime ceremony. For broader application concerns such as routing, data loading, form actions, and SSR, the ecosystem becomes most complete when paired with SvelteKit.',
      'The original page scope was placeholder content for Svelte. This help-style version keeps that scope while organizing the material into overview, key ideas, syntax, APIs, ecosystem, architecture, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why Teams Reach For Svelte',
    paragraphs: [
      'Svelte is attractive when teams want component code to stay small, direct, and close to ordinary HTML, CSS, and JavaScript. The framework tries to reduce ceremony rather than expand the visible runtime abstraction.',
      'That often makes local UI work feel unusually readable. Developers can move quickly because the component layer stays lean while the compiler handles much of the framework-specific machinery ahead of time.',
    ],
  },
  {
    id: 'bp-scope',
    title: 'What This Page Covers',
    paragraphs: [
      'This page keeps the original planned concepts: overview and key ideas, core syntax, APIs, ecosystem, architecture, use cases, tradeoffs, and compare-and-contrast references that help place Svelte among other frontend options.',
      'The layout follows a classic desktop help-document model so the content can be scanned as a reference rather than as a card-based landing page.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where Svelte Fits Well',
    paragraphs: [
      'Svelte is often a strong fit for small to medium teams that care about direct component authoring, lightweight shipped code, and a framework that stays relatively close to platform primitives. It is especially compelling when the biggest pain is framework friction rather than lack of framework structure.',
      'It can also be a strong choice for products that benefit from SvelteKit\'s cohesive routing and SSR story, as long as the team is comfortable with a smaller ecosystem surface than the largest frontend stacks.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Svelte emphasizes compile-time specialization and low runtime overhead.',
      'Its main strengths are directness, concise components, and strong developer ergonomics.',
      'Its main tradeoffs usually involve smaller ecosystem breadth, lower built-in organizational scaffolding, and the need to distinguish raw Svelte from the broader SvelteKit application story.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-key-ideas',
    title: 'Overview and Key Ideas',
    paragraphs: [
      'Svelte aims to make reactive UI authoring feel close to normal web development while using compilation to produce efficient update code. The result is a framework that often feels less ceremonious in component code than alternatives built around a larger generic runtime.',
      'The key ideas are component composition, compile-time specialization, direct template syntax, and a reactive model that keeps state and derivation close to ordinary script authoring.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Structure',
    paragraphs: [
      'A Svelte component typically colocates script, markup, and style in a single `.svelte` file. That keeps component structure compact and easy to read without requiring separate framework-specific files for ordinary UI work.',
      'This single-file model is similar in spirit to other component systems, but Svelte usually feels terser because the template and reactive syntax are intentionally lightweight.',
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      'Svelte templates stay visually close to ordinary markup while adding focused control-flow and binding constructs such as `{#if}`, `{#each}`, `on:click`, and `bind:value`. Many developers find that this keeps templates readable because the framework grammar stays relatively small.',
      'Interpolation uses braces directly in markup, and two-way binding for common inputs is concise. This is one reason Svelte is frequently described as low-friction for ordinary form and component work.',
    ],
  },
  {
    id: 'core-reactivity',
    title: 'Reactivity Model',
    paragraphs: [
      'Modern Svelte is best discussed in its runes-based context. Reactive state and derivation are commonly expressed with primitives such as `$state`, `$derived`, and `$effect`, which make intent more explicit than older shorthand narratives sometimes suggest.',
      'This model still feels lightweight because the reactivity is tightly integrated with compilation. Local component state often reads like direct script logic rather than usage of a large runtime API surface.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs and Authoring Style',
    paragraphs: [
      'The public framework surface is intentionally smaller than many alternatives. Much of the experience comes from the component file format, reactive runes, event and binding syntax, and the compiler itself rather than from a large set of branded runtime primitives.',
      'That can be a real advantage for teams that want a compact mental model. It also means teams need to stay precise about version-sensitive guidance, because older store-first tutorials do not always reflect modern Svelte usage.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Architecture',
    paragraphs: [
      'Svelte by itself is primarily the component layer. The broader application story commonly comes from SvelteKit, which provides routing, layouts, data loading, SSR, and form actions as an official application framework around Svelte.',
      'Architecturally, that means many real decisions are not about raw Svelte in isolation. They are about Svelte plus SvelteKit, especially when navigation, server rendering, and request-response workflows matter.',
    ],
  },
  {
    id: 'core-state',
    title: 'State and Shared Data',
    paragraphs: [
      'Svelte handles local state elegantly inside components. For broader sharing, teams can use module patterns, context, and stores. Modern guidance is more selective about stores than older tutorials were, because not every shared-state problem needs a classic store abstraction.',
      'This smaller state surface can feel freeing, but it also shifts more responsibility onto the team to keep architecture disciplined as an application grows.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Svelte is frequently used for interactive dashboards, marketing sites with rich behavior, content-heavy web apps, smaller product teams, and applications where compact components and low runtime overhead are primary advantages.',
      'It is also attractive for apps that benefit from SvelteKit\'s integrated SSR and form-handling workflows, especially when a cohesive app platform matters as much as the component model itself.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Svelte often wins on directness, but that same low-ceremony model can provide fewer visible guardrails in large organizations. Teams with uneven architecture practices may need to impose more conventions themselves as complexity increases.',
      'Another tradeoff is ecosystem size. Svelte has a strong reputation for developer satisfaction, but the third-party library surface, hiring pool, and long-tail example volume are still smaller than the largest frontend ecosystems.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Svelte is commonly compared with Vue for compiler-first directness versus runtime reactivity and framework cohesion, with React for low-ceremony authoring versus ecosystem breadth, and with Angular for lightweight component ergonomics versus a larger integrated application framework.',
      'These comparisons help position Svelte clearly: leaner than a batteries-included framework, more compiler-centered than runtime-oriented frameworks, and usually more dependent on team discipline when scaling architectural complexity.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Example',
    description:
      'A small component shows the modern Svelte pattern of explicit local state with runes and markup that stays close to ordinary HTML.',
    snippets: [
      {
        label: 'Counter.svelte',
        code: `<script lang="ts">
  let count = $state(0)
  let isEven = $derived(count % 2 === 0)
</script>

<button on:click={() => count += 1}>
  Count: {count}
</button>

<p>{isEven ? 'even' : 'odd'}</p>`,
      },
    ],
    takeaway:
      'The example stays compact because state, derivation, and markup are all expressed with very little framework ceremony.',
  },
  {
    id: 'examples-binding',
    title: 'Form Binding Example',
    description:
      'Svelte keeps common form interactions short. Binding syntax is direct, which is one reason many developers like it for everyday UI work.',
    snippets: [
      {
        label: 'NewsletterForm.svelte',
        code: `<script lang="ts">
  let email = $state('')
  let subscribed = $state(true)
</script>

<input bind:value={email} type="email" placeholder="Email" />
<input bind:checked={subscribed} type="checkbox" />

<p>{email} / subscribed: {subscribed ? 'yes' : 'no'}</p>`,
      },
    ],
    takeaway:
      'For local forms, the framework stays out of the way and lets bindings read almost like plain markup annotations.',
  },
  {
    id: 'examples-architecture',
    title: 'Application Snapshot',
    description:
      'A typical Svelte production setup separates the component layer from the broader application framework story.',
    snippets: [
      {
        label: 'Common Stack',
        code: `Svelte for component authoring
SvelteKit for routing, layouts, load functions, and SSR
Context, modules, or stores for shared state when needed
TypeScript where stronger contracts help maintainability`,
      },
    ],
    takeaway:
      'The cleanest mental model is to treat Svelte as the component framework and SvelteKit as the official path for larger app behavior.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Svelte',
    definition: 'A compiler-first component framework for building reactive user interfaces.',
  },
  {
    term: 'SvelteKit',
    definition: 'The official application framework around Svelte that provides routing, data loading, SSR, and form actions.',
  },
  {
    term: 'Rune',
    definition: 'A modern Svelte reactive primitive such as `$state`, `$derived`, or `$effect`.',
  },
  {
    term: '$state',
    definition: 'A Svelte rune used to declare reactive local state in component code.',
  },
  {
    term: '$derived',
    definition: 'A Svelte rune used to express derived values computed from reactive state.',
  },
  {
    term: '$effect',
    definition: 'A Svelte rune used to run effectful logic in response to reactive changes.',
  },
  {
    term: 'Store',
    definition: 'A subscribable state contract still useful for some shared or asynchronous state scenarios.',
  },
  {
    term: 'bind:value',
    definition: 'Svelte syntax for binding an input value directly to component state.',
  },
  {
    term: '{#if}',
    definition: 'A Svelte control-flow block used for conditional rendering in markup.',
  },
  {
    term: '{#each}',
    definition: 'A Svelte control-flow block used for rendering lists from iterable data.',
  },
  {
    term: 'Load function',
    definition: 'A SvelteKit route-level function used to fetch data for a page or layout.',
  },
  {
    term: 'Form action',
    definition: 'A SvelteKit server-side mutation workflow connected directly to HTML forms.',
  },
] as const

const helpStyles = `
.svelte-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.svelte-help-window {
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

.svelte-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.svelte-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.svelte-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.svelte-help-control {
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

.svelte-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.svelte-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.svelte-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.svelte-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.svelte-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.svelte-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.svelte-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.svelte-help-toc-list li {
  margin: 0 0 8px;
}

.svelte-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.svelte-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.svelte-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.svelte-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.svelte-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.svelte-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.svelte-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.svelte-help-content p,
.svelte-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.svelte-help-content p {
  margin: 0 0 10px;
}

.svelte-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.svelte-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.svelte-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.svelte-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .svelte-help-main {
    grid-template-columns: 1fr;
  }

  .svelte-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .svelte-help-titletext {
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

export default function SveltePage(): JSX.Element {
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
    document.title = `Svelte (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Svelte',
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
    <div className="svelte-help-page">
      <style>{helpStyles}</style>
      <div className="svelte-help-window" role="presentation">
        <header className="svelte-help-titlebar">
          <span className="svelte-help-titletext">Svelte</span>
          <div className="svelte-help-controls">
            <button className="svelte-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="svelte-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="svelte-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`svelte-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="svelte-help-main">
          <aside className="svelte-help-toc" aria-label="Table of contents">
            <h2 className="svelte-help-toc-title">Contents</h2>
            <ul className="svelte-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="svelte-help-content">
            <h1 className="svelte-help-doc-title">Svelte</h1>
            <p className="svelte-help-doc-subtitle">
              Manual-style reference covering overview, compiler model, runes, SvelteKit, shared state, use cases, tradeoffs,
              and examples.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="svelte-help-section">
                    <h2 className="svelte-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="svelte-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="svelte-help-section">
                  <h2 className="svelte-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="svelte-help-section">
                  <h2 className="svelte-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="svelte-help-subheading">{snippet.label}</h3>
                      <div className="svelte-help-codebox">
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
              <section id="glossary-terms" className="svelte-help-section">
                <h2 className="svelte-help-heading">Glossary</h2>
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
