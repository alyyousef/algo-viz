import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Kotlin is the primary language for modern Android development. The important point is not just that Kotlin can run on Android. It is that the Android ecosystem, Jetpack libraries, Compose, coroutines, KTX extensions, and most current guidance are now shaped around Kotlin-first development.',
  'The meaningful comparison is not simply Kotlin versus Java in the abstract. It is what Kotlin changes about day-to-day Android engineering: null-safety, concise syntax, extension functions, coroutines, sealed types, better DSL support, more expressive state modeling, and tighter alignment with current Android architecture patterns.',
  'This page is intentionally comprehensive. It covers why Kotlin became central to Android, what language features matter most on Android, interoperability with Java, coroutines and Flow, KTX, Compose fit, Gradle and tooling, testing, performance, migration strategy, architectural patterns, and the common mistakes teams make when they adopt Kotlin without really changing their Android engineering habits.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Kotlin is a statically typed JVM language designed to be concise, expressive, and safer than older Java-heavy application code in many everyday scenarios. On Android, that combination matters because mobile applications combine UI state, async work, lifecycle handling, serialization, network calls, local persistence, and a large amount of glue code. Kotlin reduces much of the boilerplate and many of the accidental hazards in that environment.',
      'Android is now effectively Kotlin-first. Modern Android APIs, Jetpack guidance, coroutines support, and Compose all assume Kotlin as the normal development language. Java is still supported, and interoperability remains important, but Kotlin is the primary path for current Android work.',
      'The crucial engineering lesson is that Kotlin is not only a syntax upgrade. It changes how Android code is structured. Repository layers become more natural. Coroutines simplify async work. Sealed types improve UI state modeling. Extension functions and DSL-friendly APIs make Android libraries more ergonomic.',
    ],
  },
  {
    id: 'bp-why-kotlin-matters',
    title: 'Why Kotlin Matters on Android',
    paragraphs: [
      'Android code historically carried a lot of accidental complexity: nullability mistakes, callback-heavy async work, verbose model classes, utility boilerplate, and friction between expressive intent and what Java syntax made convenient. Kotlin addresses many of those pain points directly.',
      'It does not make architecture automatic, but it does make good architecture easier to express. This is why Kotlin adoption on Android was not just trend-following. It solved real recurring engineering friction in a large ecosystem.',
    ],
    bullets: [
      'Null-safety reduces a major class of Android crashes.',
      'Coroutines make async and lifecycle-aware work cleaner.',
      'Data classes and sealed types improve state modeling.',
      'Extension functions and KTX make Android APIs feel more natural.',
    ],
  },
  {
    id: 'bp-when-kotlin-fits',
    title: 'When Kotlin Is the Right Fit',
    paragraphs: [
      'For modern Android development, Kotlin is usually the default fit rather than a special case. It is especially strong when the app uses coroutines, Flow, Compose, Room, Retrofit, ViewModel, or any current Jetpack-first architecture.',
      'Its value grows with application complexity because the language makes large amounts of Android glue code smaller, more explicit, and less fragile.',
    ],
    bullets: [
      'Most new Android apps.',
      'Apps using Jetpack and Compose.',
      'Codebases that benefit from strong nullability modeling.',
      'Teams that want modern async patterns and clearer state modeling.',
    ],
  },
  {
    id: 'bp-when-kotlin-is-not-the-whole-story',
    title: 'When Kotlin Is Not the Whole Story',
    paragraphs: [
      'Kotlin is not a substitute for Android architecture. A badly organized app written in Kotlin is still badly organized. It is also not a reason to ignore Java interop, because many Android codebases and libraries still include Java.',
      'Another mistake is assuming that moving from Java to Kotlin automatically modernizes an app. A codebase can be syntactically Kotlin while still carrying callback-heavy patterns, mutable global state, weak error handling, and poor lifecycle discipline.',
    ],
    bullets: [
      'Kotlin does not replace architecture decisions.',
      'Kotlin does not remove the need to understand the Android lifecycle.',
      'Java interop still matters in many real codebases.',
      'Migration to Kotlin is only valuable if the coding style improves too.',
    ],
  },
  {
    id: 'bp-building-blocks',
    title: 'The Main Building Blocks',
    paragraphs: [
      'Kotlin on Android usually means more than the language alone. In practice it comes with coroutines, Flow, KTX extensions, Jetpack libraries, Gradle plugin support, Android Studio tooling, and often Compose. These tools reinforce each other and help explain why Kotlin feels like a platform shift rather than just a syntax preference.',
      'Understanding that surrounding ecosystem is as important as understanding `val`, `data class`, or null-safe calls.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Kotlin improves a lot of everyday Android code, but it does not remove performance constraints, lifecycle issues, network unreliability, or data consistency problems. It gives better tools for expressing the right solutions, but teams still need discipline around architecture, concurrency, and testing.',
      'In production, Kotlin pays off most when teams use it to clarify intent rather than to show off language tricks. Concise code is useful only when it remains readable and maintainable.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'For new Android work, the decision is usually already made: Kotlin should be the default. For legacy apps, the more useful question is how and where to migrate so the codebase gains architectural clarity instead of just accumulating mixed-style code.',
      'A second question is whether the team is ready to use Kotlin idiomatically. Converting syntax without adopting coroutine-friendly, null-safe, state-aware patterns leaves much of the value unrealized.',
    ],
    bullets: [
      'Use Kotlin by default for modern Android.',
      'Treat migration as an architectural improvement opportunity, not just a syntax conversion.',
      'Keep Java interop practical and deliberate.',
      'Favor clarity over cleverness in Kotlin-heavy Android code.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-kotlin-is',
    title: 'What Kotlin Actually Is',
    paragraphs: [
      'Kotlin is a statically typed language designed to interoperate with Java while providing a more concise and expressive programming model. On Android, that means Kotlin can use the same platform, JVM ecosystem, and many existing libraries while improving developer ergonomics.',
      'Its real value on Android comes from how it models nullability, asynchronous workflows, data shapes, and extension-based APIs more cleanly than older baseline Java app code typically could.',
    ],
  },
  {
    id: 'core-kotlin-first-android',
    title: 'Kotlin-First Android',
    paragraphs: [
      "Modern Android guidance assumes Kotlin-first development. That shows up across Jetpack libraries, coroutine support, KTX APIs, and especially Jetpack Compose. While Java remains valid, the ecosystem's center of gravity has moved.",
      'This matters strategically because developer education, new examples, and many modern APIs are easier to consume in Kotlin than in older Java-style patterns.',
    ],
  },
  {
    id: 'core-null-safety',
    title: 'Null-Safety and Android Reliability',
    paragraphs: [
      "Nullability is one of Kotlin's most practically important features on Android. Android apps are full of optional values, lifecycle boundaries, asynchronous data arrival, saved state, and data from external systems. Kotlin's type system makes nullable and non-nullable intent explicit, which reduces a major class of runtime crashes.",
      'This does not eliminate null bugs completely. Platform types, Java interop, deserialization, and weak architectural choices can still create trouble. But Kotlin moves null reasoning much closer to the compiler and away from guesswork.',
    ],
  },
  {
    id: 'core-conciseness',
    title: 'Conciseness, Data Classes, and Everyday Boilerplate',
    paragraphs: [
      'Kotlin reduces large amounts of routine Android boilerplate. Data classes replace repetitive model code. Expression bodies reduce ceremony. Default parameters simplify API surfaces. Named arguments improve call-site clarity. These things matter because Android applications tend to produce a lot of glue code.',
      'The win is not just fewer lines. The deeper win is that intent becomes easier to see because less of the code is mechanical setup.',
    ],
  },
  {
    id: 'core-extension-functions',
    title: 'Extension Functions and Android KTX',
    paragraphs: [
      "Extension functions are one of Kotlin's most ecosystem-shaping features on Android. They let libraries add fluent helper APIs without forcing deep inheritance or utility-class sprawl. Android KTX takes advantage of this heavily, making common Android tasks read more like direct language features than framework ceremony.",
      'This is why Kotlin on Android often feels like more than a syntax change. The library surface itself becomes more ergonomic because extension-based APIs compose naturally with the language.',
    ],
  },
  {
    id: 'core-coroutines',
    title: 'Coroutines, Suspend Functions, and Structured Concurrency',
    paragraphs: [
      "Coroutines are one of Kotlin's most important contributions to Android development. They provide a structured model for asynchronous work that is significantly cleaner than callback-heavy or manually coordinated thread code. Suspend functions let asynchronous work read more like ordinary sequential logic without giving up non-blocking behavior.",
      'Structured concurrency matters especially on Android because work should have ownership. Coroutine scopes tied to ViewModel or lifecycle boundaries make cancellation and cleanup more predictable than ad hoc async patterns.',
    ],
  },
  {
    id: 'core-flow',
    title: 'Flow and Reactive State',
    paragraphs: [
      'Kotlin Flow gives Android apps a natural stream abstraction for UI state, local database observation, and async pipelines. It integrates well with Room, repositories, and ViewModel state exposure, which helps explain why modern Android guidance often feels coherent across layers.',
      'Flow does not remove the need to think carefully about state ownership, replay behavior, or backpressure semantics, but it gives the ecosystem a shared vocabulary for reactive data movement.',
    ],
  },
  {
    id: 'core-java-interop',
    title: 'Java Interoperability',
    paragraphs: [
      "Kotlin interoperates directly with Java, which is strategically important on Android because many production apps still contain mixed-language codebases and many libraries were originally designed for Java. Kotlin's success on Android is partly due to this realistic migration path.",
      'Interop is powerful but not frictionless. Platform types, checked-exception differences, annotation behavior, and nullability inference mean teams still need to be deliberate when Kotlin and Java meet.',
    ],
  },
  {
    id: 'core-compose',
    title: 'Kotlin and Jetpack Compose',
    paragraphs: [
      'Jetpack Compose is one of the clearest examples of Kotlin shaping Android architecture rather than just decorating it. Compose uses Kotlin language features and DSL expressiveness heavily, which is one reason Kotlin-first Android feels fundamentally different from the old XML plus Java baseline.',
      "This matters because Compose is not just a UI library using Kotlin by accident. Its ergonomics are deeply tied to Kotlin's lambdas, default parameters, state handling patterns, and general expressiveness.",
    ],
  },
  {
    id: 'core-room-retrofit',
    title: 'Kotlin with Room, Retrofit, and Jetpack',
    paragraphs: [
      'Kotlin fits especially well with modern Android libraries such as Room and Retrofit because suspend functions, Flow, data classes, and extension-friendly APIs make the data layer cleaner. Repositories can read more like straightforward application logic instead of plumbing code.',
      'This is one of the biggest practical reasons Kotlin matters: multiple Jetpack and ecosystem libraries become simpler at the same time when the language model aligns with them.',
    ],
  },
  {
    id: 'core-viewmodel-state',
    title: 'ViewModel, UI State, and Sealed Types',
    paragraphs: [
      'Kotlin sealed types are excellent for modeling UI state on Android because screens often move between loading, success, empty, and error states. Instead of relying on loosely coordinated booleans and nullable fields, Kotlin lets teams describe valid states explicitly.',
      'That works especially well with ViewModel-driven architecture because the UI can render from a well-defined state model rather than from partially related flags.',
    ],
  },
  {
    id: 'core-gradle-tooling',
    title: 'Gradle, Tooling, and IDE Support',
    paragraphs: [
      'Kotlin on Android is tightly integrated with Gradle and Android Studio. Build scripts, compiler settings, linting, code inspections, and refactoring support are all part of the normal development loop. This matters because language adoption is only truly successful when the surrounding tooling makes it feel natural.',
      'Tooling still needs discipline. Compiler warnings, lint, formatting, and static analysis should be part of the engineering baseline rather than optional cleanup.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing with Kotlin',
    paragraphs: [
      'Kotlin generally improves test readability because setup code is smaller and state modeling is clearer. Coroutines and Flow also have ecosystem support for structured testing, which makes async Android code more testable than older callback-heavy patterns.',
      'That said, Kotlin does not make testing optional. It simply makes well-structured code easier to test and many common asynchronous cases less painful to reason about.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Runtime Reality',
    paragraphs: [
      'Kotlin is not free. Language features, generated helpers, allocation patterns, coroutine usage, and higher-level abstractions still need performance awareness on mobile devices. But most Android app performance issues are architecture, UI, allocation, I/O, or network problems rather than the raw presence of Kotlin syntax.',
      'The practical rule is to use Kotlin expressively but not carelessly. Measure real hot paths instead of blaming the language for every performance issue.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migrating Existing Android Codebases',
    paragraphs: [
      'Migration from Java to Kotlin is usually best done incrementally. Convert isolated files, introduce Kotlin-friendly architectural boundaries, and let repositories, ViewModels, and utility layers become cleaner over time. A forced full rewrite is rarely the most disciplined path.',
      'The important part is style convergence. A mixed codebase is manageable when the Kotlin side follows consistent idioms and the Java side has clear boundaries. It becomes messy when teams convert syntax mechanically without improving architecture.',
    ],
  },
  {
    id: 'core-anti-patterns',
    title: 'Common Kotlin Anti-Patterns on Android',
    paragraphs: [
      'A recurring anti-pattern is writing overly clever Kotlin that is shorter but harder to understand. Another is using force unwraps or weak nullability discipline in ways that erase the safety benefits Kotlin offers. Teams also sometimes misuse coroutines by launching work without meaningful ownership or cancellation strategy.',
      'The healthiest Kotlin Android codebases are not the ones with the most advanced language tricks. They are the ones where the language is used to make architecture and intent clearer.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-null-safety',
    title: 'Null-Safe UI Mapping',
    description: [
      'Null-safety is one of the most concrete Kotlin wins on Android. It makes absent data explicit instead of relying on convention and hope.',
    ],
    code: `data class UserDto(
  val name: String?,
  val avatarUrl: String?
)

fun UserDto.toUi(): UserUiModel =
  UserUiModel(
    displayName = name ?: "Unknown",
    avatarUrl = avatarUrl,
  )`,
    notes: [
      'Nullable and non-nullable intent is visible in the type system.',
      'Fallback behavior is explicit rather than accidental.',
    ],
  },
  {
    id: 'examples-data-class',
    title: 'Data Class and Sealed UI State',
    description: [
      'Kotlin is especially good at modeling Android screen state in a way that avoids scattered booleans and partial state.',
    ],
    code: `sealed interface UserScreenState {
  data object Loading : UserScreenState
  data class Success(val user: UserUiModel) : UserScreenState
  data class Error(val message: String) : UserScreenState
}`,
    notes: [
      'Sealed state models make valid screen states explicit.',
      'This pattern works very naturally with ViewModel-driven UI.',
    ],
  },
  {
    id: 'examples-coroutines',
    title: 'Suspend Repository Function',
    description: [
      'Coroutines let repository code read like application logic instead of nested callback choreography.',
    ],
    code: `class UserRepository(
  private val service: UserService,
) {
  suspend fun loadUser(id: Long): User =
    service.getUser(id).toDomain()
}`,
    notes: [
      'Suspend functions simplify async boundaries significantly.',
      'Repositories remain cleaner when transport and mapping are sequential in style.',
    ],
  },
  {
    id: 'examples-flow',
    title: 'Flow from Room to ViewModel',
    description: [
      'Flow is a strong fit for Android state pipelines because it connects persistence and UI state without callback plumbing.',
    ],
    code: `class UserViewModel(
  repository: UserRepository,
) : ViewModel() {
  val users = repository.observeUsers()
    .stateIn(
      scope = viewModelScope,
      started = SharingStarted.WhileSubscribed(5_000),
      initialValue = emptyList(),
    )
}`,
    notes: [
      'Flow works naturally with ViewModel scope and lifecycle-aware state.',
      'Kotlin makes the stream pipeline much smaller than older async styles.',
    ],
  },
  {
    id: 'examples-extension',
    title: 'Extension Function for Android Convenience',
    description: [
      'Extension functions are a major reason Android KTX feels natural in Kotlin. They keep helper behavior near the type that benefits from it.',
    ],
    code: `fun Context.toast(message: String) {
  Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}`,
    notes: [
      'Extensions reduce utility-class sprawl.',
      'They make Android helper APIs feel more local and readable.',
    ],
  },
  {
    id: 'examples-compose',
    title: 'Compose State in Kotlin',
    description: [
      'Compose shows how well Kotlin supports declarative UI. Kotlin language features are part of why Compose reads so naturally.',
    ],
    code: `@Composable
fun UserCard(user: UserUiModel) {
  Column {
    Text(text = user.displayName)
    if (user.avatarUrl != null) {
      Text(text = "Has avatar")
    }
  }
}`,
    notes: [
      'Compose is deeply shaped by Kotlin language ergonomics.',
      'The UI reads like a typed DSL rather than imperative view plumbing.',
    ],
  },
  {
    id: 'examples-java-interop',
    title: 'Java Interop Boundary',
    description: [
      'Mixed Android codebases are common. Kotlin should interoperate cleanly rather than pretending Java no longer exists.',
    ],
    code: `class UserFormatter {
  @JvmStatic
  fun format(name: String?): String =
    name ?: "Unknown"
}`,
    notes: [
      'Interop annotations and boundary choices still matter in mixed codebases.',
      'Migration works better when boundaries are explicit and stable.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Core Kotlin Terms',
    terms: [
      {
        term: 'Null-safety',
        definition:
          'The Kotlin type-system feature that distinguishes nullable from non-nullable references.',
      },
      {
        term: 'Data class',
        definition:
          'A Kotlin class optimized for value-like models with generated equality, copy, and string behavior.',
      },
      {
        term: 'Extension function',
        definition:
          'A Kotlin function that adds callable behavior to an existing type without modifying the original class.',
      },
      {
        term: 'Suspend function',
        definition: 'A function that can pause and resume as part of Kotlin coroutines.',
      },
      {
        term: 'Sealed type',
        definition: 'A Kotlin construct used to model a closed set of valid subtypes or states.',
      },
      {
        term: 'Companion object',
        definition:
          'A Kotlin object associated with a class, often used for factory or static-like behavior.',
      },
      {
        term: 'Named argument',
        definition:
          'A Kotlin call-site feature that improves readability by naming parameters explicitly.',
      },
      {
        term: 'Platform type',
        definition:
          'A type coming from Java interop where Kotlin cannot fully guarantee nullability information.',
      },
    ],
  },
  {
    id: 'glossary-android',
    title: 'Android and Architecture Terms',
    terms: [
      {
        term: 'KTX',
        definition:
          'Kotlin-first Android extension libraries that make Android APIs more ergonomic.',
      },
      {
        term: 'ViewModel',
        definition:
          'A lifecycle-aware Android component that exposes screen state and survives configuration changes.',
      },
      {
        term: 'Flow',
        definition:
          'A Kotlin stream abstraction commonly used for reactive state and data pipelines.',
      },
      {
        term: 'Compose',
        definition:
          "Android's modern declarative UI toolkit, strongly aligned with Kotlin language features.",
      },
      {
        term: 'Repository',
        definition:
          'An application layer that coordinates data sources and exposes domain-facing operations.',
      },
      {
        term: 'Coroutine scope',
        definition: 'A lifetime boundary that owns coroutine execution and cancellation.',
      },
      {
        term: 'Room',
        definition:
          "Android Jetpack's SQLite abstraction, commonly paired with Kotlin Flow and repositories.",
      },
      {
        term: 'Retrofit',
        definition:
          'A type-safe HTTP client layer often used from Kotlin suspend functions in Android data layers.',
      },
    ],
  },
  {
    id: 'glossary-migration',
    title: 'Migration and Tooling Terms',
    terms: [
      {
        term: 'Incremental migration',
        definition:
          'Converting a Java Android codebase to Kotlin gradually instead of in one risky rewrite.',
      },
      {
        term: 'Interop',
        definition:
          'The ability for Kotlin and Java code to call each other within the same codebase.',
      },
      {
        term: 'Android Studio',
        definition: 'The primary IDE for Android development, with deep Kotlin tooling support.',
      },
      {
        term: 'Gradle plugin',
        definition:
          'Build tooling integration that compiles Kotlin and coordinates Android project configuration.',
      },
      {
        term: 'Lint',
        definition:
          'Static analysis that checks code for probable mistakes, maintainability issues, and style problems.',
      },
      {
        term: 'Structured concurrency',
        definition:
          'A coroutine design principle where async work has clear ownership and cancellation boundaries.',
      },
      {
        term: 'Source of truth',
        definition:
          'The canonical place the app trusts for the current value of some data or state.',
      },
      {
        term: 'Idiomatic Kotlin',
        definition:
          'Kotlin written in a style that uses the language clearly and naturally rather than as Java with different syntax.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-kotlin-matters', label: 'Why Kotlin Matters' },
    { id: 'bp-when-kotlin-fits', label: 'When Kotlin Fits' },
    { id: 'bp-when-kotlin-is-not-the-whole-story', label: 'What Kotlin Does Not Replace' },
    { id: 'bp-building-blocks', label: 'Main Building Blocks' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-kotlin-is', label: 'What Kotlin Is' },
    { id: 'core-kotlin-first-android', label: 'Kotlin-First Android' },
    { id: 'core-null-safety', label: 'Null-Safety' },
    { id: 'core-conciseness', label: 'Conciseness and Boilerplate' },
    { id: 'core-extension-functions', label: 'Extension Functions and KTX' },
    { id: 'core-coroutines', label: 'Coroutines' },
    { id: 'core-flow', label: 'Flow' },
    { id: 'core-java-interop', label: 'Java Interop' },
    { id: 'core-compose', label: 'Compose' },
    { id: 'core-room-retrofit', label: 'Jetpack and Data Layers' },
    { id: 'core-viewmodel-state', label: 'ViewModel and UI State' },
    { id: 'core-gradle-tooling', label: 'Gradle and Tooling' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-migration', label: 'Migration' },
    { id: 'core-anti-patterns', label: 'Anti-Patterns' },
  ],
  examples: [
    { id: 'examples-null-safety', label: 'Null-Safe Mapping' },
    { id: 'examples-data-class', label: 'Sealed UI State' },
    { id: 'examples-coroutines', label: 'Suspend Repository' },
    { id: 'examples-flow', label: 'Flow to ViewModel' },
    { id: 'examples-extension', label: 'Extension Function' },
    { id: 'examples-compose', label: 'Compose Example' },
    { id: 'examples-java-interop', label: 'Java Interop' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Core Kotlin Terms' },
    { id: 'glossary-android', label: 'Android Terms' },
    { id: 'glossary-migration', label: 'Migration and Tooling Terms' },
  ],
}

const pageStyles = `
.kotlin-android-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.kotlin-android-help-window {
  width: 100%;
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

.kotlin-android-help-titlebar {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.kotlin-android-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.kotlin-android-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.kotlin-android-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
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
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.kotlin-android-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.kotlin-android-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.kotlin-android-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.kotlin-android-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.kotlin-android-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.kotlin-android-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.kotlin-android-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.kotlin-android-help-toc-item {
  margin: 0 0 8px;
}

.kotlin-android-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.kotlin-android-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.kotlin-android-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.kotlin-android-help-section {
  margin: 0 0 20px;
}

.kotlin-android-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.kotlin-android-help-content p,
.kotlin-android-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.kotlin-android-help-content p {
  margin: 0 0 10px;
}

.kotlin-android-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.kotlin-android-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.kotlin-android-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.kotlin-android-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .kotlin-android-help-main {
    grid-template-columns: 1fr;
  }

  .kotlin-android-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .kotlin-android-help-window {
    min-height: auto;
  }

  .kotlin-android-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .kotlin-android-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .kotlin-android-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin-android-help-section">
      <h2 className="kotlin-android-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="kotlin-android-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin-android-help-section">
      <h2 className="kotlin-android-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="kotlin-android-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="kotlin-android-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin-android-help-section">
      <h2 className="kotlin-android-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="kotlin-android-help-divider" />}
    </section>
  )
}

export default function KotlinForAndroidPage(): JSX.Element {
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
    document.title = `Kotlin for Android (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Kotlin for Android',
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
    <div className="kotlin-android-help-page">
      <style>{pageStyles}</style>
      <div className="kotlin-android-help-window" role="presentation">
        <header className="kotlin-android-help-titlebar">
          <span className="kotlin-android-help-titletext">Kotlin for Android</span>
          <div className="kotlin-android-help-controls">
            <button
              className="kotlin-android-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="kotlin-android-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="kotlin-android-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`kotlin-android-help-tab ${activeTab === tab.id ? 'kotlin-android-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="kotlin-android-help-main">
          <aside className="kotlin-android-help-toc" aria-label="Table of contents">
            <h2 className="kotlin-android-help-toc-title">Contents</h2>
            <ul className="kotlin-android-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="kotlin-android-help-toc-item">
                  <a href={`#${section.id}`} className="kotlin-android-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="kotlin-android-help-content">
            <h1 className="kotlin-android-help-doc-title">Kotlin for Android</h1>
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
          </main>
        </div>
      </div>
    </div>
  )
}
