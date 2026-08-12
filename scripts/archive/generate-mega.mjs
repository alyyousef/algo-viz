import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '6. Algorithms/6.1 Searching & Sorting/Binary search/index.mdx': `---
title: Binary Search
description: A highly efficient search algorithm that finds the position of a target value within a sorted array.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Binary Search">

Binary search is an extremely fast search algorithm that operates on **sorted** arrays. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

<Callout icon="warning" title="Prerequisite: Sorting">
  Binary search ONLY works if the array is already sorted. If the array is unsorted, you must use Linear Search (O(n)) or sort it first (O(n log n)).
</Callout>

## The Algorithm

1. Compare the target value to the middle element of the array.
2. If they are equal, return the index.
3. If the target is less than the middle element, repeat the search on the left half.
4. If the target is greater than the middle element, repeat the search on the right half.

## Time Complexity

<ComparisonTable 
  headers={['Case', 'Time Complexity', 'Explanation']}
  rows={[
    ['Best Case', 'O(1)', 'The target is exactly in the middle on the very first check.'],
    ['Average Case', 'O(log n)', 'The array is repeatedly halved.'],
    ['Worst Case', 'O(log n)', 'The target is at the very ends of the array, or not present at all.']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Start[Search for 7 in: 1, 3, 5, 7, 9, 11, 15]
  Mid1[Middle is 7? No, Middle is 7? Wait, length 7.\\nMiddle is index 3 (value 7)]
  End[Found at index 3!]
  
  Start --> Mid1
  Mid1 --> End
\`} />

</TechnologyTemplate>
`,
  '6. Algorithms/6.1 Searching & Sorting/Merge sort/index.mdx': `---
title: Merge Sort
description: An efficient, general-purpose, and comparison-based sorting algorithm using Divide and Conquer.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Merge Sort">

Merge Sort is a classic Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The \`merge()\` function is the key process that assumes the two halves are already sorted and merges them together.

<Callout icon="tip" title="Stability">
  Merge Sort is a **Stable** sort, meaning that two identical elements will retain their original relative order. This is highly desirable when sorting complex objects (e.g., sorting users by age, and maintaining their alphabetical order if ages match).
</Callout>

## Time and Space Complexity

<ComparisonTable 
  headers={['Metric', 'Complexity', 'Explanation']}
  rows={[
    ['Time (Worst/Avg/Best)', 'O(n log n)', 'It ALWAYS divides the array in half (log n), and ALWAYS merges them (n).'],
    ['Space', 'O(n)', 'Requires a temporary array of the exact same size as the input to perform the merge.'],
    ['Stable?', 'Yes', 'Maintains relative order of equal elements.']
  ]}
/>

## Architecture: Divide and Conquer

<ArchitectureDiagram chart={\`
graph TD
  A("[38, 27, 43, 3]") --> B("[38, 27]")
  A --> C("[43, 3]")
  
  B --> D("[38]")
  B --> E("[27]")
  C --> F("[43]")
  C --> G("[3]")
  
  D & E --> H("[27, 38]")
  F & G --> I("[3, 43]")
  
  H & I --> J("[3, 27, 38, 43]")
\`} />

</TechnologyTemplate>
`,
  '6. Algorithms/6.1 Searching & Sorting/Quick sort/index.mdx': `---
title: Quick Sort
description: A highly efficient, in-place sorting algorithm that uses a pivot element.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Quick Sort">

Quick Sort is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays. A large array is partitioned into two arrays one of which holds values smaller than the specified value, say pivot, based on which the partition is made and another array holds values greater than the pivot value.

<Callout icon="warning" title="The Worst Case">
  If you always pick the last element as the pivot, and the array is already sorted, Quick Sort degrades to O(n²). Modern implementations solve this by picking a random pivot or the median of three.
</Callout>

## Time and Space Complexity

<ComparisonTable 
  headers={['Metric', 'Complexity', 'Explanation']}
  rows={[
    ['Time (Best/Avg)', 'O(n log n)', 'Usually much faster than Merge Sort in practice due to cache locality.'],
    ['Time (Worst)', 'O(n²)', 'Happens if the pivot is always the smallest or largest element.'],
    ['Space', 'O(log n)', 'In-place sorting, but requires stack space for recursive calls.'],
    ['Stable?', 'No', 'Relative order of equal elements is not guaranteed.']
  ]}
/>

</TechnologyTemplate>
`,
  '6. Algorithms/6.2 Graph Algorithms/Dijkstra/index.mdx': `---
title: Dijkstra's Algorithm
description: An algorithm for finding the shortest paths between nodes in a graph.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Dijkstra's Algorithm">

Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.

<Callout icon="error" title="No Negative Weights">
  Dijkstra's algorithm strictly cannot handle graphs with negative edge weights. Once a node is marked as "visited", its shortest path is considered final. A negative weight could provide a shorter path later, breaking this greedy assumption. (Use Bellman-Ford for negative weights).
</Callout>

## How it Works

1. Mark all nodes unvisited. Create a set of all the unvisited nodes.
2. Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.
3. For the current node, consider all of its unvisited neighbors and calculate their tentative distances through the current node.
4. When we are done considering all of the unvisited neighbors of the current node, mark the current node as visited. A visited node will never be checked again.
5. If the destination node has been marked visited, then stop.

## Architecture

<ArchitectureDiagram chart={\`
graph LR
  A((A)) -- 4 --> B((B))
  A -- 2 --> C((C))
  B -- 5 --> C
  B -- 10 --> D((D))
  C -- 3 --> D
  
  style A fill:#bfb,stroke:#333,stroke-width:2px
  style C fill:#ff9,stroke:#333,stroke-width:2px
\`} />

</TechnologyTemplate>
`,
  '5. Data Structures/5.2 Hash-Based/Hash tables/index.mdx': `---
title: Hash Tables
description: A data structure that implements an associative array abstract data type, a structure that can map keys to values.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Hash Tables">

A Hash Table (or Hash Map) is a data structure that implements an associative array, mapping keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found.

<Callout icon="tip" title="The Ultimate Lookup">
  Hash Tables are the most widely used data structure in computer science because they offer **O(1)** (instant) average time complexity for Insert, Delete, and Lookup operations.
</Callout>

## Collisions

A collision occurs when the hash function generates the exact same array index for two different keys. Since array slots can only hold one item, the hash table must resolve this.

<ComparisonTable 
  headers={['Resolution Strategy', 'Description']}
  rows={[
    ['Chaining', 'Each array index holds a Linked List. If a collision occurs, the new item is just appended to the list at that index.'],
    ['Open Addressing', 'If the index is full, probe (search) for the next available empty slot in the array (e.g., Linear Probing, Quadratic Probing).']
  ]}
/>

## Architecture: Chaining

<ArchitectureDiagram chart={\`
graph LR
  Key1["Key: 'John'"] --> HashFunc[Hash Function]
  HashFunc --> Index02[Index: 2]
  
  Key2["Key: 'Jane'"] --> HashFunc
  HashFunc --> Index05[Index: 5]
  
  subgraph Array
    0[0: null]
    1[1: null]
    2[2: Node('John')]
    3[3: null]
    4[4: null]
    5[5: Node('Jane')]
  end
  
  Index02 --> 2
  Index05 --> 5
\`} />

</TechnologyTemplate>
`,
  '5. Data Structures/5.3 Trees/Binary search trees/index.mdx': `---
title: Binary Search Trees (BST)
description: A node-based binary tree data structure with strict ordering rules.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Binary Search Trees (BST)">

A Binary Search Tree (BST) is a tree data structure where each node has at most two child nodes (left and right). It enforces a strict mathematical property:

1. The left subtree of a node contains only nodes with keys **lesser** than the node's key.
2. The right subtree of a node contains only nodes with keys **greater** than the node's key.

<Callout icon="error" title="The Unbalanced Nightmare">
  If you insert sorted data into a standard BST (1, 2, 3, 4, 5), it degenerates into a Linked List! The O(log n) lookup time collapses to O(n). This is why self-balancing trees like AVL and Red-Black trees were invented.
</Callout>

## Time Complexity

<ComparisonTable 
  headers={['Operation', 'Average Case (Balanced)', 'Worst Case (Unbalanced)']}
  rows={[
    ['Search', 'O(log n)', 'O(n)'],
    ['Insert', 'O(log n)', 'O(n)'],
    ['Delete', 'O(log n)', 'O(n)']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  8((8)) --> 3((3))
  8 --> 10((10))
  
  3 --> 1((1))
  3 --> 6((6))
  
  6 --> 4((4))
  6 --> 7((7))
  
  10 --> 14((14))
  14 --> 13((13))
\`} />

</TechnologyTemplate>
`,
  '10. Operating Systems/Threads/index.mdx': `---
title: Threads
description: The smallest sequence of programmed instructions that can be managed independently by a scheduler.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Threads">

In computer science, a thread of execution is the smallest sequence of programmed instructions that can be managed independently by a scheduler, which is typically a part of the operating system.

<Callout icon="info" title="Processes vs Threads">
  A **Process** is a heavy, completely isolated instance of a running program (like opening Google Chrome). A **Thread** is a lightweight unit of execution *inside* that process. All threads inside a process share the exact same Memory (RAM) and File Handles.
</Callout>

## Multi-threading Benefits

<ComparisonTable 
  headers={['Benefit', 'Description']}
  rows={[
    ['Responsiveness', 'In a UI application, running heavy computations on a background thread keeps the main thread free to respond to user clicks.'],
    ['Resource Sharing', 'Threads share the memory of their parent process, making it infinitely faster for them to communicate compared to Inter-Process Communication (IPC).'],
    ['Economy', 'It is computationally much cheaper to create and context-switch between threads than it is to create entire processes.']
  ]}
/>

## The Danger: Race Conditions

Because all threads share the same memory, if Thread A and Thread B try to update the exact same variable at the exact same millisecond, the data becomes corrupted. This is solved using **Mutexes** (Mutual Exclusion locks).

</TechnologyTemplate>
`,
  '2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/Concurrency/index.mdx': `---
title: Concurrency
description: The ability of different parts or units of a program to be executed out-of-order or in partial order.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Concurrency">

Concurrency is the execution of multiple instruction sequences at the same time. It happens in the operating system when there are several process threads running in parallel.

<Callout icon="error" title="Concurrency vs Parallelism">
  Rob Pike famously said: "Concurrency is about dealing with a lot of things at once. Parallelism is about doing a lot of things at once."
  
  A single-core CPU can be **Concurrent** (by rapidly switching between two tasks so fast it *looks* simultaneous). Only a multi-core CPU can be **Parallel** (literally executing two tasks at the exact same physical nanosecond).
</Callout>

## Concurrency Models

<ComparisonTable 
  headers={['Model', 'Description']}
  rows={[
    ['Shared Memory (Threads)', 'Multiple threads read and write to the same memory space. Requires strict locking (Mutexes). Fast but prone to Deadlocks.'],
    ['Actor Model (Erlang/Akka)', 'Independent "Actors" hold their own private state and only communicate by passing immutable messages to each other. No locks required.'],
    ['CSP (Go Channels)', 'Communicating Sequential Processes. "Do not communicate by sharing memory; instead, share memory by communicating."']
  ]}
/>

</TechnologyTemplate>
`,
  '2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/Parallelism/index.mdx': `---
title: Parallelism
description: Executing multiple tasks simultaneously on multiple physical processing cores.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Parallelism">

Parallelism refers to techniques to make programs faster by performing several computations at the exact same time. This requires hardware with multiple processing units (multi-core CPUs or GPUs).

<Callout icon="tip" title="Data vs Task Parallelism">
  **Data Parallelism**: Applying the exact same operation to a massive array of data simultaneously (e.g., adding 1 to every pixel in an image using a GPU).
  
  **Task Parallelism**: Running completely different functions simultaneously (e.g., Core 1 plays audio, Core 2 renders graphics).
</Callout>

## Amdahl's Law

Amdahl's Law is a formula which gives the theoretical speedup in latency of the execution of a task at fixed workload that can be expected of a system whose resources are improved.

If a program is 90% parallelizable, and 10% strictly sequential, you can never speed up the program by more than 10x, even if you throw a million CPU cores at it.

</TechnologyTemplate>
`,
  '45. Parallel & Concurrent Computing/Deadlocks/index.mdx': `---
title: Deadlocks
description: A state in which each member of a group is waiting for another member, including itself, to take action.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Deadlocks">

A deadlock is a situation in computer science where a set of processes or threads are blocked because each process is holding a resource and waiting for another resource acquired by some other process.

<Callout icon="warning" title="The Traffic Jam Metaphor">
  Imagine four cars arrive at a 4-way stop at the exact same time. Car 1 waits for Car 2, Car 2 waits for Car 3, Car 3 waits for Car 4, and Car 4 waits for Car 1. No one can move. They are deadlocked.
</Callout>

## The Four Coffman Conditions

A deadlock CANNOT occur unless ALL FOUR of these conditions hold true simultaneously:

<ComparisonTable 
  headers={['Condition', 'Description']}
  rows={[
    ['1. Mutual Exclusion', 'At least one resource must be held in a non-shareable mode (only one thread can use it at a time).'],
    ['2. Hold and Wait', 'A thread is currently holding at least one resource and requesting additional resources held by others.'],
    ['3. No Preemption', 'A resource cannot be forcibly taken away from a thread; it must be released voluntarily.'],
    ['4. Circular Wait', 'Thread A waits for Thread B, which waits for Thread C, which waits for Thread A.']
  ]}
/>

## Deadlock Prevention

To prevent a deadlock, you simply ensure that at least one of the four Coffman conditions is never met. The easiest to break is usually **Circular Wait**: by forcing all threads to always request locks in the exact same alphabetical or numerical order, a circle can never form.

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/RSA/index.mdx': `---
title: RSA
description: One of the first and most widely used public-key cryptosystems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="RSA">

RSA (Rivest–Shamir–Adleman) is a public-key cryptosystem that is widely used for secure data transmission. In a public-key cryptosystem, the encryption key is public and distinct from the decryption key, which is kept secret (private).

<Callout icon="info" title="The Math">
  RSA derives its security from the practical difficulty of factoring the product of two extremely large prime numbers. While multiplying two 2048-bit prime numbers takes a CPU nanoseconds, reverse-engineering (factoring) the resulting number back into its original primes would take the world's fastest supercomputer billions of years.
</Callout>

## Key Generation

<ComparisonTable 
  headers={['Step', 'Action']}
  rows={[
    ['1', 'Choose two distinct prime numbers, p and q.'],
    ['2', 'Compute n = pq. (n is used as the modulus for both public and private keys).'],
    ['3', 'Compute Carmichael\\'s totient function of the product.'],
    ['4', 'Choose an integer e (the public exponent).'],
    ['5', 'Determine d (the private exponent).']
  ]}
/>

## Use Cases

Because RSA math is heavily CPU intensive, it is incredibly slow. Therefore, RSA is almost NEVER used to encrypt large files. 

Instead, RSA is used to encrypt a tiny, randomly generated **AES Symmetric Key**. Once the AES key is safely transmitted over RSA, the rest of the conversation is encrypted using the blazing-fast AES key.

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/AES/index.mdx': `---
title: AES (Advanced Encryption Standard)
description: The global standard for symmetric-key encryption.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="AES (Advanced Encryption Standard)">

The Advanced Encryption Standard (AES) is a symmetric block cipher chosen by the U.S. government to protect classified information. AES is implemented in software and hardware throughout the world to encrypt sensitive data. It is essential for government computer security, cybersecurity, and electronic data protection.

<Callout icon="success" title="Unbreakable">
  AES-256 is widely considered quantum-resistant and mathematically unbreakable via brute force. There are more possible AES-256 keys than there are atoms in the observable universe.
</Callout>

## Block Cipher vs Stream Cipher

AES is a Block Cipher. It divides the plaintext data into fixed-size blocks (128 bits) and encrypts each block one by one. (As opposed to Stream Ciphers like ChaCha20, which encrypt data bit-by-bit continuously).

## Key Sizes

<ComparisonTable 
  headers={['Key Size', 'Rounds', 'Security Level']}
  rows={[
    ['AES-128', '10 Rounds of cryptographic mixing', 'Highly secure, often used on mobile for speed.'],
    ['AES-192', '12 Rounds of cryptographic mixing', 'Rarely used.'],
    ['AES-256', '14 Rounds of cryptographic mixing', 'Top Secret / Military Grade.']
  ]}
/>

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/Digital signatures/index.mdx': `---
title: Digital Signatures
description: A mathematical scheme for verifying the authenticity of digital messages or documents.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Digital Signatures">

A digital signature is a mathematical technique used to validate the authenticity and integrity of a message, software, or digital document. It is the digital equivalent of a handwritten signature or stamped seal, but it offers far more inherent security.

<Callout icon="tip" title="Asymmetric Encryption in Reverse">
  Normally, you encrypt with someone's Public Key so only their Private Key can read it. 
  
  With Digital Signatures, you encrypt a hash of the document with YOUR **Private Key**. Anyone in the world can decrypt it with your Public Key. This proves the document absolutely *must* have come from you.
</Callout>

## Core Security Guarantees

<ComparisonTable 
  headers={['Guarantee', 'Description']}
  rows={[
    ['Authentication', 'Proves the sender is who they claim to be.'],
    ['Non-repudiation', 'The sender cannot deny having sent the message.'],
    ['Integrity', 'Proves the message was not altered in transit. (If a hacker changes 1 word of the document, the hash changes, and the signature breaks immediately).']
  ]}
/>

## Architecture Workflow

<ArchitectureDiagram chart={\`
graph TD
  Doc[Contract PDF]
  HashFunc[SHA-256]
  HashVal[Hash: "9f86d..."]
  
  subgraph Sender
    PrivKey((Private Key))
    Encrypt[Encrypt Hash]
  end
  
  Sig[Digital Signature]
  
  Doc --> HashFunc --> HashVal
  HashVal --> Encrypt
  PrivKey --> Encrypt
  Encrypt --> Sig
\`} />

</TechnologyTemplate>
`,
}

async function generateMega() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega().catch(console.error)
