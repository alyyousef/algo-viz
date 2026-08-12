import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/10. Operating Systems/Processes/index.mdx': `---
title: Processes
description: The fundamental unit of execution in an operating system, representing an instance of a running program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Processes">

A **Process** is an active entity—an instance of a computer program that is currently being executed. While a program is a passive collection of instructions stored on disk (like a \`.exe\` file), a process is the actual execution of those instructions in memory.

<Callout icon="info" title="Isolation and Security">
  The most important characteristic of a process is **isolation**. The Operating System assigns every single process its own dedicated, private slice of memory. Process A cannot read or write to Process B's memory. If Process A crashes, Process B continues running completely unaffected.
</Callout>

## Anatomy of a Process in Memory

When the OS loads a program into memory to create a process, it divides the memory into several distinct segments:

1. **Text Segment (Code)**: The compiled machine code instructions of the program.
2. **Data Segment**: Global and static variables initialized before the program starts.
3. **Heap**: Memory dynamically allocated during runtime (e.g., using \`malloc()\` in C or \`new\` in Java). It grows upward.
4. **Stack**: Temporary data such as function parameters, return addresses, and local variables. It grows downward.

## The Process Control Block (PCB)

To manage hundreds of concurrent processes, the OS kernel maintains a massive internal data structure called the **Process Control Block (PCB)** for every single process. The PCB acts as the "ID card" for the process.

It contains:
- **Process State**: Is the process Running, Waiting, or Ready?
- **Program Counter**: The memory address of the very next instruction to execute.
- **CPU Registers**: The saved state of the CPU when the process was last paused.
- **Memory Limits**: Pointers to the start and end of the process's memory space.
- **Open Files List**: A list of all files the process currently has open.

## Process States

A process transitions through various states during its lifecycle:
- **New**: The process is being created.
- **Ready**: The process is loaded in memory and waiting to be assigned to a CPU core.
- **Running**: Instructions are currently being executed on a CPU core.
- **Waiting (Blocked)**: The process cannot continue until an event occurs (e.g., waiting for the user to type on the keyboard, or waiting for a slow hard drive read).
- **Terminated**: The process has finished execution.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Threads/index.mdx': `---
title: Threads
description: The smallest sequence of programmed instructions that can be managed independently by an OS scheduler.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Threads">

A **Thread** is the smallest unit of execution that the Operating System can schedule to run on a CPU. A Thread always exists *inside* a Process. 

Every Process starts with exactly one thread (the main thread), but it can spawn dozens or hundreds of additional threads to perform multiple tasks simultaneously.

<Callout icon="warning" title="Shared Memory">
  Unlike Processes, which are strictly isolated from each other, **all threads within the same process share the exact same memory space**. They share the same Code segment, Data segment, and Heap. This allows threads to communicate with each other instantly, but it introduces the massive danger of Race Conditions.
</Callout>

## Processes vs. Threads

<ComparisonTable 
  headers={['Feature', 'Processes', 'Threads']}
  rows={[
    ['Memory', 'Isolated. Have their own dedicated memory space.', 'Shared. All threads in a process share the same Heap and Data.'],
    ['Creation Overhead', 'High. The OS must allocate massive new memory structures and PCBs.', 'Low. Creating a thread is extremely fast and lightweight.'],
    ['Communication', 'Requires complex Inter-Process Communication (IPC) like pipes or sockets.', 'Instantaneous. They just read/write to the same variables in memory.'],
    ['Fault Tolerance', 'High. If one process crashes, the others survive.', 'Low. If one thread triggers a Segmentation Fault, the entire process (and all other threads) crashes.']
  ]}
/>

## Thread-Local Storage (The Stack)

While threads share the Heap and Global variables, they do NOT share the **Stack**. 
Every single thread is given its own private Stack. This is mathematically necessary because the Stack keeps track of function calls. If Thread A calls \`calculateMath()\` and Thread B calls \`downloadFile()\`, they need their own private Stacks to track their local variables and where to \`return\` to when the function finishes.

## Concurrency vs. Parallelism

Threads enable two different computing paradigms:
1. **Concurrency**: On a single-core CPU, the OS rapidly switches between Thread A and Thread B every millisecond. They are not actually running at the exact same time, but they appear to be to the user.
2. **Parallelism**: On a multi-core CPU, Thread A physically runs on Core 1 while Thread B physically runs on Core 2 at the exact same nanosecond.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Context switching/index.mdx': `---
title: Context Switching
description: The process of storing the state of a running process or thread so it can be resumed later.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Context Switching">

A modern computer might have 8 CPU cores, but it is simultaneously running 500 processes and 3,000 threads (your browser tabs, background updates, mouse drivers, etc.). 

To achieve the illusion that everything is running at the same time, the Operating System relies on **Context Switching**: the rapid pausing and resuming of different threads on the CPU.

<Callout icon="error" title="The Overhead Tax">
  Context switching is computationally expensive. It is pure overhead. While the CPU is performing a context switch, it is doing administrative OS work; it is **not** executing any useful user code. If an OS switches contexts too frequently, the system can grind to a halt (a state known as "Thrashing").
</Callout>

## The Mechanism of a Switch

Imagine Process A is running, and the OS decides it is time for Process B to run. The OS must perform the following steps:

1. **Interrupt Triggered**: A hardware timer goes off, forcing the CPU to pause Process A and jump into OS Kernel code.
2. **Save State (Context)**: The OS copies the exact, current state of all hardware CPU Registers (the Program Counter, the Stack Pointer, etc.) and saves them into Process A's **Process Control Block (PCB)** in RAM.
3. **Select Next**: The OS Scheduler algorithm looks at the Ready Queue and selects Process B.
4. **Restore State**: The OS finds Process B's PCB in RAM, copies those saved values, and loads them back into the physical CPU hardware Registers.
5. **Resume**: The OS tells the CPU to resume execution. Because the Program Counter was restored, the CPU starts executing Process B's code exactly where it left off days ago.

## Process vs. Thread Context Switching

- **Thread Context Switch**: Relatively fast. Because threads in the same process share the same memory layout, the OS only needs to swap out the CPU registers and point to the new thread's Stack.
- **Process Context Switch**: Very slow. The OS must swap out the CPU registers, but it must also completely flush and replace the CPU's memory translation caches (the TLB), because Process B lives in an entirely different virtual memory space than Process A.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/System calls/index.mdx': `---
title: System Calls
description: The programmatic interface through which a user application requests privileged services from the OS kernel.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="System Calls">

A **System Call (Syscall)** is the fundamental mechanism used by an application program to request a service from the operating system's kernel. 

User applications (like a web browser or a Python script) are heavily restricted. They cannot directly talk to the hard drive, read the keyboard, or allocate physical RAM. When an application needs to do any of these things, it must ask the kernel to do it on its behalf via a System Call.

<Callout icon="info" title="The Security Boundary">
  Think of a System Call like the glass window at a bank. You (the user process) cannot walk into the vault (hardware) and grab cash. You must slide a request slip (a Syscall) under the glass to the bank teller (the Kernel). The teller validates your request, walks into the vault, gets the cash, and slides it back to you.
</Callout>

## How a System Call Works (The Trap)

When your code calls a function like \`open("file.txt")\`, a complex sequence of hardware and software events occurs:

1. **Setup**: The application places the arguments (like the filename) into specific CPU registers.
2. **The Trap (Software Interrupt)**: The application executes a special machine code instruction (like \`syscall\` on x86_64). This instruction intentionally triggers a hardware exception.
3. **Mode Switch**: The CPU hardware immediately suspends the application, elevates its privilege level from "User Mode" (Ring 3) to "Kernel Mode" (Ring 0), and jumps to a pre-defined memory address controlled by the OS.
4. **Execution**: The Kernel takes over. It verifies the arguments, checks security permissions, and then physically commands the hard drive to open the file.
5. **Return**: The Kernel places the result (e.g., a file descriptor number) into a register, drops the CPU privilege back down to User Mode, and returns control to the application exactly where it left off.

## Common System Calls

Modern operating systems expose hundreds of system calls. Some common POSIX (Linux/macOS) syscalls include:

<ComparisonTable 
  headers={['Category', 'Example Syscalls', 'Description']}
  rows={[
    ['Process Control', '\`fork()\`, \`exec()\`, \`exit()\`, \`wait()\`', 'Creating, terminating, and waiting for processes.'],
    ['File Management', '\`open()\`, \`read()\`, \`write()\`, \`close()\`', 'Manipulating files on the storage drive.'],
    ['Device Management', '\`ioctl()\`, \`read()\`, \`write()\`', 'Interacting with hardware devices (keyboards, GPUs).'],
    ['Information Maintenance', '\`getpid()\`, \`sleep()\`, \`time()\`', 'Requesting system time or process IDs.'],
    ['Communications', '\`socket()\`, \`pipe()\`, \`mmap()\`', 'Networking and Inter-Process Communication (IPC).']
  ]}
/>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/User space/index.mdx': `---
title: User Space
description: The restricted, unprivileged memory area where all standard application programs execute.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="User Space">

Modern operating systems divide system memory into two distinct, hardware-enforced zones: **User Space** and **Kernel Space**. 

**User Space** is the strictly limited, sandboxed environment where all normal software runs. Your web browser, video games, text editors, and Node.js servers all execute entirely within User Space.

<Callout icon="success" title="The Purpose: System Stability">
  The entire purpose of User Space is to prevent bad code from destroying the computer. If a video game in User Space contains a terrible bug and tries to overwrite memory that belongs to the operating system, the CPU hardware will literally block the action, trigger a "Segmentation Fault", and violently kill the video game. The rest of the computer survives completely unharmed.
</Callout>

## Restrictions of User Space (Ring 3)

In x86 CPU architecture, User Space operates at **Ring 3** (the lowest privilege level). Because of this, software running in User Space is mathematically prevented from executing certain CPU instructions:

1. **No Direct Hardware Access**: You cannot write a C program that directly sends electrical signals to the graphics card or hard drive. 
2. **No Direct Memory Access**: You cannot read or write to physical RAM addresses. You only interact with "Virtual Memory" assigned to you by the OS.
3. **No Interrupt Management**: You cannot disable hardware interrupts.

## Crossing the Boundary

Because User Space is essentially a padded room, applications are useless on their own. To do anything meaningful—like drawing a pixel on the screen, reading a file, or sending an internet packet—the application must cross the boundary into Kernel Space.

It does this via a **System Call**. 

The boundary crossing involves a "Context Switch" (specifically a Mode Switch), which incurs a slight performance penalty. This is why high-performance software (like databases) tries to minimize the number of system calls they make, preferring to batch operations together in User Space before crossing the boundary into Kernel Space.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Kernel space/index.mdx': `---
title: Kernel Space
description: The highly privileged memory area reserved strictly for the core operating system and device drivers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kernel Space">

Modern operating systems divide system memory into two distinct, hardware-enforced zones: **User Space** and **Kernel Space**.

**Kernel Space** is the absolute core of the operating system. It is a highly privileged, protected area of memory where the OS Kernel, memory manager, process scheduler, and hardware device drivers execute.

<Callout icon="warning" title="Absolute Power, Absolute Danger">
  Code running in Kernel Space has unrestricted access to the entire computer. It can read any memory, write to any hard drive, and control any hardware device. Because of this absolute power, a single bug in Kernel Space code (like a poorly written Nvidia graphics driver) will not just crash the program—it will instantly crash the entire operating system, resulting in a Windows Blue Screen of Death (BSOD) or a Linux Kernel Panic.
</Callout>

## Features of Kernel Space (Ring 0)

In x86 CPU architecture, Kernel Space operates at **Ring 0** (the highest privilege level).

1. **Direct Hardware Access**: Kernel code can execute privileged CPU instructions to talk directly to the motherboard, CPU caches, and PCI-e devices.
2. **Unrestricted Memory**: The Kernel maps the entire physical RAM of the computer into its address space. It can see and modify the memory of every User Space application.
3. **Interrupt Handling**: The Kernel intercepts and processes all hardware interrupts (e.g., when a network packet arrives or a key is pressed on the keyboard).

## The Kernel Space Architecture

While User Space contains thousands of isolated, separate processes, Kernel Space is generally one massive, shared environment. 

When a User Space program (like Chrome) needs to read a file, it makes a System Call. The CPU switches into Ring 0, jumps into Kernel Space, and executes the Kernel's file-reading code. *Crucially, during this system call, it is still Chrome's thread executing the code, but it is now executing with Kernel privileges inside Kernel Space.*

## Monolithic vs. Microkernel

There is a long-standing architectural debate on how much code should actually live in Kernel Space:

- **Monolithic Kernels (Linux, Windows)**: Almost everything runs in Kernel Space—the file system, the network stack, and all device drivers. This is incredibly fast because there is no boundary crossing, but a bug in a USB mouse driver can crash the whole system.
- **Microkernels (QNX, seL4, macOS/Mach hybrid)**: The absolute bare minimum runs in Kernel Space (just basic memory mapping and IPC). Everything else, including file systems and drivers, runs as isolated processes in User Space. This is incredibly stable, but much slower due to constant System Calls and IPC overhead.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Synchronisation/index.mdx': `---
title: Synchronization
description: Mechanisms that ensure concurrent processes or threads do not simultaneously execute critical sections of code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Synchronization">

In operating systems, **Synchronization** refers to the coordination of simultaneous threads or processes to ensure that they execute in a predictable manner and do not corrupt shared data.

<Callout icon="error" title="The Core Problem: Critical Sections">
  A **Critical Section** is a specific block of code that accesses a shared resource (like a global variable, a database row, or a file). If two threads execute a Critical Section at the exact same nanosecond, the data will become corrupted (a Race Condition). Synchronization provides the tools to enforce **Mutual Exclusion**, ensuring only one thread can be inside the Critical Section at a time.
</Callout>

## The Three Requirements of Synchronization

Any valid synchronization mechanism must mathematically guarantee three things:

1. **Mutual Exclusion**: If Thread A is executing in its critical section, then absolutely no other thread can be executing in that same critical section.
2. **Progress**: If no thread is in the critical section, and several threads want to enter it, the system must decide which one goes next. It cannot freeze and deny all of them.
3. **Bounded Waiting**: Once Thread A requests to enter the critical section, there must be a mathematical limit on how many other threads are allowed to jump the line before Thread A is finally allowed in. (No thread can be starved forever).

## Common Synchronization Tools

Operating systems and programming languages provide several primitives to achieve synchronization:

<ComparisonTable 
  headers={['Primitive', 'Description', 'Best For']}
  rows={[
    ['Mutex (Lock)', 'A simple lock. A thread acquires it, does work, and releases it. Only the owner can release it.', 'Protecting a single shared variable or resource.'],
    ['Semaphore', 'A counter that allows a specific number of threads (N) to access a resource simultaneously.', 'Managing a pool of resources (e.g., 5 database connections).'],
    ['Spinlock', 'A lock where the waiting thread constantly loops ("spins") in a \`while\` loop checking if the lock is free.', 'Extremely short critical sections where sleeping/waking the thread would take longer than just spinning.'],
    ['Condition Variables', 'Allows a thread to go to sleep and wait for a specific "condition" to become true, at which point another thread wakes it up.', 'Producer-Consumer problems and thread signaling.']
  ]}
/>

## Hardware Support (Atomics)

Software synchronization tools (like Mutexes) are ultimately built on top of special hardware instructions provided by the CPU. These are called **Atomic Instructions**.

Instructions like **Compare-And-Swap (CAS)** or **Test-And-Set (TAS)** allow the CPU to read a memory address, modify it, and write it back in a single, uninterruptible hardware cycle. This guarantees that two cores cannot perform the operation simultaneously, forming the unbreakable foundation of all higher-level synchronization logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Mutexes/index.mdx': `---
title: Mutexes
description: A mutual exclusion lock used to serialize access to a shared resource in concurrent programming.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mutexes">

A **Mutex** (short for **Mut**ual **Ex**clusion) is the most fundamental synchronization primitive used in concurrent programming. It acts as a digital lock that protects a Critical Section of code, ensuring that only one thread can access a shared resource at a time.

<Callout icon="info" title="The Bathroom Key Analogy">
  Think of a Mutex like the single physical key to a coffee shop bathroom. 
  If Alice has the key, she enters the bathroom (the Critical Section) and locks the door. 
  If Bob wants to use the bathroom, he sees the key is gone. He must wait outside in line. 
  When Alice finishes, she returns the key (releases the Mutex). Bob can now take the key and enter.
</Callout>

## How Mutexes Work

A Mutex exposes two primary operations:

1. **\`Lock()\` (or Acquire)**: The thread attempts to grab the lock. 
   - If the lock is free, the thread takes it and continues executing immediately.
   - If the lock is already held by another thread, the OS puts the requesting thread to sleep (blocks it) so it doesn't waste CPU cycles.
2. **\`Unlock()\` (or Release)**: The thread finishes its work and releases the lock. The OS wakes up one of the sleeping threads waiting in line and gives it the lock.

## Ownership and Strictness

The defining characteristic of a Mutex is **Ownership**. The thread that successfully calls \`Lock()\` becomes the owner of the Mutex. 
**Only the owner is allowed to call \\\`Unlock()\\\`.** 

If Thread A locks a Mutex, and Thread B attempts to unlock it, the operating system will throw a fatal error. This strict ownership rule protects the integrity of the critical section and is the primary difference between a Mutex and a Binary Semaphore.

## Common Pitfalls

While Mutexes solve race conditions, they introduce new dangers if programmed incorrectly:

1. **Deadlock**: Thread A locks Mutex 1 and waits for Mutex 2. Thread B locks Mutex 2 and waits for Mutex 1. Both freeze forever.
2. **Double Lock**: A thread locks a Mutex, and then accidentally tries to lock the exact same Mutex again. Unless it is a special "Recursive Mutex", the thread will permanently block itself.
3. **Forgetting to Unlock**: If a thread locks a Mutex but throws an exception and crashes before calling \`Unlock()\`, the Mutex remains locked forever, and all other threads waiting for it will starve. (Modern languages solve this using scoped locks, like Python's \`with\` statement or C++ \`std::lock_guard\`).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Semaphores/index.mdx': `---
title: Semaphores
description: A synchronization signaling mechanism that uses an internal counter to control access to a shared resource.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semaphores">

Invented by computer science pioneer Edsger Dijkstra in 1965, a **Semaphore** is a synchronization primitive used to coordinate threads. Unlike a Mutex (which is a simple True/False lock), a Semaphore is an integer counter that tracks the number of available resources.

<Callout icon="info" title="The Bouncer Analogy">
  Think of a Semaphore like a bouncer at a nightclub that has a strict fire-code limit of 5 people.
  The bouncer starts with a counter of 5. As each person enters, the bouncer decrements the counter (4, 3, 2, 1, 0). 
  When the counter hits 0, the club is full. If a 6th person arrives, the bouncer makes them wait outside. 
  When someone leaves the club, the bouncer increments the counter back to 1, and lets the next person in line enter.
</Callout>

## Wait and Signal Operations

Dijkstra originally named the semaphore operations **P** (Proberen / to try) and **V** (Verhogen / to increment). In modern programming, they are usually called **Wait()** and **Signal()**.

### 1. Wait() / Acquire()
When a thread wants to access the resource, it calls \`Wait()\`.
- If the internal counter is $> 0$, the semaphore immediately decrements the counter by 1 and the thread continues executing.
- If the counter is $== 0$, the thread is put to sleep and added to a waiting queue.

### 2. Signal() / Release()
When a thread finishes using the resource, it calls \`Signal()\`.
- The semaphore increments the counter by 1.
- If there are threads asleep in the waiting queue, the OS immediately wakes one of them up.

## Counting vs. Binary Semaphores

- **Counting Semaphore**: The internal counter can be any integer. It is used to manage a pool of identical resources (e.g., you have 10 database connection objects available, so you initialize a Counting Semaphore to 10).
- **Binary Semaphore**: The internal counter can only be 0 or 1.

### Semaphores vs. Mutexes
A Binary Semaphore acts very similarly to a Mutex, but there is a massive conceptual difference: **Semaphores do NOT have ownership.**

If Thread A locks a Mutex, ONLY Thread A can unlock it.
With a Semaphore, Thread A can call \`Wait()\` to decrement it to 0, but **Thread B is perfectly allowed to call \`Signal()\` to increment it back to 1**. Because of this, Semaphores are primarily used as **Signaling** mechanisms (e.g., Thread A waits for a file to download, and Thread B signals the semaphore when the download finishes, waking Thread A up).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Race conditions/index.mdx': `---
title: Race Conditions
description: A catastrophic software flaw that occurs when the timing or order of thread execution alters the final output of the program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Race Conditions">

A **Race Condition** is one of the most dangerous and difficult-to-debug bugs in computer science. It occurs in concurrent programming when multiple threads access and modify shared data at the exact same time, and the final state of the data depends on the unpredictable microscopic timing of how the Operating System scheduled the threads.

<Callout icon="error" title="The Non-Deterministic Nightmare">
  Race conditions are a nightmare because they are **non-deterministic**. You can run your code 9,999 times and it will work perfectly. But on the 10,000th run, the OS interrupts a thread a microsecond earlier than usual, the race condition triggers, data is corrupted, and the application crashes. They are almost impossible to reliably reproduce in a testing environment.
</Callout>

## The Classic Bank Account Example

Imagine a bank account with a shared global balance of $100. 
Thread A and Thread B are both trying to deposit $50 at the exact same time.

The code to deposit money looks like one line of code: \`balance = balance + 50;\`
However, the CPU executes this in three distinct machine instructions:
1. **READ**: Read the current \`balance\` from RAM into a CPU register.
2. **ADD**: Add 50 to the register.
3. **WRITE**: Write the register back to RAM.

### The Race
- **Thread A** executes READ. It sees $100.
- *Context Switch!* The OS pauses Thread A and switches to Thread B.
- **Thread B** executes READ. It also sees $100.
- **Thread B** executes ADD (100 + 50 = 150).
- **Thread B** executes WRITE. The RAM now holds $150.
- *Context Switch!* The OS resumes Thread A.
- **Thread A** resumes where it left off. It already read $100. It executes ADD (100 + 50 = 150).
- **Thread A** executes WRITE. It overwrites the RAM with $150.

**The final balance is $150, but it should be $200.** Thread B's deposit was completely destroyed because Thread A overwrote it with stale data.

## The Solution: Mutual Exclusion

To fix a race condition, you must identify the **Critical Section** (the READ-ADD-WRITE sequence) and wrap it in a synchronization primitive, like a **Mutex**. 

By locking a Mutex before the READ, and unlocking it after the WRITE, you guarantee the operations become **Atomic** (indivisible). If the OS context-switches Thread A out after the READ, Thread B will hit the Mutex and be forced to wait, ensuring it cannot perform its own READ until Thread A has fully written the updated balance back to RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Deadlocks (detection/index.mdx': `---
title: Deadlocks
description: A catastrophic system state where a group of threads are permanently frozen, each waiting for a resource held by another.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deadlocks">

A **Deadlock** is a state in concurrent programming where two or more threads are permanently blocked, waiting for each other to release a lock, resulting in a complete standstill of the application.

<Callout icon="warning" title="The Mexican Standoff">
  Imagine Thread A locks Mutex 1, and Thread B locks Mutex 2. 
  Then, Thread A tries to lock Mutex 2 (and is put to sleep because B owns it). 
  Then, Thread B tries to lock Mutex 1 (and is put to sleep because A owns it).
  Both threads are asleep. Neither can wake up to release the lock the other needs. They will wait forever.
</Callout>

## The Four Coffman Conditions

In 1971, computer scientist Edward G. Coffman mathematically proved that a deadlock *cannot possibly occur* unless **four specific conditions** are met simultaneously:

1. **Mutual Exclusion**: At least one resource must be non-shareable (only one thread can use it at a time).
2. **Hold and Wait**: A thread must be holding at least one resource while waiting to acquire additional resources held by other threads.
3. **No Preemption**: A resource cannot be forcibly taken away from a thread; the thread must willingly release it.
4. **Circular Wait**: There must be a circular chain of two or more threads, where each thread is waiting for a resource held by the next member in the chain.

## Handling Deadlocks

Operating systems and engineers handle deadlocks using three primary strategies:

### 1. Prevention (Strict Rules)
You engineer your system so that at least one of the Coffman conditions is impossible. 
- *Example*: To break "Circular Wait", you impose a strict global ordering on all Mutexes. If every thread in the entire codebase is mathematically forced to always lock Mutex 1 *before* locking Mutex 2, a deadlock cycle cannot physically form.

### 2. Avoidance (Banker's Algorithm)
The OS dynamically analyzes every lock request in real-time. Before granting a lock, the OS simulates the future. If granting the lock *could* lead to a state where a deadlock is possible, the OS denies the lock request or forces the thread to wait. (This is highly theoretical and rarely used due to extreme overhead).

### 3. Detection and Recovery (The Ostrich Algorithm)
Most modern Operating Systems (Windows, Linux, macOS) use the "Ostrich Algorithm"—they stick their head in the sand and ignore the problem. Preventing deadlocks is too computationally expensive. If a user application deadlocks, it just freezes indefinitely. It is up to the user to realize it's frozen, open the Task Manager, and forcibly terminate (kill) the process, thereby breaking the deadlock via Preemption.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Memory management/index.mdx': `---
title: Memory Management
description: The process by which the operating system controls, allocates, and coordinates computer memory among running programs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Memory Management">

**Memory Management** is one of the most critical responsibilities of the Operating System. It is the complex administrative process of tracking every single byte of RAM in the computer, allocating memory to processes when they start, and reclaiming that memory when they finish.

<Callout icon="info" title="The Illusionist">
  The OS Memory Manager acts like a master illusionist. If you write a C program, it assumes it has sole access to a massive, contiguous block of RAM starting at address \`0x000000\`. In reality, the OS is lying to your program. Its memory is likely fragmented, scattered across physical RAM, and heavily intertwined with other programs.
</Callout>

## Core Responsibilities

The Memory Management Unit (MMU - part of the hardware CPU, managed by the OS) handles several key tasks:

1. **Allocation**: When a user double-clicks an application, the OS finds free space in physical RAM and loads the program into it. If the program asks for more memory during runtime (via \`malloc\`), the OS allocates it.
2. **Deallocation**: When a program closes (or calls \`free\`), the OS updates its internal tables to mark that RAM as available for future programs.
3. **Protection & Isolation**: The OS ensures that Process A cannot accidentally (or maliciously) read or overwrite the memory belonging to Process B. 
4. **Relocation (Address Translation)**: Translating the fake "Virtual Addresses" used by the application into the actual "Physical Addresses" of the silicon RAM chips.

## The Problem of Fragmentation

Historically, memory management struggled with **Fragmentation**. 

If the OS assigns contiguous blocks of RAM to programs, and then programs close at random times, the RAM ends up resembling Swiss cheese—full of tiny, scattered holes. 
- **External Fragmentation**: The OS might have 2GB of free RAM in total, but because it is split into a thousand tiny 2MB holes scattered across the disk, the OS cannot load a new program that requires a contiguous 50MB block. 

To solve this catastrophic inefficiency, modern operating systems abandoned contiguous allocation entirely and invented **Paging**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Virtual memory/index.mdx': `---
title: Virtual Memory
description: A memory management technique that creates an idealized abstraction of storage resources, providing isolation and the illusion of massive RAM.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Virtual Memory">

**Virtual Memory** is one of the most profound inventions in operating system design. It completely abstracts the physical silicon RAM chips away from the software. 

When a compiler generates machine code, the memory addresses in that code (e.g., \`0x004A2F\`) are **fake**. They are Virtual Addresses. The CPU and OS work together in real-time to translate these fake addresses into the actual, physical hardware addresses in the RAM sticks.

## The Three Superpowers of Virtual Memory

By adding this layer of translation between the software and the hardware, the OS gains three incredible superpowers:

### 1. Absolute Isolation
Process A has a virtual address \`0x1000\`. Process B also has a virtual address \`0x1000\`. Because of the translation layer, the OS maps A's \`0x1000\` to physical RAM stick index \`500\`, and B's \`0x1000\` to physical RAM stick index \`9000\`. 
Because a process can only generate virtual addresses, it is mathematically impossible for Process A to even generate a number that translates to Process B's physical memory. Perfect security sandbox.

### 2. Defeating Fragmentation (Paging)
Because the OS translates every address, the physical memory belonging to a single program doesn't need to be placed contiguously (next to each other) in the hardware RAM. The OS can chop the program up into tiny 4KB chunks (Pages) and scatter them randomly into any available holes in the physical RAM. The program has no idea; to the program, its virtual memory appears perfectly contiguous.

### 3. The Illusion of Infinite RAM (Swapping)
If you only have 8GB of physical RAM, but you open 16GB worth of applications, the computer doesn't crash. 
The Virtual Memory system takes pages of memory that haven't been used recently (like a minimized browser window) and secretly writes them out to the hard drive (the Swap File or Pagefile). It frees up the physical RAM for the active application. If you maximize the browser later, the OS pauses the CPU, reads the data from the hard drive back into RAM, and resumes. 

<Callout icon="warning" title="Thrashing">
  Hard drives (even SSDs) are thousands of times slower than RAM. If you drastically exceed your physical RAM, the OS spends 99% of its time desperately copying data back and forth between the hard drive and RAM, and 1% of its time executing useful code. The system grinds to a halt. This is known as **Thrashing**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Paging/index.mdx': `---
title: Paging & The TLB
description: The fundamental implementation mechanism behind Virtual Memory, dividing memory into fixed-size blocks called Pages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Paging & The TLB">

**Paging** is the specific memory management scheme used by modern operating systems to implement Virtual Memory. It eliminates external fragmentation and allows the physical memory of a process to be scattered non-contiguously across the RAM chips.

<Callout icon="info" title="Pages and Frames">
  - The OS chops the fake **Virtual Memory** into fixed-size blocks called **Pages** (almost universally 4KB in size).
  - The OS chops the real **Physical RAM** into identically sized blocks called **Frames**.
  - Paging is simply the act of mapping a Virtual Page to a Physical Frame.
</Callout>

## The Page Table

To keep track of which Page maps to which Frame, the OS maintains a massive dictionary called the **Page Table**. 
*Crucially, every single isolated Process gets its own private Page Table.*

When the CPU tries to read virtual address \`0x5002\`:
1. The CPU hardware extracts the "Page Number" from the address (e.g., Page 5).
2. The CPU looks up Page 5 in the current process's Page Table.
3. The Page Table reveals that Virtual Page 5 is stored in Physical Frame 12.
4. The CPU combines Frame 12 with the remaining offset to find the exact silicon byte in the physical RAM stick.

## The Translation Lookaside Buffer (TLB)

There is a massive performance flaw in Paging. The Page Table itself is so large that it must be stored in RAM. 
This means if an application wants to read a variable from RAM, the CPU actually has to perform **two** RAM reads:
1. Read the Page Table from RAM to get the translation.
2. Read the actual variable from RAM using the translated address.

Reading from RAM is slow. Doubling the amount of RAM reads would cripple the speed of the computer.

**The Solution is the TLB.**
The Translation Lookaside Buffer (TLB) is an ultra-fast, dedicated hardware cache built directly into the silicon of the CPU core. It stores a small list of the most recently used Page-to-Frame translations. 

When the CPU needs to translate an address, it checks the TLB first. 
- **TLB Hit**: The translation is found instantly in the CPU hardware. The CPU does 1 RAM read. (This happens ~99% of the time).
- **TLB Miss**: The translation isn't there. The CPU is forced to pause, walk out to the slow RAM to read the Page Table, cache the result in the TLB, and then finally read the variable.

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
