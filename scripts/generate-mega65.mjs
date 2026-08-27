import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Statements/index.mdx': `---
title: Statements
description: The fundamental imperative units of code that instruct the CPU to perform an action, modify state, or control the flow of execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Statements">

In imperative programming theory, a **Statement** is a command that *does* something. Unlike an Expression (which mathematically evaluates to a value), a Statement's sole purpose is to produce a mathematical **Side Effect**.

## 1. Types of Statements
- **Declaration Statements** (TICK1int x;TICK1): Instructs the compiler to mathematically allocate memory on the Stack. It does not return a value.
- **Assignment Statements** (TICK1x = 5;TICK1): Mathematically mutates a block of memory. 
- **Control Flow Statements** (TICK1if (x > 5) { ... }TICK1): Mathematically alters the CPU's Instruction Pointer, causing execution to jump to a different memory address.

## 2. The Statement Terminator
Because Compilers read code as a single massive stream of text, they need a mathematical way to know where one statement ends and the next begins.
In C, Java, and Rust, the **Semicolon** (TICK1;TICK1) is the strict mathematical terminator.
In Python and modern JavaScript (via Automatic Semicolon Insertion - ASI), the **Newline** character (TICK1\\nTICK1) acts as the terminator. ASI is mathematically dangerous because if you break a line improperly, the compiler might implicitly insert a terminator where you didn't intend, mathematically altering the logic of your code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Switch-match statements/index.mdx': `---
title: Switch and Match Statements
description: Advanced conditional structures that mathematically optimize multi-branch branching logic over standard if-else chains.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Switch and Match Statements">

When a variable needs to be mathematically compared against 50 different possible values, writing 50 TICK1else ifTICK1 statements is extremely inefficient. TICK1switchTICK1 and TICK1matchTICK1 statements provide a highly optimized mathematical alternative.

## 1. Switch and the Jump Table
In C or Java, a TICK1switch(x)TICK1 statement is not just syntactic sugar for TICK1if-elseTICK1. It is a completely different mathematical construct. 
If the cases are contiguous integers (1, 2, 3, 4, 5), the compiler does not evaluate them sequentially. It mathematically constructs a **Jump Table** (an Array of memory addresses) in the compiled binary. When TICK1xTICK1 is evaluated, the CPU simply does TICK1JumpTo(Table[x])TICK1. Whether there are 5 cases or 50,000 cases, the mathematical execution time is exactly the same (O(1) time complexity).

## 2. Match (Pattern Matching)
Modern languages like Rust, Scala, and Python 3.10 utilize **Pattern Matching** (TICK1matchTICK1).
This is a massive mathematical leap beyond TICK1switchTICK1. A TICK1matchTICK1 statement can mathematically deconstruct complex objects, verify types, and bind variables all in one line. Furthermore, Rust's compiler mathematically enforces **Exhaustiveness**. If an Enum has 5 states, and your TICK1matchTICK1 block only handles 4, the compiler mathematically refuses to build the code, guaranteeing that unhandled states will never crash the program in production.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/tail)/index.mdx': `---
title: Tail Recursion
description: A strict mathematical optimization that prevents recursive functions from blowing up the call stack by reusing the current stack frame.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tail Recursion">

Recursion is mathematically elegant, but standard recursion requires pushing a brand new Stack Frame onto memory for every single function call, leading to catastrophic Memory Exhaustion (Stack Overflow). Tail Recursion is the mathematical solution.

## 1. The Tail Position
For a recursive function to be Tail-Recursive, the mathematical recursive call must be the **absolute very last operation** performed in the function.
- **NOT Tail-Recursive**: TICK1return n * factorial(n - 1)TICK1. The function calls itself, gets a result, and *then* mathematically multiplies it by TICK1nTICK1. Because the multiplication happens *after* the call, the CPU must preserve the Stack Frame to remember the value of TICK1nTICK1.
- **Tail-Recursive**: TICK1return factorial(n - 1, current_total * n)TICK1. All mathematical calculation is pushed into the arguments. The recursive call is the final act.

## 2. Tail-Call Optimization (TCO)
When a compiler (like Haskell or GCC) detects a function is Tail-Recursive, it performs **Tail-Call Optimization**.
Because there is no mathematical work left to do in the current function, the CPU does not need to remember the current Stack Frame. The compiler physically rewrites the assembly code to **overwrite** the current Stack Frame with the new arguments, and issues a standard TICK1JUMPTICK1 instruction instead of a TICK1CALLTICK1 instruction. This mathematically transforms infinite recursion into a highly efficient TICK1whileTICK1 loop at the hardware level, consuming exactly 0 extra bytes of RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Variables/index.mdx': `---
title: Variables
description: Named mathematical abstractions that point to physical memory locations, allowing developers to store, retrieve, and manipulate data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Variables">

At the absolute lowest level of computer science, there are no variables, only raw physical RAM addresses (e.g., TICK10x7FFF5FBFF8C0TICK1). A Variable is a mathematical abstraction provided by the compiler, allowing humans to assign a readable name to that physical address.

## 1. Declaration vs Initialization
There is a strict mathematical difference between the two:
- **Declaration** (TICK1int x;TICK1): Mathematically instructs the compiler to reserve 4 bytes of memory on the Stack. In languages like C, this memory is *uninitialized*. It contains whatever garbage electrons were left behind by the previous program that used that RAM block.
- **Initialization** (TICK1x = 0;TICK1): The first time a value is mathematically written into that reserved memory block, overwriting the garbage data.

## 2. L-values and R-values
When you write an assignment statement TICK1x = y;TICK1, the compiler mathematically treats TICK1xTICK1 and TICK1yTICK1 completely differently.
- TICK1xTICK1 is the **L-value** (Left value). The compiler mathematically evaluates TICK1xTICK1 to find its **physical memory address** so it knows *where* to write data.
- TICK1yTICK1 is the **R-value** (Right value). The compiler mathematically evaluates TICK1yTICK1 to read its **actual data contents**. 
You cannot write TICK15 = x;TICK1 because TICK15TICK1 is a literal; it does not have a mathematically mutable memory address (it is not a valid L-value).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/while/index.mdx': `---
title: While Loops
description: The fundamental mathematical structure for indefinite iteration, continuously executing a block of code based on a dynamic boolean condition.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="While Loops">

A TICK1whileTICK1 loop is the mathematical standard for Indefinite Iteration—used when the CPU cannot mathematically know in advance exactly how many times the loop should execute.

## 1. Event-Driven Architecture
TICK1whileTICK1 loops are the mathematical bedrock of all modern operating systems, video games, and server architectures.
A web server does not execute a TICK1forTICK1 loop 10 times and shut down. It utilizes an Infinite Loop: TICK1while(true) { listen_for_request(); }TICK1.
The loop mathematically spins forever, handing off execution to the OS scheduler when it is idle, and instantly waking up when the network interface card receives a TCP/IP packet.

## 2. The Danger of Infinite Loops
Because a TICK1while(condition)TICK1 loop relies entirely on the programmer to mathematically mutate the state of the TICK1conditionTICK1 variable inside the loop block, it is inherently dangerous. If a network socket silently drops, and the loop is waiting for a specific byte to flip the condition to TICK1falseTICK1, the loop will spin endlessly (an Infinite Loop). This mathematically pins the CPU core to 100% utilization, freezing the thread permanently until the OS forcefully kills the process.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Algebraic data types/index.mdx': `---
title: Algebraic Data Types (ADTs)
description: A deeply mathematical type system feature that allows developers to precisely model complex data using Sum Types and Product Types.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Algebraic Data Types (ADTs)">

Algebraic Data Types (ADTs) are a cornerstone of functional programming languages (Haskell, Rust, OCaml, Swift). They allow you to mathematically model data exactly as it exists in reality, making "invalid states unrepresentable."

## 1. Product Types (AND)
A Product Type is the mathematical combination of multiple types. If you have a TICK1Struct User { age: Int, active: Bool }TICK1, it is a Product Type.
Why "Product"? Mathematically, the total number of possible states is the *product* of its fields. 
If TICK1ageTICK1 has 256 states (an 8-bit int), and TICK1activeTICK1 has 2 states (true/false), the TICK1UserTICK1 struct mathematically has 256 * 2 = 512 possible states in memory.

## 2. Sum Types (OR)
A Sum Type (often implemented as an Enum with associated data) allows a value to be exactly *one* of several distinct types.
In Rust: TICK1enum Result { Success(String), Error(Int) }TICK1.
Why "Sum"? The total number of mathematical states is the *sum* of its variants. 
If a function returns a TICK1ResultTICK1, it is mathematically impossible for it to return both a Success string AND an Error integer simultaneously. It is one OR the other. This completely eliminates the need for Null pointers, forcing the compiler to mathematically verify that you have handled both the Success and Error states explicitly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Bounded polymorphism/index.mdx': `---
title: Bounded Polymorphism
description: A type system feature that mathematically restricts generic type parameters to only accept types that implement a specific interface or inherit from a specific class.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bounded Polymorphism">

In standard Generics (Parametric Polymorphism), a type variable TICK1TTICK1 mathematically means "absolutely any type." Bounded Polymorphism places mathematical constraints on TICK1TTICK1, telling the compiler, "T can be anything, *as long as* it meets these specific rules."

## 1. The Mathematical Constraint
If you write a generic sorting function: TICK1function sort<T>(array: T[])TICK1.
If someone passes an array of integers, it works. But what if they pass an array of database connections? How do you mathematically determine if Connection A is "greater than" Connection B? The compiler will throw an error when it tries to compile the comparison logic.
Bounded Polymorphism fixes this: TICK1function sort<T extends Comparable>(array: T[])TICK1. 
You mathematically bound TICK1TTICK1. The compiler will now instantly reject any type that does not explicitly implement the TICK1ComparableTICK1 interface, ensuring absolute mathematical safety at compile-time.

## 2. Type Erasure
In Java, Generics and Bounded Polymorphism exist purely in the compiler's mathematical analysis. When Java actually compiles the code to bytecode, it performs **Type Erasure**. It physically deletes the TICK1<T extends Comparable>TICK1 tags and replaces them with standard Object casts. The JVM runtime knows absolutely nothing about Generics; it is entirely a mathematical illusion enforced by the compile-time type checker.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/contravariance)/index.mdx': `---
title: Covariance and Contravariance
description: The complex mathematical rules governing how subtyping relates to generic types and function signatures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Covariance and Contravariance">

In Object-Oriented theory, if a TICK1CatTICK1 is a subtype of TICK1AnimalTICK1, you can safely pass a TICK1CatTICK1 into a function expecting an TICK1AnimalTICK1. 
Variance answers the highly complex mathematical question: If TICK1CatTICK1 is a subtype of TICK1AnimalTICK1, is a TICK1List<Cat>TICK1 a subtype of TICK1List<Animal>TICK1?

## 1. Covariance (Preserving the Hierarchy)
**Covariance** means the generic type mathematically follows the same hierarchy as its inner type.
If TICK1ListTICK1 is Covariant, then TICK1List<Cat>TICK1 is a subtype of TICK1List<Animal>TICK1. 
This is mathematically safe for **Read-Only** operations. If you have a function that reads animals from a list, passing it a list of cats is perfectly safe (a cat is an animal). However, if the list is mutable, covariance is a mathematical disaster. If the function tries to TICK1add(new Dog())TICK1 to the TICK1List<Animal>TICK1, it will physically insert a Dog into your original TICK1List<Cat>TICK1 in memory, corrupting the heap.

## 2. Contravariance (Reversing the Hierarchy)
**Contravariance** means the hierarchy is mathematically reversed. 
It is heavily used in Function Signatures. If a function expects a callback that processes a TICK1CatTICK1 (TICK1Action<Cat>TICK1), you can mathematically pass it a callback that processes an TICK1AnimalTICK1 (TICK1Action<Animal>TICK1). Because the callback is designed to handle *any* animal, it is mathematically guaranteed to be able to safely handle the TICK1CatTICK1 that the function hands it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Duck typing/index.mdx': `---
title: Duck Typing
description: A runtime-evaluated typing system based on the premise "If it walks like a duck and quacks like a duck, it is mathematically a duck."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Duck Typing">

Duck Typing is a type system concept heavily used in dynamic languages like Python, Ruby, and JavaScript. It completely ignores explicit inheritance trees and interfaces.

## 1. Behavior Over Classification
In a statically typed language (Java), if you have a function TICK1startEngine(Vehicle v)TICK1, you can only pass objects that explicitly mathematically inherit from the TICK1VehicleTICK1 class.
In Duck Typing, the runtime engine does not mathematically care about the object's ancestry. If the function calls TICK1v.ignite()TICK1, the Python interpreter simply looks at the memory structure of the object you passed in. If it physically finds a method named TICK1igniteTICK1 attached to that object, it executes it. It could be a Car, a Rocket, or a Stove. If the behavior exists, the math works.

## 2. The Runtime Danger
While Duck Typing allows for incredibly rapid development and mathematically elegant, loosely-coupled architecture, it is dangerous in massive enterprise systems.
Because the compiler never mathematically verifies the types, a simple typo (TICK1v.iginte()TICK1) will compile perfectly. The error will mathematically sit silently in the code like a landmine, completely undetected, until a user specifically clicks a button that triggers that exact line of code at runtime, instantly crashing the application.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Dynamic typing/index.mdx': `---
title: Dynamic Typing
description: A paradigm where variable types are mathematically determined and checked at runtime rather than during compilation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dynamic Typing">

In a Statically Typed language (C, Rust), types are a mathematical constraint enforced by the Compiler before the program ever runs. In a Dynamically Typed language (Python, JavaScript), types are a property of the data in memory, managed entirely by the Runtime Engine.

## 1. Boxed Values
In C, if you declare TICK1int x = 5TICK1, the compiler mathematically allocates exactly 4 bytes of raw memory. It is purely the number 5.
In JavaScript, TICK1let x = 5TICK1 is a mathematical **Pointer to a Box**. The Box contains the raw number 5, but it also contains hidden metadata (a tag) that mathematically identifies the memory block as a "Number". 
When you reassign TICK1x = "Hello"TICK1, the runtime doesn't overwrite the 4 bytes. It dynamically allocates a brand new String Box on the heap, updates the metadata tag to "String", and repoints the TICK1xTICK1 pointer.

## 2. Late Binding
Because the compiler cannot mathematically prove what type a variable is, all operations use **Late Binding**.
When Python executes TICK1a + bTICK1, the CPU cannot simply issue an assembly TICK1ADDTICK1 instruction. It must mathematically pause, read the metadata tag of TICK1aTICK1, read the metadata tag of TICK1bTICK1, look up the rules for how to combine those two specific types, and *then* execute the logic. This continuous mathematical type-checking on every single line of code is why dynamically typed languages run significantly slower than compiled C or C++ code.

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
