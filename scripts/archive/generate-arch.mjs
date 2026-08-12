import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '9. Computer Architecture/CPU/index.mdx': `---
title: CPU (Central Processing Unit)
description: The primary component of a computer that acts as its "brain."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="CPU (Central Processing Unit)">

The Central Processing Unit (CPU) is the electronic circuitry that executes instructions comprising a computer program. The CPU performs basic arithmetic, logic, controlling, and input/output (I/O) operations specified by the instructions in the program.

<Callout icon="info" title="The Fetch-Decode-Execute Cycle">
  Every CPU in the world operates on this fundamental loop:
  1. **Fetch**: Retrieve an instruction from main memory (RAM).
  2. **Decode**: Interpret what the instruction is asking the CPU to do.
  3. **Execute**: Perform the operation (e.g., adding two numbers) using the ALU.
</Callout>

## Core Components

<ComparisonTable 
  headers={['Component', 'Abbreviation', 'Function']}
  rows={[
    ['Arithmetic Logic Unit', 'ALU', 'Performs all mathematical calculations (addition, subtraction) and logical operations (AND, OR).'],
    ['Control Unit', 'CU', 'Directs the operation of the processor. It tells the ALU, memory, and I/O devices how to respond to instructions.'],
    ['Registers', 'N/A', 'Extremely fast, tiny memory locations located directly on the CPU chip (e.g., Program Counter, Instruction Register).']
  ]}
/>

## Architecture: The Von Neumann Model

Almost all modern CPUs are based on the Von Neumann architecture, where both data and instructions are stored in the same memory.

<ArchitectureDiagram chart={\`
graph TD
  subgraph Central Processing Unit
    CU[Control Unit]
    ALU[Arithmetic Logic Unit]
    Reg[Registers]
    
    CU <--> ALU
    ALU <--> Reg
    CU <--> Reg
  end
  
  Mem[(Main Memory / RAM)]
  IO[Input / Output Devices]
  
  CU <--> Mem
  ALU <--> Mem
  CU <--> IO
\`} />

</TechnologyTemplate>
`,
  '9. Computer Architecture/Cache (L1-L2-L3)/index.mdx': `---
title: CPU Cache (L1, L2, L3)
description: Small, ultra-fast memory located inside or near the CPU to reduce the time it takes to access data from the main memory.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="CPU Cache (L1, L2, L3)">

A CPU cache is a hardware cache used by the central processing unit (CPU) of a computer to reduce the average cost (time or energy) to access data from the main memory (RAM). A cache is a smaller, faster memory, located closer to a processor core.

<Callout icon="warning" title="The Von Neumann Bottleneck">
  CPUs are incredibly fast, but RAM is relatively slow. If the CPU had to wait for RAM every time it needed data, it would spend 99% of its time sitting idle. Caches exist specifically to solve this massive speed mismatch.
</Callout>

## The Cache Hierarchy

Modern CPUs use a multi-level cache hierarchy.

<ComparisonTable 
  headers={['Level', 'Speed', 'Size', 'Location']}
  rows={[
    ['L1 (Level 1)', 'Fastest (~1-2 nanoseconds)', 'Smallest (~64 KB per core)', 'Inside the CPU Core (Split into Instruction and Data caches)'],
    ['L2 (Level 2)', 'Very Fast (~3-10 nanoseconds)', 'Medium (~256 KB to 2 MB per core)', 'Inside the CPU Core (Usually unified)'],
    ['L3 (Level 3)', 'Fast (~10-20 nanoseconds)', 'Largest (~8 MB to 64+ MB)', 'Shared across all cores on the CPU die'],
    ['Main Memory (RAM)', 'Slow (~50-100 nanoseconds)', 'Massive (16 GB - 128 GB)', 'External motherboard slots']
  ]}
/>

## Architecture

When a CPU needs data, it checks L1 first (Cache Hit). If it's not there (Cache Miss), it checks L2, then L3, and finally fetches it from the painstakingly slow RAM.

<ArchitectureDiagram chart={\`
graph TD
  subgraph CPU
    subgraph Core 1
      ALU1[ALU & Registers]
      L1_1[L1 Cache]
      L2_1[L2 Cache]
      ALU1 <--> L1_1 <--> L2_1
    end
    
    subgraph Core 2
      ALU2[ALU & Registers]
      L1_2[L1 Cache]
      L2_2[L2 Cache]
      ALU2 <--> L1_2 <--> L2_2
    end
    
    L3[L3 Cache (Shared)]
    L2_1 <--> L3
    L2_2 <--> L3
  end
  
  RAM[(Main Memory - RAM)]
  L3 <--> RAM
\`} />

</TechnologyTemplate>
`,
  '9. Computer Architecture/Virtual memory/index.mdx': `---
title: Virtual Memory
description: A memory management capability of an OS that creates the illusion of a very large (main) memory.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Virtual Memory">

Virtual Memory is a memory management technique that provides an "idealized abstraction of the storage resources that are actually available on a given machine" which "creates the illusion to users of a very large (main) memory".

<Callout icon="tip" title="The Illusion of Infinite RAM">
  If you have 8GB of physical RAM, but you open Chrome tabs and games that require 12GB of memory, your computer doesn't crash. Instead, the OS moves chunks of inactive data from RAM to your hard drive (Paging/Swapping) to free up space.
</Callout>

## How it works: Paging

The operating system divides memory into fixed-size blocks called **Pages** (typically 4KB). It uses a **Page Table** to map "Virtual Addresses" (what the program sees) to "Physical Addresses" (where the data actually lives on the RAM sticks).

<ComparisonTable 
  headers={['Term', 'Description']}
  rows={[
    ['Virtual Address', 'The fake memory address generated by the CPU and given to a program.'],
    ['Physical Address', 'The actual hardware location in the RAM chips.'],
    ['Page Fault', 'Occurs when a program tries to access a page that is currently mapped to the hard drive instead of RAM. The OS must pause the program, fetch the data from the slow hard drive, put it in RAM, and resume.'],
    ['MMU (Memory Management Unit)', 'The hardware chip that translates Virtual Addresses to Physical Addresses instantly.']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph LR
  CPU[CPU\\n(Generates Virtual Address)]
  
  subgraph MMU
    TLB[Translation Lookaside Buffer\\n(Cache for Page Table)]
  end
  
  PageTable[Page Table\\n(In OS Memory)]
  
  PhysicalRAM[(Physical RAM)]
  Disk[(Hard Disk / SSD\\n"Swap Space")]
  
  CPU --> TLB
  TLB -- Cache Miss --> PageTable
  PageTable -- Address Translation --> PhysicalRAM
  PageTable -- Page Fault! --> Disk
\`} />

</TechnologyTemplate>
`,
  '9. Computer Architecture/Pipelining/index.mdx': `---
title: Pipelining
description: An implementation technique where multiple instructions are overlapped in execution.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Pipelining">

Pipelining is a technique used in the design of CPUs to increase their instruction throughput (the number of instructions that can be executed in a unit of time). 

<Callout icon="info" title="The Assembly Line Metaphor">
  Think of building a car. Instead of one team doing every step (chassis, engine, paint) one car at a time, you use an assembly line. While Car 1 is being painted, Car 2 is getting an engine, and Car 3 is getting a chassis. This drastically increases the number of cars built per hour.
</Callout>

## The 5-Stage Pipeline

A classic RISC processor divides instruction execution into 5 distinct stages.

<ComparisonTable 
  headers={['Stage', 'Name', 'Description']}
  rows={[
    ['1', 'Instruction Fetch (IF)', 'Reads the instruction from memory.'],
    ['2', 'Instruction Decode (ID)', 'Decodes the instruction and reads registers.'],
    ['3', 'Execute (EX)', 'Performs ALU operations (e.g., adding).'],
    ['4', 'Memory Access (MEM)', 'Reads/writes data to memory (if it is a load/store instruction).'],
    ['5', 'Write Back (WB)', 'Writes the result back into a register.']
  ]}
/>

## Visualizing the Pipeline

Without pipelining, an instruction takes 5 clock cycles to finish before the next one starts. WITH pipelining, one instruction finishes *every single clock cycle*.

\`\`\`text
Clock Cycle:   1   2   3   4   5   6   7   8
---------------------------------------------
Instr 1:       IF  ID  EX  MEM WB
Instr 2:           IF  ID  EX  MEM WB
Instr 3:               IF  ID  EX  MEM WB
Instr 4:                   IF  ID  EX  MEM WB
\`\`\`

## Pipeline Hazards

Pipelining isn't perfect. Certain situations can cause the pipeline to stall (creating a "bubble").
1. **Data Hazards**: Instruction 2 needs the result of Instruction 1, but Instruction 1 hasn't finished writing the result yet.
2. **Control Hazards**: A branch (like an \`if\` statement) means the CPU doesn't know which instruction to fetch next until the condition is evaluated. (Solved by **Branch Prediction**).

</TechnologyTemplate>
`,
  '9. Computer Architecture/Multicore-manycore design/index.mdx': `---
title: Multicore & Manycore Design
description: Integrating two or more independent processing units (called cores) onto a single integrated circuit.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Multicore & Manycore Design">

A multi-core processor is a single computing component with two or more independent processing units called cores, which read and execute program instructions. The instructions are ordinary CPU instructions, but the single processor can run multiple instructions on separate cores at the same time, increasing overall speed for programs amenable to parallel computing.

<Callout icon="error" title="The End of Moore's Law">
  Historically, CPUs got faster by increasing the clock speed (from 1MHz to 3GHz+). However, increasing clock speeds beyond 4GHz causes silicon to generate massive, uncoolable amounts of heat (The Power Wall). To keep getting faster, engineers stopped increasing the clock speed and started slapping multiple CPU cores onto the same chip.
</Callout>

## Multicore vs Manycore

<ComparisonTable 
  headers={['Architecture', 'Description', 'Examples']}
  rows={[
    ['Multicore', 'A CPU with a small number (2 to 64) of highly complex, powerful cores designed for general-purpose sequential tasks.', 'Intel Core i9, AMD Ryzen, Apple M-Series.'],
    ['Manycore', 'A chip with hundreds or thousands of very simple, low-power cores designed strictly for massive parallel throughput.', 'NVIDIA GPUs, Google TPUs.']
  ]}
/>

## The Challenge: Amdahl's Law

Just because you have 8 cores doesn't mean your program will run 8x faster. **Amdahl's Law** states that the theoretical speedup is always limited by the strictly serial (non-parallelizable) portion of the code.

If a program takes 10 seconds to run, and 2 seconds of that *must* be done sequentially, the absolute maximum theoretical speedup you can ever achieve—even if you had 1 million cores—is 5x.

## Architecture: Shared Memory

In a multicore system, all cores share the same RAM, leading to the highly complex problem of **Cache Coherence** (ensuring Core 1's L1 cache doesn't have a different value than Core 2's L1 cache).

<ArchitectureDiagram chart={\`
graph TD
  subgraph Multicore CPU
    subgraph Core 1
      ALU1[ALU]
      L1_1[L1 Cache]
      ALU1 <--> L1_1
    end
    
    subgraph Core 2
      ALU2[ALU]
      L1_2[L1 Cache]
      ALU2 <--> L1_2
    end
    
    subgraph Core 3
      ALU3[ALU]
      L1_3[L1 Cache]
      ALU3 <--> L1_3
    end
    
    L3[L3 Shared Cache]
    L1_1 <--> L3
    L1_2 <--> L3
    L1_3 <--> L3
  end
  
  RAM[(Main Memory)]
  L3 <--> RAM
\`} />

</TechnologyTemplate>
`,
}

async function generateArch() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateArch().catch(console.error)
