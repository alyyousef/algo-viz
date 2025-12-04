import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="Procedural Programming"
      subtitle="Stepwise instructions and stateful flow"
      intro="Procedural programming structures software as sequences of commands that transform state. It keeps control flow explicit, making resource management and performance visible, while relying on disciplined scoping and modularity to avoid the pitfalls of sprawling shared state."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Procedures decompose work into ordered steps. When used with clear scopes and limited globals, the style yields readable,
          predictable code. It remains the backbone of systems software, numerical kernels, and everyday scripting because the cost
          model is transparent.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {milestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-3">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Favor clear, linear control in hot paths. Reduce indirection, batch memory accesses, and prefer iterative solutions when
          stack depth is a concern. Measure cache behavior for performance-critical loops.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Further reading and sources">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {sources.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
