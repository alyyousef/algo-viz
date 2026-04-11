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
  'Kotlin and Swift are often compared because both are modern, strongly typed languages designed to improve developer productivity and safety relative to their older platform predecessors. Both support null-safety-oriented thinking, expressive syntax, strong tooling, and modern application development patterns. The practical difference is less about raw language quality and more about which ecosystem and product surface the software needs to serve.',
  'Kotlin is closely aligned with Android development and the broader JVM ecosystem. Swift is closely aligned with Apple platform development. That means the most important differences often come from platform expectations, runtime environment, tooling, UI frameworks, and deployment targets rather than from syntax alone.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Kotlin is a language that sits naturally in Android and JVM development. It brings modern language design to ecosystems that historically relied heavily on Java. It is concise, pragmatic, interoperable with existing JVM code, and widely used for Android application development as well as backend and multiplatform work.',
      'Swift is a language built by Apple to modernize development across its platforms. It is designed for performance, safety, and a strong native developer experience within the Apple ecosystem. It is most closely associated with iOS, but it also spans macOS, watchOS, tvOS, and broader Apple platform work.',
    ],
  },
  {
    id: 'bp-shared-strengths',
    title: 'What They Share',
    paragraphs: [
      'Both languages are modern, expressive, and designed to replace older, more error-prone workflows. Both improve on earlier platform defaults by reducing boilerplate, improving type safety, and giving developers more ergonomic syntax for collections, asynchronous work, and data modeling.',
      'Both also benefit from being first-class platform languages rather than second-class add-ons. They are not experiments on the side. They are central to how their ecosystems now expect developers to build modern native applications.',
    ],
    bullets: [
      'Modern syntax with strong type systems.',
      'Reduced boilerplate compared to older platform defaults.',
      'Good support for expressive data models and safer APIs.',
      'Deep alignment with native platform development workflows.',
    ],
  },
  {
    id: 'bp-when-kotlin-fits',
    title: 'When Kotlin Is Usually the Better Fit',
    paragraphs: [
      'Kotlin is usually the better fit when the product lives in the Android ecosystem or when interoperability with JVM libraries, Java code, and broader JVM infrastructure matters. It is especially attractive for teams that want a modern language without leaving the huge JVM tool and library landscape.',
      'It is also attractive for teams that value flexibility across Android, backend services, and shared business logic scenarios. Kotlin often feels like a pragmatic language choice for organizations already invested in JVM-based development.',
    ],
    bullets: [
      'Android-first product development.',
      'Strong need for Java or JVM interoperability.',
      'Teams building mobile and backend systems in adjacent stacks.',
      'Organizations that want modern language ergonomics with JVM leverage.',
    ],
  },
  {
    id: 'bp-when-swift-fits',
    title: 'When Swift Is Usually the Better Fit',
    paragraphs: [
      'Swift is usually the better fit when the product is deeply tied to Apple devices and the Apple user experience. It is especially strong when platform polish, native Apple integration, and first-class support for Apple frameworks are central to the app.',
      'It is also attractive for teams building across several Apple platforms, because Swift provides one coherent language for iPhone, iPad, Mac, Watch, and TV development within the same ecosystem.',
    ],
    bullets: [
      'iOS and broader Apple-platform application development.',
      'Products where Apple-native UX and platform alignment are central.',
      'Teams invested in the Apple SDK and toolchain stack.',
      'Apps that depend on Apple platform-specific capabilities and conventions.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'In practice, most teams do not choose Kotlin or Swift in the abstract. They choose Android or Apple platform development, and the language follows from that decision. The comparison becomes interesting when teams want to understand relative ergonomics, architecture patterns, and what native platform investment actually means.',
    ],
    bullets: [
      'Choose Kotlin for Android and JVM-aligned development.',
      'Choose Swift for Apple-platform-native development.',
      'Treat platform fit as the main decision and language fit as the consequence.',
      'Compare ecosystems, tooling, and product goals more than syntax alone.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-language-design',
    title: 'Language Design and Philosophy',
    paragraphs: [
      'Kotlin is highly pragmatic. It was designed to improve developer productivity while remaining deeply interoperable with Java and the JVM. That pragmatism shows up in features like null safety, concise data classes, extension functions, and a relatively smooth migration path from older codebases.',
      'Swift is also modern and safety-oriented, but it is more tightly tied to Appleâ€™s platform vision. It is expressive, often elegant, and designed to feel native in Appleâ€™s frameworks and tooling. The language evolution is closely aligned with the needs of the Apple ecosystem.',
    ],
  },
  {
    id: 'core-platform-alignment',
    title: 'Platform Alignment',
    paragraphs: [
      'Kotlinâ€™s center of gravity is Android plus the JVM world. Even when it is used beyond Android, its design and ecosystem leverage are strongly shaped by its relationship to Java, JVM tooling, and Android app development.',
      'Swiftâ€™s center of gravity is the Apple platform family. It is the natural language for building native applications that feel deeply integrated with Apple hardware, system services, and UI conventions.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Experience',
    paragraphs: [
      'Kotlin development typically flows through Android Studio or IntelliJ-based workflows. The tooling is powerful and mature, especially in Android projects and JVM-heavy environments. Interoperability with Java codebases is a major practical advantage.',
      'Swift development is strongly centered around Xcode and Appleâ€™s SDK stack. The workflow is highly integrated with Apple platform development, which can feel cohesive and efficient when the team is fully inside that ecosystem.',
    ],
  },
  {
    id: 'core-ui-stack',
    title: 'UI Stack and Native Frameworks',
    paragraphs: [
      'Kotlin is associated with Android UI development through Jetpack Compose and the traditional Android view system. Its UI story is strongly influenced by Android architecture components, lifecycle concerns, and the realities of a broader device matrix.',
      'Swift is associated with SwiftUI and UIKit. The Apple platform emphasis on animation, layout polish, accessibility behavior, and consistent platform expectations shapes how Swift developers think about native UI construction.',
    ],
  },
  {
    id: 'core-interoperability',
    title: 'Interoperability and Legacy Leverage',
    paragraphs: [
      'Kotlinâ€™s interoperability story is a major strategic strength. It can work alongside Java cleanly, which makes it highly practical in mature Android and enterprise environments where a greenfield rewrite is unrealistic.',
      'Swift can interoperate with older Apple ecosystem code as well, but its broader strategic value comes more from leading modern Apple development than from participating in a large cross-platform runtime like the JVM.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-null-safety',
    title: 'Safety Features and Null Handling',
    paragraphs: [
      'Both languages are known for safer null handling compared to older platform defaults. Kotlin makes nullability explicit in the type system and distinguishes nullable from non-nullable references directly.',
      'Swift also uses optionals to model absence explicitly. In both languages, this pushes developers to handle missing values more deliberately and reduces entire classes of common runtime errors.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency and Asynchronous Programming',
    paragraphs: [
      'Kotlin supports modern asynchronous patterns through coroutines, which are widely appreciated for making concurrent code more readable and structured in Android and backend contexts.',
      'Swift supports modern concurrency through async and await, tasks, and actor-oriented patterns within the Apple development model. The concurrency story in both ecosystems is strong, but each is shaped by different platform runtimes and framework expectations.',
    ],
  },
  {
    id: 'core-performance-runtime',
    title: 'Runtime and Performance Considerations',
    paragraphs: [
      'Kotlin on Android typically lives within the Android runtime environment and inherits many of the practical characteristics of the Android platform and device landscape. Performance work often includes thinking about device diversity, lifecycle management, and compatibility across hardware tiers.',
      'Swift runs in the Apple ecosystem where hardware and OS combinations are far more constrained. This can make performance tuning more predictable, though the more important point is that the product and platform surface are different rather than one language being universally faster in all practical work.',
    ],
  },
  {
    id: 'core-product-strategy',
    title: 'Product and Team Strategy',
    paragraphs: [
      'Kotlin is often chosen by teams that want to align mobile work with JVM-heavy backend or shared engineering practices. It can be a strong strategic fit when Android is important and the wider organization already thinks in JVM terms.',
      'Swift is often chosen by teams deeply invested in Apple platform quality, native Apple user experience, and the coherence of building inside one vendor-controlled ecosystem. The strongest argument for Swift is often platform excellence rather than general-purpose cross-ecosystem reuse.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Kotlin often wins on JVM leverage, Java interoperability, and strategic flexibility across Android and other JVM-adjacent contexts. Swift often wins on Apple-platform alignment, native polish, and the coherence of Appleâ€™s integrated development model.',
      'The mistake is to treat either language as universally superior in isolation. In real teams, the decision is usually downstream of platform strategy, app audience, design requirements, QA reality, and how much the organization values native integration over cross-ecosystem flexibility.',
    ],
    bullets: [
      'Choose Kotlin for Android and JVM leverage.',
      'Choose Swift for Apple-native depth and ecosystem coherence.',
      'Compare platform fit before language elegance.',
      'Treat team context as part of the technical decision.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the product must be first-class on both Android and Apple platforms, the right architecture discussion is usually about shared business logic, shared services, and where native UX should remain native. Kotlin and Swift can coexist effectively when the team is clear about what should be shared and what should remain platform-specific.',
      'If the product targets only one native ecosystem, then the platform-native language is usually the most pragmatic and lowest-friction choice. Architecture decisions become simpler when the language and platform conventions point in the same direction.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-data-model',
    title: 'Data-Carrying Types',
    description: [
      'Both languages reduce boilerplate for simple immutable or data-oriented models, though the syntax differs.',
    ],
    code: `// Kotlin
data class User(val id: String, val name: String)

// Swift
struct User {
    let id: String
    let name: String
}`,
    notes: [
      'Both languages make data modeling cleaner than their older platform predecessors.',
      'The style difference is smaller than the ecosystem difference around the code.',
    ],
  },
  {
    id: 'examples-nullability',
    title: 'Null and Optional Handling',
    description: [
      'Both ecosystems make missing values a first-class language concern rather than an afterthought.',
    ],
    code: `// Kotlin
val name: String? = findName()

// Swift
let name: String? = findName()`,
    notes: [
      'This explicitness is one of the major quality-of-life improvements in both languages.',
      'It pushes developers toward safer API contracts and fewer accidental null bugs.',
    ],
  },
  {
    id: 'examples-async',
    title: 'Asynchronous Style',
    description: [
      'Both languages support modern async development, but each does so inside the conventions of its native platform.',
    ],
    code: `// Kotlin
suspend fun loadUser(): User

// Swift
func loadUser() async throws -> User`,
    notes: [
      'The syntax expresses similar goals with different runtime and platform expectations behind it.',
      'The more important distinction is the surrounding ecosystem, not the keyword choice.',
    ],
  },
  {
    id: 'examples-platform-fit',
    title: 'Platform Fit in Practice',
    description: ['The language decision is usually a platform decision expressed through syntax.'],
    code: `Kotlin choice:
Android app
JVM interoperability
Jetpack or Compose workflows

Swift choice:
iPhone or Apple platform app
Apple SDK integration
SwiftUI or UIKit workflows`,
    notes: [
      'This is usually the real framing in production work.',
      'Language comparison is useful, but platform alignment is usually decisive.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-kotlin',
    title: 'Kotlin Terms',
    terms: [
      {
        term: 'Data Class',
        definition:
          'A concise Kotlin construct for data-oriented types with generated utility behavior.',
      },
      {
        term: 'Coroutine',
        definition:
          'A Kotlin abstraction for asynchronous and concurrent programming with structured control flow.',
      },
      {
        term: 'Nullable Type',
        definition: 'A Kotlin type explicitly marked as capable of holding a null value.',
      },
      {
        term: 'JVM Interoperability',
        definition:
          'The ability for Kotlin to work naturally with existing Java and JVM-based code.',
      },
    ],
  },
  {
    id: 'glossary-swift',
    title: 'Swift Terms',
    terms: [
      {
        term: 'Optional',
        definition: 'A Swift type that explicitly represents the presence or absence of a value.',
      },
      {
        term: 'Struct',
        definition: 'A Swift value type commonly used for lightweight models and state containers.',
      },
      {
        term: 'SwiftUI',
        definition:
          'Appleâ€™s declarative UI framework for modern app development across its platforms.',
      },
      {
        term: 'Async and Await',
        definition:
          'Swift language support for asynchronous programming with readable sequential syntax.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Mobile Language Terms',
    terms: [
      {
        term: 'Native Development',
        definition:
          'Building an application using the primary SDKs, runtime, and language of the target platform.',
      },
      {
        term: 'Type Safety',
        definition:
          'The extent to which a language and compiler prevent invalid operations through its type system.',
      },
      {
        term: 'Platform Alignment',
        definition:
          'How naturally a language, framework, and toolchain fit the expectations of a specific operating system ecosystem.',
      },
      {
        term: 'Interop',
        definition:
          'The ability of one language or runtime to work with code written in another language or older platform stack.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-strengths', label: 'Shared Strengths' },
    { id: 'bp-when-kotlin-fits', label: 'When Kotlin Fits' },
    { id: 'bp-when-swift-fits', label: 'When Swift Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-language-design', label: 'Language Design and Philosophy' },
    { id: 'core-platform-alignment', label: 'Platform Alignment' },
    { id: 'core-tooling', label: 'Tooling and Developer Experience' },
    { id: 'core-ui-stack', label: 'UI Stack and Native Frameworks' },
    { id: 'core-interoperability', label: 'Interoperability and Legacy Leverage' },
    { id: 'core-null-safety', label: 'Safety Features and Null Handling' },
    { id: 'core-concurrency', label: 'Concurrency and Async Programming' },
    { id: 'core-performance-runtime', label: 'Runtime and Performance' },
    { id: 'core-product-strategy', label: 'Product and Team Strategy' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-data-model', label: 'Data-Carrying Types' },
    { id: 'examples-nullability', label: 'Null and Optional Handling' },
    { id: 'examples-async', label: 'Asynchronous Style' },
    { id: 'examples-platform-fit', label: 'Platform Fit in Practice' },
  ],
  glossary: [
    { id: 'glossary-kotlin', label: 'Kotlin Terms' },
    { id: 'glossary-swift', label: 'Swift Terms' },
    { id: 'glossary-shared', label: 'Shared Mobile Language Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin-swift-help-section">
      <h2 className="kotlin-swift-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="kotlin-swift-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin-swift-help-section">
      <h2 className="kotlin-swift-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="kotlin-swift-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="kotlin-swift-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kotlin-swift-help-section">
      <h2 className="kotlin-swift-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="kotlin-swift-help-divider" />}
    </section>
  )
}

export default function KotlinVsSwiftPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Kotlin vs Swift',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Kotlin vs Swift"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Kotlin vs Swift</h1>
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
    </TopicPageShell>
  )
}
