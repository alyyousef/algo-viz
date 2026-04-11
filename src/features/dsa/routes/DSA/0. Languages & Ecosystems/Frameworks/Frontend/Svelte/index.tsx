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
      'Svelte is a component framework with a compiler-first model. Instead of relying as heavily on a large generic browser runtime, it pushes more work into compilation so components can ship with smaller, more specialized update logic.',
      'In practice, Svelte is used for modern interactive frontends, single-page applications, content-heavy interfaces, and products that value concise component authoring with low runtime ceremony. For broader application concerns such as routing, data loading, form actions, and SSR, the ecosystem becomes most complete when paired with SvelteKit.',
      'This help-style reference covers Svelte across overview, key ideas, syntax, APIs, ecosystem, architecture, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why Teams Reach For Svelte',
    paragraphs: [
      'Svelte is attractive when teams want component code to stay small, direct, and close to ordinary HTML, CSS, and JavaScript. The framework tries to reduce ceremony rather than expand the visible runtime abstraction.',
      'That often makes local UI work feel unusually readable. Developers can move quickly because the component layer stays lean while the compiler handles much of the framework-specific machinery ahead of time.',
    ],
  },
  {
    id: 'bp-compiler',
    title: 'Why the Compiler-Centered Model Matters',
    paragraphs: [
      'Svelte is unusual because the compiler is not just an implementation detail. It shapes the mental model, the syntax feel, and the runtime cost profile. More framework work happens ahead of time, which often makes components look smaller and more direct.',
      'That does not mean the compiler makes architecture decisions disappear. It means the visible framework surface is different from runtime-heavy systems, and teams need to understand that difference when debugging or comparing frameworks.',
    ],
  },
  {
    id: 'bp-scope',
    title: 'What This Page Covers',
    paragraphs: [
      'This page keeps the original planned concepts: overview and key ideas, core syntax, APIs, ecosystem, architecture, use cases, tradeoffs, and compare-and-contrast references that help place Svelte among other frontend options.',
      'The layout follows a classic desktop help-document model so the content can be scanned as a reference rather than as a card-based landing page.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where Svelte Fits Well',
    paragraphs: [
      'Svelte is often a strong fit for small to medium teams that care about direct component authoring, lightweight shipped code, and a framework that stays relatively close to platform primitives. It is especially compelling when the biggest pain is framework friction rather than lack of framework structure.',
      "It can also be a strong choice for products that benefit from SvelteKit's cohesive routing and SSR story, as long as the team is comfortable with a smaller ecosystem surface than the largest frontend stacks.",
    ],
  },
  {
    id: 'bp-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'A common misconception is that Svelte is only about performance. Its more important distinction is often the authoring model: concise components, low ceremony, and a more compiler-shaped way of thinking about reactivity.',
      'Another misconception is that all Svelte advice is timeless. Modern Svelte discussion needs to account for its current reactive direction rather than relying only on older store-first tutorials.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Svelte emphasizes compile-time specialization and low runtime overhead.',
      'Its main strengths are directness, concise components, and strong developer ergonomics.',
      'Its main tradeoffs usually involve smaller ecosystem breadth, lower built-in organizational scaffolding, and the need to distinguish raw Svelte from the broader SvelteKit application story.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      "Svelte asks developers to think of components as close-to-the-platform modules that are compiled into targeted update logic. The framework surface stays relatively small, but the compiler does more work on the developer's behalf.",
      'This means the code often feels direct, but teams still need to understand the reactive model and the compile-time transformations that make the experience possible.',
    ],
  },
  {
    id: 'core-key-ideas',
    title: 'Overview and Key Ideas',
    paragraphs: [
      'Svelte aims to make reactive UI authoring feel close to normal web development while using compilation to produce efficient update code. The result is a framework that often feels less ceremonious in component code than alternatives built around a larger generic runtime.',
      'The key ideas are component composition, compile-time specialization, direct template syntax, and a reactive model that keeps state and derivation close to ordinary script authoring.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Structure',
    paragraphs: [
      'A Svelte component typically colocates script, markup, and style in a single `.svelte` file. That keeps component structure compact and easy to read without requiring separate framework-specific files for ordinary UI work.',
      'This single-file model is similar in spirit to other component systems, but Svelte usually feels terser because the template and reactive syntax are intentionally lightweight.',
    ],
  },
  {
    id: 'core-templates',
    title: 'Templates and Control Flow',
    paragraphs: [
      'Svelte templates stay visually close to ordinary markup while adding focused control-flow blocks such as `{#if}` and `{#each}`. Many teams like this because the framework grammar stays narrow and readable.',
      "That narrow syntax surface is part of Svelte's appeal. It often feels like plain HTML with carefully chosen reactive extensions rather than a large template language.",
    ],
  },
  {
    id: 'core-syntax',
    title: 'Core Syntax',
    paragraphs: [
      'Svelte templates stay visually close to ordinary markup while adding focused control-flow and binding constructs such as `{#if}`, `{#each}`, `on:click`, and `bind:value`. Many developers find that this keeps templates readable because the framework grammar stays relatively small.',
      'Interpolation uses braces directly in markup, and two-way binding for common inputs is concise. This is one reason Svelte is frequently described as low-friction for ordinary form and component work.',
    ],
  },
  {
    id: 'core-reactivity',
    title: 'Reactivity Model',
    paragraphs: [
      'Modern Svelte is best discussed in its runes-based context. Reactive state and derivation are commonly expressed with primitives such as `$state`, `$derived`, and `$effect`, which make intent more explicit than older shorthand narratives sometimes suggest.',
      'This model still feels lightweight because the reactivity is tightly integrated with compilation. Local component state often reads like direct script logic rather than usage of a large runtime API surface.',
    ],
  },
  {
    id: 'core-state',
    title: 'State and Shared Data',
    paragraphs: [
      'Svelte handles local state elegantly inside components. For broader sharing, teams can use module patterns, context, and stores. Modern guidance is more selective about stores than older tutorials were, because not every shared-state problem needs a classic store abstraction.',
      'This smaller state surface can feel freeing, but it also shifts more responsibility onto the team to keep architecture disciplined as an application grows.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs and Authoring Style',
    paragraphs: [
      'The public framework surface is intentionally smaller than many alternatives. Much of the experience comes from the component file format, reactive runes, event and binding syntax, and the compiler itself rather than from a large set of branded runtime primitives.',
      'That can be a real advantage for teams that want a compact mental model. It also means teams need to stay precise about version-sensitive guidance, because older store-first tutorials do not always reflect modern Svelte usage.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Architecture',
    paragraphs: [
      'Svelte by itself is primarily the component layer. The broader application story commonly comes from SvelteKit, which provides routing, layouts, data loading, SSR, and form actions as an official application framework around Svelte.',
      'Architecturally, that means many real decisions are not about raw Svelte in isolation. They are about Svelte plus SvelteKit, especially when navigation, server rendering, and request-response workflows matter.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Application Story',
    paragraphs: [
      'Svelte alone is primarily the component layer. SvelteKit is the official answer for file-based routing, layouts, route-level loading, form actions, and broader app workflow.',
      'This is one of the most important distinctions in any Svelte discussion. A component framework decision and an app-framework decision are related, but they are not the same layer.',
    ],
  },
  {
    id: 'core-forms',
    title: 'Forms and Bindings',
    paragraphs: [
      'Svelte is especially concise for local forms because bindings such as `bind:value` and `bind:checked` keep ordinary input work short and easy to scan.',
      'At the broader application level, SvelteKit form actions give the ecosystem a stronger request-response story than a plain client-only component comparison would suggest.',
    ],
  },
  {
    id: 'core-ssr',
    title: 'SSR and SvelteKit',
    paragraphs: [
      'SvelteKit provides the stronger SSR story around Svelte. Routing, layouts, load functions, and request-aware workflows live in one official application model, which many teams find unusually coherent.',
      'That means products evaluating Svelte for SSR or server-driven interactions are usually really evaluating Svelte together with SvelteKit.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Tooling',
    paragraphs: [
      'Svelte supports TypeScript well, and the experience often feels light because the component model is compact. The broader toolchain, language tooling, and app-level story become more important as teams move from isolated components into full applications.',
      'In practice, typed Svelte can feel pleasant because there are fewer framework layers competing for attention inside the component file.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Runtime Cost',
    paragraphs: [
      'Svelte has a strong reputation for small bundles and efficient updates because the compiler can emit specialized code rather than relying as heavily on generic runtime behavior.',
      'The correct engineering conclusion is not that Svelte automatically wins every performance discussion. Real applications still depend on architecture, data flow, rendering discipline, and network behavior.',
    ],
  },
  {
    id: 'core-adoption',
    title: 'Adoption and Team Fit',
    paragraphs: [
      'Svelte is often loved by small or medium teams because the local authoring experience is so direct. It can reduce day-to-day framework friction and make components easy to read.',
      'At larger organizational scale, teams should think carefully about conventions and architecture discipline because the framework intentionally imposes less visible ceremony than more opinionated systems.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Svelte is frequently used for interactive dashboards, marketing sites with rich behavior, content-heavy web apps, smaller product teams, and applications where compact components and low runtime overhead are primary advantages.',
      "It is also attractive for apps that benefit from SvelteKit's integrated SSR and form-handling workflows, especially when a cohesive app platform matters as much as the component model itself.",
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Svelte often wins on directness, but that same low-ceremony model can provide fewer visible guardrails in large organizations. Teams with uneven architecture practices may need to impose more conventions themselves as complexity increases.',
      'Another tradeoff is ecosystem size. Svelte has a strong reputation for developer satisfaction, but the third-party library surface, hiring pool, and long-tail example volume are still smaller than the largest frontend ecosystems.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A recurring mistake is evaluating Svelte only through old tutorials that overemphasize stores and underdescribe the newer reactive direction. Another is comparing raw Svelte to fuller application frameworks without keeping the layer mismatch explicit.',
      'A second pitfall is assuming low ceremony removes the need for architecture. Directness helps a lot, but large applications still need disciplined boundaries for state, data loading, and routing.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Svelte is commonly compared with Vue for compiler-first directness versus runtime reactivity and framework cohesion, with React for low-ceremony authoring versus ecosystem breadth, and with Angular for lightweight component ergonomics versus a larger integrated application framework.',
      'These comparisons help position Svelte clearly: leaner than a batteries-included framework, more compiler-centered than runtime-oriented frameworks, and usually more dependent on team discipline when scaling architectural complexity.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Example',
    description:
      'A small component shows the modern Svelte pattern of explicit local state with runes and markup that stays close to ordinary HTML.',
    snippets: [
      {
        label: 'Counter.svelte',
        code: `<script lang="ts">
  let count = $state(0)
  let isEven = $derived(count % 2 === 0)
</script>

<button on:click={() => count += 1}>
  Count: {count}
</button>

<p>{isEven ? 'even' : 'odd'}</p>`,
      },
    ],
    takeaway:
      'The example stays compact because state, derivation, and markup are all expressed with very little framework ceremony.',
  },
  {
    id: 'examples-binding',
    title: 'Form Binding Example',
    description:
      'Svelte keeps common form interactions short. Binding syntax is direct, which is one reason many developers like it for everyday UI work.',
    snippets: [
      {
        label: 'NewsletterForm.svelte',
        code: `<script lang="ts">
  let email = $state('')
  let subscribed = $state(true)
</script>

<input bind:value={email} type="email" placeholder="Email" />
<input bind:checked={subscribed} type="checkbox" />

<p>{email} / subscribed: {subscribed ? 'yes' : 'no'}</p>`,
      },
    ],
    takeaway:
      'For local forms, the framework stays out of the way and lets bindings read almost like plain markup annotations.',
  },
  {
    id: 'examples-lists',
    title: 'Control Flow Example',
    description:
      'Svelte list and conditional syntax shows how compact the template layer can stay for common UI patterns.',
    snippets: [
      {
        label: 'FrameworkList.svelte',
        code: `<script lang="ts">
  let query = $state('')
  let items = ['Vue', 'Svelte', 'React', 'Solid']

  let filtered = $derived(
    items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    )
  )
</script>

<input bind:value={query} placeholder="Filter frameworks" />

{#if filtered.length === 0}
  <p>No matches</p>
{:else}
  <ul>
    {#each filtered as item}
      <li>{item}</li>
    {/each}
  </ul>
{/if}`,
      },
    ],
    takeaway:
      'This is where Svelte often feels especially direct: control flow reads close to markup and script rather than like a large framework ceremony.',
  },
  {
    id: 'examples-architecture',
    title: 'Application Snapshot',
    description:
      'A typical Svelte production setup separates the component layer from the broader application framework story.',
    snippets: [
      {
        label: 'Common Stack',
        code: `Svelte for component authoring
SvelteKit for routing, layouts, load functions, and SSR
Context, modules, or stores for shared state when needed
TypeScript where stronger contracts help maintainability`,
      },
    ],
    takeaway:
      'The cleanest mental model is to treat Svelte as the component framework and SvelteKit as the official path for larger app behavior.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Svelte',
    definition: 'A compiler-first component framework for building reactive user interfaces.',
  },
  {
    term: 'SvelteKit',
    definition:
      'The official application framework around Svelte that provides routing, data loading, SSR, and form actions.',
  },
  {
    term: 'Rune',
    definition: 'A modern Svelte reactive primitive such as `$state`, `$derived`, or `$effect`.',
  },
  {
    term: '$state',
    definition: 'A Svelte rune used to declare reactive local state in component code.',
  },
  {
    term: '$derived',
    definition: 'A Svelte rune used to express derived values computed from reactive state.',
  },
  {
    term: '$effect',
    definition: 'A Svelte rune used to run effectful logic in response to reactive changes.',
  },
  {
    term: 'Store',
    definition:
      'A subscribable state contract still useful for some shared or asynchronous state scenarios.',
  },
  {
    term: 'bind:value',
    definition: 'Svelte syntax for binding an input value directly to component state.',
  },
  {
    term: '{#if}',
    definition: 'A Svelte control-flow block used for conditional rendering in markup.',
  },
  {
    term: '{#each}',
    definition: 'A Svelte control-flow block used for rendering lists from iterable data.',
  },
  {
    term: 'Load function',
    definition: 'A SvelteKit route-level function used to fetch data for a page or layout.',
  },
  {
    term: 'Form action',
    definition: 'A SvelteKit server-side mutation workflow connected directly to HTML forms.',
  },
  {
    term: 'Context',
    definition:
      'A Svelte mechanism for sharing values across parts of the component tree without ordinary prop passing.',
  },
  {
    term: 'on:click',
    definition: 'Svelte event syntax used to attach event handlers in markup.',
  },
  {
    term: 'Scoped styles',
    definition:
      'Svelte component styling behavior where local CSS is isolated to the component by default.',
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

export default function SveltePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Svelte',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Svelte"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Svelte</h1>
      <p className="svelte-help-doc-subtitle">
        Manual-style reference covering overview, compiler model, reactivity, SvelteKit, forms,
        routing, team fit, tradeoffs, and examples.
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
