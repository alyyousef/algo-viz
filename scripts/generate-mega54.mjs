import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Clojure/index.mdx': `---
title: Clojure
description: A robust, practical, and fast functional programming language—a modern dialect of Lisp designed to run on the Java Virtual Machine (JVM).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Clojure">

Created by Rich Hickey in 2007, Clojure represents a radical rethinking of Lisp. It combines the mathematical elegance and interactive development of Lisp with the sheer industrial power and library ecosystem of the Java Virtual Machine.

## 1. Immutable by Default
In Java or Ruby, data structures (like arrays or hash maps) are mathematically mutable. If you pass a map to a function, that function can change its contents, leading to massive concurrency bugs.
In Clojure, data structures are **immutable**. When you "change" a map, Clojure mathematically returns a brand new map. To prevent this from destroying memory, Clojure uses *Persistent Data Structures*, which mathematically share memory pointers between the old and new versions (structural sharing), allowing immutability at near-native speeds.

## 2. Concurrency Primitives
Clojure was built for the multi-core era. Because data is immutable, multiple threads can mathematically read the exact same data without locking. 
When state *must* change, Clojure provides Software Transactional Memory (STM) via the TICK1refTICK1 system. It works exactly like a database transaction: multiple threads attempt to update the state, and if a collision occurs, the STM engine mathematically rolls back and retries the transaction automatically.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/ClojureScript/index.mdx': `---
title: ClojureScript
description: A compiler for Clojure that targets JavaScript, bringing immutable data structures and functional programming to the frontend.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ClojureScript">

ClojureScript is not a separate language; it is the Clojure compiler re-engineered to mathematically emit heavily optimized JavaScript instead of JVM bytecode. It allows developers to write robust, purely functional code that runs directly in the browser or on Node.js.

## 1. The React Match Made in Heaven
In the early days of React (JavaScript), developers struggled mathematically with state management (determining if a deep object had changed required slow, deep equality checks).
ClojureScript solved this flawlessly. Because ClojureScript data structures are mathematically immutable, checking if a massive UI state object has changed is an TICK1O(1)TICK1 operation (just comparing the memory pointers). This led to the creation of **Reagent** and **Om**, which were historically faster than raw React.

## 2. Google Closure Compiler
ClojureScript does not just emit raw JavaScript; it pipes it through the **Google Closure Compiler**. 
This is an industrial-grade JavaScript optimizer (used for Gmail and Google Maps) that mathematically analyzes the entire codebase, aggressively renames variables to single letters, and physically removes dead code (Tree Shaking) across the entire dependency graph, resulting in astonishingly small bundle sizes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Common Lisp/index.mdx': `---
title: Common Lisp
description: The massive, standardized, multi-paradigm titan of the Lisp family, famous for its unmatched macro system and dynamic compilation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Common Lisp">

Developed in the 1980s to unify the fractured Lisp ecosystem, Common Lisp (CL) is an industrial-strength, multi-paradigm language. While modern languages like Python are praised for being dynamic, Common Lisp remains the undisputed king of runtime programmability.

## 1. Homoiconicity and Macros
In most languages, the code you write (TICK1if (x > 5)TICK1) and the data you manipulate (arrays) are mathematically distinct.
In Lisp, **Code is Data**. 
A Lisp program is just a nested list of lists (Homoiconicity). 
Because of this, Common Lisp possesses the most powerful Macro system ever created. A Macro allows you to write functions that physically rewrite the compiler's Abstract Syntax Tree *before* the code is compiled. You can mathematically invent entirely new syntax and language features (like Object Orientation or pattern matching) without ever modifying the core compiler.

## 2. The Interactive Image
Common Lisp operates on an "Image" based architecture. You do not recompile and restart your server when you change code. You mathematically inject the new function into the live, running system. NASA famously used Common Lisp on the Deep Space 1 probe; when a software bug occurred in deep space, engineers mathematically hot-patched the live Lisp environment from Earth without rebooting the craft.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Elixir/index.mdx': `---
title: Elixir
description: A dynamic, functional language designed for building scalable and maintainable applications, running on the legendary Erlang VM.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Elixir">

Created by José Valim in 2011, Elixir was built to solve a specific problem: the Erlang Virtual Machine (BEAM) was mathematically the best system in the world for massive concurrency, but the Erlang language itself was difficult and archaic to write. Elixir provides a modern, Ruby-inspired syntax that compiles directly down to BEAM bytecode.

## 1. The Actor Model
Elixir does not use threads or shared memory. It uses the mathematical **Actor Model**.
When you run an Elixir application, you are spinning up millions of ultra-lightweight "processes" (Actors). 
These processes share zero memory. They can only communicate by mathematically sending messages to each other's mailboxes. Because they share no state, you can run millions of them concurrently across all CPU cores without a single mutex or lock.

## 2. Let It Crash
In Java or C#, you wrap code in massive TICK1try/catchTICK1 blocks to prevent the system from crashing.
Elixir's philosophy is **"Let it crash."** 
Because processes are mathematically isolated, if one crashes, it does not take down the system. Instead, Elixir uses "Supervisors"—specialized processes whose only job is to mathematically monitor worker processes and instantly reboot them to a known good state if they fail, enabling the legendary "Nine Nines" (99.9999999%) of uptime.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Elm/index.mdx': `---
title: Elm
description: A delightful, purely functional language for the frontend that mathematically guarantees zero runtime exceptions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Elm">

Created by Evan Czaplicki in 2012, Elm is a statically typed, purely functional programming language that compiles to JavaScript. Its primary claim to fame is a staggering promise: **No Runtime Exceptions in Practice**. 

## 1. The Elm Architecture (TEA)
Elm mathematically forced the frontend world to rethink state. It introduced **The Elm Architecture**, consisting of exactly three parts:
- **Model**: The exact mathematical state of your application.
- **View**: A pure function that takes the Model and mathematically renders HTML.
- **Update**: A pure function that takes a Message (an event like a button click) and the old Model, and mathematically returns a brand new Model.

This one-way data flow architecture was so mathematically perfect that Dan Abramov directly ported the concept to JavaScript, resulting in **Redux**.

## 2. The Compiler as an Assistant
Elm achieves its "zero runtime exceptions" guarantee through its mathematically rigorous type system. There is no TICK1nullTICK1 or TICK1undefinedTICK1 in Elm. If a value might be missing, you must mathematically use a TICK1MaybeTICK1 type, and the compiler will violently refuse to compile until you write the code to handle both the TICK1JustTICK1 and TICK1NothingTICK1 cases. The Elm compiler is universally praised for having the most helpful, human-readable error messages in the entire software industry.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Erlang/index.mdx': `---
title: Erlang
description: The grandfather of massive concurrency, developed by Ericsson in the 1980s to run global telecommunications networks without downtime.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Erlang">

Created by Joe Armstrong, Robert Virding, and Mike Williams at Ericsson in 1986, Erlang was designed for a single, mathematically unforgiving domain: Telephone Switches. It had to route millions of concurrent phone calls without ever dropping a connection or going offline for maintenance.

## 1. The BEAM Virtual Machine
Erlang is intrinsically tied to the BEAM Virtual Machine. 
Unlike the JVM, which relies on the Operating System for threading, the BEAM operates as its own mathematically isolated mini-operating system. It completely controls process scheduling. If one process is doing heavy math, the BEAM forcefully pauses it (Preemptive Scheduling) to allow a smaller process to answer a network request, guaranteeing incredibly low latency.

## 2. Distributed by Default
Erlang is mathematically designed to cross physical boundaries. 
Sending a message to a process on the same CPU core uses the exact same mathematical syntax as sending a message to a process on a server in Tokyo. This makes clustering and horizontal scaling trivial. WhatsApp famously used Erlang to route billions of messages daily using only a handful of engineers, largely because the language handled the distributed systems mathematics natively.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Fsharp/index.mdx': `---
title: F# (Fsharp)
description: A mature, strongly typed, functional-first programming language running on the .NET ecosystem, heavily inspired by OCaml.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="F# (Fsharp)">

Developed by Don Syme at Microsoft Research in 2005, F# (Fsharp) is the functional counterpart to C# within the .NET ecosystem. It brings the mathematical rigor and type safety of ML-family languages (like OCaml) into the enterprise world of Microsoft.

## 1. Type Inference and Discriminated Unions
Unlike C#, where you must mathematically declare every type (TICK1List<String> x = ...TICK1), F# uses Hindley-Milner type inference. The compiler mathematically deduces the types automatically.
F# excels at Domain-Driven Design via **Discriminated Unions**. 
Instead of building complex class hierarchies for a Payment system, you mathematically define states:
TICK3fsharp
type Payment = 
  | Cash of amount: decimal
  | CreditCard of number: string * exp: string
TICK3
When you write a switch statement (pattern match) against TICK1PaymentTICK1, the compiler mathematically guarantees you handle every possible case, eliminating entire classes of business logic bugs.

## 2. Data Providers
F# invented **Type Providers**. In other languages, if you want to query a JSON API or a SQL database, you must manually write classes to represent the data.
An F# Type Provider mathematically reaches out to the SQL database or JSON file *at compile time*, analyzes the schema, and automatically generates strongly-typed objects in your IDE.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Gleam/index.mdx': `---
title: Gleam
description: A friendly, statically typed functional language that compiles to both Erlang (BEAM) and JavaScript.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Gleam">

Created by Louis Pilfold, Gleam is a modern, rapidly growing functional programming language designed to bring rigorous static typing to the legendary Erlang Virtual Machine (BEAM). 

## 1. Static Typing for the BEAM
Historically, the Erlang ecosystem (Erlang and Elixir) is dynamically typed. This provides immense flexibility but leads to mathematical uncertainty at runtime (e.g., passing a String to a function that expects an Integer). 
Gleam provides a mathematically sound, Hindley-Milner static type system (similar to Elm or Rust). It mathematically guarantees at compile-time that data structures match, but it still compiles down to standard BEAM bytecode, allowing developers to utilize Erlang's massive concurrency and "let it crash" Supervisor trees with total type safety.

## 2. Omnipresent Compilation
Because Gleam is designed with a very clean, C-style syntax (removing the archaic syntax of Erlang), the compiler team was able to easily mathematically target multiple backends. Gleam can compile to BEAM for massive backend scalability, and it can also compile to raw JavaScript, allowing developers to share their purely functional, statically typed business logic perfectly between the server and the browser.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Haskell/index.mdx': `---
title: Haskell
description: The absolute gold standard of purely functional programming, famous for its mathematical rigor, lazy evaluation, and Monads.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Haskell">

Created in 1990 by a committee of researchers to standardize functional programming, Haskell is a statically typed, purely functional, and lazily evaluated language. It is widely considered one of the most mathematically profound languages ever designed.

## 1. Pure Functions and Side Effects
In C++ or Python, any function can secretly modify a global variable, write to a file, or launch missiles. 
In Haskell, a function is mathematically pure. If a function takes an integer and returns a string (TICK1Int -> StringTICK1), it mathematically *cannot* write to a database or print to the screen. 
To perform "Side Effects" (like reading a file), Haskell forces you to mathematically encode the effect into the Type System using **Monads** (specifically the TICK1IOTICK1 Monad). This allows the compiler to mathematically separate the pure, perfectly testable logic from the messy, stateful real-world interactions.

## 2. Lazy Evaluation
Haskell evaluates code **lazily**. It does not mathematically compute a value until it absolutely has to.
You can define an infinite array (e.g., all Fibonacci numbers to infinity). In Java, this would instantly crash the memory. In Haskell, it is mathematically safe. If you ask Haskell for the 5th item in the infinite array, it only executes the exact amount of math required to calculate the first 5 numbers, and stops.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Idris/index.mdx': `---
title: Idris
description: A general-purpose functional programming language featuring full dependent types, allowing developers to mathematically prove their software is correct.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Idris">

Created by Edwin Brady, Idris is syntactically very similar to Haskell, but it introduces one of the most advanced mathematical concepts in computer science: **Dependent Types**.

## 1. First-Class Types
In Idris, Types are first-class citizens. They are not mathematically separate from values. 
You can write a function whose return *type* changes depending on the *value* of the input. 
For example, you can write a function that takes a boolean. If the boolean is TICK1trueTICK1, the function mathematically returns the Type TICK1StringTICK1. If the boolean is TICK1falseTICK1, it returns the Type TICK1IntegerTICK1. 

## 2. Theorem Proving as Programming
Because Types can depend on Values, the compiler can mathematically prove properties of your code.
In C#, you might write a TICK1sort()TICK1 function and write 20 unit tests to verify it works.
In Idris, you write the mathematical type signature to state: "This function takes an Array of length N, and returns an Array of length N where every element is less than or equal to the next element."
If your implementation is flawed, the compiler mathematically refuses to compile. By satisfying the compiler, you have definitively proven, via mathematical logic (the Curry-Howard correspondence), that your software has zero bugs.

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
