import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/tracing)/index.mdx': `---
title: Tracing Garbage Collection
description: An automated memory management strategy that mathematically traverses the entire graph of objects in memory to find and delete unreferenced data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tracing Garbage Collection">

Tracing Garbage Collection is the primary memory management model used by the JVM (Java), V8 (JavaScript), and the CLR (C#). It completely decouples memory management from the developer's code.

## 1. The Mark-and-Sweep Algorithm
The foundational mathematical algorithm for a Tracing GC is Mark-and-Sweep.
1. **The Roots**: The GC identifies the "Roots" (all active variables on the CPU Stack, and all Global static variables).
2. **Mark Phase**: The GC mathematically traverses every pointer originating from the Roots, walking the massive graph of objects in the Heap. Every object it physically reaches is "Marked" as Alive.
3. **Sweep Phase**: The GC scans the entire Heap linearly. Any object that was *not* marked during the traversal is mathematically proven to be unreachable by the program. The GC deletes it and returns the RAM to the OS.

## 2. Stop-The-World Pauses
Because the program is constantly creating and deleting pointers, the GC cannot accurately trace the graph while the program is running. 
To mathematically guarantee it doesn't accidentally delete an object that is currently in use, the GC issues a **Stop-The-World (STW)** command. It physically suspends every single CPU thread running your application. It performs the Mark-and-Sweep, and then resumes the threads. If the Heap is massive (e.g., 50 Gigabytes), this STW pause can last for several seconds, causing massive latency spikes in real-time applications (like video games or trading platforms).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Value vs reference semantics/index.mdx': `---
title: Value vs. Reference Semantics
description: The fundamental mathematical rules governing whether a variable assignment physically copies data, or simply points to existing data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Value vs. Reference Semantics">

When you assign one variable to another (TICK1let a = bTICK1), the compiler must make a mathematical decision: does it copy the bits, or does it copy the address?

## 1. Value Semantics (Deep Copy)
Value semantics mathematically dictate that every variable is a completely independent island of memory.
If TICK1bTICK1 is an Integer (Primitive), and you write TICK1let a = bTICK1, the CPU physically clones the 4 bytes of TICK1bTICK1 and writes them into a brand new memory slot for TICK1aTICK1. If you mathematically change TICK1a = 10TICK1, TICK1bTICK1 is completely unaffected. In C++, even massive Structs follow Value Semantics by default. If you assign a 1-Megabyte Struct to a new variable, the CPU physically halts and copies 1,000,000 bytes in RAM.

## 2. Reference Semantics (Pointer Copy)
Reference semantics mathematically dictate that variables share the underlying data.
In Java or JavaScript, if TICK1bTICK1 is an Object (Composite Type), TICK1bTICK1 is mathematically just a 64-bit Pointer to the Heap. When you write TICK1let a = bTICK1, the CPU does *not* copy the massive Object. It only copies the 64-bit Pointer. Now, TICK1aTICK1 and TICK1bTICK1 mathematically point to the exact same physical bytes in the Heap. If you mutate TICK1a.name = "John"TICK1, TICK1b.nameTICK1 instantly changes to "John" as well, because there is only one actual Object in memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/Circular dependency handling/index.mdx': `---
title: Circular Dependency Handling
description: The mathematical strategies compilers use to resolve architectures where Module A requires Module B, but Module B simultaneously requires Module A.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Circular Dependencies">

A Circular Dependency is an architectural paradox. If File A mathematically imports File B, the compiler must parse B first. But if File B imports File A, the compiler enters an infinite loop, resulting in a mathematical contradiction and a compilation failure.

## 1. Forward Declarations (C/C++)
In C++, circular dependencies between Header files are common and deadly. 
The mathematical solution is a **Forward Declaration** (TICK1class B;TICK1). You mathematically promise the compiler, "Class B exists somewhere, I promise. Just give me a Pointer to it for now." 
Because all pointers are mathematically the exact same size (8 bytes on a 64-bit system), the compiler can calculate the memory layout of Class A without needing to parse the massive details of Class B, breaking the infinite cycle.

## 2. Interface Segregation and Dependency Inversion
In modern high-level languages (Java, C#), circular dependencies usually indicate a mathematical flaw in the software architecture.
The solution is **Dependency Inversion** (The 'D' in SOLID). Instead of Class A depending directly on Class B, you create an abstract Interface TICK1ITICK1. Both Class A and Class B depend on TICK1ITICK1. Because neither depends directly on the other, the mathematical cycle is broken, and the compiler can parse them completely independently.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/dynamic)/index.mdx': `---
title: Dynamic Linking
description: A modularity technique where external libraries are mathematically mapped into a program's memory space at runtime, rather than being hardcoded into the executable.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dynamic Linking">

When a program uses an external library (like OpenGL), the compiler does not have to physically embed the library's machine code inside your final binary. It can use Dynamic Linking.

## 1. Shared Libraries (.dll / .so)
A Dynamic Library (TICK1.dllTICK1 on Windows, TICK1.soTICK1 on Linux) is a compiled binary containing functions that sit independently on the hard drive.
When you compile your program dynamically, the compiler leaves mathematical "stubs" inside your binary. It essentially writes: "When the program reaches this point, ask the Operating System to find TICK1opengl32.dllTICK1, load it into RAM, and jump to its memory address."

## 2. Memory De-duplication
Dynamic Linking provides massive mathematical efficiency at the OS level.
If 50 different applications on your computer all use the standard C library (TICK1libcTICK1), Static Linking would physically embed 50 copies of TICK1libcTICK1 in your RAM, wasting gigabytes of space. 
With Dynamic Linking, the OS loads TICK1libc.soTICK1 into physical RAM exactly once. It then mathematically maps that single physical memory address into the Virtual Memory space of all 50 running applications simultaneously, saving massive amounts of physical RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/Header files/index.mdx': `---
title: Header Files
description: The legacy modularity system used by C and C++, mathematically separating the declaration of a function from its physical implementation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Header Files">

In C and C++, a module is split into two physical text files: The Header file (TICK1.hTICK1) and the Implementation file (TICK1.c / .cppTICK1).

## 1. The Preprocessor and #include
Unlike modern languages that use mathematically intelligent TICK1importTICK1 statements, C relies on the Preprocessor.
When you write TICK1#include "math.h"TICK1, the Preprocessor physically opens TICK1math.hTICK1, copies all of the raw text inside it, and literally pastes it into your source file before handing it to the compiler. It is a completely blind, text-based copy-paste operation.

## 2. Declarations vs Definitions
The Header file mathematically contains **Declarations** (the Function Signatures). It tells the compiler, "A function named TICK1calculate()TICK1 exists somewhere, and it takes an integer." This gives the compiler enough mathematical information to type-check your code.
The TICK1.cppTICK1 file contains the **Definition** (the actual logic). 
Because of this separation, if a project has 10,000 files that TICK1#include "math.h"TICK1, the compiler has to physically parse the exact same text 10,000 times, making C++ compilation mathematically exponentially slower than modern languages that use pre-compiled Modules.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/Imports-exports/index.mdx': `---
title: Imports and Exports
description: The mathematical syntax and mechanism used by modern languages to securely expose and consume encapsulated code across file boundaries.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Imports and Exports">

Modern languages (JavaScript ES6, Python, Rust) abandon text-based Header files in favor of mathematically strict Import/Export systems.

## 1. The Export Boundary (Encapsulation)
By default, every variable and function in a modern file is mathematically private to that file. 
If you write TICK1function calculate() {}TICK1 in TICK1math.jsTICK1, it is completely invisible to the rest of the application. You must explicitly tag it with the TICK1exportTICK1 keyword. This forces developers to intentionally design a strict, mathematically limited public API for their module, preventing other files from relying on internal, private state.

## 2. Tree Shaking
Because TICK1importTICK1 statements are mathematically analyzable (unlike dynamic TICK1require()TICK1 calls or C-style TICK1#includeTICK1s), modern compilers (like Webpack or Rollup) can perform **Tree Shaking**.
If TICK1math.jsTICK1 exports 100 functions, but your file only writes TICK1import { add } from './math'TICK1, the compiler's Abstract Syntax Tree can mathematically prove that the other 99 functions are never used anywhere in the entire application. When it generates the final binary or JavaScript bundle, it mathematically deletes the dead code, drastically reducing the file size.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/Linking (static/index.mdx': `---
title: Static Linking
description: A modularity technique where the compiler physically extracts external machine code and permanently welds it into the application's final binary.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Static Linking">

Static Linking is the mathematical opposite of Dynamic Linking. Instead of relying on the Operating System to find libraries at runtime, the compiler physically embeds everything into a single, massive executable file.

## 1. The Linker's Job
After the C or Go compiler converts your source files into TICK1.oTICK1 (Object) files, the **Linker** takes over. 
The Linker is a highly complex mathematical tool. It looks at your Object files, sees that you called TICK1printfTICK1, and realizes TICK1printfTICK1 is missing. It then physically opens the standard TICK1libc.aTICK1 static archive, mathematically extracts the exact machine-code instructions for TICK1printfTICK1, and welds them directly into your final TICK1.exeTICK1 binary, calculating and updating all the physical memory jump addresses.

## 2. The Deployment Advantage
Static Linking is incredibly popular in modern cloud architecture (notably with the Go programming language).
Because a Statically Linked binary contains every single byte of machine code it will ever need, it has absolutely zero mathematical dependencies on the Operating System. You can drop a statically linked Go binary onto a bare-metal Linux server that doesn't even have a standard library installed, and it will execute flawlessly. This mathematically eliminates "Dependency Hell" (where an app crashes because the server has the wrong version of a TICK1.dllTICK1).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/Modules/index.mdx': `---
title: Modules
description: The modern architectural paradigm for mathematically grouping related code, data, and interfaces into a single, cohesive, pre-compiled unit.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Modules">

A Module is a mathematical step up from a simple File. It is a cohesive unit of software that explicitly defines what dependencies it requires (Imports) and exactly what API it provides to the outside world (Exports).

## 1. C++20 Modules vs Legacy Headers
For 40 years, C++ suffered from slow compilation due to Header files. C++20 introduced true **Modules**.
When a C++20 Module is compiled, the compiler does not generate raw text. It generates a highly compacted, mathematically optimized Binary representation of the Abstract Syntax Tree (the TICK1.pcmTICK1 file). 
When another file TICK1importTICK1s that module, the compiler simply loads the binary AST directly into memory. It does not have to parse text, mathematically eliminating the exponential compile-time explosion caused by TICK1#includeTICK1.

## 2. Namespace Encapsulation
Modules inherently provide mathematical isolation.
In legacy systems, if File A defines a global function TICK1init()TICK1, and File B defines a global function TICK1init()TICK1, linking them together causes a catastrophic mathematical collision (Multiple Definition Error).
In a Module system, the functions are mathematically bound to the Module's internal scope. They are invoked as TICK1ModuleA.init()TICK1, preventing global namespace pollution.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/Namespaces/index.mdx': `---
title: Namespaces
description: A declarative, mathematical scoping mechanism used to organize code hierarchically and prevent catastrophic naming collisions in massive codebases.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Namespaces">

In a codebase with 10 million lines of code, it is mathematically guaranteed that two different engineers will name a class TICK1LoggerTICK1. If the compiler tries to link both classes, it encounters a mathematical contradiction (Symbol Collision) and halts. Namespaces solve this.

## 1. The Lexical Prefix
A Namespace is simply a mathematical prefix applied to a symbol's name by the compiler.
If you declare TICK1class LoggerTICK1 inside TICK1namespace NetworkTICK1, and another TICK1class LoggerTICK1 inside TICK1namespace DatabaseTICK1, the compiler mathematically changes their physical names in the compiled binary.
They become TICK1Network::LoggerTICK1 and TICK1Database::LoggerTICK1. Because the mathematical strings no longer match, the collision is instantly resolved.

## 2. Java Packages as Namespaces
In Java, Namespaces are implemented via the TICK1packageTICK1 system, which mathematically mandates that the logical namespace matches the physical folder structure on the hard drive (e.g., TICK1com.google.network.LoggerTICK1 must live in the TICK1com/google/network/TICK1 directory). This enforces strict mathematical consistency between the logical software architecture and the physical file system.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/Packages/index.mdx': `---
title: Packages
description: The highest level of modularity, mathematically bundling multiple modules, configuration files, and metadata into a distributable unit.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Packages">

While a Module represents a single cohesive unit of code, a Package is a distributable artifact. It is mathematically designed to be downloaded, versioned, and consumed by thousands of other projects.

## 1. Package Managers and Resolution
A Package is managed by a Package Manager (NPM, Cargo, Maven).
The Package Manager's primary job is mathematical **Dependency Resolution**. 
If Package A requires Package C (v1.0), and Package B requires Package C (v2.0), the Package Manager must use complex mathematical graph algorithms (like SAT Solvers) to determine if a compatible version tree exists. In NPM (Node.js), the manager resolves this by mathematically isolating the dependencies in nested TICK1node_modulesTICK1 folders, allowing v1.0 and v2.0 to physically coexist in RAM simultaneously.

## 2. Semantic Versioning (SemVer)
Packages rely on a strict mathematical contract called Semantic Versioning (e.g., TICK1MAJOR.MINOR.PATCHTICK1).
- **PATCH (1.0.1)**: Mathematically guarantees the API has not changed; only internal bugs were fixed.
- **MINOR (1.1.0)**: Mathematically guarantees no existing APIs were broken, but new features were added.
- **MAJOR (2.0.0)**: Mathematically warns that the API has been violently altered, and upgrading will cause compile errors.

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
