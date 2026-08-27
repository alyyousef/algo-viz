import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.4 Modularity/Visibility modifiers (public-private-protected)/index.mdx': `---
title: Visibility Modifiers
description: The mathematical keywords used by compilers to enforce Object-Oriented Encapsulation, restricting which parts of a codebase can physically access specific data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Visibility Modifiers">

In a massive enterprise codebase, if every variable is accessible from everywhere, developers will inevitably mutate data they shouldn't, causing catastrophic cascading failures. Visibility Modifiers (Access Specifiers) are the mathematical walls that prevent this.

## 1. The Core Modifiers
- **Private**: The strictest mathematical boundary. The variable or method can *only* be accessed by code physically written inside the exact same Class or Struct. Even inheriting classes are mathematically blocked from seeing it.
- **Protected**: The inheritance boundary. The variable can be accessed by the Class itself, AND by any Class that mathematically inherits from it (Subclasses), but is completely invisible to the outside world.
- **Public**: No mathematical boundary. Any code, anywhere in the program, can read or mutate the data.

## 2. Compile-Time vs Runtime Enforcement
In compiled languages like Java or C++, visibility is a mathematical proof executed at **Compile-Time**. 
If you try to access a TICK1privateTICK1 field, the compiler instantly halts and refuses to generate the binary. However, at Runtime, these boundaries do not physically exist. A hacker (or a developer using Reflection in Java) can mathematically calculate the memory offset and manipulate the private bytes directly. 
In Python, there is no mathematical enforcement at all. A variable prefixed with an underscore (TICK1_secretTICK1) is merely a "gentleman's agreement" that other developers should ignore it, but the Interpreter will not stop them from mutating it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/Assertions/index.mdx': `---
title: Assertions
description: Mathematical statements inserted into code that verify an assumption is true; if false, they immediately terminate the program to prevent data corruption.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Assertions">

An Assertion (TICK1assert(condition)TICK1) is a developer's mathematical declaration of absolute truth. It tells the compiler, "If the CPU ever evaluates this condition and it is False, the entire mathematical logic of my program is corrupted. Do not attempt to recover. Crash instantly."

## 1. Fail-Fast Methodology
Assertions are the bedrock of the **Fail-Fast** engineering philosophy.
If a function calculates a bank transfer, and you TICK1assert(amount > 0)TICK1, you are guaranteeing that negative transfers cannot occur. If a bug elsewhere in the code passes TICK1-500TICK1 into the function, the Assertion triggers an instant, violent program termination. While a crash is bad, mathematically writing a negative transfer to the database (Data Corruption) is a billion times worse. Assertions prevent localized bugs from polluting the global system state.

## 2. Development vs Production
Because Assertions require the CPU to mathematically evaluate conditions on every execution, they introduce runtime overhead. 
In languages like C and C++, the TICK1assert()TICK1 macro is mathematically tied to the TICK1NDEBUGTICK1 compiler flag. 
During Development, the compiler physically inserts the assertions into the Machine Code so developers can catch bugs. When compiling for Production (Release Mode), the compiler mathematically deletes every single TICK1assert()TICK1 statement from the binary. The checks disappear, yielding maximum hardware performance, assuming the logic was thoroughly proven during testing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/Contracts (pre-post-conditions/index.mdx': `---
title: Design by Contract
description: A formal mathematical methodology where functions define strict pre-conditions (requirements) and post-conditions (guarantees) to ensure absolute system correctness.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Design by Contract">

Coined by Bertrand Meyer for the Eiffel programming language, "Design by Contract" treats software components as legally binding mathematical agreements between the Caller (the Client) and the Function (the Supplier).

## 1. Pre-Conditions (The Caller's Obligation)
A Pre-Condition is a mathematical rule that MUST be true before the function is called.
If TICK1divide(a, b)TICK1 has a Pre-Condition that TICK1b != 0TICK1, the function itself is completely absolved of the responsibility to check for zero. The mathematical burden is entirely on the Caller. If the Caller passes TICK10TICK1, they have violated the Contract, and the program should immediately crash (usually via an Assertion).

## 2. Post-Conditions (The Function's Guarantee)
A Post-Condition is a mathematical rule that MUST be true exactly when the function returns.
If a function TICK1sort(array)TICK1 finishes, its Post-Condition mathematically guarantees that TICK1array[i] <= array[i+1]TICK1. If the function fails to satisfy this Post-Condition, the Supplier has violated the Contract.
By mathematically enforcing these boundaries, Design by Contract allows developers to definitively isolate bugs. If a Pre-Condition fails, the bug is in the Caller's code. If a Post-Condition fails, the bug is inside the Function itself.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/Defensive programming/index.mdx': `---
title: Defensive Programming
description: An architectural philosophy that assumes all inputs are mathematically hostile or corrupted, aggressively validating data at every system boundary.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Defensive Programming">

Defensive Programming is the mathematical opposite of Design by Contract. Instead of trusting that the Caller will honor a contract, a Defensive function mathematically assumes the Caller is either incredibly incompetent or actively malicious.

## 1. Zero Trust Architecture
In Defensive Programming, every function acts as a mathematical fortress.
Before TICK1divide(a, b)TICK1 does any math, it explicitly checks TICK1if (b == 0) return ERROR;TICK1. It checks if TICK1aTICK1 is Null. It checks if TICK1bTICK1 is out of bounds. 
This methodology is absolutely critical for Public APIs, Network endpoints, and User Interfaces, where the mathematical inputs are generated by unpredictable external environments.

## 2. The Cost of Paranoia
While highly secure, excessive Defensive Programming causes massive mathematical inefficiency.
If Function A verifies an object is not Null, and then calls Function B, which verifies it is not Null, which calls Function C, which verifies it is not Null, the CPU is wasting billions of cycles performing redundant mathematical checks. It also obscures the "Happy Path" (the actual business logic) behind dozens of TICK1if(error)TICK1 boilerplate blocks. Modern Type Systems (like Rust's strict Null safety) attempt to move this paranoia into the Compile-Time phase, preventing the need for Defensive runtime checks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/Error codes/index.mdx': `---
title: Error Codes
description: The legacy, C-style method of error handling where functions return a specific integer to mathematically indicate success or the type of failure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Error Codes">

Before modern Exceptions were invented, Error Codes were the only mathematical way a function could communicate failure back to the caller.

## 1. The Integer Contract
Because a C function can only mathematically return one value, if it needs to return data, how does it return an error?
Standard convention dictates that functions return TICK10TICK1 for mathematical success, and a negative integer (e.g., TICK1-1TICK1) for failure. If the function needs to return actual data, it returns a Memory Pointer. If the pointer is mathematically exactly TICK10x0TICK1 (Null), it indicates failure.

## 2. The errno Global
If a function returns TICK1-1TICK1, how do you know *why* it failed?
Operating Systems (like POSIX/Linux) utilize a massive global variable named TICK1errnoTICK1. If a system call fails, the OS mathematically writes a specific Error Code into TICK1errnoTICK1 (e.g., TICK12TICK1 for "File Not Found", TICK113TICK1 for "Permission Denied"). 
The caller must instantly check the TICK1errnoTICK1 global variable. This is mathematically dangerous in multi-threaded environments, because if Thread B triggers an error exactly one millisecond after Thread A, Thread B will overwrite TICK1errnoTICK1, and Thread A will read the wrong mathematical error code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/Exceptions/index.mdx': `---
title: Exceptions
description: A powerful control-flow mechanism that instantly halts normal execution and mathematically forces the Call Stack to unwind until an error handler is found.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Exceptions">

Exceptions were invented to solve the fundamental flaw of Error Codes: Developers kept forgetting to mathematically check them, allowing errors to fail silently. Exceptions cannot be ignored; they actively hijack the CPU.

## 1. Stack Unwinding
When a program hits a TICK1throwTICK1 statement, standard mathematical execution halts instantly.
The CPU physically looks at the current Stack Frame. Is there a TICK1catchTICK1 block here? If not, the CPU mathematically destroys the Stack Frame, aborting the function. It jumps to the Parent function's Stack Frame. Is there a TICK1catchTICK1 block here? 
This mathematical process (Stack Unwinding) continues violently up the chain. If it reaches the TICK1main()TICK1 function and still hasn't found a handler, the Operating System terminates the entire process.

## 2. The Invisible GOTO
While Exceptions guarantee errors are not ignored, they are heavily criticized by Systems Engineers (like the creators of Go and Rust).
Exceptions act as invisible, unpredictable TICK1GOTOTICK1 statements. When reading code, it is mathematically impossible to know if a simple function call TICK1saveToDatabase()TICK1 will return normally, or violently blow up the Call Stack. This makes mathematically analyzing the Control Flow of a large Java or C++ application incredibly difficult, and forces the compiler to inject massive amounts of hidden boilerplate code to handle the potential unwinding process.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/invariants)/index.mdx': `---
title: Class Invariants
description: Mathematical truths about the internal state of an Object that must absolutely remain valid for the entire lifespan of the Object.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Class Invariants">

In Object-Oriented theory, an Invariant is a mathematical condition that defines the logical integrity of an Object. 

## 1. The Mathematical Boundary
If you have a TICK1FractionTICK1 class with two integers: TICK1numeratorTICK1 and TICK1denominatorTICK1.
The mathematical Invariant of this class is: TICK1denominator != 0TICK1.
If the denominator ever becomes 0, the Object is no longer a valid Fraction; its mathematical existence is corrupted. 

## 2. Encapsulation as the Enforcer
How do you mathematically guarantee an Invariant is never broken? **Encapsulation**.
You make TICK1denominatorTICK1 completely TICK1privateTICK1. 
The Constructor mathematically enforces the Invariant upon creation (if the user passes 0, it throws an error). 
Any public method (like TICK1setDenominator(int v)TICK1) mathematically checks the input (TICK1if (v == 0) throw;TICK1) *before* it mutates the private state. 
Because the outside world cannot physically touch the memory of the TICK1denominatorTICK1, the Class Invariant is mathematically locked and guaranteed to remain true from the moment the Object is constructed until the moment the Garbage Collector destroys it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/Panics/index.mdx': `---
title: Panics
description: An unrecoverable, violent termination sequence initiated when a program encounters a mathematical state so corrupted it cannot safely continue execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Panics">

In modern systems languages (Rust, Go), there is a strict mathematical distinction between an "Error" and a "Panic."

## 1. Expected Errors vs Unrecoverable Panics
- **Errors**: Expected, routine mathematical failures. A user typed the wrong password. A file doesn't exist. The network dropped. These are handled gracefully via Result Types or standard control flow.
- **Panics**: A catastrophic mathematical anomaly that the developer explicitly assumed was impossible. An array index is out of bounds. A Null pointer is dereferenced. A thread is deadlocked. 

## 2. The Blast Radius
When a Panic is triggered (TICK1panic!()TICK1 in Rust), the program does not attempt to "catch" it and recover. Recovering from a Panic is mathematically dangerous because the program's internal RAM state is definitively corrupted; continuing to run could write that corrupted data to a production database.
Instead, the Panic immediately halts the thread, prints a highly detailed Stack Trace to the logs, and safely terminates the process. In Cloud Architecture (Kubernetes), it is mathematically safer to Panic, crash the pod, and let the Orchestrator instantly spin up a brand new, clean instance, rather than trying to limp along with corrupted memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/Result types/index.mdx': `---
title: Result Types (Monadic Error Handling)
description: The modern mathematical standard for Error Handling, using Algebraic Data Types to force the compiler to verify that errors are handled at compile-time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Result Types">

Result Types (used in Rust, Haskell, Swift) are the modern mathematical antidote to the unpredictability of Exceptions. They treat Errors not as invisible explosions, but as standard, returned data.

## 1. The Sum Type Enum
A Result Type is mathematically an Enum with exactly two states:
TICK1enum Result<T, E> { Ok(T), Err(E) }TICK1
When you call TICK1readFile()TICK1, it does not mathematically return a String. It returns a TICK1ResultTICK1 object. 
If it succeeded, it returns TICK1Ok(String)TICK1. If it failed, it returns TICK1Err(IOError)TICK1.

## 2. Forcing Exhaustiveness
Because the return value is mathematically a TICK1ResultTICK1, the developer is physically blocked from accessing the String directly.
They MUST write a TICK1matchTICK1 statement to unpack the Box. 
The Compiler mathematically forces the developer to write code for the TICK1ErrTICK1 branch. If they forget, the code refuses to compile. This completely eliminates the problem of silent failures (Error Codes) and the problem of invisible control flow (Exceptions), resulting in incredibly robust, mathematically provable software.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.5 Error Handling/Try-catch-finally/index.mdx': `---
title: Try-Catch-Finally
description: The syntactical structures used by the compiler to establish boundaries for catching Exceptions and ensuring absolute resource cleanup during Stack Unwinding.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Try-Catch-Finally">

The TICK1try-catch-finallyTICK1 block is the mechanism used to tame the violent, unpredictable Stack Unwinding caused by Exceptions.

## 1. Try and Catch
- **Try**: Establishes a mathematical surveillance boundary. The compiler injects metadata into the binary indicating that if an Exception occurs within this specific block of memory instructions, it should not instantly crash the program.
- **Catch**: The recovery zone. If an Exception is caught, the Stack Unwinding mathematically stops. The CPU binds the Exception object to the catch parameter (TICK1catch (Exception e)TICK1) and executes the block, allowing the program to safely resume normal execution.

## 2. The Guarantee of Finally
Because an Exception instantly teleports the CPU out of the TICK1tryTICK1 block, any cleanup code at the bottom of the TICK1tryTICK1 block will be mathematically skipped, resulting in severe resource leaks (e.g., an open database connection).
The TICK1finallyTICK1 block provides a mathematical guarantee of execution. Whether the TICK1tryTICK1 block finishes normally, or an Exception violently rips control away, the JVM/CLR compiler guarantees that the CPU will *always* mathematically execute the TICK1finallyTICK1 block before it leaves the function. This ensures that TICK1connection.close()TICK1 is executed with absolute certainty.

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
