import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

// ─── Big Picture ──────────────────────────────────────────────────────────────

const bigPicture = [
  {
    title: 'What it is',
    details:
      "iOS is Apple's mobile operating system powering iPhone, iPod touch, and (with shared APIs) iPad (iPadOS). Development is done in Swift (preferred) or Objective-C using Apple's Xcode IDE, targeting the Cocoa Touch framework stack.",
    notes:
      'iOS holds roughly 28% of global smartphone market share but represents a disproportionately large share of mobile revenue and engagement in North America, Europe, and Japan.',
  },
  {
    title: 'Why it matters',
    details:
      "iOS development requires understanding Apple's tightly integrated stack: Swift language, UIKit or SwiftUI for UI, Foundation for data and networking, Combine or async/await for concurrency, Core Data or SwiftData for persistence, and the App Store review pipeline.",
    notes:
      'Apple controls the entire platform — hardware, OS, SDK, and distribution. This integration enables performance and security guarantees unavailable on more open platforms, but it also means App Store policies govern what you can ship.',
  },
  {
    title: 'Where it shows up',
    details:
      'iPhone and iPad apps, Apple Watch (watchOS), Apple TV (tvOS), macOS via Mac Catalyst or native SwiftUI, and visionOS for Apple Vision Pro. Swift skills and SwiftUI knowledge transfer across all Apple platforms.',
    notes:
      'SwiftUI is the unifying UI framework across all Apple platforms. A SwiftUI view can run on iPhone, iPad, Mac, Watch, and TV with platform-appropriate adaptations.',
  },
  {
    title: 'Platform history snapshot',
    details:
      'iPhone OS launched in 2008 with Objective-C and UIKit. Swift was introduced in 2014 as a safer, more expressive replacement. SwiftUI debuted in 2019 as a declarative UI framework. Swift Concurrency (async/await, actors) shipped in Swift 5.5 (2021). SwiftData, a modern Core Data replacement, arrived with iOS 17 in 2023.',
    notes:
      'Objective-C is still present in large production codebases and the Cocoa Touch runtime, but all new Apple APIs are Swift-first and often SwiftUI-first.',
  },
]

// ─── Mental Model ─────────────────────────────────────────────────────────────

const mentalModel = [
  {
    title: 'Apple controls the stack end-to-end',
    detail:
      'Hardware (SoC, Neural Engine), OS (iOS/iPadOS), SDK (UIKit, SwiftUI, Foundation), runtime (Swift runtime, ARC), IDE (Xcode), and distribution (App Store) are all Apple. This tight integration enables performance, privacy, and security features that require cooperation across all layers.',
  },
  {
    title: 'UIKit is imperative; SwiftUI is declarative',
    detail:
      'UIKit predates SwiftUI by a decade. You manage view hierarchies, respond to delegate callbacks, and imperatively push/pop view controllers. SwiftUI describes what the UI should look like for a given state, and the framework handles updates. New projects should use SwiftUI; legacy apps may mix both via UIHostingController.',
  },
  {
    title: 'ARC manages memory, not a GC',
    detail:
      'Swift uses Automatic Reference Counting (ARC), not garbage collection. The compiler inserts retain/release calls at compile time. You must still reason about ownership: strong, weak, and unowned references prevent retain cycles, especially in closures and delegate patterns.',
  },
  {
    title: 'Structured concurrency replaces callbacks',
    detail:
      'Swift 5.5 introduced async/await, actors, and structured concurrency. These replace completion handler pyramids and DispatchQueue juggling. async functions suspend without blocking threads. MainActor ensures UI updates happen on the main thread.',
  },
  {
    title: 'App lifecycle is app-state-driven',
    detail:
      "iOS manages app states: Not Running, Inactive, Active, Background, Suspended. Your code responds to transitions via UIApplicationDelegate, SceneDelegate, or SwiftUI's @Environment(\.scenePhase). Background execution is heavily restricted to preserve battery.",
  },
  {
    title: 'The App Store review is part of the release process',
    detail:
      'Every binary update goes through App Store review (typically 24–48 hours). App Store Connect manages builds, TestFlight beta distribution, metadata, pricing, and release scheduling. App Store guidelines govern what APIs you can use, what content is allowed, and what business models are permitted.',
  },
]

// ─── Swift Language ───────────────────────────────────────────────────────────

const swiftConcepts = [
  {
    title: 'Type safety and inference',
    detail:
      'Swift is strongly typed with full type inference. The compiler catches type mismatches at compile time. let declares immutable values; var declares mutable ones. Prefer let by default — mutability should be intentional.',
  },
  {
    title: 'Optionals',
    detail:
      'Swift Optionals (T?) represent values that may be absent. Unwrap with if let, guard let, the nil-coalescing operator (??), or optional chaining (?.method()). Never force-unwrap (!) without a proven guarantee of non-nil.',
  },
  {
    title: 'Value types vs reference types',
    detail:
      'struct, enum, and tuples are value types — copies on assignment. class is a reference type — shared identity. Prefer struct for data models (immutable, thread-safe by nature). Use class when identity or inheritance is required.',
  },
  {
    title: 'Protocols and generics',
    detail:
      'Protocols define capabilities (Codable, Identifiable, Comparable). Generics write algorithms over any type satisfying constraints. Protocol extensions provide default implementations. Protocol-oriented programming is the idiomatic Swift style.',
  },
  {
    title: 'Closures and capture lists',
    detail:
      'Closures capture references by default, causing retain cycles in long-lived objects. Use [weak self] or [unowned self] in capture lists when the closure may outlive its context. Trailing closure syntax and shorthand argument names ($0, $1) reduce boilerplate.',
  },
  {
    title: 'Error handling',
    detail:
      'Swift uses typed error throwing: func parse() throws -> T. Callers use try, try?, or try!. Errors conform to the Error protocol. With async/await, async throws functions combine concurrency and error propagation cleanly. Prefer typed errors for API boundaries.',
  },
  {
    title: 'Result builders and DSLs',
    detail:
      "Result builders (@resultBuilder) power SwiftUI's declarative syntax. They transform a list of expressions into a single value at compile time. The pattern also powers Swift's regex builders, HTML DSLs, and other declarative APIs in the ecosystem.",
  },
]

// ─── SwiftUI ──────────────────────────────────────────────────────────────────

const swiftUIConcepts = [
  {
    title: 'Views are value types',
    detail:
      'SwiftUI Views are structs, not classes. They are cheap to create and destroyed after diffing. The body property returns a description of what to display for the current state. SwiftUI diffs the result and updates only changed parts of the render tree.',
  },
  {
    title: 'Property wrappers for state',
    detail:
      '@State holds local view state. @Binding creates a two-way reference to parent state. @ObservedObject / @StateObject observe a reference type conforming to ObservableObject. @EnvironmentObject injects a shared object down the view hierarchy. In iOS 17+, @Observable and @Bindable replace much of this.',
  },
  {
    title: '@Observable (iOS 17+)',
    detail:
      "The new Observation framework (Swift 5.9) replaces ObservableObject. Mark a class @Observable; SwiftUI automatically tracks which properties each view reads and rerenders only when those specific properties change. Granular rerendering reduces unnecessary work compared to ObservableObject's whole-object change notification.",
  },
  {
    title: 'Navigation — NavigationStack',
    detail:
      'NavigationStack (iOS 16+) replaces NavigationView. Push destinations using navigationDestination(for:) with typed path values. Store the navigation path as @State to enable programmatic navigation, deep links, and state restoration.',
  },
  {
    title: 'List and lazy containers',
    detail:
      'List renders scrollable rows with native iOS styling. LazyVStack and LazyHStack render only visible items in custom scroll views. ForEach iterates data; use stable Identifiable IDs to help SwiftUI animate inserts and deletions correctly.',
  },
  {
    title: 'ViewModifiers and composition',
    detail:
      'Modifiers apply transformations to views (.padding(), .background(), .frame()). Custom ViewModifiers encapsulate reusable modifier chains. Prefer small, composable views over large monolithic bodies.',
  },
  {
    title: 'Animations and transitions',
    detail:
      'withAnimation { } wraps state changes to trigger animations. Transition modifiers (.transition(.slide)) animate insertion and removal. matchedGeometryEffect creates hero animations between views. Animation curves (.easeInOut, .spring()) control timing.',
  },
]

// ─── UIKit (Legacy and Interop) ───────────────────────────────────────────────

const uiKitConcepts = [
  {
    title: 'View controller model',
    detail:
      'UIViewController manages a UIView hierarchy. It has its own lifecycle: viewDidLoad, viewWillAppear, viewDidAppear, viewWillDisappear, viewDidDisappear. Push and present view controllers imperatively via UINavigationController or present(_:animated:).',
  },
  {
    title: 'Auto Layout',
    detail:
      'Constraint-based layout system. Define relationships between view attributes (leading, trailing, top, bottom, width, height). Use Interface Builder (storyboards/XIBs) or programmatic NSLayoutConstraint / SnapKit / custom anchors. SwiftUI eliminates Auto Layout in new code.',
  },
  {
    title: 'UIHostingController',
    detail:
      'Bridges SwiftUI views into a UIKit hierarchy. Wrap a SwiftUI view in UIHostingController to present it from a UIViewController. This is the standard incremental migration path: add SwiftUI screens to an existing UIKit app without rewriting everything.',
  },
  {
    title: 'Delegate pattern',
    detail:
      'UIKit uses the delegate pattern extensively (UITableViewDelegate, UITextFieldDelegate, UIScrollViewDelegate). The delegating object holds a weak reference to the delegate to avoid retain cycles. SwiftUI replaces most delegates with closures and bindings.',
  },
  {
    title: 'Storyboards vs programmatic UI',
    detail:
      'Storyboards define view hierarchies visually in Interface Builder. Programmatic UI defines views in code — more merge-friendly and easier to review. Both are valid UIKit approaches; modern teams often prefer programmatic. SwiftUI makes the question moot for new screens.',
  },
]

// ─── Concurrency ──────────────────────────────────────────────────────────────

const concurrencyConcepts = [
  {
    title: 'async / await',
    detail:
      'An async function can suspend at any await point without blocking the underlying thread. The function resumes on the appropriate executor when the awaited operation completes. Call async functions with await inside another async context or via Task { }.',
  },
  {
    title: 'Task and structured concurrency',
    detail:
      'Task { } creates a concurrent task in the current actor context. async let binds concurrent child tasks that run in parallel and are awaited together. Child tasks are cancelled if the parent is cancelled. This structured lifetime prevents orphaned tasks.',
  },
  {
    title: 'Actors',
    detail:
      'Actors serialize access to their mutable state — only one caller can access actor state at a time. Calling actor methods from outside requires await. Use actors for shared mutable state instead of locks or serial DispatchQueues.',
  },
  {
    title: 'MainActor',
    detail:
      '@MainActor annotates types or functions that must run on the main thread. SwiftUI views and ViewModels should be @MainActor. Calling a @MainActor function from a background context automatically dispatches to the main thread.',
  },
  {
    title: 'AsyncSequence and AsyncStream',
    detail:
      'AsyncSequence is the async equivalent of Sequence — iterate with for await in. AsyncStream bridges callback-based APIs into an async sequence. Use for events, delegates, and notification center observations in Swift Concurrency code.',
  },
  {
    title: 'Combine (older pattern)',
    detail:
      "Combine is Apple's reactive framework (iOS 13+). Publishers emit values; Subscribers receive them. Operators (map, filter, flatMap, debounce) transform the stream. Combine is still common in UIKit-era codebases; async/await is preferred for new code.",
  },
  {
    title: 'Task cancellation',
    detail:
      'Tasks can be cancelled via Task.cancel(). Check Task.isCancelled inside long loops. try Task.checkCancellation() throws CancellationError. Structured concurrency propagates cancellation from parent to all child tasks automatically.',
  },
]

// ─── Networking ───────────────────────────────────────────────────────────────

const networkingLayer = [
  {
    title: 'URLSession',
    detail:
      "Apple's built-in HTTP client. Use URLSession.shared for simple requests. Create a custom URLSession with URLSessionConfiguration for timeouts, caching policy, TLS settings, and background download/upload tasks. Integrates natively with async/await via data(from:) and bytes(from:).",
  },
  {
    title: 'Codable for serialization',
    detail:
      'Codable (Encodable + Decodable) provides automatic JSON encoding/decoding for types that conform to it. JSONDecoder and JSONEncoder handle mapping. Use CodingKeys to rename fields. Snake_case to camelCase conversion is handled by keyDecodingStrategy.',
  },
  {
    title: 'Network layer architecture',
    detail:
      'Define a protocol-based API client: a Router enum for endpoints, a NetworkService actor for execution, and domain-specific Repository classes. Never call URLSession directly from a ViewModel. Keep networking details behind an interface for testability.',
  },
  {
    title: 'Error handling for networking',
    detail:
      'Distinguish URLError (network-level: timeout, no connection), HTTP errors (4xx, 5xx from HTTPURLResponse.statusCode), and decoding errors (DecodingError). Map to typed domain errors before surfacing to ViewModels. Retry transient errors with exponential backoff.',
  },
  {
    title: 'Background URLSession tasks',
    detail:
      'URLSessionDownloadTask and URLSessionUploadTask can continue when the app is backgrounded. Configure with URLSessionConfiguration.background(withIdentifier:). The system relaunches your app via application(_:handleEventsForBackgroundURLSession:) when transfers complete.',
  },
]

// ─── Architecture Patterns ────────────────────────────────────────────────────

const architecturePatterns = [
  {
    title: 'MVVM with ObservableObject / @Observable',
    detail:
      'ViewModel holds state as @Published properties (ObservableObject) or as tracked properties (@Observable). View observes ViewModel and rerenders on changes. User actions call ViewModel functions. No business logic in Views.',
  },
  {
    title: 'Repository pattern',
    detail:
      'Repository abstracts data sources (URLSession, Core Data, SwiftData) behind a protocol. ViewModel calls repository.fetchUser(); the Repository decides whether to hit the network or cache. Keeps data-layer details out of ViewModel.',
  },
  {
    title: 'Coordinator pattern (UIKit)',
    detail:
      'Coordinators own navigation logic that does not belong in ViewControllers. A Coordinator creates and presents child ViewControllers, decoupling screens from each other. In SwiftUI, NavigationStack with typed paths replaces most coordinator patterns.',
  },
  {
    title: 'The Composable Architecture (TCA)',
    detail:
      "Point-Free's library structures apps as State + Action + Reducer + Store + Effect. Every state change is an explicit Action dispatched to a Reducer. Highly testable and predictable. Well-suited for complex apps with deeply nested state.",
  },
  {
    title: 'Clean Architecture',
    detail:
      'Separates Domain (use cases, entities), Data (repositories, data sources), and Presentation (ViewModels, Views). Adds testability and separation at the cost of more files and protocol definitions. Most appropriate for large teams.',
  },
  {
    title: 'UiState modeling',
    detail:
      'Model screen state as a single struct or enum: enum ViewState { case loading, loaded(Data), error(Error) }. Emit a single source of truth from the ViewModel rather than separate isLoading, data, and error properties that can reach impossible combinations.',
  },
]

// ─── Persistence ──────────────────────────────────────────────────────────────

const persistenceLayer = [
  {
    title: 'SwiftData (iOS 17+)',
    detail:
      "Apple's modern persistence framework. Define models with @Model macro. Query with @Query property wrapper in SwiftUI. Uses Core Data's SQLite backend but with a Swift-native API. Automatically integrates with SwiftUI and CloudKit sync.",
  },
  {
    title: 'Core Data',
    detail:
      "Apple's mature ORM, available since iOS 3. Define an .xcdatamodeld schema, generate NSManagedObject subclasses, use NSFetchRequest for queries, and NSFetchedResultsController for reactive table/collection views. Verbose but powerful and battle-tested.",
  },
  {
    title: 'UserDefaults',
    detail:
      'Simple key-value store for small settings and preferences. Backed by a plist file. Not for sensitive data. Use @AppStorage in SwiftUI to bind a UserDefaults key directly to view state.',
  },
  {
    title: 'Keychain',
    detail:
      'Secure, encrypted storage for credentials, tokens, and cryptographic keys. Survives app uninstall on a per-keychain-group basis. Use SecItemAdd, SecItemCopyMatching, SecItemUpdate, SecItemDelete APIs or a wrapper library like KeychainAccess.',
  },
  {
    title: 'FileManager',
    detail:
      "Access the app's sandbox directories: Documents (user-visible, iCloud-backed), Library/Application Support (app data, iCloud-backed), Library/Caches (evictable), and tmp (ephemeral). Use Codable + JSONEncoder for lightweight file-based persistence.",
  },
  {
    title: 'CloudKit',
    detail:
      "Apple's iCloud database for syncing data across a user's devices. Public, private, and shared databases. SwiftData and Core Data both have built-in CloudKit sync. NSPersistentCloudKitContainer wraps Core Data + CloudKit without custom sync logic.",
  },
]

// ─── Background Processing ────────────────────────────────────────────────────

const backgroundProcessing = [
  {
    title: 'Background App Refresh',
    detail:
      'The system periodically relaunches apps to fetch updates. Register tasks with BGTaskScheduler. BGAppRefreshTask for short fetch operations; BGProcessingTask for longer CPU/network work. The system schedules execution at opportunistic times.',
  },
  {
    title: 'Background URLSession',
    detail:
      'File downloads and uploads can continue in background via URLSessionConfiguration.background. The system manages the transfer and relaunches the app on completion. Essential for large file transfers that should not be interrupted by app backgrounding.',
  },
  {
    title: 'Silent push notifications',
    detail:
      'Push notifications with content-available: 1 wake the app briefly in background to fetch new data. The OS limits this to prevent battery drain. Use judiciously — the system may defer or suppress silent pushes under Low Power Mode or heavy usage.',
  },
  {
    title: 'Local notifications',
    detail:
      'UNUserNotificationCenter schedules notifications based on time (UNTimeIntervalNotificationTrigger), calendar (UNCalendarNotificationTrigger), or location (UNLocationNotificationTrigger). Must request authorization before scheduling.',
  },
]

// ─── Testing ──────────────────────────────────────────────────────────────────

const testingLayer = [
  {
    title: 'XCTest unit tests',
    detail:
      "XCTest is Apple's built-in testing framework. Test classes inherit from XCTestCase. setUp() and tearDown() run before/after each test. Use XCTAssert*, XCTAssertEqual, XCTAssertThrowsError. Run with Cmd+U in Xcode or xcodebuild test on CI.",
  },
  {
    title: 'Swift Testing (iOS 17+)',
    detail:
      'Swift Testing is Apple\'s new framework replacing XCTest. Use @Test functions with #expect() and #require() macros. Supports parameterized tests with @Test("label", arguments: [...]). More expressive failure messages and better async support than XCTest.',
  },
  {
    title: 'XCTest UI tests',
    detail:
      'XCUITest drives the app via accessibility identifiers. Use XCUIApplication().launch() to start the app, then find elements with app.buttons["Submit"] and perform actions (.tap(), .typeText()). Runs on a real device or simulator.',
  },
  {
    title: 'Testing async code',
    detail:
      'XCTest supports async test functions natively. func testFetch() async throws { let result = try await viewModel.fetch(); XCTAssertEqual(result.count, 5) }. No expectation boilerplate needed for async/await.',
  },
  {
    title: 'Protocol-based mocking',
    detail:
      'Define repository and service protocols. Inject concrete implementations in production; inject mock implementations in tests. Swift does not have a runtime mock framework like Mockito — mocks are written by hand or generated with Sourcery.',
  },
  {
    title: 'Snapshot testing',
    detail:
      'Libraries like swift-snapshot-testing (Point-Free) render views to images or strings and compare against saved references. Catches unintended UI regressions. Run on a fixed simulator to avoid font/screen-size differences between machines.',
  },
]

// ─── App Lifecycle ────────────────────────────────────────────────────────────

const appLifecycle = [
  {
    title: 'Not Running',
    detail: 'The app has not been launched or was terminated by the system. No code is executing.',
  },
  {
    title: 'Inactive',
    detail:
      'App is in the foreground but not receiving events (e.g., incoming call interruption, app switcher). Transition state between Active and Background.',
  },
  {
    title: 'Active',
    detail:
      'App is in the foreground and receiving user events. The normal operating state. Resume real-time operations here.',
  },
  {
    title: 'Background',
    detail:
      'App is not visible. Execution is limited to a short window. Finish critical work, suspend timers, save state. Register BGTask for extended background work.',
  },
  {
    title: 'Suspended',
    detail:
      'App is in memory but not executing code. The system can terminate it to reclaim memory without notice. Save state before entering background — do not rely on suspended state persisting.',
  },
  {
    title: 'ScenePhase in SwiftUI',
    detail:
      '@Environment(\\.scenePhase) in SwiftUI provides .active, .inactive, and .background values. Use .onChange(of: scenePhase) to react to transitions. Replaces UIApplicationDelegate lifecycle methods for SwiftUI apps.',
  },
]

// ─── Build System and Xcode ───────────────────────────────────────────────────

const buildSystem = [
  {
    title: 'Xcode project structure',
    detail:
      'An Xcode project (.xcodeproj) contains targets, build configurations (Debug/Release), and schemes. Each target produces one binary (app, framework, test bundle, extension). Large projects use workspaces (.xcworkspace) to group multiple projects.',
  },
  {
    title: 'Swift Package Manager (SPM)',
    detail:
      "Apple's official dependency manager. Add packages via Xcode File > Add Packages or Package.swift manifest. SPM resolves packages, caches them, and integrates them into the build. Preferred over CocoaPods and Carthage for new projects.",
  },
  {
    title: 'CocoaPods',
    detail:
      'Ruby-based dependency manager with the largest iOS library ecosystem. Generates an .xcworkspace, modifying the Xcode project. Still required for libraries that have not added SPM support. Podfile declares dependencies; pod install resolves them.',
  },
  {
    title: 'Build configurations',
    detail:
      'Debug: incremental compilation, full debug symbols, assertions enabled. Release: whole-module optimization, stripped symbols, assertions disabled. Add custom configurations (Staging, QA) for environment-specific API endpoints and flags.',
  },
  {
    title: 'Compiler flags and xcconfig',
    detail:
      'xcconfig files externalize build settings from the .pbxproj file, making settings diffable and configurable per environment. Use SWIFT_ACTIVE_COMPILATION_CONDITIONS to define compile-time flags (#if DEBUG, #if STAGING).',
  },
  {
    title: 'Bitcode (deprecated) and Privacy Manifests',
    detail:
      'Bitcode was removed in Xcode 14. Privacy Manifests (PrivacyInfo.xcprivacy) are now required for apps using certain APIs. Declare which data types are collected and for what purpose — App Store review validates this from iOS 17 onwards.',
  },
]

// ─── App Store and Release ────────────────────────────────────────────────────

const releaseProcess = [
  {
    title: 'Apple Developer Program',
    detail:
      'Required for App Store distribution and TestFlight. Costs $99/year per account. Provides signing certificates, provisioning profiles, and App Store Connect access. Enterprise Program ($299/year) allows private in-house distribution without App Store.',
  },
  {
    title: 'Code signing',
    detail:
      'Every iOS binary is signed with a certificate tied to your Developer account. Provisioning profiles link certificates, App IDs, and device UDIDs. Development profiles for testing; Distribution profiles for App Store. Fastlane Match manages certificates and profiles in a git repo for team use.',
  },
  {
    title: 'TestFlight',
    detail:
      "Apple's official beta distribution platform. Internal testers (up to 100): immediate access. External testers (up to 10,000): requires App Store review of the build. Distribute beta builds without publishing to the App Store. Testers install via the TestFlight app.",
  },
  {
    title: 'App Store Connect',
    detail:
      'Manages app metadata (screenshots, description, keywords), pricing, availability, in-app purchases, subscriptions, and release scheduling. Upload builds with Xcode Organizer or xcodebuild archive → xcodebuild -exportArchive. Validate and submit for review here.',
  },
  {
    title: 'App Store review',
    detail:
      'Average review time is 24–48 hours. Common rejection reasons: crashes, broken functionality, guideline violations (privacy, business model, UI quality). Submit with full functionality — demo modes and placeholder content lead to rejection.',
  },
  {
    title: 'Version and build numbers',
    detail:
      'CFBundleShortVersionString (e.g. "2.4.1") is the user-visible version. CFBundleVersion is the build number — must increment with every App Store Connect upload. Automate with agvtool or fastlane increment_build_number.',
  },
]

// ─── Security ─────────────────────────────────────────────────────────────────

const securityPractices = [
  {
    title: 'App Transport Security (ATS)',
    detail:
      'iOS enforces HTTPS for all network connections by default. HTTP connections require ATS exception keys in Info.plist. Never disable ATS globally — add exceptions only for specific domains that cannot serve HTTPS, and document the reason.',
  },
  {
    title: 'Keychain for credentials',
    detail:
      'Store tokens, passwords, and cryptographic keys in the Keychain — never in UserDefaults, plist files, or NSLog output. Keychain items survive app reinstall (device-bound) and can be shared across an app group.',
  },
  {
    title: 'Certificate pinning',
    detail:
      "Validate the server's certificate against a known public key or certificate hash in URLSession's didReceive challenge delegate method. Prevents MITM attacks on compromised networks. Requires a key rotation strategy when certificates expire.",
  },
  {
    title: 'Data protection',
    detail:
      'iOS encrypts files using NSFileProtection attributes. Complete protection (NSFileProtectionComplete) makes files inaccessible while the device is locked. Apply to sensitive files via FileManager.setAttributes or mark Core Data stores with NSPersistentStoreFileProtectionKey.',
  },
  {
    title: 'Privacy manifests and permissions',
    detail:
      'Declare data collection in PrivacyInfo.xcprivacy. Request permissions (camera, microphone, location, contacts, health) only when needed, with a purpose string in Info.plist. iOS 17+ audits third-party SDKs for undeclared API usage.',
  },
  {
    title: 'Jailbreak and integrity detection',
    detail:
      'Jailbroken devices can bypass sandboxing and code signing. Detect common jailbreak artifacts (Cydia, unusual file paths) as a risk signal. Not a hard security control — treat it as a probabilistic indicator for fraud or abuse detection.',
  },
]

// ─── Performance ──────────────────────────────────────────────────────────────

const performanceNotes = [
  {
    title: 'Main thread is for UI only',
    detail:
      'Any long-running work on the main thread blocks the run loop and causes unresponsive UI or dropped frames. Move networking, disk I/O, and computation to background actors or Task { } with Dispatchers. Use @MainActor to ensure UI updates return to the main thread.',
  },
  {
    title: 'SwiftUI rerendering',
    detail:
      'SwiftUI rerenders only the Views that depend on changed state. Decompose large views to limit rerender scope. Avoid computing expensive values in body — use computed properties that depend on as little state as possible. @Observable provides more granular tracking than ObservableObject.',
  },
  {
    title: 'Memory management — retain cycles',
    detail:
      "Retain cycles prevent ARC from deallocating objects. Common sources: closures capturing self strongly, delegate properties that are strong instead of weak, and timer targets. Profile with Xcode's Memory Graph Debugger to find leaked allocations.",
  },
  {
    title: 'Image loading and caching',
    detail:
      'Use AsyncImage (SwiftUI) for simple remote image loading. For production apps with heavy image use, add Kingfisher or SDWebImageSwiftUI for memory+disk caching, placeholder support, and progressive loading. Never decode large images on the main thread.',
  },
  {
    title: 'Instruments',
    detail:
      'Xcode Instruments provides Time Profiler (CPU), Allocations (memory), Leaks, Core Animation (frame rendering), Network, and Energy Log tools. Profile on real hardware — simulator performance is not representative. Use XCTest performance tests for regression tracking in CI.',
  },
  {
    title: 'Launch time',
    detail:
      'App launch time is measured from tap to first interactive frame. Reduce by: deferring non-critical initialization, using lazy properties, avoiding synchronous network or disk reads in application(_:didFinishLaunchingWithOptions:), and enabling compiler optimizations in release.',
  },
]

// ─── Compare and Contrast ─────────────────────────────────────────────────────

const compareContrast = [
  {
    title: 'SwiftUI vs UIKit',
    detail:
      'SwiftUI is declarative, state-driven, and cross-Apple-platform. UIKit is imperative, delegate-based, and battle-tested with 15+ years of API surface. Use SwiftUI for new screens (iOS 16+). Use UIHostingController to embed SwiftUI in UIKit. Use UIViewRepresentable to embed UIKit in SwiftUI.',
  },
  {
    title: '@Observable vs ObservableObject',
    detail:
      '@Observable (iOS 17+) provides granular per-property change tracking and simpler syntax. ObservableObject notifies on any @Published change. @Observable is preferred for new code; ObservableObject remains for iOS 13–16 support.',
  },
  {
    title: 'async/await vs Combine',
    detail:
      'async/await is the modern standard for asynchronous point-in-time operations. Combine excels at stream processing with operators (debounce, merge, combineLatest). Combine bridges to async/await via values and AsyncPublisher. Prefer async/await for new code; Combine where stream operators are genuinely useful.',
  },
  {
    title: 'SwiftData vs Core Data',
    detail:
      'SwiftData (iOS 17+) offers a Swift-native @Model macro, @Query SwiftUI integration, and simpler syntax. Core Data is available from iOS 3, has richer migration tooling, and is the foundation SwiftData sits on. Choose SwiftData for new iOS 17+ targets; Core Data for backward compatibility.',
  },
  {
    title: 'SPM vs CocoaPods',
    detail:
      'SPM is Apple-native, integrated into Xcode, and does not modify the .pbxproj. CocoaPods has broader library coverage and is required for packages without SPM support. Prefer SPM; use CocoaPods only when necessary.',
  },
  {
    title: 'iOS vs Android development',
    detail:
      'iOS: Swift/Obj-C, Xcode, SPM, SwiftUI/UIKit, XCTest, TestFlight, App Store (review required). Android: Kotlin/Java, Android Studio, Gradle, Compose/Views, JUnit+Espresso, Firebase App Distribution, Play Store. Same MVVM + Repository patterns work on both. Swift and Kotlin are remarkably similar in design.',
  },
]

// ─── Common Pitfalls ──────────────────────────────────────────────────────────

const commonPitfalls = [
  {
    mistake: 'Retain cycles in closures',
    description:
      'Capturing self strongly in a closure stored by self creates a cycle. Use [weak self] in escaping closures. Verify with the Memory Graph Debugger. Delegate properties must be weak to avoid the same issue.',
  },
  {
    mistake: 'Force-unwrapping optionals',
    description:
      'Using ! on an Optional without a guaranteed non-nil value crashes at runtime. Use if let, guard let, or ??. Reserve ! only for values guaranteed to exist by program logic (IBOutlets after viewDidLoad, but even then prefer Storyboard with @IBOutlet weak var).',
  },
  {
    mistake: 'Updating UI from a background thread',
    description:
      'UIKit and SwiftUI must be updated on the main thread. Dispatch back with await MainActor.run { } or annotate the ViewModel @MainActor. Violating this causes visual glitches and occasional crashes that are hard to reproduce.',
  },
  {
    mistake: 'Storing sensitive data in UserDefaults',
    description:
      'UserDefaults is stored in a plain plist file accessible on jailbroken devices and in iTunes backups. Use the Keychain for tokens, passwords, and any data that should be protected.',
  },
  {
    mistake: 'Missing Info.plist usage descriptions',
    description:
      'Accessing camera, microphone, location, contacts, or photos without the corresponding NSCameraUsageDescription etc. key causes an immediate crash on iOS 10+. The App Store review also rejects apps that access protected APIs without a usage string.',
  },
  {
    mistake: 'Not handling scene state restoration',
    description:
      "iOS can terminate background apps to reclaim memory. Without state restoration, users return to the app's initial screen rather than where they left off. Use NavigationStack path persistence (Codable path values) or UIStateRestoration APIs.",
  },
  {
    mistake: 'Ignoring App Store guidelines',
    description:
      'Apps have been rejected for undeclared data collection, duplicate App Store presence, in-app purchase workarounds, and broken functionality in specific device configurations. Read guideline updates every WWDC cycle.',
  },
  {
    mistake: 'Not testing on older iOS versions',
    description:
      'New Swift/SwiftUI APIs are often iOS 16 or 17+. Test on devices running the minimum deployment target. Use #available checks to guard API calls. Simulator-only testing misses real device behavior differences.',
  },
]

// ─── Debugging Checklist ──────────────────────────────────────────────────────

const debuggingChecklist = [
  {
    title: 'Is it a retain cycle?',
    detail:
      'Open the Memory Graph Debugger (Debug > Memory Graph). Look for objects that should have been deallocated. Purple reference lines show the cycle. Add [weak self] to the offending closure or change a strong delegate reference to weak.',
  },
  {
    title: 'Is UI being updated off the main thread?',
    detail:
      'Enable the Main Thread Checker in the Xcode scheme (enabled by default). It pauses execution and prints a backtrace when UIKit is called from a background thread. Fix with @MainActor or DispatchQueue.main.async.',
  },
  {
    title: 'Is it an App Store signing issue?',
    detail:
      'Signing failures manifest as "Provisioning profile not found" or "Code signing identity not found." Verify certificate expiry, App ID match, and that the device UDID is in the provisioning profile for development builds. Use Fastlane Match for team consistency.',
  },
  {
    title: 'Is SwiftUI re-rendering too much?',
    detail:
      "Add _printChanges() to a View's body to log which state triggered recomposition. Decompose views to limit rerender scope. Use @Observable instead of ObservableObject for more granular tracking.",
  },
  {
    title: 'Is a network request failing silently?',
    detail:
      'Check for ATS violations (HTTP blocked by default). Inspect the URLError code — .notConnectedToInternet, .timedOut, .cannotFindHost each point to different root causes. Enable NSURLSession logging with CFNETWORK_DIAGNOSTICS=3 environment variable.',
  },
  {
    title: 'Is a TestFlight build rejected or crashing?',
    detail:
      'TestFlight builds that crash on launch often have missing provisioning profiles or missing capabilities not declared in the entitlements file. Check crash logs in App Store Connect > TestFlight > Crashes.',
  },
]

// ─── Correctness Checklist ────────────────────────────────────────────────────

const correctnessChecklist = [
  'Use [weak self] in all escaping closures that reference self — especially in network callbacks and timer targets.',
  'Store tokens and credentials in the Keychain, never in UserDefaults or plist files.',
  'Mark ViewModels and UI-updating code @MainActor to enforce main-thread execution at compile time.',
  'Add NSUsageDescription keys to Info.plist for every protected API you access (camera, location, contacts, etc.).',
  'Test on real devices running the minimum deployment target — not just the latest simulator.',
  'Use guard let or if let instead of force-unwrapping (!) for all optionals except those guaranteed by program logic.',
  'Run Instruments Leaks and Memory Graph Debugger before every major release to find retain cycles.',
  'Enable App Transport Security — never disable ATS globally.',
  'Increment CFBundleVersion before every App Store Connect upload.',
  'Declare data usage in PrivacyInfo.xcprivacy for iOS 17+ — App Store review validates this.',
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq = [
  {
    question: 'Should new iOS apps use SwiftUI or UIKit?',
    answer:
      "SwiftUI for anything targeting iOS 16+. It is faster to develop, cross-Apple-platform, and better supported by Apple's newest APIs. UIKit remains necessary for highly customized UIs not expressible in SwiftUI, and for maintaining existing UIKit codebases. Mix them via UIHostingController.",
  },
  {
    question: 'Is Objective-C still worth learning?',
    answer:
      'For reading legacy code and working with Objective-C libraries, yes. For new development, no. Swift is universally preferred by Apple and the community. Understanding Objective-C runtime concepts (message passing, method swizzling) is useful for debugging in mixed codebases.',
  },
  {
    question: 'When should I use @StateObject vs @ObservedObject?',
    answer:
      '@StateObject creates and owns the ViewModel — use it in the view that instantiates the ViewModel. @ObservedObject receives a ViewModel from outside — use it in child views. Getting this wrong causes the ViewModel to be recreated on every parent rerender. In iOS 17+, @State and @Observable handle both cases.',
  },
  {
    question: 'How do I share data between two SwiftUI views?',
    answer:
      'Pass state down with @Binding for local state, or use @EnvironmentObject / @Environment for app-wide shared state. For complex apps, use a shared ViewModel with @StateObject in a parent view and pass it as @ObservedObject or via environment.',
  },
  {
    question: 'Should I use Combine or async/await?',
    answer:
      'async/await for point-in-time async operations (network requests, file reads). Combine where you need stream operators (debounce text field input, merge multiple publishers, combineLatest). In practice, most apps use async/await for everything and reach for Combine only for specific stream-processing use cases.',
  },
  {
    question: 'How do I test code that uses async/await?',
    answer:
      "XCTest supports async test functions natively. Mark the test func testFoo() async throws and use await directly. No XCTestExpectation needed. For testing time-sensitive async code, use Swift's Clock protocol with a mock clock.",
  },
  {
    question: 'How long does App Store review take?',
    answer:
      'Average is 24–48 hours. First submissions and updates that add new features or request new permissions take longer. Expedited reviews can be requested for critical bug fixes. Plan release schedules with a buffer — never assume same-day approval.',
  },
]

// ─── Key Takeaways ────────────────────────────────────────────────────────────

const keyTakeaways = [
  'iOS development is Swift-first. Prefer async/await for concurrency, @Observable for state, and SwiftUI for new UI.',
  'ARC manages memory, but you must prevent retain cycles — use [weak self] in escaping closures and weak for delegate references.',
  'MVVM + Repository is the standard architecture. Keep ViewModels @MainActor; keep data-layer details behind protocols.',
  'SwiftUI and UIKit are interoperable. Migrate incrementally via UIHostingController; do not rewrite everything at once.',
  'The Keychain is the only safe place for credentials and tokens. Never use UserDefaults for sensitive data.',
  'App Store review is mandatory for every binary release. Automate signing with Fastlane Match; automate uploads with Fastlane deliver or EAS Submit.',
  'Test on real hardware at the minimum deployment target. Instruments profiling should happen before every major release.',
  'Privacy is enforced at the OS level — usage descriptions, PrivacyInfo.xcprivacy, and ATS are not optional.',
]

// ─── Pseudocode Patterns ──────────────────────────────────────────────────────

const pseudocodePatterns = [
  {
    title: 'MVVM data flow with @Observable',
    code: `@Observable
final class UserViewModel {
    var user: User?
    var isLoading = false
    var errorMessage: String?

    private let repository: UserRepository

    init(repository: UserRepository = DefaultUserRepository()) {
        self.repository = repository
    }

    func loadUser(id: String) async {
        isLoading = true
        defer { isLoading = false }
        do {
            user = try await repository.fetchUser(id: id)
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

struct UserView: View {
    @State private var vm = UserViewModel()

    var body: some View {
        Group {
            if vm.isLoading { ProgressView() }
            else if let user = vm.user { Text(user.name) }
            else if let error = vm.errorMessage { Text(error) }
        }
        .task { await vm.loadUser(id: "42") }
    }
}`,
    explanation:
      '@Observable tracks individual property accesses. SwiftUI rerenders only Views reading changed properties. .task { } runs the async call tied to the view lifecycle and is automatically cancelled when the view disappears.',
  },
  {
    title: 'Async networking with Codable',
    code: `struct Post: Codable, Identifiable {
    let id: Int
    let title: String
    let body: String
}

actor APIClient {
    private let session: URLSession
    private let decoder = JSONDecoder()

    init(session: URLSession = .shared) {
        self.session = session
    }

    func fetch<T: Decodable>(_ type: T.Type, from url: URL) async throws -> T {
        let (data, response) = try await session.data(from: url)
        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw URLError(.badServerResponse)
        }
        return try decoder.decode(T.self, from: data)
    }
}

// Usage
let posts = try await client.fetch([Post].self, from: url)`,
    explanation:
      'The actor serializes access to the URLSession and decoder. Generic fetch() works for any Codable type. HTTP status validation happens before decoding, separating network errors from parsing errors.',
  },
  {
    title: 'NavigationStack with typed path',
    code: `enum AppRoute: Hashable {
    case detail(id: Int)
    case settings
}

struct RootView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            HomeView()
                .navigationDestination(for: AppRoute.self) { route in
                    switch route {
                    case .detail(let id): DetailView(id: id)
                    case .settings:       SettingsView()
                    }
                }
        }
        .environment(\\.navigate) { route in
            path.append(route)
        }
    }
}

// Navigate from anywhere:
// path.append(AppRoute.detail(id: 42))`,
    explanation:
      'NavigationPath stores the back stack as a type-erased array. Typed AppRoute values make navigation compile-safe. Storing path as @State enables programmatic navigation, deep link restoration, and state persistence.',
  },
]

// ─── Code Examples ────────────────────────────────────────────────────────────

const codeExamples = [
  {
    title: 'SwiftData model',
    code: `import SwiftData

@Model
final class Note {
    var title: String
    var body: String
    var createdAt: Date

    init(title: String, body: String) {
        self.title = title
        self.body = body
        self.createdAt = .now
    }
}

// In SwiftUI App entry point
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Note.self)
    }
}

// Query in a View
struct NoteListView: View {
    @Query(sort: \\.createdAt, order: .reverse) var notes: [Note]
    @Environment(\\.modelContext) private var context

    var body: some View {
        List(notes) { note in
            Text(note.title)
        }
        .toolbar {
            Button("Add") {
                context.insert(Note(title: "New", body: ""))
            }
        }
    }
}`,
    explanation:
      '@Model generates all persistence boilerplate from the class definition. @Query automatically fetches and updates the view when the underlying data changes. modelContext.insert() and modelContext.delete() are the only write operations needed.',
  },
  {
    title: 'Core Data + async fetch',
    code: `class NoteRepository {
    private let container: NSPersistentContainer

    func fetchAll() async throws -> [NoteEntity] {
        try await container.viewContext.perform {
            let request = NoteEntity.fetchRequest()
            request.sortDescriptors = [
                NSSortDescriptor(keyPath: \\.createdAt, ascending: false)
            ]
            return try self.container.viewContext.fetch(request)
        }
    }

    func insert(title: String, body: String) async throws {
        try await container.viewContext.perform {
            let note = NoteEntity(context: self.container.viewContext)
            note.title = title
            note.body = body
            note.createdAt = .now
            try self.container.viewContext.save()
        }
    }
}`,
    explanation:
      "perform(_:) runs the closure on the context's private queue. Using async throws in the repository method lets callers use await without dealing with Core Data threading rules directly.",
  },
  {
    title: 'Keychain wrapper',
    code: `import Security

enum Keychain {
    static func save(key: String, value: String) throws {
        let data = Data(value.utf8)
        let query: [CFString: Any] = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrAccount: key,
            kSecValueData: data,
        ]
        SecItemDelete(query as CFDictionary)
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw KeychainError.saveFailed(status)
        }
    }

    static func load(key: String) throws -> String {
        let query: [CFString: Any] = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrAccount: key,
            kSecReturnData: true,
            kSecMatchLimit: kSecMatchLimitOne,
        ]
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        guard status == errSecSuccess,
              let data = result as? Data,
              let string = String(data: data, encoding: .utf8) else {
            throw KeychainError.loadFailed(status)
        }
        return string
    }
}

enum KeychainError: Error {
    case saveFailed(OSStatus)
    case loadFailed(OSStatus)
}`,
    explanation:
      'SecItemDelete before SecItemAdd handles the "already exists" case without separate check-then-add logic. The result pointer pattern is the raw Keychain API — wrap it for your app rather than calling it directly from business logic.',
  },
  {
    title: 'URLSession async networking',
    code: `struct GitHubUser: Codable {
    let login: String
    let name: String?
    let publicRepos: Int

    enum CodingKeys: String, CodingKey {
        case login, name
        case publicRepos = "public_repos"
    }
}

actor GitHubClient {
    private let base = URL(string: "https://api.github.com")!
    private let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.keyDecodingStrategy = .convertFromSnakeCase
        return d
    }()

    func fetchUser(_ login: String) async throws -> GitHubUser {
        let url = base.appendingPathComponent("users/\(login)")
        var request = URLRequest(url: url)
        request.setValue("application/vnd.github+json",
                         forHTTPHeaderField: "Accept")
        let (data, _) = try await URLSession.shared.data(for: request)
        return try decoder.decode(GitHubUser.self, from: data)
    }
}`,
    explanation:
      'keyDecodingStrategy .convertFromSnakeCase eliminates most CodingKeys definitions. The actor ensures the decoder is not accessed from multiple threads simultaneously. async throws propagates both URLErrors and DecodingErrors to the caller.',
  },
  {
    title: 'BGTaskScheduler background fetch',
    code: `// In AppDelegate or @main App
func application(_ app: UIApplication,
                 didFinishLaunchingWithOptions _: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    BGTaskScheduler.shared.register(
        forTaskWithIdentifier: "com.example.refresh",
        using: nil
    ) { task in
        self.handleRefresh(task as! BGAppRefreshTask)
    }
    return true
}

func scheduleRefresh() {
    let request = BGAppRefreshTaskRequest(identifier: "com.example.refresh")
    request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)
    try? BGTaskScheduler.shared.submit(request)
}

func handleRefresh(_ task: BGAppRefreshTask) {
    scheduleRefresh() // schedule next refresh
    let refreshTask = Task {
        do {
            try await repository.sync()
            task.setTaskCompleted(success: true)
        } catch {
            task.setTaskCompleted(success: false)
        }
    }
    task.expirationHandler = { refreshTask.cancel() }
}`,
    explanation:
      'Register the task identifier in Info.plist under BGTaskSchedulerPermittedIdentifiers. scheduleRefresh() is called once at launch and again inside the handler to keep future refreshes scheduled. The expirationHandler cancels the Task if the OS terminates the background time window.',
  },
  {
    title: 'XCTest async unit test',
    code: `@testable import MyApp
import XCTest

final class UserViewModelTests: XCTestCase {
    func testLoadUser_success() async throws {
        let mockRepo = MockUserRepository(user: .fixture)
        let vm = UserViewModel(repository: mockRepo)

        await vm.loadUser(id: "42")

        XCTAssertEqual(vm.user?.id, "42")
        XCTAssertNil(vm.errorMessage)
        XCTAssertFalse(vm.isLoading)
    }

    func testLoadUser_failure() async throws {
        let mockRepo = MockUserRepository(error: URLError(.notConnectedToInternet))
        let vm = UserViewModel(repository: mockRepo)

        await vm.loadUser(id: "99")

        XCTAssertNil(vm.user)
        XCTAssertNotNil(vm.errorMessage)
    }
}

struct MockUserRepository: UserRepository {
    var user: User?
    var error: Error?
    func fetchUser(id: String) async throws -> User {
        if let error { throw error }
        return user ?? .fixture
    }
}`,
    explanation:
      'async test functions need no XCTestExpectation — XCTest awaits them automatically. MockUserRepository is a hand-written fake, not a mock framework. Protocol injection enables fast, deterministic tests without network or disk I/O.',
  },
]

// ─── Lifecycle Scenarios ──────────────────────────────────────────────────────

const lifecycleScenarios = [
  {
    id: 'launch',
    title: 'Cold launch to active',
    steps: [
      'User taps app icon. iOS creates the process and loads the binary into memory.',
      'UIApplicationMain or @main App struct initializes the application object.',
      'AppDelegate.application(_:didFinishLaunchingWithOptions:) (or SwiftUI App.init) runs. Initialize DI, logging, crash reporters here.',
      'The root window and initial view controller or WindowGroup are created.',
      'applicationDidBecomeActive fires. The app is now interactive.',
      'SwiftUI .task modifiers run. ViewModels begin fetching initial data.',
    ],
    summary:
      'Minimize work in didFinishLaunchingWithOptions to reduce launch time. Use lazy initialization for anything not needed on the first screen.',
  },
  {
    id: 'background',
    title: 'Moving to background and back',
    steps: [
      'User presses Home or switches apps. applicationWillResignActive fires — pause timers, reduce frame rates.',
      'applicationDidEnterBackground fires. Save state, finish critical uploads, cancel non-essential work. You have ~5 seconds before suspension.',
      'App is suspended — process exists in memory but no code runs. System may terminate at any time.',
      'User returns to app. applicationWillEnterForeground fires. Reacquire resources, restart timers.',
      'applicationDidBecomeActive fires. Resume full operation. Refresh stale data.',
    ],
    summary:
      'Apps can be terminated while suspended without notification. Save all state in applicationDidEnterBackground — do not rely on surviving suspension.',
  },
  {
    id: 'deep-link',
    title: 'Deep link and universal link',
    steps: [
      'User taps a link (https://example.com/items/42) in Safari or another app.',
      'iOS checks Apple-App-Site-Association file hosted at https://example.com/.well-known/apple-app-site-association.',
      'If the domain and path match an applinks entry, iOS routes to the app instead of Safari.',
      'application(_:continue:restorationHandler:) receives the NSUserActivity with the URL.',
      'The app parses the URL path and pushes the appropriate view onto the NavigationStack.',
    ],
    summary:
      'Universal Links (HTTPS + AASA) are preferred over custom URL schemes — they cannot be hijacked by other apps and fall back to the website gracefully.',
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
    { id: 'core-swift', label: 'Swift Language' },
    { id: 'core-swiftui', label: 'SwiftUI' },
    { id: 'core-uikit', label: 'UIKit (Legacy and Interop)' },
    { id: 'core-concurrency', label: 'Concurrency' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-architecture', label: 'Architecture Patterns' },
    { id: 'core-persistence', label: 'Persistence' },
    { id: 'core-background', label: 'Background Processing' },
    { id: 'core-lifecycle', label: 'App Lifecycle' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-build', label: 'Build System and Xcode' },
    { id: 'core-release', label: 'App Store and Release' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Patterns' },
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-lifecycle', label: 'Lifecycle Walkthrough' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Glossary Terms' }],
}

// ─── Glossary ─────────────────────────────────────────────────────────────────

const glossary = [
  {
    term: 'Swift',
    definition:
      "Apple's compiled, type-safe programming language for iOS, macOS, watchOS, tvOS, and server-side development.",
  },
  {
    term: 'Objective-C',
    definition:
      "Apple's original Cocoa programming language. Still present in the runtime and legacy codebases.",
  },
  {
    term: 'SwiftUI',
    definition:
      "Apple's declarative UI framework (iOS 13+) for building UIs across all Apple platforms from a single codebase.",
  },
  {
    term: 'UIKit',
    definition:
      "Apple's imperative UI framework for iOS. Predates SwiftUI; still required for highly customized UIs.",
  },
  {
    term: 'Xcode',
    definition:
      "Apple's IDE for iOS/macOS development. Includes the compiler, Interface Builder, Simulator, Instruments, and Organizer.",
  },
  {
    term: 'ARC',
    definition:
      "Automatic Reference Counting — Swift's memory management model. The compiler inserts retain/release at compile time.",
  },
  {
    term: 'Optional',
    definition:
      "Swift's built-in way to represent absent values (T?). Must be unwrapped before use.",
  },
  {
    term: 'Struct',
    definition:
      'Swift value type. Copied on assignment. Preferred for data models — immutable and thread-safe by default.',
  },
  {
    term: 'Protocol',
    definition:
      "Swift's mechanism for defining capabilities. Similar to interfaces in other languages.",
  },
  {
    term: 'async/await',
    definition:
      "Swift's structured concurrency syntax for writing asynchronous code that reads like synchronous code.",
  },
  {
    term: 'Actor',
    definition:
      'Swift concurrency type that serializes access to its mutable state, preventing data races.',
  },
  {
    term: 'MainActor',
    definition:
      'Global actor that ensures code runs on the main thread. Annotate ViewModels and UI-touching code with @MainActor.',
  },
  {
    term: '@Observable',
    definition:
      'Swift 5.9 macro (iOS 17+) for observable classes with per-property change tracking in SwiftUI.',
  },
  {
    term: 'ObservableObject',
    definition:
      'Protocol for objects whose changes SwiftUI observes via @Published. Replaced by @Observable in iOS 17+.',
  },
  { term: '@State', definition: 'SwiftUI property wrapper for local view-owned mutable state.' },
  {
    term: '@Binding',
    definition: 'SwiftUI property wrapper for a two-way reference to state owned by a parent view.',
  },
  {
    term: '@EnvironmentObject',
    definition:
      'SwiftUI property wrapper for injecting a shared ObservableObject from a parent into a deeply nested child.',
  },
  {
    term: 'NavigationStack',
    definition:
      'SwiftUI navigation container (iOS 16+) with a typed path for programmatic navigation and deep link support.',
  },
  {
    term: 'SwiftData',
    definition:
      "Apple's Swift-native persistence framework (iOS 17+) built on Core Data with an @Model macro API.",
  },
  {
    term: 'Core Data',
    definition:
      "Apple's ORM/persistence framework backed by SQLite. Available since iOS 3; still required for pre-iOS 17 targets.",
  },
  {
    term: 'UserDefaults',
    definition:
      'Key-value store for small settings. Not for sensitive data. Backed by a plain plist file.',
  },
  {
    term: 'Keychain',
    definition:
      "iOS's secure encrypted storage for credentials, tokens, and keys. Survives app reinstall.",
  },
  {
    term: 'Combine',
    definition:
      "Apple's reactive framework (iOS 13+). Publishers, operators, and subscribers. Being replaced by async/await for most use cases.",
  },
  {
    term: 'URLSession',
    definition:
      "Apple's built-in HTTP client. Supports async/await, background transfers, and WebSocket connections.",
  },
  {
    term: 'Codable',
    definition:
      'Swift protocol combining Encodable and Decodable for automatic JSON (de)serialization.',
  },
  {
    term: 'SPM',
    definition: "Swift Package Manager — Apple's native dependency manager integrated into Xcode.",
  },
  {
    term: 'CocoaPods',
    definition:
      'Ruby-based third-party dependency manager. Broader library support than SPM; generates an .xcworkspace.',
  },
  {
    term: 'TestFlight',
    definition:
      "Apple's beta distribution platform. Internal (up to 100) and external (up to 10,000) testing.",
  },
  {
    term: 'App Store Connect',
    definition: "Apple's portal for managing app submissions, metadata, TestFlight, and analytics.",
  },
  {
    term: 'Provisioning Profile',
    definition:
      'File that links a signing certificate, App ID, and device UDIDs. Required to install on a real device or submit to the App Store.',
  },
  {
    term: 'Fastlane',
    definition:
      'Open-source automation for iOS code signing (Match), building, testing, and App Store submission (deliver).',
  },
  {
    term: 'BGTaskScheduler',
    definition:
      'iOS API for registering and scheduling background tasks (BGAppRefreshTask, BGProcessingTask).',
  },
  {
    term: 'Universal Links',
    definition:
      'HTTPS-based deep links that route to an app when installed, or to the website as fallback. Backed by Apple-App-Site-Association.',
  },
  {
    term: 'Instruments',
    definition:
      "Xcode's performance profiling tool suite: Time Profiler, Allocations, Leaks, Core Animation, Network, Energy.",
  },
]

// ─── Styles ───────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

export default function IOSEcosystemPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'iOS Ecosystem',
    defaultTab: 'big-picture',
  })

  const defaultExample = codeExamples[0] ?? { title: '', code: '', explanation: '' }
  const defaultScenario = lifecycleScenarios[0] ?? { id: '', title: '', steps: [], summary: '' }

  const [selectedExampleTitle, setSelectedExampleTitle] = useState(defaultExample.title)
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id)
  const [stepIndex, setStepIndex] = useState(0)

  const selectedExample =
    codeExamples.find((e) => e.title === selectedExampleTitle) ?? defaultExample
  const selectedScenario =
    lifecycleScenarios.find((s) => s.id === selectedScenarioId) ?? defaultScenario
  const canStepForward = stepIndex < selectedScenario.steps.length - 1

  const handleScenarioSelect = (id: string) => {
    setSelectedScenarioId(id)
    setStepIndex(0)
  }

  return (
    <TopicPageShell
      title="iOS Ecosystem"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">iOS Ecosystem</h1>
      <p>
        iOS is Apple's mobile platform for iPhone and iPad. This document covers the full developer
        ecosystem: Swift language, SwiftUI and UIKit, Swift Concurrency, networking, persistence,
        background processing, app lifecycle, testing, build tooling, App Store, and security. The
        goal is practical depth — what to use, why it works, and where it breaks.
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
              iOS development rewards deep understanding of Apple's stack. Surface-level knowledge
              gets you to a working prototype; platform mastery determines app quality, stability,
              and App Store success. The most common failure modes — retain cycles, threading
              violations, signing issues, rejection — each require understanding a different layer
              of the system.
            </p>
            <p>
              Apple's platform evolves rapidly at WWDC each June. SwiftUI, SwiftData, Swift
              Concurrency, and visionOS each represent major paradigm shifts that landed within a
              few years of each other. Staying current matters more on iOS than on almost any other
              platform.
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
          <section id="core-swift" className="bin98-section">
            <h2 className="bin98-heading">Swift Language</h2>
            {swiftConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-swiftui" className="bin98-section">
            <h2 className="bin98-heading">SwiftUI</h2>
            {swiftUIConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-uikit" className="bin98-section">
            <h2 className="bin98-heading">UIKit (Legacy and Interop)</h2>
            {uiKitConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-concurrency" className="bin98-section">
            <h2 className="bin98-heading">Concurrency</h2>
            {concurrencyConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-networking" className="bin98-section">
            <h2 className="bin98-heading">Networking</h2>
            {networkingLayer.map((item) => (
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
          <section id="core-persistence" className="bin98-section">
            <h2 className="bin98-heading">Persistence</h2>
            {persistenceLayer.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-background" className="bin98-section">
            <h2 className="bin98-heading">Background Processing</h2>
            {backgroundProcessing.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-lifecycle" className="bin98-section">
            <h2 className="bin98-heading">App Lifecycle</h2>
            {appLifecycle.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-testing" className="bin98-section">
            <h2 className="bin98-heading">Testing</h2>
            {testingLayer.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-build" className="bin98-section">
            <h2 className="bin98-heading">Build System and Xcode</h2>
            {buildSystem.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-release" className="bin98-section">
            <h2 className="bin98-heading">App Store and Release</h2>
            {releaseProcess.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-security" className="bin98-section">
            <h2 className="bin98-heading">Security</h2>
            {securityPractices.map((item) => (
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
          <section id="ex-lifecycle" className="bin98-section">
            <h2 className="bin98-heading">Lifecycle Walkthrough</h2>
            <p>Select a scenario and step through the iOS lifecycle sequence.</p>
            <div className="bin98-inline-buttons">
              {lifecycleScenarios.map((s) => (
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
