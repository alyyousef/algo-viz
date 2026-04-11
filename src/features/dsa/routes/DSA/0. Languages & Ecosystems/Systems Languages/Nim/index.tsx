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
  'Nim is a compiled statically typed language that tries to combine systems-level performance with a lightweight, readable syntax closer to scripting languages than traditional low-level languages. It targets native binaries, can interoperate closely with C, C++, and JavaScript in some workflows, and is often discussed as a language for tools, compilers, infrastructure software, game tooling, embedded-adjacent work, and performance-sensitive applications that still value rapid development.',
  'The language matters because it represents a different answer to the systems-programming question. Instead of pursuing maximum minimalism like C or a heavy safety-and-abstraction story like some newer systems languages, Nim aims for pragmatism: readable syntax, strong metaprogramming, efficient native code generation, flexible memory models, and direct access to low-level capabilities when needed.',
  'This page is intentionally thorough. It covers what Nim is for, how it fits into systems programming, its Python-like syntax, compilation model, memory management approaches, metaprogramming, macros and templates, C interoperability, tooling, strengths, limits, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Nim is a general-purpose compiled language designed to be expressive, efficient, and practical. It produces native binaries, exposes low-level capabilities, and supports direct interaction with systems-oriented concerns such as manual control over layout, FFI boundaries, performance tuning, and build targets.',
      'What makes it stand out is that it does not present itself like a traditional systems language on the surface. The syntax is indentation-based and visually lightweight, which often makes Nim code feel closer to Python than to C or C++. Under that syntax, however, the language is capable of doing serious native and low-level work.',
    ],
  },
  {
    id: 'bp-why-nim',
    title: 'Why Nim Exists',
    paragraphs: [
      'Nim exists because many developers wanted native-code performance and systems access without living entirely inside the syntax and complexity traditions of older low-level languages. It tries to make performance-oriented programming feel more direct and productive while still keeping explicit access to platform details when required.',
      'Its design also reflects frustration with the split between fast but ergonomically difficult native languages and highly ergonomic languages that depend on a large managed runtime. Nim aims to reduce that gap rather than picking one side completely.',
    ],
    bullets: [
      'Bring native performance closer to high-level development ergonomics.',
      'Offer a smaller, more readable surface than older systems languages.',
      'Provide strong metaprogramming without turning everything into unreadable macro abuse by default.',
      'Keep practical interoperability with existing native ecosystems.',
    ],
  },
  {
    id: 'bp-systems-context',
    title: 'Systems Programming Context',
    paragraphs: [
      'Nim is often grouped with systems languages because it can generate efficient native code, expose pointer-level and memory-sensitive operations, interoperate with C, and run effectively in performance-aware environments. It can be used for CLI tools, language tooling, infrastructure software, libraries, and some embedded or low-runtime contexts where managed runtimes are a disadvantage.',
      'It is not identical in culture to C, Rust, or Zig. Nim leans more heavily into ergonomics and metaprogramming, which gives it a somewhat different personality. It is best understood as a pragmatic native language with systems reach rather than a language defined purely by austerity.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Nim Fits Best',
    paragraphs: [
      'Nim fits best where teams want native binaries, decent low-level control, and faster development speed than more ceremonious systems languages often provide. That includes command-line tools, compilers, DSL processors, game tooling, scripting replacement utilities, backend services that want native deployment, and libraries that need tight C interoperability.',
      'It can also appeal to individual engineers and small teams who want one language that scales from scripts to compiled tools. It is less dominant in domains where a larger corporate ecosystem, deeply standardized safety model, or massive mainstream framework culture matters most.',
    ],
    bullets: [
      'Native command-line utilities and developer tools.',
      'Compilers, parsers, and code generation pipelines.',
      'Performance-aware applications that still value quick iteration.',
      'Mixed ecosystems where C interop or standalone binaries matter.',
    ],
  },
  {
    id: 'bp-design-style',
    title: 'Design Style',
    paragraphs: [
      'Nim combines readable syntax, static typing, generic programming, and strong metaprogramming facilities. The language tries to stay productive for ordinary application code while still letting developers reach into low-level details when performance, layout, or interoperability require it.',
      'This means Nim often feels more flexible and less doctrinaire than some other systems languages. That flexibility can be a strength, but it also means discipline and codebase conventions matter a great deal.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      "Nim's biggest strengths are developer ergonomics, expressive metaprogramming, efficient native code generation, and a useful balance between high-level readability and low-level control. Many developers are drawn to it because it can feel much lighter to write than older native languages while still producing performant binaries.",
      'Another major strength is that the language can scale from simple scripts and tools to more complex systems-oriented programs without forcing a complete change in programming model.',
    ],
    bullets: [
      'Readable syntax for a native compiled language.',
      'Strong macro and template capabilities.',
      'Native binary generation and low-level access.',
      'Pragmatic interoperability with C-oriented ecosystems.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      "Nim has real tradeoffs. Its ecosystem is smaller than those of mainstream languages, and some teams may find that the language's flexibility leads to inconsistent style or overuse of metaprogramming. The relative lack of dominant industry conventions can make large-team standardization more work than in ecosystems with narrower norms.",
      'It also is not the default choice in most enterprise environments. That means fewer established libraries, fewer engineers already fluent in the language, and more friction when an organization optimizes for hiring familiarity rather than technical fit.',
    ],
    bullets: [
      'Smaller ecosystem and talent pool than mainstream alternatives.',
      'Metaprogramming power can be overused.',
      'Style consistency depends heavily on team discipline.',
      'It is less standard in large production organizations.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that Nim is a pragmatic native language that tries to make systems-capable programming feel lighter and faster. It does not remove the need to think about performance, memory, and interoperability, but it often lets developers express that work with less syntactic friction.',
      "Good Nim code is explicit where cost and ownership matter, restrained in its metaprogramming, and organized so that the language's flexibility improves clarity rather than weakening it.",
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'Nim syntax is one of its most immediately distinctive features. It uses indentation instead of braces, aims for readability, and often feels approachable to developers coming from Python-like languages. At the same time, it remains statically typed and compiled, which makes the overall experience quite different from dynamic scripting languages.',
      "This combination matters because much of Nim's appeal comes from lowering the visual and structural overhead of systems-oriented code. A native program can still look relatively lightweight on the page.",
    ],
  },
  {
    id: 'core-compilation-model',
    title: 'Compilation Model',
    paragraphs: [
      'Nim is compiled ahead of time, typically generating C, C++, or JavaScript as an intermediate step depending on the target and configuration. In native workflows, the practical result is that Nim programs become ordinary native executables rather than code running inside a heavyweight managed virtual machine.',
      'This model gives Nim a useful position: it can leverage mature native compilation toolchains while still presenting its own higher-level language surface to the programmer.',
    ],
  },
  {
    id: 'core-type-system',
    title: 'Static Typing And Type Inference',
    paragraphs: [
      'Nim is statically typed, but it often avoids unnecessary verbosity through type inference and concise declarations. This lets developers keep strong compile-time information without writing every type annotation manually. The language supports user-defined types, enums, objects, generics, distinct types, and type-driven overloading.',
      'The overall style is pragmatic rather than academically maximal. Nim wants types to help correctness and optimization without making ordinary code feel overly ceremonial.',
    ],
  },
  {
    id: 'core-memory-management',
    title: 'Memory Management Models',
    paragraphs: [
      'Nim is unusual among native languages because it supports more than one memory-management approach. Depending on the configuration and runtime model, it can use garbage-collected behavior or more deterministic ownership-oriented strategies such as ARC or ORC. This gives the language flexibility across very different application domains.',
      'That flexibility matters because not every native program wants the same tradeoffs. Some software prefers easier heap management. Other software needs more predictable destruction behavior and lower runtime overhead. Nim lets teams choose more deliberately than languages with one fixed model.',
    ],
  },
  {
    id: 'core-arc-orc',
    title: 'ARC, ORC, And Ownership Tradeoffs',
    paragraphs: [
      "ARC and ORC are important parts of Nim's modern story. They move the language closer to deterministic resource management and reduce reliance on traditional tracing garbage collection for many workloads. This can improve performance predictability and make native integration easier in some contexts.",
      'The broader lesson is that Nim tries to be practical rather than ideological. It does not insist that every program must use one universal memory model. Instead, it gives developers options, with the responsibility to understand the consequences of those options.',
    ],
  },
  {
    id: 'core-objects-and-procs',
    title: 'Objects, Procedures, And Modules',
    paragraphs: [
      'Nim uses objects for structured data and procedures for behavior, with modules providing code organization. It can support object-oriented patterns, but the language is often used in a more pragmatic procedural-plus-typed-data style than in heavyweight classical OOP.',
      'This is important because Nim is not primarily about elaborate inheritance hierarchies. It is more often about using clear data structures, direct procedures, and modular organization to keep systems code understandable.',
    ],
  },
  {
    id: 'core-generics',
    title: 'Generics',
    paragraphs: [
      'Nim supports generic programming in a way that is useful for containers, algorithms, domain utilities, and reusable abstractions. Generics matter because many systems or tooling problems involve repeated patterns over different element types, buffer shapes, or policy choices.',
      'As with other powerful features in Nim, the tradeoff is that generic-heavy code can become harder to read if the abstraction no longer clearly matches the problem.',
    ],
  },
  {
    id: 'core-macros-templates',
    title: 'Macros, Templates, And Metaprogramming',
    paragraphs: [
      "Metaprogramming is one of Nim's defining strengths. Templates and macros allow developers to generate or transform code in ways that can eliminate boilerplate, create domain-specific APIs, and encode reusable patterns at compile time. This is a major reason some developers choose Nim over otherwise similar native languages.",
      'The power is real, but so is the risk. Metaprogramming can improve clarity when it removes repetitive low-signal code. It becomes harmful when it turns straightforward logic into a private language that only the original author can maintain.',
    ],
  },
  {
    id: 'core-error-handling',
    title: 'Error Handling And Control Flow',
    paragraphs: [
      'Nim uses ordinary procedural control flow, return values, exceptions in some styles, and explicit result-oriented design depending on the program and library. In practice, the strongest systems-oriented Nim code tends to make failure paths visible and predictable rather than depending on surprising hidden behavior.',
      'Because Nim is pragmatic, teams can choose patterns that fit the domain. The important engineering question is not whether the language allows a feature, but whether the resulting code makes operational failure and recovery easy to understand.',
    ],
  },
  {
    id: 'core-low-level-access',
    title: 'Pointers, Layout, And Low-Level Access',
    paragraphs: [
      'Nim can expose low-level operations such as pointers, address-taking, binary data access, and layout-sensitive work when the program needs them. This gives it real systems reach beyond the appearance of its high-level syntax.',
      'That said, low-level access still demands care. Memory lifetime, aliasing, representation assumptions, and FFI boundaries remain engineering concerns regardless of how lightweight the syntax looks.',
    ],
  },
  {
    id: 'core-c-interop',
    title: 'C And Native Interoperability',
    paragraphs: [
      'C interoperability is important in Nim because it helps the language fit into existing native ecosystems. Nim can bind to C libraries, call into external code, and operate in environments where legacy native interfaces are unavoidable. This makes it much more practical than a native language that insists on working in isolation.',
      'Interop also supports gradual adoption. A team does not need to rewrite every library at once in order to use Nim for selected parts of a system.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling, Build Workflow, And Distribution',
    paragraphs: [
      'Nim offers a workable build and packaging story for native applications, libraries, and tooling, though the surrounding ecosystem is smaller than those of older mainstream languages. Native binary output is especially valuable for distribution because it reduces deployment complexity relative to managed stacks.',
      "For many users, one of Nim's attractions is being able to write a productive high-level-looking program and still ship a standalone executable without dragging in a heavy runtime platform.",
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'Nim is capable of strong native performance when the program design respects memory behavior, algorithmic efficiency, and low-level cost. Its language ergonomics do not prevent it from being used in performance-aware code, which is one of its main selling points.',
      'As with all native languages, performance is not automatic. Good results depend on data structures, allocation patterns, code generation implications, and understanding where abstractions introduce real cost.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where Nim Shines',
    paragraphs: [
      'Nim shines when developers want compiled native software without paying the full syntactic and conceptual cost of older low-level languages. It is especially attractive for CLI tools, code generators, compiler tooling, game utilities, native scripts, and software that values shipping a single binary.',
      'It also shines when metaprogramming is genuinely useful. Nim can express domain-specific helper layers and code generation patterns more elegantly than many native alternatives, provided that the codebase stays disciplined.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common Nim mistake is overusing macros and templates because the language makes them available. Another is assuming that readable syntax means systems concerns have become simple. Memory, ownership, FFI, and layout assumptions still require deliberate engineering.',
      'Teams can also create maintainability problems if each module invents its own style. Because Nim is flexible, code quality depends heavily on restraint, conventions, and architectural clarity.',
    ],
    bullets: [
      'Using metaprogramming where ordinary procedures would be clearer.',
      'Treating a smaller ecosystem as though it had the same support depth as mainstream stacks.',
      'Ignoring memory-model choices and their practical tradeoffs.',
      'Letting stylistic flexibility turn into codebase inconsistency.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-object',
    title: 'Object For Native Data Modeling',
    description: [
      'Nim often models program state with lightweight object types and direct procedures rather than heavy framework structure.',
    ],
    code: `type
  User = object
    id: int
    active: bool
    score: int`,
    notes: [
      'This style keeps data representation explicit and compact.',
      'Nim objects are frequently used as straightforward structured data.',
    ],
  },
  {
    id: 'ex-proc',
    title: 'Procedure With Inferred Result',
    description: [
      'Procedures are a core organizational unit in Nim and often remain simple and direct.',
    ],
    code: `proc greeting(name: string): string =
  "Hello, " & name`,
    notes: [
      'The syntax stays lightweight while remaining statically typed.',
      "This contributes to Nim's scripting-like readability.",
    ],
  },
  {
    id: 'ex-generic',
    title: 'Generic Procedure',
    description: [
      'Generics allow reusable logic across different concrete types without abandoning compile-time typing.',
    ],
    code: `proc first[T](items: seq[T]): T =
  items[0]`,
    notes: [
      "This is typical of Nim's pragmatic generic programming style.",
      'Generic abstractions should stay close to the real problem they solve.',
    ],
  },
  {
    id: 'ex-template',
    title: 'Template For Boilerplate Reduction',
    description: ['Templates can remove repetitive source patterns when used with restraint.'],
    code: `template withLog(body: untyped) =
  echo "start"
  body
  echo "done"`,
    notes: [
      'Templates are powerful, but they should make code clearer rather than more mysterious.',
      'Nim metaprogramming is a strength only when it remains readable to maintainers.',
    ],
  },
  {
    id: 'ex-seq',
    title: 'Sequence-Based Dynamic Collection',
    description: [
      "Sequences are Nim's common growable collection type for many ordinary programs.",
    ],
    code: `var scores = @[92, 74, 88, 99]
scores.add 100`,
    notes: [
      'This is an example of Nim balancing convenience with compiled execution.',
      'Even high-level-looking collection code still compiles to native output.',
    ],
  },
  {
    id: 'ex-pointer',
    title: 'Pointer-Level Access',
    description: ['Nim can still expose low-level memory access when the program requires it.'],
    code: `var value = 10
let ptrValue = addr value`,
    notes: [
      'This reminds you that Nim is not only a high-level convenience language.',
      'Low-level access should be used deliberately, especially around lifetime-sensitive code.',
    ],
  },
  {
    id: 'ex-c-interop',
    title: 'C Function Import',
    description: [
      'Nim can bind to native C APIs directly, which is a major practical advantage in systems work.',
    ],
    code: `proc puts(s: cstring): cint {.importc, header: "<stdio.h>".}`,
    notes: [
      'Interop makes Nim usable in existing native ecosystems.',
      'This supports incremental adoption rather than all-or-nothing rewrites.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Procedure',
        definition: 'A callable unit of behavior in Nim, commonly declared with `proc`.',
      },
      {
        term: 'Object',
        definition: 'A structured data type used to group related fields in Nim.',
      },
      {
        term: 'Sequence (`seq`)',
        definition: 'A growable dynamic collection type commonly used in Nim.',
      },
      {
        term: 'Template',
        definition:
          'A compile-time code substitution mechanism used to reduce repetitive patterns.',
      },
      {
        term: 'Macro',
        definition:
          'A more powerful metaprogramming feature that can inspect or transform code structures during compilation.',
      },
      {
        term: 'Generic',
        definition: 'A type-parameterized definition that can work across multiple concrete types.',
      },
      {
        term: 'Distinct type',
        definition:
          'A type based on another representation but treated as logically separate by the compiler.',
      },
      {
        term: 'Indentation syntax',
        definition:
          'A source formatting style where block structure is indicated by indentation rather than braces.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Tooling Terms',
    terms: [
      {
        term: 'ARC',
        definition:
          "Automatic Reference Counting, one of Nim's memory-management approaches for more deterministic behavior.",
      },
      {
        term: 'ORC',
        definition:
          'An ownership-oriented memory model in Nim designed to reduce tracing-GC reliance while preserving practicality.',
      },
      {
        term: 'Native binary',
        definition:
          'A compiled executable that runs directly on the target platform without depending on a managed VM runtime.',
      },
      {
        term: 'Ahead-of-time compilation',
        definition:
          'Compilation that happens before program execution, producing deployable native output.',
      },
      {
        term: 'FFI',
        definition:
          'Foreign Function Interface, the mechanism by which Nim interacts with external native libraries such as C code.',
      },
      {
        term: 'Code generation',
        definition:
          'The process of translating Nim source into lower-level target code and final binaries.',
      },
      {
        term: 'Standalone executable',
        definition:
          'A distributed program artifact that runs directly without requiring a large separate runtime platform.',
      },
      {
        term: 'Toolchain',
        definition:
          'The compiler, supporting build steps, and related native-development tools used to produce Nim software.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Ecosystem And Architecture Terms',
    terms: [
      {
        term: 'C interop',
        definition: 'The ability to bind to and call C APIs directly from Nim code.',
      },
      {
        term: 'Metaprogramming',
        definition:
          'Writing code that helps generate, transform, or specialize other code during compilation.',
      },
      {
        term: 'DSL',
        definition:
          'A domain-specific language, often made easier in Nim through templates and macros.',
      },
      {
        term: 'Native deployment',
        definition:
          'Shipping software as platform-specific compiled binaries rather than through a managed runtime environment.',
      },
      {
        term: 'Parser tooling',
        definition:
          'Software that processes structured input such as source files, config formats, or protocol messages.',
      },
      {
        term: 'Systems utility',
        definition:
          'A performance-aware or platform-facing native tool used for infrastructure, operations, or developer workflows.',
      },
      {
        term: 'Ownership tradeoff',
        definition:
          'The practical design choice around how resources are acquired, retained, shared, and released.',
      },
      {
        term: 'Style discipline',
        definition:
          'The need for teams to keep code conventions coherent in a flexible language environment.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-nim', label: 'Why Nim Exists' },
    { id: 'bp-systems-context', label: 'Systems Context' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-design-style', label: 'Design Style' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-compilation-model', label: 'Compilation Model' },
    { id: 'core-type-system', label: 'Static Typing' },
    { id: 'core-memory-management', label: 'Memory Management' },
    { id: 'core-arc-orc', label: 'ARC and ORC' },
    { id: 'core-objects-and-procs', label: 'Objects and Procedures' },
    { id: 'core-generics', label: 'Generics' },
    { id: 'core-macros-templates', label: 'Macros and Templates' },
    { id: 'core-error-handling', label: 'Error Handling' },
    { id: 'core-low-level-access', label: 'Low-Level Access' },
    { id: 'core-c-interop', label: 'C Interop' },
    { id: 'core-tooling', label: 'Tooling' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-object', label: 'Object' },
    { id: 'ex-proc', label: 'Procedure' },
    { id: 'ex-generic', label: 'Generic' },
    { id: 'ex-template', label: 'Template' },
    { id: 'ex-seq', label: 'Sequence' },
    { id: 'ex-pointer', label: 'Pointer' },
    { id: 'ex-c-interop', label: 'C Interop' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Ecosystem Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="nim98-section">
      <h2 className="nim98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="nim98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="nim98-section">
      <h2 className="nim98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="nim98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="nim98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="nim98-section">
      <h2 className="nim98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="nim98-divider" />}
    </section>
  )
}

export default function NimPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Nim',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Nim"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Nim</h1>
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
