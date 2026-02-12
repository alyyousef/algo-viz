import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'Structured programming movement (1960s)',
    detail:
      'Edsger Dijkstra and others argued against unrestrained goto, promoting sequence, selection, and iteration as the core control constructs.',
  },
  {
    title: 'ALGOL, C, and Pascal normalize procedures (1960s-1970s)',
    detail:
      'ALGOL popularized block structure; Pascal pushed teaching clarity; C delivered portable low-level control, making the procedure the central abstraction.',
  },
  {
    title: 'Modula and Ada introduce modularity (1970s-1980s)',
    detail:
      'Modules, packages, and strong typing improved large-scale procedural code organization and encapsulation of stateful components.',
  },
  {
    title: 'Systems software standardizes on procedural cores',
    detail:
      'Operating systems, databases, and embedded firmware established procedural style as the backbone for predictable control and tight resource management.',
  },
  {
    title: 'POSIX and C standardization (1980s-1990s)',
    detail:
      'Standard libraries and system calls made procedural code portable across Unix-like systems.',
  },
  {
    title: 'Embedded and real-time growth (2000s)',
    detail:
      'Microcontrollers and RTOS environments reinforced procedural styles for determinism and memory control.',
  },
  {
    title: 'Procedural cores in modern stacks',
    detail:
      'Even in OO or functional systems, performance-critical paths often remain procedural for clarity and speed.',
  },
]

const mentalModels = [
  {
    title: 'State machine narrative',
    detail:
      'Procedural code advances program state through explicit steps. Think of it as a controlled state machine where each instruction transitions the system.',
  },
  {
    title: 'Top-down refinement',
    detail:
      'Start with a high-level procedure and refine into smaller procedures. Each level hides detail but preserves the same control flow skeleton.',
  },
  {
    title: 'Data lives longer than code',
    detail:
      'Procedures operate on shared data structures. Keeping data layout clear and minimizing hidden side effects prevents sprawling coupling.',
  },
  {
    title: 'Control is the asset',
    detail:
      'Procedural programming makes execution order explicit, which is critical for resource management and performance.',
  },
  {
    title: 'Ownership prevents chaos',
    detail:
      'Clear ownership rules for data and resources keep mutation safe and predictable.',
  },
  {
    title: 'Interfaces are conventions',
    detail:
      'Function signatures and module boundaries act as the main contracts.',
  },
]

const mechanics = [
  {
    heading: 'Control flow building blocks',
    bullets: [
      'Sequence, selection (if/else, switch), and iteration (for/while) compose most procedural logic.',
      'Procedures/functions encapsulate reusable steps, with parameters defining inputs and return values outputs.',
      'Explicit stack frames track local variables and call state; recursion uses the same mechanism as iteration.',
      'Structured exits and early returns can simplify error handling when used consistently.',
    ],
  },
  {
    heading: 'Data and scope',
    bullets: [
      'Local scope contains transient state; global or module scope holds shared state. Uncontrolled globals lead to implicit coupling.',
      'Pass-by-value vs pass-by-reference affects whether callees can mutate caller-owned data.',
      'Structured types (records/structs) group related fields; clear ownership rules prevent accidental aliasing.',
      'Const correctness prevents unintended mutation in shared structures.',
    ],
  },
  {
    heading: 'Modularity and interfaces',
    bullets: [
      'Headers or module interfaces declare procedure signatures and shared types, separating declaration from definition.',
      'Cohesive modules reduce the surface of global state. Stable interfaces allow independent compilation and testing.',
      'Error handling uses return codes, exceptions, or out parameters; consistent conventions keep control flow readable.',
      'Defensive programming with clear preconditions avoids undefined states.',
    ],
  },
  {
    heading: 'Resource management',
    bullets: [
      'Explicit allocation and deallocation make lifetimes clear but require discipline.',
      'RAII-style patterns in procedural code use scoped wrappers to ensure cleanup.',
      'Handles and context objects bundle related state for cleaner APIs.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Algorithmic asymptotics are front and center',
    detail:
      'Procedural code often teaches core algorithms directly. Big-O stays the same across paradigms; procedural code makes the steps explicit and sometimes easier to count.',
  },
  {
    title: 'Constant factors and memory locality',
    detail:
      'Predictable loops and data layouts can be cache-friendly. Avoiding indirection yields better spatial locality than deep object graphs.',
  },
  {
    title: 'Global state and coupling',
    detail:
      'Shared mutable state can create hidden dependencies that complicate reasoning and concurrency. Discipline around globals and side effects is crucial.',
  },
  {
    title: 'Branching costs',
    detail:
      'Complex branching and unpredictable control flow can hurt CPU branch prediction and performance.',
  },
]

const applications = [
  {
    context: 'Systems programming',
    detail:
      'Kernels, drivers, and embedded firmware rely on procedural control for determinism and close hardware interaction, often in C.',
  },
  {
    context: 'Numerical and scientific computing',
    detail:
      'Fortran and C implement core numerical kernels with tight loops and explicit memory layouts to maximize performance.',
  },
  {
    context: 'Scripting and automation',
    detail:
      'Shell scripts and simple Python or Bash programs use straightforward procedures to orchestrate tasks and command pipelines.',
  },
  {
    context: 'Legacy business logic',
    detail:
      'COBOL and PL/SQL style procedural code still runs critical batch processing and transaction systems, prized for explicit control flows.',
  },
  {
    context: 'Game engine subsystems',
    detail:
      'Physics, animation, and AI often use procedural loops for predictable frame timing.',
  },
  {
    context: 'Networking and IO',
    detail:
      'Protocol parsers and packet processing benefit from explicit state machines.',
  },
]

const examples = [
  {
    title: 'Top-down refinement (C)',
    code: `void process_file(const char* path) {
    FILE* f = fopen(path, "r");
    if (!f) { log_error("open failed"); return; }
    process_records(f);
    fclose(f);
}

void process_records(FILE* f) {
    char line[256];
    while (fgets(line, sizeof line, f)) {
        handle_line(line);
    }
}`,
    explanation:
      'A high-level procedure delegates to smaller ones. Control flow and resource lifetimes are explicit, making it easier to audit behavior.',
  },
  {
    title: 'Pure function within procedural code (C)',
    code: `int clamp(int value, int lo, int hi) {
    if (value < lo) return lo;
    if (value > hi) return hi;
    return value;
}`,
    explanation:
      'Procedural programs can still isolate pure computations. Keeping such helpers side-effect-free improves testability and reuse.',
  },
  {
    title: 'Avoiding hidden globals (C)',
    code: `// Prefer passing context explicitly
void render(Scene* scene, Renderer* r);

// Instead of relying on implicit singletons
Scene* globalScene;
Renderer* globalRenderer;`,
    explanation:
      'Explicit parameters make dependencies visible and reduce coupling. Global state invites implicit dependencies and concurrency hazards.',
  },
  {
    title: 'Error handling convention (C)',
    code: `int read_config(const char* path, Config* out) {
  FILE* f = fopen(path, "r");
  if (!f) return -1;
  int ok = parse_config(f, out);
  fclose(f);
  return ok ? 0 : -2;
}`,
    explanation:
      'Consistent error codes simplify control flow and make failures predictable.',
  },
  {
    title: 'Data-oriented loop (C)',
    code: `for (size_t i = 0; i < count; i++) {
  sum += values[i] * weights[i];
}`,
    explanation:
      'Simple loops over arrays maximize cache locality and are easy to optimize.',
  },
]

const pitfalls = [
  'Uncontrolled global state creates tight coupling and makes code hard to reason about or parallelize.',
  'Duplicated logic emerges when procedures are not factored, leading to divergence over time.',
  'Error handling scattered across code paths can become inconsistent; centralize conventions.',
  'Long procedures with mixed levels of abstraction become brittle and hard to test; refactor into coherent units.',
  'Recursion without guardrails can overflow the stack; iterative equivalents may be safer in constrained environments.',
  'Implicit assumptions about global state break reusability and testing.',
  'Hidden resource ownership causes leaks and double-frees.',
]

const decisionPoints = [
  'Need explicit control over sequence, resources, and performance: procedural style keeps machinery visible.',
  'Working in low-level or embedded environments: simple procedures and predictable control fit constrained runtimes.',
  'Building small scripts or utilities: procedural flow is quick to write and easy to follow.',
  'When domains grow complex: consider layering with modular boundaries or mixing in FP/OOP patterns for better abstraction.',
  'When performance is critical, procedural loops often beat abstracted pipelines.',
]

const advancedInsights = [
  {
    title: 'Structured programming discipline',
    detail:
      'Even without advanced abstractions, clear control structures, single exit points where helpful, and minimal goto usage keep code maintainable and analyzable.',
  },
  {
    title: 'Data-oriented design within procedures',
    detail:
      'Arrange data for cache locality (struct of arrays vs array of structs) and process in tight loops to extract performance while staying procedural.',
  },
  {
    title: 'Refinement and layering',
    detail:
      'Separate orchestration procedures from computational kernels. Keep IO and side effects at the edges to simplify testing and reuse of core logic.',
  },
  {
    title: 'Tooling and verification',
    detail:
      'Static analyzers, linters, and formal methods (SPARK Ada) can enforce contracts and prove properties in procedural code, reducing runtime defects.',
  },
  {
    title: 'Finite state machines',
    detail:
      'Procedural state machines provide explicit, testable control for protocols and workflows.',
  },
  {
    title: 'Boundary-driven design',
    detail:
      'Clear API boundaries and data ownership prevent accidental coupling across subsystems.',
  },
]

const sources = [
  'Structured Programming (Dahl, Dijkstra, Hoare) for foundational control flow discipline.',
  'The C Programming Language (Kernighan and Ritchie) for idiomatic procedural C.',
  'Programming in Modula-2 (Wirth) and Ada docs for modular procedural design.',
  'GeeksforGeeks: procedural programming overviews for quick contrasts.',
  'Clean Code (Martin) for procedural function design and refactoring heuristics.',
]

const takeaways = [
  'Procedural programming organizes code as stepwise instructions manipulating state, keeping control flow explicit.',
  'Clarity depends on disciplined use of scope, minimal globals, and coherent procedure boundaries.',
  'Performance benefits from predictable loops and data locality; beware recursion depth and unmanaged shared state.',
  'Mixing procedural cores with selective abstraction (modules, pure helpers) balances simplicity with maintainability.',
  'Explicit resource management is powerful but demands consistency and testing.',
  'Procedural style remains essential for systems where transparency and performance dominate.',
]

const toolingEcosystem = [
  {
    title: 'Languages',
    detail:
      'C, Pascal, Ada, Fortran, and procedural subsets of modern languages remain widely used.',
  },
  {
    title: 'Tooling',
    detail:
      'Compilers, static analyzers, and sanitizers catch memory and control-flow bugs early.',
  },
  {
    title: 'Build systems',
    detail:
      'Make, CMake, and Bazel enable modular compilation and reproducible builds.',
  },
  {
    title: 'Testing',
    detail:
      'Unit tests and integration harnesses validate procedural flows and edge cases.',
  },
]

const debuggingWorkflow = [
  {
    title: 'Trace execution',
    detail:
      'Use debuggers and logging to follow control flow step-by-step.',
  },
  {
    title: 'Validate invariants',
    detail:
      'Assert preconditions and postconditions near critical operations.',
  },
  {
    title: 'Check ownership',
    detail:
      'Track who allocates and frees resources to avoid leaks.',
  },
  {
    title: 'Profile hot loops',
    detail:
      'Measure hotspots to guide optimization instead of guessing.',
  },
]

const productionChecklist = [
  {
    title: 'Correctness',
    detail:
      'Use consistent error handling and validate inputs early.',
  },
  {
    title: 'Performance',
    detail:
      'Keep hot loops tight and memory access predictable.',
  },
  {
    title: 'Reliability',
    detail:
      'Avoid hidden globals and enforce clear data ownership.',
  },
  {
    title: 'Maintainability',
    detail:
      'Refactor long procedures and keep modules cohesive.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'Control flow, procedures, and scope rules.',
  },
  {
    step: 'Data and memory',
    detail: 'Pointers, structs, and ownership patterns.',
  },
  {
    step: 'Modularity',
    detail: 'Headers, modules, and interface design.',
  },
  {
    step: 'Performance',
    detail: 'Profiling, caching, and optimization basics.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.proc-win98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.proc-win98-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.proc-win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.proc-win98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.proc-win98-titlecontrols {
  display: flex;
  gap: 2px;
}

.proc-win98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
}

.proc-win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.proc-win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.proc-win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.proc-win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.proc-win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.proc-win98-toc h2 {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.proc-win98-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.proc-win98-toc li {
  margin: 0 0 8px;
}

.proc-win98-toc a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.proc-win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.proc-win98-content h1 {
  font-size: 20px;
  margin: 0 0 12px;
}

.proc-win98-content h2 {
  font-size: 16px;
  margin: 0 0 8px;
}

.proc-win98-content h3 {
  font-size: 13px;
  margin: 0 0 6px;
}

.proc-win98-content section {
  margin: 0 0 20px;
}

.proc-win98-content p,
.proc-win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.proc-win98-content p {
  margin: 0 0 10px;
}

.proc-win98-content ul,
.proc-win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.proc-win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.proc-win98-code {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  margin: 6px 0 10px;
  padding: 8px;
}

.proc-win98-code code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .proc-win98-main {
    grid-template-columns: 1fr;
  }

  .proc-win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .proc-win98-titletext {
    font-size: 13px;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-applications', label: 'Real-world Applications' },
    { id: 'bp-complexity', label: 'Complexity and Performance' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-tooling', label: 'Tooling and Ecosystem' },
    { id: 'core-debugging', label: 'Debugging Workflow' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [
    { id: 'glossary-terms', label: 'Terms and Concepts' },
    { id: 'glossary-sources', label: 'Further Reading and Sources' },
  ],
}

export default function ProceduralProgrammingPage(): JSX.Element {
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
    document.title = `Procedural Programming (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Procedural Programming',
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
    <div className="proc-win98-page">
      <style>{win98HelpStyles}</style>
      <div className="proc-win98-window" role="presentation">
        <header className="proc-win98-titlebar">
          <span className="proc-win98-titletext">Procedural Programming</span>
          <div className="proc-win98-titlecontrols">
            <button className="proc-win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="proc-win98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="proc-win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`proc-win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="proc-win98-main">
          <aside className="proc-win98-toc" aria-label="Table of contents">
            <h2>Contents</h2>
            <ul>
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="proc-win98-content">
            <h1>Procedural Programming</h1>
            <p>
              Procedural programming structures software as sequences of commands that transform state. It keeps control flow
              explicit, making resource management and performance visible, while relying on disciplined scoping and modularity
              to avoid the pitfalls of sprawling shared state.
            </p>
            <p>
              Procedures decompose work into ordered steps. When used with clear scopes and limited globals, the style yields
              readable, predictable code. It remains the backbone of systems software, numerical kernels, and everyday scripting
              because the cost model is transparent.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview">
                  <h2>Overview</h2>
                  <p>
                    Procedural style emphasizes explicit control over sequence, state transitions, and resource lifetimes. That clarity
                    enables deterministic behavior and straightforward performance analysis, but requires strict conventions around scope,
                    ownership, and module boundaries.
                  </p>
                </section>
                <hr className="proc-win98-divider" />
                <section id="bp-history">
                  <h2>Historical Context</h2>
                  {milestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications">
                  <h2>Real-world Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-complexity">
                  <h2>Complexity and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Favor clear, linear control in hot paths. Reduce indirection, batch memory accesses, and prefer iterative
                    solutions when stack depth is a concern. Measure cache behavior for performance-critical loops.
                  </p>
                </section>
                <section id="bp-takeaways">
                  <h2>Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental-models">
                  <h2>Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics">
                  <h2>How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3>{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-when-to-use">
                  <h2>When to Use It</h2>
                  <ol>
                    {decisionPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-pitfalls">
                  <h2>Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced">
                  <h2>Advanced Insights and Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-tooling">
                  <h2>Tooling and Ecosystem</h2>
                  {toolingEcosystem.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging">
                  <h2>Debugging Workflow</h2>
                  {debuggingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-production">
                  <h2>Production Checklist</h2>
                  {productionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning">
                  <h2>Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical">
                <h2>Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3>{example.title}</h3>
                    <div className="proc-win98-code">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms">
                  <h2>Terms and Concepts</h2>
                  <p><strong>Procedure:</strong> A named sequence of steps that performs a task and may receive parameters.</p>
                  <p><strong>Structured programming:</strong> Using sequence, selection, and iteration instead of unstructured jumps.</p>
                  <p><strong>Top-down refinement:</strong> Decomposing high-level routines into progressively smaller procedures.</p>
                  <p><strong>Scope:</strong> Region where a variable or symbol is visible and valid.</p>
                  <p><strong>Global state:</strong> Shared mutable data accessible across procedures, often a source of coupling.</p>
                  <p><strong>Pass-by-value:</strong> Supplying a copy of data to a procedure.</p>
                  <p><strong>Pass-by-reference:</strong> Supplying an alias/pointer that allows direct mutation of caller-owned data.</p>
                  <p><strong>RAII-style cleanup:</strong> Ensuring resource release through scoped lifetime patterns.</p>
                  <p><strong>Const correctness:</strong> Declaring non-mutating contracts to prevent accidental writes.</p>
                  <p><strong>Data locality:</strong> Organizing memory access patterns to improve cache behavior.</p>
                  <p><strong>Finite state machine:</strong> Explicit state transitions driven by events and conditions.</p>
                  <p><strong>Ownership:</strong> Clear assignment of responsibility for allocating and freeing resources.</p>
                </section>
                <section id="glossary-sources">
                  <h2>Further Reading and Sources</h2>
                  <ul>
                    {sources.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
