import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '45. Parallel & Concurrent Computing/Actor model/index.mdx': `---
title: Actor Model
description: A mathematical model of concurrent computation that treats "actors" as the universal primitives of concurrent computation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Actor Model">

The standard mathematical approach to concurrency uses **Shared Memory** (Threads sharing the same variables) protected by Mutexes. This is notoriously difficult and highly prone to Deadlocks.

The **Actor Model** (invented in 1973 and made famous by the Erlang programming language) proposes a completely different mathematical paradigm: **Share-Nothing Architecture**.

<Callout icon="success" title="The Universal Primitive">
  In this model, an "Actor" is an isolated mathematical entity that has its own private state. It is physically impossible for Actor A to read or write Actor B's memory. The ONLY way Actors communicate is by sending asynchronous, immutable mathematical messages to each other's "mailboxes."
</Callout>

## Mathematical Properties of an Actor

When an Actor receives a message in its mailbox, it mathematically can do exactly three things concurrently:
1. Create a finite number of new Actors.
2. Send a finite number of messages to other Actors.
3. Determine how to handle the *next* message it receives (e.g., mathematically mutating its own private state).

Because there is zero Shared Memory, there are mathematically zero Race Conditions and zero need for Mutexes. It is the gold standard for building highly fault-tolerant, massively distributed systems (like WhatsApp, which is built on Erlang).

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Atomics/index.mdx': `---
title: Atomics
description: Mathematical operations that are executed completely or not at all, guaranteeing that no other thread can observe them in a partially complete state.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Atomics">

If \`counter += 1\` requires three distinct mathematical steps (Read, Add, Write), it is vulnerable to a Race Condition unless protected by an expensive OS-level Mutex.

**Atomic Operations** bypass the OS entirely by utilizing specialized hardware instructions built directly into the physical CPU silicon.

<Callout icon="tip" title="Uninterruptible Mathematics">
  When you execute an Atomic Increment (\`fetch_and_add\` on x86 CPUs), the CPU mathematically guarantees that the Read, Add, and Write happen in a single, indivisible microscopic moment. It mathematically locks the physical RAM bus for a nanosecond, preventing any other CPU core from interfering.
</Callout>

## The Compare-And-Swap (CAS)

The most important atomic operation in all of Computer Science is **Compare-And-Swap (CAS)**. 

CAS mathematically takes three arguments: a memory location, an expected old value, and a new value.
\`\`\`c
bool cas(int* address, int expected, int new_value) {
   // This entire block happens inside the CPU silicon atomically!
   if (*address == expected) {
       *address = new_value;
       return true;
   }
   return false;
}
\`\`\`

If CAS succeeds, your thread safely updated the variable. If CAS fails (returns false), it means another thread snuck in and changed the value first. Your thread simply loops (spins) and tries again. CAS is the foundational mathematical building block for all Lock-Free Data Structures.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/CSP (Communicating Sequential Processes)/index.mdx': `---
title: Communicating Sequential Processes (CSP)
description: A formal language for describing patterns of interaction in concurrent systems, famously popularized by the Go programming language.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Communicating Sequential Processes (CSP)">

> *"Do not communicate by sharing memory; instead, share memory by communicating."* — The Go Proverb

Like the Actor Model, **CSP** is a mathematical model of concurrency that completely rejects Shared Memory and Mutexes. However, it approaches communication differently.

In the Actor Model, entities communicate by sending messages directly to a specific Actor's private mailbox. 

In **CSP**, entities communicate anonymously through mathematical conduits called **Channels**.

<Callout icon="info" title="The Go Implementation">
  CSP was mathematically formalized by Tony Hoare in 1978, but it became a household name when Google designed the **Go** language around it. In Go, you spawn lightweight threads called *Goroutines*, and they pass data back and forth exclusively through *Channels*.
</Callout>

## Mathematical Properties of CSP Channels

1. **Anonymity:** A Sender pushes a message into \`Channel A\`. It mathematically does not know or care which Worker will read it. A Receiver pulls from \`Channel A\`. It mathematically does not care who sent it.
2. **Blocking Synchronization:** By default, CSP channels are *Unbuffered*. If a Sender tries to push data into a channel, the Sender mathematically halts (blocks) until a Receiver is physically ready to pull the data out. This creates an automatic, flawless mathematical synchronization point between the two threads.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Futures/index.mdx': `---
title: Futures
description: A programming construct representing the result of an asynchronous computation that may not yet have completed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Futures">

In traditional sequential programming, if you call a function that downloads a 50MB file, your entire program mathematically halts and waits for 5 seconds until the download finishes.

A **Future** (also known as a Promise or Deferred) is a mathematical abstraction for asynchronous concurrency. When you ask the system to download the file, the function mathematically returns instantly. However, instead of returning the actual file, it returns a "Future" object.

<Callout icon="success" title="The IOU">
  A Future is mathematically an IOU from the Operating System. It is a placeholder object that says: *"I don't have your data right now, but I mathematically guarantee I will eventually hold either the successful File Data, or an Error."*
</Callout>

## Mathematical States

A Future exists in exactly one of three mathematical states:
1. **Pending:** The background mathematical operation is still running.
2. **Resolved (Fulfilled):** The operation succeeded, and the Future now mathematically contains the result.
3. **Rejected:** The operation failed, and the Future mathematically contains an Exception.

While the Future is Pending, the Main Thread is mathematically free to do other work, keeping the UI responsive or handling other web requests.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Promises/index.mdx': `---
title: Promises
description: An object representing the eventual completion or failure of an asynchronous operation, closely related to Futures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Promises">

In Computer Science literature, the terms **Future** and **Promise** are often used interchangeably, but there is a strict mathematical distinction in advanced concurrent systems.

<Callout icon="info" title="The Mathematical Distinction">
  A **Future** is a read-only mathematical placeholder. You can only look at it and ask, *"Are you done yet?"*
  
  A **Promise** is the writable mathematical controller. It is the entity that actually holds the power to say, *"I have successfully finished, here is the data."*
</Callout>

## The JavaScript Ecosystem

In the context of Web Development (specifically JavaScript), the entire mathematical concept was unified under the \`Promise\` API (introduced in ES6).

Instead of writing deeply nested "Callback Hell" to handle asynchronous network requests, the mathematical \`Promise\` object allows developers to chain operations sequentially using \`.then()\` and \`.catch()\`.

\`\`\`javascript
// The mathematical beauty of Promise Chaining
fetchUserData()
  .then(user => fetchUserPosts(user.id))
  .then(posts => renderUI(posts))
  .catch(error => showErrorMessage(error));
\`\`\`

Every \`.then()\` mathematically returns a brand new Promise, allowing an infinite pipeline of asynchronous transformations.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/async-await/index.mdx': `---
title: Async/Await
description: A syntactic feature of many programming languages that allows an asynchronous, non-blocking function to be structured in a way similar to an ordinary synchronous function.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Async/Await">

While Promises mathematically solved the "Callback Hell" problem, chaining \`.then()\` statements still forced developers to write code that looked fundamentally different from standard, top-to-bottom synchronous code.

**Async/Await** (introduced in C# 5.0 and popularized heavily by JavaScript ES2017) is a mathematical syntax sugar built directly on top of Promises.

<Callout icon="success" title="The Illusion of Synchrony">
  When you place the \`await\` keyword in front of a Promise, the compiler mathematically pauses the execution of that specific function until the Promise resolves. To the human reader, the code looks like standard, blocking, sequential code. But to the CPU, the thread is completely non-blocked and free to process other events.
</Callout>

## Under the Hood: State Machines

When the compiler (like V8 or Roslyn) encounters an \`async\` function containing an \`await\`, it does not just compile it normally. 

It mathematically transforms the entire function into a **Finite State Machine**. 
- It splits the function into chunks. 
- It executes Chunk 1, registers a callback on the Promise, and physically returns control to the Main Thread. 
- When the Promise resolves, the system invokes the callback, mathematically re-entering the State Machine at Chunk 2, perfectly restoring the local variables from the closure.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Lock-free data structures/index.mdx': `---
title: Lock-Free Data Structures
description: Data structures that guarantee that at least one thread always makes progress, without relying on traditional blocking mutexes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lock-Free Data Structures">

Traditional concurrent data structures (like a Thread-Safe Queue) are mathematically protected by Mutexes. If a thread wants to push an item, it acquires the Mutex, pushes the item, and releases the Mutex.

This creates a massive mathematical bottleneck. If the thread holding the Mutex crashes, or is put to sleep by the OS, **all other threads are permanently blocked**. The entire system halts.

**Lock-Free Data Structures** completely abandon Mutexes, relying entirely on physical CPU **Atomic Operations** (like Compare-And-Swap) to mathematically guarantee data integrity.

<Callout icon="warning" title="Extreme Mathematical Complexity">
  Writing a flawless Lock-Free Queue is considered one of the hardest mathematical tasks in Software Engineering. You must manually account for the ABA Problem, CPU memory reordering (Memory Fences), and microscopic race conditions between pointer assignments.
</Callout>

## The Progress Guarantee

Lock-Free mathematically guarantees system-wide progress. 

If multiple threads simultaneously attempt to mutate a Lock-Free Queue, the Compare-And-Swap (CAS) algorithm mathematically ensures that *at least one thread will succeed*. The threads that fail will instantly spin in a \`while\` loop, grab the new state, and try again. Even if 99 threads are suspended by the OS mid-operation, the 1 remaining thread can mathematically continue operating on the structure.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Software transactional memory/index.mdx': `---
title: Software Transactional Memory (STM)
description: A concurrency control mechanism analogous to database transactions for controlling access to shared memory in concurrent computing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Software Transactional Memory (STM)">

Managing Mutexes is mathematically prone to Deadlocks. Writing Lock-Free Data Structures is mathematically too difficult for mere mortals. 

**Software Transactional Memory (STM)** (championed by the Clojure and Haskell languages) asks: *"Why can't we just treat our computer's RAM exactly like a SQL Database?"*

<Callout icon="success" title="The ACID Promise in RAM">
  In a SQL database, if you want to update two rows safely, you wrap them in a \`BEGIN TRANSACTION\` and \`COMMIT\`. If anything fails, it mathematically rolls back. STM brings this exact paradigm to variables in RAM.
</Callout>

## How STM Mathematically Works

Instead of locking a variable, a thread enters an STM block. 
1. The thread takes a mathematical "snapshot" of the variables it wants to modify.
2. It performs all its complex math and logic entirely on its private snapshot (Optimistic Concurrency).
3. When it is finished, it attempts to \`COMMIT\` the snapshot back to main RAM.

If another thread happened to modify those variables while the first thread was working, the STM engine mathematically detects the collision, instantly discards the snapshot, and automatically forces the first thread to retry the entire block from the beginning. 

It is completely Deadlock-free by mathematical design.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Parallel algorithms/index.mdx': `---
title: Parallel Algorithms
description: An algorithm which can do multiple operations in a given time, designed to be executed simultaneously across multiple processing devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Parallel Algorithms">

A standard sequential algorithm mathematically executes one step at a time. A **Parallel Algorithm** mathematically splits the problem into independent chunks, executes them simultaneously across multiple CPU cores, and merges the final results.

<Callout icon="error" title="Amdahl's Law">
  Amdahl's Law is the brutal mathematical reality of Parallel Algorithms. It states that the maximum theoretical speedup of an algorithm is strictly limited by the portion of the algorithm that CANNOT be parallelized. 
  
  If 5% of your algorithm must be strictly sequential (e.g., merging the final results), the absolute maximum speedup you can EVER achieve—even if you have 1 million CPU cores—is exactly 20x.
</Callout>

## Embarrassingly Parallel vs. Tightly Coupled

<ComparisonTable 
  headers={['Type', 'Mathematical Definition', 'Example']}
  rows={[
    ['Embarrassingly Parallel', 'The dataset can be mathematically sliced into pieces that require absolutely zero communication with each other.', 'Rendering a 3D movie (each frame is rendered independently by a different server).'],
    ['Tightly Coupled', 'The mathematical steps are highly dependent on the results of adjacent steps, requiring constant synchronization.', 'Weather forecasting simulations (the wind in Sector A instantly affects the pressure in Sector B).']
  ]}
/>

## Common Architectures

- **MapReduce:** A framework that mathematically filters/sorts data (\`Map\`) on a massive cluster of independent nodes, and then aggregates the results (\`Reduce\`).
- **Divide and Conquer:** Parallelizing algorithms like Merge Sort by splitting the array in half and handing each half to a separate thread.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/SIMD/index.mdx': `---
title: Single Instruction, Multiple Data (SIMD)
description: A class of parallel computers in Flynn's taxonomy that describes computers with multiple processing elements that perform the same operation on multiple data points simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Single Instruction, Multiple Data (SIMD)">

When we think of Parallel Computing, we usually think of Threads (Multiple Instructions, Multiple Data). Thread 1 calculates AI, Thread 2 plays Audio.

**SIMD** is a completely different, mathematically devastating form of parallelism baked directly into physical CPU hardware (e.g., Intel AVX-512, ARM Neon). 

<Callout icon="tip" title="The Vector Processor">
  Instead of spawning a software thread, a SIMD instruction mathematically forces the physical CPU ALU to grab a massive array of numbers (a Vector) and apply a single mathematical operation to ALL of them in a single clock cycle.
</Callout>

## The Mathematical Speedup

Imagine you are rendering a video game, and you need to increase the brightness (add \`10\`) to 4 million pixels.

- **Standard CPU (Scalar):** Loops 4,000,000 times. In each loop, it issues an \`ADD\` instruction to 1 pixel.
- **SIMD CPU (Vector):** An Intel CPU with 512-bit SIMD registers can load 16 separate 32-bit integers into the CPU at the exact same time. It issues a single \`VPADDD\` instruction, which mathematically adds \`10\` to all 16 pixels simultaneously in a single clock cycle.

The algorithm is mathematically accelerated by 16x without ever spawning a single background thread or dealing with Mutexes.

</ConceptTemplate>
`,
}

async function generateMega80() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega80().catch(console.error)
