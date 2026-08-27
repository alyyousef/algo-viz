import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Scala/index.mdx': `---
title: Scala
description: A high-level, statically typed language that combines object-oriented and functional programming, running on the Java Virtual Machine (JVM).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Scala">

Scala (Scalable Language) was designed to address criticisms of Java by providing a concise syntax and fully integrating functional programming with object-oriented programming.

## 1. Functional Meets Object-Oriented
In Scala, every value is an object, and every operation is a method call. At the same time, functions are first-class citizens, meaning they can be passed as arguments, returned as results, and stored in variables.

<Callout icon="tip" title="Immutability by Default">
Scala strongly encourages the use of immutable variables (declared with TICK1valTICK1 instead of TICK1varTICK1). This mathematical purity drastically reduces side effects and makes concurrent programming inherently safer.
</Callout>

## 2. The Type System
Scala possesses one of the most powerful and complex static type systems in existence.
- **Type Inference**: Unlike legacy Java, you rarely need to explicitly declare types. The Scala compiler mathematically infers them.
- **Traits**: Similar to Java interfaces but vastly more powerful, allowing for multiple inheritance of state and behavior via mixins.

## 3. Concurrency (Akka and Futures)
Scala excels at distributed, high-concurrency systems.
Instead of relying on low-level threads and locks, Scala utilizes **Futures** (for asynchronous non-blocking operations) and the **Actor Model** (via the Akka framework) where lightweight actors communicate exclusively by passing immutable messages.

<ComparisonTable 
  headers={["Feature", "Scala", "Java"]} 
  rows={[
    ["Programming Paradigm", "Multi-paradigm (FP + OOP)", "Primarily OOP"],
    ["Type Inference", "Extensive", "Limited (var in Java 10+)"],
    ["Concurrency", "Actor Model (Akka), Futures", "Threads, Executor Services"]
  ]} 
/>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Swift/index.mdx': `---
title: Swift
description: A powerful and intuitive programming language developed by Apple for iOS, macOS, watchOS, and tvOS development.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Swift">

Introduced in 2014, Swift replaced Objective-C as Apple's primary language. It was designed from the ground up to be safe, fast, and modern, aggressively eliminating entire classes of common programming errors.

## 1. Safety by Design
Swift's most defining characteristic is its mathematical obsession with memory and type safety.
- **Optionals**: Swift eliminates the "Billion Dollar Mistake" (Null Pointer Exceptions). Variables cannot be null by default. If a value might be missing, it must be explicitly wrapped in an TICK1OptionalTICK1. The compiler forces the developer to unwrap it safely before use.
- **Initialization**: The compiler guarantees that all variables are initialized before use, and that arrays are bounds-checked.

<Callout icon="success" title="Automatic Reference Counting (ARC)">
Unlike C++ (manual memory) or Java (Garbage Collection), Swift uses ARC. The compiler mathematically inserts memory management instructions at compile time, guaranteeing zero-pause execution while preventing memory leaks.
</Callout>

## 2. Modern Syntax and Features
Swift borrows heavily from modern languages like Rust and Haskell.
- **Value Types**: Structs and Enums in Swift are incredibly powerful, supporting methods and protocols. They are passed by value, eliminating unintended side effects from shared references.
- **Protocol-Oriented Programming**: Instead of massive class inheritance trees, Swift encourages defining behaviors via Protocols and extending them, leading to highly modular code architectures.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/V/index.mdx': `---
title: V (Vlang)
description: A statically typed compiled programming language designed for building maintainable software with ultra-fast compilation and zero dependencies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="V (Vlang)">

V is a relatively new systems programming language that aims to be a simpler, faster alternative to C++, Rust, and Go. It is famous for its astonishing compilation speed (compiling itself in under a second).

## 1. Simplicity and Performance
V was explicitly designed to have a tiny cognitive load. The entire language documentation can be read in a few hours.
- **C Translation**: V can automatically translate C code into human-readable V code, allowing seamless integration with massive legacy C codebases (like DOOM).
- **Compilation Speed**: The compiler is mathematically optimized, emitting machine code directly or generating ultra-optimized C code for GCC/Clang to compile.

## 2. Safety Without the Rust Struggle
V attempts to provide memory safety without the crushing complexity of Rust's borrow checker.

<Callout icon="info" title="Memory Management in V">
V uses a unique approach: it mathematically frees memory at compile time where possible, falling back to a minimal tracing Garbage Collector or manual management depending on the compiler flags. By default, variables are immutable and cannot be null.
</Callout>

<ComparisonTable 
  headers={["Language", "Compilation Speed", "Memory Safety", "Complexity"]} 
  rows={[
    ["V", "Instantaneous", "Default (Compile-time/GC)", "Low"],
    ["Rust", "Slow", "Guaranteed (Borrow Checker)", "High"],
    ["C", "Fast", "Manual (Unsafe)", "Medium"]
  ]} 
/>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/VB.NET/index.mdx': `---
title: VB.NET
description: An object-oriented programming language implemented on the .NET Framework, designed as the modern successor to Visual Basic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="VB.NET">

Visual Basic .NET (VB.NET) was released by Microsoft in 2002. While it retained the English-like syntax of legacy Visual Basic (VB6), it was a complete architectural rewrite, transforming it into a fully object-oriented language running on the Common Language Runtime (CLR).

## 1. The C# Parallel
Technologically, VB.NET and C# are mathematically identical under the hood. 
Both compile down to the exact same Intermediate Language (IL). Any library written in C# can be used seamlessly in VB.NET and vice versa. 

<Callout icon="warning" title="The Decline of VB.NET">
While heavily used in enterprise legacy systems, Microsoft explicitly shifted its focus to C# as the primary .NET language. VB.NET is mathematically feature-complete, but it no longer receives the cutting-edge language features that C# receives annually.
</Callout>

## 2. Syntax Characteristics
VB.NET was designed for rapid application development and readability by non-C programmers.
- It uses English words (TICK1AndAlsoTICK1, TICK1OrElseTICK1, TICK1NotTICK1) instead of C-style symbols (TICK1&&TICK1, TICK1||TICK1, TICK1!TICK1).
- It does not use case-sensitive variables, and blocks are terminated with explicitly named tags (TICK1End IfTICK1, TICK1NextTICK1, TICK1End SubTICK1) rather than curly braces.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Visual Basic/index.mdx': `---
title: Visual Basic (Classic)
description: A legacy, event-driven programming language and IDE developed by Microsoft, famously enabling the rapid creation of Windows GUI applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Visual Basic (Classic)">

Visual Basic (often referring to VB6, released in 1998) revolutionized software development in the 90s. Before VB, creating a Windows Graphical User Interface (GUI) required thousands of lines of complex, raw C/C++ Windows API code. 

## 1. Rapid Application Development (RAD)
VB introduced a revolutionary drag-and-drop interface. A developer could drag a button onto a canvas, double-click it, and instantly write the code for the TICK1OnClickTICK1 event. 
This democratized Windows programming, allowing business analysts and hobbyists to build complex database applications in days rather than months.

## 2. Component Object Model (COM)
VB6 heavily relied on Microsoft's COM architecture. 
Developers could purchase third-party visual components (ActiveX controls/OCX files) and drop them into their applications. 

<Callout icon="error" title="DLL Hell">
Because VB6 relied on global system registry entries for COM components, installing a new application would often overwrite shared DLLs with incompatible versions, mathematically breaking existing applications—a phenomenon famously known as "DLL Hell".
</Callout>

VB6 was officially retired and replaced by VB.NET in 2002, but its legacy heavily influenced modern UI frameworks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Zig/index.mdx': `---
title: Zig
description: A modern, low-level systems programming language designed to replace C by prioritizing simplicity, manual memory control, and compile-time execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zig">

Zig is a drop-in replacement for C. Unlike Rust, which enforces memory safety via a mathematically strict compiler, Zig gives the developer absolute manual control over memory, but provides vastly superior tooling, error handling, and transparency compared to C.

## 1. No Hidden Control Flow
Zig's defining philosophy is absolute explicitness. 
- There are mathematically zero hidden memory allocations. Every function that requires memory MUST be explicitly passed an Allocator object.
- There are no hidden control flows, no operator overloading, and no macros. If code looks like it calls a function, it calls exactly that function.

## 2. Comptime: Compile-Time Execution
Instead of using a clunky macro system like C++, Zig uses **comptime**. 
You can mathematically execute standard Zig code *during the compilation phase*. You can use standard loops and if-statements to generate types, parse strings, or mathematically calculate lookup tables before the program ever runs.

<ComparisonTable 
  headers={["Language", "Memory Allocation", "Metaprogramming", "C Interop"]} 
  rows={[
    ["Zig", "Explicit via Allocator", "Comptime Execution", "Native (Includes C compiler)"],
    ["C", "Implicit (malloc/free)", "Preprocessor Macros", "Native"],
    ["Rust", "Implicit but Checked", "Macros", "Requires FFI bindings"]
  ]} 
/>

<Callout icon="success" title="The Zig C Compiler">
The Zig binary mathematically includes a fully functional, highly optimized C and C++ compiler. You can compile legacy C projects directly using TICK1zig ccTICK1, making it an incredible tool for cross-compilation.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/ALGOL/index.mdx': `---
title: ALGOL
description: One of the most influential programming languages in history, fundamentally shaping the syntax of nearly all modern imperative languages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ALGOL (Algorithmic Language)">

Created in 1958, ALGOL was mathematically designed by an international committee to be a universal language for scientific computing, aiming to replace Fortran. While it never achieved Fortran's commercial dominance, its architectural legacy is unmatched.

## 1. The Father of Modern Syntax
ALGOL 60 introduced the concept of **Block Structure**. 
It was the first language to use TICK1beginTICK1 and TICK1endTICK1 to mathematically scope variables to specific blocks of code. This direct lineage evolved into the curly braces TICK1{}TICK1 used by C, Java, JavaScript, and Rust today.

<Callout icon="info" title="Lexical Scoping">
Before ALGOL, variables were often globally accessible, leading to catastrophic mathematical state errors in massive programs. ALGOL proved that variables should exist only within their strictly defined lexical block.
</Callout>

## 2. BNF (Backus-Naur Form)
To define the incredibly complex syntax of ALGOL mathematically, John Backus and Peter Naur invented BNF. 
BNF is a formal mathematical notation used to describe context-free grammars. Today, essentially every single programming language compiler in existence uses a variant of BNF to parse source code. 
Without ALGOL, the modern science of compiler design would not exist.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Alice/index.mdx': `---
title: Alice
description: An innovative, block-based educational programming environment designed to teach object-oriented concepts via 3D animations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Alice">

Developed by Carnegie Mellon University, Alice is a visual programming environment specifically designed to lower the barrier to entry for learning Object-Oriented Programming (OOP) and 3D mathematics.

## 1. Visualizing Objects
Traditional OOP requires students to mathematically abstract objects (e.g., TICK1class DogTICK1). 
In Alice, objects are literal 3D models (a dragon, a car, a person) placed in a virtual world. Students do not type raw syntax; they drag and drop visual instruction tiles to call methods on the objects (e.g., TICK1Dragon.moveForward(2)TICK1).

<Callout icon="tip" title="Immediate Feedback Loop">
Because every method call results in a direct, visual 3D animation, students immediately mathematically understand the flow of execution, parameters, and state changes without struggling with syntax errors or compiler warnings.
</Callout>

## 2. Teaching Complex Architectures
Despite its toy-like appearance, Alice mathematically enforces rigorous computer science concepts:
- **Methods and Functions**: Creating reusable blocks of animation.
- **Events**: Triggering code when a user clicks an object or presses a key.
- **Concurrency**: Using a TICK1Do TogetherTICK1 block to mathematically execute multiple methods on multiple threads simultaneously (e.g., making a bird flap its wings *while* moving forward).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/APL/index.mdx': `---
title: APL
description: An esoteric, heavily mathematical array-programming language famous for its extreme conciseness and non-standard typography.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="APL (A Programming Language)">

Designed in the 1960s by Kenneth Iverson, APL was originally created as a mathematical notation for teaching arrays and matrices, only later being implemented as an executable language. It is the grandfather of all modern array languages (like R and MATLAB).

## 1. Typographical Insanity
APL is famous for being mathematically unreadable to the uninitiated. 
Instead of English words (TICK1mapTICK1, TICK1reduceTICK1), APL uses specialized Greek symbols (ρ, ⍋, ⍒, ⍟). In the 1970s, programmers literally required specialized APL keyboards to type the code.

<Callout icon="warning" title="The Game of Life in One Line">
Because of its immense mathematical density, John Conway's Game of Life (which takes 50 lines in Java) can be written in APL in exactly one line of code:
TICK1life ← {⊃1 ⍵ ∨.∧ 3 4 = +/ +/ ¯1 0 1 ∘.⊖ ¯1 0 1 ∘.⌽ ⊂⍵}TICK1
</Callout>

## 2. Array Orientation
In languages like C, adding two massive arrays requires a mathematical TICK1forTICK1 loop.
In APL, the array is the fundamental primitive. You simply execute TICK1A + BTICK1, and the language mathematically applies the addition to every single element in parallel, drastically reducing the cognitive overhead of state management.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/BASIC/index.mdx': `---
title: BASIC
description: The Beginner's All-purpose Symbolic Instruction Code, the language that sparked the 1980s microcomputer revolution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="BASIC">

Created in 1964 at Dartmouth College, BASIC was explicitly designed to allow non-STEM students to use computers, which at the time required highly complex Assembly or Fortran knowledge.

## 1. The Microcomputer Explosion
In the late 1970s and 1980s, when personal computers (like the Apple II, Commodore 64, and IBM PC) were released, they mathematically did not have enough memory to run complex operating systems. 
Instead, they booted directly into a BASIC interpreter. Microsoft's founding product was a highly optimized BASIC interpreter (Altair BASIC).

## 2. Syntax and Line Numbers
Early BASIC required every single line of code to be manually numbered by the programmer (10, 20, 30).
This mathematically allowed the interpreter to know the execution order, and allowed the infamous TICK1GOTO 10TICK1 statement, which caused execution to jump instantly to line 10.

<Callout icon="error" title="Spaghetti Code">
Because early BASIC lacked structured programming (no functions or local variables, only global scope and GOTO statements), large programs rapidly degenerated into mathematically untraceable "Spaghetti Code". This led to intense criticism from computer scientists like Edsger Dijkstra.
</Callout>

While modern variants like Visual Basic and QuickBASIC introduced strict structuring and killed the line number, the original 8-bit BASIC remains a foundational pillar of computing history.

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
