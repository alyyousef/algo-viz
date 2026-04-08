import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
const LANGUAGES_BASE_ROUTE = '/dsa/0-languages-and-ecosystems'

const overviewSections = [
  {
    title: 'What this section is',
    body: 'Languages & Ecosystems is the part of the roadmap that explains how programming languages, runtime models, frameworks, data systems, and surrounding tooling fit together as an engineering landscape. It is not only about syntax. It is about execution semantics, abstraction boundaries, deployment assumptions, ecosystem gravity, and the tradeoffs that shape how code behaves in practice.',
  },
  {
    title: 'Why this section matters',
    body: 'Most engineering decisions are not made at the level of a single algorithm. They are made inside an ecosystem. Whether you are choosing a systems language, a managed runtime, a frontend framework, a mobile stack, or a cloud platform, the important questions include memory model, compilation pipeline, package culture, debugging support, performance envelope, and operational constraints.',
  },
  {
    title: 'What this section teaches',
    body: 'This section teaches classification. When you encounter a technology, you should be able to place it by language level, execution model, paradigm, runtime expectations, and ecosystem strengths. Once you can do that, the common strengths, limits, and likely use cases become much easier to predict without relying on marketing labels.',
  },
  {
    title: 'How to study it',
    body: 'Treat each subsection as a lens on one recurring dimension of software design. Language Levels explains abstraction. Execution Models explains how code turns into running behavior. Paradigms explains how problems are structured mentally. Frameworks, platforms, databases, web technologies, and AI tooling explain how language choices become whole development environments.',
  },
]

const whyItMatters = [
  'It explains why two tools that appear to solve the same problem can feel radically different in correctness, ergonomics, and performance.',
  'It teaches how runtime and deployment constraints shape language and framework choices long before feature work begins.',
  'It connects abstraction level to real costs such as memory visibility, startup time, tooling overhead, and portability.',
  'It gives you a vocabulary for evaluating ecosystems rather than comparing technologies by popularity alone.',
  'It helps you predict where a technology fits well and where it will fight the problem instead of helping solve it.',
]

const historicalContext = [
  {
    title: 'Languages began as machine-adjacent tools',
    detail:
      'Early programming was tightly coupled to hardware and instruction encoding. Assembly and low-level systems work made control explicit but imposed heavy cognitive cost. Higher-level languages emerged to trade raw control for productivity, safety, portability, and maintainability.',
  },
  {
    title: 'Execution models diversified as hardware and workloads changed',
    detail:
      'Compilation, interpretation, virtual machines, JIT execution, and managed runtimes did not emerge as academic variations. They emerged because software needed different balances of startup speed, optimization potential, safety, introspection, and portability.',
  },
  {
    title: 'Frameworks and platforms turned languages into ecosystems',
    detail:
      'As applications became more complex, value shifted from language syntax alone to package managers, build pipelines, UI toolkits, backend frameworks, cloud platforms, database connectors, and deployment workflows. The ecosystem became part of the programming model.',
  },
  {
    title: 'Modern engineering is ecosystem selection as much as coding',
    detail:
      'Teams now choose stacks based not only on language preference but on hiring, observability, mobile reach, AI integration, package maturity, interop, compliance, and long-term maintenance characteristics. The ecosystem decision often dominates the local language decision.',
  },
]

const sectionSurvey = [
  {
    heading: 'Foundations of Language Design',
    items: [
      {
        name: 'Language Levels',
        summary:
          'Explains abstraction levels from low-level machine-oriented programming to high-level expressive environments, and how control, safety, and productivity shift along that spectrum.',
      },
      {
        name: 'Execution Models',
        summary:
          'Covers compilation, interpretation, bytecode VMs, JIT execution, and runtime architecture so you can reason about startup, portability, optimization, and tooling behavior.',
      },
      {
        name: 'Paradigms',
        summary:
          'Maps the major ways software can be structured mentally: imperative, object-oriented, functional, declarative, reactive, and more.',
      },
    ],
  },
  {
    heading: 'Language Families',
    items: [
      {
        name: 'Systems Languages',
        summary:
          'Focuses on languages used where memory layout, latency, concurrency control, and resource ownership are part of the job rather than implementation details to ignore.',
      },
      {
        name: 'Object-Oriented Languages',
        summary:
          'Examines class-based ecosystems, inheritance models, interfaces, runtime dispatch, tooling culture, and the tradeoffs of large-scale enterprise application development.',
      },
    ],
  },
  {
    heading: 'Ecosystems and Delivery Stacks',
    items: [
      {
        name: 'Frameworks',
        summary:
          'Shows how frameworks provide conventions, lifecycle rules, state models, and integration surfaces that drastically alter developer workflow and architecture.',
      },
      {
        name: 'Platforms & Cloud',
        summary:
          'Organizes the runtime environments and managed services where applications are deployed, scaled, integrated, and observed.',
      },
      {
        name: 'Databases & Storage',
        summary:
          'Connects language ecosystems to persistence models, query interfaces, indexes, transactional semantics, and operational data tradeoffs.',
      },
      {
        name: 'Mobile Development',
        summary:
          'Covers native and cross-platform ecosystems, packaging, performance budgets, deployment constraints, and device integration concerns.',
      },
      {
        name: 'Web Technologies',
        summary:
          'Explains the browser and web platform as a layered ecosystem of protocols, standards, rendering models, bundlers, and frontend architecture choices.',
      },
      {
        name: 'AI & ML Tools',
        summary:
          'Surveys the programming environments, libraries, and workflow tooling used when software is shaped by models, data pipelines, experimentation, and inference serving.',
      },
      {
        name: 'Comparisons',
        summary:
          'Provides explicit side-by-side analysis so that tradeoffs become concrete rather than impressionistic.',
      },
    ],
  },
]

const ecosystemThemes = [
  {
    title: 'Abstraction is a trade, not a free upgrade',
    body: 'Higher-level tools reduce incidental complexity, but they also hide costs. Garbage collection, runtime reflection, distributed build systems, hot reload, cloud-managed state, and framework conventions all create leverage while introducing new performance, debugging, or operational surfaces.',
  },
  {
    title: 'Execution details still matter even in high-level stacks',
    body: 'Developers eventually pay for what the runtime is doing. Startup latency, JIT warmup, allocation pressure, async scheduling, serialization cost, browser event loops, and package resolution all shape the user-visible system even when the language tries to hide those mechanics.',
  },
  {
    title: 'Ecosystem maturity changes what "good design" means',
    body: 'A language with weak packages, fragile tooling, or limited observability may be theoretically elegant and still be a poor team choice. Conversely, a less pure language can dominate because its ecosystem makes delivery, debugging, and integration reliable.',
  },
  {
    title: 'Interoperability and lock-in are first-order concerns',
    body: 'Technology choices affect file formats, build pipelines, deployment targets, library compatibility, team mobility, and long-term maintenance. The cost of entering an ecosystem is usually much smaller than the cost of leaving it later.',
  },
]

const keyTakeaways = [
  'Languages are best understood as part of ecosystems, not as isolated syntax choices.',
  'Execution model, abstraction level, and paradigm strongly predict the behavior and tradeoffs of a stack.',
  'Frameworks and platforms encode architectural opinions that change how applications are built and maintained.',
  'Tooling, observability, and package culture often matter as much as raw language features.',
  'The best choice depends on workload, team constraints, deployment targets, and long-term maintenance goals rather than prestige or trendiness.',
]

const topicSignals = [
  {
    title: 'Choose Language Levels when the question is about control versus abstraction',
    body: 'If the real issue is how close software is to hardware, memory layout, manual control, portability, or expressive power, then you are asking a language-level question rather than a framework question.',
  },
  {
    title: 'Choose Execution Models when runtime behavior is the mystery',
    body: 'If you need to understand why code starts slowly, warms up over time, debugs differently, packages in a certain way, or runs consistently across platforms, you are probably in execution-model territory.',
  },
  {
    title: 'Choose Paradigms when structure and mental model drive design',
    body: 'If the important difference lies in how state, effects, composition, and control flow are expressed, then the useful lens is paradigm rather than implementation detail.',
  },
  {
    title: 'Choose ecosystem subsections when delivery shape matters more than syntax',
    body: 'If the problem is how to build, test, deploy, scale, observe, or integrate a system, then frameworks, cloud platforms, databases, web technologies, or mobile stacks are usually the more informative categories.',
  },
  {
    title: 'Choose Comparisons when two tools look similar on the surface',
    body: 'Comparisons are most useful when the user story sounds identical but the underlying tradeoffs differ, such as bundler philosophy, runtime overhead, concurrency model, or package maturity.',
  },
]

const coreFoundations = [
  {
    title: 'Abstraction level',
    body: 'Every ecosystem lives somewhere on a spectrum from direct machine control to highly managed expressive environments. That position affects memory visibility, predictability, ergonomics, and how much machinery stands between source code and runtime behavior.',
  },
  {
    title: 'Execution pipeline',
    body: 'Source code does not run directly. It is compiled, interpreted, transformed, bundled, optimized, loaded, and scheduled. A strong understanding of that pipeline explains performance cliffs, debugging behavior, binary size, startup cost, and deployment portability.',
  },
  {
    title: 'Paradigm and state management',
    body: 'Imperative, object-oriented, functional, reactive, and dataflow styles impose different defaults for modeling state, mutation, composition, and side effects. The paradigm influences how teams structure complexity before any library is imported.',
  },
  {
    title: 'Ecosystem surfaces',
    body: 'A real stack includes package management, build tools, test runners, deployment patterns, editor integration, monitoring, documentation quality, and community norms. These surfaces determine how much friction a team feels after the first tutorial ends.',
  },
  {
    title: 'Operational fit',
    body: 'The right ecosystem depends on target devices, latency budgets, scaling model, offline requirements, security posture, compliance needs, and available expertise. Elegant local code can still be a poor organizational fit.',
  },
]

const tradeoffThemes = [
  {
    title: 'Control versus safety',
    body: 'Systems languages often expose memory and concurrency details directly, enabling precision and performance while demanding stronger discipline. Managed ecosystems reduce classes of failure but introduce runtime policies and indirection.',
  },
  {
    title: 'Static guarantees versus dynamic flexibility',
    body: 'Strong type systems and ahead-of-time validation can prevent whole categories of defects, but highly dynamic environments often make experimentation, scripting, reflection, and rapid iteration easier. The right balance depends on the workload and failure cost.',
  },
  {
    title: 'Convention versus customization',
    body: "Framework-heavy ecosystems accelerate teams by standardizing project structure, lifecycle, and integration patterns. The price is reduced freedom and occasional friction when your problem no longer fits the framework's assumptions.",
  },
  {
    title: 'Portability versus specialization',
    body: 'Cross-platform stacks and cloud-managed services widen reach and reduce operational burden, but specialized native or low-level approaches may win when hardware access, latency, or platform-specific behavior is central to the product.',
  },
  {
    title: 'Velocity versus long-term maintenance',
    body: 'A stack that is fast to prototype in may become difficult to evolve if typing, testing, packaging, observability, or dependency hygiene are weak. Conversely, some ecosystems feel slower initially because they make future maintenance more predictable.',
  },
]

const comparisons = [
  {
    title: 'Language levels versus execution models',
    body: 'Language level describes how abstract the programming interface is. Execution model describes how programs become running behavior. They are related but not identical. A high-level language may still compile ahead of time, and a low-level-friendly language may still rely on a managed runtime in some contexts.',
  },
  {
    title: 'Paradigm versus framework',
    body: 'Paradigm is the conceptual style of programming. Framework is the operational structure imposed by a toolset. Functional ideas can appear inside object-oriented languages, and imperative frameworks can exist inside ecosystems with declarative marketing.',
  },
  {
    title: 'Systems languages versus object-oriented enterprise stacks',
    body: 'Systems ecosystems tend to prioritize memory control, predictability, and low-level interop. Enterprise OOP stacks often prioritize abstraction, tooling, dependency injection, long-running service patterns, and maintainability across large teams.',
  },
  {
    title: 'Frameworks versus platforms',
    body: 'Frameworks shape application code structure. Platforms shape where and how that code runs. The distinction matters because a great framework on the wrong platform still fails the workload.',
  },
  {
    title: 'Databases and storage versus web technologies',
    body: 'Both are major ecosystem layers, but one is centered on persistence, querying, and durability, while the other is centered on delivery, rendering, browser capability, and client-server interaction.',
  },
]

const failureModes = [
  {
    title: 'Choosing by popularity alone',
    body: 'A technology can be widely adopted and still be wrong for the latency budget, deployment target, team skill set, or compliance requirements of the actual problem.',
  },
  {
    title: 'Ignoring the runtime',
    body: 'Teams often compare syntax while neglecting startup cost, garbage collection, package resolution, bundle size, memory residency, thread model, or browser constraints. Those hidden runtime traits frequently dominate production behavior.',
  },
  {
    title: 'Confusing ecosystem strength with language purity',
    body: 'The most intellectually elegant language is not always the best engineering choice if its tooling, package support, deployment story, or debugging experience are weak for the problem at hand.',
  },
  {
    title: 'Underestimating migration and lock-in costs',
    body: 'Switching frameworks, cloud providers, data stores, or mobile stacks can be vastly more expensive than the initial choice suggests. Teams often focus on adoption cost and ignore exit cost.',
  },
  {
    title: 'Solving the wrong layer',
    body: 'Some problems are not best solved by switching languages. They may actually be execution-model issues, packaging issues, architectural issues, or platform issues. The right diagnosis has to happen before the technology choice.',
  },
]

const studyChecklist = [
  'Identify whether the main question is about abstraction level, execution model, paradigm, or ecosystem delivery.',
  'Name the real constraint: latency, memory, portability, UI model, deployment surface, interoperability, or team velocity.',
  'Check what the runtime is actually doing before comparing syntax or feature lists.',
  'Account for tooling, observability, package maturity, and onboarding cost alongside raw language features.',
  'Evaluate lock-in and migration cost, not just initial convenience.',
  'Match the stack to the workload and organization, not to generic hype.',
]

const examples = [
  {
    id: 'lang98-compile-pipeline',
    title: 'Example: Execution pipeline from source to runtime',
    area: 'Execution Models',
    intro:
      'Many ecosystem choices become clearer once you see the path from source code to running program. Compilation, bundling, packaging, and runtime loading all introduce tradeoffs in startup, optimization, tooling, and portability.',
    whyFit:
      'This example shows that execution model is a systems property of the toolchain, not just a fact printed in a language brochure.',
    code: `source files
  -> parser and type checker
  -> compiler or transpiler
  -> linker or bundler
  -> artifact (binary, bytecode, bundle, package)
  -> loader or runtime
  -> executing process`,
    takeaway:
      'A language ecosystem is partly defined by how many stages exist between authoring and execution, and what each stage makes possible or expensive.',
  },
  {
    id: 'lang98-framework-lifecycle',
    title: 'Example: Framework lifecycle shaping application code',
    area: 'Frameworks',
    intro:
      'Frameworks do more than offer utility functions. They decide when code runs, how state is initialized, how requests are handled, what gets rendered, and where side effects are legal.',
    whyFit:
      'This example captures why framework choice changes architecture even when the underlying language stays the same.',
    code: `request arrives
  -> framework router resolves handler
  -> middleware chain enriches context
  -> controller or endpoint executes
  -> state and data dependencies resolve
  -> response or rendered UI is produced`,
    takeaway:
      'A framework is an inversion-of-control system. Its lifecycle rules become part of the application design language.',
  },
  {
    id: 'lang98-storage-path',
    title: 'Example: Language ecosystem meeting a storage system',
    area: 'Databases & Storage',
    intro:
      'Application code rarely touches durable data directly. It moves through adapters, query builders, drivers, network calls, caches, transaction boundaries, and storage-engine semantics.',
    whyFit:
      'This example shows that data-layer behavior belongs to the ecosystem discussion because language ergonomics alone do not determine persistence correctness or performance.',
    code: `application request
  -> domain logic
  -> query builder or ORM
  -> driver protocol
  -> database planner and executor
  -> storage engine and indexes
  -> durable state change or result set`,
    takeaway:
      'A productive language stack can still create slow or unsafe systems if the persistence layer is misunderstood or mismatched.',
  },
  {
    id: 'lang98-mobile-shared-core',
    title: 'Example: Cross-platform mobile architecture',
    area: 'Mobile Development',
    intro:
      'Cross-platform stacks promise reuse, but the architecture still has to separate shared business logic from platform-native integrations such as camera access, notifications, storage permissions, and background execution.',
    whyFit: 'This example clarifies the practical boundary between portability and specialization.',
    code: `shared UI and business logic
  -> cross-platform runtime layer
  -> platform bridge
  -> native APIs on iOS and Android
  -> device services and operating system behavior`,
    takeaway:
      'Portability is never total. The real design question is how much of the stack can stay shared without fighting platform reality.',
  },
  {
    id: 'lang98-ai-tooling',
    title: 'Example: AI and ML tooling workflow',
    area: 'AI & ML Tools',
    intro:
      'Model-centric software adds a workflow that ordinary application stacks often do not need: dataset versioning, training jobs, experiment tracking, artifact storage, evaluation, and inference serving.',
    whyFit:
      'This example explains why AI tooling belongs in a languages-and-ecosystems survey rather than being treated as a separate unrelated universe.',
    code: `data ingest
  -> preprocessing pipeline
  -> training or fine-tuning job
  -> experiment tracking
  -> model artifact registry
  -> evaluation and approval
  -> deployment for inference`,
    takeaway:
      'The ecosystem expands when models become part of the product. Tooling and reproducibility become first-class engineering concerns.',
  },
  {
    id: 'lang98-web-stack',
    title: 'Example: Web platform request and rendering path',
    area: 'Web Technologies',
    intro:
      'Web ecosystems combine protocol, browser runtime, build tooling, rendering, hydration, caching, and API boundaries. This is why frontend architecture choices are never just about component syntax.',
    whyFit:
      'This example ties together browser constraints, server delivery, and framework behavior in one flow.',
    code: `user navigation
  -> DNS and HTTP request
  -> server response or static asset
  -> browser parses HTML, CSS, and JavaScript
  -> framework hydrates or renders UI
  -> user interaction triggers state updates and network calls`,
    takeaway:
      'Web development is a layered ecosystem problem involving network, runtime, rendering, and tooling choices simultaneously.',
  },
]

const glossary = [
  {
    term: 'Abstraction level',
    definition:
      'The degree to which a language or tool hides hardware and execution details from the programmer.',
  },
  {
    term: 'Ahead-of-time compilation',
    definition:
      'Compilation that happens before program execution, typically producing a binary or deployable artifact.',
  },
  {
    term: 'Bundler',
    definition:
      'A tool that resolves modules and packages source assets into deployable output, often for the web.',
  },
  {
    term: 'Ecosystem',
    definition:
      'The surrounding tools, libraries, runtimes, package culture, and deployment practices that make a language usable in real work.',
  },
  {
    term: 'Execution model',
    definition:
      'The way source code is transformed and run, such as interpretation, native compilation, or VM execution.',
  },
  {
    term: 'Framework',
    definition:
      'A toolset that imposes structure and lifecycle rules on how applications are built.',
  },
  {
    term: 'Garbage collection',
    definition:
      'Runtime-managed memory reclamation that reduces manual memory handling but introduces policy-driven overhead.',
  },
  {
    term: 'Interop',
    definition:
      'The ability of one tool, language, or runtime to communicate and work with others.',
  },
  {
    term: 'JIT',
    definition: 'Just-in-time compilation, where code is compiled or optimized during execution.',
  },
  {
    term: 'Managed runtime',
    definition:
      'A runtime environment that provides services such as memory management, safety checks, and dynamic loading.',
  },
  {
    term: 'Paradigm',
    definition:
      'A broad style of organizing programs, such as imperative, functional, object-oriented, or reactive.',
  },
  {
    term: 'Portability',
    definition:
      'How easily software can run across different operating systems, devices, or runtime targets.',
  },
  {
    term: 'Runtime',
    definition:
      'The environment and mechanisms that execute a program after it has been built or loaded.',
  },
  {
    term: 'Toolchain',
    definition: 'The collection of tools that transform source code into a running application.',
  },
  {
    term: 'Vendor lock-in',
    definition: 'Dependence on a specific platform or ecosystem that makes migration costly.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'lang98-overview', label: 'Overview' },
    { id: 'lang98-why', label: 'Why It Matters' },
    { id: 'lang98-history', label: 'Historical Context' },
    { id: 'lang98-survey', label: 'Section Survey' },
    { id: 'lang98-themes', label: 'Ecosystem Themes' },
    { id: 'lang98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'lang98-signals', label: 'Topic Signals' },
    { id: 'lang98-foundations', label: 'Foundations' },
    { id: 'lang98-tradeoffs', label: 'Tradeoff Themes' },
    { id: 'lang98-compare', label: 'Compare and Contrast' },
    { id: 'lang98-failures', label: 'Failure Modes' },
    { id: 'lang98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'lang98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function toSectionRoute(name: string): string {
  return `${LANGUAGES_BASE_ROUTE}/${slugifySegment(name)}`
}

const languagesHelpStyles = `
.lang98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.lang98-window {
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

.lang98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.lang98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.lang98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.lang98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.lang98-control:focus-visible,
.lang98-tab:focus-visible,
.lang98-toc-link:focus-visible,
.lang98-inline-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.lang98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.lang98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.lang98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.lang98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.lang98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.lang98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.lang98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.lang98-toc-item + .lang98-toc-item {
  margin-top: 8px;
}

.lang98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.lang98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.lang98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.lang98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.lang98-section {
  margin: 0 0 22px;
}

.lang98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.lang98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.lang98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.lang98-content p,
.lang98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.lang98-content p {
  margin: 0 0 10px;
}

.lang98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.lang98-content li + li {
  margin-top: 4px;
}

.lang98-inline-link {
  color: #000080;
  text-decoration: underline;
}

.lang98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.lang98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .lang98-main {
    grid-template-columns: 1fr;
  }

  .lang98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .lang98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lang98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function LanguagesAndEcosystemsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Languages & Ecosystems (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Languages & Ecosystems',
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
    <div className="lang98-help-page">
      <style>{languagesHelpStyles}</style>
      <div className="lang98-window" role="presentation">
        <header className="lang98-titlebar">
          <span className="lang98-title">Languages &amp; Ecosystems</span>
          <div className="lang98-title-controls">
            <button
              className="lang98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="lang98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="lang98-tabs" role="tablist" aria-label="Languages and Ecosystems Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`lang98-tab ${activeTab === tab.id ? 'lang98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lang98-main">
          <aside className="lang98-toc" aria-label="Table of contents">
            <h2 className="lang98-toc-title">Contents</h2>
            <ul className="lang98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="lang98-toc-item">
                  <a href={`#${section.id}`} className="lang98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="lang98-content">
            <h1 className="lang98-doc-title">Languages &amp; Ecosystems</h1>
            <p className="lang98-intro">
              This page is the top-level overview for the Languages &amp; Ecosystems section. It
              explains how languages, runtimes, paradigms, frameworks, platforms, and surrounding
              tooling create the practical environment in which software is designed, shipped, and
              maintained.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="lang98-overview" className="lang98-section">
                  <h2 className="lang98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="lang98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="lang98-divider" />

                <section id="lang98-why" className="lang98-section">
                  <h2 className="lang98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="lang98-divider" />

                <section id="lang98-history" className="lang98-section">
                  <h2 className="lang98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="lang98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="lang98-divider" />

                <section id="lang98-survey" className="lang98-section">
                  <h2 className="lang98-heading">Section Survey</h2>
                  <p>
                    The subsections below are the actual map of this area. Together they explain the
                    difference between a language feature, an execution model, a paradigm, a
                    framework opinion, and a platform or delivery ecosystem.
                  </p>
                  {sectionSurvey.map((group) => (
                    <div key={group.heading}>
                      <h3 className="lang98-subheading">{group.heading}</h3>
                      {group.items.map((item) => (
                        <div key={item.name}>
                          <p>
                            <Link to={toSectionRoute(item.name)} className="lang98-inline-link">
                              {item.name}
                            </Link>
                          </p>
                          <p>{item.summary}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </section>

                <hr className="lang98-divider" />

                <section id="lang98-themes" className="lang98-section">
                  <h2 className="lang98-heading">Ecosystem Themes</h2>
                  {ecosystemThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="lang98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="lang98-divider" />

                <section id="lang98-takeaways" className="lang98-section">
                  <h2 className="lang98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="lang98-signals" className="lang98-section">
                  <h2 className="lang98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="lang98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lang98-foundations" className="lang98-section">
                  <h2 className="lang98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="lang98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lang98-tradeoffs" className="lang98-section">
                  <h2 className="lang98-heading">Tradeoff Themes</h2>
                  {tradeoffThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="lang98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lang98-compare" className="lang98-section">
                  <h2 className="lang98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="lang98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lang98-failures" className="lang98-section">
                  <h2 className="lang98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="lang98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lang98-checklist" className="lang98-section">
                  <h2 className="lang98-heading">Study Checklist</h2>
                  <ul>
                    {studyChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="lang98-section">
                    <h2 className="lang98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="lang98-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>
                      <strong>Takeaway:</strong> {example.takeaway}
                    </p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="lang98-glossary" className="lang98-section">
                <h2 className="lang98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
