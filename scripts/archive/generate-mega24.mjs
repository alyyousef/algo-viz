import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/10. Operating Systems/Scheduling algorithms (round-robin/index.mdx': `---
title: CPU Scheduling (Round-Robin)
description: The most common and fundamental time-sharing scheduling algorithm used by operating systems to create the illusion of multitasking.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CPU Scheduling (Round-Robin)">

If your computer only has 4 CPU cores, how can it run 200 background processes at the same time? 

It can't. The OS Kernel's **Scheduler** rapidly switches the CPU between the 200 processes thousands of times a second. The most famous and historically significant algorithm for doing this is **Round-Robin (RR)**.

## How Round-Robin Works

Round-Robin is designed to be perfectly fair. It uses a hardware timer to enforce a strict **Time Quantum** (or Time Slice), which is usually around 10 to 100 milliseconds.

1. The Scheduler takes all the "Ready" processes and puts them in a circular queue (a circle).
2. It gives the CPU to Process 1.
3. Once Process 1 has run for exactly one Time Quantum (e.g., 10ms), the hardware timer interrupts the CPU.
4. The Scheduler violently yanks Process 1 off the CPU (a Context Switch), puts it at the back of the queue, and gives the CPU to Process 2. 
5. This repeats infinitely.

<Callout icon="warning" title="The Quantum Tradeoff">
  - If the Quantum is too large (e.g., 2 seconds), the computer feels incredibly laggy because you have to wait 2 seconds for your mouse movement process to get a turn on the CPU.
  - If the Quantum is too small (e.g., 1 millisecond), the OS spends 90% of its time performing computationally expensive Context Switches, wasting the CPU's power on administrative overhead instead of actual work.
</Callout>

## Interactive vs CPU-Bound

Round-Robin works decently well, but it treats all processes equally. This is actually a flaw. A video rendering program (CPU-Bound) will happily chew up its entire 10ms slice. But a text editor (Interactive) spends 9.9ms waiting for the user to type a key, and only uses 0.1ms of CPU time. Round-Robin is too simple to optimize for this, leading to the invention of MLFQ and CFS.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/priority/index.mdx': `---
title: Priority Scheduling
description: A scheduling algorithm where processes are assigned absolute rankings, ensuring critical tasks are executed before background tasks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Priority Scheduling">

While Round-Robin treats every program fairly, operating systems do not actually want to be fair. 

The process rendering your mouse cursor *must* get CPU time immediately when you move your hand, otherwise the computer feels broken. Conversely, a background Dropbox sync process can safely wait a few seconds. 

**Priority Scheduling** assigns a strict numerical rank to every process. The Scheduler will always choose the process with the highest priority to run next.

## Preemptive vs Non-Preemptive

- **Non-Preemptive**: If a high-priority process wakes up, it waits patiently in line until the currently running low-priority process finishes its work.
- **Preemptive**: If a high-priority process wakes up, the Scheduler instantly pauses the low-priority process, kicks it off the CPU mid-calculation, and gives the CPU to the high-priority task. (All modern OSs use preemptive scheduling).

## The Starvation Problem

Strict Priority Scheduling has a fatal flaw called **Starvation**. 
If a low-priority task is waiting for the CPU, but high-priority tasks keep waking up and demanding CPU time, the low-priority task will literally never execute. It starves to death.

<Callout icon="info" title="The MIT Starvation Incident">
  In 1973, when MIT shut down their massive IBM 7094 mainframe, they found a low-priority process that had been submitted in 1967. It had been starving for 6 years because higher-priority tasks constantly kept it off the CPU.
</Callout>

### The Solution: Aging
To prevent Starvation, operating systems use a technique called **Aging**. Every minute a process spends waiting in the queue without getting CPU time, the Scheduler artificially boosts its priority. Eventually, even the lowest-priority background task will age into a high-priority task, ensuring it gets at least a brief turn on the CPU.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/CFS/index.mdx': `---
title: Completely Fair Scheduler (CFS)
description: The highly advanced, mathematically elegant CPU scheduling algorithm that powered the Linux Kernel from 2007 to 2023.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Completely Fair Scheduler (CFS)">

The **Completely Fair Scheduler (CFS)**, written by Ingo Molnár, was the default CPU scheduler in the Linux Kernel from version 2.6.23 (2007) until version 6.6 (2023). 

Unlike legacy schedulers that relied on complex heuristics, fixed time slices, and multiple priority queues, CFS used a mathematically pure approach based on an idealized concept of a "perfect multitasking CPU."

<Callout icon="success" title="The Perfect CPU">
  Imagine a perfect CPU. If there are 4 processes running, a perfect CPU wouldn't switch between them. It would run all 4 simultaneously, perfectly dividing its power so each gets exactly 25% of the CPU's processing power at all times. 
  CFS attempts to emulate this perfect CPU on real hardware.
</Callout>

## How CFS Works (The Red-Black Tree)

CFS does not use queues or fixed Time Quantums. Instead, it tracks a metric for every process called **vruntime (Virtual Runtime)**—the exact amount of nanoseconds a process has spent running on the CPU.

1. CFS stores all runnable processes in a highly efficient **Red-Black Tree** (a self-balancing binary search tree), sorted by their \\\`vruntime\\\`. 
2. The process that has spent the *least* amount of time on the CPU (the one that has been most starved) is always at the leftmost node of the tree.
3. The Scheduler simply picks the leftmost node, runs it for a few milliseconds, and updates its \\\`vruntime\\\`. 
4. Because its \\\`vruntime\\\` increased, it is mathematically re-inserted further to the right in the tree. The next most-starved process is now the new leftmost node.

## Priority via Weights

How does CFS handle Priority if it's "Completely Fair"? 
It scales the flow of time. A high-priority task's \\\`vruntime\\\` increases *slower* than normal, keeping it on the left side of the tree and ensuring it gets picked by the scheduler much more frequently than a low-priority task.

*(Note: In Linux 6.6, CFS was finally replaced by EEVDF (Earliest Eligible Virtual Deadline First) to better address latency issues on modern massive multi-core servers).*

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/MLFQ)/index.mdx': `---
title: Multi-Level Feedback Queue (MLFQ)
description: The brilliant scheduling algorithm that learns the behavior of processes on the fly to optimize both responsiveness and throughput.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Level Feedback Queue (MLFQ)">

While Linux historically used CFS, Windows and macOS historically relied on variations of the **Multi-Level Feedback Queue (MLFQ)**.

The Scheduler has two conflicting goals:
1. **Interactive Tasks (Keyboard/Mouse)**: Must respond in under 10ms, but they use very little total CPU time.
2. **CPU-Bound Tasks (Video Rendering)**: Don't care about responsiveness, but they need massive amounts of total CPU time.

Because the OS doesn't know if a new process is a video game or a video renderer, MLFQ is designed to **learn the behavior of the program on the fly**.

## The Architecture of MLFQ

MLFQ consists of multiple strict Priority Queues.
- **Queue 1 (Highest Priority)**: Has a very small time slice (e.g., 10ms).
- **Queue 2 (Medium Priority)**: Has a medium time slice (e.g., 50ms).
- **Queue 3 (Lowest Priority)**: Has a massive time slice (e.g., 200ms).

<Callout icon="info" title="The Rules of MLFQ">
  1. **New processes start at the top**: When a program opens, the OS assumes it is highly interactive. It places it in Queue 1.
  2. **The CPU Hog Penalty**: If the process uses its entire 10ms time slice without pausing, the OS realizes it is a CPU-hog (e.g., a video renderer). As punishment, it demotes the process down to Queue 2. If it hogs the CPU again, it gets demoted to Queue 3.
  3. **The Interactive Reward**: If the process gives up the CPU *before* its time slice ends (e.g., it pauses to wait for a keyboard press), the OS rewards it by keeping it in the High Priority queue. 
</Callout>

## The Brilliant Result

The result is magical. 
Heavy, background rendering tasks are quickly filtered down to the bottom queue, where they are given massive 200ms time slices to efficiently crunch numbers without context-switching overhead. 

Meanwhile, highly interactive tasks (like the UI thread of a web browser) stay at the very top queue. They get the CPU instantly the millisecond you click the mouse, ensuring the computer feels buttery smooth, even while rendering a video in the background.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Synchronisation/index.mdx': `---
title: Thread Synchronization
description: The mechanisms and rules required to safely coordinate multiple threads accessing the exact same shared memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Thread Synchronization">

Because all Threads within a Process share the exact same Heap Memory, multi-threaded programming is incredibly dangerous.

If Thread A and Thread B are running on two different CPU cores, and they both try to read, modify, and write to the same variable in RAM at the exact same nanosecond, the data will be silently corrupted. 

**Synchronization** is the set of tools (Locks, Mutexes, Semaphores) provided by the Operating System to strictly control which thread is allowed to access shared memory at any given time.

## The Critical Section

The piece of code where a thread accesses shared memory (like updating a global counter, or modifying a shared linked list) is called the **Critical Section**.

A proper synchronization mechanism must enforce three absolute rules for the Critical Section:

1. **Mutual Exclusion**: If Thread A is currently inside the critical section, Thread B *must absolutely not* be allowed to enter it. Thread B must wait outside.
2. **Progress**: If the critical section is currently empty, and Thread A wants to enter, it should be allowed to enter immediately.
3. **Bounded Waiting (No Starvation)**: If Thread A is waiting to enter the critical section, there must be a mathematical guarantee that it will eventually get in, rather than waiting infinitely while other threads cut the line.

<Callout icon="warning" title="The Cost of Synchronization">
  Synchronization destroys Parallelism. If you have 8 CPU cores, but all 8 threads are waiting in line to access a single Mutex lock, your program is effectively running on 1 core. The other 7 cores are paused, completely wasting their processing power.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Race conditions/index.mdx': `---
title: Race Conditions
description: A catastrophic software bug that occurs when the timing of multi-threaded execution alters the behavior and output of a program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Race Conditions">

A **Race Condition** is the specific bug that occurs when Synchronization is not implemented correctly. It happens when two threads "race" to access the same shared variable, and the final output of the program depends entirely on which thread happened to win the race.

Race conditions are notoriously difficult to debug because they are non-deterministic. A program might run flawlessly 9,999 times in a row, and crash on the 10,000th time simply because a background CPU interrupt caused Thread A to be delayed by a single nanosecond.

## The Classic \\\`i++\\\` Example

Imagine a bank account with a shared variable \\\`balance = 100\\\`.
Thread 1 and Thread 2 both execute the code: \\\`balance = balance + 50\\\`.
The final balance should be \\\`200\\\`.

However, the CPU does not execute \\\`balance = balance + 50\\\` in one step. It translates it into three machine instructions:
1. **LOAD** \\\`balance\\\` from RAM into a CPU Register.
2. **ADD** 50 to the Register.
3. **STORE** the Register back into RAM.

### The Catastrophic Interleaving
Because the OS Scheduler can Context Switch a thread at *any* moment, the execution can interleave like this:

- **Thread 1:** executes **LOAD**. (Reads \\\`100\\\` into its register).
- *(Context Switch! The OS forcefully pauses Thread 1)*
- **Thread 2:** executes **LOAD**. (Reads \\\`100\\\` from RAM into its register).
- **Thread 2:** executes **ADD 50**. (Its register is now \\\`150\\\`).
- **Thread 2:** executes **STORE**. (RAM is updated to \\\`150\\\`).
- *(Context Switch! The OS resumes Thread 1)*
- **Thread 1:** resumes where it left off. It executes **ADD 50** to *its* saved register. (100 + 50 = \\\`150\\\`).
- **Thread 1:** executes **STORE**. (Overwrites RAM with \\\`150\\\`).

**The final balance is 150, not 200.** Thread 2's deposit was completely erased because Thread 1 was holding a stale value in its register during the context switch.

<Callout icon="success" title="The Fix">
  To prevent this, the three instructions (LOAD, ADD, STORE) must be executed **Atomically** (meaning they cannot be interrupted mid-execution). This is achieved by wrapping the code in a Mutex lock.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Mutexes/index.mdx': `---
title: Mutexes (Mutual Exclusion)
description: The simplest and most fundamental locking mechanism used to protect shared memory from Race Conditions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mutexes (Mutual Exclusion)">

A **Mutex** (short for Mutual Exclusion) is a software lock provided by the Operating System used to protect a Critical Section of code. 

Think of a Mutex as a single physical key to a public restroom. 
- If the restroom (Critical Section) is empty, Thread A grabs the key, locks the door behind it, and goes inside.
- If Thread B arrives, it cannot get in because Thread A has the key. Thread B is forced to sit outside and wait (it goes to sleep).
- When Thread A is finished, it unlocks the door and hands the key to Thread B.

## How to use a Mutex

In code, using a mutex looks like this:

\\\`\\\`\\\`c
pthread_mutex_lock(&my_mutex);   // Thread acquires the lock
balance = balance + 50;          // CRITICAL SECTION (Safe!)
pthread_mutex_unlock(&my_mutex); // Thread releases the lock
\\\`\\\`\\\`

If Thread 1 calls \\\`lock()\\\`, it succeeds. If Thread 2 calls \\\`lock()\\\` a microsecond later, the Operating System intercepts the call, immediately suspends Thread 2, and places it in a Waiting Queue. 

This is incredibly efficient. Because Thread 2 is put to sleep by the OS, it consumes exactly 0% of the CPU while it waits for Thread 1 to finish. When Thread 1 calls \\\`unlock()\\\`, the OS automatically wakes Thread 2 back up.

<Callout icon="warning" title="The Rule of Ownership">
  A Mutex has a strict concept of **Ownership**. Only the specific thread that locked the mutex is legally allowed to unlock it. If Thread A locks a mutex, and Thread B attempts to unlock it, the program will throw a fatal error.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Semaphores/index.mdx': `---
title: Semaphores
description: A synchronization primitive that uses an internal counter to control access to a pool of identical resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semaphores">

Invented by legendary computer scientist Edsger Dijkstra in 1965, a **Semaphore** is a synchronization primitive that is more flexible than a Mutex. 

While a Mutex acts as a single key (allowing only 1 thread in at a time), a Semaphore acts as a **Bouncer at a nightclub with a strict capacity limit**.

## The Internal Counter

A Semaphore is fundamentally just an Integer counter combined with a queue. 
When you create a semaphore, you initialize it with a maximum capacity (e.g., \\\`3\\\`). 

There are only two operations you can perform on a semaphore (historically named by Dijkstra using Dutch words):
1. **Wait() / P()**: Decrements the counter by 1. If the counter hits \\\`0\\\`, the thread is put to sleep and added to the waiting queue.
2. **Signal() / V()**: Increments the counter by 1. If there are threads asleep in the queue, it wakes one of them up.

<Callout icon="info" title="The Database Connection Pool">
  If your web server is only allowed to have 3 simultaneous connections to the SQL database, you create a Semaphore initialized to \\\`3\\\`. 
  As web requests (threads) arrive, they call \\\`Wait()\\\`. The first 3 threads enter instantly. The 4th thread calls \\\`Wait()\\\`, sees the counter is at \\\`0\\\`, and goes to sleep. When one of the first threads finishes, it calls \\\`Signal()\\\`, waking up the 4th thread.
</Callout>

## Binary Semaphores vs Mutexes

A **Binary Semaphore** is a semaphore initialized to \\\`1\\\`. It behaves almost exactly like a Mutex (only allowing 1 thread in at a time). 

However, there is one massive difference: **Semaphores do not have Ownership**.
A Mutex must be unlocked by the exact same thread that locked it. A Semaphore is just a counter; Thread A can call \\\`Wait()\\\`, and a completely different Thread B can call \\\`Signal()\\\` to let the next thread in. This makes semaphores perfect for **Producer-Consumer** workflows, where Thread A produces data and Thread B consumes it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Spinlocks/index.mdx': `---
title: Spinlocks
description: An extremely low-level locking mechanism where waiting threads actively burn CPU cycles instead of going to sleep.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Spinlocks">

When a thread fails to acquire a standard Mutex, the Operating System steps in, forcibly puts the thread to sleep, and performs a Context Switch to give the CPU to another program. 
While this is efficient because the waiting thread uses 0% CPU, the Context Switch itself is very slow (taking thousands of CPU cycles to swap memory spaces).

What if the lock is only going to be held for 5 nanoseconds? 
Putting the thread to sleep and waking it back up would take 1000x longer than just waiting. 

For incredibly short critical sections, OS developers use **Spinlocks**.

## Active Polling (Burning CPU)

A Spinlock does not put the thread to sleep. Instead, it enters a tight \\\`while(true)\\\` loop, actively burning CPU cycles by repeatedly checking if the lock is free millions of times a second.

\\\`\\\`\\\`c
while (test_and_set(&lock) == 1) {
    // Spin! Do absolutely nothing, just burn CPU cycles.
}
// Lock acquired! Execute the critical section.
\\\`\\\`\\\`

<Callout icon="warning" title="The Golden Rule of Spinlocks">
  Spinlocks must **only** be used in multi-core systems, and only if the critical section executes in a few microseconds. 
  If you use a Spinlock on a Single-Core CPU, you will deadlock the system. The spinning thread will consume 100% of the CPU, preventing the thread that actually holds the lock from ever running to release it.
</Callout>

## Where are they used?

You will almost never use Spinlocks in User Space programming (Java, Python, C#). They are exclusively used deep inside the **OS Kernel** (Ring 0) to protect core data structures (like the scheduler's run queue) where a traditional Mutex (which requires the scheduler to put a thread to sleep) would create an infinite recursive paradox.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Monitors/index.mdx': `---
title: Monitors
description: A high-level, object-oriented synchronization construct that automatically wraps data and methods in a hidden Mutex lock.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Monitors">

Using raw Mutexes and Semaphores in C code is highly error-prone. If a developer forgets to call \\\`unlock()\\\`, or if the code throws an Exception and crashes before reaching the \\\`unlock()\\\` line, the Mutex remains permanently locked, freezing the entire application forever (a Deadlock).

To prevent human error, language designers invented the **Monitor**.

<Callout icon="success" title="The Object-Oriented Lock">
  A Monitor is not a raw OS system call; it is a high-level programming language construct. It is an Object (or Class) where every single method is automatically wrapped in a hidden Mutex lock by the compiler.
</Callout>

## How Monitors Work (The Java Implementation)

Java natively builds Monitor functionality into the language using the \\\`synchronized\\\` keyword.

\\\`\\\`\\\`java
public class BankAccount {
    private int balance = 100;

    // The 'synchronized' keyword turns this method into a Monitor
    public synchronized void deposit(int amount) {
        balance += amount;
    }
}
\\\`\\\`\\\`

Behind the scenes, the Java Virtual Machine automatically creates a hidden Mutex for the \\\`BankAccount\\\` object. 
When Thread A calls \\\`deposit()\\\`, the JVM automatically acquires the lock. 
If Thread B tries to call \\\`deposit()\\\` on the same object, it is blocked.
When Thread A finishes the method, the JVM *automatically* releases the lock. Even if Thread A throws a massive Exception and crashes midway through the method, the JVM guarantees the lock will be safely released.

By hiding the raw \\\`lock()\\\` and \\\`unlock()\\\` boilerplate from the developer, Monitors eliminate entire classes of synchronization bugs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Condition variables/index.mdx': `---
title: Condition Variables
description: A signaling mechanism that allows a thread to safely go to sleep inside a Monitor until a specific state becomes true.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Condition Variables">

A Mutex solves the problem of protecting shared data. But what if a thread needs to wait for a specific *state* to change? 

Imagine a Producer-Consumer scenario using a shared \\\`Queue\\\` protected by a Mutex.
A Consumer thread locks the Mutex, looks at the Queue, and sees that it is empty. What does it do?
- It cannot Spinlock (burn CPU) while holding the Mutex, because then the Producer can never get the Mutex to add data to the Queue.
- It must release the Mutex and go to sleep. But how does it know when to wake up?

This is solved using a **Condition Variable**.

## Wait() and Signal()

A Condition Variable is always paired directly with a Mutex. It provides a way for a thread to say: *"I have the lock, but the data isn't ready. Put me to sleep, release the lock so others can work, and wake me up when things change."*

1. **\\\`Wait(Condition, Mutex)\\\`**: The OS atomically puts the thread to sleep AND unlocks the Mutex at the exact same nanosecond.
2. **\\\`Signal(Condition)\\\`**: Later, a Producer thread acquires the Mutex, adds data to the Queue, and calls \\\`Signal\\\`. The OS wakes up the sleeping Consumer. Before the Consumer is allowed to actually resume executing, the OS automatically re-acquires the Mutex for it.

<Callout icon="warning" title="Spurious Wakeups">
  Because of the complex way multi-core OS schedulers work, a thread sleeping on a Condition Variable can occasionally wake up *even if nobody signaled it* (a Spurious Wakeup). Therefore, a \\\`Wait()\\\` call must **always** be placed inside a \\\`while\\\` loop that re-checks the condition upon waking.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Deadlocks (detection/index.mdx': `---
title: Deadlock Detection
description: The algorithms operating systems use to realize that a group of threads are permanently stuck waiting for each other.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deadlock Detection">

A **Deadlock** is a catastrophic synchronization failure where two or more threads are permanently frozen because they are waiting on resources held by each other. 

Imagine Thread 1 holds Lock A, and is waiting for Lock B. Thread 2 holds Lock B, and is waiting for Lock A. Neither can proceed. They will wait for eternity. 

Because preventing deadlocks is computationally expensive, many systems (specifically Database Management Systems like PostgreSQL) allow deadlocks to happen naturally, but use **Deadlock Detection** to find and destroy them after the fact.

<Callout icon="info" title="The Resource Allocation Graph">
  The OS builds a directed graph. 
  - Circles represent Threads.
  - Squares represent Locks/Resources.
  - An arrow from a Thread to a Lock means "I am waiting for this".
  - An arrow from a Lock to a Thread means "This thread owns me".
  
  If the OS detects a **Cycle** (a closed loop) in this graph, a deadlock has definitively occurred.
</Callout>

## How to Recover

Once the OS detects a deadlock cycle, it must break it. It cannot politely ask a thread to let go of a lock. It must use brute force.

1. **Process Termination**: The OS brutally murders (terminates) one of the threads involved in the deadlock loop. This instantly releases the locks it was holding, allowing the other threads to proceed. The murdered thread loses all its progress.
2. **Resource Preemption (Rollback)**: Used extensively in Databases. The Database forcefully aborts the SQL transaction of one of the deadlocked queries, rolls back any changes it made to the tables, releases its locks, and silently restarts the query from the beginning a few milliseconds later. 

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/prevention/index.mdx': `---
title: Deadlock Prevention
description: Designing a system with strict, unbreakable rules that mathematically eliminate the possibility of a deadlock ever occurring.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deadlock Prevention">

While *Deadlock Detection* allows deadlocks to happen and fixes them later, **Deadlock Prevention** aims to design the system so that a deadlock is mathematically impossible to construct in the first place.

In 1971, Edward Coffman proved that a Deadlock can **only** occur if four specific conditions are met simultaneously (The Coffman Conditions). If an OS architect can design a system that breaks just *one* of these four rules, deadlocks are permanently eradicated.

<Callout icon="success" title="The Four Coffman Conditions">
  1. **Mutual Exclusion**: Resources cannot be shared (e.g., a Mutex).
  2. **Hold and Wait**: A thread can hold onto Lock A while waiting in line for Lock B.
  3. **No Preemption**: The OS cannot violently steal a lock away from a thread.
  4. **Circular Wait**: A closed loop of threads waiting on each other exists.
</Callout>

## Breaking the Rules

To prevent deadlocks, engineers write code that violates at least one condition:

- **Breaking "Hold and Wait"**: Require threads to request *all* the locks they will ever need at the very beginning of the program. If they can't get all of them instantly, they get none of them. (Very inefficient for resource usage).
- **Breaking "No Preemption"**: Allow the OS to forcefully strip locks away from threads if they wait too long. (Extremely dangerous, as it can cause data corruption if the thread was mid-write).
- **Breaking "Circular Wait" (The Best Strategy)**: Assign a strict numerical ID to every lock in the system (Lock 1, Lock 2, Lock 3). Enforce a rule that threads are **only allowed to request locks in ascending order**. If a thread holds Lock 2, the compiler physically prevents it from requesting Lock 1. This mathematically eliminates the possibility of a loop forming.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/avoidance)/index.mdx': `---
title: Deadlock Avoidance (Banker's Algorithm)
description: A dynamic, real-time algorithm that simulates the future state of the system before granting locks, ensuring the system never enters an unsafe state.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deadlock Avoidance">

Instead of blindly granting locks until a deadlock occurs (*Detection*), or enforcing massive system-wide architectural restrictions (*Prevention*), **Deadlock Avoidance** uses an algorithm to dynamically analyze every single lock request in real-time. 

Before granting a lock, the OS simulates the future. If giving the lock to Thread A could *potentially* lead to a deadlock later, the OS denies the request and forces Thread A to wait.

## The Banker's Algorithm

The most famous deadlock avoidance algorithm is Dijkstra's **Banker's Algorithm** (named because it mimics how a small-town bank manages cash reserves to ensure it can always fulfill withdrawal requests).

<Callout icon="info" title="The Prerequisite">
  For the Banker's Algorithm to work, every Thread must declare its **Maximum Potential Need** up front. When the program launches, it must tell the OS: *"At my absolute peak, I might need 4 locks simultaneously."*
</Callout>

When a thread requests a lock, the OS simulates granting it. It then checks if the resulting state is **Safe**.
- A **Safe State** means there exists at least one specific execution sequence where every single thread can reach its Maximum Potential Need, finish its work, and release all its locks without getting stuck.
- If the simulation proves the state is Safe, the lock is granted.
- If the simulation cannot find a guaranteed path to completion (an Unsafe State), the OS denies the lock and forces the requesting thread to sleep until more locks become available.

## Why isn't it used?
While mathematically beautiful, the Banker's Algorithm is almost entirely theoretical. 
In modern operating systems (like Windows or Linux), it is impossible for a web browser or a video game to know its "Maximum Potential Need" for resources at the time it launches. Because the prerequisite cannot be met, modern OSs do not use Deadlock Avoidance, and instead rely on Deadlock Detection or ignore the problem entirely (the Ostrich Algorithm).

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
