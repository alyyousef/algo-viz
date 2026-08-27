import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Constraint programming/index.mdx': `---
title: Constraint Programming
description: A declarative paradigm where developers do not write step-by-step algorithms, but instead mathematically define the absolute limitations of a problem, forcing the compiler to calculate the solution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Constraint Programming">

If you want to solve a Sudoku puzzle in Java, you must write a massive, complex backtracking algorithm telling the computer *how* to solve it. In Constraint Programming, you only tell the computer *what* the rules are.

## 1. Declarative Rule Sets
In a language like Prolog or MiniZinc, you mathematically declare the boundaries of reality.
1. TICK1All variables must be integers between 1 and 9.TICK1
2. TICK1All variables in Row 1 must be mathematically distinct (no duplicates).TICK1
You do not write a TICK1forTICK1 loop. You simply hand these mathematical constraints to a pre-built Solver Engine. 

## 2. The Solver Engine
The Solver Engine is a highly optimized mathematical graph traversal algorithm (often using SAT Solvers or Simplex algorithms).
It takes your constraints, mathematically intersects them, and aggressively prunes the search space. It tries millions of combinations per second, instantly discarding any branch that violates a constraint. When it finds a set of numbers that mathematically satisfies every single rule simultaneously, it outputs the solution. This paradigm is heavily used in industrial scheduling, logistics, and resource allocation where writing a manual algorithm is mathematically impossible.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Data-oriented programming/index.mdx': `---
title: Data-Oriented Design (DOD)
description: A hyper-optimized paradigm that abandons Object-Oriented principles, structuring code entirely around the physical hardware constraints of CPU Caches and RAM architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data-Oriented Design (DOD)">

Object-Oriented Programming (OOP) organizes code for human readability. Data-Oriented Design (DOD) organizes code for CPU readability. It is the dominant paradigm in high-performance video game engines (like Unity's ECS or Unreal).

## 1. The CPU Cache Bottleneck
Modern CPUs are mathematically 100x faster than RAM. 
To prevent the CPU from waiting for RAM, it pulls data in chunks (Cache Lines, usually 64 bytes).
In OOP, an TICK1EnemyTICK1 object contains its Position, Health, and AI State. If you want to move 1,000 enemies, the CPU pulls TICK1Enemy 1TICK1 into the cache. It uses the Position, but ignores the Health and AI State. 66% of the Cache Line is mathematically wasted, forcing the CPU to constantly pause and fetch more RAM (Cache Miss).

## 2. Arrays of Structures vs. Structures of Arrays
DOD solves this by completely destroying the TICK1EnemyTICK1 object.
Instead of an Array of Enemies (AoS), it uses a Structure of Arrays (SoA).
You create one massive, contiguous Array of TICK1PositionsTICK1 in RAM, and a separate Array of TICK1HealthsTICK1.
When the physics engine moves the enemies, it requests the TICK1PositionsTICK1 array. Because it is mathematically contiguous in RAM, the CPU Cache is filled with 100% pure Position data. The CPU mathematically executes the movement loop with zero Cache Misses, resulting in extreme, lock-step hardware performance.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Dataflow programming/index.mdx': `---
title: Dataflow Programming
description: An architectural paradigm where execution is not driven by a central sequential thread, but mathematically triggered the instant data arrives at a node's input ports.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dataflow Programming">

In traditional Von Neumann architecture, a central CPU Counter dictates execution (Step 1, then Step 2). In Dataflow architecture, execution is mathematically decentralized, driven entirely by the physical movement of data.

## 1. The Directed Graph
A Dataflow program is mathematically modeled as a Directed Graph.
Nodes are operations (e.g., Multiply, Add). Edges are the "pipes" connecting them.
There is no "Main" function. Node C (Add) simply waits. It is mathematically asleep. The instant Node A pushes a number down pipe 1, and Node B pushes a number down pipe 2, Node C physically wakes up, executes the addition, and pushes the result down pipe 3. 

## 2. Inherent Parallelism
Because execution is mathematically decoupled from a central thread, Dataflow architectures are massively, inherently parallel.
If Node D and Node E both receive data simultaneously, they will mathematically execute at the exact same physical millisecond on different CPU cores, without the developer ever writing a Mutex lock or a Thread spawn command. This paradigm is the fundamental mathematics behind hardware description languages (Verilog), audio processing (Max/MSP), and deep learning frameworks (TensorFlow's execution graphs).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Event-driven programming/index.mdx': `---
title: Event-Driven Programming
description: A non-linear paradigm where the flow of the program is mathematically determined by external events (user clicks, network packets) rather than a rigid top-down sequence.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Event-Driven Programming">

If you write a command-line script, it runs top-to-bottom and exits. A UI application or a Web Server cannot do this; it must mathematically wait in a state of suspended animation indefinitely.

## 1. The Event Loop and Emitters
The core architecture is the **Event Loop**. The main thread hits a mathematical TICK1while(true)TICK1 loop and waits.
When a user clicks a mouse, the Operating System generates an **Event Object**. It mathematically injects this object into the application's Event Queue. The Event Loop pulls the object, looks up which function (Event Handler / Callback) is mathematically bound to that specific event, and executes it.

## 2. Inversion of Control
Event-Driven programming relies on a mathematical concept called **Inversion of Control (IoC)** (the "Hollywood Principle: Don't call us, we'll call you").
The developer does not write the TICK1whileTICK1 loop or explicitly check if the mouse is pressed. The framework (like React or Node.js) owns the core loop. The developer simply mathematically registers functions with the framework (TICK1button.onClick(myFunction)TICK1), handing absolute control of the execution flow over to the underlying architectural engine.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Generic programming/index.mdx': `---
title: Generic Programming
description: A powerful compiler paradigm that allows developers to write mathematically abstract algorithms that operate flawlessly on any data type without sacrificing strict compile-time type safety.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Generic Programming">

If you write a function to sort an Array of Integers, and you need to sort an Array of Strings, do you copy-paste the exact same algorithm? Generic Programming mathematically prevents this code duplication.

## 1. Type Variables
In Generics (C++ Templates, Java Generics, Rust Traits), you replace the hardcoded Type with a mathematical placeholder variable, usually TICK1<T>TICK1.
You define the function as TICK1sort(Array<T> data)TICK1. The algorithm is now mathematically decoupled from the specific memory layout of the data. The compiler guarantees that the algorithm will mathematically work, as long as the Type TICK1TTICK1 implements the necessary mathematical constraints (e.g., the Type TICK1TTICK1 must support the TICK1<TICK1 and TICK1>TICK1 comparison operators).

## 2. Monomorphization vs Type Erasure
Compilers handle Generics in two radically different mathematical ways:
- **Monomorphization (C++, Rust)**: At compile-time, the compiler physically copy-pastes the generic code. If you sort Integers and Strings, the compiler generates two completely separate, highly optimized machine-code functions. It is lightning fast but bloats the binary size.
- **Type Erasure (Java)**: The compiler mathematically deletes the TICK1<T>TICK1 at compile-time, replacing it with the generic TICK1ObjectTICK1 class. It generates exactly one physical machine-code function. It keeps the binary tiny, but requires mathematical casting at runtime, slightly slowing down execution.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Literate programming/index.mdx': `---
title: Literate Programming
description: A paradigm invented by Donald Knuth where code is embedded within a human-readable narrative essay, completely reversing the traditional priority of code over documentation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Literate Programming">

In traditional programming, you write raw code and occasionally sprinkle in a TICK1// commentTICK1. Donald Knuth (creator of TeX) argued this was mathematically backward. Humans should not have to read machine code; machines should extract code from human literature.

## 1. Weaving and Tangling
A Literate Program is fundamentally a beautifully formatted essay (written in LaTeX or Markdown) explaining the mathematical logic of the software, interspersed with tiny blocks of actual code.
A specialized compiler performs two distinct mathematical tasks:
- **Weaving**: It extracts the text and formatting, generating a stunning PDF document for humans to read.
- **Tangling**: It mathematically extracts just the code blocks, reordering and assembling them into a standard, compilable source file for the CPU to execute.

## 2. The Legacy: Jupyter Notebooks
While true Literate Programming (as Knuth designed it) never became the industry standard for software engineering, its underlying mathematical philosophy birthed the **Jupyter Notebook**. Data Scientists write rich Markdown explanations of their mathematical models, directly interspersed with executable Python cells, creating a unified, executable scientific document.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Logic programming/index.mdx': `---
title: Logic Programming
description: A paradigm where programs are constructed purely of formal mathematical logic axioms and facts, allowing an inference engine to automatically deduce the answers to complex queries.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Logic Programming">

Logic Programming (epitomized by Prolog) is the precursor to modern AI. It treats the computer not as a calculator, but as a formal mathematical theorem prover.

## 1. Facts and Rules
You do not write functions; you mathematically define a Knowledge Base using Formal Logic (Horn Clauses).
1. **Facts**: Absolute mathematical truths. TICK1parent(john, mary).TICK1 (John is the parent of Mary).
2. **Rules**: Conditional mathematical logic. TICK1grandparent(X, Y) :- parent(X, Z), parent(Z, Y).TICK1 (X is the grandparent of Y IF X is the parent of Z AND Z is the parent of Y).

## 2. The Inference Engine
Once the Knowledge Base is defined, you ask a Query: TICK1?- grandparent(john, alice).TICK1
The Prolog Inference Engine uses a mathematical algorithm called **Resolution** and **Unification**. It searches its database of Facts, binds variables to specific values, and attempts to mathematically prove the statement. If it hits a dead end, it uses automated Backtracking to try a different logical path. The engine physically deduces the answer based purely on the provided axioms, without the developer ever writing a step-by-step algorithm.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Metaprogramming/index.mdx': `---
title: Metaprogramming
description: The advanced architectural ability of a program to treat its own code as mathematical data, allowing the software to read, analyze, and physically rewrite itself during compilation or execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Metaprogramming">

Normally, a program manipulates data (numbers, strings). In Metaprogramming, the program manipulates *programs*. The code writes code.

## 1. Compile-Time Metaprogramming (Macros)
In languages like C, C++, or Rust, Metaprogramming happens before the final binary is generated.
When the compiler encounters a **Macro** (e.g., TICK1println!()TICK1 in Rust), it does not compile it into a function call. The Macro is a mathematical script that runs *inside the compiler*. It physically analyzes the Abstract Syntax Tree (AST) of the surrounding code and mathematically generates brand new, highly optimized raw code in its place. This allows developers to create entirely new syntactic constructs that don't exist in the base language, physically altering the compiler's behavior.

## 2. Runtime Metaprogramming (Reflection)
In dynamic languages (Java, Python, Ruby), Metaprogramming happens while the program is physically running.
Using **Reflection**, an Object can mathematically inspect itself. It can ask the JVM, "What methods do I have? What is the name of this class?"
A program can dynamically intercept method calls, inject new variables into classes on the fly, or even execute arbitrary strings as code (TICK1eval()TICK1). While incredibly powerful for building Frameworks (like Spring or Ruby on Rails), it mathematically destroys compile-time type safety and is extremely difficult to debug.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Reactive programming/index.mdx': `---
title: Reactive Programming
description: A paradigm built entirely around continuous, mathematical streams of asynchronous data, where the architecture automatically propagates state changes through a complex dependency graph.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reactive Programming">

If you write TICK1A = B + CTICK1 in a standard language, TICK1ATICK1 is calculated once. If TICK1BTICK1 changes later, TICK1ATICK1 does not automatically update. In Reactive Programming, TICK1ATICK1 is mathematically bound to TICK1BTICK1; it updates instantly, like a cell in Excel.

## 1. The Observable Stream
The foundational mathematical unit is the **Observable Stream**.
Everything (mouse clicks, network responses, variable changes) is mathematically modeled as an infinite pipe of data flowing over time. 
The developer uses Functional concepts (Map, Filter, Reduce) to mathematically mutate these streams in real-time. For example: TICK1mouseClicks.filter(isRightClick).map(getCoordinates)TICK1.

## 2. The Observer Pattern and Propagation
Reactive architectures (like RxJS or React) rely heavily on the Observer Pattern.
When the source data (State) changes, the mathematical engine instantly propagates that change down the dependency graph. The UI Components that are "subscribed" to that specific stream physically receive the new data and re-render. Because the mathematical flow is entirely declarative (the UI declares *what* data it needs, not *how* to fetch it), the architecture can gracefully handle massive volumes of asynchronous, chaotic real-time data.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Axiomatic semantics/index.mdx': `---
title: Axiomatic Semantics
description: A highly rigorous branch of formal computer science that uses mathematical logic to prove the absolute, unassailable correctness of a computer program based on its preconditions and postconditions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Axiomatic Semantics">

How do you *prove*, with absolute mathematical certainty, that a program will not crash or produce the wrong answer? You cannot just run tests (testing only proves the presence of bugs, never their absence). You must use Axiomatic Semantics.

## 1. Hoare Logic and Triples
Invented by Tony Hoare, the foundation of this field is the **Hoare Triple**: TICK1{P} C {Q}TICK1.
- TICK1PTICK1 is the **Precondition**: A mathematical assertion of the system state before execution (e.g., TICK1x > 0TICK1).
- TICK1CTICK1 is the **Command**: The actual line of code (e.g., TICK1y = x * 2TICK1).
- TICK1QTICK1 is the **Postcondition**: The mathematical assertion of the system state after execution (e.g., TICK1y > 0TICK1).

## 2. Mathematical Proof of Correctness
By chaining these Hoare Triples together across an entire function, computer scientists can physically treat the source code as a mathematical theorem. 
Using automated theorem provers, they mathematically deduce whether the final Postcondition is logically guaranteed by the initial Precondition. This level of mathematical rigor is incredibly difficult and time-consuming, so it is rarely used in standard web development. However, it is absolutely mandatory for life-critical software, such as the flight control systems on passenger jets or the operating systems of nuclear reactors.

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
