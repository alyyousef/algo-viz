import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/BFS/index.mdx': `---
title: Breadth-First Search (BFS)
description: The fundamental graph traversal algorithm that mathematically explores a graph level-by-level, discovering the shortest path in unweighted networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Breadth-First Search (BFS)">

**Breadth-First Search (BFS)** is an algorithm for traversing or searching tree and graph data structures. It mathematically guarantees that it explores all neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

## 1. The Queue Data Structure
The entire mathematical mechanism of BFS relies on a **Queue** (First-In-First-Out / FIFO). 

**The Algorithm:**
1. Enqueue the starting node and mark it as 'Visited'.
2. While the queue is not empty:
   - Dequeue a node.
   - For every unvisited neighbor of that node: mark it as 'Visited' and Enqueue it.

Because a Queue processes nodes in the exact order they were discovered, BFS mathematically ripples outward from the starting point like a shockwave.

## 2. Shortest Path Guarantee
In an **unweighted graph** (where every edge has a cost of exactly 1), BFS mathematically guarantees that the very first time it discovers a target node, it has found the **absolute shortest path** to that node.

If Alice is connected to Bob (Distance 1), and Bob is connected to Charlie (Distance 2), BFS will completely mathematically exhaust all of Alice's direct friends before it is even allowed to look at Charlie.

<Callout icon="warning" title="Memory Complexity">
While BFS is mathematically brilliant for finding shortest paths, its spatial complexity is extremely dangerous. At the bottom of a massive tree, BFS might have to hold half of the entire tree's nodes in its Queue simultaneously. The space complexity is exactly TICK1O(V)TICK1 (or specifically, the maximum width of the graph), which can cause Out-Of-Memory (OOM) crashes on deep networks.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/DFS/index.mdx': `---
title: Depth-First Search (DFS)
description: The aggressive graph traversal algorithm that plunges as deep as mathematically possible down a single branch before backtracking.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Depth-First Search (DFS)">

While BFS ripples outward slowly, **Depth-First Search (DFS)** is mathematically aggressive. It selects a single branch and plunges down it as far as physically possible. When it hits a dead end, it mathematically **backtracks** up the branch and tries the next available path.

## 1. The Stack Data Structure
The mathematical engine of DFS is the **Stack** (Last-In-First-Out / LIFO). 
In most implementations, developers do not explicitly write a Stack; they rely on the CPU's native **Call Stack** via Recursion.

**The Recursive Algorithm:**
1. Mark the current node as 'Visited'.
2. For every neighbor of the current node:
   - If the neighbor is not visited, recursively call DFS on that neighbor.

## 2. Why use DFS over BFS?

<ComparisonTable 
  headers={['Property', 'BFS (Queue)', 'DFS (Stack)'] }
  rows={[
    ['Shortest Path?', 'YES (in unweighted graphs).', 'NO. DFS might find a path that is 100 hops long, even if a 2-hop path exists.'],
    ['Memory Usage', 'Massive. Must store entire levels in RAM. O(Width).', 'Minimal. Only stores the current path back to the root. O(Height).'],
    ['Best Use Case', 'Finding the closest node, Peer-to-Peer networks, Web Crawlers.', 'Solving Mazes, Topological Sorting, Cycle Detection, Backtracking algorithms (Sudoku).']
  ]} 
/>

<Callout icon="info" title="Cycle Detection">
DFS is the mathematically superior algorithm for detecting cycles in a Directed Graph. If during a DFS traversal you encounter a node that is currently sitting in your active recursion stack, you have mathematically proven the existence of a back-edge (a cycle).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Dijkstra/index.mdx': `---
title: Dijkstra's Algorithm
description: The legendary greedy algorithm that mathematically calculates the shortest path in a weighted graph using a Priority Queue.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Dijkstra's Algorithm">

Invented by Edsger W. Dijkstra in 1956, this algorithm mathematically finds the absolute shortest path from a starting node to all other nodes in a **Weighted Graph**. 
Unlike BFS which assumes every road takes 1 minute to drive, Dijkstra understands that Highway A takes 10 minutes, and Highway B takes 50 minutes.

## 1. The Priority Queue (Min-Heap)
Dijkstra's algorithm is essentially BFS, but instead of using a standard Queue, it mathematically uses a **Priority Queue (Min-Heap)**.

1. Create a distance table. Set the start node distance to 0, and all other nodes to Infinity.
2. Push the start node into the Min-Heap.
3. While the Min-Heap is not empty:
   - Extract the node with the **current smallest distance**.
   - For every neighbor of this node, calculate the mathematical cost: TICK1Cost = Current Node's Distance + Edge WeightTICK1.
   - If this new Cost is strictly less than the neighbor's known distance, update the table and push the neighbor into the Min-Heap.

## 2. The Greedy Mathematical Proof
Dijkstra is a **Greedy Algorithm**. When it extracts a node from the Min-Heap, it mathematically assumes that it has found the absolute shortest possible path to that node. 
Why is this mathematically true? Because it always processes the cheapest available node first. If a cheaper path existed, the Min-Heap would have extracted that path earlier.

<Callout icon="warning" title="The Fatal Flaw: Negative Weights">
Dijkstra mathematically relies on the assumption that adding edges can only increase the total cost (like driving a car: you cannot drive a road that gives you -5 gallons of gas). If the graph contains **Negative Edge Weights**, Dijkstra's greedy assumption catastrophically fails and it will return the wrong answer. You must use the Bellman-Ford algorithm instead.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/A/index.mdx': `---
title: A* Search Algorithm
description: The pinnacle of pathfinding algorithms, utilizing mathematical heuristics to drastically optimize Dijkstra's search space.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="A* Search Algorithm">

While Dijkstra's Algorithm mathematically guarantees the shortest path, it is "blind". It searches equally in all directions, wasting massive CPU cycles exploring the completely wrong side of a map. 

The **A* (A-Star)** algorithm mathematically optimizes Dijkstra by giving it a "brain" (a Heuristic). It directs the search aggressively toward the target.

## 1. The Mathematical Formula
Like Dijkstra, A* uses a Priority Queue. However, instead of ordering the queue purely by the known distance from the start, A* orders the queue using a composite mathematical function:

TICK1f(n) = g(n) + h(n)TICK1

- **TICK1g(n)TICK1**: The exact, known mathematical cost from the Start node to Node N (This is literally just Dijkstra).
- **TICK1h(n)TICK1**: The **Heuristic**. An estimated, calculated guess of the cost from Node N to the Target.

## 2. The Heuristic (h)
In a 2D video game grid, the Heuristic TICK1h(n)TICK1 is usually calculated using Euclidean Distance (a straight line) or Manhattan Distance. 
Because A* knows exactly where the target physically is, it mathematically prioritizes exploring nodes that physically move it closer to the target, ignoring nodes that move away.

<ComparisonTable 
  headers={['Algorithm', 'Mathematical Behavior', 'Speed']} 
  rows={[
    ['Dijkstra (h=0)', 'Expands purely outward in a perfect circle (or sphere). Guarantees shortest path.', 'Very Slow (Explores massive unnecessary areas).'],
    ['Greedy Best-First (g=0)', 'Ignores the start distance, blindly rushes the target using only the Heuristic.', 'Blazingly Fast, but often gets trapped by walls and returns terrible, sub-optimal paths.'],
    ['A* (g + h)', 'Mathematically balances both. Guarantees the absolute shortest path while minimizing wasted exploration.', 'Fast and Perfect.']
  ]} 
/>

<Callout icon="tip" title="Admissibility">
For A* to mathematically guarantee finding the absolute shortest path, the Heuristic MUST be **Admissible**. This means the heuristic must never overestimate the true cost. If the straight-line distance to the target is 10 miles, but your heuristic mathematically guesses it is 50 miles, A* will break and return a sub-optimal path.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Bellman-Ford/index.mdx': `---
title: Bellman-Ford Algorithm
description: The mathematical failsafe for shortest-path problems, capable of handling negative edge weights and detecting catastrophic negative cycles.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Bellman-Ford Algorithm">

When a graph contains **Negative Edge Weights** (e.g., representing a financial transaction where you make money instead of spending it), Dijkstra's Algorithm mathematically collapses. The **Bellman-Ford Algorithm** is specifically designed to solve this.

## 1. The Relaxation Principle
Instead of using a clever Priority Queue, Bellman-Ford uses a mathematical brute-force technique called **Edge Relaxation**. 

To "relax" an edge TICK1(u, v)TICK1 means to mathematically check if traveling through TICK1uTICK1 provides a shorter path to TICK1vTICK1 than the currently known path.
TICK1If Distance(u) + Weight(u, v) < Distance(v), then update Distance(v).TICK1

## 2. The Mathematical Proof of V-1
The algorithm is shockingly simple:
1. Initialize the start node distance to 0, and all others to Infinity.
2. Loop exactly **TICK1V - 1TICK1** times (where V is the total number of Vertices/Nodes in the graph).
3. Inside the loop, mathematically **relax every single edge** in the entire graph.

Why TICK1V - 1TICK1? 
Mathematically, the longest possible path in a graph without traversing in a circle (a cycle) can only contain at most TICK1V - 1TICK1 edges. If you relax all edges TICK1V - 1TICK1 times, you mathematically guarantee that the absolute shortest path has successfully propagated to every single node.

## 3. Detecting Negative Cycles
A Negative Cycle is a loop in the graph where the total weight is negative. If you drive around this loop infinitely, your total cost approaches Negative Infinity. If a Negative Cycle exists, the concept of a "Shortest Path" mathematically ceases to exist.

Bellman-Ford can detect this:
After running the TICK1V - 1TICK1 loops, run the loop exactly **one more time**. 
If any edge can *still* be mathematically relaxed, you have absolutely proven that a Negative Cycle exists in the graph.

<Callout icon="warning" title="Time Complexity">
Because it brute-forces every edge repeatedly, Bellman-Ford is catastrophically slow. Its mathematical time complexity is **TICK1O(V * E)TICK1**. On a dense graph, this approaches TICK1O(V^3)TICK1. Only use Bellman-Ford if you absolutely know you have negative edge weights; otherwise, always use Dijkstra.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Floyd-Warshall/index.mdx': `---
title: Floyd-Warshall Algorithm
description: The elegant Dynamic Programming algorithm that mathematically computes the shortest path between every single pair of nodes in O(V³) time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Floyd-Warshall Algorithm">

Dijkstra and Bellman-Ford are **Single-Source** Shortest Path algorithms (they find paths from exactly one starting node). 
The **Floyd-Warshall Algorithm** is an **All-Pairs** Shortest Path algorithm. In a single execution, it mathematically calculates the absolute shortest path between *every single possible pair of nodes* in the entire graph.

## 1. The Dynamic Programming Core
Floyd-Warshall represents the graph as a 2D mathematical Adjacency Matrix TICK1D[i][j]TICK1, where the value is the edge weight from node TICK1iTICK1 to node TICK1jTICK1.

The algorithm relies on a brilliant Dynamic Programming sub-problem:
*"Is the shortest path from TICK1iTICK1 to TICK1jTICK1 faster if I physically route through node TICK1kTICK1?"*

## 2. The 4-Line Algorithm
The entire mathematical algorithm can be written in four lines of code using three nested loops:

TICK3javascript
for (let k = 0; k < V; k++) {
  for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
      if (D[i][k] + D[k][j] < D[i][j]) {
        D[i][j] = D[i][k] + D[k][j]; // Update the matrix!
      }
    }
  }
}
TICK3

The outermost loop (TICK1kTICK1) represents the "intermediate" node. As TICK1kTICK1 increases from 0 to V, the matrix is mathematically refined, considering more and more complex detour routes, until it perfectly stabilizes.

<Callout icon="tip" title="Time and Space Complexity">
Because it requires three nested loops iterating over every vertex, the Time Complexity is strictly and mathematically **TICK1O(V^3)TICK1**. Because it requires a 2D matrix, the Space Complexity is **TICK1O(V^2)TICK1**. This makes Floyd-Warshall absolutely magnificent for small, dense graphs (V < 500), but completely impossible to run on large graphs (like a social network with 1 million users).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Kruskal/index.mdx': `---
title: Kruskal's Algorithm
description: A greedy mathematical algorithm that builds the Minimum Spanning Tree (MST) of a graph by sorting edges and utilizing a Disjoint Set (Union-Find).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Kruskal's Algorithm">

Given a massive map of cities and the cost to lay fiber-optic cable between them, how do you physically connect every single city together while spending the absolute minimum amount of money? 
This mathematical problem is called the **Minimum Spanning Tree (MST)**. **Kruskal's Algorithm** elegantly solves it.

## 1. The Greedy Strategy
Kruskal’s Algorithm does not care about starting nodes or complex traversals. It strips the graph down to a mathematical list of raw edges.

1. **Sort all edges** in the entire graph in ascending order based on their weight (cheapest first).
2. Create an empty set to hold the final MST.
3. Iterate through the sorted edges one by one.
4. If adding the edge to the MST **does not form a cycle**, add it. 
5. If it does form a cycle, throw the edge in the trash and evaluate the next one.
6. Stop when the MST contains exactly TICK1V - 1TICK1 edges.

## 2. Cycle Detection via Union-Find
The entire performance bottleneck of Kruskal's algorithm is Step 4: *"Does this edge form a cycle?"* 
Running DFS to check for cycles on every single edge would be mathematically catastrophic for performance TICK1O(E * V)TICK1.

Instead, Kruskal's relies on a highly advanced secondary data structure: The **Disjoint Set (Union-Find)**. 
Using the mathematical optimizations of *Path Compression* and *Union by Rank*, the Union-Find structure can determine if two nodes are already connected in essentially **TICK1O(1)TICK1** amortized time.

<Callout icon="info" title="Kruskal vs Prim">
The other famous MST algorithm is Prim's Algorithm (which works similarly to Dijkstra). 
- Use **Kruskal's Algorithm** when the graph is **Sparse** (few edges). Sorting the edges TICK1O(E log E)TICK1 is extremely fast.
- Use **Prim's Algorithm** when the graph is **Dense** (millions of edges). Prim's uses a Priority Queue and avoids sorting the massive list of edges upfront.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Topological sorting/index.mdx': `---
title: Topological Sorting
description: The mathematical process of linearly ordering a Directed Acyclic Graph (DAG) such that every parent node strictly precedes its children.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Topological Sorting">

Imagine a massive university degree program. You must take Calculus I before Calculus II, and you must take Algebra before Calculus I. This dependency structure mathematically forms a **Directed Acyclic Graph (DAG)**. 

**Topological Sorting** is the algorithm that flattens this complex graph into a simple, linear, 1D array (a valid schedule of classes) such that no mathematical dependency rules are broken.

## 1. The Core Restriction: DAGs Only
Topological Sorting is mathematically impossible if the graph contains a Cycle. If Class A requires Class B, and Class B requires Class A, the graph cannot be resolved. The graph must strictly be a **DAG**.

## 2. Algorithm 1: Kahn's Algorithm (BFS based)
Kahn's algorithm relies on calculating the **In-Degree** (number of incoming dependency edges) for every node.

1. Calculate the In-Degree of all nodes.
2. Find all nodes with an In-Degree of exactly 0 (these are classes with no prerequisites) and push them into a Queue.
3. While the Queue is not empty:
   - Dequeue a node and append it to the final sorted array.
   - For every child of that node, mathematically subtract 1 from its In-Degree (you just satisfied one of its prerequisites).
   - If a child's In-Degree hits 0, push it into the Queue.

## 3. Algorithm 2: DFS Based
You can also use a standard Depth-First Search. 

1. Run a recursive DFS on a node.
2. The absolute most critical step: **Do not add the node to the array until AFTER the recursive DFS has completely finished exploring all of its children.**
3. This guarantees that a node is only logged after all its dependencies are mathematically resolved.
4. When the entire graph is explored, simply **reverse** the array to get the valid Topological Sort.

<Callout icon="tip" title="Real World Application: Build Systems">
Every time you run TICK1npm installTICK1, TICK1makeTICK1, or compile a massive C++ codebase, the compiler physically constructs a DAG of every file and its dependencies. It then runs Topological Sort to mathematically determine the exact order it must compile the files so that no 'missing dependency' errors occur.
</Callout>

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
