import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/10. Operating Systems/Processes/index.mdx': `---
title: Processes
description: The fundamental unit of execution in an Operating System, containing a program's code, memory space, and hardware context.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Processes">

When you double-click an application (like Google Chrome), the Operating System reads the static executable file from the hard drive and loads it into RAM. The moment that code begins executing, it becomes a **Process**.

## 1. Process Anatomy
A process is heavily isolated by the OS. It believes it is the *only* program running on the computer. It consists of:
1. **Text Segment**: The compiled binary machine code (Read-only).
2. **Data Segment**: Global and static variables initialized by the programmer.
3. **Heap**: Memory dynamically allocated at runtime (e.g., using TICK1malloc()TICK1 in C or TICK1newTICK1 in Java). Grows upward.
4. **Stack**: Temporary storage for function parameters, return addresses, and local variables. Grows downward.

## 2. The Process Control Block (PCB)
The OS must track thousands of processes. It does this using a massive C-struct called the **PCB**. 
The PCB stores:
- **Process ID (PID)**: The unique integer identifying the process.
- **Process State**: Is it *Running*, *Waiting*, or *Terminated*?
- **CPU Registers**: The exact state of the CPU when the process was last paused (Program Counter, Stack Pointer).
- **Memory Limits**: The start and end physical addresses this process is allowed to access.

## 3. Process Isolation
Because every process has its own isolated memory space, Process A cannot mathematically access the memory of Process B. If Process A has a buffer overflow and crashes, Process B is completely unaffected. 
If they *need* to talk, they must use OS-mediated **Inter-Process Communication (IPC)** (like Pipes or Sockets), which is slow but incredibly secure.

<Callout icon="warning" title="Zombie Processes">
When a process finishes execution, it sends an TICK1exit()TICK1 system call. The OS clears its memory but leaves the PCB intact so the Parent Process can read its exit status. If the parent forgets to read it (using TICK1wait()TICK1), the dead process remains in the process table forever as a **Zombie**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Threads/index.mdx': `---
title: Threads
description: Lightweight units of execution that exist within a Process, sharing the same memory space to enable ultra-fast concurrent execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Threads">

Creating a completely new Process is incredibly expensive. It requires the OS to allocate massive blocks of memory, construct a new PCB, and establish security boundaries. 
If a web server needs to handle 10,000 users simultaneously, creating 10,000 isolated processes will instantly crash the OS out of memory. 

The solution is **Threads**. 

## 1. The Shared Memory Model
A Thread is a "lightweight process". Multiple threads can live *inside* a single Process. 

Crucially, all threads within a process **share the exact same Heap, Data Segment, and Code**. 
However, because they execute independently, each thread gets its very own isolated **Stack** and **Program Counter** (to track what line of code it is currently executing).

<ComparisonTable 
  headers={['Metric', 'Processes', 'Threads']} 
  rows={[
    ['Memory Overhead', 'Massive. Every process has its own isolated memory.', 'Minimal. All threads share the parent process memory.'],
    ['Creation Speed', 'Extremely slow (requires heavy OS intervention).', 'Blazingly fast.'],
    ['Communication', 'Slow. Requires complex Inter-Process Communication (IPC).', 'Instant. They share the same variables in RAM.'],
    ['Security / Fault Tolerance', 'High. If one process crashes, the others survive.', 'Low. If one thread triggers a Segmentation Fault, the entire Process (and all its threads) crashes instantly.']
  ]} 
/>

## 2. Multi-Threading and Multi-Core CPUs
Modern CPUs have multiple physical cores (e.g., 8 cores). If your Process only has 1 thread, it can only execute on 1 core, meaning 87% of your CPU is physically idle. By spawning 8 threads, the OS can mathematically map one thread to each physical core, achieving true parallel execution and drastically increasing performance.

<Callout icon="warning" title="The Race Condition Nightmare">
Because threads instantly share the same memory, they are fundamentally dangerous. If Thread A and Thread B try to update the exact same global variable at the exact same microsecond, the data mathematically corrupts. This requires extreme architectural synchronization using **Mutexes** and **Semaphores**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Context switching/index.mdx': `---
title: Context Switching
description: The intense OS mechanism that rapidly pauses one process and resumes another, creating the illusion of infinite simultaneous multitasking.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Context Switching">

If your CPU only has 4 physical cores, it can mathematically only execute 4 instructions at the exact same time. Yet, you can have Spotify, Chrome, Slack, and Discord all running smoothly. 
The OS achieves this using **Time Slicing** and **Context Switching**.

## 1. The Illusion of Concurrency
The OS gives Process A control of the CPU for a tiny fraction of a second (e.g., 10 milliseconds). When the timer expires, a physical hardware interrupt fires. The CPU instantly halts Process A and gives control back to the OS Kernel. 

The OS must now pause Process A and resume Process B.

## 2. The Mechanics of the Switch
A Context Switch is computationally expensive because the OS must physically save and load the state of the CPU.

1. **Save State**: The OS takes the exact values of the CPU's registers (Program Counter, Stack Pointer, General Registers) and saves them into Process A's Process Control Block (PCB) in RAM.
2. **Scheduler Decision**: The OS runs a scheduling algorithm to mathematically determine which process should run next (Process B).
3. **Restore State**: The OS reads Process B's PCB, takes its saved registers, and physically loads them back into the CPU.
4. **Flush TLB**: The OS must flush the Translation Lookaside Buffer (hardware cache mapping virtual to physical memory) to ensure Process B cannot illegally read Process A's memory.

## 3. The Performance Cost
A Context Switch takes roughly 1 to 5 microseconds. This sounds fast, but if a CPU is doing 100,000 context switches per second, the OS is spending 50% of its total processing power just swapping things in and out, rather than actually running your code (a phenomenon called **Thrashing**).

<Callout icon="tip" title="Thread vs Process Switching">
Context switching between two Threads in the *same* process is blazingly fast. Because they share the same memory space, the OS does **not** need to flush the TLB or swap out the massive memory page tables. It only needs to swap the registers.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Virtual memory/index.mdx': `---
title: Virtual Memory
description: The foundational OS architecture that abstracts physical RAM, giving every process the illusion of having a massive, contiguous, and isolated block of memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Virtual Memory">

In early computers, if an application needed 10MB of RAM, it literally wrote data to physical silicon addresses 0 through 10,000,000. 
This was catastrophic:
1. If Chrome and Spotify both try to write to address 500, they corrupt each other.
2. If Chrome needs a 10MB contiguous block of memory, but the RAM is fragmented into tiny 1MB chunks, Chrome cannot launch (even if 50MB is technically free).

**Virtual Memory** mathematically solves all of this by lying to the processes.

## 1. The Grand Illusion
When a 64-bit Process launches, the OS tells it: *"You are the only program running, and you have exactly 16 Exabytes of perfect, contiguous memory all to yourself, starting at address 0."*

When the Process writes data to Virtual Address TICK10x0400TICK1, the hardware **Memory Management Unit (MMU)** intercepts the request on the motherboard. It mathematically translates that fake Virtual Address into a real Physical Address (e.g., TICK10xFFAATICK1) before it hits the RAM stick.

## 2. Benefits of Virtual Memory
1. **Total Isolation**: Because the OS strictly controls the MMU translation map, it is mathematically impossible for Chrome to generate a virtual address that translates into Spotify's physical RAM. The hardware will physically block it (Segmentation Fault).
2. **Defeating Fragmentation**: A process might believe its 10MB array is perfectly contiguous in Virtual Memory. In reality, the MMU has physically scattered those 10MB into thousands of tiny, non-contiguous chunks across the physical RAM sticks. 

## 3. The Swapping Failsafe
What happens if you have 8GB of physical RAM, but you open 16GB worth of Chrome tabs? 
Without Virtual Memory, the PC crashes. With Virtual Memory, the OS simply takes 8GB of RAM, mathematically packages it, and writes it to your physical Hard Drive (the Swap File / Pagefile). The Virtual Addresses remain perfectly valid, but the physical data is hiding on the SSD. If Chrome requests that memory, the OS triggers a **Page Fault**, freezes Chrome, reads the data off the SSD back into RAM, and resumes.

<Callout icon="warning" title="Thrashing">
If your RAM is 100% full, the OS will spend all its time constantly swapping data back and forth between the RAM and the SSD. Because SSDs are 1,000x slower than RAM, the entire computer will grind to an absolute halt. This is known as Thrashing.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Paging/index.mdx': `---
title: Paging
description: The specific mathematical mechanism used by the OS and MMU to chop Virtual Memory into uniform blocks, enabling efficient translation and eliminating external fragmentation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Paging">

To implement Virtual Memory, the OS must track the translation mapping from Virtual Addresses to Physical Addresses. If the OS tracked every single byte individually, the translation map would be larger than the RAM itself. 

**Paging** solves this by chopping memory into larger, uniform blocks (usually 4 Kilobytes).

## 1. Pages and Frames
- **Pages**: Virtual Memory is mathematically chopped into 4KB blocks called Pages.
- **Frames**: Physical RAM is physically chopped into 4KB blocks called Frames.

The OS maintains a massive mathematical array called the **Page Table**. 
When a process wants to write to a Virtual Address, the CPU splits the address into two parts: the **Page Number** and the **Offset**.
1. It uses the Page Number to look up the array index in the Page Table.
2. The Page Table returns the physical Frame Number.
3. It attaches the Offset to the Frame Number to pinpoint the exact byte in the RAM stick.

## 2. Multi-Level Page Tables
On a 64-bit system, a single, flat Page Table would require Petabytes of RAM just to store the translation mappings (which is physically impossible). 
Modern OS architecture uses **Multi-Level Paging** (usually 4 levels deep). The OS only creates the lowest-level tables if the process is *actually* using that specific memory, saving massive amounts of RAM.

<ComparisonTable 
  headers={['Problem', 'Paging Solution']} 
  rows={[
    ['External Fragmentation', 'Completely eliminated. Because all physical Frames are exactly 4KB, any free Frame perfectly fits any Virtual Page.'],
    ['Internal Fragmentation', 'Still exists. If a process needs 1 byte of memory, the OS MUST give it an entire 4KB Page, wasting 4095 bytes.'],
    ['Translation Speed', 'Reading the Page Table in RAM takes time. Hardware mitigates this using a massive cache called the TLB.']
  ]} 
/>

<Callout icon="tip" title="Translation Lookaside Buffer (TLB)">
Every time the CPU reads memory, it must first read the Page Table to translate it, meaning 1 memory request actually takes 2 memory cycles (50% slower). The hardware **TLB** is an ultra-fast associative cache physically built into the CPU silicon. It memorizes the most recent Page-to-Frame translations. If a TLB Hit occurs, the translation happens in 1 nanosecond.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Mutexes/index.mdx': `---
title: Mutexes (Mutual Exclusion)
description: The fundamental synchronization lock that mathematically guarantees only a single thread can execute a critical section of code at any given time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Mutexes (Mutual Exclusion)">

When multiple Threads run concurrently, they share the same physical RAM. If two threads try to modify a shared variable (e.g., TICK1bank_balance += 100TICK1) at the exact same microsecond, the CPU instructions interleave, and the data is mathematically destroyed. This is a **Race Condition**.

A **Mutex (Mutual Exclusion object)** is a strict architectural lock that solves this by enforcing serialized access.

## 1. The Locking Mechanism
A Mutex acts like the single key to a public restroom.
1. Thread A wants to enter the **Critical Section** (the code that modifies the shared variable).
2. Thread A calls TICK1mutex.lock()TICK1. It takes the key and proceeds.
3. Thread B arrives and calls TICK1mutex.lock()TICK1. Because the key is missing, the OS instantly physically freezes (blocks) Thread B.
4. Thread A finishes and calls TICK1mutex.unlock()TICK1. 
5. The OS wakes up Thread B, hands it the key, and allows it to proceed.

## 2. Hardware Level Atomicity
How does the TICK1mutex.lock()TICK1 function itself avoid a race condition? If two threads call TICK1lock()TICK1 at the same time, who wins?
Mutexes mathematically rely on specialized CPU hardware instructions, such as **Compare-And-Swap (CAS)** or **Test-And-Set**. These instructions execute entirely inside the silicon in a single, uninterruptible clock cycle. They are mathematically atomic.

<Callout icon="warning" title="The Threat of Deadlocks">
Mutexes are dangerous. If Thread A locks Mutex 1, and Thread B locks Mutex 2... and then Thread A attempts to lock Mutex 2, and Thread B attempts to lock Mutex 1, they will both freeze. They are permanently waiting for each other to release the locks. This is a **Deadlock**, and it permanently crashes the application.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Semaphores/index.mdx': `---
title: Semaphores
description: A generalized signaling mechanism invented by Dijkstra that uses mathematical counters to control thread access to a finite pool of shared resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Semaphores">

Invented by Edsger W. Dijkstra in 1965, a **Semaphore** is a synchronization primitive. While a Mutex strictly protects a *single* resource (0 or 1), a Semaphore protects a *finite pool* of resources using a mathematical counter (N).

## 1. The Mathematical Counter
A semaphore is initialized with an integer \`N\` (e.g., 5 database connections).

It has two atomic operations (historically named by Dijkstra as P and V):
- **wait() / acquire()**: If the counter is > 0, it mathematically subtracts 1 and proceeds. If the counter is exactly 0, the thread is frozen by the OS.
- **signal() / release()**: Mathematically adds 1 to the counter. If any threads are currently frozen waiting, the OS instantly wakes exactly one of them up.

## 2. Mutex vs Semaphore

<ComparisonTable 
  headers={['Property', 'Mutex', 'Semaphore']} 
  rows={[
    ['Capacity', 'Strictly binary (0 or 1). Protects a single resource.', 'Can be initialized to any number N. Protects a pool of resources.'],
    ['Ownership', 'Strict Ownership. The thread that locked the Mutex is the ONLY thread allowed to unlock it.', 'No Ownership. Thread A can call TICK1wait()TICK1, and Thread B can completely independently call TICK1signal()TICK1 to wake it up.'],
    ['Primary Use Case', 'Preventing Race Conditions on shared variables.', 'Signaling between threads (Producer-Consumer problems).']
  ]} 
/>

## 3. The Producer-Consumer Problem
Semaphores are the mathematical backbone of Producer-Consumer architectures (like Thread Pools or Job Queues).
- You initialize a Semaphore to 0.
- 10 Worker Threads call TICK1wait()TICK1. Because it is 0, they all freeze.
- A Master Thread receives a web request. It puts the job in a queue and calls TICK1signal()TICK1. 
- The Semaphore hits 1. The OS instantly wakes up exactly one Worker Thread, who takes the job.

<Callout icon="info" title="Binary Semaphores">
If you initialize a Semaphore to exactly 1, it acts very similarly to a Mutex. However, because it lacks strict Ownership, it is still architecturally different. You should never use a Semaphore to protect a simple shared variable; always use a Mutex.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/System calls/index.mdx': `---
title: System Calls (Syscalls)
description: The highly secure, hardware-enforced mathematical bridge that allows User Space applications to request privileged actions from the OS Kernel.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="System Calls (Syscalls)">

Modern CPUs physically enforce two modes of operation:
1. **User Mode (Ring 3)**: Unprivileged. Chrome, Spotify, and your Python scripts run here. They cannot access the hard drive, the network card, or memory outside their sandbox.
2. **Kernel Mode (Ring 0)**: God mode. The OS Kernel runs here. It has absolute physical control over the hardware.

If your Python script wants to read a file from the SSD, it is mathematically incapable of doing it. It must ask the OS Kernel to do it on its behalf. This request is a **System Call**.

## 1. The Trap Instruction
A System Call is not a standard function call. A user program cannot simply jump into Kernel memory (the MMU would block it and crash the program). 
Instead, the program executes a special hardware CPU instruction called a **Trap** (or Software Interrupt).

1. The program places the ID of the specific Syscall (e.g., TICK1read()TICK1 is ID 0 in Linux) into a specific CPU register.
2. It executes the TICK1syscallTICK1 machine instruction.
3. The CPU hardware instantly and violently halts the program, elevates its physical privilege level to Ring 0, and jumps to a pre-defined OS memory address called the Interrupt Vector Table.
4. The OS looks at the register, realizes you want to read a file, verifies your permissions, reads the file, and then demotes the CPU back to User Mode.

## 2. The Performance Cost
Because a System Call triggers hardware-level context switching, privilege escalation, and security checks, it is incredibly slow compared to a normal function call.
If your code calls TICK1console.log()TICK1 or TICK1printf()TICK1 one million times in a loop, it will trigger one million Syscalls (TICK1write()TICK1), catastrophically destroying performance. 
This is why all standard libraries (like libc) heavily **Buffer** their I/O. They wait until they have a large chunk of text, and then issue a single Syscall to print it all at once.

<Callout icon="tip" title="Bypassing the Kernel">
In extreme high-performance environments (like High-Frequency Trading or Massive Network Routers), the latency of Syscalls is unacceptable. Advanced architectures use **Kernel Bypass** technologies (like DPDK), directly mapping the physical network card memory into User Space, completely eliminating the OS from the critical path.
</Callout>

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
