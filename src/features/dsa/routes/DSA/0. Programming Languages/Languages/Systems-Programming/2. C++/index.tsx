import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


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
    title: 'ISO standardization (1998)',
    detail:
      'The first ISO standard defines language rules, library behavior, and portability expectations.',
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
  {
    title: 'Safety tooling ecosystem grows (2020s)',
    detail:
      'Sanitizers, static analyzers, and guidelines push large codebases toward safer defaults.',
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
  {
    title: 'Pay for what you use',
    detail:
      'Virtual dispatch, exceptions, and RTTI are optional and can be avoided in hot paths.',
  },
]

const languageFundamentals = [
  {
    title: 'Compiled to native code',
    detail:
      'C++ produces platform-specific binaries with minimal runtime overhead.',
  },
  {
    title: 'Multi-paradigm',
    detail:
      'OOP, generic, and functional patterns coexist in one language.',
  },
  {
    title: 'Static typing',
    detail:
      'Strong static typing enables optimization and early errors.',
  },
  {
    title: 'Deterministic lifetimes',
    detail:
      'Objects are destroyed predictably, enabling safe resource management.',
  },
]

const compilationPipeline = [
  {
    stage: 'Preprocess',
    description: 'Macros expand and includes pull in headers.',
  },
  {
    stage: 'Compile',
    description: 'Translation units compile into object files.',
  },
  {
    stage: 'Link',
    description: 'Object files and libraries are combined into binaries.',
  },
  {
    stage: 'Runtime init',
    description: 'Static initialization and constructors run before main.',
  },
]

const standardLibraryHighlights = [
  {
    title: 'Containers',
    detail:
      'vector, array, map, unordered_map, and span cover core data structures.',
  },
  {
    title: 'Algorithms and ranges',
    detail:
      'Algorithms and ranges enable composable data pipelines.',
  },
  {
    title: 'Concurrency',
    detail:
      'Threads, atomics, and futures provide portable parallelism.',
  },
  {
    title: 'Memory utilities',
    detail:
      'unique_ptr, shared_ptr, and allocator support manage ownership.',
  },
]

const coreConcepts = [
  {
    heading: 'Object model and RAII',
    bullets: [
      'Constructors, destructors, and deterministic lifetimes define object behavior.',
      'Copy/move semantics control ownership transfer and performance.',
      'Smart pointers (unique_ptr, shared_ptr) codify ownership rules.',
      'Rule of zero simplifies resource ownership.',
    ],
  },
  {
    heading: 'Templates and generics',
    bullets: [
      'Templates enable type-safe generic programming with no runtime overhead.',
      'Concepts (C++20) constrain templates for better diagnostics.',
      'Metaprogramming can be powerful but increases compile times.',
      'constexpr enables compile-time evaluation of logic.',
    ],
  },
  {
    heading: 'Memory and layout',
    bullets: [
      'Manual allocation is possible, but RAII and allocators are preferred.',
      'Object layout is predictable, enabling packed structs and SIMD-friendly data.',
      'Alignment and padding affect cache behavior and performance.',
      'Custom allocators tune memory locality and fragmentation.',
    ],
  },
  {
    heading: 'Compilation model',
    bullets: [
      'Headers + source files form translation units; templates require headers for definitions.',
      'Linkers resolve symbols; ODR violations cause hard-to-debug issues.',
      'Modules (C++20) aim to reduce compile times and macro leakage.',
      'ABI stability matters for shared libraries.',
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
  {
    title: 'Object lifetime and moves',
    detail:
      'Move semantics enable zero-copy transfers and reduce heap churn.',
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
  {
    title: 'Build complexity',
    detail:
      'Large codebases require careful dependency and header management.',
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
  {
    context: 'HPC and simulation',
    detail:
      'C++ underpins simulation codes, solvers, and scientific kernels.',
  },
  {
    context: 'Graphics and media',
    detail:
      'Renderers and codecs rely on C++ for throughput and control.',
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
  {
    title: 'std::unique_ptr ownership',
    code: `#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> next;
};

auto head = std::make_unique<Node>();`,
    explanation:
      'unique_ptr expresses single ownership and prevents accidental leaks.',
  },
  {
    title: 'constexpr computation',
    code: `constexpr int fib(int n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

constexpr int value = fib(10);`,
    explanation:
      'constexpr moves work to compile time when inputs are known.',
  },
]

const pitfalls = [
  'Confusing ownership leads to double frees or leaks; prefer smart pointers and clear ownership.',
  'Undefined behavior from dangling references or iterator invalidation can be catastrophic.',
  'Overusing templates can bloat binaries and slow builds without measurable gains.',
  'Mixing exceptions and manual resource management leads to leaks on error paths.',
  'Ignoring rule-of-zero/five causes accidental copies or double destruction.',
  'Exposing unstable ABI across compiler versions.',
  'Accidental copies of large objects without move semantics.',
]

const decisionGuidance = [
  'Use C++ when you need zero-overhead abstractions with system-level performance.',
  'Prefer modern C++ (RAII, smart pointers, STL) over manual memory management.',
  'Adopt coding guidelines and static analysis for safety in large codebases.',
  'Choose C++ for performance-critical libraries with stable ABIs.',
  'Avoid C++ when rapid iteration and safety are more important than control.',
  'Use C++ when you need native integration with existing systems code.',
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
  {
    title: 'Sanitizers and fuzzing',
    detail:
      'ASan, UBSan, and fuzzers catch memory bugs early in development.',
  },
]

const takeaways = [
  'C++ balances low-level control with high-level abstractions through zero-overhead design.',
  'RAII and modern libraries make C++ safer without sacrificing performance.',
  'The language scales from embedded firmware to massive desktop applications.',
  'Discipline in ownership, build systems, and tooling separates great C++ from fragile C++.',
  'Modern C++ rewards teams that invest in tooling and conventions.',
]

const toolingWorkflow = [
  {
    title: 'Build systems',
    detail:
      'CMake, Meson, and Bazel manage large cross-platform builds.',
  },
  {
    title: 'Package managers',
    detail:
      'vcpkg and Conan standardize third-party dependencies.',
  },
  {
    title: 'Static analysis',
    detail:
      'clang-tidy and cppcheck catch common defects early.',
  },
  {
    title: 'Profiling',
    detail:
      'perf, VTune, and Tracy identify CPU and memory bottlenecks.',
  },
]

const concurrencyOptions = [
  {
    title: 'Threads and futures',
    detail:
      'std::thread, std::async, and futures support parallel work.',
  },
  {
    title: 'Atomics and lock-free',
    detail:
      'std::atomic enables high-performance synchronization.',
  },
  {
    title: 'Coroutines',
    detail:
      'C++20 coroutines enable async IO and lazy generators.',
  },
  {
    title: 'Parallel algorithms',
    detail:
      'Parallel STL can speed up data processing workloads.',
  },
]

const interopOptions = [
  {
    title: 'C ABI compatibility',
    detail:
      'Expose C APIs for stable cross-language boundaries.',
  },
  {
    title: 'Python bindings',
    detail:
      'pybind11 and Cython bridge C++ and Python.',
  },
  {
    title: 'Rust and Zig',
    detail:
      'FFI via C ABI provides safe interop with newer languages.',
  },
  {
    title: 'Managed runtimes',
    detail:
      'JNI and C++/CLI integrate with Java and .NET.',
  },
]

const deploymentOptions = [
  {
    title: 'Static libraries',
    detail:
      'Ship .a files for embedded or performance-critical builds.',
  },
  {
    title: 'Shared libraries',
    detail:
      '.so/.dll distribution for plugins and SDKs.',
  },
  {
    title: 'Native executables',
    detail:
      'Standalone binaries for tools and services.',
  },
  {
    title: 'Cross-compilation',
    detail:
      'Toolchains target embedded and custom OS environments.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to C',
    detail:
      'C++ adds RAII, templates, and higher-level abstractions while retaining low-level control.',
  },
  {
    title: 'Compared to Rust',
    detail:
      'Rust enforces memory safety at compile time; C++ relies on discipline and tooling.',
  },
  {
    title: 'Compared to Go',
    detail:
      'C++ is faster for hot paths; Go simplifies concurrency and deployment.',
  },
  {
    title: 'Compared to Java',
    detail:
      'C++ offers lower-level control; Java provides GC and JVM portability.',
  },
]

const learningPath = [
  {
    title: 'Core syntax and RAII',
    detail:
      'Learn ownership, constructors, destructors, and move semantics.',
  },
  {
    title: 'STL mastery',
    detail:
      'Use containers, algorithms, and ranges idiomatically.',
  },
  {
    title: 'Modern C++ features',
    detail:
      'Practice constexpr, concepts, and smart pointers.',
  },
  {
    title: 'Performance and debugging',
    detail:
      'Use sanitizers, profilers, and careful measurement.',
  },
  {
    title: 'Concurrency',
    detail:
      'Learn atomics, threads, and memory ordering.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const glossary = [
  { term: 'RAII', definition: 'Resource management pattern where constructors acquire and destructors release resources.' },
  { term: 'Move Semantics', definition: 'Transfer ownership/resources without deep copy to improve performance.' },
  { term: 'ODR', definition: 'One Definition Rule governing definitions across translation units.' },
  { term: 'Template Instantiation', definition: 'Compiler-generated specialization of template code for concrete types.' },
  { term: 'constexpr', definition: 'Compile-time evaluable functions/objects under constant-expression rules.' },
  { term: 'Concepts', definition: 'Template constraints that improve diagnostics and API contracts.' },
  { term: 'ABI', definition: 'Binary-level compatibility contract for function calls, layouts, and symbols.' },
  { term: 'Undefined Behavior', definition: 'Operations with no guaranteed meaning in the standard, enabling optimization freedom.' },
  { term: 'Iterator Invalidation', definition: 'When operations on containers make existing iterators/references invalid.' },
  { term: 'Sanitizer', definition: 'Instrumentation tooling like ASan/UBSan used to catch memory and UB defects.' },
]

const cppHelpStyles = `
.cpp98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  margin: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cpp98-window {
  width: 100%;
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

.cpp98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
}

.cpp98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  pointer-events: none;
}

.cpp98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
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
  cursor: pointer;
  padding: 0;
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
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
}

.cpp98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.cpp98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.cpp98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cpp98-toc-list li {
  margin: 0 0 8px;
}

.cpp98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.cpp98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.cpp98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.cpp98-section {
  margin: 0 0 22px;
}

.cpp98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.cpp98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.cpp98-content p,
.cpp98-content li,
.cpp98-content th,
.cpp98-content td {
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

.cpp98-content table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.cpp98-content th,
.cpp98-content td {
  padding: 2px 8px 2px 0;
  vertical-align: top;
}

.cpp98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.cpp98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.cpp98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-fundamentals', label: 'Language Fundamentals' },
    { id: 'core-pipeline', label: 'Compilation Pipeline' },
    { id: 'core-library', label: 'Standard Library' },
    { id: 'core-cpp-fundamentals', label: 'C++ Fundamentals' },
    { id: 'core-workflow', label: 'Tooling and Workflow' },
    { id: 'core-mechanics', label: 'Language Mechanics' },
    { id: 'core-concurrency', label: 'Concurrency and Parallelism' },
    { id: 'core-performance', label: 'Complexity and Tradeoffs' },
    { id: 'core-uses', label: 'Real-World Applications' },
    { id: 'core-interop', label: 'Interoperability and Deployment' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-compare', label: 'Comparisons and Tradeoffs' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-learning', label: 'Learning Path' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CppSystemsPage(): JSX.Element {
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
      <style>{cppHelpStyles}</style>
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
            <p>
              C++ builds on C with classes, templates, and modern libraries while preserving direct control over memory and
              performance. It enables high-level design without sacrificing low-level efficiency, making it a foundation for
              large, performance-critical systems.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="cpp98-section">
                  <h2 className="cpp98-heading">Overview</h2>
                  <p>
                    C++ is about control without overhead. You can use high-level abstractions when they help, but still drop
                    down to raw memory when required. This flexibility is powerful, but demands strong conventions and disciplined
                    design.
                  </p>
                </section>
                <hr className="cpp98-divider" />
                <section id="bp-history" className="cpp98-section">
                  <h2 className="cpp98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="cpp98-section">
                  <h2 className="cpp98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
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
                  <table>
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
                <section id="core-library" className="cpp98-section">
                  <h2 className="cpp98-heading">Standard Library Highlights</h2>
                  {standardLibraryHighlights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-cpp-fundamentals" className="cpp98-section">
                  <h2 className="cpp98-heading">How It Works: C++ Fundamentals</h2>
                  {coreConcepts.map((block) => (
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
                <section id="core-workflow" className="cpp98-section">
                  <h2 className="cpp98-heading">Tooling and Workflow</h2>
                  {toolingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="cpp98-section">
                  <h2 className="cpp98-heading">How It Works: Language Mechanics</h2>
                  {languageNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-concurrency" className="cpp98-section">
                  <h2 className="cpp98-heading">Concurrency and Parallelism</h2>
                  {concurrencyOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="cpp98-section">
                  <h2 className="cpp98-heading">Complexity Analysis and Tradeoffs</h2>
                  {performanceTradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    C++ performance comes from controlling abstraction costs. Modern features help safety and expressiveness, but
                    they also demand build and API discipline to keep complexity manageable.
                  </p>
                </section>
                <section id="core-uses" className="cpp98-section">
                  <h2 className="cpp98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-interop" className="cpp98-section">
                  <h2 className="cpp98-heading">Interoperability and Deployment</h2>
                  <h3 className="cpp98-subheading">Interoperability</h3>
                  {interopOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="cpp98-subheading">Deployment</h3>
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
                <section id="core-compare" className="cpp98-section">
                  <h2 className="cpp98-heading">Comparisons and Tradeoffs</h2>
                  {comparisonNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="cpp98-section">
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
              <section id="ex-practical" className="cpp98-section">
                <h2 className="cpp98-heading">Practical Examples</h2>
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
                {glossary.map((item) => (
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
