import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/45. Parallel & Concurrent Computing/Processes/index.mdx': `---
title: Processes
description: "An instance of a computer program that is being executed by one or many threads."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Processes">

When you write a C program, it sits on your hard drive as an inert binary file (an executable). 

When you double-click that file, the Operating System loads it into RAM, assigns it a Process ID (PID), and begins executing it. It transforms from a static file into a **Process**.

## 1. The Anatomy of a Process
Every process is given its own isolated virtual address space by the OS. It cannot directly read the memory of any other process. The memory is divided into segments:
- **Text (Code)**: The compiled machine code instructions.
- **Data**: Global and static variables.
- **Heap**: Memory dynamically allocated at runtime (e.g., using TICK1malloc()TICK1 in C).
- **Stack**: Local variables and function call frames. Grows and shrinks as functions are called and return.

## 2. Context Switching
If your CPU only has 4 cores, how can you run Spotify, Chrome, Discord, and VS Code simultaneously?

The OS uses a **Scheduler**. It runs Process A for 10 milliseconds, halts it, saves its exact state (registers, program counter), and swaps in Process B for 10 milliseconds. This is called a **Context Switch**. Because it happens hundreds of times per second, it creates the illusion of parallel execution.

<Callout icon="warning" title="Heavyweight">
Creating a new process (e.g., via TICK1fork()TICK1 in Linux) is very expensive. The OS must duplicate the entire memory space and setup new tables. Furthermore, because processes are isolated, communicating between them requires complex **Inter-Process Communication (IPC)** like Pipes, Sockets, or Shared Memory.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/45. Parallel & Concurrent Computing/Threads/index.mdx': `---
title: Threads
description: "The smallest sequence of programmed instructions that can be managed independently by a scheduler."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Threads">

If a Process is a house, a **Thread** is a person living inside that house.

A Process provides the memory space (the Heap, the global variables). A Thread is the actual path of execution running through the code. Every process starts with exactly one "Main Thread", but it can spawn dozens of additional threads.

## 1. Process vs Thread

<ComparisonTable 
  headers={['Feature', 'Processes', 'Threads']} 
  rows={[
    ['Memory', 'Isolated. Process A cannot see Process B\\'s memory.', 'Shared. All threads within a process share the exact same Heap and Global variables.'],
    ['Creation Cost', 'Heavyweight. Takes time and memory to clone a process.', 'Lightweight. Fast to spawn and destroy.'],
    ['Context Switching', 'Expensive. CPU must flush caches and swap memory maps.', 'Cheap. CPU only needs to swap registers, as the memory map remains identical.'],
    ['Failure', 'If a child process crashes, the parent survives.', 'If one thread crashes (e.g., Segfault), it brings down the entire process and all other threads.']
  ]} 
/>

## 2. Why Use Threads?
Imagine writing a web server. If you use a single thread, and User A requests a massive file from the hard drive, the CPU stops and waits for the disk. If User B tries to connect while the disk is spinning, their request is completely ignored. 

By spawning a new Thread for every user connection, the OS can pause Thread A (waiting for the disk) and instantly context-switch to Thread B to serve the second user. 

## 3. The Danger of Shared State
Because threads share the same Heap memory, Thread 1 and Thread 2 can easily try to read and write to the exact same variable at the exact same millisecond. This leads to the most notorious bugs in computer science: **Race Conditions**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/45. Parallel & Concurrent Computing/Race conditions/index.mdx': `---
title: Race Conditions
description: "A flaw that occurs when the timing or order of events affects a program's correctness, typically when multiple threads access shared data."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Race Conditions">

A **Race Condition** occurs when two or more threads attempt to access shared data simultaneously, and at least one thread is modifying it. The final state of the data depends on the unpredictable "race" of which thread finishes last.

## 1. The Classic Example: Bank Account
Imagine a shared variable: TICK1balance = 100TICK1.
Thread A wants to deposit $10. Thread B wants to deposit $20. 
The final balance *should* be $130.

The code for depositing looks like one line: TICK1balance = balance + amountTICK1.
However, at the CPU instruction level, this is **three separate steps**:
1. Read TICK1balanceTICK1 from RAM into a CPU register.
2. Add TICK1amountTICK1 to the register.
3. Write the register back to RAM.

### The Race
- **Thread A** reads TICK1balanceTICK1 (100).
- *[Context Switch! The OS pauses Thread A and starts Thread B]*
- **Thread B** reads TICK1balanceTICK1 (100).
- **Thread B** adds 20, and writes 120 back to RAM.
- *[Context Switch! Thread A resumes]*
- **Thread A** (who still has 100 in its local register) adds 10, and writes 110 back to RAM.

**The final balance is 110.** Thread B's deposit was completely overwritten and erased from existence.

<Callout icon="warning" title="Heisenbugs">
Race conditions are notoriously difficult to debug because they only occur under very specific, microscopic timing overlaps. When you try to debug them (by adding TICK1printTICK1 statements or using a debugger), the timing changes, and the bug magically disappears. These are known as **Heisenbugs**.
</Callout>

## 2. The Solution
To prevent race conditions, you must ensure that the Read-Modify-Write cycle is **Atomic** (indivisible). Once a thread starts modifying a shared variable, all other threads must be locked out until it finishes. This is achieved using synchronization primitives like **Mutexes**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/45. Parallel & Concurrent Computing/Mutexes/index.mdx': `---
title: Mutexes (Mutual Exclusion)
description: "A synchronization primitive used to prevent multiple threads from concurrently accessing a shared resource."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Mutexes (Mutual Exclusion)">

A **Mutex** (Mutual Exclusion object) is the standard solution to Race Conditions. It acts like a key to a bathroom door. Only one person can hold the key at a time. If the bathroom is occupied, anyone else who wants to enter must wait in line outside.

## 1. How It Works
Before a thread enters a **Critical Section** (the part of the code that modifies shared data), it must acquire the Mutex.

${TICK3}c
pthread_mutex_t lock;
int shared_balance = 100;

void deposit(int amount) {
    // 1. Acquire the lock (Wait here if someone else has it)
    pthread_mutex_lock(&lock);
    
    // --- CRITICAL SECTION ---
    shared_balance = shared_balance + amount;
    // ------------------------
    
    // 2. Release the lock (Wake up the next thread in line)
    pthread_mutex_unlock(&lock);
}
${TICK3}

If Thread A calls TICK1lock()TICK1, it gets the key. If Thread B calls TICK1lock()TICK1 a microsecond later, the OS will put Thread B to sleep. Thread B is physically blocked from executing until Thread A calls TICK1unlock()TICK1.

## 2. Mutex vs Semaphore

<ComparisonTable 
  headers={['Primitive', 'Analogy', 'Use Case']} 
  rows={[
    ['Mutex', 'A single bathroom key.', 'Exclusive access. Only ONE thread can touch this variable at a time.'],
    ['Semaphore', 'A bouncer at a club that allows exactly 5 people in.', 'Resource limiting. Allowing exactly N threads to access a connection pool.']
  ]} 
/>

## 3. The Cost of Locking
Mutexes solve data corruption, but they destroy performance. If 10 threads try to access the balance at once, 9 of them are put to sleep. You have effectively turned your highly parallel application back into a slow, sequential application.

Furthermore, if a thread acquires a lock and then crashes (or forgets to call TICK1unlock()TICK1), all other threads will wait forever.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/45. Parallel & Concurrent Computing/Deadlocks/index.mdx': `---
title: Deadlocks
description: "A situation where two or more threads are permanently blocked, each waiting on the other to release a resource."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Deadlocks">

While Mutexes solve Race Conditions, they introduce a terrifying new problem: **Deadlocks**. A deadlock occurs when two or more threads are stuck waiting for each other forever, causing the program to permanently freeze.

## 1. The Classic Deadlock Scenario
Imagine two threads, and two mutexes (Lock A and Lock B).

1. **Thread 1** acquires **Lock A**.
2. **Thread 2** acquires **Lock B**.
3. **Thread 1** attempts to acquire **Lock B** (but it must wait for Thread 2 to release it).
4. **Thread 2** attempts to acquire **Lock A** (but it must wait for Thread 1 to release it).

Neither thread can proceed. They will wait for eternity. The application is frozen and must be forcefully killed by the operating system.

## 2. The Coffman Conditions
In 1971, Edward Coffman outlined the four conditions that must *all* be present for a deadlock to occur. Breaking just one of these prevents deadlocks:

1. **Mutual Exclusion**: Resources cannot be shared. (If multiple threads can read data simultaneously, no deadlock).
2. **Hold and Wait**: A thread holds one resource while waiting for another.
3. **No Preemption**: A lock cannot be forcefully taken away from a thread by the OS.
4. **Circular Wait**: Thread 1 waits for Thread 2, who waits for Thread 3, who waits for Thread 1.

## 3. Prevention Strategies
The most common way to prevent deadlocks in software engineering is breaking the **Circular Wait** condition via **Lock Ordering**.

If your application dictates a strict, global rule: *"Lock A must ALWAYS be acquired before Lock B"*, then the scenario above becomes impossible. Thread 2 would be forced to wait for Lock A *before* it was allowed to acquire Lock B.

<Callout icon="info" title="The Dining Philosophers">
The most famous illustration of deadlocks is Dijkstra's "Dining Philosophers" problem. Five philosophers sit at a round table with five forks between them. They need two forks to eat. If everyone picks up their left fork simultaneously, no right forks remain, and they all starve to death waiting.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/45. Parallel & Concurrent Computing/Semaphores/index.mdx': `---
title: Semaphores
description: "A synchronization primitive consisting of an integer variable used to control access to a common resource by multiple processes or threads."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semaphores">

Invented by Edsger W. Dijkstra in 1962, a **Semaphore** is a synchronization tool similar to a Mutex, but instead of providing exclusive (1-person) access, it controls access based on a specific counter.

## 1. The Integer Counter
A semaphore is essentially just an integer variable with two atomic operations:
- **wait()** (historically TICK1PTICK1 or TICK1downTICK1): If the counter is > 0, decrement it by 1 and proceed. If the counter is 0, put the thread to sleep until it becomes > 0.
- **signal()** (historically TICK1VTICK1 or TICK1upTICK1): Increment the counter by 1. If any threads are sleeping on this semaphore, wake one of them up.

## 2. Binary vs Counting Semaphores

### Binary Semaphore (Value initialized to 1)
Behaves almost identically to a Mutex. It guarantees Mutual Exclusion.
*Difference:* A Mutex has "ownership" (the thread that locked it must unlock it). A Binary Semaphore has no ownership; Thread A can call TICK1wait()TICK1, and Thread B can call TICK1signal()TICK1.

### Counting Semaphore (Value initialized to N)
Used to manage a finite pool of resources. 

**Example: A Database Connection Pool.**
You have a pool of 5 connections to Postgres. You initialize a Semaphore to TICK15TICK1.
- 5 threads call TICK1wait()TICK1. The counter hits TICK10TICK1. All 5 get a connection.
- A 6th thread calls TICK1wait()TICK1. Because the counter is TICK10TICK1, the 6th thread is blocked and goes to sleep.
- When one of the first 5 threads finishes, it calls TICK1signal()TICK1. The counter ticks to 1, instantly waking up the 6th thread and giving it the connection.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/45. Parallel & Concurrent Computing/async-await/index.mdx': `---
title: Async/Await
description: "Syntactic sugar that allows developers to write non-blocking, asynchronous code that looks and behaves like synchronous code."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Async / Await">

In modern applications (especially Node.js, Python, and C#), most waiting is not bound by the CPU, but by I/O (Input/Output). Waiting for a network request to return, or a hard drive to spin, takes millions of CPU cycles. 

Instead of spawning expensive OS Threads to wait for I/O, modern languages use an Event Loop and **Asynchronous Programming**.

## 1. The Problem with Callbacks & Promises
Historically, non-blocking code was written using Callbacks, leading to unreadable "Callback Hell". This was improved by **Promises** (or Futures), but the syntax still involved chaining TICK1.then()TICK1 blocks, which made control flow (loops and try/catch blocks) difficult.

## 2. The Syntactic Sugar
TICK1async/awaitTICK1 is syntactic sugar built perfectly on top of Promises. It allows you to write non-blocking code that reads top-to-bottom as if it were blocking.

${TICK3}javascript
// The Old Way (Promises)
function fetchUser() {
  fetch('api/user')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

// The Modern Way (Async/Await)
async function fetchUser() {
  try {
    // Execution pauses here and yields control back to the Event Loop
    const response = await fetch('api/user'); 
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
${TICK3}

## 3. How It Works Under the Hood
When the JavaScript engine hits the TICK1awaitTICK1 keyword, it does *not* block the OS thread. Instead, it pauses the execution of *that specific function*, saves its state, and yields control back to the central Event Loop. The Event Loop is now free to execute other functions or serve other users. When the network request finally finishes 100ms later, the Event Loop resumes the TICK1fetchUserTICK1 function exactly where it left off.

<Callout icon="warning" title="Coloring Problem">
A common criticism of Async/Await is the "Function Coloring Problem". If you want to use TICK1awaitTICK1 inside a function, that function must be marked TICK1asyncTICK1. If a normal synchronous function calls your new TICK1asyncTICK1 function, it must also be updated to be TICK1asyncTICK1, causing the async "color" to rapidly bleed all the way up your codebase.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/45. Parallel & Concurrent Computing/Actor model/index.mdx': `---
title: Actor Model
description: "A conceptual model of concurrent computation that treats 'Actors' as the universal primitive of concurrent execution."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="The Actor Model">

In traditional multithreading, multiple threads share the same memory (which leads to Race Conditions), requiring Mutexes (which lead to Deadlocks). 

The **Actor Model** (popularized by Erlang and Akka/Scala) completely abandons shared memory. It solves concurrency by strictly enforcing that state is isolated, and entities only communicate by passing immutable messages.

## 1. What is an Actor?
An Actor is a tiny, independent entity that contains:
1. **Private State**: Variables that *absolutely no one else* can read or write.
2. **A Mailbox**: A queue of incoming messages.
3. **Behavior**: Logic that dictates what to do when a message is processed.

When an Actor pulls a message from its mailbox, it can do three things:
- Alter its own private state.
- Create new child Actors.
- Send a message to another Actor's mailbox.

Because an Actor processes its mailbox strictly one message at a time, sequentially, **Race Conditions are impossible by design**. You never need a Mutex.

## 2. Shared Memory vs Actor Model

<ComparisonTable 
  headers={['Feature', 'Shared Memory (Threads)', 'Actor Model']} 
  rows={[
    ['State', 'Global and shared. Accessible by everyone.', 'Strictly private and isolated.'],
    ['Communication', 'Threads write to the same variables in RAM.', 'Actors asynchronously mail immutable messages to each other.'],
    ['Safety', 'Prone to Race Conditions and Deadlocks.', 'Inherently thread-safe.'],
    ['Distribution', 'Threads must live on the same physical CPU/Motherboard.', 'Because communication is just message passing, Actor A can live on a server in New York, and Actor B in Tokyo, and the code looks identical.']
  ]} 
/>

## 3. "Let it Crash"
In Erlang, millions of highly lightweight Actors can run simultaneously. If one Actor encounters a bug, it simply crashes and dies. Its "Supervisor" Actor notices it died, and simply spawns a fresh, clean replacement Actor to take its place. This philosophy ("Let it Crash") is how systems built on the Actor Model achieve 99.9999999% uptime.

</ConceptTemplate>
`,
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
