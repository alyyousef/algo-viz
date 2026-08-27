import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/C++/index.mdx': `---
title: C++
description: The immensely powerful, complex, multi-paradigm successor to C, dominating high-performance applications like game engines and high-frequency trading.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="C++">

Created by Bjarne Stroustrup in 1979 as "C with Classes," C++ is one of the most widely used and most complex programming languages in the world. Its core mathematical philosophy is **Zero-Overhead Abstractions**: you can write high-level, elegant code, and the compiler mathematically guarantees it runs just as fast as hand-written C.

## 1. Multi-Paradigm Power
While C is strictly procedural, C++ allows you to mix and match paradigms mathematically:
- **Procedural**: You can write pure C code in C++.
- **Object-Oriented**: It supports full inheritance, polymorphism, and virtual functions.
- **Generic Programming**: Using **Templates**, you can mathematically instruct the compiler to generate heavily optimized code for different types at compile time, eliminating runtime overhead.

## 2. Manual Memory Management (RAII)
Unlike Java (which uses a Garbage Collector) or Rust (which uses a Borrow Checker), C++ assumes the programmer is mathematically infallible. 
You must manually allocate (TICK1newTICK1) and deallocate (TICK1deleteTICK1) memory. However, modern C++ (C++11 and later) heavily relies on **RAII (Resource Acquisition Is Initialization)** and Smart Pointers (TICK1std::unique_ptrTICK1). RAII mathematically binds the lifespan of physical memory to the scope of a stack variable. When the variable goes out of scope, the destructor is mathematically guaranteed to run, automatically freeing the memory and preventing leaks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/Carbon/index.mdx': `---
title: Carbon
description: An experimental systems programming language developed by Google, explicitly designed as the experimental successor to C++.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Carbon">

Announced by Google in 2022, Carbon is an experimental systems programming language. While Rust is often viewed as the successor to C++, migrating a massive, 30-year-old C++ codebase to Rust is mathematically impossible due to the completely different memory models (Borrow Checker vs Pointers). Carbon is designed specifically for **bi-directional interoperability** with C++.

## 1. Seamless C++ Interop
Unlike Rust, where calling C++ code requires complex FFI (Foreign Function Interface) bindings, Carbon mathematically understands C++. 
You can write a Carbon file, TICK1#includeTICK1 a C++ header, and instantiate a C++ object directly in Carbon syntax. You can also write a C++ file, include a Carbon header, and call Carbon functions. This allows massive tech companies (like Google) to mathematically migrate millions of lines of code file-by-file without ever stopping production.

## 2. Fixing C++ Debt
Carbon mathematically abandons 40 years of C/C++ technical debt. It removes archaic header files, replaces them with a modern module system, introduces a much safer macro system, and defaults to memory-safe patterns while still allowing raw, unchecked pointers when maximum performance is required.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/D/index.mdx': `---
title: D
description: A systems programming language that attempted to combine C++ performance with the developer productivity of Ruby or Python.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="D">

Created by Walter Bright and Andrei Alexandrescu in 2001, D was the original attempt to build a "Better C++" before Rust, Go, or Carbon existed. 

## 1. The Best of Both Worlds
D mathematically compiles down to native machine code and allows direct, low-level pointer manipulation exactly like C++.
However, it also introduced features unheard of in systems languages at the time:
- A built-in Garbage Collector (which can be mathematically disabled for critical loops).
- First-class arrays and associative arrays (Hash Maps) built directly into the syntax.
- Extremely fast compile times (compiling D code is often 10x faster than compiling heavily templated C++ code).

## 2. Compile-Time Function Execution (CTFE)
D pioneered CTFE. In D, you can write a standard function (e.g., parsing a complex regex string into a mathematical state machine) and instruct the compiler to execute that function *during compilation*. 
The compiler runs the math, calculates the final state machine, and physically hardcodes the result into the binary executable, mathematically guaranteeing zero execution time for that logic when the user runs the program.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/RISC-V Assembly/index.mdx': `---
title: RISC-V Assembly
description: The open-source, royalty-free Instruction Set Architecture that is rapidly disrupting the global semiconductor industry.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RISC-V Assembly">

Unlike x86 (owned by Intel/AMD) or ARM (owned by ARM Holdings, requiring massive licensing fees), RISC-V (pronounced "Risk-Five") is an **open standard** Instruction Set Architecture (ISA). Any company or university can mathematically design and manufacture a RISC-V CPU without paying a cent in royalties.

## 1. The Modular Architecture
RISC-V is mathematically designed to be modular.
The base integer instruction set (RV32I) is incredibly tiny, containing less than 50 mathematical instructions (like TICK1addTICK1, TICK1subTICK1, TICK1lwTICK1, TICK1swTICK1). This base set is enough to build a fully functional, Turing-complete CPU for a microwave or a smartwatch.
If you need more power, you mathematically bolt on extensions:
- **M**: Integer Multiplication and Division.
- **A**: Atomic instructions for concurrency.
- **F**: Single-precision floating-point math.
A full Linux-capable desktop CPU is just the base set plus specific mathematical extensions (often abbreviated as RV64GC).

## 2. The Assembly Syntax
RISC-V assembly is arguably the cleanest and most mathematically logical assembly language currently in use, heavily influenced by MIPS. It uses 32 standard registers (x0 to x31), where x0 is mathematically hardwired to the constant 0 (a brilliant architectural decision that removes the need for specific "Clear" or "Move Zero" instructions).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/Rust/index.mdx': `---
title: Rust
description: The revolutionary systems language that mathematically guarantees memory safety and thread safety without a garbage collector.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rust">

Created by Graydon Hoare at Mozilla in 2010, Rust has fundamentally altered the trajectory of systems programming. It is the first language in history to offer the raw, bare-metal speed of C++ while mathematically guaranteeing that your program cannot have memory leaks, use-after-free bugs, or data races.

## 1. The Borrow Checker
Rust achieves memory safety through a mathematical concept called **Ownership**.
- Every piece of memory has exactly one "owner" variable.
- When the owner goes out of scope, the memory is instantly freed (no Garbage Collector).
- You can "borrow" access to that memory using References (TICK1&TICK1).

The compiler's **Borrow Checker** mathematically analyzes your code at compile time. It enforces a strict rule: You can have *many* read-only references to a piece of data, OR *exactly one* mutable (writeable) reference, but never both at the same time. If your code breaks this mathematical law, it will not compile.

## 2. Fearless Concurrency
Because the Borrow Checker mathematically prevents multiple threads from mutating the same data simultaneously, Data Races (the hardest bugs in computer science to fix) are physically impossible to write in safe Rust. This allows developers to write massively concurrent, multi-threaded servers with total confidence.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/x86 Assembly/index.mdx': `---
title: x86 Assembly
description: The foundational 32-bit assembly language that dominated the personal computer revolution for decades.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="x86 Assembly">

The x86 architecture (originating with the Intel 8086 in 1978) is a **Complex Instruction Set Computer (CISC)** architecture. It mathematically defines the electrical instructions for the vast majority of desktop and laptop processors (excluding modern Apple Silicon).

## 1. The CISC Philosophy
Unlike ARM or RISC-V (which use small, simple instructions), x86 is mathematically dense. 
A single x86 instruction can mathematically load a value from a complex RAM address, add a number to it, and store it back into RAM in one step. 
Because the instruction set has grown organically over 40 years, it contains thousands of highly specialized mathematical instructions, making it incredibly difficult for a human to master, but allowing modern compilers to generate brutally fast execution paths.

## 2. The Register Starvation Problem
The greatest mathematical weakness of 32-bit x86 was its severe lack of registers. It only had 8 general-purpose registers (EAX, EBX, ECX, EDX, ESI, EDI, EBP, ESP). 
Because the CPU had so few places to store temporary variables internally, it constantly had to mathematically "spill" data out to the slow physical RAM (the stack) and read it back, creating a massive performance bottleneck for complex algorithms.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/x86-64 Assembly/index.mdx': `---
title: x86-64 Assembly
description: The 64-bit extension of x86 (created by AMD), resolving the severe memory and register limitations of the 32-bit era.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="x86-64 Assembly">

In the early 2000s, computers were mathematically hitting the 4GB RAM limit of 32-bit addressing. Intel attempted to force the industry to a completely new architecture (Itanium), but AMD created **x86-64** (or AMD64)—a brilliant mathematical extension of the original x86 instruction set that provided 64-bit addressing while maintaining 100% backward compatibility with 32-bit software.

## 1. Expanding the Architecture
x86-64 mathematically fixed the two biggest problems with x86:
1. **Memory Addressing**: The CPU registers were expanded from 32 bits to 64 bits (EAX became RAX), allowing the CPU to mathematically address up to 16 Exabytes of physical RAM.
2. **Register Count**: AMD doubled the number of general-purpose registers from 8 to 16 (adding R8 through R15). This drastically reduced memory spilling, instantly making all compiled software run faster.

## 2. The Calling Convention
In 32-bit x86, when you called a function, you had to mathematically push all arguments onto the slow RAM stack. 
Because x86-64 has 16 registers, the standard calling convention was mathematically rewritten (System V AMD64 ABI). Now, the first 6 arguments to a function are passed entirely through the lightning-fast CPU registers (RDI, RSI, RDX, RCX, R8, R9), massively accelerating function call overhead across the entire operating system.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.3 Systems - Low-Level/Zig/index.mdx': `---
title: Zig
description: A brilliant, modern, memory-safe replacement for C that abandons hidden control flow and macros for pure, compile-time execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zig">

Created by Andrew Kelley in 2015, Zig is a low-level systems programming language designed to replace C. While Rust focuses on mathematical safety via the Borrow Checker, Zig focuses on absolute mathematical clarity, manual memory management, and cross-compilation perfection.

## 1. No Hidden Control Flow
In C++, a simple mathematical statement like TICK1a = b + cTICK1 might secretly invoke a massive operator overload function that allocates memory and throws exceptions.
In Zig, there is **zero hidden control flow**. There are no exceptions, no operator overloading, and no hidden memory allocations. If memory needs to be allocated, you must mathematically pass an Allocator object into the function. This makes reading a Zig codebase incredibly predictable; what you see is exactly what the CPU executes.

## 2. Comptime
Zig mathematically abandons the concept of Macros. Instead, it introduced **Comptime**.
If you want to write a Generic function (e.g., an array that can hold Ints or Strings), you just write a normal Zig function that takes a Type as an argument, and you tag it with the TICK1comptimeTICK1 keyword. 
The Zig compiler executes this standard logic *during compilation*, calculating the types and generating the specific binary code. You use the exact same mathematical syntax for runtime logic as you do for compile-time metaprogramming.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.4 Scientific - Numerical/Fortran/index.mdx': `---
title: Fortran
description: The oldest high-level programming language in existence, remaining the undisputed king of high-performance supercomputing and physics simulations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fortran">

Created by John Backus at IBM in 1957, Fortran (Formula Translation) was the very first high-level programming language. Astonishingly, nearly 70 years later, it remains the most mathematically efficient language in the world for complex array mathematics and physics simulations.

## 1. The Mathematical Compiler
Why is Fortran still faster than C++ at math? 
In C, pointers can "alias" (two pointers might point to the exact same memory address). Because of this mathematical uncertainty, a C compiler cannot always aggressively optimize array loops using CPU vectorization (SIMD).
Fortran mathematically assumes that all array inputs to a function are completely independent in memory (No Aliasing). Because the compiler knows this mathematical truth, it can automatically reorganize and vectorize millions of floating-point calculations across CPU cores with a level of efficiency that C and C++ compilers can only dream of.

## 2. Modern Supercomputing
Modern Fortran (Fortran 2003/2008/2018) is not the archaic ALL-CAPS punchcard language of the 1960s. It supports Object-Oriented programming, strict typing, and native mathematical abstractions for multidimensional arrays. It is the language currently running the most complex climate simulations, fluid dynamics, and nuclear physics models on the world's fastest supercomputers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.4 Scientific - Numerical/Julia/index.mdx': `---
title: Julia
description: A modern, dynamic language designed specifically for data science and numerical computing, solving the "Two-Language Problem".
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Julia">

Created in 2012 at MIT, Julia is a high-level, dynamic programming language explicitly designed to solve the "Two-Language Problem" in scientific computing and Machine Learning.

## 1. The Two-Language Problem
Historically, scientists write their mathematical models in a slow, dynamic language (like Python or R) because it is easy to test. When the model is finished, it is mathematically too slow to run on a massive dataset, so software engineers must rewrite the logic in a fast, compiled language (C or C++). 
Julia mathematically solves this. It reads and writes like Python, but it uses a Just-In-Time (JIT) LLVM compiler. When you run a Julia script, it mathematically infers the types on the fly and compiles the code directly to highly optimized native machine code, running just as fast as C.

## 2. Multiple Dispatch
Julia's core mathematical paradigm is **Multiple Dispatch**. 
In Object-Oriented programming (Single Dispatch), if you call TICK1x.collide(y)TICK1, the compiler only looks at the type of TICK1xTICK1 to figure out which code to run.
In Julia, you define a function TICK1collide(x, y)TICK1. The compiler mathematically looks at the specific types of *all* arguments (e.g., if x is a Circle and y is a Rectangle). It then instantly dispatches execution to the most highly optimized, specific version of that function, allowing incredible mathematical abstractions without runtime overhead.

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
