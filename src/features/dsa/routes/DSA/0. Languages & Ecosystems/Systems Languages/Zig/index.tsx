import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Zig is a modern systems programming language built around explicitness, predictable performance, and low-level control without adopting the full complexity culture of C++. It aims to be practical for operating-system-adjacent software, embedded work, tooling, networking, game engines, compilers, and performance-sensitive libraries where developers need direct understanding of memory, layout, and runtime cost.',
  'The language matters because it offers a different modernization strategy than many newer languages. Instead of hiding systems concerns behind a garbage collector or a very large abstraction stack, Zig keeps memory management, allocation, error handling, and platform details visible. At the same time, it tries to remove recurring frustrations from C-style development through stronger compile-time checking, better tooling integration, safer defaults in debug builds, and clearer generic metaprogramming.',
  'This page is intentionally thorough. It covers what Zig is for, how it compares conceptually to C and C++, explicit memory management, allocators, error unions, optionals, slices, structs and tagged unions, compile-time execution, C interoperability, tooling, testing, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Zig is a low-level general-purpose language designed for systems programming. It gives developers direct access to memory, pointers, data layout, and platform-facing APIs while trying to keep the language itself smaller and more coherent than some older systems languages.',
      'The central idea is that systems code should be explicit and inspectable. Rather than relying on hidden allocations, exceptions, garbage collection, or large amounts of magic, Zig prefers visible control flow, visible resource handling, and language features that make runtime cost easier to reason about.',
    ],
  },
  {
    id: 'bp-why-zig',
    title: 'Why Zig Exists',
    paragraphs: [
      'Zig exists because many developers wanted something closer to the directness of C, but with a more modern compiler experience, safer debug behavior, built-in tooling, and fewer historical accidents baked into the language surface. It is not trying to be a fully managed application language. It is trying to improve the experience of writing software that still cares about exact control.',
      'Its design is also a reaction against language complexity. Zig takes the position that low-level software is already hard because of concurrency, memory, I/O, hardware constraints, and interoperability. Adding large amounts of language machinery on top of that can make maintenance worse rather than better.',
    ],
    bullets: [
      'Keep low-level control without embracing excessive language complexity.',
      'Modernize the C-style systems workflow with better compile-time behavior and tooling.',
      'Make control flow, memory use, and failure paths visible in the source.',
      'Support gradual adoption through strong C interoperability.',
    ],
  },
  {
    id: 'bp-systems-context',
    title: 'Systems Programming Context',
    paragraphs: [
      'Systems programming is the part of software engineering that works close to operating systems, hardware boundaries, runtime internals, memory management, file systems, networking stacks, language runtimes, embedded devices, and performance-sensitive libraries. In these domains, hidden runtime costs and vague resource ownership can become real operational problems rather than style issues.',
      'Zig is designed for exactly that environment. It assumes the programmer often needs to care about stack versus heap, fixed-size buffers, allocator choice, calling conventions, alignment, binary size, startup cost, and portability. That is why it can feel more demanding than higher-level languages while still being attractive to engineers who need that control.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Zig Fits Best',
    paragraphs: [
      'Zig fits best in domains where predictable behavior and platform control matter more than framework abundance. That includes command-line tools, compilers, language infrastructure, networking software, embedded systems, game tooling, systems utilities, native libraries, and code that must interoperate closely with C APIs.',
      'It can also be attractive for teams that want a smaller language model than C++ while keeping native-level performance and explicit resource handling. It is less natural for web-heavy application stacks where a large managed ecosystem matters more than low-level control.',
    ],
    bullets: [
      'Native utilities and command-line tools.',
      'Embedded and resource-constrained software.',
      'Compilers, parsers, and infrastructure tooling.',
      'Libraries or applications that need strong C interoperability.',
    ],
  },
  {
    id: 'bp-design-philosophy',
    title: 'Design Philosophy',
    paragraphs: [
      'Zig is strongly shaped by the values of explicitness and simplicity. The language tries to avoid hidden control flow, hidden allocation, and large feature surfaces that make maintenance difficult. This is why many operations that would be implicit elsewhere are spelled out directly in Zig code.',
      'That does not mean Zig is minimal in the sense of being primitive. It includes powerful compile-time execution, generic programming, built-in testing support, and a capable toolchain. The philosophy is that power should still be understandable and close to what the code is really doing.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      "Zig's main strengths are explicit resource handling, strong C interoperability, a coherent toolchain story, compile-time power without a gigantic template language, and performance characteristics that align well with systems work. Developers often appreciate that the language encourages them to think clearly about ownership, allocation, and failure instead of leaving those concerns half-hidden.",
      'Another major strength is debuggability. Zig tries to make incorrect assumptions fail loudly in development, and its language design often produces code whose runtime behavior is easier to trace back to the source.',
    ],
    bullets: [
      'Clear, explicit memory and error handling.',
      'Very strong integration with C ecosystems.',
      'A relatively small language surface compared with older native languages.',
      'Useful compile-time execution for specialization and code generation.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'Zig still asks a lot of the programmer. Explicit memory management means the language does not remove the need to think carefully about lifetimes, ownership, aliasing, and allocation strategy. The ecosystem is also smaller than older native-language ecosystems, which means fewer libraries, fewer long-established patterns, and less off-the-shelf infrastructure in some domains.',
      'It also is not a language for people who want the runtime to manage complexity for them. If a team benefits more from garbage collection, huge application frameworks, or mature high-level abstractions, Zig may be the wrong fit.',
    ],
    bullets: [
      'You still have to think deeply about memory and resource lifetimes.',
      'The ecosystem is younger and smaller than C, C++, Rust, Go, or Java.',
      'Some higher-level conveniences are intentionally absent.',
      'The language rewards precision, which can feel demanding for general application work.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that Zig is a language for writing honest low-level software. It wants source code to reflect the real costs and risks of the program rather than hide them behind large amounts of abstraction.',
      'Good Zig code is explicit about allocation, error paths, ownership, and representation. Bad Zig code tries to imitate higher-level patterns without preserving the clarity that makes the language valuable.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'Zig syntax is intentionally direct. It resembles familiar C-family structure in some places, but it avoids many of the historical edge cases and preprocessor-heavy workflows that made older low-level code difficult to reason about. Declarations, control flow, and types are written in a style meant to be uniform and readable once the core patterns are learned.',
      "A lot of Zig's design is about making the source reveal more of the program's actual behavior. You see allocator parameters, error-returning functions, pointer distinctions, and explicit conversions rather than relying on a large number of silent defaults.",
    ],
  },
  {
    id: 'core-memory-management',
    title: 'Explicit Memory Management',
    paragraphs: [
      'Zig does not have a garbage collector. If code needs dynamic memory, it must obtain that memory through an allocator or another explicit ownership path. This keeps runtime cost visible and gives developers much tighter control over performance, fragmentation, and memory lifetime.',
      'The tradeoff is that the programmer remains responsible for correctness. You must decide where memory comes from, who owns it, when it can be freed, and how long references remain valid. Zig helps by keeping these concerns visible, but it does not solve them automatically.',
    ],
  },
  {
    id: 'core-allocators',
    title: 'Allocators',
    paragraphs: [
      "Allocators are central to Zig's design. Rather than having one hidden global heap model, Zig frequently passes allocator values explicitly into APIs that may need dynamic memory. This makes allocation strategy part of the interface rather than an invisible implementation detail.",
      'That design matters in systems work because different contexts want different tradeoffs. A short-lived command-line tool, a long-running server, an arena-based parser, and an embedded target may all need different allocation behavior. Zig makes that choice visible instead of pretending one memory strategy fits every case.',
    ],
  },
  {
    id: 'core-error-handling',
    title: 'Error Handling',
    paragraphs: [
      'Zig uses explicit error handling instead of exceptions. Functions can return error unions, and callers must decide how to propagate, handle, or transform those failures. The `try` and `catch` forms make this readable without turning failures into hidden non-local control flow.',
      'This is important in systems code because failures often represent real runtime conditions such as I/O problems, invalid data, permission issues, allocation failure, or interrupted operations. Zig encourages those conditions to be part of the normal source-level design rather than something the runtime hides from view.',
    ],
  },
  {
    id: 'core-optionals-unions',
    title: 'Optionals And Error Unions',
    paragraphs: [
      'Zig distinguishes between absence and failure. Optional types model the presence or absence of a value. Error unions model a value that may either succeed or return a named error. This separation is important because missing data and operational failure are not the same thing, and the source code should not blur them together.',
      'This leads to clearer APIs. A search function that may not find a result can return an optional. A file-read function that may fail due to I/O or permissions should return an error union. That distinction forces more disciplined interface design.',
    ],
  },
  {
    id: 'core-structs-unions',
    title: 'Structs, Enums, And Tagged Unions',
    paragraphs: [
      'Zig uses structs for ordinary data aggregation and representation. Enums model discrete named values. Tagged unions are particularly useful when a value can be in one of several explicitly named forms, each with its own payload. This is powerful for protocol modeling, parser output, state machines, AST nodes, and other systems-oriented data shapes.',
      'Because Zig emphasizes representation clarity, these types are often used in a very direct way. They are less about object-oriented encapsulation and more about making the possible states and layouts of the program easy to inspect.',
    ],
  },
  {
    id: 'core-pointers-slices',
    title: 'Pointers, Arrays, And Slices',
    paragraphs: [
      'Zig makes distinctions between pointers, arrays, and slices explicit. Arrays have a fixed size known in the type. Slices are a pointer-plus-length view into a sequence. Pointers expose direct memory relationships that must be used carefully. These distinctions matter because low-level correctness often depends on whether data is owned, borrowed, fixed-size, or dynamically viewed.',
      'This explicitness improves clarity once learned, but it also means developers cannot stay vague about data representation. Zig expects you to know whether you are dealing with a buffer, a borrowed view, a sentinel-terminated string, or a pointer to a single value.',
    ],
  },
  {
    id: 'core-comptime',
    title: 'Compile-Time Execution And `comptime`',
    paragraphs: [
      "One of Zig's defining features is compile-time execution. Certain code can run during compilation, which allows the language to generate specialized implementations, validate assumptions, compute constants, and express generic behavior without a separate preprocessor or a giant template system.",
      'The key point is that compile-time power is still meant to remain understandable. Zig uses `comptime` to expose when values or logic must be known at compile time, which helps keep metaprogramming tied more directly to ordinary language constructs.',
    ],
  },
  {
    id: 'core-generics',
    title: 'Generics And Metaprogramming',
    paragraphs: [
      'Zig handles generic-style programming through compile-time parameters and type-driven code generation rather than through a separate heavyweight generic system in the style of some other languages. Functions can accept types or compile-time-known values, and the compiler can instantiate specialized code from those inputs.',
      'This is powerful because many systems-level abstractions depend on type shape, buffer sizes, policies, or layout choices known during compilation. Zig gives developers a practical way to encode those variations without introducing a radically separate language layer.',
    ],
  },
  {
    id: 'core-c-interop',
    title: 'C Interoperability',
    paragraphs: [
      "C interoperability is one of Zig's strongest practical features. Zig can call C code, consume C headers, and produce code that fits naturally into C-facing environments. This makes it highly useful as either a replacement for selected C components or as a language that lives alongside existing native codebases.",
      'That matters strategically because low-level ecosystems are full of C libraries, operating system APIs, embedded vendor interfaces, and long-lived infrastructure. A systems language that cannot work well with C starts from a serious disadvantage.',
    ],
  },
  {
    id: 'core-build-tooling',
    title: 'Build System And Tooling',
    paragraphs: [
      'Zig includes a strong built-in tooling story relative to many low-level languages. The compiler, build system, test support, formatting expectations, and cross-compilation workflow are more integrated than the fragmented toolchains common in older native-language ecosystems.',
      'This integration is one of the reasons Zig appeals to engineers frustrated by piles of external build glue. The language is not only about syntax. It is also about making the surrounding native-development workflow less chaotic.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing And Debugging',
    paragraphs: [
      'Zig includes first-class testing support, which encourages small direct tests close to the code being validated. Combined with explicit error handling and debug-oriented runtime checks, this supports a style of development where low-level assumptions are tested early rather than trusted blindly.',
      'Debugging also benefits from the fact that Zig avoids many hidden runtime mechanisms. When code fails, the control flow and allocation choices are often easier to map back to the source than in environments with more implicit behavior.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency And Asynchrony',
    paragraphs: [
      'Zig is a systems language, so concurrency matters, but its design emphasis is more on explicit primitives and runtime honesty than on turning concurrent code into something magically simple. Developers still need to reason carefully about shared state, synchronization, I/O boundaries, and scheduling costs.',
      'This is an area where language design alone cannot remove complexity. Zig can help keep costs and control flow visible, but it does not change the underlying difficulty of concurrent systems programming.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'Zig is designed for predictable native performance. It does not impose garbage collection pauses or a large managed runtime, and its explicit memory model lets developers shape allocation and layout choices directly. That makes it well suited for performance-sensitive code where both throughput and latency matter.',
      'As always in systems work, performance comes from design, not language reputation alone. Good Zig performance depends on algorithms, memory access patterns, data layout, allocation strategy, and avoiding unnecessary abstraction overhead.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where Zig Shines',
    paragraphs: [
      "Zig shines in software that benefits from native execution, direct memory control, predictable binaries, and explicit integration with system APIs. It is especially compelling for standalone tools, infrastructure software, embedded targets, performance-sensitive libraries, and code that needs to live near C without inheriting all of C's workflow pain.",
      'It also shines for engineers who want a lower-complexity alternative to C++ in some domains, especially when the codebase values directness and toolchain coherence more than large abstraction frameworks.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common Zig mistake is underestimating how much discipline explicit memory management still requires. Passing allocators around makes ownership visible, but it does not prevent poor lifetime design by itself. Another mistake is using compile-time features too aggressively, turning straightforward code into clever metaprogramming that is harder to maintain.',
      'Developers can also bring the wrong expectations from higher-level languages. Zig is not trying to remove systems concerns. It is trying to make them clear. Teams that want the language to hide cost and ownership will usually fight the model rather than benefit from it.',
    ],
    bullets: [
      'Treating explicit allocators as boilerplate instead of part of the API contract.',
      'Using `comptime` to be clever where ordinary code would be clearer.',
      'Confusing optional absence with operational failure.',
      'Assuming native performance automatically appears without careful data and allocation design.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-struct',
    title: 'Struct For Explicit Data Modeling',
    description: [
      'Zig often uses structs directly for clear data representation rather than hiding state behind large object hierarchies.',
    ],
    code: `const User = struct {
    id: u64,
    active: bool,
    score: i32,
};`,
    notes: [
      'This is straightforward representation-oriented modeling.',
      'In Zig, many types exist to make layout and state explicit rather than to mimic heavy OOP style.',
    ],
  },
  {
    id: 'ex-error-union',
    title: 'Error Union And `try`',
    description: [
      'Errors are explicit in the function signature, and callers handle or propagate them directly.',
    ],
    code: `const std = @import("std");

fn readConfig() ![]const u8 {
    return "ok";
}

pub fn main() !void {
    const value = try readConfig();
    _ = value;
}`,
    notes: [
      'The `!T` form means the function may return an error or a value of type `T`.',
      'Using `try` makes propagation visible without hidden exception flow.',
    ],
  },
  {
    id: 'ex-allocator',
    title: 'Allocator-Passing API',
    description: [
      'Allocation strategy is often part of the function contract in Zig rather than an invisible implementation detail.',
    ],
    code: `const std = @import("std");

fn makeMessage(allocator: std.mem.Allocator) ![]u8 {
    return try allocator.dupe(u8, "hello");
}`,
    notes: [
      'The caller decides which allocator policy to use.',
      'This makes ownership and allocation cost more explicit across API boundaries.',
    ],
  },
  {
    id: 'ex-tagged-union',
    title: 'Tagged Union For Explicit State',
    description: [
      'Tagged unions are useful when values can be in one of several named forms with different payloads.',
    ],
    code: `const Token = union(enum) {
    integer: i64,
    ident: []const u8,
    eof,
};`,
    notes: [
      'This is useful in parsers, protocols, state machines, and compilers.',
      'The set of legal shapes is explicit in the type itself.',
    ],
  },
  {
    id: 'ex-comptime',
    title: 'Compile-Time Type Parameter',
    description: [
      'Compile-time parameters let Zig express reusable code without a separate heavyweight template language.',
    ],
    code: `fn zeroOf(comptime T: type) T {
    return @as(T, 0);
}`,
    notes: [
      'The type parameter is known at compile time.',
      'This style is common in Zig metaprogramming and generic utility code.',
    ],
  },
  {
    id: 'ex-slice',
    title: 'Slice-Based Buffer View',
    description: [
      'Slices represent a runtime view over sequential data and are common in string and buffer APIs.',
    ],
    code: `fn firstByte(bytes: []const u8) u8 {
    return bytes[0];
}`,
    notes: [
      'A slice is not the same thing as a fixed-size array.',
      'This distinction is central to writing correct low-level interfaces.',
    ],
  },
  {
    id: 'ex-c-interop',
    title: 'C Interop Import',
    description: [
      'Zig can import and call C APIs directly, which is one of its strongest adoption paths.',
    ],
    code: `const c = @cImport({
    @cInclude("stdio.h");
});`,
    notes: [
      'This keeps existing C ecosystems usable instead of forcing all-native rewrites.',
      'Interop is practical value, not just a theoretical feature.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Allocator',
        definition:
          'A value or interface used to obtain and release dynamic memory explicitly in Zig.',
      },
      {
        term: 'Error union',
        definition: 'A return form that represents either a successful value or a named error.',
      },
      {
        term: 'Optional',
        definition: 'A type that can either contain a value or be null-like absent.',
      },
      {
        term: 'Slice',
        definition:
          'A runtime view over sequential data, typically represented as a pointer plus length.',
      },
      {
        term: 'Tagged union',
        definition:
          'A union value paired with an explicit tag that identifies which payload variant is active.',
      },
      {
        term: '`comptime`',
        definition:
          'A keyword used when values, parameters, or evaluation must happen during compilation.',
      },
      {
        term: 'Pointer',
        definition:
          'A value that refers directly to memory and must be used with explicit lifetime and aliasing awareness.',
      },
      {
        term: 'Sentinel-terminated data',
        definition:
          'Data sequences that end with a specific sentinel value, often relevant in C-style string interoperability.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Tooling Terms',
    terms: [
      {
        term: 'Native binary',
        definition:
          'A compiled executable that runs directly on the target platform without a managed runtime like a VM.',
      },
      {
        term: 'Cross-compilation',
        definition:
          'Building binaries for a different architecture or operating system than the host machine.',
      },
      {
        term: 'Debug build',
        definition:
          'A build configuration oriented toward correctness checking, diagnostics, and development visibility.',
      },
      {
        term: 'Release build',
        definition:
          'A build configuration oriented toward optimized production performance and distribution.',
      },
      {
        term: 'ABI',
        definition:
          'Application Binary Interface rules that govern how compiled code interacts across boundaries.',
      },
      {
        term: 'Linking',
        definition:
          'The process of combining compiled units and libraries into a final executable or library artifact.',
      },
      {
        term: 'Toolchain',
        definition:
          'The compiler, build workflow, linker behavior, and related tools used to produce software.',
      },
      {
        term: 'Crash safety',
        definition:
          'The extent to which incorrect assumptions are surfaced clearly during development rather than failing silently.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Ecosystem And Architecture Terms',
    terms: [
      {
        term: 'C interop',
        definition:
          'The ability to call C code, consume C headers, and integrate naturally with C libraries and APIs.',
      },
      {
        term: 'Embedded target',
        definition:
          'A constrained hardware or firmware environment where resources and runtime behavior must be tightly controlled.',
      },
      {
        term: 'Arena allocation',
        definition:
          'An allocation strategy where many objects are allocated from one region and freed together.',
      },
      {
        term: 'Parser',
        definition:
          'Software that reads structured input and turns it into a more useful representation such as tokens or syntax trees.',
      },
      {
        term: 'Systems utility',
        definition:
          'A low-level native tool used for operational, build, platform, or infrastructure tasks.',
      },
      {
        term: 'Ownership',
        definition:
          'The design question of which part of the program is responsible for a resource and its lifetime.',
      },
      {
        term: 'Native library',
        definition:
          'A compiled library meant to be linked or loaded directly by native code on the target platform.',
      },
      {
        term: 'Representation clarity',
        definition:
          'A design quality in which the source code makes data shape, memory behavior, and control flow easy to inspect.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-zig', label: 'Why Zig Exists' },
    { id: 'bp-systems-context', label: 'Systems Context' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-design-philosophy', label: 'Design Philosophy' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-memory-management', label: 'Memory Management' },
    { id: 'core-allocators', label: 'Allocators' },
    { id: 'core-error-handling', label: 'Error Handling' },
    { id: 'core-optionals-unions', label: 'Optionals and Error Unions' },
    { id: 'core-structs-unions', label: 'Structs and Tagged Unions' },
    { id: 'core-pointers-slices', label: 'Pointers and Slices' },
    { id: 'core-comptime', label: 'Compile-Time Execution' },
    { id: 'core-generics', label: 'Generics' },
    { id: 'core-c-interop', label: 'C Interop' },
    { id: 'core-build-tooling', label: 'Build and Tooling' },
    { id: 'core-testing', label: 'Testing and Debugging' },
    { id: 'core-concurrency', label: 'Concurrency' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-struct', label: 'Struct' },
    { id: 'ex-error-union', label: 'Error Union' },
    { id: 'ex-allocator', label: 'Allocator API' },
    { id: 'ex-tagged-union', label: 'Tagged Union' },
    { id: 'ex-comptime', label: 'Comptime Generic' },
    { id: 'ex-slice', label: 'Slice' },
    { id: 'ex-c-interop', label: 'C Interop' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Ecosystem Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="zig98-section">
      <h2 className="zig98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={`${section.id}-p-${index}`}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item, index) => (
            <li key={`${section.id}-b-${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="zig98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="zig98-section">
      <h2 className="zig98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="zig98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="zig98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="zig98-section">
      <h2 className="zig98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="zig98-divider" />}
    </section>
  )
}

export default function ZigPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Zig',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Zig"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Zig</h1>
      {introParagraphs.map((paragraph, index) => (
        <p key={`intro-${index}`}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
          )
        : null}

      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderContentSection(section, index === coreConceptSections.length - 1),
          )
        : null}

      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExampleSection(section, index === exampleSections.length - 1),
          )
        : null}

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
