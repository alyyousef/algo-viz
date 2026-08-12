import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/9. Computer Architecture/Pipelining/index.mdx': `---
title: Instruction Pipelining
description: The foundational hardware technique that allows modern CPUs to overlap the execution of multiple instructions, massively increasing throughput.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Instruction Pipelining">

The foundational logic of a CPU is the **Fetch-Decode-Execute** cycle. In early processors (like the original Intel 8086), the CPU would fetch Instruction 1, decode it, and execute it. Only after Instruction 1 was completely finished would the CPU fetch Instruction 2. 

Because executing an instruction requires multiple distinct physical hardware components (the memory bus, the decoder, the ALU), running sequentially means that while the ALU is doing math, the memory bus is sitting completely idle.

**Pipelining** is the brilliant engineering solution to this inefficiency, operating on the exact same logic as a Henry Ford assembly line.

<Callout icon="info" title="The Laundry Analogy">
  Imagine doing 4 loads of laundry. A load requires 1 hour in the Washer, 1 hour in the Dryer, and 1 hour to Fold. 
  - **Non-Pipelined**: You put Load 1 in the washer. Wait an hour. Move it to the dryer. Wait an hour. Fold it. Wait an hour. Then you start Load 2. Total time for 4 loads = **12 hours**.
  - **Pipelined**: You put Load 1 in the washer. When it finishes, you move it to the dryer, and *immediately put Load 2 in the empty washer*. Both machines are now working simultaneously. Total time for 4 loads = **6 hours**.
</Callout>

## The Classic 5-Stage RISC Pipeline

In a classic RISC architecture, an instruction is broken down into 5 stages, each taking exactly 1 clock cycle:

1. **IF (Instruction Fetch)**: Fetch the binary instruction from the L1 Cache.
2. **ID (Instruction Decode)**: Decode the binary and read the necessary CPU Registers.
3. **EX (Execute)**: The ALU performs the actual math or logical operation.
4. **MEM (Memory Access)**: If the instruction needs to read/write to RAM, it happens here.
5. **WB (Write Back)**: The final result is written back into the CPU Registers.

If the pipeline is perfectly full, the CPU is retiring **one complete instruction every single clock cycle**, even though each individual instruction takes 5 cycles from start to finish.

## Deep Pipelining (The Pentium 4 Era)

In the early 2000s, Intel realized that if you slice the pipeline into *more* stages, each stage has less work to do, meaning you can crank the clock speed incredibly high. The infamous Intel Pentium 4 had a **31-stage pipeline**, allowing it to hit an unprecedented 3.8 GHz. 

However, deep pipelines suffer catastrophically when things go wrong (specifically due to Branch Prediction failures). If the CPU guesses a branch wrong, it has to flush 31 half-completed instructions and start over, losing massive amounts of performance. Modern CPUs have settled on a sweet spot of around **14 to 20 stages**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Hazards (data/index.mdx': `---
title: Data Hazards
description: Conflicts in a pipelined CPU that occur when an instruction depends on the result of a previous instruction that hasn't finished executing yet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Hazards">

While Pipelining allows a CPU to overlap multiple instructions simultaneously, it introduces severe synchronization problems known as **Hazards**. 

A **Data Hazard** occurs when an instruction relies on a piece of data (usually sitting in a Register) that is currently being modified by a previous instruction still moving through the pipeline.

<Callout icon="warning" title="The Race Condition">
  Imagine these two assembly instructions:
  1. \`ADD RAX, RBX\` (Add RBX to RAX, and save the result in RAX)
  2. \`SUB RCX, RAX\` (Subtract RAX from RCX)

  In a 5-stage pipeline, Instruction 2 enters the "Decode/Read Registers" stage *before* Instruction 1 has reached the "Write Back" stage. Instruction 2 will read the **old, stale value** of RAX, resulting in a completely corrupted math calculation.
</Callout>

## Types of Data Hazards

There are three classic dependencies that cause data hazards (often referred to by the acronyms read/write):

1. **RAW (Read After Write)**: (True Dependency). Instruction 2 needs to read a register that Instruction 1 hasn't written to yet. (Most common).
2. **WAR (Write After Read)**: (Anti-Dependency). Instruction 2 needs to write to a register, but Instruction 1 hasn't read the old value yet.
3. **WAW (Write After Write)**: (Output Dependency). Both instructions are writing to the same register, but Instruction 2 finishes first, leaving the older value in the register permanently.

## Solutions to Data Hazards

Hardware engineers use three primary techniques to fix data hazards without crashing the program:

### 1. Pipeline Stalling (Bubbles)
The simplest solution. The Control Unit detects the dependency and simply pauses Instruction 2 (injecting empty "bubbles" or NOPs into the pipeline) until Instruction 1 finishes writing. This guarantees correctness but wastes clock cycles, hurting performance.

### 2. Forwarding (Bypassing)
The brilliant hardware solution. The CPU realizes that Instruction 1 calculates the correct answer in the ALU during Stage 3 (Execute), even though it won't officially save the answer to the Register until Stage 5 (Write Back). 
Forwarding physically wires the output of the ALU *directly back into the input of the ALU*. Instruction 2 can instantly use the answer from Instruction 1 without waiting for it to be saved to the register!

### 3. Out-of-Order Execution
If Instruction 2 is stuck waiting for Instruction 1, the CPU looks ahead at Instruction 3. If Instruction 3 doesn't depend on anything, the CPU will execute Instruction 3 *before* Instruction 2, keeping the pipeline perfectly full.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/control/index.mdx': `---
title: Control Hazards
description: Disruptions in a pipelined CPU caused by branching instructions (if/else statements) that change the flow of execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Control Hazards">

While Data Hazards deal with data conflicts, **Control Hazards** (or Branch Hazards) are caused by the flow of the program itself. They occur specifically when the CPU encounters a conditional jump (like an \`if/else\` statement or a \`while\` loop).

<Callout icon="warning" title="The Pipeline's Blind Spot">
  In a pipelined processor, the CPU is always fetching the *next* instruction before it has finished executing the *current* instruction. 
  But what if the current instruction is an \`if (x == 0)\`? 
  The CPU won't know if the answer is True or False until the ALU does the math in Stage 3. What is the CPU supposed to fetch for Stage 1 and Stage 2 in the meantime?
</Callout>

## The Cost of Waiting

If the CPU takes the safe route and simply waits (Stalling) until the branch condition is resolved by the ALU, it wastes 2 to 3 clock cycles every single time it encounters an \`if\` statement. Because roughly **20% of all code** consists of branch instructions, stalling would cripple the CPU's performance, effectively turning a modern pipelined processor back into a slow sequential processor.

## The Solution: Branch Prediction

Because stalling is unacceptable, modern CPUs simply **guess**. 

When the CPU fetches a branch instruction, a specialized piece of hardware called the **Branch Predictor** immediately kicks in. It looks at the historical behavior of this specific \`if\` statement and makes an educated guess (e.g., "This loop condition has been true 99 times in a row, I bet it will be true again").

The CPU immediately begins fetching and executing the instructions from the guessed path. This is called **Speculative Execution**.

### The Branch Penalty (Flush)

If the guess was correct (which happens >95% of the time on modern architectures), the CPU loses zero clock cycles. The pipeline remains perfectly full.

If the guess was wrong, a disaster occurs. The CPU has spent the last 3 clock cycles executing the wrong code. It must immediately throw away (flush) all the half-completed speculative instructions, reverting the CPU state, and begin fetching from the correct path. This is known as the **Branch Penalty**. 

In deep pipelines (like the 31-stage Pentium 4), a wrong guess meant flushing up to 30 instructions, which is why modern CPU architectures invest billions of transistors into making Branch Predictors as accurate as possible.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/structural)/index.mdx': `---
title: Structural Hazards
description: Bottlenecks in a pipelined CPU caused when two different instructions require the exact same physical hardware component at the exact same time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Structural Hazards">

The third and final type of pipeline hazard is the **Structural Hazard**. Unlike Data Hazards (waiting for a variable) or Control Hazards (waiting for an \`if\` condition), a Structural Hazard is purely a physical limitation of the silicon.

A Structural Hazard occurs when two different instructions moving through the pipeline attempt to use the **exact same physical piece of hardware** during the exact same clock cycle.

<Callout icon="info" title="The Single Cash Register">
  Imagine a fast-food restaurant with a pipeline: Order -> Cook -> Pay. 
  If the person taking orders is *also* the only person allowed to run the cash register, a Structural Hazard occurs. They cannot take a new order and ring up a paying customer at the exact same time. One person must wait.
</Callout>

## Classic Examples of Structural Hazards

### 1. The Single Memory Bus
In a classic Von Neumann architecture, the CPU only has one connection (bus) to the main memory. 
- Instruction 1 is in Stage 4 (Memory Access), attempting to read a variable from RAM.
- Instruction 4 is in Stage 1 (Instruction Fetch), attempting to fetch its own code from RAM.
Because there is only one physical wire, they collide. 

**The Fix:** Modern CPUs use a **Modified Harvard Architecture** for their L1 Cache, splitting it into a dedicated Instruction Cache (L1i) and a Data Cache (L1d). This physical duplication completely eliminates this specific structural hazard.

### 2. The Single ALU
If a CPU only has one Arithmetic Logic Unit, but the pipeline requires one instruction to do integer math while another instruction simultaneously needs the ALU to calculate a memory address offset, a collision occurs.

**The Fix:** Modern **Superscalar** CPUs physically duplicate execution units. A modern Intel core doesn't have one ALU; it might have four ALUs, two dedicated Floating Point Units, and two Address Generation Units, ensuring multiple instructions always have the physical hardware available to execute simultaneously.

## When Duplication Fails

Duplicating hardware (adding more ALUs or memory ports) costs massive amounts of silicon area, increases heat, and consumes more power. Hardware engineers cannot duplicate everything infinitely. 

When a structural hazard cannot be physically designed away, the CPU's only option is to **Stall** (inject a pipeline bubble). The newer instruction is frozen in place for one clock cycle while the older instruction finishes using the contested hardware.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Branch prediction/index.mdx': `---
title: Branch Prediction
description: The highly advanced, AI-like hardware mechanism CPUs use to guess the outcome of if/else statements before they are actually calculated.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Branch Prediction">

Because pipelines are severely damaged by stalling at conditional branches (Control Hazards), modern CPUs rely entirely on **Branch Prediction** to guess which way an \`if/else\` statement will go. 

Over the decades, Branch Predictors have evolved from simple heuristics to some of the most complex, neural-network-like structures in all of hardware engineering. A modern Intel or AMD processor boasts a branch prediction accuracy exceeding **95%**.

<Callout icon="success" title="Why is it so accurate?">
  Human code is highly predictable. If a program is running a \`for(int i=0; i<1000; i++)\` loop, the branch condition (\`i<1000\`) will evaluate to TRUE 999 times in a row, and FALSE only once. A good predictor recognizes this pattern almost instantly.
</Callout>

## Types of Branch Predictors

### 1. Static Prediction (The Old Way)
Early predictors didn't use history. They used hard-coded rules determined by the compiler:
- **Always predict backward branches as TAKEN**: (Assuming it's a loop).
- **Always predict forward branches as NOT TAKEN**: (Assuming it's an edge-case error check).
This was fast and required no memory, but was relatively inaccurate.

### 2. Dynamic Prediction: The 2-Bit Counter (Bimodal Predictor)
The CPU allocates a small piece of SRAM called the Branch History Table (BHT). It stores a 2-bit state machine (00, 01, 10, 11) for recent branch instructions.
- \`11\`: Strongly Taken
- \`10\`: Weakly Taken
- \`01\`: Weakly Not Taken
- \`00\`: Strongly Not Taken

If the branch is taken, the counter increments. If not, it decrements. The genius of the 2-bit counter is that a single anomaly (e.g., exiting a loop once) will only move the counter from \`11\` to \`10\`, meaning the next time this code runs, it will still correctly guess "Taken".

### 3. Two-Level Adaptive Predictors
Code is often correlated. For example, if \`if (x > 0)\` is true, and \`if (y > 0)\` is true, then \`if (x + y > 0)\` is guaranteed to be true. 
Modern predictors use **Global History Registers** that track the outcome of the last *N* branches across the entire program. This history is hashed to index into the prediction table, allowing the CPU to recognize incredibly complex, intertwined logical patterns.

### 4. Neural Branch Predictors (Perceptrons)
Modern AMD Ryzen and Intel processors use hardware-implemented Neural Networks (Perceptrons) as their branch predictors. They use machine learning weights to analyze dozens of different historical factors simultaneously to produce a highly accurate prediction in a fraction of a nanosecond.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Out-of-order execution/index.mdx': `---
title: Out-of-Order Execution (OoOE)
description: A paradigm-shifting CPU architecture where instructions are executed dynamically based on data availability rather than the order they were written in the code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Out-of-Order Execution (OoOE)">

In a strict, sequential pipeline (In-Order Execution), if Instruction 1 needs to wait 100 cycles to fetch a variable from RAM, the entire CPU stops. Instructions 2, 3, and 4 are completely blocked, even if they have absolutely nothing to do with Instruction 1.

**Out-of-Order Execution (OoOE)** solves this by treating the CPU not as an assembly line, but as a dynamic dispatch center.

<Callout icon="info" title="The Restaurant Analogy">
  - **In-Order**: The chef cooks orders strictly in the order they were received. If Table 1 orders a Souffle (takes 40 mins), Table 2's Salad (takes 2 mins) is blocked until the Souffle is finished.
  - **Out-of-Order**: The chef looks at all pending orders. If the Souffle is in the oven, the chef immediately makes Table 2's Salad and serves it. The final result is the same, but overall throughput is massively increased.
</Callout>

## How OoOE Works (Tomasulo's Algorithm)

First introduced to PCs in 1995 with the Intel Pentium Pro, OoOE is incredibly complex, requiring millions of dedicated transistors:

1. **Instruction Fetch & Decode (In-Order)**: The CPU fetches instructions in the exact order the programmer wrote them.
2. **Issue to Reservation Stations**: The CPU places the decoded instructions into "waiting rooms" called Reservation Stations attached to the ALUs. 
3. **Execution (Out-of-Order)**: An instruction simply sits in the waiting room monitoring the data bus. The exact microsecond its required variables become available, it fires into the ALU. If Instruction 5 is ready before Instruction 1, Instruction 5 executes first.
4. **Reorder Buffer (ROB)**: This is the critical component. Because instructions executed out of order, the CPU cannot permanently save their results to the main registers immediately (otherwise, the program state would be corrupted). The results are held in the Reorder Buffer.
5. **Retirement (In-Order)**: The ROB sorts the finished instructions back into their original programmatic order, and officially "retires" them by committing their results to the architectural registers, presenting a perfect illusion of sequential execution to the software.

## Register Renaming

To make OoOE work, the hardware performs a magic trick called **Register Renaming**. 
Because x86 only has 16 architectural registers, programmers constantly reuse them (creating False Dependencies / WAW hazards). The CPU secretly maintains hundreds of internal physical registers. When the code says "Write to RAX", the CPU maps RAX to "Secret Physical Register 42", allowing subsequent instructions to use RAX without actually overwriting the data the first instruction is still using.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Speculative execution/index.mdx': `---
title: Speculative Execution
description: The risky, high-performance technique where a CPU executes code that it isn't sure is actually needed yet, rolling back the state if it guessed wrong.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Speculative Execution">

**Speculative Execution** is the umbrella term for a CPU doing work before it is absolutely certain that the work is actually required. It is the logical combination of **Branch Prediction** and **Out-of-Order Execution**, and it is the primary reason modern processors are so incredibly fast.

<Callout icon="success" title="Better to act and apologize than to wait and do nothing">
  If the CPU hits an unresolved conditional branch, it has two choices:
  1. Sit idle for 15 cycles doing nothing (100% waste).
  2. Guess the outcome and execute the code anyway. If right, you save 15 cycles. If wrong, you throw the work away and are no worse off than if you had sat idle.
</Callout>

## The Mechanism of Speculation

When the Branch Predictor guesses the outcome of an \`if\` statement, the CPU begins fetching and executing those instructions speculatively. 
Crucially, these speculative instructions are allowed to do math in the ALU, but **they are strictly forbidden from permanently modifying the architectural state** (Registers or RAM). 

Their results are kept quarantined inside the **Reorder Buffer (ROB)**. 

### Resolution
- **Guess Correct**: The original branch condition is finally calculated by the ALU. The CPU realizes it guessed correctly. The quarantined results in the ROB are instantly "committed" to the real registers.
- **Guess Incorrect**: The CPU realizes it guessed wrong. It triggers a flush. It simply deletes the quarantined data in the ROB and starts fetching down the correct path. The software never knew the CPU made a mistake.

## The Security Disaster: Meltdown & Spectre (2018)

For 20 years, computer scientists believed Speculative Execution was perfectly secure because incorrectly guessed data was completely deleted. 

In 2018, researchers discovered the **Spectre** and **Meltdown** vulnerabilities, shattering this assumption. 
The flaw was in the **Cache**. While speculative execution reverts the CPU Registers, *it does not revert the L1 Cache*. 

A malicious program can trick the CPU's branch predictor into speculatively executing an illegal memory read (e.g., reading a password from the kernel). The CPU eventually realizes it made an illegal read and throws the data away... but that password was pulled into the L1 Cache. The attacker can then use highly precise timing attacks to measure cache latency and extract the secret password bit-by-bit. This flaw forced fundamental redesigns in OS kernels and CPU hardware worldwide.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Superscalar execution/index.mdx': `---
title: Superscalar Architecture
description: A CPU design that implements Instruction-Level Parallelism by dispatching multiple instructions to duplicated execution units in a single clock cycle.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Superscalar Architecture">

In a standard pipelined processor, the theoretical maximum speed is an IPC (Instructions Per Clock) of **1.0**. Even if the pipeline is perfectly full, the CPU can only retire one instruction at the end of the pipeline per cycle.

By the 1990s, engineers hit the limits of clock speed (due to heat and physics). To make processors faster without increasing the clock speed, they needed an IPC greater than 1.0. This led to **Superscalar Execution**, a form of Instruction-Level Parallelism (ILP) within a single CPU core.

<Callout icon="info" title="The Multi-Lane Highway">
  If Pipelining is turning a sequential manufacturing process into an assembly line, Superscalar Architecture is **building multiple parallel assembly lines next to each other**. Instead of pushing 1 car down the line every minute, you push 4 cars down 4 lines simultaneously.
</Callout>

## Physical Duplication

To execute multiple instructions per cycle, a superscalar processor must physically duplicate its internal hardware. A modern Intel core is heavily superscalar. Inside a *single core*, there might be:
- 4 Integer ALUs (for basic math)
- 2 FPUs (for Floating-Point decimals)
- 2 AGUs (Address Generation Units for interacting with RAM)
- 2 Load/Store units

## The Dispatch Bottleneck

The hardest part of a superscalar architecture is the Dispatch Unit (often integrated with the Out-of-Order Execution scheduler). 

If the CPU wants to dispatch 4 instructions simultaneously into the 4 ALUs, it must mathematically prove, in a fraction of a nanosecond, that **none of those 4 instructions depend on each other** (no Data Hazards). 

- If \`Instruction 1\` calculates a variable used by \`Instruction 2\`, they *cannot* be executed in the same cycle on different ALUs. \`Instruction 2\` must wait.
- If \`Instruction 3\` and \`Instruction 4\` calculate entirely independent variables, they are dispatched simultaneously.

Because human-written code contains so many dependencies, it is incredibly difficult to actually achieve the theoretical maximum IPC. A CPU that can technically execute 6 instructions per cycle might average an actual IPC of 1.5 to 2.5 on real-world code. 

### VLIW (Very Long Instruction Word)
An alternative to Superscalar is **VLIW** (used by early DSPs and Intel's failed Itanium). Instead of the *hardware* figuring out which instructions can run in parallel on the fly, the *compiler* figures it out ahead of time, bundling 4 independent instructions into one massive "Long Word" instruction. While brilliant in theory, it proved too rigid for general-purpose computing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/SIMD/index.mdx': `---
title: SIMD (Single Instruction, Multiple Data)
description: A parallel computing architecture that allows a CPU to apply a single mathematical operation to a large batch of data points simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SIMD (Single Instruction, Multiple Data)">

Traditional CPU execution is **SISD (Single Instruction, Single Data)**. If you want to add 10 to a list of 4 numbers, the CPU must execute the \`ADD\` instruction 4 separate times. This is incredibly inefficient for media processing, graphics, and scientific simulations where the exact same math is applied to massive arrays of data.

**SIMD (Single Instruction, Multiple Data)** is a hardware architecture designed specifically for this use case. With SIMD, you issue one \`ADD\` instruction, and the hardware adds 10 to all 4 numbers simultaneously in a single clock cycle.

<Callout icon="success" title="The SIMD Speedup">
  Applying a brightness filter to an image requires adding a value to the Red, Green, and Blue bytes of a pixel. Using SISD, processing one pixel takes 3 instructions. Using SIMD, you pack all three colors into a single wide register and process the entire pixel in exactly 1 instruction—a 300% speed increase.
</Callout>

## How SIMD Works: Wide Registers

To facilitate SIMD, CPU manufacturers added specialized, ultra-wide registers to the CPU. 
While a standard 64-bit register (like \`RAX\`) holds a single 64-bit integer, a modern SIMD register might be **256 bits or 512 bits wide**.

You can pack multiple smaller data types into one of these wide registers:
- A 256-bit register can hold **four 64-bit integers**.
- Or **eight 32-bit floats**.
- Or **thirty-two 8-bit bytes** (perfect for pixel color data).

When the CPU executes a SIMD \`ADD\` instruction, the ALU physically partitions its logic gates to independently add the 8 distinct floating-point numbers in parallel, yielding 8 separate answers in a single cycle.

## Real-World SIMD Implementations

Every modern CPU includes SIMD extensions. The compiler (or the programmer writing raw intrinsics) detects loops that can be parallelized and explicitly compiles them into these SIMD instructions (a process called **Auto-Vectorization**).

- **Intel / AMD (x86)**: The history of x86 SIMD is a graveyard of acronyms. It started with **MMX** in 1996, evolved into **SSE** (Streaming SIMD Extensions), then **AVX** (Advanced Vector Extensions), and currently **AVX-512**, which utilizes massive 512-bit wide registers.
- **ARM**: Apple and mobile chips use an incredibly efficient SIMD architecture called **NEON**.

Because SIMD hardware draws immense power, utilizing instructions like AVX-512 actually causes the CPU to generate so much heat that the processor is physically forced to lower its clock speed to prevent melting!

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Vector processors/index.mdx': `---
title: Vector Processors
description: Specialized CPU architectures explicitly designed to execute mathematical operations on massive, one-dimensional arrays (vectors) of data at blazing speeds.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vector Processors">

While modern CPUs use **SIMD** (Single Instruction, Multiple Data) to process small batches of data in parallel, **Vector Processors** take this concept to its absolute extreme. 

Historically dominating the world of supercomputers in the 1980s and 1990s (most notably the famous Cray supercomputers), vector processing is the architecture of choice for scientific computing, weather forecasting, and fluid dynamics.

<Callout icon="info" title="Scalar vs. Vector">
  - **Scalar Processor (Standard CPU)**: Operates on one piece of data at a time. \`C = A + B\`.
  - **Vector Processor**: Operates on an entire array of data simultaneously. \`Array_C = Array_A + Array_B\`. The hardware handles the looping, fetching, and math across thousands of elements automatically.
</Callout>

## How Vector Processing Differs from SIMD

While they sound similar, true Vector Processors and x86 SIMD extensions (like AVX) are architecturally distinct:

1. **Register Length**: A SIMD AVX register is fixed at 512 bits (holding maybe 16 integers). A true Vector Machine has vector registers that can hold thousands of elements, and the length of the vector is abstracted away from the instruction set.
2. **Execution Strategy**: 
   - **SIMD** is fully parallel. It takes 16 numbers and pushes them through 16 ALUs at the exact same time.
   - **Vector Processors** are deeply **pipelined**. If you ask a vector machine to add two arrays of 1,000 numbers, it doesn't have 1,000 ALUs. Instead, it streams the data from memory into a massive, heavily optimized ALU pipeline. Once the pipeline fills up, it outputs one finished calculation every fraction of a nanosecond, hiding the massive latency of RAM.

## The Memory Bandwidth Challenge

The primary bottleneck of a Vector Processor is not the math—it's feeding the beast. A vector ALU can crunch data so incredibly fast that standard RAM cannot keep up. 
To solve this, Vector Processors utilize **Vector Memory Architectures**, which use highly interleaved memory banks. Instead of asking one RAM chip for 1000 numbers sequentially, the processor asks 100 separate RAM chips for 10 numbers each, simultaneously.

## The Modern Resurgence

Pure vector processors fell out of favor in the 2000s as standard x86 CPUs became fast enough to handle most workloads. However, the architecture has seen a massive resurgence today in two specific areas:
1. **GPUs**: Modern Graphics Processing Units are essentially massive, modern implementations of vector processing principles, adapted to handle rendering and AI.
2. **RISC-V Vector Extension (RVV)**: The open-source RISC-V architecture includes a highly praised Vector extension that behaves like a true vector machine (length-agnostic), completely abandoning the fixed-width register philosophy of Intel's AVX.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/Multicore-manycore design/index.mdx': `---
title: Multicore and Manycore Design
description: The architectural shift from increasing single-core clock speeds to placing dozens or hundreds of independent processing cores onto a single silicon die.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multicore and Manycore Design">

For the first 30 years of microprocessor history, the primary way to make a computer faster was simply to increase the clock speed (from 10 MHz to 3.8 GHz). However, in 2004, the industry hit the **Power Wall**. 
Because power consumption and heat generation scale exponentially with frequency, pushing a CPU past 4 GHz caused the silicon to literally melt.

To continue increasing performance (adhering to Moore's Law), engineers fundamentally shifted their strategy: instead of making one core ridiculously fast, they placed **multiple independent cores on the same chip**.

<Callout icon="success" title="The Multicore Era">
  A multicore processor is essentially gluing two complete, independent CPUs (each with their own ALUs, Control Units, and L1/L2 caches) onto a single piece of silicon, allowing the operating system to run two entirely separate programs perfectly simultaneously.
</Callout>

## Multicore (2 to 64 Cores)

Modern consumer CPUs (like Intel Core i9 or AMD Ryzen) are **multicore**. They feature a small number of incredibly powerful, highly superscalar cores.
- **Shared L3 Cache**: While each core has its own private L1 and L2 cache, they all share a massive L3 cache. This allows Core 1 to pass data to Core 2 without writing out to the slow motherboard RAM.
- **Cache Coherence**: Because multiple cores are working independently, a severe problem arises: if Core 1 modifies variable \`X\` in its private L1 cache, Core 2's cached version of \`X\` is now stale and invalid. CPUs use complex **Cache Coherence Protocols (like MESI)** to constantly snoop on each other and ensure all cores have a synchronized view of memory.

## Manycore (100+ Cores)

While multicore processors optimize for high single-thread performance (each core is a genius), **Manycore** processors optimize for massive throughput (hundreds of mediocre workers).

- **Intel Xeon Phi**: An early attempt at manycore design, placing 60+ simple x86 cores on a single PCIe card for supercomputing.
- **Network on Chip (NoC)**: When you have 128 cores on a single chip, connecting them all with a shared bus is impossible (traffic jam). Manycore chips use a literal microscopic internet router system (a 2D mesh network) etched into the silicon, where Core 1 sends "data packets" through routers to reach Core 64.

## Amdahl's Law

The painful reality of multicore design is governed by **Amdahl's Law**. It states that the performance benefit of adding more cores is strictly limited by the portion of the program that *cannot* be parallelized. 
If 20% of your software relies on sequential logic (e.g., waiting for user input or writing to a file in order), no matter if you have 10 cores or 10,000 cores, the maximum theoretical speedup of your program is capped at 5x. This is why 64-core processors don't make video games run 64 times faster.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/ASICs/index.mdx': `---
title: Application-Specific Integrated Circuits (ASICs)
description: Custom-designed silicon chips built to perform exactly one task with absolute, mathematically perfect efficiency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Application-Specific Integrated Circuits (ASICs)">

A standard CPU (like an Intel core) is a **General Purpose** processor. Because it must be capable of running a web browser, rendering a video, and calculating a spreadsheet, its silicon is full of compromises. It wastes massive amounts of power and area on instruction decoders, branch predictors, and caches.

If you have a computationally heavy task that never changes, a CPU is the wrong tool. Instead, you design an **ASIC (Application-Specific Integrated Circuit)**.

<Callout icon="info" title="Hardware vs. Software">
  Instead of writing a software program in C++ and feeding it to a general CPU, you physically design the algorithm out of copper wire and logic gates. The algorithm is permanently etched into the silicon. It cannot run an operating system, and it cannot be updated, but it will perform its singular task thousands of times faster than a CPU, while using a fraction of the electricity.
</Callout>

## The Lifecycle of an ASIC

Designing an ASIC is one of the most expensive and complex engineering tasks on earth.
1. **Design**: Hardware engineers write the logic using a Hardware Description Language (HDL) like Verilog or VHDL.
2. **Verification**: The design is rigorously tested in software simulations. If there is a single bug in the logic, millions of dollars are wasted.
3. **Tape-out & Fabrication**: The blueprints are sent to a foundry (like TSMC in Taiwan). They create the physical photolithography masks and manufacture the silicon chips. The initial setup cost (NRE - Non-Recurring Engineering) can exceed **$50 million**.

Because the upfront cost is so astronomical, ASICs are only viable if you plan to manufacture and sell millions of units to recoup the engineering costs.

## Real-World Examples

You interact with ASICs every single day:
- **Smartphones**: The tiny chips inside your iPhone dedicated strictly to encoding H.264 video, or processing the camera sensor data.
- **Networking**: The massive internet routers powering AWS and Google data centers use ASICs to route millions of network packets per second without ever touching a CPU.
- **Bitcoin Mining**: In the early days, people mined Bitcoin using CPUs. As the math got harder, they moved to GPUs. Today, the entire Bitcoin network runs exclusively on ASICs—chips specifically physically wired to calculate the SHA-256 hash algorithm and literally nothing else.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/FPGAs/index.mdx': `---
title: Field-Programmable Gate Arrays (FPGAs)
description: The ultimate chameleon chip—a blank slate of silicon logic gates that can be physically rewired on the fly to become any hardware circuit you want.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Field-Programmable Gate Arrays (FPGAs)">

An **ASIC** offers perfect performance but costs $50 million to design and cannot be changed once manufactured. 
A **CPU** offers perfect flexibility (just write new software) but is slow and power-hungry. 

The **FPGA (Field-Programmable Gate Array)** is the miraculous middle ground. It is a piece of hardware that acts like software. You can buy a blank FPGA off the shelf for $100, write hardware code (Verilog), and download it to the chip. The chip physically rearranges its internal wiring to become the custom circuit you designed. 

<Callout icon="success" title="Hardware on Demand">
  With an FPGA, you can download a file from the internet, and your chip instantly becomes a custom audio synthesizer. Tomorrow, you can download a new file, and the exact same physical chip reconfigures itself into a Bitcoin miner. You are altering the *hardware*, not the software!
</Callout>

## How FPGAs Work

Under the microscope, an FPGA does not contain ALUs or CPU caches. Instead, it contains a massive grid of three primitive components:
1. **Configurable Logic Blocks (CLBs)**: Tiny Look-Up Tables (LUTs) that can be programmed to act as any basic logic gate (AND, OR, XOR) or perform simple math.
2. **Programmable Interconnects**: A massive matrix of microscopic electrical switches connecting all the CLBs together.
3. **I/O Blocks**: Pins to interact with the outside world.

When you "program" an FPGA, you upload a **Bitstream**. This file sets the state of millions of microscopic SRAM switches, routing the electrical pathways between the Logic Blocks to physically manifest your custom circuit. 

## Advantages vs. ASICs

- **Time to Market**: You can design and deploy an FPGA in weeks, whereas fabricating an ASIC at TSMC takes 18 months.
- **Upgradability**: If a bug is found in an ASIC, it goes in the trash. If a bug is found in a satellite in deep space powered by an FPGA, engineers on Earth can beam up a new bitstream to physically rewire the satellite's hardware in orbit.
- **Cost**: For low-volume products (like MRI machines or military jets where you only need 1,000 chips), FPGAs are incredibly cheap because you avoid the $50M ASIC setup fee.

## FPGAs in the Cloud

Historically used in aerospace and telecommunications, FPGAs have recently invaded the cloud. Microsoft famously deployed Intel Altera FPGAs across their Azure data centers (Project Catapult). When Bing search needs to accelerate its ranking algorithm, the data center dynamically reprograms the FPGAs to act as custom search accelerators, resulting in massive speedups over standard CPUs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/9. Computer Architecture/TPUs/index.mdx': `---
title: Tensor Processing Units (TPUs)
description: Google's custom-designed ASIC dedicated exclusively to accelerating the massive matrix multiplication required for Machine Learning and AI.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tensor Processing Units (TPUs)">

For years, the Artificial Intelligence revolution was powered by **GPUs** (Nvidia). Because neural networks require millions of parallel calculations, GPUs were perfectly suited for the task. However, GPUs are still inherently designed to render 3D graphics; they contain hardware for texture mapping and ray tracing that is completely useless for AI, wasting silicon area and power.

In 2016, Google shocked the industry by announcing they had secretly built their own custom ASIC dedicated exclusively to deep learning: the **Tensor Processing Unit (TPU)**.

<Callout icon="info" title="The Matrix Multiplier">
  At its core, 95% of the math required to run a Large Language Model (like ChatGPT) is simply multiplying massive grids of numbers (Matrices/Tensors) together. The TPU strips away all graphics logic, branch predictors, and standard CPU caches, dedicating almost all of its silicon exclusively to matrix multiplication.
</Callout>

## The Systolic Array Architecture

The genius of the TPU is its heart: the **Systolic Array**. 

In a standard CPU or GPU, the ALU reads two numbers from a register, multiplies them, and writes the answer back to the register. This constant reading and writing to registers consumes massive amounts of power and limits speed (the Von Neumann bottleneck).

A Systolic Array is a massive, physical grid of thousands of ALUs wired directly into each other (e.g., a 256 $\\times$ 256 grid of MAC units - Multiply-Accumulate). 
1. Data flows into the top and left of the grid, pulsing through the ALUs like blood pumping through a heart (hence "systolic").
2. ALU #1 multiplies a number and passes the result *directly* to ALU #2 below it, without ever saving it to a register.
3. The data cascades through 65,000 ALUs simultaneously.

This allows the TPU to perform **hundreds of thousands of matrix operations per clock cycle** while drawing significantly less power than an equivalent GPU.

## TPUs in the Real World

Because Google built the TPU as a proprietary ASIC, you cannot buy one at a store. They exist exclusively inside Google's data centers.

- **Inference**: TPU v1 was designed for inference (running AI models). When you speak to Google Assistant, ask Google Translate a question, or search for a photo in Google Photos, the math is calculated on a TPU.
- **Training**: Subsequent TPU versions (v2, v3, v4) added floating-point support, allowing them to train massive AI models. Google strings thousands of TPUs together using custom fiber-optic networks into "TPU Pods," creating massive supercomputers capable of training models like Gemini.

The success of the TPU proved that the future of computing lies in Domain-Specific Architectures (DSAs)—specialized hardware designed for specific algorithms.

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
