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
  'Kotlin is a modern statically typed language designed to improve developer productivity without abandoning mainstream platforms. It is most strongly associated with the JVM and Android, but its scope is broader: it can target the JVM, JavaScript, and native platforms, and it increasingly appears in mobile, backend, multiplatform, scripting, and tooling contexts.',
  'The language matters because it modernizes an established ecosystem rather than demanding that teams throw their existing investments away. Kotlin keeps deep interoperability with Java while offering null safety, concise syntax, data-oriented modeling, higher-order programming, coroutines, and a standard library designed to reduce a large amount of common boilerplate.',
  'This page is intentionally thorough. It covers Kotlin as a practical object-oriented language with functional features, its relationship to Java and Android, classes and data classes, null safety, sealed hierarchies, coroutines, interoperability, tooling, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Kotlin is a general-purpose language built to feel safer, more concise, and more expressive than older mainstream JVM languages while still fitting naturally into existing production environments. It supports object-oriented programming, functional techniques, generic abstractions, asynchronous programming, and domain-focused API design without requiring teams to abandon familiar build tools or runtime platforms.',
      'Its biggest strategic advantage is that it improves everyday engineering work on platforms people already use. Rather than asking an organization to replace the JVM, Android, or Java libraries, Kotlin gives those ecosystems a more modern language layer.',
    ],
  },
  {
    id: 'bp-why-kotlin',
    title: 'Why Kotlin Exists',
    paragraphs: [
      'Kotlin exists because many developers wanted a language that fixed recurring pain points in large Java-style codebases: excessive boilerplate, weak null-handling discipline, awkward functional patterns, and verbose data modeling. It was designed to address those issues while remaining practical for teams who still depend on Java libraries, Java infrastructure, and the JVM operational model.',
      'That pragmatic goal shaped nearly every design choice. Kotlin is not trying to be maximally pure or radically unfamiliar. It is trying to make common engineering work less error-prone and less repetitive.',
    ],
    bullets: [
      'Reduce boilerplate without sacrificing readability.',
      'Improve correctness with null safety and clearer type contracts.',
      'Keep strong interoperability with Java and JVM ecosystems.',
      'Support both object-oriented and functional styles in ordinary application code.',
    ],
  },
  {
    id: 'bp-platform-context',
    title: 'JVM, Android, And Multiplatform Context',
    paragraphs: [
      'Kotlin is most visible on the JVM, where it compiles to bytecode and uses the same broad runtime universe as Java. That makes it immediately useful for backend services, tools, enterprise systems, and any environment already built around JVM deployment and libraries.',
      'It is also central to modern Android development. Google officially supports Kotlin as a first-class Android language, and much of the modern Android guidance, including Jetpack and Compose usage, assumes Kotlin. Beyond that, Kotlin Multiplatform aims to share some code across platforms while still allowing platform-specific implementations where needed.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Kotlin Fits Best',
    paragraphs: [
      'Kotlin fits best where teams want modern language ergonomics but need to stay close to established platforms. That includes Android applications, JVM backend services, internal tools, Gradle build logic, server APIs, and codebases that need a careful migration path from Java rather than a complete rewrite.',
      'It is especially strong for application development that values maintainability, readability, and correctness in medium-to-large codebases. It is less often chosen for domains where a platform outside the JVM or Apple/Android ecosystems already dominates the stack.',
    ],
    bullets: [
      'Android applications and libraries.',
      'JVM backend services and internal platforms.',
      'Mixed Java/Kotlin codebases that need gradual modernization.',
      'Multiplatform code sharing where business logic can be reused across targets.',
    ],
  },
  {
    id: 'bp-design-style',
    title: 'Object-Oriented And Functional Together',
    paragraphs: [
      'Kotlin combines a very ordinary object model with many functional conveniences. Developers still work with classes, interfaces, inheritance, encapsulation, and polymorphism, but they also get lambdas, higher-order functions, immutable-friendly collection pipelines, expression-oriented constructs, and concise data modeling tools.',
      'This combination is one of the reasons Kotlin feels productive in practice. It does not force teams to abandon object-oriented thinking. Instead, it gives them a cleaner way to mix object-oriented structure with more declarative styles where that improves clarity.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      "Kotlin's biggest strengths are readability, null-safety discipline, concise expression of common patterns, strong interoperability, and a design that scales from simple scripts to large production systems. Many teams adopt it because routine code becomes shorter and clearer without becoming obscure.",
      'Coroutines are another major strength. Kotlin offers a far more coherent asynchronous programming story than callback-heavy code or raw thread management, especially on Android and in services that perform I/O-bound work.',
    ],
    bullets: [
      'Safer null handling than many mainstream languages.',
      'Concise data modeling through data classes and expressive syntax.',
      'Excellent Java interoperability for incremental adoption.',
      'Strong async ergonomics through coroutines and structured concurrency.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'Kotlin is not magic. It still inherits some complexity from the platforms it lives on, especially the JVM and Android. Build systems can be heavy, advanced type features can confuse newcomers, and overuse of concise syntax or scope functions can make code harder to read rather than easier.',
      'It also does not remove the need for good architecture. Coroutines do not automatically solve concurrency design, data classes do not automatically create a rich domain model, and interoperability with Java means teams often still carry legacy design constraints.',
    ],
    bullets: [
      'Build tooling can be slower or more complex than simpler language stacks.',
      'Mixed Java and Kotlin codebases still inherit legacy platform decisions.',
      'Some expressive features are easy to overuse.',
      'Multiplatform promises need careful evaluation against real product constraints.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that Kotlin is a modernization layer for serious application development. It lets teams keep proven ecosystems while writing code that is safer, denser, and usually more pleasant to maintain.',
      'Good Kotlin code is explicit about domain meaning, careful about nullability, selective about advanced features, and disciplined about API clarity. Bad Kotlin code hides complexity behind clever syntax and assumes shorter code is always better code.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'Kotlin syntax is designed to reduce repetition without turning ordinary code into dense shorthand. Type inference removes a lot of redundant declarations, expression bodies shorten simple functions, named arguments clarify calls, and string templates reduce formatting noise. The result is typically less ceremony than Java-style code while still remaining readable to developers who work in mainstream application languages.',
      "That surface concision matters because much of Kotlin's value is cumulative. Each individual feature looks small, but together they remove a large amount of low-signal code from everyday classes, service methods, and state modeling.",
    ],
  },
  {
    id: 'core-null-safety',
    title: 'Null Safety',
    paragraphs: [
      "Null safety is one of Kotlin's signature ideas. Types are non-null by default, and nullable references must be marked explicitly with `?`. This forces code to acknowledge uncertainty at the type level rather than treating null-related failures as a normal surprise at runtime.",
      'The language also provides ergonomic tools for nullable data, including safe calls, the Elvis operator, `let`, and smart casts after null checks. These features do not eliminate every possible null problem, especially when interoperating with Java, but they raise the baseline substantially.',
    ],
  },
  {
    id: 'core-classes-data-classes',
    title: 'Classes, Data Classes, And Value Modeling',
    paragraphs: [
      'Kotlin supports ordinary classes with constructors, properties, methods, visibility controls, inheritance, and interfaces. That makes it straightforward to use for service objects, UI state holders, domain models, repositories, controllers, and other familiar OOP structures.',
      'Data classes are especially important because they compress a very common pattern into a single declaration. They automatically provide useful value-oriented behavior such as `equals`, `hashCode`, `toString`, and copying support, which encourages developers to model data explicitly rather than carrying everything around as loose maps or mutable records.',
    ],
  },
  {
    id: 'core-interfaces-sealed',
    title: 'Interfaces, Sealed Types, And Hierarchy Design',
    paragraphs: [
      "Interfaces remain central to Kotlin's object-oriented design. They support abstraction boundaries, polymorphism, and testable dependency graphs in the same way they do in other mainstream application languages. Kotlin also allows default interface implementations, which can reduce some categories of boilerplate.",
      'Sealed classes and sealed interfaces are valuable when a hierarchy should be closed to a known set of cases. This is especially useful for UI state, domain outcomes, command results, and protocol-like modeling where exhaustive handling matters. Together, interfaces and sealed types make Kotlin particularly good at designing explicit state machines and outcome types.',
    ],
  },
  {
    id: 'core-functions-lambdas',
    title: 'Functions, Lambdas, And Higher-Order APIs',
    paragraphs: [
      'Kotlin treats functions as first-class values. Lambdas, higher-order functions, and function types are common throughout the standard library and most framework APIs. This enables concise collection processing, callback design, builder DSLs, and flexible control abstractions without abandoning object-oriented structure.',
      'In practice, this means Kotlin developers often move more easily between imperative and declarative styles. A service might still be a class, but it can use higher-order functions internally to keep data transformation logic compact and readable.',
    ],
  },
  {
    id: 'core-extension-functions',
    title: 'Extension Functions And API Ergonomics',
    paragraphs: [
      'Extension functions let developers add callable behavior to existing types without modifying their source code. This is not the same thing as true runtime modification of the original class. Instead, it is a compile-time convenience that makes APIs read more naturally and keeps helper behavior close to the types it works on.',
      'Used well, extension functions improve clarity and discoverability. Used poorly, they can scatter behavior in non-obvious places. The discipline is to use them where they strengthen the conceptual model rather than simply because the syntax is available.',
    ],
  },
  {
    id: 'core-collections',
    title: 'Collections And Standard Library Style',
    paragraphs: [
      "Kotlin's standard library encourages expressive list, set, and map processing through functions such as `map`, `filter`, `fold`, `associate`, and `groupBy`. These APIs often make transformation logic easier to read than index-heavy loops, especially when the code is mostly about shaping data rather than managing control flow.",
      'The language also nudges developers toward clearer distinctions between read-only views and mutable collections. That does not mean all Kotlin code is fully immutable, but it does encourage more deliberate state management than many older mainstream codebases.',
    ],
  },
  {
    id: 'core-generics',
    title: 'Generics And Type System Pragmatism',
    paragraphs: [
      'Kotlin has a capable generic type system, but its design remains practical rather than purely academic. It includes variance annotations, generic constraints, type inference, and features such as reified type parameters in inline functions. These features support flexible reusable APIs without forcing every developer to think in advanced type theory constantly.',
      'That said, generic-heavy Kotlin can still become difficult to read. The language gives teams power, but it does not remove the need to write APIs that ordinary maintainers can follow.',
    ],
  },
  {
    id: 'core-coroutines',
    title: 'Coroutines And Structured Asynchrony',
    paragraphs: [
      "Coroutines are one of Kotlin's most important practical features. They provide a way to express asynchronous work in code that still looks sequential, which improves readability compared with deeply nested callbacks or manually coordinated thread logic. Suspend functions, coroutine scopes, dispatchers, and structured concurrency conventions create a more coherent async model for I/O-heavy applications.",
      'The important idea is not just syntax. Structured concurrency helps make task lifetimes explicit, which is especially valuable in Android UI lifecycles, service request handling, and pipeline-style backend work. It is a safer mental model than launching background work with no ownership.',
    ],
  },
  {
    id: 'core-jvm-interop',
    title: 'Java Interoperability',
    paragraphs: [
      'Java interoperability is a core reason Kotlin succeeds. Kotlin code can call Java libraries directly, implement Java interfaces, extend Java classes, and live in the same codebase with Java modules. This makes migration and adoption far less risky than moving to a language that would isolate the team from existing libraries and platform conventions.',
      'Interop is not always frictionless. Java APIs may expose nullability ambiguity, mutability assumptions, or verbosity patterns that Kotlin was designed to improve. Still, the ability to adopt Kotlin incrementally is one of its strongest strategic advantages.',
    ],
  },
  {
    id: 'core-android',
    title: 'Android Development',
    paragraphs: [
      'Kotlin is now deeply tied to Android development. It improves common Android patterns through safer null handling, more concise UI state modeling, better asynchronous code via coroutines, and cleaner APIs for architecture components. Modern Android guidance frequently assumes Kotlin, and Jetpack Compose is particularly natural in Kotlin because the language supports DSL-like API patterns well.',
      'This matters because Android code often deals with lifecycle complexity, state coordination, UI rendering, and asynchronous operations. Kotlin reduces a lot of the ceremony and brittleness that historically made large Android codebases difficult to maintain.',
    ],
  },
  {
    id: 'core-backend',
    title: 'Backend And Service Development',
    paragraphs: [
      'On the backend, Kotlin is commonly used with frameworks such as Spring Boot and Ktor. It works well for service code that needs strong library support, good JVM operational characteristics, concise data models, and readable asynchronous or reactive workflows.',
      'Kotlin backend adoption is often strongest where a team already has JVM expertise but wants a language that improves everyday ergonomics. It can be especially attractive for APIs, internal platforms, event-driven services, and teams gradually modernizing older Java services.',
    ],
  },
  {
    id: 'core-multiplatform',
    title: 'Multiplatform Direction',
    paragraphs: [
      'Kotlin Multiplatform aims to let teams share some logic across platforms while keeping native UI and platform-specific code where necessary. The strongest use cases are usually shared domain logic, network layers, validation, state handling, and business rules rather than trying to force every layer into one universal abstraction.',
      'This area is strategically important but should be evaluated pragmatically. Shared code is valuable only when it reduces real duplication without creating unnatural architecture or painful build complexity.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling, Builds, And Ecosystem',
    paragraphs: [
      'Kotlin development usually involves IntelliJ-based tooling, Gradle builds, JVM packaging workflows, Android Studio for mobile work, and ecosystem libraries shaped by either the JVM or Android communities. JetBrains tooling support is a major advantage, especially for refactoring, navigation, and understanding language features.',
      'The downside is that the surrounding tooling can feel heavier than simpler interpreted-language stacks. Kotlin itself may be concise, but the build environment is still often substantial.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'Kotlin performance is typically close to what developers expect from the target platform rather than something entirely separate from it. On the JVM, performance usually depends more on algorithms, allocations, library behavior, and runtime design than on the fact that the source language is Kotlin.',
      'There can still be tradeoffs. Some abstractions introduce allocations or indirection, and careless coroutine or collection usage can add overhead. In practice, though, Kotlin is usually fast enough for mainstream application work while offering better developer ergonomics than more verbose alternatives.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where Kotlin Shines',
    paragraphs: [
      'Kotlin shines when codebases are large enough for safety and readability improvements to matter every day. Android apps, JVM services, strongly modeled domain logic, asynchronous applications, and mixed Java/Kotlin modernization efforts are all particularly strong fits.',
      'It also shines where teams care about expressive APIs and explicit state. Sealed hierarchies, data classes, nullability, and concise functions make many application-level designs easier to communicate directly in code.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common Kotlin mistake is assuming that concise syntax always produces clearer code. Too many scope functions, nested lambdas, and clever extension chains can make logic harder to understand than a direct imperative implementation. Another mistake is using data classes or sealed types mechanically without thinking about the actual domain model.',
      "Interop can also hide problems. Platform types from Java can weaken Kotlin's null-safety guarantees, and legacy Java frameworks can pull Kotlin code back toward older design patterns. The strongest teams use Kotlin to simplify design, not just shorten files.",
    ],
    bullets: [
      'Overusing `let`, `run`, `apply`, and similar scope functions.',
      'Treating coroutines as a replacement for concurrency design rather than a tool within it.',
      'Confusing data classes with rich business entities that need real behavior and invariants.',
      'Assuming Java interoperability removes the need to audit nullability and mutability carefully.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-data-class',
    title: 'Data Class For Domain Modeling',
    description: [
      'Data classes make simple value-oriented modeling concise. They are useful for request objects, DTOs, immutable state snapshots, and many domain values that mainly hold data.',
    ],
    code: `data class UserProfile(
    val id: Long,
    val name: String,
    val isAdmin: Boolean,
)`,
    notes: [
      'This removes a large amount of boilerplate compared with manually writing equality, string formatting, and property wiring.',
      'Data classes are strongest for value-like models rather than every class in a system.',
    ],
  },
  {
    id: 'ex-null-safety',
    title: 'Null Safety With Safe Calls And Elvis',
    description: [
      'Nullable values are explicit in Kotlin, and the language gives ergonomic tools for handling absence clearly.',
    ],
    code: `fun greeting(name: String?): String {
    return name?.let { "Hello, $it." } ?: "Hello, guest."
}`,
    notes: [
      'The safe call avoids dereferencing a nullable value blindly.',
      'The Elvis operator provides a readable fallback when the nullable branch is absent.',
    ],
  },
  {
    id: 'ex-extension',
    title: 'Extension Function',
    description: [
      "Extension functions can make helper behavior read like part of the type's natural API without changing the original class.",
    ],
    code: `fun String.initials(): String =
    split(" ")
        .filter { it.isNotBlank() }
        .joinToString("") { it.first().uppercase() }`,
    notes: [
      'This is useful when a helper is conceptually tied to a type but should remain outside the type definition.',
      'Extension functions should improve the model, not scatter important behavior unpredictably.',
    ],
  },
  {
    id: 'ex-sealed',
    title: 'Sealed State Modeling',
    description: [
      'Sealed hierarchies are effective for representing a fixed set of states or outcomes that callers should handle explicitly.',
    ],
    code: `sealed interface LoadState
data object Idle : LoadState
data object Loading : LoadState
data class Success(val items: List<String>) : LoadState
data class Failure(val message: String) : LoadState`,
    notes: [
      'This works well for UI screens, request states, and domain workflows.',
      'Exhaustive \`when\` handling helps keep state transitions explicit.',
    ],
  },
  {
    id: 'ex-coroutine',
    title: 'Coroutine-Based Async Work',
    description: [
      'Suspend functions let asynchronous code read like sequential logic, which improves clarity in I/O-heavy flows.',
    ],
    code: `suspend fun fetchUserName(): String = "Ava"

suspend fun greeting(): String {
    val name = fetchUserName()
    return "Hello, $name."
}`,
    notes: [
      'Coroutines reduce the visual noise of callback-oriented code.',
      'The real benefit comes when suspend functions are used inside structured scopes with clear ownership.',
    ],
  },
  {
    id: 'ex-interface',
    title: 'Interface And Implementation',
    description: [
      'Kotlin still supports ordinary OOP abstraction through interfaces and implementing classes, which is useful for testable architecture and dependency boundaries.',
    ],
    code: `interface Notifier {
    fun send(message: String)
}

class EmailNotifier : Notifier {
    override fun send(message: String) {
        println(message)
    }
}`,
    notes: [
      'This remains an important pattern in backend services, Android layers, and modular application design.',
      'Kotlin improves the surrounding syntax, but the architectural idea is the same familiar object-oriented boundary.',
    ],
  },
  {
    id: 'ex-collection',
    title: 'Collection Transformation',
    description: [
      'Standard library collection operations make routine data shaping concise and readable.',
    ],
    code: `val scores = listOf(92, 74, 88, 99)

val honors = scores
    .filter { it >= 90 }
    .map { "score=$it" }`,
    notes: [
      'This style is useful when the code is primarily describing a transformation pipeline.',
      'If the logic becomes too dense, a simpler step-by-step style is usually better.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Data class',
        definition:
          'A Kotlin class optimized for value-style data holding, with generated behavior such as equality, string rendering, and copying.',
      },
      {
        term: 'Nullable type',
        definition: 'A type marked with `?` that explicitly allows the value `null`.',
      },
      {
        term: 'Extension function',
        definition:
          'A function that can be called as though it belongs to an existing type without actually modifying that type.',
      },
      {
        term: 'Sealed class or interface',
        definition:
          'A closed hierarchy whose direct implementations are known in advance, enabling more exhaustive handling.',
      },
      {
        term: 'Smart cast',
        definition:
          'A compiler-assisted narrowing of a type after checks such as null tests or type tests.',
      },
      {
        term: 'Elvis operator',
        definition:
          'The `?:` operator, used to provide a fallback when a nullable expression is `null`.',
      },
      {
        term: 'Scope function',
        definition:
          'Utility functions such as `let`, `run`, `also`, `apply`, and `with` that change how a block interacts with an object.',
      },
      {
        term: 'Reified type parameter',
        definition:
          'A generic type parameter whose type information is available at runtime inside an inline function.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Platform Terms',
    terms: [
      {
        term: 'JVM',
        definition:
          'The Java Virtual Machine, a major Kotlin target and the runtime environment behind much Kotlin backend and Android-adjacent work.',
      },
      {
        term: 'Android',
        definition:
          'A mobile platform where Kotlin is a first-class language for app and library development.',
      },
      {
        term: 'Coroutine',
        definition:
          'A lightweight concurrency abstraction used in Kotlin for asynchronous and cooperative task execution.',
      },
      {
        term: 'Suspend function',
        definition:
          'A function marked with `suspend`, meaning it can pause and resume within coroutine-based asynchronous workflows.',
      },
      {
        term: 'Coroutine scope',
        definition:
          'A lifecycle boundary that owns coroutines and helps enforce structured concurrency.',
      },
      {
        term: 'Platform type',
        definition:
          'A type coming from Java interop whose nullability is not fully known to Kotlin at compile time.',
      },
      {
        term: 'Gradle',
        definition: 'A major build system used widely in Kotlin JVM and Android projects.',
      },
      {
        term: 'Ktor',
        definition:
          'A Kotlin-focused framework often used for backend services and HTTP applications.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Ecosystem And Architecture Terms',
    terms: [
      {
        term: 'Jetpack Compose',
        definition:
          "A modern Android UI toolkit that fits naturally with Kotlin's declarative and DSL-friendly features.",
      },
      {
        term: 'Kotlin Multiplatform',
        definition:
          'An approach for sharing selected Kotlin code across multiple targets while keeping platform-specific code where necessary.',
      },
      {
        term: 'Spring Boot',
        definition:
          'A widely used JVM framework that many teams combine with Kotlin for backend services.',
      },
      {
        term: 'Interop',
        definition: 'The ability for Kotlin to work directly with Java and other platform APIs.',
      },
      {
        term: 'Dependency injection',
        definition:
          'An architectural pattern for supplying dependencies from the outside rather than constructing everything internally.',
      },
      {
        term: 'DSL',
        definition:
          'A domain-specific language, often created in Kotlin using lambdas and receivers to express configuration or structure clearly.',
      },
      {
        term: 'Value modeling',
        definition:
          'Representing important domain concepts with explicit types instead of loose primitive combinations.',
      },
      {
        term: 'Exhaustive `when`',
        definition:
          'A `when` expression that covers all possible cases of a type, especially useful with sealed hierarchies.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-kotlin', label: 'Why Kotlin Exists' },
    { id: 'bp-platform-context', label: 'Platform Context' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-design-style', label: 'OO and Functional Style' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-null-safety', label: 'Null Safety' },
    { id: 'core-classes-data-classes', label: 'Classes and Data Classes' },
    { id: 'core-interfaces-sealed', label: 'Interfaces and Sealed Types' },
    { id: 'core-functions-lambdas', label: 'Functions and Lambdas' },
    { id: 'core-extension-functions', label: 'Extension Functions' },
    { id: 'core-collections', label: 'Collections' },
    { id: 'core-generics', label: 'Generics' },
    { id: 'core-coroutines', label: 'Coroutines' },
    { id: 'core-jvm-interop', label: 'Java Interop' },
    { id: 'core-android', label: 'Android' },
    { id: 'core-backend', label: 'Backend' },
    { id: 'core-multiplatform', label: 'Multiplatform' },
    { id: 'core-tooling', label: 'Tooling' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-data-class', label: 'Data Class' },
    { id: 'ex-null-safety', label: 'Null Safety' },
    { id: 'ex-extension', label: 'Extension Function' },
    { id: 'ex-sealed', label: 'Sealed State' },
    { id: 'ex-coroutine', label: 'Coroutine' },
    { id: 'ex-interface', label: 'Interface' },
    { id: 'ex-collection', label: 'Collection Transformation' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Ecosystem Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin98-section">
      <h2 className="kotlin98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={`${section.id}-p-${index}`}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item, index) => (
            <li key={`${section.id}-b-${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="kotlin98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin98-section">
      <h2 className="kotlin98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="kotlin98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="kotlin98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin98-section">
      <h2 className="kotlin98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="kotlin98-divider" />}
    </section>
  )
}

export default function KotlinPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Kotlin',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Kotlin"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Kotlin</h1>
      {introParagraphs.map((paragraph, index) => (
        <p key={`intro-${index}`}>{paragraph}</p>
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
