import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/C/index.mdx': `---
title: C
description: A foundational, low-level imperative programming language that powers modern operating systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="C Programming Language" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg"
>

**C** is arguably the most important programming language in history. Created by Dennis Ritchie at Bell Labs in 1972 to build the UNIX operating system, it strikes a balance between low-level hardware control (like Assembly) and high-level human readability.

<Callout icon="warning" title="With Great Power...">
  C is famous for providing direct memory access via **Pointers** and manual memory management (using \`malloc\` and \`free\`). The compiler trusts the programmer completely. If you accidentally write data past the end of an array, C will not stop you; it will simply overwrite whatever happens to be in RAM at that location, leading to the infamous "Segmentation Fault" or severe security vulnerabilities.
</Callout>

## Key Characteristics

- **Compiled and Procedural**: Code is compiled directly into raw machine code for a specific CPU architecture. It relies heavily on functions and structural blocks.
- **Minimalist**: The language itself is extremely small, leaving tasks like string manipulation, math, and I/O to the Standard Library (\`libc\`).
- **Zero Overhead**: C does not have a Garbage Collector. It has no hidden background processes running. What you write is exactly what the CPU executes, making it blazing fast.

## Use Cases

Despite its age, C is absolutely dominant today in areas where performance and resource constraints are critical:
- **Operating Systems**: The Linux, Windows, and macOS kernels are predominantly written in C.
- **Embedded Systems**: Microcontrollers in cars, microwaves, and pacemakers.
- **Language Interpreters**: The Python interpreter (CPython) and Ruby interpreter are written in C.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/C++/index.mdx': `---
title: C++
description: A high-performance, compiled language that extends C with object-oriented and generic programming features.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="C++" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
>

**C++** was created by Bjarne Stroustrup in 1979 as "C with Classes." It was designed to add Object-Oriented Programming (OOP) paradigms to the lightning-fast, low-level C language, enabling developers to build massive, complex software systems without sacrificing hardware performance.

<Callout icon="info" title="The Complexity Behemoth">
  C++ is notoriously one of the most difficult languages to master. Over 40 years, it has accumulated features from multiple paradigms: Procedural, Object-Oriented, Generic (Templates), and Functional. You have the raw, dangerous power of C pointers, alongside massive, zero-overhead abstractions.
</Callout>

## Key Features

1. **Object-Oriented**: Introduced Classes, Encapsulation, Inheritance (including multiple inheritance), and Polymorphism to C.
2. **Templates (Generic Programming)**: Allows you to write functions and classes that operate on generic types, evaluated entirely at compile-time (Turing-complete at compile-time).
3. **RAII (Resource Acquisition Is Initialization)**: The core C++ philosophy for managing memory without a Garbage Collector. When an object goes out of scope, its Destructor is automatically called, instantly freeing memory and releasing file handles.
4. **Zero-Cost Abstractions**: The compiler is designed so that high-level abstractions (like using a highly generic Template class) compile down to machine code that is just as fast as hand-written, low-level C code.

## Where is it used?

C++ is the undisputed king of performance-critical applications:
- **Video Games**: Unreal Engine and virtually all AAA game engines are written in C++.
- **High-Frequency Trading**: Wall Street financial engines where microseconds equal millions of dollars.
- **Web Browsers**: Google Chrome (V8 engine) and Mozilla Firefox (Gecko).
- **Desktop Software**: Adobe Photoshop, Microsoft Office.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Java/index.mdx': `---
title: Java
description: A class-based, object-oriented programming language designed to have as few implementation dependencies as possible.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Java" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
>

Created by James Gosling at Sun Microsystems in 1995, **Java** revolutionized the software industry with its core philosophy: *"Write Once, Run Anywhere" (WORA).*

Before Java, code had to be compiled specifically for Windows, Mac, or Linux. Java introduced the **Java Virtual Machine (JVM)**. You compile your Java code into intermediate "bytecode," and the JVM on the user's machine translates that bytecode into native machine instructions on the fly.

<Callout icon="success" title="Enterprise Dominance">
  Java is famous for its strict, verbose Object-Oriented structure. Everything must be inside a Class. While this can feel tedious for small scripts, it makes Java incredibly predictable and maintainable for massive, multi-million-line enterprise codebases maintained by hundreds of developers.
</Callout>

## Key Characteristics

- **Strictly Object-Oriented**: Heavily relies on classes, interfaces, inheritance, and encapsulation.
- **Statically Typed**: Variables must declare their type at compile-time, catching errors early.
- **Garbage Collected**: Developers do not manually free memory. A background process (the Garbage Collector) automatically destroys objects that are no longer being used, eliminating Memory Leaks and Segmentation Faults.
- **Massive Ecosystem**: The Java ecosystem (Spring Boot, Maven, Gradle) is arguably the most robust and mature in the software industry.

## Where is it used?

- **Enterprise Backend Systems**: The vast majority of Fortune 500 companies use Java (specifically the Spring framework) for their core banking, e-commerce, and billing APIs.
- **Android Development**: Historically, Java was the exclusive native language for writing Android mobile applications (now sharing space with Kotlin).
- **Big Data**: Foundational big data frameworks like Apache Hadoop, Kafka, and Spark run on the JVM.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Python/index.mdx': `---
title: Python
description: An interpreted, high-level, general-purpose programming language known for its extreme readability and massive ecosystem.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Python" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
>

Created by Guido van Rossum in 1991, **Python** is an interpreted, dynamically typed language that prioritizes developer experience, extreme readability, and rapid prototyping. Its syntax heavily uses whitespace indentation rather than curly braces to define code blocks.

<Callout icon="info" title="The Python Paradox (Slow but Popular)">
  Because Python is interpreted dynamically at runtime and lacks true multi-threading (due to the Global Interpreter Lock - GIL), it is notoriously **slow** compared to C++ or Java. 
  However, it is the most popular language in the world for AI because Python acts as "glue." The heavy math is executed by highly optimized C/C++ libraries running under the hood (like NumPy or PyTorch), while the developer gets to write the high-level logic in beautiful, simple Python.
</Callout>

## Key Characteristics

1. **Batteries Included**: The Python Standard Library is massive, offering built-in modules for everything from parsing JSON to launching a local HTTP server.
2. **Dynamically Typed**: You do not declare variable types (e.g., \`x = 10\`). The interpreter figures out the type at runtime. This speeds up writing code but makes large codebases harder to refactor.
3. **Multi-Paradigm**: Supports Procedural, Object-Oriented, and Functional programming styles.
4. **Interpreted**: You run the source code directly (\`python script.py\`) without a separate compilation step.

## Where is it used?

- **Artificial Intelligence & Data Science**: The undisputed king. TensorFlow, PyTorch, Pandas, and Scikit-Learn make Python mandatory for Machine Learning.
- **Backend Web Development**: Frameworks like Django and FastAPI power massive websites (e.g., Instagram, Spotify).
- **Automation & Scripting**: The go-to language for DevOps engineers and system administrators to automate cloud infrastructure and CI/CD pipelines.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/JavaScript/index.mdx': `---
title: JavaScript
description: A high-level, just-in-time compiled language that enables interactive web pages and is an essential part of web applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="JavaScript (JS)" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg"
>

Created by Brendan Eich in just 10 days in 1995, **JavaScript** (no relation to Java) was designed as a simple scripting language to add basic interactivity (like form validation) to Netscape Navigator. 

Today, it is the absolute monopoly language of the Web Browser, powering complex Single Page Applications (React, Vue), and has broken out of the browser to conquer the backend (Node.js).

<Callout icon="warning" title="The Quirks of JS">
  Because JS had to maintain 100% backwards compatibility for 30 years, it carries historical baggage and bizarre type-coercion rules. For example, \`[] + [] === ""\` and \`0 == "0"\` is true, but \`0 === "0"\` is false. 
</Callout>

## Key Characteristics

1. **The Event Loop**: JS is single-threaded. It achieves incredibly high concurrency by being heavily asynchronous. Instead of waiting for a database to reply and freezing the thread, JS uses Callbacks/Promises and the Event Loop to handle other tasks while waiting.
2. **First-Class Functions**: Functions are treated like any other variable. They can be passed as arguments into other functions (callbacks) and returned from functions.
3. **Prototypal Inheritance**: Instead of traditional OOP classes, JS historically used prototypes (objects inheriting directly from other objects). (Modern JS added the \`class\` keyword as syntactic sugar over prototypes).
4. **JIT Compiled**: Modern browser engines (like V8) do not interpret JS line-by-line. They use Just-In-Time compilation to instantly translate the JS into optimized machine code on the fly.

## The Ecosystem

- **Frontend**: The only language that natively runs in the browser. Powered by frameworks like React, Angular, and Svelte.
- **Backend**: Node.js allows running JS on the server, perfect for highly concurrent, I/O bound APIs (like chat applications).
- **NPM**: The Node Package Manager is the largest software registry in the world.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/TypeScript/index.mdx': `---
title: TypeScript
description: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="TypeScript (TS)" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
>

**TypeScript** is a language created by Microsoft in 2012 to solve the biggest problem with JavaScript: writing and maintaining massive applications in a dynamically typed language is a nightmare.

TypeScript is a **strict syntactical superset** of JavaScript. This means any valid JS code is automatically valid TS code. TypeScript simply adds an advanced Static Type System on top of JS.

<Callout icon="success" title="The Build-Step Eraser">
  Browsers cannot execute TypeScript. Before running the code, the TS Compiler (\`tsc\`) strips away all the types and transpiles the code back down to pure, standard JavaScript. Therefore, TypeScript has **zero runtime overhead**. It exists purely to catch errors in your IDE before you even run the code.
</Callout>

## Why TypeScript?

If you misspell a property in JavaScript (e.g., \`user.emial\`), the code will run, crash in production, and anger your customers.
In TypeScript, you define an \`interface User { email: string }\`. If you type \`user.emial\`, the IDE immediately throws a red underline error, completely preventing the bug from reaching production.

## Key Features

1. **Interfaces and Types**: Define the strict shape of objects, API responses, and function parameters.
2. **Generics**: Write reusable components that can safely work over a variety of types (e.g., \`Array<T>\`).
3. **Union and Intersection Types**: Express complex logic (e.g., \`type Status = "success" | "error" | "loading"\`).
4. **Gradual Adoption**: You can introduce TS into an existing JS codebase one file at a time.

## Industry Adoption

TypeScript has largely "won" the frontend ecosystem. It is the default language for Angular, is overwhelmingly preferred for React/Next.js projects, and is increasingly the standard for Node.js backends. 

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Go/index.mdx': `---
title: Go (Golang)
description: A statically typed, compiled programming language designed at Google for simplicity, speed, and massive concurrency.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Go (Golang)" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg"
>

Created by Google engineers (including UNIX legend Ken Thompson) in 2009, **Go** was designed to solve Google's massive backend scaling problems. They needed a language that was fast to compile (unlike C++), performant, safely garbage-collected, and ridiculously easy to write highly concurrent code for multi-core processors.

<Callout icon="info" title="Brutally Simple">
  Go's defining characteristic is its lack of features. It intentionally excludes inheritance, classes, exceptions, and map/filter functions. The creators believe that giving developers fewer ways to do things results in highly readable, uniform code across massive engineering teams.
</Callout>

## Key Characteristics

1. **Goroutines (Concurrency)**: The crown jewel of Go. Instead of heavy OS threads, Go uses incredibly lightweight green threads called "Goroutines." You can easily spawn 100,000 Goroutines simultaneously on a standard laptop by simply putting the word \`go\` in front of a function call.
2. **Channels**: Instead of sharing memory and dealing with dangerous Mutex locks, Goroutines communicate by passing messages through "Channels." (*"Do not communicate by sharing memory; instead, share memory by communicating."*)
3. **Lightning Fast Compilation**: Go compiles directly to statically linked, native machine code binaries (no JVM required). It compiles so fast it feels like a scripting language.
4. **Garbage Collected**: Unlike Rust or C++, Go manages memory for you, accepting a tiny latency hit in exchange for massive developer productivity.

## Where is it used?

Go is the undisputed language of the **Cloud and Microservices**:
- **Docker and Kubernetes**: The core infrastructure of the modern cloud is written entirely in Go.
- **Backend Microservices**: Uber, Twitch, and Netflix use Go to write highly concurrent APIs that route millions of network requests per second.
- **CLI Tools**: Because it compiles down to a single, portable executable binary, it is perfect for terminal applications (like Terraform).

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Rust/index.mdx': `---
title: Rust
description: A systems programming language focused on memory safety, fearless concurrency, and blazing-fast performance.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Rust" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg"
>

Started by Mozilla in 2010, **Rust** was created to solve the 50-year-old nightmare of C and C++: Memory Leaks and Buffer Overflows. It offers the exact same low-level hardware control and blazing speed as C++, but it mathematically guarantees memory safety and thread safety at compile-time.

For nearly a decade, Rust has been voted the "Most Loved Programming Language" by developers worldwide.

<Callout icon="success" title="The Borrow Checker">
  Rust achieves memory safety **without a Garbage Collector**. 
  It uses a revolutionary concept called the **Borrow Checker**. The compiler tracks the "Ownership" and "Lifetimes" of every variable in your code. If two threads try to write to the same memory simultaneously, the compiler simply refuses to compile the code. If your code compiles in Rust, you are mathematically guaranteed to have zero Segfaults and zero Data Races.
</Callout>

## Key Characteristics

1. **Zero-Cost Abstractions**: Like C++, high-level language features compile down to maximally optimized machine code.
2. **Fearless Concurrency**: Because the compiler prevents data races, developers can aggressively write multi-threaded code without the fear of untraceable production crashes.
3. **Modern Tooling**: The \`cargo\` package manager and build system is universally praised as one of the best in the industry.
4. **Pattern Matching & Result Types**: Rust handles errors natively via the \`Result<T, E>\` enum rather than throwing exceptions, forcing the developer to explicitly handle both the success and error cases.

## The Learning Curve

Rust has a notoriously brutal learning curve. Fighting the Borrow Checker is a rite of passage. The compiler acts as a strict mentor, forcing you to design your memory architecture perfectly before it allows you to run the code.

## Where is it used?

- **Systems & OS**: Parts of the Linux Kernel and Windows OS are being actively rewritten in Rust.
- **WebAssembly (WASM)**: Rust is the premier language for compiling high-performance code to run inside the web browser.
- **Blockchain & Web3**: Foundational language for Solana and Polkadot smart contracts.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Csharp/index.mdx': `---
title: C# (C-Sharp)
description: A modern, object-oriented, and type-safe programming language developed by Microsoft as part of its .NET initiative.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="C# (C-Sharp)" 
  category="Programming Languages" 
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/0/0d/C_Sharp_wordmark.svg"
>

Created by Microsoft in 2000 (led by Anders Hejlsberg), **C#** was originally designed as Microsoft's answer to Java. Today, it has evolved into a highly expressive, modern, multi-paradigm language running on the open-source, cross-platform **.NET Core** runtime.

<Callout icon="info" title="The LINQ Revolution">
  C# is heavily praised for its elegant syntax and rapid adoption of modern features. One of its crown jewels is **LINQ (Language Integrated Query)**, which allows developers to write SQL-like queries directly into the language syntax to filter and map over arrays and databases with absolute type safety.
</Callout>

## Key Characteristics

- **Object-Oriented & Component-Oriented**: Like Java, it is heavily OOP, but adds features like Properties and Events natively to support UI component development.
- **Managed Execution**: C# compiles to Intermediate Language (IL) which is executed by the Common Language Runtime (CLR), providing automatic Garbage Collection and memory safety.
- **Async/Await**: C# pioneered the modern \`async/await\` syntax in 2012, which has since been adopted by JavaScript, Python, and Rust to handle asynchronous I/O cleanly.
- **Value Types vs Reference Types**: Gives developers fine-grained control over memory, allowing data to be allocated on the Stack (structs) for performance, or the Heap (classes).

## Where is it used?

- **Enterprise Web Backends**: ASP.NET Core is one of the fastest and most popular web frameworks on the market, dominating corporate enterprise software.
- **Game Development**: The primary scripting language for the **Unity Game Engine**, making it the most used language in indie game development and mobile gaming.
- **Desktop Applications**: The undisputed standard for building native Windows desktop applications (WPF, WinForms, MAUI).

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Imperative programming/index.mdx': `---
title: Imperative Programming
description: A paradigm that uses statements that change a program's state, focusing on describing HOW a program should achieve a result.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Imperative Programming">

**Imperative Programming** is the oldest and most fundamental programming paradigm. It is closely tied to the physical architecture of computers (the von Neumann architecture).

In the imperative paradigm, the programmer writes code that describes **exactly HOW** the computer should perform a task, step-by-step. It relies heavily on statements that change the underlying memory state of the computer (mutating variables).

<Callout icon="info" title="The Recipe Analogy">
  Imperative programming is like giving someone a recipe:
  1. Take a bowl.
  2. Put 2 eggs in the bowl.
  3. While the eggs are not whisked, stir the eggs.
  4. Pour the bowl into a pan.
</Callout>

## Core Concepts

1. **State Mutation**: The program is built around variables whose values change over time (e.g., \`counter = counter + 1\`).
2. **Control Flow**: Explicitly defining the path of execution using loops (\`for\`, \`while\`) and conditional branches (\`if\`, \`else\`, \`switch\`).
3. **Sequence**: The order of operations matters entirely. Line 2 executes, then changes state, then Line 3 executes using that new state.

## Example

Filtering an array of numbers to only include evens (Imperative approach):

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const evens = []; // Mutable state

// Explicit control flow and mutation
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evens.push(numbers[i]);
  }
}
\`\`\`

## Strengths and Weaknesses

- **Strengths**: It maps directly to how the CPU actually executes machine code, making it highly performant and intuitive for low-level memory manipulation (C, Assembly).
- **Weaknesses**: As systems grow massively complex, tracking the constantly changing "State" of hundreds of variables leads to severe bugs and makes concurrent (multi-threaded) programming incredibly dangerous.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Declarative programming/index.mdx': `---
title: Declarative Programming
description: A paradigm that focuses on WHAT the program should accomplish without specifying exactly HOW to achieve it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Declarative Programming">

**Declarative Programming** is an umbrella paradigm (which includes Functional and Logic programming) that stands in direct contrast to Imperative programming.

In the declarative paradigm, the programmer writes code that describes **WHAT** the desired outcome is, leaving the complex, step-by-step implementation details (the "HOW") to the underlying language compiler or engine.

<Callout icon="success" title="The Restaurant Analogy">
  Declarative programming is like ordering at a restaurant. You tell the waiter: "I want a medium-rare steak with fries." (The **WHAT**). 
  You do *not* go into the kitchen and tell the chef to turn the stove to 400 degrees, cook for 5 minutes, flip, and plate (The **HOW**).
</Callout>

## Classic Examples

The most famous declarative languages are not general-purpose programming languages, but domain-specific ones:

- **SQL**: You declare \`SELECT * FROM users WHERE age > 18\`. You don't write a \`for\` loop to iterate over the database sectors. The SQL engine figures out the fastest way to fetch it.
- **HTML/CSS**: You declare \`<button>Click</button>\`. You don't write the imperative C++ code to draw a rectangle on the screen pixel-by-pixel.
- **React**: Modern UI frameworks are declarative. You declare "When the state is X, the UI should look like Y." React automatically handles the complex DOM manipulations to make it happen.

## Example

Filtering an array of numbers to only include evens (Declarative approach using JavaScript's functional methods):

\`\`\`javascript
const numbers = [1, 2, 3, 4];

// We declare WHAT we want (filter for evens).
// The JS engine handles the looping mechanism under the hood.
const evens = numbers.filter(n => n % 2 === 0);
\`\`\`

## Strengths and Weaknesses

- **Strengths**: Code is significantly shorter, more readable, and less prone to off-by-one errors. It is highly composable and allows the underlying engine to aggressively optimize the execution.
- **Weaknesses**: When performance is highly critical, or the underlying engine's abstraction "leaks," you may lose the fine-grained control needed to optimize the hardware usage.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Procedural programming/index.mdx': `---
title: Procedural Programming
description: A programming paradigm derived from imperative programming, based on the concept of the procedure call.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Procedural Programming">

**Procedural Programming** is a specific, structured type of Imperative Programming. As early programs grew in size, writing thousands of lines of sequential code (often relying on dangerous \`GOTO\` statements) resulted in unmaintainable "spaghetti code."

The Procedural paradigm solved this by introducing the concept of the **Procedure** (also known as routines, subroutines, or functions). It dictates that a program should be broken down into a series of smaller, reusable computational steps.

<Callout icon="info" title="The Foundation of Software Engineering">
  Procedural programming was the first major step toward modern software architecture. It introduced the idea of **Modularity** and **Scoping**—allowing variables to live locally inside a function rather than existing in a massive, global state.
</Callout>

## Core Concepts

1. **Functions/Procedures**: Blocks of code that take inputs (arguments), perform a specific sequence of operations, and return an output.
2. **Modularity**: Complex problems are decomposed into a hierarchy of smaller, manageable functions. (e.g., \`main()\` calls \`read_file()\`, which calls \`parse_data()\`).
3. **Data and Logic Separation**: In procedural code, data structures (like structs or records) and the functions that operate on them are kept completely separate. (This is the primary difference from Object-Oriented Programming).

## C: The Procedural King

The **C** programming language is the ultimate example of procedural programming. 

\`\`\`c
// The Data
struct Rectangle {
    int width;
    int height;
};

// The Procedure (Logic is separate from Data)
int calculateArea(struct Rectangle rect) {
    return rect.width * rect.height;
}
\`\`\`

## Evolution into OOP

Procedural programming works incredibly well for algorithms and system-level code (like the Linux Kernel). However, in massive business applications (like building a GUI or an RPG game), keeping hundreds of global variables and thousands of disconnected functions synchronized became chaotic. This limitation led directly to the creation of **Object-Oriented Programming**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Object-oriented programming/index.mdx': `---
title: Object-Oriented Programming (OOP)
description: A programming paradigm based on the concept of "objects", which contain both data and the code that manipulates it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Object-Oriented Programming (OOP)">

**Object-Oriented Programming (OOP)** is the dominant programming paradigm in the enterprise software industry (popularized by Java, C++, and C#). 

Unlike Procedural programming, which separates data from logic, OOP organizes software design around **Objects**—entities that bundle both the state (data/attributes) and the behavior (functions/methods) into a single cohesive unit.

<Callout icon="info" title="Modeling the Real World">
  OOP attempts to map code to real-world concepts. If you are building a banking app, you create a \`BankAccount\` Class. This class holds the data (\`balance\`) and the logic (\`deposit()\`, \`withdraw()\`). You cannot access the balance directly; you must interact with the object's methods.
</Callout>

## The Four Pillars of OOP

1. **Encapsulation**: Bundling data and methods into a Class, and hiding the internal state from the outside world using access modifiers (\`private\`, \`public\`). This protects the data from unauthorized mutation.
2. **Abstraction**: Exposing only the essential, high-level mechanisms to the user, hiding the complex, underlying implementation details. (e.g., You press the gas pedal; you don't need to know how the fuel injector works).
3. **Inheritance**: Allowing a new Class to absorb the properties and methods of an existing Class, promoting massive code reusability. (e.g., A \`Dog\` class inherits from an \`Animal\` class).
4. **Polymorphism**: The ability for different objects to be treated as instances of the same class through a common interface. (e.g., Calling \`.makeSound()\` on an array of Animals, and letting the specific Dog or Cat object decide how to implement the sound).

## Strengths and Weaknesses

- **Strengths**: Exceptional for organizing massive, complex codebases (millions of lines of code) maintained by huge teams. It enforces modularity and code reuse.
- **Weaknesses**: OOP can lead to over-engineering. Codebases often suffer from the "Gorilla Banana" problem (where to get a reusable banana, you must also inherit the gorilla holding it, and the entire jungle). It also introduces significant performance overhead due to pointer chasing and virtual method dispatches.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Functional programming/index.mdx': `---
title: Functional Programming (FP)
description: A declarative programming paradigm where programs are constructed by applying and composing pure mathematical functions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Functional Programming (FP)">

**Functional Programming (FP)** is a declarative paradigm that treats computation as the evaluation of mathematical functions. It strictly avoids changing state and mutating data. 

While languages like Haskell, Lisp, and Clojure are pure functional languages, FP concepts have heavily influenced modern multi-paradigm languages like JavaScript, Rust, and Python.

<Callout icon="success" title="The Antidote to Complexity">
  In Object-Oriented programming, bugs usually occur because the "State" of an object is modified unpredictably by different parts of the system. 
  Functional programming eliminates this class of bugs entirely by making State **Immutable**. If you can never change a variable once it is created, you can never have a race condition in a multi-threaded app!
</Callout>

## Core Concepts

1. **Pure Functions**: A function must adhere to two rules:
   - Given the exact same input, it will *always* return the exact same output.
   - It produces **no side effects** (it does not modify global variables, write to a database, or print to the console).
2. **Immutability**: Once a variable or data structure is created, it can never be modified. To "change" data, you must create a brand new copy of the data structure with the updated values.
3. **First-Class and Higher-Order Functions**: Functions are treated as data. They can be assigned to variables, passed as arguments into other functions (like \`map\`, \`filter\`, \`reduce\`), and returned from functions.

## Example

Updating a user's age:

\`\`\`javascript
// OOP / Imperative (Mutation)
const user = { name: "Alice", age: 25 };
user.age = 26; // Mutates original state

// Functional (Immutability)
const user = { name: "Alice", age: 25 };
const updatedUser = { ...user, age: 26 }; // Creates a pure copy
\`\`\`

## Strengths and Weaknesses

- **Strengths**: Code is incredibly predictable, highly testable (pure functions need no mock databases), and naturally thread-safe for parallel processing.
- **Weaknesses**: Strict immutability means constantly copying massive arrays or objects in memory, which can lead to high memory usage and Garbage Collection pauses if the language engine isn't heavily optimized for it.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
