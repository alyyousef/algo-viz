import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

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
const glossaryTerms = [
  {
    term: 'Zero-cost abstractions',
    definition: mentalModels[0].detail,
  },
  {
    term: 'RAII',
    definition:
      'Resource acquisition is initialization. Objects clean up resources in destructors. Deterministic cleanup for files, locks, and memory.',
  },
  {
    term: 'Move semantics',
    definition: typeSystemDetails[3].detail,
  },
  {
    term: 'Smart pointers',
    definition: typeSystemDetails[1].detail,
  },
  {
    term: 'Concepts',
    definition: typeSystemDetails[2].detail,
  },
  {
    term: 'Rule of zero',
    definition: advancedInsights[0].detail,
  },
  {
    term: 'ABI boundaries',
    definition: advancedInsights[2].detail,
  },
  {
    term: 'Modern C++ concurrency',
    definition: advancedInsights[3].detail,
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.cpp98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cpp98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.cpp98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.cpp98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.cpp98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.cpp98-control {
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

.cpp98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.cpp98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.cpp98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.cpp98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.cpp98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.cpp98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.cpp98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cpp98-toc-list li {
  margin: 0 0 8px;
}

.cpp98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.cpp98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.cpp98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 6px;
}

.cpp98-doc-subtitle {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 12px;
}

.cpp98-section {
  margin: 0 0 20px;
}

.cpp98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.cpp98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.cpp98-content p,
.cpp98-content li,
.cpp98-content td,
.cpp98-content th {
  font-size: 12px;
  line-height: 1.5;
}

.cpp98-content p {
  margin: 0 0 10px;
}

.cpp98-content ul,
.cpp98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.cpp98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.cpp98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.cpp98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.cpp98-inline-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.cpp98-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cpp98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
}

.cpp98-table th,
.cpp98-table td {
  border: 1px solid #b5b5b5;
  padding: 6px 8px;
  text-align: left;
  vertical-align: top;
}

@media (max-width: 900px) {
  .cpp98-main {
    grid-template-columns: 1fr;
  }

  .cpp98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
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
    { id: 'bp-apps', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-fundamentals', label: 'Language Fundamentals' },
    { id: 'core-pipeline', label: 'Compilation Pipeline' },
    { id: 'core-types', label: 'Type System and Ownership' },
    { id: 'core-stdlib', label: 'Standard Library Highlights' },
    { id: 'core-oop', label: 'OOP Features' },
    { id: 'core-performance', label: 'Performance Checklist' },
    { id: 'core-concurrency', label: 'Concurrency and Parallelism' },
    { id: 'core-tooling', label: 'Tooling and Workflow' },
    { id: 'core-interop', label: 'Interoperability and Deployment' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-comparisons', label: 'Comparisons and Tradeoffs' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-learning', label: 'Learning Path' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-samples', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}
export default function CPlusPlusPage(): JSX.Element {
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
    document.title = `C++ (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'C++',
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
    <div className="cpp98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="cpp98-window" role="presentation">
        <header className="cpp98-titlebar">
          <span className="cpp98-title-text">C++</span>
          <div className="cpp98-title-controls">
            <button className="cpp98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="cpp98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="cpp98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`cpp98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="cpp98-main">
          <aside className="cpp98-toc" aria-label="Table of contents">
            <h2 className="cpp98-toc-title">Contents</h2>
            <ul className="cpp98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="cpp98-content">
            <h1 className="cpp98-doc-title">C++</h1>
            <p className="cpp98-doc-subtitle">Object-oriented power with systems-level performance</p>
            <div className="cpp98-inline-actions">
              <Link to="/algoViz" className="cpp98-push">Back to Catalog</Link>
            </div>
            <p>
              C++ blends object-oriented design, generic programming, and low-level control. It lets you build high-performance
              systems while modeling rich domain concepts, but it expects discipline around ownership, lifetimes, and undefined
              behavior.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="cpp98-section">
                  <h2 className="cpp98-heading">Overview</h2>
                  <p>
                    C++ is the classic language for performance-critical software. It supports OOP for modular design and RAII for
                    deterministic resource management, while offering templates for zero-cost abstractions.
                  </p>
                </section>
                <hr className="cpp98-divider" />
                <section id="bp-history" className="cpp98-section">
                  <h2 className="cpp98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="cpp98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="cpp98-divider" />
                <section id="bp-apps" className="cpp98-section">
                  <h2 className="cpp98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="cpp98-divider" />
                <section id="bp-takeaways" className="cpp98-section">
                  <h2 className="cpp98-heading">Key Takeaways</h2>
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
                <section id="core-mental" className="cpp98-section">
                  <h2 className="cpp98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-fundamentals" className="cpp98-section">
                  <h2 className="cpp98-heading">Language Fundamentals</h2>
                  {languageFundamentals.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pipeline" className="cpp98-section">
                  <h2 className="cpp98-heading">Compilation Pipeline</h2>
                  <table className="cpp98-table">
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
                </section>
                <section id="core-types" className="cpp98-section">
                  <h2 className="cpp98-heading">Type System and Ownership</h2>
                  {typeSystemDetails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-stdlib" className="cpp98-section">
                  <h2 className="cpp98-heading">Standard Library Highlights</h2>
                  {standardLibraryHighlights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-oop" className="cpp98-section">
                  <h2 className="cpp98-heading">OOP Features</h2>
                  {coreOopFeatures.map((block) => (
                    <div key={block.heading}>
                      <h3 className="cpp98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-performance" className="cpp98-section">
                  <h2 className="cpp98-heading">Performance Checklist</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    C++ performance is about memory layout, ownership, and eliminating overhead. Modern C++ features help you
                    write safe code without sacrificing speed.
                  </p>
                </section>
                <section id="core-concurrency" className="cpp98-section">
                  <h2 className="cpp98-heading">Concurrency and Parallelism</h2>
                  {concurrencyOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-tooling" className="cpp98-section">
                  <h2 className="cpp98-heading">Tooling and Workflow</h2>
                  {toolingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-interop" className="cpp98-section">
                  <h2 className="cpp98-heading">Interoperability and Deployment</h2>
                  {interopOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  {deploymentOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="cpp98-section">
                  <h2 className="cpp98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-comparisons" className="cpp98-section">
                  <h2 className="cpp98-heading">Comparisons and Tradeoffs</h2>
                  {comparisonNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decisions" className="cpp98-section">
                  <h2 className="cpp98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-learning" className="cpp98-section">
                  <h2 className="cpp98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="cpp98-section">
                  <h2 className="cpp98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-samples" className="cpp98-section">
                <h2 className="cpp98-heading">Code Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="cpp98-subheading">{example.title}</h3>
                    <div className="cpp98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="cpp98-section">
                <h2 className="cpp98-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
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
