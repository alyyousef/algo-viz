import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/9. Computer Architecture/CPU/index.mdx': `---
title: Central Processing Unit (CPU)
description: The primary component of a computer that acts as its "brain," responsible for executing instructions and orchestrating hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Central Processing Unit (CPU)">

The **Central Processing Unit (CPU)** is the electronic circuitry that executes instructions comprising a computer program. Often referred to as the "brain" of the computer, the CPU performs basic arithmetic, logic, controlling, and input/output (I/O) operations specified by the instructions in the program.

<Callout icon="info" title="The Instruction Cycle">
  The fundamental operation of most CPUs, regardless of the physical form they take, is to execute a sequence of stored instructions. This sequence is executed in a continuous loop called the **Fetch-Decode-Execute** cycle.
</Callout>

## Core Components

While modern multi-core processors are incredibly complex, a traditional CPU is conceptually broken down into three primary components:

1. **ALU (Arithmetic Logic Unit)**: The calculator. It performs all mathematical (addition, subtraction) and logical (\\\`AND\\\`, \\\`OR\\\`, \\\`NOT\\\`) operations.
2. **Control Unit (CU)**: The traffic cop. It extracts instructions from memory, decodes them, and directs the ALU, memory, and I/O devices on how to respond.
3. **Registers**: Extremely small, blazing-fast memory locations housed directly on the CPU. They hold the immediate data the ALU is currently calculating and keep track of the next instruction to execute.

## Clock Speed

The CPU's operation is synchronized by a central **Clock**. Every tick of the clock allows the CPU to perform one fundamental step of the Fetch-Decode-Execute cycle. 

Clock speed is measured in Hertz (Hz). A modern CPU running at **4.0 GHz** (Gigahertz) is ticking **4 billion times per second**. While a higher clock speed generally implies a faster CPU, the amount of work completed per tick (Instructions Per Clock, IPC) is equally important when comparing different architectures.

## The Bottleneck Problem

In modern computing, the CPU is so incomprehensibly fast that it spends a massive percentage of its time simply waiting for data to arrive from the main memory (RAM). To solve this, engineers introduced **Caches** (L1, L2, L3) — layers of fast, expensive SRAM placed physically closer to the CPU cores to feed them data as quickly as possible.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/ALU/index.mdx': `---
title: Arithmetic Logic Unit (ALU)
description: The digital circuit within the CPU that performs all arithmetic and bitwise logical operations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Arithmetic Logic Unit (ALU)">

The **Arithmetic Logic Unit (ALU)** is the computational heart of the CPU. While the Control Unit handles moving data around, the ALU is the component that actually *does the math*. It is a complex digital circuit composed entirely of basic logic gates (\\\`AND\\\`, \\\`OR\\\`, \\\`NOT\\\`) configured into adders, multiplexers, and shifters.

<Callout icon="success" title="Everything is Math">
  Under the hood, almost all computational tasks reduce down to simple integer mathematics and bit-shifting. Moving a window across your screen, rendering text, or encrypting a password all eventually rely on the ALU crunching raw binary numbers.
</Callout>

## The Two Halves of the ALU

As its name suggests, the ALU handles two distinct types of operations:

1. **Arithmetic Operations**: Addition, subtraction, and sometimes multiplication/division. (Note: Many modern CPUs offload complex floating-point decimals to a specialized FPU — Floating-Point Unit).
2. **Logical Operations**: Bitwise operations like \\\`AND\\\`, \\\`OR\\\`, \\\`XOR\\\`, and \\\`NOT\\\`, as well as bit-shifting (moving all 1s and 0s to the left or right, which is a highly optimized way to multiply or divide by 2).

## How the ALU Operates

The ALU takes in three primary inputs:
- **Operands**: The two pieces of data being calculated (e.g., the number \\\`5\\\` and the number \\\`3\\\`), usually pulled directly from the CPU's Registers.
- **Opcode (Operation Code)**: A binary signal from the Control Unit telling the ALU exactly *what* to do with the operands (e.g., \\\`001\\\` might mean ADD, while \\\`010\\\` might mean subtract).

It produces two outputs:
- **Result**: The mathematical answer (e.g., \\\`8\\\`), which is immediately stored back into a register.
- **Status Flags**: A set of 1-bit indicators that inform the Control Unit about the result. Common flags include:
  - **Zero Flag (Z)**: Set to \\\`1\\\` if the result of the calculation was exactly zero. (Used constantly in \\\`if/else\\\` statements).
  - **Negative Flag (N)**: Set to \\\`1\\\` if the result was a negative number.
  - **Overflow Flag (V)**: Set to \\\`1\\\` if the result was too large to fit in the physical hardware (e.g., trying to store \\\`300\\\` in an 8-bit register that maxes out at \\\`255\\\`).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Control unit/index.mdx': `---
title: Control Unit (CU)
description: The component of the CPU that directs the operation of the processor, acting as the orchestra conductor for the hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Control Unit (CU)">

If the ALU is the calculator of the CPU, the **Control Unit (CU)** is the orchestrator. It does not perform any actual data processing or math; instead, it is entirely responsible for directing the flow of data across the motherboard and ensuring the correct components activate at the exact right microsecond.

<Callout icon="info" title="The Orchestra Conductor">
  Think of the Control Unit like a conductor of a symphony. The conductor doesn't play an instrument (perform math), but they read the sheet music (the program code) and point their baton at the violins (the ALU) or the cellos (the RAM) telling them exactly when to play and how loud.
</Callout>

## The Fetch-Decode-Execute Cycle

The CU spends its entire existence looping through a strict three-step cycle:

1. **Fetch**: The CU looks at the Program Counter (a register holding the memory address of the next instruction). It sends a signal to the RAM to fetch the binary instruction stored at that address, and places it into the Instruction Register.
2. **Decode**: The CU reads the binary instruction (e.g., \\\`10110000\\\`). It translates this binary into specific hardware signals. It determines "This is an ADD instruction, and it needs data from Register A and Register B."
3. **Execute**: The CU sends electrical signals across the CPU's control bus. It might tell the memory to send a byte of data, tell the ALU to add two numbers, or tell a register to save a result. 

## Hardwired vs. Microprogrammed

Historically, there are two ways engineers design Control Units:

- **Hardwired Control**: The logic is literally physically wired into the silicon using complex logic gates. It is incredibly fast, but completely rigid. If a bug is found in the instruction set, the physical chip must be thrown in the garbage.
- **Microprogrammed Control**: A mini-computer inside the computer. Complex instructions are broken down into smaller "micro-instructions" stored in a tiny read-only memory (ROM) inside the CPU. This is slower, but allows CPU manufacturers (like Intel or AMD) to patch CPU bugs via "microcode updates" downloaded over the internet without changing the physical silicon.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Registers/index.mdx': `---
title: CPU Registers
description: The smallest, fastest, and most expensive tier of memory, located directly on the CPU die.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CPU Registers">

While RAM provides gigabytes of storage, the CPU cannot do math directly on data sitting in RAM. The data must first be pulled all the way across the motherboard and placed directly inside the CPU. 
The holding cells where this data sits are called **Registers**.

Registers are the absolute top of the memory hierarchy. They are built out of Flip-Flop circuits, meaning they can be read from and written to in a single tick of the CPU clock (zero latency). Because they are so large and expensive to manufacture, a standard CPU only has a few dozen registers, often holding just 64 bits (8 bytes) of data each.

<Callout icon="success" title="The 64-Bit Architecture">
  When you download a "64-bit" operating system or program, it means the software is specifically compiled to utilize a CPU where the General Purpose Registers are exactly 64 bits wide. This allows the CPU to process massively larger numbers in a single cycle compared to older 32-bit architecture.
</Callout>

## Types of Registers

Registers are divided into two main categories: those the programmer can use, and those the CPU uses internally.

### General Purpose Registers (GPR)
These are the temporary scratchpads used by the ALU to do math. In x86 assembly language, you will see these named things like \\\`RAX\\\`, \\\`RBX\\\`, \\\`RCX\\\`. If you want to add 5 and 3, you move \\\`5\\\` into \\\`RAX\\\`, move \\\`3\\\` into \\\`RBX\\\`, and tell the ALU to add them.

### Special Purpose Registers
These are internal state-trackers critical to the CPU's operation.
- **Program Counter (PC) / Instruction Pointer (IP)**: Holds the exact memory address in RAM of the *next* instruction to be executed.
- **Instruction Register (IR)**: Holds the actual binary instruction that is *currently* being decoded by the Control Unit.
- **Stack Pointer (SP)**: Points to the top of the Call Stack in RAM, crucial for keeping track of function calls and local variables.
- **Status Register / Flags**: A collection of 1-bit booleans updated by the ALU (e.g., "Was the last calculation zero?", "Did the last calculation overflow?").

## The Assembly Bottleneck

Because there are only ~16 to 32 General Purpose Registers, compiler engineers spend massive amounts of time writing "Register Allocation" algorithms. The goal of a C++ or Rust compiler is to intelligently juggle variables in and out of these 16 registers to ensure the CPU never wastes time waiting for data to fetch from RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Cache (L1-L2-L3)/index.mdx': `---
title: CPU Cache (L1, L2, L3)
description: The high-speed memory hierarchy designed to bridge the massive speed gap between the blazing fast CPU and the agonizingly slow main RAM.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CPU Cache (L1, L2, L3)">

Over the last three decades, CPU speeds increased exponentially (following Moore's Law), but RAM speeds did not keep up. 

Today, a CPU takes about **1 nanosecond** to execute an instruction. However, fetching data from Main Memory (RAM) takes roughly **100 nanoseconds**. If the CPU had to wait for RAM on every single instruction, it would spend 99% of its life doing absolutely nothing. 
To solve this "Memory Wall," engineers introduced the **Cache Hierarchy**.

<Callout icon="info" title="The Desk Analogy">
  - **Registers**: What you are currently holding in your hands (instant).
  - **L1/L2 Cache**: Papers sitting on your desk (fast, but limited space).
  - **RAM**: A filing cabinet across the room (slow, but holds thousands of papers).
  - **Hard Drive**: A warehouse across town (massive, but takes days to retrieve).
</Callout>

## The Cache Hierarchy

Caches are made of SRAM (Static RAM), which is incredibly fast but physically massive and incredibly expensive, meaning we can only fit a tiny amount on the CPU die. Modern CPUs use a tiered approach:

1. **L1 Cache (Level 1)**: 
   - **Size**: ~64 KB per core.
   - **Speed**: ~1-2 nanoseconds (instant).
   - **Location**: Physically integrated directly inside the execution core. Often split into L1i (Instruction Cache) and L1d (Data Cache).
2. **L2 Cache (Level 2)**:
   - **Size**: ~256 KB to 1 MB per core.
   - **Speed**: ~3-10 nanoseconds.
   - **Location**: Typically dedicated per-core, but sitting slightly outside the immediate execution pipeline.
3. **L3 Cache (Level 3)**:
   - **Size**: ~10 MB to 64+ MB (Massive).
   - **Speed**: ~10-20 nanoseconds.
   - **Location**: **Shared** across all CPU cores. If Core 1 fetches a webpage, Core 2 can instantly access that data from the shared L3 cache.

## Hits and Misses

When the CPU needs data, it checks the caches in order: L1 $\\rightarrow$ L2 $\\rightarrow$ L3.
- **Cache Hit**: The data was found! The CPU proceeds without stalling.
- **Cache Miss**: The data was not found. The CPU halts entirely, reaching out to the slow RAM. When the data finally arrives from RAM, it is copied into the L3, L2, and L1 caches simultaneously in case it is needed again soon.

## Spatial and Temporal Locality

Caches are highly predictive, relying on two computer science principles:
1. **Temporal Locality**: If a program accesses a variable \\\`x\\\`, it is highly likely it will access \\\`x\\\` again very soon (e.g., a counter in a \\\`for\\\` loop).
2. **Spatial Locality**: If a program accesses memory address \\\`1000\\\`, it is highly likely it will access address \\\`1001\\\` immediately after (e.g., iterating through an Array). Therefore, when a CPU suffers a Cache Miss for address \\\`1000\\\`, it doesn't just pull 1 byte from RAM; it pulls an entire 64-byte "Cache Line," pre-fetching the surrounding data for free.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Virtual memory/index.mdx': `---
title: Virtual Memory
description: The operating system abstraction that gives every program the illusion it has a massive, contiguous block of RAM entirely to itself.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Virtual Memory">

In the early days of computing, if you opened a program, it was loaded directly into physical RAM. If Program A was loaded at address \\\`0\\\` and Program B was loaded at address \\\`1000\\\`, a bug in Program A could easily overwrite Program B's data, causing the entire computer to crash. Furthermore, if you only had 16 MB of RAM, and you tried to open 20 MB of programs, the OS would simply refuse.

**Virtual Memory** is arguably the most brilliant abstraction in operating system design, completely solving both of these problems.

<Callout icon="success" title="The Grand Illusion">
  With Virtual Memory, a program never touches actual physical RAM. Instead, the OS lies to every program, giving it a "Virtual Address Space" starting at address 0. Program A thinks it owns all the memory in the world. Program B thinks it owns all the memory in the world. The hardware secretly translates these fake virtual addresses into real physical addresses on the fly.
</Callout>

## Paging and the Page Table

The OS chops the Virtual Memory and Physical RAM into fixed-size chunks called **Pages** (typically 4 KB each). 

The OS maintains a massive dictionary in RAM called the **Page Table**. 
When Program A asks to read from Virtual Address \\\`0x0000\\\`, the CPU pauses, looks up \\\`0x0000\\\` in the Page Table, discovers it actually maps to Physical RAM Address \\\`0x8F00\\\`, and transparently routes the request there. 

### Security via Isolation
If Program A tries to read from a virtual address that the OS hasn't mapped, or tries to read memory belonging to Program B, the CPU hardware triggers a fatal exception (a **Segmentation Fault**) and instantly kills the malicious program, keeping the rest of the OS perfectly safe.

## Swapping (Paging to Disk)

What happens if you have 16 GB of physical RAM, but you open 30 GB of Google Chrome tabs? 

Because of Virtual Memory, the OS doesn't crash. Instead, it looks at the Page Table and finds "Cold Pages" — data belonging to programs you haven't clicked on in a while. The OS copies those 4 KB pages out of RAM and saves them onto your slow Hard Drive (the Swap File / Pagefile). It then hands that newly freed physical RAM to your active Chrome tab.

If you switch back to the old program, the CPU suffers a **Page Fault**. The OS pauses the program, reads the data off the hard drive back into RAM, updates the Page Table, and resumes the program. This allows you to run far more software than your physical RAM could ever hold, albeit at the cost of hard drive latency.

## The TLB (Translation Lookaside Buffer)

Translating a Virtual Address to a Physical Address requires looking up the Page Table. But the Page Table is stored in RAM! This means every memory request would require *two* trips to RAM (one to translate the address, one to fetch the actual data), slashing performance in half. 
To fix this, the CPU has a specialized hardware cache called the **TLB (Translation Lookaside Buffer)**. The TLB caches recent translations. If the translation is in the TLB (a TLB Hit), the CPU resolves the address instantly without checking the Page Table.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Von Neumann vs Harvard architecture/index.mdx': `---
title: Von Neumann vs Harvard Architecture
description: The two foundational paradigms of computer architecture dictating how instructions and data are stored and accessed in memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Von Neumann vs Harvard Architecture">

At the dawn of computing, engineers had to solve a fundamental problem: A computer needs to store two entirely different things to function:
1. **Instructions**: The actual code/program telling the computer what to do.
2. **Data**: The variables, strings, and numbers being manipulated.

How should this memory be physically wired? This debate birthed two distinct architectures that still dictate modern hardware design today.

---

## The Von Neumann Architecture

Defined by John von Neumann in 1945, this architecture is brilliantly simple: **Instructions and Data share the exact same memory space and the exact same data bus.**

If you look at the RAM in your laptop, it contains both your compiled C++ code and the images you are editing. 

### Advantages:
- **Simplicity & Cost**: You only need one physical memory chip and one set of wires (bus) connecting the CPU to the RAM.
- **Flexibility**: If your program is small, you have massive amounts of RAM left over for data. If your program is huge, you can sacrifice data space. The system dynamically adapts.

### The Von Neumann Bottleneck:
Because both instructions and data share a single wire to the CPU, the CPU can only fetch *either* an instruction *or* a piece of data at any given microsecond. It cannot fetch both simultaneously. As CPUs became blisteringly fast, this shared bus became the ultimate bottleneck, starving the CPU of data.

---

## The Harvard Architecture

Developed around the same time for the Harvard Mark I, this architecture enforces strict physical separation. **There is one physical memory chip for Instructions, and a completely separate physical memory chip for Data.** 

### Advantages:
- **Zero Bottleneck**: The CPU has two separate wires (buses). It can fetch the next instruction from the Instruction Memory *at the exact same time* it fetches a variable from the Data Memory, effectively doubling throughput.
- **Security**: Because the Data Memory is physically disconnected from the Instruction Memory, it is impossible for a hacker to trick the CPU into executing a malicious variable as code (preventing many Buffer Overflow attacks).

### Disadvantages:
- **Rigidity**: If you have 10 MB of Instruction Memory and 10 MB of Data Memory, and you write a program that is 11 MB of code, it will crash. It does not matter that the Data Memory is completely empty; the spaces cannot be shared.

---

## The Modern Compromise: Modified Harvard Architecture

If you look at modern Intel/AMD processors, they use a brilliant hybrid approach called the **Modified Harvard Architecture**.

- **Main Memory (RAM)**: Out in the motherboard, the system uses the cheap, flexible **Von Neumann** architecture. All code and data share your 16 GB of RAM.
- **L1 CPU Cache**: Deep inside the CPU silicon, where speed is critical, the architecture splits into strict **Harvard**. The L1 cache is explicitly divided into an \\\`L1i\\\` (Instruction Cache) and an \\\`L1d\\\` (Data Cache). This allows the CPU execution core to fetch instructions and data simultaneously at lightning speed, getting the best of both worlds!

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Instruction set architecture (ISA)/index.mdx': `---
title: Instruction Set Architecture (ISA)
description: The critical bridge between hardware and software, defining the exact vocabulary of commands a specific CPU understands.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Instruction Set Architecture (ISA)">

A CPU is just a rock of silicon that reacts to electrical pulses. It does not understand C++, Python, or Java. It only understands raw binary \\\`1\\\`s and \\\`0\\\`s. 

But *which* binary patterns mean what? If you send the binary \\\`10101010\\\` to the CPU, does it add two numbers, or does it reboot the computer? 
The answer is defined by the **Instruction Set Architecture (ISA)**.

<Callout icon="info" title="The Contract">
  The ISA is the ultimate contract between software engineers and hardware engineers. 
  Hardware engineers agree: "If you build your silicon to react to these specific binary patterns, it will run the code."
  Software engineers (Compiler writers) agree: "If we compile our C++ code into these specific binary patterns, the hardware will execute it correctly."
</Callout>

## What does an ISA define?

An ISA serves as the API for the hardware. It explicitly defines:
1. **The Instructions**: The exact list of commands the CPU can execute (e.g., \\\`ADD\\\`, \\\`SUB\\\`, \\\`JUMP\\\`, \\\`LOAD\\\`, \\\`STORE\\\`).
2. **The Registers**: How many General Purpose Registers exist, and how large they are (e.g., 16 registers, 64-bit wide).
3. **Addressing Modes**: The specific rules for how the CPU can interact with RAM (e.g., can it read directly from RAM, or must it load data into a register first?).
4. **Data Types**: Whether the hardware natively understands floating-point decimals, or only integers.

## Assembly Language

Because humans cannot read raw binary (\\\`10001011 01000101...\\\`), we created **Assembly Language**. Assembly is simply a human-readable text representation of the ISA. Every single Assembly command (like \\\`MOV EAX, 1\\\`) maps 1-to-1 to a raw binary instruction.

Because different ISAs have different vocabularies, Assembly code is *not* portable. Assembly written for an Intel CPU (x86) will look completely different and fail to run on an Apple Silicon CPU (ARM).

## The Big Two ISAs

Today, the entire world is dominated by two primary ISAs, representing two entirely different design philosophies:

1. **x86-64 (Intel & AMD)**: The absolute king of Desktop PCs, Laptops, and Cloud Servers. It is a **CISC** (Complex Instruction Set Computer) architecture, containing thousands of complex instructions.
2. **ARM (Apple, Qualcomm, Samsung)**: The absolute king of Mobile Phones, IoT devices, and increasingly MacBooks (Apple Silicon). It is a **RISC** (Reduced Instruction Set Computer) architecture, focusing on power efficiency and simplicity.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/CISC/index.mdx': `---
title: CISC (Complex Instruction Set Computer)
description: A CPU design philosophy that emphasizes complex, multi-step instructions that can perform heavy memory operations in a single line of code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CISC (Complex Instruction Set Computer)">

In the 1970s and 1980s, computer memory (RAM) was incredibly expensive, costing hundreds of dollars for a few kilobytes. Compilers (software that translates high-level code to assembly) were also very primitive. 

Because memory was so scarce, hardware engineers needed a way to write programs using as few bytes as possible. This birthed the **CISC (Complex Instruction Set Computer)** philosophy.

<Callout icon="info" title="The CISC Philosophy">
  The goal of CISC is to give the CPU a massive vocabulary of incredibly complex, specialized instructions. Instead of requiring the software to execute 5 simple instructions to multiply two numbers stored in RAM, the hardware provides a single, complex \\\`MULTIPLY\\\` instruction that does it all in one line.
</Callout>

## Characteristics of CISC

1. **Complex Instructions**: A single instruction can span multiple cycles. It can fetch data from memory, perform math on it, and store it back into memory, all within one command.
2. **Variable-Length Instructions**: To save memory space, simple instructions might be 1 byte long, while complex instructions might be 15 bytes long.
3. **Heavy Silicon / Microcode**: Because the instructions are so complex, the physical CPU silicon is massive. The Control Unit must use a "Microprogram" (a tiny interpreter inside the CPU) to break the complex instructions down into smaller steps the hardware can actually execute.
4. **Fewer Registers**: Because instructions can operate directly on RAM, the CPU doesn't need to juggle as many local registers.

## The x86 Monopoly

The most famous CISC architecture in the world is **x86**, created by Intel in 1978 and expanded to 64-bit by AMD. 
For 40 years, x86 has dominated the Desktop, Laptop, and Server markets. Because of strict backwards compatibility, a modern Intel i9 processor still physically contains the circuitry to run 16-bit code written for MS-DOS in the 1980s. 

Because of this historical baggage, x86 is a sprawling, incredibly complex ISA with thousands of instructions (including bizarre, highly specific instructions for video decoding and string manipulation).

## The Decline of Pure CISC

As memory became dirt-cheap in the 1990s, the primary advantage of CISC (saving memory space) vanished. Furthermore, complex, variable-length instructions made it incredibly difficult to implement **Pipelining** (running multiple instructions overlapping at the same time). 

Modern Intel and AMD processors are no longer "pure" CISC. While they accept complex x86 instructions from the software, the hardware immediately translates them into simple, RISC-like "Micro-Ops" behind the scenes before executing them.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/RISC/index.mdx': `---
title: RISC (Reduced Instruction Set Computer)
description: A CPU design philosophy that emphasizes a small, highly optimized set of simple instructions, resulting in blazing fast and power-efficient processors.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RISC (Reduced Instruction Set Computer)">

As memory became cheap in the 1980s, computer scientists at IBM and UC Berkeley realized a fundamental flaw in the CISC (Complex Instruction Set Computer) philosophy: 
*Compilers almost never used the complex instructions.* 

Hardware engineers were wasting massive amounts of silicon designing specialized instructions that were too difficult for compilers to actually utilize. The CPU was huge, hot, and power-hungry for no reason. 
This realization birthed the **RISC (Reduced Instruction Set Computer)** revolution.

<Callout icon="success" title="The RISC Philosophy">
  Strip away all the complex, multi-step instructions. Give the CPU a very small vocabulary of extremely simple instructions that execute in exactly one clock cycle. The programs will require more lines of code (using more RAM), but the physical CPU will be so small and fast that it will outperform CISC.
</Callout>

## Characteristics of RISC

1. **Simple, Single-Cycle Instructions**: Every instruction takes exactly one tick of the CPU clock to execute.
2. **Fixed-Length Instructions**: Every instruction is exactly the same size (e.g., exactly 32 bits long). This makes fetching and decoding blazing fast, because the CPU knows exactly where one instruction ends and the next begins.
3. **Load/Store Architecture**: The ALU is strictly forbidden from doing math on data sitting in RAM. You must explicitly \\\`LOAD\\\` data from RAM into a Register, do the math inside the CPU, and explicitly \\\`STORE\\\` it back. 
4. **Many Registers**: Because everything must be loaded into the CPU before math can be done, RISC architectures provide a massive amount of General Purpose Registers (usually 32 or more) to act as a scratchpad.
5. **Pipelining Excellence**: Because every instruction takes exactly one cycle, it is incredibly easy for the CPU to overlap them on an assembly line (Pipelining), achieving massive throughput.

## The ARM Revolution

The most famous RISC architecture is **ARM** (Advanced RISC Machines). 
Because RISC processors require significantly fewer transistors than CISC processors, they draw a fraction of the electricity and produce almost no heat. 

This made ARM the undisputed king of mobile computing. Every single smartphone on earth (Apple or Android) uses a RISC processor. Recently, Apple transitioned their entire laptop and desktop line away from Intel (CISC) to Apple Silicon (M1/M2/M3 chips), proving that RISC can match and beat CISC in high-performance desktop computing while preserving massive battery life.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/x86/index.mdx': `---
title: x86 Architecture
description: The dominant CISC architecture powering the vast majority of the world's desktop PCs, laptops, and cloud infrastructure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="x86 Architecture">

The **x86** architecture is the most successful and enduring Instruction Set Architecture (ISA) in the history of computing. Developed by Intel in 1978 with the release of the 16-bit 8086 processor, it has evolved into the absolute monopoly of the PC and Server markets, jointly controlled today by Intel and AMD.

<Callout icon="warning" title="The Burden of Backwards Compatibility">
  The defining characteristic of x86 is its unwavering commitment to backwards compatibility. If you take a compiled \\\`.exe\\\` program from 1985 written for MS-DOS, it will run natively on a modern 24-core Intel i9 processor. The silicon physically retains all the legacy instructions, quirks, and memory addressing modes from the last 40 years.
</Callout>

## The Evolution of x86

- **16-bit Era (1978)**: The original Intel 8086. It introduced the foundational architecture and the famous registers still used today (AX, BX, CX, DX).
- **32-bit Era (x86-32 / IA-32) (1985)**: Introduced with the Intel 80386. It expanded the registers to 32 bits (EAX, EBX) and introduced proper Virtual Memory, ushering in the modern era of computing and Windows 95.
- **64-bit Era (x86-64 / AMD64) (2003)**: In a shocking twist, AMD beat Intel to the 64-bit market. Intel tried to release a brand new, non-compatible 64-bit architecture called Itanium, which failed spectacularly. AMD simply extended the existing x86 architecture to 64-bit (expanding registers to RAX, RBX). Intel was forced to license AMD's design, which is why 64-bit Windows installers are still named \\\`amd64.exe\\\` regardless of whether you have an Intel or AMD chip.

## Under the Hood: CISC masking as RISC

x86 is deeply rooted in the **CISC** (Complex Instruction Set) philosophy. It has thousands of massive, variable-length instructions ranging from 1 to 15 bytes long. 

However, complex instructions are impossible to run efficiently at high clock speeds. Therefore, modern x86 processors (since the Pentium Pro in 1995) perform a magic trick in hardware:
When the CPU fetches a complex x86 instruction, a massive hardware decoder instantly breaks it apart into tiny, simple, RISC-like instructions called **Micro-Ops**. The internal execution engine of an Intel or AMD chip is actually a highly advanced RISC processor, hiding behind an incredibly complex x86 translator!

## The Duopoly

Building a high-performance x86 processor is incredibly difficult due to the sheer complexity of the decoder, and legally impossible for most companies because Intel and AMD hold a cross-licensing duopoly on the patents. If a company like Google or Amazon wants to build their own custom cloud processors, they cannot build x86 chips—which is exactly why the industry is shifting rapidly toward ARM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/ARM/index.mdx': `---
title: ARM Architecture
description: The dominant RISC architecture powering all smartphones, IoT devices, and increasingly, modern high-performance laptops and cloud servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ARM Architecture">

While x86 dominates the desktop, **ARM (Advanced RISC Machines)** is the most widely manufactured CPU architecture in human history. 

Rooted in the **RISC** (Reduced Instruction Set Computer) philosophy, ARM was designed from day one to execute simple instructions efficiently. Because it lacks the massive, complex decoding hardware required by x86, ARM processors require significantly fewer transistors. This results in chips that draw a fraction of the electricity and produce minimal heat, making them the undisputed kings of battery-powered devices.

<Callout icon="info" title="A Business Model, Not a Chip Maker">
  Unlike Intel or AMD, the company ARM Holdings does not manufacture physical silicon chips. Instead, they design the architecture (the blueprints) and **license** the Intellectual Property (IP) to other companies. Apple, Qualcomm, Samsung, and Amazon pay ARM a fee to use the instruction set, and then manufacture their own highly customized physical chips.
</Callout>

## Why ARM Conquered the World

1. **Power Efficiency**: An Intel x86 chip running at full load might draw 100 to 200 Watts of power, requiring massive fans to prevent melting. A high-end ARM chip in an iPad draws 5 to 15 Watts, requiring no fan at all while delivering incredible performance.
2. **Customization**: Because companies license the architecture, they can build custom **SoCs (System on a Chip)**. Apple doesn't just build a CPU; they glue the ARM CPU, their custom GPU, an AI Neural Engine, and the RAM all onto a single piece of silicon to maximize speed.
3. **The big.LITTLE Architecture**: ARM pioneered the concept of putting two completely different types of cores on the same chip. An 8-core smartphone chip will have 4 "Performance Cores" (fast, battery-draining) and 4 "Efficiency Cores" (slow, battery-sipping). The OS dynamically shifts background tasks to the efficiency cores to maximize battery life.

## The ARM Invasion of Desktop and Server

For 20 years, the tech industry believed ARM was only for low-power mobile phones, while x86 was required for "real" high-performance computing. 

**Apple Silicon (M1/M2/M3)** shattered this myth in 2020. By transitioning MacBooks from Intel x86 to custom ARM chips, Apple proved that a properly designed, heavily cached ARM processor could completely destroy x86 processors in raw speed while preserving 18+ hours of battery life.

Simultaneously, **AWS (Amazon)** introduced their custom ARM-based Graviton server chips, offering cloud customers the same compute performance as Intel servers but at a 40% lower electricity/cooling cost, sparking a massive shift in backend infrastructure toward ARM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/RISC-V/index.mdx': `---
title: RISC-V Architecture
description: The open-source, royalty-free Instruction Set Architecture that threatens to disrupt the x86 and ARM duopolies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RISC-V Architecture">

For decades, if a hardware startup or university wanted to build a custom CPU, they faced a massive legal wall. 
If they wanted to use **x86**, it was legally impossible (locked down by Intel and AMD). 
If they wanted to use **ARM**, they had to pay millions of dollars in licensing fees and sign strict NDAs before they could even look at the architecture.

In 2010, researchers at UC Berkeley decided to fix this by creating **RISC-V** (pronounced "Risk-Five"), a completely open-source, royalty-free Instruction Set Architecture.

<Callout icon="success" title="The Linux of Hardware">
  Just as Linux commoditized the operating system (allowing anyone to run servers for free without paying Microsoft), RISC-V threatens to commoditize CPU hardware. Any student, startup, or nation-state can download the RISC-V specification and physically manufacture a CPU without paying a single cent to anyone.
</Callout>

## The Modular Design

The genius of RISC-V is its strict modularity. The base specification (RV32I) is incredibly tiny, containing fewer than 50 basic integer instructions. This allows students to build a functioning processor on an FPGA in a single semester.

If a company wants to build a smartwatch, they use the base integer set. If a company wants to build a supercomputer, they take the base set and snap on standardized "Extensions":
- **M**: Integer Multiplication and Division
- **A**: Atomic Instructions (for multi-core locking)
- **F**: Single-Precision Floating-Point math
- **V**: Vector Operations (for AI and graphics)

This prevents the "instruction bloat" seen in x86, where every single CPU is forced to carry 40 years of legacy instructions.

## Geopolitical Implications

CPU architectures are heavily tied to national security. Because x86 (Intel/AMD) and ARM (UK-based, heavily US-influenced) are controlled by Western corporations, countries facing US technology sanctions (like China or Russia) are cut off from licensing modern CPU architectures.

RISC-V is governed by an independent foundation in Switzerland, completely immune to US export controls. Because of this, billions of dollars are currently being poured into RISC-V research by Chinese tech giants (Alibaba, Huawei) to achieve complete silicon independence.

## The Future

While x86 dominates PCs and ARM dominates smartphones, RISC-V is rapidly taking over the **Embedded/IoT market** (smartwatches, hard drive controllers, microwaves). Western companies like Western Digital and Nvidia are actively replacing internal ARM management chips with RISC-V to save hundreds of millions in licensing fees.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/GPUs/index.mdx': `---
title: Graphics Processing Units (GPUs)
description: Highly specialized, massively parallel processors designed to handle thousands of simultaneous mathematical operations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Graphics Processing Units (GPUs)">

The **Central Processing Unit (CPU)** is a generalist. It is designed to execute complex, branching logic (\\\`if/else\\\`, loops, memory management) incredibly fast. A high-end CPU might have 16 or 24 massive cores.

The **Graphics Processing Unit (GPU)** is a specialist. It is designed to do one extremely simple math problem, but do it 10,000 times simultaneously. A high-end GPU might have **16,000 tiny cores**.

<Callout icon="info" title="The Ferrari vs. The Bus">
  A CPU is a Ferrari. It can move 2 passengers (data) at 200 mph. It is perfect for complex, sequential tasks.
  A GPU is a fleet of 50 city buses. They only move at 40 mph, but they can transport 3,000 passengers at once. It is perfect for massive, parallel tasks.
</Callout>

## The Origin: Rendering Graphics

Rendering a 3D video game running at 4K resolution (3840 $\\times$ 2160 pixels) at 60 frames per second is a staggering mathematical challenge. Every single frame, the computer must calculate the light reflection, shadow, and color of **8.2 million pixels**. 

Doing this sequentially on a 16-core CPU is impossible; the CPU would choke. However, calculating the color of Pixel A has absolutely nothing to do with Pixel B. The math is completely independent. 
GPUs were designed as massively parallel architectures (SIMD - Single Instruction, Multiple Data) to crunch the lighting algebra for thousands of pixels at the exact same microsecond.

## The AI Revolution (GPGPU)

In the late 2000s, scientists realized that the massively parallel math used for rendering 3D graphics (matrix multiplication) was the exact same math required for training Artificial Neural Networks.

Nvidia released **CUDA**, a software layer that allowed programmers to write C++ code and execute it directly on the GPU for non-graphical tasks. This birthed General Purpose GPU (GPGPU) computing.

Almost every major breakthrough in Artificial Intelligence (including the training of Large Language Models like ChatGPT) is strictly the result of stringing thousands of Nvidia GPUs together in massive server farms. A CPU would take decades to train a modern AI; a cluster of GPUs can do it in weeks.

## CPU vs GPU Architecture

- **Cores**: CPUs have few, highly complex cores with massive L3 caches and advanced Branch Prediction to handle unpredictable \\\`if/else\\\` logic. GPUs have thousands of very simple, "dumb" cores that all execute the exact same instruction simultaneously on different pieces of data.
- **Memory (VRAM)**: GPUs require so much data so quickly that standard motherboard RAM is too slow. GPUs feature their own dedicated, ultra-high-bandwidth memory (GDDR or HBM) physically wired directly next to the GPU die, capable of moving terabytes of data per second.

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
