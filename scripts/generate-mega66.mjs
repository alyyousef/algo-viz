import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Generics/index.mdx': `---
title: Generics (Parametric Polymorphism)
description: A type system feature that allows mathematical algorithms to be written abstractly, deferring the exact data type until compilation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Generics (Parametric Polymorphism)">

Without Generics, if you want a function to reverse a List of Integers, and a function to reverse a List of Strings, you must mathematically write two distinct functions. Generics solve this code duplication.

## 1. The Type Variable
Generics introduce **Type Variables** (usually denoted as TICK1<T>TICK1). 
You write TICK1function reverse<T>(list: T[])TICK1. You are mathematically telling the compiler: "I do not care what T is. But whatever T is, this function takes an array of them."

## 2. Monomorphization vs Type Erasure
How do compilers mathematically handle Generics at the hardware level?
- **Monomorphization (C++, Rust)**: The compiler actually generates duplicate code behind the scenes. If you call TICK1reverseTICK1 with Integers and Strings, the compiler mathematically writes two separate, highly-optimized physical assembly functions in the binary (TICK1reverse_intTICK1 and TICK1reverse_stringTICK1). This makes execution lightning fast, but increases the final binary size (Code Bloat).
- **Type Erasure (Java)**: The compiler only uses the TICK1<T>TICK1 tags to check your math during compilation. When building the bytecode, it physically deletes TICK1<T>TICK1 and replaces it with the base TICK1ObjectTICK1 class. It only generates one function, saving space, but it forces the CPU to perform slow mathematical casting (TICK1(String) objTICK1) at runtime.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Gradual typing/index.mdx': `---
title: Gradual Typing
description: A hybrid type system that mathematically allows statically typed and dynamically typed code to seamlessly interoperate in the same codebase.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Gradual Typing">

Historically, a language was either entirely Statically Typed (Java) or entirely Dynamically Typed (Python). **Gradual Typing** (as seen in TypeScript or Python with Mypy) allows a codebase to mathematically exist in both states simultaneously.

## 1. The "Any" Type
The mathematical anchor of Gradual Typing is the TICK1anyTICK1 type. 
If a variable is typed as TICK1anyTICK1, the compiler mathematically disables all static type-checking for that specific variable, reverting completely to Dynamic Duck Typing. This allows developers to take a massive legacy JavaScript codebase and incrementally add strict mathematical types file-by-file without having to rewrite the entire system at once.

## 2. The Soundness Gap
Gradual Typing is incredibly pragmatic, but it introduces a mathematical "Soundness Gap."
Because TICK1anyTICK1 bypasses the compiler, you can mathematically cast a TICK1StringTICK1 to TICK1anyTICK1, and then cast that TICK1anyTICK1 into an TICK1IntegerTICK1 without the compiler complaining. The compiler's absolute mathematical guarantee of safety is broken, and runtime crashes (TypeError) can still occur at the boundaries where the Static code physically interacts with the Dynamic code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Intersection types/index.mdx': `---
title: Intersection Types
description: A type system feature that mathematically merges multiple distinct types into a single type that contains the properties of all of them.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Intersection Types">

While a Union Type (TICK1A | BTICK1) mathematically means a value can be *either* A or B, an Intersection Type (TICK1A & BTICK1) mathematically means a value must simultaneously be *both* A and B.

## 1. Mathematical Composition
Intersection Types are heavily used in TypeScript for Object Composition.
If you have a type TICK1Loggable = { log(): void }TICK1 and a type TICK1Serializable = { toJSON(): string }TICK1.
If you declare a variable as TICK1Loggable & SerializableTICK1, the compiler mathematically merges the definitions. The resulting object is strictly required to implement *both* the TICK1log()TICK1 method and the TICK1toJSON()TICK1 method.

## 2. Conflict Resolution
What happens if the intersected types mathematically conflict?
If TICK1ATICK1 requires TICK1id: stringTICK1 and TICK1BTICK1 requires TICK1id: numberTICK1. 
When you create TICK1A & BTICK1, the compiler attempts to mathematically intersect TICK1string & numberTICK1. Because it is physically impossible for a memory address to be both a String and a Number simultaneously, the intersection collapses into the mathematical TICK1neverTICK1 type. The compiler will instantly reject any attempt to instantiate this mathematically impossible object.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Option-Maybe types/index.mdx': `---
title: Option / Maybe Types
description: A mathematically rigorous alternative to Null pointers, forcing developers to explicitly handle the absence of a value at compile-time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Option / Maybe Types">

Tony Hoare famously called his invention of the Null Pointer his "Billion-Dollar Mistake." If a function can mathematically return Null, but the compiler does not force you to check for it, your program will eventually crash with a Null Reference Exception. Option types solve this.

## 1. The Mathematical Wrapper
An TICK1Option<T>TICK1 (or TICK1Maybe<T>TICK1 in Haskell) is an Algebraic Data Type (an Enum).
It mathematically has exactly two states:
1. TICK1Some(T)TICK1: The box contains a physical value of type T.
2. TICK1NoneTICK1: The box is empty.

## 2. Forcing Exhaustive Checks
If a function returns TICK1Option<User>TICK1, you do not physically have a TICK1UserTICK1. You have a Box. 
You cannot mathematically call TICK1box.getName()TICK1. The compiler will block you. You must write a TICK1matchTICK1 or TICK1if-letTICK1 statement to explicitly open the box. The compiler forces you to mathematically write the logic for *both* the TICK1SomeTICK1 state and the TICK1NoneTICK1 state before it allows the code to compile. This mathematically eradicates Null Reference Exceptions from the entire codebase (a key feature of Rust and Swift).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Product types/index.mdx': `---
title: Product Types
description: A fundamental Algebraic Data Type where the total number of possible mathematical states is the multiplication of its constituent fields.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Product Types">

In Type Theory, a Product Type is a compound structure (like a Struct, Record, or Tuple) that mathematically groups multiple different types together into a single memory block.

## 1. The Mathematics of "Product"
Why is it called a "Product" type? It comes from Cartesian Products in Set Theory.
If you define a Tuple: TICK1(Boolean, Byte)TICK1.
- A TICK1BooleanTICK1 has 2 possible states (True, False).
- A TICK1ByteTICK1 has 256 possible states (0 to 255).
The total number of unique mathematical states this Tuple can represent in memory is EXACTLY TICK12 * 256 = 512TICK1 states. The state space multiplies (Product).

## 2. Exponential State Explosion
Because Product Types multiply their states, adding fields causes the mathematical state space of your program to explode exponentially.
If you have a TICK1UserTICK1 struct with 10 boolean flags (TICK1is_adminTICK1, TICK1is_activeTICK1, etc.), that struct mathematically has TICK12^10 = 1024TICK1 different states. Many of those states might be mathematically invalid (e.g., a user is an Admin but is not Active). This is why advanced developers prefer Sum Types (Enums) to strictly limit state, rather than using massive Product Types (Structs) full of booleans.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Result-Either types/index.mdx': `---
title: Result / Either Types
description: A mathematically rigorous pattern for error handling that completely replaces traditional Try/Catch Exception mechanisms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Result / Either Types">

Exceptions (Try/Catch) are mathematically flawed because they act as invisible GOTO statements. They instantly break the CPU's control flow, jumping up the Call Stack unpredictably. **Result Types** fix this by making errors physical, mathematically trackable return values.

## 1. The Sum Type Architecture
A TICK1Result<T, E>TICK1 (or TICK1Either<L, R>TICK1) is a Sum Type Enum with exactly two states:
1. TICK1Ok(T)TICK1: The operation succeeded, and here is the data TICK1TTICK1.
2. TICK1Err(E)TICK1: The operation failed, and here is the error data TICK1ETICK1.

## 2. Compile-Time Error Handling
If a function reads a file, it does not throw an exception if the file is missing. It mathematically returns a TICK1Result<String, IOError>TICK1. 
The caller cannot mathematically access the String. They must use a TICK1matchTICK1 statement to handle both the TICK1OkTICK1 state and the TICK1ErrTICK1 state. Because the Error is part of the function's strict mathematical signature, the Compiler guarantees that no error can ever be accidentally ignored or bubble up invisibly to crash the application, making the software incredibly resilient.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Static typing/index.mdx': `---
title: Static Typing
description: A programming paradigm where the compiler mathematically proves the type safety of every variable and function before the program is allowed to run.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Static Typing">

In a Statically Typed language (C, Java, Rust), data types are a strict mathematical constraint bound to the **Variable name**, not just the data itself.

## 1. Compile-Time Mathematical Proofs
Before the compiler generates the binary executable, it runs a Type Checker. The Type Checker parses the Abstract Syntax Tree (AST) and mathematically attempts to prove that no type rules are violated. 
If you declare TICK1int x = 5TICK1 and later write TICK1x = "Hello"TICK1, the compiler detects a mathematical impossibility (a 4-byte integer slot cannot hold a dynamic String pointer). The compilation process instantly halts. The error is caught by the developer immediately, rather than by a user 6 months later in production.

## 2. Hardware Optimization
Because the compiler mathematically knows the exact type (and therefore the exact byte-size) of every variable in advance, it can generate incredibly optimized Machine Code.
In Python (Dynamic), TICK1a + bTICK1 requires hundreds of assembly instructions to check the types at runtime. In C (Static), if TICK1aTICK1 and TICK1bTICK1 are known integers, the compiler generates exactly one assembly instruction (TICK1ADDTICK1), making statically typed languages mathematically vastly superior in raw hardware performance.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Strong vs weak typing/index.mdx': `---
title: Strong vs. Weak Typing
description: The spectrum defining how strictly a language's runtime engine enforces the mathematical boundaries between different data types.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Strong vs. Weak Typing">

"Strong" and "Weak" typing are not absolute mathematical definitions (unlike Static vs Dynamic). They represent a spectrum of how much implicitly unsafe mathematical conversion (Coercion) a language will tolerate.

## 1. Weak Typing (Implicit Coercion)
Languages like JavaScript and C are weakly typed. They will aggressively bend mathematical rules to prevent the program from halting.
In JavaScript: TICK1"5" + 2TICK1 evaluates to the string TICK1"52"TICK1. The engine implicitly coerced the integer 2 into a string.
In C: If you add an TICK1intTICK1 and a TICK1floatTICK1, the compiler implicitly promotes the integer to a float. While convenient, weak typing causes massive, silent mathematical logic bugs because the runtime guesses the developer's intent instead of throwing an error.

## 2. Strong Typing (Strict Boundaries)
Languages like Python and Rust are strongly typed. They fiercely protect the mathematical boundaries of types.
In Python: TICK1"5" + 2TICK1 instantly crashes the program with a TICK1TypeErrorTICK1. The engine mathematically refuses to combine a String and an Integer. The developer must explicitly, mathematically cast the type (TICK1int("5") + 2TICK1). Strong typing forces explicit developer intent, significantly reducing hidden runtime bugs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Structural vs nominal typing/index.mdx': `---
title: Structural vs. Nominal Typing
description: The mathematical ruleset compilers use to determine if two distinct types are considered equivalent or compatible.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Structural vs. Nominal Typing">

When you try to pass an object of Type A into a function expecting Type B, the compiler must mathematically decide if they are compatible. It uses one of two distinct mathematical philosophies.

## 1. Nominal Typing (By Name)
Used by Java, C#, and C++. "Nominal" means "in name only."
The compiler mathematically checks the explicit inheritance tree. If Type A does not explicitly state TICK1class A implements BTICK1, the compiler rejects it, even if Type A happens to have the exact same methods and fields as Type B. The mathematical name and explicit declaration are the *only* things that matter.

## 2. Structural Typing (By Shape)
Used by TypeScript and Go.
The compiler completely ignores the names of the types. It mathematically compares their physical "Shape" (their internal structures).
If a function expects TICK1{ id: string, name: string }TICK1, and you pass it a TICK1CustomerTICK1 object that happens to contain TICK1idTICK1 and TICK1nameTICK1 strings, the compiler accepts it perfectly. It mathematically verifies that the required structure exists, allowing for highly flexible, decoupled code without the boilerplate of forcing everything to implement explicit Interfaces.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.2 Type Systems/Sum types/index.mdx': `---
title: Sum Types (Tagged Unions)
description: A fundamental Algebraic Data Type that mathematically restricts a variable to hold exactly one type from a predefined set of variants.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sum Types (Tagged Unions)">

In Type Theory, a Sum Type (also known as a Tagged Union, Variant, or advanced Enum) is a data structure that can mathematically hold a value that takes on exactly *one* of several different types.

## 1. The Mathematics of "Sum"
If you define a Sum Type in Rust: TICK1enum Status { Active(Boolean), ErrorCode(Byte) }TICK1.
- A TICK1BooleanTICK1 has 2 states.
- A TICK1ByteTICK1 has 256 states.
The total number of mathematical states this Enum can represent is TICK12 + 256 = 258TICK1 states. The state space is mathematically *added* together (Sum). It is physically impossible for the TICK1StatusTICK1 to hold both the Boolean and the Byte simultaneously.

## 2. Memory Layout and Tags (The Discriminant)
How does the CPU mathematically know which type is currently in the Sum Type?
The compiler physically adds a hidden "Tag" (a Discriminant) to the memory layout. 
If the Tag is TICK10TICK1, the CPU mathematically interprets the following bytes as a Boolean. If the Tag is TICK11TICK1, it interprets them as a Byte. The compiler ensures that a TICK1matchTICK1 statement physically checks this hidden Tag before allowing the developer to read the underlying data, guaranteeing absolute mathematical memory safety.

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
