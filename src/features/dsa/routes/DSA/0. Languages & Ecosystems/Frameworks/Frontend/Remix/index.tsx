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
      'Remix is a React framework centered on web fundamentals, route-based data loading, server-first mutations, and progressive enhancement. It treats loaders, actions, nested routes, and normal browser form behavior as primary architecture concepts rather than incidental implementation details.',
      'In practice, Remix is used for full-stack web applications where teams want a clear request-response model, explicit route boundaries, and a framework that stays close to the browser and HTTP platform instead of abstracting too much of it away.',
      'This help-style reference covers Remix across overview, key ideas, syntax, APIs, ecosystem, architecture, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why Teams Reach For Remix',
    paragraphs: [
      'Remix is attractive when the team wants data loading and mutations to follow a web-native model. Forms submit to route actions, routes load their own data, and nested layouts shape both UI and server data flow in a way that often feels conceptually clean.',
      'The practical appeal is that the framework turns common full-stack web concerns into explicit route-level structure. For teams that care about progressive enhancement and disciplined server-first application flow, this can feel clearer than more client-fetch-heavy approaches.',
    ],
  },
  {
    id: 'bp-web-model',
    title: 'Why the Web-Native Model Matters',
    paragraphs: [
      'Remix is not just a React framework with routing. It represents a strong opinion about how modern web applications should still honor browser semantics, HTTP behavior, nested route boundaries, and request-response thinking.',
      'That matters because the framework often changes how teams think about data loading and mutations, not just where they place components.',
    ],
  },
  {
    id: 'bp-scope',
    title: 'What This Page Covers',
    paragraphs: [
      'This page keeps all of the original planned concepts: overview and key ideas, core syntax, APIs, ecosystem, architecture, use cases, tradeoffs, and compare-and-contrast references that place Remix among other frontend and full-stack web options.',
      'The layout follows a text-first desktop help-document model so the page can be used as a reference rather than as a card-driven overview.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where Remix Fits Well',
    paragraphs: [
      'Remix is often a strong fit for server-first React applications, forms-heavy products, route-centric web apps, and teams that want to keep architecture closely aligned with browser behavior and HTTP semantics.',
      'It is especially attractive when the main challenge is maintaining conceptual clarity around data loading, mutations, and nested page composition rather than assembling the broadest possible framework platform.',
    ],
  },
  {
    id: 'bp-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'A common misconception is that Remix is only about SSR. In practice, its stronger distinction is how it structures routes, data, mutations, and progressive enhancement around the web request lifecycle.',
      'Another misconception is that it is just plain React plus forms. The real architectural value comes from how route modules, loaders, actions, and nested layouts fit together into one coherent model.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Remix centers on nested routes, loaders, actions, and progressive enhancement.',
      'Its main strengths are web-native data flow, route-level clarity, and disciplined form and mutation handling.',
      'Its main tradeoffs usually involve narrower platform breadth than some competing React frameworks, a stronger server-first mindset requirement, and a smaller ecosystem footprint than the largest React framework ecosystems.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Remix asks developers to think about an application as a set of nested route modules with server-aware boundaries. Each route can own loading, mutation handling, layout structure, and error handling in a way that maps closely to the web request lifecycle.',
      'That makes route hierarchy more important than in many client-only React applications. The route tree becomes both a UI tree and a data and mutation architecture.',
    ],
  },
  {
    id: 'core-key-ideas',
    title: 'Overview and Key Ideas',
    paragraphs: [
      'Remix treats the web request lifecycle as the center of application design. Routes define UI boundaries, data loading boundaries, mutation boundaries, and error boundaries, which often gives teams a very explicit structure for how applications should behave.',
      'The key ideas are nested routes, loaders for data, actions for writes, normal form semantics, and progressive enhancement so the application can remain aligned with browser behavior even as JavaScript enriches the experience.',
    ],
  },
  {
    id: 'core-routes',
    title: 'Route Modules',
    paragraphs: [
      'A Remix route module often combines the route component with its server-side loading and mutation functions. This means route files tend to become the natural place where UI structure and request-response behavior meet.',
      "That design is one of Remix's clearest strengths. It makes route boundaries matter architecturally instead of leaving teams to invent their own pattern for how page structure, data, and mutations should be connected.",
    ],
  },
  {
    id: 'core-nested-routes',
    title: 'Nested Routes and Layout Boundaries',
    paragraphs: [
      "Nested routes are one of Remix's most important concepts. Parent routes define layout structure and shared boundaries, while child routes supply more specific content and data requirements.",
      'This tends to make larger applications feel more legible because UI nesting, data loading nesting, and route ownership line up more naturally.',
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      'Remix uses React component syntax, but its architecture is strongly shaped by framework primitives such as `loader`, `action`, `Form`, `Outlet`, `useLoaderData`, and related route APIs. The surface is not about custom template language so much as about how React code is organized around the web request model.',
      'This means the syntax feels familiar to React developers while still pushing them toward a more route-centered full-stack design than purely client-driven React applications often use.',
    ],
  },
  {
    id: 'core-data',
    title: 'Loaders and Data Flow',
    paragraphs: [
      'Loaders define what data a route needs on the server. The framework aligns that data with the route hierarchy, which can make it easier to reason about where data comes from and which route is responsible for it.',
      "This route-centered loading model is one of Remix's core architectural benefits. Instead of scattering page fetches across many client-side hooks, teams can place data requirements directly at the route boundary.",
    ],
  },
  {
    id: 'core-revalidation',
    title: 'Revalidation and Data Freshness',
    paragraphs: [
      "After mutations or navigation, Remix can revalidate route data so the UI stays aligned with server state. This keeps the framework's data model closely tied to real request-response behavior instead of encouraging stale client-side assumptions.",
      'The result is often a simpler story for many CRUD-style interfaces, though teams still need to reason carefully about cache headers, network behavior, and what should be reloaded when.',
    ],
  },
  {
    id: 'core-actions',
    title: 'Actions and Mutations',
    paragraphs: [
      'Actions handle writes such as form submissions. Remix encourages developers to let mutations feel like the web: forms submit, the server processes the request, and the framework revalidates the correct data.',
      'This keeps a strong connection between application behavior and ordinary browser semantics. For many teams, that makes full-stack mutation flow easier to explain and maintain than highly custom client-side orchestration.',
    ],
  },
  {
    id: 'core-forms',
    title: 'Forms and Progressive Enhancement',
    paragraphs: [
      "One of Remix's most distinctive strengths is how naturally it handles forms. HTML forms are not treated as legacy details to be wrapped away. They remain first-class architecture elements enhanced by the framework.",
      'This gives teams a strong progressive enhancement story: applications can keep a closer relationship to standard browser behavior while still becoming richer when JavaScript is available.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs and Authoring Style',
    paragraphs: [
      'The Remix API surface is shaped more by route and request primitives than by a huge set of custom client-side abstractions. Common concepts include route modules, loaders, actions, nested layouts, `Outlet`, and hooks that read route-bound data or navigation state.',
      'That gives Remix a relatively focused feel. It is less about offering every possible platform feature and more about making a specific style of full-stack React application feel coherent.',
    ],
  },
  {
    id: 'core-pending-ui',
    title: 'Pending UI and Navigation State',
    paragraphs: [
      'Remix also gives teams APIs for understanding navigation and submission state so interfaces can show pending UI while requests are in flight. This matters because good web applications need to communicate request progress without abandoning browser semantics.',
      'The architectural point is that pending state is part of the route and mutation story, not an unrelated side concern.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Architecture',
    paragraphs: [
      'Remix has a smaller ecosystem footprint than the broadest React platforms, but its architecture has a clear conceptual center. The framework is known for its attention to forms, nested routing, server-first data flow, and progressive enhancement rather than for trying to be the largest possible application platform.',
      'Architecturally, this means Remix often feels narrower but more disciplined. Teams usually choose it because they want that discipline, not because they want the framework to answer every adjacent platform question out of the box.',
    ],
  },
  {
    id: 'core-hosting',
    title: 'Hosting, Deployment, and Platform Fit',
    paragraphs: [
      'Remix can run in multiple environments, but its identity is less about one giant hosting platform and more about its application architecture model. For some teams this is an advantage because the framework feels less platform-prescriptive.',
      'For other teams, a narrower platform story can mean more integration choices. As usual, the right answer depends on whether the project values conceptual coherence more than maximum platform breadth.',
    ],
  },
  {
    id: 'core-caching',
    title: 'Caching and HTTP Thinking',
    paragraphs: [
      'Because Remix stays close to the web request model, teams often think more directly about responses, headers, and what should be cached. That can be a conceptual advantage because browser and HTTP behavior stay visible instead of disappearing behind many framework-specific cache layers.',
      'It also means teams need to be comfortable reasoning about the web platform itself rather than expecting the framework to hide every infrastructure detail.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Skill Profile',
    paragraphs: [
      'Remix is often a good fit for teams that like explicit route ownership, server-first thinking, and web fundamentals. Developers who care about HTTP, forms, request handling, and progressive enhancement often find its model elegant.',
      'Teams coming from very client-fetch-heavy habits may need time to adjust because Remix asks them to move important parts of application thinking back toward the route and server boundary.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Remix is frequently a strong fit for dashboards, content-driven apps, B2B products with substantial form workflows, internal tools, and server-first React applications that benefit from route-driven data and mutation boundaries.',
      'It is also attractive when progressive enhancement is a real product value rather than a secondary feature, because the framework is intentionally designed to keep that path natural.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Remix usually has a clearer conceptual center than broader React platforms, but it asks teams to think carefully about HTTP, form semantics, route modules, and server-first application design. For teams used to heavy client-side fetching, that can require a real mindset shift.',
      'Another tradeoff is ecosystem breadth. Remix has a strong reputation for architectural clarity, but the surrounding platform story is narrower than the biggest React frameworks that also carry more deployment, rendering-mode, and ecosystem gravity.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A recurring mistake is treating Remix as if it were just a client-side React router with extra functions. That misses the core point that route modules own much more of the request-response architecture.',
      'Another mistake is comparing Remix to broader React platforms without acknowledging that some tradeoffs are really about platform scope rather than about React component quality.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Remix is commonly compared with Next.js for web-native full-stack clarity versus broader platform breadth, with traditional SPA React stacks for route-centered server-first design versus client-fetch-heavy flexibility, and with other server-first frameworks for how directly it embraces browser and HTTP semantics.',
      'These comparisons help position Remix clearly: more focused than broad React platforms, more opinionated about data and mutations than plain React libraries, and especially strong when route-level clarity matters more than maximum framework surface area.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-route',
    title: 'Route Module Example',
    description:
      'A route module shows the core Remix idea: the route owns both its data loading contract and its rendered UI.',
    snippets: [
      {
        label: 'routes/users.tsx',
        code: `import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  const users = await getUsers()
  return json({ users })
}

export default function UsersRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <ul>
      {data.users.map((user) => (
        <li>{user.name}</li>
      ))}
    </ul>
  )
}`,
      },
    ],
    takeaway:
      'The route becomes the obvious place to define both the server data boundary and the UI that consumes it.',
  },
  {
    id: 'examples-action',
    title: 'Form and Action Example',
    description:
      "One of Remix's clearest strengths is making writes feel like ordinary web form submissions with explicit server handling.",
    snippets: [
      {
        label: 'routes/contact.tsx',
        code: `import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')

  await saveEmail(String(email))
  return redirect('/thanks')
}

export default function ContactRoute() {
  return (
    <Form method="post">
      <input name="email" type="email" />
      <button type="submit">Subscribe</button>
    </Form>
  )
}`,
      },
    ],
    takeaway:
      'Mutations stay close to the request-response model instead of forcing a separate client-side mutation framework for ordinary form work.',
  },
  {
    id: 'examples-nested',
    title: 'Nested Route Shape',
    description:
      'Nested layouts are one of the core ways Remix makes application structure and data boundaries feel explicit.',
    snippets: [
      {
        label: 'routes/dashboard.tsx',
        code: `import { Outlet } from '@remix-run/react'

export default function DashboardLayout() {
  return (
    <main>
      <aside>Sidebar</aside>
      <section>
        <Outlet />
      </section>
    </main>
  )
}`,
      },
      {
        label: 'routes/dashboard.reports.tsx',
        code: `import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({ reports: await getReports() })
}

export default function ReportsRoute() {
  const data = useLoaderData<typeof loader>()
  return <p>Reports: {data.reports.length}</p>
}`,
      },
    ],
    takeaway:
      "The route hierarchy is not just navigation. It is also the application's layout and data boundary structure.",
  },
  {
    id: 'examples-pending',
    title: 'Pending UI Example',
    description:
      'Good Remix interfaces often reflect navigation or submission state so the request lifecycle is visible to the user.',
    snippets: [
      {
        label: 'PendingNav.tsx',
        code: `import { useNavigation } from '@remix-run/react'

export default function PendingNav() {
  const navigation = useNavigation()
  const loading = navigation.state !== 'idle'

  return <p>{loading ? 'Loading...' : 'Ready'}</p>
}`,
      },
    ],
    takeaway:
      'Pending UI belongs to the same route-and-request model as loading and mutation logic rather than living as an unrelated concern.',
  },
  {
    id: 'examples-patterns',
    title: 'Architecture Snapshot',
    description:
      'A typical Remix application treats route modules and nested layouts as the center of both UI composition and server data flow.',
    snippets: [
      {
        label: 'Common Stack',
        code: `React for component rendering
Remix route modules for loaders, actions, and nested layouts
Form-based mutation workflows aligned with browser semantics
Server-first data loading with route revalidation`,
      },
    ],
    takeaway:
      'The framework feels coherent because routing, data flow, and mutations all follow the same route-centered architecture.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Remix',
    definition:
      'A React framework focused on nested routes, loaders, actions, and web-native full-stack application flow.',
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
    term: 'Route module',
    definition:
      'A file that commonly defines a route component together with its loader, action, and route-specific behavior.',
  },
  {
    term: 'Outlet',
    definition:
      'The Remix component used to render nested child routes within a parent layout route.',
  },
  {
    term: 'Form',
    definition:
      'A Remix component that enhances normal HTML form behavior while preserving web semantics.',
  },
  {
    term: 'Progressive enhancement',
    definition:
      'A design approach where the application works from standard web behavior first and enhances from there.',
  },
  {
    term: 'Nested routes',
    definition:
      'A routing structure where route hierarchy shapes both UI layout and data boundaries.',
  },
  {
    term: 'Revalidation',
    definition:
      'The framework behavior that refreshes route data after mutations or navigation when needed.',
  },
  {
    term: 'useLoaderData',
    definition: 'A Remix hook used to read the data returned by the current route loader.',
  },
  {
    term: 'useActionData',
    definition: 'A Remix hook used to read the data returned by the current route action.',
  },
  {
    term: 'Request-response model',
    definition:
      'The web architecture pattern where the browser makes a request and the server returns the next application state or data.',
  },
  {
    term: 'useNavigation',
    definition:
      'A Remix hook used to read current navigation and submission state for pending UI behavior.',
  },
  {
    term: 'Nested layout',
    definition: 'A parent route UI shell that renders child routes through an outlet.',
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

export default function UsersRoute(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Remix',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Remix"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Remix</h1>
      <p className="bin98-doc-subtitle">
        Manual-style reference covering overview, route modules, loaders, actions, nested routing,
        progressive enhancement, ecosystem shape, tradeoffs, and examples.
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
