import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What Svelte is',
    body: 'Svelte is a UI framework that moves much of its work to compile time instead of relying on a large browser runtime. Rather than interpreting component trees through a virtual DOM system at runtime, Svelte compiles component code into focused JavaScript that updates the DOM directly.',
  },
  {
    title: 'Why Svelte matters',
    body: 'Svelte matters because it challenged the assumption that modern component frameworks must ship a large runtime abstraction to the browser. By emphasizing compilation, simpler authoring syntax, and direct DOM updates, it offered a different path to component-driven frontend development with strong ergonomics and lower client-side overhead.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that Svelte is both a component model and a compiler strategy. Developers still write components, markup, styles, and reactive logic, but the browser receives compiled code that already knows how to update the DOM for that component. This makes Svelte feel different from frameworks that carry more of their abstraction into runtime execution.',
  },
  {
    title: 'Where it fits best',
    body: 'Svelte fits best for interactive frontends that value concise component syntax, strong built-in ergonomics, and low browser overhead. It is particularly attractive for dashboards, embedded widgets, content-rich interfaces, and teams that want a modern component model without adopting the full runtime shape of React or Vue.',
  },
]

const whyItMatters = [
  'It shows that component frameworks can push more work into the build step instead of the browser runtime.',
  'It offers concise built-in patterns for reactivity, templating, binding, animation, and scoped styling.',
  'It often produces smaller client bundles and less runtime overhead than heavier framework stacks.',
  'It provides an alternative frontend mental model centered on compiler-guided reactivity.',
  'It becomes even more relevant when paired with SvelteKit for full application delivery.',
]

const historicalContext = [
  {
    title: 'Component frameworks often relied on substantial runtimes',
    detail:
      'Many frontend libraries solved UI complexity by shipping a browser runtime that interpreted components, state changes, and rendering rules at execution time. That model was powerful, but it also meant paying a fixed runtime cost in bundle size and browser work.',
  },
  {
    title: 'Svelte argued for compilation-first frontend architecture',
    detail:
      'Svelte became notable because it proposed that much of framework logic could be compiled away. Developers still author components in a high-level style, but the framework transforms those components into targeted DOM update logic ahead of time instead of relying on a larger generic runtime in production.',
  },
  {
    title: 'SvelteKit expanded the ecosystem into full applications',
    detail:
      'As the Svelte ecosystem matured, SvelteKit added routing, server rendering, data loading, and deployment structure around the Svelte component model. This made Svelte more viable for full product applications rather than only isolated client-side widgets.',
  },
  {
    title: 'The reactivity model kept evolving',
    detail:
      'Svelte became especially interesting because it experimented with reactive authoring models that felt simpler than manual state wiring. As the language evolved, newer patterns such as runes made that reactivity model more explicit and more portable across different code contexts.',
  },
]

const bigPictureThemes = [
  {
    title: 'The compiler is part of the programming model',
    body: 'Svelte is not only a set of runtime APIs. The compiler understands component structure, reactive assignments, bindings, markup blocks, and scoped styles. Teams using Svelte therefore need to think not only about what the code does in the browser, but also about what the compiler can infer and transform.',
  },
  {
    title: 'Reactivity is designed to feel direct',
    body: 'Svelte aims to make reactive updates feel closer to normal variable usage than many framework hook systems. That can make authoring feel lightweight and approachable, but it also means developers need to understand which patterns are tracked by the compiler and which boundaries need more explicit state design.',
  },
  {
    title: 'Built-in ergonomics replace some library assembly',
    body: 'Svelte includes strong first-class patterns for bindings, transitions, scoped styles, and templating. This reduces the amount of surrounding library glue teams need for common UI behaviors, which can improve readability when used with discipline.',
  },
  {
    title: 'Low runtime overhead does not remove architectural tradeoffs',
    body: 'Svelte can reduce browser overhead, but application quality still depends on state boundaries, network behavior, code splitting, deployment choices, and server architecture. A fast framework does not automatically produce a well-structured application.',
  },
]

const keyTakeaways = [
  'Svelte is a compile-first UI framework rather than a runtime-heavy interpretation layer.',
  'Its main strengths are concise authoring, direct-feeling reactivity, and low browser overhead.',
  'Svelte components combine logic, markup, and scoped styles in a single file model.',
  'Stores, bindings, transitions, and reactive declarations are core parts of the ecosystem experience.',
  'Svelte works best when teams understand both the authoring model and the compiler-driven assumptions behind it.',
]

const topicSignals = [
  {
    title: 'Choose Svelte when client-side efficiency matters',
    body: 'If the product benefits from small bundles, responsive interactions, or embedded usage where runtime overhead matters, Svelte is a strong candidate because of its compile-first approach.',
  },
  {
    title: 'Choose Svelte when concise UI authoring is valuable',
    body: 'Teams that want components, styles, transitions, and bindings to be expressed with minimal ceremony often find Svelte appealing because many common UI patterns are first-class rather than library add-ons.',
  },
  {
    title: 'Choose Svelte when the team wants a different reactivity model',
    body: 'Developers who prefer direct-feeling reactive variables, store subscriptions, and compiler-supported patterns may find Svelte more natural than hook-heavy or runtime-driven approaches.',
  },
  {
    title: 'Avoid assuming Svelte removes all application choices',
    body: 'Even with a concise component model, teams still need clear answers for routing, data loading, server rendering, caching, deployment, and domain boundaries. The framework helps, but it does not remove architecture work.',
  },
]

const coreFoundations = [
  {
    title: 'Single-file component structure',
    body: 'Svelte components usually combine logic, template markup, and scoped styles in one file. That keeps related concerns close together, which can improve readability, as long as components remain focused and do not grow into oversized multi-purpose files.',
  },
  {
    title: 'Compiler-guided reactivity',
    body: 'A defining Svelte idea is that the framework can understand reactive relationships during compilation. State changes therefore map to targeted updates instead of broad runtime interpretation. Developers still need to understand the rules of that reactivity model to avoid surprises.',
  },
  {
    title: 'Template syntax and reactive control flow',
    body: 'Svelte templates support conditionals, loops, and asynchronous blocks in a syntax that stays close to markup. This encourages developers to keep rendering logic near the structure it affects rather than scattering display logic across many helper layers.',
  },
  {
    title: 'Stores and shared state',
    body: 'Svelte uses stores as a primary primitive for shared reactive state across components. Stores can remain simple, but they still need ownership boundaries and clear responsibilities if the application is going to scale without hidden coupling.',
  },
  {
    title: 'Bindings, transitions, and actions as built-ins',
    body: 'Svelte includes common UI behaviors directly in the framework model, such as two-way bindings, transitions, and DOM actions. These are powerful because they reduce boilerplate, but they should still be used intentionally rather than as shortcuts that hide too much state flow.',
  },
]

const frameworkFeatures = [
  {
    title: 'Reactive declarations and runes',
    body: 'Sveltes reactivity model has evolved across versions, but the consistent goal is to make derived values and side effects feel direct. Whether using older reactive statements or newer rune-based patterns, teams need to understand how Svelte tracks dependencies and when reactivity should remain explicit.',
  },
  {
    title: 'Stores and auto-subscription ergonomics',
    body: 'Stores provide a small and flexible shared-state model, while template-level conveniences reduce subscription boilerplate. This makes many shared state cases easy to express, but teams still need discipline around store boundaries and mutation rules.',
  },
  {
    title: 'Scoped styles and component-local CSS',
    body: 'Svelte automatically scopes component styles, which reduces naming collisions and avoids some of the ceremony common in CSS-in-JS or manually namespaced styling systems. This is valuable when it keeps styles close to their component, but it should not replace broader design-system discipline.',
  },
  {
    title: 'Transitions, animations, and DOM actions',
    body: 'Svelte treats transitions and actions as part of the native component authoring model rather than as entirely separate libraries. This makes interactive UI behavior easy to add, especially for motion-rich interfaces, but developers still need to choose animation and imperative hooks carefully.',
  },
  {
    title: 'SvelteKit as the application-layer companion',
    body: 'Svelte by itself focuses on components, while SvelteKit adds routing, data loading, server rendering, and deployment structure. For many teams, understanding Svelte well also means understanding when the application should stay at the component layer and when it should rely on SvelteKit for broader architecture.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Smaller runtime cost does not eliminate network or data costs',
    body: 'A framework can reduce rendering overhead, but the application can still become slow if it loads too much data, ships large third-party packages, or performs excessive work after startup. Svelte helps on one axis, but overall performance still depends on the broader system.',
  },
  {
    title: 'Reactive code still needs clear boundaries',
    body: 'Because Svelte makes reactivity feel lightweight, teams can sometimes spread stateful behavior too broadly without noticing. The application stays healthiest when stores, bindings, and reactive derivations have explicit ownership and limited scope.',
  },
  {
    title: 'Browser and server concerns still need separation',
    body: 'When Svelte is used with SvelteKit or other server-aware tooling, developers still need to distinguish what belongs in browser-only behavior versus server-side logic. Concise component authoring should not blur security, data access, or deployment boundaries.',
  },
  {
    title: 'Observability still matters',
    body: 'Even if the component runtime is smaller, teams still need profiling, error tracking, and runtime debugging. Bugs in state flow, hydration, route loading, or deployment do not disappear just because the framework is lighter.',
  },
]

const ecosystemUses = [
  {
    title: 'Performance-sensitive interactive interfaces',
    body: 'Svelte is appealing for products where low browser overhead matters, such as embedded widgets, dashboards on constrained devices, and highly interactive surfaces that should stay responsive without shipping a large framework runtime.',
  },
  {
    title: 'Design-rich or motion-heavy experiences',
    body: 'Because transitions and component-local styles are easy to express, Svelte often feels comfortable in interfaces where animation, visual polish, and direct DOM behavior are part of the experience rather than afterthoughts.',
  },
  {
    title: 'Small to medium product teams that value concise code',
    body: 'Teams that prefer compact components and fewer supporting abstractions often like Svelte because common UI behaviors can be expressed with less ceremony than in many other frontend ecosystems.',
  },
  {
    title: 'Full-stack applications through SvelteKit',
    body: 'When paired with SvelteKit, Svelte becomes part of a full application stack that can handle routing, data loading, server rendering, and form workflows while keeping the same component authoring style.',
  },
]

const comparisons = [
  {
    title: 'Svelte versus React',
    body: 'React emphasizes a broad runtime model and a large surrounding ecosystem, while Svelte pushes more work into compilation and offers more built-in UI ergonomics. The tradeoff is ecosystem breadth and standardized patterns versus lower runtime overhead and more concise component syntax.',
  },
  {
    title: 'Svelte versus Vue',
    body: 'Both aim for approachable component authoring, but they differ in how reactivity and tooling are expressed. Vue keeps a stronger runtime and application ecosystem shape, while Svelte leans harder into compile-time transformation and direct-feeling component syntax.',
  },
  {
    title: 'Svelte versus Angular',
    body: 'Angular offers a much broader framework model with stronger built-in application structure, while Svelte is lighter and more focused on the component authoring experience. They serve very different team preferences and product shapes.',
  },
  {
    title: 'Svelte versus SvelteKit',
    body: 'Svelte is the component framework underneath, while SvelteKit adds routing, server rendering, data loading, and deployment structure. Choosing between them is usually about whether the product needs only component authoring or the full application framework layer as well.',
  },
]

const failureModes = [
  {
    title: 'Relying on concise syntax without understanding reactivity',
    body: 'Svelte can feel simple quickly, but teams still need to understand what the compiler tracks, how stores propagate changes, and where reactive dependencies come from. Superficial familiarity can lead to subtle bugs.',
  },
  {
    title: 'Letting stores become unbounded shared buckets',
    body: 'Stores are easy to create, which can be helpful or harmful. If teams put too many unrelated concerns into broad global stores, the application loses clear boundaries and becomes harder to reason about.',
  },
  {
    title: 'Overusing bindings where one-way flow would be clearer',
    body: 'Two-way binding is convenient, but it can also obscure ownership if used everywhere. Some interactions are clearer when state flows in one direction and updates happen through explicit handlers.',
  },
  {
    title: 'Assuming compile-time efficiency solves every performance issue',
    body: 'Svelte can lower framework overhead, but slow data loading, large dependencies, hydration cost, and excessive animation work can still produce poor user experiences. Performance remains a full-application concern.',
  },
  {
    title: 'Mixing component and application concerns carelessly',
    body: 'When Svelte is used inside a larger app stack, component authoring can feel so convenient that teams mix server logic, network behavior, and UI responsibilities too freely. Clear boundaries still matter.',
  },
]

const studyChecklist = [
  'Understand Svelte as both a component framework and a compile-time strategy.',
  'Learn how reactive declarations, stores, bindings, and template blocks actually work under the frameworks rules.',
  'Use stores and bindings deliberately so state ownership remains understandable.',
  'Keep component files focused even though the single-file model makes colocating logic and styles easy.',
  'Remember that SvelteKit, routing, and server concerns add another architectural layer beyond Svelte components themselves.',
  'Treat performance as an application concern, not only as a consequence of using a lighter framework.',
]

const examples = [
  {
    id: 'svelte98-example-component',
    title: 'Example: Reactive component state',
    area: 'State',
    intro:
      'A component can hold reactive state directly and render markup from that state without a separate hook system.',
    whyFit:
      'This shows how Svelte tries to make state updates feel close to ordinary variable usage.',
    code: `<script>
  let count = 0
</script>

<button on:click={() => count += 1}>
  Count: {count}
</button>`,
    takeaway:
      'Svelte authoring often feels compact because state and template logic stay close together, but the underlying reactivity model still deserves explicit understanding.',
  },
  {
    id: 'svelte98-example-derived',
    title: 'Example: Derived reactive value',
    area: 'Reactivity',
    intro:
      'A derived value can be expressed directly from reactive state so the template always reflects the current relationship.',
    whyFit:
      'This captures the declarative side of Svelte reactivity without requiring a larger runtime abstraction.',
    code: `<script>
  let count = 3
  $: doubled = count * 2
</script>

<p>{count} doubled is {doubled}</p>`,
    takeaway:
      'Derived state should be declared from source state rather than duplicated into independent mutable values whenever possible.',
  },
  {
    id: 'svelte98-example-store',
    title: 'Example: Shared writable store',
    area: 'Stores',
    intro:
      'A store can represent shared state across components while keeping the subscription model lightweight.',
    whyFit: 'This demonstrates one of the main ways Svelte handles cross-component reactive state.',
    code: `import { writable } from 'svelte/store'

export const user = writable({ name: 'Amina', signedIn: true })`,
    takeaway:
      'Stores are useful when data is genuinely shared, but they still need scope and ownership rather than becoming global dumping grounds.',
  },
  {
    id: 'svelte98-example-transition',
    title: 'Example: Built-in transition',
    area: 'Motion',
    intro:
      'Svelte can attach motion behavior directly in the template without a separate animation library for many common cases.',
    whyFit:
      'This reflects how Svelte makes interaction polish part of ordinary component authoring.',
    code: `<script>
  import { fade } from 'svelte/transition'
  let open = true
</script>

{#if open}
  <p transition:fade>Animated content</p>
{/if}`,
    takeaway:
      'Built-in motion is powerful when it reinforces the interface, but it should remain purposeful rather than decorative by default.',
  },
  {
    id: 'svelte98-example-action',
    title: 'Example: DOM action',
    area: 'Actions',
    intro:
      'An action lets a component attach imperative DOM behavior in a reusable way while keeping the directive at the template site.',
    whyFit:
      'This shows how Svelte handles DOM-level enhancement without forcing all imperative behavior into ad hoc component code.',
    code: `export function autofocus(node) {
  node.focus()

  return {
    destroy() {},
  }
}`,
    takeaway:
      'Actions are most useful when they encapsulate a real DOM behavior pattern cleanly instead of becoming a dumping ground for unrelated imperative code.',
  },
]

const glossary = [
  {
    term: 'Svelte',
    definition:
      'A compile-first UI framework that turns components into targeted JavaScript for updating the DOM.',
  },
  {
    term: 'Compiler',
    definition:
      'The Svelte build step that analyzes component code and transforms it into efficient runtime output.',
  },
  {
    term: 'Reactive declaration',
    definition:
      'A Svelte construct for expressing values or behavior that should update when dependencies change.',
  },
  {
    term: 'Store',
    definition: 'A reactive shared-state primitive in Svelte with a subscription-based contract.',
  },
  {
    term: 'Binding',
    definition:
      'A Svelte feature that connects DOM or component values directly to reactive state.',
  },
  {
    term: 'Action',
    definition: 'A reusable function that attaches imperative behavior to a DOM element in Svelte.',
  },
  {
    term: 'Transition',
    definition: 'A built-in Svelte mechanism for animating elements as they enter or leave the UI.',
  },
  {
    term: 'Scoped style',
    definition:
      'CSS in a Svelte component that the compiler automatically limits to that component.',
  },
  {
    term: 'SvelteKit',
    definition:
      'The application framework that adds routing, server rendering, and data loading around Svelte.',
  },
  {
    term: 'Hydration',
    definition:
      'The process of attaching client-side behavior to HTML that was rendered earlier on the server.',
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
    { id: 'svelte98-overview', label: 'Overview' },
    { id: 'svelte98-why', label: 'Why It Matters' },
    { id: 'svelte98-history', label: 'Historical Context' },
    { id: 'svelte98-themes', label: 'Big Picture Themes' },
    { id: 'svelte98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'svelte98-signals', label: 'Topic Signals' },
    { id: 'svelte98-foundations', label: 'Foundations' },
    { id: 'svelte98-features', label: 'Framework Features' },
    { id: 'svelte98-runtime', label: 'Runtime and Operations' },
    { id: 'svelte98-uses', label: 'Ecosystem Uses' },
    { id: 'svelte98-compare', label: 'Compare and Contrast' },
    { id: 'svelte98-failures', label: 'Failure Modes' },
    { id: 'svelte98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'svelte98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const svelteHelpStyles = `
.svelte98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.svelte98-window {
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

.svelte98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.svelte98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.svelte98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.svelte98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.svelte98-control:focus-visible,
.svelte98-tab:focus-visible,
.svelte98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.svelte98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.svelte98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.svelte98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.svelte98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.svelte98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.svelte98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.svelte98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.svelte98-toc-item + .svelte98-toc-item {
  margin-top: 8px;
}

.svelte98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.svelte98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.svelte98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.svelte98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.svelte98-section {
  margin: 0 0 22px;
}

.svelte98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.svelte98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.svelte98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.svelte98-content p,
.svelte98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.svelte98-content p {
  margin: 0 0 10px;
}

.svelte98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.svelte98-content li + li {
  margin-top: 4px;
}

.svelte98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.svelte98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .svelte98-main {
    grid-template-columns: 1fr;
  }

  .svelte98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .svelte98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .svelte98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function SveltePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Svelte (Frontend) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Svelte (Frontend)',
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
    <div className="svelte98-help-page">
      <style>{svelteHelpStyles}</style>
      <div className="svelte98-window" role="presentation">
        <header className="svelte98-titlebar">
          <span className="svelte98-title">Svelte (Frontend)</span>
          <div className="svelte98-title-controls">
            <button
              className="svelte98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="svelte98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="svelte98-tabs" role="tablist" aria-label="Svelte Frontend Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`svelte98-tab ${activeTab === tab.id ? 'svelte98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="svelte98-main">
          <aside className="svelte98-toc" aria-label="Table of contents">
            <h2 className="svelte98-toc-title">Contents</h2>
            <ul className="svelte98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="svelte98-toc-item">
                  <a href={`#${section.id}`} className="svelte98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="svelte98-content">
            <h1 className="svelte98-doc-title">Svelte (Frontend)</h1>
            <p className="svelte98-intro">
              This page is a frontend-focused overview of Svelte as a compile-first UI framework. It
              explains its compiler model, reactive authoring style, store patterns, built-in
              bindings and transitions, SvelteKit context, operational tradeoffs, and the design
              discipline needed to keep Svelte applications clear as they grow.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="svelte98-overview" className="svelte98-section">
                  <h2 className="svelte98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="svelte98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="svelte98-divider" />

                <section id="svelte98-why" className="svelte98-section">
                  <h2 className="svelte98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="svelte98-divider" />

                <section id="svelte98-history" className="svelte98-section">
                  <h2 className="svelte98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="svelte98-divider" />

                <section id="svelte98-themes" className="svelte98-section">
                  <h2 className="svelte98-heading">Big Picture Themes</h2>
                  {bigPictureThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="svelte98-divider" />

                <section id="svelte98-takeaways" className="svelte98-section">
                  <h2 className="svelte98-heading">Key Takeaways</h2>
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
                <section id="svelte98-signals" className="svelte98-section">
                  <h2 className="svelte98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="svelte98-foundations" className="svelte98-section">
                  <h2 className="svelte98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="svelte98-features" className="svelte98-section">
                  <h2 className="svelte98-heading">Framework Features</h2>
                  {frameworkFeatures.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="svelte98-runtime" className="svelte98-section">
                  <h2 className="svelte98-heading">Runtime and Operations</h2>
                  {runtimeAndOperations.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="svelte98-uses" className="svelte98-section">
                  <h2 className="svelte98-heading">Ecosystem Uses</h2>
                  {ecosystemUses.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="svelte98-compare" className="svelte98-section">
                  <h2 className="svelte98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="svelte98-failures" className="svelte98-section">
                  <h2 className="svelte98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="svelte98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="svelte98-checklist" className="svelte98-section">
                  <h2 className="svelte98-heading">Study Checklist</h2>
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
                  <section key={example.id} id={example.id} className="svelte98-section">
                    <h2 className="svelte98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="svelte98-codebox">
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
              <section id="svelte98-glossary" className="svelte98-section">
                <h2 className="svelte98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
