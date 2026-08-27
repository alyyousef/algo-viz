import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/6. Algorithms/6.5 Bit Manipulation/Popcount/index.mdx': `---
title: Popcount (Population Count)
description: "The mathematical operation of counting the number of set bits (1s) in a binary integer, traditionally requiring O(bits) time but optimized to O(1) in modern CPUs using dedicated hardware instructions."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Popcount"
  subtitle="Counting Set Bits"
  tags={['Algorithms', 'Bit Manipulation', 'Hardware', 'Performance']}
>

**Popcount** (short for Population Count, also known as Hamming Weight) calculates exactly how many '1' bits exist in the binary representation of a number.
For example, the integer 29 is TICK111101TICK1 in binary. Its popcount is **4**.

## 1. Algorithmic Approaches
Historically, engineers had to calculate popcount using loops:
- **Naive Shift (O(B))**: Shift the number right B times (where B is bit width, e.g., 32), and check the lowest bit.
- **Brian Kernighan's Algorithm (O(K))**: Mathematically performs TICK1n = n & (n - 1)TICK1. This instantly turns OFF the right-most 1-bit. The algorithm loops exactly K times (where K is the number of set bits). Much faster for sparse integers.
- **SWAR (SIMD Within A Register) (O(1))**: A terrifyingly complex mathematical trick using bitwise shifts and magic hex constants (like TICK10x55555555TICK1) to add adjacent bits together in parallel, computing the popcount of a 32-bit integer in constant time without a single loop or branch.

## 2. Hardware-Level Implementation
Because Popcount is fundamentally critical in cryptography (computing Hamming Distance) and chess engines (calculating pieces on a bitboard), modern Intel and AMD CPUs implemented a dedicated hardware instruction: **POPCNT**.
In C++, calling TICK1__builtin_popcount(x)TICK1 bypasses software entirely, executing directly on the silicon in a single CPU clock cycle, achieving absolute mathematical optimality.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.5 Bit Manipulation/XOR tricks/index.mdx': `---
title: XOR Tricks
description: "A specialized domain of Bit Manipulation utilizing the unique mathematical properties of the Exclusive-OR (XOR) operator to solve complex logic puzzles, find missing numbers, and perform parity checks in O(1) space."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="XOR Tricks"
  subtitle="The Magic of Exclusive-OR"
  tags={['Algorithms', 'Bit Manipulation', 'Mathematics', 'Puzzles']}
>

The XOR operator (TICK1^TICK1) returns 1 if the bits are different, and 0 if they are the same.
However, its true power comes from three fundamental mathematical axioms:
1. **Identity**: TICK1A ^ 0 = ATICK1
2. **Self-Inverse**: TICK1A ^ A = 0TICK1 (Any number XORed with itself completely annihilates).
3. **Commutative/Associative**: TICK1A ^ B ^ C = C ^ B ^ ATICK1 (Order does not matter).

## 1. The "Single Number" Problem
**Problem**: You have an array of 1 million integers. Every integer appears exactly twice, except for one integer which appears exactly once. Find it in O(N) time and strictly **O(1) extra space**.
**Solution**: Due to the Self-Inverse axiom, if you simply XOR every single number in the array together, all the duplicates mathematically annihilate each other (become 0). The final remaining value is guaranteed to be the single number!
TICK1(5 ^ 2 ^ 4 ^ 2 ^ 5)  =>  (5 ^ 5) ^ (2 ^ 2) ^ 4  =>  0 ^ 0 ^ 4  =>  4TICK1.

## 2. The "Missing Number" Problem
**Problem**: An array contains numbers from 0 to N. Exactly one number is missing. Find it.
**Solution**: Compute the XOR sum of the actual array. Then compute the XOR sum of the numbers TICK10...NTICK1. XOR those two sums together. The missing number will be the only one that doesn't annihilate!

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.6 Network Flow & Matching/Bipartite matching/index.mdx': `---
title: Bipartite Matching
description: "A graph theory algorithm that pairs vertices from two disjoint sets such that no two edges share a vertex, mathematically solving problems like assigning N workers to M jobs for maximum efficiency."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bipartite Matching"
  subtitle="The Assignment Problem"
  tags={['Algorithms', 'Graph Theory', 'Network Flow', 'Optimization']}
>

A **Bipartite Graph** is a graph whose vertices can be mathematically divided into two independent sets, U and V, such that every edge connects a vertex in U to one in V. (e.g., Set U = Workers, Set V = Jobs. Edges represent "Worker X is capable of doing Job Y").
A **Matching** is a subset of edges where no two edges share the same vertex. (Nobody is assigned two jobs, and no job has two workers).

## 1. Maximum Bipartite Matching
The most common problem is finding the *Maximum* Matching (assigning the maximum possible number of workers to jobs).
This can be mathematically transformed into a Network Flow problem!
You create a "Super Source" node connected to all Workers, and a "Super Sink" node connected to all Jobs, with all edge capacities set to 1. By running a standard Max-Flow algorithm (like Ford-Fulkerson or Dinic's), the resulting maximum flow is mathematically exactly equal to the Maximum Bipartite Matching.

## 2. Hopcroft-Karp Algorithm
While you can use generic Network Flow, the **Hopcroft-Karp Algorithm** is specifically designed for Bipartite Matching.
Instead of finding one augmenting path at a time, Hopcroft-Karp uses BFS to mathematically find a maximal set of *shortest* augmenting paths simultaneously, then uses DFS to apply them.
Time Complexity: **O(E √V)**, making it strictly faster than standard Ford-Fulkerson (O(V * E)) for bipartite graphs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.6 Network Flow & Matching/Max-flow-min-cut/index.mdx': `---
title: Max-Flow Min-Cut Theorem
description: "A foundational mathematical theorem in optimization stating that the maximum amount of flow passing from a source to a sink is exactly equal to the total weight of the edges in the minimum cut that separates them."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Max-Flow Min-Cut Theorem"
  subtitle="The Duality of Networks"
  tags={['Algorithms', 'Graph Theory', 'Network Flow', 'Mathematics']}
>

The **Max-Flow Min-Cut Theorem** is one of the most beautiful and profound results in combinatorial optimization, establishing a perfect mathematical duality between two seemingly unrelated problems.

## 1. The Two Problems
- **The Max-Flow Problem**: Imagine a network of water pipes with different width capacities. How much total water can you push from the Source to the Sink per second?
- **The Min-Cut Problem**: You are a saboteur. You want to sever pipes to completely disconnect the Source from the Sink. What is the mathematically cheapest set of pipes you can cut (minimum total capacity)?

## 2. The Theorem
The theorem states: **The Maximum Flow is exactly equal to the Minimum Cut.**
If the maximum flow is 50 gallons/sec, then the absolute bottleneck of the network mathematically adds up to exactly 50 gallons/sec.
This is incredibly powerful because if you solve one, you automatically solve the other!
Many complex computer vision problems (like Image Segmentation, where you want to cut a subject out of a background) are mathematically modeled as Min-Cut problems, and are solved using highly optimized Max-Flow algorithms.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.6 Network Flow & Matching/Min-cost max-flow/index.mdx': `---
title: Min-Cost Max-Flow
description: "An advanced network flow algorithm that finds the mathematically cheapest way to push the maximum possible flow through a network where edges have both a capacity limit and a monetary cost per unit of flow."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Min-Cost Max-Flow"
  subtitle="Optimizing Logistics"
  tags={['Algorithms', 'Graph Theory', 'Network Flow', 'Optimization']}
>

In a standard Max-Flow problem, you only care about pushing as much flow as possible.
In a **Min-Cost Max-Flow** problem, pushing 1 unit of flow through an edge incurs a specific financial Cost. Your goal is still to push the maximum possible flow, but if there are multiple ways to route the flow, you must mathematically guarantee the absolute cheapest route.

## 1. The Successive Shortest Path Algorithm
The standard Ford-Fulkerson algorithm pushes flow through any arbitrary "augmenting path".
To solve Min-Cost Max-Flow, you mathematically modify Ford-Fulkerson to always push flow along the **Shortest Path** (where "Shortest" is defined by the Edge Costs).
Because edge capacities can cause "backwards" residual edges with negative costs, you cannot use Dijkstra's algorithm natively. You must use the **Bellman-Ford Algorithm** (which handles negative weights), or use mathematical **Potentials** (Johnson's trick) to re-weight the graph so you can safely use Dijkstra's for maximum performance.

## 2. Real-World Logistics
This algorithm is the mathematical backbone of global supply chain management.
You have 5 factories (Sources) and 50 retail stores (Sinks). Edges are shipping routes. Edges have capacities (Max trucks per day) and Costs ($ per mile). Min-Cost Max-Flow mathematically dictates exactly how many products to put on which trucks to fully stock the stores while minimizing the fuel budget.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.6 Network Flow & Matching/Stable matching (Gale-Shapley)/index.mdx': `---
title: Stable Matching (Gale-Shapley)
description: "A Nobel Prize-winning algorithmic system that mathematically guarantees a stable assignment between two equally sized sets (like medical students and hospitals) where no two pairs would rather swap with each other."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Stable Matching (Gale-Shapley)"
  subtitle="The Medical Residency Algorithm"
  tags={['Algorithms', 'Game Theory', 'Optimization', 'Mathematics']}
>

The **Stable Marriage Problem** involves two sets of size N (e.g., N Proposers, N Acceptors). Every person has a strict, ranked preference list of the other set.
A matching is **Unstable** if Proposer A and Acceptor B are not matched to each other, but they mathematically prefer each other over their current partners. (They will abandon their partners and elope, breaking the system).

## 1. The Gale-Shapley Algorithm (1962)
David Gale and Lloyd Shapley proved mathematically that a Stable Matching is *always* possible, and created a strict O(N²) algorithm to find it:
1. Every unmatched Proposer proposes to their top remaining choice.
2. The Acceptor looks at the proposal. If they are unmatched, they say "Maybe" (Engaged).
3. If the Acceptor is already engaged, they compare the new proposal to their current partner. They mathematically dump the lesser preferred, and get engaged to the higher preferred.
4. The dumped Proposer crosses that Acceptor off their list, and proposes to their next choice in the next round.
5. The algorithm stops when everyone is engaged.

## 2. Mathematical Properties
The algorithm is **Proposer-Optimal**. It mathematically guarantees that every single Proposer receives the absolute best possible partner they can get in any stable matching, while the Acceptors receive their absolute worst possible valid partner.
In the real world, Gale-Shapley is used by the **National Resident Matching Program** to mathematically assign thousands of medical school graduates to hospital residency programs. (It was modified in the 1990s to be Student-Proposing, ensuring students get the mathematical advantage).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Android vs iOS/index.mdx': `---
title: Android vs iOS
description: "A comprehensive architectural and philosophical comparison between the world's two dominant mobile operating systems: Google's open-source Android and Apple's closed-ecosystem iOS."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Android vs iOS"
  subtitle="The Mobile Ecosystem War"
  tags={['Comparison', 'Mobile', 'Android', 'iOS', 'Architecture']}
>

Android and iOS power over 99% of the world's smartphones. While they provide similar end-user experiences, their underlying software architectures, programming languages, and philosophical approaches to ecosystem control are fundamentally opposed.

## 1. Architectural Philosophy
- **Android**: An open-source operating system based on the Linux kernel (AOSP). It is designed to be highly customizable, allowing hardware manufacturers (Samsung, Xiaomi) to heavily modify the UI and system behaviors. Apps are traditionally written in Java or Kotlin and compiled to bytecode running on the Android Runtime (ART), allowing the exact same app to run on vastly different hardware architectures.
- **iOS**: A proprietary, closed-source operating system based on Darwin (Unix). It is strictly controlled by Apple, resulting in a highly uniform, locked-down ecosystem. Apps are written in Swift or Objective-C and compiled directly to raw, native ARM machine code, mathematically guaranteeing maximum hardware optimization since Apple designs both the silicon and the OS.

## 2. Development Ecosystem
| Feature | Android | iOS |
| :--- | :--- | :--- |
| **Primary Languages** | Kotlin, Java | Swift, Objective-C |
| **IDE** | Android Studio (IntelliJ) | Xcode |
| **UI Framework (Modern)** | Jetpack Compose | SwiftUI |
| **App Distribution** | Google Play, Sideloading, 3rd Party Stores | Apple App Store (Sideloading highly restricted) |
| **Hardware Target** | Thousands of vastly different devices | A strict, known subset of Apple devices |

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Array vs linked list/index.mdx': `---
title: Array vs Linked List
description: "A fundamental data structure comparison detailing the mathematical tradeoffs between contiguous memory allocation (Arrays) and node-based pointer allocation (Linked Lists)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Array vs Linked List"
  subtitle="Contiguous vs Pointer-Based Memory"
  tags={['Comparison', 'Data Structures', 'Fundamentals', 'Performance']}
>

Arrays and Linked Lists are the two most fundamental linear data structures in computer science. The choice between them dictates the foundational memory architecture and mathematical time complexity of your program.

## 1. Memory Architecture
- **Array**: Requires a single, massive block of **contiguous** memory. (e.g., An array of 10,000 integers requires exactly 40,000 bytes in a perfect row).
- **Linked List**: Nodes are scattered entirely randomly throughout RAM. Each node stores a value, plus an explicit **pointer** (memory address) to the next node. 

## 2. Mathematical Time Complexity Tradeoffs

| Operation | Array | Linked List | Explanation |
| :--- | :--- | :--- | :--- |
| **Access (Indexing)** | **O(1)** | O(N) | Arrays mathematically calculate the exact RAM address using TICK1Base + (Index * Size)TICK1. Lists must traverse pointers one by one. |
| **Insert/Delete (Start)**| O(N) | **O(1)** | Inserting at the start of an Array requires physically shifting every single element to the right. Lists just update the Head pointer. |
| **Insert/Delete (End)** | **O(1)** | O(N) / O(1) | Arrays append instantly. Lists require O(N) to traverse to the end, unless a Tail pointer is cached (O(1)). |

## 3. The CPU Cache Factor
In modern computing, Big-O notation lies. 
Because Arrays are contiguous, reading index 0 mathematically pulls the next 15 indexes into the ultra-fast L1 CPU Cache simultaneously.
Linked Lists suffer from **Cache Misses**. Reading Node A requires the CPU to wait hundreds of clock cycles to fetch Node B from a random location in RAM. Thus, in the real world, iterating over an Array is often mathematically 10x to 100x faster than a Linked List, heavily diminishing the Linked List's theoretical advantages.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/AWS vs Azure vs GCP vs OCI/index.mdx': `---
title: AWS vs Azure vs GCP vs OCI
description: "A high-level architectural comparison of the world's major public cloud providers: Amazon Web Services, Microsoft Azure, Google Cloud Platform, and Oracle Cloud Infrastructure."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="AWS vs Azure vs GCP vs OCI"
  subtitle="The Public Cloud Titans"
  tags={['Comparison', 'Cloud', 'Architecture', 'Infrastructure']}
>

The Public Cloud market is dominated by massive tech conglomerates providing globally distributed data centers, compute power, and managed services on demand.

## 1. Amazon Web Services (AWS)
**The Pioneer & Market Leader**. AWS invented modern cloud computing (EC2, S3). It has the largest market share, the most massive ecosystem of services, and the widest global reach. It is the default choice for most startups and massive enterprises, but its sheer volume of services can result in a steep learning curve and complex billing architectures.

## 2. Microsoft Azure
**The Enterprise Standard**. Azure is fundamentally designed to integrate flawlessly with Microsoft's existing enterprise monopolies (Windows Server, Active Directory, Office 365, MS SQL). If a massive corporation already operates on Microsoft infrastructure, Azure provides a mathematically seamless hybrid-cloud transition, making it the primary choice for Fortune 500 legacy companies.

## 3. Google Cloud Platform (GCP)
**The Data & AI Powerhouse**. GCP is built on the exact same infrastructure that runs Google Search and YouTube. It is heavily favored by organizations prioritizing Big Data (BigQuery), Machine Learning (TensorFlow/TPUs), and Kubernetes (which Google invented). While its market share is smaller, its network speed and data analytics tools are widely considered mathematically superior.

## 4. Oracle Cloud Infrastructure (OCI)
**The Performance Challenger**. OCI is a Gen-2 cloud designed specifically for massive, high-performance, legacy database workloads. It offers "Bare Metal" servers with extreme I/O performance and highly aggressive pricing structures (often drastically cheaper bandwidth egress fees than AWS), specifically targeting massive enterprises looking to escape Oracle's traditional on-premise licensing costs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Azure vs GCP/index.mdx': `---
title: Azure vs GCP
description: "A focused comparison between the second and third largest cloud providers, contrasting Microsoft Azure's enterprise/hybrid dominance with Google Cloud Platform's data analytics and Kubernetes supremacy."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Azure vs GCP"
  subtitle="Enterprise vs Analytics"
  tags={['Comparison', 'Cloud', 'Azure', 'GCP', 'Architecture']}
>

While AWS is the undisputed market leader, Microsoft Azure and Google Cloud Platform (GCP) aggressively battle for the remaining market share by specializing in fundamentally different technological philosophies.

## 1. Microsoft Azure: The Enterprise Hybrid
Azure's primary mathematical advantage is its total integration with the Microsoft ecosystem.
- **Active Directory**: The backbone of corporate identity management syncs natively with Azure AD.
- **Hybrid Cloud**: Azure Stack allows corporations to run a physical Azure rack in their own private basement, mathematically mimicking the public cloud for extreme regulatory compliance.
- **C# / .NET**: Azure is mathematically optimized for teams writing Microsoft-stack code, providing seamless CI/CD via GitHub (which Microsoft owns).

## 2. GCP: The Engineering & Data Powerhouse
GCP's primary advantage is its heritage as the infrastructure behind Google.
- **Kubernetes**: Google literally invented Kubernetes (Borg). GCP's Google Kubernetes Engine (GKE) is widely considered the most advanced, frictionless, and mathematically optimized container orchestration platform on earth.
- **Big Data**: Google BigQuery is a serverless data warehouse that can query Terabytes of unstructured data in seconds, massively outperforming traditional SQL models.
- **Global Network**: GCP runs entirely on Google's private, under-sea fiber-optic network. When data enters a GCP region, it traverses the globe on Google's private hardware, offering mathematically superior latency compared to relying on the public internet backbone.

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
