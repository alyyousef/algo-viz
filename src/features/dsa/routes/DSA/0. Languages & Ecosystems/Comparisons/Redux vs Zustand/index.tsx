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

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Redux and Zustand are both state-management tools commonly used in React applications, but they come from different philosophies. Modern Redux, usually written with Redux Toolkit, emphasizes explicit architecture, structured updates, middleware, serializable state, selectors, and a well-defined application data flow. Zustand emphasizes minimalism, direct store creation, fewer abstractions, and a very small API surface.',
      'That means the practical question is not only which one can hold shared state. Both can. The more useful question is whether the application benefits from a strongly structured state architecture with official patterns and middleware support, or whether it benefits more from a lightweight store layer that is easy to adopt and stays out of the way.',
      'This help-style reference covers Redux vs Zustand across overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-redux',
    title: 'When Redux Fits Better',
    paragraphs: [
      'Redux is often the stronger fit when the application has enough global-state complexity that explicit architecture is a feature, not a burden. It is especially attractive when the team wants predictable state updates, action-driven workflows, middleware, devtools, selector discipline, and a store model that is easy to reason about across many engineers and large codebases.',
      'It is also a strong fit when the team values official guidance. Modern Redux Toolkit reduces historical boilerplate and gives a standard path for slices, store setup, async logic, selectors, and surrounding best practices. In larger organizations, this structure can be a major advantage.',
    ],
  },
  {
    id: 'bp-zustand',
    title: 'When Zustand Fits Better',
    paragraphs: [
      "Zustand is often the stronger fit when the application wants a lightweight global-state solution without adopting the full conceptual surface of Redux. It is especially attractive for product codebases that need shared state, actions, selectors, persistence, or devtools integration, but do not need Redux's full event-driven architecture.",
      'It is also a good fit when the team wants stores to feel simple and local in spirit even when they are shared globally. In many applications, Zustand feels like the minimum useful abstraction for global React state.',
    ],
  },
  {
    id: 'bp-same-problem',
    title: 'Same Problem, Different Level of Structure',
    paragraphs: [
      'Both libraries help manage state that should not live only inside one component. Both can support selectors, persistence, devtools, and derived state patterns. Both can scale to production use when the team uses them thoughtfully.',
      'The key difference is how much explicit architecture they ask from you. Redux gives you a stronger system. Zustand gives you a smaller tool. That difference shapes debugging, onboarding, consistency, and long-term maintenance.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to compare Redux to its old pre-Toolkit reputation. Modern Redux Toolkit is substantially more ergonomic than the historical caricature of endless boilerplate.',
      'Another mistake is to treat small API size as automatically superior. Zustand is elegant, but elegance is not always enough when a team needs strong conventions, explicit event history, or richer middleware-based coordination.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose Redux when explicit architecture, standardized patterns, middleware, and large-team coordination are valuable.',
      'Choose Zustand when the app wants a small, ergonomic global-state layer without Redux-level ceremony.',
      'If the state model is complex and organizationally important, Redux often gains ground. If the state model is moderate and the team wants minimal friction, Zustand often gains ground.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both libraries can centralize shared state outside individual components. Both can expose actions or state-updating functions, support subscriptions or selectors, and help avoid prop drilling for genuinely shared application state.',
      'That means the difference is not whether they can solve global state at all. The difference is how opinionated they are about solving it.',
    ],
  },
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Redux encourages an explicit event-driven model. State changes happen through actions, reducers, and a centralized store. Modern Redux Toolkit streamlines this, but the conceptual model remains intentionally structured and explicit.',
      'Zustand encourages a much lighter model. You create a store, define state and actions together, and read slices of that state from components. It feels closer to creating an ordinary module-level state container than to adopting a larger architecture framework.',
    ],
  },
  {
    id: 'core-boilerplate',
    title: 'Boilerplate and Ceremony',
    paragraphs: [
      'Redux historically had a reputation for heavy boilerplate, but modern Redux Toolkit is designed specifically to reduce that problem through createSlice, configureStore, and other opinionated APIs. Even so, Redux still asks developers to think in a more structured way about state transitions and application boundaries.',
      'Zustand is intentionally small. Creating a store can be extremely concise, which makes it attractive when the team wants state management to stay simple and close to ordinary JavaScript or TypeScript code.',
    ],
  },
  {
    id: 'core-predictability',
    title: 'Predictability and Explicitness',
    paragraphs: [
      "Redux's strongest argument is not that it stores state, but that it makes state transitions explicit and traceable. Actions, reducers, middleware, and selector patterns create a very legible application state model when the team follows modern Redux guidance.",
      'Zustand can also be clear, but it does not impose the same event-driven discipline by default. This can be a strength when the app is simpler, and a weakness when teams need stronger guarantees about how state evolves across a large codebase.',
    ],
  },
  {
    id: 'core-selectors',
    title: 'Selectors and Derived State',
    paragraphs: [
      'Redux strongly encourages selectors and memoized derivation patterns, especially in larger apps. This makes it easier to centralize knowledge of how state should be read and transformed, which matters a lot for long-lived applications.',
      'Zustand also works very well with selectors, and selective subscription is one of its practical strengths. The difference is that Redux treats selector discipline as a major architectural pattern, while Zustand treats it more as a lightweight ergonomic tool.',
    ],
  },
  {
    id: 'core-middleware',
    title: 'Middleware and Cross-Cutting Logic',
    paragraphs: [
      'Redux has a well-defined middleware story. This matters for async flows, logging, instrumentation, analytics, interception, devtools integration, and broader application coordination. Middleware is one of the reasons Redux scales well beyond simple state sharing.',
      'Zustand supports middleware too, including devtools and persistence helpers, but the middleware story is generally lighter and more focused on ergonomic store enhancement than on building a full application event-processing pipeline.',
    ],
  },
  {
    id: 'core-async',
    title: 'Async Workflows',
    paragraphs: [
      'Redux has clear patterns for async logic, especially through Redux Toolkit and related official guidance. This gives teams a well-trodden path for coordinating async state transitions, side effects, and data fetching layers when needed.',
      'Zustand can absolutely manage async actions directly in store logic, and this often feels pleasantly simple. The tradeoff is that the team has fewer built-in architectural guardrails if async complexity becomes significant across the application.',
    ],
  },
  {
    id: 'core-devtools',
    title: 'Devtools and Debugging',
    paragraphs: [
      'Redux has an especially strong debugging and inspection story. Devtools, action history, middleware inspection, selector discipline, and serializable-state conventions all contribute to a system that is very understandable when something goes wrong.',
      "Zustand can integrate with devtools and can be easy to inspect in smaller systems, but it generally does not carry the same out-of-the-box architectural traceability as Redux's action-and-reducer model.",
    ],
  },
  {
    id: 'core-persistence',
    title: 'Persistence and Store Enhancement',
    paragraphs: [
      'Redux persistence patterns are well established, but they usually sit alongside the broader architecture rather than being the primary identity of the library.',
      'Zustand makes persistence particularly straightforward through middleware such as persist. This is one reason it is attractive for apps that want lightweight persisted UI or session state without adopting the full Redux stack.',
    ],
  },
  {
    id: 'core-scale',
    title: 'Scale and Team Coordination',
    paragraphs: [
      'Redux often becomes more valuable as team size, state complexity, and application longevity increase. Its structure can reduce ambiguity and help large teams converge on shared mental models for state ownership and updates.',
      'Zustand often shines in smaller to medium-complexity applications or in teams that want simplicity first. It can scale, but the team itself must enforce more discipline when the application starts to resemble a large stateful platform.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward Redux if the application has complex shared state, needs strong conventions, or benefits from middleware, devtools, and explicit architectural patterns.',
      'Lean toward Zustand if the state needs are real but moderate, and the team wants the smallest effective abstraction for global state.',
      'If the organization needs a state architecture, Redux often fits better. If it just needs a state store, Zustand often fits better.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-store',
    title: 'Basic Counter Store',
    description: 'The difference shows up immediately in how much structure each tool asks for.',
    snippets: [
      {
        label: 'Redux Toolkit',
        code: `const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

export const { increment } = counterSlice.actions`,
      },
      {
        label: 'Zustand',
        code: `export const useCounterStore = create<{
  value: number
  increment: () => void
}>()((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
}))`,
      },
    ],
    takeaway:
      'Redux makes state transitions explicit through slices and actions. Zustand keeps state and actions together in one small store definition.',
  },
  {
    id: 'examples-read',
    title: 'Reading State in a Component',
    description:
      'Both can expose state to components cleanly, but the surrounding architecture differs.',
    snippets: [
      {
        label: 'Redux',
        code: `const count = useAppSelector((state) => state.counter.value)
const dispatch = useAppDispatch()

return (
  <button onClick={() => dispatch(increment())}>
    Count: {count}
  </button>
)`,
      },
      {
        label: 'Zustand',
        code: `const count = useCounterStore((state) => state.value)
const increment = useCounterStore((state) => state.increment)

return <button onClick={increment}>Count: {count}</button>`,
      },
    ],
    takeaway:
      'Zustand often feels closer to direct store usage. Redux emphasizes store access through selectors and dispatched actions.',
  },
  {
    id: 'examples-persist',
    title: 'Persistence Example',
    description:
      'Persistence is possible in both worlds, but Zustand often feels especially lightweight here.',
    snippets: [
      {
        label: 'Redux',
        code: `// Persistence is usually added through surrounding store setup
// and persistence tooling alongside the Redux architecture.`,
      },
      {
        label: 'Zustand',
        code: `export const useSessionStore = create()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'session-store' }
  )
)`,
      },
    ],
    takeaway:
      'Zustand can make store persistence feel very direct. Redux persistence is powerful too, but usually lives inside a broader architectural stack.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short rule of thumb keeps the choice tied to complexity and organizational needs instead of API novelty.',
    snippets: [
      {
        label: 'Redux Rule',
        code: `If the state layer needs
clear structure,
middleware,
and team-wide conventions:
  choose Redux`,
      },
      {
        label: 'Zustand Rule',
        code: `If the app needs shared state
with minimal ceremony
and no extra architecture tax:
  choose Zustand`,
      },
    ],
    takeaway:
      'The better tool depends on whether the team needs a structured state system or just a lightweight state store.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Slice',
    definition:
      'A feature-focused piece of Redux state and reducer logic, commonly created with Redux Toolkit.',
  },
  {
    term: 'Reducer',
    definition: 'A function that calculates new state from the current state and an action.',
  },
  {
    term: 'Action',
    definition: 'A Redux event object describing what happened in the application.',
  },
  {
    term: 'Middleware',
    definition:
      'A layer that can intercept and extend store behavior, especially important in Redux.',
  },
  { term: 'Selector', definition: 'A function that reads or derives data from the store state.' },
  {
    term: 'Serializable State',
    definition:
      'State made of plain data structures that can be logged, inspected, and replayed reliably.',
  },
  {
    term: 'Devtools',
    definition:
      'Inspection and debugging tooling used to understand store state changes and application behavior.',
  },
  {
    term: 'Store',
    definition: 'The container that holds shared application state and exposes update behavior.',
  },
  {
    term: 'Persist Middleware',
    definition: 'A Zustand middleware for persisting and rehydrating store state from storage.',
  },
  {
    term: 'Immutable Update',
    definition:
      'Updating state by producing a new value instead of mutating the previous value directly.',
  },
  {
    term: 'RTK',
    definition: 'Redux Toolkit, the official recommended way to write modern Redux logic.',
  },
  {
    term: 'Global State',
    definition:
      'Application state shared across multiple components or screens rather than owned by one local component.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

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

export default function ReduxVsZustandPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Redux vs Zustand',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Redux vs Zustand"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Redux vs Zustand</h1>
      <p className="bin98-doc-subtitle">
        Manual-style comparison of global state architecture, middleware, devtools, and pragmatic
        React-state tradeoffs.
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
