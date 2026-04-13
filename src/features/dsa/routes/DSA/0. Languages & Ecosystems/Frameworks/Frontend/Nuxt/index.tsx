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
      'Nuxt is the full-stack framework built around Vue. It provides file-based routing, layouts, data-fetching conventions, server-side rendering, static generation options, server routes through Nitro, auto-imports, and a module-driven extension model in one coordinated application platform.',
      'In practice, Nuxt is used for content sites, e-commerce fronts, dashboards, SaaS products, marketing pages with rich interactivity, and full-stack Vue applications that need more than plain component rendering. Teams often choose it when they want Vue ergonomics together with a stronger app-level structure.',
      'This reference covers the Nuxt mental model, directory conventions, data fetching, Nitro, rendering modes, modules, layers, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why-nuxt',
    title: 'Why Teams Reach For Nuxt',
    paragraphs: [
      'Nuxt matters because it turns Vue from a component framework into a broader application platform. Instead of making every team reinvent routing, server rendering, data-loading conventions, deployment boundaries, and plugin wiring, Nuxt provides an opinionated baseline that is still flexible enough for real products.',
      'Its practical appeal is that the major app pieces are designed to work together. Pages, layouts, composables, server endpoints, runtime config, auto-imports, and modules form a coherent system rather than a stack of unrelated libraries.',
    ],
  },
  {
    id: 'bp-what-it-optimizes',
    title: 'What Nuxt Optimizes For',
    paragraphs: [
      'Nuxt optimizes for productive Vue application development with strong conventions. File-based routing, auto-imported helpers, server-aware data fetching, and coordinated rendering options reduce repetitive setup and lower architecture drift across teams.',
      'It also optimizes for deployment flexibility. Nuxt can support server rendering, prerendered routes, static output, API endpoints, and hybrid rendering strategies through Nitro and route rules rather than forcing one runtime mode for every page.',
    ],
  },
  {
    id: 'bp-vue-relationship',
    title: 'Relationship to Vue',
    paragraphs: [
      'Nuxt is not a replacement for Vue so much as the higher-level framework built on top of it. Vue remains the component and reactivity foundation, while Nuxt defines how the application is structured, how routes are discovered, how data is fetched in app context, and how server and client concerns are connected.',
      'This distinction matters because plain Vue and Nuxt can feel materially different in day-to-day engineering work. The component authoring model is still Vue, but the architectural center moves toward the framework conventions.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Nuxt Fits Well',
    paragraphs: [
      'Nuxt is a strong fit when the project needs route-level application structure, SSR or hybrid rendering, SEO-sensitive pages, coordinated Vue tooling, and a built-in story for server endpoints, composables, and configuration.',
      'It is especially attractive when a team wants the Vue ecosystem but does not want to hand-assemble every app-level decision from separate packages.',
    ],
  },
  {
    id: 'bp-where-it-needs-care',
    title: 'Where It Needs Care',
    paragraphs: [
      'Nuxt asks teams to embrace framework conventions. The more a project depends on its directory structure, auto-import behavior, runtime model, and build-time modules, the more important it becomes to understand the framework rather than just the underlying Vue syntax.',
      'This is not necessarily a problem, but it means Nuxt is best when the team wants an integrated framework. If the product only needs a small embedded widget or a narrowly scoped client-rendered component island, plain Vue may be a more proportionate tool.',
    ],
  },
  {
    id: 'bp-common-misreadings',
    title: 'Common Misreadings',
    paragraphs: [
      'A common mistake is to treat Nuxt as just Vue with SSR added on top. That misses the larger framework story around routing, auto-imports, modules, Nitro, runtime config, and deployment shape.',
      'Another mistake is to assume file conventions mean the framework is simplistic. In reality, Nuxt can support substantial production architecture, but teams need to understand which concerns belong in pages, composables, server routes, plugins, and modules.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Nuxt centers on Vue components plus a full-stack framework layer for routing, data, rendering, and deployment.',
      'Its main strengths are cohesive conventions, SSR and hybrid rendering options, strong Vue integration, and Nitro-powered server capabilities.',
      'Its main tradeoffs are framework coupling, the need to understand its directory and runtime model, and a smaller ecosystem footprint than the largest React framework platforms.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Nuxt asks developers to think in terms of an application framework built around Vue. Pages define routes, layouts define shells, composables package reusable app logic, server files define backend capabilities, and framework conventions connect the pieces.',
      'That means a Nuxt project is not just a set of isolated Vue components. It is an application organized around framework-aware directories, rendering modes, and runtime boundaries.',
    ],
  },
  {
    id: 'core-app-structure',
    title: 'Application Structure',
    paragraphs: [
      'Nuxt applications are heavily shaped by directory conventions such as `pages/`, `layouts/`, `components/`, `composables/`, `plugins/`, `server/`, `middleware/`, and configuration files. The point is to give the framework enough structure to wire common behavior automatically.',
      'This convention-first model reduces setup and boilerplate, but it also means developers should understand how the framework discovers and interprets files rather than assuming everything is manually assembled.',
    ],
  },
  {
    id: 'core-file-routing',
    title: 'File-Based Routing',
    paragraphs: [
      'Nuxt uses file-based routing for pages. Files inside `pages/` become routes, and nested files map naturally to nested URL structure. Dynamic segments and catch-all behavior are expressed through file naming conventions instead of being registered manually in code.',
      'This usually makes route ownership easy to understand. A page route is not hidden inside a separate router config. It is represented directly by the file system structure of the app.',
    ],
  },
  {
    id: 'core-layouts',
    title: 'Layouts and Shared Shells',
    paragraphs: [
      'Layouts let teams define shared page structure such as navigation, headers, sidebars, and chrome. Pages can opt into layouts so common framing logic stays centralized rather than copied across route components.',
      'This matters because application structure is not only about routing. It is also about consistent shells, nested ownership, and predictable page composition.',
    ],
  },
  {
    id: 'core-auto-imports',
    title: 'Auto-Imports',
    paragraphs: [
      'Nuxt auto-imports many composables, helpers, components, and selected Vue APIs so developers can use them without repetitive import statements. The framework also auto-discovers user code in places such as `components/`, `composables/`, and `utils/` depending on project setup.',
      'The practical benefit is lower boilerplate and a smoother authoring experience. The tradeoff is that developers need to know which names are provided by convention and where those conventions apply.',
    ],
  },
  {
    id: 'core-data-fetching',
    title: 'Data Fetching With App Context',
    paragraphs: [
      "Nuxt provides application-aware data-fetching composables such as `useAsyncData` and `useFetch`. These fit into the framework's SSR and hydration model, letting pages and components fetch data in a way that works across server and client execution.",
      'This is important because Nuxt is not only about rendering Vue templates. It also defines how asynchronous data should enter the app so server rendering, caching, and page navigation stay coordinated.',
    ],
  },
  {
    id: 'core-server',
    title: 'Nitro Server Layer',
    paragraphs: [
      'Nuxt uses Nitro as its server engine. Nitro powers server routes, API endpoints, middleware, prerendering support, and broader deployment flexibility across different hosting targets.',
      'This makes Nuxt more than a front-end-only framework. Teams can build server-backed application features and API endpoints from the same codebase while still keeping client and server concerns separated by directory and runtime boundaries.',
    ],
  },
  {
    id: 'core-rendering',
    title: 'SSR, Static, and Hybrid Rendering',
    paragraphs: [
      'Nuxt supports multiple rendering strategies including server-side rendering, prerendering, static generation workflows, and hybrid route-by-route rendering behavior. The framework does not force every route to behave identically if the app needs a mixed delivery strategy.',
      "This is one of Nuxt's strongest architectural advantages. Teams can optimize routes differently depending on SEO, freshness, personalization, and infrastructure needs rather than choosing one rendering mode for the entire project.",
    ],
  },
  {
    id: 'core-route-rules',
    title: 'Route Rules and Rendering Policy',
    paragraphs: [
      'Nuxt and Nitro support route rules that let teams configure behavior per route, such as prerendering, redirects, caching, or specific rendering-related behavior. This makes deployment policy part of the application configuration instead of an external afterthought.',
      'The result is a more explicit connection between route intent and runtime behavior. A content page and a personalized dashboard do not have to be treated as the same kind of page.',
    ],
  },
  {
    id: 'core-server-routes',
    title: 'Server Endpoints and Middleware',
    paragraphs: [
      'Files in `server/api`, `server/routes`, and related server directories let Nuxt applications define backend capabilities directly in the project. Middleware and utilities can also live in the server side of the codebase under Nitro conventions.',
      'That means full-stack workflows can often stay in one repository and one framework model instead of being split immediately across separate front-end and back-end projects.',
    ],
  },
] as const

const coreConceptSectionsContinued: readonly DocSection[] = [
  {
    id: 'core-runtime-config',
    title: 'Runtime Config and Environment Boundaries',
    paragraphs: [
      'Nuxt provides runtime configuration patterns so applications can separate public and server-only configuration. This is important in SSR-capable frameworks because some values must remain server-side while others are safe to expose to the client.',
      'The broader engineering lesson is that Nuxt treats environment boundaries as first-class application concerns instead of leaving them to ad hoc conventions.',
    ],
  },
  {
    id: 'core-plugins',
    title: 'Plugins and App Initialization',
    paragraphs: [
      'Nuxt plugins let teams register app-wide behavior, provide helpers, integrate third-party services, and augment the application context in a framework-aware way. This provides a structured answer for cross-cutting startup logic.',
      'Used well, plugins help centralize integrations instead of scattering setup code through random components. Used poorly, they can become a hidden global layer, so teams should still apply discipline.',
    ],
  },
  {
    id: 'core-modules',
    title: 'Modules and Ecosystem Extension',
    paragraphs: [
      'Nuxt has a module system that allows official and community packages to extend framework behavior, configuration, and generated app capabilities. This is different from simply installing a Vue library. A Nuxt module can participate in the framework itself.',
      'That makes the ecosystem powerful when teams want batteries-included integration, but it also means module choice can shape the project deeply. Modules are part of architecture, not just a utility layer.',
    ],
  },
  {
    id: 'core-layers',
    title: 'Layers and Reuse Across Projects',
    paragraphs: [
      'Nuxt supports layers, which allow teams to share base application structure, configuration, and common behavior across multiple projects. This can be valuable in organizations that need a reusable product platform rather than a single one-off app.',
      'Layers make it possible to treat Nuxt not only as an app framework, but also as a platform-building tool for families of related applications.',
    ],
  },
  {
    id: 'core-composables',
    title: 'Composables and Logic Reuse',
    paragraphs: [
      'Nuxt builds naturally on the Vue composable pattern. Reusable application logic can live in composables, but in Nuxt those composables often interact with framework-aware helpers such as runtime config, route context, app instance state, and async data utilities.',
      'This means composables are often the cleanest place to package reusable Nuxt logic, provided the team keeps them focused and avoids hiding too much framework behavior behind opaque helpers.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Developer Experience',
    paragraphs: [
      'Nuxt works well with TypeScript and tries to keep typed development aligned with auto-imports, generated types, and framework-aware utilities. The goal is to reduce the friction that can come from mixing build-time conventions with typed application code.',
      'This is especially important in a framework with strong conventions. Type support helps make those conventions visible and safer rather than magical and fragile.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Nuxt is frequently used for SSR-capable Vue apps, content-rich sites, e-commerce fronts, SEO-sensitive products, internal tools with app-level structure, and full-stack Vue applications that need API endpoints or hybrid rendering behavior.',
      'It is also attractive when a team wants a strong default architecture for Vue rather than assembling router, SSR, and server concerns manually.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Nuxt provides strong conventions, but those conventions create framework coupling. Teams need to understand file conventions, runtime behavior, and Nuxt-specific abstractions instead of treating the project like plain Vue plus a few plugins.',
      'Another tradeoff is operational scope. Because Nuxt can reach into rendering, data, and server behavior, changes in one part of the app can have broader consequences than in a narrower client-only setup.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Nuxt is commonly compared with plain Vue for component framework versus full application framework scope, with Next.js for Vue ecosystem cohesion versus a larger React platform ecosystem, and with other full-stack front-end frameworks for how much convention, file structure, and server integration they provide.',
      'These comparisons help position Nuxt correctly: it is the integrated full-stack framework answer for Vue, not merely a routing addon or a thin SSR wrapper.',
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
    title: 'Page Route With useAsyncData',
    description:
      'A Nuxt page commonly reads route parameters and fetches data with a framework-aware composable that works with SSR and client navigation.',
    snippets: [
      {
        label: 'pages/products/[id].vue',
        code: `<script setup lang="ts">
const route = useRoute()

const { data: product, pending, error } = await useAsyncData(
  () => \`product:\${route.params.id}\`,
  () => $fetch(\`/api/products/\${route.params.id}\`)
)
</script>

<template>
  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Could not load product.</p>
  <article v-else>
    <h1>{{ product?.name }}</h1>
    <p>{{ product?.description }}</p>
  </article>
</template>`,
      },
    ],
    takeaway:
      'Nuxt data fetching is usually expressed through framework-aware composables rather than ad hoc fetch logic scattered across lifecycle hooks.',
  },
  {
    id: 'examples-server',
    title: 'Server API Endpoint',
    description:
      'Nitro-powered server routes allow full-stack behavior inside the same project. An endpoint can live in the `server/` directory and be consumed by pages or other clients.',
    snippets: [
      {
        label: 'server/api/products/[id].ts',
        code: `export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return {
    id,
    name: 'Mechanical Keyboard',
    description: 'Compact board with hot-swappable switches.',
  }
})`,
      },
    ],
    takeaway:
      'Nuxt is not only a front-end shell. Nitro gives the app a native server layer for APIs, middleware, and route-aware server logic.',
  },
  {
    id: 'examples-layout',
    title: 'Layout Example',
    description:
      'Layouts keep shared page chrome out of individual routes. A page can opt into a layout while still owning its own route-specific content and async behavior.',
    snippets: [
      {
        label: 'layouts/dashboard.vue',
        code: `<template>
  <main>
    <aside>Dashboard navigation</aside>
    <section>
      <slot />
    </section>
  </main>
</template>`,
      },
      {
        label: 'pages/dashboard.vue',
        code: `<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <h1>Dashboard</h1>
</template>`,
      },
    ],
    takeaway:
      "Layouts are part of Nuxt's application structure, not just a styling convenience. They help route pages share shells consistently.",
  },
  {
    id: 'examples-route-rules',
    title: 'Hybrid Rendering With Route Rules',
    description:
      'Nuxt can configure route behavior at the framework level so static, cached, redirected, and server-rendered routes can coexist in one app.',
    snippets: [
      {
        label: 'nuxt.config.ts',
        code: `export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/blog/**': { isr: 60 },
    '/api/**': { cache: { maxAge: 60 * 5 } },
    '/old-page': { redirect: '/new-page' },
  },
})`,
      },
    ],
    takeaway:
      "Nuxt can treat different routes differently at deployment time, which is one of the framework's strongest practical advantages for mixed workloads.",
  },
  {
    id: 'examples-architecture',
    title: 'Architecture Snapshot',
    description:
      'A typical Nuxt application combines Vue components with Nuxt file conventions, server capabilities, and rendering configuration rather than treating them as separate systems.',
    snippets: [
      {
        label: 'Common Stack',
        code: `Vue for components and reactivity
pages/ and layouts/ for route and shell structure
useAsyncData or useFetch for framework-aware data loading
Nitro server routes for APIs and backend logic
Modules and plugins for framework-level integration
routeRules for mixed rendering and caching strategy`,
      },
    ],
    takeaway:
      'Nuxt works best when the team leans into the framework as an integrated application platform instead of treating it like plain Vue with extra files.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Nuxt',
    definition:
      'The full-stack framework built on Vue for routing, data loading, rendering, server capabilities, and deployment-aware application structure.',
  },
  {
    term: 'Nitro',
    definition:
      "Nuxt's server engine, used for server routes, APIs, rendering support, and deployment portability.",
  },
  {
    term: 'File-based routing',
    definition:
      'A routing model where page files define routes through directory and file naming conventions.',
  },
  {
    term: 'Layout',
    definition:
      'A shared page shell used to wrap route content with common structure such as navigation or app chrome.',
  },
  {
    term: 'Auto-import',
    definition:
      'A Nuxt convention that makes many components, composables, helpers, or Vue APIs available without manual import statements.',
  },
  {
    term: 'useAsyncData',
    definition:
      'A Nuxt composable for asynchronous data loading that integrates with SSR, hydration, and route navigation.',
  },
  {
    term: 'useFetch',
    definition:
      'A Nuxt data-fetching composable often used for request-driven application data in a framework-aware way.',
  },
  {
    term: 'Route rule',
    definition:
      'A Nuxt or Nitro configuration rule that controls route behavior such as prerendering, caching, or redirects.',
  },
  {
    term: 'Hybrid rendering',
    definition:
      'A delivery model where different routes in the same app can use different rendering or caching strategies.',
  },
  {
    term: 'Plugin',
    definition:
      'A Nuxt initialization unit used to provide app-wide behavior, helpers, or third-party integrations.',
  },
  {
    term: 'Module',
    definition:
      'A framework extension package that can modify or enhance Nuxt behavior, configuration, and generated capabilities.',
  },
  {
    term: 'Layer',
    definition:
      'A reusable Nuxt base that can share configuration, structure, and behavior across multiple projects.',
  },
  {
    term: 'Runtime config',
    definition:
      'Nuxt configuration data separated by public and server-only visibility so environment boundaries stay explicit.',
  },
  {
    term: 'Server route',
    definition:
      "A file in Nuxt's server-side directories that defines an API endpoint, route handler, or middleware behavior.",
  },
  {
    term: 'Composable',
    definition:
      'A reusable function, often built on Vue reactivity, that packages stateful or framework-aware application logic.',
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

export default function NuxtPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Nuxt',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Nuxt"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Nuxt</h1>
      <p className="bin98-doc-subtitle">
        Manual-style reference covering overview, file routing, auto-imports, async data, Nitro,
        rendering modes, modules, tradeoffs, and practical examples.
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
