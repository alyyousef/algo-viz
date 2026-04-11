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
      'Next.js is a React framework for building full-stack web applications. It provides file-system routing, server and client rendering strategies, route handlers, layouts, data-fetching patterns, middleware, deployment-aware optimizations, and a coordinated application model around React.',
      'In practice, Next.js is used for marketing sites, content platforms, e-commerce fronts, dashboards, SaaS products, internal tools, documentation systems, and large production web applications that need more than plain React components.',
      'This reference covers the App Router mental model, server and client components, route handlers, caching, rendering, navigation, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why-next',
    title: 'Why Teams Reach For Next.js',
    paragraphs: [
      'Next.js matters because it turns React from a UI library into a broad application platform. Instead of leaving routing, rendering mode, request handling, bundling, image optimization, and deployment patterns as separate decisions, it offers one framework story for many of them.',
      'The practical appeal is consistency. Teams can adopt a route-aware, server-capable React stack with built-in conventions rather than stitching together a large set of packages and internal rules for every project.',
    ],
  },
  {
    id: 'bp-what-it-optimizes',
    title: 'What Next.js Optimizes For',
    paragraphs: [
      'Next.js optimizes for React application development with strong production-focused defaults. It tries to make routing, rendering, caching, navigation, bundling, and server integration feel like one framework problem instead of many disconnected infrastructure problems.',
      'It also optimizes for deployment and runtime flexibility. Different routes and components can participate in different rendering and caching strategies, and the framework is built with server execution, streaming, and route-aware optimization in mind.',
    ],
  },
  {
    id: 'bp-react-relationship',
    title: 'Relationship to React',
    paragraphs: [
      'Next.js is built on React, but it is not just React with a router. The framework defines how React is structured into routes, layouts, server and client boundaries, request handlers, and deployment behavior.',
      'This distinction matters because a Next.js codebase often feels substantially different from plain React. The component model is still React, but much of the architecture is decided by the framework.',
    ],
  },
  {
    id: 'bp-app-router',
    title: 'Why the App Router Matters',
    paragraphs: [
      'Current Next.js guidance centers on the App Router. It is the newer router model that uses React Server Components, layouts, route segments, loading states, error boundaries, route handlers, and server-side mutation patterns as first-class architecture concepts.',
      'This changes how teams think about React applications. Instead of a mostly client-driven route tree with optional SSR around it, the framework treats server rendering and route-segment boundaries as core parts of normal app structure.',
    ],
  },
  {
    id: 'bp-pages-router',
    title: 'Pages Router Still Exists',
    paragraphs: [
      'Next.js still supports the older Pages Router, and it remains relevant in existing codebases. However, the App Router is the main direction for newer framework features and for the current mental model discussed in official documentation.',
      'That means teams maintaining older projects may need to understand both models. The architectural center of new greenfield work is usually the App Router, while legacy products may still use Pages Router conventions.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Next.js Fits Well',
    paragraphs: [
      'Next.js is a strong fit for full-stack React products that need route-level structure, SSR or hybrid rendering, SEO-sensitive pages, React Server Component workflows, and a deployment-aware platform story.',
      'It is also a common organizational default when teams want a mainstream React framework with strong ecosystem gravity and a broad set of built-in capabilities.',
    ],
  },
  {
    id: 'bp-common-misreadings',
    title: 'Common Misreadings',
    paragraphs: [
      'A common mistake is to treat Next.js as if it were just React plus file-based routing. That misses the importance of server and client component boundaries, cache behavior, route handlers, and rendering policy.',
      'Another mistake is to discuss the framework without naming which router model is being used. Many historical blog posts and code examples are Pages Router based, while many modern patterns assume the App Router.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Next.js centers on React plus a full application framework layer for routing, rendering, server integration, and deployment-aware optimization.',
      'Its main strengths are integrated architecture, large ecosystem gravity, strong React alignment, and flexible rendering and caching options.',
      'Its main tradeoffs are framework complexity, the need to understand server and client boundaries carefully, and the fact that framework behavior can be more sophisticated than plain React teams initially expect.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Next.js asks developers to think in terms of routes, layouts, and server-aware rendering boundaries rather than only in terms of client-side components. The route tree becomes a major architectural tool, and server work is not an afterthought layered on top of a purely client app.',
      'This is especially true in the App Router. Pages and layouts are server-first by default, and interactivity is layered in with explicit client component boundaries where needed.',
    ],
  },
  {
    id: 'core-app-router',
    title: 'App Router',
    paragraphs: [
      'The App Router is the newer file-system router in Next.js and the main framework direction in the current docs. It uses route segments, layouts, React Server Components, route handlers, loading states, and error boundaries as core building blocks.',
      'This gives the framework a route-centered architecture where navigation, rendering, and data loading are shaped by the file structure inside the `app/` directory.',
    ],
  },
  {
    id: 'core-project-structure',
    title: 'Project Structure and File Conventions',
    paragraphs: [
      'Next.js uses file conventions such as `app/`, `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `route.ts` to define route behavior and UI structure. The framework reads meaning from those files rather than asking teams to register every behavior manually.',
      'This convention-first design reduces setup and helps teams navigate codebases more quickly, but it also means developers must learn what each special file means in the framework lifecycle.',
    ],
  },
  {
    id: 'core-layouts',
    title: 'Layouts and Route Segments',
    paragraphs: [
      'Layouts are a major part of the App Router. Shared UI shells can persist across navigation while only the changed route segments rerender. This helps route hierarchy shape both user experience and application structure.',
      'The architectural effect is significant: a route tree becomes a composition model for shared shells, nested content, loading states, and cache reuse rather than only a URL mapping table.',
    ],
  },
  {
    id: 'core-server-client',
    title: 'Server and Client Components',
    paragraphs: [
      'In the App Router, pages and layouts are Server Components by default. They can render on the server, fetch data directly, participate in streaming, and avoid sending unnecessary component logic to the client.',
      'When a component needs state, event handlers, lifecycle logic, or browser APIs, it must become a Client Component through the `use client` directive. That boundary is one of the most important architectural decisions in modern Next.js.',
    ],
  },
  {
    id: 'core-boundaries',
    title: 'Why the Boundary Matters',
    paragraphs: [
      'The server and client boundary is not just a code-style preference. It determines bundle size, execution environment, data access patterns, and how much JavaScript the browser needs to download and run.',
      'Good Next.js architecture usually keeps as much as practical on the server while moving only truly interactive UI logic into client components.',
    ],
  },
  {
    id: 'core-data-fetching',
    title: 'Data Fetching in the App Router',
    paragraphs: [
      'A major shift in Next.js is that data can be fetched directly in Server Components using normal async patterns. This keeps server-owned data loading close to the route or component that needs it and can reduce the amount of client fetch orchestration required.',
      'The framework also layers caching and revalidation behavior on top of data fetching, so teams need to understand not only how to fetch data, but how that data is cached and refreshed.',
    ],
  },
  {
    id: 'core-caching',
    title: 'Caching Model',
    paragraphs: [
      'Next.js has a sophisticated caching model involving route output, fetched data, and client-side router behavior. The practical implication is that route performance and freshness depend on understanding what is cached, where it is cached, and how revalidation happens.',
      "This is one of the framework's biggest strengths and one of its main sources of confusion. Teams that ignore caching semantics often misread why a route is static, dynamic, reused, or refreshed.",
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation, Prefetching, and Partial Rendering',
    paragraphs: [
      'Next.js uses built-in navigation with route-aware prefetching and partial rendering behavior. Shared layouts can remain mounted, and navigation often reuses cached route information to make transitions feel faster and more app-like.',
      "This means navigation is not only a router concern. It is directly tied to the framework's route segmentation and cache behavior.",
    ],
  },
  {
    id: 'core-loading-error',
    title: 'Loading and Error Boundaries',
    paragraphs: [
      'App Router conventions such as `loading.tsx` and `error.tsx` give routes explicit places for pending and failure states. This helps teams keep fallback UI and error handling aligned with route structure instead of scattering them through many components.',
      'The practical benefit is clarity. A route segment can define how it loads and how it fails as part of its normal module structure.',
    ],
  },
] as const

const coreConceptSectionsContinued: readonly DocSection[] = [
  {
    id: 'core-route-handlers',
    title: 'Route Handlers',
    paragraphs: [
      'Route Handlers in the App Router allow developers to define request handlers with Web Request and Response APIs inside the `app/` directory. They are the modern framework answer for custom backend endpoints associated with a route tree.',
      'This gives Next.js a native server endpoint story inside the application framework instead of forcing every project to stand up a separate API layer for simple integrated server logic.',
    ],
  },
  {
    id: 'core-server-actions',
    title: 'Server Functions and Mutations',
    paragraphs: [
      'Modern Next.js also uses server-side function patterns for mutations and server-executed logic. This reflects the broader direction of keeping more application behavior close to the server while letting client components trigger server work where needed.',
      'The key engineering question is not merely whether a mutation works, but whether the team has chosen the right boundary between server-owned logic and client-owned interactivity.',
    ],
  },
  {
    id: 'core-rendering-modes',
    title: 'Static, Dynamic, and Streaming Rendering',
    paragraphs: [
      'Next.js supports static generation, dynamic rendering, streaming, and mixed route behavior depending on what the route needs. Different data access patterns and configuration choices can move a route toward static or request-time rendering.',
      'That flexibility is powerful because a marketing page and a personalized dashboard do not need the same runtime policy. It also means teams should be deliberate about route behavior instead of assuming every page is rendered the same way.',
    ],
  },
  {
    id: 'core-middleware',
    title: 'Middleware and Request Flow',
    paragraphs: [
      'Next.js includes middleware capabilities that allow request-time logic such as redirects, rewrites, or authentication-related checks to run before a route resolves. This lets some cross-cutting behavior live near the edge of the request lifecycle.',
      'Teams should still use middleware judiciously. It is powerful, but it is best reserved for concerns that truly belong at the request boundary rather than in component code.',
    ],
  },
  {
    id: 'core-assets-optimization',
    title: 'Built-In Optimization Features',
    paragraphs: [
      'Next.js includes built-in features such as the `Link` component, image optimization, font tooling, code splitting, and route-aware bundling behavior. These are part of why the framework is often chosen for production-facing web apps rather than only for component rendering.',
      'The important point is that the framework tries to turn common web performance work into platform defaults, though teams still need to understand the tradeoffs and operational impact of those defaults.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Tooling',
    paragraphs: [
      'Next.js works closely with TypeScript, modern bundling, and React-aware linting and build workflows. In practice, many teams experience the framework as a coordinated toolchain as much as a runtime.',
      'That coordination is useful, but it also means framework upgrades and feature adoption can affect many layers of the project at once, including routing, build output, and runtime behavior.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Platform Gravity',
    paragraphs: [
      'Next.js sits at the center of a large part of the React framework ecosystem. Many tutorials, templates, deployment workflows, hosting integrations, and adjacent tools assume or directly target Next.js.',
      'That ecosystem gravity is a major strength for hiring, support, and package compatibility. It can also create pressure to use the framework even when a narrower or simpler architecture might be sufficient.',
    ],
  },
  {
    id: 'core-pages-router',
    title: 'Pages Router in Existing Codebases',
    paragraphs: [
      'The Pages Router still matters because many production applications were built with it and continue to run successfully. Concepts such as `pages/`, `getServerSideProps`, and API routes remain relevant in maintenance and migration work.',
      'The important practical point is to avoid mixing mental models accidentally. App Router and Pages Router codebases often solve similar problems in meaningfully different ways.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Next.js is frequently used for content-rich sites, e-commerce fronts, SaaS apps, admin panels, documentation, dashboards, and products that need a React-first framework with SSR or hybrid rendering support.',
      'It is also a common organizational default when teams want a broad React platform with strong deployment and tooling support rather than hand-assembling the entire app stack.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Next.js offers a lot, but it asks teams to understand a relatively large framework surface. Routing conventions, server and client boundaries, cache semantics, route handlers, and rendering modes create real conceptual weight compared with plain React.',
      'Another tradeoff is that framework defaults can interact in subtle ways. Developers may need to understand why data is cached, why a route became dynamic, or why a component must be client-only, rather than assuming every issue is just ordinary React behavior.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Next.js is commonly compared with plain React for framework integration versus library flexibility, with Remix for broad platform scope versus a more web-request-centered full-stack model, and with Nuxt for how React and Vue ecosystems approach integrated application frameworks.',
      'These comparisons help position Next.js correctly: it is the mainstream full-stack React framework choice for many teams, not just a small routing addon on top of React.',
    ],
  },
] as const
const coreConceptSectionsMerged: readonly DocSection[] = [
  ...coreConceptSections,
  ...coreConceptSectionsContinued,
]

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-page',
    title: 'Server Component Page',
    description:
      'In the App Router, a page can be a Server Component by default and fetch data directly on the server without adding a client-side fetching layer first.',
    snippets: [
      {
        label: 'app/products/page.tsx',
        code: `async function getProducts() {
  const response = await fetch('https://example.com/api/products')
  return response.json()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <ul>
      {products.map((product: { id: string; name: string }) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}`,
      },
    ],
    takeaway:
      'A major Next.js mental shift is that many route-level data needs can stay on the server by default instead of being orchestrated through client hooks first.',
  },
  {
    id: 'examples-client',
    title: 'Client Component Boundary',
    description:
      'When interactivity, state, or browser APIs are needed, a component becomes client-side through the `use client` directive.',
    snippets: [
      {
        label: 'app/components/counter.tsx',
        code: `'use client'


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
      'Client components are opt-in in the App Router. The boundary should be drawn intentionally because it changes execution environment and bundle cost.',
  },
  {
    id: 'examples-layout',
    title: 'Layout and Nested Route Shape',
    description:
      "Layouts are persistent route shells in the App Router. They are one of the framework's main architectural tools for shared structure and partial rendering.",
    snippets: [
      {
        label: 'app/dashboard/layout.tsx',
        code: `export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <aside>Dashboard navigation</aside>
      <section>{children}</section>
    </main>
  )
}`,
      },
      {
        label: 'app/dashboard/page.tsx',
        code: `export default function DashboardPage() {
  return <h1>Dashboard</h1>
}`,
      },
    ],
    takeaway:
      'In Next.js, route hierarchy is not only about URLs. It also defines persistent layout structure and what parts of the UI can be reused across navigation.',
  },
  {
    id: 'examples-route-handler',
    title: 'Route Handler Example',
    description:
      'Route Handlers provide an in-framework server endpoint model using Web Request and Response APIs inside the App Router.',
    snippets: [
      {
        label: 'app/api/products/route.ts',
        code: `export async function GET() {
  return Response.json([
    { id: '1', name: 'Keyboard' },
    { id: '2', name: 'Monitor' },
  ])
}`,
      },
    ],
    takeaway:
      'This keeps simple backend endpoints close to the app without requiring a separate API project for every server interaction.',
  },
  {
    id: 'examples-architecture',
    title: 'Architecture Snapshot',
    description:
      'A typical modern Next.js application uses the App Router as the organizing center for rendering, routing, server work, and navigation behavior.',
    snippets: [
      {
        label: 'Common Stack',
        code: `React for component authoring
App Router for route segments, layouts, loading states, and route handlers
Server Components by default for route-level rendering and data access
Client Components only where interactivity or browser APIs are required
Framework-managed caching, prefetching, and route-aware navigation`,
      },
    ],
    takeaway:
      'Next.js works best when the team treats it as a full framework with explicit server and client boundaries, not merely as React with nicer routing.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Next.js',
    definition:
      'A React framework for building full-stack web applications with routing, rendering, server integration, and deployment-aware optimization.',
  },
  {
    term: 'App Router',
    definition:
      'The newer Next.js router model built around route segments, layouts, React Server Components, and file conventions in the `app/` directory.',
  },
  {
    term: 'Pages Router',
    definition:
      'The older Next.js router model based on the `pages/` directory, still supported and common in existing production codebases.',
  },
  {
    term: 'Server Component',
    definition:
      'A React component rendered on the server by default in the Next.js App Router, useful for server-side data access and reducing client bundle work.',
  },
  {
    term: 'Client Component',
    definition:
      'A React component marked with `use client` so it can use state, effects, event handlers, and browser APIs.',
  },
  {
    term: 'Route segment',
    definition:
      'A portion of the route tree in the App Router that can define layouts, pages, loading states, and related behavior.',
  },
  {
    term: 'Layout',
    definition:
      'A shared route shell that can persist across navigation and wrap nested route content.',
  },
  {
    term: 'Route Handler',
    definition:
      'A request handler inside the App Router, typically defined in `route.ts`, that uses Web Request and Response APIs.',
  },
  {
    term: 'Streaming',
    definition:
      'A rendering strategy where the server sends parts of the response as they become ready instead of waiting for the entire page to finish.',
  },
  {
    term: 'Prefetching',
    definition:
      'The framework behavior of loading route information ahead of navigation to make transitions feel faster.',
  },
  {
    term: 'Router cache',
    definition:
      'A client-side cache used by Next.js to store route-related payloads and improve navigation behavior.',
  },
  {
    term: 'Revalidation',
    definition:
      'The process of refreshing cached route or data output so the application reflects newer server state.',
  },
  {
    term: 'Middleware',
    definition:
      'Request-bound logic that runs before a route resolves, often used for redirects, rewrites, or access control checks.',
  },
  {
    term: 'Loading UI',
    definition:
      'A route-segment fallback state, often defined through `loading.tsx`, shown while server work is still in progress.',
  },
  {
    term: 'Error boundary',
    definition:
      'A route-segment error surface, often defined through `error.tsx`, used when rendering or data work fails.',
  },
  {
    term: 'Route segment config',
    definition:
      'Per-route configuration that influences rendering or runtime behavior in the App Router.',
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
  'core-concepts': coreConceptSectionsMerged.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function Counter(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Next.js',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Next.js"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Next.js</h1>
      <p className="next-js-help-doc-subtitle">
        Manual-style reference covering overview, App Router, server and client components, route
        handlers, caching, rendering strategies, tradeoffs, and practical examples.
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
        coreConceptSectionsMerged.map((section) => (
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
