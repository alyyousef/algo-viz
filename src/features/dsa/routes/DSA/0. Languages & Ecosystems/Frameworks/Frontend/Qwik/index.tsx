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
      'Qwik is a front-end framework designed around resumability rather than the more common hydration-first model. Its goal is to deliver interactive applications that can resume work on the client without eagerly replaying large amounts of component logic after server rendering.',
      'In practice, Qwik is used for web applications where startup cost, interaction latency, and JavaScript delivery strategy matter a great deal. The framework is especially associated with fine-grained lazy loading, signal-driven state, and a serialization model that lets the browser continue from server-produced state.',
      'This help-style reference covers Qwik across resumability, signals, QRLs, `$` boundaries, Qwik City, SSR and streaming, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why-qwik',
    title: 'Why Qwik Matters',
    paragraphs: [
      'Qwik matters because it challenges a default assumption in modern front-end frameworks: that the client must replay component logic in order to become interactive after SSR. Qwik instead tries to serialize the right information so the app can resume from where the server left off.',
      'That makes the framework interesting not just as another component model, but as a different answer to startup performance, code delivery, and the relationship between server and browser execution.',
    ],
  },
  {
    id: 'bp-what-it-optimizes',
    title: 'What Qwik Optimizes For',
    paragraphs: [
      'Qwik optimizes for minimal up-front JavaScript execution and for moving work off the critical path until it is actually needed. Instead of assuming that the whole component tree must wake up immediately, it tries to load and execute code at the moment of real interaction.',
      'That optimization target changes many engineering choices. Code boundaries, event handlers, serialization, and framework conventions are all shaped by the need to make resumability possible.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Qwik Fits Well',
    paragraphs: [
      'Qwik is often attractive for content-heavy products, e-commerce flows, landing experiences with rich interactivity, and applications where initial responsiveness and delayed code execution are high-priority concerns.',
      'It is also interesting to teams that want to explore a more server-first and delivery-sensitive front-end architecture rather than simply tuning a conventional hydration model.',
    ],
  },
  {
    id: 'bp-where-it-needs-care',
    title: 'Where It Needs Care',
    paragraphs: [
      'Qwik asks teams to learn a more specialized mental model than mainstream React or Vue-style development. Concepts such as resumability, QRLs, and `$` boundaries are not just syntax details; they are architectural requirements of the framework design.',
      'That means teams should evaluate not only raw capability but also whether they are comfortable adopting a less mainstream ecosystem and a more framework-specific execution model.',
    ],
  },
  {
    id: 'bp-common-misreadings',
    title: 'Common Misreadings',
    paragraphs: [
      'A common mistake is to treat Qwik as if it were simply another island or hydration optimization strategy. Its core identity is not just partial loading. It is the resumability model and the serialization strategy that make delayed execution possible.',
      'Another mistake is to reduce the framework story to performance slogans alone. The more important engineering question is whether the team wants to adopt the programming model required to make resumability practical.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Qwik centers on resumability, signals, serialized application state, and fine-grained lazy execution.',
      'Its main strengths are startup sensitivity, delayed code execution, and a coherent model for minimizing immediate client work.',
      'Its main tradeoffs are mental-model complexity, a smaller ecosystem, and the need to work within framework conventions built around serialization and resumability.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Qwik asks developers to think of the application as something the server can pause and the browser can resume. Instead of replaying large parts of the component tree just to recover event handlers and stateful behavior, the framework serializes enough metadata so execution can continue later and more selectively.',
      'This means component boundaries, event boundaries, and lazy loading boundaries are much more tightly connected than in many mainstream frameworks.',
    ],
  },
  {
    id: 'core-resumability',
    title: 'Resumability',
    paragraphs: [
      'Resumability is the central Qwik concept. The server renders output and captures the information necessary for the client to continue from that state without eagerly re-running the whole application logic on startup.',
      'The engineering value is lower immediate client work. The engineering cost is that the framework and the code author must preserve serialization boundaries so the resumed application has enough information to continue safely.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Model',
    paragraphs: [
      "Qwik components are authored through `component$`, which marks component code for the framework and compiler-aware tooling. The `$` suffix is not stylistic decoration. It signals that the code participates in Qwik's lazy and serializable execution model.",
      'That model makes component authoring feel related to JSX-based frameworks while still imposing its own rules about what should be serializable, lazy-loadable, and resumable.',
    ],
  },
  {
    id: 'core-signals',
    title: 'Signals and State',
    paragraphs: [
      "Qwik uses signals and stores to model reactive state. `useSignal` is commonly used for small reactive values, while `useStore` is used for structured state objects that need to participate in the framework's reactivity and serialization flow.",
      'Signals are an important part of how Qwik keeps updates focused without requiring broad rerender work. They also fit naturally with a framework that wants to minimize resumed and executed code.',
    ],
  },
  {
    id: 'core-qrls',
    title: 'QRLs and Lazy References',
    paragraphs: [
      "QRLs are one of Qwik's defining ideas. A QRL is a reference that points to lazily loadable code so the framework can defer downloading and executing logic until it is actually needed.",
      'This matters because resumability depends on more than state. It also depends on being able to reconnect event handlers and logic without forcing the whole application bundle to execute immediately.',
    ],
  },
  {
    id: 'core-dollar-boundaries',
    title: '`$` Boundaries',
    paragraphs: [
      "In Qwik, the `$` suffix on APIs such as `component$`, `useTask$`, or event handlers such as `onClick$` indicates that the code participates in the framework's special lazy and serializable behavior.",
      'This is one of the most important style and architecture differences in the framework. The boundary markers are part of how Qwik knows what can be split, resumed, and loaded on demand.',
    ],
  },
  {
    id: 'core-tasks',
    title: 'Tasks and Lifecycle-Like Behavior',
    paragraphs: [
      "Qwik provides task-style APIs such as `useTask$` and related hooks for work that depends on reactive state or environment transitions. These are not just clones of hooks from other frameworks; they fit into Qwik's execution and serialization model.",
      "The important engineering question is not only when code runs, but whether that code is compatible with the framework's lazy and resumable assumptions.",
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      'Qwik uses JSX-like authoring, which helps it feel somewhat approachable to teams already familiar with JSX ecosystems. The visible syntax is not the hard part. The deeper difference is what the framework does with code boundaries, event handlers, and reactive state.',
      'That means syntax familiarity can be misleading at first. The real learning curve is the runtime and delivery model rather than the markup syntax alone.',
    ],
  },
  {
    id: 'core-serialization',
    title: 'Serialization and Constraints',
    paragraphs: [
      'Qwik needs to serialize enough state and references to let the browser resume execution. This creates important constraints around what values can cross boundaries and how closures or captured values are structured.',
      'In practice, this means developers need to be more deliberate about serializability than they might be in frameworks that simply rerun everything on the client after hydration.',
    ],
  },
  {
    id: 'core-rendering',
    title: 'Rendering and Execution Model',
    paragraphs: [
      'Qwik is optimized around delaying client-side execution until user interaction or other real need forces it. The rendered output arrives from the server, and the browser then resumes specific work rather than replaying broad initialization logic.',
      "This execution model is one of the framework's strongest architectural differentiators. It changes how teams think about startup cost, event binding, and what “interactive” means during page boot.",
    ],
  },
  {
    id: 'core-qwik-city',
    title: 'Qwik City and Application Structure',
    paragraphs: [
      'Qwik City is the broader application framework around Qwik. It provides routing, request handling, route loaders, actions, and related full-stack patterns that turn Qwik from a component model into a more complete app platform.',
      'This distinction matters in the same way that many component technologies have a broader app-framework layer. Real product decisions usually involve Qwik together with Qwik City rather than raw Qwik alone.',
    ],
  },
  {
    id: 'core-routing-data',
    title: 'Routing, Loaders, and Actions',
    paragraphs: [
      'Qwik City gives the framework a route-aware data and request model through loaders and actions. This means server data and user mutations can be expressed in a route-centered architecture rather than being scattered as ad hoc client fetches.',
      'The important practical point is that Qwik is not only about startup behavior. It also has a surrounding app model for server-aware workflows and route composition.',
    ],
  },
  {
    id: 'core-ssr-streaming',
    title: 'SSR, Streaming, and Delivery Strategy',
    paragraphs: [
      'Qwik supports server rendering and is especially interesting in SSR discussions because resumability changes the usual tradeoff between server-rendered markup and client hydration cost. Streaming and route-aware delivery can fit naturally into the broader platform model.',
      'The framework\'s strongest story is not merely "SSR exists." It is that the cost of becoming interactive is treated differently from most hydration-first systems.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Tooling',
    paragraphs: [
      'Qwik works with TypeScript and modern front-end tooling, but the more important tooling story is the framework compiler and optimizer behavior that support code-splitting, QRL generation, and resumability.',
      'That means teams should think about the toolchain not just as a build step, but as part of the framework semantics. The optimizer is essential to how Qwik delivers on its design goals.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Startup Behavior',
    paragraphs: [
      'Qwik is usually discussed in performance terms because it tries to minimize eager client execution and defer code until interaction. That gives it a distinctive position in conversations about startup responsiveness and JavaScript delivery.',
      'The right engineering interpretation is careful rather than promotional. Qwik offers a compelling startup model, but total application performance still depends on architecture, data flow, network behavior, component design, and real workload shape.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Adoption Cost',
    paragraphs: [
      'Qwik is often attractive to teams that are willing to adopt a more specialized model in exchange for a stronger startup and execution story. It is less attractive when the main organizational need is a very mainstream mental model and a huge surrounding ecosystem.',
      'The adoption question is not only "Can the team learn the syntax?" It is whether the team wants to own the mental shift required by resumability and serialization-aware authoring.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Qwik is commonly discussed for marketing-rich experiences, commerce flows, highly interactive pages with strong startup-performance sensitivity, and web apps where early responsiveness matters enough to justify a more specialized model.',
      'It is also a fit for teams experimenting with different server-client boundaries and delivery-first architecture rather than just tuning conventional hydration.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Qwik offers a distinctive startup and delivery model, but the framework asks more from developers in return. Resumability, serializability, QRLs, and `$` boundaries are not incidental concepts; they shape how code must be written.',
      'Another tradeoff is ecosystem size. The framework is more specialized and less mainstream than React, Vue, or some other front-end options, which affects hiring familiarity, surrounding libraries, and available example volume.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common mistake is to compare Qwik only by bundle-size or startup-performance slogans without understanding its execution model. Another is to assume JSX familiarity means the rest of the framework will feel familiar in the same way.',
      'A second pitfall is ignoring serialization boundaries. In Qwik, those boundaries are not optional implementation details; they are central to how the framework works.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Qwik is commonly compared with React and similar JSX ecosystems for how it treats startup work and client execution, with compiler- or signal-oriented frameworks for how much work is moved out of the initial client boot, and with full-stack frameworks for how it handles route and request workflows through Qwik City.',
      'These comparisons help position Qwik clearly: it is not just a different component syntax, but a different answer to hydration, code delivery, and interaction timing.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Signal-Driven Component',
    description:
      'This is the baseline Qwik example: a component defined with `component$`, local reactive state with `useSignal`, and an event handler marked with `onClick$` so the interaction path can stay lazy.',
    snippets: [
      {
        label: 'Counter.tsx',
        code: `import { component$, useSignal } from '@builder.io/qwik'

export default component$(() => {
  const count = useSignal(0)

  return (
    <button onClick$={() => count.value++}>
      Count: {count.value}
    </button>
  )
})`,
      },
    ],
    takeaway:
      'The key point is not the counter itself. It is that state and interaction are expressed in a way that lets Qwik delay client work until the click actually happens.',
  },
  {
    id: 'examples-store',
    title: 'Structured State With useStore',
    description:
      'When state naturally belongs together as an object, `useStore` provides a reactive container for that grouped state. This is useful for forms, panels, editable collections, and UI flows with several related fields.',
    snippets: [
      {
        label: 'TodoList.tsx',
        code: `import { component$, useStore } from '@builder.io/qwik'

export default component$(() => {
  const todo = useStore({
    draft: '',
    items: ['Read docs', 'Model state', 'Ship UI'],
  })

  return (
    <section>
      <input
        value={todo.draft}
        onInput$={(event) => {
          todo.draft = (event.target as HTMLInputElement).value
        }}
      />

      <button
        onClick$={() => {
          if (!todo.draft.trim()) return
          todo.items.push(todo.draft.trim())
          todo.draft = ''
        }}
      >
        Add
      </button>

      <ul>
        {todo.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
})`,
      },
    ],
    takeaway:
      "Use `useSignal` for small values and `useStore` for grouped data. Both reinforce Qwik's fine-grained reactive model instead of a broad rerender-first mindset.",
  },
  {
    id: 'examples-task',
    title: 'Reactive Work With useTask$',
    description:
      "`useTask$` is used for logic that reacts to tracked values. It is part of Qwik's own reactive workflow and should be understood through the framework's resumability model rather than as a direct clone of another framework's effect API.",
    snippets: [
      {
        label: 'SearchPreview.tsx',
        code: `import { component$, useSignal, useTask$ } from '@builder.io/qwik'

export default component$(() => {
  const query = useSignal('')
  const summary = useSignal('Type to compute a preview')

  useTask$(({ track }) => {
    const currentQuery = track(() => query.value)

    summary.value = currentQuery
      ? \`Searching for: \${currentQuery}\`
      : 'Type to compute a preview'
  })

  return (
    <div>
      <input
        value={query.value}
        onInput$={(event) => {
          query.value = (event.target as HTMLInputElement).value
        }}
      />
      <p>{summary.value}</p>
    </div>
  )
})`,
      },
    ],
    takeaway:
      'Tasks give Qwik a way to express reactive work explicitly. The main engineering concern is not just timing, but how that work fits within lazy loading and serialization boundaries.',
  },
  {
    id: 'examples-routing',
    title: 'Qwik City Loader and Action',
    description:
      'Qwik City provides route-aware data loading and mutations. This keeps server data and write operations close to the route instead of scattering every workflow across client-side fetch calls and ad hoc state management.',
    snippets: [
      {
        label: 'routes/products/index.tsx',
        code: `import { component$ } from '@builder.io/qwik'
import { Form, routeAction$, routeLoader$ } from '@builder.io/qwik-city'

export const useProducts = routeLoader$(async () => {
  return [
    { id: 1, name: 'Keyboard' },
    { id: 2, name: 'Monitor' },
  ]
})

export const useCreateProduct = routeAction$(async (formData) => {
  const name = formData.name?.toString().trim()

  if (!name) {
    return { ok: false, message: 'Name is required' }
  }

  return { ok: true, created: name }
})

export default component$(() => {
  const products = useProducts()
  const createProduct = useCreateProduct()

  return (
    <section>
      <ul>
        {products.value.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>

      <Form action={createProduct}>
        <input name="name" />
        <button type="submit">Create product</button>
      </Form>

      {createProduct.value?.message && <p>{createProduct.value.message}</p>}
    </section>
  )
})`,
      },
    ],
    takeaway:
      'Qwik is not only about client startup cost. Qwik City is part of the real framework story because routing, data loading, and mutations shape how production apps are built.',
  },
  {
    id: 'examples-lazy-handlers',
    title: 'Lazy Event Boundaries',
    description:
      "Dollar-suffixed event props are one of the clearest windows into Qwik's architecture. These handlers are not just callbacks attached to JSX. They are lazy boundaries that can be loaded when the event occurs.",
    snippets: [
      {
        label: 'ProfileActions.tsx',
        code: `import { component$, useSignal } from '@builder.io/qwik'

export default component$(() => {
  const status = useSignal('Idle')

  return (
    <div>
      <button
        onMouseEnter$={() => {
          status.value = 'Preparing next interaction'
        }}
      >
        Hover me
      </button>

      <button
        onClick$={async () => {
          status.value = 'Saving...'
          await new Promise((resolve) => setTimeout(resolve, 250))
          status.value = 'Saved'
        }}
      >
        Save
      </button>

      <p>{status.value}</p>
    </div>
  )
})`,
      },
    ],
    takeaway:
      'In Qwik, event handlers are a delivery strategy as much as a component API. The framework uses them to keep interaction code off the eager startup path.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Qwik',
    definition:
      'A front-end framework focused on resumability, fine-grained reactivity, and minimizing eager client-side execution after SSR.',
  },
  {
    term: 'Resumability',
    definition:
      'The ability for the browser to continue from server-generated application state without replaying broad initialization work just to recover interactivity.',
  },
  {
    term: 'Hydration',
    definition:
      'The common SSR pattern where client JavaScript reattaches behavior by re-running component logic. Qwik is notable because it tries to reduce or avoid depending on that startup pattern.',
  },
  {
    term: 'QRL',
    definition:
      'A lazy-loadable reference to code. QRLs help Qwik reconnect behavior and fetch logic only when that logic is actually needed.',
  },
  {
    term: 'component$',
    definition:
      "The API used to define a Qwik component. The `$` suffix indicates the component participates in the framework's lazy and serializable execution model.",
  },
  {
    term: 'onClick$',
    definition:
      'A Qwik event handler prop that marks the callback as lazy-loadable and resumability-aware.',
  },
  {
    term: 'useSignal',
    definition:
      'A primitive for a small reactive value. Signals are commonly used for simple local state such as numbers, strings, booleans, and selected values.',
  },
  {
    term: 'useStore',
    definition:
      'A primitive for structured reactive object state, useful when multiple related fields should be managed together.',
  },
  {
    term: 'useTask$',
    definition:
      "A Qwik API for reactive work based on tracked values. It belongs to Qwik's own execution model rather than copying another framework's lifecycle rules directly.",
  },
  {
    term: 'Serialization',
    definition:
      'The process of capturing state and references in a form that can move from server work into client-side resumption.',
  },
  {
    term: 'Fine-Grained Reactivity',
    definition:
      'An update model where narrow state changes affect only the parts of the UI that depend on them, instead of forcing broad tree-wide rerenders.',
  },
  {
    term: '$ Boundary',
    definition:
      'A boundary marked by a dollar-suffixed API or handler that tells Qwik the code should participate in lazy loading and resumable execution.',
  },
  {
    term: 'Qwik City',
    definition:
      'The app framework layer around Qwik that provides routing, request handling, route loaders, route actions, and broader full-stack structure.',
  },
  {
    term: 'routeLoader$',
    definition: 'A Qwik City API used to load route data, usually with server-aware execution.',
  },
  {
    term: 'routeAction$',
    definition: 'A Qwik City API used to handle route-scoped mutations or form submissions.',
  },
  {
    term: 'Optimizer',
    definition:
      "The Qwik build-time analysis and transformation layer that creates split points and supports the framework's resumability strategy.",
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

export default function QwikPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Qwik',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Qwik"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Qwik</h1>
      <p className="qwik-help-doc-subtitle">
        Manual-style reference covering overview, resumability, signals, QRLs, dollar boundaries,
        Qwik City, SSR strategy, tradeoffs, and practical examples.
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
