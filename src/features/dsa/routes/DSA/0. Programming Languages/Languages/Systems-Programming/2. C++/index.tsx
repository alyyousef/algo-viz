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
    title: 'C++ begins as "C with Classes" (1983)',
    detail:
      'Bjarne Stroustrup adds classes, constructors, and destructors to C, targeting systems with better abstraction.',
  },
  {
    title: 'Templates and STL reshape the language (1994)',
    detail:
      'Generic programming lands with templates and the Standard Template Library, enabling reusable containers and algorithms.',
  },
  {
    title: 'C++11 modernizes the core (2011)',
    detail:
      'Move semantics, lambdas, and smart pointers usher in safer, faster code without losing low-level control.',
  },
  {
    title: 'C++20 adds ranges and coroutines (2020)',
    detail:
      'Modern C++ gains expressive algorithms, constrained templates, and asynchronous workflows.',
  },
]

const mentalModels = [
  {
    title: 'Zero-overhead abstractions',
    detail:
      'High-level features are compiled away. If you do not use a feature, you do not pay for it in runtime cost.',
  },
  {
    title: 'Resource ownership via RAII',
    detail:
      'Resource acquisition is initialization: constructors acquire, destructors release, guaranteeing cleanup on scope exit.',
  },
  {
    title: 'Compile-time as a tool',
    detail:
      'Templates and constexpr shift work to compile time, generating efficient, specialized code.',
  },
]

const coreConcepts = [
  {
    heading: 'Object model and RAII',
    bullets: [
      'Constructors, destructors, and deterministic lifetimes define object behavior.',
      'Copy/move semantics control ownership transfer and performance.',
      'Smart pointers (unique_ptr, shared_ptr) codify ownership rules.',
    ],
  },
  {
    heading: 'Templates and generics',
    bullets: [
      'Templates enable type-safe generic programming with no runtime overhead.',
      'Concepts (C++20) constrain templates for better diagnostics.',
      'Metaprogramming can be powerful but increases compile times.',
    ],
  },
  {
    heading: 'Memory and layout',
    bullets: [
      'Manual allocation is possible, but RAII and allocators are preferred.',
      'Object layout is predictable, enabling packed structs and SIMD-friendly data.',
      'Alignment and padding affect cache behavior and performance.',
    ],
  },
  {
    heading: 'Compilation model',
    bullets: [
      'Headers + source files form translation units; templates require headers for definitions.',
      'Linkers resolve symbols; ODR violations cause hard-to-debug issues.',
      'Modules (C++20) aim to reduce compile times and macro leakage.',
    ],
  },
]

const languageNotes = [
  {
    title: 'Value vs reference semantics',
    detail:
      'C++ differentiates value types and reference semantics; choosing the right model affects copying, aliasing, and correctness.',
  },
  {
    title: 'Exception safety levels',
    detail:
      'APIs should document strong, basic, or no-throw guarantees. RAII makes strong guarantees achievable.',
  },
  {
    title: 'Undefined behavior remains',
    detail:
      'C++ retains undefined behavior for performance. Sanitizers and careful coding practices are essential.',
  },
  {
    title: 'The standard library contract',
    detail:
      'STL containers and algorithms provide predictable complexity and interoperability through iterators.',
  },
]

const performanceTradeoffs = [
  {
    title: 'Runtime speed vs compile time',
    detail:
      'Templates and inlining boost runtime performance but can slow compilation and inflate binaries.',
  },
  {
    title: 'Abstraction penalties are optional',
    detail:
      'Abstractions like virtual dispatch have costs, but you choose when to use them.',
  },
  {
    title: 'Memory locality matters',
    detail:
      'Struct-of-arrays layouts and contiguous containers like std::vector improve cache performance.',
  },
  {
    title: 'Concurrency control',
    detail:
      'Standard threading and atomics exist, but data races are undefined behavior without proper synchronization.',
  },
]

const realWorldUses = [
  {
    context: 'Game engines and realtime systems',
    detail:
      'C++ powers engines like Unreal and Unity because it balances performance with large-scale abstraction.',
  },
  {
    context: 'High-frequency trading',
    detail:
      'Low latency and deterministic memory control make C++ a default for trading systems.',
  },
  {
    context: 'Browsers and compilers',
    detail:
      'Performance-critical software like Chrome and LLVM rely on C++ for speed and control.',
  },
  {
    context: 'Embedded and robotics',
    detail:
      'Modern C++ brings safer ownership models to embedded systems without losing low-level control.',
  },
]

const examples = [
  {
    title: 'RAII for file handling',
    code: `#include <fstream>
#include <string>

void write_log(const std::string &message) {
    std::ofstream file("log.txt");
    file << message << "\\n";
} // file closes automatically`,
    explanation:
      'RAII ensures resources are released when the object goes out of scope, even on exceptions.',
  },
  {
    title: 'Move semantics with std::vector',
    code: `#include <vector>

std::vector<int> make_buffer() {
    std::vector<int> data(1024);
    return data; // moved or elided
}`,
    explanation:
      'Return value optimization and move semantics prevent unnecessary copying of large buffers.',
  },
  {
    title: 'Generic algorithm with templates',
    code: `template <typename T>
T clamp(T value, T low, T high) {
    if (value < low) return low;
    if (value > high) return high;
    return value;
}`,
    explanation:
      'Templates provide type-safe generic functions compiled to specialized versions per type.',
  },
]

const pitfalls = [
  'Confusing ownership leads to double frees or leaks; prefer smart pointers and clear ownership.',
  'Undefined behavior from dangling references or iterator invalidation can be catastrophic.',
  'Overusing templates can bloat binaries and slow builds without measurable gains.',
  'Mixing exceptions and manual resource management leads to leaks on error paths.',
  'Ignoring rule-of-zero/five causes accidental copies or double destruction.',
]

const decisionGuidance = [
  'Use C++ when you need zero-overhead abstractions with system-level performance.',
  'Prefer modern C++ (RAII, smart pointers, STL) over manual memory management.',
  'Adopt coding guidelines and static analysis for safety in large codebases.',
  'Choose C++ for performance-critical libraries with stable ABIs.',
  'Avoid C++ when rapid iteration and safety are more important than control.',
]

const advancedInsights = [
  {
    title: 'Rule of zero and five',
    detail:
      'Let RAII members manage resources so you write no custom destructor/copy/move logic unless needed.',
  },
  {
    title: 'Allocator-aware design',
    detail:
      'Custom allocators tune memory usage for arenas, pools, and realtime systems.',
  },
  {
    title: 'Type erasure patterns',
    detail:
      'std::function and polymorphic wrappers allow runtime flexibility without template explosion.',
  },
  {
    title: 'Modules and build health',
    detail:
      'C++20 modules reduce header parsing overhead and improve dependency clarity in large projects.',
  },
]

const takeaways = [
  'C++ balances low-level control with high-level abstractions through zero-overhead design.',
  'RAII and modern libraries make C++ safer without sacrificing performance.',
  'The language scales from embedded firmware to massive desktop applications.',
  'Discipline in ownership, build systems, and tooling separates great C++ from fragile C++.',
]

export default function CppSystemsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">C++</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Zero-overhead abstractions for systems and performance-critical software</div>
              <p className="win95-text">
                C++ builds on C with classes, templates, and modern libraries while preserving direct control over memory and
                performance. It enables high-level design without sacrificing low-level efficiency, making it a foundation for
                large, performance-critical systems.
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
                C++ is about control without overhead. You can use high-level abstractions when they help, but still drop down
                to raw memory when required. This flexibility is powerful, but demands strong conventions and disciplined design.
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
            <legend>How it works: C++ fundamentals</legend>
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
            <legend>How it works: language mechanics</legend>
            <div className="win95-grid win95-grid-2">
              {languageNotes.map((item) => (
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
                C++ performance comes from controlling abstraction costs. Modern features help safety and expressiveness, but
                they also demand build and API discipline to keep complexity manageable.
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
