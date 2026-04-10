import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Next.js and Remix are both React frameworks for building modern web applications, but they emphasize different ideas about what a full-stack React application should feel like. Next.js has become the broad platform choice for many teams because it covers routing, rendering strategies, server components, APIs, image handling, deployment integration, and a large ecosystem centered around React application delivery. Remix is more focused and web-standards-oriented, with strong attention to loaders, actions, forms, nested routes, and server-first thinking for data flow and mutations.',
  'The useful comparison is not simply which one supports SSR or routing, because both do. The useful comparison is how each framework wants you to structure data loading, mutations, caching expectations, deployment assumptions, and the relationship between React and the web platform. Next.js often wins on ecosystem gravity and platform breadth. Remix often wins on conceptual clarity around full-stack web interactions and progressive enhancement. The right answer depends on product shape, hosting assumptions, team preferences, and how much platform breadth versus framework focus you want.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Next.js is a broad React framework that supports many rendering and application-delivery modes, including static generation, server-side rendering, hybrid rendering, API routes, and increasingly server-component-centric application patterns. It is often chosen as the default serious framework for production React apps because of its large ecosystem, deployment story, and feature breadth.',
      'Remix is a React framework centered more explicitly on web fundamentals. It emphasizes route-based data loading, form handling through normal web semantics, nested layouts, and server-first patterns that keep the browser and server interaction model closer to the platform. It often feels more opinionated about application flow even while exposing fewer platform-level extras than Next.js.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'The core difference is where the framework puts its center of gravity. Next.js is broad and platform-like. It tries to be the full environment for building and shipping a React application across many use cases and rendering patterns.',
      'Remix is more focused on the request-response model of the web. It treats routes, loaders, actions, and form submissions as first-class architecture concepts and pushes developers toward patterns that align closely with browser behavior and server handling.',
    ],
    bullets: [
      'Next.js emphasizes breadth, ecosystem, and multiple rendering strategies.',
      'Remix emphasizes web-native data flow and route-centered application design.',
      'Next.js often feels like a product platform.',
      'Remix often feels like a web architecture philosophy applied to React.',
    ],
  },
  {
    id: 'bp-when-next-fits',
    title: 'When Next.js Is Usually the Better Fit',
    paragraphs: [
      'Next.js is usually the better fit when the team wants the most common production React framework, values broad ecosystem compatibility, or needs a platform that can support many different product shapes from marketing sites to dashboards to hybrid-rendered applications. It is especially strong when developer hiring, community examples, and hosting integration matter heavily.',
      'It is also a strong fit when the organization wants one framework that many teams can adopt with large community support, abundant third-party tutorials, and a clear path into infrastructure such as Vercel or other modern hosting platforms.',
    ],
    bullets: [
      'Teams that want the broadest React framework ecosystem.',
      'Products that may need multiple rendering strategies in one codebase.',
      'Organizations that value hosting integration and platform breadth.',
      'Cases where community reach and hiring familiarity matter strongly.',
    ],
  },
  {
    id: 'bp-when-remix-fits',
    title: 'When Remix Is Usually the Better Fit',
    paragraphs: [
      'Remix is usually the better fit when the team wants a more explicit, web-native architecture for data loading and mutations, or when developers care deeply about progressive enhancement, route-driven composition, and aligning application behavior with the browser platform.',
      'It is particularly attractive for teams that want to avoid excessive client-side data orchestration and prefer a more disciplined request-response mental model for both reads and writes.',
    ],
    bullets: [
      'Teams that value web standards and server-first React application design.',
      'Products where forms, mutations, and route-based data flows are central.',
      'Developers who prefer explicit loader and action boundaries.',
      'Organizations willing to trade some ecosystem gravity for conceptual clarity.',
    ],
  },
  {
    id: 'bp-hidden-tradeoff',
    title: 'The Hidden Tradeoff',
    paragraphs: [
      'The hidden tradeoff is not just API style. It is how much framework breadth the team wants to absorb. Next.js gives access to more modes, more patterns, and more ecosystem momentum, but that can also mean more conceptual surface area and more framework churn as the platform evolves.',
      'Remix often feels narrower and more coherent because its model is more opinionated around the web request lifecycle. But that narrower focus can mean fewer out-of-the-box answers for teams that want the framework itself to provide a large application platform.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'A good decision starts by asking whether the organization needs a broad React platform or a more focused full-stack web framework. If the main goal is broad ecosystem alignment and versatile rendering options, Next.js often leads. If the main goal is disciplined, route-centered server-first web development, Remix often leads.',
    ],
    bullets: [
      'Choose Next.js for platform breadth and ecosystem gravity.',
      'Choose Remix for web-native full-stack clarity and route-centric architecture.',
      'Evaluate the real product shape rather than abstract framework hype.',
      'Optimize for the model the team can reason about consistently over time.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-routing',
    title: 'Routing and Composition Model',
    paragraphs: [
      'Both frameworks are route-driven, but they express route composition differently. Next.js has evolved from the pages router to the app router, and that evolution has introduced more platform capability around layouts, nested segments, and server-centric rendering.',
      'Remix is strongly built around nested routes as an architectural foundation. Routes define UI boundaries, data loading boundaries, mutation handling boundaries, and error boundaries very naturally. This often makes complex nested application structure feel conceptually clean.',
    ],
  },
  {
    id: 'core-data-loading',
    title: 'Data Loading',
    paragraphs: [
      'Next.js supports many data-loading patterns depending on which features and router model are in use. Server components, route handlers, client fetching, cache controls, and framework-specific rendering modes can all be part of the story. This flexibility is powerful, but it also means teams must choose and standardize patterns carefully.',
      'Remix makes data loading feel more explicit through loaders. Each route can define what data it needs on the server, and the framework aligns that data with the route hierarchy. This usually gives teams a clearer model for where data comes from and how it enters the UI tree.',
    ],
  },
  {
    id: 'core-mutations',
    title: 'Mutations and Forms',
    paragraphs: [
      'One of Remix’s strongest ideas is that writes should feel like the web. Forms submit to route actions, servers process mutations, and the framework revalidates the right data. This keeps a strong connection between application behavior and ordinary browser semantics.',
      'Next.js can absolutely handle forms and mutations well, but the experience often depends more on which stack conventions the team adopts. Server actions, route handlers, client libraries, or custom APIs may all be involved. This offers flexibility, but it also means there is more architectural choice to manage.',
    ],
  },
  {
    id: 'core-rendering-model',
    title: 'Rendering Model',
    paragraphs: [
      'Next.js has a broader rendering story. Static generation, hybrid rendering, server-side rendering, incremental strategies, and server-component-driven patterns all sit inside the platform. This is one reason so many organizations treat it as the default production React framework.',
      'Remix is less about offering every rendering mode as a brand category and more about treating the application as a request-driven web system. It still supports server rendering and strong performance behavior, but it does not present as many platform-level rendering identities as Next.js.',
    ],
  },
  {
    id: 'core-caching',
    title: 'Caching and Revalidation',
    paragraphs: [
      'Next.js exposes powerful caching and invalidation capabilities, but teams often need a strong mental model to use them correctly because the system can involve multiple layers of server and client behavior. This flexibility is valuable at scale, but it can also be confusing.',
      'Remix tends to feel more straightforward because route loaders, responses, and browser behavior remain central. That does not make caching trivial, but it often makes the path more understandable for teams that want fewer framework-specific cache concepts.',
    ],
  },
  {
    id: 'core-deployment',
    title: 'Deployment and Platform Fit',
    paragraphs: [
      'Next.js has very strong deployment gravity, especially because of how well it aligns with hosting platforms and ecosystem defaults. Many organizations choose it partly because the deployment story, edge options, and broader platform narrative are mature and well understood.',
      'Remix can be deployed in many environments too, but its identity is less tied to one broad platform narrative and more tied to its application architecture model. For some teams that is an advantage because it feels less platform-prescriptive. For others it means more integration choices to evaluate.',
    ],
  },
  {
    id: 'core-learning-curve',
    title: 'Learning Curve',
    paragraphs: [
      'Next.js can be easy to start and hard to fully master because its surface area is broad and still evolving. A developer can ship something quickly, but understanding the best patterns for rendering, caching, server boundaries, and framework conventions requires deliberate learning.',
      'Remix usually has a clearer conceptual center, but it asks teams to think carefully about HTTP, forms, route modules, and server-first application design. For developers who like web fundamentals, this often feels elegant. For teams coming from heavy client-fetching habits, it may require a mindset shift.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Community Gravity',
    paragraphs: [
      'Next.js has overwhelming ecosystem momentum in the React world. That affects hiring, tutorials, integrations, libraries, templates, hosting support, and team familiarity. This is not a superficial advantage. It reduces friction in many practical ways.',
      'Remix has a smaller ecosystem footprint but a strong reputation among developers who care about web-native architecture and disciplined full-stack React design. Its community is often more focused on the clarity of the model than on sheer platform breadth.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit',
    paragraphs: [
      'Next.js fits teams that want the broad default choice and can absorb a larger framework platform. It is especially appealing when many developers will rotate across codebases and the organization wants familiarity and ecosystem reach.',
      'Remix fits teams that want a more deliberate full-stack web architecture and are willing to embrace the framework’s stronger philosophical stance on loaders, actions, and the web request lifecycle.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Next.js usually wins on breadth, ecosystem, and all-around React platform gravity. Remix usually wins on route-level data flow clarity, web-native form and mutation handling, and conceptual coherence for server-first applications. Neither is universally better because they optimize for different definitions of developer leverage.',
      'The wrong move is choosing based only on trend velocity. Teams should decide whether they need a platform with many capabilities or a framework with a sharper architectural core.',
    ],
    bullets: [
      'Choose Next.js for ecosystem breadth and a platform-style React framework.',
      'Choose Remix for server-first web clarity and route-centered design.',
      'Standardize patterns carefully in Next.js because the platform offers many paths.',
      'Adopt Remix when the team values conceptual discipline over maximum framework breadth.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-next-shape',
    title: 'Next.js Shape',
    description: [
      'A Next.js application often combines route segments, server and client components, and framework-level rendering choices.',
    ],
    code: `app/
  dashboard/
    page.tsx
    loading.tsx
    error.tsx
  layout.tsx`,
    notes: [
      'This structure reflects Next.js as a broad application platform.',
      'The framework offers many rendering and composition choices inside one app model.',
    ],
  },
  {
    id: 'examples-remix-shape',
    title: 'Remix Shape',
    description: [
      'A Remix application often makes route modules the center of UI, loading, and mutation behavior.',
    ],
    code: `export async function loader() {
  return json(await getInvoices())
}

export async function action() {
  return await updateInvoice()
}

export default function Route() {
  return <InvoicesPage />
}`,
    notes: [
      'Loaders and actions make read and write boundaries explicit.',
      'This gives the route module a very clear full-stack role.',
    ],
  },
  {
    id: 'examples-forms',
    title: 'Forms and Mutations',
    description: [
      'The difference often becomes most visible when handling writes and revalidation.',
    ],
    code: `Remix:
  form -> action -> revalidation

Next.js:
  form -> server action or route handler or client mutation flow`,
    notes: [
      'Remix gives a tighter default story for mutations through the web platform.',
      'Next.js provides more options, which is powerful but increases decision surface area.',
    ],
  },
  {
    id: 'examples-decision-frame',
    title: 'Decision Frame Example',
    description: [
      'A useful evaluation starts by identifying whether breadth or architectural focus is the stronger need.',
    ],
    code: `Question 1:
Do we want the broad default React platform?

Question 2:
Do we prefer route-based loaders and actions as the primary app model?

Question 3:
Do we want many rendering modes or one clearer request-response mental model?`,
    notes: [
      'If the first and third questions lean toward breadth, Next.js often fits better.',
      'If the second and third questions lean toward web-native clarity, Remix often fits better.',
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
          'A broad React framework for building web applications with multiple rendering strategies and platform-level features.',
      },
      {
        term: 'App Router',
        definition:
          'The modern Next.js routing model centered around nested route segments, layouts, and server-centric application structure.',
      },
      {
        term: 'Server Component',
        definition:
          'A React component that renders on the server and can reduce client-side JavaScript for some application logic.',
      },
      {
        term: 'Route Handler',
        definition:
          'A server-side request handler in Next.js used for API-like endpoints or backend logic.',
      },
    ],
  },
  {
    id: 'glossary-remix',
    title: 'Remix Terms',
    terms: [
      {
        term: 'Remix',
        definition:
          'A React framework focused on web standards, nested routes, and server-first full-stack application design.',
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
        term: 'Revalidation',
        definition:
          'The process of refreshing route data after a mutation or navigation so the UI stays consistent with server state.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared React Framework Terms',
    terms: [
      {
        term: 'SSR',
        definition:
          'Server-side rendering, where HTML is generated on the server before it reaches the browser.',
      },
      {
        term: 'Nested Route',
        definition:
          'A route that composes inside a parent route, often sharing layout and data boundaries.',
      },
      {
        term: 'Progressive Enhancement',
        definition:
          'A design approach in which the application works from standard web behavior first and enhances with JavaScript where useful.',
      },
      {
        term: 'Full-Stack React',
        definition:
          'An approach where React is used together with server-side route, data, and mutation handling in one framework model.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-next-fits', label: 'When Next.js Is Usually the Better Fit' },
    { id: 'bp-when-remix-fits', label: 'When Remix Is Usually the Better Fit' },
    { id: 'bp-hidden-tradeoff', label: 'The Hidden Tradeoff' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-routing', label: 'Routing and Composition Model' },
    { id: 'core-data-loading', label: 'Data Loading' },
    { id: 'core-mutations', label: 'Mutations and Forms' },
    { id: 'core-rendering-model', label: 'Rendering Model' },
    { id: 'core-caching', label: 'Caching and Revalidation' },
    { id: 'core-deployment', label: 'Deployment and Platform Fit' },
    { id: 'core-learning-curve', label: 'Learning Curve' },
    { id: 'core-ecosystem', label: 'Ecosystem and Community Gravity' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
  ],
  examples: [
    { id: 'examples-next-shape', label: 'Next.js Shape' },
    { id: 'examples-remix-shape', label: 'Remix Shape' },
    { id: 'examples-forms', label: 'Forms and Mutations' },
    { id: 'examples-decision-frame', label: 'Decision Frame Example' },
  ],
  glossary: [
    { id: 'glossary-next', label: 'Next.js Terms' },
    { id: 'glossary-remix', label: 'Remix Terms' },
    { id: 'glossary-shared', label: 'Shared React Framework Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="next-remix-help-section">
      <h2 className="next-remix-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="next-remix-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="next-remix-help-section">
      <h2 className="next-remix-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="next-remix-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="next-remix-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="next-remix-help-section">
      <h2 className="next-remix-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="next-remix-help-divider" />}
    </section>
  )
}

export default function Route(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Next.js vs Remix',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Next.js vs Remix"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Next.js vs Remix</h1>
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
    </TopicPageShell>
  )
}
