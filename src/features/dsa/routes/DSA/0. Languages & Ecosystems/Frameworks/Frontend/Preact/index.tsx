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
      'Preact is a lightweight component library for building user interfaces with a modern React-like API. It focuses on small size, strong performance, and close alignment with the browser platform while still supporting familiar concepts such as components, JSX, hooks, context, and virtual DOM rendering.',
      'In practice, Preact is used for embedded widgets, marketing sites, content-heavy products, dashboards, progressive enhancement, and applications where every kilobyte matters. It is also used as a lower-overhead substitute for React in projects that want a similar authoring model with less framework weight.',
      'This reference covers the Preact mental model, rendering, hooks, events, DOM differences, signals, `preact/compat`, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why-preact',
    title: 'Why Preact Matters',
    paragraphs: [
      'Preact matters because it shows how much of modern component development can be delivered with a very small runtime. It offers a strong answer for teams that like the React component model but want a more compact, DOM-oriented library.',
      'It also matters as a practical migration and substitution tool. With `preact/compat`, many React-style codebases and libraries can run on top of Preact, making it attractive when bundle size, startup cost, or embeddability are more important than perfect framework identity.',
    ],
  },
  {
    id: 'bp-what-it-optimizes',
    title: 'What Preact Optimizes For',
    paragraphs: [
      'Preact optimizes for minimal library overhead, directness, and good performance without a large runtime tax. The goal is not to implement every possible framework feature first, but to stay small, useful, and close to the DOM.',
      'That optimization target shapes the library. Preact deliberately avoids some React-specific abstractions in core, relies on standard browser event handling, and keeps the default mental model simpler and lighter where possible.',
    ],
  },
  {
    id: 'bp-react-relationship',
    title: 'Relationship to React',
    paragraphs: [
      'Preact is often introduced as a lightweight alternative to React with a similar modern API. That description is directionally useful, but it can hide important details. Preact is not merely a byte-for-byte reimplementation of React. It has its own priorities and some behavior differences, especially in core mode.',
      'The relationship becomes much closer when `preact/compat` is used. Compat exists specifically to let React-oriented packages and application code work with Preact by providing a compatibility layer over the Preact core.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Preact Fits Well',
    paragraphs: [
      'Preact is a strong fit for projects where startup performance, low bundle size, or embeddability matter. It also fits teams that want a component and hook model similar to React but with a smaller default runtime and closer DOM behavior.',
      'It is especially useful when UI is only one part of a larger page, when multiple widgets are embedded in non-SPA environments, or when a team wants the option to reach into the React ecosystem through compat without paying full React cost in every case.',
    ],
  },
  {
    id: 'bp-where-it-needs-care',
    title: 'Where It Needs Care',
    paragraphs: [
      'Preact asks teams to be clear about whether they are using core Preact patterns or depending on React compatibility behavior. That distinction affects event handling, library compatibility, and how much React-specific knowledge transfers directly.',
      'It also requires realistic evaluation of ecosystem needs. If a project depends heavily on niche React-only libraries or very new React features, a full React stack may still be the easier operational choice.',
    ],
  },
  {
    id: 'bp-common-misreadings',
    title: 'Common Misreadings',
    paragraphs: [
      'A common mistake is to assume Preact is just React but smaller. The API overlap is real, but Preact deliberately follows DOM behavior more closely in core and does not attempt to copy every React abstraction exactly.',
      'Another mistake is to think size is the only reason to choose it. Preact is also interesting because it is portable, easy to embed, and often simpler to reason about when teams want browser-aligned behavior instead of a thicker framework layer.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Preact centers on small size, components, JSX, hooks, and browser-aligned behavior.',
      'Its main strengths are low overhead, good performance, embeddability, and the option to use `preact/compat` for React ecosystem access.',
      'Its main tradeoffs are ecosystem scale, behavior differences from React in core mode, and the need to decide carefully when compat is or is not required.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Preact asks developers to build UI from components that render according to props and state. That basic model is familiar to anyone who has used modern React-style component systems, but Preact tries to keep the runtime and abstractions thinner.',
      'The useful framing is that Preact is a component library with a small core and strong platform alignment. It is not trying to be a giant all-in-one application framework by default.',
    ],
  },
  {
    id: 'core-library-scope',
    title: 'Library Scope',
    paragraphs: [
      'Preact is primarily responsible for rendering components, updating the DOM efficiently, and supporting stateful UI patterns through hooks, context, refs, and related primitives. It does not define the entire app platform for routing, server architecture, deployment, or data orchestration.',
      'That narrower scope is a deliberate design choice. Teams can keep Preact small and compose other pieces around it rather than taking on a large opinionated framework by default.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Model',
    paragraphs: [
      'Preact supports function components, JSX, props, local state, and context in a style that feels close to modern React development. The main authoring experience is straightforward: components receive inputs, produce UI, and rerender when reactive state changes.',
      'This makes Preact approachable to teams that already know component-based UI development. The main distinction is usually not component syntax, but runtime size, DOM behavior, and compatibility choices.',
    ],
  },
  {
    id: 'core-hooks',
    title: 'Hooks',
    paragraphs: [
      'Hooks in Preact are provided through `preact/hooks` and cover familiar needs such as local state, effects, refs, memoization, callbacks, and context consumption. This gives Preact a modern component API that maps well to the broader hook-centered ecosystem.',
      'For many teams, this is why Preact feels immediately usable. It keeps the core interaction model familiar while still remaining a smaller and more DOM-oriented library.',
    ],
  },
  {
    id: 'core-events',
    title: 'Event Model',
    paragraphs: [
      "One of the most important differences from React is that Preact core does not implement a synthetic event system. It uses the browser's native event model through standard event listeners.",
      "This means event names and behavior are often closer to plain DOM expectations. For example, in core Preact, form input handling commonly uses `onInput` instead of React's `onChange`, and some event naming details differ unless `preact/compat` is used.",
    ],
  },
  {
    id: 'core-dom-alignment',
    title: 'Closer to the DOM',
    paragraphs: [
      'Preact follows DOM conventions more closely than React in several areas. Custom elements and browser-native event behavior fit naturally into that approach, which can make Preact feel simpler in projects that need tight integration with platform APIs or third-party scripts.',
      'This browser alignment is a design goal, not an accident. Preact intentionally keeps a thinner abstraction layer between component code and the platform underneath.',
    ],
  },
  {
    id: 'core-rendering',
    title: 'Rendering and Updates',
    paragraphs: [
      'Preact uses a virtual DOM and diffing model to update the interface when state or props change. The library keeps this machinery compact and tuned for common UI workloads.',
      'The practical engineering lesson is that good Preact performance still depends on component boundaries, state placement, list rendering, and application architecture. A small runtime helps, but it does not remove the need for disciplined UI design.',
    ],
  },
  {
    id: 'core-signals',
    title: 'Signals in the Preact Ecosystem',
    paragraphs: [
      'Signals are part of the broader Preact ecosystem through `@preact/signals` and related packages. They provide fine-grained reactive state that can be used alongside or instead of hook-heavy patterns depending on the project.',
      'This matters because Preact is not limited to one state style. Teams can stay with familiar hook-based local state, adopt signals where they improve clarity, or mix both deliberately.',
    ],
  },
  {
    id: 'core-compat',
    title: '`preact/compat`',
    paragraphs: [
      "`preact/compat` is Preact's compatibility layer for React and ReactDOM style APIs. It exists so that existing React code and many React libraries can run on Preact with minimal or no source changes once bundler aliases are configured.",
      "Compat is one of Preact's most strategically important pieces. It allows teams to use Preact not only as a fresh-start choice, but also as a migration path or optimization layer for React-oriented codebases.",
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Shape',
    paragraphs: [
      "Preact has a healthy ecosystem, but it is smaller than React's. That means there are fewer default answers, fewer niche packages, and a smaller volume of community examples. In exchange, the core tends to stay focused and light.",
      'For many teams the real ecosystem question is not only "Does Preact have enough native packages?" but "Can we reach the React ecosystem safely through compat where needed?"',
    ],
  },
  {
    id: 'core-routing-ssr',
    title: 'Routing and SSR',
    paragraphs: [
      'Preact can be used in client-rendered applications, routed SPAs, SSR setups, and hybrid architectures. However, these concerns are usually handled by surrounding tools or frameworks rather than by Preact core alone.',
      'That means Preact is best thought of as the rendering and component layer, while routing and server-side architecture remain separate design decisions.',
    ],
  },
  {
    id: 'core-embed',
    title: 'Embeddability and Incremental Use',
    paragraphs: [
      "One of Preact's strongest practical advantages is that it embeds well into existing pages and mixed technology stacks. Its small footprint makes it well suited for widgets, progressive enhancement, and partial modernization efforts.",
      'This can be operationally important. Teams do not always need a full framework takeover. Sometimes they need a component system that can live beside server templates, CMS pages, or legacy application surfaces.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Workflow',
    paragraphs: [
      'Preact works with modern JavaScript and TypeScript tooling, JSX transforms, and common front-end build pipelines. The everyday workflow can feel very close to React development, especially when using hooks and compat.',
      'The main difference is that teams should decide up front whether the project is written as native Preact, React-compatible Preact, or a mixture. That choice affects event conventions, aliasing, and how examples from the wider ecosystem should be interpreted.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Preact is a good fit for lightweight applications, embedded UI, performance-sensitive pages, marketing experiences with interactivity, design-system-backed widgets, and React-like projects where runtime size matters.',
      'It is also attractive to teams that want to retain a familiar component model while reducing the baseline framework footprint.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Preact gives up some exact React behavior in core mode in order to remain small and focused. That trade can be excellent for performance-conscious projects, but it means developers must understand where behavior differences matter.',
      'Another tradeoff is ecosystem gravity. React still has the larger mindshare, documentation volume, and third-party surface area, so Preact teams sometimes need more deliberate package selection.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Preact is commonly compared with React for API familiarity versus runtime weight, with other lightweight UI libraries for embeddability and DOM alignment, and with signal-oriented systems for how state and updates are modeled.',
      'These comparisons help position Preact correctly: it is a lightweight, practical component library with strong React adjacency, not merely a clone and not a full-stack framework by default.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Shape',
    description:
      'A typical Preact component looks very similar to a modern React component, but hooks come from `preact/hooks` and the runtime stays much smaller.',
    snippets: [
      {
        label: 'Counter.tsx',
        code: `import { h } from 'preact'
import { useState } from 'preact/hooks'

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
      'The core authoring model is intentionally familiar: function components, JSX, and hooks, but delivered in a smaller package.',
  },
  {
    id: 'examples-events',
    title: 'Native Event Style',
    description:
      'In core Preact, browser-native event conventions matter more. For text inputs, `onInput` is often the natural default unless compat is being used to emulate React behavior.',
    snippets: [
      {
        label: 'SearchBox.tsx',
        code: `import { h } from 'preact'
import { useState } from 'preact/hooks'

export default function SearchBox() {
  const [query, setQuery] = useState('')

  return (
    <label>
      Search
      <input
        value={query}
        onInput={(event) => {
          const target = event.currentTarget as HTMLInputElement
          setQuery(target.value)
        }}
      />
    </label>
  )
}`,
      },
    ],
    takeaway:
      'This example captures one of the most important practical differences from React: core Preact favors standard DOM event behavior.',
  },
  {
    id: 'examples-compat',
    title: '`preact/compat` Migration Pattern',
    description:
      'Compat lets many React applications and packages run on Preact by aliasing React imports to `preact/compat`. This is often the easiest way to evaluate Preact in an existing React codebase.',
    snippets: [
      {
        label: 'vite.config.ts',
        code: `import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
})`,
      },
    ],
    takeaway:
      'Compat is a strategic bridge: it lowers migration cost and gives Preact access to much of the React ecosystem.',
  },
  {
    id: 'examples-signals',
    title: 'Signals Example',
    description:
      'Signals are optional in Preact, but they are part of the ecosystem and useful when teams want fine-grained state updates without threading every concern through hooks.',
    snippets: [
      {
        label: 'cart.ts',
        code: `import { signal } from '@preact/signals'

export const itemCount = signal(0)

export function addItem() {
  itemCount.value += 1
}`,
      },
      {
        label: 'CartBadge.tsx',
        code: `import { h } from 'preact'
import { itemCount } from './cart'

export default function CartBadge() {
  return <span>Items: {itemCount}</span>
}`,
      },
    ],
    takeaway:
      'Preact is not locked into one state style. Hooks cover most component-local needs, while signals can improve clarity for shared reactive values.',
  },
  {
    id: 'examples-architecture',
    title: 'Architecture Snapshot',
    description:
      'A typical Preact application keeps the core library focused on rendering and composes routing, data flow, or SSR concerns around it depending on the product.',
    snippets: [
      {
        label: 'Common Stack',
        code: `Preact core for components and updates
Hooks from preact/hooks for local state and effects
Signals optionally added for fine-grained shared state
Compat enabled only when React-oriented packages are needed
Routing and SSR chosen through surrounding tools or frameworks`,
      },
    ],
    takeaway:
      'Preact works best when the team is explicit about what belongs in the small core and what should be handled by optional surrounding tools.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Preact',
    definition:
      'A lightweight component library for building user interfaces with JSX, hooks, virtual DOM rendering, and close alignment with browser behavior.',
  },
  {
    term: 'Hook',
    definition:
      'A function from `preact/hooks` such as `useState` or `useEffect` that gives a function component stateful or coordinated behavior.',
  },
  {
    term: 'Virtual DOM',
    definition:
      'An in-memory representation of UI structure used to determine efficient DOM updates when component output changes.',
  },
  {
    term: 'JSX',
    definition:
      'A syntax extension used to describe UI structure directly in JavaScript or TypeScript component code.',
  },
  {
    term: 'preact/compat',
    definition:
      'A compatibility layer that makes many React and ReactDOM APIs work on top of Preact, often enabling React libraries and codebases to run with minimal changes.',
  },
  {
    term: 'Synthetic events',
    definition:
      'A React abstraction over browser events. Preact core intentionally does not use a synthetic event system and instead relies on native browser events.',
  },
  {
    term: 'onInput',
    definition:
      'A standard browser input event handler that is often preferred in core Preact for text input handling.',
  },
  {
    term: 'Context',
    definition:
      'A mechanism for sharing values through the component tree without passing them manually through every intermediate prop layer.',
  },
  {
    term: 'Signal',
    definition:
      'A fine-grained reactive value used through the Preact signals ecosystem for efficient updates and shared state patterns.',
  },
  {
    term: 'Embeddability',
    definition:
      'The ability to place a UI library inside an existing page, widget, CMS surface, or mixed stack without requiring a full application rewrite.',
  },
  {
    term: 'Compat mode',
    definition:
      'A project setup where React imports are aliased to `preact/compat` so React-style packages and APIs can run on Preact.',
  },
  {
    term: 'Diffing',
    definition:
      'The process of comparing previous and next virtual DOM output in order to update the real DOM efficiently.',
  },
  {
    term: 'Function component',
    definition:
      'A component written as a function that returns JSX and can use hooks for state and related logic.',
  },
  {
    term: 'Incremental adoption',
    definition:
      'A migration pattern where Preact is added to part of an existing product or page instead of replacing the whole front end at once.',
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
    pageTitle: 'Preact',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Preact"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Preact</h1>
      <p className="bin98-doc-subtitle">
        Manual-style reference covering overview, hooks, DOM alignment, native events, compat
        strategy, signals, tradeoffs, and practical examples.
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
