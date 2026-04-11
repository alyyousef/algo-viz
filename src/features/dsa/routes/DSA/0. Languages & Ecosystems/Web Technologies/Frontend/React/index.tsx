import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What React is',
    body: 'React is a JavaScript library for building user interfaces through declarative, composable components. A component describes what the UI should look like for a given state, and React reconciles the rendered output when state or props change. React focuses on the view layer rather than on the entire application stack.',
  },
  {
    title: 'Why React matters',
    body: 'React matters because it helped normalize component-driven UI, declarative rendering, unidirectional data flow, and reusable stateful logic at scale. Its model influenced much of modern frontend development, and its ecosystem became a reference point for routing, state management, data fetching, and full-stack application frameworks.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that React is a UI runtime and programming model, not a complete application framework. It gives teams a way to structure components, state, events, and effects, while leaving many broader application decisions to companion libraries or frameworks such as React Router, TanStack Query, Remix, or Next.js.',
  },
  {
    title: 'Where it fits best',
    body: 'React fits best for interactive interfaces, long-lived frontend applications, component-heavy product surfaces, design-system-driven work, and teams that want a flexible UI foundation they can pair with different routing or data layers. It is also a strong fit when the application will evolve across web, mobile, or hybrid rendering environments.',
  },
]

const whyItMatters = [
  'It established a widely adopted component model for modern frontend development.',
  'It encourages a declarative view of UI where rendering follows state rather than manual DOM steps.',
  'It scales from small widgets to large application trees with reusable component boundaries.',
  'It has one of the largest frontend ecosystems for routing, state, data, and framework integration.',
  'It is the foundation beneath major React frameworks rather than a niche standalone tool.',
]

const historicalContext = [
  {
    title: 'Frontend UI used to be dominated by imperative DOM work',
    detail:
      'Before component-based libraries became common, many interfaces were built by directly manipulating the DOM in response to events. That style worked for smaller interactions, but it became hard to maintain as screens grew more dynamic and stateful.',
  },
  {
    title: 'React popularized declarative component rendering',
    detail:
      'React helped shift frontend engineering toward describing UI as a function of state. Instead of encoding every DOM step manually, developers describe the desired output and let the runtime update the page. That conceptual shift influenced many libraries and frameworks that followed.',
  },
  {
    title: 'Hooks changed how logic is shared',
    detail:
      'Earlier React code often relied on class components, higher-order components, and render-prop patterns to manage stateful logic. Hooks made state, effects, and reusable behavior available in function components, which significantly changed how React codebases are structured.',
  },
  {
    title: 'React became the core beneath larger frameworks',
    detail:
      'Over time, many teams stopped using raw React alone for production applications and instead adopted framework layers around it. Even so, understanding React remains important because those frameworks still depend on the same component, state, and rendering model.',
  },
]

const bigPictureThemes = [
  {
    title: 'UI is derived from state',
    body: 'One of Reacts core ideas is that the interface should be derived from current state and props rather than pieced together through imperative DOM mutations. This helps keep rendering logic predictable, but it also requires teams to think clearly about where state lives and who owns it.',
  },
  {
    title: 'Composition is more important than inheritance',
    body: 'React encourages teams to build larger interfaces by composing smaller components. This works well when components have clear responsibilities and predictable inputs. It works poorly when components become large catch-all containers with unclear ownership of data and behavior.',
  },
  {
    title: 'React is intentionally incomplete as an application stack',
    body: 'A React application usually needs more than React itself. Routing, asynchronous data handling, global state, server rendering, and deployment shape all come from surrounding choices. This flexibility is valuable, but it means React teams must choose their stack deliberately instead of assuming the library decides everything.',
  },
  {
    title: 'Rendering performance depends on architecture, not just the library',
    body: 'React can support large and responsive applications, but performance still depends on component boundaries, state placement, effect discipline, and bundle size. The library offers tools and patterns, but it does not automatically prevent over-rendering, bloated browser bundles, or poorly scoped state.',
  },
]

const keyTakeaways = [
  'React is a UI library centered on declarative components, state, and composition.',
  'Its main value is the component model and the ability to express UI as a function of state.',
  'It is usually paired with other libraries or frameworks for routing, data fetching, and application structure.',
  'Hooks are central to modern React because they define how stateful logic is written and reused.',
  'React works best when component boundaries, state ownership, and effects are designed deliberately.',
]

const topicSignals = [
  {
    title: 'Choose React when the app is highly interactive',
    body: 'If the product has complex client-side state, reusable interactive widgets, or many interface transitions that benefit from a strong component model, React is a natural fit.',
  },
  {
    title: 'Choose React when stack flexibility is valuable',
    body: 'Teams that want to choose their own router, data layer, rendering framework, and state tools often like React because the ecosystem is broad and composable rather than tightly prescriptive.',
  },
  {
    title: 'Choose React when components will be reused widely',
    body: 'React is especially effective when the team expects to build a shared design system, reusable primitives, or multi-surface UI patterns that can be composed across many routes and products.',
  },
  {
    title: 'Avoid treating React as a full architecture by itself',
    body: 'React alone does not answer every application question. Teams that choose it still need clear decisions about routing, server rendering, state ownership, data caching, and operational concerns.',
  },
]

const coreFoundations = [
  {
    title: 'Components, props, and state',
    body: 'React applications are built from components that receive props and manage state. Components should stay understandable as units of responsibility: they should know what they render, what inputs they accept, and what state they truly own.',
  },
  {
    title: 'JSX and declarative rendering',
    body: 'JSX is the syntax most React teams use to describe UI trees. It is not HTML, but a JavaScript representation of UI structure. The key idea is not the syntax itself. The key idea is that rendering follows current data and conditions rather than imperative update steps.',
  },
  {
    title: 'Hooks and reusable behavior',
    body: 'Modern React relies on hooks such as useState, useEffect, useRef, useContext, and custom hooks to manage stateful behavior. Hooks are powerful because they let teams build reusable logic patterns without adding new component layers just to share behavior.',
  },
  {
    title: 'Effects and external synchronization',
    body: 'Effects are for synchronizing React with the outside world, such as timers, event listeners, network calls, and browser APIs. Teams often struggle when they use effects for ordinary data derivation that should have stayed inside render logic instead.',
  },
  {
    title: 'State ownership and data flow',
    body: 'React works best when state has a clear owner and data flows predictably through props, context, or dedicated state tools. Confusing ownership is one of the fastest ways to make a React codebase feel fragile.',
  },
]

const frameworkFeatures = [
  {
    title: 'Hooks and custom hooks',
    body: 'Hooks make it possible to keep stateful logic close to components while still extracting shared behavior into plain functions. This is one of Reacts strongest design features, because teams can share logic without resorting to inheritance or awkward wrapper pyramids.',
  },
  {
    title: 'Context for cross-tree values',
    body: 'Context allows values such as theme, locale, auth state, or shared UI configuration to flow through the tree without manual prop drilling at every layer. It is useful when the same value is genuinely cross-cutting, but it should not become a substitute for all state design.',
  },
  {
    title: 'Suspense, lazy loading, and transitions',
    body: 'React includes primitives for deferring code loading, expressing pending UI, and marking some updates as less urgent. These features matter most in larger applications where responsiveness and progressive loading need to be treated as part of the user experience instead of as afterthoughts.',
  },
  {
    title: 'Ecosystem compatibility and framework portability',
    body: 'Reacts component model can live inside different application shells, from Vite-based SPAs to Next.js or Remix apps and even React Native environments. That portability is part of why many teams choose React as a long-term UI foundation.',
  },
  {
    title: 'Design-system and component-library friendliness',
    body: 'React is especially good at supporting reusable component libraries, headless UI primitives, and design-system-driven engineering. Teams can model common interaction patterns once and recompose them across many product surfaces.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Rendering cost is shaped by state placement',
    body: 'When high-frequency state lives too high in the tree, too many components may re-render. React remains maintainable and fast when state is placed near the components that actually depend on it, with broader coordination only where it is truly necessary.',
  },
  {
    title: 'Effects can become accidental complexity',
    body: 'One of the most common problems in React codebases is effect-heavy logic that duplicates derivation, triggers loops, or hides data flow. Effects should connect React to external systems, not replace straightforward render-time computation.',
  },
  {
    title: 'Bundle size still matters',
    body: 'React itself is only part of the browser cost. UI libraries, charting packages, editors, client-side data tools, and framework choices can all increase the amount of JavaScript users must download and execute. Application performance depends on the full stack, not only on React.',
  },
  {
    title: 'Observability and profiling remain essential',
    body: 'Large React applications benefit from profiling tools, error reporting, and render inspection because performance problems are often architectural. Developers need to know which components re-render, why they re-render, and which browser or network costs dominate the experience.',
  },
]

const ecosystemUses = [
  {
    title: 'Interactive product frontends',
    body: 'React is common in dashboards, admin tools, SaaS interfaces, content editors, and any product where the client experience is rich, stateful, and composed from many reusable widgets.',
  },
  {
    title: 'Design systems and UI platforms',
    body: 'Teams often choose React when they want to build a library of reusable primitives, patterns, and components that can be shared across products and engineering groups.',
  },
  {
    title: 'Framework-based full-stack applications',
    body: 'Many React teams no longer stop at the library itself. They use React inside frameworks such as Next.js or Remix to gain routing, server rendering, data loading, and deployment structure while keeping the React component model at the center.',
  },
  {
    title: 'Cross-environment UI work',
    body: 'Reacts mental model extends beyond the browser. Teams can reuse some concepts across web, native, and other rendering targets, which makes React valuable when UI thinking needs to stay consistent across more than one platform.',
  },
]

const comparisons = [
  {
    title: 'React versus Angular',
    body: 'React is intentionally narrower and more library-oriented, while Angular offers a broader framework model with stronger built-in structure. The tradeoff is flexibility and composability versus integrated conventions and stricter application architecture.',
  },
  {
    title: 'React versus Vue',
    body: 'Both support component-driven development, but they differ in ecosystem style and ergonomics. React leans into JSX and explicit JavaScript composition, while Vue often emphasizes a more integrated single-file component experience and a different reactive model.',
  },
  {
    title: 'React versus Svelte',
    body: 'Svelte shifts more work to compile time and often feels lighter in authoring and runtime shape, while React emphasizes a durable runtime model with a large ecosystem and extensive cross-environment support. They optimize for different tradeoffs rather than being direct substitutes in every situation.',
  },
  {
    title: 'React versus Next.js',
    body: 'React is the UI library underneath, while Next.js is a framework around React that adds routing, server rendering, data delivery, and deployment structure. Choosing between them is usually not about one replacing the other; it is about whether the application needs only the library or the full framework layer too.',
  },
]

const failureModes = [
  {
    title: 'Using effects where ordinary rendering would work',
    body: 'A frequent React mistake is moving derivation into useEffect and then synchronizing local state with props or other state by hand. That usually makes the code harder to reason about and introduces unnecessary render cycles.',
  },
  {
    title: 'Lifting too much state too high',
    body: 'Shared state should move upward only as far as necessary. When everything is centralized too early, components become tightly coupled, rendering cost increases, and the application becomes harder to evolve safely.',
  },
  {
    title: 'Over-optimizing with memoization by default',
    body: 'Memoization tools such as useMemo, useCallback, and React.memo are useful in the right place, but applying them everywhere often adds noise without solving a measured problem. Teams should optimize based on actual profiling, not superstition.',
  },
  {
    title: 'Treating context as the answer to all global state',
    body: 'Context is helpful for cross-cutting values, but it is not automatically the best solution for all shared application state. Overusing it can spread implicit coupling through the tree and make updates harder to control.',
  },
  {
    title: 'Ignoring the surrounding architecture',
    body: 'React does not answer routing, server rendering, caching, or data synchronization by itself. Teams can end up with a fragmented codebase if they choose React but never define the rest of the application model clearly.',
  },
]

const studyChecklist = [
  'Understand React as a UI library rather than a full application framework.',
  'Be clear about component boundaries, props, and which component truly owns each piece of state.',
  'Use hooks to manage reusable logic, but keep effects limited to real external synchronization.',
  'Choose surrounding tools for routing, data fetching, and global state deliberately instead of by habit.',
  'Profile real rendering problems before adding memoization or performance tricks.',
  'Keep the application architecture coherent around React rather than treating the ecosystem as a random collection of packages.',
]

const examples = [
  {
    id: 'react98-example-component',
    title: 'Example: Stateful function component',
    area: 'State',
    intro:
      'A small component can own local state directly and derive its rendered output from that state and incoming props.',
    whyFit:
      'This captures the most basic React mental model: UI is expressed as a function of state.',
    code: `import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}`,
    takeaway:
      'React components remain easiest to reason about when state ownership is local and rendering logic stays straightforward.',
  },
  {
    id: 'react98-example-lifted',
    title: 'Example: Lifted shared state',
    area: 'Data Flow',
    intro:
      'When two child components need to coordinate around the same value, the parent can own that state and pass it down through props.',
    whyFit: 'This shows how React encourages explicit state ownership and one-way data flow.',
    code: `function SearchPage() {
  const [query, setQuery] = useState('')

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <ResultsList query={query} />
    </>
  )
}`,
    takeaway:
      'Shared state should be lifted only to the nearest owner that actually needs to coordinate it.',
  },
  {
    id: 'react98-example-hook',
    title: 'Example: Custom hook',
    area: 'Reusable Logic',
    intro:
      'A custom hook extracts stateful behavior into a reusable function without adding another layer to the component tree.',
    whyFit: 'This reflects one of the defining strengths of modern React code organization.',
    code: `import { useEffect, useState } from 'react'

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return width
}`,
    takeaway:
      'Custom hooks are most useful when they name a real behavior pattern clearly instead of merely moving random code into another file.',
  },
  {
    id: 'react98-example-context',
    title: 'Example: Context for cross-tree values',
    area: 'Context',
    intro:
      'Context helps distribute values through deep trees without passing props through unrelated intermediate components.',
    whyFit:
      'This illustrates when React offers a framework-native answer for cross-cutting values.',
    code: `const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <div>Theme: {theme}</div>
}`,
    takeaway:
      'Context is useful for broad shared values, but it should not replace all state design or domain modeling.',
  },
  {
    id: 'react98-example-suspense',
    title: 'Example: Lazy-loaded component',
    area: 'Progressive Loading',
    intro:
      'React can defer loading part of the UI until it is needed, which reduces initial browser work for large interfaces.',
    whyFit:
      'This highlights how React supports progressive delivery when applications become large.',
    code: `import { Suspense, lazy } from 'react'

const HeavyEditor = lazy(() => import('./HeavyEditor'))

export function EditorScreen() {
  return (
    <Suspense fallback={<p>Loading editor...</p>}>
      <HeavyEditor />
    </Suspense>
  )
}`,
    takeaway:
      'Lazy loading is most effective when it follows real product boundaries rather than arbitrary file splits.',
  },
]

const glossary = [
  {
    term: 'React',
    definition:
      'A JavaScript library for building user interfaces through declarative, composable components.',
  },
  {
    term: 'JSX',
    definition:
      'A JavaScript syntax extension commonly used in React to describe UI trees in a declarative style.',
  },
  { term: 'Props', definition: 'Inputs passed from a parent component to a child component.' },
  {
    term: 'State',
    definition:
      'Data owned by a component or state container that can change over time and trigger re-rendering.',
  },
  {
    term: 'Hook',
    definition:
      'A React function such as useState or useEffect that lets function components access stateful or lifecycle-like behavior.',
  },
  {
    term: 'Custom hook',
    definition:
      'A reusable function built from hooks that encapsulates a repeated stateful behavior pattern.',
  },
  {
    term: 'Context',
    definition:
      'A React mechanism for sharing values across a component tree without passing props through every intermediate layer.',
  },
  {
    term: 'Reconciliation',
    definition:
      'The process React uses to compare rendered output and apply the necessary updates to the UI.',
  },
  {
    term: 'Suspense',
    definition:
      'A React mechanism for expressing pending UI while code or data dependencies are not yet ready to render.',
  },
  {
    term: 'Hydration',
    definition:
      'The process of attaching client-side React behavior to HTML that was already rendered on the server.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'react98-overview', label: 'Overview' },
    { id: 'react98-why', label: 'Why It Matters' },
    { id: 'react98-history', label: 'Historical Context' },
    { id: 'react98-themes', label: 'Big Picture Themes' },
    { id: 'react98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'react98-signals', label: 'Topic Signals' },
    { id: 'react98-foundations', label: 'Foundations' },
    { id: 'react98-features', label: 'Framework Features' },
    { id: 'react98-runtime', label: 'Runtime and Operations' },
    { id: 'react98-uses', label: 'Ecosystem Uses' },
    { id: 'react98-compare', label: 'Compare and Contrast' },
    { id: 'react98-failures', label: 'Failure Modes' },
    { id: 'react98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'react98-glossary', label: 'Terms' }],
}

export default function ReactPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'React (Frontend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="React (Frontend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">React (Frontend)</h1>
      <p className="react98-intro">
        This page is a frontend-focused overview of React as a UI library. It explains components,
        props, state, hooks, effects, data flow, ecosystem choices, performance tradeoffs, and the
        architectural discipline required to keep a React codebase understandable as it grows.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="react98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="react98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="react98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="react98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="react98-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="react98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="react98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="react98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="react98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="react98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="react98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="react98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="react98-checklist" className="bin98-section">
            <h2 className="bin98-heading">Study Checklist</h2>
            <ul>
              {studyChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>
                <strong>Area:</strong> {example.area}
              </p>
              <p>{example.intro}</p>
              <p>
                <strong>Why this example fits:</strong> {example.whyFit}
              </p>
              <div className="bin98-codebox">
                <code>{example.code}</code>
              </div>
              <p>
                <strong>Takeaway:</strong> {example.takeaway}
              </p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="react98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((entry) => (
            <p key={entry.term}>
              <strong>{entry.term}:</strong> {entry.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
