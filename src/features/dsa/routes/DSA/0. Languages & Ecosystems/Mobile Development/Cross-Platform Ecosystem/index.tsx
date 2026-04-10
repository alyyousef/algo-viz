import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

// ─── Big Picture ──────────────────────────────────────────────────────────────

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Cross-platform mobile development lets a single codebase target iOS, Android, and sometimes web or desktop simultaneously. Frameworks vary in how much native code they generate or call: from compiled native (Flutter, KMP) to a JavaScript bridge (React Native) to a WebView wrapper (Ionic).',
    notes:
      'No cross-platform approach eliminates all platform-specific work. Each framework trades a different set of compromises between code sharing, performance, and native fidelity.',
  },
  {
    title: 'Why it matters',
    details:
      'Shipping on both iOS and Android with one team and one codebase compresses release cycles and reduces duplicated business logic. The trade-off is a layer of abstraction whose leaks require platform knowledge to debug.',
    notes:
      'Cross-platform is strongest for apps where business logic dominates and UI is relatively standard. Apps with deep OS integration, complex animations, or strict platform UI guidelines often find the native path cheaper in the long run.',
  },
  {
    title: 'The major options',
    details:
      'Flutter (Dart, Google), React Native (JavaScript/TypeScript, Meta), Kotlin Multiplatform (Kotlin, JetBrains), Ionic/Capacitor (web stack), and .NET MAUI (C#, Microsoft) are the primary production-ready frameworks as of 2024.',
    notes:
      'Flutter and React Native dominate market share. KMP is growing rapidly as a logic-sharing layer rather than a full-UI framework. Ionic suits web teams extending to mobile.',
  },
  {
    title: 'History snapshot',
    details:
      'PhoneGap (2009) pioneered WebView-based mobile apps. Xamarin (2011) brought C# to iOS/Android. React Native (2015) introduced the JS bridge model. Flutter (2018) shipped a compiled rendering engine. KMP Stable (2023) formalized shared Kotlin logic across all platforms.',
    notes:
      'Each generation addressed the performance or fidelity gaps of the previous one. Understanding the history explains the architectural choices each framework made.',
  },
]

// ─── Mental Model ─────────────────────────────────────────────────────────────

const mentalModel = [
  {
    title: 'Three axes of sharing',
    detail:
      'UI code, business logic, and data/network layers can each be shared independently. KMP shares only logic; Flutter shares logic and UI; React Native shares logic and a JS-described UI mapped to native components. Choosing a framework means choosing where the boundary sits.',
  },
  {
    title: 'The abstraction tax',
    detail:
      'Every cross-platform layer adds indirection between your code and the OS. Indirection costs performance, delays access to new OS APIs, and requires the framework team to expose platform features on your behalf. The tax is real; the question is whether it is worth paying for your use case.',
  },
  {
    title: 'Platform channels and bridges',
    detail:
      'When your framework cannot do something natively, you write a platform channel (Flutter), native module (React Native), or expect declaration (KMP) to call platform code. These bridges are unavoidable for deep OS integration. Budget time for them.',
  },
  {
    title: 'Shared logic vs shared UI',
    detail:
      "Sharing UI across platforms risks diverging from each platform's design language. Sharing only business logic (networking, state, domain rules) while writing platform-native UI (Compose + SwiftUI) gives the best of both worlds at the cost of two UI codebases.",
  },
  {
    title: 'The native module gap',
    detail:
      'New OS APIs (iOS 17 features, Android 14 APIs) are unavailable in cross-platform frameworks until the framework team or the community ships a plugin/binding. For cutting-edge OS features, native is always first.',
  },
  {
    title: 'Testing surface doubles',
    detail:
      'A cross-platform app must be tested on both iOS and Android. A framework that makes writing tests easy does not remove the need to run those tests on both platforms. CI pipelines must include both platform simulator and emulator runs.',
  },
]

// ─── Flutter ──────────────────────────────────────────────────────────────────

const flutterConcepts = [
  {
    title: 'Architecture',
    detail:
      'Flutter compiles Dart to native ARM code and renders UI through its own Skia/Impeller graphics engine, bypassing native platform widgets entirely. This gives pixel-perfect cross-platform UI but means Flutter widgets do not look like native controls by default.',
  },
  {
    title: 'Widget tree',
    detail:
      'Everything in Flutter is a widget. The UI is a tree of immutable Widget objects. State changes trigger a rebuild of the affected subtree. StatelessWidget for static content; StatefulWidget for mutable state; InheritedWidget/Provider for DI.',
  },
  {
    title: 'State management',
    detail:
      'Flutter has no built-in standard. Popular options: Riverpod (type-safe, compile-time verified), Bloc/Cubit (event-driven, testable), Provider (InheritedWidget wrapper), and GetX (opinionated, lightweight). Riverpod and Bloc are most common in production.',
  },
  {
    title: 'Platform channels',
    detail:
      'Flutter communicates with native code via MethodChannel (request/response), EventChannel (streams), and BasicMessageChannel (arbitrary messages). Use for anything the Flutter SDK does not expose: Bluetooth, local notifications, background tasks.',
  },
  {
    title: 'Build outputs',
    detail:
      'flutter build apk / appbundle for Android; flutter build ipa for iOS. Flutter also targets web (HTML/CanvasKit), macOS, Windows, and Linux. The same Dart codebase can target all six platforms.',
  },
  {
    title: 'Hot reload / hot restart',
    detail:
      'Hot reload injects changed Dart code into the running VM, preserving state. Hot restart restarts the app from scratch but faster than a full rebuild. Both significantly speed up iteration compared to full native compile cycles.',
  },
  {
    title: 'Null safety',
    detail:
      'Dart has sound null safety. Variables are non-nullable by default. Nullable types are declared with ?. The compiler enforces null safety statically, eliminating an entire category of runtime null-pointer crashes.',
  },
]

// ─── React Native ─────────────────────────────────────────────────────────────

const reactNativeConcepts = [
  {
    title: 'Architecture — old vs new',
    detail:
      'The original architecture used a JavaScript bridge with async JSON serialization between JS and native. The new architecture (React Native 0.68+) uses JSI (JavaScript Interface) for synchronous direct calls between JS and C++, eliminating the bridge bottleneck.',
  },
  {
    title: 'Native components',
    detail:
      'React Native maps JavaScript component declarations to actual platform native views: View → UIView/android.view.View, Text → UILabel/TextView, etc. UI is rendered by the platform, not a custom engine. This gives authentic native look and feel.',
  },
  {
    title: 'Metro bundler',
    detail:
      'Metro is the JavaScript bundler for React Native. It resolves imports, transforms TypeScript/JSX, and serves bundles to the device during development. In production, the bundle is embedded in the app binary.',
  },
  {
    title: 'Expo',
    detail:
      'Expo is a framework and platform on top of React Native that removes most native toolchain setup. Expo Go allows testing without Xcode/Android Studio. Expo SDK provides curated, pre-built modules for common needs (camera, location, notifications). EAS (Expo Application Services) handles cloud builds and OTA updates.',
  },
  {
    title: 'Native modules and Turbo Modules',
    detail:
      'Legacy Native Modules communicate over the bridge. Turbo Modules use JSI for lazy, synchronous access. Writing a Turbo Module requires C++ and platform-specific code but yields near-native performance for JS↔native calls.',
  },
  {
    title: 'Fabric renderer',
    detail:
      'The new renderer (part of the new architecture). Fabric enables synchronous layout, concurrent React features (useTransition, Suspense), and multi-threaded rendering. Required for the full new-architecture performance improvements.',
  },
  {
    title: 'Over-the-air updates',
    detail:
      'OTA updates allow shipping JavaScript bundle changes without a Play Store / App Store review, since only the JS layer changes, not native binaries. Expo EAS Update and Microsoft CodePush are the main providers. Native code changes always require a full binary release.',
  },
]

// ─── Kotlin Multiplatform ─────────────────────────────────────────────────────

const kmpConcepts = [
  {
    title: 'What KMP shares',
    detail:
      'Kotlin Multiplatform shares business logic, data models, networking (Ktor), serialization (kotlinx.serialization), and coroutines across Android, iOS, desktop, and server. UI is deliberately left to each platform — Compose for Android, SwiftUI for iOS.',
  },
  {
    title: 'expect / actual mechanism',
    detail:
      'expect declares an interface or function in common code. actual provides a platform-specific implementation. This lets common code call platform APIs (UUID generation, file I/O, clock) without directly importing platform SDKs.',
  },
  {
    title: 'Kotlin/Native and Swift interop',
    detail:
      'KMP compiles Kotlin to native code for iOS via Kotlin/Native. The shared module is exposed to Swift as a regular Objective-C framework. Swift can call Kotlin classes and functions directly, though Kotlin generics require workarounds.',
  },
  {
    title: 'Compose Multiplatform',
    detail:
      "JetBrains' extension of Jetpack Compose that targets iOS, desktop (macOS, Windows, Linux), and web in addition to Android. Unlike Flutter, it uses Compose UI — familiar to Android developers. iOS support is in beta/production preview as of 2024.",
  },
  {
    title: 'Ktor Client',
    detail:
      'Kotlin-native HTTP client that works in KMP common code. Supports coroutines, content negotiation (JSON via kotlinx.serialization), WebSockets, and pluggable engines (OkHttp on Android, Darwin on iOS). The standard networking layer for KMP projects.',
  },
  {
    title: 'SQLDelight',
    detail:
      'Cross-platform SQL database for KMP. Write SQL queries in .sq files; SQLDelight generates type-safe Kotlin query functions. Backed by SQLite on Android and iOS. Supports coroutines Flow for reactive queries.',
  },
  {
    title: 'KMP project structure',
    detail:
      'commonMain contains shared code. androidMain and iosMain contain platform-specific actual implementations. The Android app imports the shared module as a Gradle dependency; the iOS app imports the generated XCFramework via CocoaPods or Swift Package Manager.',
  },
]

// ─── Ionic and Capacitor ──────────────────────────────────────────────────────

const ionicConcepts = [
  {
    title: 'Architecture',
    detail:
      'Ionic wraps a web app (HTML/CSS/JS or a framework like Angular, React, Vue) in a native WebView. Capacitor (the successor to Cordova) provides a JavaScript bridge to native APIs. The result is a web app that installs as a native app.',
  },
  {
    title: 'When it works well',
    detail:
      'Content-heavy apps, enterprise line-of-business apps, and teams with strong web expertise but no mobile background. Good for apps where UI is mostly forms, lists, and text rather than complex animations or gestures.',
  },
  {
    title: 'Performance ceiling',
    detail:
      "WebView rendering is slower than native views or Flutter's engine. Complex animations, large lists, and GPU-intensive UI hit the ceiling quickly. The gap has narrowed with modern JavaScript engines but remains real on low-end devices.",
  },
  {
    title: 'Capacitor plugins',
    detail:
      'Capacitor plugins wrap native APIs in a JavaScript interface. The official plugin library covers camera, filesystem, geolocation, push notifications, and more. Custom plugins require writing Swift/Kotlin native code.',
  },
  {
    title: 'PWA convergence',
    detail:
      'An Ionic app can also be deployed as a Progressive Web App (PWA) with minimal changes. For apps where PWA capabilities are sufficient, Ionic enables a single codebase to target web, iOS, and Android.',
  },
]

// ─── MAUI ─────────────────────────────────────────────────────────────────────

const mauiConcepts = [
  {
    title: 'What it is',
    detail:
      ".NET Multi-platform App UI (MAUI) is Microsoft's evolution of Xamarin.Forms. Write C# and XAML once; target Android, iOS, macOS, and Windows. Part of the .NET 6+ ecosystem.",
  },
  {
    title: 'When it fits',
    detail:
      'Teams with existing .NET/C# expertise, enterprise apps, or apps that also target Windows desktop. MAUI shares the same .NET BCL across all platforms, making library reuse straightforward.',
  },
  {
    title: 'Blazor Hybrid',
    detail:
      'MAUI can host Blazor components (Razor/C# web UI) inside a native app shell. This enables web teams to reuse Blazor components in mobile apps — a powerful option for organizations already invested in Blazor.',
  },
  {
    title: 'Native controls',
    detail:
      "MAUI maps XAML abstractions to platform-native controls (similar to React Native's approach). Custom renderers or handlers allow overriding the native rendering for any control.",
  },
]

// ─── Architecture Patterns ────────────────────────────────────────────────────

const architecturePatterns = [
  {
    title: 'Shared logic, native UI',
    detail:
      'KMP approach: write networking, state, and business logic in Kotlin; write Compose UI for Android and SwiftUI for iOS. Maximum platform fidelity, minimum shared surface area, two UI codebases.',
  },
  {
    title: 'Shared logic and UI (custom renderer)',
    detail:
      'Flutter approach: write everything in Dart. Platform fidelity depends on how closely the widget library mimics native design. Excellent for brand-driven apps where pixel-perfect custom UI is a feature.',
  },
  {
    title: 'Shared logic and UI (native component mapping)',
    detail:
      'React Native approach: write UI in JSX, which maps to native platform components. Platform fidelity is good by default. Limitations surface when native components behave differently on iOS vs Android.',
  },
  {
    title: 'Full-stack web (WebView)',
    detail:
      'Ionic/Capacitor approach: web code runs in a WebView. Lowest barrier for web teams. Performance and native fidelity are constrained by the WebView engine.',
  },
  {
    title: 'MVVM in cross-platform',
    detail:
      'MVVM works across all frameworks. ViewModel (or equivalent: Bloc, Riverpod Notifier, ViewModel in KMP) holds state. UI observes state. Events flow from UI to ViewModel. Business logic stays in the shared layer.',
  },
  {
    title: 'Repository pattern',
    detail:
      'Identical purpose across frameworks: abstract data sources (API, local DB) behind an interface. In KMP, the Repository lives in commonMain and is consumed by both Android and iOS ViewModels. In Flutter/RN, it lives in shared Dart/JS code.',
  },
]

// ─── Testing Strategies ───────────────────────────────────────────────────────

const testingStrategies = [
  {
    title: 'Flutter unit tests',
    detail:
      'Run on the Dart VM without a device. Use flutter_test package. Test widget trees with WidgetTester (pump, find, expect). Mock platform channels with TestDefaultBinaryMessengerBinding.',
  },
  {
    title: 'Flutter integration tests',
    detail:
      'Run on a real device or emulator with the integration_test package. Drive UI interactions programmatically and assert outcomes. Useful for full user-flow tests but slower than unit tests.',
  },
  {
    title: 'React Native unit tests',
    detail:
      'Jest is the standard. Use @testing-library/react-native for component tests that render without a device. Mock native modules with jest.mock(). Run in Node — fast.',
  },
  {
    title: 'React Native E2E',
    detail:
      'Detox (Wix) is the most mature E2E framework: tests run on a real simulator/emulator, driving UI interactions. Maestro is a newer YAML-based alternative that works across iOS and Android without writing code.',
  },
  {
    title: 'KMP shared logic tests',
    detail:
      'Common code tests run on the JVM via kotlin.test. No device required. Platform-specific actual implementations should have platform-specific tests (JUnit on Android, XCTest on iOS).',
  },
  {
    title: 'CI matrix',
    detail:
      'Cross-platform CI must run tests on both iOS simulators (macOS runners, typically GitHub Actions or Bitrise) and Android emulators. iOS builds require macOS; you cannot build an .ipa on Linux or Windows.',
  },
]

// ─── Performance Comparison ───────────────────────────────────────────────────

const performanceNotes = [
  {
    title: 'Flutter',
    detail:
      'Compiles Dart to native ARM. Custom rendering engine (Impeller) targets 60/120fps. No bridge overhead for UI. Platform channel calls are async. Generally the highest-performing cross-platform option for UI-intensive apps.',
  },
  {
    title: 'React Native (new architecture)',
    detail:
      'JSI eliminates the async bridge for JS↔native calls. Native component rendering means the OS renders the UI, not JavaScript. Startup time depends on JS bundle parse time; code splitting and Hermes engine help.',
  },
  {
    title: 'KMP',
    detail:
      'Shared logic compiles to native (Android) or native ARM (iOS via Kotlin/Native). No runtime penalty for the shared layer. Performance is identical to native because the output is native. iOS compilation via Kotlin/Native is slower than Android Gradle.',
  },
  {
    title: 'Ionic/Capacitor',
    detail:
      "Bounded by the WebView's JavaScript engine and DOM rendering. Modern WKWebView (iOS) and Chromium WebView (Android) are fast for typical content but visibly slower than native for complex animations and long lists.",
  },
  {
    title: 'Startup time',
    detail:
      'Flutter apps initialize the Dart VM at startup. React Native apps parse the JS bundle. KMP apps have native startup with no extra runtime. Large bundle sizes in RN apps increase startup time; Hermes pre-compiles to bytecode to mitigate this.',
  },
  {
    title: 'Memory',
    detail:
      'Flutter keeps the Dart heap and the Skia/Impeller GPU context in memory. React Native keeps the JS heap plus native heap. KMP adds no memory overhead beyond the Kotlin standard library. WebView-based apps keep a full browser context in memory.',
  },
]

// ─── Plugin / Native Module Ecosystem ────────────────────────────────────────

const pluginEcosystem = [
  {
    title: 'Flutter packages (pub.dev)',
    detail:
      "pub.dev is Flutter's package registry. Packages are marked with Android and iOS compatibility scores. Dart-only packages work everywhere; plugin packages wrap native code. Quality varies — check pub points, popularity, and maintenance status.",
  },
  {
    title: 'React Native packages (npm)',
    detail:
      'React Native packages are distributed via npm. The React Native Directory (reactnative.directory) is a curated index. After the new architecture, check whether a package supports Turbo Modules and Fabric, or only the legacy bridge.',
  },
  {
    title: 'KMP libraries',
    detail:
      'KMP libraries are distributed via Maven. Key libraries: Ktor (network), SQLDelight (database), kotlinx.serialization (JSON), Koin/Kodein (DI), Decompose (navigation), Molecule (Flow-based state). The ecosystem is smaller than Flutter/RN but growing rapidly.',
  },
  {
    title: 'Capacitor plugins',
    detail:
      'The official @capacitor/* plugin suite covers common needs. Community plugins extend coverage. Writing a custom plugin requires Swift (iOS) and Kotlin/Java (Android) — effectively native development.',
  },
  {
    title: 'Evaluating a plugin',
    detail:
      'Check: last commit date, open issues, new-architecture support (RN), null-safety (Flutter/Dart), iOS and Android coverage (does it implement everything or only one platform?), and active maintainers. A stale plugin is a maintenance liability.',
  },
]

// ─── Build and CI/CD ──────────────────────────────────────────────────────────

const buildAndCICD = [
  {
    title: 'Flutter builds',
    detail:
      'flutter build appbundle (Android) and flutter build ipa (iOS). iOS requires a Mac with Xcode installed and a valid provisioning profile. Android builds can run on any OS. Use Fastlane or Codemagic for automated signing and deployment.',
  },
  {
    title: 'React Native / Expo builds',
    detail:
      'Expo EAS Build runs cloud builds on managed macOS and Linux runners — no local Xcode required for iOS builds. EAS Submit automates App Store and Play Store uploads. Without Expo, use Fastlane for signing and deployment.',
  },
  {
    title: 'KMP builds',
    detail:
      'The Android app is a standard Gradle project. The iOS XCFramework is built with the Kotlin Gradle plugin (./gradlew assembleXCFramework) on a Mac. Integrate the XCFramework into the iOS Xcode project via CocoaPods or SPM.',
  },
  {
    title: 'iOS signing requirements',
    detail:
      'All iOS builds (simulator excluded) require an Apple Developer account, a signing certificate, and a provisioning profile. Certificates are tied to the machine and account. Fastlane Match stores certificates and profiles in a git repo, eliminating per-developer setup.',
  },
  {
    title: 'OTA updates',
    detail:
      'Expo EAS Update and CodePush (React Native) allow shipping JavaScript/Dart bundle updates without App Store/Play Store review. Native code changes always require a full binary release. OTA is governed by App Store guidelines — only JS/asset changes are permitted.',
  },
]

// ─── Compare and Contrast ─────────────────────────────────────────────────────

const compareContrast = [
  {
    title: 'Flutter vs React Native — rendering',
    detail:
      'Flutter owns its rendering pipeline (Impeller/Skia). React Native delegates to native platform views. Flutter gives consistent cross-platform UI; React Native gives authentic native-platform UI by default.',
  },
  {
    title: 'Flutter vs React Native — language',
    detail:
      'Flutter uses Dart: a typed, compiled language with sound null safety and ahead-of-time compilation. React Native uses JavaScript/TypeScript: the largest ecosystem, but dynamic and JIT-executed (though Hermes uses AOT bytecode).',
  },
  {
    title: 'KMP vs Flutter — scope',
    detail:
      'KMP shares business logic and can optionally share UI via Compose Multiplatform. Flutter shares everything including UI via its own engine. KMP is additive (add to an existing app); Flutter typically requires a greenfield approach.',
  },
  {
    title: 'KMP vs React Native — philosophy',
    detail:
      'KMP is a library: you write native apps and add shared Kotlin modules. React Native is a framework: your app is a React app that renders native views. KMP maximizes native fidelity; React Native maximizes code sharing.',
  },
  {
    title: 'Ionic vs Flutter/RN — target audience',
    detail:
      'Ionic targets web developers who want mobile deployment without learning a new language or paradigm. Flutter and React Native are purpose-built mobile frameworks requiring mobile-oriented thinking.',
  },
  {
    title: 'MAUI vs Flutter — ecosystem',
    detail:
      'MAUI targets the .NET/C# enterprise ecosystem. Flutter targets mobile-first product teams. MAUI wins for organizations standardized on Microsoft tech; Flutter wins for independent mobile-focused teams.',
  },
  {
    title: 'Cross-platform vs native — when to choose native',
    detail:
      'Choose native when: you need immediate access to new OS APIs, your app has complex platform-specific UI, your team already has native expertise, or performance headroom is critical (games, AR, real-time audio/video processing).',
  },
]

// ─── Common Pitfalls ──────────────────────────────────────────────────────────

const commonPitfalls = [
  {
    mistake: 'Assuming "write once, run anywhere" is free',
    description:
      'Platform differences (gestures, navigation patterns, permissions, notification handling, background execution limits) surface constantly. Budget time for platform-specific work even in cross-platform projects.',
  },
  {
    mistake: 'Ignoring platform UI conventions',
    description:
      "Using the same UI on both platforms alienates users familiar with each platform's design language. iOS users expect swipe-back navigation, iOS-style modals, and SF Symbols. Android users expect Material Design, back gestures, and predictable nav bars.",
  },
  {
    mistake: 'Stale or unmaintained plugins',
    description:
      'A third-party plugin that has not been updated for a new OS version or framework major version blocks your upgrade path. Audit plugin health before committing.',
  },
  {
    mistake: 'OTA updates for native code changes',
    description:
      'Shipping native code changes via OTA (CodePush, EAS Update) violates App Store guidelines and will get the app removed. OTA is strictly for JavaScript/asset bundle updates.',
  },
  {
    mistake: 'Not testing on both platforms in CI',
    description:
      'A bug that only manifests on iOS (or Android) will reach production if CI only runs one platform. Run both simulator and emulator tests on every PR.',
  },
  {
    mistake: 'Blocking the UI thread in KMP',
    description:
      'Kotlin/Native (iOS) has strict concurrency rules. Coroutines with Dispatchers.Main must be called from the main thread. Accessing shared mutable state across threads in Kotlin/Native requires careful freezing or the new memory model (Kotlin 1.7.20+).',
  },
  {
    mistake: 'Underestimating JS bundle size in React Native',
    description:
      'Large JS bundles slow startup time, especially on low-end Android devices. Use Hermes, enable RAM bundles, audit dependencies with bundle visualizers, and remove unused imports.',
  },
  {
    mistake: 'Using the old React Native architecture when new architecture is available',
    description:
      'New architecture (JSI + Fabric + Turbo Modules) significantly improves performance and enables concurrent React. Projects targeting React Native 0.74+ should adopt it. Old-architecture-only libraries are a technical liability.',
  },
]

// ─── Debugging Checklist ──────────────────────────────────────────────────────

const debuggingChecklist = [
  {
    title: 'Is it platform-specific?',
    detail:
      'Reproduce on both iOS and Android first. If it only manifests on one platform, the bug is in platform-specific code (a native module, platform channel, or actual implementation) rather than shared code.',
  },
  {
    title: 'Is it a plugin version conflict?',
    detail:
      'After updating a plugin, check that peer dependencies are satisfied. Flutter: run flutter pub outdated. React Native: check npm ls for duplicate or mismatched versions.',
  },
  {
    title: 'Is performance degrading on low-end Android?',
    detail:
      'Test on an actual mid-range device (not just a Pixel flagship). JavaScript parse time, WebView rendering, and Kotlin/Native compile overhead are all more visible on constrained hardware.',
  },
  {
    title: 'Is the native module crashing silently?',
    detail:
      'Platform channel exceptions (Flutter) and unhandled native module rejections (React Native) can silently fail or crash the native side without a clear JS error. Check native logcat (Android) and Console.app / Xcode logs (iOS).',
  },
  {
    title: 'Is CI failing only on one platform runner?',
    detail:
      'iOS simulator tests require macOS. If a Linux runner is used for iOS, the build will fail at the signing or compilation step, not at the test step. Verify runner OS matches the target platform.',
  },
  {
    title: 'Is the KMP iOS framework outdated?',
    detail:
      'After changing shared Kotlin code, rebuild the XCFramework (./gradlew assembleXCFramework) and update the reference in the Xcode project. iOS will silently use the old compiled framework otherwise.',
  },
]

// ─── Correctness Checklist ────────────────────────────────────────────────────

const correctnessChecklist = [
  'Test on real iOS and Android hardware before every release — simulators and emulators miss device-specific behavior.',
  'Audit every third-party plugin for maintenance status, platform coverage, and new-architecture compatibility (React Native).',
  'Never ship native code changes via OTA — only JS/asset bundle updates are permitted by App Store guidelines.',
  'Enforce consistent lock-file state (pubspec.lock, package-lock.json, or Gradle dependency lock) in CI to prevent version drift.',
  'Run tests on both platforms in CI on every pull request — do not rely on local developer testing alone.',
  'For KMP: rebuild XCFramework after every shared module change before testing the iOS app.',
  'For React Native: verify Turbo Module and Fabric compatibility of all plugins before upgrading to the new architecture.',
  'For Flutter: run flutter analyze and dart fix before every release to catch deprecations early.',
  'Set explicit minSdk (Android) and deployment target (iOS) in build config to match your stated support matrix.',
  'For OTA-enabled apps: test that the fallback to the last good bundle works correctly on network failure.',
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq = [
  {
    question: 'Which framework should I choose?',
    answer:
      "Flutter for greenfield apps where UI consistency across platforms is a priority and the team can learn Dart. React Native for teams with JavaScript/React expertise or when Expo's managed workflow reduces operational burden. KMP for teams with existing native apps who want to share business logic without rewriting the whole app. Ionic for web teams extending to mobile with minimal investment.",
  },
  {
    question: 'Can KMP replace React Native or Flutter?',
    answer:
      'KMP is not a direct replacement — it has a different scope. KMP shares logic; Flutter and React Native share logic and UI. Use KMP when your existing iOS and Android apps should share a common data/business layer. Use Flutter or RN when you want a single UI codebase.',
  },
  {
    question: 'Is React Native still relevant after Flutter?',
    answer:
      'Yes. React Native has the largest community, the best JavaScript/TypeScript ecosystem integration, and Expo significantly reduces setup friction. The new architecture (JSI/Fabric) addressed the performance gap. Meta and Microsoft use it in production at scale.',
  },
  {
    question: 'Should I use Expo or bare React Native?',
    answer:
      'Start with Expo managed workflow. It removes native toolchain setup, provides OTA updates via EAS, and covers most use cases. Eject to bare workflow only when you need a native module that Expo does not support.',
  },
  {
    question: 'Can Flutter access all native APIs?',
    answer:
      'Not directly. Anything outside the Flutter SDK requires a platform channel or a community plugin. Most common APIs have community plugins on pub.dev. Niche or new OS APIs require writing a custom plugin in Swift/Kotlin.',
  },
  {
    question: 'Is Compose Multiplatform production-ready?',
    answer:
      'Android and desktop targets are stable. iOS support entered beta in 2024 and is being used in production by some teams, but it is not officially declared stable by JetBrains. Evaluate for new projects; avoid for large existing apps where stability is critical.',
  },
  {
    question: 'How do I handle platform-specific UI in Flutter?',
    answer:
      'Use Platform.isIOS / defaultTargetPlatform checks to conditionally render Cupertino (iOS-style) or Material (Android-style) widgets. The flutter_platform_widgets package provides adaptive widgets that automatically select the right style.',
  },
]

// ─── Key Takeaways ────────────────────────────────────────────────────────────

const keyTakeaways = [
  'No framework eliminates platform-specific work. Budget for platform channels, native modules, and OS-specific behavior in every project.',
  'Flutter owns its rendering engine — consistent UI, no native look by default. React Native maps to native components — authentic look, bridge overhead.',
  'KMP is additive: share logic, keep native UI. Best for teams with existing native apps who want code sharing without a full rewrite.',
  'Expo dramatically reduces React Native operational overhead. Start there unless you have a specific reason to go bare.',
  'Test on both platforms in CI. A cross-platform framework does not guarantee cross-platform correctness.',
  'OTA updates are JavaScript/asset-only. Native code changes always require a full binary release.',
  'The new React Native architecture (JSI + Fabric + Turbo Modules) is the future of the framework. Prefer libraries that support it.',
  'Ionic fits web teams deploying to mobile. It is not competitive with Flutter or React Native for performance-sensitive or complex-UI apps.',
]

// ─── Pseudocode Patterns ──────────────────────────────────────────────────────

const pseudocodePatterns = [
  {
    title: 'KMP shared repository',
    code: `// commonMain
class UserRepository(private val api: UserApi, private val db: UserDb) {
    fun observeUser(id: String): Flow<User> = flow {
        emitAll(db.observeUser(id))
    }.onStart {
        runCatching { api.fetchUser(id) }
            .onSuccess { db.upsert(it) }
    }
}

// androidMain — consumed by Android ViewModel
// iosMain — consumed by Swift via generated framework`,
    explanation:
      'The Repository lives in commonMain. Both Android (Compose ViewModel) and iOS (Swift ObservableObject) consume the same Flow/suspend functions. No networking or caching logic is duplicated.',
  },
  {
    title: 'Flutter platform channel',
    code: `// Dart side
const channel = MethodChannel('com.example/battery');

Future<int> getBatteryLevel() async {
  final level = await channel.invokeMethod<int>('getBatteryLevel');
  return level ?? -1;
}

// Swift side (AppDelegate)
let channel = FlutterMethodChannel(
  name: "com.example/battery",
  binaryMessenger: controller.binaryMessenger
)
channel.setMethodCallHandler { call, result in
  if call.method == "getBatteryLevel" {
    result(UIDevice.current.batteryLevel * 100)
  }
}`,
    explanation:
      'Platform channels decouple the Dart call from the platform implementation. The Dart side is identical on iOS and Android; only the native handler differs.',
  },
  {
    title: 'React Native Turbo Module (new architecture)',
    code: `// NativeCalculator.ts (spec)
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Calculator');

// Usage in component
const result = await NativeCalculator.add(3, 7); // synchronous JSI call`,
    explanation:
      'Turbo Modules use JSI for synchronous, type-safe calls between JavaScript and native. The TypeScript spec is shared; native implementations are written in C++ (Android) and Objective-C/Swift (iOS).',
  },
  {
    title: 'Flutter state with Riverpod',
    code: `// Provider definition
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  void increment() => state = state + 1;
}

// Widget consumption
class CounterPage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return Column(children: [
      Text('Count: $count'),
      ElevatedButton(
        onPressed: () => ref.read(counterProvider.notifier).increment(),
        child: const Text('Increment'),
      ),
    ]);
  }
}`,
    explanation:
      'Riverpod providers are global and compile-time verified. ConsumerWidget rebuilds only when the watched provider value changes. No BuildContext dependency injection needed.',
  },
]

// ─── Code Examples ────────────────────────────────────────────────────────────

const codeExamples = [
  {
    title: 'KMP expect/actual',
    code: `// commonMain
expect fun currentTimeMillis(): Long
expect fun randomUUID(): String

// androidMain
actual fun currentTimeMillis(): Long = System.currentTimeMillis()
actual fun randomUUID(): String = java.util.UUID.randomUUID().toString()

// iosMain
actual fun currentTimeMillis(): Long =
    (NSDate().timeIntervalSince1970 * 1000).toLong()
actual fun randomUUID(): String =
    NSUUID().UUIDString`,
    explanation:
      'expect declares the contract in shared code. actual provides platform-specific implementations. commonMain code calls currentTimeMillis() without knowing or caring how it is implemented on each platform.',
  },
  {
    title: 'Ktor client (KMP)',
    code: `// commonMain
val client = HttpClient {
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }
    install(HttpTimeout) { requestTimeoutMillis = 15_000 }
}

suspend fun fetchPosts(): List<Post> =
    client.get("https://api.example.com/posts").body()

// Called from Android ViewModel or iOS Swift coroutine wrapper`,
    explanation:
      "Ktor's HttpClient is identical in commonMain on both platforms. The engine (OkHttp on Android, Darwin/NSURLSession on iOS) is selected automatically per platform.",
  },
  {
    title: 'SQLDelight (KMP)',
    code: `-- Note.sq
CREATE TABLE Note (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    createdAt INTEGER NOT NULL
);

selectAll:
SELECT * FROM Note ORDER BY createdAt DESC;

insert:
INSERT INTO Note (title, body, createdAt) VALUES (?, ?, ?);

deleteById:
DELETE FROM Note WHERE id = ?;

// Generated Kotlin usage
val notes: Flow<List<Note>> = db.noteQueries.selectAll().asFlow().mapToList()`,
    explanation:
      'SQLDelight generates type-safe Kotlin from SQL. The same generated code works on Android (SQLite via Cursor) and iOS (SQLite via SQLiteDriver). asFlow() provides reactive queries.',
  },
  {
    title: 'Flutter navigation (go_router)',
    code: `final router = GoRouter(routes: [
  GoRoute(
    path: '/',
    builder: (context, state) => const HomeScreen(),
  ),
  GoRoute(
    path: '/detail/:id',
    builder: (context, state) {
      final id = state.pathParameters['id']!;
      return DetailScreen(id: id);
    },
  ),
]);

// Navigate
context.go('/detail/42');
context.push('/detail/42'); // adds to back stack
context.pop();`,
    explanation:
      "go_router is Flutter's recommended navigation library. URL-based routing supports deep links, web URLs, and back-stack management declaratively.",
  },
  {
    title: 'React Native + Expo fetch with error handling',
    code: `import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

type Post = { id: number; title: string };

export function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.example.com/posts')
      .then((r) => r.json())
      .then(setPosts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
}`,
    explanation:
      'FlatList is the React Native equivalent of LazyColumn/LazyRow — it virtualizes the list and only renders visible items. Always provide keyExtractor for stable rendering.',
  },
  {
    title: 'Capacitor plugin call',
    code: `import { Camera, CameraResultType } from '@capacitor/camera';

async function takePicture() {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    allowEditing: true,
    quality: 90,
  });

  // photo.webPath is a URL usable in an <img> tag
  console.log(photo.webPath);
}`,
    explanation:
      'Capacitor bridges the native camera API through a consistent JavaScript interface. The same code works on iOS (AVFoundation) and Android (Camera2 API). Custom Capacitor plugins follow the same pattern.',
  },
]

// ─── Framework Scenarios (interactive) ───────────────────────────────────────

const frameworkScenarios = [
  {
    id: 'greenfield-flutter',
    title: 'Greenfield app with Flutter',
    steps: [
      'Team chooses Flutter for a greenfield app where brand-specific UI must look identical on iOS and Android.',
      'Project created with flutter create. Dart SDK, Flutter SDK, Android Studio, and Xcode are the required toolchain.',
      'go_router handles navigation. Riverpod manages state. Dio or http handles networking. Hive or Isar handles local storage.',
      'Platform channels are written for features outside the Flutter SDK: local notifications, background fetch, Bluetooth.',
      'flutter build appbundle (Android) and flutter build ipa (iOS) produce release artifacts. Codemagic runs CI builds.',
      'App ships. Update cycle: Dart/Flutter code changes go through full binary release. Hot reload and hot restart speed up development.',
    ],
    summary:
      'Flutter is self-contained: the entire UI, state, and data layer live in Dart. The only time you leave Dart is to write platform channels for deep OS integration.',
  },
  {
    id: 'kmp-existing-apps',
    title: 'Adding KMP to existing native apps',
    steps: [
      'Existing Android (Kotlin/Compose) and iOS (Swift/SwiftUI) apps have duplicated networking, models, and business logic.',
      'A new shared Kotlin module is created alongside the existing apps. commonMain contains UserRepository, NetworkClient (Ktor), and data models.',
      'androidMain provides Android actual implementations. iosMain provides iOS actual implementations.',
      'Android app adds the shared module as a Gradle dependency. No changes to Compose UI.',
      './gradlew assembleXCFramework builds the iOS framework. iOS project imports it via CocoaPods or SPM.',
      'Swift code calls Kotlin coroutines via the kotlinx-coroutines-core wrappers or the swift-kmp-observableobject library.',
      'Over time, more logic migrates to commonMain. UI stays native on each platform.',
    ],
    summary:
      'KMP is incremental: you add shared code gradually without rewriting existing apps. The shared layer grows over time as the confidence in the pattern increases.',
  },
  {
    id: 'expo-rn-startup',
    title: 'React Native with Expo from zero to production',
    steps: [
      'npx create-expo-app MyApp --template blank-typescript creates the project. No Xcode or Android Studio required for initial development.',
      'Expo Go app on a physical device scans the QR code for instant live preview.',
      'React Navigation (or Expo Router) handles screens. Zustand or Jotai manages state. React Query handles data fetching and caching.',
      'EAS Build (eas build --platform all) builds both iOS and Android in the cloud without local native toolchains.',
      'EAS Submit uploads the builds to App Store Connect and Google Play automatically.',
      'EAS Update ships JavaScript bundle updates (non-native changes) over the air after launch.',
      'When a native module not in the Expo SDK is needed, the project is ejected to a bare workflow.',
    ],
    summary:
      "Expo's managed workflow is the lowest-friction path to production for React Native. EAS eliminates the most painful parts: cloud builds, signing, and OTA updates.",
  },
]

// ─── Glossary ─────────────────────────────────────────────────────────────────

const glossary = [
  {
    term: 'Cross-platform',
    definition:
      'A single codebase targeting multiple operating systems or platforms simultaneously.',
  },
  {
    term: 'Flutter',
    definition: "Google's UI framework using Dart with a custom rendering engine (Impeller/Skia).",
  },
  {
    term: 'React Native',
    definition: "Meta's framework using JavaScript/TypeScript that maps to native platform views.",
  },
  {
    term: 'KMP',
    definition:
      "Kotlin Multiplatform — JetBrains' approach to sharing Kotlin code across Android, iOS, desktop, and server.",
  },
  {
    term: 'Ionic / Capacitor',
    definition:
      'Web-based mobile framework. Ionic provides UI components; Capacitor bridges to native APIs.',
  },
  {
    term: 'MAUI',
    definition:
      ".NET Multi-platform App UI — Microsoft's cross-platform framework for Android, iOS, macOS, and Windows.",
  },
  {
    term: 'Platform channel',
    definition: "Flutter's mechanism for calling native platform code from Dart.",
  },
  {
    term: 'Native module',
    definition: "React Native's mechanism for calling native platform code from JavaScript.",
  },
  {
    term: 'Turbo Module',
    definition:
      'New-architecture React Native module using JSI for synchronous, type-safe JS↔native calls.',
  },
  {
    term: 'JSI',
    definition:
      "JavaScript Interface — React Native's new-architecture C++ layer enabling direct JS↔native calls without the async bridge.",
  },
  {
    term: 'Fabric',
    definition:
      "React Native's new renderer enabling synchronous layout and concurrent React features.",
  },
  {
    term: 'Impeller',
    definition:
      "Flutter's new rendering engine replacing Skia, designed for predictable frame rendering.",
  },
  {
    term: 'expect / actual',
    definition:
      'KMP mechanism: expect declares an interface in common code; actual provides platform-specific implementations.',
  },
  {
    term: 'Compose Multiplatform',
    definition: "JetBrains' extension of Jetpack Compose targeting Android, iOS, desktop, and web.",
  },
  {
    term: 'Expo',
    definition:
      'Platform and tooling on top of React Native that manages native toolchain setup, builds (EAS), and OTA updates.',
  },
  {
    term: 'EAS',
    definition: 'Expo Application Services — cloud builds, submissions, and OTA update delivery.',
  },
  {
    term: 'OTA update',
    definition:
      'Over-the-air update: shipping a new JS/asset bundle to users without a Play Store or App Store release.',
  },
  { term: 'Riverpod', definition: "Flutter's popular compile-time safe state management library." },
  {
    term: 'Bloc / Cubit',
    definition: 'Flutter state management library following event-driven architecture.',
  },
  { term: 'Ktor', definition: 'Kotlin-native HTTP client that works in KMP commonMain code.' },
  {
    term: 'SQLDelight',
    definition: 'Cross-platform SQL database library for KMP generating type-safe Kotlin from SQL.',
  },
  { term: 'go_router', definition: "Flutter's recommended URL-based navigation library." },
  { term: 'Metro', definition: 'The JavaScript bundler for React Native projects.' },
  {
    term: 'Hermes',
    definition:
      'JavaScript engine optimized for React Native, pre-compiling to bytecode for faster startup.',
  },
  {
    term: 'Hot reload',
    definition:
      'Flutter developer feature that injects changed Dart code into a running app, preserving state.',
  },
  {
    term: 'XCFramework',
    definition:
      "Apple's binary framework format that supports multiple architectures. Used to distribute KMP shared code to iOS.",
  },
  {
    term: 'Fastlane',
    definition:
      'Ruby-based automation tool for signing, building, testing, and uploading iOS and Android apps.',
  },
]

// ─── Types and constants ──────────────────────────────────────────────────────

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-mental-model', label: 'Mental Model' },
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-flutter', label: 'Flutter' },
    { id: 'core-rn', label: 'React Native' },
    { id: 'core-kmp', label: 'Kotlin Multiplatform' },
    { id: 'core-ionic', label: 'Ionic and Capacitor' },
    { id: 'core-maui', label: '.NET MAUI' },
    { id: 'core-architecture', label: 'Architecture Patterns' },
    { id: 'core-testing', label: 'Testing Strategies' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-plugins', label: 'Plugin Ecosystem' },
    { id: 'core-build', label: 'Build and CI/CD' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Patterns' },
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-scenarios', label: 'Framework Scenarios' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Glossary Terms' }],
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

export default function CrossPlatformEcosystemPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Cross-Platform Mobile Ecosystem',
    defaultTab: 'big-picture',
  })

  const defaultExample = codeExamples[0] ?? { title: '', code: '', explanation: '' }
  const defaultScenario = frameworkScenarios[0] ?? { id: '', title: '', steps: [], summary: '' }

  const [selectedExampleTitle, setSelectedExampleTitle] = useState(defaultExample.title)
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id)
  const [stepIndex, setStepIndex] = useState(0)

  const selectedExample =
    codeExamples.find((e) => e.title === selectedExampleTitle) ?? defaultExample
  const selectedScenario =
    frameworkScenarios.find((s) => s.id === selectedScenarioId) ?? defaultScenario
  const canStepForward = stepIndex < selectedScenario.steps.length - 1

  const handleScenarioSelect = (id: string) => {
    setSelectedScenarioId(id)
    setStepIndex(0)
  }

  return (
    <TopicPageShell
      title="Cross-Platform Mobile Ecosystem"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Cross-Platform Mobile Ecosystem</h1>
      <p>
        Cross-platform frameworks let a single codebase target iOS, Android, and beyond. This
        document covers the five major frameworks — Flutter, React Native, Kotlin Multiplatform,
        Ionic/Capacitor, and .NET MAUI — along with architecture patterns, testing, performance,
        build pipelines, and decision guidance. The goal is to understand what each framework trades
        away and for what gain.
      </p>

      {/* ── Big Picture ── */}
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Mental Model</h2>
            {mentalModel.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why This Matters</h2>
            <p>
              Cross-platform development is a team-structure and velocity decision as much as a
              technical one. A single shared codebase reduces duplicated logic, synchronizes feature
              releases, and lowers the headcount needed to maintain feature parity. But it
              introduces an abstraction layer that every developer on the team must understand and
              maintain.
            </p>
            <p>
              The choice of framework also determines your hiring pool (Dart vs JavaScript vs Kotlin
              vs C#), your dependency on a specific company's roadmap (Google, Meta, JetBrains,
              Microsoft), and your long-term upgrade cost as the framework evolves.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* ── Core Concepts ── */}
      {activeTab === 'core-concepts' && (
        <>
          <section id="core-flutter" className="bin98-section">
            <h2 className="bin98-heading">Flutter</h2>
            {flutterConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-rn" className="bin98-section">
            <h2 className="bin98-heading">React Native</h2>
            {reactNativeConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-kmp" className="bin98-section">
            <h2 className="bin98-heading">Kotlin Multiplatform</h2>
            {kmpConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-ionic" className="bin98-section">
            <h2 className="bin98-heading">Ionic and Capacitor</h2>
            {ionicConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-maui" className="bin98-section">
            <h2 className="bin98-heading">.NET MAUI</h2>
            {mauiConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-architecture" className="bin98-section">
            <h2 className="bin98-heading">Architecture Patterns</h2>
            {architecturePatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-testing" className="bin98-section">
            <h2 className="bin98-heading">Testing Strategies</h2>
            {testingStrategies.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance</h2>
            {performanceNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-plugins" className="bin98-section">
            <h2 className="bin98-heading">Plugin Ecosystem</h2>
            {pluginEcosystem.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-build" className="bin98-section">
            <h2 className="bin98-heading">Build and CI/CD</h2>
            {buildAndCICD.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareContrast.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {commonPitfalls.map((p) => (
                <li key={p.mistake}>
                  <strong>{p.mistake}:</strong> {p.description}
                </li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="core-debugging" className="bin98-section">
            <h2 className="bin98-heading">Debugging Checklist</h2>
            {debuggingChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Checklist</h2>
            <ul>
              {correctnessChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="core-faq" className="bin98-section">
            <h2 className="bin98-heading">FAQ</h2>
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="bin98-subheading">{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {/* ── Examples ── */}
      {activeTab === 'examples' && (
        <>
          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode Patterns</h2>
            {pseudocodePatterns.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <div className="bin98-codebox">
                  <code>{item.code.trim()}</code>
                </div>
                <p>{item.explanation}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            <p>Select an example to view the implementation pattern.</p>
            <div className="bin98-inline-buttons">
              {codeExamples.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="bin98-push"
                  onClick={() => setSelectedExampleTitle(item.title)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <h3 className="bin98-subheading">{selectedExample.title}</h3>
            <div className="bin98-codebox">
              <code>{selectedExample.code.trim()}</code>
            </div>
            <p>{selectedExample.explanation}</p>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-scenarios" className="bin98-section">
            <h2 className="bin98-heading">Framework Scenarios</h2>
            <p>
              Select a scenario and step through how a real project unfolds with that framework.
            </p>
            <div className="bin98-inline-buttons">
              {frameworkScenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="bin98-push"
                  onClick={() => handleScenarioSelect(s.id)}
                >
                  {s.title}
                </button>
              ))}
            </div>
            <h3 className="bin98-subheading">{selectedScenario.title}</h3>
            <div className="bin98-step-box">
              Step {stepIndex + 1} of {selectedScenario.steps.length}:{' '}
              {selectedScenario.steps[stepIndex]}
            </div>
            <div className="bin98-step-controls">
              <button
                type="button"
                className="bin98-push"
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                disabled={stepIndex === 0}
              >
                &lt; Back
              </button>
              <button
                type="button"
                className="bin98-push"
                onClick={() =>
                  setStepIndex((i) => Math.min(selectedScenario.steps.length - 1, i + 1))
                }
                disabled={!canStepForward}
              >
                Next &gt;
              </button>
              <span>
                {stepIndex + 1} / {selectedScenario.steps.length}
              </span>
            </div>
            <p>
              <strong>Summary:</strong> {selectedScenario.summary}
            </p>
          </section>
        </>
      )}

      {/* ── Glossary ── */}
      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
