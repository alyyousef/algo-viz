import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Kubernetes vs Serverless/index.mdx': `---
title: Kubernetes vs Serverless
description: "A comparison of modern cloud execution models, contrasting the massive control and complexity of Kubernetes clusters with the zero-maintenance, pay-per-millisecond efficiency of Serverless Functions."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Kubernetes vs Serverless"
  subtitle="Control vs Convenience"
  tags={['Comparison', 'Cloud', 'Architecture', 'DevOps']}
>

While both paradigms abstract away bare-metal hardware, they approach scaling and billing from completely opposed mathematical philosophies.

## 1. Kubernetes (K8s)
- **Philosophy**: Absolute Control. You manage a cluster of long-running Virtual Machines (Nodes).
- **Billing**: You pay for the underlying VMs 24/7. If your website gets zero traffic at 3:00 AM, you are still mathematically paying full price to keep the servers idling.
- **Use Case**: Massive legacy monoliths, background workers that run infinitely, or APIs with extremely predictable, high-volume traffic where the baseline cost of VMs is cheaper than per-request billing.

## 2. Serverless (e.g., AWS Lambda)
- **Philosophy**: Zero Infrastructure. You upload a single Python/Node.js function. There are no servers, no containers, and no operating systems for you to manage.
- **Billing**: You pay strictly per millisecond of execution. If you get zero traffic, you pay $0.00. 
- **Mechanism**: When a request hits, AWS mathematically boots up a microscopic microVM (Firecracker) in milliseconds, runs your code, and destroys it. If 10,000 users hit it simultaneously, AWS boots 10,000 independent functions instantly.
- **The "Cold Start"**: The mathematical tradeoff is latency. If your function hasn't been used in a while, the 200ms it takes AWS to boot it up is called a "Cold Start," which is unacceptable for ultra-low-latency high-frequency trading.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Linux vs Unix/index.mdx': `---
title: Linux vs Unix
description: "A historical and legal distinction between Unix, the ancient proprietary foundation of modern computing, and Linux, Linus Torvalds' open-source clone that conquered the internet."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Linux vs Unix"
  subtitle="The Proprietary Past vs The Open Future"
  tags={['Comparison', 'Operating Systems', 'Architecture', 'History']}
>

"Unix-like" is a term used to describe modern operating systems, but the legal and architectural differences between pure Unix and Linux are profound.

## 1. Unix (The Ancient Standard)
- **History**: Invented in 1969 at AT&T Bell Labs (by Ken Thompson and Dennis Ritchie, who also invented C). It established the mathematical foundation of modern computing: "Everything is a file," hierarchical file systems, and the CLI shell.
- **Legality**: Unix is heavily trademarked and proprietary. Today, it primarily exists as specialized, highly expensive Enterprise systems tied to specific hardware, such as IBM's **AIX**, HP's **HP-UX**, and Oracle's **Solaris**. (Note: macOS is mathematically certified as a true Unix system, based on BSD).

## 2. Linux (The Open Source Clone)
- **History**: In 1991, a Finnish student named Linus Torvalds was frustrated that he couldn't afford a Unix license. He mathematically reverse-engineered the Unix architecture and wrote a completely free, open-source Kernel (Linux) from scratch.
- **The GNU Project**: Richard Stallman provided all the free, open-source userland tools (Bash, GCC, Make), combining with Linus's kernel to create **GNU/Linux**.
- **The Verdict**: Linux mathematically annihilated proprietary Unix in the server market. Today, Linux runs 100% of the top 500 supercomputers, the vast majority of web servers, and every Android phone on earth.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Linux vs Windows/index.mdx': `---
title: Linux vs Windows
description: "An architectural comparison of the world's dominant operating systems, contrasting Linux's file-based, open-source kernel with Windows' registry-based, proprietary monolith."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Linux vs Windows"
  subtitle="The OS War: Server vs Desktop"
  tags={['Comparison', 'Operating Systems', 'Architecture', 'Infrastructure']}
>

Windows dominates the personal desktop market (gaming, enterprise workstations), while Linux mathematically dominates the server, mobile, and supercomputer markets. Their core architectures reflect these use cases.

## 1. Architectural Philosophies
- **The Kernel**: Windows uses the **NT Kernel**, a massive, proprietary, hybrid microkernel designed heavily around a graphical user interface. Linux is a **Monolithic Kernel**, highly modular, open-source, and natively headless (GUI is entirely optional).
- **Configuration**: Linux mathematically follows the Unix philosophy: "Everything is a file." System configurations are stored in plain text files in TICK1/etc/TICK1. Windows relies on the **Windows Registry**, a massive, centralized, hierarchical binary database that acts as a single point of failure for the entire OS.
- **File System**: Windows uses **NTFS** (case-insensitive, driven by drive letters like TICK1C:\\TICK1). Linux uses **ext4** or **Btrfs** (strictly case-sensitive, anchored by a single root directory TICK1/TICK1).

## 2. Developer Experience
Historically, developing Linux-native code on Windows was a mathematical nightmare requiring slow Virtual Machines. 
Microsoft solved this by inventing **WSL 2** (Windows Subsystem for Linux), which mathematically embeds a genuine Linux kernel directly inside Windows via a hypervisor, allowing developers to run native Ubuntu Bash and Docker seamlessly while keeping Windows for gaming.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/LoRA vs QLoRA/index.mdx': `---
title: LoRA vs QLoRA
description: "A mathematical breakdown of Machine Learning fine-tuning techniques, detailing how LoRA uses low-rank matrices to save VRAM, and how QLoRA introduces 4-bit quantization to fit massive LLMs on consumer GPUs."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="LoRA vs QLoRA"
  subtitle="Fine-Tuning Massive LLMs"
  tags={['Comparison', 'Machine Learning', 'AI', 'Mathematics']}
>

Fine-tuning a massive Large Language Model (like LLaMA-3 with 70 Billion parameters) mathematically requires updating every single weight, which demands multiple $20,000 A100 GPUs (1TB+ of VRAM). LoRA and QLoRA are mathematical tricks to bypass this.

## 1. LoRA (Low-Rank Adaptation)
- **The Math**: Instead of updating the massive original matrix (e.g., 10,000 x 10,000 = 100M parameters), LoRA mathematically freezes the original matrix. It then introduces two tiny "Low-Rank" matrices (e.g., 10,000 x 8 and 8 x 10,000 = 160K parameters) and injects them alongside the original.
- **The Benefit**: You only train the 160K parameters. This mathematically reduces the VRAM required to hold optimizer states by 99%, while achieving ~95% of the accuracy of full fine-tuning.

## 2. QLoRA (Quantized LoRA)
- **The Math**: Even with LoRA, simply *loading* the frozen 70B parameter model in standard 16-bit precision takes 140GB of VRAM. QLoRA mathematically **Quantizes** (compresses) the frozen base model down to **4-bit precision**.
- **The Benefit**: A 70B model now only takes ~40GB of VRAM to load. You then train standard 16-bit LoRA adapters on top of it.
- **The Verdict**: QLoRA is the mathematical breakthrough that allows individual researchers to fine-tune state-of-the-art LLMs on a single consumer graphics card (like an RTX 4090) in their bedroom.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/MongoDB vs PostgreSQL/index.mdx': `---
title: MongoDB vs PostgreSQL
description: "A fundamental comparison of Database architectures, contrasting the rigid, mathematically relational schema of PostgreSQL with the flexible, document-based, horizontally scalable approach of MongoDB."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="MongoDB vs PostgreSQL"
  subtitle="SQL vs NoSQL"
  tags={['Comparison', 'Databases', 'Architecture', 'Data Engineering']}
>

When starting a project, the choice between SQL (PostgreSQL) and NoSQL (MongoDB) determines how you will mathematically model your entire data domain.

## 1. PostgreSQL (The Relational Titan)
- **Architecture**: Relational Database Management System (RDBMS). Data is stored in strict Tables with rows and columns.
- **Philosophy**: **ACID Compliance** and Data Integrity. You must define a mathematical Schema upfront. If a column is an Integer, the database will aggressively reject a String.
- **Superpower**: JOINs. You can write incredibly complex mathematical queries combining data from 10 different normalized tables with perfect consistency.
- **Limitation**: Harder to scale Horizontally across multiple servers (requires complex sharding).

## 2. MongoDB (The Document Pioneer)
- **Architecture**: NoSQL Document Store. Data is stored in collections of JSON-like BSON documents.
- **Philosophy**: Flexibility and Velocity. There is zero enforced schema. Document #1 can have 3 fields, and Document #2 in the exact same collection can have 50 completely different fields. You embed data (e.g., placing the array of comments directly *inside* the blog post document) to avoid JOINs.
- **Superpower**: **Horizontal Scaling**. MongoDB was mathematically built from the ground up for massive, multi-server distributed sharding and replica sets.
- **Limitation**: Lacks complex mathematical JOINs; if your data is highly relational (like a banking ledger), MongoDB will force you into painful application-level logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/NumPy vs Python lists/index.mdx': `---
title: NumPy vs Python Lists
description: "A mathematical and architectural comparison detailing why native Python Lists are incredibly slow for data science, and how NumPy bypasses Python's interpreter to achieve native C-level performance."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="NumPy vs Python Lists"
  subtitle="Dynamic Pointers vs Contiguous Memory"
  tags={['Comparison', 'Python', 'Data Science', 'Performance']}
>

In Python, a standard List is mathematically versatile but computationally disastrous for heavy Machine Learning math. NumPy is the foundational library that mathematically fixes Python.

## 1. Python Lists (The Pointer Array)
- **Architecture**: A Python List does *not* store raw numbers. It stores an array of memory **pointers**. Each pointer points to a completely separate, massive "PyObject" scattered randomly in RAM, containing the value, type, and reference count.
- **Overhead**: Because Python is dynamically typed, iterating over a list forces the CPU to mathematically check the type of every single element, resolve the pointer, fetch the object from RAM, and then perform the math.
- **Cache Misses**: This scattered memory guarantees L1 Cache Misses, slowing down iteration by 10x to 100x.

## 2. NumPy Arrays (The C-Extension)
- **Architecture**: NumPy arrays are mathematically backed by raw C. They store a single, massively contiguous block of raw binary memory (e.g., pure 64-bit integers), exactly like a C array.
- **Vectorization**: Because the type is known and the memory is contiguous, NumPy mathematically bypasses the slow Python interpreter entirely. It pushes the array down into compiled C code, allowing the CPU to use **SIMD** (Single Instruction, Multiple Data) to multiply 8 numbers in a single clock cycle.
- **The Verdict**: For arrays larger than 10,000 elements, NumPy is mathematically guaranteed to be exponentially faster and consume vastly less RAM than native Python Lists.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/OOP vs functional programming/index.mdx': `---
title: OOP vs Functional Programming
description: "A philosophical and architectural comparison of the two dominant programming paradigms: mutating state via Objects (OOP) versus mathematically pure, stateless transformations (FP)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="OOP vs Functional Programming"
  subtitle="Mutable State vs Pure Math"
  tags={['Comparison', 'Architecture', 'Paradigms', 'Design']}
>

The way you structure a massive codebase is determined by your paradigm. The industry is currently experiencing a massive shift from pure OOP toward Functional architectures.

## 1. Object-Oriented Programming (OOP)
- **Core Concept**: **State and Behavior are bundled together**. A TICK1CarTICK1 object holds data (TICK1speed=50TICK1) and methods that mathematically mutate that data (TICK1accelerate()TICK1).
- **Pillars**: Encapsulation, Inheritance, Polymorphism.
- **The Problem**: Shared Mutable State. If Thread A and Thread B both call TICK1car.accelerate()TICK1 at the same time, the math breaks. Furthermore, deep inheritance trees (e.g., TICK1DogTICK1 inherits from TICK1MammalTICK1 inherits from TICK1AnimalTICK1) become incredibly brittle and mathematically complex to refactor. (Famous quote: "You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.")

## 2. Functional Programming (FP)
- **Core Concept**: **State and Behavior are strictly separated**. Data is mathematically **Immutable**. You do not mutate the TICK1CarTICK1. You pass the TICK1CarTICK1 data into an TICK1accelerate()TICK1 function, which mathematically returns a *brand new, copied Car* with the new speed.
- **Pillars**: Pure Functions (no side effects), First-Class Functions (passing functions as variables), High-Order Functions (TICK1mapTICK1, TICK1filterTICK1, TICK1reduceTICK1).
- **The Benefit**: Mathematical Predictability. Because data never changes, multi-threading is trivially safe (zero race conditions). Modern UI frameworks (React, Jetpack Compose) are mathematically modeled entirely on Functional Programming paradigms (State flows down, Events flow up).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Pandas vs NumPy/index.mdx': `---
title: Pandas vs NumPy
description: "A comparison of Python's two foundational Data Science libraries, contrasting NumPy's raw mathematical N-dimensional arrays with Pandas' high-level, human-readable DataFrame architecture."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Pandas vs NumPy"
  subtitle="Raw Math vs Data Manipulation"
  tags={['Comparison', 'Python', 'Data Science', 'Data Engineering']}
>

While both are built on C extensions for maximum speed, they serve mathematically distinct purposes in a Data Scientist's workflow. (In fact, Pandas is physically built *on top* of NumPy).

## 1. NumPy (Numerical Python)
- **Data Structure**: The **ndarray**. A hyper-efficient, multidimensional array (matrix) that mathematically holds exactly *one* data type (e.g., all 64-bit floats).
- **Use Case**: Raw Mathematics. Matrix multiplication, linear algebra, Fourier transforms, and preparing tensors for Neural Networks.
- **Interface**: Extremely low-level. You index by integer (e.g., TICK1matrix[5, 2]TICK1).

## 2. Pandas
- **Data Structure**: The **DataFrame**. A 2D table designed to mimic a SQL database or an Excel spreadsheet. 
- **Use Case**: Data Cleaning and Exploration (ETL). 
- **Superpower**: Heterogeneous Data. Column A can be Integers, Column B can be Strings, and Column C can be Dates. Pandas provides massive, SQL-like mathematical operations (GROUP BY, JOIN, Pivot Tables, filling missing TICK1NaNTICK1 values) that would take hundreds of lines of code to implement manually in NumPy.
- **The Workflow**: A Data Scientist uses Pandas to load the messy CSV, clean the strings, handle missing dates, and filter the rows. Once the data is perfect, they extract the raw values into a NumPy array and feed it into a Machine Learning model.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/PostgreSQL vs MySQL/index.mdx': `---
title: PostgreSQL vs MySQL
description: "A comparison of the world's most popular open-source relational databases, contrasting MySQL's historical speed and simplicity with PostgreSQL's massive, standard-compliant, enterprise-grade mathematical feature set."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="PostgreSQL vs MySQL"
  subtitle="The Open Source Database War"
  tags={['Comparison', 'Databases', 'Architecture', 'SQL']}
>

For 20 years, every web developer faced the exact same choice: MySQL or PostgreSQL. While both are ACID-compliant Relational Databases, the modern industry has heavily shifted toward Postgres.

## 1. MySQL (The LAMP Stack Pioneer)
- **History**: Rose to dominance in the 2000s as the "M" in the LAMP stack (Linux, Apache, MySQL, PHP). Backed WordPress, Facebook, and Twitter. (Now owned by Oracle).
- **Philosophy**: Speed and Simplicity over strict standards. Historically, if you inserted a string into an integer column, MySQL would silently mathematically convert it or truncate it instead of throwing an error (though strict mode fixes this today).
- **Pros**: Blisteringly fast for simple read-heavy web applications. Extremely easy to set up.

## 2. PostgreSQL (The World's Most Advanced DB)
- **History**: An object-relational database developed with a militant devotion to mathematical correctness and the SQL standard.
- **Philosophy**: Data Integrity over everything. It will aggressively reject any mathematically invalid data.
- **Superpowers**: 
  - **Native JSONB**: Postgres can index and query massive JSON documents natively, almost entirely eliminating the need for MongoDB in hybrid apps.
  - **PostGIS**: Mathematical extensions that make Postgres the undisputed king of Geospatial routing and mapping data.
  - **Advanced Math**: Window functions, Common Table Expressions (CTEs), and partial indexes were natively supported in Postgres years before MySQL caught up.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Process vs thread/index.mdx': `---
title: Process vs Thread
description: "A fundamental Operating System architecture comparison detailing the mathematical memory isolation of heavy Processes versus the shared-memory speed and synchronization danger of lightweight Threads."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Process vs Thread"
  subtitle="Operating System Concurrency"
  tags={['Comparison', 'Architecture', 'Systems', 'Performance']}
>

When a computer runs multiple tasks simultaneously, it mathematically divides the work using two distinct operating system abstractions: Processes and Threads.

## 1. Process
- **Definition**: An independent, heavy-weight program executing in RAM (e.g., opening a new instance of Google Chrome).
- **Memory**: **Isolated**. The OS assigns every Process a completely unique, mathematical Virtual Memory space. Process A mathematically cannot read Process B's memory.
- **Pros**: High Security and Stability. If Process A crashes, Process B is completely unaffected. (This is why Chrome runs every tab in a separate process).
- **Cons**: High Overhead. Booting a Process takes significant time and RAM. Inter-Process Communication (IPC) is mathematically slow because data must be serialized and passed through the OS kernel.

## 2. Thread
- **Definition**: A lightweight unit of execution *inside* a Process. A single Process can contain 100 Threads.
- **Memory**: **Shared**. All 100 Threads mathematically share the exact same Heap memory space, global variables, and open files.
- **Pros**: Blisteringly fast to create. Communication between threads is instant, because they can physically read the exact same RAM addresses.
- **Cons**: High Danger. If Thread 1 is writing to a variable, and Thread 2 tries to read it at the exact same mathematical picosecond, you get a **Race Condition**, crashing the entire Process. This requires complex mathematical Mutexes and Locks to synchronize.

</ConceptTemplate>
`
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
