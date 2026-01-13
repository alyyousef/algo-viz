import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function RustPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Rust</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Memory safety and performance without a garbage collector</div>
              <p className="win95-text">
                Rust is a systems language that enforces safe memory access at compile time. It brings modern tooling,
                expressive types, and zero-cost abstractions to low-level programming. The result is software that stays
                fast while avoiding entire classes of memory and concurrency bugs.
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
                Rust enforces ownership and borrowing rules at compile time, replacing runtime garbage collection with
                strict, static guarantees. This makes it a compelling alternative for systems that need the speed of C
                and C++ with stronger safety assurances.
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
            <legend>How it works: Rust fundamentals</legend>
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
                Rust makes safety a compile-time cost instead of a runtime cost. The result is predictable performance,
                with the tradeoff of longer compile times and a steeper learning curve.
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

