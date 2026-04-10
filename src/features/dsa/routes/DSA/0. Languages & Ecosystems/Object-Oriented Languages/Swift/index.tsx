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
  'Swift is a modern compiled language created by Apple for building software across iOS, macOS, watchOS, tvOS, and increasingly server-side and tooling environments. It combines strong static typing, memory safety, expressive syntax, value semantics, and protocol-oriented design into a language that tries to be both practical and modern.',
  'It matters because it represents a different answer to systems and application programming than older object-oriented Apple languages such as Objective-C. Swift emphasizes safety, explicitness around absence and errors, modern generics, structured concurrency, and APIs that read cleanly while still compiling to high-performance native code.',
  'This page is intentionally comprehensive. It covers Swift as a native language, Apple-platform context, object-oriented and protocol-oriented design, optionals, structs and classes, generics, protocols, memory management, concurrency, tooling, ecosystem fit, examples, tradeoffs, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Swift is a statically typed compiled language designed for native development. It aims to replace much of the accidental complexity that developers encountered in older Apple stacks by making many unsafe or ambiguous situations explicit in the language itself. It compiles to efficient native code and is deeply integrated with Apple frameworks and tooling.',
      'The language is often associated most strongly with iOS development, but that framing is too narrow. Swift is really a general-purpose native language with a particularly strong home in the Apple ecosystem. It can be used for applications, command-line tools, package-based libraries, server-side systems, and increasingly for broader toolchain work.',
    ],
  },
  {
    id: 'bp-why-swift',
    title: 'Why Swift Exists',
    paragraphs: [
      'Swift exists partly because Objective-C, while powerful and dynamic, carried historical complexity around syntax, runtime dynamism, nullability, and C-derived interoperability concerns that made modern large-scale development harder than it needed to be for many teams.',
      'Swift tries to provide a safer and more expressive default. It introduces optionals, stronger typing, generics, better value semantics, cleaner syntax, and a more consistent standard library while still interoperating with legacy Apple ecosystems where needed.',
    ],
    bullets: [
      'It replaces much historical verbosity and accidental runtime ambiguity.',
      'It makes many unsafe situations explicit in the type system.',
      'It supports modern API design more naturally than legacy Apple languages.',
      'It offers native performance with a more approachable surface.',
    ],
  },
  {
    id: 'bp-native-context',
    title: 'Native Platform Context',
    paragraphs: [
      'Swift is a native language rather than a JVM or browser-hosted language. That means it typically compiles to machine code for the target platform, integrates closely with system frameworks, and participates directly in platform-level application and runtime models.',
      'This native context matters because it gives Swift excellent performance characteristics and deep system access, but it also ties much of its mainstream adoption to Apple platforms, Xcode workflows, and Apple framework evolution in a way that languages with broader cross-platform roots do not face in the same way.',
    ],
  },
  {
    id: 'bp-design-style',
    title: 'Object-Oriented, Protocol-Oriented, And Value-Oriented',
    paragraphs: [
      'Swift supports classes and classic object-oriented ideas such as encapsulation, inheritance, and reference semantics, but its design identity is not purely class-centric. Swift also pushes strongly toward protocols, structs, enums with associated values, and value-oriented data modeling.',
      'That is why Swift is often described as protocol-oriented rather than simply object-oriented. Many good Swift designs start by modeling data with structs and behavior contracts with protocols, using classes where identity, shared mutable state, or interoperability make reference semantics appropriate.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Swift Fits Best',
    paragraphs: [
      'Swift is strongest in Apple-platform application development, especially when teams want modern language features paired with native UI frameworks, system APIs, and high-performance platform integration. It is also increasingly reasonable for server-side components, CLI tools, and package-based shared libraries.',
      'The best fit appears when native performance, safety, and Apple ecosystem alignment matter more than maximal runtime portability. It is a less natural choice when platform neutrality or ecosystem breadth across many non-Apple targets is the primary concern.',
    ],
    bullets: [
      'iOS, macOS, watchOS, and tvOS applications.',
      'Native SDKs and package-based libraries.',
      'Developer tools and command-line utilities.',
      'Selected server-side systems where Swift infrastructure is acceptable.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      'Swift offers a strong safety story. Optionals, value semantics, explicit error handling, access control, and a modern type system help developers surface problems earlier and express program structure more directly. That makes it attractive for large codebases where correctness and maintainability matter.',
      'It also offers a clear native-development story. Swift gives high-level ergonomics without abandoning performance, memory-awareness, or platform integration. Combined with first-party tooling and frameworks, that can make it a very productive language for Apple-native engineering.',
    ],
    bullets: [
      'Modern syntax and strong static typing.',
      'Clear handling of absence through optionals.',
      'Powerful generics and protocol-based design.',
      'Native performance and deep Apple ecosystem integration.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'Swift has real tradeoffs. Its strongest ecosystem is still centered on Apple platforms, so teams targeting many unrelated platforms may find other languages easier organizationally. It also has a sophisticated type system and ownership direction that can be challenging for newcomers, especially when combined with generics and protocol constraints.',
      'Tooling is strongest inside Apple workflows, and while Swift has broadened beyond them, the language still feels most natural where Apple APIs and Xcode are first-class. Teams should treat that as a strategic fact, not a minor detail.',
    ],
    bullets: [
      'The ecosystem is much stronger on Apple platforms than elsewhere.',
      'Advanced generics and protocol-heavy design can become complex.',
      "Cross-platform story exists but is not the language's dominant center of gravity.",
      'Interop with older Objective-C systems can introduce design compromises.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that Swift is a safety-first native language with strong support for value modeling and protocol-based abstraction. It is not only about writing classes more cleanly. It is about choosing the right semantic model for data and behavior, then letting the type system make those choices explicit.',
      'Good Swift code usually feels direct, explicit, and constrained in useful ways. It uses structs, enums, protocols, optionals, and concurrency features to make application logic predictable rather than magical.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'Swift syntax is modern and intentionally readable. It reduces punctuation-heavy ceremony compared with older C-family and Objective-C styles while keeping explicit structure where the language believes clarity matters. API naming conventions, argument labels, and clear declaration forms are part of the language culture, not just style preferences.',
      'This matters because Swift code is designed to read almost like a small domain language when APIs are written well. The language encourages naming and call-site design as part of the engineering contract.',
    ],
  },
  {
    id: 'core-static-typing',
    title: 'Static Typing And Type Inference',
    paragraphs: [
      'Swift is statically typed, but it uses inference where that improves readability. Local variables and expressions often do not require explicit type annotations when the compiler can determine the intent clearly. At the same time, public APIs and complex generic contexts still benefit from explicit types.',
      'The result is a language that tries to balance explicitness with ergonomics. The compiler helps reduce repetition, but the type system remains central to how APIs and domain models are expressed.',
    ],
  },
  {
    id: 'core-optionals',
    title: 'Optionals And Explicit Absence',
    paragraphs: [
      "Optionals are one of Swift's defining features. Instead of letting absence hide as an ordinary value in many places, Swift models the possibility of no value explicitly. This forces code to unwrap, bind, guard, or otherwise acknowledge uncertainty before using the underlying value.",
      "That explicitness is one of Swift's key safety wins. It reduces entire categories of accidental null-handling errors, though it also means developers need discipline around choosing where optionality is truly part of the domain model.",
    ],
  },
  {
    id: 'core-structs-classes',
    title: 'Structs Versus Classes',
    paragraphs: [
      'Swift gives first-class importance to both value types and reference types. Structs are copied by value and are often the default choice for data models, view models, configuration values, and many application-level concepts. Classes are reference types and are better when identity, shared mutable state, inheritance, or framework interoperability are genuinely required.',
      'This distinction is not cosmetic. Swift encourages developers to think carefully about whether a concept should behave like a value or an identity-bearing object. That decision affects safety, mutation, concurrency, and API semantics.',
    ],
    bullets: [
      'Prefer structs for many ordinary data models.',
      'Use classes when identity and shared reference semantics matter.',
      'Do not default to classes only because the codebase is nominally OOP.',
      "Value semantics are one of Swift's biggest architectural advantages.",
    ],
  },
  {
    id: 'core-protocols',
    title: 'Protocols And Protocol-Oriented Design',
    paragraphs: [
      'Protocols are central in Swift. They define capabilities and contracts without forcing a single inheritance hierarchy. Types can conform to protocols, generic code can depend on those protocols, and protocol extensions can share behavior in flexible ways.',
      "This is why Swift is often called protocol-oriented. Much of the language's expressive power comes from separating what a type can do from whether it belongs to a particular class lineage.",
    ],
  },
  {
    id: 'core-enums-patterns',
    title: 'Enums With Associated Values And Pattern Matching',
    paragraphs: [
      'Swift enums are more powerful than simple integer-backed enumerations in many older languages. They can carry associated values and therefore model full algebraic alternatives rather than only named constants. This makes them valuable for result states, navigation flows, actions, errors, and domain events.',
      'Combined with `switch` and pattern matching, enums give Swift a very strong state-modeling story. Instead of loosely coordinating booleans and nullable fields, developers can encode legal alternatives directly in the type system.',
    ],
  },
  {
    id: 'core-generics',
    title: 'Generics And Reusable APIs',
    paragraphs: [
      'Swift generics allow reusable abstractions while preserving type safety and performance. Generic functions, generic types, protocol constraints, and associated types make it possible to build rich APIs without collapsing everything into weakly typed containers.',
      "Generics are powerful, but they also contribute to Swift's complexity ceiling. When used carefully they make libraries precise and reusable. When overused they can turn ordinary code into a maze of constraints that slows human understanding.",
    ],
  },
  {
    id: 'core-error-handling',
    title: 'Error Handling',
    paragraphs: [
      'Swift uses explicit error handling with `throw`, `try`, `catch`, and `Result`-style modeling where appropriate. This is an important part of its design because it makes failure part of the contract rather than a hidden side effect.',
      'The language does not force every possible failure into one pattern, but it strongly encourages developers to decide clearly whether something is impossible, optional, recoverable, or exceptional.',
    ],
  },
  {
    id: 'core-memory-arc',
    title: 'Memory Management And ARC',
    paragraphs: [
      'Swift uses Automatic Reference Counting rather than a tracing garbage collector. ARC manages the lifetime of reference types by incrementing and decrementing reference counts, which usually makes memory behavior more predictable than stop-the-world GC systems while still avoiding manual memory management in the C++ sense.',
      'That said, ARC does not make memory concerns disappear. Developers still need to understand ownership, retain cycles, weak references, and capture lists, especially in closure-heavy and UI-driven code.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Structured Concurrency',
    paragraphs: [
      "Modern Swift includes structured concurrency through `async` and `await`, tasks, actors, and related mechanisms. This is one of the language's major modern strengths because it gives native developers a clearer model for asynchronous work than callback pyramids or ad hoc thread handling.",
      'Actors are especially important because they provide a language-level model for isolating mutable state in concurrent programs. They do not remove the need for careful design, but they give Swift a safer concurrency story than many native stacks traditionally offered.',
    ],
  },
  {
    id: 'core-extensions',
    title: 'Extensions And API Organization',
    paragraphs: [
      'Extensions let Swift add methods, computed properties, conformances, and organization structure to existing types without modifying the original declaration directly. This is useful both for library design and for keeping large codebases modular.',
      'Used well, extensions make APIs feel cohesive while keeping source organization manageable. Used poorly, they can scatter the meaning of a type across too many files or modules. The feature is powerful enough to require style discipline.',
    ],
  },
  {
    id: 'core-access-control',
    title: 'Modules And Access Control',
    paragraphs: [
      'Swift supports modules and layered access control such as `private`, `fileprivate`, `internal`, `public`, and `open`. This matters in package design because it lets libraries expose deliberate public surfaces while hiding internal implementation detail.',
      'Access control is not just about encapsulation style. It is part of how Swift encourages clear API boundaries and controlled surface area for frameworks and packages.',
    ],
  },
  {
    id: 'core-interop',
    title: 'Objective-C And C Interoperability',
    paragraphs: [
      'Swift interoperates with Objective-C and, through broader tooling paths, with C and system libraries. This is strategically important because the Apple ecosystem did not reset itself from scratch when Swift arrived. Real codebases often need to interact with older frameworks, mixed-language modules, or legacy APIs.',
      'Interop is both a strength and a source of compromise. Some Swift APIs must account for Objective-C compatibility, and mixed-language systems can inherit conceptual complexity from both worlds at once.',
    ],
  },
  {
    id: 'core-ui-frameworks',
    title: 'UIKit, SwiftUI, And Platform Development',
    paragraphs: [
      'Swift is closely tied to Apple UI development, whether through UIKit, AppKit, or SwiftUI. SwiftUI in particular has pushed the language into a more declarative and state-driven direction, making value semantics and observable state patterns even more important in day-to-day app development.',
      'This connection matters because Swift is not just a language in isolation. Much of its practical shape is influenced by the frameworks developers spend time in, especially on Apple platforms.',
    ],
  },
  {
    id: 'core-server-cli',
    title: 'Server-Side And Command-Line Use',
    paragraphs: [
      'Swift is not limited to client applications. The Swift Package Manager, server frameworks such as Vapor, and growing tooling support have made it viable for command-line tools, package libraries, and some server-side workloads.',
      'Still, this is a secondary center of gravity compared with Apple app development. Teams choosing Swift outside Apple platforms should do so with clear reasons rather than assuming ecosystem breadth equal to more established server languages.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'Swift can deliver excellent performance because it is compiled and designed with native execution in mind. Value types, inlining, ARC behavior, copy-on-write optimizations, and compiler improvements all contribute to strong runtime characteristics when code is designed carefully.',
      'Performance still depends on architecture and profiling. Excessive copying, retain cycles, unnecessary bridging, and abstraction choices can all matter. The language gives good raw tools, but performance remains an engineering discipline, not a default gift.',
    ],
  },
  {
    id: 'core-when-it-shines',
    title: 'Where Swift Shines',
    paragraphs: [
      'Swift shines in Apple-native development, especially where safety, performance, modern concurrency, and expressive APIs matter. It is especially good for teams that want to model UI state and domain data cleanly while staying close to platform frameworks and native performance characteristics.',
      'It also shines when teams embrace its actual design rather than translating older class-heavy habits directly into it. The language pays off most when value semantics, protocols, enums, and explicit absence are used as intended.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common mistake is using classes everywhere out of habit rather than choosing value semantics deliberately. Another is treating optionals as a nuisance rather than as useful signals about uncertainty. Teams also often underestimate ARC-related retain cycles and closure capture behavior until those issues show up in real products.',
      'Swift can also become harder to read when generic constraints, protocol extensions, and abstraction layers multiply faster than the domain complexity actually justifies.',
    ],
    bullets: [
      'Overusing classes when structs would model the domain better.',
      'Forcing optional handling away instead of designing it clearly.',
      'Ignoring retain cycles and ARC ownership behavior.',
      'Building abstractions that are more generic than the product needs.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-struct',
    title: 'Struct With Value Semantics',
    description: [
      'Structs are often the right default for ordinary data models in Swift. They make copying and mutation behavior more explicit than class-based reference semantics.',
    ],
    code: `struct UserProfile {
    let id: Int
    var name: String
    var isAdmin: Bool
}

var user = UserProfile(id: 1, name: "Ava", isAdmin: true)
user.name = "Ava Carter"`,
    notes: [
      'This models simple data without introducing shared reference identity.',
      "Value semantics are one of Swift's most important design advantages.",
    ],
  },
  {
    id: 'ex-optional',
    title: 'Optional Handling With Guard',
    description: [
      'Optionals force the possibility of missing data into the code path explicitly. `guard` is a common way to exit early when a required value is absent.',
    ],
    code: `func greet(_ name: String?) -> String {
    guard let name else {
        return "Hello, guest."
    }

    return "Hello, \\(name)."
}`,
    notes: [
      'The code must account for absence instead of ignoring it.',
      'This reduces accidental null-style failures at runtime.',
    ],
  },
  {
    id: 'ex-protocol',
    title: 'Protocol-Oriented Design',
    description: [
      'Protocols let Swift model capability and behavior contracts without forcing inheritance-heavy designs.',
    ],
    code: `protocol Greeter {
    func greet(name: String) -> String
}

struct FriendlyGreeter: Greeter {
    func greet(name: String) -> String {
        "Hello, \\(name)."
    }
}`,
    notes: [
      'Protocols support flexible abstraction without requiring a class hierarchy.',
      "This style aligns well with Swift's broader design philosophy.",
    ],
  },
  {
    id: 'ex-enum',
    title: 'Enum With Associated Values',
    description: [
      'Swift enums can model rich application state rather than only fixed constants. This is especially useful for result and UI flow modeling.',
    ],
    code: `enum LoadState {
    case idle
    case loading
    case success([String])
    case failure(String)
}

func itemCount(for state: LoadState) -> Int {
    switch state {
    case .success(let items):
        return items.count
    default:
        return 0
    }
}`,
    notes: [
      'The enum makes legal alternatives explicit.',
      'Pattern matching keeps state handling readable and exhaustive.',
    ],
  },
  {
    id: 'ex-async',
    title: 'Structured Concurrency',
    description: [
      'Modern Swift encourages asynchronous workflows with `async` and `await` instead of only callback-driven control flow.',
    ],
    code: `func fetchUserName() async throws -> String {
    "Ava"
}

func greeting() async throws -> String {
    let name = try await fetchUserName()
    return "Hello, \\(name)."
}`,
    notes: [
      'This keeps asynchronous control flow readable.',
      "Structured concurrency is one of Swift's major modern strengths.",
    ],
  },
  {
    id: 'ex-actor',
    title: 'Actor For Isolated Mutable State',
    description: [
      'Actors provide a language-level tool for protecting mutable state in concurrent code.',
    ],
    code: `actor Counter {
    private var value = 0

    func increment() {
        value += 1
    }

    func currentValue() -> Int {
        value
    }
}`,
    notes: [
      'The actor isolates mutation behind concurrency-aware access.',
      'This is safer than ad hoc shared-state patterns in many cases.',
    ],
  },
  {
    id: 'ex-generic',
    title: 'Generic Reuse',
    description: [
      'Generics help Swift build reusable abstractions without giving up precise type relationships.',
    ],
    code: `func firstItem<T>(in items: [T]) -> T? {
    items.first
}

let firstNumber = firstItem(in: [10, 20, 30])
let firstWord = firstItem(in: ["alpha", "beta"])`,
    notes: [
      'One implementation works across many element types.',
      "The result stays aligned with Swift's static type system.",
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Optional',
        definition: 'A type that explicitly represents the presence or absence of a value.',
      },
      {
        term: 'Struct',
        definition:
          'A value type commonly used for data modeling, copied by value rather than shared by reference.',
      },
      {
        term: 'Class',
        definition:
          'A reference type that supports identity, shared mutable state, inheritance, and ARC-managed lifetime.',
      },
      {
        term: 'Protocol',
        definition: 'A contract describing capabilities or requirements that types can conform to.',
      },
      {
        term: 'Enum with associated values',
        definition:
          'A discriminated model that can represent several cases, each optionally carrying its own typed payload.',
      },
      {
        term: 'Value semantics',
        definition:
          'A model in which values behave like independent copies rather than shared references.',
      },
      {
        term: 'Reference semantics',
        definition:
          'A model in which multiple variables can refer to the same underlying object identity.',
      },
      {
        term: 'Guard',
        definition:
          'A control-flow construct commonly used for early exits when required conditions are not met.',
      },
    ],
  },
  {
    id: 'glossary-types',
    title: 'Type And Abstraction Terms',
    terms: [
      {
        term: 'Generic',
        definition: 'A reusable abstraction parameterized over one or more types.',
      },
      {
        term: 'Associated type',
        definition:
          'A placeholder type declared inside a protocol and specified by conforming types.',
      },
      {
        term: 'Protocol extension',
        definition:
          'A way to provide shared behavior or convenience methods for protocol-conforming types.',
      },
      {
        term: 'Result',
        definition:
          'A value that represents either success with a payload or failure with an error.',
      },
      {
        term: 'Throwing function',
        definition:
          "A function that can report failure through Swift's explicit error-handling model.",
      },
      {
        term: 'Opaque return type',
        definition:
          'A feature that hides the concrete return type while preserving static type information for the compiler.',
      },
      {
        term: 'Property wrapper',
        definition:
          'A language feature for attaching reusable storage and behavior patterns to properties.',
      },
      {
        term: 'Codable',
        definition:
          'A protocol-based serialization and deserialization system widely used for JSON and related data formats.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Ecosystem Terms',
    terms: [
      {
        term: 'ARC',
        definition:
          "Automatic Reference Counting, Swift's primary memory-management mechanism for reference types.",
      },
      {
        term: 'Retain cycle',
        definition:
          'A memory-management problem where objects keep each other alive through strong references.',
      },
      {
        term: 'Actor',
        definition: 'A concurrency construct that isolates mutable state behind serialized access.',
      },
      {
        term: 'Task',
        definition: "A unit of asynchronous work in Swift's structured concurrency model.",
      },
      {
        term: 'Swift Package Manager',
        definition: 'The package, dependency, and build system used widely in the Swift ecosystem.',
      },
      {
        term: 'SwiftUI',
        definition:
          "Apple's declarative UI framework that has strongly influenced modern Swift application design.",
      },
      {
        term: 'Objective-C interop',
        definition:
          'The ability for Swift code to interact with existing Objective-C APIs and mixed-language Apple codebases.',
      },
      {
        term: 'Vapor',
        definition:
          'A popular server-side Swift framework often used in non-UI Swift applications.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-swift', label: 'Why Swift Exists' },
    { id: 'bp-native-context', label: 'Native Context' },
    { id: 'bp-design-style', label: 'OO, Protocols, and Values' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-static-typing', label: 'Static Typing' },
    { id: 'core-optionals', label: 'Optionals' },
    { id: 'core-structs-classes', label: 'Structs vs Classes' },
    { id: 'core-protocols', label: 'Protocols' },
    { id: 'core-enums-patterns', label: 'Enums and Pattern Matching' },
    { id: 'core-generics', label: 'Generics' },
    { id: 'core-error-handling', label: 'Error Handling' },
    { id: 'core-memory-arc', label: 'Memory and ARC' },
    { id: 'core-concurrency', label: 'Structured Concurrency' },
    { id: 'core-extensions', label: 'Extensions' },
    { id: 'core-access-control', label: 'Modules and Access Control' },
    { id: 'core-interop', label: 'Objective-C Interop' },
    { id: 'core-ui-frameworks', label: 'UI Frameworks' },
    { id: 'core-server-cli', label: 'Server and CLI' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-when-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-struct', label: 'Struct' },
    { id: 'ex-optional', label: 'Optional Handling' },
    { id: 'ex-protocol', label: 'Protocol Design' },
    { id: 'ex-enum', label: 'Enum State Model' },
    { id: 'ex-async', label: 'Async Await' },
    { id: 'ex-actor', label: 'Actor' },
    { id: 'ex-generic', label: 'Generic Reuse' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-types', label: 'Type Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swift98-section">
      <h2 className="swift98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="swift98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swift98-section">
      <h2 className="swift98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="swift98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="swift98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swift98-section">
      <h2 className="swift98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="swift98-divider" />}
    </section>
  )
}

export default function SwiftPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Swift',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Swift"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Swift</h1>
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
