import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

// ─── Big Picture ─────────────────────────────────────────────────────────────

const bigPicture = [
  {
    title: 'What it is',
    details:
      "Android is Google's open-source mobile operating system, built on the Linux kernel with a managed runtime (ART) executing Kotlin and Java bytecode. It powers smartphones, tablets, foldables, wearables, TVs, and automotive systems.",
    notes:
      'Android accounts for roughly 72% of global smartphone market share. As of 2024 there are over 3 billion active Android devices.',
  },
  {
    title: 'Why it matters',
    details:
      'Android development spans the full product stack: OS lifecycle management, declarative UI, reactive state, networking, local persistence, background scheduling, build automation, and a rigorous publishing pipeline. Each layer has distinct failure modes.',
    notes:
      'Modern Android is Kotlin-first, Jetpack-first, and increasingly Compose-first. Teams that understand these pillars navigate new APIs faster and produce more maintainable apps.',
  },
  {
    title: 'Where it shows up',
    details:
      'Consumer apps, enterprise software, IoT, Android TV, Wear OS, Android Automotive, and ChromeOS. Google Play reaches over 2.5 billion active devices. Skills transfer across form factors with platform-specific adaptations.',
    notes:
      'Kotlin Multiplatform (KMP) now allows sharing business logic between Android, iOS, desktop, and server — making Android Kotlin expertise increasingly cross-platform.',
  },
  {
    title: 'Platform history snapshot',
    details:
      'Android launched in 2008 with Java-only development. Kotlin became the officially preferred language in 2019. Jetpack Compose shipped stable in 2021 and replaced XML-based Views as the recommended UI toolkit. Material Design 3 (Material You) followed in 2022.',
    notes:
      'Legacy View-based code is still common in production, so understanding both systems is practically important even when building Compose-first.',
  },
]

// ─── Mental Model ─────────────────────────────────────────────────────────────

const mentalModel = [
  {
    title: 'The OS owns component lifetimes',
    detail:
      'Activities, Fragments, Services, and Broadcast Receivers are instantiated by the system, not your code. The OS decides when to create, pause, stop, and destroy them based on resources, user navigation, and system events. Your app reacts; it does not control.',
  },
  {
    title: 'Unidirectional data flow (UDF)',
    detail:
      'State lives in ViewModel and flows down to the UI as an immutable snapshot. User events (clicks, input) flow back up to the ViewModel as intents or function calls. The UI never mutates state directly. This makes state predictable and testable.',
  },
  {
    title: 'Single source of truth',
    detail:
      'Each piece of data has exactly one authoritative owner — typically a Room database or remote API, mediated through a Repository. ViewModel reads from Repository; UI reads from ViewModel. No layer duplicates mutable state.',
  },
  {
    title: 'Coroutines as the async backbone',
    detail:
      'Kotlin coroutines replace callbacks and RxJava for asynchronous work. Structured concurrency ties coroutine lifetimes to CoroutineScopes, preventing leaks. viewModelScope cancels on ViewModel clear; lifecycleScope respects component lifecycle.',
  },
  {
    title: 'Build is a first-class concern',
    detail:
      'Gradle manages the entire build: compilation, resource merging, flavors, signing, shrinking, and packaging. Misconfigured Gradle is a common source of slow builds, missing dependencies, and release failures. Treat build files like production code.',
  },
  {
    title: 'Permissions are a UI surface, not an afterthought',
    detail:
      'The runtime permissions model (API 23+) means users can deny or revoke individual permissions at any time. Apps must handle denial gracefully, explain rationale before prompting, and avoid requesting permissions they do not need.',
  },
]

// ─── Android Components ───────────────────────────────────────────────────────

const androidComponents = [
  {
    title: 'Activity',
    detail:
      'The primary entry point for UI. Manages a window and hosts Composables or Fragments. Handles back navigation, system events, and permission results. An app typically has one main Activity in modern single-Activity architecture.',
  },
  {
    title: 'Fragment',
    detail:
      'Modular UI piece that lives within an Activity and has its own lifecycle (CREATED, STARTED, RESUMED). FragmentManager and NavController manage the back stack. In Compose, Fragments are often replaced by Composable destinations.',
  },
  {
    title: 'Service',
    detail:
      'Background component without a UI. Foreground Services run visible operations (media, GPS) and must display a persistent notification. Prefer WorkManager for deferrable background work instead of plain Services.',
  },
  {
    title: 'BroadcastReceiver',
    detail:
      'Listens for system or app-scoped broadcasts (network changes, boot complete, alarms). Should be lightweight — do not perform long work here. Register dynamically in code for runtime events; statically in Manifest for system events.',
  },
  {
    title: 'ContentProvider',
    detail:
      'Exposes structured data (contacts, media, files) to other apps via URIs. Backed by Room, SQLite, or files. Accessed through ContentResolver. Use FileProvider for secure file sharing between apps (replaces direct file:// URIs).',
  },
  {
    title: 'Application class',
    detail:
      "Global singleton that persists for the app's lifetime. Initialize app-wide state (DI container, logging, crash reporting) here. Hilt requires annotating the Application class with @HiltAndroidApp.",
  },
]

// ─── Lifecycle ────────────────────────────────────────────────────────────────

const lifecycleStates = [
  {
    title: 'onCreate',
    detail:
      'Called once when the Activity is first created. Inflate layout or set Compose content. Restore instance state. Do not start long operations here.',
  },
  {
    title: 'onStart / onStop',
    detail:
      'onStart: Activity is visible but not interactive. onStop: Activity is fully hidden. Release heavy resources in onStop and re-acquire in onStart.',
  },
  {
    title: 'onResume / onPause',
    detail:
      'onResume: Activity is interactive and in the foreground. onPause: Another Activity is coming into the foreground. Keep onPause fast — the system does not proceed until it returns.',
  },
  {
    title: 'onDestroy',
    detail:
      'Called before the Activity is destroyed — either by the user finishing it or the system reclaiming memory. Do final cleanup. ViewModel survives this; UI state does not unless saved.',
  },
  {
    title: 'Configuration changes',
    detail:
      'Rotation, language change, and dark mode toggle all destroy and recreate the Activity by default. ViewModel survives. Save transient UI state with rememberSaveable (Compose) or onSaveInstanceState (Views).',
  },
  {
    title: 'Back stack',
    detail:
      'Each Activity or Composable destination pushed onto the back stack. Pressing Back pops the top. NavController manages this graph declaratively. Misconfigured back stack is a common source of duplicate screens.',
  },
]

// ─── Jetpack Libraries ────────────────────────────────────────────────────────

const jetpackLibraries = [
  {
    title: 'Jetpack Compose',
    detail:
      'Declarative UI toolkit that replaces XML layouts. Build UI with annotated Kotlin functions (@Composable). State-driven: when state changes, only affected Composables recompose. Use remember, rememberSaveable, and State hoisting to control recomposition scope.',
  },
  {
    title: 'Navigation Component',
    detail:
      'Manages Composable or Fragment destination graphs, back stack, arguments, and deep links. Define a NavGraph with NavHost and Composable destinations. Use NavController for programmatic navigation. Safe Args generates type-safe argument passing.',
  },
  {
    title: 'ViewModel',
    detail:
      "Survives configuration changes. Holds UI state as StateFlow or LiveData. Created and scoped to an Activity or Fragment. Never hold references to Context, View, or Activity inside a ViewModel — they do not survive the owner's destruction.",
  },
  {
    title: 'Room',
    detail:
      'SQLite abstraction with compile-time SQL validation. Define @Entity data classes, @Dao interfaces with @Query/@Insert/@Delete methods, and a @Database abstract class. Returns Flow<T> for reactive queries that emit on table changes.',
  },
  {
    title: 'WorkManager',
    detail:
      'Guaranteed background work that persists across process death and reboots. Supports constraints (network type, charging, battery), input/output data, and chaining with OneTimeWorkRequest and PeriodicWorkRequest. The correct choice for deferrable, reliability-critical tasks.',
  },
  {
    title: 'DataStore',
    detail:
      'Asynchronous, coroutine-based replacement for SharedPreferences. Preferences DataStore stores key-value pairs; Proto DataStore stores typed objects with protocol buffer schemas. Never blocks the main thread.',
  },
  {
    title: 'Hilt',
    detail:
      'Dependency injection built on Dagger. Annotate @HiltAndroidApp on Application, @AndroidEntryPoint on Activity/Fragment, @HiltViewModel on ViewModel. Provides scoped injection: SingletonComponent, ActivityComponent, ViewModelComponent, etc.',
  },
  {
    title: 'Paging 3',
    detail:
      'Loads data in pages from a network or database source. PagingSource defines data loading; RemoteMediator bridges remote + local. LazyPagingItems integrates directly with LazyColumn in Compose.',
  },
  {
    title: 'CameraX',
    detail:
      'Lifecycle-aware camera API that abstracts device-specific quirks. Use PreviewView for live viewfinder, ImageCapture for stills, VideoCapture for video. Consistent behavior across API levels 21+.',
  },
]

// ─── Kotlin Coroutines ────────────────────────────────────────────────────────

const coroutineConcepts = [
  {
    title: 'Suspend functions',
    detail:
      'A function marked suspend can pause and resume without blocking the underlying thread. Under the hood the compiler converts it to a state machine. Call only from a coroutine or another suspend function.',
  },
  {
    title: 'CoroutineScope and structured concurrency',
    detail:
      'Every coroutine belongs to a scope. If the scope is cancelled, all children are cancelled. This prevents orphaned coroutines. viewModelScope cancels when ViewModel clears; lifecycleScope follows the Lifecycle owner.',
  },
  {
    title: 'Dispatchers',
    detail:
      'Dispatchers.Main — main thread for UI work. Dispatchers.IO — optimized pool for blocking I/O (network, disk). Dispatchers.Default — CPU-bound computation. Switch with withContext(Dispatchers.IO) { ... }.',
  },
  {
    title: 'Flow',
    detail:
      'Cold asynchronous stream. collect() triggers execution. Use map, filter, combine, and flatMapLatest for transformations. StateFlow is a hot, always-active state holder; SharedFlow is a hot event bus.',
  },
  {
    title: 'repeatOnLifecycle',
    detail:
      'Collects a Flow only while the Lifecycle is at least STARTED. Automatically suspends in background and resumes in foreground. Prevents processing of data when the UI is invisible. Preferred over launchWhenStarted.',
  },
  {
    title: 'Error handling',
    detail:
      'Use try/catch around suspend calls for local errors. CoroutineExceptionHandler handles uncaught exceptions from launch. supervisorScope isolates child failures so siblings continue running.',
  },
]

// ─── Networking ───────────────────────────────────────────────────────────────

const networkingLayer = [
  {
    title: 'Retrofit',
    detail:
      'Type-safe HTTP client. Define an interface with @GET/@POST/@PUT/@DELETE annotations and path/query parameters. Retrofit generates the implementation. Supports suspend functions directly for coroutine integration.',
  },
  {
    title: 'OkHttp',
    detail:
      'The HTTP engine beneath Retrofit. Provides connection pooling, response caching, transparent gzip, and an interceptor chain. Add HttpLoggingInterceptor for debugging. Add an auth interceptor to inject tokens without touching each call site.',
  },
  {
    title: 'Serialization / converters',
    detail:
      'Gson (GsonConverterFactory) and Moshi (MoshiConverterFactory) are the most common. kotlinx.serialization is the idiomatic Kotlin choice and works well with KMP. Always model nullable fields explicitly to avoid NullPointerExceptions on missing JSON keys.',
  },
  {
    title: 'Error handling strategy',
    detail:
      'Wrap Retrofit suspend calls in runCatching or a Result<T> wrapper. Map HTTP error codes (4xx, 5xx) to typed domain errors. Distinguish network errors (IOException) from API errors (HttpException). Never expose raw Retrofit types to the ViewModel.',
  },
  {
    title: 'NetworkBoundResource pattern',
    detail:
      'Emit cached data immediately, trigger a network fetch in background, update Room with the response, which emits a new Flow event. UI always observes Room — the database is the single source of truth, not the network response.',
  },
]

// ─── Architecture Patterns ────────────────────────────────────────────────────

const architecturePatterns = [
  {
    title: 'MVVM (recommended)',
    detail:
      'ViewModel exposes UI state via StateFlow<UiState>. UI collects with collectAsStateWithLifecycle(). User actions call ViewModel functions. ViewModel calls Repository. No business logic in Composables.',
  },
  {
    title: 'Repository pattern',
    detail:
      'The Repository abstracts all data sources behind a single interface. ViewModel calls repository.getUser(); the Repository decides whether to hit the network, Room, or DataStore. Data layer details stay out of the ViewModel.',
  },
  {
    title: 'Clean Architecture (optional)',
    detail:
      'Adds a Domain layer between ViewModel and Repository containing use-case classes. Each use case holds one operation (GetUserUseCase, SubmitOrderUseCase). Increases testability and separation but adds significant boilerplate — use only for large teams or complex domains.',
  },
  {
    title: 'UiState sealed class',
    detail:
      'Model UI state as a sealed class or data class: data class UiState(val isLoading: Boolean, val data: T?, val error: String?). Emit a single object rather than separate boolean, data, and error flows to avoid inconsistent combinations.',
  },
  {
    title: 'One-time events (channels / SharedFlow)',
    detail:
      'Use SharedFlow(replay=0) or Channel<Event> for events that should be consumed once (navigation, toasts). Do not model them as regular state because UI may miss them or replay them incorrectly after configuration change.',
  },
]

// ─── Persistence ──────────────────────────────────────────────────────────────

const persistenceLayer = [
  {
    title: 'Room — when to use',
    detail:
      'Relational or structured data that benefits from SQL queries, joins, transactions, and reactive observation. Examples: messages, tasks, cached API responses, user records.',
  },
  {
    title: 'DataStore — when to use',
    detail:
      'Small key-value settings: theme preference, language, last-seen timestamp, feature flags. Not designed for large datasets or relational queries.',
  },
  {
    title: 'Room transactions',
    detail:
      '@Transaction on a DAO function ensures all operations inside run atomically. Use for multi-table writes where partial completion would leave the DB in an inconsistent state.',
  },
  {
    title: 'Database migrations',
    detail:
      'Increment database version and provide a Migration object with an alter/migrate SQL statement. Set fallbackToDestructiveMigration() only in debug builds. Failing migrations in production wipe user data.',
  },
  {
    title: 'Encrypted storage',
    detail:
      'Use EncryptedSharedPreferences or SQLCipher (via Room) for sensitive data. Never store tokens or credentials in plain SharedPreferences or unencrypted files.',
  },
]

// ─── Background Processing ────────────────────────────────────────────────────

const backgroundProcessing = [
  {
    title: 'WorkManager',
    detail:
      'For deferrable, guaranteed work: syncing data, uploading logs, compressing images. Survives process death and reboots. Supports constraints, exponential retry, and chaining. Use CoroutineWorker for suspend-friendly workers.',
  },
  {
    title: 'Foreground Service',
    detail:
      'For ongoing user-visible operations: music playback, GPS tracking, active file download. Must display a notification. Declared in Manifest with FOREGROUND_SERVICE permission. Required for high-priority background work on API 26+.',
  },
  {
    title: 'AlarmManager',
    detail:
      'Delivers time-based callbacks even when the app is not running. Use only when exact timing is required (calendar reminders). Prefer WorkManager for inexact scheduling; AlarmManager battery usage is higher.',
  },
  {
    title: 'Doze and App Standby',
    detail:
      'Android batches network, alarms, and JobScheduler when the screen is off (Doze) or the app is not used (Standby). WorkManager handles Doze transparently. High-priority FCM messages bypass Doze; low-priority ones do not.',
  },
]

// ─── Testing ──────────────────────────────────────────────────────────────────

const testingLayer = [
  {
    title: 'Unit tests (JVM)',
    detail:
      'Run on the JVM without a device. Test ViewModel, Repository, and use-case logic. Use JUnit 4/5, Mockito or MockK for mocking, and kotlinx-coroutines-test (runTest, TestDispatcher) for coroutine testing.',
  },
  {
    title: 'Integration tests (JVM)',
    detail:
      'Test Room DAOs with an in-memory database (Room.inMemoryDatabaseBuilder). No mocking needed — validates real SQL queries and migrations.',
  },
  {
    title: 'UI tests — Compose (instrumented)',
    detail:
      'Use ComposeTestRule.setContent{} to render a Composable in isolation. Assert with onNode(hasText("...")).assertIsDisplayed(). Run on device or emulator. No Activity required for most Composable tests.',
  },
  {
    title: 'UI tests — Espresso (instrumented)',
    detail:
      'For legacy View-based screens. Use ActivityScenario, onView(withId(...)), and perform(click()). Espresso automatically synchronizes with the main thread and AsyncTask.',
  },
  {
    title: 'End-to-end tests',
    detail:
      'Test full user flows across multiple screens. Prefer Compose UI tests or Espresso over Robolectric for accuracy. Use Hilt testing extensions to swap real dependencies for fakes.',
  },
  {
    title: 'Test doubles strategy',
    detail:
      'Prefer fakes (simple implementations) over mocks for Repository and data sources. Mocks tied to implementation details break when internals change. Inject test doubles via constructor injection (ViewModel) or Hilt @TestInstallIn.',
  },
]

// ─── Permissions Model ────────────────────────────────────────────────────────

const permissionsModel = [
  {
    title: 'Install-time permissions',
    detail:
      'Granted automatically at install. No user prompt. Covers internet access, vibration, Bluetooth (pre-API 31), and other low-risk capabilities.',
  },
  {
    title: 'Runtime permissions (dangerous)',
    detail:
      'Camera, microphone, location, contacts, storage (pre-API 33). User is prompted on first request. Can be denied or revoked at any time via Settings. Always check permission state before using the guarded API.',
  },
  {
    title: 'ActivityResultContracts',
    detail:
      'The modern API for permission requests. Use rememberLauncherForActivityResult with RequestPermission or RequestMultiplePermissions contracts in Compose. Replace deprecated requestPermissions() Activity methods.',
  },
  {
    title: 'Rationale and graceful denial',
    detail:
      'Call shouldShowRequestPermissionRationale() to detect if a prior denial occurred. Show an in-app explanation before re-prompting. Handle permanent denial by directing the user to system Settings.',
  },
]

// ─── Build System ─────────────────────────────────────────────────────────────

const buildSystem = [
  {
    title: 'build.gradle.kts (Module)',
    detail:
      'Declares compileSdk, minSdk, targetSdk, versionCode, and versionName. References dependencies via the version catalog. Uses Kotlin DSL (.kts) for type safety and IDE autocompletion.',
  },
  {
    title: 'Version catalog (libs.versions.toml)',
    detail:
      'Centralizes dependency versions and coordinates. Reference with libs.androidx.compose.bom in build files. Eliminates version duplication across modules. Supported natively by Gradle 7.4+.',
  },
  {
    title: 'Build types',
    detail:
      'debug: debuggable, no R8, test mode. release: R8 enabled, signed, minified. Add custom types (staging, qa) for environment-specific configs. Set buildConfigField to inject environment constants at compile time.',
  },
  {
    title: 'Product flavors',
    detail:
      'Define separate product dimensions (e.g. "environment" = free/paid; "tier" = lite/full). Flavors combine with build types to produce variants (freeDebug, paidRelease). Each variant can override resources, code, and manifests.',
  },
  {
    title: 'R8 and ProGuard',
    detail:
      'R8 is the default shrinker/obfuscator in release builds. It removes unused classes, methods, and fields, then renames the rest. Add keep rules (-keep class ...) for classes accessed via reflection (Gson models, Retrofit interfaces).',
  },
  {
    title: 'KSP (Kotlin Symbol Processor)',
    detail:
      'Replacement for KAPT annotation processor. Faster build times for Room, Hilt, Moshi, and other annotation-driven libraries. Add ksp plugin and use ksp(...) instead of kapt(...) for compatible libraries.',
  },
]

// ─── App Signing and Release ──────────────────────────────────────────────────

const releaseProcess = [
  {
    title: 'Keystore',
    detail:
      'A .jks or .keystore file containing your signing certificate. Lost keystore = cannot push updates to Play Store. Store it in a secrets manager, never in version control.',
  },
  {
    title: 'AAB vs APK',
    detail:
      'Upload an Android App Bundle (.aab) to the Play Store. Google generates optimized per-device APKs. Use APKs for sideloading, enterprise distribution, or beta testing outside Play.',
  },
  {
    title: 'Play App Signing',
    detail:
      'Google manages the final signing key; you upload with an upload key. This protects you from keystore loss while allowing Play to optimize APK delivery.',
  },
  {
    title: 'Internal test track',
    detail:
      'Up to 100 testers with immediate rollout. Use for CI/CD validation. Promote builds through alpha, beta, and production tracks without re-uploading.',
  },
  {
    title: 'Version management',
    detail:
      'versionCode is an integer that must increase with every Play Store submission. versionName is user-visible (e.g. "2.4.1"). Never reuse a versionCode on any track.',
  },
]

// ─── Security Best Practices ──────────────────────────────────────────────────

const securityPractices = [
  {
    title: 'Network Security Config',
    detail:
      'Define network_security_config.xml to enforce certificate pinning, restrict cleartext traffic, and add trust anchors. Use cleartextTrafficPermitted="false" in production.',
  },
  {
    title: 'Encrypted storage',
    detail:
      'Store tokens, keys, and sensitive data in EncryptedSharedPreferences or the Android Keystore. Never write credentials to plain SharedPreferences, logs, or external storage.',
  },
  {
    title: 'Root and tamper detection',
    detail:
      'Consider SafetyNet Attestation (deprecated) or Play Integrity API to detect rooted devices or modified APKs. Not a silver bullet — use for risk signals, not hard blocks.',
  },
  {
    title: 'Exported components',
    detail:
      'Any component with android:exported="true" in the Manifest is callable by other apps. Explicitly set exported=false for internal components on API 31+. Validate inputs on all exported entry points.',
  },
  {
    title: 'Deep link validation',
    detail:
      'Verify deep link intent data before using it. Malicious apps can fire intents to exported Activities. Use App Links (HTTPS with Digital Asset Links) instead of custom schemes for user-facing deep links.',
  },
]

// ─── Performance Notes ────────────────────────────────────────────────────────

const performanceNotes = [
  {
    title: 'Main thread is sacred',
    detail:
      'Any operation that takes longer than 16 ms on the main thread causes a dropped frame. Network, disk, and CPU-heavy work must move to Dispatchers.IO or Dispatchers.Default via coroutines. Enable StrictMode in debug builds to detect violations.',
  },
  {
    title: 'Compose recomposition scope',
    detail:
      'Recomposition reruns only the Composables whose read state changed. Decompose large Composables. Use remember and derivedStateOf to memoize expensive calculations. Pass only what a Composable needs — avoid passing the whole UiState object everywhere.',
  },
  {
    title: 'Lazy lists for unbounded data',
    detail:
      'LazyColumn and LazyRow compose and measure only visible items. Never use a Column with a forEach for lists of unknown size. Use stable keys in items { } to help Compose recognize items across recompositions.',
  },
  {
    title: 'Image loading',
    detail:
      'Use Coil (Kotlin-native) or Glide for asynchronous image loading, caching (memory + disk), and format decoding. Never load large bitmaps on the main thread or hold them in a Map — leads to OOM.',
  },
  {
    title: 'APK / AAB size',
    detail:
      'Enable R8 shrinking in release. Use vector drawables instead of PNGs. Prefer system fonts over bundled ones. Use the Android App Bundle to deliver only the resources needed for each device configuration.',
  },
  {
    title: 'Profiling tools',
    detail:
      'Android Studio Profiler (CPU, memory, network, battery). Macrobenchmark library for startup and scrolling benchmarks in CI. Perfetto for system-level traces. Profile on real mid-range hardware, not just high-end flagships.',
  },
]

// ─── Compare and Contrast ─────────────────────────────────────────────────────

const compareContrast = [
  {
    title: 'Jetpack Compose vs. XML Views',
    detail:
      'Compose is declarative, Kotlin-native, and state-driven. XML is imperative, requires ViewBinding or Data Binding, and is verbose for dynamic UI. New screens should use Compose. Existing View code can interoperate with ComposeView and AndroidView.',
  },
  {
    title: 'StateFlow vs. LiveData',
    detail:
      'StateFlow is coroutine-native, always has a value, and is platform-agnostic (works in ViewModel and non-Android modules). LiveData is lifecycle-aware out of the box but tied to Android. Prefer StateFlow for new code; use asLiveData() if bridging.',
  },
  {
    title: 'Room vs. direct SQLite',
    detail:
      'Room validates SQL at compile time, generates boilerplate, integrates with Flow, and provides migration support. Direct SQLite requires manual cursor handling and is error-prone. Use Room unless you have an unusual schema requirement.',
  },
  {
    title: 'Retrofit vs. Ktor Client',
    detail:
      'Retrofit is the de-facto Android standard with wide library support (OkHttp, converters, interceptors). Ktor Client is fully KMP-compatible and better suited for shared network code between Android and iOS. Use Ktor in KMP modules, Retrofit in Android-only modules.',
  },
  {
    title: 'WorkManager vs. Foreground Service',
    detail:
      'WorkManager is for deferred, guaranteed, constraint-aware background work. Foreground Service is for ongoing user-visible operations that cannot be deferred. Using a Service where WorkManager would suffice is unnecessary complexity.',
  },
  {
    title: 'Hilt vs. manual DI vs. Koin',
    detail:
      "Hilt is compile-time validated, integrates with all Jetpack components, and is Google's recommended approach. Manual DI (object graphs by hand) works for small apps. Koin is a runtime service-locator that is easier to set up but harder to validate statically.",
  },
  {
    title: 'MVVM vs. MVI',
    detail:
      'MVVM (StateFlow + events) is simpler and covers most Android use cases. MVI (model-view-intent) makes state transitions explicit via sealed intent classes — useful for complex state machines but adds overhead for simple screens.',
  },
]

// ─── Common Pitfalls ──────────────────────────────────────────────────────────

const lifecyclePitfalls = [
  {
    mistake: 'Storing Context or View in ViewModel',
    description:
      'ViewModel outlives the Activity. Holding an Activity Context or a View causes memory leaks. Use Application context (@ApplicationContext via Hilt) if absolutely required.',
  },
  {
    mistake: 'Collecting Flow without repeatOnLifecycle',
    description:
      'Launching collect in lifecycleScope without repeatOnLifecycle(STARTED) keeps the Flow active in background, processing events the UI cannot display and wasting battery.',
  },
  {
    mistake: 'Blocking the main thread',
    description:
      'Any disk read, network call, or CPU-intensive loop on Dispatchers.Main causes jank or ANRs. Use withContext(Dispatchers.IO) or Dispatchers.Default. Enable StrictMode in debug to catch violations before they reach production.',
  },
  {
    mistake: 'Missing Room migration',
    description:
      'Incrementing the Room database version without providing a Migration crashes the app on upgrade. In release builds, use fallbackToDestructiveMigration() only if data loss is acceptable; otherwise write the migration.',
  },
  {
    mistake: 'Over-requesting permissions',
    description:
      'Requesting permissions at app launch before context is clear trains users to deny everything. Request permissions at the moment they are needed, with a rationale, and handle denial gracefully.',
  },
  {
    mistake: 'Hardcoded secrets in source',
    description:
      'API keys or tokens committed to the repo are exposed in APKs (decompilable) and version history. Store secrets in local.properties (gitignored), CI environment variables, or a secrets manager.',
  },
  {
    mistake: 'Reusing versionCode',
    description:
      'The Play Store rejects uploads with a versionCode equal to or lower than an existing track. Automate versionCode generation in CI (e.g. from build number or git commit count).',
  },
  {
    mistake: 'Ignoring back stack in Navigation',
    description:
      'Calling navigate() in a loop, or not handling the onBackPressedDispatcher correctly, duplicates destinations or breaks the back stack. Use popUpTo and launchSingleTop for standard navigation patterns.',
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq = [
  {
    question: 'Should I use a single Activity or multiple Activities?',
    answer:
      'Single-Activity is the modern standard. One Activity hosts a NavHost that manages all Composable or Fragment destinations. Multiple Activities add complexity: shared ViewModel scoping becomes harder, and intent passing is cumbersome.',
  },
  {
    question: 'When should I use LiveData vs StateFlow?',
    answer:
      'Prefer StateFlow for new code — it is coroutine-native and works in non-Android modules. Use LiveData only if you are extending existing code that already relies on it, or if you need its built-in main-thread observation without additional setup.',
  },
  {
    question: 'Is Hilt mandatory?',
    answer:
      "No. Small apps can use manual dependency injection (constructor injection with a simple object graph). But as apps grow, Hilt's scoping, testing support, and Jetpack integrations pay for the initial setup cost.",
  },
  {
    question: 'Should I use Compose or Views for an existing app?',
    answer:
      'Migrate incrementally. Use ComposeView to add Compose islands inside existing XML layouts, and AndroidView to embed Views inside Compose. There is no need to rewrite everything at once.',
  },
  {
    question: 'How do I share data between two Fragments?',
    answer:
      'Share a ViewModel scoped to the Activity (or the nav graph with by navGraphViewModels()). Never pass data between Fragments via callbacks or direct method calls — it creates tight coupling and lifecycle issues.',
  },
  {
    question: 'Why is my background coroutine still running after the screen is gone?',
    answer:
      'The coroutine is launched in a scope that outlives the screen (e.g. GlobalScope). Use viewModelScope (cancelled when ViewModel clears) or lifecycleScope with repeatOnLifecycle(STARTED) to tie coroutine lifetime to the lifecycle.',
  },
  {
    question: 'Should I use R8 in debug builds?',
    answer:
      'No. R8 significantly slows incremental builds. Keep R8 for release (and staging) only. Test your keep rules periodically in a release build before shipping.',
  },
]

// ─── Debugging Checklist ──────────────────────────────────────────────────────

const debuggingChecklist = [
  {
    title: 'Is the crash a lifecycle issue?',
    detail:
      'Check if it happens after rotation or back navigation. Verify ViewModel is not holding Views. Use onSaveInstanceState or rememberSaveable for transient UI state.',
  },
  {
    title: 'Is it a threading violation?',
    detail:
      'Enable StrictMode in Application.onCreate() to log main-thread disk or network access. Check for CalledFromWrongThreadException when updating Views from a background thread.',
  },
  {
    title: 'Is it a Room migration failure?',
    detail:
      'Check logcat for IllegalStateException about expected schema. Verify database version was incremented and a Migration was added for every version bump.',
  },
  {
    title: 'Is R8 stripping a class?',
    detail:
      'If a release build crashes with ClassNotFoundException or a Gson/Retrofit parse failure, missing keep rules are likely. Check proguard-rules.pro. Run with -verbose to see what is being removed.',
  },
  {
    title: 'Is the Compose tree recomposing excessively?',
    detail:
      'Enable Layout Inspector with recomposition counts. Use derivedStateOf for derived values. Avoid reading state inside lambdas that are passed as composable parameters.',
  },
  {
    title: 'Is a coroutine leaking?',
    detail:
      'Use viewModelScope or structured scopes. If a test never completes, a coroutine is stuck waiting. Use TestCoroutineScheduler.advanceUntilIdle() in tests.',
  },
]

// ─── Correctness Checklist ────────────────────────────────────────────────────

const correctnessChecklist = [
  'Use ViewModel for all UI state — no state in Composables beyond transient input state.',
  'Collect Flows with collectAsStateWithLifecycle() or repeatOnLifecycle(STARTED) — never raw collect in lifecycleScope without a lifecycle guard.',
  'Every Room database version bump has a corresponding Migration.',
  'All long-running or blocking work runs on Dispatchers.IO or Dispatchers.Default.',
  'Sensitive data (tokens, keys) lives in EncryptedSharedPreferences or Android Keystore.',
  'No Context or View reference is stored in a ViewModel.',
  'Permission rationale is shown before re-prompting; permanent denial redirects to Settings.',
  'Release build type enables minifyEnabled and shrinkResources.',
  'android:exported is explicitly set on all Manifest components that target API 31+.',
  'All deep link intent data is validated before use.',
]

// ─── Glossary ─────────────────────────────────────────────────────────────────

const quickGlossary = [
  {
    term: 'Activity',
    definition: 'A single screen entry point. Hosts a window and manages the UI surface.',
  },
  {
    term: 'Fragment',
    definition: 'A reusable, modular UI piece hosted within an Activity. Has its own lifecycle.',
  },
  {
    term: 'ViewModel',
    definition: 'Architecture component that survives configuration changes and holds UI state.',
  },
  {
    term: 'StateFlow',
    definition:
      'Hot coroutine-based observable that always holds a current value. Preferred over LiveData.',
  },
  {
    term: 'LiveData',
    definition:
      'Lifecycle-aware observable from Architecture Components. Lifecycle-safe but Android-only.',
  },
  {
    term: 'Coroutine',
    definition:
      "Kotlin's mechanism for asynchronous, non-blocking code. Replaces callbacks and RxJava.",
  },
  {
    term: 'Composable',
    definition:
      '@Composable function that describes a piece of UI and recomposes when its state changes.',
  },
  {
    term: 'Recomposition',
    definition:
      'Compose reruns a Composable function when its read state changes. Only affected scopes rerun.',
  },
  {
    term: 'APK',
    definition:
      'Android Package — the installable app format for sideloading or direct device installation.',
  },
  {
    term: 'AAB',
    definition:
      'Android App Bundle — the upload format for the Play Store. Google generates per-device APKs from it.',
  },
  {
    term: 'Gradle',
    definition:
      'The build system. Manages compilation, dependencies, flavors, signing, and packaging.',
  },
  {
    term: 'KSP',
    definition:
      'Kotlin Symbol Processor — compile-time annotation processing. Faster replacement for KAPT.',
  },
  {
    term: 'Manifest',
    definition:
      'AndroidManifest.xml — declares components, permissions, and metadata the OS needs at install.',
  },
  {
    term: 'Jetpack',
    definition:
      "Google's suite of Android libraries: Compose, Room, Navigation, Lifecycle, WorkManager, Hilt, etc.",
  },
  {
    term: 'Hilt',
    definition: 'Compile-time dependency injection framework for Android built on Dagger.',
  },
  {
    term: 'Room',
    definition:
      'Jetpack SQLite abstraction with compile-time SQL validation and Flow-based reactive queries.',
  },
  {
    term: 'WorkManager',
    definition:
      'Guaranteed deferrable background work API. Survives process death and device restarts.',
  },
  {
    term: 'DataStore',
    definition: 'Asynchronous, coroutine-safe replacement for SharedPreferences.',
  },
  {
    term: 'ProGuard / R8',
    definition: 'Code shrinker and obfuscator. R8 is the default for release builds.',
  },
  {
    term: 'ART',
    definition:
      'Android Runtime — the managed runtime that compiles and executes Kotlin/Java bytecode on device.',
  },
  {
    term: 'Deep link',
    definition:
      'URI that navigates directly to a specific screen in the app. Can be triggered from browsers or other apps.',
  },
  {
    term: 'Doze mode',
    definition:
      'Battery optimization that defers background work when the screen is off and device is still.',
  },
  {
    term: 'ANR',
    definition:
      'Application Not Responding — triggered when the main thread is blocked for more than 5 seconds.',
  },
  {
    term: 'minSdk',
    definition:
      'Minimum Android API level the app supports. Lower minSdk means more devices but fewer APIs available.',
  },
  {
    term: 'targetSdk',
    definition:
      'The API level the app was designed and tested against. Affects behavior changes applied by the OS.',
  },
]

// ─── Code Examples ────────────────────────────────────────────────────────────

const codeExamples = [
  {
    title: 'ViewModel + StateFlow',
    code: `class CounterViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(CounterUiState())
    val uiState: StateFlow<CounterUiState> = _uiState.asStateFlow()

    fun increment() = _uiState.update { it.copy(count = it.count + 1) }
    fun reset()     = _uiState.update { CounterUiState() }
}

data class CounterUiState(val count: Int = 0)`,
    explanation:
      'MutableStateFlow is exposed as read-only StateFlow. UiState is a data class — copy() produces a new instance on every update, making state changes explicit and traceable.',
  },
  {
    title: 'Collect StateFlow in Compose',
    code: `@Composable
fun CounterScreen(vm: CounterViewModel = viewModel()) {
    val uiState by vm.uiState.collectAsStateWithLifecycle()

    Column(modifier = Modifier.padding(16.dp)) {
        Text(text = "Count: \${uiState.count}", style = MaterialTheme.typography.headlineMedium)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = vm::increment) { Text("Increment") }
            OutlinedButton(onClick = vm::reset) { Text("Reset") }
        }
    }
}`,
    explanation:
      'collectAsStateWithLifecycle() automatically stops collection when the Composable leaves the STARTED state, preventing background work and memory leaks.',
  },
  {
    title: 'Room DAO with Flow',
    code: `@Entity(tableName = "notes")
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val body: String,
    val createdAt: Long = System.currentTimeMillis(),
)

@Dao
interface NoteDao {
    @Query("SELECT * FROM notes ORDER BY createdAt DESC")
    fun observeAll(): Flow<List<Note>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(note: Note)

    @Delete
    suspend fun delete(note: Note)

    @Transaction
    suspend fun replaceAll(notes: List<Note>) {
        deleteAll()
        notes.forEach { upsert(it) }
    }

    @Query("DELETE FROM notes")
    suspend fun deleteAll()
}`,
    explanation:
      'observeAll() emits a new list every time the notes table changes — no manual refresh needed. @Transaction groups multiple operations atomically.',
  },
  {
    title: 'Retrofit + OkHttp setup',
    code: `interface GitHubApi {
    @GET("users/{user}/repos")
    suspend fun listRepos(@Path("user") user: String): List<Repo>

    @POST("gists")
    suspend fun createGist(@Body gist: CreateGistRequest): Gist
}

// In your DI module
@Provides @Singleton
fun provideOkHttp(): OkHttpClient = OkHttpClient.Builder()
    .addInterceptor(HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    })
    .addInterceptor { chain ->
        chain.proceed(
            chain.request().newBuilder()
                .addHeader("Authorization", "Bearer \${BuildConfig.API_TOKEN}")
                .build()
        )
    }
    .build()

@Provides @Singleton
fun provideRetrofit(okHttp: OkHttpClient): GitHubApi = Retrofit.Builder()
    .baseUrl("https://api.github.com/")
    .client(okHttp)
    .addConverterFactory(GsonConverterFactory.create())
    .build()
    .create(GitHubApi::class.java)`,
    explanation:
      'The interceptor chain injects auth headers on every request without touching call sites. Never hardcode tokens in source — use BuildConfig fields populated from local.properties or CI secrets.',
  },
  {
    title: 'Repository with NetworkBoundResource',
    code: `class NoteRepository @Inject constructor(
    private val api: NoteApi,
    private val dao: NoteDao,
) {
    fun observeNotes(): Flow<List<Note>> = flow {
        // Emit cached data immediately
        emitAll(dao.observeAll())
    }.onStart {
        // Refresh from network in background
        runCatching { api.fetchNotes() }
            .onSuccess { dao.replaceAll(it) }
            .onFailure { /* log or emit error event */ }
    }

    suspend fun addNote(note: Note) {
        val created = api.createNote(note)
        dao.upsert(created)
    }
}`,
    explanation:
      'UI always observes Room (single source of truth). Network response updates Room, which triggers a new Flow emission. runCatching prevents network errors from crashing the flow.',
  },
  {
    title: 'WorkManager CoroutineWorker',
    code: `class SyncWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted params: WorkerParameters,
    private val repository: NoteRepository,
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result = runCatching {
        repository.syncWithServer()
    }.fold(
        onSuccess = { Result.success() },
        onFailure = { Result.retry() },
    )
}

// Enqueue from ViewModel or Application
val request = PeriodicWorkRequestBuilder<SyncWorker>(1, TimeUnit.HOURS)
    .setConstraints(Constraints(requiredNetworkType = NetworkType.CONNECTED))
    .build()

WorkManager.getInstance(context).enqueueUniquePeriodicWork(
    "sync",
    ExistingPeriodicWorkPolicy.KEEP,
    request,
)`,
    explanation:
      'CoroutineWorker runs doWork() on Dispatchers.Default. Result.retry() triggers exponential backoff. enqueueUniquePeriodicWork prevents duplicate workers when the app is restarted.',
  },
  {
    title: 'Hilt module setup',
    code: `@HiltAndroidApp
class App : Application()

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { AppTheme { NavHost(...) } }
    }
}

@HiltViewModel
class NoteViewModel @Inject constructor(
    private val repository: NoteRepository,
) : ViewModel() {
    val notes = repository.observeNotes()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
}

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {
    @Provides @Singleton
    fun provideDatabase(@ApplicationContext ctx: Context): AppDatabase =
        Room.databaseBuilder(ctx, AppDatabase::class.java, "app.db").build()

    @Provides
    fun provideNoteDao(db: AppDatabase): NoteDao = db.noteDao()
}`,
    explanation:
      'Hilt wires the dependency graph at compile time. stateIn converts a Flow to a StateFlow so Compose can collect it. WhileSubscribed(5000) keeps the upstream active for 5 s after the last collector disappears (survives config change).',
  },
]

// ─── Lifecycle Walkthrough Scenarios ──────────────────────────────────────────

const lifecycleScenarios = [
  {
    id: 'rotation',
    title: 'Screen rotation',
    steps: [
      'User rotates device. System calls onPause() → onStop() → onDestroy() on current Activity instance.',
      'A new Activity instance is created. onCreate() → onStart() → onResume() runs.',
      "ViewModel is NOT recreated — it survives via ViewModelStore attached to the Activity's non-configuration state.",
      'Compose UI recomposes from ViewModel state. UI is restored without a network call.',
      'Transient UI state (scroll position, text input) must be saved with rememberSaveable or onSaveInstanceState.',
    ],
    summary:
      'ViewModel survives rotation; Activity does not. This is the core reason to keep all state in ViewModel, not in Activity or Fragment fields.',
  },
  {
    id: 'background-kill',
    title: 'App killed in background',
    steps: [
      'User navigates away from the app. Activity is stopped (onStop) but process may still be alive.',
      'OS is low on memory. It kills the process without calling onDestroy().',
      'User returns to the app. OS recreates the process and Activity from scratch.',
      'ViewModel is gone — it did not survive process death. Instance state saved in onSaveInstanceState is available.',
      'Network or Room data is refetched. ViewModel should reload from Repository on initialization.',
    ],
    summary:
      'Process death wipes ViewModel. Use SavedStateHandle inside ViewModel to preserve critical state across process death.',
  },
  {
    id: 'deep-link',
    title: 'Deep link navigation',
    steps: [
      'User taps a link in a browser (myapp://notes/42) or an external app fires an Intent.',
      "Android resolves the intent to the app's MainActivity using the intent filter declared in AndroidManifest.xml.",
      'NavController processes the incoming URI, matching it against the NavGraph deep link definitions.',
      'The matching Composable destination is started with the extracted argument (noteId = 42).',
      "Back stack is populated per the NavGraph's deepLinkBuilder or the default single-destination back stack.",
    ],
    summary:
      'Deep links require intent-filter declarations in Manifest (for custom schemes) or Digital Asset Links verification (for App Links with HTTPS). Always validate the URI data before use.',
  },
]

// ─── Pseudocode Patterns ──────────────────────────────────────────────────────

const pseudocodePatterns = [
  {
    title: 'MVVM data flow',
    code: `User taps button
  → Composable calls viewModel.doSomething()
  → ViewModel calls repository.fetch()
  → Repository calls api.get() or dao.query()
  → Data returns through suspend chain
  → ViewModel updates _uiState.update { ... }
  → StateFlow emits new UiState
  → Composable recomposes with new state`,
    explanation:
      'No state mutation in the UI layer. Every change originates in the data layer and flows up through ViewModel to the UI.',
  },
  {
    title: 'Coroutine scope selection',
    code: `viewModelScope.launch { ... }
  // Use when: work is tied to ViewModel lifetime
  // Cancelled when: ViewModel clears (navigation away)

lifecycleScope.launch {
  repeatOnLifecycle(Lifecycle.State.STARTED) { ... }
}
  // Use when: collecting Flows in Activity/Fragment
  // Suspended when: below STARTED; resumed on return

GlobalScope.launch { ... }
  // Avoid: orphaned coroutines, no structured cancellation`,
    explanation:
      'Scope selection determines when coroutines are cancelled. Wrong scope = memory leaks or work after UI is gone.',
  },
  {
    title: 'Permission request flow',
    code: `val launcher = rememberLauncherForActivityResult(
    RequestPermission()
) { granted ->
    if (granted) proceedWithFeature()
    else showDeniedMessage()
}

Button(onClick = {
    when {
        hasPermission(Manifest.permission.CAMERA) ->
            proceedWithFeature()
        shouldShowRationale(Manifest.permission.CAMERA) ->
            showRationale { launcher.launch(CAMERA) }
        else ->
            launcher.launch(Manifest.permission.CAMERA)
    }
}) { Text("Open Camera") }`,
    explanation:
      'Always check current state before prompting. Rationale path handles the "denied once" case. Else path handles first-time request and permanent denial (after which shouldShowRationale returns false).',
  },
]

// ─── Key Takeaways ────────────────────────────────────────────────────────────

const keyTakeaways = [
  'Android is Kotlin-first. Use coroutines and StateFlow; avoid callbacks, threads, and RxJava for new code.',
  'Jetpack Compose is the modern UI toolkit. Prefer it for new screens and migrate Views incrementally.',
  'ViewModel + Repository + StateFlow is the standard architecture pattern. Keep UI stateless.',
  'The OS owns component lifetimes. Use ViewModel to survive configuration changes; SavedStateHandle to survive process death.',
  'Room and Retrofit are the standard persistence and networking layers, both natively coroutine-compatible.',
  'WorkManager is the correct API for guaranteed background work. Foreground Service is for ongoing visible operations.',
  'Gradle and R8 are not optional — configure them correctly from day one to avoid APK size, performance, and signing surprises in production.',
  'Security, permissions, and accessibility are first-class requirements, not post-launch add-ons.',
]

// ─── Types and Constants ──────────────────────────────────────────────────────

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
    { id: 'core-components', label: 'Android Components' },
    { id: 'core-lifecycle', label: 'Lifecycle States' },
    { id: 'core-jetpack', label: 'Jetpack Libraries' },
    { id: 'core-coroutines', label: 'Kotlin Coroutines' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-architecture', label: 'Architecture Patterns' },
    { id: 'core-persistence', label: 'Persistence' },
    { id: 'core-background', label: 'Background Processing' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-permissions', label: 'Permissions Model' },
    { id: 'core-build', label: 'Build System' },
    { id: 'core-release', label: 'App Signing and Release' },
    { id: 'core-security', label: 'Security Best Practices' },
    { id: 'core-performance', label: 'Performance Notes' },
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

// ─── Styles ───────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

export default function AndroidEcosystemPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Android Ecosystem',
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
      title="Android Ecosystem"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Android Ecosystem</h1>
      <p>
        Android is Google's open-source mobile platform. This document covers the full developer
        ecosystem: OS component model, lifecycle management, Jetpack libraries, Kotlin coroutines,
        networking, persistence, background processing, testing, build tooling, and publishing. The
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
              Android development demands reasoning about layers that most platforms hide: the OS
              lifecycle, the threading model, the permission runtime, and the build/signing
              pipeline. Bugs in any of these layers manifest as crashes, ANRs, leaks, or Play Store
              rejections.
            </p>
            <p>
              The ecosystem has consolidated significantly. Teams that adopt Kotlin coroutines,
              Compose, and the standard Jetpack stack spend less time on framework plumbing and more
              on product features. Diverging from these defaults needs a clear reason.
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
          <section id="core-components" className="bin98-section">
            <h2 className="bin98-heading">Android Components</h2>
            {androidComponents.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-lifecycle" className="bin98-section">
            <h2 className="bin98-heading">Lifecycle States</h2>
            {lifecycleStates.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-jetpack" className="bin98-section">
            <h2 className="bin98-heading">Jetpack Libraries</h2>
            {jetpackLibraries.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-coroutines" className="bin98-section">
            <h2 className="bin98-heading">Kotlin Coroutines</h2>
            {coroutineConcepts.map((item) => (
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
          <section id="core-testing" className="bin98-section">
            <h2 className="bin98-heading">Testing</h2>
            {testingLayer.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-permissions" className="bin98-section">
            <h2 className="bin98-heading">Permissions Model</h2>
            {permissionsModel.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-build" className="bin98-section">
            <h2 className="bin98-heading">Build System</h2>
            {buildSystem.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-release" className="bin98-section">
            <h2 className="bin98-heading">App Signing and Release</h2>
            {releaseProcess.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-security" className="bin98-section">
            <h2 className="bin98-heading">Security Best Practices</h2>
            {securityPractices.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Notes</h2>
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
              {lifecyclePitfalls.map((p) => (
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
            <p>
              Select a scenario and step through the sequence to understand how the Android
              lifecycle behaves.
            </p>
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
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
