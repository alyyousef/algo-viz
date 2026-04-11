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
      'Vue.js is a progressive frontend framework for building interactive user interfaces. It focuses on declarative rendering, component composition, and a built-in reactivity model that lets UI update when application state changes.',
      'The framework is often adopted for single-page applications, dashboards, content-rich frontends, and incrementally enhanced interfaces. Teams frequently choose it when they want a cohesive developer experience without moving to a heavier all-in platform.',
      'This help-style reference covers Vue.js across mental model, templates, reactivity, component authoring, routing, state, SSR, use cases, migration concerns, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why Teams Reach For Vue',
    paragraphs: [
      'Vue offers a relatively approachable path into component-based frontend development. Templates stay readable, Single-File Components keep related concerns together, and the reactivity system gives developers explicit primitives for state and derived values.',
      'The practical appeal is not only syntax. Vue also provides official or closely aligned solutions for routing, state management, dev tooling, and server-rendering-related workflows, which can reduce architecture drift across projects.',
    ],
  },
  {
    id: 'bp-progressive',
    title: 'Why the Progressive Model Matters',
    paragraphs: [
      'Vue is often described as progressive because teams can adopt it at different scales. It can start as a small enhancement inside an existing page, grow into a client-rendered application, and later expand into a broader full-stack or SSR setup through the surrounding ecosystem.',
      'That matters for real engineering work because adoption path affects risk. A framework that can enter gradually is often easier to justify in existing products than one that assumes a full rewrite from the beginning.',
    ],
  },
  {
    id: 'bp-scope',
    title: 'What This Page Covers',
    paragraphs: [
      'This page keeps all of the original planned concepts: overview and key ideas, core syntax, APIs, ecosystem, architecture, use cases, tradeoffs, and compare-and-contrast references that help place Vue among other frontend options.',
      'The goal is a text-first reference page in the style of a classic desktop help document. It is meant for scanning, review, and returning to individual sections through the page-local table of contents and tab state.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where Vue Fits Well',
    paragraphs: [
      'Vue is a strong fit when a team wants a modern reactive UI framework with strong defaults, a gentle learning curve, and a clear path from simple components to larger applications. It is also commonly chosen for products that value fast onboarding and consistent component authoring patterns.',
      'Compared with more library-first stacks, Vue usually gives teams more structure out of the box. Compared with heavier frameworks, it often feels lighter and easier to introduce incrementally.',
    ],
  },
  {
    id: 'bp-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'A common misconception is that Vue is only a beginner framework. In practice, it can support large production applications, typed development, design systems, SSR-related workflows, and disciplined state architecture when used well.',
      'Another misconception is that Vue is simply React with templates. The reactivity model, component authoring style, ecosystem shape, and progressive adoption story give it a distinct engineering character.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Vue centers on components, templates, and reactive state.',
      'Its main strengths are approachability, cohesive tooling, and ergonomic component authoring.',
      'Its main tradeoffs usually involve template preference, ecosystem breadth compared with React, and choosing between the Options API and the newer Composition API when reading older versus newer codebases.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Vue asks developers to think in terms of reactive state driving rendered output. Components expose state and behavior, templates describe UI structure, and the framework updates the DOM when tracked dependencies change.',
      'This model often feels explicit and teachable because Vue gives names to its main building blocks: refs, reactive objects, computed values, watchers, props, emits, components, router, and store.',
    ],
  },
  {
    id: 'core-key-ideas',
    title: 'Overview and Key Ideas',
    paragraphs: [
      'Vue follows a declarative model: application state drives rendered output. Instead of manually mutating the DOM, developers update reactive state and let Vue reconcile the interface.',
      'The key ideas are component composition, one-way data flow for props, event-based communication upward, and a reactivity system that tracks dependencies between state and rendered output.',
    ],
  },
  {
    id: 'core-components',
    title: 'Single-File Components',
    paragraphs: [
      'A common Vue unit is the Single-File Component, typically stored in a `.vue` file. It can colocate template, script, and style, which makes a component easy to inspect as one document.',
      "This structure is one of Vue's defining ergonomics. It keeps markup-like UI structure readable while still allowing JavaScript or TypeScript logic to live close to the rendered output.",
    ],
  },
  {
    id: 'core-templates',
    title: 'Templates and Rendering Style',
    paragraphs: [
      'Vue templates use HTML-like syntax enhanced with Vue directives and bindings. This keeps the presentation layer visually familiar while still giving the framework a clear place to express reactivity, control flow, and component composition.',
      "For many teams, templates are a readability advantage because UI intent remains easy to scan. For other teams, JSX-style rendering feels more natural. This is one of Vue's most meaningful style tradeoffs compared with code-centric libraries.",
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      'Vue templates use familiar HTML-like syntax extended with directives such as `v-if`, `v-for`, `v-bind`, and `v-model`. These directives express conditional rendering, iteration, attribute binding, and form synchronization directly in template markup.',
      'Event handling is usually written with `@click` and related shorthand. Interpolation with double braces inserts reactive values into the template, while bound attributes and class bindings keep DOM output connected to component state.',
    ],
  },
  {
    id: 'core-reactivity',
    title: 'Reactivity Model',
    paragraphs: [
      "Vue's reactivity system is a central design feature rather than an add-on. Primitives such as `ref`, `reactive`, `computed`, and `watch` let developers model local state, structured state, derived values, and side-effect reactions.",
      'This gives Vue a more explicitly reactive feel than frameworks whose mental model is centered primarily on rerendering function components. Many teams find that clarity useful for reasoning about derived state and dependency tracking.',
    ],
  },
  {
    id: 'core-props-emits',
    title: 'Props, Emits, and Component Boundaries',
    paragraphs: [
      'Vue components typically receive inputs through props and communicate upward through emitted events. This gives teams a clear one-way data-flow story at the component boundary and keeps parent-child responsibilities legible.',
      'As applications grow, this matters because predictable component contracts make it easier to refactor, test, and separate UI concerns from shared application state.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs and Authoring Styles',
    paragraphs: [
      'Modern Vue commonly uses the Composition API, often with `script setup`, to organize state and behavior through composable primitives. Older codebases may still use the Options API, which groups configuration by fields such as `data`, `computed`, `methods`, and lifecycle hooks.',
      'Both authoring styles are valid, but newer Vue guidance generally emphasizes the Composition API for flexibility and composability. That difference matters when reading documentation, onboarding into a legacy codebase, or comparing example code across versions and teams.',
    ],
  },
  {
    id: 'core-composables',
    title: 'Composables and Logic Reuse',
    paragraphs: [
      'Composables are a common Composition API pattern for packaging reusable stateful logic into normal functions. This gives Vue teams a consistent way to share logic without forcing mixin-heavy patterns from older eras.',
      "The result is that logic reuse can stay explicit and testable while still fitting naturally into the framework's reactive model.",
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Architecture',
    paragraphs: [
      "Vue's ecosystem often feels more coordinated than some library-first alternatives. Vue Router is the standard routing layer, Pinia is the current official state management recommendation, and the development toolchain is designed around Vue's component model.",
      'For application architecture, this means teams can adopt a cohesive baseline quickly. The framework gives enough flexibility for different project sizes while still offering a clear happy path for common frontend concerns.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Page Structure',
    paragraphs: [
      'Vue Router is the usual routing solution in Vue applications. Nested routes, route params, guards, and common navigation patterns have a strong official or near-official home, which reduces debate about the routing layer in many projects.',
      'This usually helps teams converge on a more uniform application shape than they might get in a more ecosystem-fragmented stack.',
    ],
  },
  {
    id: 'core-state',
    title: 'State Management',
    paragraphs: [
      'Vue supports local state, shared reactive modules, provide and inject, and larger store patterns. Pinia is the current official recommendation for broader app state, which gives teams a relatively clear escalation path from component state to shared application state.',
      'The main architectural advantage here is coordination. Teams can adopt state patterns with less uncertainty about what the framework community considers healthy defaults.',
    ],
  },
  {
    id: 'core-forms',
    title: 'Forms and Input Handling',
    paragraphs: [
      'Vue is widely appreciated for form ergonomics, especially through `v-model` and the general clarity of template bindings. Simple forms can often stay concise without introducing a large framework-specific abstraction layer.',
      'For larger form systems, teams still need validation and workflow conventions, but Vue gives a smooth starting point for ordinary input handling.',
    ],
  },
  {
    id: 'core-ssr',
    title: 'SSR and Full-Stack Story',
    paragraphs: [
      'Vue supports SSR and larger rendering workflows, but the most cohesive full-framework path is usually through Nuxt. This means plain Vue and Vue with Nuxt can feel materially different in terms of routing, data loading, and application conventions.',
      'The important engineering point is that Vue has a strong component and app-level story on its own, then becomes a fuller platform choice when paired with its broader framework ecosystem.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Tooling',
    paragraphs: [
      'Vue supports TypeScript well, especially in modern Composition API and `script setup` codebases. The tooling story usually feels coherent because the framework, SFC format, and dev tooling are designed to work together.',
      'Typed Vue can stay approachable because type information usually lives close to component props, emitted events, and composable logic rather than being spread across many disconnected framework layers.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Rendering',
    paragraphs: [
      'Vue uses compiler-informed rendering and reactive dependency tracking to keep updates efficient in many common UI scenarios. Real-world performance still depends more on architecture, component boundaries, list handling, and data flow discipline than on marketing slogans about framework speed.',
      'The practical takeaway is that Vue can be very fast, but teams should still reason about rendering cost and state churn rather than assuming the framework will solve every performance issue automatically.',
    ],
  },
  {
    id: 'core-adoption',
    title: 'Incremental Adoption and Migration',
    paragraphs: [
      'Vue is especially attractive for incremental adoption because the framework identity itself includes that progressive story. Teams can start small, enhance existing pages, and later grow into a broader application without discarding the original component model.',
      'That makes Vue useful not only for greenfield work but also for staged modernization where a full rewrite would be too disruptive.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Vue is frequently used for admin panels, SaaS products, dashboards, content platforms, embedded app sections inside larger server-rendered sites, and greenfield SPAs where the team wants strong developer ergonomics without a heavyweight setup.',
      'It also works well for progressive enhancement because it can be introduced incrementally rather than requiring an all-or-nothing rewrite from the beginning.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      "Vue's template-first style is a strength for many teams, but developers who prefer JavaScript-only rendering may still favor JSX-heavy workflows. The ecosystem is strong, yet the market size and third-party library breadth are still often compared against React's larger surface area.",
      'Another tradeoff is historical variation. Because Vue has evolved through multiple major API styles, teams sometimes have to understand both Options API patterns and Composition API patterns when maintaining mixed-age codebases.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A recurring mistake is mixing Options API and Composition API without clear conventions, which can make codebases feel inconsistent. Another is overusing watchers when a computed value or cleaner data boundary would be simpler.',
      'A second pitfall is underestimating the architecture layer because Vue feels easy at the component level. Large applications still need discipline around state boundaries, routing, data ownership, and composable structure.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Vue is commonly compared with React for framework cohesion versus ecosystem freedom, with Svelte for runtime reactivity versus compiler-first design, and with Angular for lightweight flexibility versus heavier built-in structure.',
      "Those comparisons are useful because they reveal Vue's place in the frontend spectrum: more integrated than a bare UI library, less heavy than a highly opinionated enterprise framework, and more runtime-centric than compiler-first approaches.",
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Example',
    description:
      "A small Single-File Component shows Vue's common authoring shape: reactive state in `script setup` and declarative rendering in the template.",
    snippets: [
      {
        label: 'Counter.vue',
        code: `<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Count: {{ count }}</button>
</template>`,
      },
    ],
    takeaway:
      "This pattern captures Vue's core feel: state is explicit, events update it directly, and the template reflects the latest value.",
  },
  {
    id: 'examples-derived',
    title: 'Derived State Example',
    description:
      'Computed values are a standard way to model values derived from reactive inputs without manually recalculating them throughout the component.',
    snippets: [
      {
        label: 'PriceSummary.vue',
        code: `<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  items: Array<{ price: number }>
}>()

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
      'Computed state keeps derivation logic close to the component while preserving a clean template.',
  },
  {
    id: 'examples-composable',
    title: 'Composable Example',
    description:
      'Composables are a common way to package reusable reactive logic in modern Vue codebases.',
    snippets: [
      {
        label: 'useCounter.ts',
        code: `import { computed, ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const isLarge = computed(() => count.value >= 10)

  function increment() {
    count.value += 1
  }

  return { count, isLarge, increment }
}`,
      },
      {
        label: 'CounterPanel.vue',
        code: `<script setup lang="ts">
import { useCounter } from './useCounter'

const { count, isLarge, increment } = useCounter()
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
  <p v-if="isLarge">Large count</p>
</template>`,
      },
    ],
    takeaway:
      'Vue logic reuse in modern code usually happens through composables rather than through older mixin-heavy patterns.',
  },
  {
    id: 'examples-forms',
    title: 'Form Binding Example',
    description:
      'Vue is especially well known for concise local form handling through bindings like `v-model`.',
    snippets: [
      {
        label: 'NewsletterForm.vue',
        code: `<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(true)
</script>

<template>
  <input v-model="email" type="email" />
  <input v-model="subscribed" type="checkbox" />
  <p>{{ email }} / subscribed: {{ subscribed ? 'yes' : 'no' }}</p>
</template>`,
      },
    ],
    takeaway:
      'For everyday input handling, Vue often stays unusually readable without forcing much ceremony.',
  },
  {
    id: 'examples-patterns',
    title: 'Architecture Snapshot',
    description:
      'A typical Vue application combines routing, component state, and shared stores through a coordinated ecosystem rather than many unrelated libraries.',
    snippets: [
      {
        label: 'Common Stack',
        code: `Vue core for components and reactivity
Vue Router for navigation
Pinia for shared application state
Vite for development and bundling
Nuxt when SSR or full app-platform behavior is desired`,
      },
    ],
    takeaway:
      "The ecosystem story is one of Vue's strongest practical advantages for teams that want a coherent starting architecture.",
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Vue.js',
    definition:
      'A progressive JavaScript framework for building reactive user interfaces with components.',
  },
  {
    term: 'Single-File Component',
    definition:
      'A `.vue` file that colocates template, script, and optionally style for one component.',
  },
  {
    term: 'Composition API',
    definition:
      "Vue's modern authoring style built around functions such as `ref`, `reactive`, `computed`, and lifecycle hooks.",
  },
  {
    term: 'Options API',
    definition:
      'An older but still valid Vue component style organized around fields such as `data`, `computed`, and `methods`.',
  },
  {
    term: 'ref',
    definition:
      'A reactive primitive for storing a value that updates dependents when the value changes.',
  },
  {
    term: 'reactive',
    definition: 'A Vue helper for creating reactive proxy objects from structured state.',
  },
  {
    term: 'computed',
    definition: 'A derived reactive value that updates when its dependencies change.',
  },
  {
    term: 'watch',
    definition: 'A Vue primitive for responding to reactive value changes with side effects.',
  },
  {
    term: 'Directive',
    definition:
      'A special template marker such as `v-if` or `v-for` that adds reactive behavior to markup.',
  },
  {
    term: 'Prop',
    definition: 'Read-only input passed from a parent component to a child component.',
  },
  {
    term: 'Emit',
    definition: 'A component event sent upward so parent components can react to child behavior.',
  },
  {
    term: 'Pinia',
    definition:
      'The official state management library recommended for shared Vue application state.',
  },
  {
    term: 'Vue Router',
    definition:
      'The standard routing solution commonly used for navigation and route structure in Vue applications.',
  },
  {
    term: 'Composable',
    definition:
      'A reusable function, commonly used with the Composition API, that packages reactive state and related behavior.',
  },
  {
    term: 'script setup',
    definition: 'A concise Vue Single-File Component syntax for Composition API authoring.',
  },
  {
    term: 'v-model',
    definition: 'Vue syntax for two-way style binding between component state and form inputs.',
  },
  {
    term: 'provide/inject',
    definition:
      'A Vue mechanism for sharing values across parts of the component tree without ordinary prop drilling.',
  },
  {
    term: 'Nuxt',
    definition:
      'A broader Vue framework commonly used for SSR, routing conventions, and fuller application-platform behavior.',
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

export default function VueJsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Vue.js',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Vue.js"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Vue.js</h1>
      <p className="vue-js-help-doc-subtitle">
        Manual-style reference covering overview, templates, reactivity, component authoring,
        ecosystem shape, SSR story, tradeoffs, and practical examples.
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
