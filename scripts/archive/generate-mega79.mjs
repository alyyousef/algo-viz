import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '45. Parallel & Concurrent Computing/Processes/index.mdx': `---
title: Processes
description: An instance of a computer program that is being executed by one or many threads, representing the fundamental unit of resource allocation by the OS.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Processes">

When you double-click an \`.exe\` file (or run \`node app.js\`), the Operating System takes the static, lifeless code from the hard drive, loads it into RAM, and mathematically brings it to life as a **Process**.

A Process is mathematically the heaviest, most secure execution unit in Computer Science. It is an isolated island of execution.

<Callout icon="warning" title="Memory Isolation">
  The OS mathematically guarantees that Process A can NEVER access the memory of Process B. If your Chrome browser (Process A) crashes because of a memory leak, it mathematically cannot corrupt the RAM of your Spotify app (Process B). They exist in completely separate Virtual Memory spaces.
</Callout>

## Anatomy of a Process

When the OS creates a Process, it mathematically allocates a massive bundle of resources:
1. **The Code Segment:** The actual compiled machine code instructions.
2. **The Data Segment:** Global variables initialized by the programmer.
3. **The Heap:** A massive chunk of raw RAM used for dynamic allocations (\`malloc\` or \`new\`).
4. **The Stack:** The call stack that mathematically tracks which functions are currently executing and their local variables.
5. **File Descriptors:** Mathematical pointers to open files or network sockets.

Because a Process is so heavy, switching the CPU from executing Process A to Process B (a **Context Switch**) is mathematically very slow.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Threads/index.mdx': `---
title: Threads
description: The smallest sequence of programmed instructions that can be managed independently by a scheduler, typically as a component of a process.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Threads">

If a Process is a heavy, secure fortress, a **Thread** is the mathematically lightweight worker inside that fortress.

Every Process mathematically starts with exactly ONE Thread (the Main Thread). However, the program can ask the OS to spawn additional Threads inside the exact same Process.

<Callout icon="success" title="The Power of Shared Memory">
  Unlike Processes, which are mathematically isolated from each other, all Threads within a Process share the EXACT SAME Virtual Memory (The Heap). Thread 1 can allocate a massive 1GB array, and Thread 2 can instantly read from that exact same array without any data copying.
</Callout>

## Anatomy of a Thread

Because all Threads share the Process's overarching resources (Heap, File Descriptors, Code), a Thread is mathematically incredibly lightweight. 

A Thread only contains:
1. **A Program Counter (PC):** A mathematical pointer to the exact line of code this specific Thread is currently executing.
2. **Registers:** The CPU's fastest mathematical scratchpad.
3. **A Call Stack:** Every thread mathematically MUST have its own independent Call Stack, because Thread 1 might be executing \`calculateMath()\` while Thread 2 is executing \`downloadFile()\`.

Because they are lightweight, **Context Switching** between two Threads in the same Process is mathematically an order of magnitude faster than switching between two entirely different Processes.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Thread pools/index.mdx': `---
title: Thread Pools
description: A software design pattern for achieving concurrency of execution in a computer program, maintaining multiple threads waiting for tasks to be allocated.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Thread Pools">

Creating a brand new Thread is mathematically faster than creating a Process, but it is not "free". It requires the OS to allocate a new Call Stack (usually 1MB-8MB of RAM) and perform expensive mathematical kernel-level scheduling.

If a web server created a brand new Thread for every incoming HTTP request, and 10,000 requests hit simultaneously, the server would instantly run out of RAM and crash (10,000 * 8MB = 80GB of RAM just for stacks!).

<Callout icon="tip" title="The Thread Pool Pattern">
  A **Thread Pool** solves this by mathematically pre-allocating a fixed number of Threads (e.g., exactly 100) when the server boots up. These threads sit in an infinite \`while\` loop, waiting for tasks.
</Callout>

## How the Pool Mathematically Works

1. **The Task Queue:** Incoming HTTP requests are placed into a mathematical Queue (e.g., a LinkedList).
2. **The Workers:** The 100 Threads in the pool constantly monitor the queue.
3. **Execution:** Thread #1 grabs Request #1 from the queue, executes it, returns the HTTP Response, and then immediately goes back to the queue to grab Request #101.

If 10,000 requests hit the server, the Queue fills up to 10,000, but the OS only ever manages 100 actual Threads. The server mathematically protects its own RAM, guaranteeing it will not crash (though requests at the back of the queue will experience higher latency).

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Race conditions/index.mdx': `---
title: Race Conditions
description: A flaw in a system or process whereby the output and/or result of the process is unexpectedly dependent on the sequence or timing of other events.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Race Conditions">

A **Race Condition** is the most notorious, mathematically devastating bug in Concurrent Programming.

It occurs when multiple Threads attempt to read and write the exact same shared memory location simultaneously, and the final mathematical outcome strictly depends on the unpredictable microscopic timing of the CPU scheduler.

<Callout icon="error" title="The Classic Bank Bug">
  Imagine \`balance = $100\`.
  - **Thread 1** tries to add $50.
  - **Thread 2** tries to subtract $20.
  
  Mathematically, \`balance += 50\` is NOT a single CPU operation. It requires three steps:
  1. Read \`balance\` from RAM into CPU (\`100\`).
  2. Add \`50\` to the CPU register (\`150\`).
  3. Write \`150\` back to RAM.
</Callout>

## The Mathematical Collision

If Thread 1 and Thread 2 execute perfectly concurrently, this mathematical nightmare happens:

1. **Thread 1** reads \`100\`.
2. **Thread 2** reads \`100\`.
3. **Thread 1** adds \`50\` -> gets \`150\`.
4. **Thread 2** subtracts \`20\` -> gets \`80\`.
5. **Thread 1** writes \`150\` to RAM.
6. **Thread 2** writes \`80\` to RAM (overwriting Thread 1's work!).

The final balance is mathematically \`$80\`. The $50 deposit literally vanished into thin air. This is a Race Condition.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Deadlocks/index.mdx': `---
title: Deadlocks
description: A situation in concurrent computing where two or more competing actions are each waiting for the other to finish, resulting in a system freeze.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deadlocks">

If a Race Condition is the nightmare of data corruption, a **Deadlock** is the nightmare of system paralysis. 

A Deadlock is a mathematical state where two or more Threads are permanently blocked, because they are both holding a resource that the other thread mathematically requires to proceed.

<Callout icon="warning" title="The Classic Example">
  Imagine Thread A needs the Database Connection and the File System to save a user. Thread B needs the File System and the Database Connection to load a user.
  
  - Thread A locks the Database.
  - Thread B locks the File System.
  - Thread A tries to lock the File System (but must mathematically wait for B).
  - Thread B tries to lock the Database (but must mathematically wait for A).
  
  They will wait until the end of the universe. The server has mathematically frozen.
</Callout>

## The Four Coffman Conditions

Mathematically, a Deadlock CANNOT occur unless all four of these conditions are met simultaneously:

1. **Mutual Exclusion:** At least one resource must be non-shareable (e.g., only one thread can hold the DB Lock).
2. **Hold and Wait:** A thread is holding at least one resource while mathematically waiting to acquire others.
3. **No Preemption:** The OS cannot mathematically forcibly steal the lock away from a thread; the thread must willingly release it.
4. **Circular Wait:** There exists a mathematical loop of threads (\`T1 -> T2 -> T3 -> T1\`) where each is waiting on the next.

If an engineer can mathematically break even *one* of these four conditions, the system is permanently immune to Deadlocks.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Synchronisation/index.mdx': `---
title: Synchronization
description: Mechanisms that ensure that two or more concurrent processes or threads do not simultaneously execute some particular program segment known as a critical section.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Synchronization">

**Synchronization** is the mathematical discipline of writing code that safely navigates Race Conditions and Deadlocks. It is the process of coordinating the execution of multiple threads to mathematically guarantee data integrity.

<Callout icon="info" title="The Critical Section">
  A **Critical Section** is any block of code that accesses shared memory (like updating the \`bank_balance\`). The mathematical goal of all Synchronization primitives is to ensure that *only one thread can ever be inside a Critical Section at a time*.
</Callout>

## The Cost of Synchronization

You cannot achieve mathematical safety for free. Synchronization primitives (like Locks and Mutexes) inherently reduce performance because they force Parallel execution back into **Sequential** execution.

If you have 8 CPU cores, and all 8 threads need to enter the Critical Section to update the balance, 7 of those cores are mathematically forced to sleep while 1 core does the work.

Writing highly concurrent software is an extreme mathematical balancing act: making the Critical Sections as unbelievably tiny as possible, so the threads spend 99% of their time running in parallel, and only 1% of their time waiting in line.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Mutexes/index.mdx': `---
title: Mutexes
description: A synchronization primitive used to protect shared data structures from concurrent modifications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mutexes (Mutual Exclusion)">

A **Mutex** (Mutual Exclusion Object) is the most fundamental mathematical tool used to prevent Race Conditions.

Think of a Mutex as a mathematical "Talking Stick" in a meeting. If there are 10 people in the room, only the person physically holding the Talking Stick is legally allowed to speak (modify the shared data).

<Callout icon="success" title="How it solves the Race Condition">
  Thread 1 mathematically asks the OS: "Give me the Mutex." The OS hands it over. Thread 1 enters the Critical Section.
  Thread 2 mathematically asks the OS: "Give me the Mutex." The OS sees Thread 1 holds it, so the OS immediately mathematically puts Thread 2 to sleep (Suspended State).
  When Thread 1 is done, it releases the Mutex. The OS wakes Thread 2 up and hands it the Mutex.
</Callout>

## The Mathematics of Mutexes

Mutexes are typically provided directly by the Operating System Kernel (e.g., \`pthread_mutex_t\` in Linux). 

Because acquiring a Mutex requires a mathematical "System Call" into the OS Kernel, it is heavily penalized in terms of performance (often taking thousands of CPU cycles). 

Modern languages often use "Futexes" (Fast Userspace Mutexes), which mathematically attempt to lock the resource without involving the Kernel at all, only calling the Kernel if the resource is currently contested by another thread.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Locks/index.mdx': `---
title: Locks
description: An abstract synchronization mechanism for enforcing limits on access to a resource in an environment where there are many threads of execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Locks">

While "Mutex" usually refers to the low-level mathematical object provided by the Operating System, a **Lock** is a higher-level abstract concept provided by programming languages (like Java's \`ReentrantLock\` or C#'s \`lock\` statement).

All Mutexes are Locks, but not all Locks are Mutexes.

<Callout icon="tip" title="Spinlocks vs. Mutexes">
  If a thread asks for a Mutex and it is unavailable, the OS puts the thread to sleep. Waking it up later is mathematically slow.
  
  A **Spinlock** takes a different approach. Instead of sleeping, the thread sits in an infinite, blazing-fast \`while\` loop, checking the lock billions of times a second until it becomes available. Spinlocks waste 100% of the CPU core's power, but they acquire the lock mathematically instantly the millisecond it frees up.
</Callout>

## Types of Higher-Level Locks

<ComparisonTable 
  headers={['Lock Type', 'Mathematical Behavior', 'Use Case']}
  rows={[
    ['Reentrant Lock', 'Allows the *same* thread to acquire the exact same lock multiple times without causing a Deadlock against itself.', 'When a locked function recursively calls another function that requires the same lock.'],
    ['Read-Write Lock', 'Mathematically allows 100 threads to read the data simultaneously, but enforces strict Mutual Exclusion if any thread wants to Write.', 'Data structures that are read thousands of times a second, but only updated once an hour (e.g., Application Configs).']
  ]}
/>

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Semaphores/index.mdx': `---
title: Semaphores
description: A variable or abstract data type used to control access to a common resource by multiple processes and avoid critical section problems in a concurrent system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semaphores">

Invented by legendary computer scientist Edsger Dijkstra in 1962, a **Semaphore** is a mathematical integer used to synchronize threads.

If a Mutex is a "Talking Stick" that only 1 person can hold, a Semaphore is a "Bouncer at a Nightclub" that mathematically allows exactly \`N\` people into the club.

<Callout icon="success" title="The Counting Semaphore">
  If you have a Thread Pool of 1000 workers, but your database can mathematically only handle 50 concurrent connections, you initialize a Semaphore with the number \`50\`.
  Every time a thread wants to query the DB, it calls \`wait()\`, decreasing the Semaphore to 49. If the Semaphore hits \`0\`, the 51st thread is put to sleep until another thread finishes and calls \`signal()\` (increasing it back to 1).
</Callout>

## Binary Semaphores vs Mutexes

A Semaphore initialized with a maximum value of \`1\` is mathematically called a **Binary Semaphore**. 

While a Binary Semaphore acts identically to a Mutex (only allowing 1 thread in at a time), there is a crucial mathematical difference in Ownership:

- **Mutex:** Only the thread that physically *acquired* the Mutex is mathematically allowed to *release* it.
- **Semaphore:** A Semaphore has no concept of ownership. Thread A can call \`wait()\` (decreasing it to 0), and Thread B can completely independently call \`signal()\` (increasing it to 1). This mathematical quirk makes Semaphores incredibly powerful for complex inter-thread signaling.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/Memory models/index.mdx': `---
title: Memory Models (Sequential Consistency vs Relaxed)
description: The set of rules that dictate how threads interact through shared memory, specifically defining the allowed behaviors of memory reads and writes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Memory Models">

The most mind-bending reality of modern Computer Science is this: **The code you write is not the code that executes.**

To achieve blazing speeds, both the Compiler (like GCC) and the physical CPU (like an Intel Core i9) are mathematically allowed to completely re-order your lines of code. If you write \`A = 1\` and then \`B = 2\`, the CPU might physically execute \`B = 2\` first, assuming it believes the variables are mathematically unrelated.

<Callout icon="warning" title="The Concurrent Catastrophe">
  This reordering is perfectly safe for a single thread. But in a multi-threaded program, Thread 2 might mathematically rely on the fact that \`A\` was assigned before \`B\`. If the CPU secretly reordered them, the program will experience an impossible, untraceable mathematical bug.
</Callout>

## Understanding Memory Models

A **Memory Model** is the strict mathematical contract between the Programmer and the CPU/Compiler regarding exactly how much reordering is legally allowed.

<ComparisonTable 
  headers={['Memory Model', 'The Mathematical Rule', 'Implication']}
  rows={[
    ['Sequential Consistency', 'The holy grail. All threads mathematically see all memory writes happen in the exact, literal order written in the source code.', 'Easy for human brains to understand. Brutally slow for CPUs, as it completely disables hardware-level out-of-order execution.'],
    ['Relaxed Ordering', 'Total mathematical anarchy. Threads are allowed to see memory writes happen in completely different orders.', 'Blazing fast, but requires the programmer to manually insert mathematical "Memory Barriers" (Fences) to forcibly stop the CPU from reordering critical lines of code.']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega79() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega79().catch(console.error)
