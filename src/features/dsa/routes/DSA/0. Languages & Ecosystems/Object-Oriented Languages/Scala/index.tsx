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
  'Scala is a JVM language designed to combine object-oriented and functional programming in one coherent system. It aims to be expressive, highly typed, concise, and scalable from small scripts to large distributed systems. The important point is that Scala is not merely Java with less boilerplate. It is a language with its own model of abstraction, composition, and type-driven design.',
  'It matters because it offers a different answer to large-scale software design than mainstream object-oriented languages. Where Java historically emphasized explicit class structure and conservative evolution, Scala pushes much harder toward immutability, algebraic modeling, higher-order functions, powerful abstractions, and a type system capable of expressing deep program relationships.',
  'This page is intentionally comprehensive. It covers Scala on the JVM, object-oriented and functional synthesis, syntax and type inference, traits, case classes, pattern matching, collections, effect and concurrency ecosystems, tooling, migration cost, performance tradeoffs, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Scala runs on the JVM and interoperates with Java, but its design philosophy is distinct. It tries to unify several powerful ideas: everything is an object, functions are first-class values, immutable data is central, and the type system can encode meaningful program structure rather than only surface-level contracts.',
      'This makes Scala attractive to engineers who want the runtime maturity of the JVM with a more expressive language for building APIs, data transformations, domain models, and distributed systems. It also means Scala asks more from the developer. The language offers a lot of leverage, but the learning curve and style variance are real.',
    ],
  },
  {
    id: 'bp-why-scala',
    title: 'Why Scala Exists',
    paragraphs: [
      'Scala exists partly as a response to the idea that mainstream JVM development was too verbose and too centered on class boilerplate for some kinds of software. It tries to give developers concise syntax, richer abstractions, better support for immutable and functional design, and a type system capable of modeling more than nominal class hierarchies alone.',
      'It also exists as a bridge language. Teams that want functional techniques such as pure transformations, algebraic data types, type classes, and effect systems can get them without giving up the JVM ecosystem, Java interoperability, or mature production deployment patterns.',
    ],
    bullets: [
      'It reduces boilerplate compared with classic Java styles.',
      'It treats functional programming as a first-class design tool.',
      'It supports object-oriented modeling without being limited to it.',
      'It leverages the JVM instead of requiring a separate runtime platform.',
    ],
  },
  {
    id: 'bp-jvm-context',
    title: 'JVM Context',
    paragraphs: [
      "Scala compiles to JVM bytecode, which means it benefits from the JVM runtime, garbage collection, JIT optimization, mature deployment patterns, and the enormous Java library ecosystem. This is one of Scala's biggest practical advantages. It can participate in enterprise and data-platform environments without isolating itself from the broader JVM world.",
      'At the same time, Scala is not just a nicer syntax for Java APIs. The language introduces its own standard library, its own idioms, and its own abstractions. The best Scala code usually looks like Scala, not like Java translated into Scala syntax.',
    ],
  },
  {
    id: 'bp-oo-plus-fp',
    title: 'Object-Oriented And Functional Together',
    paragraphs: [
      'Scala is often described as a hybrid language, but that description is only useful if it is precise. The object-oriented side shows up in classes, objects, traits, inheritance, encapsulation, and modular API design. The functional side shows up in immutable data, higher-order functions, pattern matching, referential transparency, and rich composition patterns.',
      'The important idea is not that Scala mixes two unrelated styles randomly. It tries to let each style support the other. Case classes and traits make algebraic data modeling convenient. Methods and functions coexist naturally. Collection operations and pattern matching make immutable workflows practical instead of ceremonial.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Scala Fits Best',
    paragraphs: [
      'Scala is strongest in codebases that benefit from expressive modeling and high abstraction power: distributed systems, streaming and data platforms, domain-heavy backends, event-driven architectures, compiler-like transformations, and teams already comfortable with strong static typing.',
      'It is also a natural fit for organizations that live on the JVM but want more than classic Java ergonomics. Historically this has included big data platforms such as Apache Spark, messaging and streaming systems such as Kafka-adjacent ecosystems, and backend teams interested in FP-influenced architecture.',
    ],
    bullets: [
      'Streaming and data processing systems.',
      'Complex backend services with rich domain models.',
      'Libraries and frameworks needing expressive abstraction.',
      'Teams that value functional design on the JVM.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      'Scala can be extremely expressive. Type inference, concise syntax, pattern matching, case classes, traits, and higher-order collections allow many ideas to be stated with much less boilerplate than older JVM languages. For the right team, that expressiveness translates directly into productivity and clarity.',
      'It also has unusual modeling power. Algebraic data types, sealed hierarchies, type classes, extension methods, contextual parameters, and immutable defaults let developers encode program structure very precisely. This can make domain logic safer and more composable when used with restraint.',
    ],
    bullets: [
      'Concise and expressive syntax.',
      'Strong support for immutable and functional design.',
      'Deep abstraction capabilities on a mature runtime.',
      'Excellent interoperability with Java and the JVM.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'Scala has a real complexity cost. The language can be used in very simple ways, but it also enables deeply abstract styles that are difficult for newcomers to read. Teams can drift into cleverness, macro-like metaprogramming habits, or type-level designs that are technically elegant but operationally expensive to maintain.',
      'Tooling and compilation have also historically been pain points compared with simpler languages, though the ecosystem has improved substantially. Even with modern Scala 3 direction, the language still expects a higher level of sophistication from its users than many more mainstream application languages.',
    ],
    bullets: [
      'The learning curve is steeper than Java, Kotlin, or TypeScript for many teams.',
      'Style inconsistency can make codebases harder to read.',
      'Build and compile feedback can feel heavier than lightweight scripting stacks.',
      'The language offers enough power to encourage over-engineering.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The most useful mental model is that Scala is a language for precise composition on the JVM. It is less about writing shorter Java and more about choosing stronger abstractions for data, effects, and program structure.',
      'That mental model helps separate good Scala from bad Scala. Good Scala uses its power to clarify intent, control state, and encode legal program structure. Bad Scala uses its power to compress meaning into syntax and types that only a small inner circle can decode.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'Scala syntax is compact relative to older JVM languages. Type inference reduces repetition, expression-oriented constructs reduce ceremonial statements, and features such as case classes, tuples, for-comprehensions, and collection methods let many tasks be written in a dense but readable form.',
      "This compactness is one of Scala's first visible differences, but it is not the deepest one. The more important difference is that syntax serves a design philosophy built around expressions, composition, and immutable-first modeling rather than around explicit mutable object shells.",
    ],
  },
  {
    id: 'core-expression-oriented',
    title: 'Expression-Oriented Design',
    paragraphs: [
      'Scala is expression-oriented, which means many constructs produce values rather than merely controlling execution. Conditionals, pattern matches, and blocks can return values directly. This reduces the need for mutable temporary variables and encourages a more compositional style.',
      'The design matters because it nudges programs toward transformation pipelines and explicit result construction. Instead of setting state step by step, code often computes and returns the next value directly.',
    ],
  },
  {
    id: 'core-type-inference',
    title: 'Type Inference And Static Typing',
    paragraphs: [
      'Scala is statically typed, but it uses type inference aggressively. Developers do not need to annotate every local value for the compiler to understand the program. This can keep code concise while preserving type safety, especially in collection-heavy and functional code.',
      'The tradeoff is that advanced inference sometimes makes types harder for humans to see at a glance, especially when abstraction layers become deep. Good Scala style usually adds explicit types at important boundaries even when the compiler does not strictly need them.',
    ],
  },
  {
    id: 'core-immutability',
    title: 'Immutability By Default Thinking',
    paragraphs: [
      'Scala encourages immutable design. While mutable variables and collections exist, the language and standard style guide many teams toward immutable values, pure transformations, and data flow that is easier to reason about in concurrent systems.',
      'This is one of the reasons Scala became attractive in distributed and asynchronous domains. Immutability does not solve all complexity, but it does remove a large class of incidental state mutation bugs and makes behavior easier to compose.',
    ],
  },
  {
    id: 'core-classes-objects',
    title: 'Classes, Objects, And Singleton Modules',
    paragraphs: [
      'Scala supports familiar classes and constructors, but it also has singleton `object` declarations that act as module-like containers or companion instances. Companion objects are especially important because they can hold factory methods, utility logic, and type-class instances related to a class.',
      'This model is more flexible than a simple class-only worldview. It lets APIs separate instance behavior from associated namespace-level behavior without forcing Java-style static patterns everywhere.',
    ],
  },
  {
    id: 'core-case-classes',
    title: 'Case Classes And Data Modeling',
    paragraphs: [
      "Case classes are one of Scala's most important features. They are lightweight immutable data carriers with built-in support for useful behavior such as structural equality, readable printing, and convenient construction. They make data-oriented modeling far less verbose than traditional JVM POJO patterns.",
      'Because case classes pair naturally with sealed traits and pattern matching, they form the backbone of many Scala domain models. They are especially effective for representing events, commands, states, AST nodes, and other algebraic structures.',
    ],
  },
  {
    id: 'core-traits-mixins',
    title: 'Traits And Mixins',
    paragraphs: [
      'Traits are a core abstraction in Scala. They can define contracts, shared behavior, or capability layers and can be mixed into classes in flexible ways. This gives Scala a richer composition model than single inheritance alone.',
      'Traits are often more important in Scala than interfaces are in classic Java design because they participate in both modular abstraction and behavior reuse. Used carefully, they support elegant composition. Used carelessly, they can still create confusing inheritance webs.',
    ],
  },
  {
    id: 'core-pattern-matching',
    title: 'Pattern Matching And Algebraic Modeling',
    paragraphs: [
      'Pattern matching is central to idiomatic Scala. It is not just a prettier switch statement. It works deeply with sealed hierarchies, case classes, tuples, and extractor logic to let programs deconstruct values safely and expressively.',
      'This matters because it supports algebraic data type style design. Instead of relying only on mutable object graphs and polymorphic override trees, Scala often models a domain as a closed family of cases and then handles those cases explicitly through pattern matching.',
    ],
  },
  {
    id: 'core-functions-collections',
    title: 'Higher-Order Functions And Collections',
    paragraphs: [
      'Scala collections are designed around transformations such as `map`, `flatMap`, `filter`, `fold`, `groupBy`, and related operations. Higher-order functions are not an optional decorative layer. They are part of normal everyday coding style.',
      'This makes many data-processing tasks concise and expressive, especially when combined with immutable collections and type inference. It also means developers need to think comfortably in terms of transformations and composition rather than only loops and mutable accumulators.',
    ],
  },
  {
    id: 'core-for-comprehensions',
    title: 'For-Comprehensions And Composition',
    paragraphs: [
      'For-comprehensions provide a readable way to compose operations over monadic or collection-like contexts. In practice this often means working with collections, `Option`, `Either`, `Future`, or effect types from libraries such as Cats Effect or ZIO.',
      "They are important because they let Scala express sequential-looking workflows over abstract contexts without abandoning compositional structure. This is part of the language's broader goal of making advanced composition ergonomic enough for real application code.",
    ],
  },
  {
    id: 'core-type-system',
    title: 'The Type System Beyond Basics',
    paragraphs: [
      "Scala's type system goes well beyond nominal classes and generics. Depending on the version and style, developers may work with variance, higher-kinded types, contextual abstractions, union or intersection types in Scala 3, opaque types, extension methods, and type-class style APIs.",
      'This power can be valuable because it helps encode reusable abstractions and domain constraints. It can also become a liability when teams use advanced types to impress each other rather than to clarify software design. The right amount of type sophistication is the amount that improves maintainability.',
    ],
  },
  {
    id: 'core-given-typeclasses',
    title: 'Contextual Abstractions And Type Classes',
    paragraphs: [
      "Modern Scala, especially Scala 3, supports contextual abstractions such as `given` and `using`, along with extension methods. These features make type-class style design more explicit and more coherent than older implicit-heavy patterns, though the underlying idea is continuous with Scala's historical abstraction style.",
      'Type classes matter because they let behavior be associated with types without forcing inheritance. This is powerful for reusable libraries, serialization, ordering, decoding, pretty-printing, effect abstractions, and other cross-cutting behavior.',
    ],
  },
  {
    id: 'core-concurrency-effects',
    title: 'Concurrency, Futures, And Effect Systems',
    paragraphs: [
      'Scala has long supported asynchronous and concurrent programming through `Future`, actors in ecosystems such as Akka or Pekko, streaming libraries, and more recent effect systems such as Cats Effect and ZIO. These ecosystems made Scala especially visible in reactive and distributed systems.',
      'The important distinction is that Scala concurrency is often approached through explicit effect modeling and composition rather than only through raw thread primitives. This can produce very robust systems, but it also raises the conceptual bar for teams.',
    ],
  },
  {
    id: 'core-jvm-interop',
    title: 'Java And JVM Interoperability',
    paragraphs: [
      'Scala interoperates closely with Java. It can call Java libraries, implement Java interfaces, consume Java frameworks, and live inside mixed JVM codebases. This gives it access to a huge ecosystem and makes incremental adoption realistic in many organizations.',
      'That said, the best Scala APIs often wrap Java libraries in more idiomatic Scala interfaces. Interoperability is a strength, but direct exposure of Java-style APIs everywhere can dilute the value of using Scala in the first place.',
    ],
  },
  {
    id: 'core-tooling-build',
    title: 'Tooling, Builds, And Ecosystem Workflow',
    paragraphs: [
      'The Scala build ecosystem historically centers on `sbt`, though other tools such as Mill have gained traction. Day-to-day development also involves compiler versions, ecosystem compatibility, dependency resolution, IDE support, test libraries, and sometimes binary compatibility concerns across Scala versions.',
      "This is one of Scala's practical costs. The language itself is powerful, but the surrounding build and version story can require more care than simpler stacks. Teams need discipline around version alignment and tooling choices.",
    ],
  },
  {
    id: 'core-performance-runtime',
    title: 'Performance And Runtime Behavior',
    paragraphs: [
      'Because Scala runs on the JVM, long-running applications can benefit from JIT optimization and mature garbage collection. Performance characteristics often depend more on allocation patterns, library choices, and runtime architecture than on the language alone.',
      'Scala code can be very fast, but highly abstract code may allocate more, box values, or obscure hot paths if written without performance awareness. Like other expressive languages, it rewards profiling over intuition.',
    ],
  },
  {
    id: 'core-when-it-shines',
    title: 'Where Scala Shines',
    paragraphs: [
      'Scala shines where expressive type-safe transformations and domain modeling matter. That includes event processing, streaming pipelines, compiler-like transformations, backend systems with rich workflows, and platforms where correctness and composition justify a more sophisticated language.',
      'It also shines when a team genuinely likes the language model. Scala tends to pay off best in organizations that actively embrace its abstractions rather than in teams that want only a slightly shorter Java.',
    ],
  },
  {
    id: 'core-learning-curve',
    title: 'Learning Curve And Team Cost',
    paragraphs: [
      'Scala is not difficult only because of syntax. The deeper learning cost comes from its conceptual stack: immutability, higher-order programming, algebraic modeling, contextual abstractions, effect systems, and more sophisticated type reasoning than many developers have used before.',
      'That cost is manageable for strong teams, but it is real. A language should be chosen based on what the team can sustain over years, not only on what its best engineers can write in one impressive month.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common failure mode is writing code that is syntactically compact but semantically dense. Another is leaning so heavily on advanced abstractions that onboarding becomes painful and basic debugging turns into archaeology. Teams can also overuse custom type classes or effect wrappers when simpler data modeling would suffice.',
      'The language does not force this outcome, but it permits it. Good Scala style sets a readability bar and treats abstraction as an economic decision, not a status signal.',
    ],
    bullets: [
      'Writing clever code that only experts on the team can maintain.',
      'Using advanced types where simple explicit models would be clearer.',
      'Leaking Java-style mutability into code that pretends to be functional.',
      'Choosing Scala without team buy-in for its design philosophy.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-case-class',
    title: 'Case Class With Immutable Data',
    description: [
      'Case classes are a standard Scala way to model immutable domain data. They reduce boilerplate and make structural data easier to work with than traditional JVM bean patterns.',
    ],
    code: `case class User(id: Long, name: String, isAdmin: Boolean)

val user = User(1L, "Ava", isAdmin = true)
val label = if user.isAdmin then "[admin] " + user.name else user.name`,
    notes: [
      'Construction is concise and readable.',
      'The data model is naturally aligned with immutable application state.',
    ],
  },
  {
    id: 'ex-pattern-match',
    title: 'Pattern Matching Over A Sealed Model',
    description: [
      "Sealed hierarchies and pattern matching are one of Scala's clearest advantages for state and protocol modeling.",
    ],
    code: `sealed trait LoadState
case object Idle extends LoadState
case object Loading extends LoadState
case class Success(items: List[String]) extends LoadState
case class Failure(message: String) extends LoadState

def itemCount(state: LoadState): Int =
  state match
    case Success(items) => items.size
    case _ => 0`,
    notes: [
      'The model makes legal states explicit.',
      'Pattern matching turns state handling into a direct readable expression.',
    ],
  },
  {
    id: 'ex-traits',
    title: 'Trait-Based Composition',
    description: [
      'Traits give Scala a flexible composition model for behavior and contracts without forcing everything into one inheritance chain.',
    ],
    code: `trait Greeter:
  def greet(name: String): String

trait PoliteGreeting extends Greeter:
  def greet(name: String): String = s"Hello, $name."

class SupportAgent extends PoliteGreeting`,
    notes: [
      'Traits can express both capability and reusable behavior.',
      'This is often cleaner than deep class hierarchies.',
    ],
  },
  {
    id: 'ex-collections',
    title: 'Collection Transformations',
    description: [
      'Higher-order collection operations are central to Scala style. Many data-processing tasks are naturally expressed as value transformations.',
    ],
    code: `val scores = List(92, 74, 88, 99)

val honors = scores
  .filter(_ >= 90)
  .map(score => s"score=$score")`,
    notes: [
      'The pipeline stays concise without giving up readability.',
      'Immutable transformations reduce incidental mutation.',
    ],
  },
  {
    id: 'ex-future',
    title: 'Basic Future Composition',
    description: [
      'Scala has long used compositional async styles. `Future` is a standard example, though more advanced effect systems are common in larger Scala ecosystems.',
    ],
    code: `import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

def fetchUser(id: Long): Future[String] =
  Future.successful(s"user-$id")

val result = fetchUser(42).map(name => name.toUpperCase)`,
    notes: [
      'This shows async composition without explicit thread management in user code.',
      'Larger systems often move to stronger effect models when requirements grow.',
    ],
  },
  {
    id: 'ex-given',
    title: 'Scala 3 Contextual Abstraction',
    description: [
      'Scala 3 made contextual programming clearer with `given` and `using`, which support type-class style APIs and reusable contextual behavior.',
    ],
    code: `trait Show[A]:
  def render(value: A): String

given Show[Int] with
  def render(value: Int): String = s"Int($value)"

def printValue[A](value: A)(using show: Show[A]): String =
  show.render(value)`,
    notes: [
      'This separates behavior from inheritance.',
      'It is powerful for reusable library and domain abstractions.',
    ],
  },
  {
    id: 'ex-java-interop',
    title: 'JVM Interoperability Mindset',
    description: [
      'Scala works well with existing JVM ecosystems, which is one of its strongest practical advantages.',
    ],
    code: `import java.time.Instant

case class AuditEvent(name: String, at: Instant)

val event = AuditEvent("login", Instant.now())`,
    notes: [
      'Using Java libraries directly is normal in Scala projects.',
      'The value usually comes from wrapping JVM capabilities in more idiomatic Scala design.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Case class',
        definition:
          'A concise immutable data-oriented class with useful default behavior for equality, construction, and representation.',
      },
      {
        term: 'Trait',
        definition:
          'A reusable abstraction that can define contracts, behavior, or capability layers and be mixed into classes.',
      },
      {
        term: 'Pattern matching',
        definition:
          'A language construct for destructuring and handling values by shape or case rather than only by simple equality.',
      },
      {
        term: 'Expression-oriented',
        definition:
          'A style in which many constructs evaluate to values, encouraging composition over statement-heavy control flow.',
      },
      {
        term: 'Higher-order function',
        definition: 'A function that accepts other functions, returns functions, or both.',
      },
      {
        term: 'Immutable value',
        definition: 'A value whose observable state does not change after creation.',
      },
      {
        term: 'Sealed trait',
        definition:
          'A trait whose implementations are restricted in scope, commonly used for closed algebraic models.',
      },
      {
        term: 'For-comprehension',
        definition:
          'Scala syntax for composing operations over collections and effect-like contexts in a readable sequential style.',
      },
    ],
  },
  {
    id: 'glossary-types',
    title: 'Type And Abstraction Terms',
    terms: [
      {
        term: 'Type inference',
        definition:
          "The compiler's ability to determine types without explicit annotation in many local situations.",
      },
      {
        term: 'Type class',
        definition:
          'A pattern for attaching behavior to types without inheritance, often implemented through contextual abstractions.',
      },
      {
        term: 'Given / using',
        definition:
          'Scala 3 syntax for contextual values and parameters that support type-class style design and dependency passing.',
      },
      {
        term: 'Extension method',
        definition:
          'A way to add method-like syntax to types without modifying their original class definition.',
      },
      {
        term: 'Variance',
        definition:
          'Rules that describe how type relationships behave when one type parameter is substituted for another.',
      },
      {
        term: 'Higher-kinded type',
        definition:
          'A type-level abstraction over type constructors, historically important in advanced Scala FP libraries.',
      },
      {
        term: 'Opaque type',
        definition:
          'A Scala 3 feature for representing a type with a hidden implementation detail while preserving zero-cost abstraction.',
      },
      {
        term: 'Algebraic data type',
        definition:
          'A data model built from alternatives and compositions, commonly expressed with sealed traits and case classes.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Runtime And Ecosystem Terms',
    terms: [
      {
        term: 'JVM',
        definition:
          'The Java Virtual Machine, the runtime platform on which Scala programs typically execute.',
      },
      {
        term: 'Bytecode',
        definition:
          'The JVM instruction format produced by compilation and optimized at runtime by the JVM.',
      },
      {
        term: 'sbt',
        definition:
          'The traditional Scala build tool used for compiling, testing, and dependency management.',
      },
      {
        term: 'Future',
        definition:
          'A standard Scala abstraction for asynchronous computation that may complete later.',
      },
      {
        term: 'Cats Effect',
        definition:
          'A functional effect library and ecosystem for modeling side effects, concurrency, and resource safety in Scala.',
      },
      {
        term: 'ZIO',
        definition:
          'A Scala effect system and runtime ecosystem focused on typed effects, concurrency, and composable services.',
      },
      {
        term: 'Akka / Pekko',
        definition:
          'Actor and distributed systems ecosystems historically central to many reactive Scala architectures.',
      },
      {
        term: 'Spark',
        definition:
          'A distributed data processing engine whose APIs and ecosystem helped make Scala especially visible in big data work.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-scala', label: 'Why Scala Exists' },
    { id: 'bp-jvm-context', label: 'JVM Context' },
    { id: 'bp-oo-plus-fp', label: 'OO and FP Together' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-expression-oriented', label: 'Expression-Oriented Design' },
    { id: 'core-type-inference', label: 'Type Inference' },
    { id: 'core-immutability', label: 'Immutability' },
    { id: 'core-classes-objects', label: 'Classes and Objects' },
    { id: 'core-case-classes', label: 'Case Classes' },
    { id: 'core-traits-mixins', label: 'Traits and Mixins' },
    { id: 'core-pattern-matching', label: 'Pattern Matching' },
    { id: 'core-functions-collections', label: 'Functions and Collections' },
    { id: 'core-for-comprehensions', label: 'For-Comprehensions' },
    { id: 'core-type-system', label: 'Advanced Type System' },
    { id: 'core-given-typeclasses', label: 'Contextual Abstractions' },
    { id: 'core-concurrency-effects', label: 'Concurrency and Effects' },
    { id: 'core-jvm-interop', label: 'JVM Interop' },
    { id: 'core-tooling-build', label: 'Tooling and Builds' },
    { id: 'core-performance-runtime', label: 'Performance' },
    { id: 'core-when-it-shines', label: 'Where It Shines' },
    { id: 'core-learning-curve', label: 'Learning Curve' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-case-class', label: 'Case Class' },
    { id: 'ex-pattern-match', label: 'Pattern Matching' },
    { id: 'ex-traits', label: 'Trait Composition' },
    { id: 'ex-collections', label: 'Collections' },
    { id: 'ex-future', label: 'Future Composition' },
    { id: 'ex-given', label: 'Given and Using' },
    { id: 'ex-java-interop', label: 'Java Interop' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-types', label: 'Type Terms' },
    { id: 'glossary-ecosystem', label: 'Ecosystem Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="scala98-section">
      <h2 className="scala98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="scala98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="scala98-section">
      <h2 className="scala98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="scala98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="scala98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="scala98-section">
      <h2 className="scala98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="scala98-divider" />}
    </section>
  )
}

export default function ScalaPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Scala',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Scala"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Scala</h1>
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
