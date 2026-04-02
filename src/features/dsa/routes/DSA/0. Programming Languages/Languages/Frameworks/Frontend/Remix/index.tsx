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
      'Remix is a React framework centered on web fundamentals, route-based data loading, server-first mutations, and progressive enhancement. It treats loaders, actions, nested routes, and normal browser form behavior as primary architecture concepts rather than incidental implementation details.',
      'In practice, Remix is used for full-stack web applications where teams want a clear request-response model, explicit route boundaries, and a framework that stays close to the browser and HTTP platform instead of abstracting too much of it away.',
      'The original page scope was placeholder content for Remix. This help-style version keeps that scope while organizing the material into overview, key ideas, syntax, APIs, ecosystem, architecture, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why Teams Reach For Remix',
    paragraphs: [
      'Remix is attractive when the team wants data loading and mutations to follow a web-native model. Forms submit to route actions, routes load their own data, and nested layouts shape both UI and server data flow in a way that often feels conceptually clean.',
      'The practical appeal is that the framework turns common full-stack web concerns into explicit route-level structure. For teams that care about progressive enhancement and disciplined server-first application flow, this can feel clearer than more client-fetch-heavy approaches.',
    ],
  },
  {
    id: 'bp-scope',
    title: 'What This Page Covers',
    paragraphs: [
      'This page keeps all of the original planned concepts: overview and key ideas, core syntax, APIs, ecosystem, architecture, use cases, tradeoffs, and compare-and-contrast references that place Remix among other frontend and full-stack web options.',
      'The layout follows a text-first desktop help-document model so the page can be used as a reference rather than as a card-driven overview.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where Remix Fits Well',
    paragraphs: [
      'Remix is often a strong fit for server-first React applications, forms-heavy products, route-centric web apps, and teams that want to keep architecture closely aligned with browser behavior and HTTP semantics.',
      'It is especially attractive when the main challenge is maintaining conceptual clarity around data loading, mutations, and nested page composition rather than assembling the broadest possible framework platform.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Remix centers on nested routes, loaders, actions, and progressive enhancement.',
      'Its main strengths are web-native data flow, route-level clarity, and disciplined form and mutation handling.',
      'Its main tradeoffs usually involve narrower platform breadth than some competing React frameworks, a stronger server-first mindset requirement, and a smaller ecosystem footprint than the largest React framework ecosystems.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-key-ideas',
    title: 'Overview and Key Ideas',
    paragraphs: [
      'Remix treats the web request lifecycle as the center of application design. Routes define UI boundaries, data loading boundaries, mutation boundaries, and error boundaries, which often gives teams a very explicit structure for how applications should behave.',
      'The key ideas are nested routes, loaders for data, actions for writes, normal form semantics, and progressive enhancement so the application can remain aligned with browser behavior even as JavaScript enriches the experience.',
    ],
  },
  {
    id: 'core-routes',
    title: 'Route Modules',
    paragraphs: [
      'A Remix route module often combines the route component with its server-side loading and mutation functions. This means route files tend to become the natural place where UI structure and request-response behavior meet.',
      'That design is one of Remix\'s clearest strengths. It makes route boundaries matter architecturally instead of leaving teams to invent their own pattern for how page structure, data, and mutations should be connected.',
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      'Remix uses React component syntax, but its architecture is strongly shaped by framework primitives such as `loader`, `action`, `Form`, `Outlet`, `useLoaderData`, and related route APIs. The surface is not about custom template language so much as about how React code is organized around the web request model.',
      'This means the syntax feels familiar to React developers while still pushing them toward a more route-centered full-stack design than purely client-driven React applications often use.',
    ],
  },
  {
    id: 'core-data',
    title: 'Loaders and Data Flow',
    paragraphs: [
      'Loaders define what data a route needs on the server. The framework aligns that data with the route hierarchy, which can make it easier to reason about where data comes from and which route is responsible for it.',
      'This route-centered loading model is one of Remix\'s core architectural benefits. Instead of scattering page fetches across many client-side hooks, teams can place data requirements directly at the route boundary.',
    ],
  },
  {
    id: 'core-actions',
    title: 'Actions and Mutations',
    paragraphs: [
      'Actions handle writes such as form submissions. Remix encourages developers to let mutations feel like the web: forms submit, the server processes the request, and the framework revalidates the correct data.',
      'This keeps a strong connection between application behavior and ordinary browser semantics. For many teams, that makes full-stack mutation flow easier to explain and maintain than highly custom client-side orchestration.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs and Authoring Style',
    paragraphs: [
      'The Remix API surface is shaped more by route and request primitives than by a huge set of custom client-side abstractions. Common concepts include route modules, loaders, actions, nested layouts, `Outlet`, and hooks that read route-bound data or navigation state.',
      'That gives Remix a relatively focused feel. It is less about offering every possible platform feature and more about making a specific style of full-stack React application feel coherent.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Architecture',
    paragraphs: [
      'Remix has a smaller ecosystem footprint than the broadest React platforms, but its architecture has a clear conceptual center. The framework is known for its attention to forms, nested routing, server-first data flow, and progressive enhancement rather than for trying to be the largest possible application platform.',
      'Architecturally, this means Remix often feels narrower but more disciplined. Teams usually choose it because they want that discipline, not because they want the framework to answer every adjacent platform question out of the box.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Remix is frequently a strong fit for dashboards, content-driven apps, B2B products with substantial form workflows, internal tools, and server-first React applications that benefit from route-driven data and mutation boundaries.',
      'It is also attractive when progressive enhancement is a real product value rather than a secondary feature, because the framework is intentionally designed to keep that path natural.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Remix usually has a clearer conceptual center than broader React platforms, but it asks teams to think carefully about HTTP, form semantics, route modules, and server-first application design. For teams used to heavy client-side fetching, that can require a real mindset shift.',
      'Another tradeoff is ecosystem breadth. Remix has a strong reputation for architectural clarity, but the surrounding platform story is narrower than the biggest React frameworks that also carry more deployment, rendering-mode, and ecosystem gravity.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Remix is commonly compared with Next.js for web-native full-stack clarity versus broader platform breadth, with traditional SPA React stacks for route-centered server-first design versus client-fetch-heavy flexibility, and with other server-first frameworks for how directly it embraces browser and HTTP semantics.',
      'These comparisons help position Remix clearly: more focused than broad React platforms, more opinionated about data and mutations than plain React libraries, and especially strong when route-level clarity matters more than maximum framework surface area.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-route',
    title: 'Route Module Example',
    description:
      'A route module shows the core Remix idea: the route owns both its data loading contract and its rendered UI.',
    snippets: [
      {
        label: 'routes/users.tsx',
        code: `import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  const users = await getUsers()
  return json({ users })
}

export default function UsersRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <ul>
      {data.users.map((user) => (
        <li>{user.name}</li>
      ))}
    </ul>
  )
}`,
      },
    ],
    takeaway:
      'The route becomes the obvious place to define both the server data boundary and the UI that consumes it.',
  },
  {
    id: 'examples-action',
    title: 'Form and Action Example',
    description:
      'One of Remix\'s clearest strengths is making writes feel like ordinary web form submissions with explicit server handling.',
    snippets: [
      {
        label: 'routes/contact.tsx',
        code: `import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')

  await saveEmail(String(email))
  return redirect('/thanks')
}

export default function ContactRoute() {
  return (
    <Form method="post">
      <input name="email" type="email" />
      <button type="submit">Subscribe</button>
    </Form>
  )
}`,
      },
    ],
    takeaway:
      'Mutations stay close to the request-response model instead of forcing a separate client-side mutation framework for ordinary form work.',
  },
  {
    id: 'examples-patterns',
    title: 'Architecture Snapshot',
    description:
      'A typical Remix application treats route modules and nested layouts as the center of both UI composition and server data flow.',
    snippets: [
      {
        label: 'Common Stack',
        code: `React for component rendering
Remix route modules for loaders, actions, and nested layouts
Form-based mutation workflows aligned with browser semantics
Server-first data loading with route revalidation`,
      },
    ],
    takeaway:
      'The framework feels coherent because routing, data flow, and mutations all follow the same route-centered architecture.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Remix',
    definition: 'A React framework focused on nested routes, loaders, actions, and web-native full-stack application flow.',
  },
  {
    term: 'Loader',
    definition: 'A Remix route function that loads data for a route on the server.',
  },
  {
    term: 'Action',
    definition: 'A Remix route function that handles mutations such as form submissions.',
  },
  {
    term: 'Route module',
    definition: 'A file that commonly defines a route component together with its loader, action, and route-specific behavior.',
  },
  {
    term: 'Outlet',
    definition: 'The Remix component used to render nested child routes within a parent layout route.',
  },
  {
    term: 'Form',
    definition: 'A Remix component that enhances normal HTML form behavior while preserving web semantics.',
  },
  {
    term: 'Progressive enhancement',
    definition: 'A design approach where the application works from standard web behavior first and enhances from there.',
  },
  {
    term: 'Nested routes',
    definition: 'A routing structure where route hierarchy shapes both UI layout and data boundaries.',
  },
  {
    term: 'Revalidation',
    definition: 'The framework behavior that refreshes route data after mutations or navigation when needed.',
  },
  {
    term: 'useLoaderData',
    definition: 'A Remix hook used to read the data returned by the current route loader.',
  },
  {
    term: 'useActionData',
    definition: 'A Remix hook used to read the data returned by the current route action.',
  },
  {
    term: 'Request-response model',
    definition: 'The web architecture pattern where the browser makes a request and the server returns the next application state or data.',
  },
] as const

const helpStyles = `
.remix-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.remix-help-window {
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

.remix-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.remix-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.remix-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.remix-help-control {
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

.remix-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.remix-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.remix-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.remix-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.remix-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.remix-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.remix-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.remix-help-toc-list li {
  margin: 0 0 8px;
}

.remix-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.remix-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.remix-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.remix-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.remix-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.remix-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.remix-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.remix-help-content p,
.remix-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.remix-help-content p {
  margin: 0 0 10px;
}

.remix-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.remix-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.remix-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.remix-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .remix-help-main {
    grid-template-columns: 1fr;
  }

  .remix-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .remix-help-titletext {
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

export default function RemixPage(): JSX.Element {
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
    document.title = `Remix (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Remix',
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
    <div className="remix-help-page">
      <style>{helpStyles}</style>
      <div className="remix-help-window" role="presentation">
        <header className="remix-help-titlebar">
          <span className="remix-help-titletext">Remix</span>
          <div className="remix-help-controls">
            <button className="remix-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="remix-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="remix-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`remix-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="remix-help-main">
          <aside className="remix-help-toc" aria-label="Table of contents">
            <h2 className="remix-help-toc-title">Contents</h2>
            <ul className="remix-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="remix-help-content">
            <h1 className="remix-help-doc-title">Remix</h1>
            <p className="remix-help-doc-subtitle">
              Manual-style reference covering overview, route modules, loaders, actions, nested routing, ecosystem, architecture,
              use cases, tradeoffs, and examples.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="remix-help-section">
                    <h2 className="remix-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="remix-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="remix-help-section">
                  <h2 className="remix-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="remix-help-section">
                  <h2 className="remix-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="remix-help-subheading">{snippet.label}</h3>
                      <div className="remix-help-codebox">
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
              <section id="glossary-terms" className="remix-help-section">
                <h2 className="remix-help-heading">Glossary</h2>
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
