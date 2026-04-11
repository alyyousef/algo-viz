import { Fragment } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'SolidJS is a frontend library for building reactive user interfaces with fine-grained reactivity and JSX-based authoring. It is often discussed alongside component frameworks, but its identity is strongly tied to signals, direct DOM updates, and a runtime model that avoids broad component rerenders.',
      'In practice, SolidJS is used for interactive web applications, dashboards, embedded UI surfaces, and products where teams want a React-like JSX authoring experience with a smaller reactive surface and lower rendering overhead for many update patterns.',
      'This help-style reference covers SolidJS across overview, key ideas, syntax, APIs, ecosystem, architecture, use cases, tradeoffs, examples, and glossary terms.',
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
    id: 'bp-why-it-feels-different',
    title: 'Why It Feels Different from React-Style JSX',
    paragraphs: [
      'SolidJS can look familiar because it uses JSX, but it behaves differently because it does not default to rerunning whole component functions after each state change. Signals and their dependents form a reactive graph that updates more precisely.',
      'That difference matters in both performance reasoning and code style. The familiar syntax can hide a very different mental model until the team understands signals, accessors, and reactive dependency tracking clearly.',
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
    id: 'bp-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'A common misconception is that SolidJS is just React but faster. In practice, the more important distinction is the update model: signals and fine-grained subscriptions rather than broad component rerendering.',
      'Another misconception is that a small runtime model removes architectural decisions. Teams still need clear patterns for routing, async data, shared state, and full app structure.',
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
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'SolidJS asks developers to think in terms of reactive dependencies rather than rerendered component bodies. Signals are read where values are needed, and the framework updates only the computations and DOM bindings that depend on those reads.',
      'This can feel extremely precise once it clicks, but it requires more deliberate understanding of where reactive reads happen and what they imply.',
    ],
  },
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
    id: 'core-control-flow',
    title: 'Control Flow Helpers',
    paragraphs: [
      'SolidJS commonly uses helpers such as `<Show>` and `<For>` for conditional and list rendering. These helpers fit naturally into the fine-grained update model and make control-flow behavior explicit.',
      'This is one of the places where SolidJS stops feeling like ordinary React-style JSX and starts feeling like its own reactive system with its own rendering assumptions.',
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      "SolidJS uses JSX, but reactive values are commonly read by calling accessors such as `count()` instead of reading plain variables. Control flow is often handled with primitives such as `<Show>` and `<For>`, which make dependencies explicit and work well with the library's update model.",
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
    id: 'core-resources',
    title: 'Async Resources and Data Flow',
    paragraphs: [
      'SolidJS includes helpers such as `createResource` for async reactive data patterns. This lets teams model loading and data dependencies inside the same reactive vocabulary rather than immediately reaching for a separate fetch abstraction.',
      'At larger application scale, the bigger question is still where data loading belongs: component-local, route-level, or framework-level. That is where the broader app ecosystem becomes important.',
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
    id: 'core-shared-state',
    title: 'Shared State and Context',
    paragraphs: [
      'SolidJS supports context and module-level reactive patterns for shared values. Because the core reactive model is already fine-grained, teams can often build shared state with fewer abstractions than they might expect in other ecosystems.',
      'That freedom is useful, but it still needs discipline. Shared state should have clear ownership and boundaries rather than growing into an unstructured global reactive graph.',
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
    id: 'core-routing',
    title: 'Routing and App Framework Story',
    paragraphs: [
      'Routing can be handled through router utilities in the ecosystem, while SolidStart provides the stronger app-framework story for routing, SSR, and broader full-stack workflows.',
      'This means serious product decisions often involve SolidJS plus its broader application layer rather than the component library alone.',
    ],
  },
  {
    id: 'core-ssr',
    title: 'SSR and Server Workflows',
    paragraphs: [
      'SolidJS can participate in server rendering, but the fuller SSR and app-platform conversation usually belongs to SolidStart. This is similar to the way many UI libraries become materially different when paired with their broader framework layer.',
      'The key point is to keep the layers conceptually separate: the signal-driven component model on one side, and the route, request, and server workflow model on the other.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Developer Experience',
    paragraphs: [
      'SolidJS works naturally with TypeScript because its component model and core APIs stay relatively compact. Type relationships often stay close to components, props, resources, and signal-driven helpers instead of being spread across many framework subsystems.',
      'This can make typed Solid code feel lightweight, especially for engineers who want precision without a very large framework surface.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Update Precision',
    paragraphs: [
      'SolidJS is well known for efficient updates because its reactive graph targets only the places that depend on changed values. In many workloads, that produces a compelling rendering story without requiring broad rerender passes.',
      'The practical engineering lesson is still to design state and component boundaries carefully. Fine-grained reactivity is powerful, but product-level performance also depends on network behavior, list size, expensive computations, and broader app architecture.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Scaling',
    paragraphs: [
      'SolidJS is often attractive to teams that want precise reactive behavior and are comfortable with a specialized mental model. It can be a strong fit for engineers who prefer understanding state propagation explicitly rather than leaning on rerender-driven conventions.',
      'At the same time, the smaller ecosystem and less mainstream model can slow onboarding in teams that depend heavily on common React assumptions or on a broad pool of preexisting tutorials and libraries.',
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
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A recurring mistake is reading SolidJS code as if it followed React rerender semantics. Another is assuming JSX familiarity means the state model will behave the same way as other JSX libraries.',
      'A second pitfall is underestimating the architecture layer. Even a very efficient local reactive model still needs clear patterns for async data, routing, shared state, and full product structure.',
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
    id: 'examples-control-flow',
    title: 'Control Flow Example',
    description:
      'SolidJS uses dedicated helpers for common control flow so the update model stays explicit and efficient.',
    snippets: [
      {
        label: 'FrameworkList.tsx',
        code: `import { createMemo, createSignal, For, Show } from 'solid-js'

export default function FrameworkList() {
  const [query, setQuery] = createSignal('')
  const items = ['Vue', 'Svelte', 'React', 'Solid']
  const filtered = createMemo(() =>
    items.filter((item) => item.toLowerCase().includes(query().toLowerCase()))
  )

  return (
    <>
      <input value={query()} onInput={(event) => setQuery(event.currentTarget.value)} />
      <Show when={filtered().length > 0} fallback={<p>No matches</p>}>
        <ul>
          <For each={filtered()}>{(item) => <li>{item}</li>}</For>
        </ul>
      </Show>
    </>
  )
}`,
      },
    ],
    takeaway:
      'This is where SolidJS becomes visibly distinct from rerender-driven JSX libraries: the control-flow layer is reactive and explicit.',
  },
  {
    id: 'examples-resource',
    title: 'Async Resource Example',
    description:
      "Resources show how asynchronous data can participate directly in Solid's reactive model.",
    snippets: [
      {
        label: 'UserCard.tsx',
        code: `import { Show, createResource } from 'solid-js'

async function fetchUser(id: number) {
  return { id, name: 'Ali' }
}

export default function UserCard() {
  const [user] = createResource(() => 1, fetchUser)

  return (
    <Show when={user()} fallback={<p>Loading...</p>}>
      <p>{user()!.name}</p>
    </Show>
  )
}`,
      },
    ],
    takeaway:
      'Async work can stay inside the same reactive vocabulary rather than immediately forcing a separate architectural style.',
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
    definition:
      'A reactive UI library centered on signals, fine-grained updates, and JSX-based component authoring.',
  },
  {
    term: 'Signal',
    definition:
      'A reactive state primitive that tracks reads and notifies dependents when the value changes.',
  },
  {
    term: 'createSignal',
    definition: 'A SolidJS API that creates a reactive value accessor and a setter.',
  },
  {
    term: 'createMemo',
    definition:
      'A SolidJS API for derived reactive values that recompute when dependencies change.',
  },
  {
    term: 'createEffect',
    definition: 'A SolidJS API for running side-effectful logic in response to reactive changes.',
  },
  {
    term: 'Fine-grained reactivity',
    definition:
      'A model where updates target the exact computations or DOM bindings that depend on changed state.',
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
    definition:
      'The broader Solid application framework used for routing, SSR, and full-stack workflows.',
  },
  {
    term: 'Fine-grained update',
    definition:
      'A targeted UI update that affects only the computations or DOM bindings that depend on changed state.',
  },
] as const

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

export default function Counter(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'SolidJS',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="SolidJS"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">SolidJS</h1>
      <p className="solid-help-doc-subtitle">
        Manual-style reference covering overview, signals, fine-grained reactivity, JSX authoring,
        app-framework layering, tradeoffs, and practical examples.
      </p>

      {activeTab === 'big-picture' &&
        bigPictureSections.map((section, index) => (
          <Fragment key={section.id}>
            <section id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
          </Fragment>
        ))}

      {activeTab === 'core-concepts' &&
        coreConceptSections.map((section) => (
          <section key={section.id} id={section.id} className="bin98-section">
            <h2 className="bin98-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

      {activeTab === 'examples' &&
        examples.map((example) => (
          <section key={example.id} id={example.id} className="bin98-section">
            <h2 className="bin98-heading">{example.title}</h2>
            <p>{example.description}</p>
            {example.snippets.map((snippet) => (
              <Fragment key={`${example.id}-${snippet.label}`}>
                <h3 className="bin98-subheading">{snippet.label}</h3>
                <div className="bin98-codebox">
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
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
