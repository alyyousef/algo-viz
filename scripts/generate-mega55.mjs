import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Lisp/index.mdx': `---
title: Lisp
description: The second-oldest high-level programming language in existence, pioneering tree data structures, automatic storage management, and dynamic typing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lisp">

Created by John McCarthy in 1958 at MIT, Lisp (LISt Processor) is one of the most historically significant programming languages ever invented, second only to Fortran in age. It was originally designed as a practical mathematical notation for computer programs, based on Alonzo Church's lambda calculus.

## 1. The Pioneer of Modern Computing
Before Lisp, programming meant manually allocating memory and moving bits in assembly or Fortran. 
Lisp mathematically pioneered concepts that modern developers take for granted:
- **Garbage Collection**: The compiler automatically cleans up unused memory.
- **Dynamic Typing**: Variables do not need static type declarations.
- **Tree Data Structures**: Lisp introduced the linked list (using TICK1consTICK1, TICK1carTICK1, and TICK1cdrTICK1 cells) as the fundamental building block of all data.
- **REPL**: The Read-Eval-Print Loop, allowing interactive programming.

## 2. Homoiconicity
The most famous (and polarizing) feature of Lisp is its syntax—specifically, its massive use of parentheses.
A Lisp program is written as an Abstract Syntax Tree (AST). 
TICK3lisp
(* (+ 1 2) (- 5 3))
TICK3
This is mathematically identical to a data structure (a list of lists). Because the code *is* data, Lisp possesses an unrivaled Macro system, allowing the programmer to mathematically reshape the language to fit any domain.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/OCaml/index.mdx': `---
title: OCaml
description: An industrial-strength functional programming language that combines a brilliant type system with object-oriented and imperative features.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OCaml">

Developed by INRIA in France (1996), OCaml is the premier implementation of the ML (Meta Language) family. It is a statically typed, strictly evaluated functional language that practically proves that mathematical rigor can co-exist with raw execution speed.

## 1. The Type System
Like Haskell, OCaml uses Hindley-Milner type inference, meaning you rarely write explicit type signatures. The compiler mathematically deduces them.
Unlike Haskell (which is "pure" and outlaws side effects), OCaml is **pragmatic**. If you mathematically need a mutable array or a standard TICK1forTICK1 loop to achieve maximum performance for a cryptography algorithm, OCaml lets you write it. It provides the safety of functional programming without mathematically punishing you for touching state.

## 2. Industrial Adoption
Because OCaml's compiler is incredibly fast and its output (native assembly or bytecode) is highly optimized, it is heavily used in high-stakes industries.
Financial institutions (like Jane Street) use it to mathematically guarantee the correctness of billions of dollars in algorithmic trades. Furthermore, OCaml's incredible parsing capabilities made it the language of choice to write the **Rust compiler (rustc)**, the **Haxe compiler**, and **Flow** (by Facebook).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/PureScript/index.mdx': `---
title: PureScript
description: A strongly-typed, purely functional programming language that compiles to clean, readable JavaScript.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PureScript">

Created by Phil Freeman, PureScript is heavily inspired by Haskell but specifically designed to target the JavaScript ecosystem (and later C++ and Erlang). It brings the mathematical rigor of purely functional programming to frontend development.

## 1. Strict Evaluation
Unlike Haskell, which uses Lazy Evaluation (where code mathematically isn't executed until its value is needed), PureScript uses **Strict (Eager) Evaluation**. 
Because JavaScript is strictly evaluated, this mathematical decision prevents the massive memory leaks and unpredictable performance spikes that often occur when compiling lazy languages to the browser.

## 2. No Runtime
Languages like Elm and ClojureScript ship a "Runtime" (a massive block of JavaScript code) to the browser to handle their specific data structures. 
PureScript was mathematically designed to compile into standard, idiomatic JavaScript without a heavy runtime. A PureScript record TICK1{ name: "John" }TICK1 compiles directly into a native JavaScript object. This makes integrating PureScript into an existing React or Node.js codebase incredibly easy, as the generated code looks almost exactly like hand-written JavaScript.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Racket/index.mdx': `---
title: Racket
description: A multi-paradigm Lisp dialect designed specifically as a platform for language creation and educational programming.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Racket">

Originally named PLT Scheme (created in 1995), Racket is a general-purpose, multi-paradigm programming language in the Lisp-Scheme family. While it is highly capable of building web servers and GUIs, its primary mission is **Language-Oriented Programming**.

## 1. Language-Oriented Programming
Racket's macro system is mathematically one of the most advanced in the world. 
In Racket, you do not just write programs; you mathematically write *languages* to write your programs. 
Every Racket file begins with a TICK1#langTICK1 declaration (e.g., TICK1#lang racketTICK1 or TICK1#lang typed/racketTICK1). You can use Racket's macro system to mathematically define an entirely new syntax, grammar, and compiler in just a few dozen lines of code, and the Racket IDE (DrRacket) will automatically provide syntax highlighting and debugging for your custom language.

## 2. Educational Impact
Because Racket makes it trivial to define safe, restricted mini-languages, it is the foundation of the widely acclaimed textbook *How to Design Programs*. Universities use Racket to mathematically teach students the fundamentals of recursion and functional design before exposing them to the complexities of C or Java.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Roc/index.mdx': `---
title: Roc
description: A fast, friendly, purely functional language designed by the creator of Elm, aimed at backend and systems programming.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Roc">

Created by Richard Feldman, Roc is a purely functional, statically typed language. It mathematically takes the brilliant, human-friendly concepts of **Elm** (no runtime exceptions, clear error messages, pure functions) and applies them to general-purpose backend programming.

## 1. The Platform Architecture
Most languages compile an application and execute it. 
Roc uses a mathematically unique "Platform" architecture. When you write a Roc app, you do not have direct access to the Operating System (you cannot write to a file). Instead, you write pure functions that mathematically interact with a **Platform** (written in Rust, C, or Zig). 
The Platform handles all the messy, stateful I/O (like reading a database or listening to an HTTP port), and passes the data into your pure Roc code. This mathematically isolates business logic from infrastructure, making Roc incredibly safe and testable.

## 2. Extreme Performance
Unlike Elm (which targets JavaScript), Roc targets native machine code via LLVM. It is mathematically designed to compete with Rust and Go in execution speed. Through advanced compiler optimizations (like automatic reference counting and morphic memory allocation), Roc achieves C-level performance while remaining a purely functional, garbage-collected language.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Scheme/index.mdx': `---
title: Scheme
description: A minimalist, highly elegant dialect of Lisp that introduced lexical scoping and first-class continuations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Scheme">

Created at MIT in the 1970s by Guy L. Steele and Gerald Jay Sussman, Scheme is a dialect of Lisp known for its extreme minimalism and mathematical elegance. 

## 1. Lexical Scoping
Before Scheme, most Lisps (and many other languages) used "Dynamic Scoping." If you called a function, it could accidentally mathematically read the local variables of the function that called it, leading to terrifying runtime bugs. 
Scheme mathematically proved that **Lexical Scoping** (where a variable's scope is strictly defined by where it is written in the source code) was vastly superior. This concept directly influenced the design of almost all modern languages, especially JavaScript.

## 2. First-Class Continuations
Scheme provides a mathematically mind-bending feature called TICK1call-with-current-continuationTICK1 (TICK1call/ccTICK1). 
A continuation is essentially a mathematical snapshot of the exact state of the program at a specific point in time (the call stack, the variables). Scheme allows you to capture this snapshot as a first-class function and mathematically jump back to it at any time. This allows developers to implement entirely new control flow mechanisms—like exceptions, generators, or coroutines—purely as library functions, without changing the core compiler.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Standard ML/index.mdx': `---
title: Standard ML
description: A mathematically rigorous, statically typed functional language famous for having a formally defined, mathematically proven specification.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Standard ML (SML)">

Standard ML is a general-purpose, modular, functional programming language with compile-time type checking and type inference. It is the grandfather of OCaml, F#, and heavily influenced Haskell.

## 1. The Mathematical Definition
What makes SML completely unique in computer science is *The Definition of Standard ML*. 
For most languages (like C or JavaScript), the language behavior is defined by its compiler or a loose English document. 
SML's behavior is defined entirely using mathematical **Operational Semantics**. Every single rule of the language (how types are evaluated, how memory is allocated) is mathematically proven as a theorem. This means that compiler writers have a mathematically infallible blueprint, guaranteeing that an SML program will execute identically across any compliant compiler on earth.

## 2. The Module System
SML introduced a highly advanced, mathematically sound Module system. 
Unlike Java packages, SML Modules (Structures) have Signatures (Interfaces). You can mathematically define "Functors," which are essentially functions that take a whole Module as an argument and return a brand new Module. This allows for an unprecedented level of mathematically safe code reuse and architecture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/ARM Assembly/index.mdx': `---
title: ARM Assembly
description: The specific, low-level machine instructions that mathematically power almost every smartphone and Apple Silicon device in the world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ARM Assembly">

ARM (Advanced RISC Machines) Assembly is the low-level language representing the exact CPU instructions of the ARM architecture. While x86 dominates desktop PCs, ARM mathematically dominates mobile phones, embedded systems (Raspberry Pi), and modern Apple MacBooks (M1/M2 chips).

## 1. The RISC Philosophy
ARM uses a **Reduced Instruction Set Computer (RISC)** architecture. 
In x86 (CISC), a single assembly instruction might mathematically load data from RAM, add a number to it, and store it back into RAM. 
In ARM, instructions are mathematically restricted. To do the same operation, you must:
1. TICK1LDRTICK1 (Load Register): Move data from RAM to the CPU.
2. TICK1ADDTICK1 : Add the numbers inside the CPU registers.
3. TICK1STRTICK1 (Store Register): Move data from the CPU back to RAM.
Because the instructions are so mathematically simple, the CPU die can be physically smaller, requiring significantly less electrical power, which is why ARM dominates battery-powered devices.

## 2. Registers and Execution
ARM provides a large, clean bank of 32-bit (or 64-bit in ARM64) registers (r0 through r15). 
Furthermore, classic ARM assembly includes **Conditional Execution**. Instead of writing complex Branch (if/else) instructions that disrupt the CPU pipeline, you can mathematically append conditions to any instruction. For example, TICK1ADDEQTICK1 means "Add these numbers, but *only* if the previous mathematical comparison was Equal." This vastly speeds up execution.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/Assembly/index.mdx': `---
title: Assembly
description: The absolute lowest level of human-readable programming, mapping directly to the physical voltage logic gates of a CPU.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Assembly Language">

Assembly is not a single language. It is a human-readable representation of the raw, mathematically binary Machine Code (1s and 0s) that a specific Central Processing Unit (CPU) executes. Every CPU architecture (x86, ARM, MIPS, RISC-V) has its own entirely different Assembly language.

## 1. Direct Hardware Control
When you write C or Rust, the compiler makes mathematical decisions about how to allocate memory. 
In Assembly, there is no compiler, only an "Assembler." You are mathematically writing the direct electrical instructions. 
TICK3asm
MOV EAX, 5  ; Move the number 5 into physical CPU register EAX
ADD EAX, 3  ; Add 3 to the physical CPU register EAX
TICK3
You must manually mathematically calculate RAM offsets, push arguments onto the call stack, and trigger hardware interrupts. There are no variables, no loops, and no functions—only raw memory addresses and physical CPU registers.

## 2. Why Humans Write It
Today, modern C/C++ compilers are mathematically superior to humans at optimizing general logic. However, Assembly is still written manually for:
- **Bootloaders**: Code that runs before the Operating System or RAM even exists.
- **Cryptography**: Hand-tuning encryption algorithms to mathematically exploit specific hardware vectors (SIMD/AVX instructions).
- **Reverse Engineering**: Decompiling malware to mathematically analyze exactly what the virus is doing to the processor.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/C/index.mdx': `---
title: C
description: The undisputed king of systems programming, created in 1972, serving as the mathematical foundation for almost all modern operating systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="C">

Created by Dennis Ritchie at Bell Labs in 1972 to write the Unix operating system, C is arguably the most important programming language ever created. It mathematically strikes the perfect balance between high-level human readability and low-level hardware control.

## 1. Pointers and Memory
C's legendary power (and danger) comes from **Pointers**. 
In Java or Python, the language mathematically hides physical memory from you. 
In C, a Pointer is a variable that stores the literal, physical, hexadecimal RAM address of another variable. 
TICK3c
int x = 10;
int *p = &x; // p mathematically holds the physical memory address of x
TICK3
You can mathematically add numbers to a pointer (Pointer Arithmetic) to manually iterate over physical memory chips. This allows C to be blazingly fast, as it entirely skips the overhead of array bounds checking or garbage collection. However, a single mathematical error in pointer arithmetic results in a Segmentation Fault, crashing the program instantly.

## 2. The Foundation of the World
C is the lingua franca of computer science.
- The Linux, Windows, and MacOS kernels are written in C.
- The Git version control system is written in C.
- The interpreters/compilers for Python (CPython), Ruby, PHP, and JavaScript (V8 engine) are written in C or C++.
Because C mathematically compiles down to tiny, highly efficient machine code without requiring a runtime environment, it remains the absolute standard for embedded systems, IoT devices, and operating systems.

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
