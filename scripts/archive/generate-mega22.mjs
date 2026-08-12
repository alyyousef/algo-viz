import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/9. Computer Architecture/Bus architecture/index.mdx': `---
title: Bus Architecture
description: The physical communication system (wires and protocols) that transfers data between components inside a computer.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bus Architecture">

A CPU is useless if it cannot talk to RAM, the hard drive, or the graphics card. In computer architecture, a **Bus** is simply a shared electrical communication pathway consisting of multiple parallel wires.

<Callout icon="info" title="Why 'Bus'?">
  The term comes from the Latin *omnibus* (meaning "for all"). Just like a city bus carries multiple passengers along a shared route, a computer bus carries data for multiple different hardware components along a shared set of electrical wires.
</Callout>

## The System Bus

Historically, the CPU communicated with the rest of the motherboard via the **System Bus** (or Front-Side Bus). It consists of three distinct parallel sub-buses:

1. **Address Bus**: Defines *where* the data is going. If the CPU wants to read from RAM, it places the 64-bit binary memory address on these wires. The width of this bus determines the maximum amount of RAM the CPU can address (e.g., a 32-bit address bus can only access 4GB of RAM).
2. **Data Bus**: Carries the actual payload (the data being read or written). The width of this bus determines how much data can be transferred in a single clock cycle.
3. **Control Bus**: Carries command signals (e.g., \\\`Memory Read\\\`, \\\`Memory Write\\\`, \\\`Interrupt\\\`) and timing signals from the clock.

## Point-to-Point vs. Shared Buses

For decades, buses were physically **shared**. The CPU, the RAM, and the PCI slots were all spliced into the exact same physical wires. Only one device could talk at a time, requiring a "Bus Arbiter" to manage traffic.

Because shared buses suffered from massive electrical interference at high frequencies (limiting clock speeds), modern architectures moved to **Point-to-Point topologies**. 
Today, PCIe (Peripheral Component Interconnect Express) and QPI (QuickPath Interconnect) use dedicated, high-speed serial links between components, completely eliminating the shared-wire bottlenecks of the 1990s.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Cache coherence protocols (MESI)/index.mdx': `---
title: Cache Coherence Protocols (MESI)
description: The synchronization mechanisms required to ensure that multiple CPU cores all agree on the exact state of shared memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cache Coherence Protocols (MESI)">

In a multi-core processor, each core has its own private L1 and L2 cache. This introduces a fatal flaw: **The Cache Coherence Problem**.

Imagine Core 1 and Core 2 both read variable \\\`X = 5\\\` from RAM into their private caches.
1. Core 1 runs \\\`X = X + 1\\\`, changing its cached \\\`X\\\` to \\\`6\\\`.
2. Core 2 later runs \\\`X = X + 1\\\`. Because it reads from its *own* cache, it still sees \\\`X = 5\\\`, and calculates \\\`X = 6\\\`.

The final answer should be \\\`7\\\`, but because the caches are out of sync, the program is corrupted. 

<Callout icon="warning" title="Hardware over Software">
  Cache coherence is entirely managed by the hardware. The operating system and the software programmer are completely blind to this synchronization; the CPU handles it invisibly.
</Callout>

## Bus Snooping

To fix this, CPUs use a technique called **Bus Snooping**. Every cache controller constantly "listens" (snoops) on the memory bus. If Core 1 writes a new value to \\\`X\\\`, it broadcasts a message on the bus. Core 2 hears this broadcast, realizes its cached copy of \\\`X\\\` is now stale, and instantly marks it as invalid.

## The MESI Protocol

The most common implementation of bus snooping is the **MESI Protocol**, a state machine where every single cache line is tagged with one of four states:

- **M (Modified)**: This core is the only one with this data, and it has *changed* it. The data in main RAM is stale. This core must write the data back to RAM before any other core can read it.
- **E (Exclusive)**: This core is the only one with this data, but it *matches* main RAM perfectly. If this core wants to modify it, it can do so instantly without broadcasting to anyone.
- **S (Shared)**: Multiple cores have this data in their caches, and it matches RAM. It is read-only. If a core wants to modify it, it must broadcast an "Invalidate" signal to all other cores first.
- **I (Invalid)**: The data in this cache line is stale/garbage. The core must fetch a fresh copy from L3 Cache or RAM.

MESI ensures perfect mathematical consistency across 64-core processors without requiring constant, crippling communication to main memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/DMA/index.mdx': `---
title: Direct Memory Access (DMA)
description: A hardware feature that allows external devices to read and write directly to main memory without waking up the CPU.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Direct Memory Access (DMA)">

In early computers, if the hard drive needed to load a 10 MB file into RAM, the CPU had to execute an instruction to read a byte from the drive, and then execute another instruction to write that byte into RAM. It had to do this 10 million times, completely freezing the computer until the transfer was finished (Programmed I/O).

**Direct Memory Access (DMA)** is the solution. It is a specialized, mini-processor on the motherboard whose *only* job is moving data between peripherals and RAM.

<Callout icon="success" title="The CPU's Secretary">
  Instead of doing the work itself, the CPU sends a command to the DMA Controller: "Read 10 Megabytes from Hard Drive sector 42 into RAM address 0x1000, and let me know when you're done." The CPU immediately goes back to rendering your video game, while the DMA chip silently moves the massive payload in the background.
</Callout>

## How DMA Works

When the DMA controller receives a command, it literally takes over the System Bus. 
Because both the CPU and the DMA controller need to use the memory wires, they must share. 
- **Cycle Stealing**: The DMA controller sneaks its memory transfers in during the exact clock cycles when the CPU is busy doing math in the ALU and isn't using the memory bus.
- **Burst Mode**: The DMA controller forcefully pauses the CPU for a microsecond and rapidly blasts a massive block of data into RAM, then gives the bus back to the CPU.

## Modern DMA (PCIe Bus Mastering)

In modern systems, there isn't a single DMA controller on the motherboard. Instead, every high-speed peripheral (GPUs, NVMe SSDs, Gigabit Network Cards) has its own internal DMA engine (called **Bus Mastering**). 

When a network card receives a packet from the internet, it doesn't bother the CPU. It uses PCIe Bus Mastering to directly inject that packet straight into the system RAM, and then fires a quick hardware Interrupt to tell the CPU the data is ready to be processed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/RAM (SRAM/index.mdx': `---
title: Static RAM (SRAM)
description: The incredibly fast, highly expensive memory technology used exclusively to build CPU Caches.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Static RAM (SRAM)">

**SRAM (Static Random Access Memory)** is the fastest memory technology that exists in modern computing. Because of its incredible speed, it is the exclusive technology used to build the L1, L2, and L3 caches directly onto the CPU die.

<Callout icon="info" title="Why is it called 'Static'?">
  It is called Static because as long as electricity is flowing into the chip, the memory perfectly holds its state indefinitely. It never needs to be refreshed. (However, it is still *volatile*, meaning it loses all data the moment the computer is turned off).
</Callout>

## The Physical Architecture of SRAM

The reason SRAM is so fast is due to its physical transistor design. A single bit of SRAM (one 1 or 0) is built using a **Flip-Flop circuit**. 

A standard SRAM cell requires **Six Transistors (6T)**. 
- Four transistors are wired in a cross-coupled inverter loop that continuously feeds electricity back into itself, permanently locking the circuit into a 1 or a 0 state.
- Two transistors act as gates to read or write the data.

Because the data is held purely in active logic gates, reading from SRAM is effectively instantaneous (usually 1 to 3 clock cycles).

## The Drawback: Density and Cost

If SRAM is so fast, why isn't our 16 GB main memory built out of SRAM? 

Because an SRAM cell requires 6 transistors to store a single bit, it is physically massive. It takes up enormous amounts of physical silicon area on the chip. 
- Main memory requires billions of bits. Building 16 GB of SRAM would require a motherboard the size of a pizza box and would cost tens of thousands of dollars.
- For this reason, CPU manufacturers can only fit a few megabytes of SRAM (the L3 Cache) onto the processor die before the chip becomes too large to manufacture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/DRAM)/index.mdx': `---
title: Dynamic RAM (DRAM)
description: The dense, affordable memory technology used to build the main system memory (RAM sticks) of a computer.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dynamic RAM (DRAM)">

While SRAM is used for CPU caches, **DRAM (Dynamic Random Access Memory)** is the technology used for the main memory (the 16GB or 32GB RAM sticks slotted into your motherboard). 

<Callout icon="info" title="Why is it called 'Dynamic'?">
  DRAM is called Dynamic because the data literally leaks away in milliseconds. The hardware must dynamically "refresh" (re-read and re-write) every single bit of memory thousands of times per second to prevent data loss.
</Callout>

## The Physical Architecture of DRAM

Unlike SRAM (which uses a massive 6-transistor circuit), a single bit of DRAM is incredibly simple: it requires **One Transistor and One Capacitor (1T1C)**.

- **The Capacitor**: A microscopic bucket that holds a tiny electrical charge. (Full = \\\`1\\\`, Empty = \\\`0\\\`).
- **The Transistor**: A gate that lets the CPU check if the bucket is full or empty.

Because it only uses 1 transistor, DRAM is incredibly dense. You can cram billions of them onto a single cheap silicon chip. 

### The Leaky Bucket Problem
Capacitors are imperfect; the electrical charge slowly leaks out. Within 64 milliseconds, a full bucket (\\\`1\\\`) will leak enough electricity to look like an empty bucket (\\\`0\\\`), catastrophically corrupting the computer's memory.
To solve this, the memory controller implements a **Refresh Cycle**. Every 64ms, the hardware forcibly reads every single capacitor and tops it back up to 100% charge.

## DDR (Double Data Rate)

Modern computers use a specific type of DRAM called **DDR SDRAM** (Double Data Rate Synchronous DRAM).
- **Synchronous**: It is perfectly timed to the motherboard's clock signal.
- **Double Data Rate**: Originally, data was only transferred when the clock signal ticked *up* (the rising edge). DDR memory engineers figured out how to transfer data on both the *rising* and *falling* edge of the clock signal, literally doubling the bandwidth without having to increase the physical clock frequency. (This is why DDR4-3200 actually runs at a physical clock of 1600 MHz).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Endianness/index.mdx': `---
title: Endianness
description: The byte-ordering convention that dictates how multi-byte numbers are stored in physical computer memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Endianness">

Memory is addressed in **Bytes** (8 bits). However, most numbers we use in programming are 32-bit (4 bytes) or 64-bit (8 bytes) integers. 
When a CPU needs to store a 4-byte integer into RAM, it must split the number into four separate chunks and store them in four sequential memory addresses.

**Endianness** is the architectural decision of *which order* to store those bytes in. 

<Callout icon="info" title="The Name's Origin">
  The term comes from Jonathan Swift's 1726 novel *Gulliver's Travels*, where two warring factions fight over whether to crack a boiled egg at the "Little End" or the "Big End".
</Callout>

## Big-Endian vs. Little-Endian

Imagine the 32-bit hexadecimal number \\\`0x12345678\\\`.
- \\\`12\\\` is the Most Significant Byte (MSB).
- \\\`78\\\` is the Least Significant Byte (LSB).

If we store this number starting at memory address \\\`0x1000\\\`:

### Big-Endian (The Human Way)
Stores the **Big End (Most Significant Byte)** first.
- \\\`0x1000\\\`: \\\`12\\\`
- \\\`0x1001\\\`: \\\`34\\\`
- \\\`0x1002\\\`: \\\`56\\\`
- \\\`0x1003\\\`: \\\`78\\\`
This makes reading memory dumps incredibly easy for humans because it reads left-to-right exactly how we write numbers. (Used by IBM mainframes and Internet Protocols).

### Little-Endian (The Computer Way)
Stores the **Little End (Least Significant Byte)** first.
- \\\`0x1000\\\`: \\\`78\\\`
- \\\`0x1001\\\`: \\\`56\\\`
- \\\`0x1002\\\`: \\\`34\\\`
- \\\`0x1003\\\`: \\\`12\\\`
This looks completely backwards to humans. However, it is slightly more efficient for the ALUs when doing math (addition starts at the smallest digit and carries over). **Almost all modern CPUs (x86 and ARM) are Little-Endian**.

## The Network Byte Order Problem

Because Intel chose Little-Endian for PCs, and the creators of the Internet chose Big-Endian for network packets, developers face a severe translation issue.

If a Little-Endian PC sends a 32-bit IP address over the network without converting it, the receiving router will read it backwards and drop the packet. Software developers must constantly use functions like \\\`htonl()\\\` (Host-to-Network Long) to flip the bytes before sending them over a socket.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Interrupts/index.mdx': `---
title: Hardware Interrupts
description: The electrical signals used by peripherals to instantly grab the CPU's attention, bypassing normal software execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hardware Interrupts">

If you type a key on your keyboard, how does the CPU know you pressed it? 
Historically, computers used **Polling**. The CPU would constantly run a loop asking: "Keyboard, did you press a key? No. Keyboard, did you press a key? No." This wasted massive amounts of processing power.

Modern architectures use **Hardware Interrupts**. The CPU completely ignores the keyboard. But when you press a key, the keyboard sends an electrical jolt down a specific wire on the motherboard directly into the CPU.

<Callout icon="warning" title="The Fire Alarm">
  An interrupt is exactly like a fire alarm in a classroom. The teacher (CPU) doesn't constantly ask if there is a fire. They teach the lesson (execute programs) completely oblivious to the alarm. But the instant the alarm rings (Interrupt), the teacher immediately stops talking, bookmarks the page, and executes the evacuation protocol.
</Callout>

## The Interrupt Lifecycle

1. **The Signal (IRQ)**: A device (Network Card, GPU, Keyboard) pulls an Interrupt Request line high. 
2. **Context Switch**: The CPU finishes its current instruction. It then takes all of its internal Registers (the exact state of the current program) and pushes them onto the system Stack in RAM to save them.
3. **Interrupt Vector Table (IVT)**: The CPU looks up an ID number sent by the device (e.g., ID 33 for Keyboard) in the IVT. This table points to the exact memory address of the OS driver code required to handle this specific hardware.
4. **ISR (Interrupt Service Routine)**: The CPU jumps to that OS code and executes it (e.g., reading the letter 'A' from the USB controller).
5. **Resume (\\\`IRET\\\`)**: Once the ISR finishes, the CPU pulls the saved registers back off the Stack, perfectly restoring the state of the original program. The original program never even knew it was paused.

## Software Interrupts (Traps)

Interrupts aren't just for hardware. Software can trigger them intentionally using specific assembly instructions (like \\\`INT 0x80\\\` or \\\`SYSCALL\\\`). 

This is the fundamental mechanism of the **System Call**. A user-mode program (like Google Chrome) is physically barred from accessing the hard drive. If Chrome wants to save a file, it triggers a Software Interrupt. The CPU instantly switches into highly privileged Kernel Mode, executes the secure OS file-saving routine, and then returns control back to Chrome.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Machine instructions/index.mdx': `---
title: Machine Instructions
description: The absolute lowest level of software—the raw binary numbers that are physically decoded and executed by the CPU hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Machine Instructions">

While programmers write code in Python, C++, or even Assembly language, the CPU hardware cannot understand text. It is a physical machine made of logic gates. The only thing it understands is voltage, represented as binary \\\`1\\\`s and \\\`0\\\`s.

A **Machine Instruction** is a specific binary pattern that physically triggers a specific sequence of logic gates inside the CPU's Control Unit to perform a task.

<Callout icon="success" title="Assembly is just a mask">
  Assembly language (e.g., \\\`ADD EAX, EBX\\\`) is just a human-readable text replacement for Machine Code. An Assembler program simply looks up \\\`ADD EAX, EBX\\\` in a dictionary and outputs the raw binary \\\`00000001 11011000\\\` into the \\\`.exe\\\` file.
</Callout>

## The Anatomy of an Instruction

A machine instruction is a string of bits (e.g., 32 bits long). It is fundamentally divided into two parts: the **Opcode** and the **Operands**.

### 1. Opcode (Operation Code)
The first handful of bits tell the CPU's instruction decoder *what action to take*. 
For example, if the CPU reads \\\`001001\\\`, the hardware routes power to the ALU's addition circuit. If it reads \\\`101011\\\`, it routes power to the memory load circuit.

### 2. Operands (The Data/Addresses)
The remaining bits tell the CPU *what data to operate on*.
Depending on the instruction format, these bits might represent:
- **Registers**: (e.g., \\\`0001\\\` means Register 1, \\\`0010\\\` means Register 2).
- **Immediate Values**: The actual raw number (e.g., the binary for the number \\\`42\\\`) embedded directly into the instruction itself.
- **Memory Addresses**: A pointer to a location in RAM.

## Fixed-Length vs Variable-Length

The layout of these bits is strictly defined by the CPU's Instruction Set Architecture (ISA).
- **RISC (ARM, RISC-V)**: Uses **Fixed-Length** instructions. Every single instruction is exactly 32 bits long. This makes the hardware decoder incredibly fast and simple to design, but can waste memory space.
- **CISC (x86)**: Uses **Variable-Length** instructions. A simple instruction might be 1 byte long, while a complex AVX-512 memory-fetch instruction might be 15 bytes long. This saves memory (creating incredibly dense code) but requires massive, power-hungry, and complex hardware decoders on the chip to figure out where one instruction ends and the next begins.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Microarchitecture/index.mdx': `---
title: Microarchitecture
description: The specific, physical hardware implementation of an Instruction Set Architecture (ISA) on a silicon chip.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microarchitecture">

In computer engineering, there is a strict separation between the **Architecture** (the API) and the **Microarchitecture** (the physical implementation).

- **The Architecture (ISA)**: This is the rulebook. It states: "This CPU understands x86 instructions. It has 16 general-purpose registers. \\\`ADD RAX, RBX\\\` means add two numbers." It is a software contract.
- **The Microarchitecture**: This is the physical blueprint of the silicon. It dictates *how* the hardware actually fulfills the contract. Does it use a 14-stage pipeline? Does it use a 512KB L1 cache? Does it use Neural branch prediction?

<Callout icon="info" title="The Car Analogy">
  - **Architecture**: The standard layout of a car. Steering wheel on the left, gas pedal on the right, brake on the left. (If you know how to drive, you can drive any car).
  - **Microarchitecture**: The engine. Is it a V8? A V6? An Electric Motor? The driver doesn't care, as long as pressing the gas pedal moves the car forward.
</Callout>

## Why Microarchitecture Matters

Software (like Windows 10) is compiled for an *Architecture* (x86-64). It doesn't know what physical CPU it is running on.

This allows Intel and AMD to release brand new processors every single year. A 2012 Intel Ivy Bridge CPU and a 2024 Intel Raptor Lake CPU have the exact same Architecture (they run the exact same \\\`.exe\\\` files). But their **Microarchitectures** are wildly different. The 2024 chip has deeper pipelines, wider superscalar execution, better branch predictors, and massively redesigned ALUs, allowing it to execute the exact same software 10x faster.

## Tick-Tock Development

Historically, Intel released CPUs using the famous "Tick-Tock" strategy to manage engineering risk:
- **Tick (Process Node Shrink)**: Take last year's proven microarchitecture, but shrink the physical transistors (e.g., from 22nm to 14nm). This lowers power consumption and allows higher clock speeds, but the logic design remains identical.
- **Tock (New Microarchitecture)**: Keep the physical transistor size the same, but completely redesign the logic gates, pipelines, and caches (a brand new microarchitecture) to increase IPC (Instructions Per Clock). 

Because designing a new microarchitecture is incredibly difficult, engineers rely heavily on **Simulation**. Before a chip is ever manufactured, its microarchitecture is simulated in software for years to ensure it perfectly adheres to the ISA contract.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Microcode/index.mdx': `---
title: Microcode
description: The hidden layer of firmware embedded directly inside the CPU that translates complex machine instructions into physical hardware signals.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microcode">

We are taught that Machine Code (1s and 0s) is the lowest level of software, directly executed by the hardware. In modern CPUs (specifically x86), this is a lie. 

There is a secret, sub-layer of programming hidden entirely inside the CPU called **Microcode**.

<Callout icon="warning" title="The x86 Nightmare">
  Intel's x86 architecture is a CISC (Complex Instruction Set) nightmare. It contains highly complex instructions like "Copy an entire block of RAM while decrypting it." Wiring a physical hardware logic gate circuit to do this in a single clock cycle is physically impossible. 
</Callout>

## The Translator

To solve the complexity of CISC instructions, modern x86 processors are actually simple, incredibly fast **RISC** processors hidden under a mask. 

When the CPU fetches a complex x86 machine instruction from RAM, it doesn't execute it. Instead, it sends it to the **Microcode ROM**. This is a tiny ROM chip inside the CPU containing thousands of tiny, proprietary "Micro-operations" (uOps).
The complex x86 instruction is translated into a sequence of 4 or 5 incredibly simple uOps (e.g., Load, Load, Add, Store). These tiny uOps are what actually get sent down the CPU pipeline to the ALUs.

## The Microcode Update

Because Microcode is effectively software that controls the hardware, **it can be updated**. 
If Intel discovers a fatal hardware flaw in a CPU *after* it has been manufactured and sold (like the Meltdown/Spectre vulnerabilities or a math bug in the ALU), they cannot physically mail a new chip to everyone on earth.

Instead, they release a **Microcode Update** through a Windows Update or a BIOS flash. 
When the computer boots, the OS injects the new Microcode into a special volatile SRAM patch-table inside the CPU. The CPU is reprogrammed on the fly to avoid using the broken physical silicon pathways, fixing the hardware bug entirely via a secret software update.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/NPUs/index.mdx': `---
title: Neural Processing Units (NPUs)
description: Highly specialized hardware blocks embedded directly into consumer CPUs and mobile SOCs to accelerate AI inference tasks natively on the device.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Neural Processing Units (NPUs)">

While **TPUs** (Tensor Processing Units) are massive, power-hungry supercomputer ASICs locked inside Google's data centers for *training* AI models, **NPUs (Neural Processing Units)** are their consumer-facing cousins. 

NPUs are small, highly efficient silicon accelerators integrated directly into the System-on-a-Chip (SoC) of your smartphone, laptop, or desktop CPU, designed specifically for **AI Inference** (running a model that has already been trained).

<Callout icon="success" title="The AI PC Era">
  If you blur your background on a Zoom call, that task requires running a complex computer vision neural network at 60 FPS. If the standard CPU runs it, your laptop battery dies in 30 minutes and the fans spin at max speed. The NPU can run that exact same neural network in total silence while drawing almost zero power.
</Callout>

## Architectural Design

An NPU is fundamentally an ASIC designed for low-power matrix multiplication. 
Like a TPU, it abandons the traditional CPU pipeline (no complex branch predictors, no massive L3 caches). It consists almost entirely of MAC (Multiply-Accumulate) circuits. 

However, unlike a massive server GPU, an NPU prioritizes **power efficiency** over raw speed. 
- **INT8 Precision**: While CPUs calculate math using highly precise 64-bit Floating Point numbers (FP64), AI inference does not require extreme precision. NPUs are heavily optimized to perform math using 8-bit Integers (INT8). Calculating INT8 math requires microscopically small logic gates, massively reducing the physical silicon area and power draw of the NPU.

## The Future of Consumer Hardware

The integration of NPUs marks the beginning of the "AI PC" era. 
- Apple pioneered this space by integrating the **Neural Engine** into all of their Apple Silicon (M1/M2/M3) chips.
- Intel and AMD have recently followed suit, integrating NPUs directly into their consumer x86 processors (Core Ultra and Ryzen AI) to meet Microsoft's requirements for local AI features like Windows Studio Effects and local LLM execution.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/NUMA/index.mdx': `---
title: Non-Uniform Memory Access (NUMA)
description: A multiprocessor architecture where memory access times vary depending on whether a CPU core is accessing its own local memory or another processor's memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Non-Uniform Memory Access (NUMA)">

In a standard consumer PC, there is one CPU socket and a set of RAM sticks. All CPU cores share the exact same physical distance and connection (the memory bus) to the RAM. Because the latency to access RAM is identical for all cores, this is called **UMA (Uniform Memory Access)**.

However, in massive enterprise servers (like a 4-socket motherboard running 4 massive Intel Xeon processors), UMA becomes physically impossible.

<Callout icon="warning" title="The Traffic Jam">
  If 128 cores across 4 separate physical CPU sockets all try to communicate with a single centralized bank of RAM over a single shared bus, the bus becomes incredibly congested. The memory controller becomes a severe bottleneck, crippling the server's performance.
</Callout>

## The NUMA Architecture

To solve the bottleneck, engineers invented **NUMA (Non-Uniform Memory Access)**.
Instead of one central pool of RAM, the RAM is physically divided and bolted directly to each individual CPU socket. 
- **CPU 1** has its own dedicated 128GB of RAM.
- **CPU 2** has its own dedicated 128GB of RAM.
The CPUs are connected to each other via an ultra-fast interconnect (like Intel QPI or AMD Infinity Fabric).

### The Latency Cost
The total system still presents as 256GB of unified memory to the Operating System. However, the access times are now **Non-Uniform**:
- **Local Access**: If CPU 1 needs data stored in CPU 1's RAM, it accesses it instantly (extremely fast).
- **Remote Access**: If CPU 1 needs data stored in CPU 2's RAM, it must send a request across the QPI interconnect, asking CPU 2 to fetch the data and send it back. This takes significantly longer (high latency).

## NUMA-Aware Software

Because of this severe latency penalty, software running on enterprise servers must be **NUMA-Aware**. 
The Operating System's scheduler is specifically programmed to pin a thread to CPU 1, and ensure that any memory allocated by that thread is physically placed in CPU 1's local RAM bank. High-performance databases (like SQL Server or Redis) explicitly manage their memory allocations on a per-NUMA-node basis to prevent crippling cross-socket remote memory requests.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Paging/index.mdx': `---
title: Paging
description: The specific memory management scheme used by operating systems to divide memory into small, fixed-size blocks, solving the problem of RAM fragmentation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Paging">

In the early days of Virtual Memory, operating systems would allocate entire contiguous blocks of physical RAM to a program. If a program needed 10MB of memory, the OS would find a 10MB continuous open space in RAM and give it to the program. 

This caused a fatal issue called **External Fragmentation**. Over time, as programs opened and closed, RAM became a swiss-cheese of empty holes and occupied blocks. You might have 50MB of RAM free in total, but because it is split into dozens of tiny 1MB holes, you cannot launch a new program that requires a 10MB block. 

**Paging** solves external fragmentation completely.

<Callout icon="success" title="The Fixed-Size Solution">
  Instead of allocating variable-sized blocks, Paging violently chops both Virtual Memory and Physical RAM into strict, identical, fixed-size chunks (usually **4 Kilobytes**). 
  - A chunk of Virtual Memory is called a **Page**.
  - A chunk of Physical RAM is called a **Frame**.
</Callout>

## How Paging Works

When a program asks for 10MB of memory, the OS doesn't look for a 10MB hole. It simply grabs 2,500 arbitrary, scattered 4KB Frames from anywhere in physical RAM. 

The OS maintains a massive **Page Table** in memory. This table acts as a translation dictionary. It maps the program's contiguous Virtual Pages to the completely scattered Physical Frames. 

Because the hardware's MMU (Memory Management Unit) translates the addresses on the fly, the program believes it has one perfectly continuous 10MB block of memory, when in reality, its data is scattered like confetti across the physical silicon chips.

## Page Faults and Swapping

Paging is what makes modern multitasking possible. Because memory is broken into 4KB pages, the OS doesn't have to load an entire program into RAM to run it. 
It can load just the first few pages of a video game into RAM and start executing. If the CPU tries to access a page that hasn't been loaded yet, the MMU triggers a **Page Fault** (a hardware interrupt). The OS pauses the game, fetches that specific 4KB page from the SSD, places it in a RAM frame, updates the Page Table, and resumes the game seamlessly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Segmentation/index.mdx': `---
title: Memory Segmentation
description: An older memory management technique that divided memory into variable-sized logical segments, heavily relied upon in the 16-bit MS-DOS era.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Memory Segmentation">

While modern 64-bit operating systems use **Paging** (dividing memory into fixed 4KB blocks) to manage Virtual Memory, historically, the x86 architecture relied on a completely different technique called **Memory Segmentation**.

<Callout icon="info" title="Logical vs Physical Division">
  - **Paging** is a physical division. The hardware chops memory into arbitrary 4KB blocks, completely ignoring what the data actually is.
  - **Segmentation** is a logical division. The memory is divided into variable-sized blocks based on the *meaning* of the data (e.g., a "Code Segment", a "Data Segment", a "Stack Segment").
</Callout>

## The 16-Bit Real Mode Problem (The 8086 CPU)

Segmentation was invented as a hack to solve a physical hardware limitation of the original 1978 Intel 8086 processor. 
The 8086 had a 20-bit address bus (meaning it could access up to 1 Megabyte of RAM). However, its internal CPU registers were only 16-bit. A 16-bit register can only count up to 64 Kilobytes. 

How does a CPU with 16-bit registers generate a 20-bit memory address? 
**Segment Registers**.

Intel added specialized Segment Registers (\\\`CS\\\` for Code, \\\`DS\\\` for Data). To generate a 20-bit physical address, the hardware took the 16-bit Segment Register, shifted it left by 4 bits, and added a 16-bit Offset Register to it. 
This forced programmers writing DOS software to constantly manage which 64KB "segment" of memory they were currently operating in, leading to incredibly complex and frustrating "near" and "far" pointer arithmetic. 

## Segmentation vs. Paging

Segmentation caused massive **External Fragmentation**. Because segments were variable-sized (ranging from 1 byte to 64KB), allocating and deallocating them left tiny holes in RAM that were too small to be reused, crashing systems with "Out of Memory" errors even when total free RAM was high.

With the release of the 80386 (which introduced 32-bit registers and hardware Paging support), Segmentation became obsolete. Modern 64-bit operating systems (Windows, Linux, macOS) run the x86 processor in a "Flat Memory Model," effectively disabling Segmentation entirely and relying 100% on Paging for memory isolation and management.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/TLB/index.mdx': `---
title: Translation Lookaside Buffer (TLB)
description: A highly specialized, ultra-fast hardware cache located inside the MMU that drastically accelerates Virtual Memory translation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Translation Lookaside Buffer (TLB)">

Because modern operating systems use **Paging** to implement Virtual Memory, every single memory access a program makes requires a translation. 

If your code says \\\`return myArray[0]\\\`, the CPU generates a Virtual Address. To find the actual physical silicon chip that holds that array, the CPU must look up the translation in the **Page Table**, which is stored in main RAM. 

<Callout icon="warning" title="The Virtual Memory Bottleneck">
  This introduces a catastrophic performance penalty. To read 1 variable from RAM, the CPU must actually perform **two** RAM reads:
  1. Read the Page Table in RAM to find the translation.
  2. Read the actual data from RAM using the translated address.
  Virtual Memory effectively cuts the speed of RAM in half.
</Callout>

## The TLB to the Rescue

Hardware engineers solved this by adding a microscopic, ultra-fast SRAM cache directly inside the CPU's Memory Management Unit (MMU). This is the **Translation Lookaside Buffer (TLB)**. 

The TLB's only job is to cache the most recently used Page Table translations. 

When the CPU generates a Virtual Address, the MMU checks the TLB first (which takes less than 1 clock cycle). 
- **TLB Hit**: The translation is found instantly. The MMU generates the Physical Address and requests the data from the L1 Cache. No extra RAM reads are required.
- **TLB Miss**: The translation is not in the TLB. The CPU is forced to pause (a "Page Walk"), reach out to main RAM, read the massive Page Table, find the translation, pull it into the TLB, and then finally resume execution. 

## The High Cost of Context Switches

The TLB is incredibly small (usually holding only 64 to 1024 entries) because SRAM is expensive and the lookup must happen instantaneously. 

When the Operating System performs a **Context Switch** (pausing Google Chrome to run Spotify), Chrome's virtual addresses mean something completely different than Spotify's virtual addresses. Because of this, the OS must historically **flush (erase) the entire TLB**. 
When Spotify resumes, its first few hundred memory accesses will all result in agonizingly slow TLB Misses as it rebuilds the cache. This is the primary reason why rapidly switching between threads/processes kills CPU performance.

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
