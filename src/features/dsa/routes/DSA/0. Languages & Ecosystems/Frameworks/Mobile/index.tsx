import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'
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

const MOBILE_FRAMEWORKS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/frameworks/mobile'

const frameworkDirectory = ['Flutter', 'Jetpack Compose', 'React Native', 'SwiftUI', 'Xamarin']

const introParagraphs = [
  'Mobile Frameworks is the overview page for the part of Languages & Ecosystems that focuses on the frameworks and UI systems used to build phone and tablet applications. It explains the repeated ideas that appear across native stacks, cross-platform runtimes, declarative UI toolkits, and framework-driven delivery workflows before the reader drills into any one product.',
  'The important question is not only whether a framework uses Dart, Kotlin, JavaScript, C#, or Swift. The deeper question is what the framework standardizes: rendering model, state updates, navigation, platform API access, build tooling, testing, packaging, release workflow, and the boundary between shared code and platform-specific code.',
  'The child pages in this section cover Flutter, Jetpack Compose, React Native, SwiftUI, and Xamarin. This overview page is the field guide for understanding why mobile frameworks exist, what they help with, what they hide, and how to reason about them as delivery systems for real device software instead of as isolated UI libraries.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'mobile98-overview',
    title: 'Overview',
    paragraphs: [
      'A mobile framework is a structured foundation for building applications that must run well on constrained, battery-powered, touch-driven devices with strong platform conventions. Instead of every team wiring together rendering, navigation, lifecycle handling, network state, permissions, packaging, signing, and release automation from scratch, the framework provides an opinionated model for most of those repeated concerns.',
      'What makes mobile frameworks important is that mobile applications are not merely desktop web pages inside smaller screens. They live under foreground and background lifecycle events, process death, permission prompts, deep links, network variability, offline usage, accessibility expectations, app-store rules, and device-specific design patterns. Frameworks exist because these concerns recur in almost every serious app.',
      'Choosing a mobile framework is therefore an architectural decision. It determines how UI is described, how updates propagate, how code reaches platform APIs, how teams share logic across iOS and Android, what performance cliffs are likely, and how painful it will be to scale from a prototype to a production app with analytics, testing, release automation, observability, and long-lived maintenance.',
    ],
  },
  {
    id: 'mobile98-why',
    title: 'Why Mobile Frameworks Matter',
    paragraphs: [
      'Mobile teams need more than widgets. They need a repeatable development model that makes screens, navigation, side effects, local storage, network fetching, device integration, and release engineering work together coherently. A framework matters because it turns those recurring concerns into a system instead of leaving them as project-specific glue.',
      'They also matter because the cost of inconsistency is high on mobile. If state ownership is unclear, lifecycle handling is sloppy, or native integration is ad hoc, bugs often show up as frozen screens, duplicated requests, scroll jank, broken back behavior, background failures, or crashes that only appear on certain devices or OS versions.',
      'Frameworks additionally matter at the team level. They influence how designers hand off work, how feature teams share code, how QA reproduces issues, how build engineers automate releases, and how much platform-specific expertise the organization needs to retain. A seemingly small framework decision can shape the maintenance burden for years.',
    ],
    bullets: [
      'They define how screens are described and updated.',
      'They influence native integration, build tooling, and release flow.',
      'They shape how much code can be shared across platforms.',
      'They expose or hide lifecycle, performance, and platform differences.',
      'They affect testing strategy, debugging workflow, and long-term maintenance cost.',
    ],
  },
  {
    id: 'mobile98-problems',
    title: 'What Mobile Frameworks Usually Solve',
    paragraphs: [
      'Mobile frameworks exist because real mobile products repeat the same categories of engineering problems. Teams need a way to render UI, respond to touch and gestures, keep state consistent across configuration changes, navigate between screens, call device APIs safely, persist data offline, and package releases that satisfy platform rules.',
      'Different frameworks solve these problems with different levels of opinionation. Some are deeply native and align with the platform runtime almost directly. Some provide a cross-platform abstraction and a bridge or embedding model so a larger portion of the app can be shared. Some provide a complete rendering engine, while others mostly orchestrate native views.',
      'The right way to compare them is not by slogans like native versus cross-platform alone. The useful comparison is what each framework standardizes, what it leaves to external libraries, what it makes hard to misuse, and what complexity it quietly shifts onto the application team.',
    ],
    bullets: [
      'Screen rendering and UI composition.',
      'Navigation stacks, deep links, and app entry points.',
      'State ownership, async data flow, and side effects.',
      'Permissions, sensors, camera, notifications, and storage.',
      'Build variants, signing, packaging, and app-store delivery.',
      'Testing, profiling, crash reporting, and runtime diagnostics.',
      'Cross-platform code sharing and platform-specific escape hatches.',
    ],
  },
  {
    id: 'mobile98-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'A practical mental model is that a mobile framework is a policy engine for screens, device integration, and app lifecycle. It answers who owns UI state, when a screen recomputes, how navigation is represented, how work survives process or configuration changes, and how application code reaches operating-system features.',
      'Once viewed this way, many framework debates become easier to reason about. Declarative UI versus imperative UI, bridge-based integration versus direct native code, shared rendering engine versus native widgets, and shared business logic versus shared full UI are all decisions about where the complexity lives and how explicit that complexity is to the team.',
      'This is why a mobile framework should be evaluated as system design. A beautiful component demo can still hide painful release tooling, weak testability, awkward accessibility defaults, or difficult native interop. A more constrained framework can still be the right choice if its constraints line up with the product, the team, and the release process.',
    ],
  },
  {
    id: 'mobile98-spectrum',
    title: 'The Native-to-Cross-Platform Spectrum',
    paragraphs: [
      'Mobile frameworks span a broad spectrum. At one end are platform-native systems like SwiftUI and Jetpack Compose, which align closely with iOS or Android expectations and give strong access to platform APIs and conventions. At another point are cross-platform frameworks such as Flutter or React Native, which emphasize shared code, reusable UI architecture, and faster multi-platform delivery. Xamarin historically sits in a shared-code tradition that emphasizes .NET tooling and platform interop.',
      'This spectrum matters because two frameworks can both support the same visible feature set while pushing complexity into different places. A native-first framework may reduce runtime mismatch and simplify platform integration, but duplicate more work across platforms. A cross-platform framework may speed up feature delivery across teams, but require more deliberate handling of platform divergence, performance-sensitive screens, and native-module ownership.',
      'The useful takeaway is that there is no universal best point on the spectrum. The better question is what must be shared, what must feel deeply native, how much platform specialization the team can sustain, and where the app can afford abstraction versus where it needs direct control.',
    ],
  },
  {
    id: 'mobile98-directory',
    title: 'Frameworks in This Section',
    paragraphs: [
      'The entries below are the concrete framework pages present under Mobile Frameworks. They represent different tradeoffs in rendering model, language choice, native access, tooling, and code-sharing strategy.',
    ],
    bullets: frameworkDirectory,
  },
  {
    id: 'mobile98-why-hard',
    title: 'Why Mobile Development Feels Hard',
    paragraphs: [
      'Mobile development feels hard because the operating system is an active participant in the application lifecycle. Screens can be paused, stopped, recreated, backgrounded, or killed. Permissions can be denied. The network can disappear. Layouts must adapt to many device sizes, densities, text scales, and platform conventions. Problems often appear only on specific devices, OS versions, or navigation paths.',
      'It also feels hard because product quality is judged through tactile experience. The user notices dropped frames, delayed feedback, broken keyboard handling, awkward back gestures, flashing lists, battery drain, and large downloads immediately. Mobile work is therefore both architectural and sensory: the structure must be correct and the experience must feel smooth and native.',
      'Frameworks help by standardizing the common failure points, but they do not remove the need to understand those failure points. Teams still need to reason about lifecycle, performance budgets, state restoration, offline behavior, release safety, and the exact boundaries where platform-specific behavior enters the system.',
    ],
  },
  {
    id: 'mobile98-when-to-use',
    title: 'When a Mobile Framework Is the Right Tool',
    paragraphs: [
      'A mobile framework is the right tool when the product needs repeatable ways to build screens, manage state, navigate, integrate with device APIs, and ship to mobile stores without reinventing the same infrastructure on every feature. That covers most consumer apps, internal business apps, media clients, commerce apps, productivity tools, and many device-integrated experiences.',
      'Frameworks are especially useful when delivery speed matters across multiple teams or platforms. Shared abstractions around components, routing, state, build automation, testing, and release signing reduce repeated work and make product development more predictable.',
      'They are also useful when the organization wants deliberate architectural boundaries. Good frameworks encourage teams to separate presentation, state, side effects, and platform integration in ways that keep features understandable as the app grows.',
    ],
  },
  {
    id: 'mobile98-when-not-to-use',
    title: 'Where Frameworks Can Hurt',
    paragraphs: [
      'Mobile frameworks can hurt when teams choose them for ideology or speed claims without checking product fit. A heavy cross-platform layer can create long-term friction if the app relies on advanced platform-specific interactions, highly optimized graphics, or deep OS integrations. A strictly native strategy can create duplicated effort and slower delivery if the product mostly needs conventional screens and shared business logic.',
      'They also hurt when teams confuse framework adoption with architecture. A framework does not automatically provide stable state boundaries, clean async flow, safe navigation, or thoughtful native-module ownership. If those concerns stay vague, the codebase becomes difficult regardless of the framework label.',
      'The real tradeoff is whether the framework removes enough accidental complexity from the actual product to justify the constraints, learning curve, build tooling, runtime model, and maintenance surface it introduces.',
    ],
  },
  {
    id: 'mobile98-roadmap',
    title: 'Coverage Roadmap',
    paragraphs: [
      'This page provides a roadmap for the subsection and sets priorities for deeper follow-on topics.',
    ],
    bullets: [
      'Overview and key ideas will be added.',
      'Core syntax, APIs, ecosystem, and architecture notes will be added.',
      'Use cases, tradeoffs, and compare/contrast references will be added.',
    ],
  },
  {
    id: 'mobile98-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Mobile frameworks are not only UI kits. They are delivery systems for application structure, lifecycle management, native integration, and release workflow on real devices. The right framework choice depends on how much code should be shared, how much platform specificity the app needs, and what kind of team will maintain it over time.',
      'Strong framework choices usually come from understanding rendering model, state model, navigation boundaries, interop cost, build pipeline, testability, and platform conventions. Framework popularity matters less than whether it makes the real app easier to evolve, debug, ship, and support.',
    ],
    bullets: [
      'Treat mobile framework choice as architecture, not only as syntax preference.',
      'Evaluate native integration, lifecycle handling, and release tooling early.',
      'Assume cross-platform sharing changes where complexity lives rather than removing complexity entirely.',
      'Choose the framework whose constraints best match the product and team reality.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'mobile98-rendering',
    title: 'Rendering Model and UI Composition',
    paragraphs: [
      'Every mobile framework needs a rendering model. Some frameworks compose native views supplied by the platform. Others render through their own engine and translate widget trees into drawing commands. That choice affects performance characteristics, visual consistency, platform fidelity, and how much the framework can guarantee across devices.',
      'The composition model matters as much as the rendering engine. Teams need to know how screens are assembled from reusable parts, how layouts adapt to orientation and screen classes, how lists virtualize large data sets, and how animations interact with recomposition or re-render cycles.',
      'A strong framework makes it clear when the UI is just a function of state and when imperative escape hatches are still needed. This clarity reduces classes of bugs where one part of the screen believes stale data while another part has already updated.',
    ],
  },
  {
    id: 'mobile98-state',
    title: 'State, Side Effects, and Data Flow',
    paragraphs: [
      'Mobile apps feel simple from the outside, but internally they coordinate many kinds of state: form values, cached network data, authentication status, scroll position, navigation state, optimistic updates, feature flags, and device settings. A framework must provide or support a clear story for how that state is owned and updated.',
      'The most common production problem is not lack of state libraries. It is unclear boundaries between transient UI state, durable screen state, and long-lived application data. When those boundaries are blurry, developers duplicate fetches, overuse global stores, lose state on screen recreation, or attach business logic directly to widgets or views.',
      'Frameworks with strong declarative models tend to work best when state flows one way and side effects are isolated behind explicit boundaries. The details differ by ecosystem, but the core idea is stable: represent the current truth clearly, derive the UI from that truth, and contain effects such as network requests, storage writes, and analytics so they remain testable.',
    ],
  },
  {
    id: 'mobile98-navigation',
    title: 'Navigation, Deep Links, and Screen Lifecycle',
    paragraphs: [
      'Navigation on mobile is more than switching views. It includes back-stack semantics, tab hierarchies, modal presentation, deep links, notification entry points, state restoration, and interactions with platform gestures. The framework needs a consistent way to represent where the user is and how they got there.',
      'This becomes especially important when the app can be entered from many routes: cold start from the icon, deep link from email, push notification tap, authenticated redirect, or restored process after the OS killed the app. Navigation code that assumes one happy path usually becomes brittle quickly.',
      'A mature framework setup makes routes explicit, keeps arguments serializable when possible, and separates navigation decisions from UI rendering so that transitions, guards, analytics, and restoration logic stay coherent.',
    ],
  },
  {
    id: 'mobile98-platform',
    title: 'Platform APIs, Native Modules, and Interop Boundaries',
    paragraphs: [
      'Real mobile products need camera access, push notifications, secure storage, biometrics, sensors, location, background tasks, widgets, sharing, and many other device APIs. Even when most of the app is shared, the framework still needs a disciplined way to cross the boundary into iOS and Android capabilities.',
      'This interop boundary is often the hidden cost center of cross-platform work. The challenge is not only whether a plugin exists. The harder question is whether the plugin is maintained, whether it supports the needed OS behavior, how errors flow back into the app layer, and how much platform expertise the team still needs to debug failures.',
      'Teams should therefore treat native interop as architecture, not as an afterthought. Clear ownership of native modules, explicit contracts, versioning awareness, and robust fallback behavior are more important than the marketing claim that one codebase can do everything.',
    ],
  },
  {
    id: 'mobile98-performance',
    title: 'Performance, Memory, and Battery',
    paragraphs: [
      'Performance on mobile is constrained by frame budgets, memory ceilings, startup time expectations, network variability, and battery cost. A framework should help developers reason about list virtualization, unnecessary recompositions, heavy bridges, image decoding, startup work, and background processing instead of hiding these costs until users complain.',
      'Good mobile performance is not only about hitting sixty frames per second during ideal demos. It is about predictable responsiveness on mid-range devices, efficient data synchronization, small enough bundles and assets, stable scrolling, and avoidance of work when the app is backgrounded or when a screen is off-screen.',
      'The right performance strategy depends on the framework model. Native toolkits may offer more direct access to platform profilers. Cross-platform systems may need extra attention at the bridge boundary, render tree size, or engine warm-up. In every case the team needs to know where the expensive work happens.',
    ],
  },
  {
    id: 'mobile98-design',
    title: 'Design Systems, Accessibility, and Platform Conventions',
    paragraphs: [
      'Mobile frameworks are often where product design meets platform expectation. Apps need reusable components, typographic scales, spacing rules, interaction states, and theming, but they also need to respect touch targets, dynamic type, safe areas, screen readers, reduced motion, and platform-specific navigation and input behavior.',
      'A strong design system on mobile is not merely a component catalog. It is a set of policies for how components adapt to small screens, orientation changes, keyboard presence, accessibility settings, and native platform conventions. Frameworks differ in how much they support this directly and how much discipline teams must add themselves.',
      'Accessibility is especially revealing. If a framework makes semantics, focus behavior, announcements, labels, and hit areas difficult to express, accessibility quality will drift. When those capabilities are first-class, accessible design becomes easier to sustain as the app evolves.',
    ],
  },
  {
    id: 'mobile98-builds',
    title: 'Build Variants, Signing, and Release Engineering',
    paragraphs: [
      'Shipping a mobile app is not only a compile step. Teams need debug builds, release builds, staging variants, environment configuration, code signing, provisioning, app icons, store metadata, crash symbol upload, and automated validation in CI. The framework touches all of this because it defines the build pipeline and artifacts developers work with every day.',
      'Release engineering becomes painful when configuration is scattered across scripts, environment files, native project settings, and framework-level conventions with no single source of truth. Mature teams standardize how environments are declared, how secrets are injected, how versions are incremented, and how reproducible builds are produced.',
      'Framework choice matters here because some stacks align closely with native build tools while others add an extra abstraction layer. That extra layer can be productive, but only if the team still understands the underlying iOS and Android release machinery well enough to diagnose failures.',
    ],
  },
  {
    id: 'mobile98-data',
    title: 'Networking, Offline-First Behavior, and Persistence',
    paragraphs: [
      'Many mobile apps operate under intermittent connectivity, aggressive background limits, and users who expect data to remain available instantly. Frameworks therefore need a story for async data fetching, caching, retry policy, local persistence, and conflict handling when the device goes offline or resumes later.',
      'Offline-first does not necessarily mean the entire app works without the network. It means the architecture treats local state, synchronization, and eventual consistency deliberately instead of assuming the server is always reachable. This usually influences repository patterns, local databases, cache invalidation, optimistic updates, and user feedback.',
      'The better frameworks and ecosystem patterns make these tradeoffs explicit. They encourage separating view state from data loading policy and make it possible to test how a screen behaves when requests fail, data is stale, or the process restarts mid-flow.',
    ],
  },
  {
    id: 'mobile98-testing',
    title: 'Testing and Debugging Strategy',
    paragraphs: [
      'Mobile frameworks should be evaluated partly by how testable they make the app. Teams usually need unit tests for business logic, UI tests for component behavior, integration tests for navigation and data flows, and end-to-end device tests for high-risk paths such as authentication, checkout, or onboarding.',
      'Debugging strategy matters just as much. The framework affects available hot reload or preview tooling, inspection of state changes, native crash traces, profiler support, log visibility, and how easy it is to reproduce issues that appear only on physical devices.',
      'A useful rule is that architecture should make the critical logic testable without a simulator for every case, while still preserving realistic device-level tests for lifecycle, permissions, notifications, and platform edge cases.',
    ],
  },
  {
    id: 'mobile98-accessibility',
    title: 'Adaptive Layout and Device Diversity',
    paragraphs: [
      'Mobile does not mean one screen size. Frameworks have to support phones, tablets, foldables, varying densities, split-screen modes, notches, safe areas, hardware keyboards, and platform accessibility settings such as dynamic type and high contrast. Layout systems therefore need to express intent, not just fixed pixel placement.',
      'Adaptive layout is partly visual and partly architectural. Navigation structures, pane layouts, image strategies, and feature disclosure may need to change across size classes. A framework that makes responsive composition awkward will force brittle patches later.',
      'Teams should also plan for localization, right-to-left support, and longer text. These are not polishing details. They affect how reusable components are designed and how well the app behaves across the real device diversity users bring.',
    ],
  },
  {
    id: 'mobile98-selection',
    title: 'How to Evaluate a Mobile Framework',
    paragraphs: [
      'Evaluating a mobile framework requires asking what the product is actually optimizing for: native fidelity, team speed, shared code, existing staff expertise, plugin ecosystem maturity, performance-sensitive experiences, or long-term maintenance. The correct answer depends on what kinds of screens and integrations dominate the roadmap, not on which framework wins simplistic popularity arguments.',
      "A strong evaluation usually examines rendering model, navigation support, state management ergonomics, interop strategy, profiling tooling, testability, release tooling, onboarding cost, ecosystem stability, and the organization's willingness to keep iOS and Android specialists available when needed.",
      'Prototype speed is useful evidence, but it is not enough. The better test is whether the framework keeps later phases of the product sane: adding analytics, handling background behavior, debugging device-specific bugs, evolving the design system, and shipping reliably across many releases.',
    ],
    bullets: [
      'How much UI and business logic should be shared?',
      'How often will the app need deep platform-specific behavior?',
      'What are the startup, animation, and list-performance requirements?',
      'Does the team have native iOS and Android expertise available?',
      'How mature are the ecosystem libraries for critical device features?',
      'How painful is the release, signing, and CI story at scale?',
    ],
  },
  {
    id: 'mobile98-failure-modes',
    title: 'Common Failure Modes',
    paragraphs: [
      'Mobile framework projects often fail in recognizable ways. Teams put all state into a global store and then struggle with screen ownership. They assume plugins cover every native need and later discover critical gaps. They ignore lifecycle until process death wipes out user progress. They overfit layouts to a few test devices and miss accessibility and localization issues.',
      'Another common failure mode is organizational rather than technical. Teams adopt a cross-platform framework to move faster, but never define who owns native modules, release tooling, or device-specific bugs. The result is a codebase that claims one-codebase simplicity while still needing platform knowledge nobody explicitly maintains.',
      'The most reliable defense is explicit boundaries: clear state ownership, clear interop ownership, measured performance targets, reproducible builds, tested navigation flows, and realistic assumptions about how much platform-specific work the product will always require.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'mobile98-example-flutter',
    title: 'Example: Flutter Declarative Widget State',
    description: [
      'Flutter uses a widget tree and its own rendering engine, which makes the UI model very consistent across platforms. The framework expects the screen to be rebuilt from current state instead of mutating native views one by one.',
      'This example shows the core idea: keep local UI state explicit and let the framework redraw the widget tree when that state changes.',
    ],
    code: `class CounterScreen extends StatefulWidget {
  const CounterScreen({super.key});

  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: Center(child: Text('Count: $count')),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => count += 1),
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
    takeaway:
      'Declarative UI works best when the screen is treated as a projection of current state rather than as a set of manually mutated view instances.',
  },
  {
    id: 'mobile98-example-compose',
    title: 'Example: Jetpack Compose State Hoisting',
    description: [
      'Jetpack Compose encourages UI functions that render from state and emit events upward. This makes it easier to separate presentation from screen logic and to test business behavior without entangling it with Android widgets.',
      'The example illustrates state hoisting, where the caller owns the value and the composable only renders and reports changes.',
    ],
    code: `@Composable
fun SearchField(
    query: String,
    onQueryChange: (String) -> Unit,
) {
    OutlinedTextField(
        value = query,
        onValueChange = onQueryChange,
        label = { Text("Search") },
        modifier = Modifier.fillMaxWidth(),
    )
}`,
    takeaway:
      'State hoisting keeps composables predictable and makes it clearer which layer owns the truth for a screen.',
  },
  {
    id: 'mobile98-example-react-native',
    title: 'Example: React Native Effect Boundary',
    description: [
      'React Native shares much of the React mental model: UI renders from state, and effects are explicit. The danger is putting too much async behavior directly inside render logic or letting screen state drift from server state.',
      'This example shows a basic fetch boundary where loading state and result state are explicit.',
    ],
    code: `function ProfileScreen() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProfile(data)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <Text>Loading...</Text>
  return <Text>{profile.name}</Text>
}`,
    takeaway:
      'Screens stay easier to reason about when data fetching is an explicit side-effect boundary rather than incidental logic spread through the component tree.',
  },
  {
    id: 'mobile98-example-swiftui',
    title: 'Example: SwiftUI Navigation and Derived View State',
    description: [
      'SwiftUI leans heavily on value-driven rendering and platform-native composition. Navigation and screen updates become easier to maintain when route intent and screen state are both expressed through explicit values.',
      'This example shows a small list that derives navigation destinations from data instead of mutating the stack imperatively from many places.',
    ],
    code: `struct ArticlesView: View {
    let articles: [Article]

    var body: some View {
        NavigationStack {
            List(articles) { article in
                NavigationLink(article.title) {
                    ArticleDetailView(article: article)
                }
            }
            .navigationTitle("Articles")
        }
    }
}`,
    takeaway:
      'Navigation becomes more maintainable when route transitions are expressed as data and composition, not as scattered imperative calls.',
  },
  {
    id: 'mobile98-example-interop',
    title: 'Example: Cross-Platform to Native Boundary',
    description: [
      'Many apps eventually need functionality that lives outside the shared framework layer. The key is to define a narrow interface so most of the application remains independent from platform-specific code.',
      'This pseudocode example shows the architectural idea rather than the syntax of any one framework.',
    ],
    code: `interface BiometricAuth {
  suspend fun canAuthenticate(): Boolean
  suspend fun prompt(reason: String): AuthResult
}

class SignInViewModel(private val biometrics: BiometricAuth) {
  suspend fun signInWithBiometrics(): AuthResult {
    if (!biometrics.canAuthenticate()) return AuthResult.Unavailable
    return biometrics.prompt("Confirm your identity")
  }
}`,
    takeaway:
      'Shared code stays durable when native capabilities are accessed through clear contracts instead of being scattered across many screens.',
  },
  {
    id: 'mobile98-example-navigation',
    title: 'Example: Restorable Route Intent',
    description: [
      'Navigation becomes fragile when screens pass around arbitrary objects or rely on transient in-memory assumptions. A better pattern is to represent route intent in a compact, serializable form that can survive recreation and deep-link entry.',
      'The example captures the general principle for mobile architecture across frameworks.',
    ],
    code: `type Route =
  | { name: 'home' }
  | { name: 'product'; productId: string }
  | { name: 'checkout'; cartId: string }

function openRoute(route: Route) {
  persistLastRoute(route)
  navigator.push(route)
}`,
    takeaway:
      'Serializable route state improves deep linking, restoration, analytics, and debugging because the app can explain where it is in a durable way.',
  },
]

const glossary: Array<{ term: string; definition: string }> = [
  {
    term: 'Declarative UI',
    definition:
      'A UI model where code describes what the interface should look like for the current state rather than manually mutating widgets step by step.',
  },
  {
    term: 'Recomposition',
    definition:
      'The process of rerunning a declarative UI description when observed state changes so the framework can update what is displayed.',
  },
  {
    term: 'Navigation stack',
    definition:
      'The ordered history of screens or routes that determines forward navigation and back behavior.',
  },
  {
    term: 'Deep link',
    definition:
      'A URL or platform-specific route that opens the app directly into a specific screen or workflow.',
  },
  {
    term: 'Platform channel or bridge',
    definition:
      'A mechanism that lets shared framework code communicate with native platform code for device APIs or custom integrations.',
  },
  {
    term: 'Hot reload',
    definition:
      'A development feature that applies code changes to a running app without requiring a full restart.',
  },
  {
    term: 'State hoisting',
    definition:
      'Moving state ownership upward so reusable UI components receive values and callbacks instead of owning the source of truth themselves.',
  },
  {
    term: 'Safe area',
    definition:
      'The screen region that avoids system UI intrusions such as notches, rounded corners, or gesture areas.',
  },
  {
    term: 'Process death',
    definition:
      'The operating-system event where the app process is terminated and later recreated, requiring durable restoration logic.',
  },
  {
    term: 'Binary size',
    definition:
      'The size of the built application package delivered to users, which affects download cost, install footprint, and startup characteristics.',
  },
  {
    term: 'Native fidelity',
    definition:
      'How closely an app matches the interaction patterns, appearance, and behavior users expect on a specific platform.',
  },
  {
    term: 'Cross-platform',
    definition:
      'A development approach where meaningful portions of code, and sometimes UI, are shared across multiple operating systems.',
  },
  {
    term: 'View model or screen model',
    definition:
      'A state-owning layer that prepares data and actions for a screen while keeping UI rendering relatively simple.',
  },
  {
    term: 'Build variant',
    definition:
      'A distinct build configuration such as debug, release, staging, or environment-specific distribution.',
  },
  {
    term: 'Provisioning and signing',
    definition:
      'The certificates, profiles, and identity configuration required to build and distribute mobile apps on platform ecosystems.',
  },
  {
    term: 'Offline-first',
    definition:
      'An architecture that treats local state and synchronization as core concerns so the app remains useful under unreliable connectivity.',
  },
  {
    term: 'Adaptive layout',
    definition:
      'A layout strategy that changes structure or presentation to fit different screen sizes, orientations, or device classes.',
  },
  {
    term: 'App lifecycle',
    definition:
      'The sequence of states an app or screen moves through, such as launch, foreground, background, pause, stop, and destruction.',
  },
  {
    term: 'Widget or view tree',
    definition:
      'The hierarchical composition of interface elements that defines how a screen is structured and updated.',
  },
  {
    term: 'Interop cost',
    definition:
      'The engineering and maintenance burden introduced when framework code must cross into platform-specific implementations.',
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
    { id: 'mobile98-overview', label: 'Overview' },
    { id: 'mobile98-why', label: 'Why They Matter' },
    { id: 'mobile98-problems', label: 'What They Solve' },
    { id: 'mobile98-mental-model', label: 'Mental Model' },
    { id: 'mobile98-spectrum', label: 'Framework Spectrum' },
    { id: 'mobile98-directory', label: 'Framework Directory' },
    { id: 'mobile98-why-hard', label: 'Why It Feels Hard' },
    { id: 'mobile98-when-to-use', label: 'When To Use One' },
    { id: 'mobile98-when-not-to-use', label: 'Where They Hurt' },
    { id: 'mobile98-roadmap', label: 'Coverage Roadmap' },
    { id: 'mobile98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'mobile98-rendering', label: 'Rendering Model' },
    { id: 'mobile98-state', label: 'State and Effects' },
    { id: 'mobile98-navigation', label: 'Navigation' },
    { id: 'mobile98-platform', label: 'Platform APIs' },
    { id: 'mobile98-performance', label: 'Performance' },
    { id: 'mobile98-design', label: 'Design and Accessibility' },
    { id: 'mobile98-builds', label: 'Builds and Signing' },
    { id: 'mobile98-data', label: 'Data and Offline' },
    { id: 'mobile98-testing', label: 'Testing and Debugging' },
    { id: 'mobile98-accessibility', label: 'Adaptive Layout' },
    { id: 'mobile98-selection', label: 'Framework Evaluation' },
    { id: 'mobile98-failure-modes', label: 'Failure Modes' },
  ],
  examples: [
    { id: 'mobile98-example-flutter', label: 'Flutter Widget State' },
    { id: 'mobile98-example-compose', label: 'Compose State Hoisting' },
    { id: 'mobile98-example-react-native', label: 'React Native Effects' },
    { id: 'mobile98-example-swiftui', label: 'SwiftUI Navigation' },
    { id: 'mobile98-example-interop', label: 'Native Interop Boundary' },
    { id: 'mobile98-example-navigation', label: 'Restorable Routes' },
  ],
  glossary: [{ id: 'mobile98-glossary', label: 'Glossary' }],
}

function toFrameworkRoute(name: string): string {
  return `${MOBILE_FRAMEWORKS_BASE_ROUTE}/${slugifySegment(name)}`
}

function renderContentSection(
  section: ContentSection,
  isLast: boolean,
  options?: { linkedBullets?: string[] },
): JSX.Element {
  const linkedBullets = new Set(options?.linkedBullets ?? [])

  return (
    <section key={section.id} id={section.id} className="mobile98-section">
      <h2 className="mobile98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>
              {linkedBullets.has(item) ? (
                <Link to={toFrameworkRoute(item)} className="mobile98-inline-link">
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="mobile98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="mobile98-section">
      <h2 className="mobile98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="mobile98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <p>
        <strong>Takeaway:</strong> {section.takeaway}
      </p>
      {isLast ? null : <hr className="mobile98-divider" />}
    </section>
  )
}

export default function MobileFrameworksPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Mobile Frameworks',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Mobile Frameworks"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Mobile Frameworks</h1>
      <p className="mobile98-doc-subtitle">
        Help-style overview of mobile app architecture, UI systems, native interop, lifecycle
        concerns, and the framework pages available in this subsection.
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
        <section id="mobile98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      ) : null}
    </TopicPageShell>
  )
}
