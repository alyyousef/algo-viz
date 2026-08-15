import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Arrays/index.mdx': `---
title: Arrays
description: The most fundamental linear data structure, storing elements in contiguous memory blocks for mathematically perfect O(1) random access.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Arrays">

The **Array** is the absolute foundation of all data structures. It is a linear collection of elements stored in strictly **contiguous (adjacent) memory locations**. 
Because the memory is perfectly unbroken, the CPU can calculate the exact physical address of any element instantly using pure math.

## 1. O(1) Random Access
If you have an array of integers starting at memory address TICK11000TICK1, and you want to access the 5th element (index 4), the CPU does not need to search. 
Because every integer is exactly 4 bytes, the CPU mathematically calculates:
TICK1Address = Base + (Index * Size) = 1000 + (4 * 4) = 1016TICK1
It instantly fetches address TICK11016TICK1 in $O(1)$ time. This mathematical property makes arrays the fastest data structure in the universe for random reads.

## 2. The Contiguous Bottleneck
Because arrays must be strictly contiguous, they suffer from two fatal flaws:
- **Fixed Size**: When you create an array of size 10, the OS carves out exactly 10 slots of contiguous memory. If you try to add an 11th element, the array mathematically cannot expand, because the 11th memory slot might already be owned by another program.
- **$O(N)$ Insertions**: If you want to insert a new element at index $0$, you must physically shift every single existing element exactly one slot to the right to make room, taking $O(N)$ time.

## 3. Cache Locality
Modern CPUs do not fetch data from RAM one byte at a time; they fetch massive "Cache Lines" (e.g., 64 bytes). Because an array is contiguous, fetching the first element automatically pulls the next 15 elements directly into the ultra-fast L1 CPU Cache. This "Spatial Locality" makes iterating over arrays brutally fast compared to Linked Lists.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Dynamic arrays/index.mdx': `---
title: Dynamic Arrays
description: An array that mathematically resizes itself when full, providing the blazing-fast random access of standard arrays with the flexibility of variable size.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dynamic Arrays">

Standard arrays are fatally limited because their size is strictly fixed at creation. **Dynamic Arrays** (like Python's TICK1listTICK1, Java's TICK1ArrayListTICK1, or C++'s TICK1std::vectorTICK1) solve this by mathematically managing the memory allocation in the background, giving the illusion of infinite capacity.

## 1. The Geometric Expansion Rule
Under the hood, a Dynamic Array is still just a standard, fixed-size array. 
If you create a Dynamic Array, it might initialize a standard array of size $4$. You append elements: TICK1[A, B, C, D]TICK1. The array is now physically full. 
If you append TICK1ETICK1, the Dynamic Array triggers a massive background operation:
1. It requests a completely new, mathematically larger block of contiguous memory from the OS (usually exactly **double** the size: $8$).
2. It physically copies TICK1[A, B, C, D]TICK1 from the old memory to the new memory.
3. It appends TICK1ETICK1 to the new array.
4. It mathematically destroys the old array.

## 2. Amortized O(1) Insertion
Because resizing requires an $O(N)$ mathematical copy of the entire array, you might assume appending to a Dynamic Array is slow. 
However, because it mathematically doubles its capacity every time, resizing happens exponentially less often as the array grows. If you append $1,000,000$ elements, it only resizes 20 times. 
Mathematically, the $O(N)$ cost is so violently diluted across the millions of cheap $O(1)$ appends that the *average* cost of appending remains **Amortized $O(1)$**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Linked lists (singly/index.mdx': `---
title: Singly Linked Lists
description: A linear collection of data elements scattered randomly in memory, where each element strictly points to the physical address of the next.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Singly Linked Lists">

If Arrays are rigid and mathematically contiguous, **Linked Lists** are completely fluid and fragmented. 
A Linked List is constructed of individual objects called **Nodes**. When you create a Node, the OS places it randomly in memory wherever there is free space. To mathematically connect them, each Node holds exactly two things:
1. The Data.
2. A Pointer (the exact physical memory address) to the *next* Node.

## 1. O(1) Insertions & Deletions
Arrays require $O(N)$ time to insert an element at the beginning because they must mathematically shift everything down. 
A Singly Linked List handles this in pure $O(1)$ time. If you want to insert a new Head node, you simply tell the new Node to mathematically point its address to the old Head, and update your master Head pointer. No shifting of existing data is required whatsoever.

## 2. The O(N) Access Bottleneck
Because the Nodes are scattered randomly in memory, there is no mathematical equation to calculate where the 500th element is. 
To access index 500, you have absolutely no choice but to start at the Head, follow the address to Node 2, follow the address to Node 3, and traverse the chain $500$ times. This makes random access brutally slow at exactly $O(N)$.

## 3. Cache Misses
Because Nodes are scattered randomly, traversing a Linked List mathematically destroys the CPU's Spatial Locality. Every time the CPU follows a pointer to the next Node, it is almost guaranteed to trigger an L1 Cache Miss, forcing the CPU to wait hundreds of cycles to fetch the new address from main RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/doubly/index.mdx': `---
title: Doubly Linked Lists
description: An advanced linked list where each node mathematically holds pointers to both the next node and the previous node, allowing seamless bidirectional traversal.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Doubly Linked Lists">

A Singly Linked List is mathematically trapped moving in exactly one direction. If you traverse to Node 10 and realize you need to check Node 9, it is mathematically impossible to go backward; you must restart entirely from the Head. 
**Doubly Linked Lists** solve this by adding a second pointer to every Node.

## 1. Bidirectional Architecture
Every Node in a Doubly Linked List strictly contains:
1. The Data
2. A Pointer to the TICK1NextTICK1 Node
3. A Pointer to the TICK1PreviousTICK1 Node

This allows the algorithm to mathematically traverse backward and forward seamlessly. If you hold a reference to the TICK1TailTICK1, you can traverse the entire list in reverse just as easily as starting from the TICK1HeadTICK1.

## 2. O(1) Deletion (With a Catch)
If you have a reference to a specific Node in the middle of a Singly Linked List, you mathematically *cannot* delete it in $O(1)$ time, because you cannot reach the node *behind* it to update its pointer. 
In a Doubly Linked List, because you mathematically have the TICK1PreviousTICK1 pointer, you can effortlessly detach the Node and reconnect the chain around it in perfect $O(1)$ time. 
*(Note: Finding the Node still takes $O(N)$ time, but the physical deletion is $O(1)$).*

## 3. The Memory Tax
The massive flexibility of bidirectionality comes with a strict mathematical cost: **Memory Overhead**. Every single Node now requires an additional 64-bit pointer just to track the previous element. For millions of tiny data elements, this memory tax can mathematically double the size of the entire data structure.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/circular)/index.mdx': `---
title: Circular Linked Lists
description: A specialized linked list where the final tail node mathematically connects back to the absolute first head node, creating an infinite, continuous loop.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Circular Linked Lists">

In a standard Linked List, the final TICK1TailTICK1 node holds a pointer strictly set to TICK1NULLTICK1, mathematically signaling to any traversing algorithm that the data structure has ended. 
A **Circular Linked List** completely removes the concept of an "end." The TICK1TailTICK1 node's TICK1NextTICK1 pointer is mathematically wired directly back to the TICK1HeadTICK1 node, creating an infinite loop.

## 1. The Infinite Traversal
Because there is no TICK1NULLTICK1, an algorithm can continuously traverse the list forever. This makes it the mathematically perfect data structure for **Round-Robin Scheduling** in Operating Systems. If the OS has 5 programs requesting CPU time, it simply traverses the Circular Linked List, giving each program 1 millisecond of execution time, infinitely looping around the ring until a program terminates.

## 2. Eliminating the Head
Mathematically, a Circular Linked List does not actually have a true "Head." Any node can act as the starting point. 
Because of this, implementations rarely store a pointer to the Head. Instead, they store a single master pointer exclusively to the **Tail**. 
By storing only the Tail pointer, you mathematically gain instant $O(1)$ access to the Tail, and instant $O(1)$ access to the Head (because TICK1Head = Tail.NextTICK1).

## 3. The Infinite Loop Danger
Writing algorithms for Circular Linked Lists requires extreme mathematical precision. If you write a standard TICK1while (node != NULL)TICK1 traversal loop, it will mathematically trap the CPU in an infinite loop forever. Traversal algorithms must strictly record their starting physical address and mathematically check if they have returned to it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Stacks/index.mdx': `---
title: Stacks
description: A rigid Last-In-First-Out (LIFO) data structure where elements are mathematically added and removed strictly from the absolute top.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Stacks">

A **Stack** is not a unique physical memory layout; it is an **Abstract Data Type (ADT)**. It is essentially an Array or a Linked List that has been mathematically crippled. You are strictly forbidden from accessing the middle or the bottom. You can only interact with the absolute top element.

## 1. LIFO (Last-In, First-Out)
A Stack perfectly mimics a physical stack of dinner plates. 
- **Push**: You place a new plate on top of the stack.
- **Pop**: You mathematically must remove the top plate before you can access any plate underneath it.

Because you only ever manipulate the single top pointer, both TICK1PushTICK1 and TICK1PopTICK1 are mathematically guaranteed to be blazing fast $O(1)$ operations.

## 2. The Call Stack
Stacks are the absolute backbone of Computer Science architecture. When a Python script calls a function, the CPU mathematically pushes a "Stack Frame" (containing the local variables) onto the system **Call Stack**. If that function calls another function, a new frame is pushed on top. When a function finishes, the CPU pops its frame off the top, mathematically returning exactly to the previous function. 

## 3. Depth-First Search (DFS)
In graph theory, traversing a maze requires exploring deeply down a single path until hitting a dead end, and then backtracking. 
A Stack mathematically perfectly simulates this. By pushing forks in the road onto a Stack, the algorithm explores the most recently discovered path first (LIFO), mathematically forming the core logic of all **Depth-First Search (DFS)** algorithms.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Queues/index.mdx': `---
title: Queues
description: A rigid First-In-First-Out (FIFO) data structure, mathematically simulating a waiting line where elements join at the back and leave from the front.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Queues">

Like a Stack, a **Queue** is an Abstract Data Type (ADT) that restricts how you interact with the underlying data. While Stacks prioritize the newest data, Queues strictly prioritize the oldest data. It mathematically enforces strict fairness: the first element in is guaranteed to be the first element out.

## 1. FIFO (First-In, First-Out)
A Queue operates exactly like a queue of humans at a grocery store checkout.
- **Enqueue (Push)**: A new element mathematically attaches itself exclusively to the absolute **Back** (Tail) of the line.
- **Dequeue (Pop)**: The algorithm mathematically serves and removes exclusively from the absolute **Front** (Head) of the line.

If implemented correctly (usually via a Doubly Linked List), both Enqueue and Dequeue operations are perfectly $O(1)$.

## 2. System Architecture & Buffering
Queues are the absolute mathematical foundation of asynchronous distributed systems. 
If 10,000 users click a button simultaneously, the backend server cannot process them all instantly. It mathematically pushes all 10,000 requests into an **Event Queue** (like RabbitMQ or Kafka). The server then sequentially dequeues and processes the requests one by one, ensuring no data is dropped and strict chronological order is maintained.

## 3. Breadth-First Search (BFS)
While Stacks power Depth-First Search, Queues mathematically power **Breadth-First Search (BFS)**. 
When scanning a social network graph, a Queue forces the algorithm to explore all friends at distance 1 before moving to friends at distance 2. Because it prioritizes the oldest discovered nodes (FIFO), BFS mathematically guarantees it will find the absolute shortest path to any target.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Deques/index.mdx': `---
title: Deques (Double-Ended Queues)
description: A generalized queue that mathematically allows blazing-fast O(1) insertions and deletions at both the absolute front and absolute back.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deques (Double-Ended Queues)">

Pronounced "Deck", the **Deque** (Double-Ended Queue) mathematically fuses the capabilities of both a Stack and a Queue into a single, unified data structure. It completely removes the LIFO/FIFO restrictions, allowing you to seamlessly push and pop from either extreme end of the data structure.

## 1. The Four Operations
A true Deque mathematically guarantees perfect $O(1)$ time complexity for all four extreme operations:
1. TICK1PushFrontTICK1
2. TICK1PushBackTICK1
3. TICK1PopFrontTICK1
4. TICK1PopBackTICK1

If you restrict yourself to just TICK1PushBackTICK1 and TICK1PopBackTICK1, the Deque mathematically behaves exactly like a Stack. If you use TICK1PushBackTICK1 and TICK1PopFrontTICK1, it behaves exactly like a Queue.

## 2. Implementation (The Ring Buffer vs Doubly Linked List)
While you can trivially implement a Deque using a Doubly Linked List, the memory overhead and Cache Misses are disastrous. 
Modern languages (like Python's TICK1collections.dequeTICK1 or C++'s TICK1std::dequeTICK1) mathematically implement it as a massive array of smaller, fixed-size contiguous arrays (Chunks). This hybrid architecture provides the $O(1)$ flexibility of a Linked List while retaining the brutal CPU cache efficiency of an Array.

## 3. Sliding Window Algorithms
Deques are absolutely legendary in algorithm interviews for solving **Sliding Window Maximum** problems. 
By using a Deque to mathematically store only the indices of useful, strictly decreasing elements within a window, the algorithm can instantly peek at the absolute maximum value at the front of the Deque in $O(1)$ time, allowing it to process massive arrays in perfectly linear $O(N)$ time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Priority queues/index.mdx': `---
title: Priority Queues
description: A specialized queue where elements are mathematically served based on their assigned priority rather than their chronological order of arrival.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Priority Queues">

In a standard Queue (FIFO), the CEO of a company and a regular employee wait in the exact same line based strictly on who arrived first. A **Priority Queue** destroys fairness. It mathematically guarantees that the CEO is served immediately, regardless of when they arrived, based entirely on an attached "Priority Score."

## 1. The Mathematical Mechanism
A Priority Queue is an Abstract Data Type (ADT). When you call TICK1Pop()TICK1, it does not pop the oldest element; it mathematically scans the data and pops the element with the absolute highest (or lowest) priority score. 
While you *could* implement this using a sorted Array, inserting a new element would take a disastrous $O(N)$ time. Because of this, Priority Queues are almost exclusively implemented using a **Binary Heap** (a specialized tree structure).

## 2. Heap-Backed Performance
By backing the Priority Queue with a Min-Heap or Max-Heap, the mathematics drastically improve:
- **Peek Max Priority**: Instant $O(1)$
- **Pop Max Priority**: $O(\log N)$
- **Insert New Element**: $O(\log N)$

This logarithmic scaling allows algorithms to instantly retrieve the most critical data from massive datasets of millions of elements in fractions of a microsecond.

## 3. Dijkstra's Algorithm
Priority Queues are the absolute mathematical engine behind **Dijkstra's Algorithm** (used by Google Maps to find the shortest path). As the algorithm explores millions of possible roads, it constantly pushes them into a Priority Queue ranked by total distance. Because the Queue mathematically always pops the absolute shortest known road first, Dijkstra's avoids wandering aimlessly and homes directly in on the destination.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Circular buffers/index.mdx': `---
title: Circular Buffers (Ring Buffers)
description: A fixed-size array that mathematically treats memory as if it were connected end-to-end, heavily used in data streaming and low-level I/O buffering.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Circular Buffers (Ring Buffers)">

A **Circular Buffer** (or Ring Buffer) is a brilliant mathematical illusion. It is physically just a standard, fixed-size contiguous Array. However, using two pointers (Head and Tail) and the mathematical Modulo operator, it tricks algorithms into believing the memory wraps around continuously in an infinite circle.

## 1. The Modulo Mathematics
If you have an Array of size $5$ (indices $0$ to $4$), and the Tail pointer reaches index $4$, the Array is physically full. 
If you pop an element from the Head (index $0$), index $0$ is now physically empty, but standard Queues mathematically cannot wrap backwards to use it. 
A Circular Buffer uses Modulo arithmetic: TICK1Next_Index = (Current_Index + 1) % CapacityTICK1. 
When the Tail is at $4$, TICK1(4 + 1) % 5 = 0TICK1. The Tail pointer mathematically snaps back to index $0$, safely overwriting or filling the newly freed physical memory at the start of the Array.

## 2. The Overwrite Protocol
Circular Buffers are highly specialized because their size is strictly fixed. If the Tail mathematically catches up to the Head (the buffer is 100% full), it must make a rigid architectural decision:
- **Block**: Force the producer to wait until the consumer pops an element.
- **Overwrite**: Mathematically crush the oldest data (the Head) to make room for the newest data. 

## 3. Hardware I/O & Streaming
Because they require zero dynamic memory allocation and offer mathematically perfect $O(1)$ operations with zero Cache Misses, Circular Buffers are the absolute standard for low-level systems. 
When your keyboard sends keystrokes to the OS, or when Netflix streams a chunk of video to your GPU, the data is pushed directly into a blazing-fast hardware Circular Buffer to handle the asynchronous speed difference between the network and the processor.

</ConceptTemplate>
`,
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
