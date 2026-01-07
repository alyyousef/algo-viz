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
    title: 'C with Classes becomes C++ (1983)',
    detail:
      'Bjarne Stroustrup extended C with classes to support object-oriented design without abandoning low-level control.',
  },
  {
    title: 'Templates and the STL (1994)',
    detail:
      'Generic programming arrived with templates and the Standard Template Library, bringing vectors, maps, and algorithms.',
  },
  {
    title: 'Modern C++ era begins (C++11)',
    detail:
      'Move semantics, smart pointers, and lambdas modernized safety and performance without losing control.',
  },
  {
    title: 'Continuous evolution (C++17, C++20, C++23)',
    detail:
      'Ranges, concepts, modules, and coroutines improved expressiveness and compile time structure.',
  },
]

const mentalModels = [
  {
    title: 'Zero-cost abstractions',
    detail:
      'C++ abstractions aim to cost no more than hand-written low-level code once compiled.',
  },
  {
    title: 'Resource ownership is explicit',
    detail:
      'You control memory and lifetimes, often through RAII, enabling deterministic cleanup.',
  },
  {
    title: 'Classes model real-world behavior',
    detail:
      'Encapsulation groups data and behavior while protecting invariants through constructors and private state.',
  },
]

const coreOopFeatures = [
  {
    heading: 'Encapsulation',
    bullets: [
      'Classes group data and methods with access control.',
      'Constructors enforce valid initialization.',
      'Private members protect invariants.',
    ],
  },
  {
    heading: 'Inheritance',
    bullets: [
      'Derived classes reuse and extend base behavior.',
      'Virtual methods enable polymorphism.',
      'Use with care to avoid fragile hierarchies.',
    ],
  },
  {
    heading: 'Polymorphism',
    bullets: [
      'Dynamic dispatch via virtual functions.',
      'Interfaces modeled with pure virtual classes.',
      'Prefer composition when possible.',
    ],
  },
  {
    heading: 'RAII',
    bullets: [
      'Resource acquisition is initialization.',
      'Objects clean up resources in destructors.',
      'Deterministic cleanup for files, locks, and memory.',
    ],
  },
  {
    heading: 'Templates and generics',
    bullets: [
      'Compile-time polymorphism via templates.',
      'Generic containers and algorithms.',
      'Concepts add constraints and clearer errors.',
    ],
  },
  {
    heading: 'Memory model',
    bullets: [
      'Manual control of allocation and layout.',
      'Smart pointers enforce ownership.',
      'Undefined behavior requires discipline.',
    ],
  },
]

const performanceNotes = [
  {
    title: 'Avoid unnecessary allocations',
    detail:
      'Prefer stack allocation and reserve capacity in containers to reduce heap churn.',
  },
  {
    title: 'Prefer value semantics',
    detail:
      'Move semantics make value types efficient and easier to reason about than shared mutable state.',
  },
  {
    title: 'Profile with real data',
    detail:
      'Use profilers to locate hot paths and verify optimizations.',
  },
  {
    title: 'Keep abstractions thin',
    detail:
      'Inlining and templates help avoid runtime overhead in performance-critical paths.',
  },
]

const realWorldUses = [
  {
    context: 'Game engines',
    detail:
      'C++ powers real-time engines where performance and memory control are essential.',
  },
  {
    context: 'Systems software',
    detail:
      'Operating systems, browsers, and compilers rely on C++ for speed and control.',
  },
  {
    context: 'Finance and trading',
    detail:
      'Low-latency systems use C++ for deterministic performance and tight memory usage.',
  },
  {
    context: 'Embedded and robotics',
    detail:
      'C++ balances hardware control with abstractions for complex behavior.',
  },
]

const examples = [
  {
    title: 'Class with RAII and encapsulation',
    code: `#include <fstream>
#include <string>

class Logger {
 public:
  explicit Logger(const std::string& path) : out_(path) {}
  void log(const std::string& msg) { out_ << msg << "\\n"; }
 private:
  std::ofstream out_;
};

int main() {
  Logger logger("app.log");
  logger.log("Started");
}`,
    explanation:
      'The file handle is owned by the Logger and closed automatically when the object goes out of scope.',
  },
  {
    title: 'Polymorphism via virtual functions',
    code: `#include <memory>
#include <vector>

struct Shape {
  virtual ~Shape() = default;
  virtual double area() const = 0;
};

struct Circle : Shape {
  double r;
  explicit Circle(double radius) : r(radius) {}
  double area() const override { return 3.14159 * r * r; }
};

double totalArea(const std::vector<std::unique_ptr<Shape>>& shapes) {
  double sum = 0;
  for (const auto& s : shapes) sum += s->area();
  return sum;
}`,
    explanation:
      'Polymorphism lets code operate on base types while using derived behavior at runtime.',
  },
  {
    title: 'Template-based generic algorithm',
    code: `#include <vector>
#include <algorithm>

template <typename T>
T clamp(T value, T lo, T hi) {
  return std::max(lo, std::min(value, hi));
}

int main() {
  int x = clamp(12, 0, 10);
}`,
    explanation:
      'Templates provide compile-time polymorphism without runtime dispatch overhead.',
  },
]

const pitfalls = [
  'Manual memory management mistakes: leaks, double deletes, or dangling pointers.',
  'Overusing inheritance and deep class hierarchies that are hard to maintain.',
  'Undefined behavior from out-of-bounds access or lifetime bugs.',
  'Ignoring rule of three or five when managing resources.',
  'Slow builds due to heavy template usage without modularization.',
]

const decisionGuidance = [
  'Need tight control over performance and memory: C++ is a strong fit.',
  'Need OOP with low-level access and deterministic cleanup: C++ excels.',
  'Need fast startup and low-level system integration: C++ delivers.',
  'Need rapid scripting or minimal complexity: consider higher-level languages.',
  'Need safe memory without manual discipline: consider Rust or managed runtimes.',
]

const advancedInsights = [
  {
    title: 'Rule of zero',
    detail:
      'Prefer types that manage resources via members with proper destructors, avoiding custom copy or move code.',
  },
  {
    title: 'Value types and immutability',
    detail:
      'Value semantics reduce aliasing bugs. Immutability simplifies multithreaded reasoning.',
  },
  {
    title: 'Modern C++ concurrency',
    detail:
      'std::thread, atomics, and async support many concurrency models when used carefully.',
  },
  {
    title: 'ABI and binary boundaries',
    detail:
      'C++ ABI stability varies by compiler. Expose C APIs for cross-language boundaries.',
  },
]

const takeaways = [
  'C++ combines object-oriented design with low-level control.',
  'Performance and determinism are its core strengths.',
  'Safety depends on disciplined ownership and modern best practices.',
  'Modern C++ features make safer, more expressive code possible.',
]

export default function CPlusPlusPage(): JSX.Element {
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
              <div className="win95-subheading">Object-oriented power with systems-level performance</div>
              <p className="win95-text">
                C++ blends object-oriented design, generic programming, and low-level control. It lets you build high-performance
                systems while modeling rich domain concepts, but it expects discipline around ownership, lifetimes, and undefined
                behavior.
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
                C++ is the classic language for performance-critical software. It supports OOP for modular design and RAII for
                deterministic resource management, while offering templates for zero-cost abstractions.
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
            <legend>How it works: OOP and core features</legend>
            <div className="win95-grid win95-grid-3">
              {coreOopFeatures.map((block) => (
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
            <legend>Performance checklist</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                C++ performance is about memory layout, ownership, and eliminating overhead. Modern C++ features help you
                write safe code without sacrificing speed.
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

