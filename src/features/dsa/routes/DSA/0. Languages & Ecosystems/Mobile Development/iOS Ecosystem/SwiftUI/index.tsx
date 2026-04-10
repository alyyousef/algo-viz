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
  "SwiftUI is Apple's declarative user-interface framework for building apps across Apple platforms with Swift. Apple positions it as one set of APIs and tools for interfaces on iPhone, iPad, Mac, Apple Watch, Apple TV, and visionOS-class experiences, while still allowing UIKit and AppKit interoperation when a codebase needs lower-level or legacy platform views.",
  'The central idea is that the interface is a function of state. Instead of imperatively mutating labels, stacks, navigation controllers, and animations every time data changes, a SwiftUI view describes the UI for the current state and lets the framework reconcile the rendered result. This changes the job of UI code from issuing commands to declaring relationships.',
  'That shift is architectural, not cosmetic. SwiftUI changes how teams think about ownership of state, propagation of shared data, view identity, navigation, environment values, animation, previews, and compatibility with older Apple UI frameworks. Teams that approach it as UIKit with different syntax tend to fight the framework; teams that embrace its data-flow model usually get far better results.',
  'As of April 3, 2026, SwiftUI remains a current first-party Apple framework and a central part of Apple-platform application development. Architecture choices should therefore be made against current Apple documentation and current platform targets, not against early SwiftUI-era assumptions that treated it as too immature for serious production work.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      "SwiftUI is Apple's modern declarative UI framework. Apple frames it as a way to build interfaces across Apple platforms with one set of tools, and that framing matters because SwiftUI is both a coding model and a platform strategy.",
      'The key architectural point is that SwiftUI is state-driven. A view describes what should appear for current state, and the framework recalculates the interface when that state changes. That is fundamentally different from imperative UI systems where developers manually keep individual controls, layout, and navigation state synchronized.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why SwiftUI Matters',
    paragraphs: [
      "SwiftUI matters because it is Apple's preferred direction for modern app UI development. It gives Apple-platform teams one consistent mental model for composing screens, moving data through a hierarchy, handling navigation, animating changes, and aligning with platform behavior.",
      'It also matters because it is not only for greenfield apps. Apple explicitly supports adoption alongside UIKit and AppKit, which makes SwiftUI relevant for incremental modernization and mixed-framework codebases rather than only for brand-new applications.',
    ],
    bullets: [
      'Declarative UI reduces a large amount of repetitive mutation code.',
      'One framework spans multiple Apple platforms.',
      'Interop with UIKit and AppKit supports phased adoption.',
      'State-driven design encourages clearer data ownership.',
    ],
  },
  {
    id: 'bp-platform-scope',
    title: 'Platform Scope',
    paragraphs: [
      'SwiftUI is broader than iOS alone, even if many teams meet it first on iPhone projects. Apple presents it as a multi-platform framework spanning iOS, iPadOS, macOS, watchOS, tvOS, and visionOS development paths. That breadth shapes its APIs because controls, navigation, focus, environment values, and presentation rules need to work across very different device classes.',
      'That does not mean every screen should be identical everywhere. SwiftUI gives a common framework surface, but strong products still adapt to platform-specific density, navigation patterns, input modes, windowing behavior, and presentation expectations.',
    ],
  },
  {
    id: 'bp-interoperability',
    title: 'Interoperability',
    paragraphs: [
      'Apple emphasizes that SwiftUI works alongside UIKit and AppKit. This is strategically important because it lets a team adopt SwiftUI without rewriting an entire application. A new feature can be built in SwiftUI, and older platform views can remain in UIKit or AppKit where necessary.',
      'This interop story is one of the main reasons SwiftUI is practical in production. Real codebases contain older screens, third-party SDK constraints, platform-specific controls, and migration sequencing concerns. A framework with no interop path would be much harder to adopt seriously.',
    ],
  },
  {
    id: 'bp-decision-frame',
    title: 'Decision Frame',
    paragraphs: [
      'The real question is not whether SwiftUI can render buttons, lists, forms, and navigation. It can. The important questions are whether the team understands declarative state management, whether the product benefits from Apple-first UI architecture, how much UIKit or AppKit interop is required, and whether Apple-platform depth is strategically important enough to justify going all-in on SwiftUI.',
      'SwiftUI is strongest when the team accepts its model instead of fighting it. It usually disappoints only when developers try to reproduce imperative controller habits inside a declarative framework.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-declarative-model',
    title: 'Declarative Model',
    paragraphs: [
      'Apple describes SwiftUI in declarative terms: write the result you want, not the step-by-step instructions for getting there. In practice, that means a view describes the interface for current state instead of issuing update commands to individual controls whenever the model changes.',
      'This changes code organization substantially. The `body` becomes a state-derived UI description, while ownership of mutable data, side effects, and navigation moves into explicit data-flow structures. That is why SwiftUI code reads more like composition and less like controller orchestration.',
    ],
  },
  {
    id: 'core-view-composition',
    title: 'Views, Composition, and Identity',
    paragraphs: [
      'In SwiftUI, everything starts from values conforming to `View`. Larger screens are built by composing smaller view values, which makes decomposition and reuse much more natural than controller-heavy UI designs that centralize too much behavior in one object.',
      'Identity matters because SwiftUI decides how to preserve state, animate changes, and reconcile collections based on view identity and data identity. Lists, `ForEach`, and conditional branches behave best when the underlying data has stable identity and the tree structure reflects deliberate design rather than incidental code shape.',
    ],
  },
  {
    id: 'core-state-binding',
    title: 'State and Binding',
    paragraphs: [
      'Apple documents `State` as a source of truth for a value stored by SwiftUI within an app, scene, or view hierarchy. The practical rule is straightforward: view-owned mutable state lives in `@State`, and child views that need to edit it receive a `Binding` rather than their own disconnected copy.',
      'This pattern is central to SwiftUI architecture. When teams get state ownership wrong, they create duplicate truth sources, stale values, and confusing update behavior. When they keep ownership at the right level and pass bindings intentionally, the framework becomes much easier to reason about.',
    ],
    bullets: [
      'Use @State for local mutable view-owned state.',
      'Use @Binding when a child edits state owned elsewhere.',
      'Avoid duplicating the same logical state in multiple places.',
      'Treat state ownership as an architectural decision, not a syntax detail.',
    ],
  },
  {
    id: 'core-observable-data',
    title: 'Observable Data and Environment',
    paragraphs: [
      'Beyond local state, SwiftUI supports observable models and environment propagation. Apple documents `environmentObject` as a way to supply an observable object to a view hierarchy, and the environment system more generally carries values such as locale, color scheme, scene phase, and other contextual information through the tree.',
      'This is powerful but easy to overuse. Environment-based data is excellent for truly broad dependencies and contextual values, but teams still need discipline around ownership and discoverability. If too much becomes implicit environment state, the codebase gets harder to trace and reason about.',
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation',
    paragraphs: [
      'Modern SwiftUI navigation centers on `NavigationStack` and related destination APIs. Apple documents `NavigationStack` as a container that shows a root view and enables presentation of additional destinations, with navigation driven by links, values, or a bound navigation path for programmatic control.',
      'This matters because SwiftUI navigation is data-driven. Instead of only pushing view controllers imperatively, you can associate destinations with values and let navigation reflect application state. That supports restoration, deep linking, and clearer programmatic navigation models.',
    ],
  },
  {
    id: 'core-layout-styling',
    title: 'Layout, Styling, and Platform Adaptation',
    paragraphs: [
      'SwiftUI layout is built from composition primitives such as stacks, grids, spacers, frames, alignment guides, and modifiers. Standard controls also adopt platform-appropriate behavior and styling, which is one reason the same declarative code can often feel natural across multiple Apple device families.',
      'That does not remove the need for design judgment. A layout that is acceptable on iPhone may be poor on iPad or Mac if it merely stretches. SwiftUI helps with adaptation, but strong applications still treat platform differences as a product-design concern rather than assuming the framework will solve them automatically.',
    ],
  },
  {
    id: 'core-animation',
    title: 'Animation and Transitions',
    paragraphs: [
      'Apple presents animation as a natural extension of state-driven UI. In SwiftUI, state changes can drive transitions and animated layout updates instead of forcing developers to hand-author every intermediate mutation step.',
      'That fits the declarative model well, but the engineering discipline remains the same as anywhere else: animate meaningful changes, keep transitions coherent, and avoid turning every state update into noise. SwiftUI makes animation easier to express, not automatically good.',
    ],
  },
  {
    id: 'core-lists-data',
    title: 'Lists, Collections, and Data-Driven UI',
    paragraphs: [
      'A large amount of real SwiftUI work involves lists, sections, search, filtering, and collection-driven screens. These features depend heavily on stable data identity and predictable state updates because SwiftUI needs to reconcile changing collections correctly over time.',
      'This is one reason data modeling matters so much. A list built on unstable identifiers or accidental value churn can produce poor animations, lost state, and difficult-to-explain refresh behavior. Collection views in SwiftUI are easiest to maintain when the data model is explicit and stable.',
    ],
  },
  {
    id: 'core-concurrency-lifecycle',
    title: 'Concurrency and View Lifecycle',
    paragraphs: [
      'Modern SwiftUI work often intersects with Swift concurrency through `task`, asynchronous loading, and cancellation-aware view behavior. This matters because views can appear, disappear, and rebuild as state changes, so asynchronous work needs to respect lifecycle and ownership.',
      'The important rule is to align async work with the lifetime of the view or model that owns it. Network requests, refresh behavior, and side effects should not be scattered carelessly across view code without thought about cancellation, duplication, or who owns the result.',
    ],
  },
  {
    id: 'core-previews-testing',
    title: 'Previews, Testing, and Workflow',
    paragraphs: [
      'SwiftUI is tightly connected to the Xcode workflow, especially previews, simulator runs, device testing, and iterative UI development. Previews shorten feedback loops considerably, but they are not a substitute for full runtime validation. Device behavior, keyboard handling, focus, scene transitions, accessibility, and integration behavior still require broader testing.',
      'Teams usually get the most value when previews are used for rapid UI-state inspection while logic-heavy behavior continues to be covered by unit tests, integration tests, and real-device validation of complete app flows.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Practical Limits',
    paragraphs: [
      'SwiftUI is productive, but it is not beyond performance problems. Real bottlenecks come from unstable identity, expensive body recomputation patterns, overgrown view trees, excessive observable churn, and heavy work embedded directly in view construction.',
      'The practical rule is to measure concrete problems instead of arguing from reputation. SwiftUI is not automatically slow, and it is not automatically free because the syntax is concise. Stable identity, bounded updates, clean ownership, and selective interop still matter in large production codebases.',
    ],
  },
  {
    id: 'core-uikit-appkit',
    title: 'UIKit and AppKit Interop',
    paragraphs: [
      'Interop is not a fallback of shame. Apple explicitly recommends adopting SwiftUI at your own pace and mixing it with UIKit or AppKit where necessary. That means legacy screens, specialized controls, and SDK-specific integrations can remain in older frameworks while newer features move to SwiftUI.',
      'The engineering habit that matters is deliberate boundary design. Use interop to solve concrete platform needs or migration sequencing, not to create an incoherent blend of frameworks without clear ownership.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic-state',
    title: 'Local State with Binding',
    description: [
      'This is the core SwiftUI ownership pattern: a parent view owns local mutable state and passes a binding to children that need to edit that same source of truth.',
    ],
    code: `struct PlayerView: View {
    @State private var isPlaying = false

    var body: some View {
        VStack {
            PlayButton(isPlaying: $isPlaying)
            Text(isPlaying ? "Playing" : "Paused")
        }
    }
}

struct PlayButton: View {
    @Binding var isPlaying: Bool

    var body: some View {
        Button(isPlaying ? "Pause" : "Play") {
            isPlaying.toggle()
        }
    }
}`,
    notes: [
      'The parent owns the source of truth.',
      'The child receives a binding rather than duplicating state.',
      'This pattern scales well when state ownership is explicit.',
    ],
  },
  {
    id: 'examples-navigation',
    title: 'NavigationStack with Data Destinations',
    description: [
      'Modern SwiftUI navigation is type- and data-driven. Destinations can be associated with values instead of only imperative push operations.',
    ],
    code: `struct Park: Hashable {
    let name: String
}

struct ContentView: View {
    let parks = [Park(name: "Yosemite"), Park(name: "Sequoia")]

    var body: some View {
        NavigationStack {
            List(parks, id: \\.self) { park in
                NavigationLink(park.name, value: park)
            }
            .navigationDestination(for: Park.self) { park in
                Text(park.name)
            }
        }
    }
}`,
    notes: [
      'Navigation state is tied to values, not only imperative push calls.',
      'This pattern supports restoration and deep-link strategies more naturally.',
    ],
  },
  {
    id: 'examples-environment',
    title: 'Environment Object',
    description: [
      'Environment propagation is useful for shared model access when the dependency is broad enough that manual prop passing would become noisy.',
    ],
    code: `final class SessionStore: ObservableObject {
    @Published var username = "guest"
}

struct RootView: View {
    @StateObject private var session = SessionStore()

    var body: some View {
        DashboardView()
            .environmentObject(session)
    }
}

struct DashboardView: View {
    @EnvironmentObject private var session: SessionStore

    var body: some View {
        Text(session.username)
    }
}`,
    notes: [
      'EnvironmentObject reduces wiring for broad app state.',
      'It should be used intentionally, not as a shortcut for every dependency.',
    ],
  },
  {
    id: 'examples-observable-model',
    title: 'Observable Model Owned by a View',
    description: [
      'A view often owns a long-lived reference-type model and exposes its published state into the UI.',
    ],
    code: `final class DownloadStore: ObservableObject {
    @Published var status = "Idle"

    func start() {
        status = "Downloading"
    }
}

struct DownloadView: View {
    @StateObject private var store = DownloadStore()

    var body: some View {
        VStack {
            Text(store.status)
            Button("Start") { store.start() }
        }
    }
}`,
    notes: [
      'Reference-type models are useful when state is larger than a small local value.',
      'The owning view creates the model and updates automatically when published values change.',
    ],
  },
  {
    id: 'examples-uikit-interop',
    title: 'UIKit Interop Boundary',
    description: [
      'SwiftUI can live inside older UIKit-based applications or wrap UIKit-based elements when migration is incremental.',
    ],
    code: `import SwiftUI
import UIKit

struct LegacyWrapper: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        UIViewController()
    }

    func updateUIViewController(_ controller: UIViewController, context: Context) {
    }
}`,
    notes: [
      'Interop is normal in real production migrations.',
      'Keep the framework boundary explicit so ownership remains clear.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core SwiftUI Terms',
    terms: [
      {
        term: 'SwiftUI',
        definition:
          'Apples declarative UI framework for building apps across Apple platforms with Swift.',
      },
      {
        term: 'View',
        definition: 'The fundamental SwiftUI protocol representing a piece of user interface.',
      },
      {
        term: 'State',
        definition: 'Locally owned mutable state that SwiftUI stores and observes for updates.',
      },
      {
        term: 'Binding',
        definition: 'A read-write connection to state owned somewhere else.',
      },
      {
        term: 'NavigationStack',
        definition:
          'A SwiftUI navigation container that presents additional views over a root view.',
      },
      {
        term: 'StateObject',
        definition:
          'A property wrapper used when a view owns the lifecycle of an observable reference-type model.',
      },
    ],
  },
  {
    id: 'glossary-dataflow',
    title: 'Data Flow Terms',
    terms: [
      {
        term: 'Environment',
        definition:
          'A propagated context carrying system values or app-provided values through the view hierarchy.',
      },
      {
        term: 'EnvironmentObject',
        definition: 'An observable object supplied to a hierarchy through the environment.',
      },
      {
        term: 'ObservableObject',
        definition: 'A reference-type model that publishes changes for SwiftUI to react to.',
      },
      {
        term: 'Identity',
        definition:
          'The stable notion SwiftUI uses to reconcile and preserve view state across updates.',
      },
      {
        term: 'Body',
        definition: 'The computed description of a SwiftUI views current UI.',
      },
      {
        term: 'Path',
        definition:
          'Navigation state data that can drive programmatic navigation in a NavigationStack.',
      },
    ],
  },
  {
    id: 'glossary-workflow',
    title: 'Workflow and Interop Terms',
    terms: [
      {
        term: 'Preview',
        definition: 'An Xcode-driven SwiftUI development view for fast UI iteration.',
      },
      {
        term: 'Modifier',
        definition: 'A function-like transformation that configures or wraps a SwiftUI view.',
      },
      {
        term: 'task',
        definition:
          'A SwiftUI view modifier commonly used to start asynchronous work tied to a views lifecycle.',
      },
      {
        term: 'UIViewControllerRepresentable',
        definition: 'A protocol that wraps a UIKit view controller for use in SwiftUI.',
      },
      {
        term: 'AppKit',
        definition: 'The traditional macOS UI framework that SwiftUI can interoperate with.',
      },
      {
        term: 'UIKit',
        definition:
          'The traditional iOS and iPadOS UI framework that SwiftUI can interoperate with.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why SwiftUI Matters' },
    { id: 'bp-platform-scope', label: 'Platform Scope' },
    { id: 'bp-interoperability', label: 'Interoperability' },
    { id: 'bp-decision-frame', label: 'Decision Frame' },
  ],
  'core-concepts': [
    { id: 'core-declarative-model', label: 'Declarative Model' },
    { id: 'core-view-composition', label: 'Views and Identity' },
    { id: 'core-state-binding', label: 'State and Binding' },
    { id: 'core-observable-data', label: 'Observable Data' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-layout-styling', label: 'Layout and Styling' },
    { id: 'core-animation', label: 'Animation' },
    { id: 'core-lists-data', label: 'Lists and Data' },
    { id: 'core-concurrency-lifecycle', label: 'Concurrency' },
    { id: 'core-previews-testing', label: 'Previews and Testing' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-uikit-appkit', label: 'UIKit and AppKit' },
  ],
  examples: [
    { id: 'examples-basic-state', label: 'State and Binding' },
    { id: 'examples-navigation', label: 'NavigationStack' },
    { id: 'examples-environment', label: 'Environment Object' },
    { id: 'examples-observable-model', label: 'Observable Model' },
    { id: 'examples-uikit-interop', label: 'UIKit Interop' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-dataflow', label: 'Data Flow Terms' },
    { id: 'glossary-workflow', label: 'Workflow Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swiftui-help-section">
      <h2 className="swiftui-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="swiftui-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swiftui-help-section">
      <h2 className="swiftui-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="swiftui-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="swiftui-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swiftui-help-section">
      <h2 className="swiftui-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="swiftui-help-divider" />}
    </section>
  )
}

export default function SwiftUIPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'SwiftUI',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="SwiftUI"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">SwiftUI</h1>
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
