import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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
  {
    title: 'C11 and atomics (2011)',
    detail:
      'C11 adds threads, atomics, and a formal memory model for concurrency.',
  },
  {
    title: 'C18 and C23 refinements',
    detail:
      'Smaller updates improve consistency and clarify the standard without major changes.',
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
  {
    title: 'Build is part of the language',
    detail:
      'Headers, the preprocessor, and the linker are essential to how C programs are structured.',
  },
]

const languageFundamentals = [
  {
    title: 'Compiled, not managed',
    detail:
      'C compiles directly to machine code with no runtime or garbage collector.',
  },
  {
    title: 'Minimal abstractions',
    detail:
      'The language is small; most complexity lives in libraries and code conventions.',
  },
  {
    title: 'Pointers as power tools',
    detail:
      'Pointers expose memory directly, enabling performance and portability.',
  },
  {
    title: 'Explicit control flow',
    detail:
      'No exceptions or closures; error handling and lifetime are manual.',
  },
]

const compilationPipeline = [
  {
    stage: 'Preprocess',
    description: 'Macros expand and includes pull in headers.',
  },
  {
    stage: 'Compile',
    description: 'Source files compile into object files.',
  },
  {
    stage: 'Assemble',
    description: 'Assembly turns into machine code (often within compile step).',
  },
  {
    stage: 'Link',
    description: 'Object files and libraries combine into an executable or library.',
  },
]

const standardLibraryHighlights = [
  {
    title: 'libc basics',
    detail:
      'stdio, stdlib, string, and math provide core utilities and IO.',
  },
  {
    title: 'POSIX APIs',
    detail:
      'Open, read, mmap, and sockets enable low-level system interaction.',
  },
  {
    title: 'Time and threading',
    detail:
      'time.h and threads.h (C11) provide timers and threading primitives.',
  },
  {
    title: 'Memory utilities',
    detail:
      'malloc/free and memcpy/memmove define core memory operations.',
  },
]

const coreConcepts = [
  {
    heading: 'Types and layout',
    bullets: [
      'Primitive types map to machine word sizes; sizeof and alignment drive struct layout.',
      'Pointers are raw addresses. Pointer arithmetic assumes contiguous memory.',
      'Bitfields and unions expose packed representations for protocols and hardware registers.',
      'const and volatile guide correctness and hardware access.',
    ],
  },
  {
    heading: 'Memory management',
    bullets: [
      'Stack allocation is automatic; heap allocation uses malloc/free and friends.',
      'Lifetime is explicit: use-after-free and leaks are common pitfalls.',
      'RAII does not exist in C; cleanup must be coded on every exit path.',
      'Allocation strategies include arenas and pools for speed.',
    ],
  },
  {
    heading: 'Compilation model',
    bullets: [
      'Translation units compile separately; headers declare interfaces.',
      'The preprocessor handles macros and conditional compilation.',
      'Linkers resolve symbols, producing libraries or executables.',
      'Static vs shared libraries change deployment and ABI concerns.',
    ],
  },
  {
    heading: 'Error handling',
    bullets: [
      'Return codes, errno, and out-parameters dominate; no exceptions.',
      'Defensive checks and clear ownership rules prevent silent corruption.',
      'APIs often follow "init/use/destroy" lifecycles.',
      'Consistent error conventions make systems debuggable.',
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
  {
    title: 'Atomics and memory order',
    detail:
      'C11 atomics define ordering guarantees; misuse can cause data races.',
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
  {
    title: 'Portability cost',
    detail:
      'Cross-platform code often needs conditional compilation and careful ABI handling.',
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
  {
    context: 'Cryptography and security',
    detail:
      'Low-level primitives and constant-time code are often written in C.',
  },
  {
    context: 'Performance-critical libraries',
    detail:
      'C powers core libraries consumed by higher-level languages.',
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
  {
    title: 'Error code pattern',
    code: `int parse_config(const char *path, Config *out) {
    FILE *fp = fopen(path, "r");
    if (!fp) return -1;
    int status = read_config(fp, out);
    fclose(fp);
    return status;
}`,
    explanation:
      'C APIs often return status codes and require explicit cleanup on each path.',
  },
  {
    title: 'Struct with init/destroy',
    code: `typedef struct {
    char *data;
    size_t len;
} Buffer;

int buffer_init(Buffer *b, size_t len) {
    b->data = malloc(len);
    if (!b->data) return -1;
    b->len = len;
    return 0;
}

void buffer_destroy(Buffer *b) {
    free(b->data);
    b->data = NULL;
    b->len = 0;
}`,
    explanation:
      'Explicit init/destroy patterns document ownership and lifecycle.',
  },
]

const pitfalls = [
  'Using uninitialized memory leads to nondeterministic bugs.',
  'Buffer overflows and out-of-bounds access are silent and dangerous.',
  'Forgetting to free memory causes leaks; double-free causes corruption.',
  'Assuming sizeof(int) or endianness is portable across platforms.',
  'Undefined behavior (shift overflow, aliasing violations) can break optimizations.',
  'Mixing signed and unsigned arithmetic can hide bugs.',
  'Neglecting error codes leads to silent failure paths.',
]

const decisionGuidance = [
  'Use C when you need deterministic performance, low-level control, or direct hardware access.',
  'Favor C for interoperability with existing systems code or libraries.',
  'Avoid C when safety and rapid iteration matter more than raw control.',
  'Lean on static analyzers and sanitizers for production-grade codebases.',
  'Document ownership and lifetimes explicitly in APIs.',
  'Prefer modern alternatives if memory safety is a hard requirement.',
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
  {
    title: 'Fuzzing as a habit',
    detail:
      'libFuzzer and AFL find edge cases in parsers and protocol handlers.',
  },
]

const takeaways = [
  'C offers direct control over memory and performance, with minimal abstraction overhead.',
  'The power comes with risk: correctness depends on rigorous discipline and tooling.',
  'C remains essential for kernels, embedded systems, and performance-critical libraries.',
  'Well-designed APIs clarify ownership, lifetimes, and error handling for users.',
  'Tooling is not optional; it is part of safe C development.',
]

const toolingWorkflow = [
  {
    title: 'Build systems',
    detail:
      'Make, CMake, and Meson manage builds across platforms.',
  },
  {
    title: 'Static analysis',
    detail:
      'clang-tidy, cppcheck, and Coverity catch defects early.',
  },
  {
    title: 'Sanitizers',
    detail:
      'ASan, UBSan, and MSan detect memory and undefined behavior issues.',
  },
  {
    title: 'Debugging',
    detail:
      'gdb and lldb inspect memory, call stacks, and registers.',
  },
]

const concurrencyOptions = [
  {
    title: 'C11 threads',
    detail:
      'threads.h provides a portable API for threads and mutexes.',
  },
  {
    title: 'POSIX threads',
    detail:
      'pthread remains the standard on Unix-like systems.',
  },
  {
    title: 'Atomics',
    detail:
      'stdatomic.h enables lock-free algorithms with memory ordering.',
  },
  {
    title: 'Event-driven IO',
    detail:
      'epoll, kqueue, and io_uring enable scalable servers.',
  },
]

const interopOptions = [
  {
    title: 'Stable C ABI',
    detail:
      'C APIs are the default interop boundary for many languages.',
  },
  {
    title: 'FFI and bindings',
    detail:
      'Python, Rust, and Go use C bindings for performance.',
  },
  {
    title: 'Shared libraries',
    detail:
      '.so and .dll files export symbols for integration.',
  },
  {
    title: 'Embedded firmware',
    detail:
      'C integrates directly with bootloaders and hardware SDKs.',
  },
]

const deploymentOptions = [
  {
    title: 'Static binaries',
    detail:
      'Static linking simplifies deployment for embedded devices.',
  },
  {
    title: 'Shared libraries',
    detail:
      'Dynamic linking reduces binary size and supports plugins.',
  },
  {
    title: 'Cross-compilation',
    detail:
      'Toolchains target microcontrollers and custom OSes.',
  },
  {
    title: 'Firmware images',
    detail:
      'Build artifacts often deploy as flashable images.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to C++',
    detail:
      'C is smaller and more predictable; C++ offers RAII and safer abstractions.',
  },
  {
    title: 'Compared to Rust',
    detail:
      'Rust enforces memory safety at compile time; C relies on discipline and tooling.',
  },
  {
    title: 'Compared to Go',
    detail:
      'C offers lower-level control; Go provides easier concurrency and safer memory.',
  },
  {
    title: 'Compared to Assembly',
    detail:
      'C is portable and expressive while still enabling low-level optimization.',
  },
]

const learningPath = [
  {
    title: 'Core syntax and pointers',
    detail:
      'Learn types, pointers, arrays, and struct layout.',
  },
  {
    title: 'Memory and ownership',
    detail:
      'Practice malloc/free patterns and error handling.',
  },
  {
    title: 'Systems APIs',
    detail:
      'Use file IO, sockets, and process APIs.',
  },
  {
    title: 'Tooling and debugging',
    detail:
      'Master sanitizers, gdb, and static analysis.',
  },
  {
    title: 'Concurrency',
    detail:
      'Learn threads, atomics, and memory ordering.',
  },
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

