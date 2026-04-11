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
      'React is a UI library for building component-based user interfaces with declarative rendering. Its core job is to describe interface structure as a function of state and props, then coordinate updates when that state changes.',
      'In practice, React is used for dashboards, product interfaces, design systems, content applications, embedded widgets, internal tools, and large front-end products. It also serves as the foundation for broader frameworks and full-stack application platforms.',
      'This help-style reference covers React across mental model, syntax, hooks, architecture, ecosystem, application-platform choices, examples, tradeoffs, and glossary terms.',
    ],
  },
  {
    id: 'bp-why-react',
    title: 'Why React Matters',
    paragraphs: [
      'React matters because it turned component-based UI development into a mainstream engineering model across the web. Reusable components, declarative rendering, JSX, and hook-based composition have influenced a large part of modern front-end architecture.',
      'Its importance is not only historical. React still matters because of the ecosystem around it: frameworks, design systems, routing options, server-state libraries, testing tools, animation libraries, and a large hiring and documentation surface.',
    ],
  },
  {
    id: 'bp-what-it-optimizes',
    title: 'What React Optimizes For',
    paragraphs: [
      'React optimizes for flexible component composition rather than for prescribing one complete application structure. Teams can start with a small widget, a page section, or a full product UI and then layer in routing, forms, data fetching, or SSR through the ecosystem.',
      'That flexibility is a strength when a product needs custom architecture. It is also the source of complexity when teams expect React alone to define the entire app model.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where React Fits Well',
    paragraphs: [
      'React is often a strong fit when the team values ecosystem breadth, a component-library-first approach, and freedom to choose surrounding tools deliberately. Organizations with strong JavaScript or TypeScript capability often gain a lot from that flexibility.',
      'It is also strong when a company wants one broad component model that can power design systems, marketing sites, dashboards, and full applications while still leaving room for different surrounding architecture choices.',
    ],
  },
  {
    id: 'bp-where-it-is-not-the-whole-story',
    title: 'Where React Is Not the Whole Story',
    paragraphs: [
      'React alone is not the whole application architecture for many real products. Routing, server rendering, data loading strategy, mutation workflows, form handling, authentication boundaries, and deployment patterns are usually decided with other tools or a React-based framework.',
      'This is why serious React discussions quickly become discussions about the broader stack. The library is central, but the app model often lives one layer above it.',
    ],
  },
  {
    id: 'bp-common-misread',
    title: 'Common Misreadings',
    paragraphs: [
      'One common mistake is to treat React as if it were already a full framework. Another is to treat its flexibility as automatically simpler than opinionated frameworks. Flexibility helps only when the team can govern the choices it creates.',
      'A second mistake is to evaluate React only by syntax taste. JSX matters, but long-term outcomes depend more on state architecture, data strategy, framework layering, and team consistency.',
    ],
  },
  {
    id: 'bp-decision-prompt',
    title: 'Decision Prompt',
    paragraphs: [
      'The useful decision question is not merely â€œDo we like React?â€ The better question is whether the team wants a highly flexible UI library with a huge ecosystem and is prepared to define architecture around it.',
      'If the project needs stronger framework answers up front, the decision may actually be between different React-based frameworks or between React and a more integrated non-React framework.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'React centers on components, JSX, hooks, and state-driven rerendering.',
      'Its main strengths are ecosystem breadth, composability, incremental adoption, and architectural freedom.',
      'Its main tradeoffs are architecture variance, the need for more surrounding decisions, and the fact that core React is a UI library rather than a complete application platform.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'React asks developers to think in terms of UI as a function of state. A component receives inputs through props, manages local state when needed, and returns a description of the interface for the current conditions.',
      'This model is powerful because it reduces imperative DOM bookkeeping. Instead of manually changing many elements after every event, developers update state and let React reconcile the view.',
    ],
  },
  {
    id: 'core-library-scope',
    title: 'Library Scope',
    paragraphs: [
      'React is primarily concerned with describing and updating user interfaces through components. It is not, by itself, a full answer for routing, forms, data loading, deployment workflow, or server rendering architecture.',
      'That scope is intentional. The library remains broadly reusable because it solves a narrower problem well, but teams must understand where the library ends and where the surrounding stack begins.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Model',
    paragraphs: [
      'Modern React components are usually JavaScript or TypeScript functions that return JSX. This function-component model has become the default way to write React because it works naturally with hooks and composition-driven reuse.',
      'Components compose by nesting and by passing props. This makes UI structure explicit and usually keeps reuse centered on small, purposeful building blocks rather than on large template inheritance systems.',
    ],
  },
  {
    id: 'core-jsx',
    title: 'JSX and Rendering Style',
    paragraphs: [
      'React uses JSX, a syntax extension that lets developers express UI structure directly inside JavaScript or TypeScript. Conditions, loops, inline expressions, and component composition all stay in one language model rather than splitting between script and a separate template language.',
      'This is one reason React often feels code-centric. Teams that like rendering logic to live in ordinary language expressions usually find JSX ergonomic, while teams that prefer a template layer may prefer other approaches.',
    ],
  },
  {
    id: 'core-props-state',
    title: 'Props and Local State',
    paragraphs: [
      'Props are inputs from parent components. Local state is component-managed data that changes over time. This distinction matters because React encourages a top-down data flow where parents provide inputs and children signal changes upward through callbacks or shared state patterns.',
      'Well-structured React code often keeps state close to where it is needed, but not lower than the point where multiple consumers need to coordinate on it.',
    ],
  },
  {
    id: 'core-hooks',
    title: 'Hooks',
    paragraphs: [
      'Hooks are how function components access React features such as state, effects, refs, context, transitions, and other coordinated behavior. They also enable custom hooks, which let teams package reusable logic without introducing inheritance-heavy component abstractions.',
      'The introduction of hooks changed React application structure significantly. Large React codebases today often use custom hooks as one of the primary ways to organize stateful UI logic.',
    ],
  },
  {
    id: 'core-effects',
    title: 'Effects and External Synchronization',
    paragraphs: [
      'Effects are used when a component must synchronize with something outside pure rendering, such as subscriptions, timers, imperative browser APIs, or external systems. They are not meant to be a generic substitute for normal render-time logic.',
      'A common React quality issue is overusing effects for state derivation that could have stayed inside pure render logic. Good React code uses effects deliberately rather than treating them as a default place to put any code that runs after render.',
    ],
  },
  {
    id: 'core-context',
    title: 'Context and Shared Dependencies',
    paragraphs: [
      'Context is how React passes values through a component tree without manually threading props through every layer. It is commonly used for themes, routing state, auth state, configuration, and other shared concerns.',
      'Context is powerful, but it is not automatically the best solution for every app-wide state problem. Teams still need to think carefully about update scope, ownership, and whether a dedicated external store or server-state library is more appropriate.',
    ],
  },
  {
    id: 'core-state-architecture',
    title: 'State Architecture',
    paragraphs: [
      'React does not prescribe one canonical state model for every application. Local component state, reducer patterns, context, external stores, and server-state libraries can all play legitimate roles depending on the product.',
      'This flexibility is valuable, but it means architecture discipline matters. Good React teams usually define clear rules about what belongs in local state, shared client state, URL state, or server-owned data.',
    ],
  },
  {
    id: 'core-data-fetching',
    title: 'Data Fetching and Server Data',
    paragraphs: [
      'React core can render server-provided data or client-fetched data, but it does not by itself prescribe a single data-loading architecture. Teams often choose between component-level fetching, route-level loading in a framework, or dedicated server-state tools depending on the product shape.',
      'This is one reason plain React and React-with-framework feel different. The closer the product gets to route-level loading, SSR, streaming, or server-driven workflows, the more important the surrounding framework becomes.',
    ],
  },
  {
    id: 'core-forms',
    title: 'Forms and User Input',
    paragraphs: [
      'React form strategy is flexible. Teams can use controlled inputs, uncontrolled inputs, or specialized form libraries for validation and form-state coordination. That flexibility is useful, but it also means form architecture can vary significantly between codebases.',
      'For small forms, plain React state is often enough. For complex, validation-heavy, or mutation-heavy workflows, teams usually adopt clearer conventions or supporting libraries so forms do not become ad hoc.',
    ],
  },
  {
    id: 'core-rendering-performance',
    title: 'Rendering and Performance',
    paragraphs: [
      'React rerenders components when relevant state or props change, then reconciles the resulting output. In practice, performance depends more on component boundaries, state placement, list handling, rendering discipline, and expensive calculations than on shallow slogans about rerendering.',
      'Modern React also includes concurrency-oriented primitives and compiler-era tooling intended to improve responsiveness and reduce some categories of manual performance tuning. The right approach is still to measure real bottlenecks rather than optimize from folklore.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Workflow',
    paragraphs: [
      'React development is heavily shaped by the surrounding toolchain. Build tools, routers, test runners, form libraries, linting rules, type strategy, and framework choices all influence the day-to-day developer experience.',
      'That means two React projects can feel very different. Teams that care about maintainability usually standardize the surrounding workflow rather than assuming React itself will make projects uniform.',
    ],
  },
  {
    id: 'core-framework-layer',
    title: 'React and Higher-Level Frameworks',
    paragraphs: [
      'Many teams do not stop at plain React. They adopt a React-based framework for routing, server rendering, streaming, file-based conventions, or route-level data architecture. This changes the practical experience significantly compared with plain client-side React.',
      'The important engineering point is that React and React-based frameworks are related but distinct decisions. React is the UI core. The framework layer defines much of the broader application lifecycle.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Shape',
    paragraphs: [
      'React has one of the largest front-end ecosystems in the industry. That gives teams access to many strong options for UI libraries, routing, forms, testing, animation, server-state, state management, and full frameworks.',
      'The tradeoff is choice overload. A large ecosystem helps only when the team can choose boring, stable defaults and avoid rebuilding the architecture from scratch on every project.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling in Teams',
    paragraphs: [
      'React scales well, but it scales through conventions chosen by the team rather than through one single framework-wide architectural answer. This can be a major strength for expert teams and a source of inconsistency for teams that need stronger guardrails.',
      'Large React organizations often succeed by narrowing the allowed tool surface, defining state and routing standards, and making component and data boundaries very explicit.',
    ],
  },
  {
    id: 'core-adoption',
    title: 'Incremental Adoption and Migration',
    paragraphs: [
      "One of React's enduring advantages is incremental adoption. Teams can embed React in one page section, build isolated widgets, or grow into a full single-page or server-rendered application over time.",
      'That makes React attractive for modernization efforts where replacing the entire front end at once would be too risky. The same flexibility that helps gradual adoption also means teams should be explicit about integration boundaries and long-term migration direction.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'React is common in SaaS dashboards, consumer-facing products, admin interfaces, design systems, content products, e-commerce front ends, and embedded interface islands inside larger applications.',
      'It is also a common foundation for multi-team platform work because the ecosystem around it can support many adjacent needs without forcing one application style for every product.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'React can feel simple at the component level and complicated at the application-architecture level. Teams that underestimate the architecture layer often end up with inconsistent routing, state, form, and data-loading patterns.',
      "Another tradeoff is that React's popularity can create false confidence. A huge ecosystem and labor market do not remove the need for disciplined architecture. They simply provide more options and more ways to assemble a strong or weak system.",
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'React is commonly compared with Vue for ecosystem freedom versus a more cohesive progressive framework, with Angular for UI-library scope versus a full framework, and with signal-based or compiler-first systems for how they model updates and reactivity.',
      "These comparisons are useful because they reveal React's actual role: a flexible rendering-centered core with enormous ecosystem leverage, not a single default answer to every front-end architecture question.",
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Shape',
    description: 'A simple React component.',
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
    title: 'Derived UI State',
    description:
      'React often keeps derived UI logic as ordinary JavaScript expressions inside render rather than requiring a separate dedicated reactive primitive.',
    snippets: [
      {
        label: 'PriceSummary.tsx',
        code: `export default function PriceSummary(props: {
  items: Array<{ price: number }>
}) {
  const total = props.items.reduce((sum, item) => sum + item.price, 0)
  const empty = props.items.length === 0

  return <p>{empty ? 'No items' : \`Total: \${total}\`}</p>
}`,
      },
    ],
    takeaway:
      "A large part of React's appeal is that many UI derivations stay as plain JavaScript rather than moving into a special template or reactive API.",
  },
  {
    id: 'examples-custom-hook',
    title: 'Custom Hook Pattern',
    description:
      'Custom hooks are one of the main ways React teams package reusable stateful logic without turning everything into a global abstraction.',
    snippets: [
      {
        label: 'useToggle.ts',
        code: `import { useState } from 'react'

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)

  function toggle() {
    setValue((current) => !current)
  }

  return { value, setValue, toggle }
}`,
      },
      {
        label: 'Panel.tsx',
        code: `import { useToggle } from './useToggle'

export default function Panel() {
  const { value: open, toggle } = useToggle()

  return (
    <>
      <button onClick={toggle}>Toggle</button>
      {open && <section>Details</section>}
    </>
  )
}`,
      },
    ],
    takeaway:
      'Reusable logic in React is often organized through hooks rather than through inheritance or framework-specific service objects.',
  },
  {
    id: 'examples-context',
    title: 'Context Example',
    description:
      'Context helps avoid manual prop drilling when many nested components need a shared value.',
    snippets: [
      {
        label: 'theme.tsx',
        code: `import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext<'light' | 'dark'>('light')

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<'light' | 'dark'>('dark')
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}`,
      },
    ],
    takeaway:
      'Context is useful for shared tree-wide values, but teams still need to decide carefully what truly belongs there.',
  },
  {
    id: 'examples-patterns',
    title: 'Architecture Snapshot',
    description:
      'A typical React application separates the core UI library from the surrounding architecture that defines routing, data flow, forms, and app-platform behavior.',
    snippets: [
      {
        label: 'Common Stack',
        code: `React core for components and hooks
Routing chosen through a router or a React-based framework
Server data handled through framework loaders or server-state tools
Forms handled through plain React patterns or focused form libraries
Higher-level framework added when SSR or platform structure matters`,
      },
    ],
    takeaway:
      "React's flexibility is real, but it means the team must be deliberate about the architecture around the library.",
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'React',
    definition:
      'A UI library for building component-based user interfaces with declarative rendering.',
  },
  {
    term: 'JSX',
    definition:
      'A JavaScript or TypeScript syntax extension used to describe UI structure inside React component code.',
  },
  {
    term: 'Hook',
    definition:
      'A React function such as `useState` or `useEffect` that lets function components access React features.',
  },
  {
    term: 'Function component',
    definition:
      'The modern React component form where a function returns JSX and uses hooks for state and related behavior.',
  },
  { term: 'Props', definition: 'Inputs passed from a parent component to a child component.' },
  {
    term: 'State',
    definition: 'Component-managed data that can change over time and trigger rerendering.',
  },
  {
    term: 'Context',
    definition:
      'A React feature for passing values through the component tree without manual prop drilling.',
  },
  {
    term: 'Effect',
    definition:
      'React logic used to synchronize with external systems or imperative APIs after rendering.',
  },
  {
    term: 'Custom hook',
    definition: 'A reusable function that combines React hooks into a shareable unit of logic.',
  },
  {
    term: 'Rerender',
    definition:
      'The process where React runs component rendering logic again after relevant state or props change.',
  },
  {
    term: 'Ref',
    definition:
      'A React object used to hold mutable values or access imperative DOM instances without causing rerenders.',
  },
  {
    term: 'Reducer',
    definition:
      'A state-transition pattern often used in React when updates are easier to describe as actions.',
  },
  {
    term: 'Controlled input',
    definition: 'A form pattern where input values are driven directly from React state.',
  },
  {
    term: 'Transition',
    definition:
      'A React mechanism for marking some updates as lower-priority so urgent UI work can stay responsive.',
  },
  {
    term: 'Deferred value',
    definition:
      'A React mechanism for letting some rendered values lag behind urgent state changes to improve responsiveness.',
  },
  {
    term: 'Component tree',
    definition: 'The hierarchy of React components that together make up an application interface.',
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
    pageTitle: 'React',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="React"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">React</h1>
      <p className="react-help-doc-subtitle">
        Manual-style reference covering overview, JSX, hooks, state model, ecosystem shape,
        framework layering, tradeoffs, and practical examples.
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
