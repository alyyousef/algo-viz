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
      'React and Vue are both mature component-based technologies for building modern web interfaces, but they organize frontend thinking differently. React is primarily a UI library centered on components, JSX, and a broad ecosystem of surrounding libraries. Vue is a progressive framework with strong built-in patterns for templates, reactivity, component authoring, and application structure while still feeling relatively lightweight.',
      'The practical comparison is not only JSX versus templates or hooks versus refs and computed values. The more useful question is whether the team wants a rendering-centered library with broad architectural freedom, or a more integrated framework that provides a smoother path through many common frontend concerns while remaining less heavy than a full framework such as Angular.',
      'The original page scope was placeholder content for React vs Vue.js, with planned notes on overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs. This help-style version keeps that scope and expands it into a fuller technical reference.',
    ],
  },
  {
    id: 'bp-react',
    title: 'When React Fits Better',
    paragraphs: [
      'React is often the stronger fit when the team wants maximum ecosystem range, a component-library-first model, and freedom to choose routing, data fetching, state management, and surrounding architecture independently. It is especially attractive in organizations already deep in JavaScript or TypeScript frontend tooling and product UI work.',
      'It also fits well when the application ecosystem matters as much as the rendering model. React\'s large surrounding landscape means teams can compose highly custom stacks, adopt different frameworks built on React, and align with a large talent pool and rich third-party library surface.',
    ],
  },
  {
    id: 'bp-vue',
    title: 'When Vue Fits Better',
    paragraphs: [
      'Vue is often the stronger fit when the team wants a framework that feels approachable, cohesive, and productive without being as structurally heavy as some full-stack frontend frameworks. It is especially attractive when the organization wants a clear built-in reactivity model, Single-File Components, and official ecosystem pieces for routing and state management without assembling as many architectural decisions from scratch.',
      'It can also be a better fit when the team values clarity between template, script, and style, or when it wants a frontend framework that feels more batteries-included than React but still gentle and ergonomic to adopt.',
    ],
  },
  {
    id: 'bp-same-problem',
    title: 'Same Problem, Different Defaults',
    paragraphs: [
      'Both technologies can build large production applications, design systems, dashboards, content products, and interactive web interfaces. Both support component reuse, modern state patterns, routing, SSR-related ecosystems, testing, and build tooling.',
      'The deeper difference is not capability ceiling alone. It is how much of the frontend architecture the core technology defines for you and how much your team is expected to assemble through ecosystem choices and its own conventions.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'One common mistake is to compare only syntax preferences. JSX versus templates matters, but state modeling, reactivity semantics, framework defaults, and ecosystem shape often matter more in a long-lived codebase.',
      'Another mistake is to assume React is automatically more scalable because of market size or Vue is automatically simpler because of API elegance. Both scale well when used with discipline. The better fit depends on how much structure the team wants and how it prefers to reason about UI reactivity.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose React when flexibility, ecosystem breadth, and library-first architecture are the main advantages.',
      'Choose Vue when cohesive framework ergonomics, built-in reactivity patterns, and a smoother all-around frontend developer experience are the main advantages.',
      'If the team wants to assemble a custom architecture from a large ecosystem, React often wins. If the team wants an integrated but still lightweight-feeling framework, Vue often wins.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both React and Vue are component-driven, declarative technologies for building user interfaces. Both support composition, reusable UI building blocks, typed development, ecosystem integrations, and modern frontend production workflows.',
      'That means the decision is not usually about whether one can build real applications. The decision is about default philosophy, reactivity model, developer ergonomics, and how much framework structure the team wants to inherit.',
    ],
  },
  {
    id: 'core-scope',
    title: 'Library vs Progressive Framework',
    paragraphs: [
      'React is primarily a UI library. It focuses on describing and updating interfaces through components. Teams usually combine it with other tools for routing, server state, forms, and larger application concerns or adopt a React-based framework that provides more structure.',
      'Vue is often described as a progressive framework because it offers more integrated capabilities while remaining approachable and adoptable at different scales. Core Vue plus official ecosystem pieces often gives teams a more cohesive baseline architecture without feeling as heavy as some full frameworks.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Model',
    paragraphs: [
      'React components are typically functions written in JavaScript or TypeScript using JSX. Logic and markup-like UI structure live together in the component body, and hooks provide access to state and lifecycle-like behavior.',
      'Vue components are often authored as Single-File Components with separate template, script, and style blocks. Modern Vue heavily emphasizes the Composition API and script setup syntax, which gives Vue a powerful composition story while preserving its template-oriented feel.',
    ],
  },
  {
    id: 'core-templates',
    title: 'Templates vs JSX',
    paragraphs: [
      'React uses JSX, which means rendering is expressed directly in JavaScript or TypeScript syntax. Many teams like this because conditions, loops, and composition all live inside one language model.',
      'Vue uses templates by default, though render functions and JSX are also possible. For many teams, Vue templates feel more visually familiar and separate presentation from logic more clearly, especially when paired with Single-File Components.',
    ],
  },
  {
    id: 'core-reactivity',
    title: 'Reactivity Model',
    paragraphs: [
      'React re-renders components based on state changes and uses hooks to model local state, effects, context, and related behavior. Its mental model emphasizes component purity and state-driven rerendering, with modern tooling such as the React Compiler aiming to optimize common patterns automatically.',
      'Vue has a stronger built-in fine-grained reactivity system. Refs, reactive objects, computed values, and watchers give Vue applications a model where dependency tracking is central to how updates propagate. This often feels very natural to teams that like explicit reactive primitives.',
    ],
  },
  {
    id: 'core-state',
    title: 'State and Application Architecture',
    paragraphs: [
      'React leaves more room for ecosystem choice around broader state strategy. Context, reducers, external stores, server-state libraries, and framework-specific data layers are all common. This flexibility is powerful, but it means there is no single canonical React-wide state architecture for every app.',
      'Vue also supports multiple state strategies, but the framework and official ecosystem usually feel more coordinated. The result is often a smoother learning and onboarding path for teams that prefer official or semi-official guidance around common application concerns.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Shape',
    paragraphs: [
      'React has one of the largest frontend ecosystems in the industry. That gives teams a huge range of choices around UI kits, routing, server state, animation, form handling, frameworks, and infrastructure. The tradeoff is that teams must choose and maintain those architectural decisions deliberately.',
      'Vue has a strong ecosystem too, but it often feels more cohesive and curated. Official or closely aligned tools for routing, state management, and component authoring can reduce architecture drift and help teams converge on cleaner defaults more quickly.',
    ],
  },
  {
    id: 'core-learning',
    title: 'Learning Curve and Developer Ergonomics',
    paragraphs: [
      'React can feel easy at the component level but complex at the application-architecture level because so many surrounding decisions are intentionally left open. Teams often learn React quickly and then spend more time deciding how to structure larger apps.',
      'Vue often feels very approachable because the component authoring model, template syntax, Composition API, and official ecosystem pieces give developers a more guided path. This can make it easier for some teams to move from simple to medium-complex applications without as much architecture assembly work.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Workflow',
    paragraphs: [
      'React development is heavily influenced by the broader React ecosystem and by the frameworks or build tools chosen around it. This is a strength for teams that want flexibility, but it can mean more variation between codebases.',
      'Vue development often feels more uniform, especially when using the modern Vue toolchain with Single-File Components and official ecosystem packages. That coherence can improve onboarding and team consistency.',
    ],
  },
  {
    id: 'core-scale',
    title: 'Scale and Team Coordination',
    paragraphs: [
      'React scales extremely well, but it scales through conventions that the team defines. Large organizations can use that flexibility to their advantage, but only if they are disciplined about architecture and shared patterns.',
      'Vue also scales well, and its more cohesive defaults can help teams reduce variance across projects. This is especially helpful when the organization wants consistency without adopting a heavier all-in framework.',
    ],
  },
  {
    id: 'core-ssr',
    title: 'SSR, Routing, and App Platform Choices',
    paragraphs: [
      'React often becomes part of a broader app-platform discussion because many teams adopt a React-based framework for routing, SSR, streaming, or server component workflows rather than using plain React alone.',
      'Vue likewise has SSR and routing ecosystems, but the framework often feels more self-contained at the component and application-structure level. The decision is therefore not only about rendering but also about what platform model the team wants around the framework.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward React if the team values maximum flexibility, very broad ecosystem options, and a UI-library-first architecture.',
      'Lean toward Vue if the team values a more integrated frontend experience, template-based ergonomics, and a clearer built-in reactivity story.',
      'If the main challenge is choosing and governing many ecosystem pieces, Vue often becomes more attractive. If the main advantage is broad ecosystem leverage and architectural freedom, React often becomes more attractive.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Shape',
    description:
      'The component authoring experience already shows the philosophical difference: React keeps logic and UI in JSX-heavy functions, while Vue commonly uses Single-File Components with script and template sections.',
    snippets: [
      {
        label: 'React',
        code: `export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  )
}`,
      },
      {
        label: 'Vue',
        code: `<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Count: {{ count }}</button>
</template>`,
      },
    ],
    takeaway:
      'React makes UI authoring feel like JavaScript-first rendering. Vue makes it feel like a component file with reactive script plus template.',
  },
  {
    id: 'examples-reactivity',
    title: 'Derived State and Reactivity',
    description:
      'Both frameworks support derived UI state, but the primitives feel different in day-to-day development.',
    snippets: [
      {
        label: 'React',
        code: `function PriceSummary({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0)
  return <p>Total: {total}</p>
}`,
      },
      {
        label: 'Vue',
        code: `<script setup>
import { computed } from 'vue'

const props = defineProps<{ items: Array<{ price: number }> }>()
const total = computed(() =>
  props.items.reduce((sum, item) => sum + item.price, 0)
)
</script>

<template>
  <p>Total: {{ total }}</p>
</template>`,
      },
    ],
    takeaway:
      'React often relies on normal JavaScript expressions plus rerendering. Vue often surfaces explicit reactive primitives such as computed values.',
  },
  {
    id: 'examples-architecture',
    title: 'Architectural Prompt',
    description:
      'A short rule of thumb helps keep the choice tied to desired framework scope rather than community size alone.',
    snippets: [
      {
        label: 'React Rule',
        code: `If the team wants a UI library,
wide ecosystem range,
and freedom to compose its own app stack:
  choose React`,
      },
      {
        label: 'Vue Rule',
        code: `If the team wants a cohesive framework,
strong built-in reactivity,
and smoother official ecosystem guidance:
  choose Vue`,
      },
    ],
    takeaway:
      'The better choice usually follows how much flexibility versus cohesion the team wants from the frontend core.',
  },
  {
    id: 'examples-team',
    title: 'Team Fit Prompt',
    description:
      'The organizational question is often more important than syntax taste.',
    snippets: [
      {
        label: 'Ask This First',
        code: `Do we want to assemble our own architecture
from a large ecosystem,
or start from a more integrated framework baseline?`,
      },
      {
        label: 'Ask This Second',
        code: `Do we prefer JSX and JavaScript-first UI authoring,
or template-driven SFC ergonomics
with explicit reactive primitives?`,
      },
    ],
    takeaway:
      'This comparison becomes clearer once the team decides whether ecosystem freedom or framework cohesion is the higher-value default.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  { term: 'JSX', definition: 'A JavaScript or TypeScript syntax extension commonly used in React to describe UI structure inside component code.' },
  { term: 'Hook', definition: 'A React function such as useState or useEffect that lets function components access React features.' },
  { term: 'Single-File Component', definition: 'A `.vue` file that colocates template, script, and style for a Vue component.' },
  { term: 'Composition API', definition: 'Vue\'s modern API style for organizing logic through functions such as ref, reactive, computed, and lifecycle hooks.' },
  { term: 'ref', definition: 'A Vue reactive primitive for holding a value that notifies dependents when it changes.' },
  { term: 'computed', definition: 'A Vue reactive primitive for deriving cached values from other reactive state.' },
  { term: 'Watcher', definition: 'A Vue mechanism for running logic in response to reactive state changes.' },
  { term: 'Context', definition: 'A React feature for passing data through the component tree without manual prop drilling.' },
  { term: 'Reactivity System', definition: 'The mechanism a framework uses to track state dependencies and trigger UI updates.' },
  { term: 'Template Binding', definition: 'Vue template syntax that connects data and behavior to rendered HTML.' },
  { term: 'Component Tree', definition: 'The hierarchy of UI components that make up an application interface.' },
  { term: 'Progressive Framework', definition: 'A framework that can be adopted incrementally but also supports larger integrated application patterns.' },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const helpStyles = `
.react-vue-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.react-vue-help-window {
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

.react-vue-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.react-vue-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.react-vue-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.react-vue-help-control {
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

.react-vue-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.react-vue-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.react-vue-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.react-vue-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.react-vue-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.react-vue-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.react-vue-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.react-vue-help-toc-list li {
  margin: 0 0 8px;
}

.react-vue-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.react-vue-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.react-vue-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.react-vue-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.react-vue-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.react-vue-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.react-vue-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.react-vue-help-content p,
.react-vue-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.react-vue-help-content p {
  margin: 0 0 10px;
}

.react-vue-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.react-vue-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.react-vue-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.react-vue-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .react-vue-help-main {
    grid-template-columns: 1fr;
  }

  .react-vue-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .react-vue-help-titletext {
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

export default function ReactVsVueJsPage(): JSX.Element {
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
    document.title = `React vs Vue.js (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'React vs Vue.js',
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
    <div className="react-vue-help-page">
      <style>{helpStyles}</style>
      <div className="react-vue-help-window" role="presentation">
        <header className="react-vue-help-titlebar">
          <span className="react-vue-help-titletext">React vs Vue.js</span>
          <div className="react-vue-help-controls">
            <button className="react-vue-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="react-vue-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="react-vue-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`react-vue-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="react-vue-help-main">
          <aside className="react-vue-help-toc" aria-label="Table of contents">
            <h2 className="react-vue-help-toc-title">Contents</h2>
            <ul className="react-vue-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="react-vue-help-content">
            <h1 className="react-vue-help-doc-title">React vs Vue.js</h1>
            <p className="react-vue-help-doc-subtitle">
              Manual-style comparison of framework scope, reactivity, component ergonomics, and long-term frontend tradeoffs.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="react-vue-help-section">
                    <h2 className="react-vue-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="react-vue-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="react-vue-help-section">
                  <h2 className="react-vue-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="react-vue-help-section">
                  <h2 className="react-vue-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="react-vue-help-subheading">{snippet.label}</h3>
                      <div className="react-vue-help-codebox">
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
              <section id="glossary-terms" className="react-vue-help-section">
                <h2 className="react-vue-help-heading">Glossary</h2>
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
