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
    title: 'Standardization begins (1998)',
    detail:
      'The first ISO C++ standard established a stable core language and library baseline.',
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
  {
    title: 'Tooling and safety culture grows (2010s-2020s)',
    detail:
      'Sanitizers, static analyzers, and guidelines pushed the community toward safer defaults.',
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
  {
    title: 'Pay for what you use',
    detail:
      'Features like exceptions, RTTI, and virtual dispatch are optional and can be avoided when needed.',
  },
]

const languageFundamentals = [
  {
    title: 'Compiled with direct memory access',
    detail:
      'C++ compiles to native code and exposes pointers for low-level control.',
  },
  {
    title: 'Multiple paradigms',
    detail:
      'Supports OOP, generic programming, and functional styles in one language.',
  },
  {
    title: 'Strong static typing',
    detail:
      'Types are checked at compile time, enabling optimization and early error detection.',
  },
  {
    title: 'Deterministic destructors',
    detail:
      'Object lifetime is deterministic, making cleanup predictable and safe.',
  },
]

const compilationPipeline = [
  {
    stage: 'Preprocess',
    description: 'Headers are expanded and macros are applied.',
  },
  {
    stage: 'Compile',
    description: 'Source files compile into object files with optimizations.',
  },
  {
    stage: 'Link',
    description: 'Object files and libraries combine into an executable or library.',
  },
  {
    stage: 'Runtime',
    description: 'Static initialization and program startup occur before main.',
  },
]

const typeSystemDetails = [
  {
    title: 'Value and reference types',
    detail:
      'Value types copy by default, references provide aliasing without ownership.',
  },
  {
    title: 'RAII ownership',
    detail:
      'std::unique_ptr and std::shared_ptr express ownership explicitly.',
  },
  {
    title: 'Templates and concepts',
    detail:
      'Templates enable generic code; concepts add constraints and better diagnostics.',
  },
  {
    title: 'Move semantics',
    detail:
      'Moves avoid expensive copies for large objects and resources.',
  },
]

const standardLibraryHighlights = [
  {
    title: 'Containers',
    detail:
      'vector, map, unordered_map, deque, and array cover common data structures.',
  },
  {
    title: 'Algorithms',
    detail:
      'A rich algorithm library encourages reuse and composability.',
  },
  {
    title: 'Concurrency',
    detail:
      'Threads, atomics, mutexes, and futures support parallel workflows.',
  },
  {
    title: 'Ranges and views',
    detail:
      'Lazy views express pipelines without extra allocations.',
  },
]

const coreOopFeatures = [
  {
    heading: 'Encapsulation',
    bullets: [
      'Classes group data and methods with access control.',
      'Constructors enforce valid initialization.',
      'Private members protect invariants.',
      'const correctness protects logical state.',
    ],
  },
  {
    heading: 'Inheritance',
    bullets: [
      'Derived classes reuse and extend base behavior.',
      'Virtual methods enable polymorphism.',
      'Use with care to avoid fragile hierarchies.',
      'Prefer interface inheritance over deep trees.',
    ],
  },
  {
    heading: 'Polymorphism',
    bullets: [
      'Dynamic dispatch via virtual functions.',
      'Interfaces modeled with pure virtual classes.',
      'Prefer composition when possible.',
      'Type erasure offers runtime polymorphism without inheritance.',
    ],
  },
  {
    heading: 'RAII',
    bullets: [
      'Resource acquisition is initialization.',
      'Objects clean up resources in destructors.',
      'Deterministic cleanup for files, locks, and memory.',
      'Scope guards handle error paths safely.',
    ],
  },
  {
    heading: 'Templates and generics',
    bullets: [
      'Compile-time polymorphism via templates.',
      'Generic containers and algorithms.',
      'Concepts add constraints and clearer errors.',
      'constexpr enables compile-time evaluation.',
    ],
  },
  {
    heading: 'Memory model',
    bullets: [
      'Manual control of allocation and layout.',
      'Smart pointers enforce ownership.',
      'Undefined behavior requires discipline.',
      'Alignment and cache locality impact performance.',
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
    title: 'Minimize virtual dispatch',
    detail:
      'Use templates or final where polymorphism costs are not needed.',
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
  {
    title: 'Use sanitizers early',
    detail:
      'AddressSanitizer and UndefinedBehaviorSanitizer catch costly bugs.',
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
  {
    context: 'High performance computing',
    detail:
      'Numerical simulation and scientific computing depend on tuned C++ kernels.',
  },
  {
    context: 'Graphics and media',
    detail:
      'Renderers, video pipelines, and codecs rely on C++ for throughput.',
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
  {
    title: 'Modern value type with move',
    code: `#include <vector>
#include <string>

struct Packet {
  std::vector<int> data;
  std::string tag;
};

Packet makePacket() {
  Packet p;
  p.data.reserve(1024);
  p.tag = "frame";
  return p;
}`,
    explanation:
      'Return values move efficiently in modern C++ without extra copies.',
  },
  {
    title: 'std::unique_ptr ownership',
    code: `#include <memory>

struct Node {
  int value;
  std::unique_ptr<Node> next;
};

auto head = std::make_unique<Node>();`,
    explanation:
      'unique_ptr makes ownership explicit and prevents accidental leaks.',
  },
]

const pitfalls = [
  'Manual memory management mistakes: leaks, double deletes, or dangling pointers.',
  'Overusing inheritance and deep class hierarchies that are hard to maintain.',
  'Undefined behavior from out-of-bounds access or lifetime bugs.',
  'Ignoring rule of three or five when managing resources.',
  'Slow builds due to heavy template usage without modularization.',
  'Mixing raw and smart pointers without clear ownership rules.',
  'Excessive header coupling that increases compile times.',
]

const decisionGuidance = [
  'Need tight control over performance and memory: C++ is a strong fit.',
  'Need OOP with low-level access and deterministic cleanup: C++ excels.',
  'Need fast startup and low-level system integration: C++ delivers.',
  'Need rapid scripting or minimal complexity: consider higher-level languages.',
  'Need safe memory without manual discipline: consider Rust or managed runtimes.',
  'Need cross-platform native libraries: C++ is a common choice.',
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
    title: 'ABI boundaries',
    detail:
      'C++ ABI stability varies by compiler and version. Expose C APIs when needed.',
  },
  {
    title: 'Modern C++ concurrency',
    detail:
      'std::thread, atomics, and async support many concurrency models when used carefully.',
  },
  {
    title: 'Build and tooling discipline',
    detail:
      'Use CMake, clang-tidy, and sanitizers for quality in large codebases.',
  },
]

const takeaways = [
  'C++ combines object-oriented design with low-level control.',
  'Performance and determinism are its core strengths.',
  'Safety depends on disciplined ownership and modern best practices.',
  'Modern C++ features make safer, more expressive code possible.',
  'Tooling is essential to keep large C++ systems maintainable.',
]

const toolingWorkflow = [
  {
    title: 'Build systems',
    detail:
      'CMake and Meson manage cross-platform builds and dependencies.',
  },
  {
    title: 'Package managers',
    detail:
      'vcpkg and Conan help standardize third-party libraries.',
  },
  {
    title: 'Static analysis',
    detail:
      'clang-tidy and cppcheck catch issues early.',
  },
  {
    title: 'Profiling',
    detail:
      'perf, VTune, and Tracy help diagnose performance bottlenecks.',
  },
]

const concurrencyOptions = [
  {
    title: 'Threads and tasks',
    detail:
      'std::thread, std::async, and thread pools power parallel work.',
  },
  {
    title: 'Lock-free and atomics',
    detail:
      'Atomics enable high-performance synchronization when used carefully.',
  },
  {
    title: 'Coroutines',
    detail:
      'C++20 coroutines support async IO and lazy generators.',
  },
  {
    title: 'Parallel STL',
    detail:
      'Parallel algorithms can speed up data processing workloads.',
  },
]

const interopOptions = [
  {
    title: 'C compatibility',
    detail:
      'Expose C-style APIs for stable ABI and broad language support.',
  },
  {
    title: 'Python bindings',
    detail:
      'pybind11 makes it easy to call C++ from Python.',
  },
  {
    title: 'Rust and Zig',
    detail:
      'C ABI bridges allow safe interop with modern systems languages.',
  },
  {
    title: '.NET and Java',
    detail:
      'C++/CLI and JNI integrate with managed runtimes.',
  },
]

const deploymentOptions = [
  {
    title: 'Static and shared libraries',
    detail:
      'Ship performance-critical components as .a or .so/.dll.',
  },
  {
    title: 'Native executables',
    detail:
      'Standalone binaries are common for tools and services.',
  },
  {
    title: 'Embedded targets',
    detail:
      'Cross-compile with toolchains for microcontrollers and devices.',
  },
  {
    title: 'Plugins and SDKs',
    detail:
      'Expose ABI-stable plugin boundaries for extensions.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to Rust',
    detail:
      'Rust offers stronger compile-time safety, while C++ has broader legacy and ecosystem.',
  },
  {
    title: 'Compared to Java',
    detail:
      'C++ provides lower-level control and faster startup, Java offers managed safety.',
  },
  {
    title: 'Compared to C',
    detail:
      'C++ adds RAII, templates, and OOP while keeping low-level access.',
  },
  {
    title: 'Compared to Python',
    detail:
      'C++ is far faster for hot paths but slower to develop for quick prototypes.',
  },
]

const learningPath = [
  {
    title: 'Core syntax and RAII',
    detail:
      'Learn classes, constructors, destructors, and ownership rules.',
  },
  {
    title: 'STL mastery',
    detail:
      'Use vectors, maps, algorithms, and iterators idiomatically.',
  },
  {
    title: 'Modern C++ features',
    detail:
      'Practice move semantics, smart pointers, and lambdas.',
  },
  {
    title: 'Performance and debugging',
    detail:
      'Use sanitizers, profilers, and careful measurement.',
  },
  {
    title: 'Systems and concurrency',
    detail:
      'Learn threads, atomics, and low-level system integration.',
  },
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
            <legend>Language fundamentals</legend>
            <div className="win95-grid win95-grid-2">
              {languageFundamentals.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compilation pipeline</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>What happens</th>
                  </tr>
                </thead>
                <tbody>
                  {compilationPipeline.map((item) => (
                    <tr key={item.stage}>
                      <td>{item.stage}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Type system and ownership</legend>
            <div className="win95-grid win95-grid-2">
              {typeSystemDetails.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Standard library highlights</legend>
            <div className="win95-grid win95-grid-2">
              {standardLibraryHighlights.map((item) => (
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
            <legend>Tooling and workflow</legend>
            <div className="win95-grid win95-grid-2">
              {toolingWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Concurrency and parallelism</legend>
            <div className="win95-grid win95-grid-2">
              {concurrencyOptions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Interoperability and deployment</legend>
            <div className="win95-grid win95-grid-2">
              {interopOptions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-grid win95-grid-2">
              {deploymentOptions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
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
            <legend>Comparisons and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {comparisonNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Learning path</legend>
            <div className="win95-grid win95-grid-2">
              {learningPath.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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

