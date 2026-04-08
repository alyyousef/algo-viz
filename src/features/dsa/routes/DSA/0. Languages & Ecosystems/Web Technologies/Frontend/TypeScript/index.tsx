import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What TypeScript is',
    body: 'TypeScript is a statically typed superset of JavaScript that adds type annotations, structural typing, tooling metadata, and compile-time analysis without changing the runtime semantics of ordinary JavaScript programs. In frontend work, it is best understood as a language layer that helps teams describe data shapes, component contracts, API boundaries, and developer intent before the code runs.',
  },
  {
    title: 'Why TypeScript matters',
    body: 'TypeScript matters because modern frontend applications are large, stateful, asynchronous, and connected to many external systems. As those applications grow, the cost of unclear data shapes and weak interface contracts rises quickly. TypeScript helps teams catch many classes of mistakes earlier, navigate codebases faster, and refactor with more confidence.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that TypeScript is primarily a communication and verification layer for JavaScript code. It does not automatically make code correct, but it gives developers a way to model what values should look like, what functions expect, and what APIs promise to return. That improves both tooling and architectural clarity when used intentionally.',
  },
  {
    title: 'Where it fits best',
    body: 'TypeScript fits best in medium to large frontend codebases, shared UI libraries, long-lived products, and teams that need safer refactors, clearer component APIs, and stronger editor support. It is especially useful where data flows across many layers such as network boundaries, state containers, forms, and reusable component systems.',
  },
]

const whyItMatters = [
  'It helps frontend teams describe data shapes and component contracts explicitly.',
  'It catches many mistakes during development instead of leaving them for runtime debugging.',
  'It improves editor assistance, navigation, autocomplete, and refactoring safety.',
  'It provides a common language for discussing APIs, state, and shared abstractions across a team.',
  'It has become a standard expectation in many modern frontend ecosystems.',
]

const historicalContext = [
  {
    title: 'JavaScript scaled faster than its original tooling model',
    detail:
      'JavaScript began as a lightweight scripting language, but frontend applications eventually became large systems with routing, state management, API integration, and shared component libraries. That growth exposed the cost of relying only on dynamic runtime behavior for coordination.',
  },
  {
    title: 'Large frontend teams needed stronger contracts',
    detail:
      'As more engineers worked in the same frontend codebases, teams needed better ways to describe props, API responses, utility contracts, and shared state shapes. TypeScript gained traction because it offered stronger feedback without abandoning JavaScript or the broader ecosystem.',
  },
  {
    title: 'Framework ecosystems embraced it',
    detail:
      'React, Vue, Angular, Svelte, Next.js, and many tooling systems adopted strong TypeScript support. Once major libraries and frameworks began shipping type definitions as a first-class part of the developer experience, TypeScript became much easier to use consistently in real frontend projects.',
  },
  {
    title: 'The language became a default, not a niche option',
    detail:
      'Over time, TypeScript moved from being an optional safety layer to being the default starting point for many production frontend stacks. That does not mean every codebase must use it, but it does mean frontend tooling and community patterns increasingly assume its presence.',
  },
]

const bigPictureThemes = [
  {
    title: 'Types are design tools, not just compiler rules',
    body: 'Good TypeScript usage improves program design by making boundaries visible. Component props, API payloads, configuration objects, and shared helpers become easier to understand when their shapes are explicit. The type system is most valuable when it clarifies architecture rather than only satisfying a checker.',
  },
  {
    title: 'Static checking complements runtime validation',
    body: 'TypeScript can verify assumptions at development time, but it does not validate external input by itself. Frontend applications still need runtime checks for server responses, user input, and third-party data. Strong frontend engineering uses types and runtime validation together instead of assuming one replaces the other.',
  },
  {
    title: 'The language changes how teams refactor',
    body: 'One of TypeScripts biggest practical benefits is that it changes refactoring from guesswork into guided change. When a shared type evolves, the compiler and editor reveal where downstream code must change. That does not remove thinking, but it reduces hidden breakage.',
  },
  {
    title: 'Type safety has a cost that must stay proportional',
    body: 'TypeScript is most effective when its complexity matches the problem. Over-engineered type layers can make code harder to read and slower to change. Teams need to distinguish between useful precision and type cleverness that serves the compiler more than the humans reading the code.',
  },
]

const keyTakeaways = [
  'TypeScript is a compile-time language layer for describing and checking JavaScript programs.',
  'Its main frontend value is clearer contracts around components, data, and shared abstractions.',
  'It improves tooling and refactoring safety, but it does not replace runtime validation.',
  'The best TypeScript code favors understandable models over type-system tricks.',
  'It works best when teams treat types as part of architecture and communication, not only as syntax.',
]

const topicSignals = [
  {
    title: 'Choose TypeScript when the frontend is large or long-lived',
    body: 'If the codebase has many routes, reusable components, API calls, and engineers making frequent changes, TypeScript usually provides enough coordination value to justify its overhead.',
  },
  {
    title: 'Choose TypeScript when APIs and component contracts need clarity',
    body: 'Projects with many shared props, configuration objects, utility helpers, and backend payloads often benefit because TypeScript can make those contracts explicit and editor-friendly.',
  },
  {
    title: 'Choose TypeScript when refactoring speed matters',
    body: 'Teams that expect interfaces to evolve over time often benefit from TypeScript because the compiler helps reveal where assumptions and call sites no longer match.',
  },
  {
    title: 'Avoid using TypeScript as a substitute for design thinking',
    body: 'Type annotations do not automatically create good abstractions. A codebase can still be poorly organized even if every file is typed. The language is a tool for clarity, not an architecture by itself.',
  },
]

const coreFoundations = [
  {
    title: 'Type annotations and inference',
    body: 'TypeScript can infer many types from values and expressions, but it also allows explicit annotations where contracts need to be clear. Strong frontend code usually mixes inference for local clarity with explicit types at public boundaries such as props, exported functions, and API models.',
  },
  {
    title: 'Interfaces, type aliases, and structural typing',
    body: 'TypeScript uses a structural type system, which means compatibility depends on the shape of a value rather than on nominal declarations alone. Interfaces and type aliases help describe shapes for objects, unions, mapped data, and function contracts across the frontend codebase.',
  },
  {
    title: 'Unions, narrowing, and control-flow analysis',
    body: 'Frontend applications often branch on loading state, error state, feature flags, or discriminated object shapes. TypeScript helps model these scenarios through union types and narrowing so that code can reflect real state transitions more safely.',
  },
  {
    title: 'Generics for reusable abstractions',
    body: 'Generics allow component helpers, utility functions, and state tools to preserve type information without hardcoding one specific data shape. They are valuable when building reusable patterns, but they should remain readable and proportionate to the abstraction they serve.',
  },
  {
    title: 'Configuration and compiler options',
    body: 'The tsconfig file defines how strict the compiler should be, which syntax targets are emitted, how modules are resolved, and how JavaScript interop behaves. Frontend quality often depends as much on sensible TypeScript configuration as on the annotations inside individual files.',
  },
]

const frameworkFeatures = [
  {
    title: 'Typed component props and events',
    body: 'In frontend component systems, TypeScript helps describe the public API of a component: which props it accepts, which callbacks it expects, and what shape child data must follow. This is one of the most direct ways it improves developer experience.',
  },
  {
    title: 'Typed API responses and shared domain models',
    body: 'Frontend applications consume many external payloads. TypeScript lets teams model those payloads consistently across fetch layers, state containers, and UI rendering logic so that mismatches are easier to notice during development.',
  },
  {
    title: 'Editor-driven navigation and autocomplete',
    body: 'One of the most practical benefits of TypeScript is richer tooling. Better autocomplete, symbol navigation, rename support, and inline hints can significantly reduce the friction of working inside a large codebase.',
  },
  {
    title: 'Safer utility and library design',
    body: 'Shared frontend utilities, hooks, stores, and helper abstractions are easier to reuse when their behavior is encoded in types that callers can understand. This makes library-quality internal code more practical across a team.',
  },
  {
    title: 'Framework ecosystem integration',
    body: 'Modern frontend frameworks and build tools often ship first-class TypeScript support, which means the language can participate directly in route configuration, component authoring, build-time validation, and generated type information across the stack.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Types disappear at runtime',
    body: 'TypeScript types are erased when the code is compiled. That means the browser receives JavaScript, not type rules. Teams must remember that external data can still be wrong at runtime even when the local source code type-checks cleanly.',
  },
  {
    title: 'Runtime validation is still necessary',
    body: 'User input, server responses, environment configuration, and third-party integrations still require runtime validation because TypeScript cannot enforce truth on values that arrive after compilation. Schemas, guards, and validation libraries remain important.',
  },
  {
    title: 'Type complexity can slow development',
    body: 'Complex generic types, deeply nested conditional types, and excessive abstraction can make code difficult to read and sometimes slow the editor or build pipeline. Good TypeScript usage should improve development speed overall, not only satisfy the compiler.',
  },
  {
    title: 'Compiler strictness changes team behavior',
    body: 'Turning on stricter compiler options often surfaces assumptions the team had been making implicitly. That can be uncomfortable initially, but it usually leads to clearer null handling, more explicit state modeling, and better shared contracts when applied thoughtfully.',
  },
]

const ecosystemUses = [
  {
    title: 'Large product frontends',
    body: 'TypeScript is particularly common in large frontend products where many engineers touch the same component surfaces, domain models, and API layers over time.',
  },
  {
    title: 'Shared component libraries and design systems',
    body: 'UI libraries benefit from TypeScript because each component becomes a reusable contract. Consumers can discover valid props, event signatures, and configuration shapes directly from the editor.',
  },
  {
    title: 'API-heavy applications',
    body: 'Products that coordinate large amounts of data between frontend and backend layers often benefit from TypeScript because it helps represent those payloads consistently across fetch logic, state shaping, and rendering.',
  },
  {
    title: 'Teams that prioritize refactoring confidence',
    body: 'When interfaces evolve frequently, TypeScript provides a strong signal for where changes are required. That makes it valuable in codebases that change rapidly but still need reliability.',
  },
]

const comparisons = [
  {
    title: 'TypeScript versus plain JavaScript',
    body: 'JavaScript is simpler to start with and avoids type syntax and compiler configuration, while TypeScript adds a layer of static analysis and explicit contracts. The tradeoff is less up-front complexity versus stronger tooling and safer change in larger codebases.',
  },
  {
    title: 'TypeScript versus runtime-only validation',
    body: 'Runtime validation is essential for untrusted data, but it does not provide the same editor assistance or refactoring guidance inside the codebase. TypeScript complements runtime validation by improving internal correctness signals during development.',
  },
  {
    title: 'TypeScript versus over-modeled type systems',
    body: 'The useful comparison is not only with JavaScript, but also with bad TypeScript. A readable, pragmatic type layer is valuable. A codebase full of clever conditional types and indirect aliases can become harder to maintain than lightly typed JavaScript.',
  },
  {
    title: 'TypeScript in frameworks versus standalone utility code',
    body: 'Framework-integrated TypeScript often feels most valuable because it touches components, routes, loaders, and shared models at once. The language is still useful in isolated utility code, but its leverage grows as the surrounding application contracts grow.',
  },
]

const failureModes = [
  {
    title: 'Using any to silence design problems',
    body: 'The any type is sometimes necessary, but overusing it discards much of TypeScripts value. Teams often reach for any when a contract is unclear, even though that is usually a sign the underlying model needs to be made more explicit.',
  },
  {
    title: 'Confusing type safety with runtime safety',
    body: 'A type-checked frontend can still fail when the server returns unexpected data, the browser API behaves differently, or user input violates assumptions. Strong static checking should not create false confidence about runtime truth.',
  },
  {
    title: 'Over-engineering types until code becomes unreadable',
    body: 'Sometimes teams turn simple models into dense generic machinery that only a few people can understand. Types should help communicate intent, not obscure it behind language puzzles.',
  },
  {
    title: 'Duplicating domain models carelessly',
    body: 'Frontend teams often accumulate multiple similar but inconsistent types for the same concept, such as API payloads, form values, and normalized state models. Without discipline, that can create a false sense of safety while the real contracts drift apart.',
  },
  {
    title: 'Ignoring compiler configuration quality',
    body: 'A weak tsconfig can leave important problems undetected, while an unrealistically strict setup can push teams into type workarounds instead of better design. Configuration should serve clarity and maintainability, not ideology.',
  },
]

const studyChecklist = [
  'Understand TypeScript as a design and verification layer on top of JavaScript.',
  'Be explicit about types at component, API, and shared-library boundaries.',
  'Use unions, narrowing, and generics to model real problems, not to impress the compiler.',
  'Keep runtime validation in place for untrusted external data.',
  'Prefer readable, pragmatic types over deeply clever type-level programming.',
  'Treat tsconfig settings as an architectural choice rather than a default afterthought.',
]

const examples = [
  {
    id: 'ts98-example-props',
    title: 'Example: Typed component props',
    area: 'Component Contracts',
    intro:
      'Component props become clearer when their expected shape is expressed directly in the type system.',
    whyFit: 'This shows one of the most common and valuable TypeScript uses in frontend work.',
    code: `type ButtonProps = {
  label: string
  disabled?: boolean
  onClick: () => void
}

function Button({ label, disabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  )
}`,
    takeaway:
      'Typed props make a component easier to consume, refactor, and document because the contract is visible at the call site and in the editor.',
  },
  {
    id: 'ts98-example-union',
    title: 'Example: Discriminated union for async state',
    area: 'State Modeling',
    intro:
      'Frontend state often has distinct modes such as loading, success, and failure. A union can model those modes explicitly.',
    whyFit:
      'This captures how TypeScript helps reflect real UI state transitions instead of relying on loosely related booleans.',
    code: `type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string }

function renderState(state: LoadState) {
  switch (state.status) {
    case 'success':
      return state.data.length
    case 'error':
      return state.message
    default:
      return 0
  }
}`,
    takeaway:
      'When state modes are explicit, impossible combinations become harder to express and UI branching becomes easier to reason about.',
  },
  {
    id: 'ts98-example-generic',
    title: 'Example: Generic API helper',
    area: 'Reusable Utilities',
    intro:
      'A generic helper can preserve the expected response shape without hardcoding one specific data model.',
    whyFit:
      'This shows how TypeScript supports reusable abstractions while keeping callers strongly typed.',
    code: `async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  return response.json() as Promise<T>
}`,
    takeaway:
      'Generics are useful when they preserve real information across reuse. They are less useful when they add complexity without making callers clearer.',
  },
  {
    id: 'ts98-example-guard',
    title: 'Example: Runtime type guard',
    area: 'Runtime Safety',
    intro:
      'Static types do not validate server data automatically, so runtime guards are still needed at trust boundaries.',
    whyFit:
      'This demonstrates the practical relationship between compile-time types and runtime truth.',
    code: `type User = { id: string; name: string }

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  )
}`,
    takeaway:
      'TypeScript is strongest when paired with runtime checks for external data instead of being treated as a substitute for validation.',
  },
  {
    id: 'ts98-example-config',
    title: 'Example: Narrow string unions',
    area: 'API Design',
    intro:
      'A narrow union can express a constrained set of valid options more clearly than a broad string type.',
    whyFit:
      'This reflects how TypeScript can encode frontend API intent directly in common configuration props.',
    code: `type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonConfig = {
  variant: ButtonVariant
  size: 'sm' | 'md' | 'lg'
}`,
    takeaway:
      'Narrow unions help prevent invalid configuration while also improving autocomplete and discoverability for component consumers.',
  },
]

const glossary = [
  {
    term: 'TypeScript',
    definition:
      'A statically typed superset of JavaScript that adds compile-time analysis and richer tooling.',
  },
  {
    term: 'Type inference',
    definition:
      'The process where TypeScript deduces a type from code without requiring an explicit annotation.',
  },
  {
    term: 'Interface',
    definition:
      'A TypeScript construct commonly used to describe the shape of an object or contract.',
  },
  {
    term: 'Union type',
    definition: 'A type that allows a value to be one of several possible variants.',
  },
  {
    term: 'Narrowing',
    definition:
      'The process where TypeScript refines a broader type to a more specific one based on control flow or checks.',
  },
  {
    term: 'Generic',
    definition:
      'A type parameter that allows reusable code to preserve information about caller-provided types.',
  },
  {
    term: 'Type guard',
    definition:
      'A runtime check that helps prove to TypeScript that a value matches a narrower type.',
  },
  {
    term: 'Structural typing',
    definition:
      'A compatibility model where values are compared by shape rather than by declared nominal identity.',
  },
  {
    term: 'tsconfig',
    definition:
      'The TypeScript configuration file that controls compiler behavior, strictness, and module settings.',
  },
  {
    term: 'any',
    definition:
      'A type that disables useful static checking for a value and should be used sparingly.',
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
    { id: 'ts98-overview', label: 'Overview' },
    { id: 'ts98-why', label: 'Why It Matters' },
    { id: 'ts98-history', label: 'Historical Context' },
    { id: 'ts98-themes', label: 'Big Picture Themes' },
    { id: 'ts98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'ts98-signals', label: 'Topic Signals' },
    { id: 'ts98-foundations', label: 'Foundations' },
    { id: 'ts98-features', label: 'Framework Features' },
    { id: 'ts98-runtime', label: 'Runtime and Operations' },
    { id: 'ts98-uses', label: 'Ecosystem Uses' },
    { id: 'ts98-compare', label: 'Compare and Contrast' },
    { id: 'ts98-failures', label: 'Failure Modes' },
    { id: 'ts98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'ts98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const typeScriptHelpStyles = `
.ts98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ts98-window {
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

.ts98-titlebar {
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

.ts98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.ts98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.ts98-control {
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

.ts98-control:focus-visible,
.ts98-tab:focus-visible,
.ts98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.ts98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.ts98-tab {
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

.ts98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.ts98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.ts98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.ts98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.ts98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ts98-toc-item + .ts98-toc-item {
  margin-top: 8px;
}

.ts98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.ts98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.ts98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.ts98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.ts98-section {
  margin: 0 0 22px;
}

.ts98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.ts98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.ts98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.ts98-content p,
.ts98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.ts98-content p {
  margin: 0 0 10px;
}

.ts98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.ts98-content li + li {
  margin-top: 4px;
}

.ts98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.ts98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .ts98-main {
    grid-template-columns: 1fr;
  }

  .ts98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .ts98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ts98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function TypeScriptPage(): JSX.Element {
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
    document.title = `TypeScript (Frontend) (${activeTabLabel})`
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
      title: 'TypeScript (Frontend)',
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
    <div className="ts98-help-page">
      <style>{typeScriptHelpStyles}</style>
      <div className="ts98-window" role="presentation">
        <header className="ts98-titlebar">
          <span className="ts98-title">TypeScript (Frontend)</span>
          <div className="ts98-title-controls">
            <button
              className="ts98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="ts98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="ts98-tabs" role="tablist" aria-label="TypeScript Frontend Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`ts98-tab ${activeTab === tab.id ? 'ts98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ts98-main">
          <aside className="ts98-toc" aria-label="Table of contents">
            <h2 className="ts98-toc-title">Contents</h2>
            <ul className="ts98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="ts98-toc-item">
                  <a href={`#${section.id}`} className="ts98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="ts98-content">
            <h1 className="ts98-doc-title">TypeScript (Frontend)</h1>
            <p className="ts98-intro">
              This page is a frontend-focused overview of TypeScript as a language and tooling layer
              for JavaScript applications. It explains how types clarify component contracts, state
              models, APIs, refactoring, and editor workflows, while also covering the runtime
              limits and design tradeoffs that teams still need to manage explicitly.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="ts98-overview" className="ts98-section">
                  <h2 className="ts98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="ts98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="ts98-divider" />

                <section id="ts98-why" className="ts98-section">
                  <h2 className="ts98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="ts98-divider" />

                <section id="ts98-history" className="ts98-section">
                  <h2 className="ts98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="ts98-divider" />

                <section id="ts98-themes" className="ts98-section">
                  <h2 className="ts98-heading">Big Picture Themes</h2>
                  {bigPictureThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="ts98-divider" />

                <section id="ts98-takeaways" className="ts98-section">
                  <h2 className="ts98-heading">Key Takeaways</h2>
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
                <section id="ts98-signals" className="ts98-section">
                  <h2 className="ts98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ts98-foundations" className="ts98-section">
                  <h2 className="ts98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ts98-features" className="ts98-section">
                  <h2 className="ts98-heading">Framework Features</h2>
                  {frameworkFeatures.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ts98-runtime" className="ts98-section">
                  <h2 className="ts98-heading">Runtime and Operations</h2>
                  {runtimeAndOperations.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ts98-uses" className="ts98-section">
                  <h2 className="ts98-heading">Ecosystem Uses</h2>
                  {ecosystemUses.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ts98-compare" className="ts98-section">
                  <h2 className="ts98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ts98-failures" className="ts98-section">
                  <h2 className="ts98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="ts98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ts98-checklist" className="ts98-section">
                  <h2 className="ts98-heading">Study Checklist</h2>
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
                  <section key={example.id} id={example.id} className="ts98-section">
                    <h2 className="ts98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="ts98-codebox">
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
              <section id="ts98-glossary" className="ts98-section">
                <h2 className="ts98-heading">Glossary</h2>
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
