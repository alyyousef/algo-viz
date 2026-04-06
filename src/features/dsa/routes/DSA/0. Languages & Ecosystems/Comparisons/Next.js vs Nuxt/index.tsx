import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Next.js and Nuxt occupy very similar positions in their respective ecosystems. Next.js is a major full-stack framework built around React, while Nuxt is a major full-stack framework built around Vue. Both handle routing, server rendering, static generation, data loading, layouts, deployment patterns, and modern application delivery concerns. That means the comparison is usually less about which framework can technically do more and more about which component model, ecosystem, and team mental model fit the organization better.',
  'In practice, the strongest deciding factor is often upstream ecosystem choice: React and its surrounding culture versus Vue and its surrounding culture. Next.js benefits from the enormous gravity of React and the broader platform story around modern React application delivery. Nuxt benefits from Vue’s ergonomics, a cohesive developer experience, and a framework model that many teams find especially approachable. The right choice usually depends on framework philosophy, organization skill set, and how much platform breadth versus framework coherence the team wants.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Next.js is a full-stack React framework used for marketing sites, dashboards, SaaS applications, content platforms, and many other web products. It supports server-side rendering, static generation, route-based composition, server-side logic, and a large surrounding ecosystem. Many teams treat it as the default serious React application platform.',
      'Nuxt is the analogous framework in the Vue ecosystem. It gives Vue applications routing, server rendering, static generation, layouts, data handling patterns, and a highly integrated development experience. Many teams choose Nuxt because it makes Vue-based full-stack application development feel coherent and productive from the start.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'The core difference is not that one is full-stack and the other is not. Both are. The deeper difference is that each framework inherits the ideas and developer habits of its component ecosystem. Next.js inherits React’s flexibility, large ecosystem, and evolving server-client model. Nuxt inherits Vue’s emphasis on approachability, cohesive conventions, and a more guided application experience.',
      'This means the real comparison is often React-platform gravity versus Vue-framework coherence. Next.js usually wins when organizations want the broadest React ecosystem alignment. Nuxt usually wins when organizations want the Vue experience extended cleanly into full-stack application development.',
    ],
    bullets: [
      'Next.js is the major React full-stack framework.',
      'Nuxt is the major Vue full-stack framework.',
      'Next.js often emphasizes ecosystem breadth and platform reach.',
      'Nuxt often emphasizes coherence, conventions, and Vue ergonomics.',
    ],
  },
  {
    id: 'bp-when-next-fits',
    title: 'When Next.js Is Usually the Better Fit',
    paragraphs: [
      'Next.js is usually the better fit when the team is already committed to React, needs access to the larger React ecosystem, or wants the most common platform choice for large modern React applications. It is especially compelling when community reach, hiring familiarity, and third-party integration breadth matter heavily.',
      'It is also attractive when the application may need several rendering strategies, broad framework capabilities, or alignment with a larger React-centered organization.',
    ],
    bullets: [
      'Teams already invested in React and its ecosystem.',
      'Products that want broad community support and hosting integration.',
      'Organizations standardizing around React across many projects.',
      'Cases where platform breadth matters more than a narrower framework philosophy.',
    ],
  },
  {
    id: 'bp-when-nuxt-fits',
    title: 'When Nuxt Is Usually the Better Fit',
    paragraphs: [
      'Nuxt is usually the better fit when the team prefers Vue, values a cohesive framework experience, or wants strong conventions around full-stack application structure without adopting the broader and sometimes more fragmented React platform world.',
      'It is especially appealing for teams that like Vue’s single-file component style, reactive mental model, and overall ergonomics, and want those strengths carried into SSR, routing, and server-side features.',
    ],
    bullets: [
      'Teams that prefer Vue as the frontend foundation.',
      'Projects that benefit from strong framework coherence and guided conventions.',
      'Organizations that want a smooth full-stack Vue experience.',
      'Developers who value Vue ergonomics more than React ecosystem breadth.',
    ],
  },
  {
    id: 'bp-hidden-tradeoff',
    title: 'The Hidden Tradeoff',
    paragraphs: [
      'The hidden tradeoff is not just syntax preference. It is how much ecosystem breadth and conceptual variability the team wants to absorb. Next.js sits inside a larger React world that can be extremely powerful but also broad, fast-moving, and sometimes conceptually noisy.',
      'Nuxt often feels more internally coherent because Vue and Nuxt together present a more guided experience. That coherence can increase productivity and reduce decision fatigue, but it may come with less ecosystem gravity than the React world in some organizations.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The best choice usually starts with whether the organization is actually choosing between React and Vue. If that question is already settled, the framework choice is often obvious. If not, then the decision becomes about team ergonomics, ecosystem fit, hiring, hosting assumptions, and the long-term application platform model.',
    ],
    bullets: [
      'Choose Next.js when React ecosystem alignment is the main advantage.',
      'Choose Nuxt when Vue ergonomics and framework coherence are the main advantage.',
      'Treat the upstream component ecosystem as part of the decision, not a side detail.',
      'Optimize for the team model you want to scale.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-ecosystem-center',
    title: 'Ecosystem Center of Gravity',
    paragraphs: [
      'Next.js sits in the middle of the React ecosystem, which gives it access to enormous community momentum, many supporting libraries, and a very large talent pool. This is a major practical advantage when organizations want broad compatibility and easy hiring.',
      'Nuxt sits in the Vue ecosystem, which is smaller than React’s but often valued for its clarity and consistency. For teams already committed to Vue, this is not a disadvantage at all. It often means a more focused ecosystem with fewer competing patterns.',
    ],
  },
  {
    id: 'core-component-model',
    title: 'Component and Developer Model',
    paragraphs: [
      'Next.js inherits React’s component model, including JSX or TSX, hooks, and the broader React mental model around composition and state. Teams comfortable in React often find this natural, especially when they already have reusable frontend patterns in place.',
      'Nuxt inherits Vue’s component model, including Vue single-file components, declarative templates, and Vue’s reactive APIs. Many developers find Vue and Nuxt easier to reason about because the framework conventions feel more integrated and less open-ended.',
    ],
  },
  {
    id: 'core-routing-layouts',
    title: 'Routing and Layouts',
    paragraphs: [
      'Both frameworks provide file-based routing and support nested layouts, page composition, and route-level boundaries. Next.js has expanded significantly around its newer routing model and server-driven page composition patterns.',
      'Nuxt also offers a strong route and layout model, often with a very smooth developer experience. For many teams, these core framework features feel a little more immediately coherent in Nuxt because Vue and Nuxt conventions align tightly.',
    ],
  },
  {
    id: 'core-data-loading',
    title: 'Data Loading and Server Behavior',
    paragraphs: [
      'Next.js supports many data-loading approaches depending on whether the team uses server components, route handlers, client fetching, or other framework patterns. This breadth is powerful, but it also means teams must be deliberate in choosing one coherent style.',
      'Nuxt provides a strong server-aware application model too, with patterns that often feel simpler to standardize. The framework tends to present its full-stack story with fewer competing mental models, which some teams find easier to maintain.',
    ],
  },
  {
    id: 'core-rendering',
    title: 'Rendering and Delivery Strategies',
    paragraphs: [
      'Next.js is strongly associated with flexible rendering options. Static generation, server rendering, hybrid delivery, and newer server-centric React patterns are all part of the platform identity. This is useful when different parts of the application have very different delivery needs.',
      'Nuxt also supports server rendering and static generation well, but the framework identity often feels less like a menu of rendering brands and more like a coherent application framework that happens to support those modes. For many teams that is easier to internalize.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Experience',
    paragraphs: [
      'Next.js has strong tooling and a very large amount of community material, but it also inherits some of the complexity of the wider React ecosystem. Teams may need more discipline to standardize architecture, state handling, and rendering strategies cleanly.',
      'Nuxt often feels especially polished in developer experience because the framework is tightly aligned with Vue conventions. Many teams report that onboarding and day-to-day development feel smooth because there is less conceptual spread between the component layer and the full-stack framework layer.',
    ],
  },
  {
    id: 'core-platform-breadth',
    title: 'Platform Breadth versus Framework Coherence',
    paragraphs: [
      'Next.js often behaves like a broad application platform. This creates flexibility and a large ecosystem surface, but it can also produce more conceptual surface area and more framework evolution to keep up with over time.',
      'Nuxt often behaves like a more coherent framework experience. It may offer slightly less raw ecosystem gravity, but many teams value the way it reduces architectural ambiguity and keeps the app model understandable.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit',
    paragraphs: [
      'Next.js fits teams that are already effective in React, want the largest ecosystem, or need a framework that aligns with the dominant frontend platform in many companies. It is especially strong when organizational scale and hiring flexibility matter.',
      'Nuxt fits teams that prefer Vue’s development style and want a full-stack framework that feels integrated rather than assembled. It is especially strong when developer experience and framework coherence are primary values.',
    ],
  },
  {
    id: 'core-hosting',
    title: 'Hosting and Deployment Fit',
    paragraphs: [
      'Next.js has strong hosting alignment and a widely understood deployment story. This makes it attractive for organizations that want to reduce uncertainty around platform support and production deployment patterns.',
      'Nuxt also deploys well across many environments, but its strategic advantage is usually less about hosting dominance and more about the smoothness of the application-development model. Teams should compare actual hosting requirements rather than assuming one framework always implies one platform.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Next.js usually wins on React ecosystem reach, community gravity, and platform breadth. Nuxt usually wins on Vue-aligned clarity, developer ergonomics, and a highly cohesive framework experience. Neither is universally better because they optimize different ecosystems and different team preferences.',
      'The real mistake is pretending the framework decision is independent from the component ecosystem decision. In most cases, the framework is an expression of the team’s React-versus-Vue choice as much as it is a separate platform comparison.',
    ],
    bullets: [
      'Choose Next.js for React ecosystem scale and platform breadth.',
      'Choose Nuxt for Vue ergonomics and framework coherence.',
      'Evaluate the team’s component-model preference honestly.',
      'Standardize around the ecosystem the organization can support best.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-next-shape',
    title: 'Next.js Shape',
    description: [
      'A Next.js app often mixes route segments, layouts, and server-aware React components in one platform model.',
    ],
    code: `app/
  products/
    [id]/
      page.tsx
  layout.tsx
  page.tsx`,
    notes: [
      'This reflects Next.js as a broad React application platform.',
      'The framework supports many app shapes inside this routing model.',
    ],
  },
  {
    id: 'examples-nuxt-shape',
    title: 'Nuxt Shape',
    description: [
      'A Nuxt app usually feels like Vue conventions extended cleanly into routing and server-aware application flow.',
    ],
    code: `pages/
  products/
    [id].vue

layouts/
  default.vue`,
    notes: [
      'The structure tends to feel direct and cohesive for Vue teams.',
      'Vue single-file component ergonomics remain central to the app experience.',
    ],
  },
  {
    id: 'examples-team-frame',
    title: 'Team Alignment Example',
    description: [
      'The framework choice often follows the organization’s frontend ecosystem center of gravity.',
    ],
    code: `React-centered org
  -> Next.js usually fits naturally

Vue-centered org
  -> Nuxt usually fits naturally`,
    notes: [
      'This sounds obvious, but it is often the strongest real-world deciding factor.',
      'Framework debates become much simpler once the ecosystem choice is clear.',
    ],
  },
  {
    id: 'examples-decision-frame',
    title: 'Decision Frame Example',
    description: [
      'A useful evaluation starts by deciding whether the organization values ecosystem reach or framework coherence more strongly.',
    ],
    code: `Question 1:
Are we choosing React or Vue first?

Question 2:
Do we want maximum ecosystem gravity?

Question 3:
Do we want a more guided and cohesive framework experience?`,
    notes: [
      'If React and ecosystem breadth dominate, Next.js is usually the answer.',
      'If Vue ergonomics and coherence dominate, Nuxt is usually the answer.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-next',
    title: 'Next.js Terms',
    terms: [
      {
        term: 'Next.js',
        definition:
          'A major full-stack React framework used for server-rendered, statically generated, and hybrid web applications.',
      },
      {
        term: 'App Router',
        definition:
          'The modern Next.js routing model built around nested route segments and layout composition.',
      },
      {
        term: 'Server Component',
        definition:
          'A React component that renders on the server and can reduce client-side JavaScript in some scenarios.',
      },
      {
        term: 'Hybrid Rendering',
        definition:
          'Using different rendering strategies across different routes or parts of one application.',
      },
    ],
  },
  {
    id: 'glossary-nuxt',
    title: 'Nuxt Terms',
    terms: [
      {
        term: 'Nuxt',
        definition:
          'A major full-stack Vue framework for server rendering, static generation, routing, and modern web application delivery.',
      },
      {
        term: 'Single-File Component',
        definition: 'A Vue component format that combines template, script, and style in one file.',
      },
      {
        term: 'Layout',
        definition: 'A reusable application shell used across pages or route segments.',
      },
      {
        term: 'Server Rendering',
        definition: 'Rendering application HTML on the server before sending it to the browser.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Framework Terms',
    terms: [
      {
        term: 'File-Based Routing',
        definition:
          'A routing system where file and folder structure determines URL paths and route boundaries.',
      },
      {
        term: 'Static Generation',
        definition:
          'Producing HTML ahead of request time so pages can be served quickly and cheaply.',
      },
      {
        term: 'Full-Stack Framework',
        definition:
          'A framework that handles both UI composition and server-related application concerns such as routing and data access.',
      },
      {
        term: 'Progressive Enhancement',
        definition:
          'A design approach where the app works from standard web behavior first and adds richer client behavior on top.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-next-fits', label: 'When Next.js Is Usually the Better Fit' },
    { id: 'bp-when-nuxt-fits', label: 'When Nuxt Is Usually the Better Fit' },
    { id: 'bp-hidden-tradeoff', label: 'The Hidden Tradeoff' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-ecosystem-center', label: 'Ecosystem Center of Gravity' },
    { id: 'core-component-model', label: 'Component and Developer Model' },
    { id: 'core-routing-layouts', label: 'Routing and Layouts' },
    { id: 'core-data-loading', label: 'Data Loading and Server Behavior' },
    { id: 'core-rendering', label: 'Rendering and Delivery Strategies' },
    { id: 'core-tooling', label: 'Tooling and Developer Experience' },
    { id: 'core-platform-breadth', label: 'Platform Breadth versus Framework Coherence' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-hosting', label: 'Hosting and Deployment Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
  ],
  examples: [
    { id: 'examples-next-shape', label: 'Next.js Shape' },
    { id: 'examples-nuxt-shape', label: 'Nuxt Shape' },
    { id: 'examples-team-frame', label: 'Team Alignment Example' },
    { id: 'examples-decision-frame', label: 'Decision Frame Example' },
  ],
  glossary: [
    { id: 'glossary-next', label: 'Next.js Terms' },
    { id: 'glossary-nuxt', label: 'Nuxt Terms' },
    { id: 'glossary-shared', label: 'Shared Framework Terms' },
  ],
}

const pageStyles = `
.next-nuxt-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.next-nuxt-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.next-nuxt-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  min-height: 24px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.next-nuxt-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.next-nuxt-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.next-nuxt-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.next-nuxt-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.next-nuxt-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.next-nuxt-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.next-nuxt-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.next-nuxt-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.next-nuxt-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.next-nuxt-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.next-nuxt-help-toc-item {
  margin: 0 0 8px;
}

.next-nuxt-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.next-nuxt-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.next-nuxt-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.next-nuxt-help-section {
  margin: 0 0 20px;
}

.next-nuxt-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.next-nuxt-help-content p,
.next-nuxt-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.next-nuxt-help-content p {
  margin: 0 0 10px;
}

.next-nuxt-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.next-nuxt-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.next-nuxt-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.next-nuxt-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .next-nuxt-help-main {
    grid-template-columns: 1fr;
  }

  .next-nuxt-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .next-nuxt-help-page {
    min-height: auto;
  }

  .next-nuxt-help-window {
    min-height: auto;
  }

  .next-nuxt-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .next-nuxt-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    white-space: normal;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="next-nuxt-help-section">
      <h2 className="next-nuxt-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="next-nuxt-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="next-nuxt-help-section">
      <h2 className="next-nuxt-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="next-nuxt-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="next-nuxt-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="next-nuxt-help-section">
      <h2 className="next-nuxt-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="next-nuxt-help-divider" />}
    </section>
  )
}

export default function NextJsVsNuxtPage(): JSX.Element {
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
    document.title = `Next.js vs Nuxt (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Next.js vs Nuxt',
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
    <div className="next-nuxt-help-page">
      <style>{pageStyles}</style>
      <div className="next-nuxt-help-window" role="presentation">
        <header className="next-nuxt-help-titlebar">
          <span className="next-nuxt-help-titletext">Next.js vs Nuxt</span>
          <div className="next-nuxt-help-controls">
            <button
              className="next-nuxt-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="next-nuxt-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="next-nuxt-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`next-nuxt-help-tab ${activeTab === tab.id ? 'next-nuxt-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="next-nuxt-help-main">
          <aside className="next-nuxt-help-toc" aria-label="Table of contents">
            <h2 className="next-nuxt-help-toc-title">Contents</h2>
            <ul className="next-nuxt-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="next-nuxt-help-toc-item">
                  <a href={`#${section.id}`} className="next-nuxt-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="next-nuxt-help-content">
            <h1 className="next-nuxt-help-doc-title">Next.js vs Nuxt</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1),
                )
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) =>
                  renderExampleSection(section, index === exampleSections.length - 1),
                )
              : null}

            {activeTab === 'glossary'
              ? glossarySections.map((section, index) =>
                  renderGlossarySection(section, index === glossarySections.length - 1),
                )
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
