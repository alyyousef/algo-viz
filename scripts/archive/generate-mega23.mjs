import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/10. Operating Systems/OS fundamentals/index.mdx': `---
title: Operating System Fundamentals
description: The essential role of an Operating System as the supreme manager of hardware resources and provider of software abstractions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Operating System Fundamentals">

An **Operating System (OS)** is the most complex and critical piece of software running on a computer. It sits directly between the physical hardware (CPU, RAM, Hard Drives) and the user applications (Chrome, Video Games).

Without an OS, every software developer would have to write their own custom machine code to spin the hard drive platters and physically address the RAM chips just to save a text file.

<Callout icon="info" title="The Two Core Roles">
  1. **The Resource Manager**: The OS violently controls the hardware. It dictates exactly which program gets to use the CPU, how much RAM a program is allowed to consume, and prevents one crashing program from taking down the entire machine.
  2. **The Illusionist (Abstractions)**: The OS lies to user programs. It provides the illusion that a program has the entire CPU to itself (via Processes), that it has infinite memory (via Virtual Memory), and that the spinning magnetic disk is just a neat collection of folders (Filesystems).
</Callout>

## The Key Components

Every modern operating system (Windows, Linux, macOS) is built on a few foundational pillars:
- **The Kernel**: The invincible core of the OS that runs in privileged mode and talks directly to the hardware.
- **Process Management**: The scheduler that rapidly switches the CPU between hundreds of different programs to create the illusion of multitasking.
- **Memory Management**: The system (Virtual Memory/Paging) that safely allocates RAM and prevents programs from reading each other's data.
- **I/O and Filesystems**: The drivers and structures that allow software to interact with hard drives, keyboards, and network cards using simple commands like \\\`open()\\\`, \\\`read()\\\`, and \\\`write()\\\`.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Kernel/index.mdx': `---
title: The Kernel
description: The omnipotent core of the operating system that wields absolute power over the computer's hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Kernel">

The **Kernel** is the absolute core of the Operating System. It is the very first program loaded into RAM during the boot process (after the bootloader), and it remains in RAM until the computer is turned off. 

The Kernel is the ultimate dictator of the machine. It is the only software on the computer that has direct, unrestricted access to the CPU's hardware instructions, the MMU (Memory Management Unit), and the physical peripherals.

<Callout icon="warning" title="Absolute Power">
  If a normal user program (like a web browser) has a bug and tries to divide by zero or access restricted memory, the Kernel immediately catches the fault and terminates the browser. But if the **Kernel itself** has a bug and faults, there is no higher authority to catch it. The entire system instantly halts, resulting in a Kernel Panic or a Blue Screen of Death (BSOD).
</Callout>

## What does the Kernel do?

The Kernel is responsible for the lowest-level orchestration of the machine:
1. **Interrupt Handling**: It responds to hardware jolts (e.g., a keyboard press) in microseconds.
2. **Process Scheduling**: It decides which program gets to use which CPU core, and for exactly how many milliseconds.
3. **Memory Management**: It programs the CPU's MMU to map Virtual Memory to Physical RAM.
4. **Hardware Interfacing**: It contains (or loads) the Device Drivers necessary to talk to graphics cards, network interfaces, and storage controllers.

Because the Kernel is so powerful, modern CPUs enforce strict hardware boundaries to protect it from malicious or buggy user software. This is implemented via **Protection Rings** (Kernel Space vs User Space).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Kernel space/index.mdx': `---
title: Kernel Space (Ring 0)
description: The highly privileged, hardware-enforced memory boundary where the core Operating System runs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kernel Space">

Modern x86 processors implement hardware security called **Protection Rings**. 
- **Ring 0** is the most privileged state.
- **Ring 3** is the least privileged state.

**Kernel Space** is the chunk of physical RAM where the Kernel code and data are stored. When the CPU is executing code located in Kernel Space, it physically switches its internal hardware state to **Ring 0**. 

<Callout icon="warning" title="God Mode">
  When the CPU is in Ring 0, it is in "God Mode". It is allowed to execute *any* machine instruction, including highly dangerous commands like halting the processor, rewriting the Page Tables, or writing raw bytes directly to a hard drive controller.
</Callout>

## Hardware Enforcement

The division between Kernel Space and User Space is not a software suggestion; it is a physical hardware wall. 
If a user program running in Ring 3 tries to read a memory address that belongs to Kernel Space, the CPU hardware instantly blocks the read and throws a **Segmentation Fault**, forcing the OS to terminate the offending program. 

This strict separation is what makes modern operating systems stable. In the MS-DOS and Windows 95 era, there was no true hardware enforcement. A badly written video game could accidentally overwrite the OS's memory in Kernel Space, instantly crashing the entire computer. Today, a crashing game only crashes itself.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/User space/index.mdx': `---
title: User Space (Ring 3)
description: The restricted, heavily monitored sandbox where all standard applications and software run.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="User Space">

While the OS Kernel lives in Ring 0 (Kernel Space), every other program on your computer—Google Chrome, Microsoft Word, Steam, and even your terminal—runs in **User Space (Ring 3)**.

User Space is a heavily restricted sandbox. When the CPU is operating in Ring 3, it intentionally disables its most powerful hardware instructions.

<Callout icon="success" title="The Sandbox Restrictions">
  A program running in User Space **cannot**:
  - Talk directly to the hard drive, network card, or keyboard.
  - See or modify the physical memory of any other program.
  - Disable hardware interrupts.
  - Modify the CPU's memory management unit (MMU).
</Callout>

## How does anything get done?

If a User Space program isn't allowed to talk to the hard drive, how does it save a file? 
It must politely ask the Kernel to do it on its behalf.

It does this via a **System Call**. The program triggers a specific software interrupt (e.g., \\\`SYSCALL\\\`). The CPU immediately pauses the program, switches into Ring 0 (Kernel Mode), and jumps to a secure, pre-approved piece of OS code. The OS verifies that the user program has the correct permissions (e.g., "Are they allowed to write to this folder?"), and if so, the OS physically writes to the hard drive, switches back to Ring 3, and returns control to the program.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Monolithic vs microkernel/index.mdx': `---
title: Monolithic vs Microkernel
description: The fundamental architectural debate regarding how much code should actually live inside the highly privileged Kernel Space.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Monolithic vs Microkernel">

Since any bug in Kernel Space crashes the entire computer, OS architects face a massive design decision: *How much code should we actually put in the Kernel?*

This resulted in a famous architectural war in the 1990s between Linus Torvalds (creator of Linux) and Andrew Tanenbaum (creator of MINIX).

## 1. The Monolithic Kernel (Linux, Windows)
In a Monolithic architecture, **everything** runs in Kernel Space (Ring 0). This includes the core scheduler, the memory manager, the file system drivers (NTFS, EXT4), and every single device driver (Graphics cards, USB controllers). 
- **Pros**: It is blisteringly fast. Because everything is in the same memory space, the components can talk to each other instantly without overhead. 
- **Cons**: It is incredibly dangerous. If a third-party USB mouse driver has a bug, it crashes the entire server because it is running in Ring 0. The kernel binary is massive (millions of lines of code).

## 2. The Microkernel (MINIX, QNX, L4)
In a Microkernel architecture, the Kernel is stripped down to the absolute bare minimum: just CPU scheduling and basic IPC (Inter-Process Communication). 
Everything else—file systems, network stacks, and device drivers—runs as standard programs in **User Space (Ring 3)**.
- **Pros**: It is virtually indestructible. If the graphics driver crashes, the system doesn't BSOD. The Microkernel just notices the driver died and restarts it, all while the rest of the OS continues running flawlessly.
- **Cons**: It is slow. Because drivers and filesystems are in User Space, they must constantly use IPC to send messages to the microkernel and to each other, resulting in thousands of high-overhead context switches per second.

<Callout icon="info" title="Who Won?">
  For desktop and server computing, **Monolithic won**. Linux and Windows are monolithic (though Windows uses a hybrid approach to push some drivers to user-space). 
  However, for mission-critical systems (like pacemakers, fighter jets, and the OS running inside Intel's Management Engine), **Microkernels won** due to their mathematical provability and supreme stability.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/System calls/index.mdx': `---
title: System Calls (Syscalls)
description: The secure API that User Space programs use to request privileged operations from the Kernel.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="System Calls">

A **System Call (Syscall)** is the only legal way for a User Space program (Ring 3) to ask the Kernel (Ring 0) to do something privileged, like reading a file, opening a network socket, or allocating more RAM.

<Callout icon="warning" title="Crossing the Boundary">
  You cannot simply execute a standard function call (like \\\`goto\\\` or \\\`call\\\`) into Kernel memory. The CPU's hardware will block it with a Segmentation Fault. The boundary must be crossed using a highly orchestrated hardware trap.
</Callout>

## The Anatomy of a Syscall

Imagine a C program calls \\\`write(fd, "Hello", 5)\\\`. Here is what actually happens:

1. **The Wrapper**: The C Standard Library (glibc) prepares the request. It puts the arguments (the file descriptor, the text pointer, the length) into specific CPU registers.
2. **The Syscall Number**: glibc places the exact ID number of the \\\`write\\\` syscall (e.g., ID \\\`1\\\`) into the \\\`RAX\\\` register.
3. **The Trap (\\\`SYSCALL\\\`)**: The program executes a special assembly instruction (\\\`SYSCALL\\\` on modern x86, or \\\`INT 0x80\\\` historically).
4. **Hardware Switch**: The CPU completely suspends the program. It elevates its privilege level to Ring 0 (Kernel Mode) and jumps to a specific, predefined memory address (The Syscall Handler).
5. **Validation and Execution**: The Kernel looks at the \\\`RAX\\\` register, sees ID \\\`1\\\` (\\\`write\\\`), validates that the file descriptor is valid, and executes the physical hard drive write.
6. **Return (\\\`SYSRET\\\`)**: The Kernel places the result code (e.g., bytes written) into a register, drops its privileges back to Ring 3, and resumes the user program exactly where it left off.

This process is inherently slow. A single System Call takes hundreds of clock cycles due to the massive context switch and hardware state changes required. High-performance software goes to great lengths to batch operations to minimize syscall overhead.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Boot process (BIOS-UEFI/index.mdx': `---
title: The Boot Process (BIOS / UEFI)
description: The sequence of hardware and firmware events that occur the moment you press the power button on a computer.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Boot Process (BIOS / UEFI)">

When a computer is powered off, the RAM is completely empty. The CPU has absolutely no code to execute. The process of pulling the Operating System off the hard drive and into RAM is called **Bootstrapping** (or "Booting", from the phrase "pulling oneself up by one's bootstraps").

## Step 1: Power-On and The Reset Vector
When you press the power button, the motherboard's power supply stabilizes. Once stable, it sends a "Power Good" signal to the CPU. The CPU instantly wakes up, hardcodes its instruction pointer to a specific physical memory address called the **Reset Vector** (usually \\\`0xFFFFFFF0\\\`), and executes whatever code is there. 
This address is permanently wired to a ROM chip on the motherboard containing the BIOS or UEFI.

## Step 2: BIOS / UEFI
**BIOS (Basic Input/Output System)** was the 16-bit standard from the 1980s. 
**UEFI (Unified Extensible Firmware Interface)** is the modern 32/64-bit standard.

The firmware performs the following:
1. **POST (Power-On Self Test)**: It sends electrical pulses to the RAM, GPU, and keyboard to ensure the hardware is physically present and functioning.
2. **Hardware Initialization**: It configures basic clock speeds and memory timings.
3. **Boot Device Selection**: It checks its settings to see which hard drive, USB, or Network it should attempt to boot from.

## Step 3: Finding the Bootloader
The UEFI firmware cannot load Windows or Linux directly; it doesn't know how to parse complex filesystems like NTFS or EXT4. Its only job is to find a tiny, specialized piece of software called a **Bootloader** (like GRUB or Windows Boot Manager) located on the hard drive, load that tiny program into RAM, and hand control over to it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/bootloaders)/index.mdx': `---
title: Bootloaders (GRUB & Bootmgr)
description: The specialized software responsible for loading the massive OS Kernel into RAM and transitioning the CPU into protected mode.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bootloaders">

Once the motherboard's firmware (UEFI) finishes its hardware checks, it hands execution control over to the **Bootloader**. 

The bootloader is a highly specialized piece of software (like **GRUB** for Linux, or **Windows Boot Manager**) that sits on a special partition of your hard drive (the EFI System Partition). 

<Callout icon="info" title="Why do we need a Bootloader?">
  The motherboard firmware is too simple to understand complex operating systems. It doesn't know what a Kernel is, and it doesn't know how to read advanced filesystems. The Bootloader acts as the crucial middleman: it is smart enough to read the hard drive's filesystem, find the massive OS Kernel file, and load it into RAM.
</Callout>

## The Bootloader's Job

1. **Filesystem Drivers**: The bootloader contains just enough code to read basic filesystems (like FAT32 or EXT4). 
2. **The Menu**: If you have multiple operating systems installed (e.g., Dual Booting Linux and Windows), the bootloader presents a menu allowing you to choose which OS to boot.
3. **Loading the Kernel**: It locates the OS Kernel file (e.g., \\\`vmlinuz\\\` on Linux or \\\`ntoskrnl.exe\\\` on Windows) and copies it from the SSD into main RAM.
4. **Setting up the Environment**: Historically, CPUs boot in 16-bit "Real Mode" for backwards compatibility. The bootloader is responsible for switching the CPU into 32-bit or 64-bit "Protected Mode" and enabling basic Paging.
5. **The Handoff**: Once the Kernel is in RAM and the CPU is configured, the bootloader points the CPU's instruction pointer at the very first line of Kernel code and permanently exits. 

From that millisecond forward, the Operating System Kernel is awake, in RAM, and in total control of the machine.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Processes/index.mdx': `---
title: Processes
description: A running instance of a computer program, acting as an isolated container for code, memory, and resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Processes">

When you write a Python script or compile a C++ \\\`.exe\\\`, that file is just a static collection of bytes sitting dormant on your hard drive. It is a **Program**.

When you double-click that file and the OS loads it into RAM to execute it, it becomes a **Process**. A Process is an *active, running instance* of a program. 

<Callout icon="success" title="The Container Illusion">
  A Process is fundamentally a container. The OS provides each process with the illusion that it is the only program running on the computer. It believes it has the CPU all to itself, and it believes it has a massive, empty RAM space all to itself.
</Callout>

## What is inside a Process?

The OS tracks every process using a massive data structure called the **Process Control Block (PCB)**. A process contains:
1. **Memory Space**: Its own private Virtual Memory, divided into the Code (Text), Data, Heap (dynamic memory), and Stack (function calls).
2. **Execution State**: The current values of all CPU registers and the Program Counter (exactly which line of code it is currently executing).
3. **Resources**: A list of open file descriptors, network sockets, and permissions.

## Process Isolation

The most important feature of a process is **Isolation**. 
Because every process has its own Virtual Memory space (managed by hardware Paging), it is physically impossible for Process A to read or overwrite the memory of Process B. 

If you open two instances of Notepad, they are two completely separate Processes. If one instance encounters a fatal error and crashes, the other instance is completely unaffected because their memory spaces are violently isolated by the Kernel.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Threads/index.mdx': `---
title: Threads
description: The smallest unit of execution within an operating system, allowing a single process to do multiple things simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Threads">

A Process is a heavy, isolated container. However, what if a single program (like a Web Browser) needs to do two things at once? It needs to render the webpage on the screen, while simultaneously downloading a file in the background. 

If it creates a second Process to handle the download, the two processes are violently isolated from each other. They cannot easily share variables or memory. 

The solution is **Threads**. A Thread is a lightweight unit of execution that lives *inside* a Process. 

<Callout icon="success" title="Shared Memory">
  While multiple Processes share nothing, multiple Threads *inside the same process* share everything. They share the same Code, the same open files, and crucially, the same Heap memory. 
</Callout>

## The Anatomy of a Thread

If a Process has 3 threads, what do those threads actually own individually?
Every thread gets its own:
1. **Program Counter**: Thread 1 might be executing line 50, while Thread 2 is executing line 500.
2. **CPU Registers**: The thread's current mathematical calculations.
3. **The Stack**: Every thread gets its own private Stack memory to keep track of its own local function calls and local variables.

## Concurrency vs Parallelism

Threads allow for two distinct behaviors:
- **Concurrency (Single-Core CPU)**: The OS rapidly switches the CPU between Thread 1 and Thread 2 thousands of times a second. They aren't actually running at the exact same time, but the switching is so fast it creates the illusion of simultaneous execution.
- **Parallelism (Multi-Core CPU)**: The OS schedules Thread 1 to run physically on Core A, and Thread 2 to run physically on Core B. They execute at the exact same nanosecond.

Because threads share the same Heap memory, programming with them is incredibly dangerous. If Thread 1 and Thread 2 try to modify the same variable in memory at the exact same time, data corruption (a Race Condition) occurs. 

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Fibers/index.mdx': `---
title: Fibers (Green Threads)
description: Ultra-lightweight threads managed entirely by user-space software rather than the OS kernel, allowing for massive concurrency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fibers (Green Threads)">

Standard threads (Kernel Threads) are powerful, but they are heavy. If you try to spawn 100,000 standard threads in Java or C++, your computer will crash. The OS kernel requires massive amounts of RAM to track 100,000 thread states, and the CPU will spend 99% of its time performing expensive Context Switches rather than actually doing work.

To solve this, developers use **Fibers** (also known as Green Threads, Coroutines, or Goroutines).

<Callout icon="info" title="The Key Difference">
  - **Kernel Threads**: Managed by the OS Kernel in Ring 0. Heavy, true parallel execution.
  - **Fibers**: Managed by a software runtime (like the Go runtime) in User Space (Ring 3). The OS Kernel has no idea they exist.
</Callout>

## How Fibers Work

Imagine a Go program spawns 10,000 Goroutines (Fibers). 
The OS Kernel only sees the Go program as a standard Process with maybe 4 standard Kernel Threads. 
The Go runtime includes its own mini-scheduler in User Space. It multiplexes those 10,000 Fibers onto the 4 Kernel Threads. 

If Fiber #1 makes a network request and has to wait for a response, the Go runtime instantly pauses Fiber #1, saves its tiny state, and swaps Fiber #2 onto the Kernel thread to do work. 

## Advantages
Because Fibers are managed in User Space, swapping between them does not require a System Call or a Context Switch into Ring 0. The swap takes nanoseconds instead of microseconds. Furthermore, a Fiber only requires a few kilobytes of RAM for its stack, whereas a Kernel thread requires Megabytes. This allows modern languages (like Go, Erlang, or Kotlin with Coroutines) to easily handle millions of concurrent connections on a single server.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Context switching/index.mdx': `---
title: Context Switching
description: The heavy computational process of saving one program's state and loading another's so the CPU can multitask.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Context Switching">

A single CPU core can only execute exactly one instruction for one program at any given nanosecond. Yet, your computer runs 500 processes seemingly simultaneously. 

This illusion is created via **Context Switching**. The OS Kernel uses a hardware timer interrupt that fires every few milliseconds. When the timer fires, the Kernel forcibly pauses the current process, kicks it off the CPU, and puts a different process on the CPU.

<Callout icon="warning" title="Pure Overhead">
  Context Switching is pure overhead. While the CPU is performing a context switch, it is not executing user code, not rendering graphics, and not calculating math. It is just doing OS administrative paperwork. An OS must balance switching fast enough to feel responsive, but slow enough to not waste all the CPU's power on switching.
</Callout>

## The Anatomy of a Switch

When the Kernel switches the CPU from Process A to Process B, it must perfectly preserve Process A's state so it can be resumed later without it ever knowing it was paused.

1. **Save State**: The Kernel copies every single CPU Register (EAX, EBX, the Program Counter) and saves them into Process A's Process Control Block (PCB) in RAM.
2. **Memory Map Swap (The Heavy Part)**: The Kernel must reprogram the CPU's Memory Management Unit (MMU). It flushes the Translation Lookaside Buffer (TLB) and swaps out Process A's Page Table for Process B's Page Table. This is the most computationally expensive part of the switch.
3. **Restore State**: The Kernel reads Process B's PCB, copies its saved registers back into the physical CPU hardware, and points the Program Counter at Process B's next instruction. 
4. **Resume**: The CPU resumes executing Process B.

## Thread vs Process Switching

- **Process Context Switch**: Brutally slow. Requires a full MMU Page Table swap and TLB flush because the memory spaces are different.
- **Thread Context Switch**: Much faster. Because two threads within the same process share the same memory space, the Kernel only has to swap the CPU registers. The MMU and TLB remain untouched.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Real-time operating systems (RTOS)/index.mdx': `---
title: Real-Time Operating Systems (RTOS)
description: Specialized operating systems designed to guarantee absolute, mathematical predictability and strict timing deadlines.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Real-Time Operating Systems (RTOS)">

Standard operating systems like Windows, Linux, and macOS are **General Purpose OSs**. They are designed for "fairness" and "throughput." If you open Microsoft Word, the OS might take 5 milliseconds to respond, or it might take 500 milliseconds if the CPU is busy updating the system. You, the human, barely notice.

However, if the software is controlling the anti-lock brakes on a car, a robotic surgical arm, or the flight flaps of a fighter jet, a 500-millisecond delay results in death. 

These systems require a **Real-Time Operating System (RTOS)** (e.g., VxWorks, FreeRTOS, QNX).

<Callout icon="warning" title="Real-Time does NOT mean Fast">
  A common misconception is that an RTOS is "faster" than Linux. It is not. 
  "Real-Time" means **Predictable and Deterministic**. An RTOS mathematically guarantees that a specific task will be executed within a strict, non-negotiable time deadline (e.g., exactly 2.0 milliseconds), every single time, without fail.
</Callout>

## Hard vs Soft Real-Time

- **Hard Real-Time**: Missing a deadline causes catastrophic system failure. (e.g., A pacemaker failing to send an electrical pulse at the exact required millisecond).
- **Soft Real-Time**: Missing a deadline is bad, but the system survives. (e.g., A video decoding system dropping a frame, causing a slight visual stutter).

## How an RTOS works

To achieve absolute determinism, an RTOS fundamentally changes how the Kernel operates:
1. **Strict Preemption**: In an RTOS, if a high-priority task wakes up, it instantly, violently preempts (interrupts) any lower-priority task, even if that lower task is currently executing inside the Kernel.
2. **No Virtual Memory (Usually)**: Many RTOSs disable Paging entirely. Page Faults take unpredictable amounts of time (fetching data from a disk). In an RTOS, everything is pinned directly to physical RAM.
3. **No Garbage Collection**: Memory is strictly managed manually or pre-allocated at boot, because garbage collection pauses are unpredictable.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Hypervisor-level concerns/index.mdx': `---
title: Hypervisors & Virtualization
description: The technology that allows multiple full Operating Systems to run simultaneously on a single physical machine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hypervisors & Virtualization">

Traditionally, a single physical computer runs a single Operating System (OS). The OS has absolute, unquestioned control over the hardware. 

**Virtualization** changes this. It allows you to run multiple separate "Guest" Operating Systems (e.g., Windows and Linux) on the same physical hardware at the exact same time. This is the foundational technology that powers modern Cloud Computing (AWS, Azure).

To do this, we use a **Hypervisor** (also known as a Virtual Machine Monitor - VMM).

<Callout icon="success" title="The Illusion of Hardware">
  Just as an OS creates the illusion of infinite memory for a *Process*, a Hypervisor creates the illusion of an entire physical motherboard (CPU, RAM, Hard Drive) for a *Guest OS*. The Guest OS genuinely believes it is running on bare metal.
</Callout>

## Type 1 vs Type 2 Hypervisors

### Type 1: Bare-Metal (ESXi, Proxmox, Hyper-V)
The Hypervisor is the Operating System. It is installed directly onto the bare metal of the server. It is incredibly thin and its only job is to slice up the CPU and RAM into Virtual Machines (VMs) and run Guest OSs on top of them. Because there is no middleman, this is incredibly fast and used in enterprise data centers.

### Type 2: Hosted (VirtualBox, VMware Workstation)
You install a normal Host OS (like Windows 11). You then install the Hypervisor as a standard User Space application. The Hypervisor runs Guest VMs inside a window on your desktop. This is easier for consumers, but significantly slower because every hardware request from the Guest VM must be translated through the Hypervisor, and then translated *again* by the Host OS Kernel.

## Hardware-Assisted Virtualization (Intel VT-x / AMD-V)

In the early days, Hypervisors had to use insane software hacks (Binary Translation) to intercept privileged Ring 0 commands issued by the Guest OS, because you can't have two OSs in Ring 0 at the same time. 
Modern CPUs solved this by adding **Ring -1**. The physical CPU hardware natively understands virtualization. The Hypervisor runs in Ring -1 (Absolute God Mode), allowing the Guest OS to safely run in Ring 0 without actually controlling the physical host hardware.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Device drivers/index.mdx': `---
title: Device Drivers
description: Specialized software modules that translate generic OS commands into the proprietary electrical signals required by specific hardware peripherals.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Device Drivers">

When you plug a brand new, RGB-lit mechanical gaming keyboard into your computer, the Operating System Kernel has absolutely no idea what it is. The Kernel only knows how to speak "Generic OS". It doesn't know the proprietary electrical language required to talk to this specific piece of plastic and silicon.

A **Device Driver** is the translator. It is a piece of software provided by the hardware manufacturer (e.g., Razer, Nvidia) that acts as an adapter between the OS Kernel and the physical device.

<Callout icon="warning" title="The Weakest Link">
  In monolithic kernels (like Windows and Linux), Device Drivers run directly in Ring 0 (Kernel Space) for maximum performance. This means a bug in a 3rd-party graphics or network driver can (and frequently does) crash the entire Operating System via a Blue Screen of Death.
</Callout>

## How Drivers Work

The OS defines a generic API. For example, it demands that every storage device must implement a function called \\\`read_block()\\\`.

1. **The Request**: A user program asks to read a file. The OS Kernel figures out the file is on an NVMe SSD. The OS calls the generic \\\`read_block()\\\` function.
2. **The Translation**: The NVMe Device Driver intercepts this generic command. It translates it into the highly proprietary, complex sequence of PCIe register writes required by that specific brand of SSD.
3. **The Execution**: The hardware performs the electrical read. It sends a Hardware Interrupt back to the CPU.
4. **The Response**: The Driver catches the interrupt, translates the proprietary SSD data back into a generic block of bytes, and hands it back to the OS Kernel.

## Plug and Play (PnP)

In the MS-DOS era, installing hardware was a nightmare. The user had to manually type in the physical memory addresses and IRQ (Interrupt Request) numbers for every sound card. 

Modern systems use **Plug and Play**. When you plug in a USB device, the motherboard hardware detects the electrical connection and asks the device for its **Hardware ID** (Vendor ID & Product ID). The OS takes this ID, searches its driver store (or Windows Update) for a matching driver, dynamically loads the driver into Kernel memory on the fly, and the device instantly starts working without a reboot.

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
