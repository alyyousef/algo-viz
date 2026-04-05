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
  'Ada is a statically typed compiled language designed for reliability, maintainability, and correctness in systems where failure can be expensive or dangerous. It is strongly associated with safety-critical, real-time, embedded, aerospace, defense, transportation, and other high-assurance software domains where explicit interfaces, predictable behavior, and strong compile-time checking matter more than fashionable minimalism.',
  'The language matters because it represents a very different answer to systems programming than either low-level austerity or loose developer ergonomics. Ada aims to make large, long-lived, mission-critical software more dependable through strong typing, explicit package structure, concurrency support, contracts, controlled abstraction, and language features designed to reduce entire classes of programming errors.',
  'This page is intentionally thorough. It covers why Ada exists, how it fits into systems programming, strong typing, packages, tasking, real-time and embedded use, contracts, safety culture, interoperability, performance and predictability, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Ada is a systems-capable language built for software that has to keep working correctly over long operational lifetimes. It compiles to native code, supports direct interaction with system resources, and is especially valued in domains where correctness, traceability, and maintainability are engineering requirements rather than optional nice-to-haves.',
      'Its identity is shaped by reliability. Ada is not trying to be the smallest language, the most expressive metaprogramming language, or the most casual scripting environment. It is trying to make serious software easier to reason about and harder to break accidentally.',
    ],
  },
  {
    id: 'bp-why-ada',
    title: 'Why Ada Exists',
    paragraphs: [
      'Ada exists because some software systems need stronger correctness discipline than mainstream general-purpose languages traditionally provided. Military, aerospace, transportation, industrial, and other high-assurance environments needed languages that encouraged clear interfaces, compile-time checking, modular structure, and robust long-term maintenance.',
      'Its design therefore emphasizes explicitness and engineering discipline. Many Ada features make sense only when you view the language as a response to the cost of defects in critical systems rather than as a response to developer preference for brevity.',
    ],
    bullets: [
      'Reduce error rates in mission-critical and safety-critical software.',
      'Support long-lived maintainable systems with clear module boundaries.',
      'Encourage strong compile-time guarantees and explicit interfaces.',
      'Provide concurrency and systems features within a reliability-first design.',
    ],
  },
  {
    id: 'bp-systems-context',
    title: 'Systems Programming Context',
    paragraphs: [
      'Ada belongs in systems programming because it compiles to native code, works in embedded and real-time environments, interfaces with hardware-adjacent layers, and supports deterministic, resource-aware software engineering. It is especially relevant where software correctness is as important as raw performance or low-level reach.',
      'Unlike some systems languages, Ada does not center its identity on giving the programmer maximal freedom. Instead, it centers on giving the programmer disciplined tools for building reliable systems under strict operational constraints.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Ada Fits Best',
    paragraphs: [
      'Ada fits best in avionics, rail systems, defense platforms, industrial control, embedded controllers, real-time systems, certified software, and other environments where predictability, auditability, and maintainability dominate language-choice discussions. It is also useful in educational contexts focused on disciplined software design.',
      'It is less often chosen for mass-market web applications, startup-style product iteration, or ecosystems where hiring familiarity and gigantic package repositories outweigh safety-oriented design.',
    ],
    bullets: [
      'Safety-critical and mission-critical software.',
      'Real-time and embedded control systems.',
      'Long-lived systems requiring maintainability and traceability.',
      'Projects where correctness discipline matters more than fashionable ecosystem trends.',
    ],
  },
  {
    id: 'bp-design-style',
    title: 'Design Style',
    paragraphs: [
      'Ada is intentionally explicit and structured. The language emphasizes packages, specifications, bodies, strong typing, constrained data representation, and visible interfaces. This can feel verbose compared with more casual languages, but the verbosity usually serves a design purpose.',
      'The style is less about cleverness and more about making intent, boundaries, and correctness properties obvious. In high-assurance work, that is often a feature rather than a burden.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      'Ada\'s biggest strengths are strong typing, modular clarity, high-assurance culture, built-in concurrency support, real-time suitability, and a design that aligns well with verification and certification-heavy environments. Many classes of mistakes that slip easily through looser languages are harder to express casually in Ada.',
      'Another major strength is maintainability. Ada code can remain understandable for years because the language encourages stable interfaces, explicit contracts, and disciplined structure rather than relying on convention alone.',
    ],
    bullets: [
      'Strong compile-time guarantees and type discipline.',
      'Clear package-based modularity.',
      'Good fit for certified, audited, or verified systems.',
      'Built-in support for tasking and real-time-oriented design.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'Ada has real tradeoffs. It is more verbose than many modern languages, the ecosystem is smaller than mainstream general-purpose platforms, and some teams find its discipline-heavy style slower for exploratory or rapidly changing product work. Its adoption is also constrained by training and familiarity.',
      'These limits are not accidental. They reflect the language\'s priorities. Ada is optimized for correctness and maintainability under serious constraints, not for maximizing developer spontaneity in casual software contexts.',
    ],
    bullets: [
      'Smaller ecosystem and hiring pool than mainstream languages.',
      'More explicit and verbose than many developer-convenience-focused languages.',
      'Can feel heavy for fast-moving non-critical product work.',
      'Best practices are tightly tied to domains that already value high assurance.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that Ada is a language for software that has to deserve trust. It is designed to make important properties explicit and to reduce ambiguity in how systems are structured and reviewed.',
      'Good Ada code is clear, disciplined, and specification-driven. Bad Ada code tries to mimic looser programming cultures while ignoring the design strengths the language provides.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'Ada syntax is explicit, keyword-heavy, and structured. It is designed to be readable in a large-system engineering context rather than optimized for terseness. Declarations, package boundaries, type definitions, and control flow are usually written in a way that favors clarity over compression.',
      'This can look old-fashioned to developers used to highly compact languages, but it is consistent with Ada\'s purpose. The language wants important decisions to be visible.',
    ],
  },
  {
    id: 'core-strong-typing',
    title: 'Strong Typing',
    paragraphs: [
      'Strong typing is one of Ada\'s defining ideas. Distinct types are treated seriously, and the compiler can enforce boundaries that prevent accidental mixing of values representing different concepts. This is especially important in high-assurance systems where unit confusion, range mistakes, and interface misuse can have real operational consequences.',
      'The value of this approach is not theoretical elegance alone. It is practical defect prevention. The more meaning encoded in the type system, the fewer unchecked assumptions remain hidden in runtime behavior.',
    ],
  },
  {
    id: 'core-subtypes-ranges',
    title: 'Subtypes, Ranges, And Constraints',
    paragraphs: [
      'Ada allows constrained subtypes and range declarations, which let programmers express legal value sets directly in the type model. This helps catch invalid states earlier and documents domain assumptions clearly in the source.',
      'In systems work, this is powerful because many bugs come from values that should never have been legal in the first place. Ada encourages developers to make those boundaries explicit.',
    ],
  },
  {
    id: 'core-packages',
    title: 'Packages, Specifications, And Bodies',
    paragraphs: [
      'Packages are central to Ada organization. A package specification describes the visible contract, while the package body provides the implementation details. This separation encourages stable interfaces, clear encapsulation, and code review discipline.',
      'The distinction matters because large reliable systems depend on boundary clarity. Ada makes interface design part of the language architecture rather than leaving it mostly to convention.',
    ],
  },
  {
    id: 'core-records-abstraction',
    title: 'Records, Encapsulation, And Abstraction',
    paragraphs: [
      'Ada supports structured data through records and broader abstraction mechanisms through packages and typed interfaces. The language can express procedural, modular, and object-oriented styles, but it usually shines most when the design is disciplined and explicit rather than excessively clever.',
      'This is another place where Ada differs from feature-showcase languages. Its abstractions are meant to support reliability and maintainability more than novelty.',
    ],
  },
  {
    id: 'core-tasking',
    title: 'Tasking And Concurrency',
    paragraphs: [
      'Ada includes built-in language-level support for concurrency through tasking. This is historically important because concurrency in reliable real-time systems is not an optional add-on. It needs strong semantics and predictable engineering models.',
      'Tasking lets Ada express concurrent activities directly in the language, and related features help structure synchronization and inter-task coordination in a way that aligns with high-assurance system design.',
    ],
  },
  {
    id: 'core-real-time',
    title: 'Real-Time And Embedded Suitability',
    paragraphs: [
      'Ada is especially respected in real-time and embedded domains where deadlines, determinism, bounded behavior, and certification concerns are part of the engineering reality. The language and its ecosystem have long been used in such environments.',
      'This does not mean every Ada program is automatically real-time safe. It means the language was designed with those constraints in mind instead of treating them as unusual corner cases.',
    ],
  },
  {
    id: 'core-contracts',
    title: 'Contracts And Correctness Features',
    paragraphs: [
      'Ada supports correctness-oriented features such as assertions, contracts, and explicit interface constraints. These features help encode assumptions directly in the program so that design intent is easier to verify and violations are easier to detect.',
      'This matters in assurance-heavy software because documentation separated from executable behavior is often not enough. Contracts help move design rules into the code itself.',
    ],
  },
  {
    id: 'core-memory-predictability',
    title: 'Memory, Predictability, And Runtime Discipline',
    paragraphs: [
      'Ada is often used in contexts where predictability matters as much as raw speed. That means developers care about allocation behavior, bounded resource use, determinism, and runtime predictability rather than only average-case convenience.',
      'The language itself does not make engineering tradeoffs disappear, but it encourages the sort of explicit design that makes those tradeoffs easier to evaluate in critical systems.',
    ],
  },
  {
    id: 'core-interoperability',
    title: 'Interoperability And Systems Reach',
    paragraphs: [
      'Ada can interoperate with lower-level and external systems, including C, which is important in mixed-language environments and long-lived platforms. High-assurance software often cannot afford total rewrites, so practical interoperation is essential.',
      'This also reinforces Ada\'s role as a real systems language rather than only a theoretical safe language. It must survive in operational environments with existing ABIs, hardware interfaces, and legacy boundaries.',
    ],
  },
  {
    id: 'core-tooling-certification',
    title: 'Tooling, Verification, And Certification Culture',
    paragraphs: [
      'Ada is strongly associated with rigorous engineering workflows, including static analysis, formal reasoning, testing discipline, and certification-heavy development processes. The language makes more sense when seen inside that broader culture of software assurance.',
      'This is a major difference from ecosystems that optimize mostly for fast product iteration. Ada often appears where auditability, traceability, and review evidence are part of the deliverable.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'Ada can deliver strong native performance, and it is widely used in environments where runtime efficiency matters. However, the more important question in many Ada deployments is predictable performance under constraints, not just peak throughput on a benchmark.',
      'That distinction matters. In control and safety systems, timing behavior, bounded latency, and reliable execution often matter more than language-level micro-optimizations alone.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where Ada Shines',
    paragraphs: [
      'Ada shines where software failures are expensive, dangerous, or operationally unacceptable. It is especially strong in avionics, rail, industrial control, defense, satellite software, embedded controllers, and other domains where engineering teams need language support for disciplined correctness.',
      'It also shines in long-lived systems where maintainability across years or decades matters. Ada code is often designed to remain understandable long after the original authors have moved on.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common Ada mistake is treating its explicitness as mere verbosity instead of using it to encode real design meaning. Another is assuming that because the language supports safer engineering, process discipline no longer matters. High-assurance software still depends on architecture, review, testing, and operational clarity.',
      'Teams can also misuse Ada by forcing lightweight exploratory product habits into a language and ecosystem optimized for disciplined system design. The strongest Ada projects work with the language\'s intent rather than against it.',
    ],
    bullets: [
      'Ignoring the value of strong types and constrained subtypes.',
      'Using Ada without the design discipline its ecosystem expects.',
      'Treating package specifications as paperwork instead of core interface contracts.',
      'Applying Ada in domains that do not benefit enough from its assurance-oriented tradeoffs.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-subtype',
    title: 'Subtype Constraint',
    description: [
      'Ada can encode legal value ranges directly in the type model rather than relying only on comments or runtime hope.',
    ],
    code: `subtype Percentage is Integer range 0 .. 100;`,
    notes: [
      'This makes invalid states harder to express casually.',
      'Range constraints are part of Ada\'s correctness-oriented design style.',
    ],
  },
  {
    id: 'ex-record',
    title: 'Record For Structured Data',
    description: [
      'Records are the ordinary structured-data mechanism in Ada and are central to explicit system modeling.',
    ],
    code: `type Sensor_Data is record
   Temperature : Float;
   Pressure    : Float;
end record;`,
    notes: [
      'This style favors clear data structure definitions.',
      'Ada records are often part of highly disciplined interface design.',
    ],
  },
  {
    id: 'ex-package',
    title: 'Package Specification Shape',
    description: [
      'Ada separates visible interface from implementation through package specifications and bodies.',
    ],
    code: `package Math_Utils is
   function Add (A, B : Integer) return Integer;
end Math_Utils;`,
    notes: [
      'The package specification is a first-class interface contract.',
      'This separation supports maintenance and review discipline.',
    ],
  },
  {
    id: 'ex-task',
    title: 'Task Declaration',
    description: [
      'Concurrency is a built-in language concern in Ada rather than only an external library story.',
    ],
    code: `task type Worker;`,
    notes: [
      'Tasking is central to Ada\'s role in real-time and concurrent control systems.',
      'This reflects the language\'s systems and assurance roots.',
    ],
  },
  {
    id: 'ex-contract',
    title: 'Precondition Contract',
    description: [
      'Contracts help move design assumptions into executable declarations.',
    ],
    code: `function Divide (A, B : Integer) return Integer
  with Pre => B /= 0;`,
    notes: [
      'This makes an important correctness rule explicit at the interface boundary.',
      'Contracts support review, testing, and reasoning about behavior.',
    ],
  },
  {
    id: 'ex-strong-type',
    title: 'Distinct Domain Type',
    description: [
      'Ada encourages giving domain concepts explicit types rather than mixing values loosely.',
    ],
    code: `type Altitude_Meters is new Integer;`,
    notes: [
      'This helps prevent semantic confusion across different measurement concepts.',
      'Strong domain typing is one of Ada\'s most practical strengths.',
    ],
  },
  {
    id: 'ex-c-interop',
    title: 'C Interoperability Hint',
    description: [
      'Ada can still interact with external native ecosystems when system boundaries require it.',
    ],
    code: `pragma Import (C, External_Function, "external_function");`,
    notes: [
      'Interop keeps Ada practical in mixed-language systems.',
      'This matters in long-lived platforms where total rewrites are unrealistic.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Subtype',
        definition:
          'A constrained or specialized view of an existing type used to encode stricter legal values.',
      },
      {
        term: 'Record',
        definition:
          'A structured data type in Ada used to group related fields explicitly.',
      },
      {
        term: 'Package',
        definition:
          'A modular Ada unit used to organize interfaces and implementations.',
      },
      {
        term: 'Package specification',
        definition:
          'The visible interface contract of an Ada package.',
      },
      {
        term: 'Package body',
        definition:
          'The implementation portion of an Ada package that realizes the specification.',
      },
      {
        term: 'Task',
        definition:
          'An Ada concurrency construct representing a concurrent unit of execution.',
      },
      {
        term: 'Contract',
        definition:
          'An executable condition such as a precondition or postcondition used to encode design assumptions.',
      },
      {
        term: 'Strong typing',
        definition:
          'A language discipline in which distinct concepts remain distinct to the compiler rather than mixing freely.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Systems Terms',
    terms: [
      {
        term: 'Real-time system',
        definition:
          'A system where correctness depends not only on results but also on meeting timing constraints.',
      },
      {
        term: 'Embedded system',
        definition:
          'Software running within a constrained device or control environment, often with hardware-specific responsibilities.',
      },
      {
        term: 'Determinism',
        definition:
          'The property that behavior and timing remain predictable under defined conditions.',
      },
      {
        term: 'Native binary',
        definition:
          'A compiled executable that runs directly on the target platform without a virtual machine requirement.',
      },
      {
        term: 'Bounded behavior',
        definition:
          'Execution characteristics that stay within known limits important to real-time and safety analysis.',
      },
      {
        term: 'Concurrency semantics',
        definition:
          'The language-defined rules by which concurrent execution and coordination behave.',
      },
      {
        term: 'Static analysis',
        definition:
          'Analysis performed without running the program, often used heavily in high-assurance development.',
      },
      {
        term: 'Certification',
        definition:
          'A formal process of demonstrating that software meets required standards for a regulated domain.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Engineering And Assurance Terms',
    terms: [
      {
        term: 'Safety-critical software',
        definition:
          'Software whose failure could cause injury, loss of life, or severe system damage.',
      },
      {
        term: 'Mission-critical software',
        definition:
          'Software whose failure would seriously compromise essential operations.',
      },
      {
        term: 'Traceability',
        definition:
          'The ability to map requirements, design, implementation, tests, and evidence across the lifecycle.',
      },
      {
        term: 'Auditability',
        definition:
          'The degree to which software artifacts and behavior can be inspected and justified rigorously.',
      },
      {
        term: 'Verification culture',
        definition:
          'An engineering environment that treats proof, analysis, and explicit correctness evidence as core practice.',
      },
      {
        term: 'Interface discipline',
        definition:
          'The practice of designing and preserving clear, explicit contracts between software units.',
      },
      {
        term: 'High assurance',
        definition:
          'A development goal emphasizing strong evidence that a system behaves correctly under defined conditions.',
      },
      {
        term: 'Mixed-language system',
        definition:
          'A system where Ada code interoperates with other languages such as C across defined boundaries.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-ada', label: 'Why Ada Exists' },
    { id: 'bp-systems-context', label: 'Systems Context' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-design-style', label: 'Design Style' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-strong-typing', label: 'Strong Typing' },
    { id: 'core-subtypes-ranges', label: 'Subtypes and Ranges' },
    { id: 'core-packages', label: 'Packages' },
    { id: 'core-records-abstraction', label: 'Records and Abstraction' },
    { id: 'core-tasking', label: 'Tasking' },
    { id: 'core-real-time', label: 'Real-Time Suitability' },
    { id: 'core-contracts', label: 'Contracts' },
    { id: 'core-memory-predictability', label: 'Memory and Predictability' },
    { id: 'core-interoperability', label: 'Interoperability' },
    { id: 'core-tooling-certification', label: 'Tooling and Certification' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-subtype', label: 'Subtype' },
    { id: 'ex-record', label: 'Record' },
    { id: 'ex-package', label: 'Package Spec' },
    { id: 'ex-task', label: 'Task' },
    { id: 'ex-contract', label: 'Contract' },
    { id: 'ex-strong-type', label: 'Distinct Type' },
    { id: 'ex-c-interop', label: 'C Interop' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Engineering Terms' },
  ],
}

const pageStyles = `
.ada98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ada98-help-window {
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

.ada98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
}

.ada98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.ada98-controls {
  display: flex;
  gap: 2px;
}

.ada98-control {
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

.ada98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.ada98-tab {
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

.ada98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.ada98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.ada98-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.ada98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.ada98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ada98-toc-item {
  margin: 0 0 8px;
}

.ada98-toc-link {
  color: #000000;
  text-decoration: none;
  font-size: 12px;
}

.ada98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.ada98-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.ada98-section {
  margin: 0 0 20px;
}

.ada98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.ada98-content p,
.ada98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.ada98-content p {
  margin: 0 0 10px;
}

.ada98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.ada98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.ada98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.ada98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .ada98-main {
    grid-template-columns: 1fr;
  }

  .ada98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .ada98-titletext {
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
    <section key={section.id} id={section.id} className="ada98-section">
      <h2 className="ada98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="ada98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ada98-section">
      <h2 className="ada98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="ada98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="ada98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ada98-section">
      <h2 className="ada98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="ada98-divider" />}
    </section>
  )
}

export default function AdaPage(): JSX.Element {
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
    document.title = `Ada (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Ada',
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
    <div className="ada98-help-page">
      <style>{pageStyles}</style>
      <div className="ada98-help-window" role="presentation">
        <header className="ada98-titlebar">
          <span className="ada98-titletext">Ada</span>
          <div className="ada98-controls">
            <button className="ada98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="ada98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="ada98-tabs" role="tablist" aria-label="Ada documentation sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ada98-tab ${activeTab === tab.id ? 'ada98-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ada98-main">
          <aside className="ada98-toc" aria-label="Table of contents">
            <h2 className="ada98-toc-title">Contents</h2>
            <ul className="ada98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="ada98-toc-item">
                  <a href={`#${section.id}`} className="ada98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="ada98-content">
            <h1 className="ada98-doc-title">Ada</h1>
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
