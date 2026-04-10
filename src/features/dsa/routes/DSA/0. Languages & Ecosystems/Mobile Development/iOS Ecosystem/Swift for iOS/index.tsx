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

const PAGE_TITLE = 'Swift for iOS'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Swift for iOS means using the Swift programming language as the primary implementation language for native iPhone and iPad applications, usually in combination with Apple frameworks such as Foundation, UIKit, SwiftUI, URLSession, Core Data, and the broader SDK surface shipped through Xcode and the iOS SDK.',
  'The useful mental model is that Swift is not itself an iOS UI framework. It is the language layer that shapes how teams model data, express business logic, handle errors, structure modules, write concurrency, interoperate with Apple frameworks, and move safely between high-level app code and lower-level platform APIs.',
  'This page focuses on Swift in the specific context of iOS engineering. It covers where Swift fits in the Apple stack, the language features that matter most in app development, interoperability with older Objective-C code, memory and concurrency behavior, architecture and testing concerns, practical examples, and the vocabulary that appears repeatedly in production iOS work.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      "Swift is Apple's modern programming language for application and framework development across Apple platforms. On iOS, it is the default language for most new native work because it combines strong type safety, expressive syntax, value semantics where useful, protocol-oriented design, automatic memory management, and first-party support across Apple's tooling and documentation.",
      'That does not mean Swift replaces the rest of the stack. It sits underneath UI frameworks such as UIKit and SwiftUI, above the runtime and system libraries, and alongside package management, testing, profiling, signing, and deployment workflows in Xcode. In practice, "Swift for iOS" is a language-plus-toolchain topic, not only a syntax topic.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Swift Matters on iOS',
    paragraphs: [
      'Swift matters because it is the main path for modern native iOS development. Most first-party Apple samples, current tutorials, and new framework features assume Swift first. Teams building or maintaining serious iOS products therefore need more than superficial syntax familiarity; they need to understand how Swift changes modeling, safety, concurrency, architecture, and framework usage.',
      'It also matters because Swift changes failure modes. Nullability, unchecked casts, loose shared state, and weakly modeled domain logic are easier to let slide in less strict codebases. Swift pushes teams toward explicit types, optional handling, structured errors, and clearer API design, which can substantially improve maintainability when used well.',
    ],
    bullets: [
      'It is the default language for most new native iOS code.',
      'Apple framework samples and tooling are optimized for Swift workflows.',
      'Its type system and optionals reduce large classes of avoidable bugs.',
      'Modern concurrency and package workflows are built around Swift-first tooling.',
    ],
  },
  {
    id: 'bp-language-vs-platform',
    title: 'Language vs Platform',
    paragraphs: [
      'A common confusion is mixing up Swift the language with iOS the platform APIs. Swift provides syntax, types, generics, protocols, enums, optionals, memory rules, and concurrency constructs. iOS frameworks provide screens, networking, persistence, notifications, location, sensors, rendering, and user-interface objects. Strong iOS engineers understand both layers and the boundary between them.',
      'That distinction matters architecturally. A team can write clean Swift code and still misuse UIKit, or it can understand SwiftUI conceptually but model data poorly in Swift. The language improves clarity, but it does not remove the need to design APIs, state ownership, screen coordination, and lifecycle behavior carefully.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Primary Strengths',
    paragraphs: [
      'Swift is especially strong when a codebase benefits from explicit domain modeling, predictable API surfaces, protocol-oriented abstractions, and readable asynchronous code. It also supports performance-sensitive work well because value types, copy-on-write collections, static dispatch opportunities, and predictable ownership rules can be combined with lower-level control when needed.',
      'For iOS teams, the practical strength is that Swift scales from very small view models to large modular applications. The same language can express app startup, feature flags, networking, business rules, UI state, tests, packages, and build-tool integrations without forcing teams into several incompatible language ecosystems.',
    ],
    bullets: [
      'Clear type-driven modeling.',
      'Strong support for Apple-platform frameworks.',
      'Modern async code with async and await.',
      'Good balance of safety, readability, and performance.',
    ],
  },
  {
    id: 'bp-tradeoffs',
    title: 'Tradeoffs and Friction Points',
    paragraphs: [
      'Swift is not friction-free. Compile times can become painful in heavily generic or overly abstracted code. Type inference can produce confusing diagnostics when code becomes too clever. Bridging between Swift value semantics and Objective-C reference-oriented APIs can still create awkward edges. The language also has a fast-moving feature surface, which means teams need discipline around version targets and style choices.',
      'Another tradeoff is that Swift can encourage abstraction that is more elegant than useful. Protocol-heavy designs, generic wrappers, and indirection layers often look sophisticated but make debugging harder if they are not anchored to concrete product needs. The best Swift codebases are explicit and boring in the right places.',
    ],
    bullets: [
      'Compiler diagnostics can degrade in over-abstracted code.',
      'Bridging to legacy Objective-C APIs still matters in many apps.',
      'Language feature growth requires version-awareness and team discipline.',
      'Elegant abstractions are not automatically maintainable abstractions.',
    ],
  },
  {
    id: 'bp-typical-workflow',
    title: 'Typical Workflow on an iOS Team',
    paragraphs: [
      'A normal Swift-for-iOS workflow involves modeling domain entities, writing feature logic in Swift types, binding those types into UIKit or SwiftUI screens, using async APIs for network and storage work, organizing reusable code into modules or packages, and validating behavior with unit tests, UI tests, simulator runs, device testing, and profiling tools.',
      'The language touches every layer of that workflow. It influences how data is decoded, how dependency injection is expressed, how navigation state is modeled, how asynchronous work is cancelled, how feature flags are represented, how error surfaces are made user-safe, and how performance regressions are investigated.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Swift for iOS is best understood as the language foundation of modern native Apple app development. It is the medium through which teams express domain models, architecture, concurrency, and framework usage, not just the syntax used to declare a button handler.',
      'Teams get the most value from Swift when they use it to make ownership, failure, data shape, and asynchronous intent explicit. The language is strongest when it clarifies architecture instead of being treated as a place to showcase cleverness.',
    ],
    bullets: [
      'Swift is the default language layer for modern iOS work.',
      'Strong iOS engineering depends on both Swift knowledge and platform knowledge.',
      'Explicit modeling and ownership are more valuable than fancy syntax.',
      'The language helps most when it makes the codebase easier to reason about.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-role',
    title: 'What Swift Actually Contributes on iOS',
    paragraphs: [
      'Swift contributes the programming model. It defines how data is typed, how APIs are declared, how failure is handled, how asynchronous work is expressed, how ownership is represented, and how modules communicate. In an iOS app, that means nearly every user-visible feature is shaped by Swift decisions before UIKit or SwiftUI ever render anything.',
      'This is why language decisions matter architecturally. Optionals, enums with associated values, protocol conformance, actor isolation, access control, and generic constraints all influence whether a feature becomes easy or painful to evolve.',
    ],
  },
  {
    id: 'core-types-optionals',
    title: 'Types, Optionals, and Explicit Modeling',
    paragraphs: [
      'Swift encourages teams to model the domain precisely. Instead of representing everything as loose dictionaries or stringly typed blobs, developers can create structs, enums, and protocols that encode valid states directly in the type system. This usually improves correctness and makes call sites easier to understand.',
      'Optionals are a major part of that discipline. An optional is not a nuisance to silence; it is a signal that absence is part of the real model. iOS code gets safer when optionals are handled deliberately with guards, early returns, defaulting only when justified, and API surfaces that distinguish required data from truly absent data.',
    ],
    bullets: [
      'Use structs and enums to model domain state explicitly.',
      'Treat optionals as part of the design, not as compiler noise.',
      'Avoid Any, weakly typed dictionaries, and implicit assumptions unless unavoidable.',
      'Prefer APIs that make invalid states hard to represent.',
    ],
  },
  {
    id: 'core-value-reference',
    title: 'Value Types, Reference Types, and Ownership',
    paragraphs: [
      'Swift makes a strong distinction between value types such as structs and enums, and reference types such as classes. This distinction matters on iOS because it affects copying behavior, mutation patterns, thread safety, lifecycle management, and the mental model for shared state.',
      'Value types are usually a good fit for immutable or locally mutated domain data, request and response models, configuration values, and view state snapshots. Reference types are often useful for shared mutable coordination objects such as caches, stores, controllers, services with lifecycle, or objects that integrate with frameworks expecting identity and mutation over time.',
    ],
    bullets: [
      'Choose structs when identity is not part of the model.',
      'Choose classes when shared mutable identity is necessary.',
      'Be explicit about where mutation is allowed to happen.',
      'Ownership problems usually show up as architecture problems later.',
    ],
  },
  {
    id: 'core-protocols-generics',
    title: 'Protocols, Generics, and API Design',
    paragraphs: [
      'Protocols let Swift code describe capabilities rather than inheritance-only hierarchies. Generics let those capabilities stay type-safe without erasing every concrete detail. On iOS teams, this is useful for dependency injection, reusable helpers, decoding layers, storage abstractions, and feature modules that need clear contracts.',
      'The risk is overuse. Not every type needs a protocol, and not every helper needs three levels of generic abstraction. Good Swift API design prefers simple concrete types first, then introduces protocols or generics when there is a real substitution or reuse need.',
    ],
    bullets: [
      'Protocols are useful when multiple concrete implementations are real and meaningful.',
      'Generics preserve type information without sacrificing reuse.',
      'Prefer concrete implementations until abstraction earns its keep.',
      'Over-abstraction can hurt compile times and readability.',
    ],
  },
  {
    id: 'core-memory-arc',
    title: 'Memory Management and ARC',
    paragraphs: [
      'Swift uses Automatic Reference Counting for reference types. On iOS, this matters constantly because closures, delegates, coordinators, view models, and asynchronous tasks often create reference graphs that can leak if ownership is unclear. ARC reduces manual memory work, but it does not eliminate lifecycle mistakes.',
      'The practical engineering job is to understand strong, weak, and unowned references; know when closures capture self; and design ownership so that objects live exactly as long as the feature needs them to. Retain cycles are usually a symptom of unclear architecture more than they are a syntax problem.',
    ],
    bullets: [
      'ARC manages reference counts but does not prevent poor ownership design.',
      'Closures can capture self and accidentally extend object lifetime.',
      'Weak delegates and deliberate ownership boundaries still matter.',
      'Use Instruments and Xcode memory tools when lifetime is unclear.',
    ],
  },
  {
    id: 'core-error-handling',
    title: 'Error Handling, Results, and Failure Surfaces',
    paragraphs: [
      'Swift makes recoverable failure explicit through throws, do and catch, and Result where appropriate. This is especially important on iOS because app logic constantly interacts with unreliable systems such as networks, storage, permissions, background execution limits, and user-provided data.',
      'Strong error handling is not only about catching exceptions. It is about distinguishing developer bugs from user-facing failures, mapping technical errors into sensible product behavior, and ensuring asynchronous code reports failure in ways the UI can consume without becoming coupled to transport details.',
    ],
    bullets: [
      'Use throws for recoverable failures that callers should handle.',
      'Reserve fatal termination patterns for truly impossible states.',
      'Translate low-level errors into domain or presentation-friendly errors.',
      'Do not hide failures behind silent defaults unless the product really calls for it.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Structured Concurrency on iOS',
    paragraphs: [
      'Modern Swift concurrency uses async, await, tasks, task groups, actors, and main-actor isolation to express asynchronous work more directly than older callback-heavy styles. On iOS, this affects network requests, data refreshes, image loading, permissions, background work coordination, and UI updates after asynchronous operations complete.',
      'The most important rule is ownership. Async work should be tied to the object, task, or screen lifetime that owns it. Without that discipline, teams create duplicate requests, race conditions, stale UI updates, or work that keeps running after the feature is gone. Structured concurrency helps, but it still requires architectural care.',
    ],
    bullets: [
      'Use async APIs to keep control flow readable.',
      'Keep UI updates on the main actor when required.',
      'Cancel work that is no longer relevant to the screen or request.',
      'Do not confuse concurrent capability with permission to share mutable state casually.',
    ],
  },
  {
    id: 'core-modules-packages',
    title: 'Modules, Frameworks, and Swift Package Manager',
    paragraphs: [
      'Swift code on iOS usually lives across app targets, framework targets, test bundles, and increasingly Swift packages. This modular structure matters because it determines build boundaries, dependency direction, test visibility, and how reusable domain code is shared across features or apps.',
      'Swift Package Manager is now a standard way to consume and publish reusable Swift modules. On iOS teams, packages are valuable when they enforce clean dependency edges or share code across multiple apps, but blindly slicing everything into micro-packages can also slow teams down if the boundaries are artificial.',
    ],
    bullets: [
      'Module boundaries should reflect real dependency and ownership boundaries.',
      'Packages are useful when reuse or layering is genuine.',
      'Keep dependency direction intentional to avoid tangled app architecture.',
      'Use access control to make API surfaces explicit.',
    ],
  },
  {
    id: 'core-interop',
    title: 'Interoperability with Objective-C and C APIs',
    paragraphs: [
      'Many iOS codebases still contain Objective-C, older Apple APIs with Objective-C roots, or C-level system libraries. Swift is designed to interoperate with those layers, but the bridge is not perfect. Nullability, naming translation, dynamic dispatch expectations, runtime metadata, and Objective-C features such as selectors or KVC can all affect Swift design.',
      'In real projects, interoperability is not optional. Teams often need to call older SDKs, expose Swift to Objective-C, wrap legacy modules, or bridge data types across language boundaries. Strong Swift-for-iOS work includes knowing where the bridge is smooth and where wrappers or boundary objects are safer.',
    ],
    bullets: [
      'Legacy Objective-C code remains common in long-lived iOS apps.',
      'Bridging can change naming, mutability expectations, and nullability handling.',
      'Use boundary wrappers when direct exposure would leak legacy awkwardness everywhere.',
      'Interop design is an architectural concern, not only a compiler concern.',
    ],
  },
  {
    id: 'core-ui-integration',
    title: 'Working with UIKit and SwiftUI',
    paragraphs: [
      'Swift is the implementation language for both UIKit-based and SwiftUI-based applications. In UIKit code, Swift often appears in controllers, views, view models, coordinators, services, and delegate implementations. In SwiftUI code, Swift shapes state models, observable types, environment dependencies, and concurrency work that drives the declarative layer.',
      'The framework may change, but the language concerns stay similar: clear modeling, predictable ownership, explicit failure handling, and maintainable boundaries between feature logic and rendering code. That is why Swift literacy transfers across UI paradigms even when the view layer changes.',
    ],
  },
  {
    id: 'core-architecture-testing',
    title: 'Architecture, Testing, and Maintainability',
    paragraphs: [
      'Swift does not force a single architecture, but it strongly affects how architecture is expressed. MVVM, coordinators, feature modules, reducer-style state stores, repository layers, and use-case objects can all be implemented cleanly in Swift if the code favors explicit contracts and restrained abstraction.',
      'Testing also benefits from that explicitness. Pure value models, deterministic helper types, protocol-based seams where they are justified, and explicit async boundaries make unit tests easier to write. Teams get into trouble when business logic is hidden inside UIKit callbacks, view bodies, or giant service singletons with too much hidden state.',
    ],
    bullets: [
      'Keep domain logic testable outside the screen layer.',
      'Use small, explicit types instead of giant multi-purpose managers.',
      'Prefer deterministic value transformations where possible.',
      'Architecture should reduce ambiguity about where state lives and who changes it.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, Diagnostics, and Practical Discipline',
    paragraphs: [
      'Swift can produce very fast code, but performance comes from measurement and data-shape awareness, not from assuming the language will optimize every decision away. Large copies of value types, excessive bridging, repeated decoding, poorly chosen collection operations, and needless abstraction layers can all hurt runtime or build performance.',
      'The same is true for diagnostics. Xcode and Instruments can profile CPU, memory, allocations, hangs, and concurrency behavior, but the language model still matters. Teams that understand ownership, mutation, and data flow usually debug performance faster because the code already communicates what should be happening.',
    ],
    bullets: [
      'Measure before optimizing and optimize where evidence exists.',
      'Watch both runtime performance and compile-time health.',
      'Use Instruments, logs, and profiling tools with language-level reasoning.',
      'Simple data flow is usually easier to optimize than clever indirection.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-modeling',
    title: 'Model API Data with Codable',
    description: [
      'Swift makes it straightforward to model API payloads as explicit value types. This is usually safer and more maintainable than passing dictionaries through the app because the compiler can enforce field types and optionality.',
      'The example below shows a small domain model that decodes JSON into a predictable shape suitable for feature logic or UI state mapping.',
    ],
    code: `import Foundation

struct Article: Decodable, Identifiable {
    let id: Int
    let title: String
    let summary: String?
    let publishedAt: Date

    private enum CodingKeys: String, CodingKey {
        case id
        case title
        case summary
        case publishedAt = "published_at"
    }
}`,
    notes: [
      'Use value types for transport and domain models unless shared identity is required.',
      'Optional properties should reflect genuinely optional server data, not uncertainty in local design.',
      'Keep decoding models explicit so invalid payload changes fail loudly during development.',
    ],
  },
  {
    id: 'examples-async-networking',
    title: 'Async Network Request with URLSession',
    description: [
      'Modern Swift concurrency makes network code much easier to read than nested completion-handler chains. The call site can await the result and handle success or failure in ordinary control flow.',
      'This pattern is common in iOS services, repositories, or feature-specific clients.',
    ],
    code: `import Foundation

struct ArticleService {
    func fetchArticles() async throws -> [Article] {
        let url = URL(string: "https://example.com/articles")!
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse, 200..<300 ~= http.statusCode else {
            throw URLError(.badServerResponse)
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return try decoder.decode([Article].self, from: data)
    }
}`,
    notes: [
      'Keep transport validation explicit before decoding.',
      'Push network details down into service layers rather than into view controllers or views.',
      'Async APIs improve readability, but cancellation and ownership still need design attention.',
    ],
  },
  {
    id: 'examples-uikit',
    title: 'UIKit Screen Written in Swift',
    description: [
      'Swift is the normal implementation language for UIKit screens in modern codebases. A controller remains a UIKit object, but the modeling, access control, optionals, and closure usage all come from Swift.',
      'This example keeps responsibilities narrow: the controller manages the screen and delegates data loading to a service.',
    ],
    code: `import UIKit

final class ArticlesViewController: UITableViewController {
    private let service = ArticleService()
    private var articles: [Article] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Articles"
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "Cell")

        Task { [weak self] in
            guard let self else { return }
            self.articles = try await service.fetchArticles()
            self.tableView.reloadData()
        }
    }
}`,
    notes: [
      'UIKit provides the controller lifecycle; Swift provides the modeling and async expression.',
      'Be deliberate about capture semantics when starting tasks from reference-type objects.',
      'In production code, route failures to a user-appropriate state instead of ignoring them.',
    ],
  },
  {
    id: 'examples-protocols',
    title: 'Protocol Boundary for Testable Dependencies',
    description: [
      'Protocols are useful when there is a real boundary between a feature and an interchangeable dependency, such as a live API client and a test double. The goal is better testability and clearer ownership, not abstraction for its own sake.',
      'This pattern appears frequently in view models, coordinators, feature services, and domain use-case layers.',
    ],
    code: `import Foundation

protocol ArticleFetching {
    func fetchArticles() async throws -> [Article]
}

struct LiveArticleService: ArticleFetching {
    func fetchArticles() async throws -> [Article] {
        try await ArticleService().fetchArticles()
    }
}

struct ArticleListViewModel {
    private let service: ArticleFetching

    init(service: ArticleFetching) {
        self.service = service
    }
}`,
    notes: [
      'Introduce a protocol when substitution is real and valuable.',
      'Keep the protocol small and feature-specific rather than creating god-protocols.',
      'Tests usually become simpler when dependencies are explicit at initialization time.',
    ],
  },
  {
    id: 'examples-actor',
    title: 'Actor for Shared Mutable State',
    description: [
      'When multiple tasks need coordinated mutable access, an actor can provide a safer boundary than ad hoc locking or unrestricted shared state. Actors are especially useful for caches, stores, and coordination objects accessed from concurrent work.',
      'The actor is not magic; it still needs a sensible API. The key benefit is that mutation happens behind an isolated interface.',
    ],
    code: `actor ImageCache {
    private var storage: [URL: Data] = [:]

    func data(for url: URL) -> Data? {
        storage[url]
    }

    func insert(_ data: Data, for url: URL) {
        storage[url] = data
    }
}`,
    notes: [
      'Actors are useful when shared mutable state is unavoidable.',
      'Prefer isolated APIs over leaking raw shared collections everywhere.',
      'Concurrency features still require careful lifecycle and memory design around them.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Foundations',
    terms: [
      {
        term: 'Optional',
        definition:
          'A type that represents either a wrapped value or the absence of a value, forcing code to acknowledge uncertainty explicitly.',
      },
      {
        term: 'Struct',
        definition:
          'A value type commonly used in Swift for domain models, configuration objects, and state snapshots where shared identity is unnecessary.',
      },
      {
        term: 'Class',
        definition:
          'A reference type used when identity, shared mutable state, inheritance, or framework integration requires object semantics.',
      },
      {
        term: 'Enum',
        definition:
          'A type that represents one of a fixed set of cases, often used to model UI state, domain state, or finite workflows precisely.',
      },
      {
        term: 'Protocol',
        definition:
          'A declaration of required capabilities that lets multiple types conform to a shared contract without forcing a single inheritance tree.',
      },
      {
        term: 'Generic',
        definition:
          'A type or function parameterized over other types so code can be reused without erasing type information.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime and Memory Terms',
    terms: [
      {
        term: 'ARC',
        definition:
          'Automatic Reference Counting, the memory-management system used for Swift reference types.',
      },
      {
        term: 'Strong reference',
        definition:
          'A reference that keeps an object alive and contributes to its reference count.',
      },
      {
        term: 'Weak reference',
        definition:
          'A non-owning reference that becomes nil when the referenced object is deallocated, often used to avoid retain cycles.',
      },
      {
        term: 'Retain cycle',
        definition:
          'A memory leak pattern in which objects keep one another alive through strong references and never reach deallocation.',
      },
      {
        term: 'Value semantics',
        definition:
          'Behavior where a value is treated as its own independent data rather than as a shared object identity.',
      },
      {
        term: 'Actor',
        definition:
          'A Swift concurrency type that protects mutable state behind an isolated asynchronous boundary.',
      },
    ],
  },
  {
    id: 'glossary-ios',
    title: 'iOS Development Terms',
    terms: [
      {
        term: 'Foundation',
        definition:
          "Apple's core framework for fundamental data types, collections, dates, URLs, networking primitives, and many non-UI app concerns.",
      },
      {
        term: 'UIKit',
        definition:
          "Apple's imperative iOS user-interface framework built around views, view controllers, navigation containers, and lifecycle callbacks.",
      },
      {
        term: 'SwiftUI',
        definition:
          "Apple's declarative UI framework where interface output is described as a function of current state.",
      },
      {
        term: 'Swift Package Manager',
        definition:
          'The Swift-native package and dependency-management system used to define and integrate reusable modules.',
      },
      {
        term: 'Main actor',
        definition:
          'The concurrency isolation domain associated with UI-affecting work that must run on the main thread.',
      },
      {
        term: 'Codable',
        definition:
          'A protocol-based Swift system for encoding and decoding structured data such as JSON into typed models.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  'core-concepts': coreConceptSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  examples: exampleSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  glossary: glossarySections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swift-ios-help98-section">
      <h2 className="swift-ios-help98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {!isLast ? <hr className="swift-ios-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swift-ios-help98-section">
      <h2 className="swift-ios-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="swift-ios-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="swift-ios-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="swift-ios-help98-section">
      <h2 className="swift-ios-help98-heading">{section.title}</h2>
      <dl className="swift-ios-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="swift-ios-help98-divider" /> : null}
    </section>
  )
}

export default function SwiftForIosPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Swift For Ios Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Swift For Ios Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{PAGE_TITLE}</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <hr className="bin98-divider" />

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
