import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'SwiftUI and Jetpack Compose are both declarative native UI frameworks, but they belong to different platform ecosystems. SwiftUI is Apple\'s declarative UI framework for building apps across Apple platforms with Swift. Jetpack Compose is Android\'s declarative UI toolkit for building native Android UI with Kotlin.',
      'That means the real comparison is not exactly which one is better in the abstract. They are not competing for the same platform slot. The more useful question is how each framework approaches declarative UI, state, previews, composition, and platform integration inside its own ecosystem.',
      'The original page scope was placeholder content for SwiftUI vs Jetpack Compose, with planned notes on overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs. This help-style version keeps that scope and expands it into a fuller reference page.',
    ],
  },
  {
    id: 'bp-swiftui',
    title: 'When SwiftUI Fits Better',
    paragraphs: [
      'SwiftUI is the natural fit when the target is Apple platforms and the team wants a modern declarative UI framework tightly integrated with Swift, Xcode previews, Apple platform conventions, and the broader SwiftUI data-flow model built around state, bindings, environment, and observation.',
      'It is especially compelling when the team wants one native declarative framework that can reach iPhone, iPad, Mac, Apple Watch, and other Apple surfaces without dropping into older imperative UI patterns except where necessary.',
    ],
  },
  {
    id: 'bp-compose',
    title: 'When Jetpack Compose Fits Better',
    paragraphs: [
      'Jetpack Compose is the natural fit when the target is Android and the team wants a modern declarative Kotlin-first UI model tightly integrated with Android development tools, state hoisting patterns, ViewModel-based architecture, and the broader Jetpack ecosystem.',
      'It is especially attractive for Android teams that want to move away from XML-driven UI and toward a more code-centric declarative model that composes naturally with Kotlin language features and Android architecture guidance.',
    ],
  },
  {
    id: 'bp-same-idea',
    title: 'Same Idea, Different Ecosystem',
    paragraphs: [
      'Both frameworks are declarative and both are designed so UI is a function of state. Both provide previews, composable or reusable UI building blocks, animation support, and strong integration with their native platform tooling.',
      'The bigger difference is cultural and ecosystem-specific. SwiftUI lives in Apple\'s unified hardware and OS family. Jetpack Compose lives in Android\'s Kotlin and Jetpack ecosystem. Teams do not usually choose one instead of the other for the same target. They choose one because they are already in that platform world.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to compare them as if they are direct cross-platform rivals. In practice, SwiftUI is mainly an Apple-native choice and Jetpack Compose is mainly an Android-native choice. The more meaningful comparison is how each helps developers think declaratively on its own platform.',
      'Another mistake is to treat declarative syntax as the whole story. State propagation, previews, lifecycle integration, platform escape hatches, and architectural guidance matter just as much as the surface syntax of a Text or Button call.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose SwiftUI when you are building native Apple-platform apps and want a declarative Swift-first UI stack.',
      'Choose Jetpack Compose when you are building native Android apps and want a declarative Kotlin-first UI stack.',
      'The real value of this comparison is understanding how each framework expresses declarative UI and state, not pretending one replaces the other for the same platform target.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both frameworks are declarative, component-oriented, and state-driven. Developers describe what UI should look like for a given state, and the framework updates the screen when state changes.',
      'That shared foundation is important because both frameworks were designed to move their ecosystems away from older imperative UI models. The interesting comparison is how they implement that idea, not whether they both qualify as declarative.',
    ],
  },
  {
    id: 'core-language',
    title: 'Language and Syntax',
    paragraphs: [
      'SwiftUI is deeply tied to Swift language features such as property wrappers, result builders, and modern observation patterns. Its syntax often feels compact and expressive to teams already comfortable with Swift and Apple platform conventions.',
      'Jetpack Compose is deeply tied to Kotlin. Composable functions, named parameters, default arguments, and Kotlin\'s expressive syntax all contribute to a UI model that feels natural inside Android-first Kotlin development.',
    ],
  },
  {
    id: 'core-state',
    title: 'State Model',
    paragraphs: [
      'SwiftUI relies on data-flow concepts such as State, Binding, Environment, and observable models. Apple guidance emphasizes placing state at the least common ancestor that needs it and using bindings to preserve a single source of truth through the view hierarchy.',
      'Jetpack Compose relies on remember, mutable state, state hoisting, and architecture patterns that often pair UI state with ViewModel-backed state holders. Compose guidance strongly emphasizes that state drives UI and that hoisting state improves reuse and testability.',
    ],
  },
  {
    id: 'core-recomposition',
    title: 'Updates and Recomposition',
    paragraphs: [
      'SwiftUI observes data dependencies and refreshes affected parts of the interface when state changes. Much of the developer experience is built around trusting the framework to reconcile view updates from state changes without hand-authoring imperative view-controller logic.',
      'Jetpack Compose tracks state reads and triggers recomposition when the relevant state changes. Compose documentation and tooling are explicit about recomposition behavior, state reads, and how to structure composables so recomposition remains efficient and predictable.',
    ],
  },
  {
    id: 'core-previews',
    title: 'Previews and Iteration Workflow',
    paragraphs: [
      'SwiftUI has a strong preview workflow in Xcode. Apple emphasizes previews as part of the development loop, letting developers iterate on views and states without always running the full app on a simulator or device.',
      'Jetpack Compose also has powerful preview support in Android Studio. Compose previews, layout inspection, and state-driven preview patterns make iterative UI work much faster than traditional XML-plus-run-cycle Android workflows.',
    ],
  },
  {
    id: 'core-platform',
    title: 'Platform Integration',
    paragraphs: [
      'SwiftUI is tightly integrated with Apple platform conventions and can be adopted incrementally alongside UIKit and AppKit. That makes it practical both for new apps and for gradually modernizing existing Apple codebases.',
      'Jetpack Compose is tightly integrated with Android and the Jetpack ecosystem, and can coexist with existing View-based UIs where needed. This incremental adoption path matters because many Android teams modernize screen by screen rather than rewriting entire apps at once.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture Guidance',
    paragraphs: [
      'SwiftUI feels relatively high-level and idiomatic inside Apple platform app design. The framework strongly encourages declarative data flow and reusable view composition, with app architecture often shaped around observable models and environment-driven dependency sharing.',
      'Jetpack Compose is often used within clearer Android architectural guidance around state holders, ViewModels, unidirectional data flow, and state hoisting. This can make the Android architecture story feel more explicitly documented and layered in Compose-centric codebases.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing and Debugging',
    paragraphs: [
      'SwiftUI testing benefits from preview-based iteration, view decomposition, and a declarative structure that can reduce glue code. The framework is strongest when the UI remains a clean reflection of well-structured state.',
      'Jetpack Compose has a strong UI-testing story and explicit guidance around synchronized tests, previewability, and state-driven component design. Compose\'s documentation is especially direct about how testability improves when state is hoisted and composables remain pure.',
    ],
  },
  {
    id: 'core-learning',
    title: 'Learning Curve and Team Fit',
    paragraphs: [
      'SwiftUI is easiest for teams already comfortable with Swift and Apple development. It can feel unusual at first to developers coming from imperative UIKit backgrounds, but its mental model becomes very productive once state and binding patterns click.',
      'Jetpack Compose is easiest for teams already comfortable with Kotlin and Android development. It can feel like a major upgrade over XML-heavy UI authoring, but it still rewards developers who understand Android architecture, state ownership, and Kotlin idioms.',
    ],
  },
  {
    id: 'core-scope',
    title: 'Cross-Platform Scope',
    paragraphs: [
      'SwiftUI spans Apple platforms, which is a major advantage inside the Apple ecosystem. The same conceptual framework can target multiple Apple device families even though platform-specific adaptation is still important.',
      'Jetpack Compose is fundamentally an Android UI toolkit in this comparison. Compose Multiplatform exists as a broader adjacent story, but Jetpack Compose itself is best understood here as Android-native UI rather than as a direct Apple-platform competitor.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward SwiftUI when the product lives in Apple\'s ecosystem and the team wants a modern declarative native stack across Apple platforms.',
      'Lean toward Jetpack Compose when the product lives in Android\'s ecosystem and the team wants a Kotlin-first declarative UI model with strong Android architecture alignment.',
      'This comparison is usually not about replacement. It is about learning how the two leading native declarative UI frameworks solve similar problems inside very different platform ecosystems.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-counter',
    title: 'Basic Counter View',
    description:
      'The core declarative idea looks similar in both frameworks: state changes, and the UI reflects the new state.',
    snippets: [
      {
        label: 'SwiftUI',
        code: `struct CounterView: View {
  @State private var count = 0

  var body: some View {
    Button("Count: \\(count)") {
      count += 1
    }
  }
}`,
      },
      {
        label: 'Jetpack Compose',
        code: `@Composable
fun CounterView() {
  var count by remember { mutableIntStateOf(0) }

  Button(onClick = { count++ }) {
    Text("Count: $count")
  }
}`,
      },
    ],
    takeaway:
      'Both frameworks express UI as a function of state, but the surrounding language and state primitives differ in idiomatic feel.',
  },
  {
    id: 'examples-state-flow',
    title: 'Parent-to-Child State Sharing',
    description:
      'Both frameworks encourage a single source of truth passed downward, but they name the patterns differently.',
    snippets: [
      {
        label: 'SwiftUI',
        code: `struct ParentView: View {
  @State private var isOn = false

  var body: some View {
    ToggleView(isOn: $isOn)
  }
}

struct ToggleView: View {
  @Binding var isOn: Bool
}`,
      },
      {
        label: 'Jetpack Compose',
        code: `@Composable
fun ParentView() {
  var isOn by remember { mutableStateOf(false) }
  ToggleView(isOn = isOn, onToggle = { isOn = it })
}

@Composable
fun ToggleView(isOn: Boolean, onToggle: (Boolean) -> Unit)`,
      },
    ],
    takeaway:
      'SwiftUI leans on bindings. Compose leans on state hoisting with value-plus-callback patterns.',
  },
  {
    id: 'examples-preview',
    title: 'Preview Workflow',
    description:
      'Both toolkits emphasize preview-driven iteration as part of normal UI development.',
    snippets: [
      {
        label: 'SwiftUI',
        code: `#Preview {
  CounterView()
}`,
      },
      {
        label: 'Jetpack Compose',
        code: `@Preview
@Composable
fun CounterPreview() {
  CounterView()
}`,
      },
    ],
    takeaway:
      'Fast iteration is a first-class part of both frameworks, not just an optional extra.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short prompt keeps the comparison tied to platform context rather than forcing a false one-winner narrative.',
    snippets: [
      {
        label: 'SwiftUI Rule',
        code: `If the app is Apple-native
and the team wants one declarative UI model
across Apple platforms:
  choose SwiftUI`,
      },
      {
        label: 'Jetpack Compose Rule',
        code: `If the app is Android-native
and the team wants a Kotlin-first
declarative Android UI stack:
  choose Jetpack Compose`,
      },
    ],
    takeaway:
      'The useful comparison is not replacement. It is understanding how declarative native UI differs across Apple and Android ecosystems.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  { term: 'Declarative UI', definition: 'A UI approach where developers describe what the interface should look like for a given state instead of manually mutating widgets step by step.' },
  { term: 'State', definition: 'Mutable data that drives what the UI shows at a given moment.' },
  { term: 'Binding', definition: 'A SwiftUI two-way reference to state owned elsewhere in the view hierarchy.' },
  { term: 'State Hoisting', definition: 'A Compose pattern where state is moved up to the caller and passed down with callbacks.' },
  { term: 'Recomposition', definition: 'Jetpack Compose re-executing composables when tracked state changes.' },
  { term: 'Property Wrapper', definition: 'A Swift language feature used by SwiftUI for wrappers such as State and Binding.' },
  { term: 'Composable', definition: 'A Kotlin function annotated with Composable that emits UI in Jetpack Compose.' },
  { term: 'Environment', definition: 'A SwiftUI mechanism for sharing values and dependencies through the view hierarchy.' },
  { term: 'ViewModel', definition: 'An Android architecture component commonly used with Compose to hold UI state outside composables.' },
  { term: 'Preview', definition: 'A development-time rendering of UI used to iterate without launching the full app.' },
  { term: 'Observation', definition: 'SwiftUI\'s modern model-data tracking system used to update views when observable data changes.' },
  { term: 'remember', definition: 'A Compose API for keeping state or objects across recompositions within a composable.' },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const helpStyles = `
.swiftui-compose-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.swiftui-compose-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.swiftui-compose-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.swiftui-compose-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.swiftui-compose-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.swiftui-compose-help-control {
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
  color: #000000;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
}

.swiftui-compose-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.swiftui-compose-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.swiftui-compose-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.swiftui-compose-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.swiftui-compose-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.swiftui-compose-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.swiftui-compose-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.swiftui-compose-help-toc-list li {
  margin: 0 0 8px;
}

.swiftui-compose-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.swiftui-compose-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.swiftui-compose-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.swiftui-compose-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.swiftui-compose-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.swiftui-compose-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.swiftui-compose-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.swiftui-compose-help-content p,
.swiftui-compose-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.swiftui-compose-help-content p {
  margin: 0 0 10px;
}

.swiftui-compose-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.swiftui-compose-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.swiftui-compose-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.swiftui-compose-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .swiftui-compose-help-main {
    grid-template-columns: 1fr;
  }

  .swiftui-compose-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .swiftui-compose-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    padding-left: 4px;
    white-space: normal;
  }
}
`

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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function SwiftUiVsJetpackComposePage(): JSX.Element {
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
    document.title = `SwiftUI vs Jetpack Compose (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'SwiftUI vs Jetpack Compose',
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
    <div className="swiftui-compose-help-page">
      <style>{helpStyles}</style>
      <div className="swiftui-compose-help-window" role="presentation">
        <header className="swiftui-compose-help-titlebar">
          <span className="swiftui-compose-help-titletext">SwiftUI vs Jetpack Compose</span>
          <div className="swiftui-compose-help-controls">
            <button className="swiftui-compose-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="swiftui-compose-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="swiftui-compose-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`swiftui-compose-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="swiftui-compose-help-main">
          <aside className="swiftui-compose-help-toc" aria-label="Table of contents">
            <h2 className="swiftui-compose-help-toc-title">Contents</h2>
            <ul className="swiftui-compose-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="swiftui-compose-help-content">
            <h1 className="swiftui-compose-help-doc-title">SwiftUI vs Jetpack Compose</h1>
            <p className="swiftui-compose-help-doc-subtitle">
              Manual-style comparison of declarative native UI, state flow, previews, and Apple-versus-Android platform tradeoffs.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="swiftui-compose-help-section">
                    <h2 className="swiftui-compose-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="swiftui-compose-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="swiftui-compose-help-section">
                  <h2 className="swiftui-compose-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="swiftui-compose-help-section">
                  <h2 className="swiftui-compose-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="swiftui-compose-help-subheading">{snippet.label}</h3>
                      <div className="swiftui-compose-help-codebox">
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
              <section id="glossary-terms" className="swiftui-compose-help-section">
                <h2 className="swiftui-compose-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
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
