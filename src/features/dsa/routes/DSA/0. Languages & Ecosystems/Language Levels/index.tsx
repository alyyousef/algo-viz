import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
const LANGUAGE_LEVELS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/language-levels'

const overviewSections = [
  {
    title: 'What this subsection is',
    body: 'Language Levels explains how closely a programming language exposes the machine beneath it. It organizes the spectrum from low-level, hardware-conscious programming to high-level, highly abstract programming environments. The central idea is that abstraction level changes not only syntax but also how developers reason about memory, safety, portability, performance, and the cost of mistakes.',
  },
  {
    title: 'Why language level matters',
    body: 'The level of a language determines which details are explicit and which are delegated to the compiler, runtime, or framework. Low-level languages make layout, lifetime, and hardware effects visible. High-level languages hide more of that complexity in exchange for productivity, portability, and safer defaults. That trade shapes whole ecosystems, not just local coding style.',
  },
  {
    title: 'What this subsection teaches',
    body: 'This subsection teaches how to reason about control versus abstraction. The relevant question is not whether one level is superior in the abstract, but which level matches the problem. Systems programming, device control, and hard latency budgets often need more direct control. Product iteration, scripting, web applications, and data workflows often benefit from stronger abstractions and richer runtime services.',
  },
  {
    title: 'How to read it',
    body: 'Read each page as a statement about where responsibility lives. Ask which layer manages memory, which layer enforces safety, which layer provides portability, and which layer exposes or hides the underlying machine. Those answers explain most of the real-world tradeoffs.',
  },
]

const whyItMatters = [
  'It explains why some stacks expose hardware details directly while others prioritize expressiveness and safety.',
  'It helps you match the language to the workload rather than treating all languages as equivalent after compilation.',
  'It clarifies which costs are visible to the programmer and which costs are hidden inside runtimes or libraries.',
  'It connects abstraction level to debugging, performance tuning, memory behavior, and portability.',
  'It shows why ecosystem decisions often begin with how much control the team actually needs.',
]

const historicalContext = [
  {
    title: 'Programming began close to the machine',
    detail:
      'Early software was written in machine code and assembly, where every register move and memory address mattered. That closeness gave control but imposed extreme cognitive overhead and poor portability.',
  },
  {
    title: 'High-level languages made scale possible',
    detail:
      'Languages such as FORTRAN, ALGOL, Lisp, and later Java, Python, and JavaScript shifted more responsibility to compilers and runtimes. This enabled larger teams, richer libraries, and faster iteration by making software easier to write and maintain.',
  },
  {
    title: 'Modern ecosystems widened the spectrum',
    detail:
      'The industry no longer lives in a simple assembly-versus-scripting split. Today there are low-level systems languages with safety features, high-level languages with native extensions, and ecosystems that mix both approaches inside one product.',
  },
  {
    title: 'Language level is now an architectural choice',
    detail:
      'Choosing a language level affects team composition, deployment model, library usage, debugging strategy, and how much of the performance story is explicit versus delegated. It is therefore a system-design decision as much as a coding decision.',
  },
]

const sectionSurvey = [
  {
    name: 'High-Level Languages',
    summary:
      'This page focuses on expressive syntax, runtime services, safety defaults, ecosystem leverage, rapid iteration, and the ways abstraction accelerates product development while sometimes hiding cost.',
  },
  {
    name: 'Low-Level Languages',
    summary:
      'This page focuses on memory layout, manual control, hardware awareness, deterministic behavior, toolchain precision, and the engineering discipline required when the machine is exposed more directly.',
  },
]

const levelThemes = [
  {
    title: 'Abstraction is selective visibility',
    body: 'A higher-level language does not remove cost. It changes who sees it first. Some costs become hidden inside a runtime, GC, library call, or VM. Low-level languages keep those costs exposed, forcing explicit decisions earlier.',
  },
  {
    title: 'Control is valuable when the workload is sensitive',
    body: 'When cache locality, memory footprint, interrupt handling, allocation patterns, or hard latency requirements dominate the outcome, low-level control can be decisive. When those concerns are secondary, abstraction often buys more value than control.',
  },
  {
    title: 'Productivity and safety are also system properties',
    body: 'High-level ecosystems often win not because the syntax is prettier, but because package managers, error handling, runtime checks, testing tools, and managed memory reduce classes of failure and accelerate whole teams.',
  },
  {
    title: 'Most real systems cross the boundary',
    body: 'A web application may be written mostly in high-level languages while relying on low-level database engines, browser runtimes, compression libraries, kernels, and cryptographic primitives. Language levels often coexist within one architecture.',
  },
]

const keyTakeaways = [
  'Language level is about how much of the machine a programmer must manage directly.',
  'Low-level languages offer precision and predictability at the cost of more responsibility.',
  'High-level languages offer abstraction and speed of development at the cost of less direct control.',
  'The right level depends on workload sensitivity, team needs, and system constraints.',
  'Modern systems often combine several language levels rather than living entirely at one point on the spectrum.',
]

const topicSignals = [
  {
    title: 'Choose this lens when the question is really about control',
    body: 'If the team is debating memory layout, hardware access, deterministic latency, system-call boundaries, binary size, or ownership of low-level resources, then the useful frame is language level rather than generic language preference.',
  },
  {
    title: 'Choose this lens when abstraction feels either empowering or costly',
    body: 'If a runtime, framework, or standard library is making development much easier but hiding performance or operational behavior, then the important difference is often the abstraction level being offered.',
  },
  {
    title: 'Choose this lens when portability and productivity conflict with specialization',
    body: 'If one option offers broader portability and faster onboarding while another offers hardware-specific optimization or tighter system integration, then you are comparing language levels as much as ecosystems.',
  },
  {
    title: 'Choose this lens when developer responsibility changes radically',
    body: 'If one stack expects the developer to manage lifetime, alignment, and synchronization directly while another delegates those concerns to managed services or runtime checks, language level is the governing concept.',
  },
]

const coreFoundations = [
  {
    title: 'Distance from hardware',
    body: 'Low-level languages expose more of the machine model: registers, memory layout, pointer behavior, cache effects, ABI concerns, and explicit concurrency coordination. High-level languages replace much of that with safer or more expressive abstractions.',
  },
  {
    title: 'Responsibility boundaries',
    body: 'In low-level languages, the programmer often owns lifetime, layout, synchronization, and performance-critical structure directly. In high-level languages, the compiler, runtime, libraries, or framework absorb much of that responsibility.',
  },
  {
    title: 'Error surface and safety defaults',
    body: 'Bounds checks, managed memory, exceptions, runtime metadata, ownership systems, and static analysis all change how bugs manifest. High-level environments often prevent broad classes of failure by default, while low-level environments require stronger discipline and tooling.',
  },
  {
    title: 'Performance visibility',
    body: 'Low-level systems make many costs visible in the code itself. High-level systems can hide costs behind abstraction boundaries, which can be productive until optimization or debugging requires the hidden machinery to be understood.',
  },
  {
    title: 'Ecosystem leverage',
    body: 'Language level interacts with tooling, libraries, and community norms. High-level ecosystems often deliver outsized leverage through batteries-included tooling. Low-level ecosystems often deliver leverage through precise control, mature compiler toolchains, and strong interop with system components.',
  },
]

const tradeoffThemes = [
  {
    title: 'Control versus speed of development',
    body: 'Low-level code can be tuned with great precision, but it usually takes more time and expertise to write safely. High-level languages often let teams ship faster by reducing incidental complexity, even when peak performance is lower.',
  },
  {
    title: 'Predictability versus convenience',
    body: 'Manual control and explicit layout can improve predictability. Managed runtimes and expressive abstractions improve convenience and correctness for many workloads, but can introduce hidden pauses, allocations, or dispatch overhead.',
  },
  {
    title: 'Specialization versus portability',
    body: 'Low-level approaches often integrate tightly with specific hardware and operating-system facilities. High-level approaches usually travel more easily across platforms, especially when backed by VMs, interpreters, or portable standard libraries.',
  },
  {
    title: 'Sharp tools versus safe defaults',
    body: 'Low-level environments often give access to powerful capabilities that can produce both great performance and severe failures. High-level environments tend to make many common mistakes harder to express, at the price of some direct power.',
  },
  {
    title: 'Local efficiency versus ecosystem leverage',
    body: 'A locally efficient implementation can still lose overall if the surrounding tooling, packages, observability, or integration story is weak. Conversely, a slower language can dominate because the ecosystem makes whole-system delivery dramatically easier.',
  },
]

const comparisons = [
  {
    title: 'High-level languages versus low-level languages',
    body: 'High-level languages emphasize expressiveness, safety, and ecosystem productivity. Low-level languages emphasize explicit control over memory, layout, and performance behavior. Neither is universally better; each is a better fit for certain classes of work.',
  },
  {
    title: 'Managed memory versus explicit memory control',
    body: 'Managed memory reduces whole categories of bugs and cognitive overhead. Explicit memory control enables stronger predictability and lower-level optimization but demands more engineering discipline and better tooling.',
  },
  {
    title: 'Runtime abstraction versus compile-time discipline',
    body: 'Some ecosystems rely heavily on runtime services, reflection, and dynamic flexibility. Others push more guarantees into compilation, ownership, or static verification. The trade changes how errors surface and how systems are tuned.',
  },
  {
    title: 'General product development versus systems construction',
    body: 'Product-focused stacks often benefit more from high-level abstractions and fast iteration. Kernels, embedded systems, compilers, game engines, and infrastructure primitives often demand deeper machine awareness.',
  },
  {
    title: 'Single-level thinking versus layered systems',
    body: 'Real systems are usually layered. A high-level service may depend on low-level storage engines and protocol implementations. Good engineering often means choosing the right level for each part, not insisting on one level everywhere.',
  },
]

const failureModes = [
  {
    title: 'Assuming lower level is automatically superior',
    body: 'Low-level control is only a benefit when the workload can use it and the team can manage the added complexity safely. Otherwise it can slow delivery and increase defect risk without meaningful payoff.',
  },
  {
    title: 'Assuming high level means cost does not matter',
    body: 'High-level abstractions still have runtime and memory consequences. Ignoring allocation patterns, serialization overhead, event-loop behavior, or FFI boundaries can create severe surprises in production.',
  },
  {
    title: 'Confusing language level with execution model',
    body: 'A language can be high level and still compile ahead of time, or low level and still rely on sophisticated tooling. Language level is about abstraction and control, while execution model is about how code runs.',
  },
  {
    title: 'Choosing a level for identity rather than workload',
    body: 'Some teams overvalue languages that feel "serious" or "productive" without grounding the choice in latency targets, portability, team expertise, or system constraints. That produces mismatched stacks.',
  },
  {
    title: 'Forgetting that ecosystems span levels',
    body: 'Applications often rely on low-level native libraries beneath high-level code. Treating one layer as the entire system can hide the true performance, safety, or portability story.',
  },
]

const studyChecklist = [
  'Ask how much direct control over memory, layout, and runtime behavior the workload actually requires.',
  'Identify which responsibilities belong to the programmer and which belong to the compiler, runtime, or framework.',
  'Evaluate safety defaults, debugging story, and tooling support alongside raw performance.',
  'Separate language-level questions from execution-model questions.',
  'Consider whether the system should mix levels rather than choosing one level everywhere.',
  'Match the level to the team, deployment target, and failure cost of the problem.',
]

const examples = [
  {
    id: 'lvl98-example-abstraction',
    title: 'Example: Same task at different abstraction levels',
    area: 'Control and Abstraction',
    intro:
      'A buffer-processing task can be expressed with direct pointer arithmetic and explicit layout management, or with higher-level collections and safety checks. Both can be correct, but they expose radically different responsibilities to the programmer.',
    whyFit:
      'This example shows that language level changes what the developer has to think about before the algorithm itself changes.',
    code: `low level:
  allocate buffer
  manage indices and bounds manually
  control layout and lifetime explicitly

high level:
  create collection
  iterate with checked access
  rely on runtime or library for memory management`,
    takeaway:
      'Language level determines how much of the machine-facing work is visible in normal application code.',
  },
  {
    id: 'lvl98-example-system-boundary',
    title: 'Example: High-level application over low-level primitives',
    area: 'Layered Systems',
    intro:
      'A web service might be written in a high-level language while depending on a low-level database engine, native TLS library, compression codec, and operating-system scheduler. The overall system therefore spans several language levels even if most product code does not.',
    whyFit:
      'This example explains why the practical question is often where each level belongs, not which level should dominate everything.',
    code: `request handler in high-level service
  -> query to native-backed database engine
  -> TLS handled by low-level crypto library
  -> socket and scheduler handled by operating system
  -> response assembled in high-level application code`,
    takeaway:
      'Systems are often layered by responsibility, with each language level chosen for the part it serves best.',
  },
  {
    id: 'lvl98-example-embedded',
    title: 'Example: Hardware-sensitive workload',
    area: 'Low-Level Fit',
    intro:
      'Embedded control, kernel work, drivers, and latency-sensitive infrastructure usually care about memory layout, interrupts, timing, and deterministic resource use. In those cases, lower-level languages are attractive because hidden runtime behavior can be unacceptable.',
    whyFit:
      'This example shows where direct control is not an optimization hobby but a requirement imposed by the environment.',
    code: `read hardware register
update device state
write explicit memory-mapped value
avoid hidden allocation or unpredictable pause
meet strict timing or safety constraint`,
    takeaway:
      'Low-level languages are most compelling when the machine boundary is part of the problem itself.',
  },
  {
    id: 'lvl98-example-productivity',
    title: 'Example: Product iteration in a high-level stack',
    area: 'High-Level Fit',
    intro:
      'Internal tools, web products, automation, and data-heavy services often benefit more from libraries, managed memory, rapid testing, and fast iteration than from direct control over every byte.',
    whyFit:
      'This example shows how abstraction can be the rational engineering choice when whole-team velocity matters more than micro-optimization.',
    code: `define feature logic
reuse framework and package ecosystem
ship changes quickly
measure real bottlenecks
optimize hotspots only if the workload demands it`,
    takeaway:
      'High-level languages win when abstraction lowers total delivery cost more than direct control would improve the workload.',
  },
  {
    id: 'lvl98-example-ffi',
    title: 'Example: Crossing the level boundary with FFI',
    area: 'Hybrid Strategy',
    intro:
      'Many teams keep the product mostly in a high-level language but move narrow hotspots into low-level native modules. That split can preserve development speed while recovering performance or system access where needed.',
    whyFit:
      'This example demonstrates a common hybrid strategy for balancing productivity with control.',
    code: `high-level application code
  -> call native module through FFI
  -> perform hotspot computation or hardware access
  -> marshal result back to managed environment`,
    takeaway: 'A mixed-level architecture is often better than a dogmatic one-level choice.',
  },
]

const glossary = [
  {
    term: 'Abstraction',
    definition: 'A way of hiding lower-level details behind higher-level concepts or operations.',
  },
  {
    term: 'Bounds check',
    definition:
      'A safety check that prevents access outside the valid range of a collection or buffer.',
  },
  {
    term: 'FFI',
    definition:
      'Foreign Function Interface, used to call code written in another language or runtime.',
  },
  {
    term: 'Garbage collection',
    definition:
      'Automatic memory reclamation performed by a runtime rather than manually by the programmer.',
  },
  {
    term: 'High-level language',
    definition:
      'A language that emphasizes expressive abstractions, productivity, and reduced direct exposure to hardware details.',
  },
  {
    term: 'Low-level language',
    definition:
      'A language that exposes more direct control over memory, layout, and hardware-adjacent behavior.',
  },
  {
    term: 'Managed runtime',
    definition:
      'A runtime that provides services such as memory management, metadata, and dynamic execution support.',
  },
  {
    term: 'Memory layout',
    definition:
      'The concrete arrangement of data in memory, including alignment, padding, and ordering.',
  },
  {
    term: 'Portability',
    definition:
      'How easily code can move across operating systems, hardware targets, or runtime environments.',
  },
  {
    term: 'Systems programming',
    definition:
      'Programming close to operating systems, runtimes, hardware interfaces, or performance-critical infrastructure.',
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
    { id: 'lvl98-overview', label: 'Overview' },
    { id: 'lvl98-why', label: 'Why It Matters' },
    { id: 'lvl98-history', label: 'Historical Context' },
    { id: 'lvl98-survey', label: 'Section Survey' },
    { id: 'lvl98-themes', label: 'Level Themes' },
    { id: 'lvl98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'lvl98-signals', label: 'Topic Signals' },
    { id: 'lvl98-foundations', label: 'Foundations' },
    { id: 'lvl98-tradeoffs', label: 'Tradeoff Themes' },
    { id: 'lvl98-compare', label: 'Compare and Contrast' },
    { id: 'lvl98-failures', label: 'Failure Modes' },
    { id: 'lvl98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'lvl98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function toLanguageLevelRoute(name: string): string {
  return `${LANGUAGE_LEVELS_BASE_ROUTE}/${slugifySegment(name)}`
}

const languageLevelsHelpStyles = `
.lvl98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.lvl98-window {
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

.lvl98-titlebar {
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

.lvl98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.lvl98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.lvl98-control {
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

.lvl98-control:focus-visible,
.lvl98-tab:focus-visible,
.lvl98-toc-link:focus-visible,
.lvl98-inline-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.lvl98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.lvl98-tab {
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

.lvl98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.lvl98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.lvl98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.lvl98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.lvl98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.lvl98-toc-item + .lvl98-toc-item {
  margin-top: 8px;
}

.lvl98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.lvl98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.lvl98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.lvl98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.lvl98-section {
  margin: 0 0 22px;
}

.lvl98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.lvl98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.lvl98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.lvl98-content p,
.lvl98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.lvl98-content p {
  margin: 0 0 10px;
}

.lvl98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.lvl98-content li + li {
  margin-top: 4px;
}

.lvl98-inline-link {
  color: #000080;
  text-decoration: underline;
}

.lvl98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.lvl98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .lvl98-main {
    grid-template-columns: 1fr;
  }

  .lvl98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .lvl98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lvl98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function LanguageLevelsPage(): JSX.Element {
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
    document.title = `Language Levels (${activeTabLabel})`
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
      title: 'Language Levels',
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
    <div className="lvl98-help-page">
      <style>{languageLevelsHelpStyles}</style>
      <div className="lvl98-window" role="presentation">
        <header className="lvl98-titlebar">
          <span className="lvl98-title">Language Levels</span>
          <div className="lvl98-title-controls">
            <button
              className="lvl98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="lvl98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="lvl98-tabs" role="tablist" aria-label="Language Levels Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`lvl98-tab ${activeTab === tab.id ? 'lvl98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lvl98-main">
          <aside className="lvl98-toc" aria-label="Table of contents">
            <h2 className="lvl98-toc-title">Contents</h2>
            <ul className="lvl98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="lvl98-toc-item">
                  <a href={`#${section.id}`} className="lvl98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="lvl98-content">
            <h1 className="lvl98-doc-title">Language Levels</h1>
            <p className="lvl98-intro">
              This page is the overview for the Language Levels subsection inside Languages &amp;
              Ecosystems. It explains how much of the machine a programmer sees directly, how
              abstraction changes responsibility, and why high-level and low-level approaches solve
              different kinds of problems well.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="lvl98-overview" className="lvl98-section">
                  <h2 className="lvl98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="lvl98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="lvl98-divider" />

                <section id="lvl98-why" className="lvl98-section">
                  <h2 className="lvl98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="lvl98-divider" />

                <section id="lvl98-history" className="lvl98-section">
                  <h2 className="lvl98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="lvl98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="lvl98-divider" />

                <section id="lvl98-survey" className="lvl98-section">
                  <h2 className="lvl98-heading">Section Survey</h2>
                  {sectionSurvey.map((item) => (
                    <div key={item.name}>
                      <h3 className="lvl98-subheading">{item.name}</h3>
                      <p>{item.summary}</p>
                      <p>
                        <Link to={toLanguageLevelRoute(item.name)} className="lvl98-inline-link">
                          Open {item.name}
                        </Link>
                      </p>
                    </div>
                  ))}
                </section>

                <hr className="lvl98-divider" />

                <section id="lvl98-themes" className="lvl98-section">
                  <h2 className="lvl98-heading">Level Themes</h2>
                  {levelThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="lvl98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="lvl98-divider" />

                <section id="lvl98-takeaways" className="lvl98-section">
                  <h2 className="lvl98-heading">Key Takeaways</h2>
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
                <section id="lvl98-signals" className="lvl98-section">
                  <h2 className="lvl98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="lvl98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lvl98-foundations" className="lvl98-section">
                  <h2 className="lvl98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="lvl98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lvl98-tradeoffs" className="lvl98-section">
                  <h2 className="lvl98-heading">Tradeoff Themes</h2>
                  {tradeoffThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="lvl98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lvl98-compare" className="lvl98-section">
                  <h2 className="lvl98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="lvl98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lvl98-failures" className="lvl98-section">
                  <h2 className="lvl98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="lvl98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="lvl98-checklist" className="lvl98-section">
                  <h2 className="lvl98-heading">Study Checklist</h2>
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
                  <section key={example.id} id={example.id} className="lvl98-section">
                    <h2 className="lvl98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="lvl98-codebox">
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
              <section id="lvl98-glossary" className="lvl98-section">
                <h2 className="lvl98-heading">Glossary</h2>
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
