import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What Vue.js is',
    body: 'Vue.js is a frontend framework for building user interfaces through components, reactive state, declarative templates, and a cohesive tooling ecosystem. It aims to be approachable for smaller projects while still scaling to substantial applications through component composition, the Composition API, routing, state tools, and framework companions such as Nuxt.',
  },
  {
    title: 'Why Vue.js matters',
    body: 'Vue matters because it offered a frontend model that many teams found easier to approach than some alternatives while still supporting professional application architecture. Its template syntax, reactive system, single-file components, and gradual-adoption story helped it become one of the major frontend ecosystems.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that Vue sits between lightweight UI authoring and structured application development. It provides a strong component model, built-in reactivity, clear template syntax, and official companion libraries without forcing every application into one rigid shape. That balance is a major part of its appeal.',
  },
  {
    title: 'Where it fits best',
    body: 'Vue fits well for interactive web applications, dashboards, product surfaces, design-system-driven work, and teams that want a cohesive but approachable component framework. It is also a strong choice when a project may start small and grow over time without abandoning its initial UI model.',
  },
]

const whyItMatters = [
  'It combines a strong component model with an approachable reactive programming style.',
  'It offers an official ecosystem for routing, state, and tooling without requiring excessive ceremony.',
  'It supports both gradual adoption and large application architecture.',
  'It provides single-file components that colocate logic, template, and styles in a readable way.',
  'It remains one of the central alternatives to React and Angular in frontend engineering.',
]

const historicalContext = [
  {
    title: 'Frontend teams wanted structure without excessive overhead',
    detail:
      'As frontend systems became larger, teams looked for frameworks that could provide reactivity, component composition, and maintainable UI structure without forcing every project into highly complex patterns from the beginning. Vue gained traction by offering that middle ground.',
  },
  {
    title: 'Templates and reactivity remained a deliberate part of the model',
    detail:
      'Where some ecosystems leaned more heavily into JavaScript-driven render code, Vue retained a strong template-driven identity. That made it feel familiar to many web developers while still offering modern component architecture and a reactive data model.',
  },
  {
    title: 'The ecosystem matured around official companions',
    detail:
      'Vue became more viable for large applications as companion libraries such as Vue Router, Pinia, and later Nuxt gave teams more consistent answers for routing, state, and application delivery. This helped the ecosystem feel more complete without losing its relatively approachable core.',
  },
  {
    title: 'The Composition API broadened how Vue code is organized',
    detail:
      'Earlier Vue code often centered heavily on the Options API, while newer Vue applications often use the Composition API for reusable logic and more flexible component organization. Understanding modern Vue means understanding both the reactive model and how those APIs shape code structure.',
  },
]

const bigPictureThemes = [
  {
    title: 'Vue balances approachability with application depth',
    body: 'Vue is often praised because it can feel easy to start with while still supporting more advanced frontend architecture. That does not mean complexity disappears as an app grows, but it does mean the framework tries to let teams adopt more structure as they need it rather than all at once.',
  },
  {
    title: 'Reactivity is central to the authoring model',
    body: 'Vue applications revolve around reactive state and derived rendering. Understanding refs, reactive objects, computed values, and watchers is crucial because these concepts shape how components communicate, update, and stay consistent over time.',
  },
  {
    title: 'Templates remain a first-class way to describe UI',
    body: 'Vue treats templates as a core interface for expressing UI structure, bindings, conditionals, and repetition. Teams that prefer a clear separation between stateful logic and declarative markup often find this model easier to scan than more code-centric alternatives.',
  },
  {
    title: 'The framework helps, but architecture still matters',
    body: 'Vue provides a coherent set of concepts, but applications still require careful decisions about component boundaries, state ownership, async data, routing, and performance. A pleasant syntax does not automatically prevent overgrown components or unclear data flow.',
  },
]

const keyTakeaways = [
  'Vue.js is a component framework centered on reactivity, templates, and single-file components.',
  'Its main value is the balance between developer approachability and real application capability.',
  'Reactive state management is one of the core ideas teams must understand to use Vue well.',
  'The framework works best when components, stores, and derived state have clear boundaries.',
  'Vue often becomes even more powerful when paired with official ecosystem tools such as Vue Router, Pinia, and Nuxt.',
]

const topicSignals = [
  {
    title: 'Choose Vue when the team wants a coherent but approachable framework',
    body: 'If the team wants component architecture, reactive state, and official ecosystem support without assembling every concern independently, Vue is a strong candidate.',
  },
  {
    title: 'Choose Vue when template-driven UI is a good fit',
    body: 'Teams that prefer a declarative template model for rendering, conditions, loops, and bindings often find Vue comfortable because the framework keeps that style central rather than incidental.',
  },
  {
    title: 'Choose Vue when gradual adoption matters',
    body: 'Vue can work for both focused UI islands and larger applications, which makes it useful in codebases that may grow over time or be integrated incrementally into an existing frontend landscape.',
  },
  {
    title: 'Avoid treating Vue syntax as the whole framework',
    body: 'Teams sometimes learn template syntax quickly but never fully internalize reactivity, state boundaries, routing structure, or async coordination. That usually leads to apps that feel easy at first but become tangled later.',
  },
]

const coreFoundations = [
  {
    title: 'Single-file components',
    body: 'Vue commonly uses single-file components that colocate template, script, and styles. This can improve readability because UI structure and component logic stay together, as long as components remain focused instead of growing into broad multipurpose files.',
  },
  {
    title: 'Refs, reactive objects, and computed values',
    body: 'Vue reactivity revolves around reactive primitives such as refs and reactive objects, alongside computed values for derived state. Developers need to understand these tools because they determine how data changes propagate through templates and component trees.',
  },
  {
    title: 'Templates, directives, and declarative UI',
    body: 'Vue templates support conditionals, lists, bindings, event handlers, and directives in a way that keeps render structure readable. This helps teams keep UI logic close to the markup it affects instead of scattering everything across imperative update code.',
  },
  {
    title: 'Composition API and reusable logic',
    body: 'Modern Vue often uses the Composition API to extract and organize stateful logic. This makes reusable patterns easier to share across components, but it still requires discipline so composables remain cohesive rather than becoming vague helper collections.',
  },
  {
    title: 'State flow and ownership',
    body: 'Vue still benefits from clear state ownership even though the reactivity model can feel flexible. Props, emits, composables, and stores all have roles, and confusion arises when teams blur them without deciding which layer actually owns each concern.',
  },
]

const frameworkFeatures = [
  {
    title: 'Composition API and composables',
    body: 'The Composition API gives Vue a flexible way to organize reusable stateful behavior through refs, computed values, watchers, and custom composables. This helps larger applications avoid some of the limitations of purely options-based organization while preserving the Vue reactive model.',
  },
  {
    title: 'Official router and state ecosystem',
    body: 'Vue Router and Pinia give the ecosystem coherent answers for navigation and shared state. This matters because teams can stay within a fairly consistent design vocabulary instead of assembling many unrelated libraries for essential application concerns.',
  },
  {
    title: 'Directives, bindings, and template ergonomics',
    body: 'Vue includes strong first-class support for conditional rendering, loops, event handling, model binding, and custom directives. These features make common interface behaviors easy to express directly in the template without requiring a large amount of custom ceremony.',
  },
  {
    title: 'Scoped styles and component locality',
    body: 'Vue single-file components can keep styles close to the component that owns them. This helps local reasoning and reduces naming collisions, although larger design systems still need shared tokens, consistency rules, and intentional styling architecture.',
  },
  {
    title: 'Nuxt compatibility for application-level architecture',
    body: 'Vue can stand alone as a UI framework, but it also pairs naturally with Nuxt when teams need routing, server rendering, static generation, and fuller application structure. This makes Vue adaptable across both client-focused and hybrid delivery models.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Reactive convenience still needs discipline',
    body: 'Vue makes state changes easy to express, but reactive convenience can become confusion if teams do not keep track of which state is local, derived, shared, or persisted. Clear ownership remains important even when the API feels smooth.',
  },
  {
    title: 'Watchers and side effects can be overused',
    body: 'Watchers are useful when code must react to changing state, but they can also become a source of hidden coupling if teams use them instead of modeling derived data more directly. A healthy Vue codebase tends to use watchers intentionally rather than as a default answer to every dependency problem.',
  },
  {
    title: 'Bundle size and third-party cost still matter',
    body: 'Vue itself does not determine total frontend performance. UI kits, charts, editors, and large utility packages can still dominate browser cost. Teams should evaluate the full dependency surface rather than assuming framework choice alone guarantees speed.',
  },
  {
    title: 'Observability and profiling still matter',
    body: 'Large Vue applications still need debugging discipline, render inspection, error reporting, and performance monitoring. Reactive systems can hide unexpected update paths, so teams benefit from tooling that reveals which state changes drive which UI changes.',
  },
]

const ecosystemUses = [
  {
    title: 'Interactive product interfaces',
    body: 'Vue is common in dashboards, management tools, commerce interfaces, content editing systems, and other products where components, reactive state, and reusable UI patterns are central to daily development.',
  },
  {
    title: 'Teams that want a coherent official ecosystem',
    body: 'Some teams choose Vue because they prefer a framework ecosystem with strong official companions rather than a more fragmented stack assembly process. That can reduce decision overhead and make architecture feel more consistent.',
  },
  {
    title: 'Projects that may start small and expand',
    body: 'Vue often works well for projects that begin as focused interfaces or embed surfaces and later grow into more substantial applications, because the framework supports both lighter use and larger structured patterns.',
  },
  {
    title: 'Hybrid apps through Nuxt',
    body: 'When paired with Nuxt, Vue becomes part of a broader application model that supports server rendering, route-level data, and deployment-aware behavior. This makes Vue relevant not only for client-side apps but also for document-driven web applications.',
  },
]

const comparisons = [
  {
    title: 'Vue versus React',
    body: 'Both frameworks support component-driven development, but Vue emphasizes templates, official ecosystem companions, and a different reactive programming style, while React leans more heavily into JavaScript-centric composition and a broader surrounding ecosystem.',
  },
  {
    title: 'Vue versus Angular',
    body: 'Angular offers a more opinionated application framework with stronger built-in structure, while Vue often feels lighter and more incrementally adoptable. The tradeoff is broader framework integration versus a more flexible and approachable starting point.',
  },
  {
    title: 'Vue versus Svelte',
    body: 'Svelte pushes more work into compilation and often feels even lighter in authoring and runtime shape, while Vue keeps a stronger established runtime ecosystem and a long-matured reactive component model. They optimize for different balances of ergonomics, ecosystem breadth, and runtime strategy.',
  },
  {
    title: 'Vue versus Nuxt',
    body: 'Vue is the UI framework underneath, while Nuxt is the application framework layer around Vue. Choosing between them is usually about whether the project needs only the component model or also needs routing, server rendering, data delivery, and deployment structure from the start.',
  },
]

const failureModes = [
  {
    title: 'Letting components grow too broad',
    body: 'Single-file components are convenient, but they can become oversized if teams keep adding logic, template branches, styles, and side effects into one place. Component locality helps only when the component still represents one clear responsibility.',
  },
  {
    title: 'Using watchers where computed state would be clearer',
    body: 'Watchers can solve real problems, but they often become accidental complexity when used to mirror or transform state that should have been modeled as computed data. This makes update paths harder to follow.',
  },
  {
    title: 'Creating too many loosely defined composables',
    body: 'The Composition API makes reuse easy, but not every repeated line deserves a composable. Poorly scoped composables can hide dependencies, leak state responsibilities, and make the codebase feel more abstract than the problem requires.',
  },
  {
    title: 'Confusing local state, store state, and route state',
    body: 'Vue applications often use several reactive layers at once. Problems arise when teams do not decide clearly whether a value belongs in a component, a composable, a store, or the route. The result is overlapping state and hard-to-debug synchronization issues.',
  },
  {
    title: 'Assuming framework ergonomics replace architectural planning',
    body: 'Vue can feel pleasant enough that teams underestimate the need for structure. The application still needs intentional design around routing, stores, async data, and domain boundaries if it is going to remain maintainable.',
  },
]

const studyChecklist = [
  'Understand Vue as a reactive component framework, not only as template syntax.',
  'Learn the difference between props, emits, local refs, computed values, watchers, composables, and stores.',
  'Keep components and composables focused so reactive state remains easy to trace.',
  'Use watchers intentionally and prefer derived state when that models the problem more clearly.',
  'Choose state boundaries deliberately across components, stores, and route-level concerns.',
  'Remember that Nuxt adds a separate application architecture layer on top of Vue when the project needs it.',
]

const examples = [
  {
    id: 'vue98-example-component',
    title: 'Example: Reactive component state',
    area: 'State',
    intro:
      'A Vue component can declare local reactive state and render template output directly from it.',
    whyFit:
      'This captures the most basic Vue idea: the template reflects reactive data rather than manual DOM updates.',
    code: `<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count += 1">Count: {{ count }}</button>
</template>`,
    takeaway:
      'Vue stays easiest to reason about when local state remains local and the template clearly reflects that state.',
  },
  {
    id: 'vue98-example-computed',
    title: 'Example: Computed derived state',
    area: 'Derived Data',
    intro:
      'Computed values let a component derive view-ready data from reactive sources without duplicating that state manually.',
    whyFit: 'This shows how Vue distinguishes source state from derived state in a readable way.',
    code: `<script setup>
import { computed, ref } from 'vue'

const count = ref(3)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <p>{{ count }} doubled is {{ doubled }}</p>
</template>`,
    takeaway:
      'Computed values are often clearer than watchers when the goal is to derive one value from another predictably.',
  },
  {
    id: 'vue98-example-props',
    title: 'Example: Props and emits',
    area: 'Component Contracts',
    intro:
      'A child component receives input through props and communicates back through emitted events.',
    whyFit:
      'This reflects the standard Vue contract between reusable components and their consumers.',
    code: `<script setup>
defineProps<{ label: string }>()
const emit = defineEmits<{ save: [] }>()
</script>

<template>
  <button @click="emit('save')">{{ label }}</button>
</template>`,
    takeaway:
      'Clear prop and event contracts keep component relationships explicit even in large trees.',
  },
  {
    id: 'vue98-example-composable',
    title: 'Example: Reusable composable',
    area: 'Reusable Logic',
    intro:
      'A composable can package reactive behavior into a reusable function that multiple components can consume.',
    whyFit:
      'This demonstrates how modern Vue shares stateful logic without forcing everything into one component or store.',
    code: `import { computed, ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)

  return { count, doubled }
}`,
    takeaway:
      'Composables are strongest when they encapsulate one real behavior pattern with a clear interface.',
  },
  {
    id: 'vue98-example-store',
    title: 'Example: Pinia store',
    area: 'Shared State',
    intro:
      'A store can hold shared application state when the same data or actions must coordinate across multiple routes or components.',
    whyFit:
      'This shows how Vue applications often move from local reactivity to store-managed shared state as they grow.',
    code: `import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as string[] }),
  actions: {
    add(item: string) {
      this.items.push(item)
    },
  },
})`,
    takeaway:
      'Stores are useful for shared state, but they should represent real shared ownership rather than becoming the default home for every value.',
  },
]

const glossary = [
  {
    term: 'Vue.js',
    definition: 'A frontend framework for building reactive, component-driven user interfaces.',
  },
  {
    term: 'Single-file component',
    definition:
      'A Vue component file that commonly colocates template, script, and style sections.',
  },
  {
    term: 'ref',
    definition: 'A Vue reactive primitive commonly used to store and update a value over time.',
  },
  {
    term: 'computed',
    definition: 'A Vue mechanism for deriving reactive values from other reactive sources.',
  },
  {
    term: 'watch',
    definition:
      'A Vue tool for observing reactive values and running side effects when they change.',
  },
  {
    term: 'Composition API',
    definition:
      'A Vue API style centered on refs, computed values, watchers, and composables for organizing logic.',
  },
  {
    term: 'Composable',
    definition: 'A reusable Vue function that encapsulates reactive state or behavior.',
  },
  {
    term: 'Pinia',
    definition: 'The official state management library commonly used in modern Vue applications.',
  },
  {
    term: 'Directive',
    definition:
      'A special Vue template syntax such as v-if, v-for, or v-model that attaches framework behavior to markup.',
  },
  {
    term: 'Nuxt',
    definition:
      'The application framework layer commonly used around Vue for routing, server rendering, and hybrid web delivery.',
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
    { id: 'vue98-overview', label: 'Overview' },
    { id: 'vue98-why', label: 'Why It Matters' },
    { id: 'vue98-history', label: 'Historical Context' },
    { id: 'vue98-themes', label: 'Big Picture Themes' },
    { id: 'vue98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'vue98-signals', label: 'Topic Signals' },
    { id: 'vue98-foundations', label: 'Foundations' },
    { id: 'vue98-features', label: 'Framework Features' },
    { id: 'vue98-runtime', label: 'Runtime and Operations' },
    { id: 'vue98-uses', label: 'Ecosystem Uses' },
    { id: 'vue98-compare', label: 'Compare and Contrast' },
    { id: 'vue98-failures', label: 'Failure Modes' },
    { id: 'vue98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'vue98-glossary', label: 'Terms' }],
}

export default function VuePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Vue.js (Frontend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Vue.js (Frontend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Vue.js (Frontend)</h1>
      <p className="vue98-intro">
        This page is a frontend-focused overview of Vue.js as a reactive component framework. It
        explains templates, refs, computed values, watchers, composables, stores, ecosystem
        tradeoffs, and the design discipline required to keep a Vue codebase understandable as it
        grows.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="vue98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="vue98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="vue98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="vue98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="vue98-takeaways" className="bin98-section">
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
          <section id="vue98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="vue98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="vue98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="vue98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="vue98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="vue98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="vue98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="vue98-checklist" className="bin98-section">
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
        <section id="vue98-glossary" className="bin98-section">
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
