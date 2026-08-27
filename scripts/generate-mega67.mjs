import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Templates/index.mdx': `---
title: Templates (C++)
description: A highly advanced, Turing-complete metaprogramming feature in C++ that generates concrete code at compile-time based on type parameters.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Templates (C++)">

While Java and C# use Generics, C++ uses **Templates**. They look similar syntactically (TICK1template <typename T>TICK1), but mathematically and fundamentally, they are completely different mechanisms.

## 1. Compile-Time Code Generation
A Template is not a real function or class; it is a mathematical *blueprint* for the compiler.
When you write TICK1vector<int>TICK1, the C++ compiler reads the blueprint and physically writes a brand new, highly optimized class named TICK1vector_intTICK1 into your source code before compiling it. If you use TICK1vector<string>TICK1, it generates TICK1vector_stringTICK1. This process is called **Monomorphization**. It results in incredibly fast runtime performance because there is zero type-checking or casting at runtime, but it massively increases the size of the final compiled binary (Code Bloat).

## 2. Turing Completeness
Because C++ Templates can mathematically evaluate conditions (via SFINAE or Concepts) and recurse at compile-time, the Template system itself is **Turing Complete**. 
You can mathematically write a Template that calculates the 100th Fibonacci number. The C++ compiler will execute this logic *during compilation*, and the final binary will simply contain a hardcoded integer literal. The program will execute in 0 milliseconds, because all the mathematical computation occurred before the program even started.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Type erasure/index.mdx': `---
title: Type Erasure
description: A compiler technique where generic type information is mathematically verified during compilation but physically deleted before generating the final binary or bytecode.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Type Erasure">

Type Erasure is the architectural mechanism used by the Java Virtual Machine (JVM) and TypeScript to implement Generics without modifying the underlying runtime engine.

## 1. The Java Implementation
In Java, if you create a TICK1List<String>TICK1, the compiler rigorously checks your math to ensure you only put Strings in it. However, when compiling to TICK1.classTICK1 bytecode, the compiler performs **Type Erasure**. It physically deletes the TICK1<String>TICK1 metadata. 
At runtime, the JVM only sees a raw TICK1ListTICK1 of TICK1ObjectTICK1. When you call TICK1list.get(0)TICK1, the compiler has silently inserted a mathematical cast (TICK1(String) objTICK1) into the bytecode. 

## 2. Pros and Cons
- **Pros (Backward Compatibility)**: When Java added Generics in Java 5, they did not have to alter the JVM architecture at all. A TICK1List<String>TICK1 compiled exactly the same as a legacy TICK1ListTICK1 from Java 1.0, allowing old and new code to perfectly interoperate.
- **Cons (Runtime Blindness)**: Because the type is erased, you mathematically cannot ask the JVM TICK1if (list instanceof List<String>)TICK1 at runtime. The JVM has no idea; it only knows it is a TICK1ListTICK1. Furthermore, Type Erasure prevents you from mathematically instantiating a generic type directly (e.g., TICK1new T()TICK1 is impossible in Java because TICK1TTICK1 does not physically exist at runtime).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Type inference/index.mdx': `---
title: Type Inference
description: A compiler optimization where the language mathematically deduces the type of a variable automatically, removing the need for explicit declarations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Type Inference">

Historically, strongly typed languages required developers to mathematically declare every type explicitly (e.g., TICK1std::vector<int>::iterator it = vec.begin();TICK1). Type Inference allows the compiler to do the mathematical heavy lifting for you.

## 1. Local Variable Inference
Modern languages use keywords like TICK1varTICK1 (C#, Java), TICK1autoTICK1 (C++), or TICK1letTICK1 (Rust, Swift) for inference.
If you write TICK1let x = 5;TICK1 in Rust, you have not declared a type. But Rust is strictly Statically Typed. How does this work?
The compiler mathematically analyzes the Right-Hand Side (the R-value). It sees the literal TICK15TICK1. It deduces that TICK15TICK1 is an Integer. It then implicitly, mathematically binds the TICK1i32TICK1 type to TICK1xTICK1 at compile-time. The resulting binary is mathematically identical to if you had typed TICK1let x: i32 = 5;TICK1, maintaining absolute type safety with significantly less boilerplate.

## 2. Hindley-Milner Algorithm
Languages like Haskell and OCaml use the **Hindley-Milner Type System**, which is mathematically profound.
You can write an entire 10,000-line Haskell program without writing a single Type Declaration. The Hindley-Milner algorithm uses Unification to traverse the entire Abstract Syntax Tree, mathematically deducing the type of every single variable, function, and parameter based on how they are used. If a mathematical contradiction is found anywhere in the codebase, the compilation fails instantly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Union types/index.mdx': `---
title: Union Types
description: A mathematical type construct that allows a single variable or function to validly accept or return one of several distinct types.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Union Types">

A Union Type (often denoted as TICK1A | BTICK1) mathematically declares that a memory location can hold a value of Type A, OR a value of Type B, but not both simultaneously.

## 1. Untagged Unions (C/C++)
In C, a TICK1unionTICK1 mathematically overlays multiple variables onto the exact same physical memory block.
TICK3c
union Data {
    int i;
    float f;
};
TICK3
If you write to TICK1data.iTICK1, you are mathematically writing 4 bytes to RAM. If you immediately read TICK1data.fTICK1, the CPU reads those exact same 4 bytes but mathematically interprets the bits as an IEEE 754 float, resulting in garbage data. Untagged Unions are mathematically unsafe because the compiler does not track which type is currently occupying the memory.

## 2. Tagged Unions (TypeScript / Rust)
Modern languages use Tagged Unions (Sum Types). 
In TypeScript, if you declare TICK1let id: string | number;TICK1, you cannot mathematically call TICK1id.toUpperCase()TICK1. The compiler will block you because the value *might* be a number. You are mathematically forced to use **Type Narrowing**:
TICK1if (typeof id === "string") { id.toUpperCase(); }TICK1. 
The compiler mathematically tracks the control flow, realizes that inside the TICK1ifTICK1 block the value is guaranteed to be a string, and safely permits the method call.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Variance (covariance/index.mdx': `---
title: Variance (Covariance & Contravariance)
description: The advanced mathematical rules dictating how subtyping hierarchies apply to complex generic types like Lists, Arrays, and Functions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Variance">

Variance mathematically answers the question: "If a Cat is an Animal, is a List of Cats a List of Animals?" 

## 1. Covariance
Covariance mathematically preserves the inheritance direction.
If TICK1Cat <: AnimalTICK1 (Cat is a subtype of Animal), and a List is **Covariant**, then TICK1List<Cat> <: List<Animal>TICK1.
This is mathematically safe ONLY for Read-Only operations. If a function iterates over a TICK1List<Animal>TICK1 and prints their names, passing it a TICK1List<Cat>TICK1 is mathematically sound. 

## 2. Contravariance
Contravariance mathematically reverses the inheritance direction.
If a function accepts a callback TICK1Action<Cat>TICK1, you can safely pass it an TICK1Action<Animal>TICK1. 
Because the TICK1Action<Animal>TICK1 is mathematically designed to process *any* animal, it is guaranteed to be able to safely process the specific TICK1CatTICK1 that the function hands to it.

## 3. Invariance
Invariance means there is no mathematical relationship at all.
In Java, generic Lists are **Invariant**. TICK1List<Cat>TICK1 is mathematically completely unrelated to TICK1List<Animal>TICK1. You cannot pass one where the other is expected. This strict mathematical rule prevents the catastrophic Heap Corruption that would occur if you passed a Mutable TICK1List<Cat>TICK1 into a function expecting a TICK1List<Animal>TICK1, and that function executed TICK1list.add(new Dog())TICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/AOT compilation/index.mdx': `---
title: Ahead-Of-Time (AOT) Compilation
description: The process of mathematically translating high-level source code directly into native machine code before the program is ever executed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ahead-Of-Time (AOT) Compilation">

Ahead-Of-Time (AOT) compilation is the traditional mathematical process used by systems languages like C, C++, Rust, and Go. The compiler performs 100% of the translation work on the developer's machine, generating a final, executable binary containing raw CPU instructions.

## 1. Mathematical Advantages
- **Zero Startup Time**: Because the binary already contains raw assembly instructions, the OS simply loads it into RAM and points the CPU's Instruction Pointer at the entry point. The program mathematically executes instantly.
- **Aggressive Optimization**: Because the compiler is not racing against a running application, it can spend minutes (or hours) mathematically analyzing the Abstract Syntax Tree. It can inline functions, unroll loops, and eliminate dead code, generating mathematically perfect hardware instructions.
- **No Runtime Dependency**: The end-user does not need to install a JVM, Python Interpreter, or Node.js to run the program.

## 2. Mathematical Disadvantages
- **Platform Dependence**: An AOT compiler mathematically targets a specific CPU architecture (e.g., x86-64) and a specific Operating System (e.g., Windows). A binary compiled for Windows x86 will instantly crash on a Mac ARM processor. The developer must mathematically cross-compile and distribute multiple different binaries for different hardware.
- **No Runtime Profiling**: The compiler must guess which code paths will be hot. It cannot mathematically observe the program running and dynamically re-optimize the code on the fly (which JIT compilers can do).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Bytecode/index.mdx': `---
title: Bytecode
description: A mathematically portable, intermediate instruction set designed for efficient execution by a software-based Virtual Machine rather than physical hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bytecode">

Bytecode is the mathematical bridge between human-readable source code and machine-readable assembly code. It was popularized by Java and is used extensively by C#, Python, and WebAssembly.

## 1. The Virtual Machine Architecture
When you compile Java code, the compiler does not generate Intel x86 or ARM assembly instructions. It mathematically generates **Bytecode**—instructions for a fake, idealized CPU (The Java Virtual Machine).
Because the Bytecode is mathematically standardized, a TICK1.classTICK1 file is universally portable. You can compile it once on a Windows machine, email it to a Mac, and the Mac's JVM will mathematically translate the Bytecode into Mac-specific machine code on the fly. "Write Once, Run Anywhere."

## 2. Mathematical Efficiency
Why use Bytecode instead of just distributing the raw text Source Code (like JavaScript)?
Source code requires massive mathematical overhead to parse. The runtime must lex the text, build an Abstract Syntax Tree, and perform semantic analysis before it can execute anything. 
Bytecode is already mathematically parsed and compacted. It consists of highly efficient numerical opcodes (e.g., TICK10x60TICK1 for addition). A Virtual Machine can read and execute Bytecode exponentially faster than an interpreter can read text.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Compilation/index.mdx': `---
title: Compilation
description: The highly complex mathematical pipeline that transforms human-readable text into optimized, executable hardware instructions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Compilation">

Compilation is not a single mathematical action; it is a multi-stage pipeline designed to strip away abstraction until only raw physics (machine code) remains.

## 1. The Front-End (Analysis)
The Front-End mathematically understands the code.
- **Lexical Analysis (Scanner)**: Breaks the raw string of text into mathematically distinct Tokens (Keywords, Identifiers, Operators).
- **Syntax Analysis (Parser)**: Analyzes the Tokens against the language's grammar rules to build an **Abstract Syntax Tree (AST)**.
- **Semantic Analysis (Type Checker)**: Traverses the AST to mathematically prove that the logic makes sense (e.g., ensuring you are not multiplying a String by a Boolean).

## 2. The Back-End (Synthesis)
The Back-End mathematically generates the hardware instructions.
- **Intermediate Representation (IR)**: The AST is converted into a lower-level mathematical format (like LLVM IR). This allows the compiler to perform massive optimizations (dead code elimination, loop unrolling) independent of the target CPU.
- **Code Generation**: The optimized IR is mathematically translated into specific Assembly instructions for the target CPU architecture (e.g., x86 or ARM).
- **Linking**: The separate compiled object files are mathematically stitched together, resolving memory addresses for external libraries (like TICK1printfTICK1) into a single final executable binary.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/generational/index.mdx': `---
title: Generational Garbage Collection
description: A highly optimized memory management strategy based on the mathematical hypothesis that most objects die extremely young.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Generational Garbage Collection">

A standard Mark-and-Sweep Garbage Collector must mathematically pause the entire application, scan every single object in RAM, and delete the unused ones. As RAM sizes grew to gigabytes, these "Stop-the-World" pauses became unacceptably long. Generational GC mathematically solves this.

## 1. The Generational Hypothesis
Computer Scientists observed a strict mathematical pattern in almost all software: **The Infant Mortality Rate of objects is extremely high.** 
If an object survives its initial creation (e.g., a local variable inside a function), it will likely live for the entire duration of the application (e.g., a Database Connection pool). 
Therefore, mathematically scanning the Database Connection pool every 50 milliseconds is a massive waste of CPU cycles.

## 2. The Segregated Heap
A Generational GC mathematically splits the Heap into distinct zones:
- **The Nursery (Young Generation)**: All new objects are allocated here. When the Nursery fills up, a "Minor GC" occurs. It only scans this tiny mathematical segment. It instantly deletes the 95% of objects that died, and mathematically promotes the 5% that survived into the older generation.
- **The Old Generation (Tenured)**: Objects that have survived multiple Minor GCs live here. The GC rarely scans this massive mathematical area (a "Major GC"), drastically reducing the CPU overhead and eliminating noticeable application pauses.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Immutability/index.mdx': `---
title: Immutability
description: The mathematical guarantee that once a block of memory is initialized with data, it can never be altered for the entire lifespan of the program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Immutability">

In imperative programming (C, Java), variables are mutable by default. You can mathematically alter the bytes in a memory address at any time. In Functional programming (Haskell, Elixir, Rust), variables are Immutable by default.

## 1. Thread Safety (Zero Locks)
The most profound mathematical advantage of Immutability is Concurrency.
If 10 different CPU threads are trying to read and write to the same mutable Array, you must mathematically protect the Array with **Mutex Locks** to prevent data corruption. Locks are mathematically expensive and cause Deadlocks.
If the Array is Immutable, no thread can ever change it. Therefore, 10,000 threads can mathematically read the exact same memory address simultaneously without a single Lock, allowing software to scale infinitely across CPU cores.

## 2. Structural Sharing
If a variable is Immutable, how do you mathematically update a list? You create a brand new list.
Isn't copying entire massive lists incredibly inefficient? Yes. That is why Immutable languages use **Persistent Data Structures** (Tries).
When you append an item to an Immutable List, the engine does not copy the original data. It mathematically creates a new root node that physically points to the exact same memory addresses as the old list, plus the new item. Because the old data is mathematically guaranteed to never change, both lists can safely share the underlying physical RAM (Structural Sharing), making Immutability both fast and memory-efficient.

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
