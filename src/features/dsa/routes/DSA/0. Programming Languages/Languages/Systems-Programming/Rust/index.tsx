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
]

const coreConcepts = [
  {
    heading: 'Ownership and lifetimes',
    bullets: [
      'Moves transfer ownership; copies only happen for Copy types.',
      'Borrowing uses references with explicit lifetimes.',
      'The borrow checker enforces aliasing and mutation rules.',
    ],
  },
  {
    heading: 'Traits and generics',
    bullets: [
      'Traits define shared behavior and act like interfaces.',
      'Generics compile to monomorphized code, avoiding runtime overhead.',
      'Trait bounds express constraints for reusable components.',
    ],
  },
  {
    heading: 'Memory and safety',
    bullets: [
      'Rust offers manual control without garbage collection.',
      'Unsafe blocks allow low-level operations with explicit boundaries.',
      'Pattern matching and enums model states without nulls.',
    ],
  },
  {
    heading: 'Compilation model',
    bullets: [
      'Cargo manages builds, dependencies, and reproducible environments.',
      'Modules and crates provide clear namespace boundaries.',
      'The compiler surfaces errors early with detailed diagnostics.',
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
]

const pitfalls = [
  'Fighting the borrow checker instead of modeling ownership explicitly.',
  'Overusing Rc/RefCell hides design problems and creates runtime borrow panics.',
  'Assuming unsafe blocks are faster without measuring.',
  'Ignoring lifetime annotations in APIs can leak complexity to callers.',
  'Building async systems without understanding executor behavior.',
]

const decisionGuidance = [
  'Use Rust when you need memory safety and performance without a garbage collector.',
  'Prefer Rust for security-critical or concurrency-heavy systems.',
  'Adopt Rust gradually via FFI in existing C or C++ codebases.',
  'Invest in tooling and training to overcome the borrow checker learning curve.',
  'Avoid Rust when time-to-market is more critical than safety guarantees.',
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
]

const takeaways = [
  'Rust aims to eliminate entire classes of memory and concurrency bugs at compile time.',
  'Ownership and borrowing enable predictable performance without garbage collection.',
  'Traits and enums produce expressive, reliable APIs.',
  'The ecosystem favors tooling and explicitness over hidden magic.',
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
