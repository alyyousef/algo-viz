import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/SQL vs NewSQL/index.mdx': `---
title: SQL vs NewSQL
description: "An architectural overview of Database evolution, explaining how NewSQL systems like Google Spanner mathematically combine the strict ACID guarantees of traditional SQL with the massive horizontal scalability of NoSQL."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SQL vs NewSQL"
  subtitle="The Holy Grail of Databases"
  tags={['Comparison', 'Databases', 'Architecture', 'Data Engineering']}
>

For a decade, the database world was forced into a strict mathematical tradeoff (known as the CAP Theorem). You could either have perfect consistency (SQL) or massive horizontal scale (NoSQL). NewSQL is the attempt to mathematically achieve both.

## 1. Traditional SQL (PostgreSQL, MySQL)
- **Architecture**: Single-Master. All write operations must mathematically funnel through a single primary server to guarantee ACID consistency. 
- **The Problem**: If your database reaches 50 Terabytes, you cannot just add another server to share the write load. You must physically buy a single, unimaginably expensive supercomputer (Vertical Scaling), or build incredibly brittle application-level sharding logic.

## 2. NewSQL (Google Spanner, CockroachDB)
- **Architecture**: Distributed Relational. NewSQL databases look exactly like Postgres to the developer (you write standard SQL with JOINs and Transactions), but underneath, the data is automatically split and replicated across hundreds of servers globally.
- **The Breakthrough**: True ACID consistency across multiple servers requires mathematical guarantees about Time. Google Spanner mathematically solved this by physically installing GPS receivers and Atomic Clocks (TrueTime) in every single data center on earth, guaranteeing that Server A and Server B mathematically agree on the exact microsecond a transaction occurred.
- **The Verdict**: NewSQL is the holy grail. It provides the infinite horizontal scale of MongoDB while maintaining the mathematically perfect relational integrity of PostgreSQL.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Stack vs heap/index.mdx': `---
title: Stack vs Heap
description: "A fundamental computer architecture comparison detailing the mathematical speed and strict lifetime of Stack memory versus the flexible, dangerous, and manual nature of Heap memory."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Stack vs Heap"
  subtitle="RAM Architecture and Memory Management"
  tags={['Comparison', 'Architecture', 'Memory', 'Fundamentals']}
>

When a program runs, the Operating System assigns it a mathematical block of RAM. The program divides this memory into two distinct architectural regions: the Stack and the Heap.

## 1. The Stack
- **Architecture**: A strict LIFO (Last-In-First-Out) data structure managed directly by the CPU. 
- **Mechanism**: When a function is called, the CPU mathematically pushes a "Stack Frame" containing all local variables (like TICK1int x = 5TICK1). When the function finishes, the CPU instantly mathematically pops the frame off, destroying the variables.
- **Pros**: Blisteringly fast. Memory allocation is a single CPU instruction (moving the stack pointer). Zero fragmentation.
- **Cons**: Extremely small (usually only a few Megabytes). You must know the exact mathematical size of your data at compile time.

## 2. The Heap
- **Architecture**: A massive, unstructured pool of RAM (measured in Gigabytes).
- **Mechanism**: You use the Heap when you don't know how much data you need at compile time (e.g., downloading a JSON file from the internet). The OS mathematically searches the Heap for a large enough block, marks it as "in use," and returns a Pointer to it.
- **Pros**: Massive size and extreme flexibility. Data mathematically survives until you explicitly delete it.
- **Cons**: Slow allocation. If you forget to mathematically free the memory (in C/C++), you create a **Memory Leak**. If you free it twice, you create a security vulnerability. High-level languages (Java, Python) solve this by using an automated Garbage Collector, which occasionally freezes your program to clean the Heap.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Static vs dynamic typing/index.mdx': `---
title: Static vs Dynamic Typing
description: "An architectural analysis of programming languages, contrasting the mathematical compile-time safety of Static typing (Java, Rust) with the rapid runtime flexibility of Dynamic typing (Python, JavaScript)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Static vs Dynamic Typing"
  subtitle="The Compiler vs The Interpreter"
  tags={['Comparison', 'Languages', 'Architecture', 'Computer Science']}
>

The choice of typing discipline dictates the mathematical architecture of your entire codebase, trading developer speed against mathematical guarantees of correctness.

## 1. Static Typing (Java, C++, Rust, TypeScript)
- **Mechanism**: The types of all variables must be mathematically known and fixed at **Compile Time**. If a function expects an TICK1IntegerTICK1, the compiler will absolutely refuse to build the program if you attempt to pass a TICK1StringTICK1.
- **Pros**: Massive reduction in runtime crashes. Your IDE can provide perfect autocomplete because it mathematically knows exactly what methods exist on an object. Refactoring a million-line codebase is mathematically safe.
- **Cons**: High verbosity. You must spend significant time writing type definitions, interfaces, and generics before the code actually does anything.

## 2. Dynamic Typing (Python, JavaScript, Ruby)
- **Mechanism**: Types are checked exclusively at **Runtime**. A variable can hold an TICK1IntegerTICK1 on line 5, and then immediately be reassigned to a TICK1StringTICK1 on line 6.
- **Pros**: Blisteringly fast prototyping. You can write a web scraper in 10 lines of Python that would take 100 lines in Java.
- **Cons**: The "Undefined is not a function" mathematical nightmare. If you pass a String to a math function, the program compiles perfectly, deploys perfectly, and then violently crashes in production when a user actually hits that specific line of code. (This exact flaw is why the industry invented TypeScript).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/TCP vs UDP/index.mdx': `---
title: TCP vs UDP
description: "A mathematical breakdown of the Transport Layer, comparing the guaranteed, ordered delivery of TCP with the blisteringly fast, unreliable spray of UDP packets."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="TCP vs UDP"
  subtitle="The Backbone of the Internet"
  tags={['Comparison', 'Networking', 'Architecture', 'Systems']}
>

When data is sent across the internet, the IP (Internet Protocol) routes it to the correct computer. The Transport Layer (TCP or UDP) dictates exactly *how* that data is mathematically delivered to the application.

## 1. TCP (Transmission Control Protocol)
- **Architecture**: **Connection-Oriented and Reliable**. 
- **Mechanism**: It performs a mathematical "3-Way Handshake" (SYN, SYN-ACK, ACK) to establish a connection. It numbers every single packet. If a router drops packet #4, the receiving computer mathematically detects the gap and demands a retransmission. It guarantees that data arrives perfectly in order.
- **Use Case**: HTTP/HTTPS, SSH, Email, File Transfers. If you are downloading a bank statement, losing a single byte mathematically corrupts the entire PDF. 
- **Tradeoff**: The mathematical overhead of handshakes, acknowledgments, and retransmissions makes TCP relatively slow.

## 2. UDP (User Datagram Protocol)
- **Architecture**: **Connectionless and Unreliable**. 
- **Mechanism**: It literally just blasts packets into the void. There is no handshake. There is no sequence numbering. If a packet is dropped, UDP mathematically does not care and will never re-send it.
- **Use Case**: Live Video Streaming (Twitch, Zoom), Multiplayer Gaming (Call of Duty). If you drop a frame of video in a live call, you don't want the network to pause the entire call to go fetch the old frame; you want to immediately see the *next* frame.
- **Tradeoff**: Zero mathematical guarantees, but blisteringly low latency.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Terraform vs Ansible/index.mdx': `---
title: Terraform vs Ansible
description: "A clarification of modern Infrastructure as Code (IaC), detailing how Terraform mathematically provisions the raw cloud hardware, while Ansible configures the software running inside those servers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Terraform vs Ansible"
  subtitle="Provisioning vs Configuration"
  tags={['Comparison', 'DevOps', 'Infrastructure', 'Cloud']}
>

The modern DevOps lifecycle mathematically requires both tools, but beginners often confuse them because they appear to do similar things. In reality, they handle two completely separate layers of the stack.

## 1. Terraform (Infrastructure Provisioning)
- **Goal**: Create the raw hardware architecture.
- **Mechanism**: It is mathematically **Declarative**. You define the desired end-state in TICK1.tfTICK1 files (e.g., *"I need an AWS VPC, 3 Subnets, and an EC2 instance"*). Terraform calculates the mathematical diff (the Execution Plan) against reality, and makes API calls to AWS to physically create those resources.
- **State**: Terraform is State-Aware. It maintains a massive JSON TICK1terraform.tfstateTICK1 file. If you delete the EC2 instance from your code, Terraform knows it exists in reality and will mathematically destroy it to match the code.

## 2. Ansible (Configuration Management)
- **Goal**: Install and configure software on the servers Terraform just created.
- **Mechanism**: It is heavily **Procedural** (though it has declarative elements). Ansible SSH's directly into the running EC2 instance and executes commands: *"Update apt-get, install Nginx, copy this config file, and restart the service."*
- **State**: Ansible is mathematically Stateless. It does not maintain a master file of reality. It simply executes the playbook from top to bottom.
- **The Workflow**: Terraform provisions the empty EC2 instance. Terraform then hands the IP address to Ansible. Ansible SSH's in and installs the web server.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Terraform vs CloudFormation/index.mdx': `---
title: Terraform vs CloudFormation
description: "An architectural comparison of Cloud provisioning tools, contrasting AWS's native, JSON/YAML-based CloudFormation with HashiCorp's cloud-agnostic, HCL-driven Terraform."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Terraform vs CloudFormation"
  subtitle="The Battle for Infrastructure as Code"
  tags={['Comparison', 'DevOps', 'AWS', 'Cloud']}
>

If your company uses AWS, you mathematically must choose one of these two declarative Infrastructure as Code (IaC) tools to manage your cloud resources.

## 1. AWS CloudFormation
- **Architecture**: Native, proprietary AWS service.
- **Mechanism**: You write massive templates in JSON or YAML. You upload them directly to the AWS API, and AWS's internal engine handles the mathematical provisioning.
- **Pros**: It is deeply integrated into AWS. There is zero state file for you to manage (AWS manages the state internally). It natively supports automatic rollback if a deployment mathematically fails halfway through.
- **Cons**: It is strictly locked to AWS. You cannot use CloudFormation to provision a Datadog dashboard or a Cloudflare DNS record. Writing raw YAML for complex logic is mathematically painful.

## 2. Terraform (HashiCorp)
- **Architecture**: Open-source, cloud-agnostic CLI tool.
- **Mechanism**: You write code using HCL (HashiCorp Configuration Language), which supports loops, variables, and modules far better than YAML. Terraform mathematically calculates a "Plan" locally, and then makes API calls.
- **Pros**: **Providers**. Terraform can mathematically manage AWS, GCP, Azure, GitHub repositories, and PagerDuty schedules all in the exact same codebase. It is the undisputed industry standard.
- **Cons**: You must manually manage the TICK1terraform.tfstateTICK1 file (usually storing it in an S3 bucket with a DynamoDB lock), which can become corrupted if multiple engineers try to deploy simultaneously without proper locking.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Vector DB vs traditional search/index.mdx': `---
title: Vector DB vs Traditional Search
description: "A mathematical paradigm shift in search architecture, contrasting the keyword-matching inverted indices of Elasticsearch with the semantic, multi-dimensional cosine similarity of Vector Databases."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Vector DB vs Traditional Search"
  subtitle="Keyword Matching vs Semantic Meaning"
  tags={['Comparison', 'Databases', 'Machine Learning', 'AI']}
>

The explosion of Large Language Models (LLMs) fundamentally changed how computers search for information, moving from rigid lexical matching to mathematical spatial reasoning.

## 1. Traditional Search (Elasticsearch)
- **Architecture**: **Lexical (Keyword) Search**. It uses a mathematical data structure called an Inverted Index (similar to the index at the back of a textbook).
- **Mechanism**: If you search for "fast car", it mathematically scans for documents containing the exact strings "fast" or "car" (using algorithms like TF-IDF or BM25). 
- **The Problem**: If a document says "rapid automobile," Traditional Search will return zero results, because it mathematically does not understand that "fast" and "rapid" mean the exact same thing.

## 2. Vector Databases (Pinecone, Milvus)
- **Architecture**: **Semantic Search**. It uses Machine Learning Embedding Models (like OpenAI's text-embedding-ada-002).
- **Mechanism**: The model mathematically converts every sentence into a massive array of floats (e.g., a 1,536-dimensional Vector). These vectors map the *meaning* of the text into high-dimensional geometric space. 
- **The Search**: "Fast car" and "rapid automobile" will be mapped to almost the exact same physical mathematical coordinate in that 1,536-dimensional space. The database mathematically calculates the **Cosine Similarity** (the angle between the vectors) and returns the closest points. It searches by *meaning*, not by keywords.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Akra-Bazzi method/index.mdx': `---
title: Akra-Bazzi Method
description: "A generalized mathematical theorem for analyzing the asymptotic complexity of divide-and-conquer algorithms, acting as a massive extension to the Master Theorem capable of handling uneven subproblem sizes."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Akra-Bazzi Method"
  subtitle="The Generalized Master Theorem"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Divide and Conquer']}
>

The Master Theorem is the standard tool for solving divide-and-conquer recurrences (like Merge Sort). However, it mathematically fails if the recursive calls split the data unevenly (e.g., $T(n) = T(n/3) + T(2n/3) + O(n)$). The Akra-Bazzi method mathematically solves this.

## 1. The Mathematical Problem
Standard divide-and-conquer algorithms split the array perfectly in half: 
$T(n) = 2T(n/2) + O(n)$. 
But what if an algorithm splits the array into a 1/4 chunk and a 3/4 chunk? The Master Theorem instantly breaks down because it mathematically requires all subproblems to be the exact same size.

## 2. The Akra-Bazzi Theorem
Given a recurrence of the form:
$T(x) = g(x) + \\sum_{i=1}^{k} a_i T(b_i x)$

Where:
- $a_i$ is the number of subproblems (must be > 0).
- $b_i$ is the scaling factor (e.g., 1/3, 2/3).
- $g(x)$ is the work done outside the recursion (e.g., $O(n)$ for merging).

**The Solution:**
First, mathematically find the unique real number $p$ such that:
$\\sum_{i=1}^{k} a_i b_i^p = 1$

Then, the asymptotic complexity is strictly bounded by the integral:
$T(x) = \\Theta\\left( x^p \\left( 1 + \\int_1^x \\frac{g(u)}{u^{p+1}} du \\right) \\right)$

## 3. Why It Matters
While the integral calculus makes it significantly harder to evaluate by hand than the Master Theorem, Akra-Bazzi is mathematically profound. It proves that even if an algorithm recursively splits data into chaotic, uneven fractions, the overall time complexity is still entirely predictable and bounded by polynomial integration.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Amortised analysis/index.mdx': `---
title: Amortised Analysis
description: "A mathematical framework for evaluating the time complexity of a sequence of operations, proving that an occasional incredibly slow operation is mathematically negligible if preceded by many fast ones."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Amortised Analysis"
  subtitle="The Economics of Algorithms"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Data Structures']}
>

Worst-case analysis (Big O) can sometimes be mathematically pessimistic and misleading. Amortized Analysis provides a much more realistic mathematical guarantee by averaging the cost of operations over a long sequence.

## 1. The Dynamic Array Problem
Consider a Dynamic Array (Python List, C++ TICK1std::vectorTICK1). When you append an item, it usually takes $O(1)$ time. 
However, when the array mathematically fills up, it must allocate a brand new array double the size, and copy every single element over. This single operation takes **$O(N)$** time. 
If we only use Worst-Case analysis, we must say appending to a vector is $O(N)$, which implies that inserting $N$ items takes $O(N^2)$ time. This is mathematically false.

## 2. The Mathematical Proof (Aggregate Method)
If we start with an array of size 1 and insert $N$ items:
- Most insertions cost 1 operation.
- The 2nd, 4th, 8th, 16th... insertions trigger a resize.
- The total cost of resizing over $N$ insertions is $1 + 2 + 4 + 8 + ... + N$.
- Mathematically, a geometric series $1 + 2 + 4 + ... + N$ evaluates strictly to $2N - 1$.
- Therefore, the total time to insert $N$ elements is $N$ (for the normal insertions) $+ 2N$ (for the resizing) $= 3N$.
- $3N$ operations divided by $N$ insertions $= 3$. 
- The **Amortized Cost** per insertion is exactly **$O(1)$**.

## 3. Methods of Analysis
Computer scientists use three distinct mathematical techniques to prove amortized bounds:
1. **Aggregate Analysis**: Summing the total cost of $N$ operations and dividing by $N$ (shown above).
2. **The Accounting (Banker's) Method**: We mathematically "overcharge" the fast $O(1)$ operations, storing the extra time as "credits." When the expensive $O(N)$ resize happens, we pay for it using the banked credits, proving the system never goes into debt.
3. **The Potential (Physicist's) Method**: We define a mathematical potential energy function $\\Phi$ for the data structure. Fast operations increase the potential energy, and expensive operations release that energy to pay for themselves.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Approximation algorithms/index.mdx': `---
title: Approximation Algorithms
description: "A mathematical strategy for dealing with NP-Hard problems, sacrificing the guarantee of finding the absolute perfect solution in exchange for guaranteeing a 'good enough' solution in polynomial time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Approximation Algorithms"
  subtitle="Solving the Unsolvable"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'NP-Hard']}
>

When a computer scientist mathematically proves a problem is **NP-Hard** (like the Traveling Salesperson Problem), it means finding the absolute perfect answer will literally take longer than the lifespan of the universe for large datasets. Approximation Algorithms are the mathematical compromise.

## 1. The Core Philosophy
Instead of demanding the optimal solution (which takes $O(2^n)$ exponential time), an Approximation Algorithm mathematically guarantees two things:
1. It will run in fast **Polynomial Time** ($O(n^2)$, $O(n^3)$).
2. The answer it provides is mathematically proven to be within a specific bound (e.g., "This answer is guaranteed to be no more than 20% worse than the perfect answer").

## 2. The Approximation Ratio ($\\rho$)
The mathematical quality of an approximation is defined by its ratio $\\rho$. 
If $OPT$ is the perfect, optimal cost, and $ALG$ is the cost our fast algorithm finds, then a $\\rho$-approximation mathematically guarantees that:
$ALG \\le \\rho \\cdot OPT$ (for minimization problems).

## 3. Example: The Vertex Cover Problem
**The Problem**: Given a massive network graph, find the absolutely smallest set of nodes such that every single edge is connected to at least one of those nodes. (This is mathematically NP-Hard).
**The 2-Approximation Algorithm**:
1. Pick any random edge. 
2. Add *both* of its connecting nodes to your answer set. 
3. Delete all edges connected to those two nodes. 
4. Repeat until no edges remain.

**The Proof**: This algorithm is blisteringly fast ($O(V+E)$). Is the answer perfect? No. However, mathematically, because *every* valid vertex cover *must* select at least one node from every edge we picked, and we selected exactly two, our answer is mathematically guaranteed to be **at most exactly twice as large** as the perfect answer ($\\rho = 2$). 

For engineering applications like building cell towers, a fast network that costs 2x the mathematical minimum is vastly superior to waiting 10 billion years for the perfect layout.

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
