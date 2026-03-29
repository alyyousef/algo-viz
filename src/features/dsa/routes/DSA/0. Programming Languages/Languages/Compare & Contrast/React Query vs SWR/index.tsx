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

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'React Query, now part of TanStack Query, and SWR are both React libraries for handling remote server state, but they have different design personalities. TanStack Query is a broader server-state toolkit with extensive caching, invalidation, mutations, optimistic updates, pagination, query lifecycle controls, and surrounding infrastructure. SWR is a lighter, more minimal data-fetching model centered on cache, stale-while-revalidate behavior, and ergonomic React usage.',
      'The practical question is not which one can fetch data at all. Both can. The more useful question is whether the app wants a rich server-state management system with explicit query client machinery and many knobs, or a smaller API with strong defaults for fetching, caching, and revalidation.',
      'The original page scope was placeholder content for React Query vs SWR, with planned notes on overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs. This help-style version keeps that scope and expands it into a fuller reference page.',
    ],
  },
  {
    id: 'bp-react-query',
    title: 'When React Query Fits Better',
    paragraphs: [
      'TanStack Query is often the stronger fit when the application has complex server-state needs: many data dependencies, mutations, optimistic updates, invalidation strategy, pagination or infinite loading, background synchronization, or coordinated query behavior across a larger app surface.',
      'It is particularly attractive when the team wants a deliberate server-state system rather than a simple data-fetch hook. Query keys, invalidation, query client configuration, mutation lifecycles, caching policies, and tooling become part of the applications architecture.',
    ],
  },
  {
    id: 'bp-swr',
    title: 'When SWR Fits Better',
    paragraphs: [
      'SWR is often the stronger fit when the application wants a simpler, lighter data-fetching model with built-in caching and revalidation but without the broader management surface of a full query system. It is especially attractive in apps that primarily need fetch, cache, revalidate, and render.',
      'It also fits well when the team values a minimal API surface and wants the library to stay close to plain React data fetching rather than becoming a deeper orchestration layer. In many product codebases, SWR feels easier to adopt when the remote state model is relatively straightforward.',
    ],
  },
  {
    id: 'bp-same-space',
    title: 'Same Space, Different Scope',
    paragraphs: [
      'Both libraries solve the pain of remote data fetching, caching, and keeping UI synchronized with server results. Both support automatic revalidation patterns, optimistic update options, pagination support, and typed React usage.',
      'The main difference is scope. TanStack Query aims to be a full server-state management layer. SWR aims to keep data fetching fast, cached, and fresh with a smaller conceptual surface.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to compare only hook signatures. The real difference is whether the team wants to reason about invalidation, mutation coordination, query lifecycle, and cache control as first-class architecture.',
      'Another mistake is to treat minimalism as always better or feature depth as always better. A small API is a strength when the use case is simple. A richer query system is a strength when the app actually needs it.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose TanStack Query when server state is complex enough to deserve an explicit management layer.',
      'Choose SWR when the app mainly wants elegant fetch-cache-revalidate behavior with a smaller API surface.',
      'If the product has many mutations, invalidation rules, and coordinated data workflows, TanStack Query usually scales better. If the product is simpler and wants minimalism, SWR often feels cleaner.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both libraries are designed for server state rather than ordinary local component state. Both help React applications avoid repetitive loading, caching, retry, focus-refetch, and stale-data boilerplate.',
      'That means either can dramatically improve code quality over ad hoc useEffect-plus-fetch patterns. The question is how much server-state structure the application actually needs.',
    ],
  },
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'TanStack Query encourages thinking in queries, query keys, mutations, invalidation, stale versus fresh data, cache lifecycle, and query client orchestration. It gives the team explicit tools to manage server-state behavior as a system.',
      'SWR encourages thinking in key plus fetcher plus revalidation. Its model is closer to a lightweight cache-backed data-fetching hook with strong defaults, rather than a large query-management framework.',
    ],
  },
  {
    id: 'core-cache',
    title: 'Caching Model',
    paragraphs: [
      'TanStack Query has a more expansive cache management story. Query keys are central, cache entries are managed through the query client, and the library gives many explicit tools for invalidation, setting query data, cancellation, persistence, and mutation integration.',
      'SWR also has cache, deduplication, and revalidation, but the overall feel is lighter. The cache is there to make data fetching fast and coherent, not to expose as broad a server-state management surface by default.',
    ],
  },
  {
    id: 'core-revalidation',
    title: 'Revalidation and Freshness',
    paragraphs: [
      'SWR\'s identity is strongly tied to stale-while-revalidate behavior: show cached data quickly, then revalidate in the background to keep UI fresh. Focus and reconnect revalidation are part of its ergonomic appeal.',
      'TanStack Query also supports background refetching and freshness policies, but it gives more explicit knobs for stale times, cache times, refetch triggers, and query lifecycle tuning. This can be a strength or a cost depending on how much control the app needs.',
    ],
  },
  {
    id: 'core-mutations',
    title: 'Mutations and Write Workflows',
    paragraphs: [
      'TanStack Query is stronger when mutation workflows become central. useMutation, query invalidation, optimistic updates, mutation lifecycle callbacks, and direct cache updates give it a much more deliberate story around writes and data synchronization after those writes.',
      'SWR supports mutation and revalidation through mutate and useSWRMutation, and it can absolutely handle write flows. The difference is that TanStack Query feels more purpose-built for apps where mutation management is a major architectural concern.',
    ],
  },
  {
    id: 'core-pagination',
    title: 'Pagination and Infinite Loading',
    paragraphs: [
      'Both libraries can support pagination and infinite loading, but TanStack Query generally feels more comprehensive when the application has many list views, page transitions, background fetching needs, or sophisticated paginated data workflows.',
      'SWR supports pagination and infinite loading through useSWR and useSWRInfinite. It is capable, but it often feels best when the app wants to stay closer to a minimal fetch-and-cache model rather than a broader query-orchestration model.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Operational Surface',
    paragraphs: [
      'TanStack Query introduces a larger conceptual and operational surface: query clients, providers, query keys, invalidation habits, mutation flows, cache APIs, and optional persistence or integration features. That can pay off significantly in larger apps.',
      'SWR tends to feel lighter both in concept and day-to-day use. That is a real advantage when the team wants less ceremony and fewer moving parts around remote data.',
    ],
  },
  {
    id: 'core-nextjs',
    title: 'Framework and Next.js Fit',
    paragraphs: [
      'SWR has long felt especially comfortable in React and Next.js-style environments because of its lightweight fetcher pattern and ease of integrating cached client-side revalidation into page-driven applications.',
      'TanStack Query also works very well in modern React and Next.js applications, particularly when server-state complexity is high and the team wants stronger control over prefetching, hydration, invalidation, and query coordination.',
    ],
  },
  {
    id: 'core-scale',
    title: 'Scale of Application',
    paragraphs: [
      'SWR is often strongest when the remote data model is moderate in complexity: fetch some resources, revalidate them intelligently, prefetch where useful, and keep the UI responsive without building a larger state machine around the network.',
      'TanStack Query tends to pull ahead as the application accumulates many data domains, dependent queries, heavy mutation flows, optimistic interactions, and a need for centrally understood cache behavior.',
    ],
  },
  {
    id: 'core-ownership',
    title: 'Team Habits and Ownership',
    paragraphs: [
      'Teams that want explicit patterns for query keys, invalidation, and mutation workflows often find TanStack Query easier to standardize at scale because the library encourages more deliberate server-state architecture.',
      'Teams that want minimal abstraction and are comfortable handling some coordination through app conventions often find SWR easier to keep lightweight and unobtrusive.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward TanStack Query if the app has many mutations, nontrivial invalidation logic, rich pagination, or enough server-state complexity to justify a dedicated management layer.',
      'Lean toward SWR if the app mostly wants elegant fetch-cache-revalidate behavior with minimal ceremony.',
      'If the team already has good habits and a healthy data-fetching layer, the right answer is often the one that best matches the actual complexity of the product rather than the library with the bigger feature list.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-fetch',
    title: 'Basic Data Fetching',
    description:
      'Both libraries make basic server reads ergonomic, but the shape of the API already reflects their different philosophies.',
    snippets: [
      {
        label: 'TanStack Query',
        code: `const { data, isPending, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
})`,
      },
      {
        label: 'SWR',
        code: `const { data, error, isLoading } = useSWR(
  ['/api/user', userId],
  ([url, id]) => fetchUser(id)
)`,
      },
    ],
    takeaway:
      'Both are clean. TanStack Query foregrounds query keys and lifecycle. SWR foregrounds key-plus-fetcher simplicity.',
  },
  {
    id: 'examples-mutation',
    title: 'Mutation and Invalidation',
    description:
      'The biggest gap often appears after writes, not reads. TanStack Query gives a more explicit mutation workflow, while SWR keeps mutation simpler and more lightweight.',
    snippets: [
      {
        label: 'TanStack Query',
        code: `const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['user', userId] })
  },
})`,
      },
      {
        label: 'SWR',
        code: `const { mutate } = useSWRConfig()

await updateUser(input)
await mutate(['/api/user', userId])`,
      },
    ],
    takeaway:
      'If write workflows and coordinated invalidation are a big part of the app, TanStack Query often provides the clearer system.',
  },
  {
    id: 'examples-optimistic',
    title: 'Optimistic Update Flow',
    description:
      'Both libraries support optimistic UX, but TanStack Query often feels more structured when optimistic state and rollback behavior become common.',
    snippets: [
      {
        label: 'TanStack Query',
        code: `useMutation({
  mutationFn: toggleTodo,
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] })
    const previous = queryClient.getQueryData(['todos'])
    queryClient.setQueryData(['todos'], optimisticToggle(previous, id))
    return { previous }
  },
  onError: (_error, _vars, context) => {
    queryClient.setQueryData(['todos'], context?.previous)
  },
})`,
      },
      {
        label: 'SWR',
        code: `mutate(
  '/api/todos',
  async (current) => {
    await toggleTodo(id)
    return optimisticToggle(current, id)
  },
  { optimisticData: optimisticToggle(data, id), rollbackOnError: true }
)`,
      },
    ],
    takeaway:
      'Both can do optimistic UI well. TanStack Query often feels more like a full mutation system, while SWR keeps the model more compact.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short prompt keeps the choice tied to server-state complexity instead of library popularity.',
    snippets: [
      {
        label: 'TanStack Query Rule',
        code: `If the app has many queries,
many writes,
and explicit invalidation rules:
  choose TanStack Query`,
      },
      {
        label: 'SWR Rule',
        code: `If the app mostly wants fast,
cached,
revalidated reads with minimal ceremony:
  choose SWR`,
      },
    ],
    takeaway:
      'The better library is usually the one whose complexity level matches the product, not the one with the louder recommendation culture.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  { term: 'Server State', definition: 'Remote data owned by a server and synchronized into the UI rather than managed as ordinary local component state.' },
  { term: 'Query Key', definition: 'A TanStack Query identifier used to cache, refetch, and invalidate specific pieces of server data.' },
  { term: 'Invalidation', definition: 'The act of marking cached data stale so it can be refetched to reflect newer server state.' },
  { term: 'Revalidation', definition: 'Refreshing cached data in the background to keep the UI up to date.' },
  { term: 'Deduplication', definition: 'Avoiding duplicate network requests for the same resource when multiple consumers ask for it.' },
  { term: 'Optimistic Update', definition: 'Updating the UI before the server confirms a change, then rolling back or confirming based on the response.' },
  { term: 'Mutation', definition: 'An operation that creates, updates, deletes, or otherwise changes server data.' },
  { term: 'Stale-While-Revalidate', definition: 'A strategy where cached data is shown immediately while fresh data is fetched in the background.' },
  { term: 'Prefetching', definition: 'Fetching data ahead of time so it is already in cache when the UI needs it.' },
  { term: 'Infinite Loading', definition: 'A pattern for loading paginated data incrementally, often used for feeds and endless lists.' },
  { term: 'Query Client', definition: 'TanStack Query\'s central cache and coordination object for queries and mutations.' },
  { term: 'Fetcher', definition: 'A function used by SWR to retrieve remote data for a given key.' },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const helpStyles = `
.rq-swr-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.rq-swr-help-window {
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

.rq-swr-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.rq-swr-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.rq-swr-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.rq-swr-help-control {
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

.rq-swr-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.rq-swr-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.rq-swr-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.rq-swr-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.rq-swr-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.rq-swr-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.rq-swr-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.rq-swr-help-toc-list li {
  margin: 0 0 8px;
}

.rq-swr-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.rq-swr-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.rq-swr-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.rq-swr-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.rq-swr-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.rq-swr-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.rq-swr-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.rq-swr-help-content p,
.rq-swr-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.rq-swr-help-content p {
  margin: 0 0 10px;
}

.rq-swr-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.rq-swr-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.rq-swr-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.rq-swr-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .rq-swr-help-main {
    grid-template-columns: 1fr;
  }

  .rq-swr-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .rq-swr-help-titletext {
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

export default function ReactQueryVsSwrPage(): JSX.Element {
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
    document.title = `React Query vs SWR (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'React Query vs SWR',
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
    <div className="rq-swr-help-page">
      <style>{helpStyles}</style>
      <div className="rq-swr-help-window" role="presentation">
        <header className="rq-swr-help-titlebar">
          <span className="rq-swr-help-titletext">React Query vs SWR</span>
          <div className="rq-swr-help-controls">
            <button className="rq-swr-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="rq-swr-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="rq-swr-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rq-swr-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rq-swr-help-main">
          <aside className="rq-swr-help-toc" aria-label="Table of contents">
            <h2 className="rq-swr-help-toc-title">Contents</h2>
            <ul className="rq-swr-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="rq-swr-help-content">
            <h1 className="rq-swr-help-doc-title">React Query vs SWR</h1>
            <p className="rq-swr-help-doc-subtitle">
              Manual-style comparison of server-state philosophy, cache behavior, mutations, and practical React tradeoffs.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="rq-swr-help-section">
                    <h2 className="rq-swr-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="rq-swr-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="rq-swr-help-section">
                  <h2 className="rq-swr-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="rq-swr-help-section">
                  <h2 className="rq-swr-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="rq-swr-help-subheading">{snippet.label}</h3>
                      <div className="rq-swr-help-codebox">
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
              <section id="glossary-terms" className="rq-swr-help-section">
                <h2 className="rq-swr-help-heading">Glossary</h2>
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
