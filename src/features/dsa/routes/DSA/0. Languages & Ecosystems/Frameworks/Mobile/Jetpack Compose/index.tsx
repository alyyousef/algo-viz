import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

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
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Jetpack Compose is Androids modern toolkit for building native UI. That is Googles own framing, and it captures the essential point: Compose is not a compatibility layer pretending Android views no longer exist. It is the current declarative UI toolkit for Android application development.',
  'Compose changes Android UI work from XML-plus-imperative-view-mutation toward Kotlin-first declarative UI. Instead of inflating view hierarchies and manually synchronizing widgets to state, you describe UI as a function of state in composable functions and let the runtime update the rendered result as state changes.',
  'The framework matters not only because it replaces XML in many codebases, but because it changes how teams think about state ownership, UI composition, navigation, previews, animation, adaptive layout, and interoperability with the older View system. Teams that treat Compose as only a different syntax for old Android UI usually miss its main advantages.',
  'As of April 3, 2026, Jetpack Compose remains an actively evolving first-party Android UI stack. Current decisions should therefore be grounded in modern Android Developers documentation, including state hoisting guidance, Compose navigation guidance, and current Jetpack release expectations rather than early-adoption Compose assumptions.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Jetpack Compose is the Kotlin-based declarative UI toolkit for Android. Instead of defining most UI in XML and then mutating Views from Activities or Fragments, developers write composable functions that describe the screen for a given state.',
      'That description matters because Compose is not simply a prettier way to build layouts. It introduces a different runtime model centered on composition, recomposition, remembered state, modifiers, and explicit data flow. The framework is easier to use well once it is understood as a new UI model rather than an Android XML replacement with nicer syntax.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Compose Matters',
    paragraphs: [
      'Compose matters because it is Googles primary modern Android UI direction. It gives Android teams a more direct, Kotlin-first way to express UI, state, animation, and adaptive behavior. That reduces ceremony in many codebases and often improves the clarity of UI logic when state is modeled well.',
      'It also matters because it aligns with current Android architecture guidance. State hoisting, unidirectional data flow, ViewModel-backed state, preview-based iteration, and adaptive layouts all fit naturally into Compose-based application design.',
    ],
    bullets: [
      'Kotlin-first declarative UI instead of XML-heavy UI definitions.',
      'Closer alignment between UI and state.',
      'Improved composition and reuse of UI building blocks.',
      'Current first-party Android direction for modern UI work.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Compose Fits Best',
    paragraphs: [
      'Compose is strongest in modern Android codebases that want a clear state-driven UI model and are willing to organize presentation logic around that model. It works especially well for new screens, new features, and applications already moving toward Kotlin-first architecture and current Jetpack guidance.',
      'It is also practical in incremental migrations. Compose does not require an all-at-once rewrite because it interoperates with the existing View system. This makes it realistic for mature Android applications that need gradual modernization instead of big-bang replacement.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Compose is modern, but it is still Android development. Teams still need to understand activities, lifecycles, permissions, app manifests, build variants, performance, release signing, testing, and platform-specific constraints. Compose reduces UI boilerplate; it does not remove Android as the runtime platform.',
      'The healthiest Compose teams therefore avoid two shallow conclusions. One is that Compose makes all old Android knowledge obsolete. The other is that old View knowledge makes Compose unnecessary. In reality, production Android teams often need both models for some period of time.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-composables',
    title: 'Composable Functions and the Declarative Model',
    paragraphs: [
      'Compose UI is built from composable functions. Instead of inflating XML and then finding and mutating views, a composable describes what should appear on screen for the current state. This is the central mental shift in Compose.',
      'That means UI code reads less like a script that tells widgets what to do and more like a structured description of interface output. Once a team internalizes that, screen logic usually becomes easier to reason about because the relationship between state and UI is more direct.',
    ],
  },
  {
    id: 'core-state',
    title: 'State and remember',
    paragraphs: [
      'Compose uses state objects to trigger updates. Local UI state is commonly stored with remember and mutableStateOf so recomposition can occur when values change. The framework then updates only what is needed according to the current composition.',
      'The important rule is that state ownership must be intentional. If state is stored in the wrong place, duplicated unnecessarily, or mixed between UI and domain ownership, Compose screens become harder to debug and harder to test.',
    ],
  },
  {
    id: 'core-state-hoisting',
    title: 'State Hoisting and Unidirectional Data Flow',
    paragraphs: [
      'Androids official guidance emphasizes state hoisting. When multiple composables need to read or update the same state, that state should usually be moved upward to the lowest common parent and then passed down with values and event callbacks.',
      'This matters because Compose works best when state flows down and events flow up. That pattern avoids scattered mutable ownership and makes screens easier to preview, test, and connect to ViewModels or domain logic.',
    ],
    bullets: [
      'Place state at the lowest common owner that actually needs it.',
      'Pass immutable values downward into child composables.',
      'Pass events upward through lambdas or explicit actions.',
      'Keep business state separate from ephemeral UI-only state when possible.',
    ],
  },
  {
    id: 'core-recomposition',
    title: 'Composition and Recomposition',
    paragraphs: [
      'Compose uses composition to build the UI tree and recomposition to update parts of that tree when observed state changes. This is why stable parameters, sensible state boundaries, and well-structured composables matter for performance and clarity.',
      'Developers do not usually hand-trigger recomposition directly. Instead, they model state changes correctly and let the runtime update the relevant UI. The engineering skill is to understand what state a composable reads and how often that causes work to happen again.',
    ],
  },
  {
    id: 'core-modifiers-layout',
    title: 'Modifiers, Layout, and Styling',
    paragraphs: [
      "Modifiers are one of Compose's defining concepts. They let developers decorate or transform composables with layout, input, drawing, semantics, padding, sizing, and many other behaviors. In practice, a large part of Compose fluency is learning how modifiers compose and in what order they apply.",
      'Layout work usually relies on primitives such as Row, Column, Box, LazyColumn, LazyRow, padding, fill constraints, alignment, and arrangement. This gives developers a consistent Kotlin-based layout vocabulary instead of splitting mental models between XML declarations and imperative view updates.',
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation',
    paragraphs: [
      'Navigation in Compose is usually handled through the Navigation Compose library rather than being treated as only a manual fragment transaction replacement. Androids guidance focuses on route-driven navigation, explicit destinations, and moving data carefully between screens.',
      'Navigation remains an application architecture topic, not merely a UI concern. Deep links, back behavior, tab persistence, nested graphs, saved state, and feature boundaries still need deliberate structure in Compose applications.',
    ],
  },
  {
    id: 'core-viewmodel',
    title: 'ViewModel Integration',
    paragraphs: [
      'Compose works naturally with ViewModel-backed state. A ViewModel can expose screen state and event-handling functions while composables remain responsible for rendering and dispatching user intent. This keeps business logic and screen orchestration out of leaf UI elements.',
      'That architecture is especially useful in larger applications because it protects the composable tree from accumulating too much operational logic. Compose becomes much easier to scale when UI remains declarative and state management remains explicit.',
    ],
  },
  {
    id: 'core-interoperability',
    title: 'View System Interoperability',
    paragraphs: [
      'Compose is designed to interoperate with the existing Android View system. That means teams can embed Compose in existing screens or embed Views inside Compose where older widgets, libraries, or platform requirements still make that practical.',
      'This interoperability is important for real migration work. Mature Android apps rarely get permission to rewrite every screen at once. Compose is practical partly because it allows incremental adoption without demanding a total reset of the application.',
    ],
  },
  {
    id: 'core-adaptive-performance',
    title: 'Adaptive UI and Performance',
    paragraphs: [
      'Compose is increasingly tied to adaptive UI guidance across phone, tablet, foldable, desktop-style window sizes, and other Android form factors. The framework is well suited to building responsive Android UIs, but teams still need explicit layout decisions rather than assuming a phone screen stretched wider is sufficient.',
      'Performance work in Compose usually concerns recomposition boundaries, expensive calculations during composition, unstable parameters, list rendering, image handling, and layout cost. The rule is the same as in other UI systems: measure real bottlenecks, then simplify the state and composition path causing them.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic',
    title: 'Basic Composable State',
    description: [
      'This is the everyday Compose pattern: local state remembered in the composable, UI derived from that state, and updates routed through explicit events.',
    ],
    code: `@Composable
fun CounterCard() {
    var count by remember { mutableStateOf(0) }

    Column(modifier = Modifier.padding(16.dp)) {
        Text(text = "Count: $count")
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}`,
    notes: [
      'State lives close to the UI when it is truly local and ephemeral.',
      'The composable describes output rather than mutating view instances directly.',
    ],
  },
  {
    id: 'examples-state-hoisting',
    title: 'State Hoisting',
    description: [
      'When multiple composables need shared control over a value, Android guidance recommends hoisting that state upward and passing data and events explicitly.',
    ],
    code: `@Composable
fun SearchScreen(query: String, onQueryChange: (String) -> Unit) {
    TextField(
        value = query,
        onValueChange = onQueryChange,
        label = { Text("Search") }
    )
}`,
    notes: [
      'The screen no longer owns the query directly.',
      'This pattern makes previews, testing, and ViewModel integration cleaner.',
    ],
  },
  {
    id: 'examples-lazy-list',
    title: 'Lazy Lists',
    description: [
      'LazyColumn and related APIs are core tools for scalable scrolling content in Compose.',
    ],
    code: `@Composable
fun MessageList(messages: List<String>) {
    LazyColumn {
        items(messages) { message ->
            Text(
                text = message,
                modifier = Modifier.padding(12.dp)
            )
        }
    }
}`,
    notes: [
      'Lazy lists avoid eagerly composing everything at once.',
      'Stable item identity still matters when list state and animations become more complex.',
    ],
  },
  {
    id: 'examples-view-interop',
    title: 'View Interoperability',
    description: [
      'Compose can embed an Android View when migration or specialized widgets make that the right boundary.',
    ],
    code: `@Composable
fun LegacyMapView() {
    AndroidView(
        factory = { context -> android.view.View(context) }
    )
}`,
    notes: [
      'Interop is normal in real migrations.',
      'Use it deliberately rather than mixing UI systems without ownership boundaries.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Compose Terms',
    terms: [
      {
        term: 'Jetpack Compose',
        definition: 'Androids modern declarative UI toolkit built for Kotlin.',
      },
      {
        term: 'Composable',
        definition: 'A function annotated with @Composable that emits UI.',
      },
      {
        term: 'remember',
        definition: 'A Compose API used to retain local state across recompositions.',
      },
      {
        term: 'Modifier',
        definition: 'A chained configuration mechanism for layout, drawing, input, and semantics.',
      },
      {
        term: 'Recomposition',
        definition:
          'The process of re-running parts of the composable tree when observed state changes.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture Terms',
    terms: [
      {
        term: 'State hoisting',
        definition:
          'Moving state ownership upward so multiple composables can coordinate around a single source of truth.',
      },
      {
        term: 'Unidirectional data flow',
        definition: 'A pattern where state flows down into UI and events flow upward out of UI.',
      },
      {
        term: 'ViewModel',
        definition: 'A lifecycle-aware state holder commonly used to back Compose screens.',
      },
      {
        term: 'Navigation Compose',
        definition: 'The Jetpack navigation library integration for Compose-based screens.',
      },
      {
        term: 'AndroidView',
        definition: 'A Compose interop API for embedding an existing Android View in Compose UI.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Workflow Terms',
    terms: [
      {
        term: 'Preview',
        definition:
          'An Android Studio feature for inspecting composables without launching the full app.',
      },
      {
        term: 'LazyColumn',
        definition: 'A vertically scrolling list container that composes content lazily.',
      },
      {
        term: 'Adaptive UI',
        definition:
          'A layout strategy that responds intentionally to different window sizes and device classes.',
      },
      {
        term: 'State holder',
        definition: 'An object or layer responsible for owning and exposing state used by UI.',
      },
      {
        term: 'Interop',
        definition: 'The boundary where Compose and the older View system work together.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why Compose Matters' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-production-reality', label: 'Production Reality' },
  ],
  'core-concepts': [
    { id: 'core-composables', label: 'Composable Model' },
    { id: 'core-state', label: 'State and remember' },
    { id: 'core-state-hoisting', label: 'State Hoisting' },
    { id: 'core-recomposition', label: 'Recomposition' },
    { id: 'core-modifiers-layout', label: 'Modifiers and Layout' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-viewmodel', label: 'ViewModel Integration' },
    { id: 'core-interoperability', label: 'View Interop' },
    { id: 'core-adaptive-performance', label: 'Adaptive UI and Performance' },
  ],
  examples: [
    { id: 'examples-basic', label: 'Basic State' },
    { id: 'examples-state-hoisting', label: 'State Hoisting' },
    { id: 'examples-lazy-list', label: 'Lazy Lists' },
    { id: 'examples-view-interop', label: 'View Interop' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
    { id: 'glossary-operations', label: 'Workflow Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="compose-help-section">
      <h2 className="compose-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="compose-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="compose-help-section">
      <h2 className="compose-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="compose-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="compose-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="compose-help-section">
      <h2 className="compose-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="compose-help-divider" />}
    </section>
  )
}

export default function JetpackComposePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Jetpack Compose',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Jetpack Compose"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Jetpack Compose</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
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

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
