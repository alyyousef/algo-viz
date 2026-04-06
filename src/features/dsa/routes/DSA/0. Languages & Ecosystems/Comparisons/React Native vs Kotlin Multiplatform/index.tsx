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
      'React Native and Kotlin Multiplatform are both used to reduce duplicated mobile work, but they do not begin from the same abstraction. React Native is primarily a cross-platform application framework for building mobile UI with React and JavaScript or TypeScript. Kotlin Multiplatform is primarily a code-sharing approach for Kotlin projects that can share business logic and optionally more, while still allowing native platform code where needed.',
      'That means the real comparison is not simply JavaScript versus Kotlin. The more useful question is whether the product wants one cross-platform app framework centered around shared UI and React-based development, or whether it wants shared Kotlin code across Android and iOS while keeping a more native platform-oriented application structure.',
      'The original page scope was placeholder content for React Native vs Kotlin Multiplatform, with planned notes on overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs. This help-style version keeps that scope and expands it into a fuller reference.',
    ],
  },
  {
    id: 'bp-react-native',
    title: 'When React Native Fits Better',
    paragraphs: [
      'React Native is often the stronger fit when the team wants to ship one cross-platform mobile application layer using React skills, shared UI, shared state management, and a JavaScript or TypeScript-centric workflow. It is especially attractive for product teams already strong in React and web development who want to extend that talent into mobile without maintaining two completely separate native UI stacks.',
      'It is also often the better choice when UI sharing itself is a major economic win. If the team wants one component system, one frontend-heavy product surface, and a development model that resembles modern React application work, React Native often makes that path clearer.',
    ],
  },
  {
    id: 'bp-kmp',
    title: 'When Kotlin Multiplatform Fits Better',
    paragraphs: [
      'Kotlin Multiplatform is often the stronger fit when the product wants to share business logic, networking, state models, domain rules, data layers, or presentation logic while still keeping more native control over Android and iOS applications. It is particularly attractive in organizations with strong Android and Kotlin investment that want better reuse without fully abandoning native app structure.',
      'It is also compelling when the team sees shared UI as optional rather than mandatory. Kotlin Multiplatform can support shared logic with native UI, and modern tooling also allows shared UI through Compose Multiplatform, but the key point is flexibility: KMP does not force the same level of UI unification as React Native does.',
    ],
  },
  {
    id: 'bp-same-goal',
    title: 'Same Goal, Different Layer',
    paragraphs: [
      'Both approaches are responses to the cost of building for Android and iOS separately. But they attack duplication at different layers. React Native usually attacks duplication at the app framework and UI layer. Kotlin Multiplatform usually attacks duplication at the code-sharing layer and lets the team decide how far shared UI should go.',
      'That distinction matters because it changes team structure, architecture, testing strategy, platform ownership, and how much the product wants to feel like one app codebase versus two native apps sharing a substantial core.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to compare React Native to KMP as if they are symmetrical cross-platform UI frameworks. They are not. React Native is much more directly a cross-platform app framework. Kotlin Multiplatform is more fundamentally a shared-code architecture, with shared UI being optional rather than mandatory.',
      'Another mistake is to assume that native always means less productive or that cross-platform always means less native. In reality, both stacks have matured, and the better choice depends on where the organization wants to centralize reuse and how much native platform ownership it wants to preserve.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose React Native when shared UI, React-based product development, and one cross-platform mobile app codebase are the main goals.',
      'Choose Kotlin Multiplatform when shared business logic, native app structure, and flexible platform ownership are the main goals.',
      'If the team wants to share logic aggressively but still preserve native UI quality and platform-specific app architecture, Kotlin Multiplatform is often the cleaner match.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both technologies are used to reduce duplicated work across Android and iOS. Both can improve engineering efficiency, accelerate feature delivery, and reduce drift between platforms when used thoughtfully.',
      'That said, they reduce duplication in different ways. The key architectural decision is not only what code can be shared, but which layer of the product the team wants to standardize across platforms.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture and Mental Model',
    paragraphs: [
      'React Native presents itself as an application framework. You build mobile UI with React components, coordinate app state in JavaScript or TypeScript, and connect to native capabilities through libraries or native modules when needed. The app is commonly thought of as one cross-platform frontend application targeting mobile platforms.',
      'Kotlin Multiplatform presents itself as a multiplatform code-sharing system. You define common Kotlin code in shared source sets and keep platform-specific implementations where necessary. The app is often thought of as two native apps or multiple platform targets that share a core rather than as one universal UI-first codebase.',
    ],
  },
  {
    id: 'core-ui',
    title: 'UI Strategy',
    paragraphs: [
      'React Native is fundamentally about shared UI. Its value proposition is strongest when a significant portion of the product interface, interaction model, and component system is shared between Android and iOS.',
      'Kotlin Multiplatform does not require shared UI. A very common KMP approach is to share business logic while keeping Android UI in Jetpack Compose or Views and iOS UI in SwiftUI or UIKit. Shared UI is possible with Compose Multiplatform, but it is a separate strategic choice rather than the default premise of KMP itself.',
    ],
  },
  {
    id: 'core-native',
    title: 'Native Platform Access',
    paragraphs: [
      'React Native accesses native functionality through native modules, native components, and the surrounding ecosystem of libraries. This is powerful, but it means there is always a boundary between JavaScript application code and platform-native implementations when the app moves beyond the standard abstraction layer.',
      'Kotlin Multiplatform is generally closer to native mobile architecture. Shared Kotlin code can call into platform-specific implementations via multiplatform mechanisms such as expect and actual or ordinary abstractions, and the surrounding app structure often remains recognizably native on each platform.',
    ],
  },
  {
    id: 'core-team',
    title: 'Team Composition and Skills',
    paragraphs: [
      'React Native is especially attractive to teams with strong React, web, and TypeScript experience. It lets those teams move into mobile product development with a more familiar component and state-management model.',
      'Kotlin Multiplatform is especially attractive to organizations with significant Android and Kotlin strength, or to teams that value native app ownership but want to reduce duplication in domain logic, networking, persistence, and platform-agnostic layers.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and App Feel',
    paragraphs: [
      'React Native can deliver strong product results, but teams still need to think carefully about heavy animations, native integrations, performance-sensitive screens, startup behavior, and how third-party libraries align with the modern React Native architecture. Its performance story is strong when the app fits the framework and the stack is maintained well.',
      'Kotlin Multiplatform usually preserves more native app structure by default, which can make it a comfortable fit when the team wants native UI behavior and platform-specific optimization while still sharing core logic. The performance conversation is therefore often less about framework overhead and more about where shared code ends and native specialization begins.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Development Workflow',
    paragraphs: [
      'React Native development often feels like modern frontend work extended into mobile: JavaScript tooling, package management, Metro or framework tooling, React component patterns, and iterative UI development with fast feedback. It is appealing when the organization wants mobile development to resemble frontend engineering.',
      'Kotlin Multiplatform development feels closer to native mobile and Gradle-centered engineering. Shared modules, source sets, Kotlin tooling, Android Studio or IntelliJ support, native platform projects, and platform build chains remain part of the developer experience. It is often a better fit when the organization is comfortable with native mobile tooling already.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing and Layer Ownership',
    paragraphs: [
      'React Native centralizes more of the application behavior into one shared codebase, which can simplify some kinds of logic reuse and end-to-end feature parity. It also means the shared layer carries more product risk if the architecture becomes messy.',
      'Kotlin Multiplatform often encourages a cleaner split between shared domain or data layers and platform-specific UI. That can make tests at the shared logic layer especially valuable, while still allowing Android and iOS teams to validate UI behavior natively.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Platform Reach',
    paragraphs: [
      'React Native has a large ecosystem and is closely tied to the broader React and JavaScript world. Its surrounding momentum comes from frontend engineering, product UI, and mobile apps built by teams that want to stay close to the web-development talent pool.',
      'Kotlin Multiplatform sits closer to the Kotlin and native-mobile world. It is strongest when the organization sees Kotlin as strategic, wants to share more than just Android code conceptually, and is willing to think in multiplatform source sets rather than in a purely frontend-style app framework.',
    ],
  },
  {
    id: 'core-ownership',
    title: 'Platform Ownership and Product Strategy',
    paragraphs: [
      'React Native tends to pull ownership toward one shared app layer. That can be a major organizational benefit if the team wants centralization, but it can also create friction if iOS and Android teams need more autonomy over UI and platform conventions.',
      'Kotlin Multiplatform tends to preserve more platform ownership because teams can share exactly the parts that make sense and keep the rest native. For organizations with strong native practices and platform-specific product nuance, this is often a major advantage.',
    ],
  },
  {
    id: 'core-evolution',
    title: 'Long-Term Evolution',
    paragraphs: [
      'React Native has matured significantly, especially with the New Architecture becoming the default and then the only architecture in recent releases. That matters because many older critiques were shaped by older architectural assumptions and migration pain.',
      'Kotlin Multiplatform has also matured rapidly, with stronger tooling and clearer options for shared logic or shared UI through Compose Multiplatform. The important point is that KMP is not one rigid pattern. Teams can choose how much they share, which makes long-term architectural evolution more incremental.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward React Native if UI sharing is the primary economic win and the team is already strongest in React and JavaScript or TypeScript.',
      'Lean toward Kotlin Multiplatform if the app should remain structurally native while sharing domain logic, networking, state models, or other cross-platform core layers.',
      'If the main business need is one mobile frontend team and one UI layer, React Native often fits better. If the main business need is shared logic with native app ownership preserved, Kotlin Multiplatform often fits better.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-ui',
    title: 'Shared UI vs Shared Logic',
    description:
      'The first difference is where the shared code lives. React Native usually shares the screen itself. Kotlin Multiplatform usually shares the logic behind the screen, unless the team deliberately chooses shared UI.',
    snippets: [
      {
        label: 'React Native',
        code: `export function ProfileScreen() {
  const [name, setName] = useState('Ana')

  return (
    <View>
      <Text>{name}</Text>
      <Button title="Save" onPress={() => saveProfile(name)} />
    </View>
  )
}`,
      },
      {
        label: 'Kotlin Multiplatform',
        code: `class ProfilePresenter(
  private val repository: ProfileRepository,
) {
  suspend fun loadProfile(): ProfileState =
    repository.load().toState()
}

// Android and iOS can each render the UI natively
// while sharing the presenter and domain logic.`,
      },
    ],
    takeaway:
      'React Native usually centralizes UI and logic in one cross-platform layer. Kotlin Multiplatform often centralizes shared logic and leaves UI strategy open.',
  },
  {
    id: 'examples-native',
    title: 'Native Capability Boundary',
    description:
      'Both approaches can use native APIs, but the integration point feels different.',
    snippets: [
      {
        label: 'React Native',
        code: `// JavaScript calls a native module
const token = await NativeModules.SecureStore.getToken()`,
      },
      {
        label: 'Kotlin Multiplatform',
        code: `expect interface SecureStore {
  suspend fun getToken(): String?
}

// Android and iOS provide their own actual implementations
// while shared Kotlin code depends on the common abstraction.`,
      },
    ],
    takeaway:
      'React Native crosses from JS or TS into native modules. Kotlin Multiplatform often keeps shared code in Kotlin and delegates platform specifics behind multiplatform abstractions.',
  },
  {
    id: 'examples-team',
    title: 'Organizational Fit',
    description:
      'The architecture choice often follows who the team already is, not only what the framework can do.',
    snippets: [
      {
        label: 'React Native Rule',
        code: `If the product team is React-heavy,
the UI should be shared,
and one mobile app layer is the goal:
  choose React Native`,
      },
      {
        label: 'Kotlin Multiplatform Rule',
        code: `If the team values native app structure,
shared business logic,
and flexible platform ownership:
  choose Kotlin Multiplatform`,
      },
    ],
    takeaway:
      'The better stack is often the one that matches team structure and ownership model, not just theoretical framework capability.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short prompt keeps the comparison anchored in what is actually being shared.',
    snippets: [
      {
        label: 'Ask This First',
        code: `What do we actually want to share?

Mostly UI and app framework?
  React Native is a natural candidate.

Mostly domain logic and platform-agnostic core code?
  Kotlin Multiplatform is a natural candidate.`,
      },
      {
        label: 'Ask This Second',
        code: `Do we want one cross-platform app team,
or two platform teams sharing a common core?

That answer usually reveals the better fit.`,
      },
    ],
    takeaway:
      'This comparison becomes much clearer when the team identifies the intended sharing layer before debating framework branding.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  { term: 'Shared UI', definition: 'A cross-platform approach where the same user interface layer is reused across multiple platforms.' },
  { term: 'Shared Business Logic', definition: 'Cross-platform reuse of domain logic, networking, state handling, validation, and other non-UI code.' },
  { term: 'Native Module', definition: 'A platform-native capability exposed to React Native JavaScript or TypeScript code.' },
  { term: 'Fabric', definition: 'React Native\'s newer rendering system in the New Architecture.' },
  { term: 'Turbo Module', definition: 'A newer native module system in React Native\'s New Architecture.' },
  { term: 'JSI', definition: 'The JavaScript interface used by modern React Native architecture to enable more direct native and JavaScript interaction.' },
  { term: 'Source Set', definition: 'A Kotlin Multiplatform grouping of code and dependencies for shared or platform-specific targets.' },
  { term: 'expect/actual', definition: 'A Kotlin Multiplatform mechanism for declaring common APIs with platform-specific implementations.' },
  { term: 'Compose Multiplatform', definition: 'JetBrains\' Compose-based UI toolkit that can be used with Kotlin Multiplatform for shared UI.' },
  { term: 'Native UI', definition: 'Platform-specific user interface code written with platform-native frameworks such as SwiftUI or Jetpack Compose.' },
  { term: 'Interop', definition: 'The ability for one stack or language layer to call into another platform or runtime layer.' },
  { term: 'Platform Ownership', definition: 'How much autonomy Android and iOS teams retain over their own code, UI, and architecture.' },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const helpStyles = `
.rn-kmp-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.rn-kmp-help-window {
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

.rn-kmp-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.rn-kmp-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.rn-kmp-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.rn-kmp-help-control {
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

.rn-kmp-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.rn-kmp-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.rn-kmp-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.rn-kmp-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.rn-kmp-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.rn-kmp-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.rn-kmp-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.rn-kmp-help-toc-list li {
  margin: 0 0 8px;
}

.rn-kmp-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.rn-kmp-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.rn-kmp-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.rn-kmp-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.rn-kmp-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.rn-kmp-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.rn-kmp-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.rn-kmp-help-content p,
.rn-kmp-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.rn-kmp-help-content p {
  margin: 0 0 10px;
}

.rn-kmp-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.rn-kmp-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.rn-kmp-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.rn-kmp-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .rn-kmp-help-main {
    grid-template-columns: 1fr;
  }

  .rn-kmp-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .rn-kmp-help-titletext {
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

export default function ReactNativeVsKotlinMultiplatformPage(): JSX.Element {
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
    document.title = `React Native vs Kotlin Multiplatform (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'React Native vs Kotlin Multiplatform',
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
    <div className="rn-kmp-help-page">
      <style>{helpStyles}</style>
      <div className="rn-kmp-help-window" role="presentation">
        <header className="rn-kmp-help-titlebar">
          <span className="rn-kmp-help-titletext">React Native vs Kotlin Multiplatform</span>
          <div className="rn-kmp-help-controls">
            <button className="rn-kmp-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="rn-kmp-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="rn-kmp-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rn-kmp-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rn-kmp-help-main">
          <aside className="rn-kmp-help-toc" aria-label="Table of contents">
            <h2 className="rn-kmp-help-toc-title">Contents</h2>
            <ul className="rn-kmp-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="rn-kmp-help-content">
            <h1 className="rn-kmp-help-doc-title">React Native vs Kotlin Multiplatform</h1>
            <p className="rn-kmp-help-doc-subtitle">
              Manual-style comparison of shared UI, shared logic, platform ownership, and long-term mobile architecture tradeoffs.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="rn-kmp-help-section">
                    <h2 className="rn-kmp-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="rn-kmp-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="rn-kmp-help-section">
                  <h2 className="rn-kmp-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="rn-kmp-help-section">
                  <h2 className="rn-kmp-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="rn-kmp-help-subheading">{snippet.label}</h3>
                      <div className="rn-kmp-help-codebox">
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
              <section id="glossary-terms" className="rn-kmp-help-section">
                <h2 className="rn-kmp-help-heading">Glossary</h2>
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
