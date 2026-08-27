import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Articulation points & bridges/index.mdx': `---
title: Articulation Points & Bridges
description: "Mathematical graph concepts representing critical nodes (Articulation Points) or edges (Bridges) whose removal would catastrophically disconnect a connected graph into multiple disjoint subgraphs."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Articulation Points & Bridges"
  subtitle="Finding Network Vulnerabilities"
  tags={['Algorithms', 'Graphs', 'DFS', 'Networks']}
>

If a graph represents a country's highway system, an **Articulation Point** is a city, and a **Bridge** is a physical highway. If destroying one specific city or one specific highway physically splits the country into two disconnected halves, you have found a single point of failure.

## 1. Tarjan's Bridge-Finding Algorithm
A brute-force mathematical approach would be to delete an edge, run DFS (Depth-First Search) to check if the graph is still connected, put the edge back, and repeat for all E edges. This takes **O(E * (V+E))** time, which is too slow.
Tarjan mathematically solved this using a single DFS pass in **O(V + E)** time.
He introduced two concepts for every node:
1. **Discovery Time (TICK1discTICK1)**: The exact mathematical "tick" (1, 2, 3...) when the node was first visited.
2. **Lowest Point (TICK1lowTICK1)**: The lowest discovery time reachable from the current node *without* going backward through the direct parent.

## 2. The Mathematical Condition
If you are at Node U, looking down an edge to Node V:
- **Bridge**: If TICK1low[V] > disc[U]TICK1, it mathematically proves that V has absolutely no "back-edges" connecting it to any ancestors of U. The edge U-V is the *only* way to reach V. Therefore, U-V is a Bridge.
- **Articulation Point**: If TICK1low[V] >= disc[U]TICK1 (and U is not the root), U is an Articulation Point.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Bipartite matching/index.mdx': `---
title: Bipartite Matching
description: "A fundamental mathematical algorithm used to find the maximum possible number of non-sharing pairings between two distinct sets in a bipartite graph, solving problems like job assignments or marriage."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bipartite Matching"
  subtitle="The Maximum Pairing Problem"
  tags={['Algorithms', 'Graphs', 'Matching', 'Flow']}
>

Imagine a bipartite graph: Set A contains 5 Taxi Drivers, and Set B contains 5 Passengers. Edges exist if a driver is willing to take a specific passenger. What is the mathematical maximum number of rides that can occur simultaneously without double-booking a driver or passenger?

## 1. Maximum Bipartite Matching
This is mathematically solved using an augmenting path algorithm.
1. Start with an empty matching.
2. Pick an unmatched Driver. Use DFS to find a path to an unmatched Passenger.
3. If the path traverses an already-matched Driver/Passenger, the algorithm mathematically "flips" the edges along the path (an Augmenting Path). This effectively unassigns an old pairing to make room for two new pairings, increasing the total match count by 1.
4. Repeat until no more augmenting paths exist.

## 2. Reduction to Max Flow
Modern computer science rarely implements the augmenting path algorithm directly. Instead, Bipartite Matching is mathematically reduced to a **Maximum Flow** problem (solved by Ford-Fulkerson or Dinic's).
You mathematically create a "Super Source" node connected to all Drivers, and a "Super Sink" node connected to all Passengers. You assign a capacity of TICK11TICK1 to every edge in the graph. The Maximum Flow from Source to Sink mathematically equals the Maximum Bipartite Matching.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Borůvka/index.mdx': `---
title: Borůvka's Algorithm
description: "The oldest known Minimum Spanning Tree (MST) algorithm, mathematically designed in 1926 to efficiently construct optimal electrical networks by aggressively adding the cheapest edges for all components simultaneously."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Borůvka's Algorithm"
  subtitle="The Parallel MST Algorithm"
  tags={['Algorithms', 'Graphs', 'MST', 'Greedy']}
>

Invented by Otakar Borůvka in 1926 to mathematically optimize the electrical grid of Moravia (long before computers existed), this algorithm finds a Minimum Spanning Tree (MST). While Kruskal's and Prim's are more famous, Borůvka's is mathematically superior for parallel computing.

## 1. The Mathematical Mechanism
Unlike Prim (which grows one tree) or Kruskal (which sorts all edges), Borůvka is completely decentralized.
1. It starts by treating every single vertex as its own isolated "Tree" (or component).
2. For *every* component simultaneously, it mathematically finds the cheapest outgoing edge connecting it to a different component.
3. It adds all these cheapest edges to the MST, merging the components together.
4. It repeats this process until there is only 1 massive component left (the final MST).

## 2. Parallel Processing Supremacy
Because the algorithm halves the number of components in every single pass, it mathematically finishes in at most **O(log V)** passes. The overall time complexity is **O(E log V)**.
However, its true power lies in distributed systems. Step 2 (finding the cheapest outgoing edge for every component) can be executed mathematically in parallel across thousands of GPUs or Kubernetes pods, making Borůvka the algorithm of choice for finding MSTs on astronomically massive graphs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Dinic\'s algorithm/index.mdx': `---
title: Dinic's Algorithm
description: "A highly efficient polynomial-time algorithm for computing the maximum flow in a flow network, mathematically utilizing Level Graphs and Blocking Flows to vastly outperform the older Ford-Fulkerson method."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Dinic's Algorithm"
  subtitle="High-Speed Maximum Flow"
  tags={['Algorithms', 'Graphs', 'Network Flow', 'Advanced']}
>

Invented by Yefim Dinitz in 1970, Dinic's Algorithm mathematically solves the Maximum Flow problem much faster than Edmonds-Karp by processing multiple paths simultaneously rather than one at a time.

## 1. The Level Graph
In standard Ford-Fulkerson, DFS can wander aimlessly through the network, taking mathematically terrible paths that result in catastrophic O(E * max_flow) time complexity.
Dinic's solves this by first using BFS (Breadth-First Search) to create a **Level Graph**.
It assigns a "level" (distance from the Source) to every node. An edge is only valid if it strictly points from Level N to Level N+1. This mathematically forces the algorithm to only take the absolute shortest paths to the Sink, preventing it from wandering backward or sideways.

## 2. Blocking Flows
Once the Level Graph is established, Dinic's uses DFS to find a **Blocking Flow**. Instead of pushing flow down one single path (like Edmonds-Karp), it mathematically pushes flow down *all possible shortest paths* in the Level Graph simultaneously until every path is saturated.
It then recalculates the Level Graph and repeats. The Time Complexity is mathematically guaranteed to be **O(V²E)**, making it the standard algorithm for competitive programming and heavy network routing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Edmonds-Karp/index.mdx': `---
title: Edmonds-Karp Algorithm
description: "A specific mathematical implementation of the Ford-Fulkerson method for computing the maximum flow in a network, explicitly utilizing Breadth-First Search (BFS) to guarantee a polynomial time complexity."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Edmonds-Karp Algorithm"
  subtitle="Ford-Fulkerson with BFS"
  tags={['Algorithms', 'Graphs', 'Network Flow', 'BFS']}
>

The original Ford-Fulkerson method is mathematically dangerous because it does not specify *how* to find an augmenting path. If you use DFS (Depth-First Search) and the edge capacities are irrational numbers, Ford-Fulkerson can mathematically run forever (an infinite loop).

## 1. The BFS Guarantee
In 1972, Edmonds and Karp mathematically proved that if you simply force Ford-Fulkerson to use **Breadth-First Search (BFS)** instead of DFS to find the augmenting path, the algorithm is guaranteed to terminate.
By using BFS, the algorithm mathematically always chooses the path with the *fewest number of edges*, regardless of the capacities.

## 2. Mathematical Complexity
Because every augmenting path increases the length of the shortest path, Edmonds and Karp mathematically proved that the total number of augmenting paths can never exceed **O(V * E)**.
Since BFS takes O(E) time, the absolute worst-case Time Complexity of the Edmonds-Karp algorithm is **O(V * E²)**. While slower than Dinic's algorithm (O(V²E)), Edmonds-Karp is much easier to implement and is the mathematical baseline for solving Max-Flow problems in computer science education.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Eulerian path-circuit/index.mdx': `---
title: Eulerian Path & Circuit
description: "A mathematical trail in a finite graph that visits every single edge exactly once (Path), and optionally starts and ends on the exact same vertex (Circuit), famously solving the Seven Bridges of Königsberg problem."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Eulerian Path & Circuit"
  subtitle="The Seven Bridges of Königsberg"
  tags={['Algorithms', 'Graphs', 'Mathematics', 'History']}
>

In 1736, Leonhard Euler invented Graph Theory to solve a mathematical puzzle: *"Can you walk through the city of Königsberg, crossing all seven bridges exactly once?"*

## 1. The Mathematical Conditions
Euler didn't write an algorithm to simulate walking; he looked at the math of the nodes (Vertices) and the bridges (Edges).
The **Degree** of a vertex is the number of edges connected to it.
- **Eulerian Circuit** (Starts and ends at the same node): Mathematically possible *if and only if* every single vertex in the graph has an **Even** degree. (If you enter a city via one bridge, you must have a second bridge to exit it).
- **Eulerian Path** (Starts at Node A, ends at Node B): Mathematically possible *if and only if* exactly **Two** vertices have an Odd degree, and all others are Even. (The two odd vertices must be the Start and the End).

## 2. Hierholzer's Algorithm
If the mathematical conditions are met, you can physically find the circuit using Hierholzer's Algorithm (O(V+E) time).
You start at any node and randomly walk across unused edges until you get stuck (which mathematically must be back at the starting node, completing a sub-circuit). You then pick a node on that sub-circuit that still has unused edges, walk a new sub-circuit, and splice them together.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Ford-Fulkerson/index.mdx': `---
title: Ford-Fulkerson Method
description: "A foundational mathematical method for computing the maximum flow in a flow network, relying on the continuous discovery of augmenting paths and the concept of residual graphs to push flow from a source to a sink."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Ford-Fulkerson Method"
  subtitle="The Foundation of Max Flow"
  tags={['Algorithms', 'Graphs', 'Network Flow', 'Mathematics']}
>

Imagine a network of water pipes of varying widths connecting a water treatment plant (Source) to a city (Sink). What is the absolute mathematical maximum gallons of water per minute you can push through the network? This is the Max-Flow problem.

## 1. The Residual Graph
Ford-Fulkerson mathematically relies on "undoing" bad decisions.
If the algorithm pushes 10 gallons of water through Pipe A->B, it mathematically creates a **Residual Edge** of 10 gallons going backward from B->A.
Later in the execution, if the algorithm finds a better use for Pipe A->B, it is allowed to push water backward along the B->A residual edge, mathematically "canceling out" the original flow and redirecting the water elsewhere.

## 2. The Augmenting Path
The algorithm is mathematically simple:
1. Find *any* path from Source to Sink in the Residual Graph where the bottleneck capacity is > 0. (An Augmenting Path).
2. Push the bottleneck capacity through that path.
3. Update the forward capacities and backward residual edges.
4. Repeat until no more augmenting paths exist.
(Note: It is called a "Method" rather than an "Algorithm" because it does not specify *how* to find the path. If BFS is used, it becomes the Edmonds-Karp algorithm).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Graph coloring/index.mdx': `---
title: Graph Coloring
description: "A mathematical assignment of labels (colors) to the elements of a graph subject to certain constraints, most famously that no two adjacent vertices share the exact same color."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Graph Coloring"
  subtitle="The Mathematics of Map Making"
  tags={['Algorithms', 'Graphs', 'NP-Complete', 'Mathematics']}
>

If you want to color a map of the United States such that no two bordering states share the same color, how many colors do you mathematically need?

## 1. Vertex Coloring and the Chromatic Number
This is mathematically represented as a Graph. States are Vertices, and borders are Edges. The goal is to assign a color to every vertex so that no edge connects two identical colors.
The absolute minimum number of colors required for a specific graph is its **Chromatic Number**.
- A Bipartite Graph has a mathematical Chromatic Number of 2.
- The Four Color Theorem mathematically proves that *any* planar graph (a 2D map) can be colored with exactly 4 colors.

## 2. The NP-Complete Problem
While determining if a graph is 2-colorable is easy (O(V+E) using BFS), determining if a general graph is 3-colorable is mathematically **NP-Complete**. There is no known fast algorithm; the computer must brute-force the possibilities (O(3^V)).
Because finding the exact Chromatic Number is too slow, engineers use "Greedy Coloring" algorithms. It loops through the vertices, checks the neighbors' colors, and assigns the lowest available color. It is fast (O(V+E)) but mathematically not guaranteed to use the absolute minimum number of colors.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Hamiltonian path-circuit/index.mdx': `---
title: Hamiltonian Path & Circuit
description: "A mathematical path in an undirected or directed graph that visits every single vertex exactly once, contrasting with an Eulerian path which visits every edge exactly once."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Hamiltonian Path & Circuit"
  subtitle="The Traveling Salesperson's Nightmare"
  tags={['Algorithms', 'Graphs', 'NP-Complete', 'Mathematics']}
>

Eulerian Paths (visiting every edge once) are mathematically trivial to solve in O(V+E) time. Hamiltonian Paths (visiting every *vertex* exactly once) are mathematically a nightmare.

## 1. The Mathematical Complexity
Determining whether a Hamiltonian Path or Circuit even *exists* in a general graph is strictly **NP-Complete**.
Unlike the Eulerian problem (where you just look for Even/Odd edge counts), there is no simple mathematical formula to check for a Hamiltonian Path. The computer is forced to use a backtracking algorithm (DFS) to brute-force all possible permutations of vertex visits, resulting in a catastrophic worst-case Time Complexity of **O(N!)**.

## 2. The Traveling Salesperson Problem (TSP)
The Hamiltonian Circuit is the mathematical foundation of the most famous problem in computer science: The Traveling Salesperson Problem.
In a Hamiltonian Circuit, you just want to find *any* path that visits every city once and returns home.
In TSP, the edges have "weights" (distances), and you want to find the Hamiltonian Circuit with the mathematically *shortest total distance*. Because standard Hamiltonian Circuits are already NP-Complete, TSP is NP-Hard, forcing routing companies (like FedEx and Uber) to rely on heuristic approximation algorithms rather than seeking perfect mathematical answers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/Hungarian algorithm/index.mdx': `---
title: Hungarian Algorithm
description: "A highly complex combinatorial optimization algorithm mathematically designed to solve the assignment problem in polynomial time, finding the lowest possible cost to assign a set of workers to a set of tasks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Hungarian Algorithm"
  subtitle="Optimal Cost Assignment"
  tags={['Algorithms', 'Graphs', 'Optimization', 'Mathematics']}
>

You have 3 Workers (Alice, Bob, Charlie) and 3 Tasks (Clean, Cook, Drive).
Alice demands $10 to clean, $15 to cook, $20 to drive. Bob and Charlie have different price charts.
What is the mathematically cheapest way to assign exactly 1 unique task to each worker?

## 1. The Assignment Problem
A brute-force approach would calculate every possible combination (N! permutations). For 20 workers and 20 tasks, 20! is a number so astronomically large the universe would end before the computer finished calculating.
In 1955, Harold Kuhn mathematically solved this in polynomial time **O(N³)**, naming it the Hungarian Algorithm.

## 2. Matrix Manipulation
The algorithm does not use standard graph traversal. It places the costs into a 2D Matrix and mathematically manipulates the rows and columns.
1. It finds the lowest cost in each row and subtracts it from the entire row (creating at least one $0 in every row).
2. It repeats this for columns.
3. It draws the minimum number of mathematical lines required to cover all the $0s.
4. If the number of lines equals N, the $0s represent the mathematically perfect assignment! If not, it performs another shift on the matrix and tries again.

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
