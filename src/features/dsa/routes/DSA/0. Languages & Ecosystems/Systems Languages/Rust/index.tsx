import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Rust starts at Mozilla (2010)',
    detail:
      'Rust begins as a research project focused on safe systems programming with strong guarantees.',
  },
  {
    title: 'Rust 1.0 ships (2015)',
    detail:
      'The stable release brings ownership, borrowing, and lifetimes to mainstream systems developers.',
  },
  {
    title: 'Async/await enters stable Rust (2019)',
    detail:
      'Async programming becomes ergonomic, enabling high-performance network services.',
  },
  {
    title: 'Rust in the Linux kernel (2022)',
    detail:
      'Rust gains official acceptance for kernel components, validating its safety-focused mission.',
  },
  {
    title: 'Rust Foundation and ecosystem maturity (2021+)',
    detail:
      'The language governance and ecosystem tooling stabilize for long-term industrial adoption.',
  },
]

const mentalModels = [
  {
    title: 'Ownership is the memory model',
    detail:
      'Each value has a single owner, and the compiler enforces where that value can live and how it can be shared.',
  },
  {
    title: 'Borrowing is controlled sharing',
    detail:
      'Immutable borrows enable many readers; mutable borrows enable one writer. The compiler enforces the rules.',
  },
  {
    title: 'Fearless concurrency',
    detail:
      'The type system prevents data races at compile time, so safe code can share across threads.',
  },
  {
    title: 'Make invalid states unrepresentable',
    detail:
      'Enums and types encode state machines, replacing ad-hoc flags and nulls.',
  },
]

const languageFundamentals = [
  {
    title: 'Compiled to native code',
    detail:
      'Rust produces platform-native binaries without a runtime or GC.',
  },
  {
    title: 'Expression-oriented',
    detail:
      'Blocks evaluate to values, enabling concise, predictable control flow.',
  },
  {
    title: 'Pattern matching everywhere',
    detail:
      'match and if let express branching with exhaustiveness checks.',
  },
  {
    title: 'Traits drive polymorphism',
    detail:
      'Static dispatch is the default; dynamic dispatch is explicit.',
  },
]

const compilationPipeline = [
  {
    stage: 'Parse and expand',
    description: 'Macros expand and code is lowered for compilation.',
  },
  {
    stage: 'Borrow check',
    description: 'Ownership and lifetimes are validated before codegen.',
  },
  {
    stage: 'LLVM codegen',
    description: 'Rust compiles to optimized native code through LLVM.',
  },
  {
    stage: 'Link',
    description: 'Crates and native libraries are linked into binaries.',
  },
]

const standardLibraryHighlights = [
  {
    title: 'Collections',
    detail:
      'Vec, HashMap, and BTreeMap provide core data structures.',
  },
  {
    title: 'Option and Result',
    detail:
      'Algebraic data types make nulls and errors explicit.',
  },
  {
    title: 'Iterators',
    detail:
      'Lazy iterator chains enable zero-cost data pipelines.',
  },
  {
    title: 'Concurrency',
    detail:
      'std::thread, channels, and atomics support safe parallelism.',
  },
]

const coreConcepts = [
  {
    heading: 'Ownership and lifetimes',
    bullets: [
      'Moves transfer ownership; copies only happen for Copy types.',
      'Borrowing uses references with explicit lifetimes.',
      'The borrow checker enforces aliasing and mutation rules.',
      'Lifetimes encode validity ranges in APIs.',
    ],
  },
  {
    heading: 'Traits and generics',
    bullets: [
      'Traits define shared behavior and act like interfaces.',
      'Generics compile to monomorphized code, avoiding runtime overhead.',
      'Trait bounds express constraints for reusable components.',
      'Associated types keep APIs expressive and ergonomic.',
    ],
  },
  {
    heading: 'Memory and safety',
    bullets: [
      'Rust offers manual control without garbage collection.',
      'Unsafe blocks allow low-level operations with explicit boundaries.',
      'Pattern matching and enums model states without nulls.',
      'Ownership enables deterministic destruction (Drop).',
    ],
  },
  {
    heading: 'Compilation model',
    bullets: [
      'Cargo manages builds, dependencies, and reproducible environments.',
      'Modules and crates provide clear namespace boundaries.',
      'The compiler surfaces errors early with detailed diagnostics.',
      'Feature flags gate optional dependencies and capabilities.',
    ],
  },
]

const languageNotes = [
  {
    title: 'Zero-cost abstractions',
    detail:
      'Iterators, closures, and trait-based polymorphism compile down to efficient machine code.',
  },
  {
    title: 'Enums as algebraic data types',
    detail:
      'Enums with data encode state machines safely, replacing error-prone flag combinations.',
  },
  {
    title: 'Error handling with Result',
    detail:
      'Errors are values. The Result type forces explicit handling and reduces silent failures.',
  },
  {
    title: 'FFI with C and C++',
    detail:
      'Rust interoperates with C via stable ABIs, making it suitable for gradual adoption.',
  },
  {
    title: 'Borrowed vs owned types',
    detail:
      'String vs &str and Vec vs &[T] encode ownership in API boundaries.',
  },
]

const performanceTradeoffs = [
  {
    title: 'Safety checks at compile time',
    detail:
      'Rust shifts work to compilation. Runtime overhead stays low, but compile times grow.',
  },
  {
    title: 'Memory predictability',
    detail:
      'No GC pauses means deterministic performance, but you must design ownership carefully.',
  },
  {
    title: 'Borrow checker learning curve',
    detail:
      'The compiler enforces correctness but can slow early development until patterns are learned.',
  },
  {
    title: 'Async runtime complexity',
    detail:
      'Async/await is fast but requires understanding executors and pinning when building runtimes.',
  },
  {
    title: 'Binary size and generics',
    detail:
      'Monomorphization can increase binary size in heavily generic code.',
  },
]

const realWorldUses = [
  {
    context: 'Systems and infrastructure',
    detail:
      'Rust powers command-line tools, network services, and storage engines that need safety and speed.',
  },
  {
    context: 'WebAssembly',
    detail:
      'Rust compiles to WASM efficiently, enabling safe high-performance modules in the browser.',
  },
  {
    context: 'Embedded and IoT',
    detail:
      'No-std Rust runs on microcontrollers with strict memory constraints.',
  },
  {
    context: 'Security-sensitive software',
    detail:
      'Memory safety reduces exploitable bugs in cryptographic and networking stacks.',
  },
  {
    context: 'Blockchain and distributed systems',
    detail:
      'Rust powers high-performance nodes, runtimes, and cryptographic tooling.',
  },
  {
    context: 'Game engines',
    detail:
      'ECS frameworks and safe multithreading make Rust appealing for engine cores.',
  },
]

const examples = [
  {
    title: 'Ownership and borrowing',
    code: `fn main() {
    let mut values = vec![1, 2, 3];
    let first = &values[0];
    values.push(4);
    // println!("{}", first); // borrow checker error
}`,
    explanation:
      'Mutable pushes can reallocate and invalidate references. The compiler prevents use-after-free.',
  },
  {
    title: 'Traits for shared behavior',
    code: `trait Drawable {
    fn draw(&self);
}

struct Circle { radius: f32 }
struct Square { size: f32 }

impl Drawable for Circle {
    fn draw(&self) { println!("Circle {}", self.radius); }
}

impl Drawable for Square {
    fn draw(&self) { println!("Square {}", self.size); }
}`,
    explanation:
      'Traits describe shared behavior without inheritance, and dynamic dispatch is optional.',
  },
  {
    title: 'Safe concurrency with threads',
    code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..4 {
        let shared = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut value = shared.lock().unwrap();
            *value += 1;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }
}`,
    explanation:
      'Ownership and Send/Sync bounds keep threading safe, with mutexes for mutable shared state.',
  },
  {
    title: 'Result-based error handling',
    code: `use std::fs::File;
use std::io::Read;

fn read_config(path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(path)?;
    let mut data = String::new();
    file.read_to_string(&mut data)?;
    Ok(data)
}`,
    explanation:
      'Errors are values; the ? operator propagates failures cleanly.',
  },
  {
    title: 'Enum state modeling',
    code: `enum ConnectionState {
    Disconnected,
    Connecting(u32),
    Connected { since: u64 },
}`,
    explanation:
      'Enums model valid states explicitly and avoid invalid flag combos.',
  },
]

const pitfalls = [
  'Fighting the borrow checker instead of modeling ownership explicitly.',
  'Overusing Rc/RefCell hides design problems and creates runtime borrow panics.',
  'Assuming unsafe blocks are faster without measuring.',
  'Ignoring lifetime annotations in APIs can leak complexity to callers.',
  'Building async systems without understanding executor behavior.',
  'Cloning large data unnecessarily instead of borrowing.',
  'Using unsafe without tight encapsulation and tests.',
]

const decisionGuidance = [
  'Use Rust when you need memory safety and performance without a garbage collector.',
  'Prefer Rust for security-critical or concurrency-heavy systems.',
  'Adopt Rust gradually via FFI in existing C or C++ codebases.',
  'Invest in tooling and training to overcome the borrow checker learning curve.',
  'Avoid Rust when time-to-market is more critical than safety guarantees.',
  'Use Rust for services where reliability outweighs development speed.',
]

const advancedInsights = [
  {
    title: 'Borrow checker patterns',
    detail:
      'Split borrows, scoped lifetimes, and interior mutability patterns unlock complex designs safely.',
  },
  {
    title: 'Pinning and self-referential structs',
    detail:
      'Pin prevents moves when references must remain stable, common in async and intrusive data structures.',
  },
  {
    title: 'Zero-cost async',
    detail:
      'Futures compile into state machines with minimal overhead, but careful design prevents combinator bloat.',
  },
  {
    title: 'Unsafe as an escape hatch',
    detail:
      'Encapsulate unsafe code behind safe APIs so invariants are enforced at the boundary.',
  },
  {
    title: 'Trait object boundaries',
    detail:
      'dyn Trait enables runtime polymorphism with explicit costs.',
  },
]

const takeaways = [
  'Rust aims to eliminate entire classes of memory and concurrency bugs at compile time.',
  'Ownership and borrowing enable predictable performance without garbage collection.',
  'Traits and enums produce expressive, reliable APIs.',
  'The ecosystem favors tooling and explicitness over hidden magic.',
  'Good design makes ownership obvious and reuse natural.',
]

const toolingWorkflow = [
  {
    title: 'Cargo and workspaces',
    detail:
      'Cargo manages dependencies, builds, and reproducible environments.',
  },
  {
    title: 'Linting and formatting',
    detail:
      'clippy and rustfmt enforce consistency and catch mistakes.',
  },
  {
    title: 'Testing',
    detail:
      'Built-in test harness supports unit, integration, and doc tests.',
  },
  {
    title: 'Profiling',
    detail:
      'perf and flamegraphs reveal CPU and allocation hot spots.',
  },
]

const concurrencyOptions = [
  {
    title: 'Threads and channels',
    detail:
      'std::thread and mpsc channels model safe communication.',
  },
  {
    title: 'Async runtimes',
    detail:
      'Tokio and async-std power non-blocking servers.',
  },
  {
    title: 'Atomics',
    detail:
      'std::sync::atomic enables lock-free algorithms.',
  },
  {
    title: 'Message passing',
    detail:
      'Ownership-based message passing avoids shared mutable state.',
  },
]

const interopOptions = [
  {
    title: 'C FFI',
    detail:
      'Extern functions and #[repr(C)] structs allow seamless C interop.',
  },
  {
    title: 'C++ via cxx',
    detail:
      'The cxx crate enables safe C++ interop with minimal glue.',
  },
  {
    title: 'WebAssembly',
    detail:
      'wasm-bindgen exposes Rust to JS and browser APIs.',
  },
  {
    title: 'Python bindings',
    detail:
      'pyo3 and maturin build native Python extensions.',
  },
]

const deploymentOptions = [
  {
    title: 'Static binaries',
    detail:
      'Single binaries simplify deployment for servers and tools.',
  },
  {
    title: 'WASM modules',
    detail:
      'Ship Rust as portable WebAssembly packages.',
  },
  {
    title: 'Embedded firmware',
    detail:
      'no_std builds target microcontrollers and bare metal.',
  },
  {
    title: 'Shared libraries',
    detail:
      'cdylib outputs are used for FFI and plugin systems.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to C',
    detail:
      'Rust provides memory safety and modern tooling while keeping low-level control.',
  },
  {
    title: 'Compared to C++',
    detail:
      'Rust enforces safety at compile time; C++ relies on discipline and tooling.',
  },
  {
    title: 'Compared to Go',
    detail:
      'Rust provides more control and safety guarantees; Go is simpler to learn.',
  },
  {
    title: 'Compared to Zig',
    detail:
      'Rust has stronger safety guarantees and a larger ecosystem.',
  },
]

const learningPath = [
  {
    title: 'Ownership basics',
    detail:
      'Learn moves, borrows, and lifetimes with small programs.',
  },
  {
    title: 'Traits and generics',
    detail:
      'Practice trait bounds, generics, and iterator patterns.',
  },
  {
    title: 'Error handling',
    detail:
      'Use Result, Option, and thiserror for robust APIs.',
  },
  {
    title: 'Async or concurrency',
    detail:
      'Choose Tokio or threads based on workloads.',
  },
  {
    title: 'Systems integration',
    detail:
      'Learn FFI, no_std, and build pipelines.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const glossary = [
  { term: 'Ownership', definition: 'Rule that each value has one owner controlling lifetime.' },
  { term: 'Borrowing', definition: 'Temporary access to values through references without taking ownership.' },
  { term: 'Lifetime', definition: 'Compile-time region where a reference is guaranteed valid.' },
  { term: 'Trait', definition: 'Behavioral interface used for polymorphism and generic constraints.' },
  { term: 'Result', definition: 'Enum for explicit success/failure handling.' },
  { term: 'Option', definition: 'Enum representing presence or absence of a value without null.' },
  { term: 'Unsafe', definition: 'Escape hatch for low-level operations beyond safe Rust guarantees.' },
  { term: 'no_std', definition: 'Rust subset for environments without the standard library.' },
  { term: 'Monomorphization', definition: 'Compile-time generation of concrete code for generic types.' },
  { term: 'Pin', definition: 'Type-level guarantee that a value will not move in memory.' },
]

const rustHelpStyles = `
.rust98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  margin: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.rust98-window {
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

.rust98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
}

.rust98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  pointer-events: none;
}

.rust98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.rust98-control {
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

.rust98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.rust98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.rust98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.rust98-main {
  border-top: 1px solid #404040;
  background: #fff;
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
}

.rust98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.rust98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.rust98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.rust98-toc-list li {
  margin: 0 0 8px;
}

.rust98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.rust98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.rust98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.rust98-section {
  margin: 0 0 22px;
}

.rust98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.rust98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.rust98-content p,
.rust98-content li,
.rust98-content th,
.rust98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.rust98-content p {
  margin: 0 0 10px;
}

.rust98-content ul,
.rust98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.rust98-content table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.rust98-content th,
.rust98-content td {
  padding: 2px 8px 2px 0;
  vertical-align: top;
}

.rust98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.rust98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.rust98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .rust98-main {
    grid-template-columns: 1fr;
  }

  .rust98-toc {
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
    { id: 'core-rust-fundamentals', label: 'Rust Fundamentals' },
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

export default function RustPage(): JSX.Element {
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
    document.title = `Rust (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Rust',
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
    <div className="rust98-help-page">
      <style>{rustHelpStyles}</style>
      <div className="rust98-window" role="presentation">
        <header className="rust98-titlebar">
          <span className="rust98-title-text">Rust</span>
          <div className="rust98-title-controls">
            <button className="rust98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="rust98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="rust98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rust98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="rust98-main">
          <aside className="rust98-toc" aria-label="Table of contents">
            <h2 className="rust98-toc-title">Contents</h2>
            <ul className="rust98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="rust98-content">
            <h1 className="rust98-doc-title">Rust</h1>
            <p>
              Rust is a systems language that enforces safe memory access at compile time. It brings modern tooling,
              expressive types, and zero-cost abstractions to low-level programming. The result is software that stays
              fast while avoiding entire classes of memory and concurrency bugs.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="rust98-section">
                  <h2 className="rust98-heading">Overview</h2>
                  <p>
                    Rust enforces ownership and borrowing rules at compile time, replacing runtime garbage collection with
                    strict, static guarantees. This makes it a compelling alternative for systems that need the speed of C
                    and C++ with stronger safety assurances.
                  </p>
                </section>
                <hr className="rust98-divider" />
                <section id="bp-history" className="rust98-section">
                  <h2 className="rust98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="rust98-section">
                  <h2 className="rust98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="rust98-section">
                  <h2 className="rust98-heading">Key Takeaways</h2>
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
                <section id="core-fundamentals" className="rust98-section">
                  <h2 className="rust98-heading">Language Fundamentals</h2>
                  {languageFundamentals.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pipeline" className="rust98-section">
                  <h2 className="rust98-heading">Compilation Pipeline</h2>
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
                <section id="core-library" className="rust98-section">
                  <h2 className="rust98-heading">Standard Library Highlights</h2>
                  {standardLibraryHighlights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-rust-fundamentals" className="rust98-section">
                  <h2 className="rust98-heading">How It Works: Rust Fundamentals</h2>
                  {coreConcepts.map((block) => (
                    <div key={block.heading}>
                      <h3 className="rust98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-workflow" className="rust98-section">
                  <h2 className="rust98-heading">Tooling and Workflow</h2>
                  {toolingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="rust98-section">
                  <h2 className="rust98-heading">How It Works: Language Mechanics</h2>
                  {languageNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-concurrency" className="rust98-section">
                  <h2 className="rust98-heading">Concurrency and Parallelism</h2>
                  {concurrencyOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="rust98-section">
                  <h2 className="rust98-heading">Complexity Analysis and Tradeoffs</h2>
                  {performanceTradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Rust makes safety a compile-time cost instead of a runtime cost. The result is predictable performance,
                    with the tradeoff of longer compile times and a steeper learning curve.
                  </p>
                </section>
                <section id="core-uses" className="rust98-section">
                  <h2 className="rust98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-interop" className="rust98-section">
                  <h2 className="rust98-heading">Interoperability and Deployment</h2>
                  <h3 className="rust98-subheading">Interoperability</h3>
                  {interopOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="rust98-subheading">Deployment</h3>
                  {deploymentOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="rust98-section">
                  <h2 className="rust98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-compare" className="rust98-section">
                  <h2 className="rust98-heading">Comparisons and Tradeoffs</h2>
                  {comparisonNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="rust98-section">
                  <h2 className="rust98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-learning" className="rust98-section">
                  <h2 className="rust98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="rust98-section">
                  <h2 className="rust98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="rust98-section">
                <h2 className="rust98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="rust98-subheading">{example.title}</h3>
                    <div className="rust98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="rust98-section">
                <h2 className="rust98-heading">Glossary</h2>
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
