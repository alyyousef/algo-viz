import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const glossary = [
  { term: 'Undefined Behavior', definition: 'Operations the C standard does not define, enabling aggressive compiler optimization.' },
  { term: 'Translation Unit', definition: 'A source file after preprocessing, compiled independently.' },
  { term: 'ABI', definition: 'Binary calling and layout conventions used by compiled code and libraries.' },
  { term: 'Pointer Aliasing', definition: 'Multiple pointers referencing overlapping memory, affecting optimization and correctness.' },
  { term: 'restrict', definition: 'A keyword promising non-overlapping pointer targets for optimization.' },
  { term: 'Stack Allocation', definition: 'Automatic storage duration tied to scope and function lifetime.' },
  { term: 'Heap Allocation', definition: 'Dynamic storage managed manually via malloc/free family.' },
  { term: 'C11 Atomics', definition: 'Atomic operations and memory order primitives defined in stdatomic.h.' },
  { term: 'POSIX', definition: 'Standardized Unix APIs for files, processes, sockets, and threads.' },
  { term: 'Sanitizer', definition: 'Runtime instrumentation (ASan/UBSan/MSan) for memory and UB defect detection.' },
]

const cHelpStyles = `
.c98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  margin: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.c98-window {
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

.c98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
}

.c98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  pointer-events: none;
}

.c98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.c98-control {
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

.c98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.c98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.c98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.c98-main {
  border-top: 1px solid #404040;
  background: #fff;
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
}

.c98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.c98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.c98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.c98-toc-list li {
  margin: 0 0 8px;
}

.c98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.c98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.c98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.c98-section {
  margin: 0 0 22px;
}

.c98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.c98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.c98-content p,
.c98-content li,
.c98-content th,
.c98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.c98-content p {
  margin: 0 0 10px;
}

.c98-content ul,
.c98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.c98-content table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.c98-content th,
.c98-content td {
  padding: 2px 8px 2px 0;
  vertical-align: top;
}

.c98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.c98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.c98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .c98-main {
    grid-template-columns: 1fr;
  }

  .c98-toc {
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
    { id: 'core-c-fundamentals', label: 'C Fundamentals' },
    { id: 'core-workflow', label: 'Tooling and Workflow' },
    { id: 'core-memory-model', label: 'Memory Model' },
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

export default function CPage(): JSX.Element {
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
    document.title = `C (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'C',
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
    <div className="c98-help-page">
      <style>{cHelpStyles}</style>
      <div className="c98-window" role="presentation">
        <header className="c98-titlebar">
          <span className="c98-title-text">C</span>
          <div className="c98-title-controls">
            <button className="c98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="c98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="c98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`c98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="c98-main">
          <aside className="c98-toc" aria-label="Table of contents">
            <h2 className="c98-toc-title">Contents</h2>
            <ul className="c98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="c98-content">
            <h1 className="c98-doc-title">C</h1>
            <p>
              C is designed for direct control: memory layout, data representation, and system calls are all explicit. It rewards
              careful engineering with unmatched predictability and portability, making it the core language for kernels, embedded
              firmware, and performance-critical libraries.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="c98-section">
                  <h2 className="c98-heading">Overview</h2>
                  <p>
                    C is a minimal abstraction over hardware. It compiles to efficient machine code, exposes raw pointers, and
                    leaves safety checks to the programmer. The language is small, but the responsibility it gives you is large.
                  </p>
                </section>
                <hr className="c98-divider" />
                <section id="bp-history" className="c98-section">
                  <h2 className="c98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="c98-section">
                  <h2 className="c98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="c98-section">
                  <h2 className="c98-heading">Key Takeaways</h2>
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
                <section id="core-fundamentals" className="c98-section">
                  <h2 className="c98-heading">Language Fundamentals</h2>
                  {languageFundamentals.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pipeline" className="c98-section">
                  <h2 className="c98-heading">Compilation Pipeline</h2>
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
                <section id="core-library" className="c98-section">
                  <h2 className="c98-heading">Standard Library Highlights</h2>
                  {standardLibraryHighlights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-c-fundamentals" className="c98-section">
                  <h2 className="c98-heading">How It Works: C Fundamentals</h2>
                  {coreConcepts.map((block) => (
                    <div key={block.heading}>
                      <h3 className="c98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-workflow" className="c98-section">
                  <h2 className="c98-heading">Tooling and Workflow</h2>
                  {toolingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-memory-model" className="c98-section">
                  <h2 className="c98-heading">How It Works: Memory Model</h2>
                  {memoryModelNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-concurrency" className="c98-section">
                  <h2 className="c98-heading">Concurrency and Parallelism</h2>
                  {concurrencyOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="c98-section">
                  <h2 className="c98-heading">Complexity Analysis and Tradeoffs</h2>
                  {performanceTradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    C lets you hit tight performance envelopes, but only when you reason about memory, cache behavior, and the
                    compiler. The performance ceiling is high, but so is the engineering cost.
                  </p>
                </section>
                <section id="core-uses" className="c98-section">
                  <h2 className="c98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-interop" className="c98-section">
                  <h2 className="c98-heading">Interoperability and Deployment</h2>
                  <h3 className="c98-subheading">Interoperability</h3>
                  {interopOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="c98-subheading">Deployment</h3>
                  {deploymentOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="c98-section">
                  <h2 className="c98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-compare" className="c98-section">
                  <h2 className="c98-heading">Comparisons and Tradeoffs</h2>
                  {comparisonNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="c98-section">
                  <h2 className="c98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-learning" className="c98-section">
                  <h2 className="c98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="c98-section">
                  <h2 className="c98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="c98-section">
                <h2 className="c98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="c98-subheading">{example.title}</h3>
                    <div className="c98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="c98-section">
                <h2 className="c98-heading">Glossary</h2>
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
