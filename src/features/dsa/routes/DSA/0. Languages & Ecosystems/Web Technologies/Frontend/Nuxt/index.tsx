import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What Nuxt is',
    body: 'Nuxt is a Vue application framework that adds routing, layouts, data fetching, server-side rendering, static generation, head management, server endpoints, and deployment-aware build behavior around the Vue component model. It is best understood as the production application layer for Vue rather than as a small add-on to Vue single-page apps.',
  },
  {
    title: 'Why Nuxt matters',
    body: 'Nuxt matters because it turns many recurring web-application decisions into framework conventions. Instead of having every Vue team assemble routing, rendering, metadata, data loading, and deployment strategy separately, Nuxt offers a coordinated model that can serve content-rich sites, hybrid products, and full-stack applications from one project structure.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that Nuxt sits between frontend framework work and full-stack web delivery. Vue provides the component and reactivity model, while Nuxt defines how routes are discovered, how layouts are composed, when content is rendered on the server, where data is fetched, and how server-side logic can live beside the route tree.',
  },
  {
    title: 'Where it fits best',
    body: 'Nuxt fits best for Vue teams that need more than a client-only interface. It is especially strong for content sites, commerce surfaces, public product pages, hybrid applications with both SEO-sensitive content and browser interactivity, and teams that want a framework-level answer for Vue production architecture.',
  },
]

const whyItMatters = [
  'It gives Vue teams a framework-level answer for routing, rendering, and data delivery.',
  'It makes server rendering and static generation normal rather than custom infrastructure work.',
  'It supports hybrid applications where public content and interactive product surfaces coexist.',
  'It brings server capabilities into the same project model through Nitro and route handlers.',
  'It is one of the main reference points when comparing full-stack frameworks in the Vue ecosystem.',
]

const historicalContext = [
  {
    title: 'Vue applications often started as client-only SPAs',
    detail:
      'Early Vue projects were commonly assembled as browser-rendered applications where routing and state lived fully on the client. That model worked well for some interfaces, but it made document delivery, metadata, first load performance, and search visibility harder to solve consistently for public-facing sites.',
  },
  {
    title: 'Server rendering returned as a practical requirement',
    detail:
      'As teams built more product sites, storefronts, and mixed public-private applications, they needed a better way to send useful HTML earlier. Nuxt became the ecosystem answer for teams that wanted Vue without giving up document-first delivery, route-level rendering control, or better SEO behavior.',
  },
  {
    title: 'The framework expanded from pages into application architecture',
    detail:
      'Nuxt evolved from being viewed mainly as a page and SSR framework into a broader application platform. Layouts, modules, route middleware, auto-imported composables, server APIs, and deployment targeting became part of the frameworks identity rather than incidental tooling around Vue.',
  },
  {
    title: 'Nitro made deployment part of the framework story',
    detail:
      'Modern Nuxt is not only about how components render. Nitro gives the framework a server runtime that can target multiple environments, which means architectural choices in Nuxt often connect directly to hosting, caching, and server execution concerns.',
  },
]

const bigPictureThemes = [
  {
    title: 'Nuxt is Vue plus delivery architecture',
    body: 'Vue alone defines how components react to state and compose into interfaces. Nuxt extends that by defining how the application is discovered and delivered: routes come from files, layouts wrap route trees, and rendering may occur at build time, on the server, or in the browser depending on what the route needs.',
  },
  {
    title: 'Rendering mode is a core product decision',
    body: 'One of Nuxts most important ideas is that the same codebase can support multiple rendering strategies. A route may be statically generated, server-rendered on request, cached and revalidated, or effectively client-side. Teams need to choose those modes because they match product requirements, not because one sounds more modern than another.',
  },
  {
    title: 'Vue conventions remain central',
    body: 'Nuxt adds a framework shell, but it still depends on the Vue programming model. Components, composables, reactivity, and template-driven UI remain foundational. Teams succeed with Nuxt when they understand both Vue itself and the extra application-layer conventions that Nuxt introduces.',
  },
  {
    title: 'Framework support does not eliminate complexity',
    body: 'Nuxt reduces setup work, but it does not make architecture automatic. Poor route boundaries, unclear data fetching, stale cache strategy, and weak separation between server concerns and UI concerns can still produce an application that is difficult to reason about or operate safely.',
  },
]

const keyTakeaways = [
  'Nuxt is best understood as the application framework layer for Vue, not as a small plugin.',
  'Its main strength is hybrid delivery: routes can mix static output, request-time rendering, and interactive client behavior.',
  'Nitro and server routes bring selected backend capabilities into the same application model.',
  'File-based routing, layouts, modules, and auto-imported composables are core parts of the developer experience.',
  'Nuxt works best when teams use its conventions deliberately instead of treating it like plain Vue with extra files.',
]

const topicSignals = [
  {
    title: 'Choose Nuxt when the app needs both pages and application behavior',
    body: 'If the product needs routeable documents, SEO-sensitive pages, metadata, public content, and interactive Vue-driven features in the same codebase, Nuxt is a strong fit because it supports those concerns together.',
  },
  {
    title: 'Choose Nuxt when Vue is the preferred UI model',
    body: 'Teams that want the Vue component model, the Composition API, and the Vue ecosystem often choose Nuxt when they also want routing, layouts, rendering strategy, and server concerns to be standardized by a framework.',
  },
  {
    title: 'Choose Nuxt when colocated server work reduces friction',
    body: 'Applications that benefit from lightweight APIs, request-time data loading, or deployment-aware server execution can use Nuxt effectively because Nitro and route handlers keep selected server work near the route tree.',
  },
  {
    title: 'Avoid adopting Nuxt when a simple client app is enough',
    body: 'A very small browser-only interface may not need SSR, layouts, server routes, or rendering strategy decisions. Nuxt should be chosen because the product benefits from its application model, not because it is the default answer for every Vue project.',
  },
]

const coreFoundations = [
  {
    title: 'File-based routing and layout structure',
    body: 'Nuxt uses the project tree to describe route structure. Pages become routes, nested folders create nested paths, and layouts define shared structure across related routes. This makes application architecture legible in the filesystem when route boundaries are chosen carefully.',
  },
  {
    title: 'Vue components and composables remain the basic units',
    body: 'Nuxt adds conventions, but everyday application logic still lives in Vue components and composables. Developers still need to understand props, events, reactivity, watchers, computed state, and composable design because Nuxt builds on top of those fundamentals rather than replacing them.',
  },
  {
    title: 'Rendering strategy and hydration',
    body: 'Nuxt can render HTML on the server, at build time, or rely on client-side execution. Regardless of strategy, interactive browser behavior still requires hydration for relevant parts of the UI. Teams therefore need to think about what should be rendered early, what must remain reactive, and what browser work is actually necessary.',
  },
  {
    title: 'Data fetching and payload delivery',
    body: 'Data fetching in Nuxt is closely tied to route rendering. Composables such as useFetch and useAsyncData help route pages receive data during server rendering or route navigation, while the framework serializes the needed payload for the client. This means data freshness, caching, and user experience should be designed together.',
  },
  {
    title: 'Server capabilities through Nitro',
    body: 'Nuxt is not limited to page delivery. Nitro enables route handlers, server-side utilities, and deployment-targeted runtime logic. That gives teams a hybrid application model where some backend behavior can live inside the same repository without turning every product into a fully separate frontend-backend split.',
  },
]

const frameworkFeatures = [
  {
    title: 'Auto-imports for composables and framework helpers',
    body: 'Nuxt reduces file-level ceremony by auto-importing many framework helpers, Vue utilities, and project composables. This can improve ergonomics, but teams still need clear naming conventions so the codebase remains understandable rather than magical.',
  },
  {
    title: 'Layouts, route middleware, and app structure',
    body: 'Layouts let route groups share shell structure, while route middleware can apply navigation checks and route-level logic before a page becomes active. These features help organize larger products around application flows rather than only around individual components.',
  },
  {
    title: 'Nitro routes and server endpoints',
    body: 'Server routes allow Nuxt applications to host selected HTTP behaviors close to the UI. This is useful for lightweight APIs, proxying, request-time aggregation, or mutation endpoints, as long as teams keep validation, authorization, and domain rules explicit.',
  },
  {
    title: 'Module ecosystem and framework integration',
    body: 'Nuxt modules can integrate state management, image handling, content systems, internationalization, analytics, and more at the framework layer. This is valuable because integrations become part of project structure instead of scattered ad hoc setup in many files.',
  },
  {
    title: 'Head management and route-aware document behavior',
    body: 'Nuxt includes a stronger document model than a client-only SPA. Metadata, titles, canonical links, and route-aware head changes can be defined in ways that align with server rendering and document delivery, which matters for public content and search-facing pages.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Server rendering is helpful but not free',
    body: 'Server-rendered output can improve first load quality and metadata delivery, but it also costs server compute and can increase latency if data access is slow. Teams should use SSR because it improves the product experience, not because it sounds inherently superior to every other mode.',
  },
  {
    title: 'Hydration and browser bundle size still matter',
    body: 'Even when Nuxt renders useful HTML early, the browser still downloads and executes JavaScript for interactive behavior. Large bundles, overly heavy components, and unnecessary client-side dependencies can still hurt responsiveness. The framework helps with delivery, but browser cost remains a real constraint.',
  },
  {
    title: 'Caching and freshness need a deliberate model',
    body: 'A hybrid framework can easily produce confusion if nobody decides which routes are static, which are request-time, and how stale data is allowed to become. Nuxt makes route-level control possible, but the team must still define freshness expectations clearly.',
  },
  {
    title: 'Deployment and observability remain engineering work',
    body: 'Nuxt can target multiple environments, but teams still need logging, error tracking, metrics, traceability, and runtime debugging. Server-side rendering and route handlers increase the number of failure modes that may occur outside the browser, so operational discipline becomes more important, not less.',
  },
]

const ecosystemUses = [
  {
    title: 'Marketing sites, content systems, and documentation',
    body: 'Nuxt is a strong fit for document-oriented surfaces where metadata, search visibility, content structure, and fast initial delivery matter. Static generation and route-aware rendering help those experiences feel like web documents rather than empty shells.',
  },
  {
    title: 'Commerce and public product surfaces',
    body: 'Storefronts, catalogs, landing pages, and public account pages often benefit from a hybrid model where some content is generated early while other parts remain interactive and personalized. Nuxt supports this well for teams that prefer Vue.',
  },
  {
    title: 'Vue teams that want a full application framework',
    body: 'Many teams choose Nuxt because they want Vue plus a coherent production model, including layouts, route discovery, server routes, metadata handling, and deployment-aware conventions, rather than assembling those concerns one by one.',
  },
  {
    title: 'Products that need selected server behavior without a hard split',
    body: 'Nuxt can simplify architectures where a separate backend service is not needed for every small piece of functionality. Lightweight endpoints, request-time data shaping, or route-proximate server logic can live in the same application while still respecting clear boundaries.',
  },
]

const comparisons = [
  {
    title: 'Nuxt versus plain Vue',
    body: 'Vue by itself focuses on component-driven UI and browser interactivity, while Nuxt adds routing, rendering strategy, layouts, data delivery, and server capabilities. The tradeoff is more framework concepts in exchange for less application infrastructure assembly.',
  },
  {
    title: 'Nuxt versus Next.js',
    body: 'Both frameworks aim to provide a full-stack application model around a UI library. The main difference is the underlying ecosystem and programming culture: Nuxt builds on the Vue worldview and its composable patterns, while Next.js builds on React and its own server-client boundary conventions.',
  },
  {
    title: 'Nuxt versus client-only SPA stacks',
    body: 'A client-only Vue stack may be simpler when the application is purely browser-driven and does not benefit from server-rendered documents or route-level server work. Nuxt becomes more valuable when metadata, first-page delivery, hybrid rendering, or colocated server logic start to matter.',
  },
  {
    title: 'Nuxt versus traditional frontend-backend separation',
    body: 'A strict split can still be correct for large systems with independent backend ownership or complex domain services. Nuxt is most compelling when some server-side concerns can live productively near the route tree without obscuring domain boundaries or operational ownership.',
  },
]

const failureModes = [
  {
    title: 'Treating auto-imports as magic instead of structure',
    body: 'Auto-imports can improve ergonomics, but they can also make code harder to trace if teams do not keep naming disciplined. A codebase becomes confusing when developers cannot tell where helpers come from or when composable responsibilities overlap heavily.',
  },
  {
    title: 'Using server routes without clear boundaries',
    body: 'Route handlers are convenient, but they can encourage teams to mix validation, authorization, data access, and UI concerns carelessly. Colocation is useful only when the architecture remains explicit about ownership and domain rules.',
  },
  {
    title: 'Choosing rendering modes by habit rather than need',
    body: 'Not every route needs SSR, and not every route should be static. Teams get the most out of Nuxt when they pick a rendering strategy because it matches freshness, performance, and content requirements rather than because a default was never reconsidered.',
  },
  {
    title: 'Ignoring hydration and bundle cost',
    body: 'A page can still feel slow even if the first HTML arrives quickly. Heavy client bundles, large third-party scripts, and excessive browser-side logic still hurt the user experience, especially on constrained devices.',
  },
  {
    title: 'Writing Nuxt as if it were only a routing layer',
    body: 'Teams sometimes use Nuxt only for pages while ignoring layouts, middleware, server routes, module integration, and route-level rendering choices. That usually means paying the cost of a framework without using the architectural support it was chosen for.',
  },
]

const studyChecklist = [
  'Understand Nuxt as a Vue application framework, not only as an SSR utility.',
  'Learn how pages, layouts, composables, middleware, and Nitro routes fit together in one application model.',
  'Choose rendering strategy per route based on freshness, metadata, and user experience needs.',
  'Use auto-imports and modules to reduce noise, but keep project naming and ownership disciplined.',
  'Design data fetching with payload size, hydration cost, and cache freshness in mind.',
  'Keep server-side behavior explicit about authorization, validation, and domain boundaries.',
]

const examples = [
  {
    id: 'nuxt98-example-page',
    title: 'Example: File-based page route',
    area: 'Routing',
    intro:
      'A page component inside the pages directory becomes a route automatically. The route tree is therefore visible in the filesystem rather than defined in a separate router file.',
    whyFit:
      'This demonstrates one of Nuxts most important conventions: route architecture is encoded directly in project structure.',
    code: `<template>
  <section>
    <h1>Catalog</h1>
    <p>Browse current inventory.</p>
  </section>
</template>`,
    takeaway:
      'Nuxt is easiest to reason about when the folder tree communicates route purpose clearly rather than becoming an arbitrary collection of pages.',
  },
  {
    id: 'nuxt98-example-fetch',
    title: 'Example: Data fetching with useFetch',
    area: 'Data Delivery',
    intro:
      'A page can fetch data during rendering so that the HTML response already contains meaningful content instead of relying on a second client-side request after first paint.',
    whyFit:
      'This captures how Nuxt connects data loading and route rendering in one framework model.',
    code: `<script setup lang="ts">
const { data: products, pending, error } = await useFetch('/api/products')
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Unable to load products.</div>
  <ul v-else>
    <li v-for="product in products" :key="product.id">
      {{ product.name }}
    </li>
  </ul>
</template>`,
    takeaway:
      'Data fetching in Nuxt is most effective when it is designed together with route delivery rather than bolted on as a purely client-side concern.',
  },
  {
    id: 'nuxt98-example-layout',
    title: 'Example: Shared layout wrapper',
    area: 'Layouts',
    intro:
      'Layouts give a route subtree stable shared structure such as navigation, shells, and framing UI without repeating that wrapper in every page component.',
    whyFit:
      'This reflects that Nuxt is intended for structured applications rather than disconnected pages.',
    code: `<template>
  <div>
    <nav>Dashboard Navigation</nav>
    <main>
      <slot />
    </main>
  </div>
</template>`,
    takeaway:
      'Layouts should represent durable structural UI, which keeps route-level pages focused on page-specific content and logic.',
  },
  {
    id: 'nuxt98-example-server',
    title: 'Example: Nitro API route',
    area: 'Server Routes',
    intro:
      'A server endpoint can live inside the same project and return data for pages, mutations, or browser clients without requiring a separate service for every small feature.',
    whyFit:
      'This shows how Nuxt blends selected backend behavior into the application model through Nitro.',
    code: `export default defineEventHandler(async () => {
  return {
    ok: true,
    source: 'nuxt-nitro',
  }
})`,
    takeaway:
      'Colocated server routes are useful when they simplify delivery, but teams still need clear rules around validation, secrets, and domain ownership.',
  },
  {
    id: 'nuxt98-example-middleware',
    title: 'Example: Route middleware',
    area: 'Navigation Flow',
    intro:
      'Route middleware can guard protected pages or redirect users before the destination route becomes active.',
    whyFit:
      'This illustrates how Nuxt treats route flow as part of application architecture rather than as ad hoc component logic.',
    code: `export default defineNuxtRouteMiddleware((to) => {
  const user = useState('user')

  if (!user.value && to.path.startsWith('/admin')) {
    return navigateTo('/login')
  }
})`,
    takeaway:
      'Navigation rules belong in route-level structures when they reflect access flow or page entry policy rather than isolated UI state.',
  },
]

const glossary = [
  {
    term: 'Nuxt',
    definition:
      'A Vue application framework that adds routing, rendering strategy, layouts, server capabilities, and deployment-aware architecture around Vue.',
  },
  {
    term: 'Nitro',
    definition:
      'The server runtime used by Nuxt for route handlers, server execution, and multi-target deployment output.',
  },
  {
    term: 'SSR',
    definition:
      'Server-side rendering, where HTML is produced on the server for a request before the browser hydrates interactive behavior.',
  },
  {
    term: 'Static generation',
    definition:
      'A rendering approach where route output is generated ahead of request time, often during build or explicit prerendering.',
  },
  {
    term: 'Hydration',
    definition:
      'The process where client-side JavaScript attaches interactivity to HTML that was already delivered to the browser.',
  },
  {
    term: 'Composable',
    definition:
      'A reusable Vue function that encapsulates reactive logic and can be shared across components and pages.',
  },
  {
    term: 'Layout',
    definition:
      'A shared wrapper structure that surrounds related routes or pages in a Nuxt application.',
  },
  {
    term: 'Route middleware',
    definition:
      'Nuxt logic that runs during navigation to enforce checks or redirects before a route becomes active.',
  },
  {
    term: 'Module',
    definition:
      'A Nuxt ecosystem integration that extends framework behavior or project setup at the application level.',
  },
  {
    term: 'useFetch',
    definition:
      'A Nuxt composable for route-aware data fetching that integrates with rendering and payload delivery.',
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
    { id: 'nuxt98-overview', label: 'Overview' },
    { id: 'nuxt98-why', label: 'Why It Matters' },
    { id: 'nuxt98-history', label: 'Historical Context' },
    { id: 'nuxt98-themes', label: 'Big Picture Themes' },
    { id: 'nuxt98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'nuxt98-signals', label: 'Topic Signals' },
    { id: 'nuxt98-foundations', label: 'Foundations' },
    { id: 'nuxt98-features', label: 'Framework Features' },
    { id: 'nuxt98-runtime', label: 'Runtime and Operations' },
    { id: 'nuxt98-uses', label: 'Ecosystem Uses' },
    { id: 'nuxt98-compare', label: 'Compare and Contrast' },
    { id: 'nuxt98-failures', label: 'Failure Modes' },
    { id: 'nuxt98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'nuxt98-glossary', label: 'Terms' }],
}

export default function NuxtPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Nuxt (Frontend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Nuxt (Frontend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Nuxt (Frontend)</h1>
      <p className="nuxt98-intro">
        This page is a frontend-focused overview of Nuxt as a Vue application framework. It explains
        routing, layouts, rendering strategies, composables, Nitro-powered server capabilities,
        module integration, operational tradeoffs, and the architectural discipline required to keep
        a hybrid Vue application clear as it grows.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="nuxt98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="nuxt98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="nuxt98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="nuxt98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="nuxt98-takeaways" className="bin98-section">
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
          <section id="nuxt98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nuxt98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nuxt98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nuxt98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nuxt98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nuxt98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nuxt98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="nuxt98-checklist" className="bin98-section">
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
        <section id="nuxt98-glossary" className="bin98-section">
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
