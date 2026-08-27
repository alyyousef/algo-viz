import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  "src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Kosaraju's SCC/index.mdx": `---
title: Kosaraju's Algorithm (SCC)
description: "A linear-time algorithm to find the Strongly Connected Components of a directed graph by performing two passes of Depth-First Search (DFS), with the second pass operating on the reversed graph."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Kosaraju's Algorithm"
  subtitle="Finding Strongly Connected Components"
  tags={['Algorithms', 'Graphs', 'DFS', 'SCC']}
>

In a directed graph, a **Strongly Connected Component (SCC)** is a subset of vertices where every vertex can mathematically reach every other vertex in that same subset.

## 1. The Two-Pass DFS
Kosaraju's Algorithm mathematically isolates these components using a clever trick of reversing the edges.
**Pass 1**: Run DFS on the original graph. As the recursive DFS *finishes* exploring a node (when it hits a dead end and returns), push that node onto a Stack.
**Pass 2**: Mathematically reverse the direction of every single edge in the graph (creating the Transpose Graph). 
Now, pop a node off the Stack. Run a new DFS from that node on the reversed graph. Every node reached during this single DFS run mathematically belongs to the exact same Strongly Connected Component.

## 2. Mathematical Proof
Why does reversing the edges work?
If Node A can reach Node B in the original graph (A -> B), they are only in the same SCC if Node B can *also* reach Node A (B -> A).
When you reverse the graph, the edge becomes (B -> A). By popping from the Stack (which mathematically orders nodes by their topological finish time), the second DFS is guaranteed to trap itself inside the SCC, unable to leak out into other components. The Time Complexity is strictly **O(V + E)**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Max-flow-min-cut/index.mdx': `---
title: Max-Flow Min-Cut Theorem
description: "A fundamental theorem in network flow theory stating that the maximum amount of flow passing from the source to the sink mathematically equals the total weight of the edges in the minimum cut that separates the source and sink."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Max-Flow Min-Cut Theorem"
  subtitle="The Duality of Networks"
  tags={['Algorithms', 'Graphs', 'Network Flow', 'Mathematics']}
>

In computer science, many problems have a mathematical "Dual"—two completely different problems that always share the exact same numerical answer. The most famous example is Max-Flow and Min-Cut.

## 1. The Min-Cut Problem
Imagine a military general wants to physically destroy the absolute minimum number of enemy supply lines (edges) necessary to completely isolate the enemy capital (Source) from their frontline troops (Sink). 
This is the **Minimum Cut Problem**: finding the set of edges with the smallest total capacity whose removal disconnects the graph.

## 2. The Mathematical Duality
Proving the Min-Cut directly is computationally difficult. However, the Max-Flow Min-Cut theorem mathematically proves that you don't need to.
If you use Ford-Fulkerson or Dinic's Algorithm to find the **Maximum Flow** of the network (e.g., 500 gallons per minute), the theorem guarantees that the Minimum Cut is exactly 500. 
Furthermore, once Ford-Fulkerson finishes, you can mathematically find the exact edges to cut by running a simple BFS from the Source on the final Residual Graph. Any forward edge that the BFS cannot cross (because its residual capacity is 0) is mathematically part of the Minimum Cut.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Prim/index.mdx': `---
title: Prim's Algorithm
description: "A greedy algorithm that finds a Minimum Spanning Tree (MST) for a weighted undirected graph by starting at an arbitrary node and continuously mathematically growing the tree one edge at a time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Prim's Algorithm"
  subtitle="Growing the Minimum Spanning Tree"
  tags={['Algorithms', 'Graphs', 'MST', 'Greedy']}
>

Prim's Algorithm is one of the standard ways to find a Minimum Spanning Tree (along with Kruskal's). It is mathematically very similar to Dijkstra's Shortest Path algorithm.

## 1. The Greedy Growth
1. The algorithm starts at an arbitrary mathematical vertex (Node A). It marks Node A as "in the MST".
2. It looks at all edges connecting the MST to vertices *not yet* in the MST.
3. It mathematically picks the absolute cheapest edge (e.g., Node A to Node C, weight 5).
4. It adds Node C to the MST.
5. It repeats step 2, now looking at all edges emanating from *both* Node A and Node C, picking the cheapest, and growing the tree until all vertices are included.

## 2. Implementation with Priority Queues
If implemented naively by scanning an array of edges every time, Prim's runs in O(V²), which is acceptable for dense graphs (like an adjacency matrix).
However, for modern sparse networks, engineers use a **Min-Priority Queue** (Heap). When a node is added to the MST, all its outgoing edges are mathematically pushed into the Heap. Extracting the cheapest edge takes O(log V). This drops the Time Complexity to **O(E log V)**, making it highly efficient.

</ConceptTemplate>
`,

  "src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Tarjan's SCC/index.mdx": `---
title: Tarjan's SCC Algorithm
description: "An elegant, single-pass mathematical algorithm for finding the Strongly Connected Components (SCCs) of a directed graph using Depth-First Search and a stack to track discovery times."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Tarjan's SCC Algorithm"
  subtitle="Single-Pass Component Isolation"
  tags={['Algorithms', 'Graphs', 'DFS', 'SCC']}
>

While Kosaraju's Algorithm finds Strongly Connected Components using *two* DFS passes, Robert Tarjan mathematically solved it using only a **single DFS pass**.

## 1. Discovery and Low-Link Values
Tarjan's algorithm uses the same mathematical concepts he invented for finding Bridges (Discovery Time and Low-Link Value).
As the DFS explores the graph, it pushes every visited node onto a Stack.
It calculates the TICK1low-linkTICK1 value for every node (the lowest discovery time reachable from that node). If a node can mathematically reach back to an ancestor on the Stack, its low-link value drops.

## 2. Popping the SCC
Because all nodes in an SCC can reach each other, they will mathematically all share the exact same low-link value (specifically, the discovery time of the "root" node of that SCC).
When the recursive DFS finishes exploring a node, it checks: TICK1Is my low-link value equal to my discovery time?TICK1
If YES, this node is mathematically the root of an SCC. The algorithm instantly pops nodes off the Stack until it pops the root node itself. Everything it just popped is guaranteed to form a single, isolated Strongly Connected Component. The Time Complexity is an optimal **O(V + E)**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/union by rank)/index.mdx': `---
title: Union by Rank
description: "An optimization for the Disjoint-Set (Union-Find) data structure."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Union by Rank"
  subtitle="Union-Find Optimization"
  tags={['Algorithms', 'Graphs', 'Data Structures']}
>

This page was generated due to a parsing artifact in the scaffolding script.

For the full mathematical explanation of the Disjoint-Set Data Structure, including **Path Compression** and **Union by Rank/Size**, please refer to the primary **Union-Find** page in this knowledge base.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Union-Find (path compression/index.mdx': `---
title: Union-Find (Disjoint-Set)
description: "A highly optimized mathematical data structure that tracks a set of elements partitioned into a number of disjoint (non-overlapping) subsets, crucial for Kruskal's Algorithm and network connectivity."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Union-Find (Disjoint-Set)"
  subtitle="Tracking Network Connectivity"
  tags={['Algorithms', 'Graphs', 'Data Structures', 'Trees']}
>

If you have 1 million users on a social network, and you want to mathematically determine if User A is in the same friend group as User B, running BFS/DFS is too slow (O(V+E)). Union-Find solves this in nearly **O(1)** time.

## 1. Find and Union
The structure supports two primary mathematical operations:
- **TICK1Find(x)TICK1**: Returns the "Root" or "Representative" of the subset containing X. (If TICK1Find(A) == Find(B)TICK1, they are in the same group).
- **TICK1Union(x, y)TICK1**: Merges the subset containing X with the subset containing Y.

## 2. The Two Mathematical Optimizations
A naive implementation uses a flat array where each index points to its parent, creating a tree. In the worst case (a linked list), TICK1FindTICK1 takes O(N).
1. **Union by Rank**: When merging two trees, always attach the shorter tree to the root of the taller tree. This mathematically guarantees the tree height never exceeds O(log N).
2. **Path Compression**: When you call TICK1Find(X)TICK1, the algorithm traverses up the tree to find the Root. Before returning, it mathematically rewires X (and all nodes it passed) to point *directly* to the Root. Next time you call TICK1Find(X)TICK1, it executes in 1 step.
Together, these optimizations drop the amortized Time Complexity to the **Inverse Ackermann Function, α(N)**, which is mathematically less than 5 for any conceivable integer in the universe, making it effectively O(1).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Backtracking/index.mdx': `---
title: Backtracking
description: "A general algorithmic technique that considers searching every possible combination in order to solve an optimization problem, mathematically abandoning partial candidates (backtracking) as soon as it determines they cannot possibly succeed."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Backtracking"
  subtitle="Intelligent Brute Force"
  tags={['Algorithms', 'Techniques', 'DFS', 'Recursion']}
>

Backtracking is mathematically a refined form of brute-force search. It is most famously used to solve constraint satisfaction problems like Sudoku, the N-Queens problem, and generating permutations.

## 1. The Recursive Decision Tree
At its core, Backtracking is a Depth-First Search (DFS) applied to a mathematical "Decision Tree."
In a Sudoku solver, the algorithm looks at the first empty square and makes a choice: *Try placing the number 1.*
It then recursively calls itself and moves to the next square: *Try placing the number 1.*
If the rules of Sudoku are mathematically violated, the algorithm immediately stops exploring this branch. It **backtracks**, un-does the placement, and tries the number 2.

## 2. Pruning the Search Space
If you brute-force an empty 9x9 Sudoku board blindly, there are 9^81 possible combinations, which would take millions of years to compute.
Backtracking is mathematically viable solely because of **Pruning**. By checking the constraints (e.g., "Is this number already in the row?") *before* going deeper into the recursion, it mathematically chops off massive sections of the decision tree, reducing the 9^81 combinations down to a manageable few thousand, solving the puzzle in milliseconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Binary search on answer/index.mdx': `---
title: Binary Search on Answer
description: "An advanced algorithmic technique where the problem does not ask to search an array, but rather to find a specific optimal numerical answer, mathematically utilizing binary search across the continuous range of all possible answers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Binary Search on Answer"
  subtitle="Searching the Solution Space"
  tags={['Algorithms', 'Techniques', 'Binary Search', 'Optimization']}
>

Standard Binary Search is used to find a number inside a sorted array. **Binary Search on Answer** is a profound mathematical paradigm shift: you use Binary Search to guess the answer to a complex optimization problem.

## 1. The Monotonic Condition
You can only use this technique if the problem is mathematically **Monotonic** (meaning it follows a strict True/False boundary, like TICK1FFFFFTTTTTTICK1).
For example: *You are given an array of wooden boards. You must make N cuts to get K pieces of equal length. What is the MAXIMUM possible length you can get?*
If you can successfully cut boards of length 10 (True), you can mathematically also cut boards of length 9 (True). If length 15 is impossible (False), length 16 is mathematically impossible (False). The answer is monotonic.

## 2. The Checking Function
1. You set a mathematical range for the answer (e.g., TICK1Low = 1, High = 1000TICK1).
2. You guess the midpoint (TICK1Mid = 500TICK1).
3. You write a fast O(N) TICK1isValid(500)TICK1 function that tests if a length of 500 works.
4. If it works, you know the true answer is 500 or higher. You set TICK1Low = 501TICK1. If it fails, you set TICK1High = 499TICK1.
Instead of an O(N²) complex DP solution, you mathematically solve it in **O(N log(Range))** time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Bitmask DP/index.mdx': `---
title: Bitmask Dynamic Programming
description: "A highly optimized algorithmic technique that mathematically uses the binary representation of integers to represent small subsets or states, drastically accelerating Dynamic Programming transitions."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bitmask DP"
  subtitle="State Compression via Binary"
  tags={['Algorithms', 'Techniques', 'Dynamic Programming', 'Bitwise']}
>

In many algorithmic problems (like the Traveling Salesperson Problem), you must keep track of a "State" representing which items you have visited and which you haven't.

## 1. The Mathematical Mask
If you have 5 cities, a boolean array TICK1[True, False, True, False, False]TICK1 takes up memory and is slow to pass through recursive functions.
A **Bitmask** mathematically compresses this array into a single integer.
The binary number TICK110100TICK1 is exactly 20 in decimal.
Instead of passing arrays, your DP function just takes the integer TICK120TICK1. The entire state of the universe is mathematically encoded in one CPU register.

## 2. O(1) Bitwise Transitions
Because the state is an integer, transitioning between states is done using blisteringly fast, hardware-level bitwise operations (O(1) time):
- **Check if City N is visited**: TICK1(mask & (1 << N)) > 0TICK1
- **Mark City N as visited**: TICK1mask | (1 << N)TICK1
- **Toggle City N**: TICK1mask ^ (1 << N)TICK1
By combining this with Memoization, a recursive function like TICK1solve(currentCity, mask)TICK1 can quickly cache its results in a simple 2D array, mathematically reducing factorial O(N!) time complexities down to exponential **O(N² * 2^N)** time complexities.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Branch and bound/index.mdx': `---
title: Branch and Bound
description: "A mathematical algorithm design paradigm for discrete and combinatorial optimization problems, similar to backtracking but optimized by continuously calculating upper and lower bounds to massively prune the search tree."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Branch and Bound"
  subtitle="Mathematically Pruning the Tree"
  tags={['Algorithms', 'Techniques', 'Optimization', 'Trees']}
>

Backtracking just blindly explores a decision tree until a rule is violated. **Branch and Bound** is mathematically smarter: it explores a decision tree while constantly keeping track of the "Best Score So Far," using it to mathematically prove that certain branches are not worth exploring.

## 1. The Bounding Function
Imagine you are solving the Traveling Salesperson Problem (finding the shortest path).
You have currently found a complete path that takes **500 miles** (the Upper Bound).
You are exploring a new branch. After just 3 cities, you calculate a mathematical "Lower Bound" for the *rest* of the trip. If the math proves that the absolute minimum possible distance to finish the trip is 200 miles, and you have already traveled 350 miles, the total will be at least 550 miles.
Because 550 > 500, you mathematically know this branch can NEVER beat the current record. You immediately abort (prune) the entire branch.

## 2. BFS vs DFS (Branching)
Backtracking strictly uses DFS. Branch and Bound can mathematically use a Priority Queue (Best-First Search).
Instead of diving deep into the tree, it calculates the Lower Bound for all child nodes, puts them in a Heap, and explores the most mathematically promising node first. This increases the chances of finding an extremely low Upper Bound early on, which in turn drastically increases the pruning power for the rest of the algorithm.

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
