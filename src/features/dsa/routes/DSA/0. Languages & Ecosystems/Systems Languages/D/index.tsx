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
  'D is a compiled systems programming language created as an attempt to keep much of C and C++ performance and native reach while removing large amounts of their accidental complexity. It targets native binaries, supports low-level control and C interoperability, and also includes higher-level features such as garbage collection, ranges, contracts, templates, compile-time function execution, and a broad standard-library style.',
  'The language matters because it takes a hybrid approach that many systems languages avoid. D does not insist on a minimal manual-only model, and it does not fully retreat into a managed-runtime application world either. Instead, it tries to let developers mix low-level control, direct native deployment, and higher-level productivity tools in one language.',
  'This page is intentionally thorough. It covers why D exists, how it fits into systems programming, native compilation, GC versus manual control, templates, metaprogramming, ranges, memory and ownership tradeoffs, C interoperability, tooling, strengths, limits, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'D is a native compiled language aimed at system-level and performance-aware programming without fully inheriting the complexity burden of C++. It gives developers direct access to low-level constructs, native binaries, and interoperability with C while also offering modern language features intended to improve expressiveness and safety.',
      'Its identity is hybrid. D is not purely a minimal systems language, and it is not purely a high-level managed language. That mixed design is both its main appeal and one of the reasons it can be harder to categorize than some of its competitors.',
    ],
  },
  {
    id: 'bp-why-d',
    title: 'Why D Exists',
    paragraphs: [
      'D exists because many engineers wanted a language that could replace large parts of C++ development without forcing all code into old complexity patterns. It was designed to preserve native performance and systems capability while introducing cleaner syntax, better compile-time features, safer defaults in some areas, and more direct productivity for everyday engineering work.',
      'Its broader motivation is to reduce the cost of writing native software. In D, that means using features such as garbage collection where helpful, metaprogramming where powerful, and low-level access where necessary rather than requiring one ideological approach to every problem.',
    ],
    bullets: [
      'Modernize native programming without giving up compiled performance.',
      'Reduce friction and complexity associated with large C++-style codebases.',
      'Support both systems control and high-level productivity features.',
      'Make compile-time programming more coherent and practical.',
    ],
  },
  {
    id: 'bp-systems-context',
    title: 'Systems Programming Context',
    paragraphs: [
      'D belongs in systems programming because it produces native binaries, supports direct memory-sensitive code, can talk to C APIs, and can be used for compilers, tools, infrastructure software, scientific and numeric applications, libraries, and performance-oriented native components.',
      'At the same time, D occupies a softer edge of that category than languages that reject garbage collection entirely or insist on strict manual ownership everywhere. It is often better understood as a systems-capable native language than as a purity-driven systems language.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where D Fits Best',
    paragraphs: [
      'D fits best in domains where native performance and expressive metaprogramming both matter. That includes compilers, developer tools, simulation and numeric software, performance-aware libraries, command-line software, game-adjacent tooling, and codebases where direct native deployment matters but pure low-level austerity is not the goal.',
      'It is less natural in environments that require a giant mainstream ecosystem, strict memory-model uniformity across every team, or extremely standardized hiring pipelines. D can be powerful, but it is still a niche choice relative to larger language ecosystems.',
    ],
    bullets: [
      'Native command-line and tooling software.',
      'Compilers and compile-time-heavy systems.',
      'Performance-aware applications with expressive generic needs.',
      'Libraries that need low-level reach without C++-level complexity.',
    ],
  },
  {
    id: 'bp-design-style',
    title: 'Design Style',
    paragraphs: [
      'D is intentionally multi-paradigm. It supports procedural, object-oriented, generic, and metaprogramming-heavy styles within one language. This flexibility can be very productive for expert developers because the language offers several ways to express a solution depending on the constraints.',
      'The cost is that code quality depends heavily on team discipline. A language that can be used in many styles is also a language that can become internally inconsistent if a codebase has weak conventions.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      'D\'s biggest strengths are native performance, expressive compile-time programming, strong template capabilities, direct C interoperability, and the ability to mix higher-level convenience with low-level access. Developers who like D often value how much power it offers without feeling as syntactically or conceptually overloaded as large C++ codebases.',
      'Another strength is that the language can let teams move faster on certain categories of native software because it includes more built-in expressive tools than minimalist systems languages.',
    ],
    bullets: [
      'Powerful compile-time programming and templates.',
      'Native binaries with low-level access when needed.',
      'A practical mix of higher-level and lower-level features.',
      'Strong C interoperability for incremental adoption.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'D has clear limits. Its ecosystem is smaller than those of more mainstream native languages, and its hybrid design can create ambiguity about best practices in areas such as memory management, architecture, and abstraction level. Organizations often hesitate to adopt niche languages when staffing and long-term ecosystem depth matter more than feature quality.',
      'Some developers also see its feature richness as a downside. A language that tries to offer both low-level control and higher-level convenience can feel less conceptually tight than languages with a narrower philosophy.',
    ],
    bullets: [
      'Smaller ecosystem and hiring pool than major mainstream alternatives.',
      'Hybrid design can make best practices less uniform.',
      'Feature richness can turn into inconsistency if teams lack discipline.',
      'It remains a niche choice in many production organizations.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that D is a pragmatic native language for engineers who want both power and productivity. It tries to let you stay close to the machine when necessary without forcing every part of the program to look like low-level ceremony.',
      'Good D code uses the language\'s flexibility carefully. It is explicit about performance-sensitive paths, disciplined about memory behavior, and restrained enough that metaprogramming improves the code instead of obscuring it.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'D syntax will feel familiar to developers from C, C++, Java, or C# backgrounds, but the language surface includes more modern conveniences and a somewhat cleaner overall feel than large legacy native languages. That familiarity lowers the barrier for developers who want native code without learning a completely alien syntax model.',
      'At the same time, D can express quite advanced ideas. The language may look ordinary at first glance, but templates, compile-time features, attributes, and systems-facing capabilities make it deeper than a casual reading suggests.',
    ],
  },
  {
    id: 'core-native-compilation',
    title: 'Native Compilation And Runtime Model',
    paragraphs: [
      'D compiles to native code, which makes it attractive for tools, libraries, and applications that need direct operating-system execution without relying on a virtual machine. That said, D can include a runtime and a garbage collector depending on how the program is built and which features it uses.',
      'This is one of the core D tradeoffs: native performance and deployment are central, but the language is willing to include runtime support where that improves developer productivity.',
    ],
  },
  {
    id: 'core-memory-model',
    title: 'Memory Management And Ownership Tradeoffs',
    paragraphs: [
      'D supports garbage collection, but that is not the whole story. The language also supports explicit allocation strategies, deterministic destruction in some patterns, stack allocation, and lower-level control where required. This makes it more flexible than languages that commit entirely to one memory philosophy.',
      'The result is power, but also responsibility. Teams need to understand which parts of a program can comfortably rely on GC and which parts demand tighter control over latency, footprint, or lifetime behavior.',
    ],
  },
  {
    id: 'core-gc-vs-manual',
    title: 'Garbage Collection Versus Manual Control',
    paragraphs: [
      'Garbage collection in D can improve productivity significantly, especially for general application logic, complex object graphs, and code where the engineering cost of manual memory management outweighs the runtime cost. But in latency-sensitive or tightly constrained systems, GC behavior may become a real design concern.',
      'This tension is central to understanding D. The language gives you managed convenience and lower-level escape hatches, but it does not magically remove the need to reason about where each approach belongs.',
    ],
  },
  {
    id: 'core-structs-classes',
    title: 'Structs, Classes, And Data Modeling',
    paragraphs: [
      'D supports both value-oriented structs and reference-oriented classes. Structs are useful for data that should behave with value semantics and predictable layout. Classes support reference-based object-oriented design. This dual model gives developers flexibility to choose representations that match the domain and performance needs.',
      'In many performance-aware D codebases, struct-heavy design remains important because value representation and layout control matter. Classes are available, but not every system should be built as a class hierarchy.',
    ],
  },
  {
    id: 'core-templates',
    title: 'Templates And Generic Programming',
    paragraphs: [
      'Templates are one of D\'s defining features. They support generic programming, type-driven specialization, compile-time constraints, and reusable abstractions in a style that is often more expressive than older C++ template workflows. For many D developers, this is one of the language\'s strongest reasons to exist.',
      'The power of templates can make libraries elegant and reusable, but template-heavy code still requires restraint. Overly clever generic machinery can damage maintainability in any language, including D.',
    ],
  },
  {
    id: 'core-compile-time',
    title: 'Compile-Time Function Execution',
    paragraphs: [
      'D includes strong compile-time programming facilities, including compile-time function execution and related metaprogramming tools. This lets the compiler perform calculations, generate specialized code, validate assumptions, and adapt implementations before the final binary is produced.',
      'This is especially useful in domains where configuration, specialization, or generated structure can save large amounts of repetitive source code. It also means D programmers need to be thoughtful about when compile-time cleverness is improving the design and when it is only making it harder to read.',
    ],
  },
  {
    id: 'core-ranges-algorithms',
    title: 'Ranges And Algorithm Style',
    paragraphs: [
      'D is well known for its range-based approach to algorithms and data processing. Rather than writing every transformation as an index-heavy loop, D can express many operations through composable range pipelines and generic algorithms. This can make data transformation code more declarative without leaving the native-performance world.',
      'That style is powerful for text processing, pipelines, tooling, and library design, but it still requires judgment. A range pipeline should make logic clearer, not turn simple work into abstraction theater.',
    ],
  },
  {
    id: 'core-error-handling',
    title: 'Error Handling And Contracts',
    paragraphs: [
      'D offers multiple ways to deal with failure, including ordinary return-value-based design, exceptions in some styles, and contracts for expressing assumptions. The language is flexible, which means the engineering challenge is choosing a consistent model for a codebase rather than relying on one rigid default.',
      'This flexibility can be useful in mixed domains. A CLI tool, a library, and a low-latency subsystem may not all want the exact same failure-handling discipline. The cost is that teams must be explicit about their choices.',
    ],
  },
  {
    id: 'core-low-level-access',
    title: 'Low-Level Access And Systems Reach',
    paragraphs: [
      'D still gives programmers access to pointers, manual layout-sensitive data structures, explicit attributes, and system-facing APIs when necessary. This keeps the language relevant for native programming rather than limiting it to high-level convenience code.',
      'The important point is that the presence of higher-level features does not remove the low-level responsibilities. Performance-sensitive native code still depends on understanding allocation, lifetime, data layout, and ABI boundaries.',
    ],
  },
  {
    id: 'core-c-interop',
    title: 'C Interoperability',
    paragraphs: [
      'C interoperability is central to D\'s practicality. Native ecosystems are full of existing libraries, OS interfaces, embedded APIs, and long-lived C-facing contracts. D can interoperate with those systems, which makes gradual adoption far more realistic than an all-or-nothing rewrite strategy.',
      'This also helps explain D\'s niche value. Even when a team does not want to rewrite an entire platform, D can still be used for selected native components if the interop boundary is clear.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling, Builds, And Ecosystem',
    paragraphs: [
      'D has compilers, package tooling, and a standard-library ecosystem oriented toward native development, but the surrounding ecosystem is still smaller than those of more mainstream languages. That means the language can be quite capable technically while still facing practical adoption limits in large organizations.',
      'For individual developers and smaller teams, however, the tooling can still be productive because D lets them move across native programming tasks without the same level of boilerplate common in older native-language workflows.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'D is capable of strong native performance, especially when code is written with clear attention to allocation behavior, data layout, and algorithm choice. Its higher-level features do not prevent it from being used in serious performance-aware workloads.',
      'Still, the language\'s flexibility means performance outcomes depend heavily on how it is used. GC use, abstraction patterns, range design, and compile-time code generation can all improve or harm results depending on the workload.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where D Shines',
    paragraphs: [
      'D shines in native applications where developers want expressive compile-time tools, strong generic programming, and a smoother workflow than raw C++ often provides. It is especially attractive for compilers, scientific tools, high-performance utilities, native libraries, and advanced tooling.',
      'It also shines for engineers who want one language that can move between higher-level convenience and lower-level control without a complete context switch.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common D mistake is trying to use every advanced feature at once. Templates, ranges, compile-time execution, contracts, GC-backed convenience, and low-level escape hatches can each be valuable, but in combination they can also produce code that is harder to maintain than necessary.',
      'Another common problem is failing to make a deliberate memory policy. Because D is flexible, teams must decide where GC is acceptable, where deterministic control matters, and how to keep those boundaries understandable.',
    ],
    bullets: [
      'Overusing templates and compile-time tricks for simple problems.',
      'Letting hybrid memory choices become implicit and inconsistent.',
      'Assuming native performance automatically follows from native compilation.',
      'Building codebases with no clear style discipline across multiple paradigms.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-struct',
    title: 'Struct For Value-Oriented Data',
    description: [
      'D uses structs effectively for value-style data with predictable representation.',
    ],
    code: `struct User {
    int id;
    bool active;
    double score;
}`,
    notes: [
      'Structs are important in performance-aware D code.',
      'They make value semantics and layout-oriented design easier to express.',
    ],
  },
  {
    id: 'ex-class',
    title: 'Class For Reference-Oriented Objects',
    description: [
      'Classes remain available when reference semantics and object-oriented structure are the better fit.',
    ],
    code: `class Notifier {
    void send(string message) {
    }
}`,
    notes: [
      'D supports OOP, but not every problem needs a class hierarchy.',
      'The choice between struct and class has real semantic and performance consequences.',
    ],
  },
  {
    id: 'ex-template',
    title: 'Template Generic Function',
    description: [
      'Templates are a central part of reusable and specialized D code.',
    ],
    code: `T first(T)(T[] items) {
    return items[0];
}`,
    notes: [
      'This shows D\'s template-based generic style.',
      'Template power is one of the main reasons some engineers choose D.',
    ],
  },
  {
    id: 'ex-ctfe',
    title: 'Compile-Time Function Execution',
    description: [
      'Functions can be used at compile time when the arguments and context permit it.',
    ],
    code: `int square(int x) {
    return x * x;
}

enum sixteen = square(4);`,
    notes: [
      'This is a simple example of computation happening during compilation.',
      'Compile-time execution can eliminate repetitive constant or specialization work.',
    ],
  },
  {
    id: 'ex-range',
    title: 'Range-Based Transformation',
    description: [
      'D can express algorithm pipelines through ranges and standard library composition.',
    ],
    code: `auto result = [1, 2, 3, 4]
    .filter!(x => x % 2 == 0)
    .map!(x => x * 10);`,
    notes: [
      'This style is common in D code that values declarative transformation.',
      'It should remain readable rather than becoming overly clever.',
    ],
  },
  {
    id: 'ex-error',
    title: 'Direct Return-Based Failure',
    description: [
      'Not every D program needs exceptions for ordinary failure paths.',
    ],
    code: `bool tryParseInt(string text, out int value) {
    // simplified example
    value = 0;
    return true;
}`,
    notes: [
      'D is flexible enough to support direct result-oriented styles.',
      'Teams should choose consistent error-handling conventions.',
    ],
  },
  {
    id: 'ex-c-interop',
    title: 'C Interop Declaration',
    description: [
      'D can bind to C functions directly, which is important for native adoption.',
    ],
    code: `extern(C) int puts(const char* s);`,
    notes: [
      'Interop keeps existing native APIs usable.',
      'This is part of what makes D practical in mixed-language environments.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Struct',
        definition:
          'A value-oriented composite type in D, often used for predictable layout and efficient data representation.',
      },
      {
        term: 'Class',
        definition:
          'A reference-oriented object type in D used for object-oriented design patterns.',
      },
      {
        term: 'Template',
        definition:
          'A compile-time generic mechanism used to write reusable and specialized code.',
      },
      {
        term: 'Range',
        definition:
          'A composable sequence abstraction used heavily in D\'s algorithm style.',
      },
      {
        term: 'Compile-time function execution',
        definition:
          'The ability to run certain functions during compilation and use the result in generated code.',
      },
      {
        term: 'Attribute',
        definition:
          'A language annotation or modifier that influences compilation behavior, safety, calling conventions, or semantics.',
      },
      {
        term: 'Contract',
        definition:
          'A language feature used to express assumptions or invariants around functions and types.',
      },
      {
        term: 'Module',
        definition:
          'A source-level organization unit used to structure D programs and libraries.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Tooling Terms',
    terms: [
      {
        term: 'Garbage collector',
        definition:
          'The runtime component that can automatically reclaim unused heap memory in many D programs.',
      },
      {
        term: 'Native binary',
        definition:
          'A compiled executable that runs directly on the target operating system and architecture.',
      },
      {
        term: 'ABI',
        definition:
          'Application Binary Interface rules that control how compiled code interacts across binary boundaries.',
      },
      {
        term: 'FFI',
        definition:
          'Foreign Function Interface support for interacting with external native libraries such as C code.',
      },
      {
        term: 'Ahead-of-time compilation',
        definition:
          'Compilation that happens before execution to produce a deployable native artifact.',
      },
      {
        term: 'Runtime support',
        definition:
          'The library and execution machinery that may accompany D programs for features such as GC and other services.',
      },
      {
        term: 'Allocation policy',
        definition:
          'The practical strategy by which a program acquires and manages memory in different subsystems.',
      },
      {
        term: 'Performance-sensitive path',
        definition:
          'A code path where latency, throughput, allocation cost, or predictability materially affect system behavior.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Ecosystem And Architecture Terms',
    terms: [
      {
        term: 'C interop',
        definition:
          'The ability for D code to call and cooperate with C APIs and native libraries.',
      },
      {
        term: 'Generic library design',
        definition:
          'Building reusable abstractions that adapt across types and policies through templates.',
      },
      {
        term: 'Metaprogramming',
        definition:
          'Writing code that helps generate, specialize, or transform other code at compile time.',
      },
      {
        term: 'Hybrid memory model',
        definition:
          'A practical mix of GC-backed convenience and lower-level memory control within one language environment.',
      },
      {
        term: 'Systems-capable language',
        definition:
          'A language that can handle low-level native and performance-sensitive work even if it is not purely minimalistic.',
      },
      {
        term: 'Native deployment',
        definition:
          'Shipping compiled binaries directly to operating systems without relying on a virtual machine platform.',
      },
      {
        term: 'Template-heavy code',
        definition:
          'Codebases or libraries that rely strongly on generic compile-time specialization mechanisms.',
      },
      {
        term: 'Style discipline',
        definition:
          'The need to keep architectural and coding conventions coherent in a flexible multi-paradigm language.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-d', label: 'Why D Exists' },
    { id: 'bp-systems-context', label: 'Systems Context' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-design-style', label: 'Design Style' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-native-compilation', label: 'Native Compilation' },
    { id: 'core-memory-model', label: 'Memory Model' },
    { id: 'core-gc-vs-manual', label: 'GC vs Manual Control' },
    { id: 'core-structs-classes', label: 'Structs and Classes' },
    { id: 'core-templates', label: 'Templates' },
    { id: 'core-compile-time', label: 'Compile-Time Execution' },
    { id: 'core-ranges-algorithms', label: 'Ranges and Algorithms' },
    { id: 'core-error-handling', label: 'Error Handling' },
    { id: 'core-low-level-access', label: 'Low-Level Access' },
    { id: 'core-c-interop', label: 'C Interop' },
    { id: 'core-tooling', label: 'Tooling' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-struct', label: 'Struct' },
    { id: 'ex-class', label: 'Class' },
    { id: 'ex-template', label: 'Template' },
    { id: 'ex-ctfe', label: 'CTFE' },
    { id: 'ex-range', label: 'Range Pipeline' },
    { id: 'ex-error', label: 'Error Style' },
    { id: 'ex-c-interop', label: 'C Interop' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Ecosystem Terms' },
  ],
}

const pageStyles = `
.d98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.d98-help-window {
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.d98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
}

.d98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.d98-controls {
  display: flex;
  gap: 2px;
}

.d98-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 16px;
  padding: 0;
  background: #c0c0c0;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  color: #000000;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.d98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.d98-tab {
  padding: 5px 10px 4px;
  background: #b6b6b6;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  color: #000000;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.d98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.d98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.d98-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.d98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.d98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.d98-toc-item {
  margin: 0 0 8px;
}

.d98-toc-link {
  color: #000000;
  text-decoration: none;
  font-size: 12px;
}

.d98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.d98-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.d98-section {
  margin: 0 0 20px;
}

.d98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.d98-content p,
.d98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.d98-content p {
  margin: 0 0 10px;
}

.d98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.d98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.d98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.d98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .d98-main {
    grid-template-columns: 1fr;
  }

  .d98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .d98-titletext {
    max-width: calc(100% - 56px);
    white-space: normal;
    text-align: center;
    line-height: 1.1;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="d98-section">
      <h2 className="d98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="d98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="d98-section">
      <h2 className="d98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="d98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="d98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="d98-section">
      <h2 className="d98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="d98-divider" />}
    </section>
  )
}

export default function DPage(): JSX.Element {
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
    document.title = `D (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'D',
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
    <div className="d98-help-page">
      <style>{pageStyles}</style>
      <div className="d98-help-window" role="presentation">
        <header className="d98-titlebar">
          <span className="d98-titletext">D</span>
          <div className="d98-controls">
            <button className="d98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="d98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="d98-tabs" role="tablist" aria-label="D documentation sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`d98-tab ${activeTab === tab.id ? 'd98-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="d98-main">
          <aside className="d98-toc" aria-label="Table of contents">
            <h2 className="d98-toc-title">Contents</h2>
            <ul className="d98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="d98-toc-item">
                  <a href={`#${section.id}`} className="d98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="d98-content">
            <h1 className="d98-doc-title">D</h1>
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
          </main>
        </div>
      </div>
    </div>
  )
}
