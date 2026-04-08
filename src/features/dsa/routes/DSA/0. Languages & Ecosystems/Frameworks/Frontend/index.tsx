import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

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
  takeaway: string
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
const FRONTEND_FRAMEWORKS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/frameworks/frontend'

const frameworkDirectory = [
  'React',
  'Next.js',
  'Vue.js',
  'Nuxt',
  'Angular',
  'Svelte',
  'SolidJS',
  'Qwik',
  'Preact',
  'Astro',
  'Remix',
]

const introParagraphs = [
  'Frontend Frameworks is the overview page for the browser and UI framework part of Languages & Ecosystems. It explains the ideas that repeat across component systems, reactive runtimes, SSR-first frameworks, islands architectures, meta-frameworks, and strongly opinionated application platforms before the reader drills into any single tool.',
  'The useful question is not only what syntax a framework uses. The more important question is what the framework chooses to standardize: rendering model, state propagation, reactivity, data loading, routing, compilation, hydration, accessibility defaults, bundle strategy, and the developer workflow around shipping an application to real users.',
  'The child pages in this section cover specific ecosystems such as React, Vue, Angular, Svelte, Next.js, Nuxt, Remix, Astro, SolidJS, Qwik, and Preact. This overview page is the broader field guide that explains why frontend frameworks exist, why they differ so much, where they help, and how to evaluate them without reducing the decision to fashion, syntax preference, or benchmark screenshots.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'frontend98-overview',
    title: 'Overview',
    paragraphs: [
      'A frontend framework is a structured foundation for building browser interfaces, application shells, route transitions, client state, and rendering logic. Instead of wiring DOM manipulation, event listeners, templating, and navigation manually, a team starts from a system that already defines how UI is described, how state changes propagate, and how the screen is reconciled with data over time.',
      'What makes a frontend framework different from a small view library is that it usually shapes the entire application model. It defines how components are composed, how routing interacts with rendering, where data is loaded, what counts as local versus shared state, how server-generated HTML and client interactivity are coordinated, and what kind of build step the project assumes.',
      'That is why frontend framework choice is architectural. Choosing one means choosing an execution model for the user interface itself. It affects how quickly a codebase becomes understandable, how expensive updates are, how easy accessibility and performance discipline are to maintain, and how much long-term accidental complexity the team is signing up for.',
    ],
  },
  {
    id: 'frontend98-why',
    title: 'Why Frontend Frameworks Matter',
    paragraphs: [
      'Modern interfaces are dynamic systems, not static documents. They respond to user input, fetch remote data, manage optimistic states, preserve client-side context across navigation, animate transitions, progressively enhance server-rendered pages, and coordinate dozens of UI concerns at once. Frameworks matter because they make those repeated concerns coherent rather than ad hoc.',
      'Without a framework, teams repeatedly reinvent rendering rules, state synchronization, component boundaries, form handling, navigation behavior, code-splitting, and event cleanup. The result is usually not freedom. It is inconsistency. Frameworks matter because they turn those recurring problems into conventions and abstractions that can be discussed, tested, and maintained across a growing codebase.',
      'They also matter socially. A strongly opinionated framework can give a team shared instincts about where to load data, where to store state, what a route owns, and how UI composition should work. A looser framework can preserve flexibility, but then the team must create the missing architecture deliberately instead of pretending it will emerge on its own.',
    ],
    bullets: [
      'They reduce repeated DOM, state, and navigation boilerplate.',
      'They define a rendering and update model for the whole application.',
      'They influence performance, accessibility, testing, and deployment habits.',
      'They trade off flexibility against built-in guidance and defaults.',
      'They shape how UI code is organized over the lifetime of the product.',
    ],
  },
  {
    id: 'frontend98-problems',
    title: 'What Frontend Frameworks Usually Solve',
    paragraphs: [
      'Frontend frameworks exist because direct DOM programming leaves too many recurring problems unsolved at the application level. Every serious frontend needs a coherent answer to the same categories of questions: how UI is described, how state changes cause updates, how routes map to screens, where data fetching belongs, how loading and error states are expressed, how large codebases share UI primitives, and how build output stays fast enough to ship.',
      'Different frameworks solve these problems with different assumptions. Some center component re-rendering and hooks. Some center fine-grained reactivity. Some center compilation. Some center server-first rendering with client enhancement. Some center filesystem routing and full-stack data loading. The syntax differences are visible, but the underlying design differences are much more important.',
      'The goal is not to memorize every framework API as if each one invented UI architecture from scratch. The goal is to see the shared problem space clearly enough to understand what each framework is emphasizing and what it is deliberately making the developer manage themselves.',
    ],
    bullets: [
      'Declarative UI description and composition.',
      'State propagation and reactive updates.',
      'Routing, navigation, and screen ownership.',
      'Asynchronous data loading and mutation flows.',
      'Rendering strategy across server and browser.',
      'Performance, bundling, and code-splitting decisions.',
      'Shared design systems and maintainable component boundaries.',
    ],
  },
  {
    id: 'frontend98-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'A practical mental model is that a frontend framework is a policy engine for rendering. It answers who owns the UI description, when updates run, what a component boundary means, how data and events move through the tree, and how the browser, build tool, and sometimes the server cooperate to produce the final experience.',
      'Once viewed this way, many confusing arguments become easier to reason about. Hooks versus signals, templates versus JSX, virtual DOM versus compile-time analysis, hydration versus resumability, client routing versus document navigation, and SPA versus SSR are all questions about the same larger issue: where the framework chooses to place work and how explicit it makes that work to the developer.',
      'This is why frameworks should be evaluated as system design, not as surface syntax. A pleasant component API can still hide an awkward data model, weak performance defaults, or a scaling problem in shared state. Conversely, a framework with unfamiliar syntax can provide a remarkably clean execution model once the underlying ideas are understood.',
    ],
  },
  {
    id: 'frontend98-spectrum',
    title: 'The Frontend Framework Spectrum',
    paragraphs: [
      'Frontend frameworks span several overlapping categories. Some are client-first component runtimes. Some are meta-frameworks built on top of lower-level rendering libraries. Some are batteries-included application platforms with routing and data loading. Some emphasize compilation to reduce runtime work. Some emphasize server-first delivery and islands of interactivity. Some emphasize resumability or fine-grained reactivity to change where performance cost appears.',
      'This spectrum matters because two frameworks can both render components while pushing complexity into completely different places. One may simplify state and composition but expect the team to add routing and SSR separately. Another may provide full-stack routing and server data conventions but impose more structure on file layout and deployment. Another may promise strong runtime performance but require a different mental model for updates and debugging.',
      'The wrong mental model is that there is one universal frontend stack and every framework is just a cosmetic wrapper around it. The better model is that each framework is a different compromise between explicitness, compile-time work, runtime work, server responsibility, client responsibility, and how much architecture the team wants decided up front.',
    ],
  },
  {
    id: 'frontend98-directory',
    title: 'Frameworks in This Section',
    paragraphs: [
      'The entries below are the concrete framework pages present under Frontend Frameworks. They cover multiple rendering models, multiple reactivity systems, multiple levels of opinionation, and both UI libraries and broader application platforms. Read them comparatively rather than as isolated brands.',
    ],
    bullets: frameworkDirectory,
  },
  {
    id: 'frontend98-why-hard',
    title: 'Why Frontend Architecture Feels Hard',
    paragraphs: [
      'Frontend work feels deceptively easy at the beginning because the first component or page is usually simple. The difficulty emerges when state, routing, forms, async loading, caching, accessibility, responsiveness, and performance interact over time. A UI is the point where user behavior, product requirements, network variability, and browser constraints all meet at once.',
      'The second reason this domain feels hard is that many failures are cross-cutting rather than localized. A data-loading pattern affects navigation behavior. A rendering model affects bundle size. A styling strategy affects component reuse. A state-management shortcut affects testability and debugging. Accessibility problems often hide inside composition decisions, not inside one isolated function.',
      'Frameworks help because they provide a repeatable shape for these problems, but they can also hide them. A team still has to understand which costs are being paid at build time, at navigation time, on first paint, on hydration, during interaction, and during long-term maintenance.',
    ],
  },
  {
    id: 'frontend98-when-to-use',
    title: 'When a Frontend Framework Is the Right Tool',
    paragraphs: [
      'A frontend framework is usually the right tool when the UI is more than a handful of static pages. If the product has repeated interactions, conditional rendering, user input, remote data, route transitions, feature growth over time, or a team large enough to require shared conventions, a framework almost always reduces accidental complexity rather than adding it.',
      'Frameworks are especially useful when the application must balance correctness and speed at once. They provide tested primitives for composition, event handling, navigation, and rendering so that teams can spend more effort on product behavior and less on maintaining bespoke UI infrastructure.',
      'They are also useful when the surrounding ecosystem matters. Tooling, testing conventions, router integrations, documentation quality, accessibility patterns, and deployment integrations can create more leverage than raw rendering speed alone.',
    ],
  },
  {
    id: 'frontend98-when-not-to-use',
    title: 'Where Frameworks Can Hurt',
    paragraphs: [
      'A frontend framework is not automatically the right choice for every page. Very small documents, highly constrained embeds, or simple progressively enhanced sites may not need a full application runtime. In those cases, adopting a large framework can turn a small content problem into a build-system and hydration problem.',
      'Frameworks also hurt when they are chosen because they are fashionable rather than because their assumptions fit the product. A meta-framework can become ceremony if the product does not need its routing and deployment model. A minimal library can become entropy if the team actually needed stronger defaults around data loading, SSR, or structure but never established them.',
      'The important tradeoff is not framework versus no framework in the abstract. It is whether the framework removes accidental complexity from the real interface or simply relocates it into conventions the team has not actually learned.',
    ],
  },
  {
    id: 'frontend98-roadmap',
    title: 'Coverage Roadmap',
    paragraphs: [
      'The original page was a placeholder. That original intent is preserved here as a roadmap so the subsection can keep deepening while staying aligned with the same goals.',
    ],
    bullets: [
      'Overview and key ideas will be added.',
      'Core syntax, APIs, ecosystem, and architecture notes will be added.',
      'Use cases, tradeoffs, and compare/contrast references will be added.',
    ],
  },
  {
    id: 'frontend98-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Frontend frameworks are coordination tools for rendering, navigation, state, and delivery. They matter because browser applications are long-lived interactive systems, not isolated DOM events. The right framework choice depends on what kinds of UI complexity the team needs help standardizing.',
      'Strong framework choices usually come from understanding update model, routing model, server-client boundary, and organizational fit. Syntax comfort matters, but it is secondary to whether the framework makes the product easier to reason about, ship, and maintain over time.',
    ],
    bullets: [
      'Choose a frontend framework for execution-model fit, not only for syntax familiarity.',
      'Treat rendering, routing, and state as architectural concerns, not incidental implementation details.',
      'Expect framework choice to influence performance, accessibility, testing, and deployment.',
      'Assume the right amount of opinionation depends on the team and product, not on trends.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'frontend98-components',
    title: 'Components and Composition',
    paragraphs: [
      'Most frontend frameworks organize UI as components, but the word component hides many design choices. A component might be a pure render function, a template with reactive bindings, a compiled unit with scoped styles, or a route-aware module that participates in server data loading. The common idea is that the UI is decomposed into reusable boundaries with their own inputs, internal logic, and rendering responsibility.',
      'Composition matters because maintainability in frontend systems depends less on how elegant a single component looks and more on whether a large tree of components stays understandable. Good composition isolates responsibility, keeps data flow legible, and prevents every leaf from depending on global state or hidden side effects.',
      'Frameworks differ in how much they help. Some encourage plain composition and leave patterns up to the team. Others provide stronger route modules, slots, directives, dependency injection, or compiler assistance. The better question is not whether a framework supports components. It is whether its composition model still feels clean once the application contains hundreds of them.',
    ],
  },
  {
    id: 'frontend98-state',
    title: 'State, Reactivity, and Update Propagation',
    paragraphs: [
      'Every frontend framework needs a model for how state changes become visible UI changes. Some frameworks largely re-run component functions and reconcile output. Some use fine-grained dependency tracking so only directly affected nodes update. Some compile reactive statements. Some split state into signals, refs, stores, or observables. These differences are foundational, not cosmetic.',
      'The core question is update propagation. When a user clicks, types, navigates, or receives new server data, what work happens next, and how obvious is that work to the developer? A framework with a clear reactive model makes performance and debugging easier because the developer can predict why a view updated. A muddy reactive model creates ghost renders, stale closures, and confusing data ownership.',
      'State architecture also matters beyond raw mechanics. Teams need boundaries between local component state, shared client state, derived state, URL state, cached remote state, and server-owned truth. A framework helps most when it makes those boundaries easier to express instead of encouraging everything to become an ad hoc store.',
    ],
    bullets: [
      'Local UI state should stay close to the component that owns it.',
      'Shared state should exist for real coordination needs, not as a default.',
      'Derived state is often better computed than stored redundantly.',
      'URL state is useful when screen state should be linkable or restorable.',
      'Remote data has different lifecycle concerns from local interactive state.',
    ],
  },
  {
    id: 'frontend98-rendering',
    title: 'Rendering Model, Hydration, and Resumability',
    paragraphs: [
      'Rendering is no longer just client-side DOM updates. Modern frontend frameworks may render on the server, at build time, on demand at the edge, in the browser, or through a combination of those modes. After HTML is produced, the framework must decide how interactivity attaches: full hydration, partial hydration, islands, streaming, or resumability depending on the tool.',
      'These choices affect real user experience. Server rendering can improve first contentful paint and SEO, but it introduces concerns about data fetching, serialization, and client-server boundaries. Hydration can preserve a rich component model, but it may load and execute a lot of JavaScript on startup. Islands reduce client cost for mostly static pages, while resumability tries to avoid replaying work already known from the server output.',
      'Framework selection therefore includes a rendering strategy decision. The right answer depends on how interactive the product is, how content-heavy it is, how fast the first meaningful view must appear, and how much complexity the team is prepared to absorb in exchange for those benefits.',
    ],
  },
  {
    id: 'frontend98-routing',
    title: 'Routing, Navigation, and Screen Ownership',
    paragraphs: [
      'Frontend applications need a clear model for moving between screens. Routing can be file-based, configuration-based, nested, flat, client-driven, server-driven, or hybrid. The important point is that routing is not just URL matching. It defines which part of the UI owns what data, which layout persists across transitions, where loading and error boundaries live, and what counts as a screen-level module.',
      'Frameworks with strong routing models often scale better because they give the team a predictable place to put page-specific data loading, metadata, pending states, and nested layouts. Frameworks with weaker routing assumptions can still work well, but then the team must establish consistent rules for where route logic ends and reusable component logic begins.',
      'A mature frontend codebase usually treats routes as architectural boundaries. They separate screen concerns from leaf components, create code-splitting boundaries, and often become the natural home for server interaction and access-control logic.',
    ],
  },
  {
    id: 'frontend98-data',
    title: 'Data Loading, Mutations, and Server Boundaries',
    paragraphs: [
      'Frontend frameworks increasingly blur into full-stack frameworks because the hardest UI problems are often data problems. When does a route fetch? What happens on navigation? Where are loading and error states modeled? How are form submissions handled? Which state is optimistic, cached, or invalidated? These are now central framework questions.',
      'Some frameworks leave data loading mostly to client libraries. Others integrate route loaders, server actions, or conventions that tie navigation to data fetching directly. The benefit of a strong integrated model is that the team spends less effort inventing fetch orchestration. The cost is that the framework may impose more file structure, server assumptions, or platform-specific APIs.',
      'The key idea is to preserve honest ownership boundaries. Server truth should stay server-owned. Client state should focus on interaction. A framework helps when it makes those boundaries explicit instead of encouraging the browser bundle to become a second backend by accident.',
    ],
  },
  {
    id: 'frontend98-styling',
    title: 'Styling, Theming, and Design-System Integration',
    paragraphs: [
      'Styling strategy is part of frontend architecture, not an afterthought. Teams need ways to express layout, typography, theming, responsive behavior, interaction states, and reusable design tokens without allowing styles to become untraceable global side effects. Frameworks differ in how they support this through scoped styles, CSS modules, utility-first ecosystems, style props, compile-time CSS extraction, or plain stylesheet conventions.',
      'The framework does not need to prescribe one styling method to be useful, but it does influence the ergonomic path. A framework with clear component and route boundaries can make styles easier to localize. A framework with compiler support may optimize scoped styles automatically. A framework with mature ecosystem conventions can make a design system easier to standardize across teams.',
      'The important design question is whether the styling approach keeps semantic structure and visual structure aligned. If styling decisions obscure ownership or make accessibility harder, the short-term convenience is usually not worth it.',
    ],
  },
  {
    id: 'frontend98-forms',
    title: 'Forms, Input Handling, and User Workflow',
    paragraphs: [
      'Forms remain one of the most demanding parts of frontend work because they combine input state, validation, accessibility, error messaging, asynchronous submission, focus management, and business rules. A framework is not only tested by how clean a counter example looks. It is tested by how a multi-step form behaves when network requests fail, validation is partial, fields are dynamic, and the user relies on keyboard navigation.',
      'Frameworks differ in how much they treat forms as first-class. Some provide integrated mutation flows and pending states. Others depend on third-party form libraries. Some encourage controlled inputs everywhere. Others make native form behavior easier to preserve. The right approach depends on complexity, but the key is consistency.',
      'A disciplined frontend architecture keeps forms honest: browser semantics where possible, framework abstraction where useful, and clear server-client validation boundaries instead of duplicate business logic scattered across the tree.',
    ],
  },
  {
    id: 'frontend98-performance',
    title: 'Performance and Bundle Economics',
    paragraphs: [
      'Performance is not only about micro-benchmarks. It includes startup cost, bundle size, JavaScript execution, hydration work, memory retention, rerender frequency, image and font strategy, network waterfalls, and how the framework encourages or discourages good defaults. A framework can be fast in one dimension while expensive in another.',
      'The important question is where work happens. Some frameworks spend more effort at build time to reduce runtime work. Some accept more runtime overhead for a simpler programming model. Some are optimized for content-heavy sites with sparse interactivity. Others are optimized for dense application interactivity after startup. Some frameworks make partial delivery strategies natural. Others require more manual performance discipline from the team.',
      'Framework choice does not replace performance work, but it changes the baseline. It changes what the default failure modes look like and how easy it is to diagnose them once the product grows.',
    ],
    bullets: [
      'Measure first-load cost separately from interaction cost.',
      'Treat hydration and client JavaScript as explicit budgets.',
      'Prefer route and component boundaries that align with code-splitting.',
      'Do not confuse local benchmark wins with whole-application speed.',
    ],
  },
  {
    id: 'frontend98-accessibility',
    title: 'Accessibility and Semantic Discipline',
    paragraphs: [
      'A frontend framework does not guarantee accessibility, but it strongly influences how easy it is to preserve semantic HTML, keyboard interaction, focus order, ARIA relationships, and screen-reader-friendly state changes. The wrong abstractions can make accessible UI feel like constant friction. The right abstractions make it easier to do the correct thing by default.',
      'Accessibility often fails at composition boundaries. A modal component without focus management, a custom select that discards native semantics, a route transition that forgets focus restoration, or a loading pattern that never announces state changes can all create real product failures. Frameworks help when they support predictable rendering and lifecycle timing so these concerns can be handled consistently.',
      'Teams should evaluate frameworks partly by ecosystem maturity here. High-quality headless component libraries, strong testing utilities, and well-understood accessibility conventions are not superficial extras. They are part of whether the framework can support a production-quality interface under real constraints.',
    ],
  },
  {
    id: 'frontend98-testing',
    title: 'Testing, Debugging, and Developer Experience',
    paragraphs: [
      'Frontend testing spans rendering behavior, component interaction, route transitions, data loading, accessibility assertions, visual regressions, and end-to-end user flows. Frameworks influence this by determining what is easy to render in isolation, how server and client boundaries are mocked, how routing is simulated, and what debugging tools are available at runtime.',
      'A productive framework usually gives developers clear instrumentation: component trees, state inspection, fast refresh or HMR, source maps, error overlays, and deterministic ways to reason about reactive updates. A framework becomes painful when basic debugging requires guessing which abstraction layer is currently responsible for a stale value or duplicate request.',
      'Developer experience is not fluff. It directly influences defect rate and maintainability. A framework with strong debugging and testing ergonomics often outperforms a theoretically elegant framework that leaves teams blind when behavior becomes subtle.',
    ],
  },
  {
    id: 'frontend98-ssr',
    title: 'SSR, SSG, Islands, and Full-Stack Integration',
    paragraphs: [
      'Modern frontend frameworks increasingly differentiate themselves by how much server work they integrate. Some focus on pure client rendering. Some focus on server-side rendering or static generation. Some mix content-first rendering with islands of interactivity. Some integrate route loaders, actions, middleware, and server deployment targets into one platform.',
      'This matters because frontend architecture no longer stops at the browser. The framework may influence cache strategy, edge execution, content rendering, personalized responses, streaming, and how much backend logic is allowed to sit near the route module. Teams should therefore evaluate whether they want a UI library, a full-stack web framework, or a content delivery framework with islands and partial hydration.',
      'The right answer depends on product shape. A content-heavy site, an internal dashboard, an e-commerce application, and a collaborative SaaS product may all prioritize these concerns differently.',
    ],
  },
  {
    id: 'frontend98-boundaries',
    title: 'Architecture Boundaries and Scaling a Codebase',
    paragraphs: [
      'Large frontend codebases need explicit boundaries between reusable UI primitives, route modules, domain logic, API clients, feature-specific state, and cross-cutting concerns such as auth or analytics. A framework does not automatically create these boundaries, but it can either support them or make them harder to preserve.',
      'A common failure mode is allowing leaf components to know too much about data loading, app-wide state, and environment details. Another is allowing global stores to become dumping grounds for everything because the route and component architecture never stayed disciplined. Frameworks help most when they make screen ownership, data ownership, and composition boundaries legible.',
      'Scaling a frontend system is therefore not just about faster rendering. It is about whether a new developer can identify where a change belongs without reading the whole codebase.',
    ],
  },
  {
    id: 'frontend98-selection',
    title: 'How to Evaluate a Frontend Framework',
    paragraphs: [
      'Framework evaluation should start with product shape. Is the application content-first, app-like, highly collaborative, form-heavy, dashboard-heavy, ecommerce-driven, or SEO-sensitive? Does it need mostly client interaction, or does it benefit from server-first rendering and route-level data loading? Does the team want strong conventions or a thinner base layer?',
      'Then evaluate ecosystem maturity. Documentation, router quality, testing support, SSR support, accessibility patterns, build tooling, deployment path, and long-term stability usually matter more than isolated benchmark charts. A framework can be technically impressive but still be a poor fit if the surrounding ecosystem is immature for the product requirements.',
      'Finally, evaluate organizational fit. A framework is successful when its assumptions align with the team that will maintain it. The best framework on paper can still be the wrong choice if it requires a mental model the team will not consistently apply.',
    ],
  },
  {
    id: 'frontend98-failure-modes',
    title: 'Common Failure Modes',
    paragraphs: [
      'Frontend codebases often fail in predictable ways regardless of the framework. They accumulate duplicated state, ambiguous ownership, oversized client bundles, accidental rerender cascades, inaccessible custom controls, route-level data chaos, and component trees that mix presentation, business rules, and networking into the same files.',
      'A framework does not prevent these failures automatically. In some cases it even makes them easier if the team adopts the syntax without understanding the execution model. For example, an application may use server rendering yet still ship excessive client JavaScript, or it may centralize everything into a store because local versus shared ownership was never designed clearly.',
      'The best protection is to use the framework as a structure, not as a substitute for architecture. Understand its rendering costs, preserve ownership boundaries, and keep composition and data flow explicit enough that debugging remains possible.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'frontend98-example-react',
    title: 'Example: React Local State and Derived UI',
    description: [
      'This example shows a typical component-level state pattern in React. The important idea is not the exact syntax. It is that local UI state is owned by the component, derived values stay computed instead of duplicated, and event handlers remain close to the interaction they control.',
      'This style works well when the concern is truly local. It becomes a problem only when teams promote every local interaction into app-wide state for no reason.',
    ],
    code: `function SearchBox({ items }) {
  const [query, setQuery] = useState('')

  const visibleItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section>
      <label htmlFor="search">Search frameworks</label>
      <input
        id="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <p>{visibleItems.length} results</p>
      <ul>
        {visibleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}`,
    takeaway:
      'Good local state keeps interaction logic close to the UI that owns it and avoids inventing shared state until coordination is actually required.',
  },
  {
    id: 'frontend98-example-next',
    title: 'Example: Next.js Server-First Route Module',
    description: [
      'A meta-framework like Next.js shifts some work to the server by default. This example shows a route component that fetches data on the server and passes it into client output.',
      'The broader lesson is that server-first frameworks are not just about SEO. They are about choosing a different default boundary for data fetching and initial rendering.',
    ],
    code: `async function getFrameworks() {
  const response = await fetch('https://example.com/api/frameworks', {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to load frameworks')
  }

  return response.json()
}

export default async function FrontendPage() {
  const frameworks = await getFrameworks()

  return (
    <main>
      <h1>Frontend Frameworks</h1>
      <ul>
        {frameworks.map((framework) => (
          <li key={framework.id}>{framework.name}</li>
        ))}
      </ul>
    </main>
  )
}`,
    takeaway:
      'Server-first frameworks change where data loading belongs and can reduce client-side startup work, but they introduce explicit server-client boundary design.',
  },
  {
    id: 'frontend98-example-vue',
    title: 'Example: Vue Reactivity and Computed State',
    description: [
      'Vue makes the reactive model explicit through refs and computed values. The important lesson is that derived state should often stay derived rather than becoming manually synchronized data.',
      'Fine-grained reactivity can improve clarity when the dependency structure stays obvious to the developer.',
    ],
    code: `<script setup>
import { computed, ref } from 'vue'

const query = ref('')
const frameworks = ['React', 'Vue', 'Angular', 'Svelte']

const filteredFrameworks = computed(() =>
  frameworks.filter((name) =>
    name.toLowerCase().includes(query.value.toLowerCase()),
  ),
)
</script>

<template>
  <section>
    <input v-model="query" placeholder="Filter frameworks" />
    <p>{{ filteredFrameworks.length }} matches</p>
    <ul>
      <li v-for="name in filteredFrameworks" :key="name">{{ name }}</li>
    </ul>
  </section>
</template>`,
    takeaway:
      'Reactive primitives are most useful when they make dependencies more legible, not when they create hidden flows of state that are hard to inspect.',
  },
  {
    id: 'frontend98-example-svelte',
    title: 'Example: Svelte Compiled Reactivity',
    description: [
      'Svelte pushes more work into compilation and uses a lightweight syntax for reactive declarations. This can make component code feel direct because the update model is expressed near the variables themselves.',
      'The broader point is that compile-time frameworks move some complexity out of runtime machinery and into the compiler, which changes both performance tradeoffs and debugging shape.',
    ],
    code: `<script>
  let query = ''
  const frameworks = ['React', 'Svelte', 'SolidJS', 'Qwik']

  $: visible = frameworks.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase()),
  )
</script>

<label>
  Search
  <input bind:value={query} />
</label>

<p>{visible.length} results</p>

<ul>
  {#each visible as name}
    <li>{name}</li>
  {/each}
</ul>`,
    takeaway:
      'Compilation can remove runtime ceremony, but it still requires a clear mental model of what triggers recomputation and what belongs in component scope.',
  },
  {
    id: 'frontend98-example-angular',
    title: 'Example: Angular Component and Dependency Injection',
    description: [
      'Angular represents the more opinionated side of frontend frameworks. It provides component structure, dependency injection, routing conventions, and a broad application platform rather than only a render layer.',
      'This example highlights the architectural benefit of a framework that standardizes how a component receives data services and exposes route-driven state.',
    ],
    code: `@Component({
  selector: 'app-framework-list',
  template: \`
    <h2>Frontend Frameworks</h2>
    <ul>
      <li *ngFor="let framework of frameworks$ | async">
        {{ framework.name }}
      </li>
    </ul>
  \`,
})
export class FrameworkListComponent {
  frameworks$ = this.frameworkService.getAll()

  constructor(private frameworkService: FrameworkService) {}
}`,
    takeaway:
      'Opinionated frameworks can improve consistency and team scaling when the product benefits from standard structure more than from maximal freedom.',
  },
  {
    id: 'frontend98-example-astro',
    title: 'Example: Astro Islands for Selective Interactivity',
    description: [
      'Astro highlights a content-first model where most of the page can remain static HTML and only selected components hydrate on the client. This is useful when full-app client execution would be wasteful.',
      'The key architectural lesson is that not every page needs every component to be interactive at startup. Selective hydration changes the JavaScript budget by design.',
    ],
    code: `---
import Hero from '../components/Hero.astro'
import FrameworkSearch from '../components/FrameworkSearch.jsx'
---

<html lang="en">
  <body>
    <Hero />
    <FrameworkSearch client:visible />
  </body>
</html>`,
    takeaway:
      'Content-heavy sites often benefit from treating interactivity as a selective capability instead of a full-page default.',
  },
]

const glossary: Array<{ term: string; definition: string }> = [
  {
    term: 'Component',
    definition:
      'A reusable UI boundary that usually owns render logic, receives inputs, and may manage local state or lifecycle behavior.',
  },
  {
    term: 'Virtual DOM',
    definition:
      'A tree-based representation of UI output used by some frameworks to compare old and new render results before applying changes to the real DOM.',
  },
  {
    term: 'Fine-grained reactivity',
    definition:
      'An update model where the framework tracks precise data dependencies so only the affected parts of the UI are recomputed or patched.',
  },
  {
    term: 'Signal',
    definition:
      'A reactive primitive that stores a value and notifies dependents when that value changes.',
  },
  {
    term: 'Hydration',
    definition:
      'The process of attaching client-side behavior to HTML that was already rendered on the server.',
  },
  {
    term: 'Partial hydration',
    definition:
      'A strategy where only some parts of a server-rendered page become interactive on the client instead of hydrating the entire tree.',
  },
  {
    term: 'Islands architecture',
    definition:
      'A rendering approach where most of the page remains static and isolated interactive islands are hydrated only where needed.',
  },
  {
    term: 'Resumability',
    definition:
      'A model where the client resumes from server-produced state without replaying as much initialization work as traditional hydration requires.',
  },
  {
    term: 'Route module',
    definition:
      'A file or unit that owns a screen, often including render logic, metadata, data loading, and error handling boundaries for that route.',
  },
  {
    term: 'Code splitting',
    definition:
      'Breaking application code into smaller chunks so the browser loads only the code needed for the current route or interaction path.',
  },
  {
    term: 'Server-side rendering',
    definition:
      'Generating HTML on the server for a request before the browser runs client-side JavaScript.',
  },
  {
    term: 'Static site generation',
    definition:
      'Producing HTML ahead of time during a build instead of generating it dynamically on every request.',
  },
  {
    term: 'Client component',
    definition:
      'A component intended to run in the browser and handle interactive behavior after the page loads.',
  },
  {
    term: 'Derived state',
    definition:
      'State that can be computed from other state and therefore often should not be stored separately.',
  },
  {
    term: 'Controlled input',
    definition:
      'A form field whose current value is driven by framework-managed state rather than only by native browser state.',
  },
  {
    term: 'Design system',
    definition:
      'A structured set of reusable UI primitives, visual tokens, and usage conventions that keeps product interfaces consistent.',
  },
  {
    term: 'Optimistic UI',
    definition:
      'A user interface pattern that updates immediately based on an expected successful server response and later reconciles if the request fails.',
  },
  {
    term: 'Hot module replacement',
    definition:
      'A development workflow that updates changed modules in the running app without a full page reload.',
  },
  {
    term: 'Headless component',
    definition:
      'A reusable behavior and accessibility abstraction that provides logic and structure without imposing specific visual styling.',
  },
  {
    term: 'Render boundary',
    definition:
      'A place in the component or route tree where rendering work, loading state, error handling, or code splitting is intentionally segmented.',
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
    { id: 'frontend98-overview', label: 'Overview' },
    { id: 'frontend98-why', label: 'Why They Matter' },
    { id: 'frontend98-problems', label: 'What They Solve' },
    { id: 'frontend98-mental-model', label: 'Mental Model' },
    { id: 'frontend98-spectrum', label: 'Framework Spectrum' },
    { id: 'frontend98-directory', label: 'Framework Directory' },
    { id: 'frontend98-why-hard', label: 'Why It Feels Hard' },
    { id: 'frontend98-when-to-use', label: 'When To Use One' },
    { id: 'frontend98-when-not-to-use', label: 'Where They Hurt' },
    { id: 'frontend98-roadmap', label: 'Coverage Roadmap' },
    { id: 'frontend98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'frontend98-components', label: 'Components' },
    { id: 'frontend98-state', label: 'State and Reactivity' },
    { id: 'frontend98-rendering', label: 'Rendering and Hydration' },
    { id: 'frontend98-routing', label: 'Routing' },
    { id: 'frontend98-data', label: 'Data Loading' },
    { id: 'frontend98-styling', label: 'Styling' },
    { id: 'frontend98-forms', label: 'Forms' },
    { id: 'frontend98-performance', label: 'Performance' },
    { id: 'frontend98-accessibility', label: 'Accessibility' },
    { id: 'frontend98-testing', label: 'Testing and Debugging' },
    { id: 'frontend98-ssr', label: 'SSR and Full-Stack' },
    { id: 'frontend98-boundaries', label: 'Architecture Boundaries' },
    { id: 'frontend98-selection', label: 'Framework Evaluation' },
    { id: 'frontend98-failure-modes', label: 'Failure Modes' },
  ],
  examples: [
    { id: 'frontend98-example-react', label: 'React Local State' },
    { id: 'frontend98-example-next', label: 'Next.js Server Route' },
    { id: 'frontend98-example-vue', label: 'Vue Reactivity' },
    { id: 'frontend98-example-svelte', label: 'Svelte Compilation' },
    { id: 'frontend98-example-angular', label: 'Angular DI' },
    { id: 'frontend98-example-astro', label: 'Astro Islands' },
  ],
  glossary: [{ id: 'frontend98-glossary', label: 'Glossary' }],
}

const pageStyles = `
.frontend98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.frontend98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.frontend98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.frontend98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.frontend98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.frontend98-control {
  width: 18px;
  height: 16px;
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

.frontend98-control:focus-visible,
.frontend98-tab:focus-visible,
.frontend98-toc-link:focus-visible,
.frontend98-inline-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -2px;
}

.frontend98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.frontend98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  color: #000;
  cursor: pointer;
}

.frontend98-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.frontend98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
}

.frontend98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.frontend98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.frontend98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.frontend98-toc-item + .frontend98-toc-item {
  margin-top: 6px;
}

.frontend98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.frontend98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.frontend98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.frontend98-doc-subtitle {
  margin: 0 0 18px;
  font-size: 12px;
}

.frontend98-section {
  margin: 0 0 20px;
}

.frontend98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.frontend98-content p {
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.5;
}

.frontend98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.frontend98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.frontend98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.frontend98-inline-link {
  color: #000;
}

.frontend98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.frontend98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .frontend98-main {
    grid-template-columns: 1fr;
  }

  .frontend98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .frontend98-title {
    font-size: 13px;
    max-width: calc(100% - 80px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .frontend98-content {
    padding: 14px 14px 18px;
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

function toFrameworkRoute(name: string): string {
  return `${FRONTEND_FRAMEWORKS_BASE_ROUTE}/${slugifySegment(name)}`
}

function renderContentSection(
  section: ContentSection,
  isLast: boolean,
  options?: { linkedBullets?: string[] },
): JSX.Element {
  const linkedBullets = new Set(options?.linkedBullets ?? [])

  return (
    <section key={section.id} id={section.id} className="frontend98-section">
      <h2 className="frontend98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>
              {linkedBullets.has(item) ? (
                <Link to={toFrameworkRoute(item)} className="frontend98-inline-link">
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="frontend98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="frontend98-section">
      <h2 className="frontend98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="frontend98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <p>
        <strong>Takeaway:</strong> {section.takeaway}
      </p>
      {isLast ? null : <hr className="frontend98-divider" />}
    </section>
  )
}

export default function FrontendFrameworksPage(): JSX.Element {
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
    document.title = `Frontend Frameworks (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Frontend Frameworks',
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
    <div className="frontend98-help-page">
      <style>{pageStyles}</style>
      <div className="frontend98-window" role="presentation">
        <header className="frontend98-titlebar">
          <span className="frontend98-title">Frontend Frameworks</span>
          <div className="frontend98-controls">
            <button
              className="frontend98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="frontend98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="frontend98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`frontend98-tab ${activeTab === tab.id ? 'frontend98-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="frontend98-main">
          <aside className="frontend98-toc" aria-label="Table of contents">
            <h2 className="frontend98-toc-title">Contents</h2>
            <ul className="frontend98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="frontend98-toc-item">
                  <a href={`#${section.id}`} className="frontend98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="frontend98-content">
            <h1 className="frontend98-doc-title">Frontend Frameworks</h1>
            <p className="frontend98-doc-subtitle">
              Help-style overview of browser framework architecture, rendering models, reactivity,
              routing, performance, and the framework pages available in this subsection.
            </p>

            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1, {
                    linkedBullets: frameworkDirectory,
                  }),
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

            {activeTab === 'glossary' ? (
              <section id="frontend98-glossary" className="frontend98-section">
                <h2 className="frontend98-heading">Glossary</h2>
                {glossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  )
}
