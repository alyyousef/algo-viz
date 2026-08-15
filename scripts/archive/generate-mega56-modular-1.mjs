import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/5. Data Structures/5.4 Heaps/Binomial heaps/index.mdx': `---
title: Binomial Heaps
description: A collection of binomial trees that mathematically allows for blazing-fast merging of two entirely different heaps in O(log N) time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Binomial Heaps">

A standard **Binary Heap** is incredible for Priority Queues, but it has one devastating mathematical flaw: if you want to merge two massive Binary Heaps together, it takes $O(N)$ time. The **Binomial Heap** completely solves this, allowing two heaps to be merged in blistering **$O(\log N)$ time**.

## 1. Forests of Trees
A Binomial Heap is not a single tree. It is mathematically a **Forest** (a collection) of perfectly structured **Binomial Trees**. 
A Binomial Tree of order $0$ is a single node. An order $1$ tree is two order $0$ trees linked together. An order $K$ tree is mathematically constructed by taking two trees of order $K-1$ and linking the root of one to the root of the other. 

## 2. Binary Arithmetic Merging
Because of this strict mathematical construction, a Binomial Heap behaves exactly like **Binary Arithmetic**. 
If a heap has $13$ elements, the binary representation of $13$ is TICK11101TICK1. This mathematically guarantees the heap consists of exactly one tree of order $3$ (8 nodes), one tree of order $2$ (4 nodes), and one tree of order $0$ (1 node). 

When you merge two Binomial Heaps, you literally just perform binary addition. You merge the order $0$ trees. If there is a "carry", you mathematically carry the resulting order $1$ tree over to the next column. This strict binary logic guarantees the merge takes exactly $O(\log N)$ time.

## 3. Strict vs Lazy Heaps
While Binomial Heaps are theoretically beautiful, they enforce strict structural rules after every single operation. This strictness limits their real-world speed compared to **Fibonacci Heaps**, which are lazier versions of Binomial Heaps that delay all the mathematical merging until absolutely necessary.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.4 Heaps/Pairing heaps/index.mdx': `---
title: Pairing Heaps
description: A highly simplified, self-adjusting heap structure that provides incredible real-world performance, often outperforming the theoretically superior Fibonacci heap.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pairing Heaps">

The **Fibonacci Heap** is mathematically famous for achieving $O(1)$ amortized time for decreasing a key, making it theoretically the fastest heap in existence for Dijkstra's Algorithm. However, in the real world, the constant factors and memory overhead of Fibonacci Heaps are disastrous. The **Pairing Heap** is the practical, simplified alternative.

## 1. The Multi-way Tree
A Pairing Heap is incredibly simple. It is just a single multi-way tree (a root node can have an infinite number of children). It strictly obeys the **Min-Heap property**: the root is always the absolute minimum element, and every child must be larger than its parent. 

## 2. The Pairing Merge (Extract-Min)
The complexity arises when you extract the minimum element (the root). When the root is destroyed, all of its children become mathematically orphaned. 
If a root had 100 children, merging them back together one-by-one would be terribly slow. The Pairing Heap gets its name from its brilliantly simple mathematical heuristic:
1. It merges the orphans in **pairs** from left to right (Node 1 with Node 2, Node 3 with Node 4). 
2. It then takes those newly merged pairs and merges them all into a single tree from right to left. 

## 3. Theoretical Mystery
Pairing Heaps are an absolute anomaly in Computer Science. They are incredibly easy to code, and empirical benchmarks prove they consistently outperform Fibonacci Heaps in almost all real-world scenarios. 
However, since their invention in 1986, their exact mathematical time complexity remains **unsolved**. Computer scientists have proven they are Amortized $O(\log N)$ for most operations, but proving whether their TICK1Decrease-KeyTICK1 operation matches the $O(1)$ speed of a Fibonacci Heap remains an open mathematical problem.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.4 Heaps/d-ary heaps/index.mdx': `---
title: D-ary Heaps
description: A generalized binary heap where each node mathematically has D children instead of 2, heavily optimizing CPU cache performance and decreasing tree height.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="D-ary Heaps">

A standard **Binary Heap** limits every node to exactly $2$ children. A **D-ary Heap** mathematically generalizes this concept, allowing every node to have exactly $D$ children. (A $3$-ary heap has $3$ children per node, a $4$-ary heap has $4$).

## 1. Mathematical Array Mapping
Like a Binary Heap, a D-ary Heap does not use Node pointers; it physically lives inside a perfectly flat, contiguous Array. 
For a Binary Heap, the children of index $i$ are mathematically located at $2i + 1$ and $2i + 2$. 
For a D-ary heap, the children are located at $D \\times i + 1, D \\times i + 2, \\dots, D \\times i + D$. The parent is mathematically found at TICK1floor((i - 1) / D)TICK1.

## 2. The Depth vs Breadth Tradeoff
By increasing $D$ (e.g., to $4$), the tree becomes mathematically much wider and significantly shallower. 
- **The Advantage**: Because the tree is extremely shallow, operations that move data *up* the tree (like TICK1InsertTICK1 or TICK1Decrease-KeyTICK1) require exponentially fewer mathematical comparisons. 
- **The Disadvantage**: Operations that move data *down* the tree (like TICK1Extract-MinTICK1) require the algorithm to mathematically compare the node against *all* $D$ of its children to find the minimum, which slows it down.

## 3. CPU Cache Dominance
If a standard Binary Heap is theoretically faster for TICK1Extract-MinTICK1, why do D-ary heaps exist? **Cache Locality**. 
Modern CPUs fetch memory in 64-byte chunks. A 4-ary Heap perfectly aligns all 4 children into a single cache line. When the CPU needs to compare the children, it fetches all of them in a single nanosecond, mathematically destroying the performance of a Binary Heap which suffers from massive cache misses.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Adjacency list-matrix representations/index.mdx': `---
title: Graph Representations
description: The fundamental mathematical structures used to store Graphs in memory, balancing the brutal tradeoff between space efficiency and edge-lookup speed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Graph Representations">

A **Graph** is mathematically just a set of Vertices (Nodes) and Edges (Connections). Because computer memory is strictly linear, we must mathematically encode this multi-dimensional network into standard data structures. The two titans of Graph representation are the **Adjacency Matrix** and the **Adjacency List**.

## 1. The Adjacency Matrix
An Adjacency Matrix is a massive 2D Array of size $V \\times V$ (where $V$ is the number of vertices). If Node 3 connects to Node 5, you simply write a $1$ at TICK1Matrix[3][5]TICK1.
- **The Absolute Advantage**: Checking if an edge exists between two nodes is mathematically an instant $O(1)$ CPU operation.
- **The Fatal Flaw**: If Facebook has 2 Billion users, the matrix requires $2\\text{ Billion} \\times 2\\text{ Billion}$ slots. That requires **4 Exabytes of RAM**. Because most users only have a few hundred friends, $99.9999\\%$ of the matrix is filled with zeroes. It is a mathematical catastrophe for Sparse Graphs.

## 2. The Adjacency List
To solve the memory crisis, the Adjacency List mathematically changes the architecture. It is an Array (or Hash Map) of size $V$. Each slot contains a Linked List (or Dynamic Array) holding only the neighbors of that specific vertex.
- **The Absolute Advantage**: It only consumes memory for edges that *actually exist*. For a graph with $V$ vertices and $E$ edges, it requires just $O(V + E)$ memory, making it the undisputed king of real-world graphs.
- **The Flaw**: Checking if Node A connects to Node B requires a linear $O(K)$ scan through Node A's list of neighbors. 

## 3. The Edge List (Bonus)
A third, highly specialized representation is the **Edge List**: a simple, flat 1D array of objects containing TICK1[Source, Destination, Weight]TICK1. While useless for traversal algorithms like BFS or DFS, it is the mathematically perfect representation for algorithms that only care about sorting edges, like **Kruskal's Minimum Spanning Tree**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Weighted graphs/index.mdx': `---
title: Weighted Graphs
description: A graph where edges possess a numerical weight or cost, forming the absolute mathematical foundation for routing algorithms and shortest paths.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Weighted Graphs">

In a standard graph, all edges are mathematically equal. Moving from Node A to Node B counts as "1 step." However, the real world is not equal. A **Weighted Graph** assigns a strict numerical value (Weight, Cost, or Distance) to every single edge.

## 1. Representing Reality
Weighted Graphs are the mathematical language of reality:
- **Google Maps**: The Nodes are intersections, the Edges are roads, and the Weights are the exact driving time in seconds.
- **Network Routing**: The Nodes are servers, the Edges are fiber-optic cables, and the Weights are the latency in milliseconds.
- **Financial Arbitrage**: The Nodes are currencies (USD, EUR), the Edges are exchange rates, and the Weights are the mathematical conversion ratios.

## 2. The Shortest Path Problem
In an unweighted graph, finding the shortest path between two nodes is trivial: you just use **Breadth-First Search (BFS)** because the path with the fewest edges is mathematically guaranteed to be the shortest. 
In a Weighted Graph, a path with 50 edges might have a total weight of $100$, while a path with just 1 edge might have a weight of $500$. BFS fails completely here.

## 3. The Algorithmic Titans
To mathematically conquer Weighted Graphs, Computer Science invented a triad of legendary algorithms:
- **Dijkstra's Algorithm**: Uses a Priority Queue to find the absolute shortest path from a starting node to all other nodes, provided all weights are strictly positive.
- **Bellman-Ford**: Slower than Dijkstra, but mathematically capable of handling **Negative Weights**.
- **Floyd-Warshall**: A terrifying $O(V^3)$ dynamic programming algorithm that finds the shortest path between *every single pair* of nodes in the entire graph simultaneously.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Multigraphs/index.mdx': `---
title: Multigraphs
description: A relaxed mathematical graph where multiple distinct edges are permitted to connect the exact same pair of vertices simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multigraphs">

In a standard Simple Graph, the relationship between Node A and Node B is mathematically binary: an edge either exists between them, or it doesn't. You cannot have two edges connecting the same two nodes. A **Multigraph** shatters this rule, allowing infinite parallel edges between the same vertices.

## 1. Parallel Edges
If you are modeling an airline network, Node A is New York, and Node B is London. 
In a Simple Graph, you can only draw one edge connecting them (meaning "a flight exists"). 
In a Multigraph, you can mathematically draw 50 different edges between New York and London, representing 50 different daily flights, each with a completely different Weight (price, departure time, airline). 

## 2. Self-Loops
Depending on the strict mathematical definition used, some Multigraphs (often called Pseudographs) also permit **Self-Loops**—an edge that connects Node A directly back to Node A. This is heavily used in finite state machines to represent an action that keeps the system in its current state.

## 3. Representation Challenges
Multigraphs completely break the **Adjacency Matrix**. If you write a $1$ at TICK1Matrix[A][B]TICK1, you cannot mathematically represent that there are actually 5 different edges there. 
To implement a Multigraph, you must either:
- Modify the Adjacency Matrix to store an integer representing the *count* of edges.
- Use an **Adjacency List** where the list for Node A simply contains Node B five different times, optionally pointing to edge-specific data objects.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Hypergraphs/index.mdx': `---
title: Hypergraphs
description: A generalization of a standard graph where a single mathematical edge can connect not just two, but any number of vertices simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hypergraphs">

In a standard graph, an edge is mathematically defined as a strict pair: it connects exactly two vertices ($A$ and $B$). A **Hypergraph** completely destroys the concept of a binary connection. In a Hypergraph, an edge (called a **Hyperedge**) is a mathematical Set that can enclose $1, 3, 50,$ or an infinite number of vertices simultaneously.

## 1. Group Relationships
A standard graph is excellent for 1-on-1 relationships (e.g., User A is friends with User B). But standard graphs fail spectacularly at modeling Group Dynamics. 
If 5 people are in a single Group Chat, drawing standard edges between all 5 of them creates a messy, overlapping web that implies they just talk to each other 1-on-1. 
A Hypergraph simply draws a single, massive Hyperedge that mathematically swallows all 5 users, perfectly representing a unified Group relationship.

## 2. Database Modeling
Hypergraphs are the absolute foundation of complex Relational Databases. When a SQL database performs a massive TICK1JOINTICK1 across three different tables, the relationship isn't a line connecting two dots; it is a hyperedge mathematically uniting data points across multiple independent domains into a single query result.

## 3. Bipartite Equivalence
Because Hypergraphs are incredibly difficult to visualize and code, they are almost never implemented natively. Instead, any Hypergraph can be mathematically perfectly converted into a standard **Bipartite Graph**. 
You simply create two types of nodes: "Data Nodes" and "Edge Nodes." If a Hyperedge contains 5 data points, you just draw 5 standard edges connecting those 5 Data Nodes to the single central Edge Node, seamlessly translating hyper-dimensional mathematics into standard graph traversal.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Persistent data structures/index.mdx': `---
title: Persistent Data Structures
description: Immutable data structures that mathematically preserve the previous version of themselves whenever they are modified, forming the core of functional programming.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Persistent Data Structures">

In standard imperative programming (like C++ or Python), when you update an array (TICK1Array[0] = 5TICK1), the old data is violently overwritten and destroyed forever. This is an **Ephemeral** data structure. 
A **Persistent Data Structure** is mathematically **Immutable**. When you "update" it, it does not destroy the old version; it creates a completely new, modified version of itself, while perfectly preserving the mathematical history of the original.

## 1. The Nightmare of Deep Copying
If you have an Array of 1 Million elements and you want to change one item while preserving the old array, the naive approach is a "Deep Copy" (copying all 1 Million elements to a new array). This takes a disastrous $O(N)$ time and memory. 

## 2. Structural Sharing
True Persistent Data Structures (like those used in Haskell, Clojure, or Git) achieve $O(\log N)$ updates using a mathematical miracle called **Structural Sharing**. 
If you have a massive Binary Search Tree and you want to change one Leaf node, the algorithm creates a new Leaf, and a new Parent for that Leaf, all the way up to a new Root. However, this new path mathematically *points back to the unmodified branches of the old tree*. 
The new version shares $99\\%$ of its physical memory with the old version. You get a completely independent, updated Tree in $O(\log N)$ time with virtually zero memory duplication.

## 3. Time Travel and Concurrency
Because data is mathematically never overwritten, Persistent Data Structures are completely immune to Concurrency issues (Race Conditions). 10,000 threads can safely read the data simultaneously because it is physically impossible for any thread to mutate it. Furthermore, because every state is preserved, algorithms can mathematically "Time Travel" back to any previous version of the data instantly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Skip lists/index.mdx': `---
title: Skip Lists
description: A probabilistic alternative to balanced trees, using multiple layers of linked lists to mathematically achieve O(log N) search times using coin flips.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Skip Lists">

A standard sorted Linked List is brutally slow. Searching for a number takes $O(N)$ time because you must check every node one by one. 
A **Skip List** mathematically fixes this by stacking multiple "Express Lanes" on top of the base Linked List, achieving the exact same $O(\log N)$ blazing-fast search speed as a Red-Black Tree, but using completely randomized probability instead of complex tree rotations.

## 1. The Express Lanes
Imagine a subway system. The base level stops at every single station ($1, 2, 3, 4, 5, 6$). 
The Skip List builds a Level 2 Express Lane that skips every other node ($1, 3, 5$). 
It builds a Level 3 Express Lane that skips even more ($1, 5$). 

To search for $4$, you start at the highest Express Lane. You ride it to $1$. The next stop is $5$ (which is too far). So you mathematically drop down to Level 2. You ride it to $3$. You drop down to the base level and ride it to $4$. By skipping massive chunks of the list, the search mathematically finishes in $O(\log N)$ time.

## 2. Probabilistic Coin Flipping
How does the Skip List know which nodes get an Express Lane? It mathematically relies on absolute randomness. 
When you insert a new node, the algorithm literally flips a virtual coin. If Heads, it builds a Level 2 Express Lane for that node. It flips again; if Heads, it builds Level 3. It stops on the first Tails. 
Because of the mathematical laws of probability, $50\\%$ of nodes will be Level 1, $25\\%$ Level 2, $12.5\\%$ Level 3, perfectly mimicking the mathematical structure of a balanced binary tree without any rebalancing logic.

## 3. Database Caching (Redis)
Because they are significantly easier to implement than Red-Black trees and support highly efficient concurrent locking, Skip Lists are heavily used in production. The massively popular in-memory database **Redis** strictly uses Skip Lists to implement its Sorted Sets data type.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Sparse tables/index.mdx': `---
title: Sparse Tables
description: A static, highly specialized data structure that answers Range Minimum Queries (RMQ) in a mathematically perfect O(1) time after an O(N log N) precomputation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sparse Tables">

If you have a massive array of 1 Million temperatures, and you are repeatedly asked, "What was the absolute minimum temperature between index 4,000 and 80,000?", scanning that range takes $O(K)$ time. If you receive a million queries, the CPU will melt. 
A **Sparse Table** is a mathematical structure that pre-computes the data, allowing it to answer any Range Minimum Query in a mathematically perfect, instant **$O(1)$ time**.

## 1. The O(N log N) Precomputation
A Sparse Table relies entirely on the mathematical powers of $2$. 
It builds a massive 2D matrix. It pre-computes the minimum value for intervals of size $1$, size $2$, size $4$, size $8$, size $16$, etc., starting from every single index in the array.
Because there are $N$ starting positions, and $\log N$ possible powers of 2, building the table takes exactly $O(N \log N)$ time and memory.

## 2. The Overlapping O(1) Trick
If someone queries the minimum between index $10$ and $24$ (a range of $15$ elements), $15$ is not a power of $2$. 
However, the Sparse Table mathematically exploits the fact that **minimum operations can overlap**. 
It finds the largest power of 2 that fits inside $15$ (which is $8$). 
It instantly looks up the pre-computed minimum for the 8 elements starting at index $10$. It then looks up the pre-computed minimum for the 8 elements ending at index $24$. 
These two blocks of $8$ completely cover the range of $15$ (they overlap in the middle). The overall minimum is simply the TICK1Math.min()TICK1 of those two pre-computed blocks. Two instant lookups yield a perfect $O(1)$ answer.

## 3. The Immutable Constraint
Sparse Tables have a fatal mathematical flaw: they are completely **Static**. If you change a single value in the original array, it mathematically destroys the entire table, forcing you to recalculate it from scratch in $O(N \log N)$ time. For dynamic arrays, a **Segment Tree** must be used instead.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Zippers/index.mdx': `---
title: Zippers
description: A brilliant functional programming technique that mathematically represents a pointer into a data structure, allowing O(1) local updates on immutable trees.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zippers">

In pure Functional Programming languages (like Haskell), all data structures are strictly **Immutable**. If you want to traverse down a massive Tree, edit a single Leaf node, and traverse back up, you cannot simply use a pointer and overwrite the memory. You must mathematically reconstruct every node you touch. The **Zipper** is a mind-bending mathematical abstraction that makes navigating and editing immutable structures highly efficient.

## 1. The Inside-Out Architecture
A Zipper mathematically represents a "Focus" (a cursor) pointing at a specific node in a Tree. But instead of just holding the node, a Zipper holds the Node *and its exact context*. 
It mathematically splits the Tree into two pieces:
1. The currently focused Subtree.
2. The **"Context"** (the rest of the entire tree, mathematically turned inside-out, pointing back up to the Root).

## 2. O(1) Local Movement
Because the Zipper holds the inside-out path to the Root, you can mathematically "zip" up (move to the parent) or "zip" down (move to a child) in perfect $O(1)$ time. 
As you move focus, the Zipper mathematically wraps the old focus into the Context, exactly like pulling a physical zipper up or down a jacket. 

## 3. Editing the Immutable
When you edit the focused node, the Zipper does not need to rebuild the entire tree instantly. It simply creates a new node in the local Focus. When you finally "Zip Up" all the way back to the Root, the Zipper seamlessly mathematically weaves your new node back into the Context, returning a brand new Immutable Tree. It localizes the heavy lifting, providing an elegant cursor-like experience in a strictly immutable universe.

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
