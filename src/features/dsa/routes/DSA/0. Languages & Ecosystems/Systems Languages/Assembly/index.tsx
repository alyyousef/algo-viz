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
  'Assembly language is the human-readable symbolic layer directly above machine code. It represents CPU instructions, registers, memory addresses, control flow, and calling conventions in a form that programmers can write and inspect while still staying very close to what the processor actually executes.',
  'It matters because it is the clearest possible view of how software meets hardware without working directly in raw binary. Even when engineers mostly write in C, C++, Rust, Zig, or other compiled languages, assembly remains relevant for performance analysis, reverse engineering, compiler output inspection, operating-system work, embedded development, exploit mitigation, boot code, and understanding how low-level execution really works.',
  'This page is intentionally thorough. It covers what assembly is, why it still matters, architecture dependence, registers and instructions, memory addressing, calling conventions, stack behavior, control flow, optimization, debugging, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Assembly language is not one universal language. It is a family of low-level symbolic notations tied to specific processor architectures such as x86, x86-64, ARM, AArch64, RISC-V, MIPS, and many others. Each assembly language exposes the instruction set and register model of its target CPU in a more readable form than machine code.',
      'The essential idea is directness. In assembly, the programmer sees instructions close to the hardware execution model: move data, perform arithmetic, branch, load, store, call, return, and manipulate registers or memory. There is almost no abstraction barrier between source and execution behavior.',
    ],
  },
  {
    id: 'bp-why-assembly',
    title: 'Why Assembly Exists And Still Matters',
    paragraphs: [
      'Assembly exists because machine code is too hard for humans to write and maintain directly. Symbolic mnemonics, labels, and assembler directives provide a workable authoring layer while keeping full control over instructions and layout. Historically, assembly was once a mainstream programming medium before higher-level languages became dominant.',
      'It still matters because some engineering tasks require exact knowledge of what the processor is doing. Performance bottlenecks, ABI boundaries, kernel entry points, interrupt handlers, bootloaders, cryptographic hot paths, reverse engineering, and exploit analysis often demand a comfort level with assembly even if most of the product is written elsewhere.',
    ],
    bullets: [
      'Provide a writable symbolic form of machine instructions.',
      'Enable exact control over low-level execution behavior.',
      'Support architecture-specific startup, kernel, firmware, and optimization work.',
      'Remain essential for debugging and understanding compiler-generated native code.',
    ],
  },
  {
    id: 'bp-systems-context',
    title: 'Systems Programming Context',
    paragraphs: [
      'Assembly is the lowest routinely written software layer in many systems environments. It appears in boot code, firmware, kernel transitions, interrupt vectors, hardware bring-up, embedded startup logic, context switches, runtime stubs, JIT engines, and selected performance-critical inner loops.',
      "Most large systems are not written entirely in assembly anymore because the productivity cost is enormous. But assembly remains part of the systems programmer's mental toolkit because higher-level native code ultimately compiles down to architecture-specific instructions and ABI rules.",
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Assembly Fits Best',
    paragraphs: [
      'Assembly fits best where exact control is worth the cost: startup code, hardware-near routines, small performance-critical kernels, calling convention stubs, hand-written vectorized routines, debugging compiler output, reverse engineering, and educational work that teaches how machines really execute programs.',
      'It is a poor fit for most application logic, business rules, or large maintainability-heavy systems. The language gives maximal control, but it also gives maximal exposure to complexity, architecture specificity, and human error.',
    ],
    bullets: [
      'Bootloaders, kernels, and firmware entry paths.',
      'Interrupt handlers and context-switch code.',
      'Performance-critical routines or architecture-specific intrinsics.',
      'Reverse engineering, exploit analysis, and binary inspection.',
    ],
  },
  {
    id: 'bp-design-reality',
    title: 'Design Reality',
    paragraphs: [
      'Assembly is not designed for abstraction comfort. It mirrors the execution model of a processor, not the conceptual model of a business domain. That means registers, flags, jump targets, stack discipline, and memory addresses are first-class concerns.',
      'This is why assembly can be simultaneously illuminating and brutal. It shows what the machine actually does, but it offers almost no help with managing large-scale software complexity.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      "Assembly's greatest strengths are precision, transparency, and control. A programmer can choose the exact instructions, exact data movement, exact calling sequence, exact register usage, and often exact layout decisions that the processor will see. This makes it uniquely powerful for hardware-facing and performance-sensitive tasks.",
      'It is also unmatched as a learning tool for understanding computer architecture, ABIs, calling conventions, stack frames, and how compilers translate higher-level constructs into executable instructions.',
    ],
    bullets: [
      'Maximum control over CPU-visible behavior.',
      'Direct insight into how native software actually runs.',
      'Useful for debugging, reverse engineering, and performance analysis.',
      'Necessary in selected hardware-near and runtime-critical code paths.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'Assembly is extremely costly to write and maintain. It is architecture-specific, easy to get wrong, difficult to port, and poor at expressing large-scale logic clearly. Small mistakes can corrupt registers, stack state, memory safety, or control flow in ways that are hard to diagnose.',
      'It is also not necessarily faster than compiler output by default. Modern compilers are excellent at many optimizations. Hand-written assembly only wins when the programmer truly understands the target architecture, compiler behavior, and workload.',
    ],
    bullets: [
      'Very high maintenance cost.',
      'Strong dependence on a specific CPU architecture and ABI.',
      'Easy to introduce subtle correctness bugs.',
      'Often inappropriate for large general-purpose application logic.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that assembly is the exposed skeleton of native execution. It is where control flow, data movement, calling conventions, and hardware details become explicit.',
      'Good assembly is tiny, deliberate, and justified. Bad assembly appears because someone wanted control without paying the intellectual cost of understanding the architecture deeply.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-architecture-specific',
    title: 'Architecture-Specific Nature',
    paragraphs: [
      'Assembly language is always tied to a particular instruction set architecture. x86-64 assembly is not interchangeable with AArch64 assembly, and both differ fundamentally from RISC-V, MIPS, or older 8-bit and 16-bit targets. Mnemonics, register names, addressing modes, and calling conventions all depend on the platform.',
      'This matters because assembly knowledge is partly transferable conceptually and partly architecture-bound. The general ideas of registers, stack frames, and jumps carry across systems, but the exact instruction vocabulary and ABI details do not.',
    ],
  },
  {
    id: 'core-registers',
    title: 'Registers',
    paragraphs: [
      'Registers are the small, fast storage locations inside the CPU that assembly code uses constantly. Some registers hold general-purpose values, some participate in arithmetic, some are dedicated to stack tracking, and some are used implicitly by certain instructions or calling conventions.',
      'Understanding register roles is central because assembly programming is largely about moving values through registers, preserving required ones across calls, and using the limited register set effectively.',
    ],
  },
  {
    id: 'core-instructions-flags',
    title: 'Instructions And Flags',
    paragraphs: [
      'Assembly code is made of instructions such as moves, arithmetic operations, comparisons, bitwise operations, loads, stores, calls, and jumps. Many architectures also expose status flags that record results of operations, such as zero, carry, sign, or overflow. Later instructions may branch based on those flags.',
      'This makes control flow very explicit. A comparison is often not a self-contained high-level concept. It is a sequence of instructions that set flags and then a branch that interprets them.',
    ],
  },
  {
    id: 'core-memory-addressing',
    title: 'Memory Addressing',
    paragraphs: [
      'Assembly programmers deal directly with memory addresses, offsets, pointers, and addressing modes. Data may live in registers, on the stack, in static sections, or in heap-managed areas reached through pointers from higher-level runtime code.',
      'Addressing modes matter because they define how the CPU calculates where data lives. Effective low-level code often depends on understanding base registers, offsets, index scaling, alignment, and the cost of memory access patterns.',
    ],
  },
  {
    id: 'core-stack-calls',
    title: 'Stack Frames And Function Calls',
    paragraphs: [
      'Function calls in native code involve a calling convention, a return address, argument passing rules, preserved versus clobbered registers, and often a stack frame. Assembly makes all of this visible. The programmer may manually push values, reserve stack space, set up local variables, and restore state before returning.',
      'This is one of the most valuable reasons to study assembly even if you rarely write it professionally. It explains how higher-level functions, recursion, local variables, and ABI boundaries really work under the surface.',
    ],
  },
  {
    id: 'core-calling-conventions',
    title: 'Calling Conventions And ABIs',
    paragraphs: [
      'A calling convention defines how functions receive parameters, return values, preserve registers, and clean up stack state. These rules are part of the ABI, which lets separately compiled code still interoperate correctly. Different platforms and compilers may use different conventions.',
      'In assembly, respecting the ABI is not optional. If a routine violates register-preservation rules or returns values in the wrong place, it may corrupt the caller or crash the program.',
    ],
  },
  {
    id: 'core-control-flow',
    title: 'Control Flow',
    paragraphs: [
      'High-level constructs such as `if`, `while`, `for`, and `switch` become labels plus conditional or unconditional jumps in assembly. This is why assembly is useful for understanding how structured programming maps to machine execution.',
      'It also shows why certain compiler optimizations and branching behaviors matter. What appears as a simple loop in a high-level language may involve several labels, comparisons, fall-through paths, and prediction-relevant branches at the assembly level.',
    ],
  },
  {
    id: 'core-data-sections',
    title: 'Data Sections And Program Layout',
    paragraphs: [
      'Assembly source often includes directives for organizing code and data into sections such as text, initialized data, read-only constants, or uninitialized storage. These directives help control where instructions and data appear in the final binary.',
      'This matters because program layout affects linkage, startup behavior, relocations, and how the operating system loads the executable. Higher-level languages usually hide this organization, but assembly exposes it directly.',
    ],
  },
  {
    id: 'core-assembler-directives',
    title: 'Assembler Directives And Syntax Variants',
    paragraphs: [
      'Assembly source contains not only instructions but also assembler directives: labels, section declarations, symbol visibility controls, constants, macros, alignment requests, and external references. Assemblers such as NASM, MASM, GAS, and others also differ in syntax conventions.',
      'This is important because assembly is not one uniform textual language even within the same architecture. Operand order, prefix rules, directive spelling, and macro facilities can differ substantially across toolchains.',
    ],
  },
  {
    id: 'core-debugging-disassembly',
    title: 'Disassembly, Debugging, And Reverse Engineering',
    paragraphs: [
      'Many engineers encounter assembly not by writing it from scratch but by reading disassembly in a debugger, profiler, reverse engineering tool, or compiler output. This is often enough to identify hot loops, understand crashes, inspect calling conventions, or reason about compiler optimizations.',
      'That makes assembly literacy valuable beyond pure assembly programming. You may never hand-write a full application in assembly, but understanding disassembly can still materially improve debugging and performance work.',
    ],
  },
  {
    id: 'core-optimization',
    title: 'Performance And Optimization Reality',
    paragraphs: [
      'Assembly is often associated with maximum performance, but that association needs care. Writing fast assembly requires deep knowledge of pipeline behavior, cache effects, instruction latency, instruction throughput, register pressure, branch prediction, vector units, and the exact workload.',
      'Modern compilers are frequently better than humans at broad optimization unless the programmer has architecture-specific expertise and a narrow target case. Hand-written assembly should be justified by measurement, not mythology.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where Assembly Shines',
    paragraphs: [
      'Assembly shines in tiny carefully justified regions where exact machine behavior matters more than maintainability convenience. That includes boot sequences, interrupt or syscall stubs, ABI glue, JIT output, reverse engineering, exploit analysis, and occasionally hand-tuned kernels.',
      'It also shines as a learning tool. Few subjects build intuition about native execution faster than reading or writing small assembly routines that manipulate registers, stack state, and branches directly.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common assembly mistake is underestimating the importance of the ABI. Another is treating architecture knowledge as universal when details change sharply across platforms. Developers also often overestimate the performance gains of hand-written assembly without measuring or understanding the compiler output first.',
      'The most dangerous pattern is using assembly in places where maintainability matters more than tiny gains. Because assembly is so low-level, every line carries a high long-term cost.',
    ],
    bullets: [
      'Violating calling convention or register-preservation rules.',
      'Mismanaging stack alignment or stack cleanup.',
      'Confusing one assembler syntax or ISA with another.',
      'Writing hand-tuned code without profiling evidence.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-move-add',
    title: 'Simple Register Arithmetic',
    description: [
      'Assembly often begins with moving values into registers and performing direct arithmetic operations.',
    ],
    code: `mov eax, 5
add eax, 3`,
    notes: [
      'This style shows the directness of register-level computation.',
      'The exact register names and instruction forms depend on the ISA and syntax style.',
    ],
  },
  {
    id: 'ex-compare-jump',
    title: 'Compare And Conditional Jump',
    description: ['High-level branching becomes explicit compare-and-jump sequences in assembly.'],
    code: `cmp eax, ebx
je equal_label`,
    notes: [
      'The comparison typically sets flags rather than returning a boolean object.',
      'Later branch instructions interpret those flags.',
    ],
  },
  {
    id: 'ex-loop',
    title: 'Counted Loop Shape',
    description: [
      'Loops become labels plus jumps that repeatedly transfer control back to the loop body.',
    ],
    code: `mov ecx, 10
loop_start:
dec ecx
jnz loop_start`,
    notes: [
      'This is the underlying shape behind many higher-level iteration constructs.',
      'Precise branch behavior matters for both correctness and performance.',
    ],
  },
  {
    id: 'ex-stack-frame',
    title: 'Typical Stack Frame Prologue',
    description: [
      'Many calling conventions use a function prologue and epilogue to establish stack-based locals and preserve state.',
    ],
    code: `push rbp
mov rbp, rsp
sub rsp, 32`,
    notes: [
      'This is one common pattern, not a universal rule.',
      'Modern optimized code may omit classic frame-pointer usage depending on compiler settings and ABI choices.',
    ],
  },
  {
    id: 'ex-memory-load',
    title: 'Memory Load Through Addressing',
    description: [
      'Assembly often reads memory through explicit base-plus-offset or other addressing forms.',
    ],
    code: `mov eax, [rbx+8]`,
    notes: [
      'This makes data location and addressing explicit.',
      'Understanding addressing modes is central to real assembly work.',
    ],
  },
  {
    id: 'ex-call-ret',
    title: 'Direct Function Call',
    description: [
      'Function invocation at the assembly level uses explicit call and return instructions plus ABI rules.',
    ],
    code: `call compute_value
ret`,
    notes: [
      'The call instruction interacts with the stack and return address mechanism.',
      'Correct surrounding register and argument discipline depends on the calling convention.',
    ],
  },
  {
    id: 'ex-data-section',
    title: 'Static Data Declaration',
    description: [
      'Assembly source usually includes explicit data declarations for constants or storage.',
    ],
    code: `section .data
message db "Hello", 0`,
    notes: [
      'Data layout is part of the source, not hidden behind a compiler-generated abstraction layer.',
      'Exact directive syntax depends on the assembler.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Instruction mnemonic',
        definition:
          'A symbolic text name such as `mov`, `add`, or `jmp` representing a machine instruction.',
      },
      {
        term: 'Register',
        definition:
          'A small CPU storage location used directly by instructions for fast computation and addressing.',
      },
      {
        term: 'Label',
        definition:
          'A symbolic name that marks an address or control-flow target in assembly source.',
      },
      {
        term: 'Opcode',
        definition:
          'The underlying machine-level operation encoded in binary and often represented by a mnemonic in assembly.',
      },
      {
        term: 'Operand',
        definition: 'A value, register, address, or immediate used by an instruction.',
      },
      {
        term: 'Immediate value',
        definition: 'A constant encoded directly in an instruction rather than loaded from memory.',
      },
      {
        term: 'Flag',
        definition:
          'A processor status bit affected by instructions and used by later conditional behavior.',
      },
      {
        term: 'Addressing mode',
        definition:
          'The rule by which an instruction identifies where its data comes from or goes to.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Binary Terms',
    terms: [
      {
        term: 'Stack pointer',
        definition:
          'The register tracking the current top of the stack under the active calling convention.',
      },
      {
        term: 'Frame pointer',
        definition:
          "A register sometimes used to anchor a function's stack frame for locals and debugging.",
      },
      {
        term: 'Calling convention',
        definition:
          'The platform rule set for passing arguments, returning values, and preserving registers across calls.',
      },
      {
        term: 'ABI',
        definition:
          'Application Binary Interface rules that let separately compiled native code interoperate correctly.',
      },
      {
        term: 'Disassembly',
        definition:
          'The readable symbolic representation produced by decoding machine code back into assembly-like form.',
      },
      {
        term: 'Prologue',
        definition:
          'The setup instructions at the start of a function, often used to prepare stack state.',
      },
      {
        term: 'Epilogue',
        definition:
          'The cleanup instructions at the end of a function, often used to restore stack and preserved registers.',
      },
      {
        term: 'Object file',
        definition:
          'A partially compiled binary artifact containing machine code and symbols before final linking.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Tooling And Architecture Terms',
    terms: [
      {
        term: 'Assembler',
        definition: 'The tool that translates assembly source into machine code or object files.',
      },
      {
        term: 'Linker',
        definition:
          'The tool that resolves symbols and combines object files into a final executable or library.',
      },
      {
        term: 'Instruction set architecture',
        definition:
          'The CPU-defined contract of instructions, registers, and execution rules that assembly targets.',
      },
      {
        term: 'Firmware',
        definition:
          'Low-level software stored close to hardware, often involving assembly in startup or control paths.',
      },
      {
        term: 'Bootloader',
        definition:
          'The early startup software that prepares the machine and loads later execution stages.',
      },
      {
        term: 'Reverse engineering',
        definition:
          'The practice of analyzing binaries and low-level behavior, often by reading disassembly.',
      },
      {
        term: 'JIT',
        definition:
          'Just-in-time compilation, where executable machine code is generated dynamically at runtime.',
      },
      {
        term: 'Hot path',
        definition:
          'A performance-critical code region executed frequently enough that instruction-level behavior matters.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-assembly', label: 'Why Assembly Exists' },
    { id: 'bp-systems-context', label: 'Systems Context' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-design-reality', label: 'Design Reality' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-architecture-specific', label: 'Architecture Specificity' },
    { id: 'core-registers', label: 'Registers' },
    { id: 'core-instructions-flags', label: 'Instructions and Flags' },
    { id: 'core-memory-addressing', label: 'Memory Addressing' },
    { id: 'core-stack-calls', label: 'Stack Frames and Calls' },
    { id: 'core-calling-conventions', label: 'Calling Conventions' },
    { id: 'core-control-flow', label: 'Control Flow' },
    { id: 'core-data-sections', label: 'Data Sections' },
    { id: 'core-assembler-directives', label: 'Assembler Directives' },
    { id: 'core-debugging-disassembly', label: 'Disassembly and Debugging' },
    { id: 'core-optimization', label: 'Optimization Reality' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-move-add', label: 'Register Arithmetic' },
    { id: 'ex-compare-jump', label: 'Compare and Jump' },
    { id: 'ex-loop', label: 'Loop' },
    { id: 'ex-stack-frame', label: 'Stack Frame' },
    { id: 'ex-memory-load', label: 'Memory Load' },
    { id: 'ex-call-ret', label: 'Call and Return' },
    { id: 'ex-data-section', label: 'Data Section' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Tooling Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="asm98-section">
      <h2 className="asm98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="asm98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="asm98-section">
      <h2 className="asm98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="asm98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="asm98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="asm98-section">
      <h2 className="asm98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="asm98-divider" />}
    </section>
  )
}

export default function AssemblyPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Assembly',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Assembly"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Assembly</h1>
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
