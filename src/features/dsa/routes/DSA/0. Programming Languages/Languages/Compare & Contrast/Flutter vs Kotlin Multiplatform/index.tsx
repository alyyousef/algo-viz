import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type DocSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ExampleItem = {
  id: string
  title: string
  summary: string
  flutterCode: string
  kmpCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Flutter vs Kotlin Multiplatform'
const pageSubtitle =
  'Comparing a full cross-platform UI toolkit with a code-sharing technology centered on native platforms and shared Kotlin modules.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Flutter and Kotlin Multiplatform are both used to reduce duplicated mobile work across platforms, but they solve very different problems. Flutter is a full cross-platform UI toolkit with its own rendering engine, widget system, and app architecture centered on Dart. Kotlin Multiplatform is a code-sharing technology that lets teams share Kotlin logic across platforms while keeping native platform UIs or optionally sharing UI through Compose Multiplatform.',
      'A useful shorthand is this: Flutter replaces most of the native UI stack with a shared Flutter UI layer. Kotlin Multiplatform usually keeps native platforms native and shares business logic, networking, data models, and other non-UI code, with optional shared UI as a separate decision.',
      'That means the real question is not Which cross-platform framework is better. The real question is whether your team wants one shared rendering and UI system for most of the app, or whether your team wants to preserve native platform stacks and share only the layers that benefit from code reuse.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Flutter is productively opinionated. It gives you the rendering model, widget tree, layout primitives, animation system, navigation patterns, hot reload workflow, and large package ecosystem. It is not merely a code-sharing tool. It is a full application toolkit that expects to be the primary UI framework.',
      'Kotlin Multiplatform is much less about replacing platform UI and much more about sharing what should be shared. The core idea is to keep platform-specific strengths where they matter while moving business logic, domain models, networking, persistence abstractions, and sometimes presentation logic into common Kotlin modules.',
      'This is why Flutter often feels like adopting a complete app platform, while Kotlin Multiplatform often feels like evolving an existing native architecture into a shared-code architecture.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Flutter is strongest when the product wants a highly shared UI codebase across iOS, Android, web, desktop, or embedded targets and is comfortable adopting the Flutter rendering and widget model. It is particularly attractive for teams prioritizing one design system, rapid UI iteration, and broad cross-platform reach.',
      'Kotlin Multiplatform is strongest when the team already values native platform UX and APIs, or when the product already has native apps and wants to reduce duplicated domain and data-layer work without abandoning native UI stacks. It is especially attractive for Android-heavy organizations and teams already invested in Kotlin.',
      'If the core question is How do we share almost the whole app UI and logic across platforms, Flutter often wins. If the core question is How do we share meaningful business logic while keeping native apps native, Kotlin Multiplatform often wins.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Flutter when one shared UI toolkit and rendering model is the main source of leverage.',
      'Choose Kotlin Multiplatform when preserving native UI and sharing logic is the main source of leverage.',
      'Choose Flutter when the team is comfortable adopting Dart and Flutter as the primary app platform.',
      'Choose Kotlin Multiplatform when the team is already Kotlin-heavy or wants a lower-disruption path from native mobile development.',
      'If the real debate is shared UI versus shared logic, that is the actual decision boundary.',
    ],
  },
]

const mentalModels: Array<{ title: string; detail: string }> = [
  {
    title: 'Flutter owns the UI layer',
    detail:
      'The framework draws its own widgets and usually expects to be the main rendering and interaction system for the app.',
  },
  {
    title: 'Kotlin Multiplatform usually shares the non-UI core',
    detail:
      'Common modules hold domain logic while iOS and Android can keep native presentation layers.',
  },
  {
    title: 'Flutter is a toolkit adoption',
    detail:
      'You are adopting Dart, Flutter widgets, Flutter tooling, and the Flutter package ecosystem together.',
  },
  {
    title: 'Kotlin Multiplatform is an architecture adoption',
    detail:
      'You are deciding which layers of the app belong in common Kotlin and which stay platform-specific.',
  },
  {
    title: 'Compose Multiplatform changes the KMP story but does not erase the distinction',
    detail:
      'Kotlin Multiplatform can share UI too, but the core concept is still not identical to Flutters fully integrated cross-platform UI stack.',
  },
  {
    title: 'Native integration feels different',
    detail:
      'Flutter reaches native capabilities through plugins and platform channels, while Kotlin Multiplatform often calls native platform APIs more directly from native layers around shared code.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Overall Platform Shape',
    paragraphs: [
      'Flutter is an SDK and UI toolkit that includes a rendering engine, framework libraries, tooling, and a large widget catalog. The framework owns enough of the stack that a team can think in Flutter almost all the time, even while shipping to multiple platforms.',
      'Kotlin Multiplatform is not one monolithic UI toolkit in the same sense. It is a way to organize shared Kotlin modules across targets. The exact product shape depends on what you share: networking, domain logic, serialization, storage abstractions, presentation logic, and possibly UI with Compose Multiplatform.',
      'The practical difference is that Flutter feels like one stack. Kotlin Multiplatform feels like a shared-core strategy inside a broader native or multiplatform architecture.',
    ],
  },
  {
    id: 'core-ui-model',
    title: 'UI Model and Rendering Strategy',
    paragraphs: [
      'Flutter renders its own widgets. That gives it strong cross-platform UI consistency, excellent control over animation and layout, and a single design vocabulary across platforms. It also means the app UI is less tied to native UIKit or Android Views as primary rendering systems.',
      'Kotlin Multiplatform traditionally keeps native UI on each platform, which means SwiftUI or UIKit on iOS and Jetpack Compose or Android Views on Android remain first-class. Compose Multiplatform can introduce shared UI, but that is still a separate architectural choice rather than the baseline identity of KMP.',
      'If visual consistency from one shared UI layer matters most, Flutter has the cleaner story. If platform-native UI is important, Kotlin Multiplatform has the cleaner story.',
    ],
  },
  {
    id: 'core-code-sharing',
    title: 'What Actually Gets Shared',
    paragraphs: [
      'With Flutter, most of the application code is commonly shared by default: UI, state management, navigation, business logic, and much of the app shell. Platform-specific code still exists for integrations and special cases, but the default bias is toward one codebase.',
      'With Kotlin Multiplatform, teams usually share domain logic, data models, repositories, validation rules, networking clients, and state or presentation abstractions, while keeping more platform-specific UI code. The shared boundary is more selective and more architectural than all-encompassing.',
      'This difference affects team workflow directly. Flutter reduces total surface area by centralizing the app. Kotlin Multiplatform reduces duplicated logic while letting each platform continue to express itself natively.',
    ],
  },
  {
    id: 'core-language-tooling',
    title: 'Language and Tooling Investment',
    paragraphs: [
      'Flutter means adopting Dart as the primary application language. For many teams that is perfectly fine because the toolkit is cohesive and productive. But it is still a language and ecosystem adoption decision.',
      'Kotlin Multiplatform means leaning harder into Kotlin, which is often an advantage for Android-heavy teams or backend teams already using Kotlin. The iOS side still has to coexist with Swift and Xcode realities unless more of the stack is shared.',
      'If the organization already has strong Kotlin expertise, KMP usually has less language friction. If the organization wants one app stack and is happy to standardize on Flutter, Dart is often an acceptable trade.',
    ],
  },
  {
    id: 'core-native-integration',
    title: 'Native Platform Integration',
    paragraphs: [
      'Flutter accesses native capabilities through plugins and platform channels. This works well and the ecosystem covers many common needs, but unusual or cutting-edge platform features can require custom bridge work.',
      'Kotlin Multiplatform often feels closer to the native platform boundary because native app layers remain more explicit. Shared code can sit behind native UI and native platform integrations rather than in front of them. That can reduce friction when the product depends heavily on platform-specific frameworks or platform conventions.',
      'So the distinction is not only plugin availability. It is also whether your architecture wants the native platform as an adapter around a shared toolkit or as a first-class environment around shared business logic.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Runtime Profile',
    paragraphs: [
      'Flutter performance is often excellent for cross-platform UI because the framework controls rendering directly and is optimized around smooth animations and consistent frame delivery. The main question is less raw speed and more whether the Flutter rendering model fits the product and device surface.',
      'Kotlin Multiplatform performance depends more on what is shared. Shared business logic can be very efficient while native UI keeps platform rendering characteristics. The performance conversation is therefore less about one cross-platform renderer and more about interop, architecture boundaries, and the behavior of shared modules.',
      'If the product requires one highly controlled cross-platform UI runtime, Flutter has a strong story. If the product benefits from native rendering plus shared logic, KMP has a strong story.',
    ],
  },
  {
    id: 'core-devex',
    title: 'Developer Experience and Iteration Speed',
    paragraphs: [
      'Flutter is famous for hot reload and fast UI iteration. That matters because UI-heavy product teams often need to move quickly through layouts, interactions, and visual refinement. The single-toolkit workflow can be a significant productivity multiplier.',
      'Kotlin Multiplatform improves productivity differently. It reduces duplicated logic work and keeps platform teams aligned on domain code, networking, and shared rules. But because UI may remain native, some categories of iteration still happen separately on each platform.',
      'So the productivity gain is different in shape. Flutter accelerates one shared app workflow. KMP accelerates multi-team native development by reducing duplicated core logic.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Packages, and Organizational Fit',
    paragraphs: [
      'Flutter has a large package ecosystem and a strong culture around building complete apps in Flutter. That is especially attractive for product teams that want one coherent toolkit and many off-the-shelf integrations.',
      'Kotlin Multiplatform benefits from the Kotlin ecosystem plus native platform ecosystems around it. That can be a strength because teams do not have to abandon native iOS or Android libraries entirely. But it can also mean more architectural assembly work.',
      'If your organization values one framework-centered ecosystem, Flutter is attractive. If your organization values native platform continuity with shared Kotlin in the middle, KMP is attractive.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration Path from Existing Apps',
    paragraphs: [
      'Flutter can be adopted incrementally, but the biggest leverage usually comes when large parts of the app are actually written in Flutter. That can make migration from mature native apps feel like a larger product rewrite or at least a larger UI migration.',
      'Kotlin Multiplatform is often easier to adopt incrementally in existing native codebases because teams can start by sharing data and domain layers without replacing the UI. That makes it especially appealing for organizations with production native apps that want lower-risk modernization.',
      'If incremental adoption matters a lot, KMP often has the gentler migration path. If a team is comfortable rebuilding toward one shared UI codebase, Flutter may still be the better long-term bet.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Flutter becomes the wrong choice when the team really wanted native platform UI and only needed shared business logic, but adopted a whole UI toolkit because cross-platform sounded efficient. The failure mode is unnecessary platform replacement and framework lock-in at the UI layer.',
      'Kotlin Multiplatform becomes the wrong choice when the team really wanted one shared UI codebase and broad product consistency, but chose selective code sharing and kept too much duplicated presentation work. The failure mode is that the organization still pays a large multi-platform UI tax.',
      'A more subtle Flutter failure mode is underestimating native edge cases. A more subtle KMP failure mode is overestimating how much total product work is actually removed when UI remains largely separate. Both are strong technologies. Each becomes painful when adopted for the wrong boundary.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Flutter when you want one shared UI toolkit and broad cross-platform reach from mostly one codebase.',
      'Choose Kotlin Multiplatform when you want to share meaningful logic while preserving native platform experience and codebases.',
      'Prefer Flutter when product design consistency and UI iteration speed are major priorities.',
      'Prefer Kotlin Multiplatform when incremental adoption and Android or Kotlin alignment are major priorities.',
      'Prefer Flutter when the team is willing to standardize on Dart and the Flutter stack.',
      'Prefer Kotlin Multiplatform when the team wants Kotlin at the center and less disruption to native iOS and Android layers.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-shared-model',
    title: 'Share a Simple Domain Model',
    summary: 'Both approaches share code, but the scope of the shared code is different.',
    flutterCode: `class UserProfile {
  final String id;
  final String displayName;

  const UserProfile({
    required this.id,
    required this.displayName,
  });
}`,
    kmpCode: `data class UserProfile(
    val id: String,
    val displayName: String,
)`,
    explanation:
      'Both can share a model cleanly. The bigger difference is what surrounds it: in Flutter the same language often continues up through the full UI, while in KMP the shared model usually sits beneath native or optionally shared UI.',
  },
  {
    id: 'ex-ui',
    title: 'Render a Basic Profile Screen',
    summary: 'This shows the core platform difference more than any marketing sentence does.',
    flutterCode: `class ProfileCard extends StatelessWidget {
  final UserProfile user;

  const ProfileCard({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(user.displayName),
      subtitle: Text(user.id),
    );
  }
}`,
    kmpCode: `@Composable
fun ProfileCard(user: UserProfile) {
    Column {
        Text(user.displayName)
        Text(user.id)
    }
}`,
    explanation:
      'Flutter UI is simply Flutter. In KMP, shared UI usually means opting into Compose Multiplatform. Without that choice, the equivalent UI would live separately in SwiftUI or UIKit on iOS and Compose or Views on Android.',
  },
  {
    id: 'ex-platform',
    title: 'Call Platform-Specific Code',
    summary: 'Platform integration sits at different architectural points.',
    flutterCode: `const channel = MethodChannel('app/device');

final version = await channel.invokeMethod<String>('platformVersion');`,
    kmpCode: `expect fun platformName(): String

fun greeting(): String = "Running on \${platformName()}"`,
    explanation:
      'Flutter commonly bridges through platform channels or plugins. Kotlin Multiplatform expresses common-to-platform boundaries through expect/actual declarations and surrounding native implementations.',
  },
  {
    id: 'ex-shared-logic',
    title: 'Share Repository Logic',
    summary: 'KMP usually centers this layer. Flutter shares it too, but as part of a larger shared app.',
    flutterCode: `class UserRepository {
  Future<UserProfile> load(String id) async {
    final json = await api.getUser(id);
    return UserProfile(id: json['id'], displayName: json['displayName']);
  }
}`,
    kmpCode: `class UserRepository(
    private val api: UserApi,
) {
    suspend fun load(id: String): UserProfile {
        return api.getUser(id)
    }
}`,
    explanation:
      'This is the heart of Kotlin Multiplatform value for many teams: share the domain and data layer while leaving UI decisions open. Flutter also shares repository logic, but usually because almost everything else is shared too.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Flutter',
    definition: 'A cross-platform UI toolkit and SDK centered on Dart, widgets, and a shared rendering engine.',
  },
  {
    term: 'Kotlin Multiplatform',
    definition: 'A Kotlin technology for sharing code across platforms while allowing platform-specific implementations where needed.',
  },
  {
    term: 'Compose Multiplatform',
    definition: 'A declarative UI technology that can be used with Kotlin Multiplatform to share UI across targets.',
  },
  {
    term: 'Platform channel',
    definition: 'A Flutter mechanism for communicating between Dart code and native platform code.',
  },
  {
    term: 'expect/actual',
    definition: 'Kotlin Multiplatform language mechanism for declaring common APIs with platform-specific implementations.',
  },
  {
    term: 'Widget tree',
    definition: 'The hierarchical UI structure used by Flutter to describe and render app interfaces.',
  },
  {
    term: 'Native UI',
    definition: 'User interfaces built directly with platform frameworks such as SwiftUI, UIKit, Jetpack Compose, or Android Views.',
  },
  {
    term: 'Hot reload',
    definition: 'A Flutter development workflow that updates running app code quickly during UI iteration.',
  },
  {
    term: 'Shared logic',
    definition: 'Common non-UI code such as domain models, validation, networking, and repositories reused across platforms.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-philosophy', label: 'Philosophy Difference' },
    { id: 'bp-where', label: 'Where Each Fits' },
    { id: 'bp-quick-picks', label: 'Quick Decision Guide' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-platform-shape', label: 'Platform Shape' },
    { id: 'core-ui-model', label: 'UI Model' },
    { id: 'core-code-sharing', label: 'Code Sharing' },
    { id: 'core-language-tooling', label: 'Language and Tooling' },
    { id: 'core-native-integration', label: 'Native Integration' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-devex', label: 'Developer Experience' },
    { id: 'core-ecosystem', label: 'Ecosystem and Fit' },
    { id: 'core-migration', label: 'Migration Path' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const pageStyles = `
.flutter-kmp-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.flutter-kmp-help-window {
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

.flutter-kmp-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.flutter-kmp-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.flutter-kmp-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.flutter-kmp-help-control {
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
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
}

.flutter-kmp-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  flex-wrap: wrap;
}

.flutter-kmp-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.flutter-kmp-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.flutter-kmp-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.flutter-kmp-help-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.flutter-kmp-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.flutter-kmp-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.flutter-kmp-help-toc-list li {
  margin: 0 0 8px;
}

.flutter-kmp-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.flutter-kmp-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.flutter-kmp-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.flutter-kmp-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.flutter-kmp-help-section {
  margin: 0 0 20px;
}

.flutter-kmp-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.flutter-kmp-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.flutter-kmp-help-content p,
.flutter-kmp-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.flutter-kmp-help-content p {
  margin: 0 0 10px;
}

.flutter-kmp-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.flutter-kmp-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.flutter-kmp-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.flutter-kmp-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .flutter-kmp-help-main {
    grid-template-columns: 1fr;
  }

  .flutter-kmp-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .flutter-kmp-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 18px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function FlutterVsKotlinMultiplatformPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
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

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className="flutter-kmp-help-page">
      <style>{pageStyles}</style>
      <div className="flutter-kmp-help-window" role="presentation">
        <header className="flutter-kmp-help-titlebar">
          <span className="flutter-kmp-help-title">{pageTitle}</span>
          <div className="flutter-kmp-help-controls">
            <button className="flutter-kmp-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="flutter-kmp-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="flutter-kmp-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`flutter-kmp-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flutter-kmp-help-main">
          <aside className="flutter-kmp-help-toc" aria-label="Table of contents">
            <h2 className="flutter-kmp-help-toc-title">Contents</h2>
            <ul className="flutter-kmp-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="flutter-kmp-help-content">
            <h1 className="flutter-kmp-help-doc-title">{pageTitle}</h1>
            <p className="flutter-kmp-help-doc-subtitle">{pageSubtitle}</p>
            <p>
              This page compares Flutter and Kotlin Multiplatform as real cross-platform product strategies rather than as two
              interchangeable mobile buzzwords. The point is to make the actual tradeoffs explicit: who owns the UI layer, what
              gets shared, how native platforms are integrated, how teams iterate, and where each approach creates or removes
              long-term engineering cost.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="flutter-kmp-help-section">
                    <h2 className="flutter-kmp-help-heading">{section.title}</h2>
                    {section.paragraphs?.map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul>
                        {section.bullets.map((bullet, bulletIndex) => (
                          <li key={`${section.id}-b-${bulletIndex}`}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="flutter-kmp-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="flutter-kmp-help-section">
                  <h2 className="flutter-kmp-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="flutter-kmp-help-section">
                    <h2 className="flutter-kmp-help-heading">{section.title}</h2>
                    {section.paragraphs?.map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul>
                        {section.bullets.map((bullet, bulletIndex) => (
                          <li key={`${section.id}-b-${bulletIndex}`}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="flutter-kmp-help-section">
                    <h2 className="flutter-kmp-help-heading">{example.title}</h2>
                    <p>{example.summary}</p>
                    <h3 className="flutter-kmp-help-subheading">Flutter</h3>
                    <div className="flutter-kmp-help-codebox">
                      <code>{example.flutterCode.trim()}</code>
                    </div>
                    <h3 className="flutter-kmp-help-subheading">Kotlin Multiplatform</h3>
                    <div className="flutter-kmp-help-codebox">
                      <code>{example.kmpCode.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="flutter-kmp-help-section">
                <h2 className="flutter-kmp-help-heading">Glossary</h2>
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
