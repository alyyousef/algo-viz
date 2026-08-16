import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '45. Parallel & Concurrent Computing/GPU computing/index.mdx': `---
title: GPU Computing
description: The use of a graphics processing unit (GPU) as a co-processor to accelerate CPUs for general-purpose scientific and engineering computing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GPU Computing (GPGPU)">

For decades, GPUs were highly specialized pieces of silicon designed exclusively for rendering triangles and calculating lighting for video games. 

In the late 2000s, engineers realized that the mathematical requirements for 3D graphics (multiplying massive matrices of pixels simultaneously) were the exact same mathematical requirements needed for Physics Simulations and Artificial Intelligence. 

**General-Purpose computing on GPUs (GPGPU)** was born.

<Callout icon="success" title="The Architecture Gap">
  - **CPU:** Optimized for *Latency*. A top-tier CPU has ~16 incredibly smart, massive cores. It can switch tasks and execute complex, branching \\\`if/else\\\` logic blazingly fast.
  - **GPU:** Optimized for *Throughput*. A modern GPU has ~10,000 incredibly dumb, tiny cores. They cannot handle complex branching logic well, but they can execute the exact same mathematical instruction on 10,000 different numbers at the exact same physical moment.
</Callout>

## The Deep Learning Revolution

GPU Computing is the sole physical reason Artificial Intelligence exploded in 2012 (AlexNet). 

Training a neural network requires trillions of matrix multiplications. A 16-core CPU would take years to train ChatGPT. A cluster of 10,000-core GPUs can mathematically process those matrices in parallel, training the same model in weeks. The entire AI revolution is fundamentally a hardware revolution disguised as a software one.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/CUDA/index.mdx': `---
title: CUDA
description: A parallel computing platform and application programming interface model created by Nvidia.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="CUDA"
  subtitle="The engine of the AI revolution"
  logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Nvidia_CUDA_Logo.jpg/512px-Nvidia_CUDA_Logo.jpg"
  description="Compute Unified Device Architecture (CUDA) is the proprietary software layer created by NVIDIA that allows developers to write standard C++ code and execute it directly on the thousands of physical cores inside an NVIDIA GPU."
  yearCreated={2007}
  creator="NVIDIA"
  isOpenSource={false}
  websiteUrl="https://developer.nvidia.com/cuda-zone"
>

Before CUDA, if a scientist wanted to use a GPU to calculate physics, they mathematically had to trick the GPU. They had to encode their physics data into a fake "Texture" image, write a fake graphics "Shader" to process the pixels, and read the resulting colors back as math answers.

CUDA changed the world by exposing the GPU as a general-purpose processor.

<Callout icon="error" title="The Moat">
  CUDA is completely proprietary and mathematically locked to NVIDIA silicon. It cannot run on AMD or Intel GPUs. Because CUDA was first, and is incredibly developer-friendly, 99% of all global AI research (PyTorch, TensorFlow) was written in CUDA. This software lock-in is the primary reason NVIDIA became a $3 Trillion company.
</Callout>

## How CUDA Works

In CUDA, you write a C++ function called a **Kernel**. 

When you launch the Kernel, you specify an execution grid (e.g., \\\`&lt;&lt;&lt;100, 256&gt;&gt;&gt;\\\`). The NVIDIA driver mathematically maps this grid directly to the physical silicon, instantly spawning 25,600 simultaneous threads on the GPU hardware to execute your function in parallel.

</TechnologyTemplate>
`,
  '45. Parallel & Concurrent Computing/OpenCL/index.mdx': `---
title: OpenCL
description: An open standard for cross-platform, parallel programming of diverse processors found in personal computers, servers, mobile devices and embedded platforms.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="OpenCL"
  subtitle="The open alternative to CUDA"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/OpenCL_logo.svg/512px-OpenCL_logo.svg.png"
  description="Open Computing Language (OpenCL) is an open, royalty-free standard maintained by the Khronos Group. It allows developers to write parallel code that can execute on CPUs, GPUs (AMD, NVIDIA, Intel), DSPs, and even FPGAs."
  yearCreated={2009}
  creator="Khronos Group (originally Apple)"
  isOpenSource={true}
  websiteUrl="https://www.khronos.org/opencl/"
>

If CUDA is the "Apple iOS" of parallel computing (highly polished but strictly locked to one company's hardware), **OpenCL** is the "Android" of parallel computing.

OpenCL was designed to be mathematically agnostic. An OpenCL Kernel written in C can be compiled and executed on an AMD graphics card, an Intel CPU, or a mobile ARM processor, completely unmodified.

<Callout icon="warning" title="The Ecosystem Loss">
  Despite being the open standard, OpenCL largely lost the AI war to CUDA. Because OpenCL had to support a massive variety of hardware architectures, its API was mathematically much more verbose, difficult to write, and often less optimized for specific GPU silicon compared to NVIDIA's laser-focused CUDA compiler.
</Callout>

## The Mathematics of Portability

To achieve extreme portability, OpenCL mathematically abstracts the hardware into:
1. **Host:** The main CPU.
2. **Compute Devices:** The GPUs or DSPs.
3. **Compute Units:** Cores within a device.
4. **Processing Elements:** The individual mathematical ALUs executing the threads (called "Work-Items" in OpenCL).

</TechnologyTemplate>
`,
  '45. Parallel & Concurrent Computing/ROCm/index.mdx': `---
title: ROCm
description: AMD's open-source software development stack for highly parallel computing on GPUs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="ROCm"
  subtitle="AMD's direct answer to CUDA"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/AMD_ROCm_logo.svg/512px-AMD_ROCm_logo.svg.png"
  description="Radeon Open Compute (ROCm) is AMD's official, open-source software stack designed to break NVIDIA's CUDA monopoly in High-Performance Computing (HPC) and Artificial Intelligence."
  yearCreated={2016}
  creator="AMD"
  isOpenSource={true}
  websiteUrl="https://rocm.docs.amd.com/"
>

For years, the AI industry begged for a viable competitor to NVIDIA. AMD hardware was incredibly fast mathematically, but scientists couldn't use it because PyTorch and TensorFlow were inextricably hardcoded to use CUDA.

AMD responded by building **ROCm**. 

<Callout icon="success" title="The HIPIllusion">
  The true genius of the ROCm stack is a tool called **HIP (Heterogeneous-Compute Interface for Portability)**. HIP mathematically intercepts standard CUDA C++ code and compiles it on the fly to run perfectly on AMD GPUs. It allows developers to take a million lines of NVIDIA-locked code and port it to AMD silicon in a matter of hours.
</Callout>

## The Exascale Era

ROCm is not just an underdog; it is mathematically powering some of the largest supercomputers on Earth. The **Frontier Supercomputer** (the first computer in human history to officially break the Exaflop barrier—one quintillion mathematical operations per second) is entirely powered by AMD Instinct GPUs running the ROCm software stack.

</TechnologyTemplate>
`,
  '45. Parallel & Concurrent Computing/MPI/index.mdx': `---
title: Message Passing Interface (MPI)
description: A standardized and portable message-passing standard designed to function on parallel computing architectures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Message Passing Interface (MPI)">

Everything discussed in Parallel Computing so far (Threads, Mutexes, CUDA) fundamentally relies on **Shared Memory**. The threads physically sit inside the same motherboard and share the same stick of RAM.

But what happens when your mathematical simulation requires 50,000 CPU cores? You cannot fit 50,000 cores on one motherboard. You must link 1,000 separate computers together via Ethernet or InfiniBand. 

This is where **MPI** rules the world.

<Callout icon="tip" title="The Distributed Standard">
  The **Message Passing Interface (MPI)** is the absolute industry standard for High-Performance Computing (HPC) clusters. It is an API specification that mathematically defines how completely independent servers (Nodes) can send binary data arrays directly to each other over a network with near-zero latency.
</Callout>

## Mathematical Mechanics

In MPI, there is no Shared Memory. If Node 1 needs the result of Node 2's calculation, Node 2 must explicitly execute an \\\`MPI_Send\\\` instruction, and Node 1 must explicitly execute an \\\`MPI_Recv\\\` instruction.

While it is mathematically identical to the Actor Model or CSP (Share-Nothing), MPI is implemented as brutally fast C/C++ libraries designed specifically to bypass the OS Network Stack and push raw electrons over InfiniBand hardware, achieving microsecond latency.

</ConceptTemplate>
`,
  '45. Parallel & Concurrent Computing/OpenMP/index.mdx': `---
title: OpenMP
description: An application programming interface that supports multi-platform shared-memory multiprocessing programming in C, C++, and Fortran.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OpenMP (Open Multi-Processing)">

Writing raw \\\`pthreads\\\` in C or managing \\\`std::thread\\\` in C++ is highly error-prone and mathematically complex.

**OpenMP** was created to make Shared-Memory parallelism trivially easy for scientists and engineers. It is an API built directly into modern C/C++/Fortran compilers (like GCC and Clang) that uses simple \\\`#pragma\\\` directives to mathematically transform sequential code into parallel code.

<Callout icon="success" title="The Magic For-Loop">
  Imagine a massive \\\`for\\\` loop that iterates 1 million times. To parallelize this manually, you would have to calculate thread ID offsets, spawn 8 threads, and mathematically join them. 
  
  With OpenMP, you write exactly one line of code above the loop: 
  \\\`#pragma omp parallel for\\\`
  
  The compiler automatically injects all the multithreading mathematics, splits the 1 million iterations perfectly across all available CPU cores, and merges them.
</Callout>

## The Fork-Join Mathematical Model

OpenMP mathematically operates strictly on the **Fork-Join Model**. 
1. The program starts as a single Main Thread.
2. When it hits an OpenMP \\\`#pragma\\\`, the Main Thread mathematically **Forks** into a team of worker threads.
3. The workers execute the block in parallel.
4. At the end of the block, there is an implicit mathematical barrier. The workers synchronize and **Join** back into the single Main Thread.

*(Note: OpenMP is strictly for Shared Memory on a single motherboard. If you need to scale across multiple servers, you must combine OpenMP with MPI.)*

</ConceptTemplate>
`,
}

async function generateMega81() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega81().catch(console.error)
