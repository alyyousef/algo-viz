import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Bagging vs boosting/index.mdx': `---
title: Bagging vs Boosting
description: "A detailed comparison between the two foundational Ensemble Learning techniques in Machine Learning, contrasting parallel model generation (Bagging) against sequential model correction (Boosting)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bagging vs Boosting"
  subtitle="Ensemble Learning Paradigms"
  tags={['Comparison', 'Machine Learning', 'Data Science', 'Algorithms']}
>

In Machine Learning, a single Decision Tree is often weak and prone to overfitting. **Ensemble Learning** combines hundreds of weak models to create one massive, highly accurate meta-model. The two primary methods to do this are Bagging and Boosting.

## 1. Bagging (Bootstrap Aggregating)
- **Philosophy**: "Wisdom of the Crowd." Train many independent models in parallel and average their results to reduce **Variance** (overfitting).
- **Mechanism**: You create 100 different datasets by mathematically sampling the original dataset *with replacement*. You train 100 completely independent Decision Trees simultaneously (Parallel). When making a prediction, all 100 trees vote, and the majority wins.
- **Iconic Algorithm**: Random Forest.
- **Pros/Cons**: Extremely fast to train (highly parallelizable). Excellent at preventing overfitting on noisy data.

## 2. Boosting
- **Philosophy**: "Learn from your Mistakes." Train models sequentially, where each new model is specifically designed to fix the mathematical errors of the previous model, reducing **Bias** (underfitting).
- **Mechanism**: Train Tree 1. Test it. Identify all the data points Tree 1 got wrong. Mathematically increase the "weight" of those wrong points. Train Tree 2 *specifically* on the re-weighted dataset so it focuses on the hard problems. Repeat sequentially 100 times.
- **Iconic Algorithm**: XGBoost, AdaBoost, Gradient Boosting.
- **Pros/Cons**: Mathematically achieves the absolute highest accuracy on tabular data (dominates Kaggle competitions). Slower to train (cannot be parallelized easily), and more prone to overfitting if not tuned perfectly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/BFS vs DFS/index.mdx': `---
title: BFS vs DFS
description: "A fundamental algorithmic comparison between Breadth-First Search (queue-based, shortest path) and Depth-First Search (stack-based, exhaustive exploration) in graph and tree traversal."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="BFS vs DFS"
  subtitle="Graph Traversal Fundamentals"
  tags={['Comparison', 'Algorithms', 'Graph Theory', 'Data Structures']}
>

Breadth-First Search (BFS) and Depth-First Search (DFS) are the two foundational mathematical algorithms for visiting every node in a Graph or Tree. They both run in **O(V + E)** time, but their traversal philosophy and memory usage are completely opposed.

## 1. Breadth-First Search (BFS)
- **Philosophy**: Explore all neighbors of the current node before moving deeper. (Like a ripple in a pond expanding outwards).
- **Data Structure**: Uses a **Queue** (FIFO).
- **Primary Use Case**: Mathematically guaranteed to find the **Shortest Path** on an unweighted graph. Used in GPS routing, peer-to-peer networks, and finding the closest friend in a social network.
- **Memory**: O(W) where W is the maximum width of the tree. (Can be mathematically disastrous for extremely wide trees, consuming massive amounts of RAM).

## 2. Depth-First Search (DFS)
- **Philosophy**: Dive as deep as possible down a single path until you hit a dead end, then mathematically backtrack. (Like solving a maze by keeping your hand on the left wall).
- **Data Structure**: Uses a **Stack** (LIFO), usually implemented implicitly via Recursion.
- **Primary Use Case**: Exhaustive puzzle solving (Sudoku backtracking), Topological Sorting, detecting Cycles, and counting connected components.
- **Memory**: O(H) where H is the maximum height of the tree. (Highly memory efficient for wide trees, but mathematically susceptible to Stack Overflow errors on extremely deep graphs).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/C vs C++/index.mdx': `---
title: C vs C++
description: "A historical and architectural comparison between C, the minimalist procedural foundation of modern computing, and C++, the massive, multi-paradigm superset introducing Object-Oriented Programming and templates."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="C vs C++"
  subtitle="Procedural vs Multi-Paradigm"
  tags={['Comparison', 'Languages', 'C', 'C++', 'Systems']}
>

C (1972) and C++ (1985) are both brutally fast, low-level systems programming languages compiled directly to machine code with zero garbage collection. However, their design philosophies are fundamentally opposed.

## 1. C: The Portable Assembly
- **Philosophy**: "Trust the programmer." C is a minimalist, purely **Procedural** language. It provides functions, structs, and raw memory pointers. It intentionally lacks modern abstractions to ensure that every single line of code maps directly and transparently to CPU instructions.
- **Use Case**: Linux Kernel, Embedded Systems (microwaves, pacemakers), IoT devices, and foundational interpreters (CPython is written in C). It is mathematically impossible to hide performance costs in C.

## 2. C++: The Multi-Paradigm Behemoth
- **Philosophy**: "Zero-overhead abstractions." C++ was originally built as "C with Classes" to introduce **Object-Oriented Programming**. It has since evolved into a massive, highly complex multi-paradigm language featuring Templates (generic programming), Exceptions, and the Standard Template Library (STL).
- **Use Case**: AAA Video Game Engines (Unreal Engine), High-Frequency Trading, Web Browsers (V8 Engine), and massive desktop applications.
- **The Tradeoff**: C++ allows engineers to write highly abstract, reusable code that compiles down to the exact same mathematically optimized machine code as C. However, its massive feature set makes the compiler incredibly slow, and the language notoriously difficult to master.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Compiler vs interpreter/index.mdx': `---
title: Compiler vs Interpreter
description: "A foundational computer science comparison detailing the mathematical tradeoffs between Ahead-of-Time compilation to raw machine code (C/Rust) and Just-in-Time execution of source code (Python/Ruby)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Compiler vs Interpreter"
  subtitle="Translating Source Code to Silicon"
  tags={['Comparison', 'Fundamentals', 'Architecture', 'Execution']}
>

CPUs only understand raw binary machine code (1s and 0s). High-level source code must be translated. The two primary mechanisms for this translation dictate the performance, portability, and debugging experience of the language.

## 1. The Compiler (Ahead-of-Time)
- **Mechanism**: A Compiler takes the entire codebase and mathematically translates it into a standalone binary executable (.exe, .elf) *before* the user ever runs it.
- **Examples**: C, C++, Rust, Go.
- **Pros**: Blisteringly fast execution. The compiler spends minutes running intense mathematical optimization algorithms (loop unrolling, dead code elimination) to generate the absolute perfect machine code.
- **Cons**: The output binary is tied to a specific CPU architecture (x86 vs ARM) and OS (Windows vs Linux). You must recompile the code for every target platform.

## 2. The Interpreter (Just-in-Time)
- **Mechanism**: An Interpreter reads the source code line-by-line, translates it into machine code, and executes it immediately at *runtime*.
- **Examples**: Python, Ruby, JavaScript, PHP.
- **Pros**: Total portability. The exact same Python script will run on Windows, Mac, and a Raspberry Pi instantly, as long as the machine has the Python Interpreter installed. Instant startup for developers (no waiting for build times).
- **Cons**: Mathematically slower. The CPU is doing two jobs simultaneously: translating the code *and* executing it. It cannot perform heavy Ahead-of-Time optimizations because it doesn't see the whole program at once.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Concurrency vs parallelism/index.mdx': `---
title: Concurrency vs Parallelism
description: "A critical architectural distinction between managing multiple tasks seemingly at the same time through clever context-switching (Concurrency) versus physically executing multiple tasks at the exact same mathematical nanosecond (Parallelism)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Concurrency vs Parallelism"
  subtitle="Managing vs Executing"
  tags={['Comparison', 'Architecture', 'Systems', 'Performance']}
>

These two terms are often used interchangeably, but in computer science, they describe fundamentally different mathematical architectures for handling multiple tasks.

## 1. Concurrency: Dealing with lots of things at once
- **Mechanism**: Concurrency is a *structural* design. A single-core CPU can be highly concurrent. It starts Task A, pauses it, works on Task B for a millisecond, pauses it, and resumes Task A. It uses context-switching to give the *illusion* that tasks are happening simultaneously.
- **Use Case**: I/O-bound tasks. A web server handling 10,000 users. While waiting 50ms for a Database query to return for User 1, the CPU concurrently serves User 2. (e.g., Node.js, Go Goroutines, Python Asyncio).
- **Analogy**: One barista making an espresso, and while the shot is pulling, taking the order of the next customer.

## 2. Parallelism: Doing lots of things at once
- **Mechanism**: Parallelism is a *hardware* execution. It requires a multi-core CPU or a GPU. Task A is running on Core 1, and Task B is running on Core 2 at the exact same mathematical picosecond.
- **Use Case**: CPU-bound tasks. Rendering a 3D video, mining Bitcoin, or mathematically multiplying massive matrices for Machine Learning. (e.g., C++ multi-threading, CUDA).
- **Analogy**: Two completely separate baristas, each making one coffee simultaneously.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Docker vs Podman/index.mdx': `---
title: Docker vs Podman
description: "A technical comparison of containerization engines, contrasting Docker's centralized, root-privileged daemon architecture with Podman's daemonless, rootless, and Kubernetes-native approach."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Docker vs Podman"
  subtitle="The Containerization War"
  tags={['Comparison', 'DevOps', 'Containers', 'Security']}
>

Docker revolutionized software engineering by standardizing containers. However, as enterprise security requirements evolved, Red Hat developed Podman to solve fundamental architectural flaws in Docker's design.

## 1. Docker: The Daemon Architecture
- **Mechanism**: Docker relies on a massive background process called the **Docker Daemon** (TICK1dockerdTICK1). The CLI sends commands to the Daemon via a REST API, and the Daemon actually builds and runs the containers.
- **The Security Flaw**: Historically, the Docker Daemon required root (administrator) privileges to run. If a hacker broke out of a Docker container, they mathematically gained full root access to the host server. (Docker has since added rootless mode, but it was an afterthought).
- **Single Point of Failure**: If the Docker Daemon crashes, every single container on the server dies.

## 2. Podman: Daemonless and Rootless
- **Mechanism**: Podman interacts directly with the Linux kernel (via TICK1runcTICK1). There is no central background Daemon. 
- **Security First**: Podman is mathematically designed to be **Rootless** by default. A user can run a container without needing admin privileges. A breakout is significantly less catastrophic.
- **Kubernetes Native**: Podman can mathematically export its containers directly into Kubernetes TICK1.yamlTICK1 manifests, making the transition from local development to K8s production highly seamless. Podman is a drop-in replacement (TICK1alias docker=podmanTICK1).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Docker vs VM/index.mdx': `---
title: Docker vs Virtual Machines
description: "A foundational infrastructure comparison detailing how Docker containers share the host's OS kernel for extreme efficiency, while Virtual Machines mathematically emulate entire hardware stacks for absolute isolation."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Docker vs VM"
  subtitle="Containers vs Hardware Emulation"
  tags={['Comparison', 'DevOps', 'Infrastructure', 'Architecture']}
>

Both Virtual Machines (VMs) and Docker Containers allow engineers to run isolated applications on a single physical server. However, their mathematical resource overhead is vastly different.

## 1. Virtual Machines (Hardware Level)
- **Architecture**: A Hypervisor (like VMware or VirtualBox) mathematically emulates physical hardware (CPU, RAM, Hard Drive). Inside that fake hardware, you install a massive **Guest Operating System** (e.g., a full 20GB Windows installation).
- **Overhead**: Extreme. Running 5 VMs requires booting 5 completely separate Operating Systems in RAM, mathematically wasting gigabytes of memory just to run the background OS processes.
- **Security**: Absolute. Because the hardware is emulated, a virus inside VM 1 mathematically cannot touch VM 2.

## 2. Docker Containers (OS Level)
- **Architecture**: Docker mathematically relies on Linux Kernel features (Namespaces for isolation, cgroups for resource limits). There is no Hypervisor, and no Guest OS. All containers natively share the exact same Host Operating System Kernel.
- **Overhead**: Near zero. A container only contains the application code and its tiny dependencies (e.g., a 5MB Alpine Linux base). You can run 1,000 Docker containers on a server that could only physically handle 5 VMs. They boot in milliseconds instead of minutes.
- **Limitation**: Because they share the kernel, you cannot natively run a Windows Container on a Linux Server without a hidden VM layer.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Elasticsearch vs OpenSearch/index.mdx': `---
title: Elasticsearch vs OpenSearch
description: "A history of open-source politics and licensing, contrasting Elastic's move to proprietary licenses with Amazon's hard fork to maintain a purely open-source Lucene-based search engine."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Elasticsearch vs OpenSearch"
  subtitle="The Open Source Fork"
  tags={['Comparison', 'Databases', 'Search', 'Open Source']}
>

Elasticsearch (built on Apache Lucene) is the dominant mathematical engine for full-text search and log analytics. However, a massive licensing war resulted in a hard split in the ecosystem.

## 1. The Licensing War (Elasticsearch)
Historically, Elasticsearch was purely open-source (Apache 2.0). Amazon Web Services (AWS) hosted it and made billions of dollars without contributing much back to Elastic (the parent company).
In 2021, Elastic mathematically struck back by changing its license to the **SSPL** (Server Side Public License). This explicitly banned cloud providers like AWS from offering Elasticsearch as a managed service, forcing enterprise customers into Elastic's own cloud.

## 2. The Hard Fork (OpenSearch)
Because AWS was legally banned from using new versions of Elasticsearch, they took the last open-source version (7.10) and mathematically **forked** it, creating **OpenSearch**.
- **OpenSearch**: Purely open-source (Apache 2.0), driven by AWS and a coalition of enterprises. It is highly optimized for AWS integrations.
- **Elasticsearch**: Proprietary, but mathematically more feature-rich due to Elastic's focused engineering team (especially in Machine Learning and Vector Search).
For standard developers, their APIs are nearly identical, but massive corporations must now choose based on licensing legality and their cloud provider alignment.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Encryption vs hashing/index.mdx': `---
title: Encryption vs Hashing
description: "A critical cybersecurity distinction between two-way reversible mathematical obfuscation (Encryption) and one-way irreversible deterministic mathematical scrambling (Hashing)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Encryption vs Hashing"
  subtitle="Reversible vs Irreversible Math"
  tags={['Comparison', 'Security', 'Cryptography', 'Mathematics']}
>

Both Encryption and Hashing use intense mathematical algorithms to hide sensitive data, but their fundamental architectures serve completely different security purposes.

## 1. Encryption (Two-Way)
- **Goal**: To protect data *in transit* so it can be safely read later.
- **Mechanism**: Uses a mathematical Key. You lock the data with the Key (Ciphertext), send it, and the receiver uses the exact same Key (or a mathematical pair) to unlock and read the original data.
- **Use Case**: Sending credit card numbers over HTTPS. Storing private medical records in a database.
- **Mathematical Property**: Fully Reversible. If you have the key, you can always recover the exact original text. (e.g., AES-256, RSA).

## 2. Hashing (One-Way)
- **Goal**: To mathematically verify data integrity *without* ever knowing the original data.
- **Mechanism**: Runs the data through a chaotic mathematical function to generate a fixed-length string (e.g., 64 characters).
- **Use Case**: Storing User Passwords. A website never stores "password123". It stores the Hash. When you log in, it hashes your input and checks if the hashes match.
- **Mathematical Property**: Strictly Irreversible. It is mathematically impossible (barring quantum computing) to reverse-engineer the Hash back into the original text. A 1-megabyte file and a 1-gigabyte file both result in exactly 64 characters. (e.g., SHA-256, bcrypt).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/FastAPI vs Flask/index.mdx': `---
title: FastAPI vs Flask
description: "An architectural comparison of Python's most popular micro-frameworks, contrasting Flask's legacy WSGI simplicity with FastAPI's modern ASGI, Pydantic validation, and massive asynchronous performance."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="FastAPI vs Flask"
  subtitle="Python Web Frameworks"
  tags={['Comparison', 'Python', 'Backend', 'Web Development']}
>

For lightweight Python backends, Django is often too heavy. Developers traditionally chose Flask, but FastAPI has rapidly emerged as the mathematically superior modern alternative.

## 1. Flask (The Legacy Standard)
- **Architecture**: Built on WSGI (synchronous). When a request comes in, a worker thread blocks completely until the database returns the data.
- **Philosophy**: Extreme minimalism. Flask gives you routing and absolutely nothing else. You must plug in massive 3rd-party libraries (Marshmallow, SQLAlchemy) to build a production app.
- **Pros**: The most massive community, millions of tutorials, and rock-solid stability for simple applications.

## 2. FastAPI (The Modern Standard)
- **Architecture**: Built natively on ASGI (Asynchronous). Using Python's TICK1async/awaitTICK1, a single thread can concurrently handle thousands of requests while waiting for the database, matching the mathematical performance of Node.js and Go.
- **Data Validation**: Deeply integrated with **Pydantic**. It mathematically parses JSON requests, validates types natively via Python type hints, and auto-generates interactive Swagger UI documentation instantly.
- **The Verdict**: Unless maintaining a massive legacy codebase, FastAPI is mathematically superior in speed, developer experience, and bug reduction due to its strict type validation.

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
