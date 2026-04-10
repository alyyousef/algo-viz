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

const MOBILE_DEVELOPMENT_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/mobile-development'

const categoryDirectory = [
  'Android Ecosystem',
  'iOS Ecosystem',
  'Cross-Platform Ecosystem',
  'Mobile Backend and Services',
]

const introParagraphs = [
  'Mobile Development is the overview page for the part of Languages & Ecosystems that focuses on building, shipping, operating, and evolving applications for phones and tablets. It sits above individual tools and frameworks and explains the broader system: native platforms, cross-platform strategies, device APIs, backend integration, testing, release engineering, and day-two maintenance on real user devices.',
  'The most important mental shift is that mobile development is not only UI programming. It includes application lifecycle, connectivity, local persistence, push notifications, platform permissions, signing, store distribution, analytics, crash reporting, performance budgets, accessibility, and the social workflow between product, design, QA, backend, and platform engineers.',
  'The child pages in this subsection cover Android, iOS, cross-platform ecosystems, and mobile backend and service tooling. This overview page is the field guide for understanding how those pieces fit together, why mobile delivery feels different from web or desktop work, and how to reason about the tradeoffs before drilling into specific technologies.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'mobdev98-overview',
    title: 'Overview',
    paragraphs: [
      'Mobile development is the discipline of creating software that runs reliably on mobile operating systems, integrates with device capabilities, and survives the constraints of distribution through app stores and device fleets. The work is not limited to drawing screens. It spans user interaction, data synchronization, platform integration, build pipelines, release safety, and long-term compatibility with evolving OS versions.',
      'What makes mobile development distinct is that the operating system remains deeply involved after launch. Apps can be paused, backgrounded, resumed, interrupted by calls, denied permissions, killed to reclaim memory, or restored from notifications and deep links. That means mobile architecture must account for lifecycle transitions and interrupted work from the beginning rather than treating them as edge cases.',
      'The field also mixes product polish with systems thinking. The user judges responsiveness, animation smoothness, battery usage, storage footprint, and platform feel immediately, while the engineering team must simultaneously manage networking, analytics, security, observability, and release engineering. Good mobile development is therefore both experiential and infrastructural.',
    ],
  },
  {
    id: 'mobdev98-why',
    title: 'Why Mobile Development Matters',
    paragraphs: [
      'Mobile is often the closest software channel to the user. Phones are always present, packed with sensors, tied to identity and payment systems, and used under changing network and attention conditions. That proximity makes the platform strategically important but also unforgiving. Poor architecture surfaces as battery drain, broken offline behavior, notification bugs, install friction, or app-store rejection rather than as abstract technical debt.',
      'It also matters because mobile products compress many concerns into one shipped artifact. The app must look good, recover from failures, protect user data, handle platform APIs safely, and remain maintainable across many releases. Teams cannot separate the user-facing application from release workflow and runtime operations because all of it ships together to the device.',
      'For many organizations, mobile development additionally forces clearer product decisions. Platform coverage, native fidelity, backend contracts, analytics instrumentation, experimentation strategy, and release cadence all become explicit once the app has to survive store review and diverse hardware environments.',
    ],
    bullets: [
      'It combines product experience with systems and release engineering.',
      'It sits close to identity, notifications, sensors, camera, payments, and location.',
      'It magnifies the cost of weak lifecycle handling and weak offline behavior.',
      'It demands coordination across client, backend, design, QA, and operations.',
      'It makes long-term maintenance and store distribution part of the architecture.',
    ],
  },
  {
    id: 'mobdev98-scope',
    title: 'What Mobile Development Includes',
    paragraphs: [
      'A broad mobile development program includes platform-native UI systems, networking and API contracts, local storage and synchronization, authentication, notifications, observability, testing, release automation, and store-facing operational concerns. Teams may specialize in only one slice, but real products eventually need coherent answers for all of them.',
      'That is why this topic is wider than any single framework page. The subsection contains tools for Android and iOS specifically, tools for shared cross-platform delivery, and backend or service tools that mobile teams rely on for auth, analytics, distribution, and notifications. The overview page exists to keep those pieces conceptually connected.',
      'A useful way to think about scope is to separate mobile development into four layers: platform UI and runtime, application architecture and data flow, platform and backend integration, and release and operations. Healthy teams understand how all four layers influence each other even when ownership is distributed.',
    ],
    bullets: [
      'Native Android and iOS application development.',
      'Cross-platform code and UI sharing strategies.',
      'Backend integration, sync, notifications, auth, and analytics.',
      'Testing, profiling, observability, store release, and CI-CD.',
      'Accessibility, privacy, security, localization, and performance work.',
    ],
  },
  {
    id: 'mobdev98-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'A practical mental model is that mobile development is delivery engineering for user workflows on constrained, stateful devices. The device is not just a screen. It is a storage target, a notification endpoint, a sensor hub, an intermittently connected network client, and an operating-system participant that can interrupt or destroy the app at inconvenient times.',
      'This perspective helps explain why so many mobile problems look cross-cutting. A simple purchase flow might involve routing, authentication refresh, background resume, local cache, server retries, analytics events, accessibility announcements, and release flags. None of those concerns live cleanly in only one widget or view controller.',
      'The right question is therefore not just how to render a screen. The right question is how to keep the screen, the local state, the backend contract, the platform rules, and the release process aligned while the app evolves over many versions.',
    ],
  },
  {
    id: 'mobdev98-delivery',
    title: 'The Delivery Pipeline',
    paragraphs: [
      'Most mobile products move through a repeated delivery loop: define feature intent, implement platform and backend changes, verify behavior on real devices, package a signed build, distribute through internal or external channels, watch telemetry, and iterate based on crashes, performance signals, and user feedback. That loop is part of the product, not support work outside it.',
      'This matters because mobile release is slower and more stateful than many web deployments. Builds must be signed, reviewed, installed, and often approved by stores. Users do not all move to the latest version immediately. The team has to support mixed client versions while keeping API contracts and feature flags safe.',
      'A strong mobile organization therefore treats build reproducibility, staged rollouts, feature gates, crash monitoring, and rollback strategy as first-class engineering concerns rather than as paperwork that happens after the code is written.',
    ],
  },
  {
    id: 'mobdev98-directory',
    title: 'Section Map',
    paragraphs: [
      'The overview branches into the four major areas below. Together they represent the recurring technical surface area that most mobile teams eventually need to understand.',
    ],
    bullets: categoryDirectory,
  },
  {
    id: 'mobdev98-why-hard',
    title: 'Why Mobile Development Feels Hard',
    paragraphs: [
      'Mobile development feels hard because almost every layer stays live at the same time. UI, network state, persistence, lifecycle, notifications, deep links, permissions, accessibility, analytics, store release, and OS compatibility all interact. A bug that looks cosmetic may really be caused by missing state restoration, retry policy, or a release-specific configuration issue.',
      'It also feels hard because the user experiences problems directly. Scroll jank, startup delay, keyboard overlap, broken back navigation, oversized downloads, and battery drain are immediately visible. The team does not get to hide behind backend abstractions when the device-level behavior is poor.',
      'Finally, the field is fragmented by design. Android and iOS evolve independently, hardware is diverse, stores impose different policies, and cross-platform tools only shift where the complexity lives. The challenge is not avoiding complexity entirely. It is putting it in places the team can manage deliberately.',
    ],
  },
  {
    id: 'mobdev98-native-depth',
    title: 'When Native Depth Matters Most',
    paragraphs: [
      'Native depth matters when the product depends heavily on platform-specific behavior, performance-sensitive UI, complex animations, advanced background processing, or deep use of device APIs. In those cases, the team benefits from working close to the platform runtime, platform tooling, and platform design conventions instead of abstracting over them too early.',
      'It also matters when the organization can sustain dedicated Android and iOS expertise. Native depth tends to improve debugging clarity and platform fidelity, but it also means product decisions must account for duplicated implementation effort and platform-specific planning.',
      'The key is not to idealize native work. It is to recognize when platform-specific control removes more risk than it creates.',
    ],
  },
  {
    id: 'mobdev98-shared-strategy',
    title: 'When Shared Abstractions Help Most',
    paragraphs: [
      'Shared strategies help when the product has many conventional screens, limited platform divergence, and a team that needs to move quickly across iOS and Android without duplicating all business logic and UI effort. Cross-platform approaches can reduce repeated work, centralize design system implementation, and make feature delivery more predictable.',
      'However, shared abstractions are useful only when the team understands the native boundary clearly. Shared code does not eliminate lifecycle, notifications, permissions, store rules, or device integration. It changes how those concerns are expressed and where specialists need to step in.',
      'The correct question is not native versus cross-platform as identity. It is where sharing reduces accidental complexity and where sharing would hide essential platform detail.',
    ],
  },
  {
    id: 'mobdev98-roadmap',
    title: 'Coverage Roadmap',
    paragraphs: [
      'The original page was a placeholder. That original intent is preserved here as a roadmap so the subsection can continue expanding while keeping the same scope goals.',
    ],
    bullets: [
      'Overview and key ideas will be added.',
      'Core syntax, APIs, ecosystem, and architecture notes will be added.',
      'Use cases, tradeoffs, and compare/contrast references will be added.',
    ],
  },
  {
    id: 'mobdev98-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Mobile development is broader than screen building. It is the practice of delivering trustworthy software onto devices with their own lifecycle rules, performance constraints, store distribution gates, and platform conventions. Good teams treat architecture, release engineering, backend integration, and user experience as one system.',
      'The strongest decisions in mobile work usually come from understanding where platform specificity matters, where sharing helps, how lifecycle and offline behavior affect architecture, and how build and release constraints shape technical choices from the start.',
    ],
    bullets: [
      'Treat mobile delivery as a full-stack product system, not only as UI work.',
      'Design for lifecycle interruptions, mixed client versions, and unreliable networks early.',
      'Use native or shared strategies based on product constraints rather than ideology.',
      'Assume release, observability, and device behavior are core parts of the architecture.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'mobdev98-platform-models',
    title: 'Platform Models and Runtime Boundaries',
    paragraphs: [
      'Android and iOS expose different platform models, tooling stacks, and lifecycle behavior. Even when teams share code, they still need to understand how each platform launches activities or scenes, manages background work, exposes permissions, and packages release artifacts. Platform literacy remains a core skill because the underlying runtime eventually shapes debugging and integration work.',
      'Cross-platform tools do not remove these boundaries. They provide a structured way to move some logic or UI above them. The engineering challenge is deciding which parts should remain platform-native and which parts benefit from sharing.',
      "A durable architecture makes those boundaries explicit. That usually means isolating platform APIs, keeping shared domain logic portable, and avoiding accidental coupling between one platform's assumptions and the rest of the app.",
    ],
  },
  {
    id: 'mobdev98-ui-state',
    title: 'UI, State, and Navigation',
    paragraphs: [
      'Mobile UI systems have become increasingly declarative, but the central problem remains the same: represent state clearly, derive screens from that state, and keep navigation and side effects from becoming entangled. Screens rarely own only local state; they coordinate remote data, transient form input, loading states, optimistic actions, and restoration after interruption.',
      'Navigation is especially architectural on mobile because apps can start from many entry points such as icons, widgets, deep links, notifications, or restored sessions. Route modeling, back-stack semantics, and argument safety affect correctness, analytics, and user trust.',
      'Healthy mobile architectures tend to separate rendering from business state and isolate effectful work such as networking, persistence, and analytics behind predictable interfaces.',
    ],
  },
  {
    id: 'mobdev98-lifecycle',
    title: 'Lifecycle and Interrupted Work',
    paragraphs: [
      'Lifecycle is a defining mobile concern. The app can be foregrounded, backgrounded, paused, resumed, killed, or relaunched in ways the user does not perceive as abnormal. Work that assumes uninterrupted execution is fragile by default.',
      'This affects authentication refresh, media playback, uploads, form recovery, screen restoration, and any workflow that spans time. Teams have to define what state is ephemeral, what state is persisted, and what work should resume automatically versus requiring explicit user confirmation.',
      'The better the architecture handles interruption, the more reliable the app feels under real conditions instead of only in ideal test runs.',
    ],
  },
  {
    id: 'mobdev98-networking',
    title: 'Networking, APIs, and Versioned Contracts',
    paragraphs: [
      'Mobile networking is complicated by mixed client versions, intermittent connectivity, captive portals, token expiry, and the reality that users may upgrade slowly. API design for mobile must therefore prioritize backwards compatibility, clear error semantics, and resilience to stale clients.',
      'Teams should think in terms of versioned contracts, explicit retry and timeout policy, cache strategy, and idempotent operations where appropriate. A request layer is not only a convenience wrapper. It is part of how the product behaves under poor connectivity and release lag.',
      'Good mobile teams also avoid pushing too much policy into the view layer. Networking behavior belongs in data and domain boundaries that can be tested and evolved independently from screen composition.',
    ],
  },
  {
    id: 'mobdev98-storage-sync',
    title: 'Local Storage, Caching, and Synchronization',
    paragraphs: [
      'Most serious mobile apps need local persistence for session state, cached content, queued writes, downloaded assets, or offline workflows. The difficulty is not merely saving bytes locally. It is deciding how local truth and server truth reconcile over time.',
      'Offline-first and cache-aware architectures force teams to think about conflict resolution, freshness policy, data eviction, and replay of queued actions after reconnect. These decisions shape user trust because stale or disappearing data feels like product failure even when the underlying network was the root cause.',
      'Framework and platform choices matter here because storage libraries, serialization formats, and background execution limits differ. The architecture must adapt to those limits instead of assuming a desktop-style always-on environment.',
    ],
  },
  {
    id: 'mobdev98-device-services',
    title: 'Device Capabilities and Service Integration',
    paragraphs: [
      'Mobile apps frequently rely on camera, photo library, location, biometrics, notifications, contacts, sharing, Bluetooth, background refresh, and secure storage. These capabilities are powerful but tightly governed by platform rules, permission flows, and hardware variability.',
      'The engineering challenge is to integrate them through explicit boundaries. Teams need to know who owns platform modules, how capability errors are surfaced, how permission denial is handled gracefully, and how fallbacks behave on unsupported devices.',
      'Service integration adds another layer. Push systems, analytics SDKs, auth providers, feature flags, and crash reporters all interact with lifecycle and release behavior. They should be introduced intentionally rather than scattered throughout presentation code.',
    ],
  },
  {
    id: 'mobdev98-build-release',
    title: 'Build, Signing, Distribution, and CI-CD',
    paragraphs: [
      'Mobile release engineering includes debug and release variants, environment configuration, provisioning and signing, test distribution, store metadata, review submission, phased rollout, and post-release monitoring. It is one of the main reasons mobile delivery deserves its own architectural category.',
      'A build pipeline becomes dangerous when secrets, environment selection, native project settings, and versioning rules are undocumented or inconsistent across machines. Mature teams centralize those concerns so builds are reproducible and auditable.',
      'CI-CD on mobile is most valuable when it reduces release risk rather than merely automating commands. That usually means running tests, building signed artifacts predictably, distributing to testers, collecting symbols and metadata, and making rollout decisions observable.',
    ],
  },
  {
    id: 'mobdev98-testing-observability',
    title: 'Testing, Profiling, and Observability',
    paragraphs: [
      'Mobile quality depends on a layered verification strategy. Unit tests catch domain logic regressions, UI and integration tests verify screen behavior and navigation, and device-level tests cover lifecycle, permission, notification, and hardware-sensitive flows that simulators or emulators do not fully represent.',
      'Observability matters equally. Crash reports, structured logs, analytics funnels, performance traces, and feature-flag metadata help teams understand what actually happens after release. Mobile systems are too distributed across devices to rely on local debugging alone.',
      'The most effective teams connect these practices. They test the riskiest workflows before release and instrument the same workflows in production so they can confirm assumptions instead of guessing after incidents.',
    ],
  },
  {
    id: 'mobdev98-security-privacy',
    title: 'Security, Privacy, and Trust Boundaries',
    paragraphs: [
      'Mobile apps often handle credentials, tokens, personal information, payment context, or location data. Security and privacy therefore cannot be bolted on after the UI is complete. Teams need clear trust boundaries around local storage, network transport, authentication refresh, secret handling, and third-party SDK access.',
      'Privacy is also a product concern. Data collection choices influence permissions, consent copy, analytics design, and store compliance. Weak privacy decisions create both legal risk and user distrust, especially when device-level permissions are involved.',
      'Secure mobile engineering usually means minimizing sensitive local data, using platform-secure storage appropriately, auditing external dependencies, and designing failure paths that do not leak internal assumptions or personal information.',
    ],
  },
  {
    id: 'mobdev98-performance',
    title: 'Performance, Startup, and Battery Budgets',
    paragraphs: [
      'Performance on mobile is experienced in startup time, input responsiveness, list smoothness, animation quality, memory usage, download size, and battery impact. The wrong architecture can feel fine on flagship devices while degrading severely on mid-range hardware where many users actually live.',
      'Performance work should be budget-based rather than reactive. Teams should know which screens must feel instantaneous, what startup path is acceptable, how much background work is justified, and which analytics or SDK integrations add measurable cost.',
      'This is another reason the field cannot be reduced to UI. Rendering performance, network policy, image handling, storage strategy, and background execution all contribute to how the app feels and how often users keep it installed.',
    ],
  },
  {
    id: 'mobdev98-team-workflow',
    title: 'Team Topology and Product Workflow',
    paragraphs: [
      'Mobile delivery sits at the intersection of many disciplines: product, design, backend, QA, analytics, release engineering, and often dedicated Android or iOS specialists. Team topology shapes the codebase because unclear ownership quickly turns into unclear module boundaries and unclear release responsibility.',
      'A healthy workflow defines who owns design-system changes, who owns native integrations, who responds to crash spikes, who approves release candidates, and how backend changes are coordinated against mobile version lag. Without that clarity, technical architecture degrades under organizational ambiguity.',
      'The best mobile teams build processes that match the code structure: clear interfaces, clear owners, predictable release cadence, and enough observability to decide what to fix first after shipping.',
    ],
  },
  {
    id: 'mobdev98-failure-modes',
    title: 'Common Failure Modes',
    paragraphs: [
      'Mobile projects often fail in familiar ways. Teams ignore lifecycle until process death destroys user progress. They centralize too much mutable state and lose screen ownership. They adopt cross-platform tooling without assigning native-module responsibility. They release without staged monitoring and only discover severe crashes after broad rollout.',
      'Other failures are subtler: weak offline assumptions, backend contracts that break older clients, analytics SDK sprawl, inaccessible custom components, oversized assets, and environment-specific build scripts that only work on one machine. None of these are rare. They are recurring structural mistakes.',
      'The strongest defenses are explicit boundaries, reproducible builds, realistic device testing, measurable performance goals, and a willingness to treat mobile delivery as a system rather than a pile of screens.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'mobdev98-example-android',
    title: 'Example: Android Screen State with ViewModel',
    description: [
      'A common Android pattern is to keep long-lived screen state out of the composable itself so configuration changes and async work remain manageable. The view model owns the state and the UI renders from it.',
      'The example shows the architectural idea more than a complete production implementation.',
    ],
    code: `class FeedViewModel(
    private val repository: FeedRepository,
) : ViewModel() {
    private val _uiState = MutableStateFlow(FeedUiState())
    val uiState: StateFlow<FeedUiState> = _uiState

    fun refresh() = viewModelScope.launch {
        _uiState.update { it.copy(isLoading = true) }
        val items = repository.fetchLatest()
        _uiState.update { it.copy(isLoading = false, items = items) }
    }
}`,
    takeaway:
      'Screen models help Android code survive recomposition and configuration changes without pushing business logic into the UI layer.',
  },
  {
    id: 'mobdev98-example-ios',
    title: 'Example: SwiftUI Async Screen Loading',
    description: [
      'In SwiftUI, screens often become easier to reason about when loading state, error state, and content state are represented explicitly rather than implied through optional values and ad hoc flags.',
      'This example focuses on clarity of state transitions.',
    ],
    code: `struct ProfileView: View {
    @State private var profile: Profile?
    @State private var isLoading = false

    var body: some View {
        Group {
            if isLoading {
                ProgressView()
            } else if let profile {
                Text(profile.name)
            } else {
                Text("No profile loaded")
            }
        }
        .task {
            isLoading = true
            profile = try? await api.loadProfile()
            isLoading = false
        }
    }
}`,
    takeaway:
      'Explicit state transitions make lifecycle and async work easier to inspect and test on iOS.',
  },
  {
    id: 'mobdev98-example-shared',
    title: 'Example: Shared Domain Layer Boundary',
    description: [
      'When teams share code across platforms, the most durable sharing often happens in domain or data layers rather than in every platform-specific surface. A narrow interface allows the native app shells to remain flexible.',
      'This pseudocode shows the boundary, not any one framework syntax.',
    ],
    code: `interface SessionRepository {
  suspend fun currentUser(): User?
  suspend fun refreshSession(): SessionState
  suspend fun signOut()
}

class SessionService(private val repository: SessionRepository) {
  suspend fun ensureSignedIn(): Boolean {
    return repository.currentUser() != null ||
      repository.refreshSession() is SessionState.Active
  }
}`,
    takeaway:
      'Shared logic lasts longer when it is built around domain contracts instead of trying to abstract every platform difference.',
  },
  {
    id: 'mobdev98-example-push',
    title: 'Example: Push Registration Flow',
    description: [
      'Push notifications look simple from the outside, but the implementation crosses device tokens, permission state, backend registration, and release environments. The flow should be modeled explicitly.',
      'The example highlights sequencing rather than provider-specific details.',
    ],
    code: `async function registerForPushNotifications() {
  const permission = await requestNotificationPermission()
  if (permission !== 'granted') return 'declined'

  const deviceToken = await getPlatformPushToken()
  await backend.registerPushToken({
    deviceToken,
    platform: currentPlatform(),
    appVersion: currentVersion(),
  })

  return 'registered'
}`,
    takeaway:
      'Device capability flows should be treated as state machines with explicit permission and backend registration steps.',
  },
  {
    id: 'mobdev98-example-sync',
    title: 'Example: Offline Write Queue',
    description: [
      'Offline-friendly mobile apps often queue writes locally and replay them when connectivity returns. That requires explicit modeling of pending work, not just a retry loop inside a button handler.',
      'The goal is to preserve user intent even when the network is unreliable.',
    ],
    code: `suspend fun submitDraft(draft: Draft) {
    localStore.enqueuePendingMutation(draft)

    try {
        api.submitDraft(draft)
        localStore.markMutationComplete(draft.id)
    } catch (_: IOException) {
        scheduler.requestRetry()
    }
}`,
    takeaway:
      'Offline resilience comes from durable intent tracking, not from assuming the user can simply retry manually later.',
  },
  {
    id: 'mobdev98-example-release',
    title: 'Example: Release Lane Mindset',
    description: [
      'Mobile release automation should encode the checks and artifacts required to ship safely instead of acting as a thin wrapper around manual commands. The release pipeline is part of the architecture.',
      'This example is intentionally conceptual.',
    ],
    code: `lane :release_candidate do
  run_tests
  build_signed_artifact
  upload_symbols
  distribute_to_testers
  record_build_metadata
end`,
    takeaway:
      'A useful CI-CD pipeline reduces release risk by standardizing verification, packaging, and observability steps.',
  },
]

const glossary: Array<{ term: string; definition: string }> = [
  {
    term: 'Activity or scene lifecycle',
    definition:
      'The platform-managed sequence of creation, foregrounding, backgrounding, suspension, and destruction that affects app behavior over time.',
  },
  {
    term: 'Deep link',
    definition:
      'A route that opens the app directly into a specific screen or workflow from outside the app.',
  },
  {
    term: 'Push token',
    definition:
      'A platform-issued identifier used by a push notification provider to target a specific app installation.',
  },
  {
    term: 'Provisioning and signing',
    definition:
      'The certificates, keys, profiles, and identity settings required to build and distribute mobile apps.',
  },
  {
    term: 'Offline-first',
    definition:
      'An architectural approach that treats local persistence and synchronization as core concerns instead of assuming constant connectivity.',
  },
  {
    term: 'View model or screen model',
    definition:
      'A state-owning layer that prepares data and actions for a screen while keeping rendering logic relatively simple.',
  },
  {
    term: 'Hot reload or live preview',
    definition:
      'A development capability that shortens iteration time by applying UI changes without a full rebuild or restart.',
  },
  {
    term: 'Build variant',
    definition:
      'A distinct build configuration such as debug, release, staging, or internal testing output.',
  },
  {
    term: 'Feature flag',
    definition:
      'A runtime-controlled switch that allows behavior to be enabled, disabled, or rolled out gradually.',
  },
  {
    term: 'Cold start',
    definition:
      'Launching the app from a fully terminated state, including startup work before the first meaningful screen is interactive.',
  },
  {
    term: 'Warm start',
    definition:
      'Resuming the app from an already running or backgrounded state with less startup work than a cold start.',
  },
  {
    term: 'Background task',
    definition:
      'Work allowed to continue or be scheduled while the app is not fully in the foreground, usually under strict platform limits.',
  },
  {
    term: 'App-store review',
    definition:
      'The approval process required by platform stores before certain mobile app releases can be distributed publicly.',
  },
  {
    term: 'Crash symbol upload',
    definition:
      'Publishing debug symbol information so production crash reports can be translated into meaningful stack traces.',
  },
  {
    term: 'Safe area',
    definition:
      'The portion of the screen that avoids system UI intrusions such as notches, rounded corners, or gesture regions.',
  },
  {
    term: 'State restoration',
    definition:
      "Reconstructing the user's visible workflow or screen state after interruption, process death, or relaunch.",
  },
  {
    term: 'Native module',
    definition:
      'A platform-specific implementation used by shared code to reach operating-system capabilities or custom integrations.',
  },
  {
    term: 'Telemetry',
    definition:
      'Operational data such as logs, traces, crash reports, and analytics used to understand runtime behavior after release.',
  },
  {
    term: 'Binary size',
    definition:
      'The size of the packaged app delivered to users, affecting download time, install footprint, and sometimes startup behavior.',
  },
  {
    term: 'Version lag',
    definition:
      'The period where users remain on older client versions, forcing backend and feature logic to handle mixed deployments safely.',
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
    { id: 'mobdev98-overview', label: 'Overview' },
    { id: 'mobdev98-why', label: 'Why It Matters' },
    { id: 'mobdev98-scope', label: 'What It Includes' },
    { id: 'mobdev98-mental-model', label: 'Mental Model' },
    { id: 'mobdev98-delivery', label: 'Delivery Pipeline' },
    { id: 'mobdev98-directory', label: 'Section Map' },
    { id: 'mobdev98-why-hard', label: 'Why It Feels Hard' },
    { id: 'mobdev98-native-depth', label: 'When Native Depth Matters' },
    { id: 'mobdev98-shared-strategy', label: 'When Sharing Helps' },
    { id: 'mobdev98-roadmap', label: 'Coverage Roadmap' },
    { id: 'mobdev98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'mobdev98-platform-models', label: 'Platform Models' },
    { id: 'mobdev98-ui-state', label: 'UI and State' },
    { id: 'mobdev98-lifecycle', label: 'Lifecycle' },
    { id: 'mobdev98-networking', label: 'Networking' },
    { id: 'mobdev98-storage-sync', label: 'Storage and Sync' },
    { id: 'mobdev98-device-services', label: 'Device Services' },
    { id: 'mobdev98-build-release', label: 'Build and Release' },
    { id: 'mobdev98-testing-observability', label: 'Testing and Observability' },
    { id: 'mobdev98-security-privacy', label: 'Security and Privacy' },
    { id: 'mobdev98-performance', label: 'Performance' },
    { id: 'mobdev98-team-workflow', label: 'Team Workflow' },
    { id: 'mobdev98-failure-modes', label: 'Failure Modes' },
  ],
  examples: [
    { id: 'mobdev98-example-android', label: 'Android Screen State' },
    { id: 'mobdev98-example-ios', label: 'SwiftUI Async State' },
    { id: 'mobdev98-example-shared', label: 'Shared Domain Layer' },
    { id: 'mobdev98-example-push', label: 'Push Registration' },
    { id: 'mobdev98-example-sync', label: 'Offline Write Queue' },
    { id: 'mobdev98-example-release', label: 'Release Lane' },
  ],
  glossary: [{ id: 'mobdev98-glossary', label: 'Glossary' }],
}

function toSectionRoute(name: string): string {
  return `${MOBILE_DEVELOPMENT_BASE_ROUTE}/${slugifySegment(name)}`
}

function renderContentSection(
  section: ContentSection,
  isLast: boolean,
  options?: { linkedBullets?: string[] },
): JSX.Element {
  const linkedBullets = new Set(options?.linkedBullets ?? [])

  return (
    <section key={section.id} id={section.id} className="mobdev98-section">
      <h2 className="mobdev98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>
              {linkedBullets.has(item) ? (
                <Link to={toSectionRoute(item)} className="mobdev98-inline-link">
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="mobdev98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="mobdev98-section">
      <h2 className="mobdev98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="mobdev98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <p>
        <strong>Takeaway:</strong> {section.takeaway}
      </p>
      {isLast ? null : <hr className="mobdev98-divider" />}
    </section>
  )
}

export default function MobileDevelopmentPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Mobile Development',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Mobile Development"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Mobile Development</h1>
      <p className="mobdev98-doc-subtitle">
        Help-style overview of native and cross-platform mobile work, device integration, backend
        services, release engineering, and the subsection pages available in this ecosystem.
      </p>

      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1, {
              linkedBullets: categoryDirectory,
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
        <section id="mobdev98-glossary" className="bin98-section">
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
