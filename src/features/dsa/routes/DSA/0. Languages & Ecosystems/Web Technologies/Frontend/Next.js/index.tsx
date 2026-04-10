import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What Next.js is',
    body: 'Next.js is a React application framework that combines routing, rendering strategy, data fetching, asset optimization, deployment-aware primitives, and server-side capabilities into one coordinated model. It is not only a way to render React components. It is also a way to decide when code runs on the server, when it runs in the browser, how routes are organized, and how content is delivered to users with different caching and rendering tradeoffs.',
  },
  {
    title: 'Why Next.js matters',
    body: 'Next.js matters because it turned many front-end architectural decisions into framework-level defaults. Instead of every team inventing its own routing system, server-rendering story, bundling setup, image strategy, and deployment pattern, Next.js offered a coherent answer. That made it one of the most influential frameworks in the React ecosystem for teams building production web applications rather than isolated UI widgets.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that Next.js sits between pure frontend development and full-stack application delivery. It uses React as the UI model, but it also gives developers opinions about route structure, layouts, static generation, server rendering, caching, data loading, API endpoints, and runtime deployment. It is therefore best understood as an application framework for the web, not merely a component library wrapper.',
  },
  {
    title: 'Where it fits best',
    body: 'Next.js fits best when a team wants React plus framework-level support for routing, server rendering, static delivery, SEO-sensitive pages, hybrid applications, or product surfaces where both content delivery and user interactivity matter. It is particularly strong when the application benefits from mixing static content, dynamic server work, client-side interactions, and modern deployment workflows within one codebase.',
  },
]

const whyItMatters = [
  'It gives React teams a framework-level answer for routing, rendering, and data delivery.',
  'It makes hybrid application architecture practical by combining static, server, and client concerns.',
  'It helps teams build pages that load as documents, not only as client-side shells.',
  'It shaped how modern React applications think about server work, layouts, and deployment.',
  'It remains one of the central reference points when comparing full-stack frontend frameworks.',
]

const historicalContext = [
  {
    title: 'React originally left many application decisions open',
    detail:
      'Early React adoption often meant teams had to assemble separate answers for routing, server rendering, bundling, code splitting, data fetching, and deployment. That flexibility was powerful, but it also produced many inconsistent application architectures and a large coordination burden across teams.',
  },
  {
    title: 'Server rendering and static generation became mainstream again',
    detail:
      'As the web matured, teams rediscovered the value of sending useful HTML early for performance, SEO, social sharing, and user-perceived speed. Next.js helped normalize the idea that modern React applications did not have to be client-only single-page applications.',
  },
  {
    title: 'The framework evolved alongside React itself',
    detail:
      'Next.js changed as React changed. Earlier generations emphasized page-based routing and lifecycle-driven rendering decisions, while later generations adopted newer React primitives and a stronger server-oriented model. Understanding Next.js therefore also means understanding how the React ecosystem moved toward hybrid rendering and server-aware composition.',
  },
  {
    title: 'Deployment became part of framework design',
    detail:
      'Framework decisions in Next.js are often tied to how applications are built and deployed in practice. Caching, revalidation, route execution, middleware, and asset optimization are not purely abstract code concerns; they are part of the operational model of the framework.',
  },
]

const bigPictureThemes = [
  {
    title: 'Next.js is React plus architecture',
    body: 'A plain React application defines UI composition, but Next.js goes further by defining application structure. Routes, layouts, data loading boundaries, server and client responsibilities, and caching behavior are all part of the framework model. Teams get leverage from those defaults, but they also need to understand what the framework is deciding on their behalf.',
  },
  {
    title: 'Rendering strategy is a design choice, not an afterthought',
    body: 'One of the most important ideas in Next.js is that rendering can happen in multiple places and at multiple times. A page may be generated at build time, rendered on the server for each request, revalidated after deployment, or hydrated with client-side interactivity. The framework is powerful because it allows multiple strategies, but teams need a clear reason for each one.',
  },
  {
    title: 'Server and client boundaries must stay deliberate',
    body: 'Modern Next.js encourages developers to think carefully about what should stay on the server and what must execute in the browser. This is not only a performance choice. It also affects security, data access, bundle size, hydration cost, and the shape of the programming model.',
  },
  {
    title: 'Framework support does not remove engineering tradeoffs',
    body: 'Next.js improves many defaults, but it does not make architecture automatic. Caching can become confusing, server rendering still costs compute time, network waterfalls still exist, and a poorly organized application can still become difficult to reason about. The framework helps, but disciplined design is still required.',
  },
]

const keyTakeaways = [
  'Next.js is best understood as a React application framework with opinions about routing, rendering, data delivery, and deployment.',
  'Its main strength is hybrid delivery: static pages, server-rendered pages, and interactive client features can live in one application model.',
  'The server-versus-client boundary is one of the most important design decisions in modern Next.js.',
  'Caching, revalidation, and route organization are core architectural concerns rather than implementation details.',
  'It works best when teams use its conventions intentionally instead of treating it as plain React with extra files.',
]

const topicSignals = [
  {
    title: 'Choose Next.js when the app needs both documents and interactivity',
    body: 'If the application needs initial HTML delivery, SEO-sensitive pages, linkable routes, and rich client-side interactivity in the same product, Next.js is a natural candidate because it supports those modes within one framework.',
  },
  {
    title: 'Choose Next.js when routing and rendering should be standardized',
    body: 'Teams that do not want to assemble routing, data delivery, server rendering, and asset optimization from unrelated libraries often benefit from Next.js because the framework provides coordinated answers for those concerns.',
  },
  {
    title: 'Choose Next.js when server work belongs near the UI surface',
    body: 'Applications that benefit from route handlers, server-side data fetching, or server actions close to the rendering layer often fit Next.js well. This reduces the distance between UI composition and the server logic that supports it.',
  },
  {
    title: 'Avoid using Next.js only because it is popular',
    body: 'A purely client-side application or a very small project may not need the additional rendering, caching, and deployment concepts that Next.js introduces. The framework should be chosen because its model solves real application needs, not because it is the default trend.',
  },
]

const coreFoundations = [
  {
    title: 'File-based routing and layouts',
    body: 'Next.js treats route structure as part of the project structure. Folders and special files represent pages, nested layouts, loading states, error boundaries, and route handlers. This means application architecture is visible in the filesystem, which can improve clarity when used deliberately.',
  },
  {
    title: 'Server components and client components',
    body: 'A major conceptual shift in modern Next.js is the separation between components that can remain on the server and components that must run in the browser. Server components can fetch data and avoid client bundle cost, while client components enable state, effects, event handling, and browser APIs. Teams need to place this boundary carefully.',
  },
  {
    title: 'Rendering modes and revalidation',
    body: 'Next.js supports multiple ways to produce output. Some pages are static, some are server-rendered on demand, and some are regenerated over time through revalidation. Understanding when content is computed, cached, and refreshed is central to reasoning about correctness and performance.',
  },
  {
    title: 'Data fetching and cache-aware delivery',
    body: 'Data fetching in Next.js is closely tied to rendering behavior. A fetch call can be cached, uncached, or revalidated depending on how the route is configured and what data freshness guarantees the application needs. The framework therefore encourages developers to think about data delivery and page generation together.',
  },
  {
    title: 'Integrated server-side capabilities',
    body: 'Next.js is not limited to rendering pages. It can also expose route handlers, middleware-like logic, and server actions that let developers keep some server concerns inside the same codebase. This creates a hybrid development model where frontend and backend boundaries are closer than in a traditional split architecture.',
  },
]

const frameworkFeatures = [
  {
    title: 'App Router and nested layout composition',
    body: 'The App Router model emphasizes nested layouts, route segments, colocated loading and error handling, and server-first composition. This helps large applications share structural UI consistently across many routes while keeping route-specific concerns close to the pages that need them.',
  },
  {
    title: 'Image, font, and asset optimization',
    body: 'Next.js includes framework-level support for optimizing images, handling fonts, splitting assets, and reducing unnecessary delivery cost. These features matter because frontend performance is often constrained by what the browser has to download and execute, not only by component code style.',
  },
  {
    title: 'Route handlers and server actions',
    body: 'Modern Next.js can place certain server-side behaviors close to the route tree. Route handlers can define HTTP endpoints, and server actions can move selected mutation logic to the server. These features are useful when they reduce accidental complexity, but they should not become an excuse for unclear architectural boundaries.',
  },
  {
    title: 'Loading, error, and suspense-oriented route behavior',
    body: 'Next.js gives route segments built-in ways to describe pending states, error recovery, and partial streaming behavior. This helps applications communicate progress to users more clearly, but teams still need to design those states intentionally rather than relying on defaults without UX thought.',
  },
  {
    title: 'Deployment-aware defaults',
    body: 'The framework is designed with build output, caching, edge or server execution, and asset delivery in mind. That means development choices in Next.js often have direct operational consequences. Teams benefit most when they understand those consequences instead of treating deployment as somebody elses concern.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Server rendering is useful but not free',
    body: 'Rendering on the server can improve first-page delivery and reduce some client work, but it also consumes server resources and can introduce latency if data access is slow. Teams should use server rendering because it improves the application, not because it sounds more advanced than static delivery or client rendering.',
  },
  {
    title: 'Hydration and bundle size still matter',
    body: 'Even in a server-aware framework, the browser still has to download and execute JavaScript for interactive parts of the page. Large client bundles, too many client components, and unnecessary browser-side dependencies can still damage performance. Next.js gives teams tools, but not immunity.',
  },
  {
    title: 'Caching must match the freshness model',
    body: 'A recurring source of confusion in Next.js is mismatched expectations about when data updates become visible. If teams do not clearly decide which routes may be cached, how long cached content is acceptable, and when revalidation should happen, users may see stale or inconsistent data.',
  },
  {
    title: 'Observability and deployment discipline still matter',
    body: 'Applications built with Next.js still need logging, tracing, error reporting, analytics, and operational debugging. Hybrid rendering and caching make these concerns more important, not less, because failures can occur in multiple environments with different symptoms.',
  },
]

const ecosystemUses = [
  {
    title: 'Marketing and content-heavy surfaces',
    body: 'Next.js works well for public-facing pages where search visibility, metadata, social previews, and fast first loads matter. Static generation and server rendering make it easier to deliver useful HTML early while still allowing shared React-based UI composition.',
  },
  {
    title: 'Product applications with mixed rendering needs',
    body: 'Dashboards, account portals, commerce interfaces, and SaaS products often contain a mix of static shell content, personalized server data, and client-side interactivity. Next.js is attractive because it can support those modes without forcing separate frontend architectures.',
  },
  {
    title: 'Teams that want a React framework rather than a stack assembly project',
    body: 'Many teams choose Next.js because they want routing, build configuration, optimization, and modern React integration to arrive as a coordinated framework rather than as many separate decisions that must be maintained independently.',
  },
  {
    title: 'Applications that benefit from colocated server capabilities',
    body: 'If the product benefits from lightweight API routes, request-time data work, or server-side mutations that sit close to the route tree, Next.js can simplify the architecture by reducing the distance between rendered UI and the supporting server logic.',
  },
]

const comparisons = [
  {
    title: 'Next.js versus plain React',
    body: 'React by itself focuses on UI composition, while Next.js adds a framework model for routing, rendering, deployment, and data delivery. The tradeoff is more structure and more concepts in exchange for less stack assembly and a stronger production story.',
  },
  {
    title: 'Next.js versus Angular',
    body: 'Angular is a highly structured frontend framework centered on components, templates, services, and dependency injection inside the browser application model. Next.js is more explicitly concerned with document delivery, hybrid rendering, and server-client boundaries around a React application model.',
  },
  {
    title: 'Next.js versus Nuxt',
    body: 'Both frameworks aim to provide a full application model around a component ecosystem, but they do so in different language and framework cultures. The comparison is less about raw capability and more about whether the team wants the React worldview or the Vue worldview plus each frameworks routing and rendering conventions.',
  },
  {
    title: 'Next.js versus client-only SPA stacks',
    body: 'A client-only stack can be simpler when the application is truly browser-centric and does not benefit from early HTML delivery or server-side route work. Next.js becomes more valuable as soon as search visibility, document-style delivery, hybrid rendering, or colocated server functionality start to matter.',
  },
]

const failureModes = [
  {
    title: 'Marking too much of the tree as client-side',
    body: 'If teams move large portions of the component tree into client components by reflex, they lose many of the frameworks main benefits. Bundle size grows, hydration cost increases, and server-side data access becomes harder to exploit well.',
  },
  {
    title: 'Treating caching rules as magic',
    body: 'Next.js can feel confusing when developers do not explicitly reason about cached versus uncached fetches, route revalidation, and request-time behavior. The framework is predictable only when the freshness model is designed on purpose.',
  },
  {
    title: 'Using colocated server features without architectural boundaries',
    body: 'Route handlers and server actions are useful, but they can also produce a codebase where domain logic, authentication, validation, and UI concerns blur together. The framework allows proximity; it does not require careless mixing.',
  },
  {
    title: 'Assuming framework defaults automatically guarantee performance',
    body: 'Image optimization, code splitting, and server rendering help, but applications can still become slow if data fetching is poorly structured, bundles are large, or layouts do too much work. Next.js removes some failure modes while leaving others fully in the hands of the team.',
  },
  {
    title: 'Adopting the framework without understanding the runtime model',
    body: 'A team that writes Next.js as if it were only a folder convention on top of plain React will usually struggle. The framework makes more sense when developers understand where code runs, what is cached, what is streamed, and what becomes browser JavaScript.',
  },
]

const studyChecklist = [
  'Understand Next.js as a React application framework, not only a routing convenience.',
  'Learn the difference between server components and client components and why the boundary matters.',
  'Be explicit about which routes are static, dynamic, cached, or revalidated over time.',
  'Use route structure, layouts, loading states, and error boundaries as architectural tools rather than incidental files.',
  'Watch bundle size and hydration cost even when the framework offers strong server-side features.',
  'Keep server actions, route handlers, and domain logic organized with clear boundaries.',
]

const examples = [
  {
    id: 'next98-example-page',
    title: 'Example: Basic route page',
    area: 'Routing',
    intro:
      'A simple page file represents a route segment in the application. The framework uses the filesystem to decide where this page lives in the URL structure.',
    whyFit:
      'This shows the first important idea in Next.js: route structure is represented directly in project structure.',
    code: `export default function HomePage() {
  return <h1>Welcome to the dashboard</h1>
}`,
    takeaway:
      'In Next.js, route design is visible in files and folders, so application structure becomes easier to inspect when the tree stays organized.',
  },
  {
    id: 'next98-example-server',
    title: 'Example: Server component data fetch',
    area: 'Server Components',
    intro:
      'A server component can fetch data directly and render the result without shipping that fetching code to the browser.',
    whyFit:
      'This captures one of the main advantages of the modern Next.js model: data work can stay on the server when interactivity is not required.',
    code: `export default async function OrdersPage() {
  const orders = await fetch('https://api.example.com/orders', {
    cache: 'no-store',
  }).then((response) => response.json())

  return <OrdersTable orders={orders} />
}`,
    takeaway:
      'When logic can stay server-side, the client bundle becomes smaller and the page can render with data already available.',
  },
  {
    id: 'next98-example-client',
    title: 'Example: Client component for interactivity',
    area: 'Client Components',
    intro:
      'Components that need state, events, or browser APIs must opt into client-side execution.',
    whyFit: 'This makes the server-client split explicit instead of hidden behind assumptions.',
    code: `'use client'


export function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}`,
    takeaway:
      'Client components should be introduced because the browser genuinely needs them, not because using the server-first model feels unfamiliar.',
  },
  {
    id: 'next98-example-layout',
    title: 'Example: Shared layout segment',
    area: 'Layouts',
    intro:
      'Nested layouts let a route subtree share shell UI and structure without re-declaring it on every page.',
    whyFit:
      'This reflects that Next.js is good at route-oriented application composition, not only leaf-page rendering.',
    code: `export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <nav>Dashboard Navigation</nav>
      <div>{children}</div>
    </section>
  )
}`,
    takeaway:
      'Layouts should represent stable shared structure so route trees remain composable and readable as the product grows.',
  },
  {
    id: 'next98-example-handler',
    title: 'Example: Route handler',
    area: 'Server Capabilities',
    intro: 'A route handler provides an HTTP endpoint inside the application route tree.',
    whyFit:
      'This demonstrates how Next.js can host selected server concerns near the UI without requiring a separate repository for every small endpoint.',
    code: `export async function GET() {
  return Response.json({ ok: true, source: 'next-route-handler' })
}`,
    takeaway:
      'Route handlers are useful when they simplify the application, but larger domain logic still benefits from explicit service boundaries.',
  },
]

const glossary = [
  {
    term: 'Next.js',
    definition:
      'A React application framework that provides routing, rendering strategies, data delivery patterns, and deployment-aware web architecture.',
  },
  {
    term: 'App Router',
    definition:
      'The modern Next.js routing model based on nested route segments, layouts, and colocated special files.',
  },
  {
    term: 'Server component',
    definition:
      'A component that can run on the server and avoid shipping its logic directly to the browser.',
  },
  {
    term: 'Client component',
    definition:
      'A component that runs in the browser and can use state, effects, events, and browser APIs.',
  },
  {
    term: 'Hydration',
    definition:
      'The process where client-side JavaScript attaches interactivity to HTML that was already rendered and delivered.',
  },
  {
    term: 'Static generation',
    definition:
      'A rendering approach where page output is produced ahead of request time, often during build or scheduled regeneration.',
  },
  {
    term: 'Server-side rendering',
    definition:
      'A rendering approach where HTML is produced on the server for an incoming request.',
  },
  {
    term: 'Revalidation',
    definition:
      'A strategy for refreshing cached or generated content after some period or event so data does not remain stale forever.',
  },
  {
    term: 'Route handler',
    definition: 'A Next.js file that defines an HTTP endpoint inside the application route tree.',
  },
  {
    term: 'Server action',
    definition:
      'A server-executed action invoked from the application to handle selected mutations or form submissions.',
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
    { id: 'next98-overview', label: 'Overview' },
    { id: 'next98-why', label: 'Why It Matters' },
    { id: 'next98-history', label: 'Historical Context' },
    { id: 'next98-themes', label: 'Big Picture Themes' },
    { id: 'next98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'next98-signals', label: 'Topic Signals' },
    { id: 'next98-foundations', label: 'Foundations' },
    { id: 'next98-features', label: 'Framework Features' },
    { id: 'next98-runtime', label: 'Runtime and Operations' },
    { id: 'next98-uses', label: 'Ecosystem Uses' },
    { id: 'next98-compare', label: 'Compare and Contrast' },
    { id: 'next98-failures', label: 'Failure Modes' },
    { id: 'next98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'next98-glossary', label: 'Terms' }],
}

export default function HomePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Next.js (Frontend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Next.js (Frontend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Next.js (Frontend)</h1>
      <p className="next98-intro">
        This page is a frontend-focused overview of Next.js as a React application framework. It
        explains route structure, layouts, server and client component boundaries, rendering
        strategies, caching, deployment-aware behavior, operational tradeoffs, and the architectural
        discipline required to keep a hybrid web application understandable as it grows.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="next98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="next98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="next98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="next98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="next98-takeaways" className="bin98-section">
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
          <section id="next98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="next98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="next98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="next98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="next98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="next98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="next98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="next98-checklist" className="bin98-section">
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
        <section id="next98-glossary" className="bin98-section">
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
