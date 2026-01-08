import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
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

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
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
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
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
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
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

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMilestones = [
  {
    title: 'C emerges from UNIX and B (1972)',
    detail:
      'Dennis Ritchie designs C for systems work on UNIX, balancing low-level access with portability.',
  },
  {
    title: 'K&R C defines early practice (1978)',
    detail:
      'The first edition of "The C Programming Language" standardizes idioms and the style of C programs.',
  },
  {
    title: 'ANSI C formalizes the standard (1989)',
    detail:
      'C89 introduces function prototypes and a precise standard library, enabling portable compilers.',
  },
  {
    title: 'C99 adds modern features (1999)',
    detail:
      'Declaring variables anywhere, inline functions, and better numeric types make C more expressive.',
  },
]

const mentalModels = [
  {
    title: 'A thin layer over hardware',
    detail:
      'C is a portable assembler: you control memory layout, bit patterns, and call conventions with minimal abstraction.',
  },
  {
    title: 'You own the memory',
    detail:
      'Allocation, lifetime, and freeing are explicit. The compiler trusts you, so mistakes become bugs.',
  },
  {
    title: 'Undefined behavior is a contract',
    detail:
      'C grants the compiler freedom to optimize by leaving some operations undefined. Correctness demands discipline.',
  },
]

const coreConcepts = [
  {
    heading: 'Types and layout',
    bullets: [
      'Primitive types map to machine word sizes; sizeof and alignment drive struct layout.',
      'Pointers are raw addresses. Pointer arithmetic assumes contiguous memory.',
      'Bitfields and unions expose packed representations for protocols and hardware registers.',
    ],
  },
  {
    heading: 'Memory management',
    bullets: [
      'Stack allocation is automatic; heap allocation uses malloc/free and friends.',
      'Lifetime is explicit: use-after-free and leaks are common pitfalls.',
      'RAII does not exist in C; cleanup must be coded on every exit path.',
    ],
  },
  {
    heading: 'Compilation model',
    bullets: [
      'Translation units compile separately; headers declare interfaces.',
      'The preprocessor handles macros and conditional compilation.',
      'Linkers resolve symbols, producing libraries or executables.',
    ],
  },
  {
    heading: 'Error handling',
    bullets: [
      'Return codes, errno, and out-parameters dominate; no exceptions.',
      'Defensive checks and clear ownership rules prevent silent corruption.',
      'APIs often follow "init/use/destroy" lifecycles.',
    ],
  },
]

const memoryModelNotes = [
  {
    title: 'Stack vs heap',
    detail:
      'Stack allocations are fast and scoped, but limited in size. Heap allocations are flexible but require manual cleanup.',
  },
  {
    title: 'Pointer aliasing',
    detail:
      'Aliasing rules affect optimization. Use restrict to promise non-overlapping memory for better performance.',
  },
  {
    title: 'Endianness and representation',
    detail:
      'C exposes raw bytes; serialization must specify byte order to stay portable.',
  },
  {
    title: 'Struct padding',
    detail:
      'Compilers insert padding for alignment. Reordering fields can reduce wasted space.',
  },
]

const performanceTradeoffs = [
  {
    title: 'Predictable performance',
    detail:
      'No runtime or GC means tight control over CPU and memory usage, ideal for embedded and OS kernels.',
  },
  {
    title: 'Safety versus speed',
    detail:
      'Bounds checks and runtime validation are manual. Extra checks improve safety but cost cycles.',
  },
  {
    title: 'I/O and syscalls',
    detail:
      'Performance is often gated by system calls and cache behavior, not arithmetic.',
  },
  {
    title: 'Tooling matters',
    detail:
      'Sanitizers, static analyzers, and fuzzers are essential to keep low-level code reliable.',
  },
]

const realWorldUses = [
  {
    context: 'Operating systems and kernels',
    detail:
      'C dominates OS codebases because it exposes registers, memory mapping, and interrupts directly.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Microcontrollers need deterministic memory usage and minimal runtime overhead.',
  },
  {
    context: 'Databases and storage engines',
    detail:
      'Low-level control enables carefully tuned buffering, paging, and serialization.',
  },
  {
    context: 'Networking stacks',
    detail:
      'Packet parsing and protocol state machines require tight control over bytes and performance.',
  },
]

const examples = [
  {
    title: 'Manual memory ownership',
    code: `#include <stdlib.h>

typedef struct {
    int *values;
    size_t length;
} IntBuffer;

IntBuffer *buffer_create(size_t length) {
    IntBuffer *buffer = malloc(sizeof(IntBuffer));
    buffer->values = malloc(sizeof(int) * length);
    buffer->length = length;
    return buffer;
}

void buffer_destroy(IntBuffer *buffer) {
    free(buffer->values);
    free(buffer);
}`,
    explanation:
      'Ownership is explicit. Allocate, use, then free in the right order to avoid leaks or corruption.',
  },
  {
    title: 'Pointer arithmetic for array traversal',
    code: `int sum(const int *values, size_t length) {
    int total = 0;
    const int *end = values + length;
    for (const int *ptr = values; ptr < end; ++ptr) {
        total += *ptr;
    }
    return total;
}`,
    explanation:
      'Pointer arithmetic is fast but assumes contiguous memory. Off-by-one errors are common.',
  },
  {
    title: 'Bit masking for flags',
    code: `#define FLAG_READ  (1 << 0)
#define FLAG_WRITE (1 << 1)
#define FLAG_EXEC  (1 << 2)

int has_flag(int flags, int mask) {
    return (flags & mask) != 0;
}`,
    explanation:
      'Bit flags are compact and fast, ideal for permissions or hardware registers.',
  },
]

const pitfalls = [
  'Using uninitialized memory leads to nondeterministic bugs.',
  'Buffer overflows and out-of-bounds access are silent and dangerous.',
  'Forgetting to free memory causes leaks; double-free causes corruption.',
  'Assuming sizeof(int) or endianness is portable across platforms.',
  'Undefined behavior (shift overflow, aliasing violations) can break optimizations.',
]

const decisionGuidance = [
  'Use C when you need deterministic performance, low-level control, or direct hardware access.',
  'Favor C for interoperability with existing systems code or libraries.',
  'Avoid C when safety and rapid iteration matter more than raw control.',
  'Lean on static analyzers and sanitizers for production-grade codebases.',
  'Document ownership and lifetimes explicitly in APIs.',
]

const advancedInsights = [
  {
    title: 'ABI awareness',
    detail:
      'C is the lingua franca of binary interfaces. Stable ABIs enable interoperable libraries across languages.',
  },
  {
    title: 'Link-time optimization',
    detail:
      'Whole-program optimization can inline across translation units, but requires build coordination.',
  },
  {
    title: 'Memory-mapped I/O',
    detail:
      'Volatile pointers and careful ordering are required when interacting with hardware registers.',
  },
  {
    title: 'Safer C subsets',
    detail:
      'MISRA C and CERT C define rule sets that reduce undefined behavior in critical systems.',
  },
]

const takeaways = [
  'C offers direct control over memory and performance, with minimal abstraction overhead.',
  'The power comes with risk: correctness depends on rigorous discipline and tooling.',
  'C remains essential for kernels, embedded systems, and performance-critical libraries.',
  'Well-designed APIs clarify ownership, lifetimes, and error handling for users.',
]

export default function CPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">C</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Systems programming with explicit memory and predictable performance</div>
              <p className="win95-text">
                C is designed for direct control: memory layout, data representation, and system calls are all explicit. It rewards
                careful engineering with unmatched predictability and portability, making it the core language for kernels, embedded
                firmware, and performance-critical libraries.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                C is a minimal abstraction over hardware. It compiles to efficient machine code, exposes raw pointers, and leaves
                safety checks to the programmer. The language is small, but the responsibility it gives you is large.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: C fundamentals</legend>
            <div className="win95-grid win95-grid-2">
              {coreConcepts.map((block) => (
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
            <legend>How it works: memory model</legend>
            <div className="win95-grid win95-grid-2">
              {memoryModelNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {performanceTradeoffs.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                C lets you hit tight performance envelopes, but only when you reason about memory, cache behavior, and the
                compiler. The performance ceiling is high, but so is the engineering cost.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
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
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
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
            <legend>Key takeaways</legend>
            <div className="win95-panel">
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
