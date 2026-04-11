import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'Async programming becomes ergonomic, enabling high-performance network services.',
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
    detail: 'Enums and types encode state machines, replacing ad-hoc flags and nulls.',
  },
]

const languageFundamentals = [
  {
    title: 'Compiled to native code',
    detail: 'Rust produces platform-native binaries without a runtime or GC.',
  },
  {
    title: 'Expression-oriented',
    detail: 'Blocks evaluate to values, enabling concise, predictable control flow.',
  },
  {
    title: 'Pattern matching everywhere',
    detail: 'match and if let express branching with exhaustiveness checks.',
  },
  {
    title: 'Traits drive polymorphism',
    detail: 'Static dispatch is the default; dynamic dispatch is explicit.',
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
    detail: 'Vec, HashMap, and BTreeMap provide core data structures.',
  },
  {
    title: 'Option and Result',
    detail: 'Algebraic data types make nulls and errors explicit.',
  },
  {
    title: 'Iterators',
    detail: 'Lazy iterator chains enable zero-cost data pipelines.',
  },
  {
    title: 'Concurrency',
    detail: 'std::thread, channels, and atomics support safe parallelism.',
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
    detail: 'Rust interoperates with C via stable ABIs, making it suitable for gradual adoption.',
  },
  {
    title: 'Borrowed vs owned types',
    detail: 'String vs &str and Vec vs &[T] encode ownership in API boundaries.',
  },
]

const performanceTradeoffs = [
  {
    title: 'Safety checks at compile time',
    detail: 'Rust shifts work to compilation. Runtime overhead stays low, but compile times grow.',
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
    detail: 'Monomorphization can increase binary size in heavily generic code.',
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
    detail: 'No-std Rust runs on microcontrollers with strict memory constraints.',
  },
  {
    context: 'Security-sensitive software',
    detail: 'Memory safety reduces exploitable bugs in cryptographic and networking stacks.',
  },
  {
    context: 'Blockchain and distributed systems',
    detail: 'Rust powers high-performance nodes, runtimes, and cryptographic tooling.',
  },
  {
    context: 'Game engines',
    detail: 'ECS frameworks and safe multithreading make Rust appealing for engine cores.',
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
    explanation: 'Errors are values; the ? operator propagates failures cleanly.',
  },
  {
    title: 'Enum state modeling',
    code: `enum ConnectionState {
    Disconnected,
    Connecting(u32),
    Connected { since: u64 },
}`,
    explanation: 'Enums model valid states explicitly and avoid invalid flag combos.',
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
    detail: 'Encapsulate unsafe code behind safe APIs so invariants are enforced at the boundary.',
  },
  {
    title: 'Trait object boundaries',
    detail: 'dyn Trait enables runtime polymorphism with explicit costs.',
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
    detail: 'Cargo manages dependencies, builds, and reproducible environments.',
  },
  {
    title: 'Linting and formatting',
    detail: 'clippy and rustfmt enforce consistency and catch mistakes.',
  },
  {
    title: 'Testing',
    detail: 'Built-in test harness supports unit, integration, and doc tests.',
  },
  {
    title: 'Profiling',
    detail: 'perf and flamegraphs reveal CPU and allocation hot spots.',
  },
]

const concurrencyOptions = [
  {
    title: 'Threads and channels',
    detail: 'std::thread and mpsc channels model safe communication.',
  },
  {
    title: 'Async runtimes',
    detail: 'Tokio and async-std power non-blocking servers.',
  },
  {
    title: 'Atomics',
    detail: 'std::sync::atomic enables lock-free algorithms.',
  },
  {
    title: 'Message passing',
    detail: 'Ownership-based message passing avoids shared mutable state.',
  },
]

const interopOptions = [
  {
    title: 'C FFI',
    detail: 'Extern functions and #[repr(C)] structs allow seamless C interop.',
  },
  {
    title: 'C++ via cxx',
    detail: 'The cxx crate enables safe C++ interop with minimal glue.',
  },
  {
    title: 'WebAssembly',
    detail: 'wasm-bindgen exposes Rust to JS and browser APIs.',
  },
  {
    title: 'Python bindings',
    detail: 'pyo3 and maturin build native Python extensions.',
  },
]

const deploymentOptions = [
  {
    title: 'Static binaries',
    detail: 'Single binaries simplify deployment for servers and tools.',
  },
  {
    title: 'WASM modules',
    detail: 'Ship Rust as portable WebAssembly packages.',
  },
  {
    title: 'Embedded firmware',
    detail: 'no_std builds target microcontrollers and bare metal.',
  },
  {
    title: 'Shared libraries',
    detail: 'cdylib outputs are used for FFI and plugin systems.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to C',
    detail: 'Rust provides memory safety and modern tooling while keeping low-level control.',
  },
  {
    title: 'Compared to C++',
    detail: 'Rust enforces safety at compile time; C++ relies on discipline and tooling.',
  },
  {
    title: 'Compared to Go',
    detail: 'Rust provides more control and safety guarantees; Go is simpler to learn.',
  },
  {
    title: 'Compared to Zig',
    detail: 'Rust has stronger safety guarantees and a larger ecosystem.',
  },
]

const learningPath = [
  {
    title: 'Ownership basics',
    detail: 'Learn moves, borrows, and lifetimes with small programs.',
  },
  {
    title: 'Traits and generics',
    detail: 'Practice trait bounds, generics, and iterator patterns.',
  },
  {
    title: 'Error handling',
    detail: 'Use Result, Option, and thiserror for robust APIs.',
  },
  {
    title: 'Async or concurrency',
    detail: 'Choose Tokio or threads based on workloads.',
  },
  {
    title: 'Systems integration',
    detail: 'Learn FFI, no_std, and build pipelines.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const glossary = [
  { term: 'Ownership', definition: 'Rule that each value has one owner controlling lifetime.' },
  {
    term: 'Borrowing',
    definition: 'Temporary access to values through references without taking ownership.',
  },
  { term: 'Lifetime', definition: 'Compile-time region where a reference is guaranteed valid.' },
  {
    term: 'Trait',
    definition: 'Behavioral interface used for polymorphism and generic constraints.',
  },
  { term: 'Result', definition: 'Enum for explicit success/failure handling.' },
  { term: 'Option', definition: 'Enum representing presence or absence of a value without null.' },
  {
    term: 'Unsafe',
    definition: 'Escape hatch for low-level operations beyond safe Rust guarantees.',
  },
  { term: 'no_std', definition: 'Rust subset for environments without the standard library.' },
  {
    term: 'Monomorphization',
    definition: 'Compile-time generation of concrete code for generic types.',
  },
  { term: 'Pin', definition: 'Type-level guarantee that a value will not move in memory.' },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

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
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Rust',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Rust"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Rust</h1>
      <p>
        Rust is a systems language that enforces safe memory access at compile time. It brings
        modern tooling, expressive types, and zero-cost abstractions to low-level programming. The
        result is software that stays fast while avoiding entire classes of memory and concurrency
        bugs.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Rust enforces ownership and borrowing rules at compile time, replacing runtime garbage
              collection with strict, static guarantees. This makes it a compelling alternative for
              systems that need the speed of C and C++ with stronger safety assurances.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-fundamentals" className="bin98-section">
            <h2 className="bin98-heading">Language Fundamentals</h2>
            {languageFundamentals.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pipeline" className="bin98-section">
            <h2 className="bin98-heading">Compilation Pipeline</h2>
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
          <section id="core-library" className="bin98-section">
            <h2 className="bin98-heading">Standard Library Highlights</h2>
            {standardLibraryHighlights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-rust-fundamentals" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Rust Fundamentals</h2>
            {coreConcepts.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">Tooling and Workflow</h2>
            {toolingWorkflow.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Language Mechanics</h2>
            {languageNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-concurrency" className="bin98-section">
            <h2 className="bin98-heading">Concurrency and Parallelism</h2>
            {concurrencyOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {performanceTradeoffs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Rust makes safety a compile-time cost instead of a runtime cost. The result is
              predictable performance, with the tradeoff of longer compile times and a steeper
              learning curve.
            </p>
          </section>
          <section id="core-uses" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-interop" className="bin98-section">
            <h2 className="bin98-heading">Interoperability and Deployment</h2>
            <h3 className="bin98-subheading">Interoperability</h3>
            {interopOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Deployment</h3>
            {deploymentOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Comparisons and Tradeoffs</h2>
            {comparisonNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-learning" className="bin98-section">
            <h2 className="bin98-heading">Learning Path</h2>
            {learningPath.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
