import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Constants/index.mdx': `---
title: Constants
description: Immutable memory locations whose values are mathematically guaranteed by the compiler to never change during execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Constants">

A Constant is a named memory location that stores a value that cannot be altered by the program during its execution.

## 1. Compile-Time vs Run-Time Constants
- **Compile-Time Constants**: Values that are known perfectly before the program runs (e.g., TICK1const PI = 3.14159;TICK1). The compiler mathematically optimizes these by completely removing the variable and physically hardcoding TICK13.14159TICK1 directly into the machine code instructions, saving RAM.
- **Run-Time Constants**: Variables whose value is mathematically locked only *after* they are initialized during execution. For example, TICK1const startTime = Date.now();TICK1. The compiler cannot know this time in advance, so it must allocate RAM, but it mathematically prevents any subsequent line of code from altering that memory address.

## 2. Pointers and Constness
In low-level languages like C++, "Constness" is deeply mathematical.
TICK1const int* ptrTICK1 means the *data* is mathematically immutable, but you can point the pointer somewhere else.
TICK1int* const ptrTICK1 means the *pointer itself* is mathematically immutable (it can never point anywhere else), but you can change the data it points to.
TICK1const int* const ptrTICK1 means both the pointer and the data are permanently mathematically locked.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Default-named-variadic arguments/index.mdx': `---
title: Function Arguments (Default, Named, Variadic)
description: Advanced mathematical constructs for passing variable amounts of data flexibly and safely into functions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Function Arguments (Default, Named, Variadic)">

When a function is called, the caller must mathematically map its local variables to the function's parameters. Modern languages provide advanced mathematical ways to handle this mapping.

## 1. Default and Named Arguments
- **Default Arguments**: TICK1function connect(timeout = 5000)TICK1. If the caller does not mathematically provide a value, the compiler automatically injects TICK15000TICK1 into the function's stack frame. This prevents crashing while maintaining backward compatibility.
- **Named Arguments**: In languages like Python (TICK1connect(port=80, host="localhost")TICK1), the caller does not rely on the physical positional order of the parameters. The compiler mathematically maps the arguments by their explicit string names, massively reducing bugs caused by passing data in the wrong order.

## 2. Variadic Arguments
Sometimes you do not mathematically know how many arguments a function will receive (e.g., TICK1console.log(a, b, c, ...)TICK1). 
A Variadic function (using TICK1...argsTICK1 in JS, or TICK1*argsTICK1 in Python) instructs the compiler to dynamically allocate an Array or Tuple, pack all remaining arguments into that structure, and pass a single memory pointer to the function. In C (TICK1printfTICK1), this is mathematically dangerous because the compiler relies on the format string to calculate the memory size, leading to catastrophic buffer overflows if the string doesn't match the passed arguments.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/do-while)/index.mdx': `---
title: Do-While Loops
description: A post-test mathematical loop guaranteed to execute its block of code at least once before evaluating its condition.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Do-While Loops">

A TICK1do-whileTICK1 loop is a specific mathematical variation of the standard TICK1whileTICK1 loop.

## 1. The Post-Test Guarantee
A standard TICK1whileTICK1 loop is a "Pre-Test" loop. The CPU mathematically evaluates the boolean condition *before* it executes the block. If the condition is false initially, the block executes zero times.
A TICK1do-whileTICK1 loop is a "Post-Test" loop. The CPU unconditionally executes the block of code, and only mathematically evaluates the condition at the *bottom* of the block. Therefore, it is mathematically guaranteed that the code inside a TICK1do-whileTICK1 loop will execute at least exactly one time.

## 2. Assembly Implementation
At the hardware level, a TICK1do-whileTICK1 loop is actually mathematically more efficient than a standard TICK1whileTICK1 loop. 
A standard TICK1whileTICK1 loop usually requires two assembly jumps: an unconditional jump at the bottom to go back to the top, and a conditional jump at the top to exit the loop. 
A TICK1do-whileTICK1 loop only requires a single mathematical conditional jump instruction at the bottom of the block (TICK1JNZTICK1 - Jump if Not Zero) to jump back to the top, making it slightly faster at the bare-metal level.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/dynamic/index.mdx': `---
title: Dynamic Typing
description: A type system where mathematical type checks occur at runtime, allowing variables to fluidly change their memory representation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dynamic Typing">

In a statically typed language (Java, C++), a variable's type is mathematically locked at compile-time. In a dynamically typed language (Python, JavaScript), a variable does not have a type; only the *value* stored in memory has a type.

## 1. The Memory Overhead
TICK3javascript
let x = 5;
x = "Hello";
TICK3
In C, this is a mathematical impossibility. An integer requires 4 bytes; a string requires a pointer and a heap allocation. You cannot physically cram a string into an integer's memory slot.
In Dynamic languages, TICK1xTICK1 is not a raw integer. It is a mathematical **Pointer to a Box** (a variant or boxed object). The Box contains metadata: "I currently hold an Integer." When you reassign TICK1x = "Hello"TICK1, the engine dynamically allocates a new String Box, updates the metadata, and repoints TICK1xTICK1 to the new Box. This provides incredible flexibility but introduces massive mathematical overhead compared to bare-metal primitives.

## 2. Duck Typing
Dynamic languages rely heavily on **Duck Typing**: "If it walks like a duck, and quacks like a duck, it is mathematically a duck."
When a function calls TICK1obj.quack()TICK1, the compiler does not mathematically care what specific Class TICK1objTICK1 belongs to. At the exact millisecond of execution, the runtime engine mathematically searches the object's memory dictionary for a string named "quack". If it finds it, it executes it. If it doesn't, the program crashes at runtime.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Expressions/index.mdx': `---
title: Expressions
description: A mathematical combination of values, variables, and operators that the compiler explicitly evaluates to produce a single new value.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Expressions">

In programming theory, there is a strict mathematical difference between a **Statement** and an **Expression**.
- A **Statement** is an instruction that *does* something (e.g., TICK1if (x > 5)TICK1). It does not mathematically return a value.
- An **Expression** is a mathematical phrase that can be *evaluated* to produce a value (e.g., TICK1x + 5TICK1).

## 1. Expression Evaluation
When the compiler encounters an expression like TICK1(A + B) * CTICK1, it mathematically parses it into an **Abstract Syntax Tree (AST)**. The CPU must evaluate the mathematical leaves of the tree first. It loads TICK1ATICK1 into a register, loads TICK1BTICK1 into a register, uses the ALU to add them, and replaces that sub-tree with the new value, recursively continuing until the entire expression collapses into a single mathematical value.

## 2. Expression-Oriented Languages
In imperative languages (C, Java), TICK1ifTICK1 is a Statement. You cannot write TICK1let x = if (true) { 1 } else { 2 }TICK1.
In functional and modern systems languages (Rust, Scala, Kotlin), almost everything is an **Expression**. An TICK1ifTICK1 block mathematically evaluates and returns the value of its last line. This prevents developers from having to declare uninitialized variables (TICK1let x;TICK1) and mutating them inside TICK1ifTICK1 blocks, enforcing safer, mathematically pure code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Functions/index.mdx': `---
title: Functions
description: Self-contained blocks of mathematical logic that accept inputs, perform computation, and return outputs, forming the basis of modular code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Functions (Subroutines)">

A Function is the foundational mathematical unit of code reuse. Instead of writing the same 20 lines of logic multiple times, you write it once, name it, and mathematically invoke it from anywhere in the program.

## 1. The Call Stack
When you call a function, the CPU performs a highly complex mathematical maneuver:
1. It pushes all the arguments onto the Stack in RAM.
2. It pushes the **Return Address** (the exact physical location of the code that called the function) onto the Stack.
3. It changes its Instruction Pointer to jump to the physical memory location of the Function.
4. The Function allocates its own local variables on the Stack (a Stack Frame), executes its logic, and calculates a Return Value.
5. The CPU reads the Return Address, physically jumps back to the original code, and pops the function's Stack Frame, mathematically destroying all its local variables.

## 2. Pure Functions
In functional programming, a **Pure Function** is a strict mathematical concept:
1. It will always return the exact same output given the exact same input.
2. It produces absolutely no **Side Effects** (it does not modify global variables, write to disk, or alter the UI).
Because Pure Functions are mathematically completely isolated, they are trivial to test, and compilers can aggressively optimize them by caching their results (Memoization).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Generators-coroutines/index.mdx': `---
title: Generators and Coroutines
description: Functions that can mathematically pause their own execution, yield control back to the caller, and resume later from the exact same state.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Generators & Coroutines">

Standard functions are strictly mathematical: they start at the top, run to the bottom, and are destroyed. 
Generators and Coroutines mathematically break this rule. They can **pause** execution in the middle of their logic, yield a value to the caller, and **resume** later, picking up exactly where they left off.

## 1. The Yield Keyword
In Python or JavaScript, you create a Generator using the TICK1yieldTICK1 keyword.
When the CPU hits TICK1yield 5TICK1, it does not destroy the function's Stack Frame. It mathematically freezes the entire state of the function (all its local variables and the exact line number it is on), moves it to the Heap to prevent it from being overwritten, and returns TICK15TICK1 to the caller. When the caller invokes TICK1next()TICK1, the CPU mathematically thaws the function, jumping back to the exact line immediately following the TICK1yieldTICK1.

## 2. Infinite Sequences
Generators are mathematically vital for handling massive datasets.
If you need to calculate the first 10 Billion Fibonacci numbers, returning them in a standard Array would require Terabytes of RAM, crashing the computer. 
A Generator mathematically calculates one number, yields it, and pauses. The caller prints it, and asks for the next. The Generator only ever uses a few bytes of RAM, allowing developers to mathematically model infinite mathematical sequences and process massive files line-by-line efficiently.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Iteration/index.mdx': `---
title: Iteration (Loops)
description: The mathematical process of repeatedly executing a block of code until a specific logical condition is satisfied.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Iteration (Loops)">

Iteration is one of the three core mathematical structures of programming (alongside Sequence and Selection). It allows a computer to perform repetitive tasks at superhuman speeds.

## 1. Types of Iteration
- **Definite Iteration (TICK1forTICK1 loop)**: Used when the mathematical number of repetitions is known in advance (e.g., iterating through an array of 500 items). The loop explicitly manages an index variable, increments it, and checks a boundary condition on every cycle.
- **Indefinite Iteration (TICK1whileTICK1 loop)**: Used when the number of repetitions is mathematically unknown. The loop relies on a dynamic boolean condition (e.g., TICK1while (connection_is_open)TICK1). If the programmer fails to write logic that eventually flips that condition to false, the program mathematically enters an Infinite Loop and locks up the CPU core forever.

## 2. Tail-Call Optimization vs Iteration
In purely functional languages (like Haskell), loops (TICK1for/whileTICK1) mathematically do not exist because variables cannot be mutated (you cannot mathematically increment TICK1i = i + 1TICK1).
Instead, these languages use **Recursion** (a function calling itself) to achieve iteration. To prevent the call stack from blowing up (Stack Overflow), the compiler uses **Tail-Call Optimization**, mathematically converting the recursive function calls directly into highly efficient Assembly TICK1JUMPTICK1 instructions behind the scenes, mimicking a TICK1whileTICK1 loop at the hardware level.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Iterators/index.mdx': `---
title: Iterators
description: A behavioral design pattern that mathematically abstracts the traversal of complex data structures without exposing their underlying representation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Iterators">

An Iterator is a mathematical abstraction that allows a developer to traverse a container (like a List or a Tree) without needing to know exactly how that container physically stores its data in memory.

## 1. The Mathematical Interface
In Java or C++, if you have an Array, you can mathematically traverse it using an integer index: TICK1array[i]TICK1.
However, if you have a Linked List or a Binary Tree, TICK1tree[i]TICK1 is mathematically invalid because the memory is not contiguous. 
An Iterator provides a universal mathematical interface (usually just a TICK1next()TICK1 method and a TICK1hasNext()TICK1 boolean). The complex logic of chasing memory pointers through a massive Binary Tree is completely hidden inside the Iterator object. The developer simply writes TICK1while(it.hasNext()) { process(it.next()); }TICK1, and it works flawlessly on any data structure.

## 2. For-Each Loops
Modern languages provide TICK1for-eachTICK1 loops (e.g., TICK1for (String name : names)TICK1). 
This syntax is actually "Syntactic Sugar." The compiler mathematically translates the TICK1for-eachTICK1 loop into an Iterator under the hood. It silently instantiates the Iterator object, calls TICK1hasNext()TICK1, extracts the value with TICK1next()TICK1, and binds it to your local variable, mathematically guaranteeing that you will never accidentally cause an "Index Out of Bounds" memory error.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Literals/index.mdx': `---
title: Literals
description: Raw, physical values directly embedded into the source code, mathematically representing themselves without relying on variable abstraction.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Literals">

In programming, a Literal is a mathematical notation for representing a fixed, physical value directly within the source code.

## 1. Variables vs Literals
- TICK1let age = 25;TICK1
In this statement, TICK1ageTICK1 is a Variable (a mathematical abstraction pointing to a location in RAM). 
TICK125TICK1 is an Integer Literal. It does not point to anything; it mathematically represents the raw value 25.

## 2. Types of Literals
Compilers are mathematically designed to instantly recognize different types of Literals based on syntax:
- **Integer Literals**: TICK142TICK1, TICK1-10TICK1, or TICK10xFFTICK1 (Hexadecimal).
- **Floating-Point Literals**: TICK13.14TICK1 or TICK16.022e23TICK1 (Scientific notation).
- **String Literals**: Mathematically enclosed in quotes (TICK1"Hello"TICK1 or TICK1'World'TICK1). The compiler physically stores this exact string of bytes in a read-only section of the compiled binary file (the TICK1.rodataTICK1 section in C/C++).
- **Boolean Literals**: The explicit keywords TICK1trueTICK1 and TICK1falseTICK1.
When the CPU executes the code, it often does not need to fetch Literals from RAM. Advanced compilers will physically embed small Integer Literals directly inside the CPU's assembly instructions (Immediate Values), making mathematical execution nearly instantaneous.

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
