import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #C0C0C0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  font-size: 12px;
  line-height: 1.35;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-page a:focus,
.win95-button:focus,
.win95-control:focus {
  outline: 1px dotted #000;
  outline-offset: -2px;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  border-radius: 0;
  box-shadow: none;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.win95-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
  color: #000;
  text-decoration: none;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin: 0 0 10px;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 8px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  margin: 0 0 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-code {
  margin: 6px 0 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
}
`

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
]

const mechanics = [
  {
    heading: 'Control flow building blocks',
    bullets: [
      'Sequence, selection (if/else, switch), and iteration (for/while) compose most procedural logic.',
      'Procedures/functions encapsulate reusable steps, with parameters defining inputs and return values outputs.',
      'Explicit stack frames track local variables and call state; recursion uses the same mechanism as iteration.',
    ],
  },
  {
    heading: 'Data and scope',
    bullets: [
      'Local scope contains transient state; global or module scope holds shared state. Uncontrolled globals lead to implicit coupling.',
      'Pass-by-value vs pass-by-reference affects whether callees can mutate caller-owned data.',
      'Structured types (records/structs) group related fields; clear ownership rules prevent accidental aliasing.',
    ],
  },
  {
    heading: 'Modularity and interfaces',
    bullets: [
      'Headers or module interfaces declare procedure signatures and shared types, separating declaration from definition.',
      'Cohesive modules reduce the surface of global state. Stable interfaces allow independent compilation and testing.',
      'Error handling uses return codes, exceptions, or out parameters; consistent conventions keep control flow readable.',
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
]

const pitfalls = [
  'Uncontrolled global state creates tight coupling and makes code hard to reason about or parallelize.',
  'Duplicated logic emerges when procedures are not factored, leading to divergence over time.',
  'Error handling scattered across code paths can become inconsistent; centralize conventions.',
  'Long procedures with mixed levels of abstraction become brittle and hard to test; refactor into coherent units.',
  'Recursion without guardrails can overflow the stack; iterative equivalents may be safer in constrained environments.',
]

const decisionPoints = [
  'Need explicit control over sequence, resources, and performance: procedural style keeps machinery visible.',
  'Working in low-level or embedded environments: simple procedures and predictable control fit constrained runtimes.',
  'Building small scripts or utilities: procedural flow is quick to write and easy to follow.',
  'When domains grow complex: consider layering with modular boundaries or mixing in FP/OOP patterns for better abstraction.',
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
]

export default function ProceduralProgrammingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Procedural Programming</span>
          <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div className="win95-stack">
              <div className="win95-subheading">Stepwise instructions and stateful flow</div>
              <p className="win95-text">
                Procedural programming structures software as sequences of commands that transform state. It keeps control flow
                explicit, making resource management and performance visible, while relying on disciplined scoping and modularity
                to avoid the pitfalls of sprawling shared state.
              </p>
              <p className="win95-text">
                Procedures decompose work into ordered steps. When used with clear scopes and limited globals, the style yields
                readable, predictable code. It remains the backbone of systems software, numerical kernels, and everyday scripting
                because the cost model is transparent.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {milestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-3">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Favor clear, linear control in hot paths. Reduce indirection, batch memory accesses, and prefer iterative
                solutions when stack depth is a concern. Measure cache behavior for performance-critical loops.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights and frontiers</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Further reading and sources</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {sources.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
