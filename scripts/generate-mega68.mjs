import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Interpretation/index.mdx': `---
title: Interpretation
description: The mathematical process of executing source code line-by-line in real-time, without pre-compiling it into native machine code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Interpretation">

In an Interpreted language (like standard Python or Ruby), the source code is not mathematically transformed into a binary executable beforehand. The Interpreter is a massive C program that mathematically reads the script while the program is running and executes the corresponding hardware instructions on the fly.

## 1. The Mathematical Execution Loop
The Interpreter runs a massive infinite TICK1whileTICK1 loop:
1. **Read**: It reads the next line of text from the source file.
2. **Lex/Parse**: It mathematically converts that line of text into a mini Abstract Syntax Tree.
3. **Execute**: It evaluates the AST, performs the mathematical operations, updates its own internal memory dictionaries (simulating the program's variables), and then moves to the next line.

## 2. The Performance Penalty
Because the Interpreter must perform Lexing, Parsing, and Type Checking inside the main execution loop for *every single line of code, every single time it runs*, Interpreted languages are mathematically exponentially slower than Compiled languages. If a TICK1forTICK1 loop runs 10,000 times, a compiler parses the code once. An Interpreter mathematically parses the exact same line of text 10,000 times in a row, wasting billions of CPU cycles.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/JIT compilation/index.mdx': `---
title: Just-In-Time (JIT) Compilation
description: A hybrid execution model that mathematically observes interpreted code running and dynamically compiles "hot" paths into native machine code on the fly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Just-In-Time (JIT) Compilation">

JIT Compilation is the mathematical engine behind the V8 JavaScript Engine and the Java Virtual Machine. It attempts to mathematically combine the portability of Interpretation with the raw speed of AOT Compilation.

## 1. The Tiered Execution Model
When a JavaScript program starts, the V8 engine does not compile it. It runs it through a fast Interpreter (Ignition) so the program starts instantly.
As the program runs, a Profiler mathematically tracks which functions are called the most (the "Hot" paths). 
If a TICK1forTICK1 loop runs 50,000 times, the JIT Compiler (TurboFan) mathematically intervenes in the background. It takes the Bytecode for that loop, compiles it down to highly optimized Native Machine Code, and physically hot-swaps the memory pointer. The 50,001st iteration of the loop executes at bare-metal C++ speed.

## 2. Deoptimization
Because JavaScript is dynamically typed, the JIT Compiler has to make mathematical assumptions. It assumes, "This loop has only ever seen Integers, so I will compile it to native Integer addition."
If, on the 60,000th iteration, you suddenly pass a String into that loop, the compiled Machine Code mathematically fails. The V8 Engine instantly performs a **Deoptimization (Bailout)**. It throws away the compiled Machine Code and mathematically falls back to the slow Interpreter to safely handle the String addition.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Lifetimes/index.mdx': `---
title: Lifetimes
description: The strict mathematical rules defining the exact duration that a specific piece of data is guaranteed to exist safely in memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lifetimes">

In memory management, a Lifetime is the mathematical duration between the exact CPU cycle a memory block is Allocated, and the exact CPU cycle it is Deallocated (freed).

## 1. Stack Lifetimes
Variables allocated on the Stack have mathematically deterministic lifetimes. 
When the CPU enters a function, it pushes a Stack Frame (Allocation). When the CPU hits the TICK1returnTICK1 statement, it pops the Stack Frame (Deallocation). The Lifetime of all local variables is strictly mathematically bound to the duration of that function call.

## 2. Heap Lifetimes and Rust
Variables allocated on the Heap do not have deterministic lifetimes; they live until they are manually freed. If you free them too early and try to read them, you mathematically cause a Use-After-Free crash.
Rust mathematically solved this by introducing **Explicit Lifetimes** into the compiler syntax (e.g., TICK1<'a>TICK1). The Rust compiler's Borrow Checker mathematically analyzes the Abstract Syntax Tree and proves that no Pointer can ever outlive the data it points to. It mathematically refuses to compile the code if there is even a theoretical possibility of a Lifetime mismatch, guaranteeing 100% memory safety without a Garbage Collector.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Memory management (manual/index.mdx': `---
title: Manual Memory Management
description: An execution model where the developer is mathematically responsible for explicitly requesting RAM from the OS and explicitly returning it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Manual Memory Management">

In languages like C and C++, there is no Garbage Collector. The developer must manually interact with the Operating System's memory allocator using functions like TICK1malloc()TICK1 and TICK1free()TICK1.

## 1. The Mathematics of malloc
When you call TICK1int* ptr = (int*)malloc(400);TICK1, you are mathematically instructing the OS: "Find a contiguous block of exactly 400 bytes in the Heap that is not currently being used, mark it as Used, and return the physical memory address to me."
Because Heap memory gets fragmented as objects are created and destroyed, TICK1malloc()TICK1 is a mathematically complex O(N) operation. It must scan a Linked List of free memory blocks to find one that fits the requested size perfectly.

## 2. Memory Leaks
Because the developer is solely responsible for memory, human error causes mathematical disasters.
If a developer allocates 400 bytes, but forgets to call TICK1free(ptr)TICK1 before the function ends, the pointer variable on the Stack is destroyed, but the 400 bytes on the Heap remain marked as "Used" by the OS forever. The program mathematically loses the ability to ever interact with those 400 bytes again. If this happens inside a TICK1whileTICK1 loop, the program will slowly consume all available RAM on the server until the OS mathematically kills it (OOM Killer).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Ownership & borrowing/index.mdx': `---
title: Ownership and Borrowing
description: Rust's revolutionary mathematical model for ensuring complete memory safety and thread safety without the overhead of a Garbage Collector.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ownership and Borrowing">

Introduced by Rust, Ownership is a set of strict mathematical rules enforced at Compile-Time that govern how memory is managed, completely eliminating data races and use-after-free bugs.

## 1. The Three Rules of Ownership
1. Each value in memory mathematically has a single variable called its **Owner**.
2. There can only be exactly one Owner at a time.
3. When the Owner goes out of scope, the memory is mathematically instantly dropped (freed).
If you have TICK1let s1 = String::from("hello");TICK1 and you write TICK1let s2 = s1;TICK1, the compiler does not copy the string. It mathematically transfers Ownership to TICK1s2TICK1. If you try to use TICK1s1TICK1 on the next line, the compiler mathematically halts and throws an error, preventing you from ever having two pointers trying to free the same memory block (Double-Free Bug).

## 2. Borrowing
Because transferring ownership constantly is annoying, Rust allows **Borrowing** via References (TICK1&TICK1).
You can mathematically borrow data according to strict rules:
- You can have infinite immutable borrows (Read-Only pointers) simultaneously.
- You can have exactly ONE mutable borrow (Write pointer) at a time.
- You mathematically cannot have a mutable borrow AND an immutable borrow at the same time.
This guarantees that no thread can ever mathematically mutate a variable while another thread is trying to read it, completely eliminating Data Races at compile time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/RAII)/index.mdx': `---
title: RAII (Resource Acquisition Is Initialization)
description: A C++ programming idiom that mathematically binds the lifespan of a system resource to the lifespan of a local Stack variable.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RAII (Resource Acquisition Is Initialization)">

RAII is the core mathematical philosophy of C++. It ensures that you never forget to close a File, release a Mutex Lock, or free Heap Memory by tying those actions directly to the CPU's deterministic Stack unwinding.

## 1. The Mathematical Guarantee
When you instantiate a class on the Stack in C++, the compiler mathematically guarantees two things:
1. **Acquisition**: The Constructor is called exactly when the variable enters scope. This is where you mathematically allocate the Heap memory or acquire the OS File Handle.
2. **Release**: The Destructor is called *unconditionally* when the variable goes out of scope. 
If an exception is thrown in the middle of a function, the CPU mathematically unwinds the Stack, unconditionally triggering the Destructor of every local variable. The Destructor contains the TICK1free()TICK1 or TICK1fclose()TICK1 logic, guaranteeing absolute resource cleanup regardless of how the function exits.

## 2. RAII in Modern Languages
Rust adopted RAII completely (via the TICK1DropTICK1 trait).
Garbage Collected languages (Java, C#) mathematically struggle with RAII because Objects on the Heap are not destroyed deterministically (you don't know *when* the GC will run). Therefore, to safely close a File in Java, you cannot rely on the Destructor; you must mathematically use the TICK1try-with-resourcesTICK1 block to simulate RAII behavior locally.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/reference counting/index.mdx': `---
title: Reference Counting
description: A deterministic Garbage Collection strategy that mathematically tracks exactly how many pointers are currently referencing a block of memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reference Counting (ARC)">

Used extensively by Apple (Swift/Objective-C), Reference Counting is an automated memory management technique that avoids the massive "Stop-the-World" pauses of a Java-style Tracing Garbage Collector.

## 1. The Mathematical Tally
Every Object allocated on the Heap physically contains a hidden Integer field: The **Reference Count**.
When you assign an object to a new variable (TICK1let b = aTICK1), the compiler mathematically inserts an assembly instruction to increment the counter (Count = 2). 
When a variable goes out of scope, the compiler inserts an instruction to decrement the counter (Count = 1). 
When the counter mathematically hits 0, the object knows it has no Owners left in the entire program, and it immediately calls TICK1free()TICK1 on itself. Memory is cleaned up deterministically, instantly, without a background GC thread.

## 2. Retain Cycles (Memory Leaks)
Reference Counting has one catastrophic mathematical flaw: **Cyclic References**.
If Object A contains a pointer to Object B, and Object B contains a pointer back to Object A, they both have a Reference Count of 1. If the main program loses track of both objects, they will float in the Heap forever. Object A cannot delete itself until Object B deletes it, and Object B cannot delete itself until Object A deletes it. Developers must mathematically break this cycle by explicitly declaring one of the pointers as a **Weak Reference** (a pointer that does not increment the mathematical tally).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/References/index.mdx': `---
title: References
description: A high-level mathematical abstraction over raw Memory Pointers, providing safety and syntactic sugar while maintaining pass-by-reference semantics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="References">

A Reference is mathematically a Pointer (it stores a physical RAM address), but it is heavily restricted by the Compiler to prevent the catastrophic bugs associated with raw C-style pointer arithmetic.

## 1. Pointers vs References
In C, a Pointer (TICK1int* ptrTICK1) is just a raw integer representing a memory address. You can mathematically add 10 to it (TICK1ptr + 10TICK1), forcing it to point 40 bytes down the Heap, allowing you to read arbitrary memory (which is how hackers exploit software). Pointers can also be Null (TICK10x0TICK1).
In C++ and Rust, a Reference (TICK1int& refTICK1) is a mathematically restricted Pointer. 
1. It must be initialized immediately (it mathematically cannot be Null).
2. It cannot be reassigned to point to a different variable later.
3. You cannot perform mathematical pointer arithmetic on it. 
It behaves syntactically exactly like a normal variable, but modifying it mathematically mutates the original data, providing speed without the danger of raw pointers.

## 2. Managed References
In Java, C#, and JavaScript, all Objects are mathematically manipulated via Managed References. You never hold the actual Object; you hold a Reference to it. You cannot do math on the Reference, and you cannot view the physical memory address. The Virtual Machine physically moves the Object around in RAM during Garbage Collection, and silently updates your Reference's internal pointer behind your back.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Smart pointers/index.mdx': `---
title: Smart Pointers
description: Wrapper objects that act like raw memory pointers but mathematically guarantee deterministic memory cleanup using RAII principles.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Smart Pointers">

In modern C++ and Rust, developers are mathematically discouraged from ever using raw pointers (TICK1*TICK1) and TICK1malloc/newTICK1. Instead, they use Smart Pointers, which are standard Classes that mathematically overload the dereference operator (TICK1->TICK1) but automatically handle memory management.

## 1. Unique Pointers (std::unique_ptr)
A TICK1unique_ptrTICK1 enforces the mathematical concept of strict Ownership. 
It allocates the data on the Heap, but the pointer object itself lives on the Stack. Because it mathematically cannot be copied (the copy constructor is physically deleted), only one owner exists. When the TICK1unique_ptrTICK1 goes out of scope, its Destructor is called (RAII), and it automatically calls TICK1deleteTICK1 on the Heap memory. It provides 100% memory safety with absolutely zero runtime overhead compared to a raw pointer.

## 2. Shared Pointers (std::shared_ptr)
A TICK1shared_ptrTICK1 implements automated Reference Counting. 
When it is created, it allocates the data on the Heap, and it mathematically allocates a tiny Control Block next to it containing a thread-safe atomic counter. You can safely pass copies of the TICK1shared_ptrTICK1 across 10 different CPU threads. Each copy increments the atomic counter. As the threads finish and their local pointers go out of scope, the counter decrements. The mathematically absolute last pointer to be destroyed reduces the counter to 0 and automatically frees the Heap memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Stack vs heap/index.mdx': `---
title: Stack vs. Heap Allocation
description: The two fundamentally different mathematical paradigms Operating Systems use to manage RAM for running applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Stack vs. Heap Allocation">

When an application starts, the OS mathematically divides its RAM into two primary data structures: The Stack and The Heap. Understanding the physics of how they operate is the most critical concept in Systems Engineering.

## 1. The Stack (Fast, Deterministic, Tiny)
The Stack is a perfectly contiguous block of memory. 
When a function is called, the CPU mathematically moves a single hardware register (the Stack Pointer) down by exactly the number of bytes needed for local variables. This allocation takes exactly 1 CPU cycle. 
When the function returns, the CPU moves the pointer back up. The memory is instantly "freed." 
Because the Stack is contiguous and perfectly predictable, it mathematically lives almost entirely inside the CPU's ultra-fast L1 Cache. However, because it is strictly LIFO (Last-In-First-Out), data on the Stack *must* have a mathematically fixed size at compile time, and it is instantly destroyed when the function ends.

## 2. The Heap (Slow, Dynamic, Massive)
The Heap is a massive, mathematically chaotic ocean of memory. 
If you need to store a dynamic String or an Array whose size isn't known until runtime, you must use the Heap. 
Allocating Heap memory (TICK1mallocTICK1/TICK1newTICK1) is mathematically grueling. The OS must search for an empty block of RAM that fits the requested size, mark it as used, and return the physical pointer to you. 
Because the Heap is highly fragmented, jumping between Heap objects causes massive **Cache Misses**, forcing the CPU to fetch data from main RAM, which mathematically takes 200x longer than reading from the Stack.

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
